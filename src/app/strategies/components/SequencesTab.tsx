'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit3, FiTrash2, FiSettings, FiClock, FiTrendingUp } from 'react-icons/fi';
import CreateSequenceModal from './CreateSequenceModal';
import toast from 'react-hot-toast';

interface TimeframeStep {
  id: string;
  timeframe: string;
  orderIndex: number;
  description?: string;
}

interface TimeframeSequence {
  id: string;
  name: string;
  description?: string;
  steps: TimeframeStep[];
  createdAt: string;
  updatedAt: string;
}

interface SequencesTabProps {
  strategyId: string;
  onUpdate: (updatedStrategy: any) => void;
}

export default function SequencesTab({ strategyId, onUpdate }: SequencesTabProps) {
  const [sequences, setSequences] = useState<TimeframeSequence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchSequences = async () => {
    try {
      const response = await fetch(`/api/strategies/${strategyId}/sequences`);
      if (!response.ok) throw new Error('Failed to fetch sequences');
      const data = await response.json();
      setSequences(data);
    } catch (error) {
      console.error('Error fetching sequences:', error);
      toast.error('Failed to load sequences');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSequences();
  }, [strategyId]);

  const handleDelete = async (sequenceId: string) => {
    if (!confirm('Are you sure you want to delete this sequence? This will also delete all associated steps.')) {
      return;
    }

    try {
      const response = await fetch(`/api/strategies/${strategyId}/sequences/${sequenceId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete sequence');

      setSequences(prev => prev.filter(s => s.id !== sequenceId));
      toast.success('Sequence deleted successfully');
    } catch (error) {
      console.error('Error deleting sequence:', error);
      toast.error('Failed to delete sequence');
    }
  };

  const handleSequenceCreated = () => {
    setShowCreateModal(false);
    fetchSequences();
    toast.success('Sequence created successfully');
  };

  const getTimeframeColor = (timeframe: string) => {
    const tf = timeframe.toLowerCase();
    if (tf.includes('1m') || tf.includes('5m')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (tf.includes('15m') || tf.includes('30m') || tf.includes('1h')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (tf.includes('4h') || tf.includes('daily')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Timeframe Sequences
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Define the order of timeframes you analyze for trade entries
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg"
        >
          <FiPlus className="w-4 h-4" />
          Add Sequence
        </motion.button>
      </div>

      {/* Sequences List */}
      {sequences.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSettings className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No sequences yet
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create timeframe sequences to structure your multi-timeframe analysis.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg"
          >
            Create First Sequence
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {sequences.map((sequence, index) => (
            <motion.div
              key={sequence.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {sequence.name}
                    </h4>
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 text-xs font-medium rounded">
                      {sequence.steps.length} steps
                    </span>
                  </div>
                  {sequence.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {sequence.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => {/* TODO: Implement edit */}}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit sequence"
                  >
                    <FiEdit3 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(sequence.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete sequence"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Timeframe Steps */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  Analysis Sequence
                </h5>
                <div className="flex flex-wrap gap-3">
                  {sequence.steps
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((step, stepIndex) => (
                      <div
                        key={step.id}
                        className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2"
                      >
                        <span className="flex items-center justify-center w-6 h-6 bg-orange-600 text-white text-xs font-bold rounded-full">
                          {stepIndex + 1}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTimeframeColor(step.timeframe)}`}>
                          {step.timeframe}
                        </span>
                        {step.description && (
                          <span className="text-xs text-gray-600 dark:text-gray-400 max-w-32 truncate">
                            {step.description}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span>Created {new Date(sequence.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <FiTrendingUp className="w-3 h-3" />
                  <span>{sequence.steps.length} timeframes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateSequenceModal
          strategyId={strategyId}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleSequenceCreated}
        />
      )}
    </div>
  );
}