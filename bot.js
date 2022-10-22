const Logger = require('./lib/logger.js')
const {
    Client, REST, EmbedBuilder, SlashCommandBuilder, Collection, GatewayIntentBits
} = require('discord.js')
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
const path = require('path')
const Config = require('./config');

class Bot {
    AppToken = process.env.discord_token;
    ClientId = process.env.discord_clientId;
    GuildId = process.env.discord_guildId;
    ChannelId = process.env.discord_channelId;
    Client = undefined;
    Config = Config;

    constructor() {
        if (!this.AppToken) throw 'No discord_token defined in .env'
        if (!this.ClientId) throw 'No discord_clientId defined in .env'
        if (!this.GuildId) throw 'No discord_guildId defined in .env'
        if (!this.ChannelId) throw 'No discord_channelId defined in .env'
        
        Logger.info('starting up Discord Bot')


        this.initializeClient()
        this.loadCommands()
        this.loadEvents()
        this.deployCommands()
        
        this.login()

        this.Client.on('ready', async (client) => {
            Logger.info(`Logged into discord server as ${client.user.tag}`)
            
            if (this.Config.OnConnectNotice === true) {
                const readyMsg = require('./messages/onReadyMessage')()
                
                client.channels.fetch(this.ChannelId).then((channel) => channel.send(readyMsg))
            }   
        });

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