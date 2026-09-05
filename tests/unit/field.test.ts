import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_BAND, OFF, PRIORITY, resolveClaims } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'
import { smoothPointer } from '@/lib/field/pointer'
import { pickCell } from '@/lib/field/quality'
import { sameRect, snapRect } from '@/lib/field/snap'
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

describe('resolveClaims', () => {
  const hero = { mode: 'hero' as const, intensity: 1, priority: PRIORITY.hero }
  const footer = {
    mode: 'band' as const,
    intensity: 0.45,
    band: [0.7, 0.8] as [number, number],
    priority: PRIORITY.footer,
  }
  const loader = { mode: 'calibrate' as const, intensity: 1, priority: PRIORITY.loader }

  it('turns the field off when nothing claims it', () => {
    expect(resolveClaims({}, null)).toEqual(OFF)
    expect(resolveClaims({}, 'hero')).toEqual(OFF)
  })
  it('hands the field to the highest priority claim, whatever the order', () => {
    expect(resolveClaims({ hero, footer }, null).owner).toBe('hero')
    expect(resolveClaims({ footer, hero }, null).owner).toBe('hero')
    expect(resolveClaims({ hero, footer, loader }, null).owner).toBe('loader')
  })
  it('passes the winner settings through, with a default band', () => {
    expect(resolveClaims({ footer }, null)).toEqual({
      owner: 'footer',
      mode: 'band',
      intensity: 0.45,
      band: [0.7, 0.8],
    })
    expect(resolveClaims({ hero }, null).band).toEqual(DEFAULT_BAND)
  })
  it('keeps the field with the current owner on a tie', () => {
    const a = { mode: 'band' as const, intensity: 0.2, priority: PRIORITY.plate }
    const b = { mode: 'band' as const, intensity: 0.3, priority: PRIORITY.plate }
    expect(resolveClaims({ a, b }, 'b').owner).toBe('b')
    expect(resolveClaims({ a, b }, null).owner).toBe('a')
  })
})

describe('the field store never strands a band', () => {
  beforeEach(() => {
    useField.setState({ claims: {}, requested: false, owner: null, mode: 'off', intensity: 0 })
  })

  it('goes off again however the claims are released', () => {
    const s = () => useField.getState()
    s().claim('about', { mode: 'band', intensity: 0.2, priority: PRIORITY.plate })
    s().claim('footer', { mode: 'band', intensity: 0.45, priority: PRIORITY.footer })
    expect(s().owner).toBe('footer')
    // Release out of order: the one that never owned the field goes first.
    s().release('about')
    expect(s().mode).toBe('band')
    s().release('footer')
    expect(s()).toMatchObject({ owner: null, mode: 'off', intensity: 0, requested: false })
  })

  it('ignores a lower claim while a higher one holds the field', () => {
    const s = () => useField.getState()
    s().claim('hero', { mode: 'hero', intensity: 1, priority: PRIORITY.hero })
    s().claim('footer', { mode: 'band', intensity: 0.45, priority: PRIORITY.footer })
    expect(s().mode).toBe('hero')
    s().release('hero')
    expect(s()).toMatchObject({ owner: 'footer', mode: 'band' })
  })

  it('releasing an id that never claimed changes nothing', () => {
    const s = () => useField.getState()
    s().claim('hero', { mode: 'hero', intensity: 1, priority: PRIORITY.hero })
    s().release('nobody')
    expect(s().owner).toBe('hero')
  })

  it('re-filing the same claim does not churn the state', () => {
    const s = () => useField.getState()
    const claim = { mode: 'band' as const, intensity: 0.45, priority: PRIORITY.footer }
    s().claim('footer', claim)
    const before = useField.getState().claims
    s().claim('footer', { ...claim })
    expect(useField.getState().claims).toBe(before)
  })
})

describe('snapRect', () => {
  const r = (x: number, y: number, width: number, height: number) =>
    ({ x, y, width, height }) as DOMRectReadOnly

  it('puts every edge on a cell boundary', () => {
    expect(snapRect(r(81.6, 120.4, 1276.8, 197.3), 2)).toEqual({ x: 82, y: 120, w: 1276, h: 198 })
    expect(snapRect(r(81.6, 120.4, 1276.8, 197.3), 4)).toEqual({ x: 80, y: 120, w: 1276, h: 196 })
  })
  it('never returns a negative size', () => {
    expect(snapRect(r(0, 0, -3, -1), 2)).toMatchObject({ w: 0, h: 0 })
  })
  it('compares snapped rectangles so unchanged frames write nothing', () => {
    const a = snapRect(r(10, 10, 100, 20), 2)
    expect(sameRect(a, snapRect(r(10.4, 10.4, 100.4, 20.4), 2))).toBe(true)
    expect(sameRect(a, snapRect(r(14, 10, 100, 20), 2))).toBe(false)
    expect(sameRect(null, a)).toBe(false)
  })
})
