'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCardV2 from '@/components/StatCardV2';
import QuickAddTradeForm from '@/components/QuickAddTradeForm';
import TradesList from '@/components/TradesList';
import TradeSearch from '@/components/TradeSearch';
import Pagination from '@/components/Pagination';
import { usePagination } from '@/lib/usePagination';
import { FiDollarSign, FiTrendingUp, FiTarget, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCardSkeleton, ChartSkeleton } from '@/components/SkeletonLoader';
import toast from 'react-hot-toast';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number;
  profitLoss?: number;
  outcome?: string;
  emotionalState?: string;
  strategy?: string;
  account?: string;
  entryTime: string;
  setupQuality?: number;
}

export default function DashboardPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Trade[]>([]);
  const [metrics, setMetrics] = useState({
    totalPnL: 0,
    winRate: 0,
    totalTrades: 0,
    closedTrades: 0,
    avgWin: 0,
    avgLoss: 0,
    wins: 0,
    losses: 0,
    bestDay: 0,
    worstDay: 0,
  });

  // Filter trades based on search
  const filteredTrades = searchResults.length > 0 ? searchResults : trades;
  
  // Pagination
  const itemsPerPage = 10;
  const pagination = usePagination(filteredTrades, { pageSize: itemsPerPage });
  const paginatedTrades = pagination.paginatedItems;

  const fetchTrades = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/trades', {
        headers: { 'x-user-id': 'demo-user' },
      });

      if (!response.ok) {
        // If the API returned an error, try to parse the body for details, but don't assume it's an array
        let errBody: unknown = null;
        try { errBody = await response.json(); } catch (e) { errBody = await response.text(); }
        console.error('Failed to fetch trades:', response.status, errBody);
        setError('Failed to fetch trades. Please try again.');
        setTrades([]);
        setMetrics({
          totalPnL: 0,
          winRate: 0,
          totalTrades: 0,
          closedTrades: 0,
          avgWin: 0,
          avgLoss: 0,
          wins: 0,
          losses: 0,
          bestDay: 0,
          worstDay: 0,
        });
        return;
      }

      const data: unknown = await response.json();
      if (!Array.isArray(data)) {
        console.warn('Unexpected trades payload, expected array but got:', data);
        setError('Unexpected data format received');
        setTrades([]);
        setMetrics({
          totalPnL: 0,
          winRate: 0,
          totalTrades: 0,
          closedTrades: 0,
          avgWin: 0,
          avgLoss: 0,
          wins: 0,
          losses: 0,
          bestDay: 0,
          worstDay: 0,
        });
        return;
      }

      const tradesData: Trade[] = data;
      setTrades(tradesData);

      // Calculate metrics
      const closed = tradesData.filter(t => t.outcome && t.outcome !== 'OPEN');
      const wins = closed.filter(t => t.outcome === 'WIN').length;
      const losses = closed.filter(t => t.outcome === 'LOSS').length;
      const totalPnL = tradesData.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
      const avgWin = wins > 0 ? tradesData.filter(t => t.outcome === 'WIN' && t.profitLoss).reduce((sum, t) => sum + t.profitLoss!, 0) / wins : 0;
      const avgLoss = losses > 0 ? Math.abs(tradesData.filter(t => t.outcome === 'LOSS' && t.profitLoss).reduce((sum, t) => sum + t.profitLoss!, 0) / losses) : 0;

      setMetrics({
        totalPnL: parseFloat(totalPnL.toFixed(2)),
        winRate: closed.length > 0 ? parseFloat(((wins / closed.length) * 100).toFixed(2)) : 0,
        totalTrades: tradesData.length,
        closedTrades: closed.length,
        avgWin: parseFloat(avgWin.toFixed(2)),
        avgLoss: parseFloat(avgLoss.toFixed(2)),
        wins,
        losses,
        bestDay: totalPnL,
        worstDay: -totalPnL,
      });
    } catch (error) {
      console.error('Error fetching trades:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // Modal state for adding/editing trades
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

  const handleOpenNew = () => {
    setEditingTrade(null);
    setShowTradeModal(true);
  };

  const handleEdit = (trade: Trade) => {
    setEditingTrade(trade);
    setShowTradeModal(true);
  };

  const handleExport = async () => {
    try {
      const toastId = toast.loading('Exporting trades...');
      
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          format: 'csv', // or 'pdf'
          trades,
          metrics,
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `trades-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Trades exported successfully!', { id: toastId });
    } catch (err) {
      console.error('Export error:', err);
      toast.error('Failed to export trades');
    }
  };

  // Prepare chart data
  const equityCurveData = trades
    .sort((a, b) => new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime())
    .reduce((acc, trade, idx) => {
      const equity = acc.length > 0 ? acc[acc.length - 1].equity + (trade.profitLoss || 0) : (trade.profitLoss || 0);
      return [...acc, {
        name: `Trade ${idx + 1}`,
        equity: parseFloat(equity.toFixed(2)),
        date: new Date(trade.entryTime).toLocaleDateString(),
      }];
    }, [] as { name: string; equity: number; date: string }[]);

  const winDistribution = [
    { name: 'Wins', value: metrics.wins, color: 'var(--win-color)' },
    { name: 'Losses', value: metrics.losses, color: 'var(--loss-color)' },
  ];

  const pairPerformance = trades
    .reduce((acc, trade) => {
      const existing = acc.find(p => p.pair === trade.pair);
      if (existing) {
        existing.pnl += trade.profitLoss || 0;
      } else {
        acc.push({ pair: trade.pair, pnl: trade.profitLoss || 0 });
      }
      return acc;
    }, [] as { pair: string; pnl: number }[])
    .sort((a, b) => b.pnl - a.pnl)
    .slice(0, 5);

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginBottom: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: 'var(--foreground)',
          }}
        >
          Trading Dashboard
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--neutral-color)',
            margin: 0,
          }}
        >
          Your complete trading journal and performance analytics
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--loss-color)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            color: 'var(--loss-color)',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--loss-color)',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Refresh Button */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={fetchTrades}
          disabled={isLoading}
          style={{
            background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          aria-label={isLoading ? 'Loading trades' : 'Refresh trades data'}
        >
          <FiRefreshCw size={16} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
          {isLoading ? 'Loading...' : 'Refresh Data'}
        </button>
        <button
          onClick={handleExport}
          disabled={trades.length === 0}
          style={{
            marginLeft: '12px',
            background: 'transparent',
            color: 'var(--foreground)',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid var(--card-border)',
            cursor: trades.length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            opacity: trades.length === 0 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            if (trades.length > 0) {
              e.currentTarget.style.borderColor = 'var(--purple-base)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--card-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          aria-label="Export trades as CSV"
        >
          <FiDownload size={16} />
          Export
        </button>
        <button
          onClick={handleOpenNew}
          style={{
            marginLeft: '12px',
            background: 'transparent',
            color: 'var(--foreground)',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid var(--card-border)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--purple-base)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--card-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          + Add Trade
        </button>
      </div>

      {/* Loading State */}
      {isLoading && trades.length === 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        /* Key Metrics Cards */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
        <StatCardV2
          title="Total P&L"
          value={`$${metrics.totalPnL}`}
          color={metrics.totalPnL >= 0 ? 'green' : 'red'}
          subtitle={`${metrics.closedTrades} closed trades`}
          icon={<FiDollarSign size={24} />}
          trend={{
            value: 12.5,
            direction: metrics.totalPnL >= 0 ? 'up' : 'down',
          }}
        />

        <StatCardV2
          title="Win Rate"
          value={`${metrics.winRate}%`}
          color="blue"
          subtitle={`${metrics.wins}W / ${metrics.losses}L`}
          icon={<FiTrendingUp size={24} />}
        />

        <StatCardV2
          title="Avg Win / Loss"
          value={`$${metrics.avgWin} / $${metrics.avgLoss}`}
          color="purple"
          subtitle="Risk-Reward Ratio"
          icon={<FiTarget size={24} />}
        />

        <StatCardV2
          title="Total Trades"
          value={metrics.totalTrades}
          color="blue"
          subtitle={`${metrics.closedTrades} closed`}
        />
      </div>
      )}

      {/* Trades List */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
          Recent Trades {filteredTrades.length > 0 && `(${filteredTrades.length})`}
        </h2>
        
        {/* Search Component */}
        <TradeSearch onSearch={(results) => setSearchResults(results)} trades={trades} />
        
        {/* Trades List */}
        <TradesList trades={paginatedTrades} isLoading={isLoading} onTradeDeleted={fetchTrades} onEdit={handleEdit} />
        
        {/* Pagination */}
        {filteredTrades.length > itemsPerPage && (
          <div style={{ marginTop: '24px' }}>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.goToPage}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              totalItems={pagination.totalItems}
              pageSize={pagination.pageSize}
            />
          </div>
        )}
        
        {/* No results message */}
        {filteredTrades.length === 0 && !isLoading && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              marginTop: '16px',
            }}
          >
            <p style={{ fontSize: '16px' }}>No trades found. Start by adding your first trade!</p>
          </div>
        )}
      </div>

      {showTradeModal && (
        <QuickAddTradeForm
          onClose={() => setShowTradeModal(false)}
          onTradeAdded={() => { setShowTradeModal(false); fetchTrades(); }}
          initialData={editingTrade || undefined}
        />
      )}

      {/* Charts Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 360px',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Equity Curve (Main) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            minHeight: '360px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '16px',
              color: 'var(--foreground)',
            }}
          >
            Equity Curve
          </h3>
          {equityCurveData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={equityCurveData}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--purple-base)" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="var(--purple-base)" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                <XAxis dataKey="name" stroke="var(--neutral-color)" />
                <YAxis stroke="var(--neutral-color)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card-bg)',
                    border: `1px solid var(--card-border)`,
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="var(--purple-light)"
                  fillOpacity={1}
                  fill="url(#colorEquity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neutral-color)',
              }}
            >
              No trades to display
            </div>
          )}
        </motion.div>

        {/* Right Column: compact cards */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '18px'}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              minHeight: '180px',
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'var(--foreground)',
              }}
            >
              Win Distribution
            </h3>
            {winDistribution.some(w => w.value > 0) ? (
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={winDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {winDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neutral-color)',
                }}
              >
                No closed trades yet
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              minHeight: '200px',
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'var(--foreground)',
              }}
            >
              Top Pairs
            </h3>
            {pairPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={pairPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                  <XAxis dataKey="pair" stroke="var(--neutral-color)" />
                  <YAxis stroke="var(--neutral-color)" />
                  <Bar
                    dataKey="pnl"
                    fill="var(--purple-light)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neutral-color)',
                }}
              >
                No trade data yet
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--neutral-color)', margin: '0 0 8px 0', fontSize: '12px' }}>
            Consecutive Wins
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'var(--win-color)' }}>
            0
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--neutral-color)', margin: '0 0 8px 0', fontSize: '12px' }}>
            Best Day
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'var(--win-color)' }}>
            ${metrics.bestDay}
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--neutral-color)', margin: '0 0 8px 0', fontSize: '12px' }}>
            Worst Day
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'var(--loss-color)' }}>
            ${metrics.worstDay}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
