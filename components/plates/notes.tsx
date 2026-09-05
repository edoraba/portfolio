'use client'
import Link from 'next/link'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

export type NoteItem = { slug: string; title: string; date: string; href: string }

/**
 * P/04. Two ruled indexes side by side: the lab pieces on the left with a dither plate that
 * shifts on a slow cycle, the essays on the right. No pin: after two pinned plates the reader
 * gets a plain page again.
 */
export function Notes({ labs, writings }: { labs: NoteItem[]; writings: NoteItem[] }) {
  return (
    <Plate id="notes" className="notes-plate" meta={<span>Smaller pieces and essays</span>}>
      <Rule />
      <Cell col={1} end={7} md={{ col: 1, end: 4 }} sm={{ col: 1, end: 5 }} l className="py-8">
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
        <div className="notes-plate__dither" aria-hidden="true" />
      </Cell>
      <Cell
        col={7}
        end={13}
        md={{ col: 4, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        className="py-8"
        hidden={writings.length === 0}
      >
        <h2 className="label text-ink-muted">Writing</h2>
        <ul className="mt-6 space-y-4">
          {writings.map((w) => (
            <li key={w.slug}>
              <Link href={w.href} className="headline transition-colors hover:text-accent">
                {w.title}
              </Link>
              <span className="ml-3 label text-ink-muted">{w.date}</span>
            </li>
          ))}
        </ul>
      </Cell>
      <Rule />
    </Plate>
  )
}
