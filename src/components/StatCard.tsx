'use client';

export default function StatCard({ title, value, trend, subtitle }: { title: string; value: React.ReactNode; trend?: string; subtitle?: string }) {
  return (
    <div className="card-glass p-4 rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">{title}</div>
          <div className="text-2xl font-semibold grad-text">{value}</div>
        </div>
        {trend && <div className="text-sm text-gray-300">{trend}</div>}
      </div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </div>
  );
}
