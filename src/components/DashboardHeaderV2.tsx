'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardHeaderV2() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-800 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
            <div className="w-10 h-10 rounded-lg grad-text flex items-center justify-center text-2xl font-bold">YM</div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Young Money</h1>
                <span className="text-xs text-gray-400 breadcrumb">Trading Journal</span>
              </div>
              <p className="text-xs text-gray-400">Trading Journal & Portfolio</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/analytics" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Analytics</Link>
              <Link href="/calendar" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Calendar</Link>
              <Link href="/planning" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Planning</Link>
              <Link href="/insights" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Insights</Link>
              <Link href="/review" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Review</Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="breadcrumb text-sm hidden sm:block text-gray-400">Dashboard / Overview</div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex gap-3 mt-4 flex-wrap">
          <Link href="/" className="text-xs font-medium text-gray-200 hover:text-white bg-transparent px-3 py-1 rounded">Dashboard</Link>
          <Link href="/analytics" className="text-xs font-medium text-gray-200 hover:text-white bg-transparent px-3 py-1 rounded">Analytics</Link>
          <Link href="/calendar" className="text-xs font-medium text-gray-200 hover:text-white bg-transparent px-3 py-1 rounded">Calendar</Link>
          <Link href="/planning" className="text-xs font-medium text-gray-200 hover:text-white bg-transparent px-3 py-1 rounded">Planning</Link>
          <Link href="/insights" className="text-xs font-medium text-gray-200 hover:text-white bg-transparent px-3 py-1 rounded">Insights</Link>
          <Link href="/review" className="text-xs font-medium text-gray-200 hover:text-white bg-transparent px-3 py-1 rounded">Review</Link>
        </nav>
      </div>
    </header>
  );
}
