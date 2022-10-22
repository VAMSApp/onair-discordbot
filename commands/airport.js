const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const AirportDetail = require('../messages/AirportDetail')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('airport')
	.setDescription('Replies with the OnAir details for a given airport')
    .addStringOption(option =>
		option.setName('icao')
			.setDescription('Airport ICAO')
            .setRequired(true)
    ),
    
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const icao = interaction.options.getString('icao')
        let msg = ''

        await interaction.deferReply({ ephemeral: true });

        const x = await OnAir.getAirport(icao);

        if (!x) msg = 'No airport found'

        if (x) {
            msg = `\n${AirportDetail(x)}`
        }

        await interaction.editReply({ content: msg, ephemeral: true });
	}
}