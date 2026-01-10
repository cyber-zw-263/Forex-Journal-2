'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiSmile, FiMeh, FiFrown, FiTarget, FiZap, FiTrendingUp } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';
import toast from 'react-hot-toast';

interface JournalEntry {
  id: string;
  date: string;
  mentalState?: string;
  focus?: string;
  confidence?: number;
  externalStressors?: string[];
  phase?: string;
  phaseNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface JournalEntryFormProps {
  date: string;
  existingEntry?: JournalEntry | null;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  date,
  existingEntry,
  onSave,
  onCancel
}) => {
  const [mentalState, setMentalState] = useState(existingEntry?.mentalState || '');
  const [focus, setFocus] = useState(existingEntry?.focus || '');
  const [confidence, setConfidence] = useState(existingEntry?.confidence || 5);
  const [externalStressors, setExternalStressors] = useState<string[]>(existingEntry?.externalStressors || []);
  const [phase, setPhase] = useState(existingEntry?.phase || '');
  const [phaseNotes, setPhaseNotes] = useState(existingEntry?.phaseNotes || '');
  const [isSaving, setIsSaving] = useState(false);

  const mentalStates = [
    { value: 'excellent', label: 'Excellent', icon: FiSmile, color: 'text-green-500' },
    { value: 'good', label: 'Good', icon: FiSmile, color: 'text-green-400' },
    { value: 'okay', label: 'Okay', icon: FiMeh, color: 'text-yellow-500' },
    { value: 'poor', label: 'Poor', icon: FiFrown, color: 'text-orange-500' },
    { value: 'terrible', label: 'Terrible', icon: FiFrown, color: 'text-red-500' }
  ];

  const focusLevels = [
    { value: 'high', label: 'High Focus', icon: FiTarget, color: 'text-green-500' },
    { value: 'medium', label: 'Medium Focus', icon: FiTarget, color: 'text-yellow-500' },
    { value: 'low', label: 'Low Focus', icon: FiTarget, color: 'text-red-500' }
  ];

  const tradingPhases = [
    {
      value: 'learning',
      label: 'Learning Phase',
      description: 'Building foundational knowledge and skills',
      template: 'Today I focused on learning...\n\nKey lessons learned:\n- \n- \n\nChallenges faced:\n- \n- \n\nTomorrow\'s learning goals:\n- \n- '
    },
    {
      value: 'discipline',
      label: 'Discipline Phase',
      description: 'Developing consistent trading habits and rules',
      template: 'Today\'s discipline focus:\n\nRules followed:\n- \n- \n\nRules broken:\n- \n- \n\nWhy I broke them:\n\nHow to prevent this:\n- \n- '
    },
    {
      value: 'consistency',
      label: 'Consistency Phase',
      description: 'Maintaining steady performance and routines',
      template: 'Consistency check:\n\nDaily routine adherence:\n- Morning prep: \n- Trading hours: \n- Review time: \n\nPerformance consistency:\n- Win rate: \n- Risk management: \n\nAreas for improvement:\n- \n- '
    },
    {
      value: 'optimization',
      label: 'Optimization Phase',
      description: 'Refining strategies and maximizing performance',
      template: 'Optimization focus:\n\nStrategy testing:\n- What I tested: \n- Results: \n- Insights: \n\nPerformance metrics:\n- Profit factor: \n- Win rate: \n- Average R:R: \n\nNext optimization steps:\n- \n- '
    }
  ];

  const commonStressors = [
    'Work stress', 'Family issues', 'Health concerns', 'Market volatility',
    'Financial pressure', 'Sleep deprivation', 'Personal problems', 'Time pressure'
  ];

  const handleStressorToggle = (stressor: string) => {
    setExternalStressors(prev =>
      prev.includes(stressor)
        ? prev.filter(s => s !== stressor)
        : [...prev, stressor]
    );
  };

  const handleSave = async () => {
    if (!mentalState || !phase) {
      toast.error('Please fill in mental state and trading phase');
      return;
    }

    setIsSaving(true);
    try {
      const entryData = {
        date,
        mentalState,
        focus,
        confidence,
        externalStressors,
        phase,
        phaseNotes
      };

      const url = existingEntry ? `/api/journal/${existingEntry.id}` : '/api/journal';
      const method = existingEntry ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        throw new Error('Failed to save journal entry');
      }

      const savedEntry = await response.json();
      onSave(savedEntry);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save journal entry');
    } finally {
      setIsSaving(false);
    }
  };

  const applyTemplate = (selectedPhase: string) => {
    const phaseData = tradingPhases.find(p => p.value === selectedPhase);
    if (phaseData && !phaseNotes) {
      setPhaseNotes(phaseData.template);
    }
  };

  return (
    <AnimatedCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {existingEntry ? 'Edit' : 'Create'} Journal Entry
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="space-y-6">
        {/* Mental State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            How are you feeling today?
          </label>
          <div className="grid grid-cols-5 gap-2">
            {mentalStates.map((state) => {
              const Icon = state.icon;
              return (
                <button
                  key={state.value}
                  onClick={() => setMentalState(state.value)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                    mentalState === state.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${state.color}`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {state.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Focus Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Focus Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {focusLevels.map((level) => {
              const Icon = level.icon;
              return (
                <button
                  key={level.value}
                  onClick={() => setFocus(level.value)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                    focus === level.value
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${level.color}`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confidence Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Confidence Level (1-10)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="10"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center space-x-2">
              <FiTrendingUp className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[2rem]">
                {confidence}
              </span>
            </div>
          </div>
        </div>

        {/* External Stressors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            External Stressors (select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commonStressors.map((stressor) => (
              <button
                key={stressor}
                onClick={() => handleStressorToggle(stressor)}
                className={`p-2 text-left rounded-lg border transition-all ${
                  externalStressors.includes(stressor)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {stressor}
              </button>
            ))}
          </div>
        </div>

        {/* Trading Phase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Current Trading Phase
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tradingPhases.map((phaseOption) => (
              <button
                key={phaseOption.value}
                onClick={() => {
                  setPhase(phaseOption.value);
                  applyTemplate(phaseOption.value);
                }}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  phase === phaseOption.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  {phaseOption.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {phaseOption.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Phase Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Phase Notes & Reflections
          </label>
          <textarea
            value={phaseNotes}
            onChange={(e) => setPhaseNotes(e.target.value)}
            placeholder="Write your thoughts, reflections, and notes about your trading day..."
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <FiSave className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Entry'}</span>
          </button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default JournalEntryForm;