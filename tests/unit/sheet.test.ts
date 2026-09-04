import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { BREAKPOINTS, fitSpan } from '../../lib/sheet'
import { spanStyle } from '../../components/sheet/span'

const css = readFileSync(path.resolve(import.meta.dirname, '../../app/globals.css'), 'utf8')

describe('sheet tokens agree between lib/sheet.ts and globals.css', () => {
  it('declares the column counts and gaps per breakpoint', () => {
    expect(css).toMatch(/--gap: 12px;\s*--cols: 4;/)
    expect(css).toMatch(/@media \(min-width: 768px\)[\s\S]*?--gap: 16px;\s*--cols: 6;/)
    expect(css).toMatch(/@media \(min-width: 1024px\)[\s\S]*?--gap: 24px;\s*--cols: 12;/)
    expect(BREAKPOINTS.md.min).toBe(768)
    expect(BREAKPOINTS.lg.min).toBe(1024)
  })
  it('builds the track templates with the same counts', () => {
    for (const bp of Object.values(BREAKPOINTS)) {
      expect(css).toContain(`repeat(${bp.cols}, [c] minmax(0, 1fr))`)
    }
  })
})

describe('fitSpan', () => {
  it('keeps full width full', () => {
    expect(fitSpan({ col: 1, end: 13 }, 12, 6)).toEqual({ col: 1, end: 7 })
    expect(fitSpan({ col: 1, end: 13 }, 12, 4)).toEqual({ col: 1, end: 5 })
  })
  it('scales halves and thirds proportionally', () => {
    expect(fitSpan({ col: 7, end: 13 }, 12, 6)).toEqual({ col: 4, end: 7 })
    expect(fitSpan({ col: 1, end: 5 }, 12, 4)).toEqual({ col: 1, end: 2 })
  })
  it('never collapses to zero width', () => {
    expect(fitSpan({ col: 12, end: 13 }, 12, 4)).toEqual({ col: 4, end: 5 })
  })
})

describe('spanStyle', () => {
  it('emits the six variables with proportional fallbacks', () => {
    expect(spanStyle({ col: 1, end: 9 })).toEqual({
      '--cs': 1,
      '--ce': 9,
      '--cs-md': 1,
      '--ce-md': 5,
      '--cs-sm': 1,
      '--ce-sm': 4,
    })
  })
  it('honours explicit overrides', () => {
    const s = spanStyle({ col: 9, end: 13, md: { col: 1, end: 7 }, sm: { end: 5 } })
    expect(s).toMatchObject({ '--cs-md': 1, '--ce-md': 7, '--cs-sm': 4, '--ce-sm': 5 })
  })
})
