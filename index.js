const Bot = require('./bot');
require('dotenv').config()

class App {
    DiscordBot = undefined;
    OnAir = undefined;

    constructor() {
        const env = process.env
        if (!env) throw 'No .env detected'
    
        const {
            discord_token,
            discord_clientId,
            discord_guildId,
            discord_channelId,
            deployCommands,
            connectNotice,
        } = env
        
        if (!discord_token) throw 'No Discord App token defined in cfg'
        if (!discord_clientId) throw 'No Discord ClientId defined in cfg'
        if (!discord_guildId) throw 'No Discord guildId defined in cfg'
        if (!discord_channelId) throw 'No Discord channelId defined in cfg'

        this.DiscordBot = new Bot({
            discord_token,
            discord_clientId,
            discord_guildId,
            discord_channelId,
            deployCommands,
            connectNotice,
        })
    }
}

module.exports = new App()