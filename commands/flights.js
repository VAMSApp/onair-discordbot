const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const FlightsList = require('../messages/FlightsList')


module.exports = {
	data: new SlashCommandBuilder()
	.setName('flights')
	.setDescription('Replies with the OnAir VA\'s current flights')
    .addIntegerOption(option =>
		option.setName('page')
			.setDescription('What page of the flights list to show')
            .setRequired(false)
    )
    .addIntegerOption(option =>
		option.setName('size')
			.setDescription('How many results to show, maximum of 10')
            .setMaxValue(10)
            .setMinValue(1)
            .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('aircraftcode')
            .setDescription('Filter by aircraft ICAO')
            .setMinLength(1)
            .setMaxLength(6)
            .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('companycode')
            .setDescription('Filter by company ICAO')
            .setMinLength(1)
            .setMaxLength(6)
            .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('sortby')
            .setDescription('How to sort the results')
            .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('sortorder')
            .setDescription('What order to sort the results')
            .setRequired(false)
    )
    .addBooleanOption(option =>
        option.setName('showcompleted')
            .setDescription('Show completed flights')
            .setRequired(false)
    ),
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const page = interaction.options.getInteger('page') || 1;
        const size = interaction.options.getInteger('size') || 5;
        const aircraftCode = interaction.options.getString('aircraftcode') || null;
        const companyCode = interaction.options.getString('companycode') || null;
        const sortBy = interaction.options.getString('sortby') || 'StartTime';
        const sortOrder = interaction.options.getString('sortorder') || 'desc';
        const showcompleted = interaction.options.getBoolean('showcompleted') || false;

        let msg = ''

        await interaction.deferReply({ ephemeral: true });
        
        let x = await OnAir.getVAFlights({
            filter: {
                aircraftCode: aircraftCode,
                companyCode: companyCode,
                showcompleted: showcompleted,
            },
            sortBy: sortBy,
            sortOrder: sortOrder,
        })

        if (!x) msg = 'No flights found'

        if (x) {

            if (size) {
                if (size && size.length > 5) {
                    size = 5
                }
            }

            const slicedX = x.slice((page - 1) * size, page * size)

            msg = 'There '

            msg = `There ${(x.length > 1 ) ? 'are' : 'is'} currently ${x.length} ${(!showcompleted) ? 'Active' : ''} flight${(x.length > 1 ) ? 's' : ''} in the VA flight Log`

            msg += `\nSorting by ${sortBy} in ${sortOrder} order`
            msg += `\n\nShowing page ${page} of ${Math.ceil(x.length / size)}`

            const flightsList = FlightsList(slicedX)
            msg += `\n${flightsList}`
        }

        await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
	}
}