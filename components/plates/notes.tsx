'use client'
import Link from 'next/link'
import { FieldPlate } from '../field-plate'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

export type NoteItem = { slug: string; title: string; date: string; href: string }

/**
 * P/04. The lab index and the thing it points at, side by side: the pieces on the left, the
 * field itself running on the right, because the field is one of them. No pin: after two pinned
 * plates the reader gets a plain page again.
 */
export function Notes({ labs }: { labs: NoteItem[] }) {
  return (
    <Plate id="notes" className="notes-plate" meta={<span>Smaller pieces, live</span>}>
      <Rule />
      <Cell
        col={1}
        end={7}
        md={{ col: 1, end: 4 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        className="flex flex-col py-8 md:after:hidden"
      >
        <h2 className="label text-ink-muted">Lab</h2>
        <ul className="mt-6 space-y-4">
          {labs.map((l) => (
            <li key={l.slug}>
              <Link href={l.href} className="headline transition-colors hover:text-accent">
                {l.title}
              </Link>
              <span className="ml-3 label text-ink-muted">{l.date}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 measure text-ink-muted">
          Small live pieces, dated. Most come out of real work and stay here once the work has moved
          on.
        </p>
      </Cell>
      <Cell col={7} end={13} md={{ col: 4, end: 7 }} sm={{ col: 1, end: 5 }} l r flush>
        {/* The piece the list points at is the field, and this is it running. */}
        <FieldPlate id="notes-plate" className="h-full min-h-[220px]" />
      </Cell>
      <Rule />
    </Plate>
  )
}
