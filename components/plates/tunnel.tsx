'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, itemProgress, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Cell } from '../sheet/cell'
import { Plate } from './plate'

const RAYS = 24

/**
 * P/06. The story arrives as ruled frames flying out of a vanishing point: hairlines converge
 * to the centre, the title recedes and each frame travels from far to past the reader. Below
 * 1024px and under reduced motion the frames simply stack in front of the static rays.
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
        const title = stage.querySelector<HTMLElement>('.tunnel__title')
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${headerHeight()}`,
            end: '+=150%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 3,
          },
          onUpdate: () => {
            const p = state.p
            frames.forEach((frame, i) => {
              const local = itemProgress(p, i, frames.length, 0.45)
              const z = lerp(-1400, 320, local)
              // Fade in as it arrives, out as it passes the reader.
              const fade = Math.min(1, local / 0.12, clamp01((1 - local) / 0.12))
              frame.style.setProperty('--frame-z', `${z.toFixed(0)}px`)
              frame.style.setProperty('--frame-o', fade.toFixed(3))
            })
            if (title) {
              title.style.setProperty('--title-s', lerp(1, 0.86, p).toFixed(3))
              title.style.setProperty('--title-o', lerp(1, 0.35, p).toFixed(3))
            }
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
          <h2 className="tunnel__title display">From design school to the whole stack</h2>
          <ol className="tunnel__frames">
            {SINCE_FRAMES.map((frame, i) => (
              <li key={frame.id} className="tunnel__frame" data-frame={i}>
                <figure className="tunnel__figure">
                  <span className="tunnel__panel" aria-hidden="true" />
                  <figcaption className="label">
                    {frame.year ? <span className="text-accent">{frame.year} </span> : null}
                    <span className="text-ink">{frame.caption}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </Cell>
    </Plate>
  )
}
