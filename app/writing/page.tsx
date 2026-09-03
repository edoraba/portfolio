import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { writings } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'

export const metadata: Metadata = { title: 'Writing' }

export default function WritingPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Writing"
        lede="Notes on building products, type and working with agents."
      />
      {writings.length === 0 ? (
        <section className="site-container mt-16 page-x">
          <p className="measure text-ink-muted">
            Nothing published yet. The first three essays are being written; the titles are in the
            colophon changelog when they land.
          </p>
        </section>
      ) : (
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
      )}
    </PageTransition>
  )
}
