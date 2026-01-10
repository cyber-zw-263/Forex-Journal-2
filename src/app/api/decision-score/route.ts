import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface DecisionFactors {
  ruleAdherence: number;      // 0-100: How well did they follow their strategy rules?
  timingQuality: number;      // 0-100: Was the entry timing optimal?
  emotionalStability: number; // 0-100: Emotional state during trade
  riskManagement: number;     // 0-100: Proper position sizing and stop loss?
  marketAnalysis: number;     // 0-100: Quality of market analysis
  executionQuality: number;   // 0-100: Clean execution without hesitation
}

interface TradeContext {
  strategyRules?: any[];
  emotionalState?: string;
  marketConditions?: string;
  timeframe?: string;
  conviction?: number;
}

/**
 * Calculate decision quality score (0-100) based on multiple factors
 */
function calculateDecisionScore(factors: DecisionFactors, context: TradeContext): number {
  const weights = {
    ruleAdherence: 0.25,
    timingQuality: 0.20,
    emotionalStability: 0.20,
    riskManagement: 0.15,
    marketAnalysis: 0.10,
    executionQuality: 0.10
  };

  let score = 0;
  score += factors.ruleAdherence * weights.ruleAdherence;
  score += factors.timingQuality * weights.timingQuality;
  score += factors.emotionalStability * weights.emotionalStability;
  score += factors.riskManagement * weights.riskManagement;
  score += factors.marketAnalysis * weights.marketAnalysis;
  score += factors.executionQuality * weights.executionQuality;

  // Bonus for high conviction trades with good analysis
  if (context.conviction && context.conviction > 7 && factors.marketAnalysis > 70) {
    score += 5;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Classify decision quality based on score and outcome
 */
function classifyDecisionQuality(score: number, outcome: 'win' | 'loss'): {
  quality: 'excellent' | 'good' | 'poor' | 'terrible';
  classification: 'good_decision_bad_outcome' | 'bad_decision_good_outcome' | 'good_decision_good_outcome' | 'bad_decision_bad_outcome';
} {
  let quality: 'excellent' | 'good' | 'poor' | 'terrible';
  let classification: 'good_decision_bad_outcome' | 'bad_decision_good_outcome' | 'good_decision_good_outcome' | 'bad_decision_bad_outcome';

  if (score >= 80) {
    quality = 'excellent';
  } else if (score >= 60) {
    quality = 'good';
  } else if (score >= 40) {
    quality = 'poor';
  } else {
    quality = 'terrible';
  }

  if (score >= 60 && outcome === 'loss') {
    classification = 'good_decision_bad_outcome';
  } else if (score < 60 && outcome === 'win') {
    classification = 'bad_decision_good_outcome';
  } else if (score >= 60 && outcome === 'win') {
    classification = 'good_decision_good_outcome';
  } else {
    classification = 'bad_decision_bad_outcome';
  }

  return { quality, classification };
}

/**
 * Analyze a trade and calculate its decision score
 */
function analyzeTradeDecision(trade: any): {
  decisionScore: number;
  decisionQuality: string;
  factors: DecisionFactors;
  insights: string[];
} {
  const factors: DecisionFactors = {
    ruleAdherence: 50,    // Default neutral
    timingQuality: 50,
    emotionalStability: 50,
    riskManagement: 50,
    marketAnalysis: 50,
    executionQuality: 50
  };

  const insights: string[] = [];

  // Analyze rule adherence
  if (trade.strategyId) {
    factors.ruleAdherence = 80; // Assume good if strategy was followed
    insights.push('Strategy rules were followed');
  } else {
    factors.ruleAdherence = 30;
    insights.push('No clear strategy followed');
  }

  // Analyze emotional stability
  if (trade.emotionalDrift) {
    const drift = JSON.parse(trade.emotionalDrift);
    if (drift.preTradeEmotion === 'calm' || drift.preTradeEmotion === 'confident') {
      factors.emotionalStability = 80;
      insights.push('Entered trade in good emotional state');
    } else if (drift.preTradeEmotion === 'anxious' || drift.preTradeEmotion === 'frustrated') {
      factors.emotionalStability = 30;
      insights.push('Entered trade in poor emotional state');
    }
  }

  // Analyze risk management
  if (trade.stopLoss && trade.takeProfit) {
    factors.riskManagement = 85;
    insights.push('Proper risk management with stop loss and take profit');
  } else if (trade.stopLoss) {
    factors.riskManagement = 60;
    insights.push('Stop loss set but no take profit defined');
  } else {
    factors.riskManagement = 20;
    insights.push('Poor risk management - no stop loss');
  }

  // Analyze market conditions
  if (trade.marketCondition) {
    factors.marketAnalysis = 75;
    insights.push(`Traded in ${trade.marketCondition} conditions`);
  }

  // Analyze timing
  if (trade.timeframe && trade.entryTime) {
    // Higher score for appropriate timeframes
    const timeframe = trade.timeframe.toLowerCase();
    if (timeframe.includes('h1') || timeframe.includes('h4') || timeframe.includes('d1')) {
      factors.timingQuality = 80;
      insights.push('Appropriate timeframe for analysis');
    } else if (timeframe.includes('m5') || timeframe.includes('m15')) {
      factors.timingQuality = 40;
      insights.push('Very short timeframe may indicate impulsive trading');
    }
  }

  // Analyze execution
  if (trade.executionNotes) {
    if (trade.executionNotes.toLowerCase().includes('hesitation') ||
        trade.executionNotes.toLowerCase().includes('delayed')) {
      factors.executionQuality = 40;
      insights.push('Execution showed hesitation or delay');
    } else {
      factors.executionQuality = 80;
      insights.push('Clean execution');
    }
  }

  const context: TradeContext = {
    strategyRules: trade.strategy?.rules || [],
    emotionalState: trade.emotionalDrift ? JSON.parse(trade.emotionalDrift).preTradeEmotion : undefined,
    marketConditions: trade.marketCondition,
    timeframe: trade.timeframe,
    conviction: trade.conviction
  };

  const decisionScore = calculateDecisionScore(factors, context);
  const { quality, classification } = classifyDecisionQuality(decisionScore, trade.outcome === 'profit' ? 'win' : 'loss');

  return {
    decisionScore,
    decisionQuality: classification,
    factors,
    insights
  };
}

export async function POST(request: NextRequest) {
  try {
    const { tradeId } = await request.json();

    if (!tradeId) {
      return NextResponse.json({ error: 'Trade ID is required' }, { status: 400 });
    }

    // Fetch trade with related data
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
      include: {
        strategy: {
          include: {
            rules: true
          }
        }
      }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Analyze the trade decision
    const analysis = analyzeTradeDecision(trade);

    // Update the trade with the calculated scores
    const updatedTrade = await prisma.trade.update({
      where: { id: tradeId },
      data: {
        decisionScore: analysis.decisionScore,
        decisionQuality: analysis.decisionQuality
      }
    });

    return NextResponse.json({
      success: true,
      tradeId,
      analysis: {
        decisionScore: analysis.decisionScore,
        decisionQuality: analysis.decisionQuality,
        factors: analysis.factors,
        insights: analysis.insights
      }
    });

  } catch (error) {
    console.error('Error calculating decision score:', error);
    return NextResponse.json(
      { error: 'Failed to calculate decision score' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tradeId = searchParams.get('tradeId');

    if (!tradeId) {
      return NextResponse.json({ error: 'Trade ID is required' }, { status: 400 });
    }

    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
      select: {
        id: true,
        decisionScore: true,
        decisionQuality: true,
        outcome: true,
        strategy: {
          select: {
            name: true
          }
        }
      }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    return NextResponse.json({
      tradeId: trade.id,
      decisionScore: trade.decisionScore,
      decisionQuality: trade.decisionQuality,
      outcome: trade.outcome,
      strategy: trade.strategy?.name
    });

  } catch (error) {
    console.error('Error fetching decision score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch decision score' },
      { status: 500 }
    );
  }
}