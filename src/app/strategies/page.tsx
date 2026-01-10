'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSettings, FiTarget, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import StrategyCard from '@/components/StrategyCard';
import CreateStrategyModal from '@/components/CreateStrategyModal';
import toast from 'react-hot-toast';

interface Strategy {
  id: string;
  name: string;
  description?: string;
  marketType: string;
  preferredSessions?: string[];
  riskPhilosophy?: string;
  entryModels: any[];
  timeframeSequences: any[];
  rules: any[];
  createdAt: string;
  updatedAt: string;
}

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchStrategies = async () => {
    try {
      const response = await fetch('/api/strategies');
      if (!response.ok) throw new Error('Failed to fetch strategies');
      const data = await response.json();
      setStrategies(data);
    } catch (error) {
      console.error('Error fetching strategies:', error);
      toast.error('Failed to load strategies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  const handleStrategyCreated = () => {
    setShowCreateModal(false);
    fetchStrategies();
    toast.success('Strategy created successfully');
  };

  const handleStrategyDeleted = (strategyId: string) => {
    setStrategies(prev => prev.filter(s => s.id !== strategyId));
    toast.success('Strategy deleted successfully');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', margin: 0 }}>
            Trading Strategies
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            Manage your trading strategies, entry models, and rules
          </p>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {strategies.length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Strategies</div>
          </div>
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {strategies.filter(s => s.marketType === 'forex').length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Forex Strategies</div>
          </div>
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {strategies.filter(s => s.marketType === 'crypto').length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Crypto Strategies</div>
          </div>
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {strategies.reduce((sum, s) => sum + (s.entryModels?.length || 0), 0)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Entry Models</div>
          </div>
        </div>

        {/* Header with Create Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
              Your Strategies
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Create and manage your trading strategies
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
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
            <FiPlus size={16} />
            New Strategy
          </button>
        </div>

        {/* Strategies Grid */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', height: '200px' }}>
                <div style={{ height: '20px', backgroundColor: 'var(--panel-muted)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '16px', backgroundColor: 'var(--panel-muted)', borderRadius: '4px', width: '80%', marginBottom: '8px', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '16px', backgroundColor: 'var(--panel-muted)', borderRadius: '4px', width: '60%', animation: 'pulse 2s infinite' }} />
              </div>
            ))}
          </div>
        ) : strategies.length === 0 ? (
          <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              No Strategies Yet
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Create your first trading strategy to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Create Your First Strategy
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                onDelete={handleStrategyDeleted}
                onUpdate={fetchStrategies}
              />
            ))}
          </div>
        )}

        {/* Create Strategy Modal */}
        {showCreateModal && (
          <CreateStrategyModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={handleStrategyCreated}
          />
        )}
      </main>
    </div>
  );
}