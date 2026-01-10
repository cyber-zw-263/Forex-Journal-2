import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface StrategyPerformance {
  totalTrades: number;
  winRate: number;
  avgProfitLoss: number;
  consistencyScore: number;
  drawdownMax: number;
  edgeConfidence: number;
}

interface TradeAnalysis {
  decisionQuality: string;
  emotionalStability: number;
  ruleAdherence: number;
  marketCondition: string;
}

/**
 * Calculate edge confidence score for a strategy (0-100)
 * This measures how reliable the strategy's edge is based on:
 * - Consistency across different market conditions
 * - Decision quality of trades
 * - Performance stability
 * - Sample size adequacy
 */
function calculateEdgeConfidence(strategy: any, trades: any[]): number {
  if (trades.length < 10) {
    return 20; // Insufficient sample size
  }

  let confidence = 50; // Base score

  // Analyze win rate consistency
  const winRate = trades.filter(t => t.outcome === 'profit').length / trades.length;
  const recentWinRate = trades.slice(-10).filter(t => t.outcome === 'profit').length / 10;

  if (Math.abs(winRate - recentWinRate) < 0.1) {
    confidence += 15; // Consistent performance
  } else if (Math.abs(winRate - recentWinRate) > 0.3) {
    confidence -= 20; // Inconsistent performance
  }

  // Analyze decision quality
  const goodDecisions = trades.filter(t =>
    t.decisionQuality === 'good_decision_good_outcome' ||
    t.decisionQuality === 'good_decision_bad_outcome'
  ).length;

  const decisionQualityRatio = goodDecisions / trades.length;
  confidence += (decisionQualityRatio - 0.5) * 40; // +/- 20 points based on decision quality

  // Analyze market condition performance
  const marketConditions = [...new Set(trades.map(t => t.marketCondition).filter(Boolean))];
  if (marketConditions.length >= 3) {
    confidence += 10; // Performs across multiple conditions
  }

  // Analyze emotional stability correlation
  const emotionalTrades = trades.filter(t => t.emotionalDrift);
  if (emotionalTrades.length > 0) {
    const stableTrades = emotionalTrades.filter(t => {
      try {
        const drift = JSON.parse(t.emotionalDrift);
        return drift.preTradeEmotion === 'calm' || drift.preTradeEmotion === 'confident';
      } catch {
        return false;
      }
    });

    if (stableTrades.length / emotionalTrades.length > 0.7) {
      confidence += 10; // Mostly traded in stable emotional states
    }
  }

  // Analyze rule adherence
  const ruleFollowingTrades = trades.filter(t => t.strategyId).length;
  if (ruleFollowingTrades / trades.length > 0.8) {
    confidence += 10; // High rule adherence
  }

  // Sample size bonus
  if (trades.length >= 50) confidence += 5;
  if (trades.length >= 100) confidence += 5;

  return Math.min(100, Math.max(0, Math.round(confidence)));
}

/**
 * Calculate strategy performance metrics
 */
function calculateStrategyPerformance(strategy: any, trades: any[]): StrategyPerformance {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.outcome === 'profit');
  const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;

  const totalProfitLoss = trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
  const avgProfitLoss = totalTrades > 0 ? totalProfitLoss / totalTrades : 0;

  // Calculate consistency (lower variance = higher consistency)
  const profits = trades.map(t => t.profitLoss || 0);
  const mean = profits.reduce((sum, p) => sum + p, 0) / profits.length;
  const variance = profits.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / profits.length;
  const consistencyScore = Math.max(0, 100 - Math.sqrt(variance));

  // Calculate max drawdown (simplified)
  let peak = 0;
  let maxDrawdown = 0;
  let runningTotal = 0;

  for (const trade of trades) {
    runningTotal += trade.profitLoss || 0;
    if (runningTotal > peak) {
      peak = runningTotal;
    }
    const drawdown = peak - runningTotal;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  const edgeConfidence = calculateEdgeConfidence(strategy, trades);

  return {
    totalTrades,
    winRate: Math.round(winRate * 100) / 100,
    avgProfitLoss: Math.round(avgProfitLoss * 100) / 100,
    consistencyScore: Math.round(consistencyScore),
    drawdownMax: Math.round(maxDrawdown * 100) / 100,
    edgeConfidence
  };
}

/**
 * Get strategy insights based on performance analysis
 */
function generateStrategyInsights(performance: StrategyPerformance, trades: any[]): string[] {
  const insights: string[] = [];

  if (performance.totalTrades < 10) {
    insights.push('⚠️ Insufficient sample size - need more trades for reliable analysis');
  }

  if (performance.edgeConfidence >= 80) {
    insights.push('🎯 High confidence edge - this strategy shows strong, consistent performance');
  } else if (performance.edgeConfidence >= 60) {
    insights.push('👍 Moderate confidence edge - strategy shows promise but needs monitoring');
  } else if (performance.edgeConfidence >= 40) {
    insights.push('🤔 Low confidence edge - strategy may need refinement or more testing');
  } else {
    insights.push('⚠️ Poor edge confidence - consider reviewing or abandoning this strategy');
  }

  if (performance.consistencyScore >= 80) {
    insights.push('📊 Highly consistent performance across trades');
  } else if (performance.consistencyScore < 50) {
    insights.push('📈 Inconsistent results - look for patterns in winning vs losing trades');
  }

  const goodDecisionTrades = trades.filter(t =>
    t.decisionQuality?.includes('good_decision')
  ).length;

  if (goodDecisionTrades / performance.totalTrades > 0.7) {
    insights.push('🧠 Strong decision quality - most trades follow good trading principles');
  } else if (goodDecisionTrades / performance.totalTrades < 0.4) {
    insights.push('🤖 Poor decision quality - focus on improving trade selection criteria');
  }

  return insights;
}

export async function POST(request: NextRequest) {
  try {
    const { strategyId } = await request.json();

    if (!strategyId) {
      return NextResponse.json({ error: 'Strategy ID is required' }, { status: 400 });
    }

    // Fetch strategy with all related trades
    const strategy = await prisma.strategy.findUnique({
      where: { id: strategyId },
      include: {
        trades: {
          orderBy: { entryTime: 'desc' }
        }
      }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    // Calculate performance metrics
    const performance = calculateStrategyPerformance(strategy, strategy.trades);
    const insights = generateStrategyInsights(performance, strategy.trades);

    // Update strategy with edge confidence score
    const updatedStrategy = await prisma.strategy.update({
      where: { id: strategyId },
      data: {
        edgeConfidenceScore: performance.edgeConfidence,
        perfectExecutionCount: strategy.trades.filter(t =>
          t.decisionQuality === 'good_decision_good_outcome'
        ).length
      }
    });

    return NextResponse.json({
      success: true,
      strategyId,
      performance,
      insights,
      tradeCount: performance.totalTrades
    });

  } catch (error) {
    console.error('Error calculating edge confidence:', error);
    return NextResponse.json(
      { error: 'Failed to calculate edge confidence' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const strategyId = searchParams.get('strategyId');

    if (!strategyId) {
      return NextResponse.json({ error: 'Strategy ID is required' }, { status: 400 });
    }

    const strategy = await prisma.strategy.findUnique({
      where: { id: strategyId },
      select: {
        id: true,
        name: true,
        edgeConfidenceScore: true,
        perfectExecutionCount: true,
        _count: {
          select: { trades: true }
        }
      }
    });

    if (!strategy) {
      return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
    }

    return NextResponse.json({
      strategyId: strategy.id,
      strategyName: strategy.name,
      edgeConfidenceScore: strategy.edgeConfidenceScore,
      perfectExecutionCount: strategy.perfectExecutionCount,
      totalTrades: strategy._count.trades
    });

  } catch (error) {
    console.error('Error fetching edge confidence:', error);
    return NextResponse.json(
      { error: 'Failed to fetch edge confidence' },
      { status: 500 }
    );
  }
}