import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx-components'
import { PageHeader } from '@/components/page-header'
import { pageBySlug } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from './sheet/cell'
import { Sheet } from './sheet/sheet'

// Shared shape for the MDX-backed pages: about, now, colophon.
export function MdxPage({ slug }: { slug: string }) {
  const page = pageBySlug(slug)
  if (!page) notFound()
  return (
    <PageTransition>
      <PageHeader
        title={page.title}
        lede={page.description}
        eyebrow={page.updated ? `Updated ${page.updated}` : undefined}
      />
      <Sheet className="mt-8 pb-16">
        <Cell col={1} end={9} md={{ col: 1, end: 7 }} l r className="prose-cell">
          <Mdx code={page.body} />
        </Cell>
      </Sheet>
    </PageTransition>
  )
}
