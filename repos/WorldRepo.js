const prisma = require('@lib/prisma')

module.exports = {
    findAll: async () => {
        return await prisma.world.findMany()
    },

    findByGuid: async (guid) => {
        if (!guid) return;

        return await prisma.world.findUnique({
            where: {
                Guid: guid
            }
        })
    },

    findById: async (id) => {
        if (!id) return;
        
        return await prisma.world.findUnique({
            where: {
                Id: id
            }
        })
    },
    
    upsert: async (newX) => {
        return await prisma.world.upsert({
            where: {
                Id: newX.Id
            },
            create: newX,
            update: newX,
        })
    }
}