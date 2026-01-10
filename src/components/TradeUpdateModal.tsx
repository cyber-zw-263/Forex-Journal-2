'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiSave, FiClock } from 'react-icons/fi';
import Modal from '@/components/Modal';
import AnimatedCard from '@/components/AnimatedCard';
import toast from 'react-hot-toast';

interface TradeUpdate {
  id: string;
  action: string;
  reason?: string;
  emotionalState?: string;
  behavior?: string[];
  notes?: string;
  timestamp: string;
}

interface TradeUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: string;
  onUpdateAdded?: (update: TradeUpdate) => void;
  existingUpdates?: TradeUpdate[];
}

const actionOptions = [
  { value: 'none', label: 'No Action', description: 'Monitoring the trade' },
  { value: 'sl_moved', label: 'Stop Loss Moved', description: 'Adjusted stop loss level' },
  { value: 'tp_adjusted', label: 'Take Profit Adjusted', description: 'Modified profit target' },
  { value: 'partial_close', label: 'Partial Close', description: 'Closed portion of position' },
  { value: 'manual_close', label: 'Manual Close', description: 'Closed entire position manually' }
];

const reasonOptions = [
  { value: 'followed_plan', label: 'Followed Plan', description: 'Executed according to strategy' },
  { value: 'market_structure', label: 'Market Structure', description: 'Responding to price action' },
  { value: 'emotional', label: 'Emotional Response', description: 'Reacted based on emotions' },
  { value: 'fear', label: 'Fear', description: 'Fear-driven decision' },
  { value: 'greed', label: 'Greed', description: 'Greed-driven decision' },
  { value: 'uncertainty', label: 'Uncertainty', description: 'Uncertain market conditions' },
  { value: 'distraction', label: 'Distraction', description: 'Lost focus or distracted' }
];

const emotionalStates = [
  { value: 'calm', label: 'Calm', color: 'bg-green-100 text-green-800' },
  { value: 'confident', label: 'Confident', color: 'bg-blue-100 text-blue-800' },
  { value: 'anxious', label: 'Anxious', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'hesitant', label: 'Hesitant', color: 'bg-orange-100 text-orange-800' },
  { value: 'overconfident', label: 'Overconfident', color: 'bg-purple-100 text-purple-800' },
  { value: 'fearful', label: 'Fearful', color: 'bg-red-100 text-red-800' },
  { value: 'impulsive', label: 'Impulsive', color: 'bg-pink-100 text-pink-800' },
  { value: 'detached', label: 'Detached', color: 'bg-gray-100 text-gray-800' }
];

const behaviorOptions = [
  { value: 'disciplined', label: 'Disciplined', description: 'Following rules consistently' },
  { value: 'patient', label: 'Patient', description: 'Waiting for proper setup' },
  { value: 'focused', label: 'Focused', description: 'Maintaining attention' },
  { value: 'impulsive', label: 'Impulsive', description: 'Acting without thinking' },
  { value: 'fearful', label: 'Fearful', description: 'Avoiding necessary actions' },
  { value: 'greedy', label: 'Greedy', description: 'Taking excessive risk' },
  { value: 'distracted', label: 'Distracted', description: 'Not fully engaged' },
  { value: 'overconfident', label: 'Overconfident', description: 'Taking unnecessary risks' }
];

export default function TradeUpdateModal({
  isOpen,
  onClose,
  tradeId,
  onUpdateAdded,
  existingUpdates = []
}: TradeUpdateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [update, setUpdate] = useState<TradeUpdate>({
    id: '',
    action: 'none',
    reason: '',
    emotionalState: '',
    behavior: [],
    notes: '',
    timestamp: new Date().toISOString()
  });

  const resetForm = () => {
    setUpdate({
      id: '',
      action: 'none',
      reason: '',
      emotionalState: '',
      behavior: [],
      notes: '',
      timestamp: new Date().toISOString()
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!update.action) {
      toast.error('Please select an action');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          action: update.action,
          reason: update.reason || null,
          emotionalState: update.emotionalState || null,
          behavior: update.behavior && update.behavior.length > 0 ? update.behavior : null,
          notes: update.notes || null
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add update');
      }

      const newUpdate = await response.json();
      toast.success('Trade update added successfully');

      onUpdateAdded?.(newUpdate);
      handleClose();
    } catch (error) {
      console.error('Error adding trade update:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add trade update');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleBehavior = (behaviorValue: string) => {
    setUpdate(prev => ({
      ...prev,
      behavior: prev.behavior?.includes(behaviorValue)
        ? prev.behavior.filter(b => b !== behaviorValue)
        : [...(prev.behavior || []), behaviorValue]
    }));
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Trade Update
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Record changes and observations during the trade
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Action Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              What action did you take?
            </label>
            <div className="grid grid-cols-1 gap-3">
              {actionOptions.map((action) => (
                <label
                  key={action.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    update.action === action.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="action"
                    value={action.value}
                    checked={update.action === action.value}
                    onChange={(e) => setUpdate(prev => ({ ...prev, action: e.target.value }))}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {action.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Reason Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Why did you take this action?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {reasonOptions.map((reason) => (
                <label
                  key={reason.value}
                  className={`flex items-start space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    update.reason === reason.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.value}
                    checked={update.reason === reason.value}
                    onChange={(e) => setUpdate(prev => ({ ...prev, reason: e.target.value }))}
                    className="mt-0.5"
                  />
                  <div className="text-xs">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {reason.label}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Emotional State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How were you feeling?
            </label>
            <div className="flex flex-wrap gap-2">
              {emotionalStates.map((state) => (
                <button
                  key={state.value}
                  type="button"
                  onClick={() => setUpdate(prev => ({
                    ...prev,
                    emotionalState: prev.emotionalState === state.value ? '' : state.value
                  }))}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    update.emotionalState === state.value
                      ? state.color + ' ring-2 ring-offset-2 ring-blue-500'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {state.label}
                </button>
              ))}
            </div>
          </div>

          {/* Behavior Flags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How did you behave during this update?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {behaviorOptions.map((behavior) => (
                <label
                  key={behavior.value}
                  className={`flex items-start space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    update.behavior?.includes(behavior.value)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={update.behavior?.includes(behavior.value) || false}
                    onChange={() => toggleBehavior(behavior.value)}
                    className="mt-0.5"
                  />
                  <div className="text-xs">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {behavior.label}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {behavior.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes
            </label>
            <textarea
              value={update.notes}
              onChange={(e) => setUpdate(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional observations or thoughts..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  <span>Add Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}