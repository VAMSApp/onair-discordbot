const Logger = require('./lib/logger.js')
const {
    Client, REST, EmbedBuilder, SlashCommandBuilder, Routes, Collection, GatewayIntentBits
} = require('discord.js')
const { OnAirApi } = require('onair-api')
const fs = require('fs')
const path = require('path')

readyMsg = `Howdy OnAirTrackerBot here 👋\nOnAir information services are now accessible to this channel.\nType \`/help\` for more information!`

class Bot {
    AppToken;
    ClientId;
    GuildId;
    ChannelId;
    Client = undefined;

    constructor(cfg) {
        if (!cfg) throw 'No .cfg detected'

        const {
            discord_token,
            discord_clientId,
            discord_guildId,
            discord_channelId,
            deployCommands,
        } = cfg

        if (!discord_token) throw 'No Discord App token defined in cfg'
        if (!discord_clientId) throw 'No Discord ClientId defined in cfg'
        if (!discord_guildId) throw 'No Discord guildId defined in cfg'
        if (!discord_channelId) throw 'No Discord channelId defined in cfg'
        
        Logger.info('starting up Discord Bot')

        this.AppToken = discord_token
        this.ClientId = discord_clientId
        this.GuildId = discord_guildId
        this.ChannelId = discord_channelId

        this.initializeClient()
        
        if (deployCommands === 'true') {
            this.deployCommands()
        }

        this.login()

        this.Client.on('ready', async (client) => {
            Logger.info(`Logged into discord server as ${client.user.tag}`)
            client.channels.fetch(this.ChannelId).then((channel) => channel.send(readyMsg))
        });

        
        this.Client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
        
            const command = interaction.client.commands.get(interaction.commandName);
        
            if (!command) return;
        
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply('There was an error while executing this command!');
            }
        });
    }

    initializeClient () {
        if (!this.Client) this.Client = new Client({ intents: [GatewayIntentBits.Guilds] })
        this.Client.commands = new Collection();

        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection
            // With the key as the command name and the value as the exported module
            this.Client.commands.set(command.data.name, command);
        }
    }

    login() {
        this.initializeClient()
        Logger.info('Logging into the discord server')
        this.Client.login(this.AppToken)
    }

    deployCommands() {
        const commands = []
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }

        /**
        const commands = [
            new SlashCommandBuilder().setName('members').setDescription('Replies with the members of the OnAir VA'),
            new SlashCommandBuilder().setName('flights').setDescription('Replies with the currently active OnAir VA flights'),
            new SlashCommandBuilder().setName('jobs').setDescription('Replies with the currently pending OnAir VA Jobs'),
            new SlashCommandBuilder().setName('fleet').setDescription('Replies with the VA\'s fleet'),
        ].map(command => command.toJSON());
         */
        const rest = new REST({ version: '10' }).setToken(this.AppToken);

        rest.put(Routes.applicationGuildCommands(this.ClientId, this.GuildId), { body: commands })
            .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
            .catch(console.error);
    }
}


module.exports = Bot