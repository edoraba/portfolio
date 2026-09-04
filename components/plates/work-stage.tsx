'use client'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { beatAt, clamp01, itemProgress, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { Cell } from '../sheet/cell'
import { Sheet } from '../sheet/sheet'
import { getLenis } from '../smooth-scroll'
import { LetterGrid } from './letter-grid'
import { Plate } from './plate'
import { Timecode } from './timecode'
import { WorkCover, type CoverWork } from './work-cover'

/**
 * Where each cover lands on the sheet: three across the upper row, two wider ones below.
 * The gaps are deliberate; the letter field shows through them.
 */
const SLOTS = [
  { col: 3, end: 6, row: 1, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 6, end: 9, row: 1, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 9, end: 12, row: 1, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 4, end: 8, row: 2, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 8, end: 12, row: 2, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
] as const

/** Beat boundaries: letters in, covers rising, letters parting. */
const BEATS = [0.28, 0.82]

export function WorkStage({ works }: { works: CoverWork[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useMotion((s) => s.reduced)
  const [index, setIndex] = useState(0)
  const trigger = useRef<ScrollTrigger | null>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const covers = Array.from(section.querySelectorAll<HTMLElement>('[data-cover]'))
        const rows = Array.from(section.querySelectorAll<HTMLElement>('.letters__row'))
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${headerHeight()}`,
            end: '+=200%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const p = state.p
            const { index: beat, local } = beatAt(p, BEATS)
            rows.forEach((row, i) => {
              const slid = beat === 0 ? itemProgress(local, i, rows.length, 0.7) : 1
              const parted = beat === 2 ? local : 0
              const dir = i % 2 === 0 ? -1 : 1
              row.style.setProperty(
                '--letters-x',
                `${(lerp(dir * 110, 0, slid) + parted * dir * 9).toFixed(2)}%`,
              )
              row.style.setProperty('--letters-o', (slid * (1 - parted * 0.75)).toFixed(3))
            })
            const at = (i: number) =>
              beat === 0 ? 0 : beat === 2 ? 1 : itemProgress(local, i, covers.length, 0.5)
            covers.forEach((cover, i) => cover.style.setProperty('--cover-in', at(i).toFixed(3)))
            setIndex(covers.reduce((acc, _, i) => (at(i) > 0.5 ? i : acc), 0))
            section.dataset.state = p > 0.98 ? 'done' : 'running'
          },
        })
        trigger.current = tween.scrollTrigger ?? null
        return () => {
          trigger.current = null
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      // Below the pin breakpoint each cover simply lands as it enters.
      mm.add('(max-width: 1023.98px)', () => {
        const covers = Array.from(section.querySelectorAll<HTMLElement>('[data-cover]'))
        const tweens = covers.map((cover) =>
          gsap.fromTo(
            cover,
            { '--cover-in': 0 },
            {
              '--cover-in': 1,
              duration: 0.8,
              ease: 'editorial',
              scrollTrigger: { trigger: cover, start: 'top 88%', once: true },
            },
          ),
        )
        section.dataset.state = 'done'
        return () => tweens.forEach((t) => t.kill())
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  /** Scroll to the point in the pinned range where cover `i` has landed. */
  const goTo = (i: number) => {
    const st = trigger.current
    if (!st) {
      document
        .querySelector(`[data-cover="${works[i]?.order}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const span = BEATS[1] - BEATS[0]
    const at =
      BEATS[0] + span * 0.15 + (works.length > 1 ? (i / (works.length - 1)) * span * 0.85 : 0)
    const top = st.start + (st.end - st.start) * clamp01(at)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(top, { duration: 0.9 })
    else window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <Plate
      id="work"
      sectionRef={sectionRef}
      className="work-plate"
      meta={<span>{works.length} case studies, designed and built</span>}
    >
      <Cell col={1} end={13} row={2} flush className="work-stage">
        <Sheet nested className="work-stage__grid">
          <Cell
            col={1}
            end={3}
            row="1 / 3"
            md={{ col: 1, end: 7 }}
            sm={{ col: 1, end: 5 }}
            l
            t
            b
            className="work-word"
          >
            <span className="work-word__pill">
              <span className="work-word__text" aria-hidden="true">
                Work
              </span>
            </span>
            <Link href="/work" className="work-word__all label text-accent">
              All work
            </Link>
          </Cell>

          <Cell
            col={3}
            end={13}
            row="1 / 3"
            md={{ col: 1, end: 7 }}
            sm={{ col: 1, end: 5 }}
            flush
            className="letters-cell"
          >
            <LetterGrid />
          </Cell>

          {works.map((w, i) => {
            const slot = SLOTS[Math.min(i, SLOTS.length - 1)]
            return <WorkCover key={w.slug} work={w} span={slot} />
          })}
        </Sheet>
      </Cell>

      <Cell col={1} end={13} row={3} l r b>
        <Timecode labels={works.map((w) => w.client)} index={index} onSelect={goTo} />
      </Cell>
    </Plate>
  )
}
