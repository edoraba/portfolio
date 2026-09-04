import { AboutBox } from '@/components/plates/about-box'
import { Cloth } from '@/components/plates/cloth'
import { Hero } from '@/components/plates/hero'
import { Notes } from '@/components/plates/notes'
import { Tunnel } from '@/components/plates/tunnel'
import { WorkStage } from '@/components/plates/work-stage'
import { labs, works, writings } from '@/lib/content'
import { PageTransition } from '@/components/page-transition'
import { SmoothScroll } from '@/components/smooth-scroll'

/**
 * The home is one story in seven plates: what I do, who I am, the work, the smaller pieces,
 * the toolbox (Plan 06), where it came from, and how to reach me. Each plate owns its own
 * scroll choreography; the console header prints the one you are reading.
 */
export default function Home() {
  const cases = works.slice(0, 5)
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

      <Tunnel />

      <Cloth />
    </PageTransition>
  )
}
