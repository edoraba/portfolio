export const CELLS = [2, 3, 4] as const
/** Quality tiers plus the coarse 8px cell the loader starts from. */
export type Cell = (typeof CELLS)[number] | 8
export const WINDOW = 60
// Frame interval budget in ms. At 60Hz a healthy interval is about 16.7ms; a p75
// above 22ms means frames are being dropped and the field costs too much.
export const BUDGET_MS = 22
// Intervals above this are tab switches or stalls, not rendering cost.
export const IGNORE_ABOVE_MS = 200

export function p75(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.75))]
}

// One tier down when the last WINDOW frames are too slow. Never steps back up
// on its own: a device that struggled once keeps the cheaper cell for the session.
export function pickCell(frameTimes: number[], current: Cell): Cell {
  if (frameTimes.length < WINDOW) return current
  if (p75(frameTimes.slice(-WINDOW)) <= BUDGET_MS) return current
  const i = CELLS.indexOf(current as (typeof CELLS)[number])
  if (i < 0) return current
  return CELLS[Math.min(CELLS.length - 1, i + 1)]
}
