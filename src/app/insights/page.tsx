'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { FiTrendingUp, FiAlertCircle, FiTarget, FiZap } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryTime: string;
  outcome?: string;
  profitLoss?: number;
  emotionalState?: string;
  strategy?: string;
  mistakes?: string;
  setupQuality?: number;
}

interface Insight {
  type: 'pattern' | 'improvement' | 'strength' | 'warning';
  title: string;
  description: string;
  icon: typeof FiTrendingUp;
  color: string;
}

export default function InsightsPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(() => typeof window !== 'undefined');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) return;

    const fetchTrades = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/trades', {
          headers: {
            'x-user-id': 'demo-user',
          },
        });

        if (!response.ok) {
          let errBody: unknown = null;
          try { errBody = await response.json(); } catch (e) { errBody = await response.text(); }
          console.error('Failed to fetch trades:', response.status, errBody);
          setError('Failed to load trades data');
          setTrades([]);
          return;
        }

        const responseData = await response.json();

        // Handle API response format
        let data;
        if (responseData && typeof responseData === 'object' && 'data' in responseData) {
          // API response format: { success: true, data: [...], pagination: {...} }
          data = responseData.data;
        } else {
          // Fallback for direct array response
          data = responseData;
        }

        if (!Array.isArray(data)) {
          console.warn('Unexpected trades payload in insights page', data);
          setError('Invalid trades data format');
          setTrades([]);
          return;
        }

        setTrades(data);
      } catch (error) {
        console.error('Error fetching trades:', error);
        setError('An error occurred while loading trades');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrades();
  }, [mounted]);

  // Generate AI insights
  useEffect(() => {
    if (trades.length === 0) return;

    const generatedInsights: Insight[] = [];

    // Best performing pairs
    const pairStats: { [key: string]: { wins: number; losses: number; pnl: number } } = {};
    trades.forEach(trade => {
      if (!pairStats[trade.pair]) {
        pairStats[trade.pair] = { wins: 0, losses: 0, pnl: 0 };
      }
      if (trade.outcome === 'WIN') pairStats[trade.pair].wins++;
      if (trade.outcome === 'LOSS') pairStats[trade.pair].losses++;
      pairStats[trade.pair].pnl += trade.profitLoss || 0;
    });

    const bestPair = Object.entries(pairStats).sort((a, b) => b[1].wins - a[1].wins)[0];
    if (bestPair) {
      generatedInsights.push({
        type: 'strength',
        title: `${bestPair[0]} is your best pair`,
        description: `You have a ${Math.round((bestPair[1].wins / (bestPair[1].wins + bestPair[1].losses)) * 100)}% win rate on ${bestPair[0]}. Consider trading it more often.`,
        icon: FiTrendingUp,
        color: 'text-green-600 dark:text-green-400',
      });
    }

    // Emotional state analysis
    const emotionalTrades = trades.filter(t => t.emotionalState);
    if (emotionalTrades.length > 0) {
      const emotionalStats: { [key: string]: { wins: number; losses: number } } = {};
      emotionalTrades.forEach(trade => {
        if (!emotionalStats[trade.emotionalState || '']) {
          emotionalStats[trade.emotionalState || ''] = { wins: 0, losses: 0 };
        }
        if (trade.outcome === 'WIN') emotionalStats[trade.emotionalState || ''].wins++;
        else emotionalStats[trade.emotionalState || ''].losses++;
      });

      const bestState = Object.entries(emotionalStats).sort((a, b) => b[1].wins - a[1].wins)[0];
      if (bestState) {
        generatedInsights.push({
          type: 'pattern',
          title: `You trade best when ${bestState[0]}`,
          description: `${bestState[1].wins} wins when ${bestState[0]} vs ${bestState[1].losses} losses. Remember this state for future trades.`,
          icon: FiZap,
          color: 'text-blue-600 dark:text-blue-400',
        });
      }
    }

    // Win rate by direction
    const longs = trades.filter(t => t.direction === 'LONG');
    const shorts = trades.filter(t => t.direction === 'SHORT');
    const longWinRate = longs.length > 0 ? (longs.filter(t => t.outcome === 'WIN').length / longs.length) * 100 : 0;
    const shortWinRate = shorts.length > 0 ? (shorts.filter(t => t.outcome === 'WIN').length / shorts.length) * 100 : 0;

    if (longWinRate > shortWinRate && longWinRate > 40) {
      generatedInsights.push({
        type: 'improvement',
        title: 'You are better at LONG trades',
        description: `Long win rate: ${Math.round(longWinRate)}% vs Short: ${Math.round(shortWinRate)}%. Focus more on long setups.`,
        icon: FiTarget,
        color: 'text-green-600 dark:text-green-400',
      });
    }

    // Common mistakes warning
    const allMistakes = trades
      .filter(t => t.mistakes)
      .flatMap(t => {
        try {
          return t.mistakes ? JSON.parse(t.mistakes) : [];
        } catch {
          return [];
        }
      });

    if (allMistakes.length > 0) {
      const mistakeCount: { [key: string]: number } = {};
      allMistakes.forEach(m => {
        mistakeCount[m] = (mistakeCount[m] || 0) + 1;
      });

      const topMistake = Object.entries(mistakeCount).sort((a, b) => b[1] - a[1])[0];
      if (topMistake && topMistake[1] > 1) {
        generatedInsights.push({
          type: 'warning',
          title: `Repeated mistake: ${topMistake[0]}`,
          description: `You've made this mistake ${topMistake[1]} times. Create a checklist to prevent this.`,
          icon: FiAlertCircle,
          color: 'text-orange-600 dark:text-orange-400',
        });
      }
    }

    // Time-based analysis
    const morningTrades = trades.filter(t => {
      const hour = new Date(t.entryTime).getHours();
      return hour >= 8 && hour < 12;
    });

    if (morningTrades.length > 5) {
      const morningWins = morningTrades.filter(t => t.outcome === 'WIN').length;
      const morningWinRate = (morningWins / morningTrades.length) * 100;
      if (morningWinRate > 60) {
        generatedInsights.push({
          type: 'pattern',
          title: 'You trade best in the morning',
          description: `Morning (8am-12pm) win rate: ${Math.round(morningWinRate)}%. Schedule more trades during this time.`,
          icon: FiTrendingUp,
          color: 'text-yellow-600 dark:text-yellow-400',
        });
      }
    }

    setInsights(generatedInsights);
  }, [trades]);

  if (!mounted) {
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
            AI-Powered Insights
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Get personalized trading improvements based on your data
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div
            style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--loss-color)',
            }}
            role="alert"
          >
            <FiAlertCircle size={20} />
            <span style={{ fontSize: '14px' }}>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '14px', marginBottom: '16px' }}>Analyzing your trading data...</div>
            <div style={{
              width: '40px',
              height: '40px',
              border: '2px solid var(--purple-base)',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }} />
          </div>
        ) : insights.length > 0 ? (
          <>
            {/* Insights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}>
              {insights.map((insight, idx) => {
                const Icon = insight.icon;
                const getBgColor = () => {
                  switch(insight.type) {
                    case 'warning':
                      return { bg: 'rgba(217, 119, 6, 0.1)', border: 'rgba(217, 119, 6, 0.3)' };
                    case 'strength':
                      return { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)' };
                    case 'improvement':
                      return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)' };
                    default:
                      return { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)' };
                  }
                };

                const colors = getBgColor();
                const getIconColor = () => {
                  switch(insight.type) {
                    case 'warning': return '#d97706';
                    case 'strength': return '#22c55e';
                    case 'improvement': return '#3b82f6';
                    default: return '#a855f7';
                  }
                };

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        backgroundColor: 'var(--card-bg)',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        <Icon size={20} style={{ color: getIconColor() }} />
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                        {insight.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                      {insight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        ) : trades.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontSize: '16px', marginBottom: '8px', margin: 0 }}>No trades available</p>
            <p style={{ fontSize: '13px', margin: 0 }}>Add some trades to your journal to get AI-powered insights</p>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontSize: '16px', margin: 0 }}>Not enough data for insights yet</p>
          </div>
        )}

        {/* Weekly Summary */}
        {trades.length > 0 && insights.length > 0 && (
          <div style={{
            marginTop: '32px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '20px', margin: 0 }}>
              Trading Summary
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
            }}>
              <div style={{ backgroundColor: 'var(--panel-muted)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', margin: 0 }}>Total Trades</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{trades.length}</p>
              </div>
              <div style={{ backgroundColor: 'var(--panel-muted)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', margin: 0 }}>Win Rate</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e', margin: 0 }}>
                  {trades.length > 0
                    ? Math.round(((trades.filter(t => t.outcome === 'WIN').length / trades.length) * 100))
                    : 0}%
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--panel-muted)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', margin: 0 }}>Total P&L</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) >= 0 ? '#22c55e' : '#ef4444',
                  margin: 0,
                }}>
                  {(trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) || 0).toFixed(2)}
                </p>
              </div>
              <div style={{ backgroundColor: 'var(--panel-muted)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', margin: 0 }}>Avg Quality</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#fbbf24', margin: 0 }}>
                  {trades.filter(t => t.setupQuality).length > 0
                    ? (
                        trades
                          .filter(t => t.setupQuality)
                          .reduce((sum, t) => sum + (t.setupQuality || 0), 0) /
                        trades.filter(t => t.setupQuality).length
                      ).toFixed(1)
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
