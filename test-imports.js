import {
  calculateDecisionQuality,
  calculateExecutionQuality,
  calculateEmotionalCost,
  calculateDecisionScore
} from '../lib/advanced-analytics-calculations';

console.log('Testing imports...');

// Test with a simple trade
const testTrade = {
  id: 'test-trade',
  userId: 'test-user',
  pair: 'EUR/USD',
  direction: 'LONG',
  entryPrice: 1.0500,
  exitPrice: 1.0600,
  entryTime: new Date(),
  volume: 1.0,
  stopLoss: 1.0450,
  takeProfit: 1.0600,
  profitLoss: 100,
  outcome: 'profit',
  strategyId: 'test-strategy',
  setupQuality: 8,
  riskRewardRatio: 3.0,
  holdingTimeMinutes: 45
};

try {
  const decisionQuality = calculateDecisionQuality(testTrade);
  console.log('Decision Quality Score:', decisionQuality.score);
  console.log('Decision Quality Factors:', decisionQuality.factors);

  const executionQuality = calculateExecutionQuality(testTrade);
  console.log('Execution Quality Score:', executionQuality.score);

  const emotionalCost = calculateEmotionalCost(testTrade);
  console.log('Emotional Cost Score:', emotionalCost.emotionalCostScore);

  const decisionScore = calculateDecisionScore(testTrade);
  console.log('Overall Decision Score:', decisionScore);

  console.log('All tests passed!');
} catch (error) {
  console.error('Error:', error);
}