'use client'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { Cell } from '../sheet/cell'
import { getLenis } from '../smooth-scroll'
import { Plate } from './plate'
import { Timecode } from './timecode'
import { WorkCover, type CoverWork } from './work-cover'

const WORD = ['W', 'O', 'R', 'K'] as const
/** The wall inside: the word repeated across and down, drifting behind the projects. */
const WALL_COLS = 7
const WALL_ROWS = 4

/** Approach, entry, then the long ride through the rail. */
const OPEN = 0.3
const ENTER = [0.24, 0.42] as const
const RIDE = [0.4, 1] as const

/**
 * P/03. The reader comes down onto a hole cut in the sheet with the word standing inside it,
 * deeper than the hole itself so it holds still while the walls rush past. The hole opens until
 * it is the whole plate, the word flies over the reader, and what is left is the space behind
 * the sheet: the void, the word repeated across it as a wall, and the five projects riding
 * sideways through it.
 *
 * The aperture is an octagon cut with clip-path, so the system keeps its radius of zero, and
 * everything inside the space runs on `--void`, the dark half of whichever theme is on, so the
 * hole is a hole in all six and not a bright patch in the two that are already dark.
 *
 * Below 1024px and under reduced motion the hole is simply open and the rail is a row the reader
 * swipes, which is the same gesture without the pin.
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
        const wall = section.querySelector<HTMLElement>('.porthole__wall')
        const rail = section.querySelector<HTMLElement>('.porthole__rail')
        const covers = Array.from(section.querySelectorAll<HTMLElement>('[data-cover]'))
        if (!stage || !word || !wall || !rail) return

        // The ride is measured, not guessed: the rail is as long as its cards make it.
        let from = 0
        let to = 0
        const measure = () => {
          const room = stage.clientWidth
          // In from just past the right edge, out until the last card is flush against it: the
          // ride ends on a project, not on an empty room.
          from = room * 0.98
          to = room - rail.scrollWidth
        }
        measure()

        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=260%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
            onRefresh: measure,
          },
          onUpdate: () => {
            const p = state.p
            const ap = clamp01(p / OPEN)
            stage.style.setProperty('--ap', ap.toFixed(3))

            // Parallax: the word is far inside the hole, so it grows a fraction of what the
            // walls do, and only rushes past once the reader is through the opening.
            const past = clamp01((p - ENTER[0]) / (ENTER[1] - ENTER[0]))
            word.style.setProperty('--word-s', (lerp(1, 1.7, ap) * lerp(1, 4.2, past)).toFixed(3))
            word.style.setProperty('--word-o', (1 - past).toFixed(3))

            // The wall drifts the other way from the rail, which is what gives the space depth.
            const inside = clamp01((p - ENTER[0]) / (1 - ENTER[0]))
            wall.style.setProperty('--wall-x', (6 - 30 * inside).toFixed(2) + '%')
            wall.style.setProperty('--wall-y', (-3 + 6 * inside).toFixed(2) + '%')
            wall.style.setProperty('--wall-o', clamp01((p - ENTER[0]) / 0.12).toFixed(3))

            const ride = clamp01((p - RIDE[0]) / (RIDE[1] - RIDE[0]))
            rail.style.setProperty('--rail-x', Math.round(lerp(from, to, ride)) + 'px')
            rail.style.setProperty('--rail-o', clamp01((p - RIDE[0]) / 0.06).toFixed(3))

            // Whichever card is nearest the middle of the plate is the one the timecode names.
            if (covers.length) {
              const mid = stage.getBoundingClientRect().left + stage.clientWidth / 2
              let best = 0
              let bestD = Infinity
              covers.forEach((el, i) => {
                const r = el.getBoundingClientRect()
                const d = Math.abs(r.left + r.width / 2 - mid)
                if (d < bestD) {
                  bestD = d
                  best = i
                }
              })
              setIndex(best)
            }
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

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  /** Scroll to the point in the pinned range where card `i` is in the middle of the plate. */
  const goTo = (i: number) => {
    const st = trigger.current
    if (!st) {
      document
        .querySelector('[data-cover="' + works[i]?.order + '"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      return
    }
    const span = RIDE[1] - RIDE[0]
    const at = RIDE[0] + span * (works.length > 1 ? i / (works.length - 1) : 0.5)
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
        <div className="porthole__void" aria-hidden="true">
          <div className="porthole__dither" />
          <div className="porthole__wall">
            {Array.from({ length: WALL_ROWS * WALL_COLS }, (_, i) => (
              <span key={i}>{WORD[i % WORD.length]}</span>
            ))}
          </div>
        </div>

        <p className="porthole__word" aria-hidden="true">
          {WORD.map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </p>

        <ol className="porthole__rail">
          {works.map((w) => (
            <li key={w.slug} className="porthole__slot">
              <WorkCover work={w} />
            </li>
          ))}
        </ol>
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
