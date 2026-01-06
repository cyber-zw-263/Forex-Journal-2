'use client';

import React from 'react';

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  if (!open) return null;

  // Close on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={handleKeyDown} role="presentation">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative bg-slate-900 rounded-lg p-6 w-full max-w-2xl card-glass z-10">
        {title && <h3 id="modal-title" className="text-lg font-bold mb-2">{title}</h3>}
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button className="btn-gradient px-4 py-2 rounded" onClick={onClose} aria-label="Close dialog" autoFocus>Close</button>
        </div>
      </div>
    </div>
  );
}
