const { OnAirApi } = require('onair-api')
require('dotenv').config()

class OnAir {
    Api = undefined;

    constructor() {
        const env = process.env
        if (!env) throw 'No .env detected'
    
        const {
            onAirCompanyId,
            onAirVAId,
            onAirApiKey,
        } = env

        if (!onAirCompanyId) throw 'No OnAir Company ID defined in cfg'
        if (!onAirVAId) throw 'No OnAir VA ID defined in cfg'
        if (!onAirApiKey) throw 'No OnAir Api Key defined in cfg'

        this.Api = new OnAirApi({
            apiKey: onAirApiKey,
            companyId: onAirCompanyId,
            vaId: onAirVAId,
        })
    }

    async getFleet() {
        const x = await this.Api.getCompanyFleet();
        return x
    }

    async getJobs() {
        const x = await this.Api.getCompanyJobs();
        return x
    }

    async getFlights() {
        const x = await this.Api.getCompanyFlights(1, 1);
        return x
    }

    async getAirport(icao) {
        if (!icao) throw 'no ICAO provided'

        const x = await this.Api.getAirport(icao)
        return x
    }

    async getCompanyDetail() {
        const x = await this.Api.getCompany()
        return x
    }
}

module.exports = new OnAir()