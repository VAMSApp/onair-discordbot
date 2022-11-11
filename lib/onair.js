const { OnAirApi } = require('onair-api')
const Config = require('@config')
const _  = require('lodash')

class OnAir {
    Api = undefined;
    Config = Config.onAir;

    constructor() {

        if (!this.Config.companyId) throw 'No OnAir Company ID defined in cfg'
        if (!this.Config.vAId) throw 'No OnAir VA ID defined in cfg'
        if (!this.Config.apiKey) throw 'No OnAir Api Key defined in cfg'

        this.Api = new OnAirApi({
            apiKey: this.Config.apiKey,
            companyId: this.Config.companyId,
            vaId: this.Config.vAId,
        })
    }

    async getFleet() {
        const x = await this.Api.getCompanyFleet();
        return x
    }

    async getJobs() {
        const x = await this.Api.getCompanyJobs(1, 1);
        return x
    }

    async getCompanyFlights() {
        let x = await this.Api.getCompanyFlights();
        if (!x) return []
        
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

    async getVADetail() {
        const x = await this.Api.getVirtualAirline();
        return x
    }

    async getVAJobs() {
        const x = await this.Api.getVirtualAirlineJobs();
        return x
    }

    async getVAFlights(opts) {
        let x = await this.Api.getVirtualAirlineFlights();

        if (opts?.filter) {
            if (opts.filter.aircraftCode !== null) {
                x = x.filter(f => f.Aircraft.Identifier === opts.filter.aircraftCode)
            }

            if (opts.filter.companyCode) {
                x = x.filter(f => f.Company.AirlineCode === opts.filter.companyCode)
            }

            if (!opts.filter.showcompleted) {
                x = x.filter(f => f.StartTime && !f.EndTime)
            }
        }

        if (opts?.sortBy) {
            x = x.sort((a, b) => {
                return (opts.sortOrder === 'desc')
                    ? (new Date(b[opts.sortBy]) - new Date(a[opts.sortBy]))
                    : (new Date(a[opts.sortBy]) - new Date(b[opts.sortBy]))
            })
        }
        
        return x
    }

    async getVAFleet() {
        const x = await this.Api.getVirtualAirlineFleet();
        return x
    }
    
    async getVAMembers(opts) {
        let x = await this.Api.getVirtualAirlineMembers();

        if (opts?.sortBy) {
            if (opts.sortBy === 'Role') {
                x = x.sort((a, b) => {
                    return a.VARole.Permission - b.VARole.Permission;
                });
            }
        }
        return x
    }

    async getVAFbos() {
        const x = await this.Api.getVirtualAirlineFbos();
        return x
    }
}

module.exports = new OnAir()