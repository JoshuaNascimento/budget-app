import { PrismaClient } from "@prisma/client";

// Give global definition of prisma so it may work throughout the codebase
declare global {
  var prisma: PrismaClient | undefined
}

// Create const which searches for active prisma instance or creates one
// Prevents Nextjs from creating a new prisma client per hot reload
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client
}

export default client;