'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiSave, FiTarget, FiHeart, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';
import toast from 'react-hot-toast';

interface PostTradeReflectionProps {
  tradeId: string;
  onReflectionComplete?: (reflection: any) => void;
  className?: string;
}

const executionQualityOptions = [
  { value: 'yes', label: 'Yes', description: 'Fully followed the plan' },
  { value: 'mostly', label: 'Mostly', description: 'Minor deviations only' },
  { value: 'no', label: 'No', description: 'Significant deviations' }
];

const emotionalStates = [
  { value: 'calm', label: 'Calm', color: 'bg-green-100 text-green-800' },
  { value: 'confident', label: 'Confident', color: 'bg-blue-100 text-blue-800' },
  { value: 'anxious', label: 'Anxious', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'hesitant', label: 'Hesitant', color: 'bg-orange-100 text-orange-800' },
  { value: 'overconfident', label: 'Overconfident', color: 'bg-purple-100 text-purple-800' },
  { value: 'fearful', label: 'Fearful', color: 'bg-red-100 text-red-800' },
  { value: 'impulsive', label: 'Impulsive', color: 'bg-pink-100 text-pink-800' },
  { value: 'detached', label: 'Detached', color: 'bg-gray-100 text-gray-800' }
];

const behavioralOutcomes = [
  { value: 'disciplined', label: 'Disciplined', description: 'Followed all rules' },
  { value: 'patient', label: 'Patient', description: 'Waited for proper setup' },
  { value: 'focused', label: 'Focused', description: 'Maintained attention' },
  { value: 'impulsive', label: 'Impulsive', description: 'Acted without thinking' },
  { value: 'fearful', label: 'Fearful', description: 'Avoided necessary actions' },
  { value: 'greedy', label: 'Greedy', description: 'Took excessive risk' },
  { value: 'distracted', label: 'Distracted', description: 'Lost focus' },
  { value: 'overconfident', label: 'Overconfident', description: 'Took unnecessary risks' }
];

export default function PostTradeReflection({
  tradeId,
  onReflectionComplete,
  className = ''
}: PostTradeReflectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reflection, setReflection] = useState({
    followedPlan: '',
    rulesRespected: '',
    emotionalSummary: [] as string[],
    behavioralOutcomes: [] as string[],
    whatWentRight: '',
    whatWentWrong: '',
    lessonLearned: '',
    ruleToReinforce: ''
  });

  useEffect(() => {
    loadExistingReflection();
  }, [tradeId]);

  const loadExistingReflection = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/trades/${tradeId}/reflection`, {
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReflection({
          followedPlan: data.followedPlan || '',
          rulesRespected: data.rulesRespected || '',
          emotionalSummary: data.emotionalSummary ? JSON.parse(data.emotionalSummary) : [],
          behavioralOutcomes: data.behavioralOutcomes ? JSON.parse(data.behavioralOutcomes) : [],
          whatWentRight: data.whatWentRight || '',
          whatWentWrong: data.whatWentWrong || '',
          lessonLearned: data.lessonLearned || '',
          ruleToReinforce: data.ruleToReinforce || ''
        });
      }
    } catch (error) {
      console.error('Failed to load reflection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!reflection.followedPlan || !reflection.rulesRespected) {
      toast.error('Please complete the execution quality assessment');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}/reflection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          followedPlan: reflection.followedPlan,
          rulesRespected: reflection.rulesRespected,
          emotionalSummary: reflection.emotionalSummary,
          behavioralOutcomes: reflection.behavioralOutcomes,
          whatWentRight: reflection.whatWentRight,
          whatWentWrong: reflection.whatWentWrong,
          lessonLearned: reflection.lessonLearned,
          ruleToReinforce: reflection.ruleToReinforce
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save reflection');
      }

      const savedReflection = await response.json();
      toast.success('Reflection saved successfully');

      onReflectionComplete?.(savedReflection);
    } catch (error) {
      console.error('Error saving reflection:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save reflection');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEmotionalState = (state: string) => {
    setReflection(prev => ({
      ...prev,
      emotionalSummary: prev.emotionalSummary.includes(state)
        ? prev.emotionalSummary.filter(s => s !== state)
        : [...prev.emotionalSummary, state]
    }));
  };

  const toggleBehavioralOutcome = (outcome: string) => {
    setReflection(prev => ({
      ...prev,
      behavioralOutcomes: prev.behavioralOutcomes.includes(outcome)
        ? prev.behavioralOutcomes.filter(o => o !== outcome)
        : [...prev.behavioralOutcomes, outcome]
    }));
  };

  if (isLoading) {
    return (
      <AnimatedCard className={`p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading reflection...</span>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard className={`p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
          <FiBookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Post-Trade Reflection
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Analyze what happened and learn from the experience
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Execution Quality Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Did you follow your trading plan?
            </label>
            <div className="space-y-2">
              {executionQualityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    reflection.followedPlan === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="followedPlan"
                    value={option.value}
                    checked={reflection.followedPlan === option.value}
                    onChange={(e) => setReflection(prev => ({ ...prev, followedPlan: e.target.value }))}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Did you respect your trading rules?
            </label>
            <div className="space-y-2">
              {executionQualityOptions.map((option) => (
                <label
                  key={`rules-${option.value}`}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    reflection.rulesRespected === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="rulesRespected"
                    value={option.value}
                    checked={reflection.rulesRespected === option.value}
                    onChange={(e) => setReflection(prev => ({ ...prev, rulesRespected: e.target.value }))}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Emotional Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            How did you feel during and after the trade?
          </label>
          <div className="flex flex-wrap gap-2">
            {emotionalStates.map((state) => (
              <button
                key={state.value}
                type="button"
                onClick={() => toggleEmotionalState(state.value)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  reflection.emotionalSummary.includes(state.value)
                    ? state.color + ' ring-2 ring-offset-2 ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>

        {/* Behavioral Outcomes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            How did you behave during this trade?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {behavioralOutcomes.map((outcome) => (
              <label
                key={outcome.value}
                className={`flex items-start space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                  reflection.behavioralOutcomes.includes(outcome.value)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={reflection.behavioralOutcomes.includes(outcome.value)}
                  onChange={() => toggleBehavioralOutcome(outcome.value)}
                  className="mt-0.5"
                />
                <div className="text-xs">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {outcome.label}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {outcome.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* What Went Right/Wrong */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What went right?
            </label>
            <textarea
              value={reflection.whatWentRight}
              onChange={(e) => setReflection(prev => ({ ...prev, whatWentRight: e.target.value }))}
              placeholder="What did you do well in this trade?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What went wrong?
            </label>
            <textarea
              value={reflection.whatWentWrong}
              onChange={(e) => setReflection(prev => ({ ...prev, whatWentWrong: e.target.value }))}
              placeholder="What could you have done better?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key lesson learned
            </label>
            <textarea
              value={reflection.lessonLearned}
              onChange={(e) => setReflection(prev => ({ ...prev, lessonLearned: e.target.value }))}
              placeholder="What's the most important takeaway from this trade?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rule to reinforce
            </label>
            <textarea
              value={reflection.ruleToReinforce}
              onChange={(e) => setReflection(prev => ({ ...prev, ruleToReinforce: e.target.value }))}
              placeholder="Which trading rule should you focus on reinforcing?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4" />
                <span>Save Reflection</span>
              </>
            )}
          </button>
        </div>
      </form>
    </AnimatedCard>
  );
}