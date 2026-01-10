'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  outcome?: string;
  profitLoss?: number;
  entryTime: string;
}

export default function CalendarPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(() => typeof window !== 'undefined');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchTrades = async () => {
      try {
        const response = await fetch('/api/trades', {
          headers: {
            'x-user-id': 'demo-user',
          },
        });

        if (!response.ok) {
          let errBody: unknown = null;
          try { errBody = await response.json(); } catch (e) { errBody = await response.text(); }
          console.error('Failed to fetch trades:', response.status, errBody);
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
          console.warn('Unexpected trades payload in calendar page', data);
          setTrades([]);
          return;
        }

        setTrades(data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
  }, [mounted]);

  const tradesByDate = useMemo(() => {
    const grouped: { [key: string]: Trade[] } = {};
    trades.forEach(trade => {
      const date = new Date(trade.entryTime).toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(trade);
    });
    return grouped;
  }, [trades]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null);

  const calendarDays = [...emptyDays, ...days];

  const selectedDateTrades = selectedDate ? tradesByDate[selectedDate] || [] : [];

  const getDayStats = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
    const dayTrades = tradesByDate[date] || [];
    const pnl = dayTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
    const wins = dayTrades.filter(t => t.outcome === 'WIN').length;
    return { count: dayTrades.length, pnl, wins };
  };

  if (!mounted) {
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', margin: 0 }}>
            Trading Calendar
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>View your trades by day</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Calendar Card */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--card-border)', backgroundColor: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  aria-label="Previous month"
                >
                  <FiChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  style={{ background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '12px', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--card-border)', backgroundColor: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  aria-label="Next month"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '12px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '11px', padding: '6px' }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />;
                }

                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
                const stats = getDayStats(day);
                const isSelected = selectedDate === date;

                let bgColor = 'transparent';
                let textColor = 'var(--text-secondary)';
                let borderColor = 'var(--card-border)';

                if (isSelected) {
                  bgColor = 'var(--purple-base)';
                  textColor = 'white';
                  borderColor = 'var(--purple-base)';
                } else if (stats.count > 0) {
                  if (stats.pnl >= 0) {
                    bgColor = 'rgba(34, 197, 94, 0.1)';
                    textColor = '#22c55e';
                    borderColor = 'rgba(34, 197, 94, 0.3)';
                  } else {
                    bgColor = 'rgba(239, 68, 68, 0.1)';
                    textColor = '#ef4444';
                    borderColor = 'rgba(239, 68, 68, 0.3)';
                  }
                } else {
                  bgColor = 'var(--panel-muted)';
                  textColor = 'var(--text-secondary)';
                  borderColor = 'transparent';
                }

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : date)}
                    style={{
                      aspectRatio: '1',
                      padding: '6px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: bgColor,
                      color: textColor,
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '48px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && stats.count === 0) {
                        e.currentTarget.style.borderColor = 'var(--purple-base)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = borderColor;
                    }}
                  >
                    <div>{day}</div>
                    {stats.count > 0 && (
                      <div style={{ fontSize: '9px', marginTop: '2px' }}>
                        {stats.count} {stats.count === 1 ? 'T' : 'Ts'}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--card-border)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '4px' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Winning Day</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '4px' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Losing Day</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--panel-muted)', border: '1px solid var(--card-border)', borderRadius: '4px' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No Trades</span>
              </div>
            </div>
          </div>
          {/* Selected Date Trades */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', maxHeight: 'fit-content' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', margin: 0 }}>
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString() : 'Select a date'}
            </h2>

            {selectedDateTrades.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedDateTrades.map(trade => (
                  <div
                    key={trade.id}
                    style={{
                      backgroundColor: 'var(--panel-muted)',
                      padding: '12px',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${trade.profitLoss && trade.profitLoss >= 0 ? '#22c55e' : '#ef4444'}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '13px' }}>{trade.pair}</span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: trade.outcome === 'WIN' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: trade.outcome === 'WIN' ? '#22c55e' : '#ef4444',
                        }}
                      >
                        {trade.outcome || 'Open'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <span>{trade.direction}</span>
                      <span style={{ color: trade.profitLoss && trade.profitLoss >= 0 ? '#22c55e' : '#ef4444', fontWeight: '600' }}>
                        {trade.profitLoss !== undefined ? `${trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}` : 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                {selectedDate ? 'No trades on this date' : 'Select a date to view trades'}
              </p>
            )}
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
