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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <DashboardHeader onThemeToggle={toggleTheme} currentTheme={theme} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Trade Lifecycle Review
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', margin: 0 }}>
            Complete pre-trade preparation, track in-trade decisions, and reflect on outcomes
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? 'var(--purple-base)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'var(--panel-muted)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Trades List Sidebar */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                Recent Trades
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {trades.length} total
              </div>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '2px solid var(--card-border)',
                    borderTop: '2px solid var(--purple-base)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </div>
              ) : trades.length > 0 ? (
                <div style={{ display: 'grid', gap: '8px' }}>
                  {trades.map((trade) => (
                    <button
                      key={trade.id}
                      onClick={() => setSelectedTradeId(trade.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px',
                        borderRadius: '8px',
                        border: selectedTradeId === trade.id ? '2px solid var(--purple-base)' : '1px solid var(--card-border)',
                        backgroundColor: selectedTradeId === trade.id ? 'var(--panel-muted)' : 'var(--card-bg)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTradeId !== trade.id) {
                          e.currentTarget.style.backgroundColor = 'var(--panel-muted)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTradeId !== trade.id) {
                          e.currentTarget.style.backgroundColor = selectedTradeId === trade.id ? 'var(--panel-muted)' : 'var(--card-bg)';
                        }
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {trade.pair} {trade.direction}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        {new Date(trade.entryTime).toLocaleDateString()}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: trade.outcome === 'WIN' ? '#10b981' : trade.outcome === 'LOSS' ? '#ef4444' : 'var(--text-secondary)'
                      }}>
                        {trade.outcome || 'Open'}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    No Trades Yet
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Start trading to begin reviewing your performance
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
            {selectedTrade ? (
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Trade Summary */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                      {selectedTrade.pair} - {selectedTrade.direction}
                    </h2>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: selectedTrade.status === 'closed' ? '#dcfce7' : selectedTrade.status === 'open' ? '#dbeafe' : 'var(--panel-muted)',
                      color: selectedTrade.status === 'closed' ? '#166534' : selectedTrade.status === 'open' ? '#1e40af' : 'var(--text-secondary)',
                    }}>
                      {selectedTrade.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Entry Price</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {selectedTrade.entryPrice.toFixed(5)}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Exit Price</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {selectedTrade.exitPrice?.toFixed(5) || 'Open'}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>P&L</div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: (selectedTrade.profitLoss || 0) >= 0 ? '#10b981' : '#ef4444'
                      }}>
                        {selectedTrade.profitLoss?.toFixed(2) || 'N/A'}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Outcome</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {selectedTrade.outcome || 'Open'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div style={{ minHeight: '400px' }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                      <div style={{ backgroundColor: 'var(--panel-muted)', borderRadius: '8px', padding: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
                          Voice Notes
                        </h3>
                        <VoiceRecorder />
                      </div>

                      <div style={{ backgroundColor: 'var(--panel-muted)', borderRadius: '8px', padding: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
                          Screenshots
                        </h3>
                        <ScreenshotUploader />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '64px 32px' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>📈</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Select a Trade to Review
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Choose a trade from the sidebar to access the complete lifecycle review
                </p>
                <button
                  onClick={() => setSelectedTradeId(trades[0]?.id || null)}
                  disabled={trades.length === 0}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: trades.length > 0 ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    fontSize: '14px',
                    opacity: trades.length > 0 ? 1 : 0.5,
                  }}
                >
                  Select First Trade
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
