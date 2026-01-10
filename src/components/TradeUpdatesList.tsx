'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp, FiTrendingDown, FiMinus, FiX, FiEdit3, FiPlus } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';
import TradeUpdateModal from '@/components/TradeUpdateModal';

interface TradeUpdate {
  id: string;
  action: string;
  reason?: string;
  emotionalState?: string;
  behavior?: string[];
  notes?: string;
  timestamp: string;
}

interface TradeUpdatesListProps {
  tradeId: string;
  className?: string;
}

const actionIcons = {
  none: FiMinus,
  sl_moved: FiTrendingDown,
  tp_adjusted: FiTrendingUp,
  partial_close: FiPlus,
  manual_close: FiX
};

const actionColors = {
  none: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  sl_moved: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  tp_adjusted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  partial_close: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  manual_close: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
};

const emotionalStateColors = {
  calm: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  confident: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  anxious: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hesitant: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  overconfident: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  fearful: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  impulsive: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  detached: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
};

const reasonLabels = {
  followed_plan: 'Followed Plan',
  market_structure: 'Market Structure',
  emotional: 'Emotional',
  fear: 'Fear',
  greed: 'Greed',
  uncertainty: 'Uncertainty',
  distraction: 'Distraction'
};

export default function TradeUpdatesList({ tradeId, className = '' }: TradeUpdatesListProps) {
  const [updates, setUpdates] = useState<TradeUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    loadUpdates();
  }, [tradeId]);

  const loadUpdates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/trades/${tradeId}/updates`, {
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load trade updates');
      }

      const data = await response.json();
      setUpdates(data);
    } catch (error) {
      console.error('Error loading trade updates:', error);
      setError(error instanceof Error ? error.message : 'Failed to load updates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAdded = (newUpdate: TradeUpdate) => {
    setUpdates(prev => [...prev, newUpdate].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <AnimatedCard className={`p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading updates...</span>
        </div>
      </AnimatedCard>
    );
  }

  if (error) {
    return (
      <AnimatedCard className={`p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Failed to load trade updates</div>
          <button
            onClick={loadUpdates}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Try again
          </button>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <>
      <AnimatedCard className={`p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Trade Updates
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {updates.length} update{updates.length !== 1 ? 's' : ''} recorded
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowUpdateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FiEdit3 className="w-4 h-4" />
            <span>Add Update</span>
          </button>
        </div>

        {updates.length === 0 ? (
          <div className="text-center py-12">
            <FiClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No updates yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Record changes and observations as the trade progresses
            </p>
            <button
              onClick={() => setShowUpdateModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add First Update</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((update, index) => {
              const ActionIcon = actionIcons[update.action as keyof typeof actionIcons] || FiMinus;

              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Action Badge */}
                      <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${actionColors[update.action as keyof typeof actionColors] || actionColors.none}`}>
                        <ActionIcon className="w-3 h-3 inline mr-1" />
                        {update.action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>

                      {/* Update Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTimestamp(update.timestamp)}
                          </span>
                          {update.reason && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {reasonLabels[update.reason as keyof typeof reasonLabels] || update.reason}
                            </span>
                          )}
                        </div>

                        {/* Emotional State */}
                        {update.emotionalState && (
                          <div className="mb-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${emotionalStateColors[update.emotionalState as keyof typeof emotionalStateColors] || 'bg-gray-100 text-gray-800'}`}>
                              Feeling: {update.emotionalState.replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                        )}

                        {/* Behavior Flags */}
                        {update.behavior && update.behavior.length > 0 && (
                          <div className="mb-2">
                            <div className="flex flex-wrap gap-1">
                              {update.behavior.map((behavior) => (
                                <span
                                  key={behavior}
                                  className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs"
                                >
                                  {behavior.replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {update.notes && (
                          <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            {update.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatedCard>

      <TradeUpdateModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        tradeId={tradeId}
        onUpdateAdded={handleUpdateAdded}
        existingUpdates={updates}
      />
    </>
  );
}