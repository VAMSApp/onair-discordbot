const Table = require('easy-table')

module.exports = function buildMemberList (x) {
    if (!x || x.length <= 0) return;

    let t = new Table
    x.forEach(function (e, i) {
        const companyName = `${Company.Name} (${Company.AirlineCode})`
        const role  = e.VARole.Name
        const paxCargo = `${e.TotalPAXsTransported}/${e.TotalCargosTransportedLbs}`
        const rep = `${(e.ReputationImpact*100).toFixed(2)}%`
        const numFlights = e.NumberOfFlights
        const lastFlight = e.LastVAFlightDate
        
        t.cell('#', i+1)
        t.cell('Company', companyName)
        t.cell('Role', role)
        t.cell('Pax/Cargo', paxCargo)
        t.cell('Rep', rep)
        t.cell('# Flights', numFlights)
        t.cell('Last Flight', lastFlight)
        t.newRow()
    })
    
    return t.toString()
}