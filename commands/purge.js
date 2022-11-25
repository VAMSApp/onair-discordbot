const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('@lib/onair')
const FleetList = require('@messages/FleetList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('purge')
	.setDescription('Purge an amount of messages')
    .addIntegerOption(option => {// add a integer option which only allows users to type a number
        return option
        .setName('amount')
        .setDescription('Amount of messages to delete')
        .setRequired(true)
    }),
    async execute(interaction) {
        if (!interaction.member.permisions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        if (interaction.guild.me.permisions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'I do not have permission to manage messages', ephemeral: true });

        const amount = interaction.options.getInteger('amount');

        if (isNaN(amount)) {
            return interaction.reply({ content: 'Please enter a valid number', ephemeral: true });
        }

        if (parseInt(amount) > 100) return interaction.reply({ content: 'You can only delete up to 100 messages at a time', ephemeral: true });

        await interaction.channel.bulkDelete(parseInt(amount) + 1, true)
        .catch(async (err) => {
            console.error(err);
            await interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
        });


    }
}