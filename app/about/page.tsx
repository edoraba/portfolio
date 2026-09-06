import type { Metadata } from 'next'
import { MdxPage } from '@/components/mdx-page'
import { Aside, AsideRow } from '@/components/page-aside'
import { pageBySlug } from '@/lib/content'
import { site } from '@/lib/site'
import { SINCE_FRAMES } from '@/lib/since-frames'

const page = pageBySlug('about')

export const metadata: Metadata = page ? { title: page.title, description: page.description } : {}

/**
 * What the About text itself claims, and nothing else. The case study stacks hold the parts of
 * each product rather than the tools of a practice, so listing them here reads as a keyword dump.
 */
const stack = ['React', 'Next.js', 'TypeScript', 'Astro', 'Claude Code', 'Figma']

export default function AboutPage() {
  return (
    <MdxPage
      slug="about"
      n="P/03"
      facts={[
        { label: 'Role', value: 'Frontend developer' },
        { label: 'Also', value: 'Partner at Redergo' },
        { label: 'Based', value: site.location },
        { label: 'Since', value: '2020' },
      ]}
      aside={
        <>
          <Aside heading="The short version">
            {SINCE_FRAMES.map((frame) => (
              <AsideRow key={frame.id} label={frame.year ?? '\u00b7\u00b7'} value={frame.word} />
            ))}
          </Aside>
          <Aside heading="What I build with">
            {stack.map((tool) => (
              <AsideRow key={tool} label={tool} value="" />
            ))}
          </Aside>
          <Aside heading="Elsewhere">
            <AsideRow label="Email" value={site.email} href={`mailto:${site.email}`} />
            <AsideRow label="GitHub" value="edoraba" href={site.github} />
            <AsideRow label="LinkedIn" value="Profile" href={site.linkedin} />
            <AsideRow label="Work" value="Five case studies" href="/work" />
          </Aside>
        </>
      }
    />
  )
}
