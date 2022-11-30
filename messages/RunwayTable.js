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

module.exports = function RunwayTable(x) {
    const runwayTable = new Table()
    let detail = ''

    x.forEach(r => {
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

    return detail;
}