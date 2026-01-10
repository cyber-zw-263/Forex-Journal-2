'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiBarChart, FiCalendar, FiTarget, FiZap } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';

interface JournalEntry {
  id: string;
  date: string;
  mentalState?: string;
  focus?: string;
  confidence?: number;
  externalStressors?: string[];
  phase?: string;
  phaseNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface JournalAnalyticsProps {
  entries: JournalEntry[];
}

const JournalAnalytics: React.FC<JournalAnalyticsProps> = ({ entries }) => {
  const analytics = useMemo(() => {
    if (entries.length === 0) return null;

    // Sort entries by date
    const sortedEntries = [...entries].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Mental state trends
    const mentalStateTrend = sortedEntries.slice(-14).map(entry => ({
      date: entry.date,
      state: entry.mentalState,
      score: getMentalStateScore(entry.mentalState)
    }));

    // Confidence trends
    const confidenceTrend = sortedEntries
      .filter(e => e.confidence !== undefined)
      .slice(-14)
      .map(entry => ({
        date: entry.date,
        confidence: entry.confidence || 0
      }));

    // Phase distribution
    const phaseDistribution = entries.reduce((acc, entry) => {
      if (entry.phase) {
        acc[entry.phase] = (acc[entry.phase] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Stressor analysis
    const stressorCounts = entries.reduce((acc, entry) => {
      if (entry.externalStressors) {
        entry.externalStressors.forEach(stressor => {
          acc[stressor] = (acc[stressor] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    // Focus vs Performance correlation
    const focusPerformance = entries.reduce((acc, entry) => {
      if (entry.focus && entry.confidence) {
        if (!acc[entry.focus]) acc[entry.focus] = [];
        acc[entry.focus].push(entry.confidence);
      }
      return acc;
    }, {} as Record<string, number[]>);

    // Calculate averages
    const avgConfidence = entries
      .filter(e => e.confidence !== undefined)
      .reduce((sum, e) => sum + (e.confidence || 0), 0) / entries.filter(e => e.confidence !== undefined).length;

    // Weekly patterns
    const weeklyPatterns = entries.reduce((acc, entry) => {
      const dayOfWeek = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!acc[dayOfWeek]) acc[dayOfWeek] = [];
      if (entry.confidence) acc[dayOfWeek].push(entry.confidence);
      return acc;
    }, {} as Record<string, number[]>);

    return {
      mentalStateTrend,
      confidenceTrend,
      phaseDistribution,
      stressorCounts,
      focusPerformance,
      avgConfidence: avgConfidence || 0,
      weeklyPatterns,
      totalEntries: entries.length,
      streak: calculateStreak(sortedEntries)
    };
  }, [entries]);

  function getMentalStateScore(state?: string): number {
    switch (state?.toLowerCase()) {
      case 'excellent': return 5;
      case 'good': return 4;
      case 'okay': return 3;
      case 'poor': return 2;
      case 'terrible': return 1;
      default: return 3;
    }
  }

  function calculateStreak(entries: JournalEntry[]): number {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);

      const hasEntry = entries.some(entry =>
        new Date(entry.date).toDateString() === checkDate.toDateString()
      );

      if (hasEntry) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  if (!analytics || entries.length === 0) {
    return (
      <AnimatedCard className="p-8 text-center">
        <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Analytics Available
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start journaling to see your trading psychology patterns and insights
        </p>
      </AnimatedCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiCalendar className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.totalEntries}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Entries
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiTarget className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.streak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiTrendingUp className="w-8 h-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.avgConfidence.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Confidence
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="flex items-center space-x-3">
            <FiZap className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Object.keys(analytics.phaseDistribution).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Phases Tracked
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Mental State Trend */}
      <AnimatedCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Mental State Trend (Last 14 Days)
        </h3>
        <div className="flex items-end space-x-2 h-32">
          {analytics.mentalStateTrend.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ height: 0 }}
              animate={{ height: `${(day.score / 5) * 100}%` }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t flex flex-col items-center justify-end pb-2"
            >
              <div className="text-xs text-white font-medium transform -rotate-45 whitespace-nowrap">
                {day.state?.slice(0, 3)}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </AnimatedCard>

      {/* Confidence Trend */}
      <AnimatedCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Confidence Trend (Last 14 Days)
        </h3>
        <div className="flex items-end space-x-2 h-32">
          {analytics.confidenceTrend.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ height: 0 }}
              animate={{ height: `${(day.confidence / 10) * 100}%` }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t flex flex-col items-center justify-end pb-2"
            >
              <div className="text-xs text-white font-medium">
                {day.confidence}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </AnimatedCard>

      {/* Phase Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Trading Phase Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.phaseDistribution)
              .sort(([,a], [,b]) => b - a)
              .map(([phase, count]) => (
                <div key={phase} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {phase.replace('-', ' ')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / analytics.totalEntries) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem]">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </AnimatedCard>

        {/* Focus vs Performance */}
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Focus vs Average Confidence
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.focusPerformance).map(([focus, scores]) => {
              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
              return (
                <div key={focus} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {focus} Focus
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(avg / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem]">
                      {avg.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>
      </div>

      {/* Weekly Patterns */}
      <AnimatedCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Weekly Confidence Patterns
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
            const scores = analytics.weeklyPatterns[day] || [];
            const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

            return (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {day.slice(0, 3)}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-16 flex items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${avg > 0 ? (avg / 10) * 100 : 5}%` }}
                    className="w-6 bg-purple-500 rounded-t"
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {avg > 0 ? avg.toFixed(1) : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* External Stressors */}
      {Object.keys(analytics.stressorCounts).length > 0 && (
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common External Stressors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analytics.stressorCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 8)
              .map(([stressor, count]) => (
                <div key={stressor} className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {count}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stressor}
                  </div>
                </div>
              ))}
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};

export default JournalAnalytics;