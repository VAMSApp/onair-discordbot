const Logger = require('@lib/logger')
const Config = require('@config')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, } = require('discord.js')

module.exports = {
    name: 'auth-signup',
    async subscribe (channel, err, count, { Client, }) {
        return new Promise((resolve, reject) => {
            if (!channel) return reject('Channel name is required');
            if (err) return reject(err);

            Logger.info(`Subscribed to '${channel}' VA Event. Now subscribe to ${count} VA Events`);
            return resolve(null, count);
        });
    },
    async execute (channelName, { approvalUrl, username, discriminator, }, discord) {
        const channelId = discord.getChannelId(channelName);
        if (channelName !== this.name) return;
        Logger.info(`Sending auth-signup message to ${username}#${discriminator} in ${channelName} channel`);
        const message = `**@${username}#${discriminator}** has just signed up to the VA site.\nTheir login is currently disabled until approved by an Administrator.\nApprove by visiting:\n${approvalUrl}`

        discord.Client.channels.fetch(channelId).then((channel) => channel.send(message))
    }
}