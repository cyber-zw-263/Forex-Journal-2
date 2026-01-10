'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiSmile, FiMeh, FiFrown, FiTrendingUp, FiTrendingDown, FiTarget, FiAlertTriangle } from 'react-icons/fi';
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

interface JournalEntry {
  id: string;
  date: string;
  mentalState?: string;
  focus?: string;
  confidence?: number;
  phase?: string;
  [key: string]: any;
}

interface BehavioralAnalysisProps {
  trades: Trade[];
  journalEntries: JournalEntry[];
}

const BehavioralAnalysis: React.FC<BehavioralAnalysisProps> = ({ trades, journalEntries }) => {
  const behavioralInsights = useMemo(() => {
    if (trades.length === 0 && journalEntries.length === 0) return null;

    const closedTrades = trades.filter(t => t.status === 'closed' && t.profitLoss !== null && t.profitLoss !== undefined);

    // Emotional state analysis from trades
    const tradeEmotions = closedTrades.reduce((acc, trade) => {
      const emotion = trade.emotionalState;
      if (emotion) {
        if (!acc[emotion]) {
          acc[emotion] = { count: 0, wins: 0, losses: 0, totalPnL: 0 };
        }
        acc[emotion].count++;
        acc[emotion].totalPnL += trade.profitLoss || 0;
        if (trade.profitLoss! > 0) acc[emotion].wins++;
        else if (trade.profitLoss! < 0) acc[emotion].losses++;
      }
      return acc;
    }, {} as Record<string, { count: number; wins: number; losses: number; totalPnL: number }>);

    // Journal mental states
    const journalEmotions = journalEntries.reduce((acc, entry) => {
      const emotion = entry.mentalState;
      if (emotion) {
        if (!acc[emotion]) {
          acc[emotion] = { count: 0, avgConfidence: 0, totalConfidence: 0 };
        }
        acc[emotion].count++;
        if (entry.confidence) {
          acc[emotion].totalConfidence += entry.confidence;
        }
      }
      return acc;
    }, {} as Record<string, { count: number; avgConfidence: number; totalConfidence: number }>);

    // Calculate averages
    Object.keys(journalEmotions).forEach(emotion => {
      const data = journalEmotions[emotion];
      data.avgConfidence = data.totalConfidence / data.count;
    });

    // Focus level analysis
    const focusAnalysis = journalEntries.reduce((acc, entry) => {
      const focus = entry.focus;
      if (focus) {
        if (!acc[focus]) {
          acc[focus] = { count: 0, avgConfidence: 0, totalConfidence: 0 };
        }
        acc[focus].count++;
        if (entry.confidence) {
          acc[focus].totalConfidence += entry.confidence;
        }
      }
      return acc;
    }, {} as Record<string, { count: number; avgConfidence: number; totalConfidence: number }>);

    // Calculate focus averages
    Object.keys(focusAnalysis).forEach(focus => {
      const data = focusAnalysis[focus];
      data.avgConfidence = data.totalConfidence / data.count;
    });

    // Trading phase analysis
    const phaseAnalysis = journalEntries.reduce((acc, entry) => {
      const phase = entry.phase;
      if (phase) {
        if (!acc[phase]) {
          acc[phase] = { count: 0, avgConfidence: 0, totalConfidence: 0 };
        }
        acc[phase].count++;
        if (entry.confidence) {
          acc[phase].totalConfidence += entry.confidence;
        }
      }
      return acc;
    }, {} as Record<string, { count: number; avgConfidence: number; totalConfidence: number }>);

    // Calculate phase averages
    Object.keys(phaseAnalysis).forEach(phase => {
      const data = phaseAnalysis[phase];
      data.avgConfidence = data.totalConfidence / data.count;
    });

    // Correlation analysis: Journal confidence vs Trade performance
    const confidenceCorrelation = journalEntries.map(entry => {
      const entryDate = new Date(entry.date).toDateString();
      const dayTrades = closedTrades.filter(trade =>
        new Date(trade.entryTime).toDateString() === entryDate
      );
      const dayPnL = dayTrades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);

      return {
        date: entry.date,
        confidence: entry.confidence || 0,
        pnl: dayPnL,
        trades: dayTrades.length
      };
    }).filter(item => item.trades > 0);

    // Calculate correlation coefficient
    const correlation = calculateCorrelation(
      confidenceCorrelation.map(c => c.confidence),
      confidenceCorrelation.map(c => c.pnl)
    );

    // Weekly patterns
    const weeklyPatterns = journalEntries.reduce((acc, entry) => {
      const dayOfWeek = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = { count: 0, avgConfidence: 0, totalConfidence: 0 };
      }
      acc[dayOfWeek].count++;
      if (entry.confidence) {
        acc[dayOfWeek].totalConfidence += entry.confidence;
      }
      return acc;
    }, {} as Record<string, { count: number; avgConfidence: number; totalConfidence: number }>);

    // Calculate weekly averages
    Object.keys(weeklyPatterns).forEach(day => {
      const data = weeklyPatterns[day];
      data.avgConfidence = data.totalConfidence / data.count;
    });

    return {
      tradeEmotions,
      journalEmotions,
      focusAnalysis,
      phaseAnalysis,
      confidenceCorrelation,
      correlation,
      weeklyPatterns,
      totalJournalEntries: journalEntries.length,
      totalTrades: closedTrades.length
    };
  }, [trades, journalEntries]);

  function calculateCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0) return 0;

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'excellent':
      case 'great':
      case 'good':
        return <FiSmile className="w-5 h-5 text-green-500" />;
      case 'okay':
      case 'neutral':
        return <FiMeh className="w-5 h-5 text-yellow-500" />;
      case 'poor':
      case 'bad':
      case 'terrible':
        return <FiFrown className="w-5 h-5 text-red-500" />;
      default:
        return <FiMeh className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'excellent':
      case 'great':
      case 'good':
        return 'text-green-600 dark:text-green-400';
      case 'okay':
      case 'neutral':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'poor':
      case 'bad':
      case 'terrible':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

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

  if (!behavioralInsights) {
    return (
      <AnimatedCard className="p-8 text-center">
        <FiActivity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Behavioral Data Available
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start journaling and recording emotional states in trades to see behavioral insights
        </p>
      </AnimatedCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiActivity className="w-8 h-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {behavioralInsights.totalJournalEntries}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Journal Entries
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiTarget className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {behavioralInsights.totalTrades}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tracked Trades
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiTrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {behavioralInsights.correlation.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Confidence-P&L Correlation
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Emotional State Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Emotions */}
        {Object.keys(behavioralInsights.tradeEmotions).length > 0 && (
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Trading Emotional States
            </h3>
            <div className="space-y-3">
              {Object.entries(behavioralInsights.tradeEmotions)
                .sort(([,a], [,b]) => b.totalPnL - a.totalPnL)
                .map(([emotion, data]) => (
                  <div key={emotion} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getEmotionIcon(emotion)}
                      <div>
                        <div className={`font-medium capitalize ${getEmotionColor(emotion)}`}>
                          {emotion}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {data.count} trades • {formatPercentage((data.wins / data.count) * 100)} win rate
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${data.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(data.totalPnL)}
                    </div>
                  </div>
                ))}
            </div>
          </AnimatedCard>
        )}

        {/* Journal Emotions */}
        {Object.keys(behavioralInsights.journalEmotions).length > 0 && (
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Journal Mental States
            </h3>
            <div className="space-y-3">
              {Object.entries(behavioralInsights.journalEmotions)
                .sort(([,a], [,b]) => b.avgConfidence - a.avgConfidence)
                .map(([emotion, data]) => (
                  <div key={emotion} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getEmotionIcon(emotion)}
                      <div>
                        <div className={`font-medium capitalize ${getEmotionColor(emotion)}`}>
                          {emotion}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {data.count} entries
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {data.avgConfidence.toFixed(1)}/10
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Avg Confidence
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </AnimatedCard>
        )}
      </div>

      {/* Focus and Phase Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Focus Analysis */}
        {Object.keys(behavioralInsights.focusAnalysis).length > 0 && (
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Focus Level Impact
            </h3>
            <div className="space-y-3">
              {Object.entries(behavioralInsights.focusAnalysis)
                .sort(([,a], [,b]) => b.avgConfidence - a.avgConfidence)
                .map(([focus, data]) => (
                  <div key={focus} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiTarget className={`w-5 h-5 ${focus === 'high' ? 'text-green-500' : focus === 'medium' ? 'text-yellow-500' : 'text-red-500'}`} />
                      <div>
                        <div className="font-medium capitalize text-gray-900 dark:text-white">
                          {focus} Focus
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {data.count} entries
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {data.avgConfidence.toFixed(1)}/10
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Avg Confidence
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </AnimatedCard>
        )}

        {/* Phase Analysis */}
        {Object.keys(behavioralInsights.phaseAnalysis).length > 0 && (
          <AnimatedCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Trading Phase Performance
            </h3>
            <div className="space-y-3">
              {Object.entries(behavioralInsights.phaseAnalysis)
                .sort(([,a], [,b]) => b.avgConfidence - a.avgConfidence)
                .map(([phase, data]) => (
                  <div key={phase} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiTrendingUp className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium capitalize text-gray-900 dark:text-white">
                          {phase.replace('-', ' ')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {data.count} entries
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {data.avgConfidence.toFixed(1)}/10
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Avg Confidence
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </AnimatedCard>
        )}
      </div>

      {/* Correlation Analysis */}
      {behavioralInsights.confidenceCorrelation.length > 0 && (
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confidence vs Performance Correlation
          </h3>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Correlation Coefficient: {behavioralInsights.correlation.toFixed(3)}
              </span>
              <div className="flex items-center space-x-2">
                {behavioralInsights.correlation > 0.3 && <FiTrendingUp className="w-4 h-4 text-green-500" />}
                {behavioralInsights.correlation < -0.3 && <FiTrendingDown className="w-4 h-4 text-red-500" />}
                <span className={`text-sm font-medium ${
                  behavioralInsights.correlation > 0.3 ? 'text-green-600' :
                  behavioralInsights.correlation < -0.3 ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {behavioralInsights.correlation > 0.3 ? 'Positive Correlation' :
                   behavioralInsights.correlation < -0.3 ? 'Negative Correlation' :
                   'Weak/No Correlation'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {behavioralInsights.confidenceCorrelation.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Data Points</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {behavioralInsights.confidenceCorrelation.filter(c => c.pnl > 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Profitable Days</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {(behavioralInsights.confidenceCorrelation.reduce((sum, c) => sum + c.confidence, 0) / behavioralInsights.confidenceCorrelation.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</div>
              </div>
            </div>
          </div>

          {/* Correlation Insights */}
          <div className="space-y-3">
            {behavioralInsights.correlation > 0.5 && (
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200">
                    Strong Positive Correlation
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Higher confidence levels are associated with better trading performance
                  </div>
                </div>
              </div>
            )}

            {behavioralInsights.correlation < -0.5 && (
              <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <FiTrendingDown className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-red-800 dark:text-red-200">
                    Negative Correlation Detected
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300">
                    Higher confidence may be leading to overconfidence and poorer results
                  </div>
                </div>
              </div>
            )}

            {Math.abs(behavioralInsights.correlation) < 0.3 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <FiAlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800 dark:text-yellow-200">
                    Weak Correlation
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    Confidence levels don't strongly predict trading performance
                  </div>
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
      )}

      {/* Weekly Patterns */}
      {Object.keys(behavioralInsights.weeklyPatterns).length > 0 && (
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Confidence Patterns
          </h3>
          <div className="grid grid-cols-7 gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
              const data = behavioralInsights.weeklyPatterns[day];
              const avgConfidence = data ? data.avgConfidence : 0;
              const count = data ? data.count : 0;

              return (
                <div key={day} className="text-center">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {day.slice(0, 3)}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-16 flex items-end justify-center relative">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: avgConfidence > 0 ? `${(avgConfidence / 10) * 100}%` : '4px' }}
                      className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    />
                    {count > 0 && (
                      <div className="absolute -top-6 text-xs text-gray-600 dark:text-gray-400">
                        {count}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {avgConfidence > 0 ? avgConfidence.toFixed(1) : '-'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            Numbers show journal entries count for each day
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};

export default BehavioralAnalysis;