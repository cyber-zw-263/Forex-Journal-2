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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader onThemeToggle={toggleTheme} currentTheme={theme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trading Journal
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your mental state, trading phases, and personal growth journey
          </p>
        </div>

        {/* Tab Navigation */}
        <AnimatedCard className="p-1 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </AnimatedCard>

        {activeTab === 'entries' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar/Date Selector */}
            <div className="lg:col-span-1">
              <AnimatedCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Date
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedDate(new Date().toISOString().split('T')[0]);
                      setEditingEntry(null);
                      setShowEntryForm(false);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                {/* Quick Stats */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Entries</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{entries.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {entries.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
                    <span className="font-semibold text-green-600">7 days</span>
                  </div>
                </div>
              </AnimatedCard>

              {/* Mental State Overview */}
              <MentalStateTracker entries={entries} className="mt-6" />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Search and Filters */}
              <AnimatedCard className="p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search entries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <select
                    value={filterPhase}
                    onChange={(e) => setFilterPhase(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">All Phases</option>
                    <option value="learning">Learning</option>
                    <option value="discipline">Discipline</option>
                    <option value="consistency">Consistency</option>
                    <option value="optimization">Optimization</option>
                  </select>
                </div>
              </AnimatedCard>

              {/* Entry Content */}
              {selectedDateEntry || showEntryForm ? (
                <JournalEntryForm
                  date={selectedDate}
                  existingEntry={editingEntry || selectedDateEntry}
                  onSave={handleEntrySaved}
                  onCancel={() => {
                    setShowEntryForm(false);
                    setEditingEntry(null);
                  }}
                />
              ) : (
                <AnimatedCard className="p-8 text-center">
                  <FiBookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Entry for {new Date(selectedDate).toLocaleDateString()}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start your daily reflection to track your trading journey
                  </p>
                  <button
                    onClick={() => setShowEntryForm(true)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Create Entry</span>
                  </button>
                </AnimatedCard>
              )}

              {/* Recent Entries List */}
              <AnimatedCard className="p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Entries ({filteredEntries.length})
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                  ) : filteredEntries.length > 0 ? (
                    filteredEntries.slice(0, 10).map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => handleEditEntry(entry)}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {entry.phase && `${entry.phase} • `}
                            {entry.mentalState && `Feeling: ${entry.mentalState}`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {entry.confidence && (
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {entry.confidence}/10
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEntry(entry.id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No entries found
                    </p>
                  )}
                </div>
              </AnimatedCard>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <JournalAnalytics entries={entries} />
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}