'use client';

import { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

export default function PdfReport({ trades, chartSelector }: { trades: any[]; chartSelector?: string }) {
  const [chartDataUrl, setChartDataUrl] = useState<string | null>(null);

  async function captureChart() {
    if (!chartSelector) return null;
    const el = document.querySelector(chartSelector) as HTMLElement | null;
    if (!el) return null;
    const svg = el.querySelector('svg') as SVGElement | null;
    if (!svg) return null;
    const s = new XMLSerializer().serializeToString(svg as any);
    const data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
    return data;
  }

  const totalPnL = trades.reduce((s, t) => s + (t.profitLoss || 0), 0);
  const wins = trades.filter(t => t.outcome === 'WIN').length;
  const loss = trades.filter(t => t.outcome === 'LOSS').length;

  const MyDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Trading Report</Text>
          <Text style={styles.subtitle}>Total Trades: {trades.length}</Text>
          <Text>Total P&L: {totalPnL.toFixed(2)}</Text>
          <Text>Wins: {wins} Losses: {loss}</Text>
          {chartDataUrl && <Image style={styles.image} src={chartDataUrl} />}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex items-center gap-2">
      <button aria-label="Capture chart for PDF" className="btn-gradient px-3 py-2 rounded text-sm" onClick={async () => { const data = await captureChart(); if (data) setChartDataUrl(data); else alert('No SVG chart found to embed.'); }}>Capture Chart</button>
      <PDFDownloadLink document={MyDoc} fileName={`trading-report-${new Date().toISOString().slice(0,10)}.pdf`} className="btn-gradient px-3 py-2 rounded text-sm" aria-label="Download PDF report">Download PDF</PDFDownloadLink>
    </div>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: '#0a0a0a', color: '#ffffff' },
  title: { fontSize: 20, marginBottom: 8 },
  subtitle: { fontSize: 12, marginBottom: 8 },
  image: { width: '100%', height: 250, marginTop: 12 },
});
