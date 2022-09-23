module.exports = function determineAircraftStatus(f) {
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