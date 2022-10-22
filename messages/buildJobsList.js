const Table = require('easy-table')
const determineAircraftStatus = require('../lib/determineAircraftStatus')

function determineJobStatus (j) {
    let status = ''

    if (j.AssignedToVAMember) {
        status = '🧑‍✈️ Assigned'
    } else if (j.CurrentAircraft) {
        status = '✈️ In Progress'
    } else {
        status = '📝 Pending'
    }

    return status
}

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
                const currentAircraft = (c.CurrentAircraft) ? c.CurrentAircraft.Identifier : '      '
                const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : ''
                const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : ''
                const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : ''
                let status = determineJobStatus(c)

                const AircraftIdentifier = (c.CurrentAircraft) ? `${determineAircraftStatus(c.CurrentAircraft, true)} ${c.CurrentAircraft.Identifier}` : '      '

                t.cell('Type', ` - ${c.CargoType.Name}`)
                t.cell('Cargo/Pax')
                t.cell('Status', status)
                t.cell('AssignedTo', (c.AssignedToVAMember) ? c.AssignedToVAMember.Company.AirlineCode : '')
                t.cell('Aircraft', AircraftIdentifier)
                t.cell('Depart', departureAirport)
                t.cell('Dest', destinationAirport)
                t.cell('Current', currentAirport)
                t.cell('Distance', `${c.Distance} NM`)
                t.newRow()
            })
        }

        if (j.Charters.length > 0) {
            t.cell('Pax', `${j.Charters.length} leg${(j.Charters.length > 1) ? 's' : ''}`)
            t.newRow()

            j.Charters.forEach(function (c) {
                const Type = ` - ${c.CharterType.Name}`
                const CargoPax = `${c.PassengersNumber}`
                const departureAirport = (c.DepartureAirport) ? c.DepartureAirport.ICAO : ''
                const destinationAirport = (c.DestinationAirport) ? c.DestinationAirport.ICAO : ''
                const currentAirport = (c.CurrentAirport) ? c.CurrentAirport.ICAO : ''
                const JobStatus = determineJobStatus(c)
                const AircraftIdentifier = (c.CurrentAircraft) ? `${determineAircraftStatus(c.CurrentAircraft, true)} ${c.CurrentAircraft.Identifier}` : '      '
                const AssignedTo = (c.AssignedToVAMember) ? c.AssignedToVAMember.Company.AirlineCode : ''

                t.cell('Type', Type)
                t.cell('Cargo/Pax', CargoPax)
                t.cell('Status', JobStatus)
                t.cell('AssignedTo', AssignedTo)
                t.cell('Aircraft', AircraftIdentifier)
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