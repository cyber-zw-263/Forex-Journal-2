import { NextRequest } from 'next/server';

// Mock the Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    trade: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    decisionQuality: {
      upsert: jest.fn(),
    },
    emotionalCost: {
      upsert: jest.fn(),
    },
    strategy: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';
import { GET as getDecisionScore, POST as postDecisionScore } from '@/app/api/decision-score/route';
import { GET as getEmotionalCost, POST as postEmotionalCost } from '@/app/api/emotional-cost/route';
import { GET as getEdgeConfidence, POST as postEdgeConfidence } from '@/app/api/edge-confidence/route';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('Advanced Analytics API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Decision Score API', () => {
    const mockTrade = {
      id: 'trade-1',
      userId: 'user-1',
      strategyId: 'strategy-1',
      emotionalDrift: JSON.stringify({
        preTradeEmotion: 'calm',
        confidenceChange: 5,
        stressChange: -2
      }),
      decisionQuality: 'good_decision_good_outcome',
      outcome: 'profit'
    };

    it('should calculate decision score for a trade', async () => {
      mockPrisma.trade.findUnique.mockResolvedValue(mockTrade as any);

      const request = new NextRequest('http://localhost:3000/api/decision-score?tradeId=trade-1');
      const response = await getDecisionScore(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('decisionScore');
      expect(data).toHaveProperty('decisionQuality');
      expect(data).toHaveProperty('factors');
      expect(data).toHaveProperty('insights');
    });

    it('should return 404 for non-existent trade', async () => {
      mockPrisma.trade.findUnique.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/decision-score?tradeId=non-existent');
      const response = await getDecisionScore(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Trade not found');
    });

    it('should update trade with calculated decision score', async () => {
      const mockUpdatedTrade = { ...mockTrade, decisionScore: 85 };
      mockPrisma.trade.findUnique.mockResolvedValue(mockTrade as any);
      mockPrisma.trade.update.mockResolvedValue(mockUpdatedTrade as any);

      const request = new NextRequest('http://localhost:3000/api/decision-score', {
        method: 'POST',
        body: JSON.stringify({ tradeId: 'trade-1' }),
      });
      const response = await postDecisionScore(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.analysis).toHaveProperty('decisionScore');
      expect(mockPrisma.trade.update).toHaveBeenCalledWith({
        where: { id: 'trade-1' },
        data: {
          decisionScore: expect.any(Number),
          decisionQuality: expect.any(String)
        }
      });
    });
  });

  describe('Emotional Cost API', () => {
    const mockTrade = {
      id: 'trade-1',
      userId: 'user-1',
      emotionalDrift: JSON.stringify({
        confidenceChange: -10,
        stressChange: 15,
        energyChange: -5
      }),
      outcome: 'loss'
    };

    it('should calculate emotional cost for a trade', async () => {
      mockPrisma.trade.findUnique.mockResolvedValue(mockTrade as any);

      const request = new NextRequest('http://localhost:3000/api/emotional-cost?tradeId=trade-1');
      const response = await getEmotionalCost(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('immediateCost');
      expect(data).toHaveProperty('longTermCost');
      expect(data).toHaveProperty('recoveryTime');
      expect(data).toHaveProperty('stressAccumulation');
    });

    it('should update trade with emotional cost data', async () => {
      mockPrisma.trade.findUnique.mockResolvedValue(mockTrade as any);
      mockPrisma.emotionalCost.upsert.mockResolvedValue({} as any);

      const request = new NextRequest('http://localhost:3000/api/emotional-cost', {
        method: 'POST',
        body: JSON.stringify({ tradeId: 'trade-1' }),
      });
      const response = await postEmotionalCost(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockPrisma.emotionalCost.upsert).toHaveBeenCalled();
    });
  });

  describe('Edge Confidence API', () => {
    const mockStrategy = {
      id: 'strategy-1',
      name: 'Test Strategy',
      trades: [
        {
          id: 'trade-1',
          outcome: 'profit',
          decisionQuality: 'good_decision_good_outcome',
          emotionalDrift: JSON.stringify({ preTradeEmotion: 'calm' })
        },
        {
          id: 'trade-2',
          outcome: 'profit',
          decisionQuality: 'good_decision_good_outcome',
          emotionalDrift: JSON.stringify({ preTradeEmotion: 'confident' })
        }
      ]
    };

    it('should calculate edge confidence for a strategy', async () => {
      mockPrisma.strategy.findUnique.mockResolvedValue(mockStrategy as any);

      const request = new NextRequest('http://localhost:3000/api/edge-confidence', {
        method: 'POST',
        body: JSON.stringify({ strategyId: 'strategy-1' }),
      });
      const response = await postEdgeConfidence(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data).toHaveProperty('performance');
      expect(data).toHaveProperty('insights');
      expect(data.performance).toHaveProperty('edgeConfidence');
    });

    it('should return strategy edge data', async () => {
      const mockStrategyWithEdge = {
        ...mockStrategy,
        edgeConfidenceScore: 85,
        perfectExecutionCount: 2,
        _count: { trades: 2 }
      };
      mockPrisma.strategy.findUnique.mockResolvedValue(mockStrategyWithEdge as any);

      const request = new NextRequest('http://localhost:3000/api/edge-confidence?strategyId=strategy-1');
      const response = await getEdgeConfidence(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('edgeConfidenceScore', 85);
      expect(data).toHaveProperty('perfectExecutionCount', 2);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      mockPrisma.trade.findUnique.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/decision-score?tradeId=trade-1');
      const response = await getDecisionScore(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch decision score');
    });

    it('should validate required parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/decision-score');
      const response = await getDecisionScore(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Trade ID is required');
    });
  });

  describe('Analytics Calculations Integration', () => {
    it('should handle trades with missing emotional data', async () => {
      const mockTrade = {
        id: 'trade-1',
        userId: 'user-1',
        strategyId: null,
        emotionalDrift: null,
        outcome: 'profit'
      };

      mockPrisma.trade.findUnique.mockResolvedValue(mockTrade as any);

      const request = new NextRequest('http://localhost:3000/api/decision-score?tradeId=trade-1');
      const response = await getDecisionScore(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('decisionScore');
      // Should still calculate with default values
    });

    it('should handle edge cases in emotional cost calculation', async () => {
      const mockTrade = {
        id: 'trade-1',
        userId: 'user-1',
        emotionalDrift: JSON.stringify({
          confidenceChange: 0,
          stressChange: 0,
          energyChange: 0
        }),
        outcome: 'profit'
      };

      mockPrisma.trade.findUnique.mockResolvedValue(mockTrade as any);

      const request = new NextRequest('http://localhost:3000/api/emotional-cost?tradeId=trade-1');
      const response = await getEmotionalCost(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.immediateCost).toBeGreaterThanOrEqual(0);
      expect(data.immediateCost).toBeLessThanOrEqual(100);
    });
  });
});