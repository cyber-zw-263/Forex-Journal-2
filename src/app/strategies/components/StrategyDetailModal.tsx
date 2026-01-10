'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiTarget, FiSettings, FiBookOpen, FiPlus, FiEdit3, FiTrash2 } from 'react-icons/fi';
import Modal from '@/components/Modal';
import EntryModelsTab from './EntryModelsTab';
import SequencesTab from './SequencesTab';
import RulesTab from './RulesTab';
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

interface StrategyDetailModalProps {
  strategy: Strategy;
  onClose: () => void;
  onUpdate: () => void;
}

const MARKET_TYPES = ['bull', 'bear', 'mixed'];
const SESSIONS = ['London', 'New York', 'Tokyo', 'Sydney', 'Asian', 'European', 'American'];

const tabs = [
  { id: 'overview', label: 'Overview', icon: FiTarget },
  { id: 'entry-models', label: 'Entry Models', icon: FiTarget },
  { id: 'sequences', label: 'Sequences', icon: FiSettings },
  { id: 'rules', label: 'Rules', icon: FiBookOpen },
];

export default function StrategyDetailModal({ strategy: initialStrategy, onClose, onUpdate }: StrategyDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [strategy, setStrategy] = useState(initialStrategy);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: initialStrategy.name,
    description: initialStrategy.description || '',
    marketType: initialStrategy.marketType,
    preferredSessions: initialStrategy.preferredSessions || [],
    riskPhilosophy: initialStrategy.riskPhilosophy || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategy.id}`, {
        method: 'PATCH',
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
        throw new Error(error.error || 'Failed to update strategy');
      }

      const updatedStrategy = await response.json();
      setStrategy(updatedStrategy);
      setIsEditing(false);
      onUpdate();
      toast.success('Strategy updated successfully');
    } catch (error) {
      console.error('Error updating strategy:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update strategy');
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

  const handleStrategyUpdate = (updatedStrategy: Strategy) => {
    setStrategy(updatedStrategy);
    onUpdate();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <FiTarget className="w-6 h-6 text-white" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 outline-none text-gray-900 dark:text-white"
                  autoFocus
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {strategy.name}
                </h2>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created {new Date(strategy.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: strategy.name,
                      description: strategy.description || '',
                      marketType: strategy.marketType,
                      preferredSessions: strategy.preferredSessions || [],
                      riskPhilosophy: strategy.riskPhilosophy || '',
                    });
                  }}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all duration-200"
                >
                  <FiSave className="w-4 h-4" />
                  {isSubmitting ? 'Saving...' : 'Save'}
                </motion.button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiEdit3 className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-6"
              >
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        {strategy.description || 'No description provided'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Market Type
                    </label>
                    {isEditing ? (
                      <div className="flex gap-2">
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
                            <span className={`px-3 py-1 rounded-lg border cursor-pointer transition-all text-sm ${
                              formData.marketType === type
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-purple-400'
                            }`}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        strategy.marketType === 'bull' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        strategy.marketType === 'bear' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {strategy.marketType.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Preferred Sessions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preferred Trading Sessions
                  </label>
                  {isEditing ? (
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
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {strategy.preferredSessions && strategy.preferredSessions.length > 0 ? (
                        strategy.preferredSessions.map((session) => (
                          <span
                            key={session}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-lg"
                          >
                            {session}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">No preferred sessions set</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Risk Philosophy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Risk Philosophy
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.riskPhilosophy}
                      onChange={(e) => setFormData(prev => ({ ...prev, riskPhilosophy: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {strategy.riskPhilosophy || 'No risk philosophy defined'}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {strategy.entryModels.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Entry Models</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {strategy.timeframeSequences.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sequences</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                      {strategy.rules.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rules</div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'entry-models' && (
              <motion.div
                key="entry-models"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <EntryModelsTab strategyId={strategy.id} onUpdate={handleStrategyUpdate} />
              </motion.div>
            )}

            {activeTab === 'sequences' && (
              <motion.div
                key="sequences"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <SequencesTab strategyId={strategy.id} onUpdate={handleStrategyUpdate} />
              </motion.div>
            )}

            {activeTab === 'rules' && (
              <motion.div
                key="rules"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <RulesTab strategyId={strategy.id} onUpdate={handleStrategyUpdate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Modal>
  );
}