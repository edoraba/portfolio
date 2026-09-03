'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { navItems, site } from '@/lib/site'
import { CopyEmail } from './copy-email'
import { Decode } from './decode'
import { FooterField } from './footer-field'
import { LocalTime } from './local-time'
import { MotionToggle } from './motion-toggle'

const linkClass = 'inline-flex items-center py-2 transition-colors hover:text-ink'

/**
 * The footer is a destination: the field returns behind it, the email is one tap away,
 * every fact is real text (location, local time, status), and the site's own controls live here.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null)
  return (
    <footer ref={ref} className="relative site-container mt-section page-x py-12 hairline-t">
      <FooterField target={ref} />
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label text-ink-muted">
            <Decode>Write to me</Decode>
          </p>
          <p className="mt-4 measure text-ink">
            Working on a product that needs design and engineering in the same hands? Turin or
            remote.
          </p>
          <CopyEmail className="mt-4 headline" />
        </div>
        <nav aria-label="Footer" className="md:col-span-5">
          <ol className="grid grid-cols-2 gap-x-6 label text-ink-muted">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkClass}>
                  <span className="mr-2 text-accent">{n.n}</span>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/now" className={linkClass}>
                <span className="mr-2 text-accent">5</span>Now
              </Link>
            </li>
            <li>
              <Link href="/colophon" className={linkClass}>
                <span className="mr-2 text-accent">6</span>Colophon
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      <dl className="mt-12 grid gap-y-6 pt-8 label text-ink-muted hairline-t sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt>
            <Decode>Location</Decode>
          </dt>
          <dd className="mt-2 text-ink">Turin, IT. 45.07 N, 7.69 E</dd>
        </div>
        <div>
          <dt>
            <Decode>Local time</Decode>
          </dt>
          <dd className="mt-2 text-ink">
            <LocalTime />
          </dd>
        </div>
        <div>
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
        </div>
        <div>
          <dt>
            <Decode>Motion</Decode>
          </dt>
          <dd className="mt-2">
            <MotionToggle />
          </dd>
        </div>
      </dl>

      <p className="mt-10 label text-ink-muted">
        Designed and built by me in {site.location}. Press G for the grid, Cmd K for the palette.
        MMXXVI.
      </p>
    </footer>
  )
}
