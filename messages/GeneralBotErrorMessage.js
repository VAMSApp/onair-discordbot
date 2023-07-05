const Config = require('@config');

module.exports = function BuildGeneralBotErrorMessage(error) {
    let msg = '';
    msg += `\`\`\`\n`
    msg += `An error occurred while executing this command:\n`
    msg += `${error}\n`
    msg += `\`\`\`\n`

    msg += `Please let one of the following discord admins know ASAP so that a fix can be applied!\n`
    msg += `\`\`\`\n`
    Config.discord_admins.forEach(admin => {
        msg += `${admin.name}\n`
    })
    msg += `\`\`\`\n`

    return msg;
}