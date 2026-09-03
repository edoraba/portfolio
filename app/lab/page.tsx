import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { labs } from '@/lib/content'

export const metadata: Metadata = { title: 'Lab' }

export default function LabPage() {
  return (
    <>
      <PageHeader title="Lab" lede="Small live pieces, dated. Most come from real work." />
      <ul className="site-container mt-16 grid gap-px bg-hairline page-x md:grid-cols-2 lg:grid-cols-3">
        {labs.map((l) => (
          <li key={l.slug} className="bg-canvas">
            <Link
              href={`/lab/${l.slug}`}
              className="block aspect-[4/3] bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <p className="label text-ink-muted">{l.date}</p>
              <p className="mt-4 headline">{l.title}</p>
              <p className="mt-3 text-ink-muted">{l.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
