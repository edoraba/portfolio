import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConsolePlate } from '@/components/console/console-plate'
import { Mdx } from '@/components/mdx-components'
import { writingBySlug, writingsIncludingDrafts } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

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
    <PageTransition>
      <article className="pb-16">
        <ConsolePlate label={`Writing ${w.title}`} />
        <Sheet as="header">
          <Rule />
          <PlateNumber n="Essay" label={w.date} col={1} end={3} md={{ col: 1, end: 3 }} />
          <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r />
          <Rule />
          <Cell
            col={1}
            end={9}
            md={{ col: 1, end: 7 }}
            l
            r
            className="pt-8 pb-10 md:pt-12 lg:after:hidden"
          >
            <h1 className="display">{w.title}</h1>
            <p className="mt-8 measure text-ink-muted">{w.description}</p>
          </Cell>
          <Cell col={9} end={13} l r className="hidden lg:block" />
        </Sheet>
        <Sheet className="mt-8">
          <Cell col={1} end={9} md={{ col: 1, end: 7 }} l r className="prose-cell">
            <Mdx code={w.body} />
          </Cell>
        </Sheet>
      </article>
    </PageTransition>
  )
}
