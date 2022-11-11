const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const OnAir = require('../lib/onair')
const MemberList = require('../messages/MemberList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('prune')
	.setDescription('Prunes the bot\'s messages'),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
           return await interaction.editReply({ content: 'Hmm, I don\'t have permissions to manage messages', ephemeral: true });
        }
        
        const messages = await interaction.channel.messages.fetch();
        const botMessages = messages.filter(m => m.author.id === interaction.client.user.id);
        await interaction.channel.bulkDelete(botMessages);
        await interaction.editReply({ content: 'Pruned bot messages', ephemeral: true });
    }
}