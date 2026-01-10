'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit3, FiTrash2, FiTarget, FiSettings, FiBookOpen, FiTrendingUp, FiMoreVertical } from 'react-icons/fi';
import StrategyDetailModal from '@/app/strategies/components/StrategyDetailModal';
import toast from 'react-hot-toast';

interface Strategy {
  id: string;
  name: string;
  description?: string;
  marketType: string;
  preferredSessions?: string[];
  riskPhilosophy?: string;
  entryModels: any[];
  timeframeSequences: any[];
  rules: any[];
  createdAt: string;
  updatedAt: string;
}

interface StrategyCardProps {
  strategy: Strategy;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export default function StrategyCard({ strategy, onDelete, onUpdate }: StrategyCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this strategy? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/strategies/${strategy.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete strategy');

      onDelete(strategy.id);
    } catch (error) {
      console.error('Error deleting strategy:', error);
      toast.error('Failed to delete strategy');
    }
  };

  const getMarketTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bull': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'bear': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'mixed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        onClick={() => setShowDetailModal(true)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {strategy.name}
            </h3>
            {strategy.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {strategy.description}
              </p>
            )}
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiMoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-8 w-32 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-10"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetailModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg flex items-center gap-2"
                >
                  <FiEdit3 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg flex items-center gap-2"
                >
                  <FiTrash2 className="w-3 h-3" />
                  Delete
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Market Type Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMarketTypeColor(strategy.marketType)}`}>
            {strategy.marketType.toUpperCase()}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-1">
              <FiTarget className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Models</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {strategy.entryModels.length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg mx-auto mb-1">
              <FiSettings className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Sequences</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {strategy.timeframeSequences.length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg mx-auto mb-1">
              <FiBookOpen className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Rules</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {strategy.rules.length}
            </p>
          </div>
        </div>

        {/* Preferred Sessions */}
        {strategy.preferredSessions && strategy.preferredSessions.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Preferred Sessions:</p>
            <div className="flex flex-wrap gap-1">
              {strategy.preferredSessions.map((session) => (
                <span
                  key={session}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded"
                >
                  {session}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Created {new Date(strategy.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center gap-1">
            <FiTrendingUp className="w-3 h-3" />
            <span>Active</span>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      {showDetailModal && (
        <StrategyDetailModal
          strategy={strategy}
          onClose={() => setShowDetailModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}