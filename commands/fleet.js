const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const buildFleetList = require('../messages/FleetList')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('fleet')
	.setDescription('Replies with the OnAir Company or VA\'s fleet'),
	async execute(interaction) {
        let oaFleet = await OnAir.getFleet()

		let msg = 'There '

        if (oaFleet.length <= 0) {
            msg += 'are no aircraft in the fleet yet'
        } else if (oaFleet.length == 1) {
            msg += `is ${oaFleet.length} aircraft currently in the fleet`
        } else {
            msg += `are ${oaFleet.length} aircraft currently in the fleet`
        }

        if (oaFleet.length > 0) {
            const fleetList = buildFleetList(oaFleet)
            msg += `\n${fleetList}`
        }

        await interaction.reply(`\`\`\`\n${msg}\`\`\``);
	}
}