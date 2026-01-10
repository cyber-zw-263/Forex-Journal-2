'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiBarChart, FiTarget, FiZap, FiFilter, FiDownload, FiAlertCircle } from 'react-icons/fi';
import DashboardHeader from '@/components/DashboardHeader';
import AnimatedCard from '@/components/AnimatedCard';
import AnalyticsCharts from '@/components/AnalyticsChartsV2';
import YearlyHeatmap from '@/components/YearlyHeatmap';
import MonthlyPerformanceTable from '@/components/MonthlyPerformanceTable';
import StrategyComparison from '@/components/StrategyComparison';
import BehavioralAnalysis from '@/components/BehavioralAnalysis';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number;
  profitLoss?: number;
  outcome?: string;
  entryTime: string;
  strategyId?: string;
  emotionalState?: string;
  session?: string;
  [key: string]: any;
}

interface Strategy {
  id: string;
  name: string;
  description?: string;
  marketType?: string;
  preferredSessions?: string[];
  [key: string]: any;
}

interface JournalEntry {
  id: string;
  date: string;
  mentalState?: string;
  focus?: string;
  confidence?: number;
  phase?: string;
  [key: string]: any;
}

export default function AnalyticsPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [activeTab, setActiveTab] = useState<'overview' | 'strategies' | 'behavioral' | 'performance'>('overview');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });
  const [filters, setFilters] = useState({
    strategyId: '',
    pair: '',
    session: '',
    emotionalState: ''
  });

  useEffect(() => {
    if (!mounted) return;
    loadData();
  }, [mounted]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load trades
      const tradesResponse = await fetch('/api/trades', {
        headers: { 'x-user-id': 'demo-user' },
      });

      if (!tradesResponse.ok) {
        throw new Error('Failed to load trades');
      }

      const tradesData = await tradesResponse.json();
      setTrades(Array.isArray(tradesData) ? tradesData : []);

      // Load strategies
      const strategiesResponse = await fetch('/api/strategies', {
        headers: { 'x-user-id': 'demo-user' },
      });

      if (strategiesResponse.ok) {
        const strategiesData = await strategiesResponse.json();
        setStrategies(Array.isArray(strategiesData) ? strategiesData : []);
      }

      // Load journal entries
      const journalResponse = await fetch('/api/journal', {
        headers: { 'x-user-id': 'demo-user' },
      });

      if (journalResponse.ok) {
        const journalData = await journalResponse.json();
        setJournalEntries(Array.isArray(journalData) ? journalData : []);
      }

    } catch (error) {
      console.error('Error loading analytics data:', error);
      setError('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTrades = trades.filter(trade => {
    if (filters.strategyId && trade.strategyId !== filters.strategyId) return false;
    if (filters.pair && trade.pair !== filters.pair) return false;
    if (filters.session && trade.session !== filters.session) return false;
    if (filters.emotionalState && trade.emotionalState !== filters.emotionalState) return false;
    return true;
  });

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: FiBarChart },
    { id: 'performance' as const, label: 'Performance', icon: FiTrendingUp },
    { id: 'strategies' as const, label: 'Strategies', icon: FiTarget },
    { id: 'behavioral' as const, label: 'Behavioral', icon: FiZap }
  ];

  const exportData = () => {
    const data = {
      trades: filteredTrades,
      strategies,
      journalEntries,
      filters,
      dateRange,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Analytics data exported');
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader onThemeToggle={toggleTheme} currentTheme={theme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Comprehensive trading performance, strategy analysis, and behavioral insights
              </p>
            </div>
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <AnimatedCard className="p-1 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Filters */}
        <AnimatedCard className="p-4 mb-6">
          <div className="flex items-center space-x-4">
            <FiFilter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>

            <select
              value={filters.strategyId}
              onChange={(e) => setFilters(prev => ({ ...prev, strategyId: e.target.value }))}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Strategies</option>
              {strategies.map(strategy => (
                <option key={strategy.id} value={strategy.id}>{strategy.name}</option>
              ))}
            </select>

            <select
              value={filters.pair}
              onChange={(e) => setFilters(prev => ({ ...prev, pair: e.target.value }))}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Pairs</option>
              {[...new Set(trades.map(t => t.pair))].map(pair => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
            </select>

            <select
              value={filters.session}
              onChange={(e) => setFilters(prev => ({ ...prev, session: e.target.value }))}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Sessions</option>
              {[...new Set(trades.map(t => t.session).filter(Boolean))].map(session => (
                <option key={session} value={session}>{session}</option>
              ))}
            </select>

            <select
              value={filters.emotionalState}
              onChange={(e) => setFilters(prev => ({ ...prev, emotionalState: e.target.value }))}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">All Emotions</option>
              {[...new Set(trades.map(t => t.emotionalState).filter(Boolean))].map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </AnimatedCard>

        {/* Error State */}
        {error && (
          <AnimatedCard className="p-4 mb-6 border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
              <FiTrendingDown className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </AnimatedCard>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading analytics...</span>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <PerformanceMetrics trades={filteredTrades} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AnimatedCard className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Performance Charts
                    </h3>
                    <AnalyticsCharts
                      trades={filteredTrades}
                      startDate={dateRange.start}
                      endDate={dateRange.end}
                    />
                  </AnimatedCard>

                  <AnimatedCard className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Trading Heatmap
                    </h3>
                    <YearlyHeatmap
                      trades={filteredTrades}
                      onSelectRange={(r) => setDateRange(r)}
                    />
                  </AnimatedCard>
                </div>

                <AnimatedCard className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Monthly Performance
                  </h3>
                  <MonthlyPerformanceTable trades={filteredTrades} />
                </AnimatedCard>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <PerformanceMetrics trades={filteredTrades} detailed />
            )}

            {/* Strategies Tab */}
            {activeTab === 'strategies' && (
              <StrategyComparison
                trades={filteredTrades}
                strategies={strategies}
              />
            )}

            {/* Behavioral Tab */}
            {activeTab === 'behavioral' && (
              <BehavioralAnalysis
                trades={filteredTrades}
                journalEntries={journalEntries}
              />
            )}
          </>
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
