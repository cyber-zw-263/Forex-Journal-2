export default function UIFixes() {
  const css = `
  /* Accessibility: visible focus styles for interactive elements */
  :where(button, a, [role="button"]) {
    -webkit-tap-highlight-color: rgba(255,255,255,0);
  }
  :where(button, a, [role="button"]):focus-visible {
    outline: 3px solid rgba(99,102,241,0.9);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
  }

  /* Button contrast & primary gradient */
  .btn-primary {
    background-image: linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%);
    color: #ffffff;
    border: none;
  }
  .btn-primary:active {
    transform: translateY(1px);
  }

  /* Card glass tweak for better contrast */
  .card-glass {
    background: linear-gradient(180deg, rgba(8,10,18,0.7), rgba(8,10,18,0.6));
    border: 1px solid rgba(255,255,255,0.04);
    box-shadow: 0 6px 18px rgba(2,6,23,0.6);
  }

  /* Sticky header layering */
  header[role="banner"], .dashboard-header, .sticky {
    z-index: 60 !important;
  }

  /* Sidebar responsive tweaks */
  .icon-sidebar {
    width: 64px;
  }
  @media (max-width: 768px) {
    .icon-sidebar {
      width: 48px;
    }
    .icon-sidebar .label {
      display: none;
    }
  }

  /* Small improvements for charts and tables */
  .recharts-wrapper svg { background: transparent; }
  .month-heatmap button:focus-visible { outline: 2px solid rgba(99,102,241,0.9); }

  /* Improve text contrast for small helper text */
  .muted { color: rgba(203,213,225,0.8); }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
