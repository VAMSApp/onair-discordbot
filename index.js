const Bot = require('./bot');
require('dotenv').config()

class App {
    Bot = undefined;
    OnAir = undefined;
    
    constructor() {
        this.Bot = new Bot()
    }
}

module.exports = new App()