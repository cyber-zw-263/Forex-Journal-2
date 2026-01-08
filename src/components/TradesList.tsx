"use client";

import { useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Trade {
  id: string;
  pair: string;
  direction: string;
  entryPrice: number;
  exitPrice?: number;
  profitLoss?: number;
  outcome?: string;
  entryTime: string;
  strategy?: string;
  setupQuality?: number;
  notes?: string;
}

interface TradesListProps {
  trades: Trade[];
  isLoading: boolean;
  onTradeDeleted: () => void;
  onEdit?: (trade: Trade) => void;
}

export default function TradesList({ trades, isLoading, onTradeDeleted, onEdit }: TradesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const confirmDelete = (id: string) => setDeletingId(id);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/trades/${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': 'demo-user',
        },
      });

      if (response.ok) {
        toast.success('Trade deleted');
        setDeletingId(null);
        onTradeDeleted();
      } else {
        toast.error('Failed to delete trade');
      }
    } catch (error) {
      toast.error('Failed to delete trade');
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700">
        <div className="flex justify-center">
          <div className="animate-spin">⏳</div>
        </div>
      </div>
    );
  }

  if (!trades.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700 text-center">
        <p className="text-gray-500 dark:text-gray-400">No trades recorded yet. Add your first trade to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Trades</h2>

      <div className="space-y-3">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {trade.pair}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.direction === 'LONG'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {trade.direction}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.outcome === 'WIN'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : trade.outcome === 'LOSS'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {trade.outcome || 'Open'}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Entry Price</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{trade.entryPrice.toFixed(5)}</p>
                  </div>
                  {trade.exitPrice && (
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Exit Price</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{trade.exitPrice.toFixed(5)}</p>
                    </div>
                  )}
                  {trade.profitLoss !== undefined && (
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">P&L</p>
                      <p className={`font-semibold ${trade.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(trade.entryTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {trade.strategy && (
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Strategy: <span className="font-semibold">{trade.strategy}</span>
                  </p>
                )}

                {trade.notes && (
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {trade.notes}
                  </p>
                )}

                {trade.setupQuality && (
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Quality: {['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'][trade.setupQuality - 1]}
                  </p>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => typeof onEdit === 'function' ? onEdit(trade) : null}
                  className="p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700/30 transition-colors"
                  title="Edit trade"
                  aria-label={`Edit ${trade.pair} trade`}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(trade.id)}
                  className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  title="Delete trade"
                  aria-label={`Delete ${trade.pair} trade`}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation modal */}
      {deletingId && (
        <div role="dialog" aria-modal="true" aria-label="Confirm delete" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setDeletingId(null)} />
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 z-10 border border-gray-200 dark:border-slate-700" style={{ width: '100%', maxWidth: 420 }}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete trade?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">This action cannot be undone. Are you sure you want to delete this trade?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded bg-transparent border border-gray-300">Cancel</button>
              <button onClick={() => handleDelete(deletingId)} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
