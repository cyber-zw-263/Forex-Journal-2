'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DecisionQualityChart } from './DecisionQualityChart';
import { EmotionalCostChart } from './EmotionalCostChart';
import { StrategyEdgeChart } from './StrategyEdgeChart';

interface DecisionAnalysis {
  decisionScore: number;
  decisionQuality: string;
  factors: {
    ruleAdherence: number;
    timingQuality: number;
    emotionalStability: number;
    riskManagement: number;
    marketAnalysis: number;
    executionQuality: number;
  };
  insights: string[];
}

interface EdgeConfidence {
  edgeConfidenceScore: number;
  perfectExecutionCount: number;
  totalTrades: number;
  insights: string[];
}

interface EmotionalCost {
  immediateCost: number;
  longTermCost: number;
  recoveryTime: number;
  stressAccumulation: number;
  recommendations: string[];
}

interface Trade {
  id: string;
  symbol: string;
  outcome: string;
  profitLoss: number;
  decisionScore?: number;
  decisionQuality?: string;
  emotionalCost?: number;
  strategy?: {
    name: string;
    edgeConfidenceScore?: number;
  };
}

interface AnalyticsData {
  trades: Trade[];
  decisionAnalysis: DecisionAnalysis[];
  edgeConfidence: EdgeConfidence[];
  emotionalCosts: EmotionalCost[];
}

export default function AdvancedAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('decisions');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Fetch trades with analytics data
      const tradesResponse = await fetch('/api/trades?limit=50');
      const tradesData = await tradesResponse.json();

      if (tradesData.trades) {
        // Calculate analytics for each trade
        const analyticsPromises = tradesData.trades.map(async (trade: Trade) => {
          const [decisionRes, emotionalRes] = await Promise.all([
            fetch(`/api/decision-score?tradeId=${trade.id}`),
            fetch(`/api/emotional-cost?tradeId=${trade.id}`)
          ]);

          const decisionData = decisionRes.ok ? await decisionRes.json() : null;
          const emotionalData = emotionalRes.ok ? await emotionalRes.json() : null;

          return {
            trade,
            decisionAnalysis: decisionData,
            emotionalCost: emotionalData
          };
        });

        const analyticsResults = await Promise.all(analyticsPromises);

        // Group data
        const decisionAnalysis = analyticsResults
          .map(r => r.decisionAnalysis)
          .filter(Boolean);

        const emotionalCosts = analyticsResults
          .map(r => r.emotionalCost)
          .filter(Boolean);

        setData({
          trades: tradesData.trades,
          decisionAnalysis,
          edgeConfidence: [], // Will be populated separately
          emotionalCosts
        });
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDecisionMetrics = () => {
    if (!data?.decisionAnalysis.length) return null;

    const scores = data.decisionAnalysis.map(d => d.decisionScore);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    const qualityBreakdown = data.decisionAnalysis.reduce((acc, d) => {
      acc[d.decisionQuality] = (acc[d.decisionQuality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { avgScore, qualityBreakdown };
  };

  const calculateEmotionalMetrics = () => {
    if (!data?.emotionalCosts.length) return null;

    const costs = data.emotionalCosts.map(e => e.immediateCost);
    const avgCost = costs.reduce((a, b) => a + b, 0) / costs.length;

    const highCostTrades = data.emotionalCosts.filter(e => e.immediateCost > 60).length;

    return { avgCost, highCostTrades };
  };

  const getDecisionQualityColor = (quality: string) => {
    switch (quality) {
      case 'good_decision_good_outcome': return 'bg-green-500';
      case 'good_decision_bad_outcome': return 'bg-yellow-500';
      case 'bad_decision_good_outcome': return 'bg-orange-500';
      case 'bad_decision_bad_outcome': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDecisionQualityIcon = (quality: string) => {
    switch (quality) {
      case 'good_decision_good_outcome': return '✅';
      case 'good_decision_bad_outcome': return '⚠️';
      case 'bad_decision_good_outcome': return '📈';
      case 'bad_decision_bad_outcome': return '❌';
      default: return '📊';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading advanced analytics...</span>
      </div>
    );
  }

  const decisionMetrics = calculateDecisionMetrics();
  const emotionalMetrics = calculateEmotionalMetrics();

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            🏠 Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">Advanced Analytics</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            ❓ Help
          </button>
          <button onClick={fetchAnalyticsData} className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Behavioral Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your trading psychology, decision quality, and strategy performance
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-row items-center space-y-0 pb-2">
            <span className="text-blue-500 flex-shrink-0">🧠</span>
            <h3 className="ml-2 text-sm font-medium">Decision Quality</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {decisionMetrics ? `${Math.round(decisionMetrics.avgScore)}%` : 'N/A'}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Average decision score across all trades
            </p>
            {decisionMetrics && (
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${decisionMetrics.avgScore}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-row items-center space-y-0 pb-2">
            <span className="text-red-500 flex-shrink-0">❤️</span>
            <h3 className="ml-2 text-sm font-medium">Emotional Cost</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {emotionalMetrics ? `${Math.round(emotionalMetrics.avgCost)}%` : 'N/A'}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {emotionalMetrics ? `${emotionalMetrics.highCostTrades} high-cost trades` : 'Average emotional cost'}
            </p>
            {emotionalMetrics && (
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${emotionalMetrics.avgCost}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-row items-center space-y-0 pb-2">
            <span className="text-green-500 flex-shrink-0">🎯</span>
            <h3 className="ml-2 text-sm font-medium">Strategy Edge</h3>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {data?.trades.filter(t => t.strategy).length || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Trades using defined strategies
            </p>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${data?.trades.length ? (data.trades.filter(t => t.strategyId).length / data.trades.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="space-y-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'decisions'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Decisions
          </button>
          <button
            onClick={() => setActiveTab('emotions')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'emotions'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Emotions
          </button>
          <button
            onClick={() => setActiveTab('strategies')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'strategies'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Strategies
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'insights'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Insights
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'decisions' && (
          <div className="space-y-6">
            <DecisionQualityChart data={data?.decisionAnalysis || []} chartType="distribution" />
            <DecisionQualityChart data={data?.decisionAnalysis || []} chartType="factors" />
            <DecisionQualityChart data={data?.decisionAnalysis || []} chartType="trend" />
          </div>
        )}

        {activeTab === 'emotions' && (
          <div className="space-y-6">
            <EmotionalCostChart data={data?.emotionalCosts || []} chartType="trend" />
            <EmotionalCostChart data={data?.emotionalCosts || []} chartType="distribution" />
            <EmotionalCostChart data={data?.emotionalCosts || []} chartType="recovery" />
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-6">
            <StrategyEdgeChart data={[]} chartType="radar" />
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <span className="text-4xl mb-4 block">🎯</span>
              <p>Strategy edge analysis will be available once you have strategies with sufficient trade data</p>
              <p className="text-sm">Complete more trades using defined strategies to unlock edge analysis</p>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Key Behavioral Insights</h3>
              <div className="space-y-4">
                {decisionMetrics && decisionMetrics.avgScore < 50 && (
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                    <p className="font-medium">Decision Quality Needs Attention</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your average decision score is below 50%. Focus on improving trade selection criteria and emotional control.
                    </p>
                  </div>
                )}

                {emotionalMetrics && emotionalMetrics.avgCost > 60 && (
                  <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                    <p className="font-medium">High Emotional Cost Alert</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Trading is causing significant emotional stress. Consider taking breaks and reviewing your approach.
                    </p>
                  </div>
                )}

                {decisionMetrics && decisionMetrics.qualityBreakdown['good_decision_bad_outcome'] > decisionMetrics.qualityBreakdown['bad_decision_good_outcome'] && (
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <p className="font-medium">Good Decisions, Bad Luck</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You make good decisions but experience bad outcomes. This suggests proper risk management - keep going!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}