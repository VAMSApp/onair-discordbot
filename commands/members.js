const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const MemberList = require('../messages/MemberList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('members')
	.setDescription('Replies with the OnAir VA members')
    .addStringOption(option =>
        option.setName('sortby')
            .setDescription('How to sort the results')
            .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('sortorder')
            .setDescription('What order to sort the results')
            .setRequired(false)
    ),
    
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const sortBy = interaction.options.getString('sortby') || 'Role';
        const sortOrder = interaction.options.getString('sortorder') || 'desc';
        let msg = ''
        await interaction.deferReply({ ephemeral: true })

        const x = await OnAir.getVAMembers({
            sortBy: sortBy,
            sortOrder: sortOrder,
        });

        if (!x) msg = 'No VA members found'

        if (x) {
            msg = `\n${MemberList(x)}`
        }

        await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
	}
}