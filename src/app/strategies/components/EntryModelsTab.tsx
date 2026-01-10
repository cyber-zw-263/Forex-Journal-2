'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit3, FiTrash2, FiTarget, FiTrendingUp, FiShield } from 'react-icons/fi';
import CreateEntryModelModal from './CreateEntryModelModal';
import toast from 'react-hot-toast';

interface EntryModel {
  id: string;
  name: string;
  entryLogic: string;
  confirmationStyle: string;
  riskStyle: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface EntryModelsTabProps {
  strategyId: string;
  onUpdate: (updatedStrategy: any) => void;
}

export default function EntryModelsTab({ strategyId, onUpdate }: EntryModelsTabProps) {
  const [entryModels, setEntryModels] = useState<EntryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEntryModels = async () => {
    try {
      const response = await fetch(`/api/strategies/${strategyId}/entry-models`);
      if (!response.ok) throw new Error('Failed to fetch entry models');
      const data = await response.json();
      setEntryModels(data);
    } catch (error) {
      console.error('Error fetching entry models:', error);
      toast.error('Failed to load entry models');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntryModels();
  }, [strategyId]);

  const handleDelete = async (modelId: string) => {
    if (!confirm('Are you sure you want to delete this entry model?')) {
      return;
    }

    try {
      const response = await fetch(`/api/strategies/${strategyId}/entry-models/${modelId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete entry model');

      setEntryModels(prev => prev.filter(m => m.id !== modelId));
      toast.success('Entry model deleted successfully');
    } catch (error) {
      console.error('Error deleting entry model:', error);
      toast.error('Failed to delete entry model');
    }
  };

  const handleModelCreated = () => {
    setShowCreateModal(false);
    fetchEntryModels();
    toast.success('Entry model created successfully');
  };

  const getConfirmationStyleColor = (style: string) => {
    switch (style.toLowerCase()) {
      case 'conservative': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'aggressive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getRiskStyleColor = (style: string) => {
    switch (style.toLowerCase()) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'medium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
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
            Entry Models
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Define how you enter trades within this strategy
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
        >
          <FiPlus className="w-4 h-4" />
          Add Model
        </motion.button>
      </div>

      {/* Entry Models List */}
      {entryModels.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiTarget className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No entry models yet
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first entry model to define how you enter trades.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
          >
            Create First Model
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {entryModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {model.name}
                    </h4>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfirmationStyleColor(model.confirmationStyle)}`}>
                        {model.confirmationStyle}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskStyleColor(model.riskStyle)}`}>
                        {model.riskStyle} Risk
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Entry Logic
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      {model.entryLogic}
                    </p>
                  </div>

                  {model.notes && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {model.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => {/* TODO: Implement edit */}}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit model"
                  >
                    <FiEdit3 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(model.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete model"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span>Created {new Date(model.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FiShield className="w-3 h-3" />
                    <span>{model.confirmationStyle}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiTrendingUp className="w-3 h-3" />
                    <span>{model.riskStyle}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateEntryModelModal
          strategyId={strategyId}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleModelCreated}
        />
      )}
    </div>
  );
}