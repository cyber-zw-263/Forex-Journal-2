'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';

interface DailyGoal {
  date: string;
  goals: string[];
  notes: string;
}

export default function PlanningPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [today] = useState(new Date().toISOString().split('T')[0]);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({
    date: today,
    goals: [],
    notes: '',
  });
  const [currentGoal, setCurrentGoal] = useState('');
  const [weeklyFocus, setWeeklyFocus] = useState('');
  const [preMarketNotes, setPreMarketNotes] = useState('');
  const [postSessionNotes, setPostSessionNotes] = useState('');

  const addGoal = () => {
    if (!currentGoal.trim()) return;
    setDailyGoal(prev => ({
      ...prev,
      goals: [...prev.goals, currentGoal],
    }));
    setCurrentGoal('');
  };

  const removeGoal = (index: number) => {
    setDailyGoal(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };

  const saveGoals = async () => {
    try {
      // In a real app, this would save to the database
      toast.success('Daily goals saved!');
    } catch (error) {
      toast.error('Failed to save goals');
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
            Trading Plan & Goals
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Plan your trading day and track your progress</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Daily Goals Section */}
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', margin: 0 }}>Today's Goals</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', margin: 0 }}>{today}</p>

            {/* Add Goal */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                value={currentGoal}
                onChange={(e) => setCurrentGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                placeholder="Add a trading goal"
                style={{
                  flex: 1,
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
              />
              <button
                onClick={addGoal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'var(--purple-base)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <FiPlus size={16} />
              </button>
            </div>

            {/* Goals List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {dailyGoal.goals.map((goal, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--panel-muted)',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>{goal}</span>
                  <button
                    onClick={() => removeGoal(idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--loss-color)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Notes
              </label>
              <textarea
                value={dailyGoal.notes}
                onChange={(e) => setDailyGoal(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes for today..."
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
                  minHeight: '60px',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; }}
              />
            </div>

            <button
              onClick={saveGoals}
              style={{
                width: '100%',
                marginTop: '16px',
                background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                color: 'white',
                fontWeight: '600',
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Save Daily Goals
            </button>
          </div>

          {/* Planning Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Weekly Focus */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', margin: 0 }}>Weekly Focus Area</h2>
              <select
                value={weeklyFocus}
                onChange={(e) => setWeeklyFocus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid var(--card-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--panel-muted)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                  marginBottom: '12px',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-base)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; }}
              >
                <option>Select focus area...</option>
                <option>Patience & Discipline</option>
                <option>Risk Management</option>
                <option>Entry Accuracy</option>
                <option>Exit Strategy</option>
                <option>Consistency</option>
                <option>Emotional Control</option>
              </select>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                Choose one area to focus on this week
              </p>
            </div>

            {/* Pre-Market */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', margin: 0 }}>Pre-Market Preparation</h2>
              <textarea
                value={preMarketNotes}
                onChange={(e) => setPreMarketNotes(e.target.value)}
                placeholder="Economic events, key levels, pairs to watch..."
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

            {/* Post-Session */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px', margin: 0 }}>Post-Session Review</h2>
              <ul style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px', paddingLeft: '20px' }}>
                <li>Did you hit your daily goal?</li>
                <li>What was your biggest win today?</li>
                <li>What mistake did you make?</li>
                <li>How was your emotional control?</li>
                <li>What will you improve tomorrow?</li>
              </ul>
              <textarea
                value={postSessionNotes}
                onChange={(e) => setPostSessionNotes(e.target.value)}
                placeholder="Your reflections..."
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
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
