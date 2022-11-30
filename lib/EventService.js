const Redis = require('ioredis');
const Logger = require('@lib/logger.js')
const Config = require('@config')

class EventServiceClass {
    Publisher = undefined;
    Subscriber = undefined;
    Cfg = {
        host: Config.redis.host || 'localhost',
        port: Config.redis.port || 6379,
        db: Config.redis.db || "0",
        password: Config.redis.password || '',
    };

    constructor() {
        this.initializeSocket = this.initializeSocket.bind(this);
        this.publish = this.publish.bind(this);
        this.subscribe = this.subscribe.bind(this);

        this.initializeSocket();
    }

    initializeSocket() {
        if (this.Publisher) return;

        this.Publisher = new Redis({
            host: this.Cfg.host,
            port: (typeof this.Cfg.port !== Number) ? Number(this.Cfg.port) : this.Cfg.port,
            db: this.Cfg.db,
            password: this.Cfg.password,
        });

        if (this.Subscriber) return;
        this.Subscriber = new Redis({
            host: this.Cfg.host,
            port: (typeof this.Cfg.port !== Number) ? Number(this.Cfg.port) : this.Cfg.port,
            db: this.Cfg.db,
            password: this.Cfg.password,
        });
    }

    publish(channel, data) {
        const self = this;
        data = (typeof data !== 'string') ? JSON.stringify(data) : data;
        Logger.info(`EventService: Publishing message to the '${channel}' channel| data: ${data}`)

        return self.Publisher.publish(channel, data);
    }

    async subscribe(channel, client) {
        const self = this;

        return new Promise((resolve, reject) => {
            
            if (!channel) return reject('Channel name is required');

            self.Subscriber.subscribe(channel, (err, count) => {
                if (err) {
                    Logger.error(`EventService: Error subscribing to channel '${channel}': ${err}`);
                    return reject(err);
                }

                Logger.info(`EventService: Subscribed to the '${channel}' channel. ${count} Total subscribed`);
                return resolve(null, count);
            });
        });
    }
}

module.exports = new EventServiceClass();