const { SlashCommandBuilder, InteractionResponse, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies with a list of available commands'),
	async execute(interaction) {
        let msg = ''

        const commands = interaction.client.commands.map(c => {
            const data = c.data.toJSON()
            return {
                name: data.name,
                description: data.description,
            }
        })

        if (commands.length <= 0) {
            msg = '\`\`\`\nNo commands available\`\`\`\n'
            await interaction.editReply({ content: msg, ephemeral: true });
        }

        msg += `**Available Commands**\n`
        msg += `\`\`\`\n`

        commands.forEach(({ name, description }) => {
            msg += `/${name} - ${description}\n`
        })
        msg += `\`\`\`\n`
        await interaction.editReply({ content: msg, ephemeral: true });
	}
}