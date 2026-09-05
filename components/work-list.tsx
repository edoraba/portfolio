import type { Work } from 'content-collections'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { Decode } from './decode'
import { LineReveal } from './line-reveal'
import { Cell } from './sheet/cell'
import { Rule } from './sheet/rule'

/**
 * The case study index as rows of cells on the sheet: number, title and summary, year.
 * The whole row is one link; the title morphs into the case study heading.
 */
export function WorkList({ works }: { works: Work[] }) {
  return (
    <ol className="work-list">
      {works.map((w) => (
        <li key={w.slug}>
          <Link
            href={`/work/${w.slug}`}
            transitionTypes={['nav-forward']}
            className="work-row sheet group"
          >
            <Rule />
            <Cell as="span" col={1} end={2} md={{ col: 1, end: 2 }} sm={{ col: 1, end: 2 }} l>
              <Decode className="label text-accent">{`P/${String(w.order).padStart(2, '0')}`}</Decode>
            </Cell>
            <Cell
              as="span"
              col={2}
              end={11}
              md={{ col: 2, end: 6 }}
              sm={{ col: 2, end: 5 }}
              l
              r
              className="md:after:hidden"
            >
              <ViewTransition name={`work-title-${w.slug}`} share="morph" default="none">
                <LineReveal
                  as="span"
                  className="block headline transition-colors group-hover:text-accent"
                >
                  {w.title}
                </LineReveal>
              </ViewTransition>
              <span className="mt-3 block measure text-ink-muted">{w.summary}</span>
            </Cell>
            <Cell
              as="span"
              col={11}
              end={13}
              md={{ col: 6, end: 7 }}
              sm={{ col: 1, end: 5 }}
              l
              r
              className="label text-ink-muted"
            >
              {w.year}
              {w.confidential ? ' NDA' : ''}
            </Cell>
          </Link>
        </li>
      ))}
    </ol>
  )
}
