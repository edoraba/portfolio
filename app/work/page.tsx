import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { WorkList } from '@/components/work-list'
import { works } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { SmoothScroll } from '@/components/smooth-scroll'

export const metadata: Metadata = { title: 'Work' }

export default function WorkPage() {
  return (
    <PageTransition>
      <SmoothScroll />
      <PageHeader
        title="Work"
        lede="Five case studies of products I designed and built, plus shorter notes."
      />
      <section className="site-container mt-16 page-x">
        <WorkList works={works} />
      </section>
    </PageTransition>
  )
}
