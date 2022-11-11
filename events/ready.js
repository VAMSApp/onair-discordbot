const Logger = require('@lib/logger')
const Config = require('@config')

module.exports = {
    name: 'ready',
    async execute (interaction, client) {
        Logger.info(`Logged into discord server as ${client.user.tag}`)
        
        if (Config.OnConnectNotice === true) {
            const readyMsg = require('@messages/onReadyMessage')()
            
            client.channels.fetch(Config.discord_channelId).then((channel) => channel.send(readyMsg))
        }   
    }
}