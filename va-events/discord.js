const Logger = require('@lib/logger')
const Config = require('@config')

module.exports = {
    name: 'discord',
    async execute (channelName, msg, discord) {
        const channelId = discord.getChannelId(channelName);
        if (channelName !== this.name) return;

        discord.Client.channels.fetch(channelId).then((channel) => channel.send(msg))
    }
}