const Logger = require('@lib/logger.js')

module.exports = {
    name: 'VAFleet',
    description: 'Refresh VA Fleet',
    async execute ({ Config, OnAir, VAEvents }) {
        if (OnAir.Processing[this.name] === true) return;

        Logger.info(`Schedule::execute - ${this.description}`);
        await OnAir.refreshVAFleet();
        Logger.info(`Schedule::execute - ${this.description} completed at ${results.createdAt}`);
    }
}