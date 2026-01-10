'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiSettings, FiPlus, FiTrash2 } from 'react-icons/fi';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

interface TimeframeStep {
  timeframe: string;
  description: string;
}

interface CreateSequenceModalProps {
  strategyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const COMMON_TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', 'Daily', 'Weekly'];

export default function CreateSequenceModal({ strategyId, onClose, onSuccess }: CreateSequenceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [steps, setSteps] = useState<TimeframeStep[]>([
    { timeframe: 'Daily', description: 'Trend direction and key levels' },
    { timeframe: '4h', description: 'Entry timing and momentum' },
    { timeframe: '1h', description: 'Precise entry and stop placement' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addStep = () => {
    setSteps(prev => [...prev, { timeframe: '1h', description: '' }]);
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: keyof TimeframeStep, value: string) => {
    setSteps(prev => prev.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    ));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;

    setSteps(prev => {
      const newSteps = [...prev];
      [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
      return newSteps;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Sequence name is required');
      return;
    }

    if (steps.length === 0) {
      toast.error('At least one timeframe step is required');
      return;
    }

    if (steps.some(step => !step.timeframe.trim())) {
      toast.error('All timeframe steps must have a timeframe selected');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategyId}/sequences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          steps: steps.map((step, index) => ({
            timeframe: step.timeframe.trim(),
            orderIndex: index,
            description: step.description.trim() || undefined,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create sequence');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating sequence:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create sequence');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
              <FiSettings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Timeframe Sequence
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sequence Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., London Breakout Analysis Sequence"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={3}
              placeholder="Describe the purpose and methodology of this sequence..."
            />
          </div>

          {/* Timeframe Steps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Analysis Steps *
              </label>
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-sm"
              >
                <FiPlus className="w-3 h-3" />
                Add Step
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white text-sm font-bold rounded-full">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Timeframe
                      </label>
                      <select
                        value={step.timeframe}
                        onChange={(e) => updateStep(index, 'timeframe', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                      >
                        {COMMON_TIMEFRAMES.map((tf) => (
                          <option key={tf} value={tf}>{tf}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={step.description}
                        onChange={(e) => updateStep(index, 'description', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        placeholder="What to analyze at this timeframe"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveStep(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(index, 'down')}
                      disabled={index === steps.length - 1}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      disabled={steps.length === 1}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove step"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Define the order of timeframes you analyze, from highest to lowest timeframe.
              Start with broader context and move to precise entry timing.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <FiSave className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Sequence'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}