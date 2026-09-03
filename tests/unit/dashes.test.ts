import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = path.resolve(import.meta.dirname, '../..')
const roots = [
  'app',
  'components',
  'lib',
  'content',
  'docs',
  'README.md',
  'DESIGN.md',
  'PRODUCT.md',
]
const skip = new Set(['docs/design-references'])
const exts = new Set(['.ts', '.tsx', '.mdx', '.md', '.css', '.mjs', '.json'])

function walk(p: string, out: string[] = []): string[] {
  const rel = path.relative(root, p).replaceAll('\\', '/')
  if (skip.has(rel)) return out
  const st = statSync(p)
  if (st.isDirectory()) for (const f of readdirSync(p)) walk(path.join(p, f), out)
  else if (exts.has(path.extname(p))) out.push(p)
  return out
}

describe('no em-dash or en-dash anywhere', () => {
  const files = roots.flatMap((r) => walk(path.join(root, r)))
  for (const f of files) {
    it(path.relative(root, f).replaceAll('\\', '/'), () => {
      const text = readFileSync(f, 'utf8')
      expect(text.includes('—'), 'em-dash found').toBe(false)
      expect(text.includes('–'), 'en-dash found').toBe(false)
    })
  }
})
