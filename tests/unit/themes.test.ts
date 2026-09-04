import { readFileSync } from 'node:fs'
import path from 'node:path'
import { load } from 'js-yaml'
import { describe, expect, it } from 'vitest'
import { render } from '../../scripts/gen-themes.mjs'
import { DEFAULT_THEME, THEMES, isThemeName, nextTheme } from '../../lib/themes'

const root = path.resolve(import.meta.dirname, '../..')

function luminance(hex: string): number {
  const h = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

describe('theme registry', () => {
  it('has six themes and signal is the default', () => {
    expect(THEMES).toHaveLength(6)
    expect(DEFAULT_THEME).toBe('signal')
    expect(THEMES[0].name).toBe('signal')
  })

  it('validates names and cycles in order', () => {
    expect(isThemeName('cobalt')).toBe(true)
    expect(isThemeName('dark')).toBe(false)
    expect(nextTheme('signal')).toBe('field')
    expect(nextTheme('ash')).toBe('signal')
    expect(nextTheme('signal', -1)).toBe('ash')
  })

  for (const theme of THEMES) {
    describe(theme.name, () => {
      const t = theme.tokens
      for (const bg of ['canvas', 'surface', 'surface-2'] as const) {
        for (const fg of ['ink', 'ink-muted', 'accent'] as const) {
          it(`${fg} on ${bg} passes AA`, () => {
            expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5)
          })
        }
      }
      it('accent-ink is legible on the accent', () => {
        expect(contrast(t['accent-ink'], t.accent)).toBeGreaterThanOrEqual(4.5)
      })
      it('never uses pure black or white', () => {
        for (const v of Object.values(t)) {
          expect(v.toLowerCase()).not.toMatch(/^#(000000|ffffff|000|fff)$/)
        }
      })
    })
  }
})

describe('generated CSS', () => {
  it('app/themes.css matches the registry', () => {
    const file = readFileSync(path.join(root, 'app/themes.css'), 'utf8').replaceAll('\r\n', '\n')
    expect(file).toBe(render())
  })
})

describe('DESIGN.md agrees with the registry', () => {
  type Design = { colors: Record<string, Record<string, string>> }
  const md = readFileSync(path.join(root, 'DESIGN.md'), 'utf8')
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) throw new Error('DESIGN.md has no frontmatter')
  const { colors } = load(match[1]) as Design
  for (const theme of THEMES) {
    it(`${theme.name} tokens are documented`, () => {
      const doc = colors[theme.name]
      expect(doc, `colors.${theme.name} missing`).toBeDefined()
      for (const [k, v] of Object.entries(theme.tokens)) {
        expect(doc[k]?.toLowerCase().replaceAll(' ', '')).toBe(v.toLowerCase().replaceAll(' ', ''))
      }
    })
  }
})
