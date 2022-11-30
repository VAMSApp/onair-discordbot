const Logger = require('@lib/logger.js')
const cron = require('node-cron')

const {
    Client, REST, EmbedBuilder, SlashCommandBuilder, Collection, GatewayIntentBits
} = require('discord.js')
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
const path = require('path')
const Config = require('./config');
const IORedis = require('ioredis');
const EventService = require('./lib/EventService');
const OnAirApi = require('./lib/onair');

class Bot {
    AppToken = Config.discord_token;
    ClientId = Config.discord_clientId;
    GuildId = Config.discord_guildId;
    ChannelId = Config.discord_channelId;
    Config = Config;
    OnAir = OnAirApi;
    Client = undefined;
    VAEvents = undefined;

    constructor() {
        if (!this.AppToken) throw 'No discord_token defined in .env'
        if (!this.ClientId) throw 'No discord_clientId defined in .env'
        if (!this.GuildId) throw 'No discord_guildId defined in .env'

        this.initializeClient = this.initializeClient.bind(this);
        this.loadCommands = this.loadCommands.bind(this);
        this.login = this.login.bind(this);
        this.deployCommands = this.deployCommands.bind(this);
        this.subscribeToVAEvents = this.subscribeToVAEvents.bind(this);
        this.getChannelId = this.getChannelId.bind(this);
        this.refreshVANotifications = this.refreshVANotifications.bind(this);
        
        Logger.info('starting up Discord Bot')

        this.initializeClient();
        this.loadCommands()

        this.deployCommands()
        this.login()

        this.Client.on('ready', async (client) => {
            Logger.info(`Logged into discord server as ${client.user.tag}`)
            
            if (this.Config.OnConnectNotice === true) {
                const readyMsg = require('./messages/onReadyMessage')()
                
                client
                .channels
                .fetch(this.getChannelId('discord'))
                .then((channel) => channel.send(readyMsg).then((msg) => (this.Config.OnConnectNoticeAutoDelete === true) ? setTimeout(() => msg.delete(), this.Config.onConnectNoticeAutoDeleteAfter || 10000) : null ));
                
            }
            
            if (this.Config.VAEvents.enabled) {
                this.VAEvents = EventService;
                this.subscribeToVAEvents();                
            }

            if (this.Config.poll.enabled === true) { 
                this.scheduleCrons = this.scheduleCrons.bind(this);
                Logger.info(`✅ Polling is enabled`);
                this.scheduleCrons();
            }
        });

    }

    initializeClient() {
        if (!this.Client) this.Client = new Client({ intents: [GatewayIntentBits.Guilds, ] })
    }

    loadCommands () {
        const commands = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith(".js"));
        this.Client.commands = new Collection();

        for (const file of commands) {
            const command = require(path.join(__dirname, 'commands', file));
            const {
                name,
            } = command.data

            if (name) {
                Logger.debug(`✅ Loading Command: ${name}`);
                this.Client.commands.set(name, command);
            } else {
                continue;
            }
        }

        this.Client.on('interactionCreate', async interaction => {
            if (!interaction.isChatInputCommand()) return;
        
            const command = this.Client.commands.get(interaction.commandName);
        
            if (!command) return;
        
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command! Please let Eric | ZSE | TPC76 know ASAP so that a fix can occur!'
                        +'\n \nIf this is the booking or PIREP Command, please un-archive the channel as this is the reason you are getting this error', ephemeral: true });
            }
        })

        Logger.info(`✅ Loaded ${commands.length} Commands`)
    }

    subscribeToVAEvents() {
        const self = this;

        const events = readdirSync(path.join(__dirname, 'va-events')).filter(file => {
            const includes = Object.keys(self.Config.VAEvents.channels).includes(file.split('.')[0]);
            return (includes) ? file : false;
        });

        for (const file of events) {
            const event = require(path.join(__dirname, 'va-events', file));
            Logger.debug(`Will subscribe to event: ${event.name}`);
            self.VAEvents.subscribe(event.name, (err, count) => event.subscribe(event.name, err, count, self))
            .then(function (count) {
                self.VAEvents.Subscriber.on('message', (channel, msg) => {
                    try {
                        msg = JSON.parse(msg);
                    } catch (e) {
                    }

                    event.execute(channel, msg, self);
                });
            })
            .catch(function (err) {
                Logger.error(`Error subscribing to VAEvents channel: ${err}`);
            });
        }
        
        Logger.info(`✅ Loaded ${events.length} VA Events`)

    }

    getChannelId(channelName) {
        if (!channelName) return;
        const channelId = this.Config.VAEvents.channels[channelName];

        if (!channelId) return;

        return channelId;
    }

    login() {
        Logger.debug('Logging into the discord server')
        this.Client.login(this.AppToken)
    }

    scheduleCrons() {
        const self = this;

        if (this.Config.poll.VADetails === true) {
            Logger.info(`✅ Polling for VA Details is enabled, will poll every 5 minutes`);
            // run va refresh every 5 minutes
            cron.schedule('*/5 * * * *', self.refreshVADetails);
        }

        if (this.Config.poll.VANotifications == true) {
            setTimeout(() => {
                self.refreshVANotifications();
            }, 3000);
            Logger.info(`✅ Polling for VA Notifications is enabled, will poll every minute`);
            // run notifications check every minute
            cron.schedule('* * * * *', self.refreshVANotifications);
        }
    }

    async refreshVADetails() {
        Logger.debug(`Refreshing VA Details`);
        await this.OnAir.refreshVADetails();
    }

    async refreshVANotifications() {
        Logger.debug(`Polling for VA Notifications`);
        await this.OnAir.refreshVANotifications();
        
        // if (notifications.length > 0) {
        //     const channel = await this.Client.channels.fetch(this.getChannelId('onair-notifications'));
        //     const msg = require('./messages/Notification')(notifications)

        //     channel.send(msg);
        // }
    }

    async deployCommands() {
        const commands = [];
        const commandFiles = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
            Logger.debug(`Will deploy command: ${command.data.name}`)
        }
        
        const rest = new REST({ version: '10' }).setToken(this.AppToken);
        

        try {
            Logger.debug('Started reloading slash commands.');
    
            await rest.put(
                Routes.applicationGuildCommands(this.ClientId, this.GuildId),
                { body: commands },
            );
    
            Logger.info('✅ Reloaded slash commands.');
        } catch (error) {
            Logger.error(error);
        }
    }
}


module.exports = Bot