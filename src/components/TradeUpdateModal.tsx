'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiSave, FiClock } from 'react-icons/fi';
import Modal from '@/components/Modal';
import AnimatedCard from '@/components/AnimatedCard';
import toast from 'react-hot-toast';

interface TradeUpdate {
  id: string;
  action: string;
  reason?: string;
  emotionalState?: string;
  behavior?: string[];
  notes?: string;
  timestamp: string;
}

interface TradeUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: string;
  onUpdateAdded?: (update: TradeUpdate) => void;
  existingUpdates?: TradeUpdate[];
}

const actionOptions = [
  { value: 'none', label: 'No Action', description: 'Monitoring the trade' },
  { value: 'sl_moved', label: 'Stop Loss Moved', description: 'Adjusted stop loss level' },
  { value: 'tp_adjusted', label: 'Take Profit Adjusted', description: 'Modified profit target' },
  { value: 'partial_close', label: 'Partial Close', description: 'Closed portion of position' },
  { value: 'manual_close', label: 'Manual Close', description: 'Closed entire position manually' }
];

const reasonOptions = [
  { value: 'followed_plan', label: 'Followed Plan', description: 'Executed according to strategy' },
  { value: 'market_structure', label: 'Market Structure', description: 'Responding to price action' },
  { value: 'emotional', label: 'Emotional Response', description: 'Reacted based on emotions' },
  { value: 'fear', label: 'Fear', description: 'Fear-driven decision' },
  { value: 'greed', label: 'Greed', description: 'Greed-driven decision' },
  { value: 'uncertainty', label: 'Uncertainty', description: 'Uncertain market conditions' },
  { value: 'distraction', label: 'Distraction', description: 'Lost focus or distracted' }
];

const emotionalStates = [
  { value: 'calm', label: 'Calm', color: 'bg-green-100 text-green-800' },
  { value: 'confident', label: 'Confident', color: 'bg-blue-100 text-blue-800' },
  { value: 'anxious', label: 'Anxious', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'hesitant', label: 'Hesitant', color: 'bg-orange-100 text-orange-800' },
  { value: 'overconfident', label: 'Overconfident', color: 'bg-purple-100 text-purple-800' },
  { value: 'fearful', label: 'Fearful', color: 'bg-red-100 text-red-800' },
  { value: 'impulsive', label: 'Impulsive', color: 'bg-pink-100 text-pink-800' },
  { value: 'detached', label: 'Detached', color: 'bg-gray-100 text-gray-800' }
];

const behaviorOptions = [
  { value: 'disciplined', label: 'Disciplined', description: 'Following rules consistently' },
  { value: 'patient', label: 'Patient', description: 'Waiting for proper setup' },
  { value: 'focused', label: 'Focused', description: 'Maintaining attention' },
  { value: 'impulsive', label: 'Impulsive', description: 'Acting without thinking' },
  { value: 'fearful', label: 'Fearful', description: 'Avoiding necessary actions' },
  { value: 'greedy', label: 'Greedy', description: 'Taking excessive risk' },
  { value: 'distracted', label: 'Distracted', description: 'Not fully engaged' },
  { value: 'overconfident', label: 'Overconfident', description: 'Taking unnecessary risks' }
];

export default function TradeUpdateModal({
  isOpen,
  onClose,
  tradeId,
  onUpdateAdded,
  existingUpdates = []
}: TradeUpdateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [update, setUpdate] = useState<TradeUpdate>({
    id: '',
    action: 'none',
    reason: '',
    emotionalState: '',
    behavior: [],
    notes: '',
    timestamp: new Date().toISOString()
  });

  const resetForm = () => {
    setUpdate({
      id: '',
      action: 'none',
      reason: '',
      emotionalState: '',
      behavior: [],
      notes: '',
      timestamp: new Date().toISOString()
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!update.action) {
      toast.error('Please select an action');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          action: update.action,
          reason: update.reason || null,
          emotionalState: update.emotionalState || null,
          behavior: update.behavior && update.behavior.length > 0 ? update.behavior : null,
          notes: update.notes || null
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add update');
      }

      const newUpdate = await response.json();
      toast.success('Trade update added successfully');

      onUpdateAdded?.(newUpdate);
      handleClose();
    } catch (error) {
      console.error('Error adding trade update:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add trade update');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleBehavior = (behaviorValue: string) => {
    setUpdate(prev => ({
      ...prev,
      behavior: prev.behavior?.includes(behaviorValue)
        ? prev.behavior.filter(b => b !== behaviorValue)
        : [...(prev.behavior || []), behaviorValue]
    }));
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          background: 'var(--background)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '800px',
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
              background: 'var(--accent-bg)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiClock style={{ width: '20px', height: '20px', color: 'var(--accent-color)' }} />
            </div>
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: '0'
              }}>
                Add Trade Update
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                margin: '4px 0 0 0'
              }}>
                Record changes and observations during the trade
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
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
          {/* Action Selection */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              What action did you take?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {actionOptions.map((action) => (
                <label
                  key={action.value}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: update.action === action.value ? '2px solid var(--accent-color)' : '2px solid var(--border)',
                    background: update.action === action.value ? 'var(--accent-bg)' : 'var(--card-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="radio"
                    name="action"
                    value={action.value}
                    checked={update.action === action.value}
                    onChange={(e) => setUpdate(prev => ({ ...prev, action: e.target.value }))}
                    style={{ marginTop: '2px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {action.label}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)'
                    }}>
                      {action.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Reason Selection */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Why did you take this action?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {reasonOptions.map((reason) => (
                <label
                  key={reason.value}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: update.reason === reason.value ? '2px solid var(--accent-color)' : '2px solid var(--border)',
                    background: update.reason === reason.value ? 'var(--accent-bg)' : 'var(--card-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.value}
                    checked={update.reason === reason.value}
                    onChange={(e) => setUpdate(prev => ({ ...prev, reason: e.target.value }))}
                    style={{ marginTop: '2px' }}
                  />
                  <div style={{ fontSize: '12px' }}>
                    <div style={{
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}>
                      {reason.label}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Emotional State */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              How were you feeling?
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {emotionalStates.map((state) => (
                <button
                  key={state.value}
                  type="button"
                  onClick={() => setUpdate(prev => ({
                    ...prev,
                    emotionalState: prev.emotionalState === state.value ? '' : state.value
                  }))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: update.emotionalState === state.value ? state.color : 'var(--card-bg)',
                    color: update.emotionalState === state.value ? 'white' : 'var(--text-primary)',
                    boxShadow: update.emotionalState === state.value ? '0 0 0 2px var(--accent-color)' : 'none'
                  }}
                >
                  {state.label}
                </button>
              ))}
            </div>
          </div>

          {/* Behavior Flags */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              How did you behave during this update?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {behaviorOptions.map((behavior) => (
                <label
                  key={behavior.value}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: update.behavior?.includes(behavior.value) ? '2px solid var(--success-color)' : '2px solid var(--border)',
                    background: update.behavior?.includes(behavior.value) ? 'var(--success-bg)' : 'var(--card-bg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={update.behavior?.includes(behavior.value) || false}
                    onChange={() => toggleBehavior(behavior.value)}
                    style={{ marginTop: '2px' }}
                  />
                  <div style={{ fontSize: '12px', flex: 1 }}>
                    <div style={{
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {behavior.label}
                    </div>
                    <div style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.4'
                    }}>
                      {behavior.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Additional Notes
            </label>
            <textarea
              value={update.notes}
              onChange={(e) => setUpdate(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional observations or thoughts..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Submit Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)'
          }}>
            <button
              type="button"
              onClick={handleClose}
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
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 24px',
                background: isSubmitting ? 'var(--disabled-bg)' : 'var(--accent-color)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = 'var(--accent-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = 'var(--accent-color)';
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSave style={{ width: '16px', height: '16px' }} />
                  <span>Add Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}