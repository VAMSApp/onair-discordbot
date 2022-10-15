const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildFleetList = require('../messages/FleetList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('vafleet')
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
        const page = interaction.options.getInteger('page') || 1;
        const size = interaction.options.getInteger('size') || 10;

        let x = await OnAir.getVAFleet()

		let msg = 'There '

        if (x.length <= 0) {
            msg += 'are no aircraft in the VA fleet yet'
        } else if (x.length == 1) {
            msg += `is ${x.length} aircraft currently in the VA fleet`
        } else {
            msg += `are ${x.length} aircraft currently in the VA fleet`
        }

        msg += `\nShowing page ${page} of ${Math.ceil(x.length / size)}`

        if (size) {
            if (size && size.length > 10) {
                size = 10
            }
        }

        const slicedX = x.slice((page - 1) * size, page * size)

        if (x.length > 0) {
            const fleetList = buildFleetList(slicedX)
            msg += `\n${fleetList}`
        }
        
        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}