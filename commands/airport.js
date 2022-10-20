const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildAirportDetail = require('../messages/buildAirportDetail')

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
        const icao = interaction.options.getString('icao')
        const x = await OnAir.getAirport(icao);
        if (!x) return false

        const msg = buildAirportDetail(x)

        return await interaction.reply(msg);
	}
}