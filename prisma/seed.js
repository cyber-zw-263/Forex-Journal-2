const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

(async () => {
  const prisma = new PrismaClient();
  try {
    console.log('Seeding demo user...');
    const user = await prisma.user.upsert({
      where: { id: 'demo-user' },
      update: {},
      create: { id: 'demo-user', name: 'Demo User', email: 'demo@example.com', password: 'demo' },
    });
    console.log('User ensured:', user.id);

    // Optionally load demo trades if demo data exists
    const demoPath = path.join(__dirname, '..', 'src', 'data', 'demo-trades.json');
    if (fs.existsSync(demoPath)) {
      const json = JSON.parse(fs.readFileSync(demoPath, 'utf8'));
      console.log(`Seeding ${json.length} demo trades...`);
      for (const t of json) {
        await prisma.trade.create({
          data: {
            userId: 'demo-user',
            pair: t.pair || 'EUR/USD',
            direction: t.direction || 'LONG',
            entryPrice: t.entryPrice || 1.0,
            quantity: t.quantity || 1.0,
            entryTime: t.date ? new Date(t.date) : new Date(),
            profitLoss: t.pnl || 0,
            outcome: (t.pnl || 0) >= 0 ? 'WIN' : 'LOSS',
          },
        });
      }
      console.log('Demo trades seeded.');
    } else {
      console.log('No demo trades found at', demoPath);
    }
  } catch (e) {
    console.error('Seed error', e);
  } finally {
    await prisma.$disconnect();
  }
})();
