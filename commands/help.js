const { SlashCommandBuilder, InteractionResponse, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies with a list of available commands'),
	async execute(interaction) {
        let msg = ''
        await interaction.deferReply({ ephemeral: true });

        const commands = interaction.client.commands.map(c => {
            const data = c.data.toJSON()
            return {
                name: data.name,
                description: data.description,
            }
        })

        if (commands.length <= 0) {
            msg = 'No commands available'
            await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
        }

        msg += `**Available Commands**\n`

        commands.forEach(({ name, description }) => {
            msg += `/${name} - ${description}\n`
        })

        await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
	}
}