const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.count();
    const trades = await prisma.trade.count();
    console.log('users:', users, 'trades:', trades);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();