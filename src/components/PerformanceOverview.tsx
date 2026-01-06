'use client';

import { useMemo } from 'react';
import { FiTrendingUp, FiTrendingDown, FiActivity, FiTarget } from 'react-icons/fi';

interface Trade {
  id: string;
  profitLoss?: number;
  outcome?: string;
  entryTime: string;
  direction: string;
}

interface PerformanceOverviewProps {
  trades: Trade[];
}

export default function PerformanceOverview({ trades }: PerformanceOverviewProps) {
  const stats = useMemo(() => {
    if (!trades.length) {
      return {
        totalPnL: 0,
        winRate: 0,
        totalTrades: 0,
        consecutiveWins: 0,
        avgWin: 0,
        avgLoss: 0,
      };
    }

    const totalPnL = trades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
    const wins = trades.filter(t => t.outcome === 'WIN').length;
    const losses = trades.filter(t => t.outcome === 'LOSS').length;
    const winRate = trades.length > 0 ? Math.round((wins / trades.length) * 100) : 0;

    const winTrades = trades.filter(t => t.profitLoss && t.profitLoss > 0);
    const lossTrades = trades.filter(t => t.profitLoss && t.profitLoss < 0);
    const avgWin = winTrades.length > 0 ? winTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) / winTrades.length : 0;
    const avgLoss = lossTrades.length > 0 ? lossTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) / lossTrades.length : 0;

    let consecutiveWins = 0;
    for (const trade of trades) {
      if (trade.outcome === 'WIN') {
        consecutiveWins++;
      } else {
        break;
      }
    }

    return {
      totalPnL,
      winRate,
      totalTrades: trades.length,
      consecutiveWins,
      avgWin: Math.round(avgWin * 100) / 100,
      avgLoss: Math.round(avgLoss * 100) / 100,
    };
  }, [trades]);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    unit = '',
    isPositive = true,
  }: any) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className={`text-2xl font-bold mt-2 ${isPositive && stats.totalPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {value} {unit}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <StatCard
        icon={FiTrendingUp}
        label="Total P&L"
        value={stats.totalPnL.toFixed(2)}
        unit="USD"
        isPositive={stats.totalPnL >= 0}
      />
      <StatCard
        icon={FiTarget}
        label="Win Rate"
        value={stats.winRate}
        unit="%"
        isPositive={true}
      />
      <StatCard
        icon={FiActivity}
        label="Total Trades"
        value={stats.totalTrades}
        isPositive={true}
      />
      <StatCard
        icon={FiTrendingDown}
        label="Avg Win / Loss"
        value={`+${stats.avgWin} / ${stats.avgLoss}`}
        isPositive={stats.avgWin > Math.abs(stats.avgLoss)}
      />
    </>
  );
}
