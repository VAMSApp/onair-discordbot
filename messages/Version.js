const { name, version, repository: { url }, license, author} = require('../package.json');

module.exports = function BuildVersionMessage() {
    let msg = '';
    msg += `\`\`\`\n`
    msg += `Package Name: ${name}\n`
    msg += `Version: ${version}\n`
    msg += `License: ${license}\n`
    msg += `Author: ${author.name} <${author.email}>\n`
    msg += `Repository: ${url}\n`
    msg += `\`\`\`\n`

    return msg;
}