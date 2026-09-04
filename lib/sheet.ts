/**
 * The sheet: one full-bleed CSS grid the whole site sits on. These numbers are mirrored in
 * app/globals.css (media queries and track templates); tests/unit/sheet.test.ts keeps them equal.
 * Column line N (`c N` in CSS) is the left edge of content column N; line cols + 1 is the right
 * edge of the last column.
 */
export const BREAKPOINTS = {
  sm: { min: 0, cols: 4, gap: 12 },
  md: { min: 768, cols: 6, gap: 16 },
  lg: { min: 1024, cols: 12, gap: 24 },
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

export const CELL_PAD = 12
export const MAX_SHEET = 1600

export type Span = { col: number; end: number }

/** Clamp a desktop span to a breakpoint with fewer columns, keeping the same proportion. */
export function fitSpan(span: Span, from: number, to: number): Span {
  if (from === to) return span
  const scale = to / from
  const col = Math.max(1, Math.min(to, Math.round((span.col - 1) * scale) + 1))
  const end = Math.max(col + 1, Math.min(to + 1, Math.round((span.end - 1) * scale) + 1))
  return { col, end }
}

/** Height of the sticky console header, measured live so pinned plates start below it. */
export function headerHeight(): number {
  if (typeof document === 'undefined') return 80
  const el = document.querySelector<HTMLElement>('.site-header')
  return el ? Math.round(el.getBoundingClientRect().height) : 80
}
