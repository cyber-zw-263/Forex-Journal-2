'use client';

import { useTheme } from '@/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import Link from 'next/link';

interface DashboardHeaderProps {
  onThemeToggle: () => void;
  currentTheme: 'dark' | 'light';
}

export default function DashboardHeader({ onThemeToggle, currentTheme }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              📊
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Young Money</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Trading Journal & Portfolio</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Analytics
              </Link>
              <Link href="/calendar" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Calendar
              </Link>
              <Link href="/planning" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Planning
              </Link>
              <Link href="/insights" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Insights
              </Link>
              <Link href="/review" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Review
              </Link>
            </nav>

            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex gap-3 mt-4 flex-wrap">
          <Link href="/" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
            Dashboard
          </Link>
          <Link href="/analytics" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
            Analytics
          </Link>
          <Link href="/calendar" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
            Calendar
          </Link>
          <Link href="/planning" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
            Planning
          </Link>
          <Link href="/insights" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
            Insights
          </Link>
          <Link href="/review" className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">
            Review
          </Link>
        </nav>
      </div>
    </header>
  );
}
