import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx-components'
import { labBySlug, labs } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const l = labBySlug(slug)
  return l ? { title: l.title, description: l.description } : {}
}

export default async function LabDetail({ params }: Props) {
  const { slug } = await params
  const l = labBySlug(slug)
  if (!l) notFound()
  return (
    <article className="site-container page-x pt-16 md:pt-24">
      <p className="label text-ink-muted">{l.date}</p>
      <h1 className="mt-4 display">{l.title}</h1>
      <div className="mt-12 aspect-video bg-surface" aria-hidden="true" />
      <div className="mt-8">
        <Mdx code={l.body} />
      </div>
      {l.source ? (
        <a href={l.source} className="mt-8 inline-block label text-accent">
          Source
        </a>
      ) : null}
    </article>
  )
}
