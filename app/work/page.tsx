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
  const all = works.map((w) => w.year).sort()
  const years = all.length > 1 && all[0] !== all.at(-1) ? `${all[0]} to ${all.at(-1)}` : all[0]

  return (
    <PageTransition>
      <SmoothScroll />
      <PageHeader
        n="P/01"
        title="Work"
        lede="Five case studies of products I designed and built, plus shorter notes."
        facts={[
          { label: 'Case studies', value: String(works.length) },
          { label: 'Years', value: years },
          { label: 'Under NDA', value: String(works.filter((w) => w.confidential).length) },
        ]}
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
