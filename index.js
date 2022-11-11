require('module-alias/register')
const Bot = require('./bot');

class App {
    Bot = undefined;
    OnAir = undefined;
    
    constructor() {
        this.Bot = new Bot()
    }
}

module.exports = new App()