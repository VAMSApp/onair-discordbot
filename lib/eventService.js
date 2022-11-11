const { createClient } = require('redis');
const Logger = require('@lib/logger.js')

const client = createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    database: 1,
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
 
(async function () {
    await connect();
})();

module.exports = {
    connect,
    subscribe,
    publish,
    SubscriberConnected,
    PublisherConnected,      
}