const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildCompanyDetail = require('../messages/CompanyDetail')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('detail')
	.setDescription('OnAir company detail'),    
	async execute(interaction) {
        let msg = ''
        const x = await OnAir.getCompanyDetail();
        if (!x) msg = 'No Company found'

        if (x) {
            msg += `\n${buildCompanyDetail(x)}`
        }

        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}