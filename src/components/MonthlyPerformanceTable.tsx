'use client';

import { useState, useMemo } from 'react';

interface Trade { entryTime: string; profitLoss?: number; pair?: string }

export default function MonthlyPerformanceTable({ trades }: { trades: Trade[] }) {
  const months = useMemo(() => {
    const map: Record<string, { pnl: number; trades: Trade[] }> = {};
    trades.forEach(t => {
      const d = new Date(t.entryTime);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!map[key]) map[key] = { pnl: 0, trades: [] };
      map[key].pnl += t.profitLoss || 0;
      map[key].trades.push(t);
    });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  }, [trades]);

  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="card-glass p-4 rounded-lg">
      <h3 className="text-lg font-bold text-gray-200 mb-4">Monthly Performance</h3>
      <div className="space-y-2">
        {months.map(([month, data]) => (
          <div key={month} className="border border-transparent hover:border-gray-700 rounded-lg p-2">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(prev => ({ ...prev, [month]: !prev[month] }))}>
              <div>
                <div className="text-sm text-gray-300 font-medium">{month}</div>
                <div className="text-xs text-gray-400">{data.trades.length} trades</div>
              </div>
              <div className={`text-lg font-bold ${data.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>{data.pnl.toFixed(2)}</div>
            </div>
            {open[month] && (
              <div className="mt-2 text-sm text-gray-300">
                {data.trades.map((t, i) => (
                  <div key={i} className="py-1 border-t border-gray-800">{new Date(t.entryTime).toLocaleString()} — {t.pair} — {t.profitLoss}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
