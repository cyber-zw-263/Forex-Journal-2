'use client';

import { motion } from 'framer-motion';
import { FiSmile, FiMeh, FiFrown, FiZap, FiTarget, FiTrendingUp } from 'react-icons/fi';
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

interface MentalStateTrackerProps {
  entries: JournalEntry[];
  className?: string;
}

const MentalStateTracker: React.FC<MentalStateTrackerProps> = ({ entries, className = '' }) => {
  // Calculate mental state distribution
  const mentalStateCounts = entries.reduce((acc, entry) => {
    if (entry.mentalState) {
      acc[entry.mentalState] = (acc[entry.mentalState] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate average confidence
  const confidenceEntries = entries.filter(e => e.confidence !== undefined);
  const avgConfidence = confidenceEntries.length > 0
    ? confidenceEntries.reduce((sum, e) => sum + (e.confidence || 0), 0) / confidenceEntries.length
    : 0;

  // Get recent entries (last 7 days)
  const recentEntries = entries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate focus distribution
  const focusCounts = entries.reduce((acc, entry) => {
    if (entry.focus) {
      acc[entry.focus] = (acc[entry.focus] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const getMentalStateIcon = (state: string) => {
    switch (state.toLowerCase()) {
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

  const getMentalStateColor = (state: string) => {
    switch (state.toLowerCase()) {
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

  const getFocusIcon = (focus: string) => {
    switch (focus.toLowerCase()) {
      case 'high':
        return <FiTarget className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <FiTarget className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <FiTarget className="w-4 h-4 text-red-500" />;
      default:
        return <FiTarget className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <AnimatedCard className={`p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <FiTrendingUp className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mental State Tracker
        </h3>
      </div>

      {/* Current Mental State */}
      {recentEntries.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current State
          </h4>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {getMentalStateIcon(recentEntries[0].mentalState || 'neutral')}
            <div>
              <div className={`font-medium ${getMentalStateColor(recentEntries[0].mentalState || 'neutral')}`}>
                {recentEntries[0].mentalState || 'Not recorded'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(recentEntries[0].date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Average Confidence */}
      {avgConfidence > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Average Confidence
          </h4>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(avgConfidence / 10) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-blue-500 h-3 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
              {avgConfidence.toFixed(1)}/10
            </span>
          </div>
        </div>
      )}

      {/* Mental State Distribution */}
      {Object.keys(mentalStateCounts).length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Mental State Distribution
          </h4>
          <div className="space-y-2">
            {Object.entries(mentalStateCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([state, count]) => (
                <div key={state} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getMentalStateIcon(state)}
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {state}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / entries.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem]">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Focus Distribution */}
      {Object.keys(focusCounts).length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Focus Levels
          </h4>
          <div className="space-y-2">
            {Object.entries(focusCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([focus, count]) => (
                <div key={focus} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getFocusIcon(focus)}
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {focus} Focus
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(count / entries.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem]">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Trend */}
      {recentEntries.length >= 3 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Recent Trend (7 days)
          </h4>
          <div className="flex items-center space-x-1">
            {recentEntries.slice(0, 7).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  {entry.mentalState ? getMentalStateIcon(entry.mentalState) : <FiMeh className="w-4 h-4 text-gray-400" />}
                </div>
                {entry.confidence && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {entry.confidence}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-8">
          <FiTrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            Start journaling to see your mental state trends
          </p>
        </div>
      )}
    </AnimatedCard>
  );
};

export default MentalStateTracker;