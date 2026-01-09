'use client';

import React, { useState, useEffect } from 'react';
import DashboardHeaderV3 from './DashboardHeaderV3';
import IconSidebar from './IconSidebar';
import { useTheme } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const OnboardingModal = dynamic(() => import('./OnboardingModal'), { ssr: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
    }}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-3 py-1 rounded z-50" 
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
        width: '100%',
      }}>
        <DashboardHeaderV3 />
        
        <main 
          id="main-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '20px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
          }}
          role="main"
        >
          {children}
        </main>
        
        <OnboardingModal />
      </div>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--card-bg)',
            color: 'var(--foreground)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
}
