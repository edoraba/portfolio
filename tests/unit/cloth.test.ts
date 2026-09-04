import { describe, expect, it } from 'vitest'
import { colOf, displace, lattice, polyline, rowOf } from '../../lib/motion/cloth'

describe('lattice', () => {
  it('builds (cols + 1) x (rows + 1) points in the unit square', () => {
    const pts = lattice(2, 2)
    expect(pts).toHaveLength(9)
    expect(pts[0]).toEqual({ x: 0, y: 0 })
    expect(pts[8]).toEqual({ x: 1, y: 1 })
  })
})

describe('displace', () => {
  const pts = lattice(2, 2)
  it('returns the lattice untouched without a pointer', () => {
    expect(displace(pts, null, 0.3, 0.05)).toBe(pts)
  })
  it('pushes points away from the pointer and leaves distant ones alone', () => {
    const out = displace(pts, { x: 0, y: 0 }, 0.6, 0.1)
    // The far corner is outside the radius.
    expect(out[8]).toEqual({ x: 1, y: 1 })
    // The neighbour on the x axis moves away from the pointer.
    expect(out[1].x).toBeGreaterThan(pts[1].x)
  })
  it('never divides by zero at the pointer itself', () => {
    const out = displace(pts, { x: 0, y: 0 }, 0.6, 0.1)
    expect(Number.isFinite(out[0].x)).toBe(true)
    expect(Number.isFinite(out[0].y)).toBe(true)
  })
})

describe('rows, columns and path data', () => {
  const pts = lattice(2, 2)
  it('slices rows and columns', () => {
    expect(rowOf(pts, 2, 1).map((p) => p.y)).toEqual([0.5, 0.5, 0.5])
    expect(colOf(pts, 2, 2, 1).map((p) => p.x)).toEqual([0.5, 0.5, 0.5])
  })
  it('scales to the view box', () => {
    expect(polyline(rowOf(pts, 2, 0), 100, 50)).toBe('0.00,0.00 50.00,0.00 100.00,0.00')
  })
})
