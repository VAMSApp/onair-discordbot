const Redis = require('ioredis');
const Logger = require('@lib/logger.js')

const EventService = {
    publisher: undefined,
    subscriber: undefined,
    cfg: {
        host: 'localhost',
        port: 6379,
        db: "0",
        password: '',
    },

    initializeSocket: function() {
        if (this.publisher) return;
        this.publisher = new Redis({
            host: this.cfg.host,
            port: (typeof this.cfg.port !== Number) ? Number(this.cfg.port) : this.cfg.port,
            db: this.cfg.db,
            password: this.cfg.password,
        });

        if (this.subscriber) return;
        this.subscriber = new Redis({
            host: this.cfg.host,
            port: (typeof this.cfg.port !== Number) ? Number(this.cfg.port) : this.cfg.port,
            db: this.cfg.db,
            password: this.cfg.password,
        });
        

    },

    subscribe: async function subscribe(channel, client) {
        const self = this;
        return new Promise((resolve, reject) => {
            
            if (!channel) return reject('Channel name is required');
            Logger.info(`EventService: Subscribing to channel '${channel}'`);

            self.subscriber.subscribe(channel, (err, count) => {
                if (err) {
                    Logger.error(`EventService: Error subscribing to channel '${channel}': ${err}`);
                    return reject(err);
                }

                Logger.info(`EventService: Subscribed to channel '${channel}', ${count} total subscribed`);
                return resolve(null, count);
            });
        });
    },

    publish: function(channel, data) {
        data = (typeof data !== 'string') ? JSON.stringify(data) : data;
        console.log(`Publishing message to '${channel}' channel`, data)
        this.publisher.publish(channel, data);
    },

    init: function(cfg) {

        if (cfg) {
            this.cfg = cfg;
        }

        if (!this.io) {
            this.initializeSocket();
        }

        return this;
    }
}

module.exports = EventService;