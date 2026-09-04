import Link from 'next/link'
import { Hero } from '@/components/plates/hero'
import { WorkList } from '@/components/work-list'
import { featuredWorks, labs, writings } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Cell } from '@/components/sheet/cell'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

// Plan 04 shell: the home on the sheet. The plates (P/02 to P/07) arrive with Plan 05.
export default function Home() {
  const four = featuredWorks.slice(0, 4)
  return (
    <PageTransition>
      <SmoothScroll />
      <Hero
        works={four.map((w) => ({
          slug: w.slug,
          order: w.order,
          client: w.client,
          year: w.year,
        }))}
      />

      <div className="mt-section">
        <Sheet>
          <PlateNumber
            n={3}
            label="Selected work"
            col={1}
            end={4}
            md={{ col: 1, end: 4 }}
            sm={{ col: 1, end: 3 }}
          />
          <Cell col={4} end={13} md={{ col: 4, end: 7 }} sm={{ col: 3, end: 5 }} l r t />
        </Sheet>
        <WorkList works={four} />
        <Sheet>
          <Cell col={1} end={13} l r t b>
            <Link href="/work" className="label text-accent">
              All work
            </Link>
          </Cell>
        </Sheet>
      </div>

      <Sheet className="mt-section pb-16">
        <PlateNumber
          n={4}
          label="Notes"
          col={1}
          end={4}
          md={{ col: 1, end: 4 }}
          sm={{ col: 1, end: 3 }}
        />
        <Cell col={4} end={13} md={{ col: 4, end: 7 }} sm={{ col: 3, end: 5 }} l r t />
        <Cell col={1} end={7} md={{ col: 1, end: 4 }} l t b className="py-8">
          <h2 className="label text-ink-muted">Lab</h2>
          <ul className="mt-6 space-y-3">
            {labs.slice(0, 3).map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/lab/${l.slug}`}
                  className="headline transition-colors hover:text-accent"
                >
                  {l.title}
                </Link>
                <span className="ml-3 label text-ink-muted">{l.date}</span>
              </li>
            ))}
          </ul>
        </Cell>
        <Cell
          col={7}
          end={13}
          md={{ col: 4, end: 7 }}
          l
          r
          t
          b
          className="py-8"
          hidden={writings.length === 0}
        >
          <h2 className="label text-ink-muted">Writing</h2>
          <ul className="mt-6 space-y-3">
            {writings.slice(0, 3).map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/writing/${w.slug}`}
                  className="headline transition-colors hover:text-accent"
                >
                  {w.title}
                </Link>
                <span className="ml-3 label text-ink-muted">{w.date}</span>
              </li>
            ))}
          </ul>
        </Cell>
        <Rule />
      </Sheet>
    </PageTransition>
  )
}
