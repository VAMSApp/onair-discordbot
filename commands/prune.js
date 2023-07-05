const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('prune')
	.setDescription('Prunes messages from the channel the call was ran in')
    .addNumberOption(option =>
        option.setName('amount')
            .setDescription('How many messages to prune, defaults to all messages')
            .setMaxValue(500)
            .setRequired(false)
    )
    .addBooleanOption(option =>
        option.setName('pruneoldmessages')
            .setDescription('Prune messages older than 14 days')
            .setRequired(false)
    )        
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const amount = interaction.options.getNumber('amount');
        const pruneOldMessages = interaction.options.getBoolean('pruneoldmessages') || false;
        await interaction.deferReply({ ephemeral: true })
        let msg = ''
        let fetchParams;
        // Fetch x messages from the channel the command was called in
        if (amount) {
            fetchParams = {
                limit: amount,
            }
        }

        const fetched = await interaction.channel.messages.fetch(fetchParams);
        const fetchedSize = fetched.size;

        if (fetchedSize === 0) {
            msg = 'No messages found';
            await interaction.editReply({ content: msg, ephemeral: true });
            return;
        }

        // Delete the fetched messages
        await interaction.channel.bulkDelete(fetched, pruneOldMessages)
        .then(() => {
            msg = `Deleted ${fetchedSize} messages`;
        })
        .catch(error => {
            msg = `Couldn't delete messages because of: ${error}`;
        });

        // If there was an error, send the error message
        if (msg) {
            await interaction.editReply({ content: msg, ephemeral: true });
        }
	}
}