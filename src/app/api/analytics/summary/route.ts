import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subMonths
} from 'date-fns';

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'half_year' | 'yearly';

function getPeriodDates(type: PeriodType, date: Date = new Date()) {
  switch (type) {
    case 'daily':
      return { start: startOfDay(date), end: endOfDay(date) };
    case 'weekly':
      return { start: startOfWeek(date), end: endOfWeek(date) };
    case 'monthly':
      return { start: startOfMonth(date), end: endOfMonth(date) };
    case 'quarterly':
      return { start: startOfQuarter(date), end: endOfQuarter(date) };
    case 'half_year':
      const qStart = startOfQuarter(date);
      const halfStart = qStart.getMonth() < 6 ? startOfYear(date) : new Date(date.getFullYear(), 6, 1);
      const halfEnd = halfStart.getMonth() < 6 ? new Date(halfStart.getFullYear(), 5, 30) : endOfYear(halfStart);
      return { start: halfStart, end: halfEnd };
    case 'yearly':
      return { start: startOfYear(date), end: endOfYear(date) };
    default:
      return { start: startOfDay(date), end: endOfDay(date) };
  }
}

function analyzeEmotionalPatterns(trades: any[]) {
  const patterns: any = {};
  for (const trade of trades) {
    if (trade.emotionalState) {
      if (!patterns[trade.emotionalState]) {
        patterns[trade.emotionalState] = { count: 0, wins: 0, pnl: 0 };
      }
      patterns[trade.emotionalState].count++;
      if (trade.profitLoss! > 0) patterns[trade.emotionalState].wins++;
      patterns[trade.emotionalState].pnl += trade.profitLoss || 0;
    }
  }
  return patterns;
}

function analyzeRuleAdherence(trades: any[]) {
  const adherence: any = {};
  let totalAdherent = 0;
  
  for (const trade of trades) {
    const violationCount = trade.ruleViolations.filter((v: any) => v.violated).length;
    if (violationCount === 0) {
      totalAdherent++;
    }
    for (const violation of trade.ruleViolations) {
      const ruleName = violation.rule.ruleName;
      if (!adherence[ruleName]) {
        adherence[ruleName] = { violations: 0, adherenceRate: 0 };
      }
      if (violation.violated) {
        adherence[ruleName].violations++;
      }
    }
  }

  return {
    overallAdherence: trades.length > 0 ? (totalAdherent / trades.length) * 100 : 0,
    ruleBreakdown: adherence
  };
}

// GET period summaries
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const searchParams = request.nextUrl.searchParams;

    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const period = searchParams.get('period') as PeriodType || 'monthly';
    const date = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();

    const { start, end } = getPeriodDates(period, date);

    const trades = await prisma.trade.findMany({
      where: {
        userId,
        status: 'closed',
        entryTime: {
          gte: start,
          lte: end
        }
      },
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
      },
      orderBy: { entryTime: 'desc' }
    });

    // Calculate metrics
    const wins = trades.filter(t => t.profitLoss! > 0);
    const losses = trades.filter(t => t.profitLoss! < 0);
    const totalPnL = trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);

    // Best/worst by strategy
    const byStrategy: any = {};
    for (const trade of trades) {
      const key = trade.strategy?.name || 'Unassigned';
      if (!byStrategy[key]) {
        byStrategy[key] = { wins: 0, losses: 0, pnl: 0, count: 0 };
      }
      byStrategy[key].count++;
      byStrategy[key].pnl += trade.profitLoss || 0;
      if (trade.profitLoss! > 0) byStrategy[key].wins++;
      if (trade.profitLoss! < 0) byStrategy[key].losses++;
    }

    const sortedStrategies = Object.entries(byStrategy)
      .map(([name, data]: [string, any]) => ({ name, ...data }))
      .sort((a, b) => b.pnl - a.pnl);

    const bestStrategy = sortedStrategies[0];
    const worstStrategy = sortedStrategies[sortedStrategies.length - 1];

    // Best/worst entry models
    const byEntryModel: any = {};
    for (const trade of trades) {
      const key = trade.entryModel?.name || 'Unassigned';
      if (!byEntryModel[key]) {
        byEntryModel[key] = { wins: 0, losses: 0, pnl: 0, count: 0 };
      }
      byEntryModel[key].count++;
      byEntryModel[key].pnl += trade.profitLoss || 0;
      if (trade.profitLoss! > 0) byEntryModel[key].wins++;
      if (trade.profitLoss! < 0) byEntryModel[key].losses++;
    }

    const sortedEntryModels = Object.entries(byEntryModel)
      .map(([name, data]: [string, any]) => ({ name, ...data }))
      .sort((a, b) => b.pnl - a.pnl);

    const bestEntryModel = sortedEntryModels[0];
    const worstEntryModel = sortedEntryModels[sortedEntryModels.length - 1];

    // Emotional patterns
    const emotionalPatterns = analyzeEmotionalPatterns(trades);

    // Rule adherence
    const ruleAdherence = analyzeRuleAdherence(trades);

    // Create/update summary
    const summary = await prisma.periodSummary.upsert({
      where: {
        userId_period_startDate: {
          userId,
          period,
          startDate: start
        }
      },
      update: {
        totalTrades: trades.length,
        winCount: wins.length,
        lossCount: losses.length,
        winRate: trades.length > 0 ? (wins.length / trades.length) * 100 : 0,
        expectancy: trades.length > 0 ? totalPnL / trades.length : 0,
        bestStrategy: bestStrategy?.name || null,
        worstStrategy: worstStrategy?.name || null,
        bestEntryModel: bestEntryModel?.name || null,
        emotionalPatterns: JSON.stringify(emotionalPatterns),
        behavioralTrends: JSON.stringify({ ruleAdherence }),
        improvementsNeeded: JSON.stringify({
          lowPerformanceAreas: sortedStrategies.filter((s: any) => s.pnl < 0),
          emotionalChallenges: Object.entries(emotionalPatterns)
            .filter(([_, data]: [string, any]) => data.count > 0 && (data.wins / data.count) < 0.5)
            .map(([state, _]: [string, any]) => state),
          ruleViolations: Object.entries(byStrategy)
            .filter(([_, data]: [string, any]) => data.violations > 0)
        })
      },
      create: {
        userId,
        period,
        startDate: start,
        endDate: end,
        totalTrades: trades.length,
        winCount: wins.length,
        lossCount: losses.length,
        winRate: trades.length > 0 ? (wins.length / trades.length) * 100 : 0,
        expectancy: trades.length > 0 ? totalPnL / trades.length : 0,
        bestStrategy: bestStrategy?.name || null,
        worstStrategy: worstStrategy?.name || null,
        bestEntryModel: bestEntryModel?.name || null,
        emotionalPatterns: JSON.stringify(emotionalPatterns),
        behavioralTrends: JSON.stringify({ ruleAdherence }),
        improvementsNeeded: JSON.stringify({
          lowPerformanceAreas: sortedStrategies.filter((s: any) => s.pnl < 0),
          emotionalChallenges: Object.entries(emotionalPatterns)
            .filter(([_, data]: [string, any]) => data.count > 0 && (data.wins / data.count) < 0.5)
            .map(([state, _]: [string, any]) => state),
          ruleViolations: sortedStrategies.filter((s: any) => (s.count - s.wins - s.losses) > 0)
        })
      }
    });

    return NextResponse.json({
      period,
      startDate: start,
      endDate: end,
      summary,
      detailedAnalysis: {
        totalTrades: trades.length,
        wins: wins.length,
        losses: losses.length,
        totalPnL,
        winRate: trades.length > 0 ? ((wins.length / trades.length) * 100).toFixed(2) : 0,
        expectancy: (totalPnL / trades.length).toFixed(2),
        bestStrategy: bestStrategy ? { name: bestStrategy.name, pnl: bestStrategy.pnl, winRate: bestStrategy.wins / bestStrategy.count } : null,
        worstStrategy: worstStrategy ? { name: worstStrategy.name, pnl: worstStrategy.pnl, winRate: worstStrategy.wins / worstStrategy.count } : null,
        bestEntryModel: bestEntryModel ? { name: bestEntryModel.name, pnl: bestEntryModel.pnl } : null,
        worstEntryModel: worstEntryModel ? { name: worstEntryModel.name, pnl: worstEntryModel.pnl } : null,
        emotionalPatterns,
        ruleAdherence
      }
    });
  } catch (error) {
    console.error('Error generating period summary:', error);
    return NextResponse.json({ error: 'Failed to generate period summary' }, { status: 500 });
  }
}
