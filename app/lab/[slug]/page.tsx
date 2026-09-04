import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConsolePlate } from '@/components/console/console-plate'
import { Mdx } from '@/components/mdx-components'
import { labBySlug, labs } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Sheet } from '@/components/sheet/sheet'

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
    <PageTransition>
      <article className="pb-16">
        <ConsolePlate label={`Lab ${l.title}`} />
        <Sheet as="header">
          <PlateNumber n="Lab" label={l.date} col={1} end={3} md={{ col: 1, end: 3 }} />
          <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r t />
          <Cell col={1} end={9} md={{ col: 1, end: 7 }} l t b className="pt-8 pb-10 md:pt-12">
            <h1 className="display">{l.title}</h1>
          </Cell>
          <Cell col={9} end={13} l r t b className="hidden lg:block" />
        </Sheet>
        <Sheet className="mt-8">
          <Cell col={1} end={13} l r b flush>
            <div className="aspect-video bg-surface" aria-hidden="true" />
          </Cell>
          <Cell col={1} end={9} md={{ col: 1, end: 7 }} l r className="prose-cell">
            <Mdx code={l.body} />
            {l.source ? (
              <a href={l.source} className="mt-8 inline-block label text-accent">
                Source
              </a>
            ) : null}
          </Cell>
        </Sheet>
      </article>
    </PageTransition>
  )
}
