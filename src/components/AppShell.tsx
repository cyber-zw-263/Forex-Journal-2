'use client';

import React from 'react';
import DashboardHeaderV3 from './DashboardHeaderV3';
import IconSidebar from './IconSidebar';
import { useTheme } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const OnboardingModal = dynamic(() => import('./OnboardingModal'), { ssr: false });

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
    }}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-3 py-1 rounded" 
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
      
      <IconSidebar />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
      }}>
        <DashboardHeaderV3 />
        
        <main 
          id="main-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {children}
        </main>
        
        <OnboardingModal />
      </div>
    </div>
  );
}
