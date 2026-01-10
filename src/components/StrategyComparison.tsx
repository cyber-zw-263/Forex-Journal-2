'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiTrendingUp, FiTrendingDown, FiBarChart, FiAward, FiAlertTriangle } from 'react-icons/fi';
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

interface Strategy {
  id: string;
  name: string;
  description?: string;
  marketType?: string;
  preferredSessions?: string[];
  [key: string]: any;
}

interface StrategyComparisonProps {
  trades: Trade[];
  strategies: Strategy[];
}

const StrategyComparison: React.FC<StrategyComparisonProps> = ({ trades, strategies }) => {
  const strategyAnalysis = useMemo(() => {
    if (trades.length === 0 || strategies.length === 0) return null;

    const closedTrades = trades.filter(t => t.status === 'closed' && t.profitLoss !== null && t.profitLoss !== undefined);

    const strategyStats = strategies.map(strategy => {
      const strategyTrades = closedTrades.filter(t => t.strategyId === strategy.id);
      if (strategyTrades.length === 0) {
        return {
          ...strategy,
          trades: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
          totalPnL: 0,
          avgPnL: 0,
          profitFactor: 0,
          expectancy: 0,
          bestPair: '',
          worstPair: ''
        };
      }

      const wins = strategyTrades.filter(t => t.profitLoss! > 0);
      const losses = strategyTrades.filter(t => t.profitLoss! < 0);
      const totalPnL = strategyTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
      const winRate = (wins.length / strategyTrades.length) * 100;
      const avgPnL = totalPnL / strategyTrades.length;

      const grossProfit = wins.reduce((sum, t) => sum + t.profitLoss!, 0);
      const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.profitLoss!, 0));
      const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? Infinity : 1);

      const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.profitLoss!, 0) / wins.length : 0;
      const avgLoss = losses.length > 0 ? losses.reduce((sum, t) => sum + t.profitLoss!, 0) / losses.length : 0;
      const expectancy = winRate > 0 && avgLoss !== 0 ? (winRate / 100) * avgWin + ((100 - winRate) / 100) * avgLoss : 0;

      // Pair performance for this strategy
      const pairPerformance = strategyTrades.reduce((acc, trade) => {
        if (!acc[trade.pair]) {
          acc[trade.pair] = { total: 0, pnl: 0 };
        }
        acc[trade.pair].total++;
        acc[trade.pair].pnl += trade.profitLoss || 0;
        return acc;
      }, {} as Record<string, { total: number; pnl: number }>);

      const bestPair = Object.entries(pairPerformance).sort(([,a], [,b]) => b.pnl - a.pnl)[0]?.[0] || '';
      const worstPair = Object.entries(pairPerformance).sort(([,a], [,b]) => a.pnl - b.pnl)[0]?.[0] || '';

      return {
        ...strategy,
        trades: strategyTrades.length,
        wins: wins.length,
        losses: losses.length,
        winRate,
        totalPnL,
        avgPnL,
        profitFactor,
        expectancy,
        bestPair,
        worstPair
      };
    }).filter(s => s.trades > 0); // Only show strategies with trades

    return strategyStats.sort((a, b) => b.totalPnL - a.totalPnL);
  }, [trades, strategies]);

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

  if (!strategyAnalysis || strategyAnalysis.length === 0) {
    return (
      <AnimatedCard className="p-8 text-center">
        <FiTarget className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Strategy Data Available
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Assign strategies to your trades to see strategy performance comparisons
        </p>
      </AnimatedCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Strategy Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategyAnalysis.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnimatedCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {strategy.name}
                </h3>
                {index === 0 && strategy.totalPnL > 0 && (
                  <FiAward className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total P&L</span>
                  <span className={`font-semibold ${strategy.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(strategy.totalPnL)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Win Rate</span>
                  <span className="font-semibold text-blue-600">
                    {formatPercentage(strategy.winRate)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Trades</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {strategy.trades}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Profit Factor</span>
                  <span className="font-semibold text-purple-600">
                    {strategy.profitFactor === Infinity ? '∞' : strategy.profitFactor.toFixed(2)}
                  </span>
                </div>

                {strategy.bestPair && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Best Pair</span>
                    <span className="font-semibold text-green-600">
                      {strategy.bestPair}
                    </span>
                  </div>
                )}
              </div>

              {/* Performance Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Performance</span>
                  <span>{strategy.totalPnL >= 0 ? '+' : ''}{formatCurrency(strategy.totalPnL)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.max((strategy.totalPnL / 1000) * 100, 10), 100)}%` }}
                    className={`h-2 rounded-full ${strategy.totalPnL >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>

      {/* Strategy Comparison Table */}
      <AnimatedCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Strategy Performance Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Strategy</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Trades</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Win Rate</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Total P&L</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Avg P&L</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Profit Factor</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Expectancy</th>
              </tr>
            </thead>
            <tbody>
              {strategyAnalysis.map((strategy, index) => (
                <motion.tr
                  key={strategy.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    {strategy.name}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                    {strategy.trades}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${strategy.winRate >= 60 ? 'text-green-600' : strategy.winRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {formatPercentage(strategy.winRate)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${strategy.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(strategy.totalPnL)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${strategy.avgPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(strategy.avgPnL)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${strategy.profitFactor >= 1.5 ? 'text-green-600' : strategy.profitFactor >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {strategy.profitFactor === Infinity ? '∞' : strategy.profitFactor.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${strategy.expectancy >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(strategy.expectancy)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Strategy Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Strategy
          </h3>
          {strategyAnalysis[0] && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiAward className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {strategyAnalysis[0].name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(strategyAnalysis[0].totalPnL)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total P&L</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPercentage(strategyAnalysis[0].winRate)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Win Rate</div>
                </div>
              </div>
              {strategyAnalysis[0].description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {strategyAnalysis[0].description}
                </p>
              )}
            </div>
          )}
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Strategy Recommendations
          </h3>
          <div className="space-y-3">
            {strategyAnalysis.some(s => s.profitFactor >= 1.5) ? (
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200">
                    Strong Strategies Identified
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Focus on strategies with profit factor ≥ 1.5
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <FiAlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800 dark:text-yellow-200">
                    Strategy Optimization Needed
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    Consider refining strategies with low profit factors
                  </div>
                </div>
              </div>
            )}

            {strategyAnalysis.some(s => s.trades < 10) && (
              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FiBarChart className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800 dark:text-blue-200">
                    More Data Needed
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Strategies with fewer than 10 trades need more testing
                  </div>
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default StrategyComparison;