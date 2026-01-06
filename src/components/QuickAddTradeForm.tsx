'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

interface QuickAddTradeFormProps {
  onTradeAdded: () => void;
}

export default function QuickAddTradeForm({ onTradeAdded }: QuickAddTradeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    pair: 'EUR/USD',
    direction: 'LONG',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    entryTime: new Date().toISOString().slice(0, 16),
    exitTime: '',
    outcome: 'WIN',
    strategy: '',
    emotionalState: 'calm',
    setupQuality: '3',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const profitLoss =
        formData.exitPrice && formData.entryPrice && formData.quantity
          ? (parseFloat(formData.exitPrice) - parseFloat(formData.entryPrice)) *
            parseFloat(formData.quantity)
          : undefined;

      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user',
        },
        body: JSON.stringify({
          ...formData,
          profitLoss,
          entryPrice: parseFloat(formData.entryPrice),
          exitPrice: formData.exitPrice ? parseFloat(formData.exitPrice) : null,
          quantity: parseFloat(formData.quantity),
          setupQuality: parseInt(formData.setupQuality),
        }),
      });

      if (response.ok) {
        toast.success('Trade added successfully!');
        setFormData({
          pair: 'EUR/USD',
          direction: 'LONG',
          entryPrice: '',
          exitPrice: '',
          quantity: '',
          entryTime: new Date().toISOString().slice(0, 16),
          exitTime: '',
          outcome: 'WIN',
          strategy: '',
          emotionalState: 'calm',
          setupQuality: '3',
          notes: '',
        });
        setIsOpen(false);
        onTradeAdded();
      }
    } catch (error) {
      toast.error('Failed to add trade');
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Add Trade</h2>

      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add New Trade
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pair & Direction */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Pair
              </label>
              <select
                name="pair"
                value={formData.pair}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>EUR/USD</option>
                <option>GBP/USD</option>
                <option>USD/JPY</option>
                <option>AUD/USD</option>
                <option>USD/CAD</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Direction
              </label>
              <select
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>LONG</option>
                <option>SHORT</option>
              </select>
            </div>
          </div>

          {/* Entry & Exit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Entry Price
              </label>
              <input
                type="number"
                name="entryPrice"
                step="0.00001"
                placeholder="1.0850"
                value={formData.entryPrice}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Exit Price
              </label>
              <input
                type="number"
                name="exitPrice"
                step="0.00001"
                placeholder="1.0865"
                value={formData.exitPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Quantity (Lots)
            </label>
            <input
              type="number"
              name="quantity"
              step="0.01"
              placeholder="1.0"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Strategy & Emotional State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Strategy
              </label>
              <input
                type="text"
                name="strategy"
                placeholder="Breakout, Scalp"
                value={formData.strategy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                State
              </label>
              <select
                name="emotionalState"
                value={formData.emotionalState}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>calm</option>
                <option>rushed</option>
                <option>frustrated</option>
                <option>confident</option>
              </select>
            </div>
          </div>

          {/* Outcome & Quality */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Outcome
              </label>
              <select
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>WIN</option>
                <option>LOSS</option>
                <option>BREAKEVEN</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Setup Quality
              </label>
              <select
                name="setupQuality"
                value={formData.setupQuality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Trade notes..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Save Trade
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
