const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all of my commands or info about a specific command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command you want info about.')
                .setRequired(false)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command');

        if (commandName) {
            const command = interaction.client.commands.get(commandName)
                || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                return interaction.reply({ content: 'That\'s not a valid command!', ephemeral: true });
            }

            const data = [];

            if (command.name) data.push(`**Name:** ${command.name}`);
            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${interaction.client.prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

            interaction.reply({ content: data.join('\n'), ephemeral: true });
        } else {
            const data = [];
            data.push('Here\'s a list of all my commands:');
            data.push(interaction.client.commands.map(command => command.name).join(', '));
            interaction.reply({ content: data.join('\n'), ephemeral: true });
        }
    },
};