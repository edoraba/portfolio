/**
 * The entrance grid, framework free. The screen is covered in square tiles sized from the
 * viewport, and the marker hops along the middle row. Two rules make the geometry work: an odd
 * number of tiles each way, so there is a true middle row and a true middle column for the mark
 * to land on, and one extra tile beyond every edge, so a partial tile never shows at the border.
 */

/** The biggest a tile is allowed to be, which is what decides how many there are. */
export const TILE_DESKTOP = 85
export const TILE_MOBILE = 50
/** Below this the screen is a phone and the tiles are smaller, or there would be too few. */
export const WIDE_FROM = 1000

export type TilePlan = {
  /** Tiles across and down, both including the one beyond each edge. */
  columns: number
  rows: number
  size: number
  wide: boolean
}

const odd = (n: number) => (n % 2 === 0 ? n - 1 : n)

export function buildTiles(width: number, height: number): TilePlan {
  const wide = width >= WIDE_FROM
  const max = wide ? TILE_DESKTOP : TILE_MOBILE
  const columns = Math.max(3, odd(Math.floor(width / max)))
  const rows = Math.max(3, odd(Math.floor(height / max)))
  const size = Math.min(width / columns, height / rows)
  return { columns: columns + 2, rows: rows + 2, size, wide }
}

/**
 * The four columns the marker stops at, in order: out to the left, back past the middle, one
 * further, then the middle itself. The reach is clamped so the walk stays on the row even on a
 * narrow screen.
 */
export function stopColumns(columns: number, wide: boolean): number[] {
  const middle = Math.floor(columns / 2)
  const reach = Math.max(1, Math.min(wide ? 5 : 2, middle - 1))
  const near = Math.max(1, Math.round(reach * 0.6))
  return [middle - reach, middle + near, middle + reach, middle]
}
