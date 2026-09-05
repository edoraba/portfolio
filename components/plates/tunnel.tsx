'use client'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { smoothPointer, type Smoothed, type Target } from '@/lib/field/pointer'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, itemProgress, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

const RAYS = 24

/**
 * Each band flies down its own line, so the corridor reads as depth and not as one pulse. The
 * lines are mostly vertical: a band is as wide as the corridor, so drifting it sideways only
 * pushes it off the page, while height keeps two of them apart when their runs meet.
 */
const PATHS = [
  { x: -6, y: -26, rot: -1.6 },
  { x: 5, y: 16, rot: 1.2 },
  { x: -5, y: -14, rot: 1.4 },
  { x: 6, y: 24, rot: -1.1 },
  { x: 0, y: 0, rot: 0 },
] as const

/**
 * How much of the run one band gets. Wide enough to arrive and pass without hurrying, short
 * enough that the one behind it is still far away while this one is close enough to read: text
 * bands cannot cross each other the way the old panels could.
 */
const SPAN = 0.3

/**
 * The corridor's perspective, matching the CSS, and the apparent size a band is asked to have at
 * each end of its run. Depth is solved from the size rather than eased on its own: at a constant
 * speed in z a band crawls while it is far away and then leaps past in the last moment, which is
 * exactly the part a reader needs it to hold still for. Solving z from a straight line in scale
 * makes it grow at one steady rate the whole way down.
 */
const PERSPECTIVE = 900
const SCALE_FAR = 0.32
const SCALE_NEAR = 1.85

function depth(local: number) {
  return PERSPECTIVE * (1 - 1 / lerp(SCALE_FAR, SCALE_NEAR, local))
}

/**
 * P/06. Hairlines converge on a vanishing point that leans towards the reader's pointer, and the
 * five moments of the story fly out of it as ruled bands, each down its own line, the year in
 * mono and the line beside it. No panels and no pictures: the corridor is made of the same rules
 * the rest of the site is ruled with, and reading one is what makes it arrive. The title stays
 * out of the flight path. Below 1024px and under reduced motion the bands are a plain stack in
 * front of the static rays.
 */
export function Tunnel() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      if (!section || !stage || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const frames = Array.from(stage.querySelectorAll<HTMLElement>('[data-frame]'))
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=150%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
          onUpdate: () => {
            const p = state.p
            frames.forEach((frame, i) => {
              const local = itemProgress(p, i, frames.length, SPAN)
              const path = PATHS[i % PATHS.length]
              // In while it is still small and far, out only as it leaves the corridor.
              const fade = Math.min(clamp01((local - 0.04) / 0.16), clamp01((1 - local) / 0.12))
              frame.style.setProperty('--frame-z', Math.round(depth(local)) + 'px')
              frame.style.setProperty('--frame-x', (path.x * local).toFixed(2) + '%')
              frame.style.setProperty('--frame-y', (path.y * local).toFixed(2) + '%')
              frame.style.setProperty('--frame-r', (path.rot * local).toFixed(2) + 'deg')
              frame.style.setProperty('--frame-o', fade.toFixed(3))
            })
            section.dataset.state = p > 0.98 ? 'done' : 'running'
          },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  // The vanishing point leans towards the pointer, so the corridor turns a little with the reader.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reduced) return
    const target: Target = { x: 0.5, y: 0.5, active: false }
    let smooth: Smoothed = { x: 0.5, y: 0.5, s: 0 }
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = (e.clientY - r.top) / r.height
      target.active = true
    }
    const onLeave = () => {
      target.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    const unsub = Tempus.add(
      ({ deltaTime }) => {
        const r = stage.getBoundingClientRect()
        if (document.hidden || r.bottom < 0 || r.top > window.innerHeight) return
        smooth = smoothPointer(smooth, target, deltaTime, 60, 400)
        stage.style.setProperty('--vx', ((smooth.x - 0.5) * 6 * smooth.s).toFixed(2) + '%')
        stage.style.setProperty('--vy', ((smooth.y - 0.5) * 6 * smooth.s).toFixed(2) + '%')
      },
      { label: 'tunnel' },
    )
    return () => {
      unsub?.()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  return (
    <Plate
      id="since"
      sectionRef={sectionRef}
      className="tunnel-plate"
      meta={<span>How the two halves met</span>}
    >
      <Rule />
      <Cell col={1} end={13} l r flush className="tunnel">
        <div ref={stageRef} className="tunnel__stage">
          <svg
            className="tunnel__rays"
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {Array.from({ length: RAYS }, (_, i) => {
              const a = (i / RAYS) * Math.PI * 2
              // Fixed precision: raw floats round differently on the server and in the browser,
              // which React reports as a hydration mismatch.
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={(50 + Math.cos(a) * 80).toFixed(3)}
                  y2={(50 + Math.sin(a) * 80).toFixed(3)}
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
          </svg>
          <h2 className="tunnel__title headline">From design school to the whole stack</h2>
          <ol className="tunnel__frames">
            {SINCE_FRAMES.map((frame, i) => (
              <li key={frame.id} className="tunnel__frame" data-frame={i}>
                <span className="tunnel__mark">{frame.year ?? ''}</span>
                <span className="tunnel__line">{frame.caption}</span>
              </li>
            ))}
          </ol>
        </div>
      </Cell>
      <Rule />
    </Plate>
  )
}
