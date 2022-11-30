const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const OnAir = require('../lib/onair');
const AirportDetail = require('../messages/AirportDetail');
const RunwayTable = require('../messages/RunwayTable');
// const AirportDetail = require('../messages/AirportDetail')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('airportdetail')
	.setDescription('Replies with the OnAir details for a given airport')
    .addStringOption(option =>
		option.setName('icao')
			.setDescription('Airport ICAO')
            .setRequired(true)
    ),
    
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const icao = interaction.options.getString('icao')

        let msg = ''
        await interaction.deferReply({ ephemeral: true })

        const x = await OnAir.getAirport(icao);

        if (!x) msg = 'No airport found'

        if (x) {
            // msg = `\n${AirportDetail(x)}`
            const Name = (x.Name) ? x.Name : ''
            const City = (x.City) ? x.City : ''
            const State = (x.State) ? x.State : ''
            const CountryName = (x.CountryName) ? x.CountryName : ''
            const TransitionAltitude = (x.TransitionAltitude) ? x.TransitionAltitude : ''
            const Size = (x.Size) ? x.Size : ''
            const FullLocation = `${City}, ${State}, ${CountryName}`

            const Latitude = (x.Latitude) ? x.Latitude : ''
            const Longitude = (x.Longitude) ? x.Longitude : ''
            const Elevation = (x.Elevation) ? x.Elevation : ''
            let runways =  '\`\`\`';
            runways +=  RunwayTable(x.Runways).toString()
            runways += '\`\`\`';

            const airportDetail = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`[${x.ICAO}] ${Name}`)
                .setDescription(`${FullLocation}`)
                .setImage('https://i.imgur.com/ovYyS59.png')
                .addFields(
                    { name: 'Transition Altitude', value: TransitionAltitude.toString() },
                    { name: 'Size', value: Size.toString() },
                    { name: 'Latitude', value: Latitude.toString(), inline: true },
                    { name: 'Longitude', value: Longitude.toString(), inline: true },
                    { name: 'Elevation', value: Elevation.toString(), inline: true },
                    { name: 'AirNav', value: `[Click Me](https://www.airnav.com/airport/${x.ICAO})`, inline: true },
                    { name: 'AOPA', value: `[Click Me](https://www.aopa.org/destinations/airports/${x.ICAO}/details)`, inline: true },
                    { name: 'SkyVector', value: `[Click Me](https://skyvector.com/airport/${x.ICAO})`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Runway\'s', value: runways},
                )
                .setTimestamp()
                .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

            await interaction.editReply({ embeds: [airportDetail,], ephemeral: true });
        }

	}
}