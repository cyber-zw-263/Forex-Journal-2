'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiTarget, FiTrendingUp, FiShield, FiHeart } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';
import toast from 'react-hot-toast';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  required: boolean;
  category: 'setup' | 'risk' | 'emotional' | 'market';
}

interface PreTradeChecklistProps {
  tradeId?: string;
  onChecklistComplete?: (completedItems: string[]) => void;
  onChecklistChange?: (completedItems: string[], isComplete: boolean) => void;
  className?: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'htf_bias',
    label: 'Higher Timeframe Bias',
    description: 'Market bias on higher timeframe aligns with trade direction',
    icon: FiTrendingUp,
    required: true,
    category: 'market'
  },
  {
    id: 'poi_identified',
    label: 'Points of Interest',
    description: 'Key levels, support/resistance, and POI identified',
    icon: FiTarget,
    required: true,
    category: 'setup'
  },
  {
    id: 'entry_rules',
    label: 'Entry Rules Met',
    description: 'All strategy entry criteria satisfied',
    icon: FiCheck,
    required: true,
    category: 'setup'
  },
  {
    id: 'session_respect',
    label: 'Session Respect',
    description: 'Trading within appropriate session time',
    icon: FiTarget,
    required: false,
    category: 'market'
  },
  {
    id: 'risk_rules',
    label: 'Risk Rules',
    description: 'Position size and risk limits respected',
    icon: FiShield,
    required: true,
    category: 'risk'
  },
  {
    id: 'emotional_state',
    label: 'Emotional State',
    description: 'Calm, focused, and disciplined mindset',
    icon: FiHeart,
    required: true,
    category: 'emotional'
  }
];

const categoryColors = {
  setup: 'bg-blue-500',
  risk: 'bg-red-500',
  emotional: 'bg-purple-500',
  market: 'bg-green-500'
};

const categoryLabels = {
  setup: 'Setup',
  risk: 'Risk',
  emotional: 'Emotional',
  market: 'Market'
};

export default function PreTradeChecklist({
  tradeId,
  onChecklistComplete,
  onChecklistChange,
  className = ''
}: PreTradeChecklistProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [savedState, setSavedState] = useState<Set<string>>(new Set());

  // Load saved checklist state if tradeId provided
  useEffect(() => {
    if (tradeId) {
      loadChecklistState();
    }
  }, [tradeId]);

  const loadChecklistState = async () => {
    if (!tradeId) return;

    try {
      const response = await fetch(`/api/trades/${tradeId}/checklist`, {
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const completedItems = Array.isArray(data.completedItems) ? data.completedItems : [];
        const saved = new Set(completedItems.filter((item: any) => typeof item === 'string') as string[]);
        setCompletedItems(saved);
        setSavedState(saved);
      }
    } catch (error) {
      console.error('Failed to load checklist state:', error);
    }
  };

  const saveChecklistState = async (items: Set<string>) => {
    if (!tradeId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}/checklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          completedItems: Array.from(items)
        }),
      });

      if (response.ok) {
        setSavedState(new Set(items));
        toast.success('Checklist saved');
      } else {
        toast.error('Failed to save checklist');
      }
    } catch (error) {
      console.error('Failed to save checklist:', error);
      toast.error('Failed to save checklist');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }

    setCompletedItems(newCompleted);

    // Auto-save if tradeId provided
    if (tradeId) {
      saveChecklistState(newCompleted);
    }

    // Notify parent components
    const requiredItems = checklistItems.filter(item => item.required).map(item => item.id);
    const isComplete = requiredItems.every(id => newCompleted.has(id));

    onChecklistChange?.(Array.from(newCompleted), isComplete);

    if (isComplete && !completedItems.has(itemId)) {
      onChecklistComplete?.(Array.from(newCompleted));
    }
  };

  const requiredItems = checklistItems.filter(item => item.required);
  const isComplete = requiredItems.every(item => completedItems.has(item.id));
  const completionPercentage = Math.round((completedItems.size / checklistItems.length) * 100);

  const itemsByCategory = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <AnimatedCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pre-Trade Checklist
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Complete all required items before entering the trade
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {completionPercentage}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Complete
            </div>
          </div>
          {isComplete ? (
            <FiCheck className="w-8 h-8 text-green-500" />
          ) : (
            <FiAlertCircle className="w-8 h-8 text-yellow-500" />
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category}>
            <div className="flex items-center mb-3">
              <div className={`w-3 h-3 rounded-full ${categoryColors[category as keyof typeof categoryColors]} mr-2`} />
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h4>
            </div>

            <div className="space-y-3 ml-5">
              {items.map((item) => {
                const Icon = item.icon;
                const isCompleted = completedItems.has(item.id);
                const isRequired = item.required;

                return (
                  <motion.div
                    key={item.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      isCompleted
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => toggleItem(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {isCompleted ? (
                        <FiCheck className="w-4 h-4" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${
                          isCompleted ? 'text-green-800 dark:text-green-200' : 'text-gray-900 dark:text-white'
                        }`}>
                          {item.label}
                          {isRequired && <span className="text-red-500 ml-1">*</span>}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${
                        isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Status */}
      <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isComplete ? (
              <>
                <FiCheck className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  All required items completed!
                </span>
              </>
            ) : (
              <>
                <FiAlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  {requiredItems.length - requiredItems.filter(item => completedItems.has(item.id)).length} required items remaining
                </span>
              </>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-xs text-gray-500">Saving...</span>
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}