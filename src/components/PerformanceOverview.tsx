'use client';

import React, { useMemo } from 'react';
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

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  isPositive?: boolean;
}

const StatCard = ({ icon: Icon, label, value, unit = '', isPositive = true }: StatCardProps) => (
  <div style={{
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px',
    minWidth: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  }}>
    <div>
      <p style={{fontSize: '11px', fontWeight: 700, color: 'var(--neutral-color)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px'}}>
        {label}
      </p>
      <p style={{fontSize: '18px', fontWeight: 800, margin: 0, color: isPositive ? 'var(--win-color)' : 'var(--loss-color)'}}>
        {value} {unit}
      </p>
    </div>
    <div style={{padding: '8px', borderRadius: '8px', background: isPositive ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', color: isPositive ? 'var(--win-color)' : 'var(--loss-color)'}}>
      <Icon style={{width: '18px', height: '18px'}} />
    </div>
  </div>
);

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
