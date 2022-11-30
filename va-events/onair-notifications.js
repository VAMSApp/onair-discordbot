const { MessageEmbed } = require('discord.js');
const Logger = require('@lib/logger')
const Config = require('@config')

module.exports = {
    name: 'onair-notifications',
    async subscribe (channel, err, count, { Client, }) {
        if (!channel) return;
        if (err) return;
        Logger.info(`Subscribed to '${channel}' VA Event. Now subscribe to ${count} VA Events`);
    },
    async execute (channelName, data, discord) {
        const channelId = discord.getChannelId(channelName);
        if (channelName !== this.name) return;
        if (!data) return;

        try {
            data = (typeof data === 'string') ? JSON.parse(data) : data;
        }
        catch (e) {
            Logger.error(`Error parsing VAEvents message: ${e}`);
        }

        console.log("\n\n")
        console.log(data);
        console.log("\n\n")

        let msg = `Received new OnAir VA Event at ${data.zuluEventTime}: ${data.description}`;
        Logger.info(`Received VA Event '${channelName}' msg: ${msg}`);

        const fields = []
        if (data.employee) {
            fields.push({
                "name": `Employee`,
                "value": `${data.employee.pseudo}`,
                "inline": true
            })
            
            if (data.employee.company) {
                fields.push({
                    "name": `Company`,
                    "value": `${data.employee.company.airlineCode}`,
                    "inline": true
                });
            }
        }


        if (data.aircraftGuid) {
            fields.push({
              "name": `Aircraft`,
              "value": `${data.aircraftGuid}`
            });
        } if (data.amount) {
            fields.push({
              "name": `Amount`,
              "value": `${data.amount}`
            })
        }

        discord.Client.channels.fetch(channelId)
        .then((channel) => channel.send({
            embeds: [
                {
                  "type": "rich",
                  "title": `VA Event: ${data.description}`,
                  "description": `${data.description}`,
                  "color": 0x00FFFF,
                  "fields": fields
                }
              ]
        }))
    }
}