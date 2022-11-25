const Logger = require('@lib/logger')
const Config = require('@config')

module.exports = {
    name: 'auth-signin',
    async subscribe (channel, err, count, { Client, }) {
        if (!channel) return;
        if (err) return;
        Logger.info(`Subscribed to '${channel}' VA Event. Now subscribe to ${count} VA Events`);
    },
    async execute (channelName, msg, discord) {
        const channelId = discord.getChannelId(channelName);

        discord.Client.channels.fetch(channelId).then((channel) => channel.send(msg))
    }
}