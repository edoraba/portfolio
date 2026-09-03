import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdx-components'
import { PageHeader } from '@/components/page-header'
import { pageBySlug } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'

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
      <section className="site-container mt-8 page-x">
        <Mdx code={page.body} />
      </section>
    </PageTransition>
  )
}
