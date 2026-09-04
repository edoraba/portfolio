/**
 * The contact plate's grid cloth: a lattice of points that bulges away from the pointer.
 * Pure maths so the component only has to draw the result and the behaviour can be tested.
 */
export type Point = { x: number; y: number }

/** A cols x rows lattice of points in the 0..1 square, row major. */
export function lattice(cols: number, rows: number): Point[] {
  const pts: Point[] = []
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) pts.push({ x: c / cols, y: r / rows })
  }
  return pts
}

/**
 * Push every point away from `pointer` (also in 0..1), falling off smoothly to zero at
 * `radius`. `strength` is the maximum displacement in the same 0..1 space. With no pointer the
 * lattice is returned untouched.
 */
export function displace(
  points: Point[],
  pointer: Point | null,
  radius: number,
  strength: number,
): Point[] {
  if (!pointer || radius <= 0 || strength === 0) return points
  return points.map((p) => {
    const dx = p.x - pointer.x
    const dy = p.y - pointer.y
    const d = Math.hypot(dx, dy)
    if (d >= radius) return p
    // Smooth falloff, and no division by zero at the exact pointer position.
    const t = 1 - d / radius
    const push = strength * t * t
    if (d < 1e-6) return { x: p.x, y: p.y - push }
    return { x: p.x + (dx / d) * push, y: p.y + (dy / d) * push }
  })
}

/** Path data for one row or column of the lattice, in viewBox units. */
export function polyline(points: Point[], scaleX: number, scaleY: number): string {
  return points.map((p) => `${(p.x * scaleX).toFixed(2)},${(p.y * scaleY).toFixed(2)}`).join(' ')
}

export function rowOf(points: Point[], cols: number, row: number): Point[] {
  return points.slice(row * (cols + 1), row * (cols + 1) + cols + 1)
}

export function colOf(points: Point[], cols: number, rows: number, col: number): Point[] {
  const out: Point[] = []
  for (let r = 0; r <= rows; r++) out.push(points[r * (cols + 1) + col])
  return out
}
