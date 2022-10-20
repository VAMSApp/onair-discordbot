const { SlashCommandBuilder } = require('discord.js')
const OnAir = require('../lib/onair')
const buildJobsList = require('../messages/buildJobsList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('jobs')
	.setDescription('Replies with the OnAir VA\'s pending jobs')
    .addIntegerOption(option =>
		option.setName('page')
			.setDescription('What page of the job list to show')
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
        const size = interaction.options.getInteger('size') || 5;

        let x = await OnAir.getVAJobs()

		let msg = `There `

        if (x.length <= 0) {
            msg += 'are no VA Jobs yet'
        } else if (x.length == 1) {
            msg += `is ${x.length} pending VA Job`
        } else {
            msg += `are ${x.length} pending VA Jobs`
        }

        msg += `\nShowing page ${page} of ${Math.ceil(x.length / size)}`

        if (size) {
            if (size && size.length > 5) {
                size = 5
            }
        }

        const slicedX = x.slice((page - 1) * size, page * size)
        
        const jobsList = buildJobsList(slicedX)
        msg += `\n${jobsList}`
        
        return await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}