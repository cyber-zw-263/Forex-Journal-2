import {
  calculateDecisionQuality,
  calculateExecutionQuality,
  calculateEmotionalCost,
  calculateDecisionScore
} from '@/lib/advanced-analytics-calculations';

describe('Advanced Analytics Calculations', () => {
  describe('calculateDecisionQuality', () => {
    it('should calculate high quality score for well-executed trade', () => {
      const trade = {
        id: 'trade-1',
        userId: 'user-1',
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
        strategyId: 'strategy-1',
        notes: 'Good execution',
        tags: ['trending', 'momentum'],
        setupQuality: 9,
        riskRewardRatio: 3.0,
        holdingTimeMinutes: 45
      };

      const result = calculateDecisionQuality(trade);

      expect(result.score).toBeGreaterThan(80);
      expect(result.factors.setupQuality).toBe(9);
      expect(result.factors.riskManagement).toBeGreaterThan(80);
      expect(result.strengths).toContain('Good risk-reward ratio');
      expect(result.strengths).toContain('Strategy rules were followed');
    });

    it('should calculate low quality score for poorly executed trade', () => {
      const trade = {
        id: 'trade-2',
        userId: 'user-1',
        pair: 'EUR/USD',
        direction: 'LONG',
        entryPrice: 1.0500,
        profitLoss: -50,
        outcome: 'loss',
        strategyId: null, // No strategy
        stopLoss: null, // No stop loss
        riskRewardRatio: 0.5, // Poor RR
        setupQuality: 3,
        holdingTimeMinutes: 5 // Very short holding time
      };

      const result = calculateDecisionQuality(trade);

      expect(result.score).toBeLessThan(40);
      expect(result.factors.riskManagement).toBeLessThan(30);
      expect(result.mistakes).toContain('No stop loss');
      expect(result.mistakes).toContain('No clear strategy followed');
      expect(result.learningPoints).toContain('Always use stop losses');
    });

    it('should handle trades with missing data gracefully', () => {
      const trade = {
        id: 'trade-3',
        userId: 'user-1',
        pair: 'EUR/USD',
        direction: 'LONG',
        entryPrice: 1.0500,
        profitLoss: 25,
        outcome: 'profit'
        // Missing many fields
      };

      const result = calculateDecisionQuality(trade);

      expect(result.score).toBeDefined();
      expect(result.factors).toBeDefined();
      expect(typeof result.score).toBe('number');
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  describe('calculateExecutionQuality', () => {
    it('should calculate high execution quality for precise trade', () => {
      const trade = {
        id: 'trade-1',
        userId: 'user-1',
        entryPrice: 1.0500,
        exitPrice: 1.0520,
        stopLoss: 1.0480,
        takeProfit: 1.0520,
        profitLoss: 20,
        outcome: 'profit',
        volume: 1.0
      };

      const result = calculateExecutionQuality(trade);

      expect(result.score).toBeGreaterThan(70);
      expect(result.factors.stopPlacement).toBe(8);
      expect(result.factors.entryPrecision).toBeGreaterThan(5);
    });

    it('should calculate low execution quality for sloppy trade', () => {
      const trade = {
        id: 'trade-2',
        userId: 'user-1',
        profitLoss: -75,
        outcome: 'loss',
        stopLoss: null, // No stop loss
        volume: 5.0 // Large position
      };

      const result = calculateExecutionQuality(trade);

      expect(result.score).toBeLessThan(50);
      expect(result.factors.stopPlacement).toBe(2);
      expect(result.factors.positionSizing).toBeGreaterThan(3); // Still reasonable
    });
  });

  describe('calculateEmotionalCost', () => {
    it('should calculate high emotional cost for stressful trade', () => {
      const trade = {
        id: 'trade-1',
        userId: 'user-1',
        profitLoss: -200,
        outcome: 'loss',
        emotionalDrift: {
          confidenceChange: -25,
          stressChange: 35,
          focusChange: -15,
          energyChange: -20
        }
      };

      const result = calculateEmotionalCost(trade);

      expect(result.emotionalCostScore).toBeGreaterThan(70);
      expect(result.stressAccumulation).toBeGreaterThan(30);
      expect(result.recoveryTimeMinutes).toBeGreaterThan(100);
      expect(result.futurePerformanceImpact).toBeGreaterThan(40);
    });

    it('should calculate low emotional cost for calm trade', () => {
      const trade = {
        id: 'trade-2',
        userId: 'user-1',
        profitLoss: 50,
        outcome: 'profit',
        emotionalDrift: {
          confidenceChange: 10,
          stressChange: -5,
          focusChange: 5,
          energyChange: 3
        }
      };

      const result = calculateEmotionalCost(trade);

      expect(result.emotionalCostScore).toBeLessThan(20);
      expect(result.stressAccumulation).toBeLessThan(10);
      expect(result.recoveryTimeMinutes).toBeLessThan(60);
    });

    it('should handle trades without emotional drift data', () => {
      const trade = {
        id: 'trade-3',
        userId: 'user-1',
        profitLoss: -30,
        outcome: 'loss'
        // No emotional drift
      };

      const result = calculateEmotionalCost(trade);

      expect(result.emotionalCostScore).toBeDefined();
      expect(result.stressAccumulation).toBeDefined();
      expect(result.recoveryTimeMinutes).toBeDefined();
      // Should use default values
      expect(result.emotionalCostScore).toBeGreaterThan(20);
      expect(result.emotionalCostScore).toBeLessThan(30);
    });
  });

  describe('calculateDecisionScore', () => {
    it('should combine decision and execution quality', () => {
      const trade = {
        id: 'trade-1',
        userId: 'user-1',
        strategyId: 'strategy-1',
        stopLoss: 1.0480,
        takeProfit: 1.0520,
        profitLoss: 40,
        outcome: 'profit',
        setupQuality: 8,
        riskRewardRatio: 2.0
      };

      const score = calculateDecisionScore(trade);

      expect(score).toBeDefined();
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
      // Should be weighted average of decision and execution quality
      expect(score).toBeGreaterThan(60); // Good trade should score well
    });

    it('should handle edge cases', () => {
      const trade = {
        id: 'trade-1',
        userId: 'user-1'
        // Minimal trade data
      };

      const score = calculateDecisionScore(trade);

      expect(score).toBeDefined();
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  describe('Integration Tests', () => {
    it('should calculate comprehensive analytics for a complete trade', () => {
      const trade = {
        id: 'comprehensive-trade',
        userId: 'user-1',
        pair: 'EUR/USD',
        direction: 'LONG',
        entryPrice: 1.0500,
        exitPrice: 1.0550,
        entryTime: new Date(),
        volume: 1.0,
        stopLoss: 1.0475,
        takeProfit: 1.0550,
        profitLoss: 50,
        outcome: 'profit',
        strategyId: 'trend-following',
        notes: 'Perfect execution of trend following strategy',
        tags: ['trending', 'momentum', 'high_probability'],
        emotionalDrift: {
          confidenceChange: 8,
          stressChange: -3,
          focusChange: 5,
          energyChange: 2
        },
        setupQuality: 9,
        executionQuality: 9,
        marketContext: {
          trend: 'bullish',
          volatility: 'moderate',
          liquidity: 'high'
        },
        riskRewardRatio: 2.5,
        holdingTimeMinutes: 120
      };

      const decisionQuality = calculateDecisionQuality(trade);
      const executionQuality = calculateExecutionQuality(trade);
      const emotionalCost = calculateEmotionalCost(trade);
      const overallScore = calculateDecisionScore(trade);

      // Decision Quality should be excellent
      expect(decisionQuality.score).toBeGreaterThan(85);
      expect(decisionQuality.factors.setupQuality).toBe(9);
      expect(decisionQuality.factors.riskManagement).toBeGreaterThan(80);
      expect(decisionQuality.strengths.length).toBeGreaterThan(2);

      // Execution Quality should be excellent
      expect(executionQuality.score).toBeGreaterThan(80);
      expect(executionQuality.factors.stopPlacement).toBe(8);

      // Emotional Cost should be very low
      expect(emotionalCost.emotionalCostScore).toBeLessThan(15);
      expect(emotionalCost.stressAccumulation).toBeLessThan(5);

      // Overall score should be excellent
      expect(overallScore).toBeGreaterThan(85);
    });

    it('should handle a disastrous trade scenario', () => {
      const trade = {
        id: 'disastrous-trade',
        userId: 'user-1',
        pair: 'EUR/USD',
        direction: 'SHORT',
        entryPrice: 1.0500,
        exitPrice: 1.0400,
        entryTime: new Date(),
        volume: 5.0, // Way too large
        stopLoss: null, // No stop loss
        takeProfit: null,
        profitLoss: -500,
        outcome: 'loss',
        strategyId: null, // No strategy
        notes: 'Complete disaster',
        emotionalDrift: {
          confidenceChange: -40,
          stressChange: 60,
          focusChange: -25,
          energyChange: -30
        },
        setupQuality: 2,
        riskRewardRatio: 0.3,
        holdingTimeMinutes: 480 // Held way too long
      };

      const decisionQuality = calculateDecisionQuality(trade);
      const executionQuality = calculateExecutionQuality(trade);
      const emotionalCost = calculateEmotionalCost(trade);
      const overallScore = calculateDecisionScore(trade);

      // Decision Quality should be terrible
      expect(decisionQuality.score).toBeLessThan(30);
      expect(decisionQuality.mistakes.length).toBeGreaterThan(3);
      expect(decisionQuality.learningPoints.length).toBeGreaterThan(2);

      // Execution Quality should be poor
      expect(executionQuality.score).toBeLessThan(40);
      expect(executionQuality.factors.stopPlacement).toBe(2);

      // Emotional Cost should be extreme
      expect(emotionalCost.emotionalCostScore).toBeGreaterThan(80);
      expect(emotionalCost.stressAccumulation).toBeGreaterThan(50);
      expect(emotionalCost.recoveryTimeMinutes).toBeGreaterThan(200);

      // Overall score should be terrible
      expect(overallScore).toBeLessThan(35);
    });
  });
});