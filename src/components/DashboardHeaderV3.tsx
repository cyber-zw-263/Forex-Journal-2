'use client';

import React, { useState } from 'react';
import { FiBell, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import QuickAddTradeForm from './QuickAddTradeForm';

export default function DashboardHeaderV3() {
  const [showAddTrade, setShowAddTrade] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
        role="banner"
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
            Young Money FX
          </h1>
          <span style={{fontSize: '13px', color: 'var(--neutral-color)'}}>
            Trading Journal
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
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
            aria-label="Notifications"
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
            aria-label="Settings"
          >
            <FiSettings size={16} />
          </button>

          <button
            onClick={toggleTheme}
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
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <button
            onClick={() => setShowAddTrade(true)}
            style={{
              background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            + Add Trade
          </button>
        </div>
      </header>

      {showAddTrade && (
        <QuickAddTradeForm
          onClose={() => setShowAddTrade(false)}
          onTradeAdded={() => setShowAddTrade(false)}
        />
      )}
    </>
  );
}
