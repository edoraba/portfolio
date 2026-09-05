/**
 * Classes that close a cell's right edge only at the widths where it is the last one in its row.
 * The indexed grids reflow as the sheet narrows, so a plain `r` would either leave the band open
 * on the right or draw a line down the middle of it.
 */
export function rowEdge(i: number, lg = 3, md = 2): string {
  const closesMd = i % md === md - 1
  const closesLg = i % lg === lg - 1
  return [
    closesMd ? null : 'md:after:hidden',
    closesLg ? (closesMd ? null : 'lg:after:block') : 'lg:after:hidden',
  ]
    .filter(Boolean)
    .join(' ')
}
