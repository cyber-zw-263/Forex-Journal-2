'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface CreateStrategyModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const MARKET_TYPES = ['bull', 'bear', 'mixed'];
const SESSIONS = ['London', 'New York', 'Tokyo', 'Sydney', 'Asian', 'European', 'American'];

export default function CreateStrategyModal({ onClose, onSuccess }: CreateStrategyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    marketType: 'mixed',
    preferredSessions: [] as string[],
    riskPhilosophy: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Strategy name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/strategies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          marketType: formData.marketType,
          preferredSessions: formData.preferredSessions.length > 0 ? formData.preferredSessions : undefined,
          riskPhilosophy: formData.riskPhilosophy.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create strategy');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating strategy:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create strategy');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSession = (session: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSessions: prev.preferredSessions.includes(session)
        ? prev.preferredSessions.filter(s => s !== session)
        : [...prev.preferredSessions, session],
    }));
  };

  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '512px',
          width: '100%',
          margin: '0 16px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid var(--card-border)',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Create New Strategy
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--panel-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'grid', gap: '20px' }}>
          {/* Name */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Strategy Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--card-border)',
                backgroundColor: 'var(--panel-muted)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--purple-base)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
              }}
              placeholder="e.g., London Breakout Strategy"
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
              marginBottom: '8px',
            }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--card-border)',
                backgroundColor: 'var(--panel-muted)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--purple-base)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
              }}
              rows={3}
              placeholder="Describe your strategy approach and methodology..."
            />
          </div>

          {/* Market Type */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              Market Type
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {MARKET_TYPES.map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="marketType"
                    value={type}
                    checked={formData.marketType === type}
                    onChange={(e) => setFormData(prev => ({ ...prev, marketType: e.target.value }))}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1px solid ${formData.marketType === type ? 'var(--purple-base)' : 'var(--card-border)'}`,
                    backgroundColor: formData.marketType === type ? 'var(--purple-base)' : 'var(--panel-muted)',
                    color: formData.marketType === type ? 'white' : 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize',
                  }}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Sessions */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              Preferred Trading Sessions
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '8px',
            }}>
              {SESSIONS.map((session) => (
                <label key={session} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${formData.preferredSessions.includes(session) ? 'var(--purple-base)' : 'var(--card-border)'}`,
                  backgroundColor: formData.preferredSessions.includes(session) ? 'var(--panel-muted)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}>
                  <input
                    type="checkbox"
                    checked={formData.preferredSessions.includes(session)}
                    onChange={() => toggleSession(session)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      border: '1px solid var(--card-border)',
                      backgroundColor: formData.preferredSessions.includes(session) ? 'var(--purple-base)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                  }}>
                    {session}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Risk Philosophy */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Risk Philosophy
            </label>
            <textarea
              value={formData.riskPhilosophy}
              onChange={(e) => setFormData(prev => ({ ...prev, riskPhilosophy: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--card-border)',
                backgroundColor: 'var(--panel-muted)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--purple-base)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
              }}
              rows={3}
              placeholder="Describe your risk management approach..."
            />
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--card-border)',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--panel-muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              disabled={isSubmitting}
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
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                color: 'white',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiSave size={16} />
              {isSubmitting ? 'Creating...' : 'Create Strategy'}
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}