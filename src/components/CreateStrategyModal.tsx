'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface CreateStrategyModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const MARKET_TYPES = ['bull', 'bear', 'mixed'];
const SESSIONS = ['London', 'New York', 'Tokyo', 'Sydney', 'Asian', 'European', 'American'];

export default function CreateStrategyModal({ onClose, onSuccess }: CreateStrategyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    marketType: 'mixed',
    preferredSessions: [] as string[],
    riskPhilosophy: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Strategy name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/strategies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          marketType: formData.marketType,
          preferredSessions: formData.preferredSessions.length > 0 ? formData.preferredSessions : undefined,
          riskPhilosophy: formData.riskPhilosophy.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create strategy');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating strategy:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create strategy');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSession = (session: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSessions: prev.preferredSessions.includes(session)
        ? prev.preferredSessions.filter(s => s !== session)
        : [...prev.preferredSessions, session],
    }));
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Strategy
          </h2>
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
              Strategy Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., London Breakout Strategy"
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={3}
              placeholder="Describe your strategy approach and methodology..."
            />
          </div>

          {/* Market Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Market Type
            </label>
            <div className="flex gap-3">
              {MARKET_TYPES.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="marketType"
                    value={type}
                    checked={formData.marketType === type}
                    onChange={(e) => setFormData(prev => ({ ...prev, marketType: e.target.value }))}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                    formData.marketType === type
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-purple-400'
                  }`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Sessions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Preferred Trading Sessions
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SESSIONS.map((session) => (
                <label key={session} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferredSessions.includes(session)}
                    onChange={() => toggleSession(session)}
                    className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{session}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Risk Philosophy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Risk Philosophy
            </label>
            <textarea
              value={formData.riskPhilosophy}
              onChange={(e) => setFormData(prev => ({ ...prev, riskPhilosophy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={3}
              placeholder="Describe your risk management approach..."
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
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <FiSave className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Strategy'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}