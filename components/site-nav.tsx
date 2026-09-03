import Link from 'next/link'
import { navItems, site } from '@/lib/site'
import { ThemeToggle } from './theme-toggle'

export function SiteNav() {
  return (
    <header className="site-container flex h-16 items-center justify-between page-x">
      <Link href="/" className="label text-ink transition-colors duration-200 hover:text-accent">
        {site.name}
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="label text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                <span className="text-accent">{item.n}</span>
                <span className="ml-1 hidden sm:inline">{item.label}</span>
                <span className="sr-only sm:hidden">{item.label}</span>
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
