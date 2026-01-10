'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiBookOpen } from 'react-icons/fi';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

interface CreateRuleModalProps {
  strategyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = ['entry', 'exit', 'risk', 'discipline'];
const SEVERITIES = ['low', 'medium', 'high', 'critical'];

export default function CreateRuleModal({ strategyId, onClose, onSuccess }: CreateRuleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'entry',
    severity: 'medium',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Name and description are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategyId}/rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          severity: formData.severity,
          isActive: formData.isActive,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create rule');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating rule:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create rule');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'entry': return 'Rules for when and how to enter trades';
      case 'exit': return 'Rules for when and how to exit trades';
      case 'risk': return 'Rules for position sizing and risk management';
      case 'discipline': return 'Rules for maintaining trading discipline';
      default: return '';
    }
  };

  const getSeverityDescription = (severity: string) => {
    switch (severity) {
      case 'low': return 'Minor rule, occasional violations acceptable';
      case 'medium': return 'Important rule, violations should be rare';
      case 'high': return 'Critical rule, strict adherence required';
      case 'critical': return 'Essential rule, never break under any circumstances';
      default: return '';
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
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <FiBookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Strategy Rule
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
              Rule Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Never risk more than 2% per trade"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rule Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={4}
              placeholder="Describe the rule in detail and explain why it's important..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Be specific about what the rule requires and the consequences of breaking it.
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="sr-only"
                  />
                  <span className={`flex-1 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    formData.category === category
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-red-400'
                  }`}>
                    <div className="font-medium capitalize">{category}</div>
                    <div className="text-xs opacity-80 mt-1">
                      {getCategoryDescription(category)}
                    </div>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Severity Level
            </label>
            <div className="space-y-2">
              {SEVERITIES.map((severity) => (
                <label key={severity} className="flex items-center">
                  <input
                    type="radio"
                    name="severity"
                    value={severity}
                    checked={formData.severity === severity}
                    onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                    className="sr-only"
                  />
                  <span className={`flex-1 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    formData.severity === severity
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-red-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium capitalize">{severity}</div>
                        <div className="text-xs opacity-80 mt-1">
                          {getSeverityDescription(severity)}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        severity === 'critical' ? 'bg-red-400' :
                        severity === 'high' ? 'bg-orange-400' :
                        severity === 'medium' ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`} />
                    </div>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-gray-300 dark:border-gray-600 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Rule is active and should be enforced
              </span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
              Inactive rules are kept for reference but won't trigger violations.
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
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <FiSave className="w-4 h-4" />
              {isSubmitting ? 'Creating...' : 'Create Rule'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}