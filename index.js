// Require the necessary discord.js classes
import * as dotenv from 'dotenv' 
import Logger from './lib/logger.js'
import { Client as DiscordClient, REST, EmbedBuilder, SlashCommandBuilder, Routes, GatewayIntentBits } from 'discord.js'
import { OnAirApi } from 'onair-api'
import { buildFleetList, buildFlightsList, buildJobsList, buildMembersList, } from './lib/messageBuilder.js';

class Bot {
    AppToken;
    ClientId;
    GuildId;
    ChannelId;
    Client = undefined;
    OnAir = undefined;
    OnAirCompanyId = undefined;
    OnAirVAId = undefined;
    OnAirApiKey = undefined;

    constructor() {
        const env = dotenv.config()
        if (!env || !env.parsed) throw 'No .env detected'

        const {
            discord_token,
            discord_clientId,
            discord_guildId,
            onAirCompanyId,
            discord_channelId,
            onAirVAId,
            onAirApiKey,
            deployCommands,
        } = env.parsed

        if (!discord_token) throw 'No Discord App token defined in .env'
        if (!discord_clientId) throw 'No Discord ClientId defined in .env'
        if (!discord_guildId) throw 'No Discord guildId defined in .env'
        if (!discord_channelId) throw 'No Discord channelId defined in .env'
        if (!onAirCompanyId) throw 'No OnAir Company ID defined in .env'
        if (!onAirVAId) throw 'No OnAir VA ID defined in .env'
        if (!onAirApiKey) throw 'No OnAir Api Key defined in .env'
        
        Logger.info('starting up Discord Bot')

        this.AppToken = discord_token
        this.ClientId = discord_clientId
        this.GuildId = discord_guildId
        this.ChannelId = discord_channelId
        this.OnAirCompanyId = onAirCompanyId
        this.OnAirVAId = onAirVAId
        this.OnAirApiKey = onAirApiKey

        this.OnAir = new OnAirApi({
            apiKey: this.OnAirApiKey,
            companyId: this.OnAirVAId,
            vaId: this.OnAirVAId,
        })

        this.initializeClient()
        
        if (deployCommands === 'true') {
            this.deployCommands()
        }

        this.login()

        this.Client.on('ready', async (client) => {
            Logger.info(`Logged into discord server as ${client.user.tag}`)
            client.channels.fetch(this.ChannelId).then((channel) => channel.send('Hello, OnAir tracking bot here. I\'ve started tracking the OnAir company {company.identifier}'))
        });

        this.Client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
        
            const { commandName } = interaction;
        
            if (commandName === 'members') {
                let oaMembers = await this.OnAir.getVirtualAirlineMembers();
                let msg = 'There '

                if (oaMembers.length > 0) {
                    const membersList = buildMembersList(oaMembers)
                    msg += `\n${membersList}`
                }

                await interaction.reply(`\`\`\`\n${msg}\`\`\``);
            } else if (commandName === 'flights') {
                let oaFlights = await this.OnAir.getCompanyFlights();
                let msg = 'There '

                if (oaFlights.length > 0) {
                    oaFlights = oaFlights.filter((f) => !(f.StartTime && (f.ArrivalIntendedAirport.ICAO || f.ArrivalActualAirport?.ICAO)))
                }

                console.log(oaFlights)
                if (oaFlights.length <= 0) {
                    msg += 'are no in-progress flights'
                } else if (oaFlights.length == 1) {
                    msg += `is ${oaFlights.length} in-progress flight`
                } else {
                    msg += `are ${oaFlights.length} in-progress flights`
                }

                if (oaFlights.length > 0) {
                    const flightsList = buildFlightsList(oaFlights)
                    msg += `\n${flightsList}`
                }

                await interaction.reply(`\`\`\`\n${msg}\`\`\``);
            } else if (commandName === 'jobs') {
                const oaJobs = await this.OnAir.getCompanyJobs();
                let msg = 'There '

                if (oaJobs.length <= 0) {
                    msg += 'are no pending jobs'
                } else if (oaJobs.length == 1) {
                    msg += `is ${oaJobs.length} pending job`
                } else {
                    msg += `are ${oaJobs.length} pending jobs`
                }

                if (oaJobs.length > 0) {
                    const jobList = buildJobsList(oaJobs)
                    msg += `\n${jobList}`
                }

                await interaction.reply(`\`\`\`\n${msg}\`\`\``);

            } else if (commandName === 'fleet') {
                const oaFleet = await this.OnAir.getCompanyFleet();
                let msg = 'There '

                if (oaFleet.length <= 0) {
                    msg += 'are no aircraft in the fleet yet'
                } else if (oaFleet.length == 1) {
                    msg += `is ${oaFleet.length} aircraft currently in the fleet`
                } else {
                    msg += `are ${oaFleet.length} aircraft currently in the fleet`
                }

                if (oaFleet.length > 0) {
                    const fleetList = buildFleetList(oaFleet)
                    msg += `\n${fleetList}`
                }

                await interaction.reply(`\`\`\`\n${msg}\`\`\``);
            }
        });
    }

    initializeClient () {
        if (!this.Client) this.Client = new DiscordClient({ intents: [GatewayIntentBits.Guilds] })
    }

    login() {
        this.initializeClient()
        Logger.info('Logging into the discord server')
        this.Client.login(this.AppToken)
    }

    deployCommands() {
        const commands = [
            new SlashCommandBuilder().setName('members').setDescription('Replies with the members of the OnAir VA'),
            new SlashCommandBuilder().setName('flights').setDescription('Replies with the currently active OnAir VA flights'),
            new SlashCommandBuilder().setName('jobs').setDescription('Replies with the currently pending OnAir VA Jobs'),
            new SlashCommandBuilder().setName('fleet').setDescription('Replies with the VA\'s fleet'),
        ].map(command => command.toJSON());
        
        const rest = new REST({ version: '10' }).setToken(this.AppToken);

        rest.put(Routes.applicationGuildCommands(this.ClientId, this.GuildId), { body: commands })
            .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
            .catch(console.error);
    }
}

export default new Bot()