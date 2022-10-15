const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildMemberList = require('../messages/MemberList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('vamembers')
	.setDescription('Replies with the OnAir VA\'s members'),
	async execute(interaction) {
        let x = await OnAir.getVAMembers()

		let msg = `There `

        if (x.length <= 0) {
            msg += 'are no members yet'
        } else if (x.length == 1) {
            msg += `is ${x.length} member`
        } else {
            msg += `are ${x.length} members`
        }

        if (x.length > 0) {
            const flightList = buildMemberList(x)
            msg += `\n${flightList}`
        }
        
        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}