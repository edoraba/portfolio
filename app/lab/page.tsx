import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { labs } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { Sheet } from '@/components/sheet/sheet'

export const metadata: Metadata = { title: 'Lab' }

export default function LabPage() {
  return (
    <PageTransition>
      <PageHeader n="P/02" title="Lab" lede="Small live pieces, dated. Most come from real work." />
      <Sheet as="ul" className="mt-16 pb-16">
        {labs.map((l, i) => {
          const c = (i % 3) * 4 + 1
          return (
            <Cell
              as="li"
              key={l.slug}
              col={c}
              end={c + 4}
              md={{ col: (i % 2) * 3 + 1, end: (i % 2) * 3 + 4 }}
              sm={{ col: 1, end: 5 }}
              l
              t
              b
              flush
            >
              <Link
                href={`/lab/${l.slug}`}
                className="block aspect-[4/3] bg-surface p-3 transition-colors hover:bg-surface-2"
              >
                <p className="label text-ink-muted">{l.date}</p>
                <p className="mt-4 headline">{l.title}</p>
                <p className="mt-3 text-ink-muted">{l.description}</p>
              </Link>
            </Cell>
          )
        })}
      </Sheet>
    </PageTransition>
  )
}
