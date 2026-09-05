'use client'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, itemProgress, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { Cell } from '../sheet/cell'
import { Sheet } from '../sheet/sheet'
import { getLenis } from '../smooth-scroll'
import { Plate } from './plate'
import { Timecode } from './timecode'
import { WorkCover, type CoverWork } from './work-cover'

/** Where each cover rests once it has settled: three across, then two wider ones. */
const SLOTS = [
  { col: 1, end: 4, row: 1, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 5, end: 8, row: 1, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 9, end: 12, row: 1, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 2, end: 6, row: 2, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
  { col: 7, end: 11, row: 2, md: { col: 1, end: 7 }, sm: { col: 1, end: 5 } },
] as const

const WORD = ['W', 'O', 'R', 'K'] as const

/** Where the four letters hang in the space, in percent of the stage and in depth. */
const LETTERS = [
  { x: 8, y: 16, z: -1100 },
  { x: 72, y: 10, z: -820 },
  { x: 14, y: 66, z: -640 },
  { x: 80, y: 70, z: -900 },
] as const

/** Aperture open, space revealed, covers arriving. */
const OPEN_END = 0.34
const REVEAL = [0.26, 0.46] as const
const COVERS = [0.42, 0.92] as const

/**
 * P/03. The reader arrives at a closed hatch with the word standing in it, the hatch opens, and
 * inside is a space where the four letters hang at different depths and the five projects come
 * out of the dark and settle onto the sheet. The aperture is an octagon cut with clip-path, so
 * the system keeps its radius of zero. Below 1024px and under reduced motion the hatch is simply
 * open and the covers land as they enter.
 */
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
        const stage = section.querySelector<HTMLElement>('.porthole')
        const word = section.querySelector<HTMLElement>('.porthole__word')
        const space = section.querySelector<HTMLElement>('.porthole__space')
        const letters = Array.from(section.querySelectorAll<HTMLElement>('[data-letter]'))
        const covers = Array.from(section.querySelectorAll<HTMLElement>('[data-cover]'))
        if (!stage || !word || !space) return
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=200%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
          onUpdate: () => {
            const p = state.p
            // The hatch opens, the closed word fades, the space behind it comes up.
            stage.style.setProperty('--ap', clamp01(p / OPEN_END).toFixed(3))
            word.style.setProperty('--word-o', (1 - clamp01((p - 0.12) / 0.18)).toFixed(3))
            const reveal = clamp01((p - REVEAL[0]) / (REVEAL[1] - REVEAL[0]))
            space.style.setProperty('--space-o', reveal.toFixed(3))
            // Inside, the letters come towards the reader and the covers rise out of the depth.
            letters.forEach((el, i) => {
              const local = itemProgress(clamp01((p - 0.2) / 0.8), i, letters.length, 0.75)
              el.style.setProperty('--letter-z', Math.round(lerp(LETTERS[i].z, 120, local)) + 'px')
            })
            const at = (i: number) =>
              itemProgress(
                clamp01((p - COVERS[0]) / (COVERS[1] - COVERS[0])),
                i,
                covers.length,
                0.5,
              )
            covers.forEach((cover, i) => {
              const local = at(i)
              cover.style.setProperty('--cover-in', local.toFixed(3))
              cover.style.setProperty('--cover-z', Math.round(lerp(-520, 0, local)) + 'px')
            })
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

      // Below the pin breakpoint the aperture is open and each cover lands as it enters.
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

  /** Scroll to the point in the pinned range where cover `i` has arrived. */
  const goTo = (i: number) => {
    const st = trigger.current
    if (!st) {
      document
        .querySelector('[data-cover="' + works[i]?.order + '"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const span = COVERS[1] - COVERS[0]
    const at =
      COVERS[0] + span * 0.2 + (works.length > 1 ? (i / (works.length - 1)) * span * 0.8 : 0)
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
      <Cell col={1} end={13} row={3} l r flush className="porthole">
        <div className="porthole__ground" aria-hidden="true" />
        <div className="porthole__word" aria-hidden="true">
          <span className="porthole__word-text">Work</span>
        </div>
        <div className="porthole__space">
          <div className="porthole__letters" aria-hidden="true">
            {WORD.map((letter, i) => (
              <span
                key={letter}
                className="porthole__letter"
                data-letter={i}
                style={{ left: LETTERS[i].x + '%', top: LETTERS[i].y + '%' }}
              >
                {letter}
              </span>
            ))}
          </div>
          <Sheet nested className="porthole__slots">
            {works.map((w, i) => (
              <WorkCover key={w.slug} work={w} span={SLOTS[Math.min(i, SLOTS.length - 1)]} />
            ))}
          </Sheet>
        </div>
      </Cell>

      <Cell col={1} end={13} row={4} l r>
        <div className="work-plate__foot">
          <Timecode labels={works.map((w) => w.client)} index={index} onSelect={goTo} />
          <Link href="/work" className="label text-accent">
            All work
          </Link>
        </div>
      </Cell>
    </Plate>
  )
}
