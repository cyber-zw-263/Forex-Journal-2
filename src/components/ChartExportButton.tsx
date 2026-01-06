'use client';

export default function ChartExportButton({ selector, filename = 'chart.png' }: { selector: string; filename?: string }) {
  async function exportSvgAsPng() {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) {
      alert('Chart container not found');
      return;
    }

    // If it contains an SVG, serialize it
    const svg = el.querySelector('svg');
    if (svg) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg as any);
      const svgData = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = svg.clientWidth || img.width;
        canvas.height = svg.clientHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = getComputedStyle(document.body).backgroundColor || '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      };
      img.onerror = () => alert('Failed to export SVG chart');
      img.src = svgData;
      return;
    }

    // Fallback: use html2canvas if present
    // (not installed by default here - user can install if needed)
    alert('SVG not found in container. If you need HTML capture, install html-to-image or html2canvas.');
  }

  return (
    <button type="button" aria-label="Export chart as PNG" title="Export chart as PNG" onClick={exportSvgAsPng} className="btn-gradient px-3 py-2 rounded text-sm">Export Chart PNG</button>
  );
}
