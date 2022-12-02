const { MessageEmbed } = require('discord.js');
const Logger = require('@lib/logger')
const Config = require('@config')

module.exports = {
    name: 'onair-notifications',
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

        let msg = `Received a new OnAir notification at ${data.zuluEventTime}: ${data.description}`;
        Logger.info(`Received VA Event '${channelName}' msg: ${msg}`);

        const fields = []

        if (data.person) {
            fields.push({
                "name": `Employee`,
                "value": `${data.person.pseudo}`,
                "inline": true
            })
            
            if (data.person.company) {
                fields.push({
                    "name": `Company`,
                    "value": `${data.person.company.airlineCode}`,
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
              "value": `$ ${data.amount.toFixed(2)}`
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