'use client';

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiBarChart, FiTarget, FiZap, FiFilter, FiDownload, FiAlertCircle } from 'react-icons/fi';
import DashboardHeader from '@/components/DashboardHeader';
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
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <DashboardHeader onThemeToggle={toggleTheme} currentTheme={theme} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', margin: 0 }}>
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Comprehensive trading performance, strategy analysis, and behavioral insights
          </p>
        </div>

        {/* Export Button */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={exportData}
            style={{
              background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FiDownload size={16} />
            Export Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
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
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <FiFilter size={16} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Filters</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Strategy
              </label>
              <select
                value={filters.strategyId}
                onChange={(e) => setFilters(prev => ({ ...prev, strategyId: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--panel-muted)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              >
                <option value="">All Strategies</option>
                {strategies.map(strategy => (
                  <option key={strategy.id} value={strategy.id}>{strategy.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Currency Pair
              </label>
              <select
                value={filters.pair}
                onChange={(e) => setFilters(prev => ({ ...prev, pair: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--panel-muted)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              >
                <option value="">All Pairs</option>
                {Array.from(new Set(trades.map(t => t.pair))).map(pair => (
                  <option key={pair} value={pair}>{pair}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Session
              </label>
              <select
                value={filters.session}
                onChange={(e) => setFilters(prev => ({ ...prev, session: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--panel-muted)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              >
                <option value="">All Sessions</option>
                {Array.from(new Set(trades.map(t => t.session).filter(Boolean))).map(session => (
                  <option key={session} value={session}>{session}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Emotional State
              </label>
              <select
                value={filters.emotionalState}
                onChange={(e) => setFilters(prev => ({ ...prev, emotionalState: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--panel-muted)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              >
                <option value="">All States</option>
                {Array.from(new Set(trades.map(t => t.emotionalState).filter(Boolean))).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid var(--card-border)',
              borderTop: '3px solid var(--purple-base)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ marginLeft: '12px', color: 'var(--text-secondary)' }}>Loading analytics...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiAlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                  <AnalyticsCharts trades={filteredTrades} />
                </div>
                <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                  <YearlyHeatmap trades={filteredTrades} />
                </div>
                <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                  <MonthlyPerformanceTable trades={filteredTrades} />
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                <PerformanceMetrics trades={filteredTrades} />
              </div>
            )}

            {activeTab === 'strategies' && (
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                <StrategyComparison trades={filteredTrades} strategies={strategies} />
              </div>
            )}

            {activeTab === 'behavioral' && (
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                <BehavioralAnalysis trades={filteredTrades} journalEntries={journalEntries} />
              </div>
            )}
          </div>
        )}
      </main>

      <Toaster />
    </div>
  );
}