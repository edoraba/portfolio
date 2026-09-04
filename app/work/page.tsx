import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { WorkList } from '@/components/work-list'
import { works } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

export const metadata: Metadata = { title: 'Work' }

export default function WorkPage() {
  return (
    <PageTransition>
      <SmoothScroll />
      <PageHeader
        n="P/01"
        title="Work"
        lede="Five case studies of products I designed and built, plus shorter notes."
      />
      <div className="mt-16 pb-16">
        <WorkList works={works} />
        <Sheet>
          <Rule />
        </Sheet>
      </div>
    </PageTransition>
  )
}
