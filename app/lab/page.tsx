import type { Metadata } from 'next'
import Link from 'next/link'
import { FieldPlate } from '@/components/field-plate'
import { PageHeader } from '@/components/page-header'
import { labs } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

export const metadata: Metadata = { title: 'Lab' }

export default function LabPage() {
  const latest = labs[0]
  return (
    <PageTransition>
      <PageHeader
        n="P/02"
        title="Lab"
        lede="Small live pieces, dated. Most come out of real work and stay here once the work has moved on."
        facts={[
          { label: 'Pieces', value: String(labs.length) },
          { label: 'Latest', value: latest?.date ?? '' },
          { label: 'All live', value: 'Running on this page' },
        ]}
      />
      {/* One ruled row a piece, spanning the sheet, with the thing itself running beside the
          list: a grid of cards makes a short index look like a mistake, and a rule does not. */}
      <Sheet>
        <Cell
          col={1}
          end={9}
          md={{ col: 1, end: 7 }}
          sm={{ col: 1, end: 5 }}
          l
          r
          flush
          className="lg:after:hidden"
        >
          <ul className="lab-index">
            {labs.map((l, i) => (
              <li key={l.slug}>
                <Link href={`/lab/${l.slug}`} className="lab-row">
                  <span className="lab-row__n label text-accent">
                    P/{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="lab-row__body">
                    <span className="headline">{l.title}</span>
                    <span className="mt-3 block measure text-ink-muted">{l.description}</span>
                  </span>
                  <span className="lab-row__date label text-ink-muted">{l.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Cell>
        <Cell col={9} end={13} l r flush className="hidden lg:block">
          <FieldPlate id="lab-index" className="h-full min-h-[260px]" />
        </Cell>
        <Rule />
      </Sheet>
    </PageTransition>
  )
}
