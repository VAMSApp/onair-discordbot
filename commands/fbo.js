const { SlashCommandBuilder } = require('discord.js');
const OnAir = require('../lib/onair')
const FBODetail = require('../messages/FBODetail')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('fbo')
	.setDescription('Replies with the OnAir VA owned FBO\'s')
    .addIntegerOption(option =>
		option.setName('page')
			.setDescription('What page of the FBO list to show')
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
		option.setName('icao')
			.setDescription('Airport ICAO')
    ),
    
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const page = interaction.options.getInteger('page') || 1;
        const size = interaction.options.getInteger('size') || 5;
        const icao = interaction.options.getString('icao');
        let msg = ''

        await interaction.deferReply({ ephemeral: true });

        let x = await OnAir.getVAFbos();

        if (!x) msg = 'No FBO\'s found'

        if (x) {
            if (icao) {
                x = x.filter(fbo => fbo.Airport.ICAO === icao.toUpperCase())
            }
            
            msg = 'There '

            if (x.length <= 0) {
                msg += 'are no VA owned FBO\'s yet'
            } else if (x.length == 1) {
                msg += `is ${x.length} VA owned FBO`
            } else {
                msg += `are ${x.length} VA owned FBO's`
            }

            msg += `\nShowing page ${page} of ${Math.ceil(x.length / size)}`

            if (size) {
                if (size && size.length > 5) {
                    size = 5
                }
            }
            
            const slicedX = x.slice((page - 1) * size, page * size)

            const fboList = FBODetail(slicedX)
            msg += `\n${fboList}`
        }

        await interaction.editReply({ content: `\`\`\`\n${msg}\`\`\``, ephemeral: true });
	}
}