const { createClient } = require('redis');
const Logger = require('@lib/logger.js')
const Config = require('@config')

const client = createClient({
    host: Config.host,
    port: Number(Config.port),
    password: Config.password,
});

const Subscriber = client.duplicate();
const Publisher = client.duplicate();

let SubscriberConnected = false;
let PublisherConnected = false;

async function connect() {
    await Subscriber.connect().then(() => {
        console.log('Subscriber::connect')
        SubscriberConnected = true
    });

    // await Publisher.connect().then(() => {
    //     console.log('Publisher::connect')
    //     PublisherConnected = true
    // });
}

function subscribe(channel, callback) {
    Subscriber.subscribe(channel, callback);
    Logger.info(`EventService::subscribe::${channel}`)
}

function publish(channel, message) {
    Publisher.publish(channel, message);
}

module.exports = {
    connect,
    subscribe,
    publish,
    SubscriberConnected,
    PublisherConnected,      
}