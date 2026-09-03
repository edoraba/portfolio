import Link from 'next/link'
import { navItems } from '@/lib/site'

export default function NotFound() {
  return (
    <section className="site-container page-x pt-24">
      <p className="label text-accent">404</p>
      <h1 className="mt-4 display-xl">Nothing here.</h1>
      <ul className="mt-12 flex flex-wrap gap-6 label">
        {navItems.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className="text-ink-muted hover:text-ink">
              <span className="text-accent">{n.n}</span> {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
