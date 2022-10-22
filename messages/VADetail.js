const Table = require('easy-table')
determineWorld = require('../lib/determineWorld')

module.exports = function VADetail(x) {
    if (!x) return;
    let detail = ''
    detail += `\n**[${x.AirlineCode}] ${x.Name} Details**\n`
    detail += `\`\`\``
    detail += `  Level: ${x.Level}\n`
    detail += `  XP: ${x.LevelXP} / ${x.Level*1000}\n`
    detail += `  Reputation: ${(x.Reputation * 100).toFixed(2)}%\n`
    detail += `  World: ${determineWorld(x.WorldId)}\n`
    detail += `\`\`\``

    return detail

}