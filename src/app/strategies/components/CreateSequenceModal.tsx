'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiSettings, FiPlus, FiTrash2 } from 'react-icons/fi';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

interface TimeframeStep {
  timeframe: string;
  description: string;
}

interface CreateSequenceModalProps {
  strategyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const COMMON_TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', 'Daily', 'Weekly'];

export default function CreateSequenceModal({ strategyId, onClose, onSuccess }: CreateSequenceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [steps, setSteps] = useState<TimeframeStep[]>([
    { timeframe: 'Daily', description: 'Trend direction and key levels' },
    { timeframe: '4h', description: 'Entry timing and momentum' },
    { timeframe: '1h', description: 'Precise entry and stop placement' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addStep = () => {
    setSteps(prev => [...prev, { timeframe: '1h', description: '' }]);
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: keyof TimeframeStep, value: string) => {
    setSteps(prev => prev.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    ));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;

    setSteps(prev => {
      const newSteps = [...prev];
      [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
      return newSteps;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Sequence name is required');
      return;
    }

    if (steps.length === 0) {
      toast.error('At least one timeframe step is required');
      return;
    }

    if (steps.some(step => !step.timeframe.trim())) {
      toast.error('All timeframe steps must have a timeframe selected');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategyId}/sequences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          steps: steps.map((step, index) => ({
            timeframe: step.timeframe.trim(),
            orderIndex: index,
            description: step.description.trim() || undefined,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create sequence');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating sequence:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create sequence');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          background: 'var(--background)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 16px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#ea580c',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiSettings style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: '0'
            }}>
              Create Timeframe Sequence
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <FiX style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Name */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Sequence Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#ea580c'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              placeholder="e.g., London Breakout Analysis Sequence"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#ea580c'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              rows={3}
              placeholder="Describe the purpose and methodology of this sequence..."
            />
          </div>

          {/* Timeframe Steps */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Analysis Steps *
              </label>
              <button
                type="button"
                onClick={addStep}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: '#fed7aa',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#9a3412',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fdba74'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fed7aa'}
              >
                <FiPlus style={{ width: '12px', height: '12px' }} />
                Add Step
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    background: 'var(--card-bg)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: '#ea580c',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      borderRadius: '50%'
                    }}>
                      {index + 1}
                    </span>
                  </div>

                  <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: 'var(--text-secondary)',
                        marginBottom: '4px'
                      }}>
                        Timeframe
                      </label>
                      <select
                        value={step.timeframe}
                        onChange={(e) => updateStep(index, 'timeframe', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          background: 'var(--card-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#ea580c'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        {COMMON_TIMEFRAMES.map((tf) => (
                          <option key={tf} value={tf}>{tf}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: 'var(--text-secondary)',
                        marginBottom: '4px'
                      }}>
                        Description
                      </label>
                      <input
                        type="text"
                        value={step.description}
                        onChange={(e) => updateStep(index, 'description', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          background: 'var(--card-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#ea580c'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                        placeholder="What to analyze at this timeframe"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => moveStep(index, 'up')}
                      disabled={index === 0}
                      style={{
                        padding: '4px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: index === 0 ? 'not-allowed' : 'pointer',
                        color: 'var(--text-secondary)',
                        opacity: index === 0 ? 0.5 : 1,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (index !== 0) e.currentTarget.style.background = 'var(--hover-bg)';
                      }}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(index, 'down')}
                      disabled={index === steps.length - 1}
                      style={{
                        padding: '4px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: index === steps.length - 1 ? 'not-allowed' : 'pointer',
                        color: 'var(--text-secondary)',
                        opacity: index === steps.length - 1 ? 0.5 : 1,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (index !== steps.length - 1) e.currentTarget.style.background = 'var(--hover-bg)';
                      }}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      disabled={steps.length === 1}
                      style={{
                        padding: '4px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: steps.length === 1 ? 'not-allowed' : 'pointer',
                        color: '#dc2626',
                        opacity: steps.length === 1 ? 0.5 : 1,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (steps.length !== 1) e.currentTarget.style.background = '#fef2f2';
                      }}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      title="Remove step"
                    >
                      <FiTrash2 style={{ width: '12px', height: '12px' }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginTop: '8px'
            }}>
              Define the order of timeframes you analyze, from highest to lowest timeframe.
              Start with broader context and move to precise entry timing.
            </p>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 24px',
                background: isSubmitting ? 'var(--disabled-bg)' : '#ea580c',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background 0.2s',
                boxShadow: 'var(--shadow-md)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = '#c2410c';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = '#ea580c';
              }}
            >
              <FiSave style={{ width: '16px', height: '16px' }} />
              {isSubmitting ? 'Creating...' : 'Create Sequence'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}