const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  console.log('Starting database test...');
  const prisma = new PrismaClient({
    datasourceUrl: 'postgresql://forex_user:forex_secure_pass@localhost:5432/forex_journal'
  });

  try {
    console.log('Testing database connection...');

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: 'demo-user' }
    });
    console.log('User found:', user ? user.id : 'No user found');

    // Check trades
    const trades = await prisma.trade.findMany({
      where: { userId: 'demo-user' }
    });
    console.log('Trades found:', trades.length);

    if (trades.length === 0) {
      console.log('Creating a test trade...');
      const testTrade = await prisma.trade.create({
        data: {
          userId: 'demo-user',
          pair: 'EUR/USD',
          direction: 'LONG',
          entryPrice: 1.0850,
          volume: 0.01,
          entryTime: new Date(),
          profitLoss: 25.50,
          outcome: 'profit',
          status: 'closed',
          decisionScore: 85,
          decisionQuality: 'good_decision_good_outcome',
          emotionalCost: 15
        }
      });
      console.log('Test trade created:', testTrade.id);
    }

    // List all trades
    const allTrades = await prisma.trade.findMany({
      where: { userId: 'demo-user' }
    });
    console.log('All trades:', allTrades.map(t => ({ id: t.id, pair: t.pair, profitLoss: t.profitLoss })));

  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();