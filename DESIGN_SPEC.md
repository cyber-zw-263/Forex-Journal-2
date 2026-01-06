# Design Specification: Rework UI to match example.png

## Goal
Redesign the project UI to visually match `example.png` (target) instead of the current `layout.png`.

## High-level differences / findings
- Global theme: target is a darker, higher-contrast theme with subtle mid-gray panels and deeper black background. Current is dark but has lighter panels and larger spacing.
- Header: target has a compact top bar with page title and inline controls (currency, filters, date range) and a narrow height. Current header is larger, uses a large gradient title and prominent Add Trade button.
- Sidebar: both use a vertical icon sidebar, but the target is narrower and denser with small circular icons; the active state uses a left accent and subtle background; target also has an optional compact collapsed state.
- Metric cards: target displays a single compact row of cards (Net P&L, Win %, Day Win %, Avg win/loss trade) with minimal padding, rounded corners and dark card backgrounds; current stat cards use lighter backgrounds and larger spacing.
- Charts and Layout: the main content is more compact and grid-driven in target — a large performance chart on the left with a slim right-hand summary card, and a drawdown chart to the right with an avatar overlay. Below, a yearly calendar with colored tiles (green/red) and compact stat cards.
- Spacing & Scale: target uses tighter spacing, smaller fonts for nav, and more consistent small radii on cards.
- Accents & Colors: target uses bright green for positive values, muted red for negatives, and purple/indigo as a UI accent. Subtle inner glows and soft shadows for floating elements (e.g., avatar overlay).

## Visual tokens (suggested)
- Background: #0A0A0B (near black)
- Card bg: #0F1113 (very dark gray)
- Card border: rgba(255,255,255,0.04)
- Panel highlights: rgba(255,255,255,0.02)
- Accent green: #10B981 (tailwind emerald-500)
- Accent red: #EF4444 (rose-500)
- Accent purple: #7C3AED (violet-600)
- Muted text: #A3A3A3
- Border radius: 10px for small cards, 14px for bigger panes
- Shadow: 0 8px 30px rgba(0,0,0,0.6) for floating elements

## Component mapping
- Global layout: `src/components/AppShell.tsx` — update to narrow sidebar & constrained content width; introduce top bar variants
- Sidebar: `src/components/IconSidebar.tsx` — reduce width, compact icons, add active left border indicator and hover state; always visible on desktop
- Header: `src/components/DashboardHeaderV3.tsx` — refactor to compact header: left title, center controls (filters, date), right small utility icons; remove oversized Add Trade button or move to floating FAB
- Metric cards: `src/components/PerformanceOverview.tsx` — restyle cards (dark backgrounds, compact, single row), add small dot/icon and subtle metrics colorations
- Charts area: reuse existing chart components (e.g., `AnalyticsCharts.tsx`, `AnalyticsChartsV2.tsx`) but change layout grid in `src/app/analytics/page.tsx` and `src/app/page.tsx` to match target (big left performance, narrow right stats, drawdown next to it)
- Yearly calendar: `src/components/YearlyHeatmap.tsx` — change tile styles to filled rounded boxes with tight spacing and color-coded values
- Misc: `src/components/PdfReport.tsx`, `ExportButton.tsx` — polish spacing so overlayed buttons match example

## Accessibility & UX
- Maintain good contrast; ensure interactive elements are keyboard accessible.
- Keep `Skip to content` link (already present) visible on focus.
- Add aria-labels for filter controls and charts.

## Implementation steps (iterative)
1. Add / update theme tokens in `src/app/globals.css` (or `src/app/globals.css`) — colors, radii, shadows. (small, quick) ✅
2. Update `IconSidebar.tsx` to match width, spacing, active indicator, and mobile collapse behavior. (small)
3. Refactor `DashboardHeaderV3.tsx` to a compact header and move `+ Add` action to a floating button in the content region. (medium)
4. Restyle `PerformanceOverview.tsx` to compact cards with new tokens and consistent heights (add a `StatRow` wrapper). (small)
5. Update analytics and dashboard pages layout grid to match target (two-column grid for charts area + full-width yearly calendar). (medium)
6. Update `YearlyHeatmap` tiles to match target style (rounded filled tiles, color tokens). (medium)
7. Add a small floating avatar overlay component for drawdown (optional if no video feed). (small)
8. Add visual regression snapshots and Playwright tests for `/`, `/analytics`, `/review` pages. (small)
9. QA and polish spacing, accessibility, and responsive behavior. (small)

## Tests to add/update
- Playwright: visual snapshots of `/`, `/analytics`, `/review` and accessibility scans.
- Unit: simple layout tests ensuring `IconSidebar` has expected width and that header contains controls.

## Files likely to modify
- src/components/AppShell.tsx
- src/components/IconSidebar.tsx
- src/components/DashboardHeaderV3.tsx
- src/components/PerformanceOverview.tsx
- src/components/YearlyHeatmap.tsx
- src/app/(pages)/analytics/page.tsx
- src/app/page.tsx
- src/app/globals.css
- tests/* - update/add visual tests

## Notes & constraints
- Keep changes incremental and testable (do small PRs per area).
- Preserve accessibility and keyboard behavior.

---

If this spec looks good, I'll start by implementing the theme tokens and restyling `IconSidebar` and `DashboardHeaderV3` (Step 1-3). After that, I'll push small commits for review and update the todo list accordingly.