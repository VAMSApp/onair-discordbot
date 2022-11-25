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

    subscribe: async function subscribe(channel, cb) {
        const self = this;
        if (!channel) return cb('Channel name is required');
        Logger.info(`EventService: Subscribing to channel '${channel}'`);

        self.subscriber.subscribe(channel, (err, count) => {
            if (err) {
                Logger.error(`EventService: Error subscribing to channel '${channel}': ${err}`);
                return reject(err);
            }

            Logger.info(`EventService: Subscribed to channel '${channel}', ${count} total subscribed`);

            return cb(null, count);
        });
    },

    emit: function(event, data) {
        console.log(`Emitting ${event} message`, data)
        this.io.emit(event, data);
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