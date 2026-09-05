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
import { Plate } from './plate'

const RAYS = 24

/** Each frame flies down its own line, so the corridor reads as depth and not as one pulse. */
const PATHS = [
  { x: -22, y: -8, rot: -2.5 },
  { x: 18, y: 10, rot: 1.8 },
  { x: -14, y: 12, rot: 2.2 },
  { x: 24, y: -12, rot: -1.6 },
  { x: 0, y: 0, rot: 0 },
] as const

/**
 * P/06. Hairlines converge on a vanishing point that leans towards the reader's pointer, and the
 * five moments of the story fly out of it, each down its own line, with its year growing as it
 * arrives. The title stays out of the flight path so it is always readable. Below 1024px and
 * under reduced motion the frames are a plain stack in front of the static rays.
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
              const local = itemProgress(p, i, frames.length, 0.45)
              const path = PATHS[i % PATHS.length]
              // Fade in as it arrives, out as it passes the reader.
              const fade = Math.min(1, local / 0.12, clamp01((1 - local) / 0.14))
              frame.style.setProperty('--frame-z', Math.round(lerp(-1500, 380, local)) + 'px')
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
      <Cell col={1} end={13} l r b flush className="tunnel">
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
                <figure className="tunnel__figure">
                  {frame.year ? <span className="tunnel__year">{frame.year}</span> : null}
                  <span className="tunnel__panel" aria-hidden="true" />
                  <figcaption className="label text-ink">{frame.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </Cell>
    </Plate>
  )
}
