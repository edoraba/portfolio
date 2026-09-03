import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

// Blocks production builds while facts still need Edoardo's confirmation.
// Set ALLOW_TODO=1 to build a preview anyway.
const isProd = process.env.NODE_ENV === 'production' || process.env.CI === 'true'
if (!isProd || process.env.ALLOW_TODO === '1') process.exit(0)

const root = path.resolve(import.meta.dirname, '..')
const targets = ['content', 'lib/site.ts']
const hits = []

function walk(p) {
  const st = statSync(p)
  if (st.isDirectory()) return readdirSync(p).forEach((f) => walk(path.join(p, f)))
  const text = readFileSync(p, 'utf8')
  text.split('\n').forEach((line, i) => {
    if (line.includes('TODO(edoardo)')) hits.push(`${path.relative(root, p)}:${i + 1}`)
  })
}

targets.forEach((d) => walk(path.join(root, d)))

if (hits.length) {
  console.error(`Production build blocked: ${hits.length} TODO(edoardo) left:\n${hits.join('\n')}`)
  console.error('Set ALLOW_TODO=1 to build a preview anyway.')
  process.exit(1)
}
