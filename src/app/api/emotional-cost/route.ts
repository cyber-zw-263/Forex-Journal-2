import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface EmotionalState {
  emotion: string;
  intensity: number; // 1-10
  timestamp: Date;
}

interface EmotionalCostFactors {
  preTradeEmotion: EmotionalState;
  postTradeEmotion: EmotionalState;
  tradeOutcome: 'profit' | 'loss';
  tradeSize: number; // Risk amount
  timeToRecover: number; // Hours to return to baseline
  stressLevel: number; // 1-10 during trade
}

interface EmotionalCostResult {
  immediateCost: number; // 0-100
  longTermCost: number; // 0-100
  recoveryTime: number; // Hours
  stressAccumulation: number; // Cumulative stress points
  recommendations: string[];
}

/**
 * Calculate emotional cost of a trading decision
 */
function calculateEmotionalCost(factors: EmotionalCostFactors): EmotionalCostResult {
  let immediateCost = 0;
  let longTermCost = 0;
  let recoveryTime = 0;
  let stressAccumulation = 0;
  const recommendations: string[] = [];

  const { preTradeEmotion, postTradeEmotion, tradeOutcome, tradeSize, timeToRecover, stressLevel } = factors;

  // Base emotional cost from pre-trade state
  const negativeEmotions = ['anxious', 'frustrated', 'angry', 'fearful', 'overconfident'];
  const positiveEmotions = ['calm', 'confident', 'neutral'];

  if (negativeEmotions.includes(preTradeEmotion.emotion)) {
    immediateCost += 30;
    stressAccumulation += preTradeEmotion.intensity * 2;
    recommendations.push('Consider waiting for better emotional state before trading');
  } else if (positiveEmotions.includes(preTradeEmotion.emotion)) {
    immediateCost += 10;
    stressAccumulation += preTradeEmotion.intensity * 0.5;
  }

  // Cost from post-trade emotional change
  const emotionalShift = postTradeEmotion.intensity - preTradeEmotion.intensity;

  if (emotionalShift > 3) {
    immediateCost += 25;
    longTermCost += 15;
    stressAccumulation += emotionalShift * 3;
    recommendations.push('Significant emotional escalation - review trade management');
  } else if (emotionalShift < -2) {
    immediateCost += 15;
    recommendations.push('Emotional improvement after trade - positive sign');
  }

  // Outcome-based cost adjustment
  if (tradeOutcome === 'loss') {
    immediateCost += 20;
    longTermCost += 10;

    if (postTradeEmotion.emotion === 'frustrated' || postTradeEmotion.emotion === 'angry') {
      immediateCost += 15;
      longTermCost += 20;
      stressAccumulation += 15;
      recommendations.push('Loss combined with negative emotion - high risk of revenge trading');
    }
  } else {
    // Winning trade
    if (postTradeEmotion.emotion === 'overconfident' || postTradeEmotion.emotion === 'euphoric') {
      immediateCost += 10;
      longTermCost += 15;
      recommendations.push('Winning trade euphoria - watch for overconfidence in next trades');
    }
  }

  // Trade size impact
  if (tradeSize > 100) { // Assuming currency amount
    immediateCost *= 1.3;
    longTermCost *= 1.2;
    stressAccumulation *= 1.4;
    recommendations.push('Large position size increased emotional impact');
  }

  // Recovery time calculation
  recoveryTime = timeToRecover || 0;

  if (recoveryTime > 24) {
    longTermCost += 20;
    recommendations.push('Extended recovery time indicates significant emotional impact');
  } else if (recoveryTime < 1) {
    recommendations.push('Quick emotional recovery - good resilience');
  }

  // Stress level during trade
  stressAccumulation += stressLevel * 2;

  if (stressLevel > 7) {
    immediateCost += 15;
    longTermCost += 10;
    recommendations.push('High stress during trade - consider break or smaller positions');
  }

  // Cap values
  immediateCost = Math.min(100, Math.max(0, Math.round(immediateCost)));
  longTermCost = Math.min(100, Math.max(0, Math.round(longTermCost)));
  stressAccumulation = Math.round(stressAccumulation);

  return {
    immediateCost,
    longTermCost,
    recoveryTime,
    stressAccumulation,
    recommendations
  };
}

/**
 * Analyze emotional drift from trade data
 */
function analyzeEmotionalDrift(trade: any): EmotionalCostFactors | null {
  if (!trade.emotionalDrift) {
    return null;
  }

  try {
    const drift = JSON.parse(trade.emotionalDrift);

    return {
      preTradeEmotion: {
        emotion: drift.preTradeEmotion || 'neutral',
        intensity: drift.preTradeIntensity || 5,
        timestamp: new Date(trade.entryTime)
      },
      postTradeEmotion: {
        emotion: drift.postTradeEmotion || drift.preTradeEmotion || 'neutral',
        intensity: drift.postTradeIntensity || drift.preTradeIntensity || 5,
        timestamp: new Date(trade.exitTime || trade.entryTime)
      },
      tradeOutcome: trade.outcome === 'profit' ? 'profit' : 'loss',
      tradeSize: trade.positionSize || trade.riskAmount || 0,
      timeToRecover: drift.timeToRecover || 0,
      stressLevel: drift.stressLevel || 5
    };
  } catch (error) {
    console.error('Error parsing emotional drift:', error);
    return null;
  }
}

/**
 * Get emotional cost insights
 */
function getEmotionalCostInsights(cost: EmotionalCostResult): string[] {
  const insights: string[] = [];

  if (cost.immediateCost >= 70) {
    insights.push('🚨 Extremely high immediate emotional cost - consider taking a break');
  } else if (cost.immediateCost >= 50) {
    insights.push('⚠️ High immediate emotional cost - monitor closely');
  } else if (cost.immediateCost <= 20) {
    insights.push('✅ Low immediate emotional cost - good emotional control');
  }

  if (cost.longTermCost >= 60) {
    insights.push('🔴 Significant long-term emotional damage - review trading approach');
  } else if (cost.longTermCost >= 30) {
    insights.push('🟡 Moderate long-term emotional impact - track recovery');
  }

  if (cost.stressAccumulation >= 50) {
    insights.push('💔 High stress accumulation - risk of burnout');
  }

  if (cost.recoveryTime > 48) {
    insights.push('⏰ Very long recovery time - emotional resilience needs work');
  } else if (cost.recoveryTime < 2) {
    insights.push('⚡ Fast emotional recovery - good psychological resilience');
  }

  return insights;
}

export async function POST(request: NextRequest) {
  try {
    const { tradeId } = await request.json();

    if (!tradeId) {
      return NextResponse.json({ error: 'Trade ID is required' }, { status: 400 });
    }

    // Fetch trade with emotional data
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    // Analyze emotional drift
    const emotionalFactors = analyzeEmotionalDrift(trade);

    if (!emotionalFactors) {
      return NextResponse.json({
        error: 'No emotional data available for this trade',
        tradeId
      }, { status: 400 });
    }

    // Calculate emotional cost
    const emotionalCost = calculateEmotionalCost(emotionalFactors);
    const insights = getEmotionalCostInsights(emotionalCost);

    // Update trade with emotional cost
    const updatedTrade = await prisma.trade.update({
      where: { id: tradeId },
      data: {
        emotionalCost: emotionalCost.immediateCost
      }
    });

    return NextResponse.json({
      success: true,
      tradeId,
      emotionalCost,
      insights,
      factors: emotionalFactors
    });

  } catch (error) {
    console.error('Error calculating emotional cost:', error);
    return NextResponse.json(
      { error: 'Failed to calculate emotional cost' },
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
        emotionalCost: true,
        emotionalDrift: true,
        outcome: true
      }
    });

    if (!trade) {
      return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    }

    return NextResponse.json({
      tradeId: trade.id,
      emotionalCost: trade.emotionalCost,
      hasEmotionalData: !!trade.emotionalDrift,
      outcome: trade.outcome
    });

  } catch (error) {
    console.error('Error fetching emotional cost:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emotional cost' },
      { status: 500 }
    );
  }
}