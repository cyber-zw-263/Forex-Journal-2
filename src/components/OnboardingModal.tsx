'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

const Modal = dynamic(() => import('./Modal'), { ssr: false });

export default function OnboardingModal() {
  const [open, setOpen] = useState(() => {
    try {
      const dismissed = typeof window !== 'undefined' ? localStorage.getItem('onboardingDismissed') : null;
      return !dismissed;
    } catch (e) {
      return false;
    }
  });

  async function loadDemoData() {
    try {
      const res = await fetch('/data/demo-trades.json');
      const demo = await res.json();
      // Post each trade
      for (const t of demo) {
        await fetch('/api/trades', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-id': 'demo-user' },
          body: JSON.stringify(t),
        });
      }
      toast.success('Demo data loaded');
      localStorage.setItem('onboardingDismissed', '1');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load demo data');
    }
  }

  function dismiss() {
    localStorage.setItem('onboardingDismissed', '1');
    setOpen(false);
  }

  return (
    <Modal open={open} onClose={dismiss} title="Welcome to Young Money">
      <p className="text-sm text-gray-300">This app is a private trading journal. You can load a short demo dataset to explore features like analytics, heatmaps, and exports. No real trades are uploaded.</p>
      <div className="mt-4 flex gap-2">
        <button className="btn-gradient px-3 py-2 rounded" onClick={loadDemoData} aria-label="Load demo data">Load demo data</button>
        <button className="px-3 py-2 rounded border border-gray-700 text-gray-200" onClick={dismiss} aria-label="Dismiss onboarding">Dismiss</button>
      </div>
    </Modal>
  );
}
