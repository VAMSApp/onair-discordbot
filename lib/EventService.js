const { Server, } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');
const Logger = require('@lib/logger.js')

const EventService = {
    io: undefined,
    cfg: {
        host: 'http://localhost',
        port: 3004
    },

    initializeSocket: function(cfg) {
        this.io = new Server();

        pubClient = new Redis({
            host: cfg?.host || 'localhost',
            port: Number(cfg?.port) || 6379,
            password: cfg?.password || 'secret_redis',
            db: "0",
        });
        
        subClient = pubClient.duplicate();

        this.io.adapter(createAdapter(pubClient, subClient));

        this.io.on('connection', (socket) => {
            
            socket.emit('connected', 'I have started the VA Events Socket Service');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        this.io.listen(this.cfg.port);
    },

    subscribe: function(channelName, msg) {
        if (!channelName) throw new Error('Channel name is required');
        if (!msg) throw new Error('Message is required');

        Logger.info(`VA Event Service: Subscribing to channel '${channelName}'`);

        return this.io.on('connection', (socket) => {
            socket.emit(channelName, msg);
        });
    },

    emit: function(event, data) {
        console.log(`Emitting ${event} message`, data)
        this.io.emit(event, data);
    },

    serverSideEmit: function(event, data) {
        console.log(`Emitting ${event} message`, data)
        this.io.serverSideEmit(event, data);
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