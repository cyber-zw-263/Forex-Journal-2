'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number;
  profitLoss?: number;
  outcome?: string;
  entryTime: string;
}

interface AnalyticsChartsProps {
  trades: Trade[];
}

export default function AnalyticsCharts({ trades }: AnalyticsChartsProps) {
  const [chartData, setChartData] = useState<any>({
    dailyPnL: [],
    pairPerformance: [],
    directionPerformance: [],
  });

  useEffect(() => {
    if (!trades.length) return;

    // Daily P&L Chart
    const dailyData: { [key: string]: number } = {};
    trades.forEach(trade => {
      const date = new Date(trade.entryTime).toLocaleDateString();
      dailyData[date] = (dailyData[date] || 0) + (trade.profitLoss || 0);
    });

    const dailyPnL = Object.entries(dailyData).map(([date, pnl]) => ({
      date,
      pnl: Math.round(pnl * 100) / 100,
    }));

    // Performance by Pair
    const pairData: { [key: string]: { wins: number; losses: number; pnl: number } } = {};
    trades.forEach(trade => {
      if (!pairData[trade.pair]) {
        pairData[trade.pair] = { wins: 0, losses: 0, pnl: 0 };
      }
      if (trade.outcome === 'WIN') pairData[trade.pair].wins++;
      if (trade.outcome === 'LOSS') pairData[trade.pair].losses++;
      pairData[trade.pair].pnl += trade.profitLoss || 0;
    });

    const pairPerformance = Object.entries(pairData).map(([pair, data]) => ({
      pair,
      wins: data.wins,
      losses: data.losses,
      pnl: Math.round(data.pnl * 100) / 100,
    }));

    // Performance by Direction
    const directionData: { [key: string]: { wins: number; losses: number } } = {
      LONG: { wins: 0, losses: 0 },
      SHORT: { wins: 0, losses: 0 },
    };

    trades.forEach(trade => {
      if (trade.outcome === 'WIN') {
        directionData[trade.direction].wins++;
      } else if (trade.outcome === 'LOSS') {
        directionData[trade.direction].losses++;
      }
    });

    const directionPerformance = Object.entries(directionData).map(([direction, data]) => ({
      direction,
      value: data.wins,
      name: `${direction} (${data.wins} wins)`,
    }));

    setChartData({
      dailyPnL,
      pairPerformance,
      directionPerformance,
    });
  }, [trades]);

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Daily P&L Chart */}
      {chartData.dailyPnL.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Daily P&L</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.dailyPnL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#3b82f6"
                dot={{ fill: '#3b82f6' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance by Pair */}
      {chartData.pairPerformance.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance by Pair</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.pairPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="pair" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="wins" fill="#10b981" />
              <Bar dataKey="losses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Direction Win Rate */}
      {chartData.directionPerformance.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Win Rate by Direction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.directionPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.directionPerformance.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
