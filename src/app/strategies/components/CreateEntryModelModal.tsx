'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiTarget } from 'react-icons/fi';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

interface CreateEntryModelModalProps {
  strategyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CONFIRMATION_STYLES = ['conservative', 'moderate', 'aggressive'];
const RISK_STYLES = ['low', 'medium', 'high'];

export default function CreateEntryModelModal({ strategyId, onClose, onSuccess }: CreateEntryModelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    entryLogic: '',
    confirmationStyle: 'moderate',
    riskStyle: 'medium',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.entryLogic.trim()) {
      toast.error('Name and entry logic are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategyId}/entry-models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          entryLogic: formData.entryLogic.trim(),
          confirmationStyle: formData.confirmationStyle,
          riskStyle: formData.riskStyle,
          notes: formData.notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create entry model');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating entry model:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create entry model');
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <FiTarget className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Entry Model
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
              Model Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Breakout Entry with Volume Confirmation"
              required
            />
          </div>

          {/* Entry Logic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Entry Logic *
            </label>
            <textarea
              value={formData.entryLogic}
              onChange={(e) => setFormData(prev => ({ ...prev, entryLogic: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={4}
              placeholder="Describe the specific conditions and logic for entering trades..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Be specific about price action, indicators, volume requirements, etc.
            </p>
          </div>

          {/* Confirmation Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Confirmation Style
            </label>
            <div className="flex gap-3">
              {CONFIRMATION_STYLES.map((style) => (
                <label key={style} className="flex items-center">
                  <input
                    type="radio"
                    name="confirmationStyle"
                    value={style}
                    checked={formData.confirmationStyle === style}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmationStyle: e.target.value }))}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 rounded-lg border cursor-pointer transition-all capitalize ${
                    formData.confirmationStyle === style
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}>
                    {style}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Conservative: Multiple confirmations required<br />
              Moderate: Standard confirmation signals<br />
              Aggressive: Quick entries with minimal confirmation
            </p>
          </div>

          {/* Risk Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Risk Style
            </label>
            <div className="flex gap-3">
              {RISK_STYLES.map((style) => (
                <label key={style} className="flex items-center">
                  <input
                    type="radio"
                    name="riskStyle"
                    value={style}
                    checked={formData.riskStyle === style}
                    onChange={(e) => setFormData(prev => ({ ...prev, riskStyle: e.target.value }))}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 rounded-lg border cursor-pointer transition-all capitalize ${
                    formData.riskStyle === style
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400'
                  }`}>
                    {style}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Low: Conservative position sizing<br />
              Medium: Balanced risk-reward approach<br />
              High: Aggressive position sizing for higher potential returns
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={3}
              placeholder="Any additional notes or considerations..."
            />
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
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <FiSave className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Model'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}