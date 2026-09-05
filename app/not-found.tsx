import Link from 'next/link'
import { navItems } from '@/lib/site'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { rowEdge } from '@/components/sheet/edge'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

export default function NotFound() {
  return (
    <PageTransition>
      <Sheet className="pb-16">
        <Rule />
        <PlateNumber n="404" col={1} end={3} md={{ col: 1, end: 3 }} />
        <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r />
        <Rule />
        <Cell col={1} end={13} l r className="py-10 md:py-16">
          <h1 className="display-xl">Nothing here.</h1>
        </Cell>
        {navItems.map((n, i) => (
          <Cell
            key={n.href}
            col={i * 3 + 1}
            end={i * 3 + 4}
            md={{ col: (i % 2) * 3 + 1, end: (i % 2) * 3 + 4 }}
            sm={{ col: 1, end: 5 }}
            l
            r
            flush
            className={rowEdge(i, 4)}
          >
            <Link href={n.href} className="console-link label text-ink-muted hover:text-ink">
              <span className="text-accent">{n.n}</span>
              <span className="ml-2">{n.label}</span>
            </Link>
          </Cell>
        ))}
        <Rule />
      </Sheet>
    </PageTransition>
  )
}
