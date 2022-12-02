const cron = require('node-cron');
const Logger = require('@lib/logger.js')
const Config = require('@config')

class Cron {
    Cron = cron;
    Cfg = Config;

    constructor() {
        this.schedule = this.schedule.bind(this);
        this.validate = this.validate.bind(this);
    }
    
    schedule(cronString, callback) {
        if (!cronString) throw new Error('Cron string is required');
        if (!callback) throw new Error('Callback is required');
        if (typeof callback !== 'function') throw new Error('Callback must be a function');
        if (!this.validate(cronString)) throw new Error('Invalid cron string');

        return this.Cron.schedule(cronString, callback);
    }

    validate(cronString) {
        if (!cronString) throw new Error('Cron string is required');
        return this.Cron.validate(cronString);
    }
}

module.exports = Cron;