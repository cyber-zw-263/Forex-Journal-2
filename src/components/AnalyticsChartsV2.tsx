'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  Area,
  ReferenceDot,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dynamic from 'next/dynamic';
const ChartExportButton = dynamic(() => import('./ChartExportButton'), { ssr: false });
const PdfReport = dynamic(() => import('./PdfReport'), { ssr: false });

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

export default function AnalyticsChartsV2({ trades, startDate, endDate }: AnalyticsChartsProps & { startDate?: string | null; endDate?: string | null }) {
  const [chartData, setChartData] = useState<any>({ dailyPnL: [], pairPerformance: [], directionPerformance: [], equity: [] });

  useEffect(() => {
    if (!trades.length) return;

    // Optionally filter by selectedDateRange
    let working = trades;
    if (startDate || endDate) {
      working = trades.filter(t => {
        const d = new Date(t.entryTime);
        if (startDate && new Date(d.toISOString().slice(0,10)) < new Date(startDate)) return false;
        if (endDate && new Date(d.toISOString().slice(0,10)) > new Date(endDate)) return false;
        return true;
      });
    }

    // Daily P&L Chart
    const dailyData: { [key: string]: number } = {};
    working.forEach(trade => {
      const date = new Date(trade.entryTime).toLocaleDateString();
      dailyData[date] = (dailyData[date] || 0) + (trade.profitLoss || 0);
    });

    const dailyPnL = Object.entries(dailyData).map(([date, pnl]) => ({ date, pnl: Math.round(pnl * 100) / 100 }));

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

    const pairPerformance = Object.entries(pairData).map(([pair, data]) => ({ pair, wins: data.wins, losses: data.losses, pnl: Math.round(data.pnl * 100) / 100 }));

    // Performance by Direction
    const directionData: { [key: string]: { wins: number; losses: number } } = { LONG: { wins: 0, losses: 0 }, SHORT: { wins: 0, losses: 0 } };
    trades.forEach(trade => {
      if (trade.outcome === 'WIN') {
        directionData[trade.direction].wins++;
      } else if (trade.outcome === 'LOSS') {
        directionData[trade.direction].losses++;
      }
    });

    const directionPerformance = Object.entries(directionData).map(([direction, data]) => ({ direction, value: data.wins, name: `${direction} (${data.wins} wins)` }));

    // Equity curve and drawdown (respect date filters)
    const sorted = [...working].sort((a, b) => new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime());
    let equity = 0;
    let maxEquity = -Infinity;
    const equityData = sorted.map((t) => {
      equity += t.profitLoss || 0;
      maxEquity = Math.max(maxEquity, equity);
      const drawdown = Math.round((maxEquity - equity) * 100) / 100;
      return { date: new Date(t.entryTime).toLocaleDateString(), equity: Math.round(equity * 100) / 100, drawdown };
    });

    // compute annotations (min drawdown, max equity)
    const minDrawdown = equityData.reduce((acc: number, cur: any) => Math.max(acc, cur.drawdown), 0);
    const maxPoint = equityData.length ? equityData.reduce((acc: any, cur: any) => (cur.equity > acc.equity ? cur : acc), equityData[0]) : null;
    const minPoint = equityData.length ? equityData.reduce((acc: any, cur: any) => (cur.equity < acc.equity ? cur : acc), equityData[0]) : null;

    setChartData({ dailyPnL, pairPerformance, directionPerformance, equity: equityData });
    // optionally set annotations into state if needed for external UI later
    // setAnnotations({ minDrawdown, maxEquity: maxPoint ? maxPoint.equity : null });
  }, [trades]);

  function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || !payload.length) return null;
    const equityItem = payload.find((p: any) => p.dataKey === 'equity') || payload[0];
    const drawdownItem = payload.find((p: any) => p.dataKey === 'drawdown');
    return (
      <div className="bg-gray-900 p-2 rounded text-sm text-white">
        <div className="font-bold">{label}</div>
        {equityItem && <div>Equity: <span className="font-mono">{equityItem.value}</span></div>}
        {drawdownItem && <div>Drawdown: <span className="font-mono">{drawdownItem.value}</span></div>}
      </div>
    );
  }

  const maxPoint = chartData.equity.length ? chartData.equity.reduce((acc: any, cur: any) => (cur.equity > acc.equity ? cur : acc), chartData.equity[0]) : null;
  const minPoint = chartData.equity.length ? chartData.equity.reduce((acc: any, cur: any) => (cur.equity < acc.equity ? cur : acc), chartData.equity[0]) : null;

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Live Equity Curve */}
      {chartData.equity.length > 0 && (
        <div className="card-glass rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-200 mb-4">Equity Curve (Live)</h3>
            <div className="flex items-center gap-2">
              <ChartExportButton selector=".recharts-wrapper" filename={`equity-${new Date().toISOString().slice(0,10)}.png`} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData.equity} className="equity-chart">              <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />

              {/* subtle drawdown area */}
              <Area type="monotone" dataKey="drawdown" fill="#7c3aed" fillOpacity={0.06} stroke="none" />

              {/* animated equity and drawdown lines */}
              <Line type="monotone" dataKey="equity" stroke="#06b6d4" strokeWidth={3} dot={false} strokeOpacity={0.98} isAnimationActive={true} animationDuration={1200} />
              <Line type="monotone" dataKey="drawdown" stroke="#7c3aed" strokeWidth={2} dot={false} strokeOpacity={0.6} isAnimationActive={true} animationDuration={1000} />

              {/* min/max markers */}
              {maxPoint && (
                <ReferenceDot x={maxPoint.date} y={maxPoint.equity} r={6} fill="#06b6d4" stroke="#fff" strokeWidth={1} />
              )}
              {minPoint && (
                <ReferenceDot x={minPoint.date} y={minPoint.equity} r={6} fill="#7c3aed" stroke="#fff" strokeWidth={1} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Daily P&L Chart */}
      {chartData.dailyPnL.length > 0 && (
        <div className="card-glass rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-200 mb-4">Daily P&L</h3>
            <div className="flex items-center gap-2">
              <ChartExportButton selector=".recharts-wrapper" filename={`daily-pnl-${new Date().toISOString().slice(0,10)}.png`} />
              <PdfReport trades={trades} chartSelector=".recharts-wrapper" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.dailyPnL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
              <Line type="monotone" dataKey="pnl" stroke="#3b82f6" dot={{ fill: '#3b82f6' }} isAnimationActive={true} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance by Pair */}
      {chartData.pairPerformance.length > 0 && (
        <div className="card-glass rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Performance by Pair</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.pairPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
              <XAxis dataKey="pair" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
              <Legend />
              <Bar dataKey="wins" fill="#10b981" />
              <Bar dataKey="losses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Direction Win Rate */}
      {chartData.directionPerformance.length > 0 && (
        <div className="card-glass rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-200 mb-4">Win Rate by Direction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData.directionPerformance} cx="50%" cy="50%" labelLine={false} label={({ name }) => name} outerRadius={80} fill="#8884d8" dataKey="value">
                {chartData.directionPerformance.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
