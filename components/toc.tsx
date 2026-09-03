'use client'
import { useScrollspy } from '@/lib/motion/scrollspy'

export type Heading = { id: string; text: string }

/**
 * Table of contents for long-form pages. Headings come from the content pipeline (same ids
 * rehype-slug emits), the current one carries aria-current and a 1px accent rule.
 * Sticky in the left column from lg; hidden below (the headings themselves are the map on mobile).
 */
export function Toc({ headings }: { headings: Heading[] }) {
  const active = useScrollspy(headings.map((h) => h.id))
  if (headings.length < 2) return null
  return (
    <nav aria-label="On this page" className="toc label">
      <p className="text-ink-muted">Contents</p>
      <ol className="mt-3">
        {headings.map((h) => (
          <li key={h.id} className={active === h.id ? 'toc__item toc__item--on' : 'toc__item'}>
            <a href={`#${h.id}`} aria-current={active === h.id ? 'true' : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
