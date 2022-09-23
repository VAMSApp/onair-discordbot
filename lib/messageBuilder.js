const Table = require('easy-table')

function buildMembersList (x) {
    if (!x) return;
    let t = new Table;

    x.forEach(function (f) {
        const companyCode = f.Company.AirlineCode
        const companyName = f.Company.Name
        const companyPaused = f.Company.Paused
        const companyPausedAt = f.Company.PausedDate
        const totalCargosTransportedLbs = f.TotalCargosTransportedLbs
        const totalPAXsTransported = f.TotalPAXsTransported
        const totalEarnedCredits = f.TotalEarnedCredits
        const numberOfFlights = f.NumberOfFlights
        const flightHours = f.FlightHours
        const vaRole = f.VARole.Name


        t.cell('[Code] Company Name', `${(companyPaused) ? '⏸️ ': ''}[${companyCode}] ${companyName}`)
        t.cell('Role', vaRole)
        t.cell('$ Earned', `$${totalEarnedCredits.toLocaleString("en-US")}`)
        t.cell('PAX Transported', totalPAXsTransported)
        t.cell('Cargo Transported', totalCargosTransportedLbs)
        t.cell('# Flights (Flight Hrs)', `${numberOfFlights} (${parseFloat(flightHours).toFixed(2)})`)
        t.newRow()

    });

    return t.toString()
}

function buildFlightsList (x) {
    if (!x) return;
    let t = new Table;

    x.forEach(function (f) {
        const identifier = f.Aircraft.Identifier
        const departureAirport = f.DepartureAirport.ICAO
        const arrivalIntendedAirport = f.ArrivalIntendedAirport?.ICAO
        const arrivalActualAirport = f.ArrivalActualAirport?.ICAO

        let status = ''


        t.cell('Aircraft', identifier)
        t.cell('Status', status)
        t.cell('Depart', departureAirport)
        t.cell('Intended Arrival', arrivalIntendedAirport)
        t.cell('Actual Arrival', arrivalActualAirport)
        t.newRow()

    });

    return t.toString()
}

function determineFlightStatus(f) {
    let status = ''

    if (f.StartTime) {
        status = 'Started'
    } else if (f.StartTime && !f.ArrivalActualAirport) {
        status = 'In Progress'
    } else if (f.StartTime && (f.ArrivalActualAirport || f.ArrivalIntendedAirport)) {
        status = 'Completed'
    }

    return status
}

function determineAircraftStatus(f) {
    let status = '';

    switch (f) {
        case 0:
            status = '✅ Idle'
            break;
        case 1:
            status = '⚙️ Maintenance'
            break;
        case 2:
            status = '🔃 ApronWork'
            break;
        case 3:
            status = '✈️ InFlight'
            break;
        case 4:
            status = '🌍 Warp'
            break;
        case 5:
            status = '✈️ Ferry'
            break;
    }
    return status
}

function buildJobsList (x) {
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

                    switch (c.CurrentAircraft.AircraftStatus) {
                        case 0:
                            status = '✅ Idle'
                        break;
                        case 1:
                            status = '⚙️ Maintenance'
                        break;
                        case 2:
                            status = '🔃 ApronWork'
                        break;
                        case 3:
                            status = '✈️ InFlight'
                        break;
                        case 4:
                            status = '🌍 Warp'
                        break;
                        case 5:
                            status = '🚢 Ferry'
                        break;
                        
                    }
                }
                t.cell('Type')
                t.cell('Cargo/Pax', c.CargoType.Name)
                t.cell('Status', status)
                t.cell('Aircraft', currentAircraft)
                t.cell('Depart', departureAirport)
                t.cell('Destin', destinationAirport)
                t.cell('Current', currentAirport)
                t.cell('Distance', `${c.Distance} NM`)
                t.newRow()
            })
        }
    })
    t.newRow()
    return t.toString()
}

function buildFleetList (x) {
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

function buildAirportDetail(x) {
    if (!x) return;
    return `Airport ${x.ICAO} Detail`
}

module.exports = {
    buildMembersList,
    buildFlightsList,
    buildJobsList,
    buildFleetList,
    buildAirportDetail,
}