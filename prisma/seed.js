/* eslint-disable @typescript-eslint/no-require-imports */
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

    // Load advanced analytics sample data
    const dataDir = path.join(__dirname, '..', 'src', 'data');

    // Seed strategies
    const strategiesPath = path.join(dataDir, 'advanced-analytics-strategies.json');
    if (fs.existsSync(strategiesPath)) {
      const strategies = JSON.parse(fs.readFileSync(strategiesPath, 'utf8'));
      console.log(`Seeding ${strategies.length} strategies...`);
      for (const strategy of strategies) {
        await prisma.strategy.create({
          data: {
            id: strategy.id,
            userId: strategy.userId,
            name: strategy.name,
            description: strategy.description,
            rules: strategy.rules,
            entryModelId: strategy.entryModelId,
            timeframeSequenceId: strategy.timeframeSequenceId,
            version: strategy.version,
            parentVersionId: strategy.parentVersionId,
            abTestGroup: strategy.abTestGroup,
            edgeConfidenceScore: strategy.edgeConfidenceScore,
            perfectExecutionCount: strategy.perfectExecutionCount,
            cooldownRules: strategy.cooldownRules,
            pauseUntil: strategy.pauseUntil ? new Date(strategy.pauseUntil) : null,
            performanceMetrics: strategy.performanceMetrics,
            marketConditions: strategy.marketConditions,
            sessions: strategy.sessions,
            tags: strategy.tags,
          },
        });
      }
      console.log('Strategies seeded.');
    }

    // Seed market conditions
    const marketConditionsPath = path.join(dataDir, 'advanced-analytics-market-conditions.json');
    if (fs.existsSync(marketConditionsPath)) {
      const marketConditions = JSON.parse(fs.readFileSync(marketConditionsPath, 'utf8'));
      console.log(`Seeding ${marketConditions.length} market conditions...`);
      for (const condition of marketConditions) {
        await prisma.marketCondition.create({
          data: {
            id: condition.id,
            timestamp: new Date(condition.timestamp),
            marketState: condition.marketState,
            direction: condition.direction,
            strength: condition.strength,
            volatility: condition.volatility,
            liquidity: condition.liquidity,
            session: condition.session,
            indicators: condition.indicators,
            economicEvents: condition.economicEvents,
            marketHours: condition.marketHours,
          },
        });
      }
      console.log('Market conditions seeded.');
    }

    // Seed emotional states
    const emotionalStatesPath = path.join(dataDir, 'advanced-analytics-emotional-states.json');
    if (fs.existsSync(emotionalStatesPath)) {
      const emotionalStates = JSON.parse(fs.readFileSync(emotionalStatesPath, 'utf8'));
      console.log(`Seeding ${emotionalStates.length} emotional states...`);
      for (const state of emotionalStates) {
        await prisma.emotionalState.create({
          data: {
            id: state.id,
            timestamp: new Date(state.timestamp),
            emotionalState: state.emotionalState,
            focusLevel: state.focusLevel,
            confidenceLevel: state.confidenceLevel,
            stressLevel: state.stressLevel,
            energyLevel: state.energyLevel,
            mood: state.mood,
            externalFactors: state.externalFactors,
            physiologicalMetrics: state.physiologicalMetrics,
            cognitiveState: state.cognitiveState,
            tradingMindset: state.tradingMindset,
          },
        });
      }
      console.log('Emotional states seeded.');
    }

    // Seed advanced analytics trades
    const tradesPath = path.join(dataDir, 'advanced-analytics-trades.json');
    if (fs.existsSync(tradesPath)) {
      const trades = JSON.parse(fs.readFileSync(tradesPath, 'utf8'));
      console.log(`Seeding ${trades.length} advanced analytics trades...`);
      for (const trade of trades) {
        await prisma.trade.create({
          data: {
            id: trade.id,
            userId: trade.userId,
            pair: trade.pair,
            direction: trade.direction,
            entryPrice: trade.entryPrice,
            volume: trade.volume,
            entryTime: new Date(trade.entryTime),
            exitTime: trade.exitTime ? new Date(trade.exitTime) : null,
            exitPrice: trade.exitPrice,
            stopLoss: trade.stopLoss,
            takeProfit: trade.takeProfit,
            profitLoss: trade.profitLoss,
            outcome: trade.outcome,
            status: trade.status,
            strategyId: trade.strategyId,
            marketConditionId: trade.marketConditionId,
            emotionalStateId: trade.emotionalStateId,
            decisionScore: trade.decisionScore,
            decisionQuality: trade.decisionQuality,
            emotionalCost: trade.emotionalCost,
            notes: trade.notes,
            tags: trade.tags,
            screenshots: trade.screenshots,
            emotionalDrift: trade.emotionalDrift,
            learningPoints: trade.learningPoints,
            setupQuality: trade.setupQuality,
            executionQuality: trade.executionQuality,
            marketContext: trade.marketContext,
            riskRewardRatio: trade.riskRewardRatio,
            holdingTimeMinutes: trade.holdingTimeMinutes,
            slippage: trade.slippage,
            commission: trade.commission,
            taxes: trade.taxes,
            netProfitLoss: trade.netProfitLoss,
          },
        });
      }
      console.log('Advanced analytics trades seeded.');
    }

    // Seed decision quality data
    const decisionQualityPath = path.join(dataDir, 'advanced-analytics-decision-quality.json');
    if (fs.existsSync(decisionQualityPath)) {
      const decisionQualities = JSON.parse(fs.readFileSync(decisionQualityPath, 'utf8'));
      console.log(`Seeding ${decisionQualities.length} decision quality records...`);
      for (const dq of decisionQualities) {
        await prisma.decisionQuality.create({
          data: {
            id: dq.id,
            tradeId: dq.tradeId,
            timestamp: new Date(dq.timestamp),
            decisionQualityScore: dq.decisionQualityScore,
            executionQualityScore: dq.executionQualityScore,
            overallScore: dq.overallScore,
            decisionFactors: dq.decisionFactors,
            executionFactors: dq.executionFactors,
            mistakes: dq.mistakes,
            strengths: dq.strengths,
            learningPoints: dq.learningPoints,
            recommendations: dq.recommendations,
          },
        });
      }
      console.log('Decision quality records seeded.');
    }

    // Seed emotional cost data
    const emotionalCostPath = path.join(dataDir, 'advanced-analytics-emotional-cost.json');
    if (fs.existsSync(emotionalCostPath)) {
      const emotionalCosts = JSON.parse(fs.readFileSync(emotionalCostPath, 'utf8'));
      console.log(`Seeding ${emotionalCosts.length} emotional cost records...`);
      for (const ec of emotionalCosts) {
        await prisma.emotionalCost.create({
          data: {
            id: ec.id,
            tradeId: ec.tradeId,
            timestamp: new Date(ec.timestamp),
            emotionalCostScore: ec.emotionalCostScore,
            stressAccumulation: ec.stressAccumulation,
            decisionQualityImpact: ec.decisionQualityImpact,
            futurePerformanceImpact: ec.futurePerformanceImpact,
            recoveryTimeMinutes: ec.recoveryTimeMinutes,
            emotionalDrift: ec.emotionalDrift,
            behavioralImpacts: ec.behavioralImpacts,
            physiologicalCosts: ec.physiologicalCosts,
            opportunityCosts: ec.opportunityCosts,
            longTermEffects: ec.longTermEffects,
          },
        });
      }
      console.log('Emotional cost records seeded.');
    }

    // Seed edge confidence data
    const edgeConfidencePath = path.join(dataDir, 'advanced-analytics-edge-confidence.json');
    if (fs.existsSync(edgeConfidencePath)) {
      const edgeConfidences = JSON.parse(fs.readFileSync(edgeConfidencePath, 'utf8'));
      console.log(`Seeding ${edgeConfidences.length} edge confidence records...`);
      for (const ec of edgeConfidences) {
        await prisma.edgeConfidence.create({
          data: {
            id: ec.id,
            strategyId: ec.strategyId,
            timestamp: new Date(ec.timestamp),
            edgeConfidenceScore: ec.edgeConfidenceScore,
            edgeStrength: ec.edgeStrength,
            consistencyRating: ec.consistencyRating,
            sampleSize: ec.sampleSize,
            winRate: ec.winRate,
            avgWinLossRatio: ec.avgWinLossRatio,
            profitFactor: ec.profitFactor,
            maxDrawdown: ec.maxDrawdown,
            sharpeRatio: ec.sharpeRatio,
            edgeComponents: ec.edgeComponents,
            confidenceIntervals: ec.confidenceIntervals,
            edgeStability: ec.edgeStability,
            recommendations: ec.recommendations,
          },
        });
      }
      console.log('Edge confidence records seeded.');
    }

    console.log('All advanced analytics data seeded successfully!');
  } catch (e) {
    console.error('Seed error', e);
  } finally {
    await prisma.$disconnect();
  }
})();
