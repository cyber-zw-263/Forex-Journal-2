'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiPlus, FiCalendar, FiTrendingUp, FiSearch, FiFilter } from 'react-icons/fi';
import DashboardHeader from '@/components/DashboardHeader';
import AnimatedCard from '@/components/AnimatedCard';
import MentalStateTracker from '@/components/MentalStateTracker';
import JournalEntryForm from '@/components/JournalEntryForm';
import JournalAnalytics from '@/components/JournalAnalytics';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
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

export default function JournalPage() {
  const { theme, toggleTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [activeTab, setActiveTab] = useState<'entries' | 'analytics'>('entries');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhase, setFilterPhase] = useState<string>('');

  useEffect(() => {
    if (!mounted) return;
    loadEntries();
  }, [mounted]);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/journal', {
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load journal entries');
      }

      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error loading journal entries:', error);
      toast.error('Failed to load journal entries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntrySaved = (entry: JournalEntry) => {
    if (editingEntry) {
      setEntries(prev => prev.map(e => e.id === entry.id ? entry : e));
      setEditingEntry(null);
    } else {
      setEntries(prev => [entry, ...prev]);
    }
    setShowEntryForm(false);
    toast.success('Journal entry saved');
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setSelectedDate(entry.date);
    setShowEntryForm(true);
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) return;

    try {
      const response = await fetch(`/api/journal/${entryId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      setEntries(prev => prev.filter(e => e.id !== entryId));
      toast.success('Journal entry deleted');
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast.error('Failed to delete journal entry');
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm ||
      entry.phaseNotes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.mentalState?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = !filterPhase || entry.phase === filterPhase;

    return matchesSearch && matchesPhase;
  });

  const selectedDateEntry = entries.find(entry => entry.date === selectedDate);

  const tabs = [
    { id: 'entries' as const, label: 'Daily Entries', icon: FiBookOpen },
    { id: 'analytics' as const, label: 'Analytics', icon: FiTrendingUp }
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <DashboardHeader onThemeToggle={toggleTheme} currentTheme={theme} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', margin: 0 }}>
            Trading Journal
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Track your mental state, focus levels, and trading psychology
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? 'var(--purple-base)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'var(--panel-muted)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'entries' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Calendar/Date Selector */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                  Select Date
                </h2>
                <button
                  onClick={() => {
                    setSelectedDate(new Date().toISOString().split('T')[0]);
                    setEditingEntry(null);
                    setShowEntryForm(false);
                  }}
                  style={{
                    fontSize: '12px',
                    color: 'var(--purple-base)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Today
                </button>
              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setEditingEntry(null);
                  setShowEntryForm(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--panel-muted)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                }}
              />

              {/* Quick Stats */}
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ textAlign: 'center', padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {entries.length}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Entries</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {entries.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>This Month</div>
                </div>
              </div>

              {/* Add Entry Button */}
              <button
                onClick={() => setShowEntryForm(true)}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '12px',
                  background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Add Journal Entry
              </button>
            </div>

            {/* Entry Form or Display */}
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
              {showEntryForm ? (
                <JournalEntryForm
                  date={selectedDate}
                  existingEntry={editingEntry}
                  onSave={handleEntrySaved}
                  onCancel={() => {
                    setShowEntryForm(false);
                    setEditingEntry(null);
                  }}
                />
              ) : (
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Journal Entry - {new Date(selectedDate).toLocaleDateString()}
                  </h2>
                  {(() => {
                    const entry = entries.find(e => e.date === selectedDate);
                    return entry ? (
                      <div style={{ display: 'grid', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                          <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Mental State</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{entry.mentalState || 'Not recorded'}</div>
                          </div>
                          <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Focus Level</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{entry.focus || 'Not recorded'}</div>
                          </div>
                          <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Confidence</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{entry.confidence ? `${entry.confidence}/10` : 'Not recorded'}</div>
                          </div>
                        </div>
                        {entry.phase && (
                          <div style={{ padding: '12px', backgroundColor: 'var(--panel-muted)', borderRadius: '6px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Trading Phase</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{entry.phase}</div>
                            {entry.phaseNotes && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{entry.phaseNotes}</div>}
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                          <button
                            onClick={() => handleEditEntry(entry)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: 'var(--purple-base)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                            }}
                          >
                            Edit Entry
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: 'transparent',
                              color: '#ef4444',
                              border: '1px solid #ef4444',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '32px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                          No Journal Entry
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                          Create your first journal entry for {new Date(selectedDate).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => setShowEntryForm(true)}
                          style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                          }}
                        >
                          Create Entry
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px' }}>
            <JournalAnalytics entries={entries} />
          </div>
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}