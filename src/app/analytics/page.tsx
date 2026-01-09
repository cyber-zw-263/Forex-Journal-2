'use client';

import { useState, useEffect } from 'react';
/* Header provided by AppShell */
import AnalyticsCharts from '@/components/AnalyticsChartsV2';
import YearlyHeatmap from '@/components/YearlyHeatmap';
import MonthlyPerformanceTable from '@/components/MonthlyPerformanceTable';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import AnimatedCard from '@/components/AnimatedCard';
import { FiAlertCircle } from 'react-icons/fi';

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const [trades, setTrades] = useState<any[]>([]);
  const [mounted, setMounted] = useState(() => typeof window !== 'undefined');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });

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
          setError('Failed to load trades data. Please try again.');
          setTrades([]);
          return;
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          console.warn('Unexpected trades payload in analytics page', data);
          setError('Invalid trades data format');
          setTrades([]);
          return;
        }

        setTrades(data);
      } catch (error) {
        console.error('Error fetching trades:', error);
        setError('An error occurred while loading trades');
        setTrades([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrades();
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Analytics & Insights
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Track your trading performance with detailed charts and metrics
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
            }}
            role="alert"
          >
            <FiAlertCircle size={20} style={{ color: 'var(--loss-color)' }} />
            <span style={{ color: 'var(--loss-color)', fontSize: '14px' }}>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '14px', marginBottom: '16px' }}>Loading analytics data...</div>
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
        ) : trades.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>No trades data available</p>
            <p style={{ fontSize: '13px' }}>Add some trades to your journal to see analytics</p>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Performance Charts
                </h2>
                {dateRange.start && (
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Range: <strong>{dateRange.start}</strong> {dateRange.end && <span>— <strong>{dateRange.end}</strong></span>}
                  </span>
                )}
              </div>
              <div style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <AnalyticsCharts trades={trades} startDate={dateRange.start} endDate={dateRange.end} />
              </div>
            </div>

            {/* Heatmap and Table Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '24px',
            }}>
              <div style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Yearly Heatmap
                </h3>
                <YearlyHeatmap trades={trades} onSelectRange={(r) => setDateRange(r)} />
              </div>
              <div style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Monthly Performance
                </h3>
                <MonthlyPerformanceTable trades={trades} />
              </div>
            </div>
          </>
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
