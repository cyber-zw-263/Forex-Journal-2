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
          padding: '10px 16px',
          borderBottom: '1px solid var(--card-border)',
          backgroundColor: 'transparent',
          minHeight: '56px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--foreground)',
              margin: 0,
            }}
          >
            Backtesting Dashboard
          </h1>
          <span style={{fontSize: '13px', color: 'var(--neutral-color)'}}>
            Performance & calendar overview
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Compact utility icons */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.12)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(139,92,246,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FiBell size={16} />
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.12)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(139,92,246,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FiSettings size={16} />
          </button>

          {/* Small Add fab */}
          <button
            onClick={() => setShowAddTrade(true)}
            aria-label="Add trade"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--purple-base), var(--purple-dark))',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(139,92,246,0.15)'
            }}
          >
            +
          </button>
        </div>
      </header>

      {showAddTrade && (
        <QuickAddTradeForm onClose={() => setShowAddTrade(false)} />
      )}
    </>
  );
}
