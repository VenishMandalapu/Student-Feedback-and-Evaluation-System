import { PrismaClient } from '@prisma/client';

// Create Prisma Client instance
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// TEMPORARILY DISABLED FOR TESTING FRONTEND
// Handle Prisma connection
// prisma.$connect()
//   .then(() => {
//     console.log('✅ Database connected successfully');
//   })
//   .catch((error) => {
//     console.error('❌ Database connection failed:', error);
//     process.exit(1);
//   });

console.log('⚠️  Database connection DISABLED - Testing frontend only');

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  console.log('📴 Database disconnected');
});

export default prisma;
