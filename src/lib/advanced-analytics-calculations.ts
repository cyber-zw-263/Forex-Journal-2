import { PrismaClient } from '@prisma/client';

export interface TradeData {
  id: string;
  userId: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number | null;
  entryTime: Date;
  exitTime?: Date | null;
  volume: number;
  stopLoss?: number | null;
  takeProfit?: number | null;
  profitLoss?: number | null;
  outcome?: string | null;
  strategyId?: string | null;
  marketConditionId?: string | null;
  emotionalStateId?: string | null;
  notes?: string | null;
  tags?: string[];
  emotionalDrift?: any;
  learningPoints?: string[];
  setupQuality?: number | null;
  executionQuality?: number | null;
  marketContext?: any;
  riskRewardRatio?: number | null;
  holdingTimeMinutes?: number | null;
}

export interface DecisionQualityFactors {
  setupQuality: number;
  timingQuality: number;
  riskManagement: number;
  strategyAlignment: number;
  marketConditionMatch: number;
}

export interface ExecutionQualityFactors {
  entryPrecision: number;
  stopPlacement: number;
  positionSizing: number;
  exitDiscipline: number;
  emotionalControl: number;
}

export interface EmotionalCostMetrics {
  emotionalCostScore: number;
  stressAccumulation: number;
  decisionQualityImpact: number;
  futurePerformanceImpact: number;
  recoveryTimeMinutes: number;
}

/**
 * Calculate decision quality score based on trade characteristics
 */
export function calculateDecisionQuality(trade: TradeData): {
  score: number;
  factors: DecisionQualityFactors;
  mistakes: string[];
  strengths: string[];
  learningPoints: string[];
  recommendations: string[];
} {
  let score = 0;
  const factors: DecisionQualityFactors = {
    setupQuality: 0,
    timingQuality: 0,
    riskManagement: 0,
    strategyAlignment: 0,
    marketConditionMatch: 0,
  };

  const mistakes: string[] = [];
  const strengths: string[] = [];
  const learningPoints: string[] = [];
  const recommendations: string[] = [];

  // Setup Quality (0-10)
  if (trade.setupQuality) {
    factors.setupQuality = Math.max(0, Math.min(10, trade.setupQuality));
  } else {
    // Infer from trade characteristics
    factors.setupQuality = 6; // Default neutral
    if (trade.riskRewardRatio && trade.riskRewardRatio >= 2) {
      factors.setupQuality += 2;
      strengths.push('Good risk-reward ratio');
    }
    if (trade.stopLoss && trade.takeProfit) {
      factors.setupQuality += 1;
      strengths.push('Clear stop and target levels');
    }
  }

  // Timing Quality (0-10)
  factors.timingQuality = 7; // Default good timing
  if (trade.holdingTimeMinutes) {
    if (trade.holdingTimeMinutes < 5) {
      factors.timingQuality -= 2;
      mistakes.push('Very short holding time');
      learningPoints.push('Allow trades more time to develop');
    } else if (trade.holdingTimeMinutes > 480) { // 8 hours
      factors.timingQuality -= 1;
      mistakes.push('Very long holding time');
      learningPoints.push('Consider taking profits earlier');
    }
  }

  // Risk Management (0-10)
  factors.riskManagement = 5; // Default
  if (trade.stopLoss) {
    factors.riskManagement += 2;
    strengths.push('Stop loss in place');
  } else {
    factors.riskManagement -= 3;
    mistakes.push('No stop loss');
    learningPoints.push('Always use stop losses');
    recommendations.push('Implement mandatory stop loss policy');
  }

  if (trade.riskRewardRatio) {
    if (trade.riskRewardRatio >= 2) {
      factors.riskManagement += 2;
      strengths.push('Favorable risk-reward ratio');
    } else if (trade.riskRewardRatio < 1) {
      factors.riskManagement -= 2;
      mistakes.push('Poor risk-reward ratio');
      learningPoints.push('Only take trades with RR >= 2:1');
    }
  }

  // Strategy Alignment (0-10)
  factors.strategyAlignment = trade.strategyId ? 8 : 4;
  if (trade.strategyId) {
    strengths.push('Strategy-based trade');
  } else {
    mistakes.push('No strategy specified');
    learningPoints.push('Always trade with a defined strategy');
    recommendations.push('Create and follow trading strategies');
  }

  // Market Condition Match (0-10)
  factors.marketConditionMatch = trade.marketConditionId ? 8 : 5;
  if (trade.marketConditionId) {
    strengths.push('Market conditions considered');
  }

  // Calculate overall score
  score = Math.round(
    (factors.setupQuality * 0.25 +
     factors.timingQuality * 0.20 +
     factors.riskManagement * 0.25 +
     factors.strategyAlignment * 0.15 +
     factors.marketConditionMatch * 0.15)
  );

  return {
    score,
    factors,
    mistakes,
    strengths,
    learningPoints,
    recommendations,
  };
}

/**
 * Calculate execution quality score
 */
export function calculateExecutionQuality(trade: TradeData): {
  score: number;
  factors: ExecutionQualityFactors;
} {
  const factors: ExecutionQualityFactors = {
    entryPrecision: 7, // Default good
    stopPlacement: 5,
    positionSizing: 6,
    exitDiscipline: 6,
    emotionalControl: 7,
  };

  // Entry Precision
  if (trade.profitLoss !== undefined && trade.profitLoss !== null) {
    // Better entry if profitable
    factors.entryPrecision = trade.profitLoss > 0 ? 8 : 6;
  }

  // Stop Placement
  if (trade.stopLoss) {
    factors.stopPlacement = 8;
  } else {
    factors.stopPlacement = 2;
  }

  // Position Sizing
  if (trade.volume) {
    // Assume reasonable sizing if volume is provided
    factors.positionSizing = Math.min(10, Math.max(4, trade.volume * 10));
  }

  // Exit Discipline
  if (trade.takeProfit && trade.exitPrice) {
    factors.exitDiscipline = 8;
  } else if (trade.outcome === 'profit') {
    factors.exitDiscipline = 7;
  } else {
    factors.exitDiscipline = 5;
  }

  // Emotional Control (inferred)
  if (trade.emotionalDrift) {
    const drift = trade.emotionalDrift;
    if (drift.confidenceChange < -20 || drift.stressChange > 30) {
      factors.emotionalControl = 3;
    } else if (drift.confidenceChange < -10 || drift.stressChange > 15) {
      factors.emotionalControl = 5;
    } else {
      factors.emotionalControl = 8;
    }
  }

  const score = Math.round(
    (factors.entryPrecision * 0.20 +
     factors.stopPlacement * 0.20 +
     factors.positionSizing * 0.15 +
     factors.exitDiscipline * 0.25 +
     factors.emotionalControl * 0.20)
  );

  return { score, factors };
}

/**
 * Calculate emotional cost metrics
 */
export function calculateEmotionalCost(trade: TradeData): EmotionalCostMetrics {
  let emotionalCostScore = 0;
  let stressAccumulation = 0;
  let decisionQualityImpact = 0;
  let futurePerformanceImpact = 0;
  let recoveryTimeMinutes = 0;

  if (trade.emotionalDrift) {
    const drift = trade.emotionalDrift;

    // Base emotional cost on confidence and stress changes
    const confidenceImpact = Math.abs(drift.confidenceChange || 0);
    const stressImpact = Math.abs(drift.stressChange || 0);
    const focusImpact = Math.abs(drift.focusChange || 0);
    const energyImpact = Math.abs(drift.energyChange || 0);

    emotionalCostScore = Math.round(
      (confidenceImpact * 0.3 + stressImpact * 0.3 + focusImpact * 0.2 + energyImpact * 0.2)
    );

    stressAccumulation = Math.max(0, (drift.stressChange || 0) + (drift.energyChange || 0) * 0.5);
    decisionQualityImpact = Math.max(0, -1 * (drift.confidenceChange || 0) * 0.8);
    futurePerformanceImpact = Math.max(0, emotionalCostScore * 0.6);

    // Recovery time based on emotional cost
    if (emotionalCostScore > 50) {
      recoveryTimeMinutes = 480; // 8 hours
    } else if (emotionalCostScore > 25) {
      recoveryTimeMinutes = 180; // 3 hours
    } else {
      recoveryTimeMinutes = 30; // 30 minutes
    }
  } else {
    // Default values for trades without emotional drift data
    emotionalCostScore = trade.profitLoss && trade.profitLoss < 0 ? 25 : 10;
    stressAccumulation = trade.profitLoss && trade.profitLoss < 0 ? 20 : 5;
    decisionQualityImpact = trade.profitLoss && trade.profitLoss < 0 ? 15 : 5;
    futurePerformanceImpact = emotionalCostScore * 0.5;
    recoveryTimeMinutes = 60;
  }

  return {
    emotionalCostScore,
    stressAccumulation,
    decisionQualityImpact,
    futurePerformanceImpact,
    recoveryTimeMinutes,
  };
}

/**
 * Calculate overall decision score (0-100)
 */
export function calculateDecisionScore(trade: TradeData): number {
  const decisionQuality = calculateDecisionQuality(trade);
  const executionQuality = calculateExecutionQuality(trade);

  // Weight decision quality more heavily than execution
  return Math.round(decisionQuality.score * 0.6 + executionQuality.score * 0.4);
}

/**
 * Update trade with calculated analytics
 */
export async function updateTradeAnalytics(prisma: PrismaClient, tradeId: string): Promise<void> {
  const trade = await prisma.trade.findUnique({
    where: { id: tradeId },
    include: {
      strategy: true,
      marketCondition: true,
      emotionalState: true,
    },
  });

  if (!trade) {
    throw new Error(`Trade ${tradeId} not found`);
  }

  const decisionQuality = calculateDecisionQuality(trade);
  const executionQuality = calculateExecutionQuality(trade);
  const emotionalCost = calculateEmotionalCost(trade);
  const decisionScore = calculateDecisionScore(trade);

  // Update trade with calculated values
  await prisma.trade.update({
    where: { id: tradeId },
    data: {
      decisionScore,
      decisionQuality: {
        decisionQualityScore: decisionQuality.score,
        executionQualityScore: executionQuality.score,
        overallScore: decisionScore,
        decisionFactors: decisionQuality.factors,
        executionFactors: executionQuality.factors,
        mistakes: decisionQuality.mistakes,
        strengths: decisionQuality.strengths,
        learningPoints: decisionQuality.learningPoints,
        recommendations: decisionQuality.recommendations,
      },
      emotionalCost: {
        emotionalCostScore: emotionalCost.emotionalCostScore,
        stressAccumulation: emotionalCost.stressAccumulation,
        decisionQualityImpact: emotionalCost.decisionQualityImpact,
        futurePerformanceImpact: emotionalCost.futurePerformanceImpact,
        recoveryTimeMinutes: emotionalCost.recoveryTimeMinutes,
        emotionalDrift: trade.emotionalDrift,
        behavioralImpacts: {},
        physiologicalCosts: {},
        opportunityCosts: {},
        longTermEffects: {},
      },
    },
  });

  // Create or update decision quality record
  await prisma.decisionQuality.upsert({
    where: { tradeId },
    update: {
      decisionQualityScore: decisionQuality.score,
      executionQualityScore: executionQuality.score,
      overallScore: decisionScore,
      decisionFactors: decisionQuality.factors,
      executionFactors: executionQuality.factors,
      mistakes: decisionQuality.mistakes,
      strengths: decisionQuality.strengths,
      learningPoints: decisionQuality.learningPoints,
      recommendations: decisionQuality.recommendations,
    },
    create: {
      id: `dq-${tradeId}`,
      tradeId,
      timestamp: new Date(),
      decisionQualityScore: decisionQuality.score,
      executionQualityScore: executionQuality.score,
      overallScore: decisionScore,
      decisionFactors: decisionQuality.factors,
      executionFactors: executionQuality.factors,
      mistakes: decisionQuality.mistakes,
      strengths: decisionQuality.strengths,
      learningPoints: decisionQuality.learningPoints,
      recommendations: decisionQuality.recommendations,
    },
  });

  // Create or update emotional cost record
  await prisma.emotionalCost.upsert({
    where: { tradeId },
    update: {
      emotionalCostScore: emotionalCost.emotionalCostScore,
      stressAccumulation: emotionalCost.stressAccumulation,
      decisionQualityImpact: emotionalCost.decisionQualityImpact,
      futurePerformanceImpact: emotionalCost.futurePerformanceImpact,
      recoveryTimeMinutes: emotionalCost.recoveryTimeMinutes,
      emotionalDrift: trade.emotionalDrift,
    },
    create: {
      id: `ec-${tradeId}`,
      tradeId,
      timestamp: new Date(),
      emotionalCostScore: emotionalCost.emotionalCostScore,
      stressAccumulation: emotionalCost.stressAccumulation,
      decisionQualityImpact: emotionalCost.decisionQualityImpact,
      futurePerformanceImpact: emotionalCost.futurePerformanceImpact,
      recoveryTimeMinutes: emotionalCost.recoveryTimeMinutes,
      emotionalDrift: trade.emotionalDrift,
      behavioralImpacts: {},
      physiologicalCosts: {},
      opportunityCosts: {},
      longTermEffects: {},
    },
  });
}