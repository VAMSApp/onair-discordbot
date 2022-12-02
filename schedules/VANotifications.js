const Logger = require('@lib/logger.js')

module.exports = {
    name: 'Notifications',
    description: 'Refresh the latest VA Notifications',
    async execute ({ Config, OnAir, VAEvents }) {
        if (OnAir.Processing[this.name] === true) return;

        Logger.info(`Schedule::execute - ${this.description}`);
        const results = await OnAir.refreshVANotifications();
        Logger.info(`Schedule::execute - ${this.description} completed at ${results.createdAt}`);
    }
}