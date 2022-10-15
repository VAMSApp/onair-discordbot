const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildFleetList = require('../messages/FleetList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('fleet')
	.setDescription('Replies with the OnAir VA\'s fleet')
    .addIntegerOption(option =>
		option.setName('page')
			.setDescription('What page of the fleet list to show')
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
        let oaFleet = await OnAir.getFleet()

		let msg = 'There '

        if (oaFleet.length <= 0) {
            msg += 'are no aircraft in the VA fleet yet'
        } else if (oaFleet.length == 1) {
            msg += `is ${oaFleet.length} aircraft currently in the VA fleet`
        } else {
            msg += `are ${oaFleet.length} aircraft currently in the VA fleet`
        }

        if (oaFleet.length > 0) {
            const fleetList = buildFleetList(oaFleet)
            msg += `\n${fleetList}`
        }

        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}