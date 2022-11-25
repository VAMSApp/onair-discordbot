const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('@lib/onair')
const FleetList = require('@messages/FleetList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('fleet-old')
	.setDescription('Replies with the OnAir fleet')
    .addIntegerOption(option =>
		option.setName('page')
			.setDescription('What page of the fleet list to show')
            .setRequired(false)
    )
    .addIntegerOption(option =>
		option.setName('size')
			.setDescription('How many results to show, maximum of 10')
            .setMaxValue(10)
            .setMinValue(1)
            .setRequired(false)
    ),
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const page = interaction.options.getInteger('page') || 1;
        const size = interaction.options.getInteger('size') || 5;

        let msg = ''
        
        setTimeout(async () => {
            return await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
        }, 1500);
	}
}