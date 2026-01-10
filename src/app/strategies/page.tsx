'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSettings, FiTarget, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import StrategyCard from '@/components/StrategyCard';
import CreateStrategyModal from '@/components/CreateStrategyModal';
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

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchStrategies = async () => {
    try {
      const response = await fetch('/api/strategies');
      if (!response.ok) throw new Error('Failed to fetch strategies');
      const data = await response.json();
      setStrategies(data);
    } catch (error) {
      console.error('Error fetching strategies:', error);
      toast.error('Failed to load strategies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  const handleStrategyCreated = () => {
    setShowCreateModal(false);
    fetchStrategies();
    toast.success('Strategy created successfully');
  };

  const handleStrategyDeleted = (strategyId: string) => {
    setStrategies(prev => prev.filter(s => s.id !== strategyId));
    toast.success('Strategy deleted successfully');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trading Strategies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your trading strategies, entry models, and rules
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
        >
          <FiPlus className="w-4 h-4" />
          New Strategy
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FiTarget className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Strategies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{strategies.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Models</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {strategies.reduce((sum, s) => sum + s.entryModels.length, 0)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FiSettings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sequences</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {strategies.reduce((sum, s) => sum + s.timeframeSequences.length, 0)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <FiBookOpen className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rules</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {strategies.reduce((sum, s) => sum + s.rules.length, 0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Strategies Grid */}
      {strategies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiTarget className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No strategies yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first trading strategy to get started with structured trading.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
          >
            Create Your First Strategy
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StrategyCard
                strategy={strategy}
                onDelete={handleStrategyDeleted}
                onUpdate={fetchStrategies}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Create Strategy Modal */}
      {showCreateModal && (
        <CreateStrategyModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleStrategyCreated}
        />
      )}
    </div>
  );
}