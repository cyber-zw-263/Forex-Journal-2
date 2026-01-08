import React from 'react';

interface WinGaugeProps {
  value?: number;
}

export function WinGauge({ value = 0 }: WinGaugeProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  return (
    <svg width="84" height="84" viewBox="0 0 84 84">
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <g transform="translate(42,42)">
        <circle r={radius} stroke="#1f2937" strokeWidth="12" fill="none" opacity="0.2" />
        <circle r={radius} stroke="url(#g1)" strokeWidth="12" strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${circumference - dash}`} transform="rotate(-90)" />
        <text x="0" y="6" fill="#e6e6e6" fontSize="16" fontWeight="700" textAnchor="middle">{value}%</text>
      </g>
    </svg>
  );
}
