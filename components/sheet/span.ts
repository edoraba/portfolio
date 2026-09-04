import type { CSSProperties } from 'react'
import { BREAKPOINTS, fitSpan, type Span } from '@/lib/sheet'

export type SpanProps = {
  /** Start column line on the 12-column sheet (1 to 12). */
  col?: number
  /** End column line on the 12-column sheet (2 to 13). Defaults to the right edge. */
  end?: number
  /** Overrides for the 6-column (md) and 4-column (sm) sheets. Default: proportional fit. */
  md?: Partial<Span>
  sm?: Partial<Span>
}

/**
 * Turns a span into the CSS variables `.on-sheet` reads: --cs/--ce (lg), --cs-md/--ce-md,
 * --cs-sm/--ce-sm. Inline variables instead of utility classes so any span works without
 * Tailwind having to see the class name in source.
 */
export function spanStyle({ col = 1, end, md, sm }: SpanProps): CSSProperties {
  const lg: Span = { col, end: end ?? BREAKPOINTS.lg.cols + 1 }
  const m = { ...fitSpan(lg, BREAKPOINTS.lg.cols, BREAKPOINTS.md.cols), ...md }
  const s = { ...fitSpan(lg, BREAKPOINTS.lg.cols, BREAKPOINTS.sm.cols), ...sm }
  return {
    '--cs': lg.col,
    '--ce': lg.end,
    '--cs-md': m.col,
    '--ce-md': m.end,
    '--cs-sm': s.col,
    '--ce-sm': s.end,
  } as CSSProperties
}
