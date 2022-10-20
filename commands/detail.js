const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildVADetail = require('../messages/buildVADetail')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('detail')
	.setDescription('OnAir VA detail'),    
	async execute(interaction) {
        let msg = ''
        const x = await OnAir.getVADetail();
        if (!x) msg = 'No VA found'

        if (x) {
            msg += `\n${buildVADetail(x)}`
        }

        return await interaction.reply(msg);
	}
}