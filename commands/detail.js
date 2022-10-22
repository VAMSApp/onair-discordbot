const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const VADetail = require('../messages/VADetail')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('detail')
	.setDescription('OnAir VA detail'),    
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        let msg = ''

        await interaction.deferReply({ ephemeral: true });
    
        const x = await OnAir.getVADetail();
        if (!x) msg = 'No VA found'

        if (x) {
            msg += `\n${VADetail(x)}`
        }

        await interaction.editReply({ content: msg, ephemeral: true });
	}
}