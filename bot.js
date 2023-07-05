const Logger = require('@lib/logger.js')
const cron = require('node-cron');
const cronstrue = require('cronstrue');

const {
    Client, REST, EmbedBuilder, SlashCommandBuilder, Collection, GatewayIntentBits
} = require('discord.js')
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
const path = require('path')
const Config = require('./config');
const IORedis = require('ioredis');
const OnAirApi = require('./lib/onair');

class Bot {
    Config = Config;
    AppToken = Config.discord_token;
    ClientId = Config.discord_clientId;
    GuildId = Config.discord_guildId;
    ChannelId = Config.discord_channelId;
    OnAir = OnAirApi;
    Client = undefined;
    VAEvents = undefined;
    Cron = undefined;
    Schedules = undefined;

    constructor() {
        if (!this.AppToken) throw 'No discord_token defined in .env'
        if (!this.ClientId) throw 'No discord_clientId defined in .env'
        if (!this.GuildId) throw 'No discord_guildId defined in .env'

        this.initializeClient = this.initializeClient.bind(this);
        this.loadCommands = this.loadCommands.bind(this);
        this.login = this.login.bind(this);
        this.deployCommands = this.deployCommands.bind(this);
        this.getChannelId = this.getChannelId.bind(this);
        
        Logger.debug('Bot::constructor - starting up Discord Bot')
            
        if (this.Config.VAEvents.enabled) {
            this.VAEvents = require('./lib/EventService');
            this.Cron = cron;
            this.loadSchedules = this.loadSchedules.bind(this);
            this.loadVAEvents = this.loadVAEvents.bind(this);
            this.loadVAEvents();                
            
            this.loadSchedules();
        }

        this.initializeClient();
        this.loadCommands()

        this.deployCommands()
        this.login()

        this.Client.on('ready', async (client) => {
            const discordServerName = client.guilds.cache.map(g => g.name).join('\n')
            Logger.info(`Logged into the ${discordServerName} discord server as ${client.user.tag}`);
        
            if (this.Config.OnConnectNotice === true) {
                const readyMsg = require('./messages/onReadyMessage')()
                
                client
                .channels
                .fetch(this.getChannelId('OnConnectNoticeChannel'))
                .then((channel) => channel.send(readyMsg).then((msg) => (this.Config.OnConnectNoticeAutoDelete === true) ? setTimeout(() => msg.delete(), this.Config.onConnectNoticeAutoDeleteAfter || 10000) : null ));
                
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

        Logger.info(`✅ Loaded ${commands.length} slash commands`)
    }

    loadVAEvents() {
        const self = this;

        const events = readdirSync(path.join(__dirname, 'va-events')).filter(file => {
            const includes = Object.keys(self.Config.VAEvents.channels).includes(file.split('.')[0]);
            return (includes) ? file : false;
        });

        for (const file of events) {
            const event = require(path.join(__dirname, 'va-events', file));
            Logger.debug(`Will subscribe to event: ${event.name}`);
            // self.VAEvents.subscribe(event.name, (err, count) => async event.subscribe(event.name, err, count, self))

            self.VAEvents.subscribe(event.name, async (err, count) => {
                if (!channel) return;
                if (err) return;
                Logger.info(`Subscribed to the '${channel}' VA Event`);
                return count;
            })
            .then((count) => self.VAEvents.Subscriber.on('message', (channel, msg) => event.execute(channel, msg, self)))
            .catch(function (err) {
                Logger.error(`⚠️ Error subscribing to the ${event.name} VAEvents channel - ${err}`);
            });
        }
        
        Logger.info(`✅ Subscribed to ${events.length} VA Event${(events.length > 1) ? 's' : ''}`)

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

    loadSchedules() {
        const self = this;
        const {
            VAEvents
        } = self.Config;

        const enabledScheduleKeys = Object.keys(VAEvents.poll).filter((k) => (VAEvents.poll[k].enabled === true));

        if (enabledScheduleKeys.length === 0 || !enabledScheduleKeys) return;

        // read all files in the 'schedules' directory
        const schedules = readdirSync(path.join(__dirname, 'schedules')).filter(file => {
            const isEnabled = enabledScheduleKeys.includes(file.split('.')[0]);
            return (isEnabled) ? file : false;
        });

        if (schedules.length === 0 || !schedules) {
            Logger.debug(`No schedules found in the 'schedules' directory`);
            return; 
        }

        // loop through all of the schedules and load them
        for (const file of schedules) {
            const schedule = require(path.join(__dirname, 'schedules', file));
            if (!schedule) continue;
            const taskName = file.split('.')[0];

            const pollCfg = VAEvents.poll[taskName]; // the schedule config
            if (!pollCfg || !pollCfg.cron) continue;

            if (!cron.validate(pollCfg.cron)) {
                Logger.error(`⚠️ Invalid cron expression for '${file}'`);
                continue;
            }

            cron.schedule(pollCfg.cron, () => schedule.execute(self), schedule.opts);
            Logger.info(`✅ Scheduled::${taskName} - Will ${schedule.name} ${cronstrue.toString(pollCfg.cron)}`);
        }

        Logger.info(`✅ Scheduled ${enabledScheduleKeys.length} Tasks`);
    }

    // scheduleCrons() {
    //     const self = this;
        
    //     const enabledPolls = Object.keys(cfg.poll).filter((key) => (cfg.poll[key].enabled));
    //     if (enabledPolls.length === 0) return;

    //     enabledPolls.forEach((key) => {
    //         const pollCfg = cfg.poll[key];

    //         if (pollCfg.cron !== undefined) {
    //             if (!cron.validate(pollCfg.cron)) return;
    //             Logger.info(`✅ Polling for ${key} is enabled and will run ${cronstrue.toString(pollCfg.cron)}`);

    //         } else if (pollCfg.interval !== undefined) {
    //             const interval = (typeof pollCfg.interval !== 'number') ? parseInt(pollCfg.interval) : pollCfg.interval;
    //             setInterval(() => {

    //             })
    //         }

    //         Logger.info(`✅ Polling for VA Details is enabled, will poll every 5 minutes`);
    //         // run va refresh every 5 minutes
    //         cron.schedule('*/5 * * * *', self.refreshVADetails);
    //     }


    //     if (this.Config.poll.VANotifications.enabled == true) {

    //         setTimeout(() => {
    //             self.refreshVANotifications();
    //         }, 3000);

    //         Logger.info(`✅ Polling for VA Notifications is enabled, will poll every minute`);
    //         // run notifications check every minute
    //         cron.schedule('* * * * *', self.refreshVANotifications);
    //     }
    // }

    // async refreshVADetails() {
    //     Logger.debug(`Refreshing VA Details`);
    //     await this.OnAir.refreshVADetails();
    // }

    // async refreshVANotifications() {
    //     Logger.debug(`Polling for VA Notifications`);
    //     await this.OnAir.refreshVANotifications();
        
    //     // if (notifications.length > 0) {
    //     //     const channel = await this.Client.channels.fetch(this.getChannelId('onair-notifications'));
    //     //     const msg = require('./messages/Notification')(notifications)

    //     //     channel.send(msg);
    //     // }
    // }

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