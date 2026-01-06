'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
/* Header provided by AppShell */
import QuickAddTradeForm from '@/components/QuickAddTradeForm';
import PerformanceOverview from '@/components/PerformanceOverviewV2';
import TradesList from '@/components/TradesList';
import ExportButton from '@/components/ExportButton';
import { Toaster } from 'react-hot-toast';

function DashboardContent() {
  const { theme, toggleTheme } = useTheme();
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrades = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/trades', {
        headers: {
          'x-user-id': 'demo-user',
        },
      });
      const data = await response.json();
      setTrades(data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200">
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Export Buttons */}
        <div className="flex gap-2 mb-6">
          <ExportButton trades={trades} format="csv" />
          <ExportButton trades={trades} format="json" />
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <PerformanceOverview trades={trades} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Add Form */}
          <div className="lg:col-span-1">
            <QuickAddTradeForm onTradeAdded={fetchTrades} />
          </div>

          {/* Trades List */}
          <div className="lg:col-span-2">
            <TradesList trades={trades} isLoading={isLoading} onTradeDeleted={fetchTrades} />
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-slate-950" />;
  }

  return <DashboardContent />;
}
