const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildFlightsList = require('../messages/FlightsList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('flights2')
	.setDescription('Replies with the OnAir VA\'s pending/current flights'),
	async execute(interaction) {
        let x = await OnAir.getFlights()

		let msg = `There `

        if (x.length <= 0) {
            msg += 'are no flights yet'
        } else if (x.length == 1) {
            msg += `is ${x.length} Flight`
        } else {
            msg += `are ${x.length} Flights`
        }

        if (x.length > 0) {

            const flightList = buildFlightsList(x.slice(0,1))
            msg += `\n${flightList}`
        }
        
        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}