import { readFileSync } from 'node:fs'
import path from 'node:path'
import { load } from 'js-yaml'
import { describe, expect, it } from 'vitest'

type Design = { colors: { dark: Record<string, string>; light: Record<string, string> } }

const root = path.resolve(import.meta.dirname, '../..')
const design = readFileSync(path.join(root, 'DESIGN.md'), 'utf8')
const css = readFileSync(path.join(root, 'app/globals.css'), 'utf8')
  .toLowerCase()
  .replaceAll(' ', '')

function frontmatter(md: string): Design {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) throw new Error('DESIGN.md has no frontmatter')
  return load(match[1]) as Design
}

describe('DESIGN.md and globals.css agree', () => {
  const { colors } = frontmatter(design)
  for (const theme of ['dark', 'light'] as const) {
    for (const [role, value] of Object.entries(colors[theme])) {
      it(`${theme} ${role} ${value} is declared in globals.css`, () => {
        expect(css).toContain(value.toLowerCase().replaceAll(' ', ''))
      })
    }
  }
})
