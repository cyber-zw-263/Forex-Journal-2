'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts';

interface EmotionalCostData {
  immediateCost: number;
  longTermCost: number;
  recoveryTime: number;
  stressAccumulation: number;
  tradeId?: string;
  timestamp?: string;
}

interface EmotionalCostChartProps {
  data: EmotionalCostData[];
  chartType?: 'trend' | 'distribution' | 'recovery' | 'stress';
}

const COST_COLORS = {
  low: '#10b981',    // green-500
  medium: '#f59e0b', // amber-500
  high: '#ef4444',   // red-500
  extreme: '#7c2d12' // red-900
};

export function EmotionalCostChart({ data, chartType = 'trend' }: EmotionalCostChartProps) {
  const chartData = useMemo(() => {
    if (!data.length) return [];

    switch (chartType) {
      case 'trend':
        return data
          .sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime())
          .map((item, index) => ({
            index: index + 1,
            immediateCost: item.immediateCost,
            longTermCost: item.longTermCost,
            stressAccumulation: item.stressAccumulation,
            date: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : `Trade ${index + 1}`
          }));

      case 'distribution':
        const costRanges = data.reduce((acc, item) => {
          const cost = item.immediateCost;
          if (cost < 25) acc.low++;
          else if (cost < 50) acc.medium++;
          else if (cost < 75) acc.high++;
          else acc.extreme++;
          return acc;
        }, { low: 0, medium: 0, high: 0, extreme: 0 });

        return [
          { range: 'Low (<25%)', count: costRanges.low, color: COST_COLORS.low },
          { range: 'Medium (25-50%)', count: costRanges.medium, color: COST_COLORS.medium },
          { range: 'High (50-75%)', count: costRanges.high, color: COST_COLORS.high },
          { range: 'Extreme (>75%)', count: costRanges.extreme, color: COST_COLORS.extreme }
        ];

      case 'recovery':
        return data
          .filter(item => item.recoveryTime > 0)
          .sort((a, b) => a.recoveryTime - b.recoveryTime)
          .map((item, index) => ({
            index: index + 1,
            recoveryTime: item.recoveryTime,
            immediateCost: item.immediateCost,
            costLevel: item.immediateCost < 25 ? 'Low' : item.immediateCost < 50 ? 'Medium' : 'High'
          }));

      case 'stress':
        return data
          .sort((a, b) => a.stressAccumulation - b.stressAccumulation)
          .map((item, index) => ({
            index: index + 1,
            stressAccumulation: item.stressAccumulation,
            immediateCost: item.immediateCost,
            recoveryTime: item.recoveryTime
          }));

      default:
        return [];
    }
  }, [data, chartType]);

  const renderChart = () => {
    switch (chartType) {
      case 'trend':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Emotional Cost Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval="preserveStartEnd"
                />
                <YAxis domain={[0, 100]} fontSize={12} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(1)}%`,
                    name === 'immediateCost' ? 'Immediate Cost' :
                    name === 'longTermCost' ? 'Long-term Cost' :
                    name === 'stressAccumulation' ? 'Stress Accumulation' : name
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="immediateCost"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="longTermCost"
                  stackId="2"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'distribution':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Emotional Cost Distribution</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value} trades`, 'Count']}
                />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'recovery':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Recovery Time Analysis</h4>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="recoveryTime"
                  name="Recovery Time"
                  label={{ value: 'Recovery Time (hours)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="immediateCost"
                  name="Emotional Cost"
                  domain={[0, 100]}
                  label={{ value: 'Emotional Cost (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === 'recoveryTime' ? `${value} hours` : `${value.toFixed(1)}%`,
                    name === 'recoveryTime' ? 'Recovery Time' : 'Emotional Cost'
                  ]}
                />
                <Scatter
                  name="Trades"
                  dataKey="immediateCost"
                  fill="#ef4444"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );

      case 'stress':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Stress Accumulation Trend</h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(1)}`, 'Stress Points']}
                  labelFormatter={(label) => `Trade ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="stressAccumulation"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  const getCostMetrics = () => {
    if (!data.length) return null;

    const avgImmediate = data.reduce((sum, item) => sum + item.immediateCost, 0) / data.length;
    const avgLongTerm = data.reduce((sum, item) => sum + item.longTermCost, 0) / data.length;
    const avgRecovery = data.reduce((sum, item) => sum + item.recoveryTime, 0) / data.length;
    const maxStress = Math.max(...data.map(item => item.stressAccumulation));

    return {
      avgImmediate: Math.round(avgImmediate),
      avgLongTerm: Math.round(avgLongTerm),
      avgRecovery: Math.round(avgRecovery),
      maxStress: Math.round(maxStress)
    };
  };

  const metrics = getCostMetrics();

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-6">Emotional Cost Analysis</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No emotional cost data available</p>
            <p className="text-sm">Complete more trades to see emotional analytics</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Emotional Cost Analysis</h3>
          <div className="flex gap-2">
            {metrics && (
              <>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {data.length} trades analyzed
                </span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${metrics.avgImmediate > 50 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Avg Cost: {metrics.avgImmediate}%
                </span>
              </>
            )}
          </div>
        </div>
        <div className="pt-0">
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-red-500">
                {metrics.avgImmediate}%
              </div>
              <p className="text-xs text-muted-foreground">Avg Immediate Cost</p>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-orange-500">
                {metrics.avgLongTerm}%
              </div>
              <p className="text-xs text-muted-foreground">Avg Long-term Cost</p>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-blue-500">
                {metrics.avgRecovery}h
              </div>
              <p className="text-xs text-muted-foreground">Avg Recovery Time</p>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-purple-500">
                {metrics.maxStress}
              </div>
              <p className="text-xs text-muted-foreground">Max Stress Points</p>
            </div>
          </div>
        )}
        {renderChart()}
      </div>
      </div>
    </div>
  );
}