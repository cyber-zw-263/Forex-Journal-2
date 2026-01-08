import { PrismaClient } from '@prisma/client';

// Safe Prisma provider: only instantiate Prisma when DATABASE_URL looks valid for supported providers.
// This prevents dev servers and serverless hosts without DB configured from crashing.
let prisma: PrismaClient | null = null;

function createPrisma() {
  try {
    const client = new PrismaClient();
    // Attempt a quick connect to surface immediate errors in dev
    client.$connect().catch((err) => {
      console.warn('Prisma client connection failed during initialization:', err?.message || err);
      // don't throw here; keep client assigned but allow callers to handle query errors
    });
    return client;
  } catch (err) {
    console.warn('Failed to create Prisma client:', err);
    return null;
  }
}

try {
  const url = (process.env.DATABASE_URL || '').trim();
  const isSqlite = url.startsWith('file:');
  const isPg = url.startsWith('postgres') || url.startsWith('postgresql:');

  if (url && (isSqlite || isPg)) {
    prisma = createPrisma();
  } else {
    console.warn('Prisma disabled: DATABASE_URL not set to sqlite or postgres. API routes should handle missing DB.');
  }
} catch (err) {
  console.warn('Prisma initialization error:', err);
  prisma = null;
}

async function disconnectPrisma() {
  try {
    if (prisma) await prisma.$disconnect();
  } catch (err) {
    console.warn('Error disconnecting Prisma:', err);
  }
}

// graceful shutdown
if (typeof process !== 'undefined') {
  process.on?.('SIGINT', async () => {
    await disconnectPrisma();
    process.exit(0);
  });
}

export { prisma, createPrisma, disconnectPrisma };
