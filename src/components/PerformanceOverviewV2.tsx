'use client';

import React, { useMemo } from 'react';
import { FiTrendingUp, FiTrendingDown, FiActivity, FiTarget } from 'react-icons/fi';
import { WinGauge } from './WinGauge';

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

interface StatCardV2Props {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  isPositive?: boolean;
  children?: React.ReactNode;
}

function StatCardV2({ icon: Icon, label, value, unit = '', isPositive = true, children }: StatCardV2Props) {
  return (
    <div className="card-glass p-4 rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
          <p className={`text-2xl font-bold mt-2 ${label === 'Total P&L' ? 'grad-text' : 'text-gray-200'}`}>
            {value} {unit}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default function PerformanceOverviewV2({ trades }: PerformanceOverviewProps) {
  const stats = useMemo(() => {
    if (!trades.length) {
      return {
        totalPnL: 0,
        winRate: 0,
        totalTrades: 0,
        consecutiveWins: 0,
        avgWin: 0,
        avgLoss: 0,
        profitFactor: 0,
      };
    }

    const totalPnL = trades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
    const wins = trades.filter(t => t.outcome === 'WIN').length;
    const losses = trades.filter(t => t.outcome === 'LOSS').length;
    const winRate = trades.length > 0 ? Math.round((wins / trades.length) * 100) : 0;

    const winTrades = trades.filter(t => t.profitLoss && t.profitLoss > 0);
    const lossTrades = trades.filter(t => t.profitLoss && t.profitLoss < 0);
    const avgWin = winTrades.length > 0 ? winTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) / winTrades.length : 0;
    const avgLoss = lossTrades.length > 0 ? lossTrades.reduce((sum, t) => sum + Math.abs(t.profitLoss || 0), 0) / lossTrades.length : 0;

    const grossProfit = winTrades.reduce((s, t) => s + (t.profitLoss || 0), 0);
    const grossLoss = lossTrades.reduce((s, t) => s + Math.abs(t.profitLoss || 0), 0);
    const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? Infinity : 0) : Math.round((grossProfit / grossLoss) * 100) / 100;

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
      profitFactor,
    };
  }, [trades]);


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardV2 icon={FiTrendingUp} label="Total P&L" value={stats.totalPnL.toFixed(2)} unit="USD" isPositive={stats.totalPnL >= 0} />

        <div className="lg:col-span-1">
          <div className="card-glass p-4 rounded-lg flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase">Win Rate</p>
              <div className="mt-2">
                <WinGauge value={stats.winRate} />
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-lg font-bold text-gray-200 mt-1">{stats.totalTrades}</p>
            </div>
          </div>
        </div>

        <StatCardV2 icon={FiActivity} label="Avg Win / Loss" value={`+${stats.avgWin} / ${stats.avgLoss}`} isPositive={stats.avgWin > stats.avgLoss} />

        <StatCardV2 icon={FiTrendingDown} label="Profit Factor" value={stats.profitFactor === Infinity ? '∞' : stats.profitFactor} isPositive={stats.profitFactor >= 1} />
      </div>
    </>
  );
}
