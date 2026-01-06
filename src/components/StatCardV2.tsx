'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: 'purple' | 'green' | 'red' | 'blue';
  trend?: { value: number; direction: 'up' | 'down' };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = 'purple',
  trend,
}: StatCardProps) {
  const colorMap = {
    purple: { bg: 'var(--purple-darker)', accent: 'var(--purple-light)' },
    green: { bg: 'rgba(16, 185, 129, 0.1)', accent: 'var(--win-color)' },
    red: { bg: 'rgba(239, 68, 68, 0.1)', accent: 'var(--loss-color)' },
    blue: { bg: 'rgba(59, 130, 246, 0.1)', accent: 'var(--blue-accent)' },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: `1px solid var(--card-border)`,
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.accent;
        e.currentTarget.style.boxShadow = `0 8px 32px ${colors.accent}33`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--card-border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--neutral-color)',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '600',
            }}
          >
            {title}
          </p>

          <h3
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0 0 4px 0',
              background: color === 'purple' ? 'linear-gradient(135deg, var(--purple-light) 0%, var(--cyan-accent) 100%)' : 'inherit',
              WebkitBackgroundClip: color === 'purple' ? 'text' : 'unset',
              WebkitTextFillColor: color === 'purple' ? 'transparent' : 'inherit',
              backgroundClip: color === 'purple' ? 'text' : 'unset',
              color: color === 'purple' ? 'inherit' : colors.accent,
            }}
          >
            {value}
          </h3>

          {subtitle && (
            <p
              style={{
                fontSize: '12px',
                color: 'var(--neutral-color)',
                margin: '0',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: colors.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.accent,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: trend.direction === 'up' ? 'var(--win-color)' : 'var(--loss-color)',
          }}
        >
          <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}% from last month</span>
        </div>
      )}
    </motion.div>
  );
}
