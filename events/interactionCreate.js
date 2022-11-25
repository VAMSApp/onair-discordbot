const Logger = require('../lib/logger')
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                Logger.info(`Executing command /${interaction.commandName} for ${interaction.user.tag}`);
                await interaction.deferReply({ ephemeral: true });
                
                await command.execute(interaction);
                Logger.info(`Executed command /${interaction.commandName} for ${interaction.user.tag}`);
            } catch (error) {
                if (error) {
                    console.error(`Error executing command /${interaction.commandName} for ${interaction.user.tag}`, error);

                    // await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }
    },
};
