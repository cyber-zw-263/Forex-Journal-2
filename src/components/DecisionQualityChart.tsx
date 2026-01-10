'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';

interface DecisionQualityData {
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

interface DecisionQualityChartProps {
  data: DecisionQualityData[];
  chartType?: 'distribution' | 'factors' | 'trend' | 'scatter';
}

const COLORS = {
  excellent: '#10b981', // green-500
  good: '#3b82f6',      // blue-500
  poor: '#f59e0b',      // amber-500
  terrible: '#ef4444',  // red-500
};

const FACTOR_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
];

export function DecisionQualityChart({ data, chartType = 'distribution' }: DecisionQualityChartProps) {
  const chartData = useMemo(() => {
    if (!data.length) return [];

    switch (chartType) {
      case 'distribution':
        const qualityCounts = data.reduce((acc, item) => {
          const quality = getQualityCategory(item.decisionScore);
          acc[quality] = (acc[quality] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(qualityCounts).map(([quality, count]) => ({
          quality: quality.charAt(0).toUpperCase() + quality.slice(1),
          count,
          percentage: Math.round((count / data.length) * 100),
          color: COLORS[quality as keyof typeof COLORS] || '#6b7280'
        }));

      case 'factors':
        const factorAverages = data.reduce((acc, item) => {
          Object.entries(item.factors).forEach(([factor, score]) => {
            acc[factor] = (acc[factor] || 0) + score;
          });
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(factorAverages).map(([factor, total], index) => ({
          factor: factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          average: Math.round(total / data.length),
          color: FACTOR_COLORS[index % FACTOR_COLORS.length]
        }));

      case 'trend':
        return data
          .sort((a, b) => a.decisionScore - b.decisionScore)
          .map((item, index) => ({
            index: index + 1,
            score: item.decisionScore,
            quality: getQualityCategory(item.decisionScore)
          }));

      case 'scatter':
        return data.map((item, index) => ({
          x: item.decisionScore,
          y: Math.random() * 20 + 40, // Mock performance score for demo
          quality: getQualityCategory(item.decisionScore),
          index: index + 1
        }));

      default:
        return [];
    }
  }, [data, chartType]);

  const renderChart = () => {
    switch (chartType) {
      case 'distribution':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Quality Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="quality"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === 'count' ? `${value} trades` : `${value}%`,
                      name === 'count' ? 'Count' : 'Percentage'
                    ]}
                    contentStyle={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Quality Breakdown</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ quality, percentage }) => `${quality}: ${percentage}%`}
                    outerRadius={window.innerWidth < 768 ? 60 : 80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'factors':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Decision Factors Analysis</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="factor" type="category" width={120} />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Average Score']}
                />
                <Bar dataKey="average" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'trend':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Decision Quality Trend</h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Decision Score']}
                  labelFormatter={(label) => `Trade ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'scatter':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Decision Quality vs Performance</h4>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Decision Score"
                  domain={[0, 100]}
                  label={{ value: 'Decision Quality Score', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Performance"
                  domain={[0, 100]}
                  label={{ value: 'Performance Score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(1)}%`,
                    name === 'x' ? 'Decision Score' : 'Performance'
                  ]}
                  labelFormatter={() => ''}
                />
                <Scatter
                  name="Trades"
                  dataKey="y"
                  fill="#3b82f6"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-6">Decision Quality Analysis</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No decision quality data available</p>
            <p className="text-sm">Complete more trades to see analytics</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Decision Quality Analysis</h3>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {data.length} trades analyzed
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-400">
              Avg: {Math.round(data.reduce((sum, item) => sum + item.decisionScore, 0) / data.length)}%
            </span>
          </div>
        </div>
        <div className="pt-0">
          {renderChart()}
        </div>
      </div>
    </div>
  );
}

function getQualityCategory(score: number): 'excellent' | 'good' | 'poor' | 'terrible' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'poor';
  return 'terrible';
}