const Table = require('easy-table')
module.exports = function buildAirportDetail(x) {
    if (!x) return;
    
    return `Airport ${x.ICAO} Detail`
}