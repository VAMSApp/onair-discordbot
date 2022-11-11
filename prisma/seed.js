require('module-alias/register')
const { PrismaClient } = require('@prisma/client')
const Logger = require('@lib/logger')

// create a prisma client
const prisma = new PrismaClient()

const seedData = require('./seedData')

async function main() {
    const Worlds = []
    
    seedData['worlds'].forEach(async function (w) {
        const world = await prisma.world.upsert({
            where: {
                ShortName: w.ShortName
            },
            create: w,
            update: {},
        })
        Logger.debug(`World ${world.Name} upserted ✅`)
        Worlds.push(world)

    })

    seedData['fuelTypes'].forEach(async function (x) {
        const FuelTypes = []
        const fuelType = await prisma.fuelType.upsert({
            where: {
                OnAirId: x.OnAirId
            },
            create: x,
            update: {},
        })
        Logger.debug(`Fuel Type ${fuelType.Name} upserted ✅`)
        FuelTypes.push(fuelType)

    })
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
