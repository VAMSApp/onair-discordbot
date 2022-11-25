const Logger = require('@lib/logger.js')
const {
    Client, REST, EmbedBuilder, SlashCommandBuilder, Collection, GatewayIntentBits
} = require('discord.js')
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
const path = require('path')
const Config = require('./config');
const IORedis = require('ioredis');
const EventService = require('./lib/EventService');

class Bot {
    AppToken = Config.discord_token;
    ClientId = Config.discord_clientId;
    GuildId = Config.discord_guildId;
    ChannelId = Config.discord_channelId;
    Client = undefined;
    Config = Config;
    VAEvents = undefined;

    constructor() {
        if (!this.AppToken) throw 'No discord_token defined in .env'
        if (!this.ClientId) throw 'No discord_clientId defined in .env'
        if (!this.GuildId) throw 'No discord_guildId defined in .env'

        Logger.info('starting up Discord Bot')

        // const subscriber = createClient({
        //     host: process.env.REDIS_HOST,
        //     port: Number(process.env.REDIS_PORT),
        //     password: process.env.REDIS_PASSWORD,
        //     database: 1,
        // });

        this.initializeClient();
        this.loadCommands()
        this.loadEvents()

        this.deployCommands()
        this.login()
        const self = this;

        this.Client.on('ready', async (client) => {
            Logger.info(`Logged into discord server as ${client.user.tag}`)
            
            if (self.Config.OnConnectNotice === true) {
                const readyMsg = require('./messages/onReadyMessage')()
                
                client.channels.fetch(self.ChannelId).then((channel) => channel.send(readyMsg))
            }
            
            if (self.Config.VAEvents.enabled) {
                self.VAEvents = EventService.init(Config.redis);
                self.subscribeToVAEvents();
            }
        });

    }

    initializeClient() {
        if (!this.Client) this.Client = new Client({ intents: [GatewayIntentBits.Guilds] })
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
        Logger.info(`✅ Loaded ${commands.length} Commands`)
    }

    loadEvents () {
        const events = readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

        for (const file of events) {
            const event = require(path.join(__dirname, 'events', file));

            Logger.debug(`✅ Loading Event: ${event.name}`);
            this.Client.on(event.name, (...args) => event.execute(...args, this.Client));

            // if (event.once) {
            //     this.Client.once(event.name, (...args) => event.execute(...args, this.Client));
            // } else {
            // }
        }
        
        Logger.info(`✅ Loaded ${events.length} Events`)
    }
 
    connectToVAEventService() {
        const self = this;

        // self.VAEvents.subscribe('discord', (err, count) => {
        //     if (err) return (`Error subscribing to VAEvents channel: ${err}`);
        //     Logger.info(`Subscribed to 'discord' VAEvents`);

        //     return count;
        // });

        // self.VAEvents.subscribe('auth-signup', (err, count) => {
        //     if (err) return (`Error subscribing to VAEvents channel: ${err}`);
        //     Logger.info(`Subscribed to 'discord' VAEvents`);

        //     return count;
        // });

        self.VAEvents.subscriber.on('message', (channelName, message) => {
            if (!channelName) return;
            if (!message) return;

            Logger.debug(`Received VA Event '${channelName}', msg: ${message}`);
            self.Client.channels.fetch(self.getChannelId(channelName)).then((channel) => channel.send(message))
            this.Client.on(event.name, (...args) => event.execute(...args, this.Client));


        });
        
    }

    subscribeToVAEvents() {
        const self = this;
        const events = readdirSync(path.join(__dirname, 'va-events')).filter(file => file.endsWith('.js'));

        for (const file of events) {
            const event = require(path.join(__dirname, 'va-events', file));
            Logger.debug(`✅ Loading VA Event: ${event.name}`);

            self.VAEvents.subscribe(event.name, (err, count) => event.subscribe(event.name, err, count, self))
            .then(function (count) {
                self.VAEvents.subscriber.on('message', (channel, msg) => event.execute(channel, msg, self));
            })
            .catch(function (err) {
                Logger.error(`Error subscribing to VAEvents channel: ${err}`);
            });
        }
        
        Logger.info(`✅ Loaded ${events.length} Events`)

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