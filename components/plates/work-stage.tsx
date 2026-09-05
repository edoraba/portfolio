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
/** Copies of each letter, all in the same place until the space opens. */
const COPIES = 11
/**
 * Half the spread around the reader, in degrees. A copy sits at radius R and angle t, so it
 * lands at R*sin(t) across and R*cos(t) back: the ones near the side of the shell are almost
 * level with the reader and come out large, the ones straight ahead stay small and far. Sideways
 * is pushed to where the outermost copy is at the edge of a wide screen; the word keeps a
 * latitude of its own so the four letters read as a word before anything opens.
 */
const THETA = 76
const PHI_OPEN = 40
const PHI_WORD = 15

/** Opening, the letters parting, the ride, and the way back out. */
const OPEN = [0, 0.2] as const
const PART = [0.05, 0.44] as const
const RIDE = [0.42, 0.86] as const
const CLOSE = [0.88, 1] as const

/** The place of one copy on the sphere, and where it sits while the word is still stacked. */
function glyphs() {
  return WORD.flatMap((letter, row) => {
    const k = (row / (WORD.length - 1)) * 2 - 1
    return Array.from({ length: COPIES }, (_, copy) => ({
      letter,
      key: `${letter}-${copy}`,
      /** The one copy that stands for its letter where there is no room for the sphere. */
      first: copy === 0,
      theta: (((copy / (COPIES - 1)) * 2 - 1) * THETA).toFixed(2),
      phiWord: (k * PHI_WORD).toFixed(2),
      phiOpen: (k * PHI_OPEN).toFixed(2),
    }))
  })
}

const GLYPHS = glyphs()

/**
 * P/03. A hole cut in the sheet with the word standing inside it. Every letter is really a stack
 * of copies in one place, so the word is a word until the reader comes down onto it: the hole
 * zooms until the screen is the void, the stack parts, and the copies swing out onto a sphere
 * around the reader, which is the space the five projects then ride sideways through. On the way
 * out the sphere closes back into the word and the hole shrinks to where it started, and the
 * plate is a plate on the sheet again.
 *
 * The sphere is CSS 3D: each copy is turned to its own longitude and latitude and pushed back by
 * the radius, so it ends up on the shell facing the reader at the centre. One custom property on
 * the parent moves all of them, which is what keeps a 36 element sphere on one write per frame.
 *
 * The aperture is an octagon cut with clip-path, so the system keeps its radius of zero, and
 * everything inside runs on `--void`, the dark half of whichever theme is on, so the hole is a
 * hole in all six and not a bright patch in the two that are already dark.
 *
 * Below 1024px and under reduced motion the hole is open, the sphere is the plain word, and the
 * rail is a row the reader swipes.
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
        const stage = section.querySelector<HTMLElement>('.porthole__stage')
        const sphere = section.querySelector<HTMLElement>('.porthole__sphere')
        const rail = section.querySelector<HTMLElement>('.porthole__rail')
        const covers = Array.from(section.querySelectorAll<HTMLElement>('[data-cover]'))
        if (!stage || !sphere || !rail) return

        // The ride is measured, not guessed: the rail is as long as its cards make it.
        let from = 0
        let to = 0
        const measure = () => {
          const room = stage.clientWidth
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
            end: '+=300%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
            onRefresh: measure,
            onToggle: ({ isActive }) => {
              stage.dataset.on = isActive ? '1' : ''
              if (!isActive) delete document.documentElement.dataset.void
            },
          },
          onUpdate: () => {
            const p = state.p
            // Open on the way in, shut on the way out: the same octagon at both ends.
            const ap =
              p < CLOSE[0]
                ? clamp01((p - OPEN[0]) / (OPEN[1] - OPEN[0]))
                : 1 - clamp01((p - CLOSE[0]) / (CLOSE[1] - CLOSE[0]))
            stage.style.setProperty('--ap', ap.toFixed(3))
            // The console goes into the void with the reader rather than floating over it.
            if (ap > 0.75) document.documentElement.dataset.void = '1'
            else delete document.documentElement.dataset.void

            const open =
              p < CLOSE[0]
                ? clamp01((p - PART[0]) / (PART[1] - PART[0]))
                : 1 - clamp01((p - CLOSE[0]) / (CLOSE[1] - CLOSE[0]))
            sphere.style.setProperty('--open', open.toFixed(4))

            const ride = clamp01((p - RIDE[0]) / (RIDE[1] - RIDE[0]))
            rail.style.setProperty('--rail-x', Math.round(lerp(from, to, ride)) + 'px')
            rail.style.setProperty(
              '--rail-o',
              Math.min(clamp01((p - RIDE[0]) / 0.05), 1 - clamp01((p - CLOSE[0]) / 0.06)).toFixed(
                3,
              ),
            )

            // Whichever card is nearest the middle of the screen is the one the timecode names.
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
          delete document.documentElement.dataset.void
          stage.dataset.on = ''
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  /** Scroll to the point in the pinned range where card `i` is in the middle of the screen. */
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
        <div className="porthole__stage">
          <div className="porthole__void" aria-hidden="true">
            <div className="porthole__dither" />
          </div>

          <div className="porthole__sphere" aria-hidden="true">
            {GLYPHS.map((g) => (
              <span
                key={g.key}
                className="porthole__glyph"
                data-first={g.first ? '' : undefined}
                style={
                  {
                    '--th': `${g.theta}deg`,
                    '--ph0': `${g.phiWord}deg`,
                    '--ph1': `${g.phiOpen}deg`,
                  } as React.CSSProperties
                }
              >
                {g.letter}
              </span>
            ))}
          </div>

          <ol className="porthole__rail">
            {works.map((w) => (
              <li key={w.slug} className="porthole__slot">
                <WorkCover work={w} />
              </li>
            ))}
          </ol>
        </div>

        {/* Outside the stage on purpose: anything inside it is cut to the octagon, and a control
            the reader cannot reach while the hole is small is not a control. It sits above the
            void instead, and takes the void's palette while it is over it. */}
        <div className="porthole__foot">
          <Timecode labels={works.map((w) => w.client)} index={index} onSelect={goTo} />
          <Link href="/work" className="label">
            All work
          </Link>
        </div>
      </Cell>
    </Plate>
  )
}
