import Link from 'next/link'
import { site } from '@/lib/site'
import { CopyEmail } from './copy-email'

export function Footer() {
  return (
    <footer className="site-container mt-section page-x py-10 hairline-t">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label text-ink-muted">Write to me</p>
          <CopyEmail className="mt-3 headline" />
        </div>
        <ul className="flex flex-wrap gap-6 label text-ink-muted">
          <li>
            <Link href="/now" className="transition-colors hover:text-ink">
              Now
            </Link>
          </li>
          <li>
            <Link href="/colophon" className="transition-colors hover:text-ink">
              Colophon
            </Link>
          </li>
          <li>
            <a href={site.github} className="transition-colors hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} className="transition-colors hover:text-ink">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-10 label text-ink-muted">
        {site.location}. Designed and built by me. MMXXVI.
      </p>
    </footer>
  )
}
