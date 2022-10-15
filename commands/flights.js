const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildFlightsList = require('../messages/FlightsList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('flights')
	.setDescription('Replies with the OnAir VA\'s pending or inprogress flights')
    .addIntegerOption(option =>
		option.setName('page')
			.setDescription('What page of the flights list to show')
            .setRequired(false)
    )
    .addIntegerOption(option =>
		option.setName('size')
			.setDescription('How many results to show, maximum of 10')
            .setMaxValue(10)
            .setMinValue(1)
            .setRequired(false)
    ),
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
            // if (x.length > 5) {
            //     x = x.slice(0, 4)
            // }

            const flightList = buildFlightsList(x)
            msg += `\n${flightList}`
        }
        
        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}