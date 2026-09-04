import { describe, expect, it } from 'vitest'
import { beatAt, clamp01, itemProgress, lerp, pinLength } from '../../lib/motion/scrub'

describe('pinLength', () => {
  it('caps at 200vh on desktop and 100vh on mobile', () => {
    expect(pinLength(150, false)).toBe(150)
    expect(pinLength(300, false)).toBe(200)
    expect(pinLength(150, true)).toBe(100)
    expect(pinLength(-10, false)).toBe(0)
  })
})

describe('clamp01 and lerp', () => {
  it('clamps and interpolates', () => {
    expect(clamp01(-1)).toBe(0)
    expect(clamp01(2)).toBe(1)
    expect(lerp(100, 0, 0.5)).toBe(50)
    expect(lerp(100, 0, 2)).toBe(0)
  })
})

describe('beatAt', () => {
  const boundaries = [0.3, 0.8]
  it('finds the beat and the local progress', () => {
    expect(beatAt(0, boundaries)).toEqual({ index: 0, local: 0 })
    expect(beatAt(0.15, boundaries)).toEqual({ index: 0, local: 0.5 })
    expect(beatAt(0.3, boundaries)).toEqual({ index: 1, local: 0 })
    const mid = beatAt(0.55, boundaries)
    expect(mid.index).toBe(1)
    expect(mid.local).toBeCloseTo(0.5, 10)
    expect(beatAt(1, boundaries)).toEqual({ index: 2, local: 1 })
  })
  it('handles no boundaries', () => {
    expect(beatAt(0.4, [])).toEqual({ index: 0, local: 0.4 })
  })
})

describe('itemProgress', () => {
  it('staggers items across the timeline', () => {
    // Five items, each taking 40 percent: the last starts at 0.6.
    expect(itemProgress(0, 0, 5)).toBe(0)
    expect(itemProgress(0.4, 0, 5)).toBe(1)
    expect(itemProgress(0.6, 4, 5)).toBe(0)
    expect(itemProgress(1, 4, 5)).toBe(1)
    expect(itemProgress(0.5, 4, 5)).toBe(0)
  })
  it('uses the head of the timeline for a single item', () => {
    expect(itemProgress(0.2, 0, 1, 0.4)).toBe(0.5)
  })
})
