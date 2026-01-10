'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSave, FiBookOpen } from 'react-icons/fi';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

interface CreateRuleModalProps {
  strategyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = ['entry', 'exit', 'risk', 'discipline'];
const SEVERITIES = ['low', 'medium', 'high', 'critical'];

export default function CreateRuleModal({ strategyId, onClose, onSuccess }: CreateRuleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'entry',
    severity: 'medium',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Name and description are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/strategies/${strategyId}/rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          severity: formData.severity,
          isActive: formData.isActive,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create rule');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating rule:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create rule');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'entry': return 'Rules for when and how to enter trades';
      case 'exit': return 'Rules for when and how to exit trades';
      case 'risk': return 'Rules for position sizing and risk management';
      case 'discipline': return 'Rules for maintaining trading discipline';
      default: return '';
    }
  };

  const getSeverityDescription = (severity: string) => {
    switch (severity) {
      case 'low': return 'Minor rule, occasional violations acceptable';
      case 'medium': return 'Important rule, violations should be rare';
      case 'high': return 'Critical rule, strict adherence required';
      case 'critical': return 'Essential rule, never break under any circumstances';
      default: return '';
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
              background: '#dc2626',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiBookOpen style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: '0'
            }}>
              Create Strategy Rule
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
              Rule Name *
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
              onFocus={(e) => e.currentTarget.style.borderColor = '#dc2626'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              placeholder="e.g., Never risk more than 2% per trade"
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
              Rule Description *
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
              onFocus={(e) => e.currentTarget.style.borderColor = '#dc2626'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              rows={4}
              placeholder="Describe the rule in detail and explain why it's important..."
              required
            />
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginTop: '4px'
            }}>
              Be specific about what the rule requires and the consequences of breaking it.
            </p>
          </div>

          {/* Category */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {CATEGORIES.map((category) => (
                <label key={category} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <span style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '8px',
                    border: formData.category === category ? '2px solid #dc2626' : '2px solid var(--border)',
                    background: formData.category === category ? '#dc2626' : 'var(--card-bg)',
                    color: formData.category === category ? 'white' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      marginBottom: '4px'
                    }}>
                      {category}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      opacity: formData.category === category ? 0.9 : 0.7
                    }}>
                      {getCategoryDescription(category)}
                    </div>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Severity Level
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SEVERITIES.map((severity) => (
                <label key={severity} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="severity"
                    value={severity}
                    checked={formData.severity === severity}
                    onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <span style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '8px',
                    border: formData.severity === severity ? '2px solid #dc2626' : '2px solid var(--border)',
                    background: formData.severity === severity ? '#dc2626' : 'var(--card-bg)',
                    color: formData.severity === severity ? 'white' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'space-between', width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '500',
                          textTransform: 'capitalize',
                          marginBottom: '4px'
                        }}>
                          {severity}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          opacity: formData.severity === severity ? 0.9 : 0.7
                        }}>
                          {getSeverityDescription(severity)}
                        </div>
                      </div>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: severity === 'critical' ? '#f87171' :
                                   severity === 'high' ? '#fb923c' :
                                   severity === 'medium' ? '#fbbf24' :
                                   '#4ade80',
                        marginLeft: '12px'
                      }} />
                    </div>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                style={{
                  marginRight: '8px',
                  accentColor: '#dc2626'
                }}
              />
              <span style={{
                fontSize: '14px',
                color: 'var(--text-primary)'
              }}>
                Rule is active and should be enforced
              </span>
            </label>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              marginTop: '4px',
              marginLeft: '24px'
            }}>
              Inactive rules are kept for reference but won't trigger violations.
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
                background: isSubmitting ? 'var(--disabled-bg)' : '#dc2626',
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
                if (!isSubmitting) e.currentTarget.style.background = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.background = '#dc2626';
              }}
            >
              <FiSave style={{ width: '16px', height: '16px' }} />
              {isSubmitting ? 'Creating...' : 'Create Rule'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}