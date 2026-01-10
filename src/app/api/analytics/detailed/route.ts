import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface AnalysisOptions {
  startDate?: Date;
  endDate?: Date;
  strategyId?: string;
  entryModelId?: string;
  sequenceId?: string;
  emotionalState?: string;
  session?: string;
}

// Calculate basic metrics
function calculateMetrics(trades: any[]) {
  if (trades.length === 0) {
    return {
      totalTrades: 0,
      winCount: 0,
      lossCount: 0,
      breakEvenCount: 0,
      winRate: 0,
      totalPnL: 0,
      avgWin: 0,
      avgLoss: 0,
      largestWin: 0,
      largestLoss: 0,
      expectancy: 0,
      profitFactor: 0,
      consecutive: { wins: 0, losses: 0 }
    };
  }

  const closedTrades = trades.filter(t => t.status === 'closed' && t.profitLoss !== null);
  const wins = closedTrades.filter(t => t.profitLoss! > 0);
  const losses = closedTrades.filter(t => t.profitLoss! < 0);
  const breakEvens = closedTrades.filter(t => t.profitLoss === 0);

  const totalPnL = closedTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
  const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.profitLoss!, 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? losses.reduce((sum, t) => sum + t.profitLoss!, 0) / losses.length : 0;

  const grossProfit = wins.reduce((sum, t) => sum + t.profitLoss!, 0);
  const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.profitLoss!, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? Infinity : 1);

  return {
    totalTrades: closedTrades.length,
    winCount: wins.length,
    lossCount: losses.length,
    breakEvenCount: breakEvens.length,
    winRate: closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0,
    totalPnL,
    avgWin: Math.round(avgWin * 100) / 100,
    avgLoss: Math.round(avgLoss * 100) / 100,
    largestWin: wins.length > 0 ? Math.max(...wins.map(t => t.profitLoss!)) : 0,
    largestLoss: losses.length > 0 ? Math.min(...losses.map(t => t.profitLoss!)) : 0,
    expectancy: closedTrades.length > 0 ? totalPnL / closedTrades.length : 0,
    profitFactor: Math.round(profitFactor * 100) / 100,
    consecutive: { wins: 0, losses: 0 }
  };
}

// GET comprehensive analytics
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const searchParams = request.nextUrl.searchParams;

    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const options: AnalysisOptions = {};
    if (searchParams.get('startDate')) options.startDate = new Date(searchParams.get('startDate')!);
    if (searchParams.get('endDate')) options.endDate = new Date(searchParams.get('endDate')!);
    if (searchParams.get('strategyId')) options.strategyId = searchParams.get('strategyId')!;
    if (searchParams.get('entryModelId')) options.entryModelId = searchParams.get('entryModelId')!;
    if (searchParams.get('emotionalState')) options.emotionalState = searchParams.get('emotionalState')!;
    if (searchParams.get('session')) options.session = searchParams.get('session')!;

    // Build where clause
    const whereClause: any = { userId, status: 'closed' };
    
    if (options.startDate || options.endDate) {
      whereClause.entryTime = {};
      if (options.startDate) whereClause.entryTime.gte = options.startDate;
      if (options.endDate) whereClause.entryTime.lte = options.endDate;
    }
    
    if (options.strategyId) whereClause.strategyId = options.strategyId;
    if (options.entryModelId) whereClause.entryModelId = options.entryModelId;
    if (options.emotionalState) whereClause.emotionalState = options.emotionalState;
    if (options.session) whereClause.session = options.session;

    const trades = await prisma.trade.findMany({
      where: whereClause,
      include: {
        strategy: true,
        entryModel: true,
        timeframeSequence: {
          include: {
            steps: {
              orderBy: { orderIndex: 'asc' }
            }
          }
        },
        ruleViolations: {
          include: {
            rule: true
          }
        }
      }
    });

    const metrics = calculateMetrics(trades);

    // Group by strategy
    const byStrategy: any = {};
    for (const trade of trades) {
      const stratKey = trade.strategy?.name || 'Unassigned';
      if (!byStrategy[stratKey]) {
        byStrategy[stratKey] = [];
      }
      byStrategy[stratKey].push(trade);
    }

    const strategyMetrics = Object.entries(byStrategy).map(([name, strats]: [string, any]) => ({
      strategy: name,
      metrics: calculateMetrics(strats),
      count: strats.length
    }));

    // Group by entry model
    const byEntryModel: any = {};
    for (const trade of trades) {
      const emKey = trade.entryModel?.name || 'Unassigned';
      if (!byEntryModel[emKey]) {
        byEntryModel[emKey] = [];
      }
      byEntryModel[emKey].push(trade);
    }

    const entryModelMetrics = Object.entries(byEntryModel).map(([name, models]: [string, any]) => ({
      entryModel: name,
      metrics: calculateMetrics(models),
      count: models.length
    }));

    // Emotional state analysis
    const byEmotionalState: any = {};
    for (const trade of trades) {
      const esKey = trade.emotionalState || 'Not recorded';
      if (!byEmotionalState[esKey]) {
        byEmotionalState[esKey] = [];
      }
      byEmotionalState[esKey].push(trade);
    }

    const emotionalStateMetrics = Object.entries(byEmotionalState).map(([state, trades]: [string, any]) => ({
      emotionalState: state,
      metrics: calculateMetrics(trades),
      count: trades.length
    }));

    // Rule adherence analysis
    let violatedCount = 0;
    let totalRuleChecks = 0;
    const byRule: any = {};

    for (const trade of trades) {
      for (const violation of trade.ruleViolations) {
        if (violation.violated) {
          violatedCount++;
          const ruleName = violation.rule.ruleName;
          if (!byRule[ruleName]) {
            byRule[ruleName] = { violations: 0, totalChecks: 0 };
          }
          byRule[ruleName].violations++;
        }
        totalRuleChecks++;
      }
    }

    const disciplineScore = totalRuleChecks > 0 ? ((totalRuleChecks - violatedCount) / totalRuleChecks) * 100 : 0;

    return NextResponse.json({
      overview: metrics,
      byStrategy: strategyMetrics,
      byEntryModel: entryModelMetrics,
      byEmotionalState: emotionalStateMetrics,
      disciplineAnalysis: {
        disciplineScore: Math.round(disciplineScore * 100) / 100,
        violatedRules: byRule,
        totalRuleChecks,
        totalViolations: violatedCount
      },
      tradeCount: trades.length,
      analysisOptions: options
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return NextResponse.json({ error: 'Failed to calculate analytics' }, { status: 500 });
  }
}
