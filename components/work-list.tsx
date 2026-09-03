import type { Work } from 'content-collections'
import Link from 'next/link'

export function WorkList({ works }: { works: Work[] }) {
  return (
    <ol className="hairline-t">
      {works.map((w) => (
        <li key={w.slug} className="hairline-b">
          <Link
            href={`/work/${w.slug}`}
            className="group grid gap-3 py-8 md:grid-cols-[3rem_1fr_auto] md:items-baseline"
          >
            <span className="label text-accent">{String(w.order).padStart(2, '0')}</span>
            <span>
              <span className="block headline transition-colors group-hover:text-accent">
                {w.title}
              </span>
              <span className="mt-3 block measure text-ink-muted">{w.summary}</span>
            </span>
            <span className="label text-ink-muted">
              {w.year}
              {w.confidential ? ' NDA' : ''}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
