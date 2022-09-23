const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')

helpMsg = `Commands available:\n  \`/airport\` lists a specific airports details\n  \`/detail\` lists the companies details (level, xp, rep, cash information)\n  \`/fleet\` lists the companies fleet\n  \`/jobs\` lists the current jobs for the company\n`
module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('Lists detailed information about the available commands'),    
	async execute(interaction) {
        let msg = helpMsg

        await interaction.reply(msg)
	}
}