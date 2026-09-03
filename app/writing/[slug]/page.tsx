import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx-components'
import { writingBySlug, writingsIncludingDrafts } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return writingsIncludingDrafts.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = writingBySlug(slug)
  return w ? { title: w.title, description: w.description } : {}
}

export default async function Essay({ params }: Props) {
  const { slug } = await params
  const w = writingBySlug(slug)
  if (!w) notFound()
  return (
    <article className="site-container page-x pt-16 md:pt-24">
      <p className="label text-ink-muted">{w.date}</p>
      <h1 className="mt-4 display">{w.title}</h1>
      <p className="mt-8 measure text-ink-muted">{w.description}</p>
      <div className="mt-8">
        <Mdx code={w.body} />
      </div>
    </article>
  )
}
