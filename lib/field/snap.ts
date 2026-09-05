import type { Cell } from './quality'

export type SnappedRect = { x: number; y: number; w: number; h: number }

/**
 * Rounds a rectangle to whole dither cells. The canvas is drawn at one pixel per cell and scaled
 * up with nearest neighbour, so a mask edge on a fractional pixel makes the first and last row of
 * cells flick on and off as it moves. Snapping puts every edge on a cell boundary instead.
 */
export function snapRect(rect: DOMRectReadOnly | SnappedRect, cell: Cell): SnappedRect {
  const left = 'x' in rect && !('w' in rect) ? rect.x : (rect as SnappedRect).x
  const top = 'y' in rect ? rect.y : 0
  const width = 'width' in rect ? rect.width : (rect as SnappedRect).w
  const height = 'height' in rect ? rect.height : (rect as SnappedRect).h
  const snap = (v: number) => Math.round(v / cell) * cell
  return {
    x: snap(left),
    y: snap(top),
    w: Math.max(0, snap(width)),
    h: Math.max(0, snap(height)),
  }
}

export function sameRect(a: SnappedRect | null, b: SnappedRect): boolean {
  return !!a && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h
}
