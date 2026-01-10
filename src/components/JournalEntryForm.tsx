'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiSmile, FiMeh, FiFrown, FiTarget, FiZap, FiTrendingUp } from 'react-icons/fi';
import AnimatedCard from '@/components/AnimatedCard';
import toast from 'react-hot-toast';

interface JournalEntry {
  id: string;
  date: string;
  mentalState?: string;
  focus?: string;
  confidence?: number;
  externalStressors?: string[];
  phase?: string;
  phaseNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface JournalEntryFormProps {
  date: string;
  existingEntry?: JournalEntry | null;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  date,
  existingEntry,
  onSave,
  onCancel
}) => {
  const [mentalState, setMentalState] = useState(existingEntry?.mentalState || '');
  const [focus, setFocus] = useState(existingEntry?.focus || '');
  const [confidence, setConfidence] = useState(existingEntry?.confidence || 5);
  const [externalStressors, setExternalStressors] = useState<string[]>(existingEntry?.externalStressors || []);
  const [phase, setPhase] = useState(existingEntry?.phase || '');
  const [phaseNotes, setPhaseNotes] = useState(existingEntry?.phaseNotes || '');
  const [isSaving, setIsSaving] = useState(false);

  const mentalStates = [
    { value: 'excellent', label: 'Excellent', icon: FiSmile, color: 'text-green-500' },
    { value: 'good', label: 'Good', icon: FiSmile, color: 'text-green-400' },
    { value: 'okay', label: 'Okay', icon: FiMeh, color: 'text-yellow-500' },
    { value: 'poor', label: 'Poor', icon: FiFrown, color: 'text-orange-500' },
    { value: 'terrible', label: 'Terrible', icon: FiFrown, color: 'text-red-500' }
  ];

  const focusLevels = [
    { value: 'high', label: 'High Focus', icon: FiTarget, color: 'text-green-500' },
    { value: 'medium', label: 'Medium Focus', icon: FiTarget, color: 'text-yellow-500' },
    { value: 'low', label: 'Low Focus', icon: FiTarget, color: 'text-red-500' }
  ];

  const tradingPhases = [
    {
      value: 'learning',
      label: 'Learning Phase',
      description: 'Building foundational knowledge and skills',
      template: 'Today I focused on learning...\n\nKey lessons learned:\n- \n- \n\nChallenges faced:\n- \n- \n\nTomorrow\'s learning goals:\n- \n- '
    },
    {
      value: 'discipline',
      label: 'Discipline Phase',
      description: 'Developing consistent trading habits and rules',
      template: 'Today\'s discipline focus:\n\nRules followed:\n- \n- \n\nRules broken:\n- \n- \n\nWhy I broke them:\n\nHow to prevent this:\n- \n- '
    },
    {
      value: 'consistency',
      label: 'Consistency Phase',
      description: 'Maintaining steady performance and routines',
      template: 'Consistency check:\n\nDaily routine adherence:\n- Morning prep: \n- Trading hours: \n- Review time: \n\nPerformance consistency:\n- Win rate: \n- Risk management: \n\nAreas for improvement:\n- \n- '
    },
    {
      value: 'optimization',
      label: 'Optimization Phase',
      description: 'Refining strategies and maximizing performance',
      template: 'Optimization focus:\n\nStrategy testing:\n- What I tested: \n- Results: \n- Insights: \n\nPerformance metrics:\n- Profit factor: \n- Win rate: \n- Average R:R: \n\nNext optimization steps:\n- \n- '
    }
  ];

  const commonStressors = [
    'Work stress', 'Family issues', 'Health concerns', 'Market volatility',
    'Financial pressure', 'Sleep deprivation', 'Personal problems', 'Time pressure'
  ];

  const handleStressorToggle = (stressor: string) => {
    setExternalStressors(prev =>
      prev.includes(stressor)
        ? prev.filter(s => s !== stressor)
        : [...prev, stressor]
    );
  };

  const handleSave = async () => {
    if (!mentalState || !phase) {
      toast.error('Please fill in mental state and trading phase');
      return;
    }

    setIsSaving(true);
    try {
      const entryData = {
        date,
        mentalState,
        focus,
        confidence,
        externalStressors,
        phase,
        phaseNotes
      };

      const url = existingEntry ? `/api/journal/${existingEntry.id}` : '/api/journal';
      const method = existingEntry ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        throw new Error('Failed to save journal entry');
      }

      const savedEntry = await response.json();
      onSave(savedEntry);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save journal entry');
    } finally {
      setIsSaving(false);
    }
  };

  const applyTemplate = (selectedPhase: string) => {
    const phaseData = tradingPhases.find(p => p.value === selectedPhase);
    if (phaseData && !phaseNotes) {
      setPhaseNotes(phaseData.template);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: '12px',
      padding: '20px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {existingEntry ? 'Edit' : 'Create'} Journal Entry
        </h2>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Mental State */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            How are you feeling today?
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
          }}>
            {mentalStates.map((state) => {
              const Icon = state.icon;
              return (
                <button
                  key={state.value}
                  onClick={() => setMentalState(state.value)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `2px solid ${mentalState === state.value ? 'var(--purple-base)' : 'var(--card-border)'}`,
                    backgroundColor: mentalState === state.value ? 'var(--panel-muted)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={24} style={{ marginBottom: '4px', color: state.color }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                  }}>
                    {state.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Focus Level */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Focus Level
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}>
            {focusLevels.map((level) => {
              const Icon = level.icon;
              return (
                <button
                  key={level.value}
                  onClick={() => setFocus(level.value)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `2px solid ${focus === level.value ? 'var(--green-base)' : 'var(--card-border)'}`,
                    backgroundColor: focus === level.value ? 'var(--panel-muted)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={24} style={{ marginBottom: '4px', color: level.color }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                  }}>
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confidence Level */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Confidence Level (1-10)
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <input
              type="range"
              min="1"
              max="10"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'var(--panel-muted)',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <FiTrendingUp size={16} style={{ color: 'var(--text-secondary)' }} />
              <span style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                minWidth: '32px',
                textAlign: 'center',
              }}>
                {confidence}
              </span>
            </div>
          </div>
        </div>

        {/* External Stressors */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            External Stressors (select all that apply)
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '8px',
          }}>
            {commonStressors.map((stressor) => (
              <button
                key={stressor}
                onClick={() => handleStressorToggle(stressor)}
                style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  borderRadius: '6px',
                  border: `1px solid ${externalStressors.includes(stressor) ? '#ef4444' : 'var(--card-border)'}`,
                  backgroundColor: externalStressors.includes(stressor) ? 'var(--panel-muted)' : 'transparent',
                  color: externalStressors.includes(stressor) ? '#ef4444' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                }}
              >
                {stressor}
              </button>
            ))}
          </div>
        </div>

        {/* Trading Phase */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Current Trading Phase
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}>
            {tradingPhases.map((phaseOption) => (
              <button
                key={phaseOption.value}
                onClick={() => {
                  setPhase(phaseOption.value);
                  applyTemplate(phaseOption.value);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '6px',
                  border: `2px solid ${phase === phaseOption.value ? 'var(--purple-base)' : 'var(--card-border)'}`,
                  backgroundColor: phase === phaseOption.value ? 'var(--panel-muted)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}>
                  {phaseOption.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}>
                  {phaseOption.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Phase Notes */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}>
            Phase Notes & Reflections
          </label>
          <textarea
            value={phaseNotes}
            onChange={(e) => setPhaseNotes(e.target.value)}
            placeholder="Write your thoughts, reflections, and notes about your trading day..."
            rows={8}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid var(--card-border)',
              backgroundColor: 'var(--panel-muted)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--purple-base)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--card-border)',
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--panel-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
              color: 'white',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              opacity: isSaving ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSaving) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isSaving ? (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}></div>
            ) : (
              <FiSave size={16} />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Entry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryForm;