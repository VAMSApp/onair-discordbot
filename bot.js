const Logger = require('@lib/logger.js')
const {
    Client, REST, EmbedBuilder, SlashCommandBuilder, Collection, GatewayIntentBits
} = require('discord.js')
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
const path = require('path')
const Config = require('./config');
const EventService = require('@lib/eventService')

class Bot {
    AppToken = Config.discord_token;
    ClientId = Config.discord_clientId;
    GuildId = Config.discord_guildId;
    Client = undefined;
    EventService = EventService;
    Config = Config;

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

        this.initializeClient()
        this.loadCommands()
        this.loadEvents()
        this.loadVAEvents2()
        this.deployCommands()
        
        this.login()
    }

    initializeClient () {
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

    loadVAEvents () {
        this.Client.on('ready', (interaction, channel) => {
            this.EventService.subscribe('auth-signup', (msg, channelName) => {
                Logger.info(`Received message ${msg} on channel ${channelName}`)
                this.Client.channels.fetch(Config.discord_channelId).then((channel) => channel.send(msg))
            });
            
            this.EventService.subscribe('discord', (msg, channelName) => {
                Logger.info(`Received message ${msg} on channel ${channelName}`)
                this.Client.channels.fetch(Config.discord_channelId).then((channel) => channel.send(msg))
            });
        })
        
    }

    loadVAEvents2() {
        const self = this;
        const vaEvents = readdirSync(path.join(__dirname, 'vaEvents')).filter(file => file.endsWith('.js'));
        Logger.info(`✅ Loading ${vaEvents.length} VA Events`)

        for (const file of vaEvents) {
            const event = require(path.join(__dirname, 'vaEvents', file));
            const hasKey = Object.keys(Config.VAEvents).includes(event.name)
            
            if (hasKey) {
                const channelId = Config.VAEvents[event.name]

                this.Client.on('ready', function (...args) {
                    Logger.info(`✅ Loading VA Event: ${event.name}`);
                    self.EventService.subscribe(event.name, (msg, channelName) => event.execute(...args, {msg, channelName, channelId}, self.Client))
                });
            }
        }
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