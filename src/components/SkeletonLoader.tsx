'use client';

import { motion } from 'framer-motion';

export function StatCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          height: '16px',
          backgroundColor: 'var(--panel-muted)',
          borderRadius: '4px',
          marginBottom: '12px',
          width: '60%',
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        style={{
          height: '32px',
          backgroundColor: 'var(--panel-muted)',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        style={{
          height: '12px',
          backgroundColor: 'var(--panel-muted)',
          borderRadius: '4px',
          width: '40%',
        }}
      />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '24px',
        height: '300px',
      }}
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          height: '100%',
          backgroundColor: 'var(--panel-muted)',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}

export function TradeListSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '12px',
          }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            style={{
              height: '20px',
              backgroundColor: 'var(--panel-muted)',
              borderRadius: '4px',
              marginBottom: '12px',
              width: '40%',
            }}
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.2 }}
            style={{
              height: '14px',
              backgroundColor: 'var(--panel-muted)',
              borderRadius: '4px',
              marginBottom: '8px',
              width: '60%',
            }}
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.4 }}
            style={{
              height: '14px',
              backgroundColor: 'var(--panel-muted)',
              borderRadius: '4px',
              width: '45%',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          style={{
            height: '48px',
            backgroundColor: 'var(--panel-muted)',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        />
      ))}
    </div>
  );
}
