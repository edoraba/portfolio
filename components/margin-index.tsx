import Link from 'next/link'
import { Decode } from './decode'

export type IndexItem = { n: string; label: string; href: string; meta?: string }

export function MarginIndex({ items, label = 'Index' }: { items: IndexItem[]; label?: string }) {
  return (
    <nav aria-label={label} className="label">
      <ol className="space-y-3">
        {items.map((it) => (
          <li key={it.href} className="flex gap-3">
            <Decode className="w-6 text-ink">{it.n}</Decode>
            <Link href={it.href} className="text-ink-muted transition-colors hover:text-ink">
              {it.label}
            </Link>
            {it.meta ? <span className="ml-auto text-accent">{it.meta}</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
