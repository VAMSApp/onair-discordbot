const prisma = require('@lib/prisma')

module.exports = {
    findAll: async () => {
        return await prisma.aircraft.findMany()
    },
    
    findByGuid: async (guid) => {
        if (!guid) return;

        return await prisma.aircraft.findUnique({
            where: {
                Guid: guid
            }
        })
    },
    
    findById: async (id) => {
        if (!id) return;

        return await prisma.aircraft.findUnique({
            where: {
                Id: id
            }
        })
    },
    
    upsert: async (newX) => {
        if (!newX) return;

        return await prisma.aircraft.upsert({
            where: {
                Id: newX.Id
            },
            create: newX,
            update: newX,
        })
    },
    
    
}