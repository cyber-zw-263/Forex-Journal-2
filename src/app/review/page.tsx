'use client';

import { useState, useEffect } from 'react';
import VoiceRecorder from '@/components/VoiceRecorder';
import ScreenshotUploader from '@/components/ScreenshotUploader';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function TradeReviewPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [reviewData, setReviewData] = useState({
    whatLearned: '',
    mistakes: [] as string[],
    emotionalState: 'calm',
    setupQuality: 3,
  });
  const [currentMistake, setCurrentMistake] = useState('');

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

        const data = await response.json();
        if (!Array.isArray(data)) {
          console.warn('Unexpected trades payload in review page', data);
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

  const selectedTrade = trades.find(t => t.id === selectedTradeId);

  const mistakeOptions = [
    'Overtraded',
    'Broke rules',
    'Wrong entry point',
    'Hesitated on trade',
    'Exited too early',
    'Exited too late',
    'Ignored analysis',
    'Bad position sizing',
    'Emotion-driven',
  ];

  const toggleMistake = (mistake: string) => {
    setReviewData(prev => ({
      ...prev,
      mistakes: prev.mistakes.includes(mistake)
        ? prev.mistakes.filter(m => m !== mistake)
        : [...prev.mistakes, mistake],
    }));
  };

  const saveReview = async () => {
    if (!selectedTrade) return;

    try {
      const response = await fetch(`/api/trades/${selectedTrade.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          whatLearned: reviewData.whatLearned,
          mistakes: JSON.stringify(reviewData.mistakes),
          emotionalState: reviewData.emotionalState,
          setupQuality: reviewData.setupQuality,
        }),
      });

      if (response.ok) {
        toast.success('Review saved');
        setSelectedTradeId(null);
      }
    } catch (error) {
      toast.error('Failed to save review');
    }
  };

  if (!mounted) {
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', margin: 0 }}>
            Trade Reviews
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Deep dive into your trades and learn from them</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Trades List */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', margin: 0 }}>Recent Trades</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
              {trades.length > 0 ? (
                trades.map(trade => (
                  <button
                    key={trade.id}
                    onClick={() => {
                      setSelectedTradeId(trade.id);
                      setReviewData({
                        whatLearned: trade.whatLearned || '',
                        mistakes: trade.mistakes ? JSON.parse(trade.mistakes) : [],
                        emotionalState: trade.emotionalState || 'calm',
                        setupQuality: trade.setupQuality || 3,
                      });
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: selectedTradeId === trade.id ? 'var(--purple-base)' : 'var(--panel-muted)',
                      color: selectedTradeId === trade.id ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '13px',
                    }}
                    onMouseEnter={(e) => {\n                      if (selectedTradeId !== trade.id) {\n                        e.currentTarget.style.backgroundColor = 'var(--card-border)';\n                      }\n                    }}\n                    onMouseLeave={(e) => {\n                      if (selectedTradeId !== trade.id) {\n                        e.currentTarget.style.backgroundColor = 'var(--panel-muted)';\n                      }\n                    }}\n                  >\n                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{trade.pair}</div>
                    <div style={{ fontSize: '11px', opacity: 0.75 }}>\n                      {new Date(trade.entryTime).toLocaleDateString()}\n                    </div>\n                  </button>\n                ))\n              ) : (\n                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', padding: '16px', margin: 0 }}>\n                  No trades yet\n                </p>\n              )}\n            </div>\n          </div>

          {/* Review Form */}
          {selectedTrade ? (
            <div style={{ gridColumn: 'auto / span 2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Trade Summary */}
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', margin: 0 }}>
                  {selectedTrade.pair} - {selectedTrade.direction}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '13px' }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>Entry</p>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                      {selectedTrade.entryPrice.toFixed(5)}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>Exit</p>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                      {selectedTrade.exitPrice?.toFixed(5) || 'Open'}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>P&L</p>
                    <p style={{ fontWeight: '600', color: selectedTrade.profitLoss >= 0 ? 'var(--win-color)' : 'var(--loss-color)', margin: 0 }}>
                      {selectedTrade.profitLoss?.toFixed(2) || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>Outcome</p>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                      {selectedTrade.outcome || 'Open'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Fields */}
              <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', margin: 0 }}>Review Details</h3>

                {/* What I Learned */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    What I Learned
                  </label>
                  <textarea
                    value={reviewData.whatLearned}
                    onChange={(e) =>
                      setReviewData(prev => ({ ...prev, whatLearned: e.target.value }))
                    }
                    placeholder="What did this trade teach you?"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--card-border)',
                      borderRadius: '6px',
                      backgroundColor: 'var(--panel-muted)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '80px',
                      fontFamily: 'inherit',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                  />
                </div>

                {/* Emotional State */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Emotional State
                  </label>
                  <select
                    value={reviewData.emotionalState}
                    onChange={(e) =>
                      setReviewData(prev => ({ ...prev, emotionalState: e.target.value }))
                    }
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--card-border)',
                      borderRadius: '6px',
                      backgroundColor: 'var(--panel-muted)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                  >
                    <option>calm</option>
                    <option>rushed</option>
                    <option>frustrated</option>
                    <option>confident</option>
                    <option>fearful</option>
                  </select>
                </div>

                {/* Setup Quality */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Setup Quality Rating
                  </label>
                  <select
                    value={reviewData.setupQuality}
                    onChange={(e) =>
                      setReviewData(prev => ({ ...prev, setupQuality: parseInt(e.target.value) }))
                    }
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--card-border)',
                      borderRadius: '6px',
                      backgroundColor: 'var(--panel-muted)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                  >
                    <option value="1">⭐ Poor</option>
                    <option value="2">⭐⭐ Below Average</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  </select>
                </div>

                {/* Mistakes */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Mistakes Made
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {mistakeOptions.map(mistake => (
                      <label key={mistake} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={reviewData.mistakes.includes(mistake)}
                          onChange={() => toggleMistake(mistake)}
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            border: '1px solid var(--card-border)',
                            cursor: 'pointer',
                            accentColor: 'var(--purple-base)',
                          }}
                        />
                        <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{mistake}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={saveReview}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(168, 85, 247, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Save Review
              </button>
            </div>
          ) : (
            <div style={{ gridColumn: 'auto / span 2', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '48px 20px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Select a trade to review</p>
            </div>
          )}
        </div>

        {/* Media Uploads */}
        {selectedTrade && (
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              <VoiceRecorder />
            </div>
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              <ScreenshotUploader />
            </div>
          </div>
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
