'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiTarget } from 'react-icons/fi';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

interface CreateEntryModelModalProps {
  strategyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CONFIRMATION_STYLES = ['conservative', 'moderate', 'aggressive'];
const RISK_STYLES = ['low', 'medium', 'high'];

export default function CreateEntryModelModal({ strategyId, onClose, onSuccess }: CreateEntryModelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    entryLogic: '',
    confirmationStyle: 'moderate',
    riskStyle: 'medium',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.entryLogic.trim()) {
      toast.error('Name and entry logic are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategyId}/entry-models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          entryLogic: formData.entryLogic.trim(),
          confirmationStyle: formData.confirmationStyle,
          riskStyle: formData.riskStyle,
          notes: formData.notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create entry model');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating entry model:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create entry model');
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
              <FiTarget style={{ width: '20px', height: '20px', color: 'var(--accent-color)' }} />
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: '0'
            }}>
              Create Entry Model
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
              Model Name *
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
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              placeholder="e.g., Breakout Entry with Volume Confirmation"
              required
            />
          </div>

          {/* Entry Logic */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Entry Logic *
            </label>
            <textarea
              value={formData.entryLogic}
              onChange={(e) => setFormData(prev => ({ ...prev, entryLogic: e.target.value }))}
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
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              rows={4}
              placeholder="Describe the specific conditions and logic for entering trades..."
              required
            />
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginTop: '4px'
            }}>
              Be specific about price action, indicators, volume requirements, etc.
            </p>
          </div>

          {/* Confirmation Style */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Confirmation Style
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {CONFIRMATION_STYLES.map((style) => (
                <label key={style} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="confirmationStyle"
                    value={style}
                    checked={formData.confirmationStyle === style}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmationStyle: e.target.value }))}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize',
                    background: formData.confirmationStyle === style ? 'var(--accent-color)' : 'var(--card-bg)',
                    color: formData.confirmationStyle === style ? 'white' : 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {style}
                  </span>
                </label>
              ))}
            </div>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginTop: '4px',
              lineHeight: '1.4'
            }}>
              Conservative: Multiple confirmations required<br />
              Moderate: Standard confirmation signals<br />
              Aggressive: Quick entries with minimal confirmation
            </p>
          </div>

          {/* Risk Style */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Risk Style
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {RISK_STYLES.map((style) => (
                <label key={style} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="riskStyle"
                    value={style}
                    checked={formData.riskStyle === style}
                    onChange={(e) => setFormData(prev => ({ ...prev, riskStyle: e.target.value }))}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize',
                    background: formData.riskStyle === style ? '#ea580c' : 'var(--card-bg)',
                    color: formData.riskStyle === style ? 'white' : 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {style}
                  </span>
                </label>
              ))}
            </div>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginTop: '4px',
              lineHeight: '1.4'
            }}>
              Low: Conservative position sizing<br />
              Medium: Balanced risk-reward approach<br />
              High: Aggressive position sizing for higher potential returns
            </p>
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
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
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
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              rows={3}
              placeholder="Any additional notes or considerations..."
            />
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
                background: isSubmitting ? 'var(--disabled-bg)' : 'var(--accent-color)',
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
                if (!isSubmitting) e.currentTarget.style.background = 'var(--accent-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = 'var(--accent-color)';
              }}
            >
              <FiSave style={{ width: '16px', height: '16px' }} />
              {isSubmitting ? 'Creating...' : 'Create Model'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}