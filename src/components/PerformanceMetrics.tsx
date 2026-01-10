'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiTarget, FiDollarSign, FiBarChart, FiActivity, FiAward, FiAlertTriangle } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number;
  profitLoss?: number;
  outcome?: string;
  entryTime: string;
  strategyId?: string;
  emotionalState?: string;
  session?: string;
  [key: string]: any;
}

interface PerformanceMetricsProps {
  trades: Trade[];
  detailed?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ trades, detailed = false }) => {
  const metrics = useMemo(() => {
    if (trades.length === 0) {
      return {
        totalTrades: 0,
        winCount: 0,
        lossCount: 0,
        breakEvenCount: 0,
        winRate: 0,
        totalPnL: 0,
        avgWin: 0,
        avgLoss: 0,
        largestWin: 0,
        largestLoss: 0,
        expectancy: 0,
        profitFactor: 0,
        consecutiveWins: 0,
        consecutiveLosses: 0,
        avgTradeDuration: 0,
        bestPair: '',
        worstPair: '',
        bestSession: '',
        riskRewardRatio: 0
      };
    }

    const closedTrades = trades.filter(t => t.status === 'closed' && t.profitLoss !== null && t.profitLoss !== undefined);
    const wins = closedTrades.filter(t => t.profitLoss! > 0);
    const losses = closedTrades.filter(t => t.profitLoss! < 0);
    const breakEvens = closedTrades.filter(t => t.profitLoss === 0);

    const totalPnL = closedTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
    const winRate = closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0;
    const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.profitLoss!, 0) / wins.length : 0;
    const avgLoss = losses.length > 0 ? losses.reduce((sum, t) => sum + t.profitLoss!, 0) / losses.length : 0;
    const largestWin = wins.length > 0 ? Math.max(...wins.map(t => t.profitLoss!)) : 0;
    const largestLoss = losses.length > 0 ? Math.min(...losses.map(t => t.profitLoss!)) : 0;

    const grossProfit = wins.reduce((sum, t) => sum + t.profitLoss!, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.profitLoss!, 0));
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? Infinity : 1);

    const expectancy = winRate > 0 && avgLoss !== 0 ? (winRate / 100) * avgWin + ((100 - winRate) / 100) * avgLoss : 0;

    // Calculate consecutive wins/losses
    let maxConsecutiveWins = 0;
    let maxConsecutiveLosses = 0;
    let currentWins = 0;
    let currentLosses = 0;

    for (const trade of closedTrades) {
      if (trade.profitLoss! > 0) {
        currentWins++;
        currentLosses = 0;
        maxConsecutiveWins = Math.max(maxConsecutiveWins, currentWins);
      } else if (trade.profitLoss! < 0) {
        currentLosses++;
        currentWins = 0;
        maxConsecutiveLosses = Math.max(maxConsecutiveLosses, currentLosses);
      } else {
        currentWins = 0;
        currentLosses = 0;
      }
    }

    // Pair performance
    const pairPerformance = closedTrades.reduce((acc, trade) => {
      if (!acc[trade.pair]) {
        acc[trade.pair] = { total: 0, wins: 0, losses: 0, pnl: 0 };
      }
      acc[trade.pair].total++;
      acc[trade.pair].pnl += trade.profitLoss || 0;
      if (trade.profitLoss! > 0) acc[trade.pair].wins++;
      else if (trade.profitLoss! < 0) acc[trade.pair].losses++;
      return acc;
    }, {} as Record<string, { total: number; wins: number; losses: number; pnl: number }>);

    const bestPair = Object.entries(pairPerformance).sort(([,a], [,b]) => b.pnl - a.pnl)[0]?.[0] || '';
    const worstPair = Object.entries(pairPerformance).sort(([,a], [,b]) => a.pnl - b.pnl)[0]?.[0] || '';

    // Session performance
    const sessionPerformance = closedTrades.reduce((acc, trade) => {
      const session = trade.session || 'Unknown';
      if (!acc[session]) {
        acc[session] = { total: 0, wins: 0, losses: 0, pnl: 0 };
      }
      acc[session].total++;
      acc[session].pnl += trade.profitLoss || 0;
      if (trade.profitLoss! > 0) acc[session].wins++;
      else if (trade.profitLoss! < 0) acc[session].losses++;
      return acc;
    }, {} as Record<string, { total: number; wins: number; losses: number; pnl: number }>);

    const bestSession = Object.entries(sessionPerformance).sort(([,a], [,b]) => b.pnl - a.pnl)[0]?.[0] || '';

    // Risk-reward ratio
    const avgRiskReward = losses.length > 0 && avgWin !== 0 ? Math.abs(avgWin / avgLoss) : 0;

    return {
      totalTrades: closedTrades.length,
      winCount: wins.length,
      lossCount: losses.length,
      breakEvenCount: breakEvens.length,
      winRate,
      totalPnL,
      avgWin,
      avgLoss,
      largestWin,
      largestLoss,
      expectancy,
      profitFactor,
      consecutiveWins: maxConsecutiveWins,
      consecutiveLosses: maxConsecutiveLosses,
      avgTradeDuration: 0, // TODO: Calculate from entry/exit times
      bestPair,
      worstPair,
      bestSession,
      riskRewardRatio: avgRiskReward
    };
  }, [trades]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
  }> = ({ title, value, icon: Icon, color, trend }) => (
    <AnimatedCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')} dark:${color.replace('text-', 'bg-').replace('-600', '-900/20')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center">
          {trend === 'up' && <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />}
          {trend === 'down' && <FiTrendingDown className="w-4 h-4 text-red-500 mr-1" />}
          <span className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
          </span>
        </div>
      )}
    </AnimatedCard>
  );

  if (metrics.totalTrades === 0) {
    return (
      <AnimatedCard className="p-8 text-center">
        <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Performance Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Complete some trades to see your performance metrics
        </p>
      </AnimatedCard>
    );
  }

  if (!detailed) {
    // Overview metrics
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total P&L"
          value={formatCurrency(metrics.totalPnL)}
          icon={metrics.totalPnL >= 0 ? FiTrendingUp : FiTrendingDown}
          color={metrics.totalPnL >= 0 ? "text-green-600" : "text-red-600"}
          trend={metrics.totalPnL >= 0 ? 'up' : 'down'}
        />
        <StatCard
          title="Win Rate"
          value={formatPercentage(metrics.winRate)}
          icon={FiTarget}
          color="text-blue-600"
          trend={metrics.winRate >= 50 ? 'up' : 'down'}
        />
        <StatCard
          title="Profit Factor"
          value={metrics.profitFactor === Infinity ? '∞' : metrics.profitFactor.toFixed(2)}
          icon={FiAward}
          color={metrics.profitFactor >= 1.5 ? "text-green-600" : "text-orange-600"}
          trend={metrics.profitFactor >= 1.5 ? 'up' : 'down'}
        />
        <StatCard
          title="Total Trades"
          value={metrics.totalTrades}
          icon={FiActivity}
          color="text-purple-600"
        />
      </div>
    );
  }

  // Detailed metrics
  return (
    <div className="space-y-6">
      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total P&L"
          value={formatCurrency(metrics.totalPnL)}
          icon={metrics.totalPnL >= 0 ? FiTrendingUp : FiTrendingDown}
          color={metrics.totalPnL >= 0 ? "text-green-600" : "text-red-600"}
        />
        <StatCard
          title="Win Rate"
          value={formatPercentage(metrics.winRate)}
          icon={FiTarget}
          color="text-blue-600"
        />
        <StatCard
          title="Profit Factor"
          value={metrics.profitFactor === Infinity ? '∞' : metrics.profitFactor.toFixed(2)}
          icon={FiAward}
          color={metrics.profitFactor >= 1.5 ? "text-green-600" : "text-orange-600"}
        />
        <StatCard
          title="Expectancy"
          value={formatCurrency(metrics.expectancy)}
          icon={FiDollarSign}
          color={metrics.expectancy >= 0 ? "text-green-600" : "text-red-600"}
        />
      </div>

      {/* Trade Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Trade Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Trades</span>
              <span className="font-semibold text-gray-900 dark:text-white">{metrics.totalTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Winning Trades</span>
              <span className="font-semibold text-green-600">{metrics.winCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Losing Trades</span>
              <span className="font-semibold text-red-600">{metrics.lossCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Break-even Trades</span>
              <span className="font-semibold text-gray-600">{metrics.breakEvenCount}</span>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            P&L Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Average Win</span>
              <span className="font-semibold text-green-600">{formatCurrency(metrics.avgWin)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Average Loss</span>
              <span className="font-semibold text-red-600">{formatCurrency(metrics.avgLoss)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Largest Win</span>
              <span className="font-semibold text-green-600">{formatCurrency(metrics.largestWin)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Largest Loss</span>
              <span className="font-semibold text-red-600">{formatCurrency(metrics.largestLoss)}</span>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Insights
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Risk-Reward Ratio</span>
              <span className="font-semibold text-gray-900 dark:text-white">{metrics.riskRewardRatio.toFixed(2)}:1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Max Consecutive Wins</span>
              <span className="font-semibold text-green-600">{metrics.consecutiveWins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Max Consecutive Losses</span>
              <span className="font-semibold text-red-600">{metrics.consecutiveLosses}</span>
            </div>
            {metrics.bestPair && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Best Performing Pair</span>
                <span className="font-semibold text-green-600">{metrics.bestPair}</span>
              </div>
            )}
            {metrics.bestSession && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Best Session</span>
                <span className="font-semibold text-blue-600">{metrics.bestSession}</span>
              </div>
            )}
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Win Rate Health</span>
                <span className={`font-medium ${metrics.winRate >= 60 ? 'text-green-600' : metrics.winRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {metrics.winRate >= 60 ? 'Excellent' : metrics.winRate >= 50 ? 'Good' : 'Needs Work'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(metrics.winRate, 100)}%` }}
                  className={`h-2 rounded-full ${metrics.winRate >= 60 ? 'bg-green-500' : metrics.winRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Profit Factor Health</span>
                <span className={`font-medium ${metrics.profitFactor >= 2 ? 'text-green-600' : metrics.profitFactor >= 1.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {metrics.profitFactor >= 2 ? 'Excellent' : metrics.profitFactor >= 1.5 ? 'Good' : 'Needs Work'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((metrics.profitFactor / 3) * 100, 100)}%` }}
                  className={`h-2 rounded-full ${metrics.profitFactor >= 2 ? 'bg-green-500' : metrics.profitFactor >= 1.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Risk-Reward Health</span>
                <span className={`font-medium ${metrics.riskRewardRatio >= 2 ? 'text-green-600' : metrics.riskRewardRatio >= 1.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {metrics.riskRewardRatio >= 2 ? 'Excellent' : metrics.riskRewardRatio >= 1.5 ? 'Good' : 'Needs Work'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((metrics.riskRewardRatio / 3) * 100, 100)}%` }}
                  className={`h-2 rounded-full ${metrics.riskRewardRatio >= 2 ? 'bg-green-500' : metrics.riskRewardRatio >= 1.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                />
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default PerformanceMetrics;