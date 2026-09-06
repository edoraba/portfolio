import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { Mdx } from '@/components/mdx-components'
import { PageHeader, type Fact } from '@/components/page-header'
import { pageBySlug } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { Cell } from './sheet/cell'
import { Rule } from './sheet/rule'
import { Sheet } from './sheet/sheet'

/**
 * Shared shape for the MDX backed pages, about and colophon: the title band with its readout, the
 * prose in the left eight columns and whatever the page wants to put beside it in the last four.
 * The aside is not decoration: on a page of one column the sheet has nothing to rule against for
 * the width of a screen, and it stops reading as a sheet at all.
 */
export function MdxPage({
  slug,
  n,
  facts,
  aside,
}: {
  slug: string
  n?: string
  facts?: Fact[]
  aside?: ReactNode
}) {
  const page = pageBySlug(slug)
  if (!page) notFound()
  return (
    <PageTransition>
      <PageHeader
        n={n}
        title={page.title}
        lede={page.description}
        eyebrow={page.updated ? `Updated ${page.updated}` : undefined}
        facts={facts}
      />
      <Sheet className="pb-16">
        <Cell
          col={1}
          end={9}
          md={{ col: 1, end: 7 }}
          sm={{ col: 1, end: 5 }}
          l
          r
          className="prose-cell"
        >
          <Mdx code={page.body} />
        </Cell>
        <Cell col={9} end={13} l r className="hidden py-8 lg:block">
          {aside}
        </Cell>
        <Rule />
      </Sheet>
    </PageTransition>
  )
}
