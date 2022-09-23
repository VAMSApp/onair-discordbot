module.exports = function determineFlightStatus(f) {
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