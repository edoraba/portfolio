import { describe, expect, it } from 'vitest'
import { insideBounds, seedFor, tagsFromContent, wallsFor } from '../../lib/physics/toolbox'

describe('tagsFromContent', () => {
  it('keeps first appearance order and drops repeats and blanks', () => {
    const tags = tagsFromContent(
      [
        ['Next.js', 'TypeScript'],
        ['TypeScript', 'Solana', ' '],
      ],
      ['Figma', 'next.js'],
    )
    expect(tags).toEqual(['Next.js', 'TypeScript', 'Solana', 'Figma'])
  })
})

describe('seedFor', () => {
  const rect = { width: 900, height: 500 }
  const size = { width: 120, height: 32 }
  it('starts every tag above the ceiling and inside the width', () => {
    for (let i = 0; i < 24; i++) {
      const seed = seedFor(i, rect, size, 24)
      expect(seed.y).toBeLessThan(0)
      expect(seed.x).toBeGreaterThan(0)
      expect(seed.x).toBeLessThan(rect.width)
    }
  })
  it('is deterministic', () => {
    expect(seedFor(7, rect, size, 24)).toEqual(seedFor(7, rect, size, 24))
  })
  it('spreads consecutive tags across the width', () => {
    expect(seedFor(0, rect, size, 24).x).not.toBe(seedFor(1, rect, size, 24).x)
  })
})

describe('wallsFor', () => {
  it('places a floor below and walls outside the container', () => {
    const [floor, left, right, ceiling] = wallsFor({ width: 800, height: 400 }, 100)
    expect(floor.y).toBe(450)
    expect(left.x).toBe(-50)
    expect(right.x).toBe(850)
    expect(ceiling.y).toBeLessThan(0)
  })
})

describe('insideBounds', () => {
  it('pulls a stray body back into the container', () => {
    const rect = { width: 800, height: 400 }
    const size = { width: 100, height: 30 }
    expect(insideBounds({ x: -200, y: 900 }, rect, size)).toEqual({ x: 50, y: 385 })
    expect(insideBounds({ x: 400, y: 100 }, rect, size)).toEqual({ x: 400, y: 100 })
  })
})
