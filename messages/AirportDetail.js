const Table = require('easy-table')

function determineRunwaySurface (x) {
    let surface = ''

    switch (x) {
        case 0: 
        default:
            surface = 'Unknown/not set'
        break;
        case 3:
            surface = 'Asphalt/grooved'
        break;
        case 7:
            surface = 'Dirt'
        break;
        case 10:
            surface = 'Asphalt - good condition'
        break;
    }   
    
    return surface
}

function determinAirportSize (x) {
    let size = ''

    switch (x) {
        case 0:
            size = 'Small'
        break;
        case 1:
            size = 'Medium'
        break;
        case 2:
            size = 'Large'
        break;
    }   
    
    return size
}

function ArrivalsJobsTable (jobs) {
    if (!jobs) return ''
    if (jobs.length === 0) return `    No Scheduled Arrivals\n`
}

function DeparturesJobsTable (jobs) {
    if (!jobs) return ''
    if (jobs.length === 0) return `    No Scheduled Departures\n`
}

module.exports = function AirportDetail(x) {
    if (!x) return;
    
    const Name = (x.Name) ? x.Name : ''
    const City = (x.City) ? x.City : ''
    const State = (x.State) ? x.State : ''
    const CountryName = (x.CountryName) ? x.CountryName : ''
    const TransitionAltitude = (x.TransitionAltitude) ? x.TransitionAltitude : ''
    const Size = (x.Size) ? x.Size : ''
    const FullLocation = `${City}, ${State}, ${CountryName}`

    const Latitude = (x.Latitude) ? x.Latitude : ''
    const Longitude = (x.Longitude) ? x.Longitude : ''
    const Elevation = (x.Elevation) ? x.Elevation : ''

    let detail = ''
    detail += `**[${x.ICAO}] ${Name}**\n`
    detail += `${FullLocation}\n`
    
    detail += '\`\`\`';
    detail += `Transition Altitude: ${TransitionAltitude}\n`
    detail += `Size: ${Size}\n`
    detail += `Latitude: ${Latitude}\n`
    detail += `Longitude: ${Longitude}\n`
    detail += `Elevation: ${Elevation}\n`
    detail += `\n`
    detail += '\`\`\`';
    detail += `\n`

    detail += `**Runways**`
    detail += `\n`
    detail += '\`\`\`';

    const runwayTable = new Table()
    x.Runways.forEach(r => {
        // const Surface = determineRunwaySurface(r.Surface)

        runwayTable.cell('Name', r.Name)
        runwayTable.cell('Type', determineRunwaySurface(r.SurfaceType))
        runwayTable.cell('Length', `${r.Length} ft`)
        runwayTable.cell('Hdg', r.MagneticHeading)
        runwayTable.cell('Lat', r.Latitude)
        runwayTable.cell('Lng', r.Longitude)

        if (r.HasIls) {
            runwayTable.cell('ILS Freq', r.IlsFrequency)
            runwayTable.cell('ILS Hdg', r.IlsMagneticHeading)
            runwayTable.cell('ILS Glide Slope', r.IlsSlope)
        }
        runwayTable.newRow();
    })

    detail += runwayTable.toString()
    detail += '\`\`\`';
    detail += `\n`

    detail += `**Arrivals**\n`
    detail += '\`\`\`fix\n';
    detail += 'Not working yet\n'
    // detail += ArrivalsJobsTable([])
    detail += '\`\`\`';
    detail += `\n`

    detail += `**Departals**\n`
    detail += '\`\`\`fix\n';
    detail += 'Not working yet\n'
    // detail += DeparturesJobsTable([])
    detail += '\`\`\`';
    detail += `\n`

    detail
    return detail
}