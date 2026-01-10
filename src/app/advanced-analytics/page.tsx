import AdvancedAnalyticsDashboard from '@/components/AdvancedAnalyticsDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Analytics - Young Money Trading Journal',
  description: 'Comprehensive behavioral analytics for trading performance, decision quality scoring, and psychological insights.',
};

export default function AdvancedAnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <AdvancedAnalyticsDashboard />
    </div>
  );
}