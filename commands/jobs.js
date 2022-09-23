const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const { buildJobsList } = require('../lib/messageBuilder')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('jobs')
	.setDescription('Replies with the OnAir Company or VA\'s fleet'),
	async execute(interaction) {
        const oaJobs = await OnAir.getJobs();
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
	}
}