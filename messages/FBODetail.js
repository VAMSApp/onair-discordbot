const { messageLink } = require('discord.js');
const Table = require('easy-table')


module.exports = function FBODetail(x) {
    if (!x) return;
    let fbo = ''
    
    const table = new Table()

    x.forEach(fbo => {
        table.cell('ICAO', fbo.Airport.ICAO)
        table.cell('Name', fbo.Name)
        table.cell('Fuel', `${fbo.Fuel100LLCapacity} / ${fbo.Fuel100LLQuantity}`)
        table.cell('Jet A', `${fbo.FuelJetCapacity} / ${fbo.FuelJetQuantity}`)
        
        table.newRow()
    })
    

    fbo = table.toString() 
    return fbo;
}