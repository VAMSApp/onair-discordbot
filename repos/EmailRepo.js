const BaseRepo = require('./BaseRepo');

class EmailRepoClass extends BaseRepo {
    constructor() {
        super('email')
    }
}

module.exports = new EmailRepoClass();