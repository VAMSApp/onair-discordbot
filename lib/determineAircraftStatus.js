module.exports = function determineAircraftStatus(aircraft, iconOnly) {
    let status = '';
    if (!aircraft) return status;
    const {
        AircraftStatus,
    } = aircraft;

    switch (AircraftStatus) {
        case 0:
            status = (iconOnly) ? '✅' : '✅ Idle'
            break;
        case 1:
            status = (iconOnly) ? '⚙️' : '⚙️ Maintenance'
            break;
        case 2:
            status = (iconOnly) ? '🔃' : '🔃 ApronWork'
            break;
        case 3:
            status = (iconOnly) ? '✈️' : '✈️ InFlight'
            break;
        case 4:
            status = (iconOnly) ? '🌍' : '🌍 Warp'
            break;
        case 5:
            status = (iconOnly) ? '✈️' : '✈️ Ferry'
            break;
    }

    return status
}