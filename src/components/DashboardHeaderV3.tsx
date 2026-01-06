'use client';

import React, { useState } from 'react';
import { FiBell, FiSettings, FiMenu } from 'react-icons/fi';
import QuickAddTradeForm from './QuickAddTradeForm';

export default function DashboardHeader() {
  const [showAddTrade, setShowAddTrade] = useState(false);

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--card-border)',
          backgroundColor: 'var(--card-bg)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, var(--purple-light) 0%, var(--cyan-accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            Young Money FX
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={() => setShowAddTrade(true)}
            style={{
              background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            }}
          >
            + Add Trade
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--purple-base)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FiBell size={20} />
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--purple-base)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FiSettings size={20} />
          </button>
        </div>
      </header>

      {showAddTrade && (
        <QuickAddTradeForm onClose={() => setShowAddTrade(false)} />
      )}
    </>
  );
}
