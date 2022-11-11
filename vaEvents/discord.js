const Logger = require('@lib/logger')
const Config = require('@config')

module.exports = {
    name: 'discord',
    async execute (interaction, { msg, channelId, channelName }, client) {
        Logger.debug(`Received VA Event '${channelName}', msg: ${msg}`)
        client.channels.fetch(channelId).then((channel) => channel.send(msg))
    }
}