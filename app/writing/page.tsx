import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { writings } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

export const metadata: Metadata = { title: 'Writing' }

export default function WritingPage() {
  return (
    <PageTransition>
      <PageHeader
        n="P/03"
        title="Writing"
        lede="Notes on building products, type and working with agents."
      />
      {writings.length === 0 ? (
        <Sheet className="mt-16 pb-16">
          <Cell col={1} end={9} md={{ col: 1, end: 7 }} l r t b>
            <p className="measure text-ink-muted">
              Nothing published yet. The first three essays are being written; the titles are in the
              colophon changelog when they land.
            </p>
          </Cell>
        </Sheet>
      ) : (
        <ol className="mt-16 pb-16">
          {writings.map((w, i) => (
            <li key={w.slug}>
              <Link href={`/writing/${w.slug}`} className="sheet group">
                <Rule />
                <Cell as="span" col={1} end={2} md={{ col: 1, end: 2 }} sm={{ col: 1, end: 2 }} l>
                  <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                </Cell>
                <Cell as="span" col={2} end={11} md={{ col: 2, end: 6 }} sm={{ col: 2, end: 5 }} l>
                  <span className="block headline transition-colors group-hover:text-accent">
                    {w.title}
                  </span>
                  <span className="mt-3 block measure text-ink-muted">{w.description}</span>
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
                  {w.date}
                  {w.draft ? ' draft' : ''}
                </Cell>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </PageTransition>
  )
}
