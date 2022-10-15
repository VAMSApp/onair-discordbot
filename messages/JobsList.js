const Table = require('easy-table')
const determineAircraftStatus = require('../lib/determineAircraftStatus')

module.exports = function buildJobsList (x, limit) {
    if (!x) return;
    let t = new Table;

    x.forEach(function (j) {
        const missionType = j.MissionType.Name;
        t.cell('Type', missionType)
        t.cell('Pay', `$${j.Pay.toLocaleString("en-US")}`)
        if (j.Cargos.length > 0) {
            t.cell('Cargo/Pax', `${j.Cargos.length} leg${(j.Cargos.length > 1) ? 's' : ''}`)
            t.newRow()

            j.Cargos.forEach(function (c) {
                const currentAircraft = (c.CurrentAircraft) ? c.CurrentAircraft.Identifier : ''
                const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : ''
                const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : ''
                const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : ''
                let status = ''
                
                if (c.CurrentAircraft) {
                    status = 'Loaded'
                    status = determineAircraftStatus(c.CurrentAircraft.AircraftStatus)
                }
                t.cell('Type')
                t.cell('Cargo/Pax', c.CargoType.Name)
                t.cell('Status', status)
                t.cell('Aircraft', currentAircraft)
                t.cell('Depart', departureAirport)
                t.cell('Dest', destinationAirport)
                t.cell('Current', currentAirport)
                t.cell('Distance', `${c.Distance} NM`)
                t.newRow()
            })
        }
    })

    t.newRow()
    return t.toString()
}