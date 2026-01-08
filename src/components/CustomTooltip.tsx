import React from 'react';

interface ChartPayloadItem {
  dataKey?: string;
  value?: unknown;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: string | number;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const equityItem = payload.find((p) => p.dataKey === 'equity') || payload[0];
  const drawdownItem = payload.find((p) => p.dataKey === 'drawdown');
  return (
    <div className="bg-gray-900 p-2 rounded text-sm text-white">
      <div className="font-bold">{label}</div>
      {equityItem && <div>Equity: <span className="font-mono">{String(equityItem.value)}</span></div>}
      {drawdownItem && <div>Drawdown: <span className="font-mono">{String(drawdownItem.value)}</span></div>}
    </div>
  );
}
