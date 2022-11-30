const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const SeedData = require('./seed-data.js');


async function main() {
    const {
        APP_TITLE
    } = process.env;
    
    const appConfig = await prisma.appConfig.findFirst();

    if (!appConfig) {
        await prisma.appConfig.create({
            data: {
                appTitle: APP_TITLE || 'VATUSA Web',
            }
        })

        console.log('App Config created');
    }

    // SeedData['roles'].forEach(async (role) => {
    //     const x = await prisma.role.upsert({
    //         where: {
    //             slug: role.slug,
    //         },
    //         update: role,
    //         create: role,
    //     })
    //     console.log(`Role ${x.name} upserted ✅`)
    // })

    SeedData['menus'].forEach(async (menu) => {
        const x = await prisma.menu.upsert({
            where: {
                slug: menu.slug,
            },
            create: {
                slug: menu.slug,
                name: menu.name,
                order: menu.order,
                adminOnly: menu.adminOnly,
                isDisabled: menu.isDisabled,
                isAuthRequired: menu.isAuthRequired,
                isRemovable: menu.isRemovable,
                items: {
                    createMany: {
                        data: menu.items
                    },
                }
            },
            update: {
                slug: menu.slug,
                name: menu.name,
                order: menu.order,
                adminOnly: menu.adminOnly,
                isDisabled: menu.isDisabled,
                isAuthRequired: menu.isAuthRequired,
                isRemovable: menu.isRemovable,
                items: {
                    updateMany: menu.items.map((item) => ({
                        where: {
                            slug: item.slug,
                        },
                        data: item,
                    })),
                }
            },
        })
        
        console.log(`${x.name} upserted ✅`)
    })
    
}

main()
.then(() => {
    console.log('Done')
})
.catch((e) => {
    console.error(e);
    process.exit(1);
})