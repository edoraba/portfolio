import { AboutBox } from '@/components/plates/about-box'
import { Cloth } from '@/components/plates/cloth'
import { Hero } from '@/components/plates/hero'
import { Notes } from '@/components/plates/notes'
import { Toolbox } from '@/components/plates/toolbox'
import { Tunnel } from '@/components/plates/tunnel'
import { WorkStage } from '@/components/plates/work-stage'
import { labs, pageBySlug, works, writings } from '@/lib/content'
import { tagsFromContent } from '@/lib/physics/toolbox'
import { PageTransition } from '@/components/page-transition'
import { SmoothScroll } from '@/components/smooth-scroll'

/**
 * The home is one story in seven plates: what I do, who I am, the work, the smaller pieces,
 * the toolbox (Plan 06), where it came from, and how to reach me. Each plate owns its own
 * scroll choreography; the console header prints the one you are reading.
 */
export default function Home() {
  const cases = works.slice(0, 5)
  // Only what the content already claims: the case study stacks plus the tools named in About.
  const aboutStack = pageBySlug('about')
    ? ['React', 'Next.js', 'Astro', 'Figma', 'Claude Code']
    : []
  const toolboxTags = tagsFromContent(
    works.map((w) => w.stack),
    aboutStack,
  )
  return (
    <PageTransition>
      <SmoothScroll />
      <Hero
        works={cases.map((w) => ({
          slug: w.slug,
          order: w.order,
          client: w.client,
          year: w.year,
        }))}
      />

      <AboutBox />

      <WorkStage
        works={cases.map((w) => ({
          slug: w.slug,
          order: w.order,
          title: w.title,
          client: w.client,
          year: w.year,
          stack: [...w.stack],
          confidential: w.confidential,
        }))}
      />

      <Notes
        labs={labs.slice(0, 3).map((l) => ({
          slug: l.slug,
          title: l.title,
          date: l.date,
          href: `/lab/${l.slug}`,
        }))}
        writings={writings.slice(0, 3).map((w) => ({
          slug: w.slug,
          title: w.title,
          date: w.date,
          href: `/writing/${w.slug}`,
        }))}
      />

      <Toolbox tags={toolboxTags} />

      <Tunnel />

      <Cloth />
    </PageTransition>
  )
}
