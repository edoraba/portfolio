import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { writings } from '@/lib/content'

export const metadata: Metadata = { title: 'Writing' }

export default function WritingPage() {
  return (
    <>
      <PageHeader
        title="Writing"
        lede="Notes on building products, type and working with agents."
      />
      <ol className="site-container mt-16 page-x hairline-t">
        {writings.map((w) => (
          <li key={w.slug} className="py-8 hairline-b">
            <Link
              href={`/writing/${w.slug}`}
              className="headline transition-colors hover:text-accent"
            >
              {w.title}
            </Link>
            <p className="mt-3 measure text-ink-muted">{w.description}</p>
            <p className="mt-3 label text-ink-muted">
              {w.date}
              {w.draft ? ' draft' : ''}
            </p>
          </li>
        ))}
      </ol>
    </>
  )
}
