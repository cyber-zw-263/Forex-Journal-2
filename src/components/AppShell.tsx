'use client';

import React from 'react';
import DashboardHeader from './DashboardHeaderV2';
import IconSidebar from './IconSidebar';
import { useTheme } from '@/context/ThemeContext';

import dynamic from 'next/dynamic';
import UIFixes from './UIFixes';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const OnboardingModal = dynamic(() => import('./OnboardingModal'), { ssr: false });

  return (
    <div className="min-h-screen flex bg-transparent"> 
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-3 py-1 rounded" aria-label="Skip to main content">Skip to content</a>
      <IconSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-6 max-w-7xl">{children}</main>
        <OnboardingModal />
      </div>
    </div>
  );
}
