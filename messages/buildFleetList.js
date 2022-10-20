const Table = require('easy-table')
const determineAircraftStatus = require('../lib/determineAircraftStatus')

module.exports = function buildFleetList (x) {
    if (!x) return;
    if (x.length <= 0) return 'No aircraft in fleet'

    let t = new Table;
    
    x.forEach(function (f, i) {
        const identifier = f.Identifier
        const currentAirport = (f.CurrentAirport) ? `${f.CurrentAirport.ICAO} - ${f.CurrentAirport.City}, ${f.CurrentAirport.State}` : ''
        const status = determineAircraftStatus(f.AircraftStatus)
        const aircraftType = f.AircraftType.AircraftClass.ShortName
        const maxPayload = f.TotalWeightCapacity
        const firstSeats = f.ConfigFirstSeats
        const busSeats = f.ConfigBusSeats
        const ecoSeats = f.ConfigEcoSeats

        t.cell('#', i+1)
        t.cell('Type', aircraftType)
        t.cell('Identifier', identifier)
        t.cell('Name', f.AircraftType.TypeName)
        t.cell('Status', status)
        t.cell('Current Airport', currentAirport)
        t.cell('Max Payload', `${maxPayload} lbs`)
        t.cell('Pax E/B/F', `${ecoSeats}/${busSeats}/${firstSeats}`)
        t.newRow()

        
    })

    return t.toString()
}