const Logger = require('@lib/logger.js')

module.exports = {
    name: 'VADetails',
    description: 'Refresh VA Details',
    async execute ({ Config, OnAir, VAEvents }) {
        if (OnAir.Processing[this.name] === true) return;

        Logger.info(`Schedule::execute - ${this.description}`);
        await OnAir.refreshVADetails();
        Logger.info(`Schedule::execute - ${this.description} completed at ${results.createdAt}`);
    }
}