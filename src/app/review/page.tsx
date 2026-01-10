'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import DashboardHeader from '@/components/DashboardHeader';
import AnimatedCard from '@/components/AnimatedCard';
import PreTradeChecklist from '@/components/PreTradeChecklist';
import TradeUpdatesList from '@/components/TradeUpdatesList';
import PostTradeReflection from '@/components/PostTradeReflection';
import VoiceRecorder from '@/components/VoiceRecorder';
import ScreenshotUploader from '@/components/ScreenshotUploader';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number;
  entryTime: string;
  exitTime?: string;
  outcome?: string;
  profitLoss?: number;
  emotionalState?: string;
  strategy?: string;
  status: string;
}

export default function TradeReviewPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'checklist' | 'updates' | 'reflection' | 'media'>('checklist');

  useEffect(() => {
    if (!mounted) return;
    loadTrades();
  }, [mounted]);

  const loadTrades = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/trades', {
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load trades');
      }

      const data = await response.json();
      setTrades(data);
    } catch (error) {
      console.error('Error loading trades:', error);
      toast.error('Failed to load trades');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTrade = trades.find(t => t.id === selectedTradeId);

  const tabs = [
    { id: 'checklist' as const, label: 'Pre-Trade Checklist', icon: FiCheckCircle },
    { id: 'updates' as const, label: 'Trade Updates', icon: FiClock },
    { id: 'reflection' as const, label: 'Post-Trade Reflection', icon: FiBookOpen },
    { id: 'media' as const, label: 'Media & Notes', icon: FiTrendingUp }
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader onThemeToggle={toggleTheme} currentTheme={theme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trade Lifecycle Review
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Complete pre-trade preparation, track in-trade decisions, and reflect on outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Trades List Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedCard className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Trades
              </h2>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : trades.length > 0 ? (
                  trades.map((trade) => (
                    <button
                      key={trade.id}
                      onClick={() => setSelectedTradeId(trade.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedTradeId === trade.id
                          ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } border`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {trade.pair} {trade.direction}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(trade.entryTime).toLocaleDateString()}
                      </div>
                      <div className={`text-sm font-medium ${
                        trade.outcome === 'WIN' ? 'text-green-600' :
                        trade.outcome === 'LOSS' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {trade.outcome || 'Open'}
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No trades yet
                  </p>
                )}
              </div>
            </AnimatedCard>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedTrade ? (
              <div className="space-y-6">
                {/* Trade Summary Card */}
                <AnimatedCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedTrade.pair} - {selectedTrade.direction}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTrade.status === 'closed' ? 'bg-green-100 text-green-800' :
                      selectedTrade.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedTrade.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Entry Price</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedTrade.entryPrice.toFixed(5)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Exit Price</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedTrade.exitPrice?.toFixed(5) || 'Open'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">P&L</p>
                      <p className={`font-semibold ${
                        (selectedTrade.profitLoss || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedTrade.profitLoss?.toFixed(2) || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Outcome</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedTrade.outcome || 'Open'}
                      </p>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Tab Navigation */}
                <AnimatedCard className="p-1">
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

                {/* Tab Content */}
                <div className="min-h-96">
                  {activeTab === 'checklist' && (
                    <PreTradeChecklist
                      tradeId={selectedTrade.id}
                      onChecklistComplete={(completedItems) => {
                        toast.success('Pre-trade checklist completed!');
                      }}
                    />
                  )}

                  {activeTab === 'updates' && (
                    <TradeUpdatesList tradeId={selectedTrade.id} />
                  )}

                  {activeTab === 'reflection' && (
                    <PostTradeReflection
                      tradeId={selectedTrade.id}
                      onReflectionComplete={(reflection) => {
                        toast.success('Post-trade reflection saved!');
                      }}
                    />
                  )}

                  {activeTab === 'media' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedCard className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Voice Notes
                        </h3>
                        <VoiceRecorder />
                      </AnimatedCard>

                      <AnimatedCard className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Screenshots
                        </h3>
                        <ScreenshotUploader />
                      </AnimatedCard>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <AnimatedCard className="p-12 text-center">
                <FiBookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Trade to Review
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a trade from the sidebar to access the complete lifecycle review
                </p>
              </AnimatedCard>
            )}
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
