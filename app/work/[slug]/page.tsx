import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx-components'
import { workBySlug, works } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = workBySlug(slug)
  return w ? { title: w.title, description: w.summary } : {}
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params
  const w = workBySlug(slug)
  if (!w) notFound()
  const meta: [string, string][] = [
    ['Client', w.client],
    ['Year', w.year],
    ['Role', w.role],
    ['Team', w.team],
    ['Stack', w.stack.join(', ')],
    ['Status', w.status],
  ]
  return (
    <article className="site-container page-x pt-16 md:pt-24">
      <p className="label text-accent">{String(w.order).padStart(2, '0')}</p>
      <h1 className="mt-4 display">{w.title}</h1>
      <p className="mt-8 measure text-ink-muted">{w.summary}</p>
      <dl className="mt-12 grid gap-y-4 py-6 hairline-b hairline-t md:grid-cols-3">
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="label text-ink-muted">{k}</dt>
            <dd className="mt-1">{v}</dd>
          </div>
        ))}
        {Object.entries(w.links).map(([k, href]) => (
          <div key={k}>
            <dt className="label text-ink-muted">{k}</dt>
            <dd className="mt-1">
              <a href={href} className="text-accent">
                {href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-8">
        <Mdx code={w.body} />
      </div>
    </article>
  )
}
