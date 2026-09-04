'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { navItems, site } from '@/lib/site'
import { CopyEmail } from './copy-email'
import { Decode } from './decode'
import { FooterField } from './footer-field'
import { LocalTime } from './local-time'
import { MotionToggle } from './motion-toggle'
import { Cell } from './sheet/cell'
import { Sheet } from './sheet/sheet'

const linkClass = 'inline-flex items-center py-2 transition-colors hover:text-ink'

const FOOT_NAV = [
  ...navItems,
  { n: '5', label: 'Now', href: '/now' },
  { n: '6', label: 'Colophon', href: '/colophon' },
] as const

/**
 * The footer console: the field returns behind it in band mode, the email is one tap away,
 * every fact is a cell on the sheet (location, local time, elsewhere, motion), and the
 * numbered map of the site closes the page.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null)
  return (
    <footer ref={ref} className="site-footer relative mt-section">
      <FooterField target={ref} />
      <Sheet>
        <Cell col={1} end={8} md={{ col: 1, end: 7 }} l r t b className="py-10 md:py-14">
          <p className="label text-ink-muted">
            <Decode>Write to me</Decode>
          </p>
          <p className="mt-4 measure text-ink">
            Working on a product that needs design and engineering in the same hands? Turin or
            remote.
          </p>
          <CopyEmail className="mt-4 headline" />
        </Cell>
        <Cell
          as="nav"
          aria-label="Footer"
          col={8}
          end={13}
          md={{ col: 1, end: 7 }}
          r
          t
          b
          className="py-10 md:py-14"
        >
          <ol className="grid grid-cols-2 gap-x-6 label text-ink-muted">
            {FOOT_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkClass}>
                  <span className="mr-2 text-accent">{n.n}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ol>
        </Cell>
      </Sheet>

      <Sheet as="dl">
        <Cell
          col={1}
          end={4}
          md={{ col: 1, end: 4 }}
          sm={{ col: 1, end: 3 }}
          l
          b
          className="label text-ink-muted"
        >
          <dt>
            <Decode>Location</Decode>
          </dt>
          <dd className="mt-2 text-ink">Turin, IT. {site.coordinates}</dd>
        </Cell>
        <Cell
          col={4}
          end={7}
          md={{ col: 4, end: 7 }}
          sm={{ col: 3, end: 5 }}
          l
          r
          b
          className="label text-ink-muted"
        >
          <dt>
            <Decode>Local time</Decode>
          </dt>
          <dd className="mt-2 text-ink">
            <LocalTime />
          </dd>
        </Cell>
        <Cell
          col={7}
          end={10}
          md={{ col: 1, end: 4 }}
          sm={{ col: 1, end: 3 }}
          l
          b
          className="label text-ink-muted"
        >
          <dt>
            <Decode>Elsewhere</Decode>
          </dt>
          <dd className="mt-2 flex flex-wrap gap-x-4 text-ink">
            <a href={site.github} className={linkClass}>
              GitHub
            </a>
            <a href={site.linkedin} className={linkClass}>
              LinkedIn
            </a>
            <a href={site.repo} className={linkClass}>
              Source
            </a>
          </dd>
        </Cell>
        <Cell
          col={10}
          end={13}
          md={{ col: 4, end: 7 }}
          sm={{ col: 3, end: 5 }}
          l
          r
          b
          className="label text-ink-muted"
        >
          <dt>
            <Decode>Motion</Decode>
          </dt>
          <dd className="mt-2">
            <MotionToggle />
          </dd>
        </Cell>
      </Sheet>
      <Sheet>
        <Cell col={1} end={13} l r b className="label text-ink-muted">
          <p>
            Designed and built by me in {site.location}. Press G for the grid, T for the theme, Cmd
            K for the palette. MMXXVI.
          </p>
        </Cell>
      </Sheet>
    </footer>
  )
}
