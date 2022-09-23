module.exports = function determineWorld(w) {
    let world = 'Other/Unknown'
    
    switch(w) {
        case 'c83eb5d5-9dc5-452f-b261-69b45cb0951b':
            world = 'Thunder'
        break;
        case 'be6ab20f-809f-4c57-aaa6-9e78a3022ba8':
            world = 'Stratus'
        break;
        case 'd72139d8-c66e-49a6-8af1-d259081b0e7c':
            world = 'Clear Sky'
        break;
    }

    return world
}