'use client'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Tempus from 'tempus'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { Cell } from '../sheet/cell'
import { getLenis } from '../smooth-scroll'
import { Plate } from './plate'
import { Timecode } from './timecode'
import { WorkCover, type CoverWork } from './work-cover'

/** The word, twice over, so the shell has something in every direction. */
const ROWS = ['W', 'O', 'R', 'K', 'W', 'O', 'R', 'K'] as const
/** Copies of each letter, all in the same place until the space opens. */
const COPIES = 13
/**
 * Half the spread around the reader, in degrees. A copy sits at radius R and angle t, so it
 * lands at R*sin(t) across and R*cos(t) back: the ones near the side of the shell come out level
 * with the reader and large, the ones straight ahead stay small and far. The word keeps a
 * latitude of its own so the letters read as a word before anything opens.
 */
const THETA = 86
const PHI_OPEN = 62
const PHI_WORD = 15

/** Approach, opening, the ride through the cards, and the way back out. */
const OPEN = [0, 0.26] as const
const PART = [0.06, 0.5] as const
const RIDE = [0.24, 0.9] as const
const CLOSE = [0.9, 1] as const
/** How far the octagon has to grow before its corners are off a wide screen. */
const ZOOM = 7.4

/** How high each project rides and how far back it sits. */
const CARDS = [
  { y: 27, w: 30, z: -80 },
  { y: 64, w: 26, z: 70 },
  { y: 21, w: 33, z: -170 },
  { y: 61, w: 28, z: 30 },
  { y: 41, w: 31, z: -50 },
] as const
/**
 * Viewport widths a card crosses over the whole ride, and the slice of the ride the cards are
 * spread across. Wide enough that at either end of the ride every card is off the screen: a card
 * parked in the middle of the hole before the ride starts is the first thing the reader sees.
 */
const TRAVEL = 400
const SPREAD = [0.2, 0.8] as const

/** Where card `i` of `n` is centred, as a point on the ride. */
function cardAt(i: number, n: number) {
  return n > 1 ? SPREAD[0] + (SPREAD[1] - SPREAD[0]) * (i / (n - 1)) : 0.5
}

/** The place of one copy on the shell, and where it sits while the word is still stacked. */
const GLYPHS = ROWS.flatMap((letter, row) => {
  // Latitude while open spreads all eight rows over the shell; while closed the second word
  // hides exactly behind the first, so what stands in the hole is one word, not two overlaid.
  const word = row % 4
  const kWord = (word / 3) * 2 - 1
  const kOpen = (row / (ROWS.length - 1)) * 2 - 1
  return Array.from({ length: COPIES }, (_, copy) => ({
    letter,
    key: `${letter}-${row}-${copy}`,
    first: row === word && copy === 0,
    late: row >= 4 ? 1 : 0,
    theta: (((copy / (COPIES - 1)) * 2 - 1) * THETA).toFixed(2),
    phiWord: (kWord * PHI_WORD).toFixed(2),
    phiOpen: (kOpen * PHI_OPEN).toFixed(2),
  }))
})

/** 0 to 1 across the opening, and back to 0 across the close. */
function zoomAt(p: number) {
  return p < CLOSE[0]
    ? clamp01((p - OPEN[0]) / (OPEN[1] - OPEN[0]))
    : 1 - clamp01((p - CLOSE[0]) / (CLOSE[1] - CLOSE[0]))
}

/**
 * P/03. A hole cut in the sheet with the word standing inside it. What shows through the hole is
 * fixed to the screen, so on the way down the hole travels over it and the reader sees past the
 * page before being let in. Then the octagon zooms, keeping its shape, until its corners are off
 * the screen and the void is everything; a ruled grid outside it scales at the same rate, which
 * is what makes the zoom read as a zoom and not as a shape changing size.
 *
 * Every letter is really a stack of copies in one place, so the word is a word until it opens:
 * the stack parts and the copies swing out onto a shell around the reader, each turned to its own
 * longitude and latitude and pushed back by the radius. The shell keeps turning for the rest of
 * the section. The projects cross it scattered, each at its own height and depth.
 *
 * On the way out the shell closes back into the word and the octagon shrinks to where it began.
 *
 * Below 1024px and under reduced motion the hole is open, the word is a word, and the projects
 * are a row the reader swipes.
 */
export function WorkStage({ works }: { works: CoverWork[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useMotion((s) => s.reduced)
  const [index, setIndex] = useState(0)
  const trigger = useRef<ScrollTrigger | null>(null)
  /** Written by the scrubbed timeline, read by the frame loop that places the octagon. */
  const run = useRef({ p: 0, active: false })

  // The octagon follows the cell while the page moves and the screen while the plate is pinned,
  // and everything it shows is fixed, which is what makes the approach a parallax.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cell = section.querySelector<HTMLElement>('.porthole')
    const stage = section.querySelector<HTMLElement>('.porthole__stage')
    if (!cell || !stage) return
    let near = false
    const io = new IntersectionObserver(
      (entries) => {
        near = entries.some((e) => e.isIntersecting)
        stage.dataset.on = near ? '1' : ''
        if (!near) delete document.documentElement.dataset.void
      },
      { rootMargin: '60% 0px' },
    )
    io.observe(cell)

    let last = ''
    const unsub = Tempus.add(
      () => {
        if (!near || document.hidden) return
        const r = cell.getBoundingClientRect()
        const { p, active } = run.current
        const z = active ? lerp(1, ZOOM, zoomAt(p)) : 1
        const cy = r.top + r.height / 2
        // A pinned plate carries a transform, and a transformed ancestor is the containing block
        // for anything fixed inside it. Without this the stage would start below the header
        // instead of over it, and full screen would be a screen with a bar across the top.
        const origin = section.getBoundingClientRect()
        const offX = active ? -origin.left : 0
        const offY = active ? -origin.top : 0
        // The grid belongs to the hole, not to the page: it comes up as the hole reaches the
        // middle of the screen and goes once the hole has the screen to itself.
        const near0 =
          1 - clamp01(Math.abs(cy - window.innerHeight / 2) / (window.innerHeight * 0.7))
        const next = [
          Math.round(r.left + r.width / 2 - offX),
          Math.round(cy - offY),
          z.toFixed(3),
          near0.toFixed(3),
          Math.round(offX),
          Math.round(offY),
        ].join(' ')
        if (next === last) return
        last = next
        const [ox, oy, oz, og, sx, sy] = next.split(' ')
        stage.style.setProperty('--ox', ox + 'px')
        stage.style.setProperty('--oy', oy + 'px')
        stage.style.setProperty('--z', oz)
        stage.style.setProperty('--grid-near', og)
        stage.style.left = sx + 'px'
        stage.style.top = sy + 'px'
      },
      { label: 'porthole' },
    )
    return () => {
      io.disconnect()
      unsub?.()
      delete document.documentElement.dataset.void
    }
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const stage = section.querySelector<HTMLElement>('.porthole__stage')
        const sphere = section.querySelector<HTMLElement>('.porthole__sphere')
        const cards = Array.from(section.querySelectorAll<HTMLElement>('.porthole__card'))
        if (!stage || !sphere) return

        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=320%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
            onToggle: ({ isActive }) => {
              run.current.active = isActive
              if (!isActive) {
                run.current.p = 0
                delete document.documentElement.dataset.void
              }
            },
          },
          onUpdate: () => {
            const p = state.p
            run.current.p = p
            const z = zoomAt(p)
            // The grid outside is the reference for the zoom, so it goes when the hole has it all.
            stage.style.setProperty('--grid-zoom', (1 - clamp01((z - 0.4) / 0.35)).toFixed(3))
            if (z > 0.7) document.documentElement.dataset.void = '1'
            else delete document.documentElement.dataset.void

            const open =
              p < CLOSE[0]
                ? clamp01((p - PART[0]) / (PART[1] - PART[0]))
                : 1 - clamp01((p - CLOSE[0]) / (CLOSE[1] - CLOSE[0]))
            sphere.style.setProperty('--open', open.toFixed(4))
            // The shell never quite settles: it keeps turning under the cards.
            sphere.style.setProperty('--turn', (lerp(-9, 9, p) * open).toFixed(2) + 'deg')
            sphere.style.setProperty('--tilt', (lerp(4, -6, p) * open).toFixed(2) + 'deg')

            const ride = clamp01((p - RIDE[0]) / (RIDE[1] - RIDE[0]))
            const leaving = clamp01((p - CLOSE[0]) / 0.07)
            cards.forEach((card, i) => {
              const at = cardAt(i, cards.length)
              card.style.setProperty('--x', (50 + (at - ride) * TRAVEL).toFixed(2))
              card.style.setProperty('--o', (1 - leaving).toFixed(3))
            })
            setIndex(Math.round(clamp01(ride) * (works.length - 1)))
            section.dataset.state = p > 0.98 ? 'done' : 'running'
          },
        })
        trigger.current = tween.scrollTrigger ?? null
        return () => {
          trigger.current = null
          delete document.documentElement.dataset.void
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
    const p = RIDE[0] + (RIDE[1] - RIDE[0]) * cardAt(i, works.length)
    const top = st.start + (st.end - st.start) * clamp01(p)
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
          <div className="porthole__grid" aria-hidden="true" />
          <div className="porthole__oct porthole__ring" aria-hidden="true" />
          <div className="porthole__oct porthole__gap" aria-hidden="true" />

          <div className="porthole__oct porthole__hole">
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
                      '--late': g.late,
                    } as React.CSSProperties
                  }
                >
                  {g.letter}
                </span>
              ))}
            </div>

            <ol className="porthole__cards">
              {works.map((w, i) => {
                const c = CARDS[Math.min(i, CARDS.length - 1)]
                // Where it waits before the ride starts: off the right of the screen, which is
                // also what it has to be on the server, or the first frame shows five cards
                // stacked in the middle of the hole.
                const at = cardAt(i, works.length)
                return (
                  <li
                    key={w.slug}
                    className="porthole__card"
                    style={
                      {
                        '--y': c.y,
                        '--w': c.w,
                        '--cz': `${c.z}px`,
                        '--x': (50 + at * TRAVEL).toFixed(2),
                      } as React.CSSProperties
                    }
                  >
                    <WorkCover work={w} />
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* Outside the octagon on purpose: anything inside it is cut to the hole, and a control
            the reader cannot reach while the hole is small is not a control. */}
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
