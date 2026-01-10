'use client';

import { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';

interface StrategyEdgeData {
  strategyId: string;
  strategyName: string;
  edgeConfidenceScore: number;
  edgeStrength: 'very_weak' | 'weak' | 'moderate' | 'strong' | 'very_strong';
  consistencyRating: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  sampleSize: number;
  winRate: number;
  avgWinLossRatio: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  edgeComponents: {
    setupQuality: number;
    timingAccuracy: number;
    riskManagement: number;
    exitEfficiency: number;
    marketConditionMatch: number;
  };
}

interface StrategyEdgeChartProps {
  data: StrategyEdgeData[];
  chartType?: 'radar' | 'comparison' | 'confidence' | 'performance';
}

const EDGE_COLORS = {
  very_weak: '#ef4444',    // red-500
  weak: '#f97316',         // orange-500
  moderate: '#eab308',     // yellow-500
  strong: '#22c55e',       // green-500
  very_strong: '#10b981'   // emerald-500
};

const CONSISTENCY_COLORS = {
  very_low: '#ef4444',
  low: '#f97316',
  moderate: '#eab308',
  high: '#22c55e',
  very_high: '#10b981'
};

export function StrategyEdgeChart({ data, chartType = 'radar' }: StrategyEdgeChartProps) {
  const chartData = useMemo(() => {
    if (!data.length) return [];

    switch (chartType) {
      case 'radar':
        // For radar chart, we take the first strategy or average if multiple
        const strategy = data[0];
        return [
          { factor: 'Setup Quality', score: strategy.edgeComponents.setupQuality },
          { factor: 'Timing Accuracy', score: strategy.edgeComponents.timingAccuracy },
          { factor: 'Risk Management', score: strategy.edgeComponents.riskManagement },
          { factor: 'Exit Efficiency', score: strategy.edgeComponents.exitEfficiency },
          { factor: 'Market Match', score: strategy.edgeComponents.marketConditionMatch }
        ];

      case 'comparison':
        return data.map(strategy => ({
          name: strategy.strategyName.length > 15
            ? strategy.strategyName.substring(0, 15) + '...'
            : strategy.strategyName,
          fullName: strategy.strategyName,
          confidence: strategy.edgeConfidenceScore,
          winRate: strategy.winRate * 100,
          profitFactor: strategy.profitFactor,
          edgeStrength: strategy.edgeStrength,
          consistency: strategy.consistencyRating
        }));

      case 'confidence':
        return data
          .sort((a, b) => b.edgeConfidenceScore - a.edgeConfidenceScore)
          .map((strategy, index) => ({
            index: index + 1,
            name: strategy.strategyName,
            confidence: strategy.edgeConfidenceScore,
            strength: strategy.edgeStrength,
            sampleSize: strategy.sampleSize
          }));

      case 'performance':
        return data.map(strategy => ({
          x: strategy.winRate * 100,
          y: strategy.profitFactor,
          name: strategy.strategyName,
          confidence: strategy.edgeConfidenceScore,
          strength: strategy.edgeStrength
        }));

      default:
        return [];
    }
  }, [data, chartType]);

  const renderChart = () => {
    switch (chartType) {
      case 'radar':
        if (!data.length) return null;
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Edge Components Analysis</h4>
            <div className="text-center mb-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                {data[0].strategyName}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Edge Confidence: {data[0].edgeConfidenceScore}%
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'comparison':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Strategy Comparison</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(1)}${name === 'winRate' ? '%' : ''}`,
                    name === 'confidence' ? 'Edge Confidence' :
                    name === 'winRate' ? 'Win Rate' : 'Profit Factor'
                  ]}
                  labelFormatter={(label) => {
                    const item = chartData.find(d => d.name === label);
                    return item?.fullName || label;
                  }}
                />
                <Bar dataKey="confidence" fill="#3b82f6" name="confidence" />
                <Bar dataKey="winRate" fill="#10b981" name="winRate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'confidence':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Edge Confidence Ranking</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} layout="horizontal" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === 'confidence' ? `${value}%` : value,
                    name === 'confidence' ? 'Edge Confidence' : 'Sample Size'
                  ]}
                />
                <Bar dataKey="confidence" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'performance':
        return (
          <div>
            <h4 className="text-sm font-medium mb-4">Win Rate vs Profit Factor</h4>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Win Rate"
                  domain={[0, 100]}
                  label={{ value: 'Win Rate (%)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Profit Factor"
                  domain={[0, 3]}
                  label={{ value: 'Profit Factor', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === 'x' ? `${value.toFixed(1)}%` : value.toFixed(2),
                    name === 'x' ? 'Win Rate' : 'Profit Factor'
                  ]}
                  labelFormatter={(label) => {
                    const item = chartData.find(d => d.x === label);
                    return item?.name || '';
                  }}
                />
                <Scatter
                  name="Strategies"
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

  const getEdgeMetrics = () => {
    if (!data.length) return null;

    const avgConfidence = data.reduce((sum, item) => sum + item.edgeConfidenceScore, 0) / data.length;
    const strongStrategies = data.filter(item => item.edgeStrength === 'strong' || item.edgeStrength === 'very_strong').length;
    const totalTrades = data.reduce((sum, item) => sum + item.sampleSize, 0);
    const bestStrategy = data.reduce((best, current) =>
      current.edgeConfidenceScore > best.edgeConfidenceScore ? current : best
    );

    return {
      avgConfidence: Math.round(avgConfidence),
      strongStrategies,
      totalTrades,
      bestStrategy: bestStrategy.strategyName
    };
  };

  const metrics = getEdgeMetrics();

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-6">Strategy Edge Analysis</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No strategy edge data available</p>
            <p className="text-sm">Complete more trades with strategies to see edge analysis</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Strategy Edge Analysis</h3>
          <div className="flex gap-2">
            {metrics && (
              <>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {data.length} strategies
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Avg Confidence: {metrics.avgConfidence}%
                </span>
              </>
            )}
          </div>
        </div>
        <div className="pt-0">
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-blue-500">
                {metrics.avgConfidence}%
              </div>
              <p className="text-xs text-muted-foreground">Avg Edge Confidence</p>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-green-500">
                {metrics.strongStrategies}
              </div>
              <p className="text-xs text-muted-foreground">Strong Edge Strategies</p>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-purple-500">
                {metrics.totalTrades}
              </div>
              <p className="text-xs text-muted-foreground">Total Trades Analyzed</p>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="text-lg font-bold text-orange-500 text-sm">
                {metrics.bestStrategy.length > 12
                  ? metrics.bestStrategy.substring(0, 12) + '...'
                  : metrics.bestStrategy}
              </div>
              <p className="text-xs text-muted-foreground">Top Performing</p>
            </div>
          </div>
        )}
        {renderChart()}
      </div>
      </div>
    </div>
  );
}