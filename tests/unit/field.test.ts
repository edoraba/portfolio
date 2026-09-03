import { describe, expect, it } from 'vitest'
import { smoothPointer } from '@/lib/field/pointer'
import { pickCell } from '@/lib/field/quality'
import { heroIntensity } from '@/lib/field/scroll'

describe('smoothPointer', () => {
  it('moves fast towards a nearer target (attack) and slowly away (release)', () => {
    const a = smoothPointer({ x: 0, y: 0, s: 0 }, { x: 1, y: 1, active: true }, 16, 25, 175)
    expect(a.s).toBeGreaterThan(0.4)
    const r = smoothPointer({ x: 1, y: 1, s: 1 }, { x: 1, y: 1, active: false }, 16, 25, 175)
    expect(r.s).toBeLessThan(1)
    expect(r.s).toBeGreaterThan(0.85)
  })
  it('never overshoots', () => {
    const p = smoothPointer({ x: 0, y: 0, s: 0 }, { x: 1, y: 0, active: true }, 1000, 25, 175)
    expect(p.x).toBeLessThanOrEqual(1)
    expect(p.s).toBeLessThanOrEqual(1)
  })
  it('keeps the last position when the pointer leaves', () => {
    const p = smoothPointer({ x: 0.3, y: 0.7, s: 1 }, { x: 9, y: 9, active: false }, 16, 25, 175)
    expect(p.x).toBe(0.3)
    expect(p.y).toBe(0.7)
  })
})

describe('pickCell', () => {
  it('keeps cell 2 when frames are fast', () => {
    expect(pickCell(Array(60).fill(8), 2)).toBe(2)
  })
  it('keeps the tier at a healthy 60Hz interval', () => {
    expect(pickCell(Array(60).fill(16.7), 2)).toBe(2)
  })
  it('steps down one tier when p75 frame interval exceeds 22ms', () => {
    expect(pickCell(Array(60).fill(30), 2)).toBe(3)
    expect(pickCell(Array(60).fill(30), 3)).toBe(4)
    expect(pickCell(Array(60).fill(30), 4)).toBe(4)
  })
  it('needs a full window before deciding', () => {
    expect(pickCell(Array(10).fill(30), 2)).toBe(2)
  })
})

describe('heroIntensity', () => {
  it('is 1 at the top and 0 after 80 percent of the hero height', () => {
    expect(heroIntensity(0, 900)).toBe(1)
    expect(heroIntensity(360, 900)).toBeCloseTo(0.5)
    expect(heroIntensity(720, 900)).toBe(0)
    expect(heroIntensity(2000, 900)).toBe(0)
  })
  it('is 0 for a degenerate hero', () => {
    expect(heroIntensity(0, 0)).toBe(0)
  })
})
