'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit3, FiTrash2, FiBookOpen, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import CreateRuleModal from './CreateRuleModal';
import toast from 'react-hot-toast';

interface StrategyRule {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RulesTabProps {
  strategyId: string;
  onUpdate: (updatedStrategy: any) => void;
}

export default function RulesTab({ strategyId, onUpdate }: RulesTabProps) {
  const [rules, setRules] = useState<StrategyRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchRules = async () => {
    try {
      const response = await fetch(`/api/strategies/${strategyId}/rules`);
      if (!response.ok) throw new Error('Failed to fetch rules');
      const data = await response.json();
      setRules(data);
    } catch (error) {
      console.error('Error fetching rules:', error);
      toast.error('Failed to load rules');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, [strategyId]);

  const handleDelete = async (ruleId: string) => {
    if (!confirm('Are you sure you want to delete this rule?')) {
      return;
    }

    try {
      const response = await fetch(`/api/strategies/${strategyId}/rules/${ruleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete rule');

      setRules(prev => prev.filter(r => r.id !== ruleId));
      toast.success('Rule deleted successfully');
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast.error('Failed to delete rule');
    }
  };

  const handleRuleCreated = () => {
    setShowCreateModal(false);
    fetchRules();
    toast.success('Rule created successfully');
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'entry': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'exit': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'risk': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'discipline': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
            Strategy Rules
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Define rules to maintain discipline and consistency in your trading
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg"
        >
          <FiPlus className="w-4 h-4" />
          Add Rule
        </motion.button>
      </div>

      {/* Rules List */}
      {rules.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No rules yet
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create rules to maintain discipline and consistency in your trading strategy.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg"
          >
            Create First Rule
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {rule.name}
                    </h4>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(rule.category)}`}>
                        {rule.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                        {rule.severity}
                      </span>
                      {rule.isActive ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                          <FiCheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 text-xs font-medium rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      {rule.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => {/* TODO: Implement edit */}}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit rule"
                  >
                    <FiEdit3 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(rule.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete rule"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span>Created {new Date(rule.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FiAlertTriangle className="w-3 h-3" />
                    <span>{rule.severity} priority</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiBookOpen className="w-3 h-3" />
                    <span>{rule.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateRuleModal
          strategyId={strategyId}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleRuleCreated}
        />
      )}
    </div>
  );
}