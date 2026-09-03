import Link from 'next/link'
import { navItems, site } from '@/lib/site'
import { ThemeToggle } from './theme-toggle'

// Every interactive element in the bar is at least 24px in both dimensions (WCAG 2.5.8).
// Below sm the name collapses to the monogram so the four labelled items still fit on one line.
export function SiteNav() {
  return (
    <header className="site-container flex h-16 items-center justify-between gap-4 page-x">
      <Link
        href="/"
        aria-label={site.name}
        className="inline-flex min-h-6 items-center py-2 label text-ink transition-colors duration-200 hover:text-accent"
      >
        <span className="sm:hidden" aria-hidden="true">
          {site.shortName}
        </span>
        <span className="hidden sm:inline" aria-hidden="true">
          {site.name}
        </span>
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-4 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-6 min-w-6 items-center py-2 label text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                <span className="text-accent">{item.n}</span>
                <span className="ml-1">{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
