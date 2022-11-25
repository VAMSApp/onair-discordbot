const { SlashCommandBuilder } = require('discord.js')
const OnAir = require('../lib/onair')
const JobsList = require('../messages/JobsList')

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
        if (!interaction.isChatInputCommand()) return;
        const page = interaction.options.getInteger('page') || 1;
        const size = interaction.options.getInteger('size') || 5;

        let msg = ''

        

        let x = await OnAir.getVAJobs()
        if (!x) msg = 'No fleet found'

        if (x) {
            msg = 'There '

            if (x.length <= 0) {
                msg += 'are no VA Jobs yet'
            } else if (x.length == 1) {
                msg += `is ${x.length} pending VA Job`
            } else {
                msg += `are ${x.length} pending VA Jobs`
            }

            msg += `\n\nShowing page ${page} of ${Math.ceil(x.length / size)}`

            if (size) {
                if (size && size.length > 5) {
                    size = 5
                }
            }

            const slicedX = x.slice((page - 1) * size, page * size)
            
            const jobsList = JobsList(slicedX)
            msg += `\n${jobsList}`
        }
        
        await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
	}
}