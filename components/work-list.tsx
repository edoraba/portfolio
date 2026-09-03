import type { Work } from 'content-collections'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { Decode } from './decode'
import { LineReveal } from './line-reveal'

export function WorkList({ works }: { works: Work[] }) {
  return (
    <ol className="hairline-t">
      {works.map((w) => (
        <li key={w.slug} className="hairline-b">
          <Link
            href={`/work/${w.slug}`}
            transitionTypes={['nav-forward']}
            className="group grid gap-3 py-8 md:grid-cols-[3rem_1fr_auto] md:items-baseline"
          >
            <Decode className="label text-accent">{String(w.order).padStart(2, '0')}</Decode>
            <span>
              <ViewTransition name={`work-title-${w.slug}`} share="morph" default="none">
                <LineReveal
                  as="span"
                  className="block headline transition-colors group-hover:text-accent"
                >
                  {w.title}
                </LineReveal>
              </ViewTransition>
              <span className="mt-3 block measure text-ink-muted">{w.summary}</span>
            </span>
            <span className="label text-ink-muted">
              {w.year}
              {w.confidential ? ' NDA' : ''}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
