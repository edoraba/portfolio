/**
 * Sliced-letter flip: a label rendered as n horizontal strips that slide out in alternating
 * directions and slide back carrying the alternate label. Pure geometry here; the component
 * and CSS apply it.
 */
export const SLICES = 4
export const SLICE_STEP_MS = 30

/** clip-path inset() for strip i of n: the strips tile the line box exactly. */
export function sliceClipPaths(n = SLICES): string[] {
  return Array.from({ length: n }, (_, i) => {
    const top = (i / n) * 100
    const bottom = 100 - ((i + 1) / n) * 100
    // A hair of overlap between strips hides sub-pixel seams.
    return `inset(${round(top)}% 0 ${round(Math.max(0, bottom - 0.5))}% 0)`
  })
}

/** Delay and direction per strip: alternating left and right, 30ms apart. */
export function flipDelays(n = SLICES, step = SLICE_STEP_MS): { delay: number; dir: 1 | -1 }[] {
  return Array.from({ length: n }, (_, i) => ({ delay: i * step, dir: i % 2 === 0 ? 1 : -1 }))
}

function round(v: number) {
  return Math.round(v * 100) / 100
}
