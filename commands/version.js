const BuildVersionMessage = require('../messages/Version.js');

const { SlashCommandBuilder, InteractionResponse, } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Replies with current Bot version'),
	async execute(interaction) {
        let msg = BuildVersionMessage();
        
        await interaction.deferReply({ ephemeral: true });

        await interaction.editReply({ content: msg, ephemeral: true });
    }
}