const { PrismaClient } = require('@prisma/client')

// create a prisma client
const prisma = new PrismaClient()

// export the prisma client
module.exports = prisma