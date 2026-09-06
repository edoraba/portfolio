import { describe, expect, it } from 'vitest'
import { buildTiles, stopColumns, TILE_DESKTOP, TILE_MOBILE } from '../../lib/loader-grid'

describe('buildTiles', () => {
  it('covers the viewport with one tile to spare on every side', () => {
    const plan = buildTiles(1440, 900)
    expect(plan.columns * plan.size).toBeGreaterThan(1440)
    expect(plan.rows * plan.size).toBeGreaterThan(900)
  })

  it('leaves an odd number of tiles inside the viewport, so there is a true middle', () => {
    for (const [w, h] of [
      [1440, 900],
      [1920, 1080],
      [390, 844],
      [768, 1024],
    ]) {
      const plan = buildTiles(w, h)
      // The two extra are the ones beyond the edges; what is left has to be odd.
      expect((plan.columns - 2) % 2).toBe(1)
      expect((plan.rows - 2) % 2).toBe(1)
    }
  })

  it('uses the smaller tile on a phone', () => {
    expect(buildTiles(1440, 900).size).toBeGreaterThan(TILE_MOBILE)
    expect(buildTiles(390, 844).size).toBeLessThan(TILE_DESKTOP)
    expect(buildTiles(1440, 900).wide).toBe(true)
    expect(buildTiles(390, 844).wide).toBe(false)
  })

  it('never asks for fewer than three tiles a side', () => {
    const plan = buildTiles(120, 90)
    expect(plan.columns).toBeGreaterThanOrEqual(5)
    expect(plan.rows).toBeGreaterThanOrEqual(5)
    expect(plan.size).toBeGreaterThan(0)
  })
})

describe('stopColumns', () => {
  it('walks out, back past the middle, further, then lands on the middle', () => {
    const stops = stopColumns(17, true)
    const middle = 8
    expect(stops).toHaveLength(4)
    expect(stops[0]).toBeLessThan(middle)
    expect(stops[1]).toBeGreaterThan(middle)
    expect(stops[2]).toBeGreaterThan(stops[1])
    expect(stops.at(-1)).toBe(middle)
  })

  it('keeps every stop on the row, however narrow the grid', () => {
    for (const columns of [5, 7, 9, 13, 17, 25]) {
      for (const wide of [true, false]) {
        for (const stop of stopColumns(columns, wide)) {
          expect(stop).toBeGreaterThanOrEqual(0)
          expect(stop).toBeLessThan(columns)
        }
      }
    }
  })
})
