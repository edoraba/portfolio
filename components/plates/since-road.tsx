'use client'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { smoothPointer, type Smoothed, type Target } from '@/lib/field/pointer'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

const RAYS = 28

/**
 * The road, and the only numbers that decide what it looks like. They must match `--road-tilt`,
 * `--road-stretch` and `--road-persp` in `globals.css`, because the ride is solved here and drawn
 * there.
 *
 * The plane is laid back by TILT and pre-stretched vertically by 1 / cos(TILT), so the tilt takes
 * the stretch back out and the type reads at its true proportion however far down the road it is:
 * a plane on its own squashes every line by the same factor, which reads as broken type rather
 * than as distance. Depth alone makes the far words small. The perspective distance, 480px in the
 * CSS, then fixes where the road meets the horizon: the vanishing point sits 480 / tan(TILT) above
 * the centre of the stage, which is where the rays are drawn from.
 */
const TILT = 64
const STRETCH = 1 / Math.cos((TILT * Math.PI) / 180)

/**
 * Where the nearest word sits when the ride starts, and where the farthest one ends, both measured
 * on the plane from its centre. Positive is towards the reader. The camera is at 480 / sin(TILT),
 * about 534, so anything past that is behind the reader and gone; both ends stay well short of it.
 */
const START = 90
const END = 280

/**
 * Where a word has gone by: past this it is wider than the screen and leaving the bottom of it.
 * The moment being read is the nearest word that has not gone by, which is to say the biggest one
 * still in the frame.
 */
const GONE = 380

/**
 * P/06. The section title is no longer a caption in a corner: the five moments are five words laid
 * on a road that runs to a vanishing point, and scrolling drives down it. The nearest word is the
 * oldest, so the reader comes forward through the story and arrives at what it is now, with the
 * moment currently under the eye printed in mono along the bottom. Below 1024px and under reduced
 * motion the road stands up: the same five words at the width of the page, then the timeline.
 */
export function SinceRoad() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)

  // Every word is set to the width of the road, so the five of them read as one slab of type and
  // a short word is a big one. Layout widths only: the plane is transformed, so a measured rect
  // would be the projection rather than the type.
  useEffect(() => {
    const plane = planeRef.current
    if (!plane) return
    const words = Array.from(plane.querySelectorAll<HTMLElement>('[data-word]'))
    const fit = () => {
      const road = plane.clientWidth
      if (!road) return
      for (const word of words) {
        const span = word.firstElementChild as HTMLElement | null
        if (!span) continue
        word.style.setProperty('--fit', '1')
        const natural = span.offsetWidth
        if (natural > 0) word.style.setProperty('--fit', (road / natural).toFixed(4))
      }
    }
    fit()
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) fit()
    })
    const ro = new ResizeObserver(fit)
    ro.observe(plane)
    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      const plane = planeRef.current
      if (!section || !stage || !plane || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const words = Array.from(plane.querySelectorAll<HTMLElement>('[data-word]'))
        const moments = Array.from(stage.querySelectorAll<HTMLElement>('[data-moment]'))
        const ticks = Array.from(stage.querySelectorAll<HTMLElement>('[data-tick]'))
        // Where each word sits along the road, from the centre of the stack. Read once per
        // refresh: the fit changes them, and a resize is a refresh.
        let stops: number[] = []
        let from = 0
        let to = 0
        const measure = () => {
          const half = plane.offsetHeight / 2
          stops = words.map((word) => word.offsetTop + word.offsetHeight / 2 - half)
          if (!stops.length) return
          from = START / STRETCH - Math.max(...stops)
          to = END / STRETCH - Math.min(...stops)
        }
        measure()

        let live = -1
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=170%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onRefresh: measure,
          },
          onUpdate: () => {
            const p = state.p
            const ride = lerp(from, to, p)
            plane.style.setProperty('--ride', ride.toFixed(1) + 'px')
            // The stack is drawn far word first, so walking it forwards is walking the road back
            // from the reader: the first one still in the frame is the one being read.
            let best = 0
            for (let i = stops.length - 1; i >= 0; i--) {
              if (STRETCH * (stops[i] + ride) <= GONE) {
                best = i
                break
              }
            }
            const moment = stops.length - 1 - best
            if (moment !== live) {
              live = moment
              moments.forEach((el, i) => {
                el.dataset.on = i === moment ? '1' : '0'
              })
              ticks.forEach((el, i) => {
                el.dataset.on = i <= moment ? '1' : '0'
              })
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

  // The horizon leans towards the pointer, so the road turns a little with the reader.
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
        stage.style.setProperty('--vx', ((smooth.x - 0.5) * 5 * smooth.s).toFixed(2) + '%')
        stage.style.setProperty('--vy', ((smooth.y - 0.5) * 5 * smooth.s).toFixed(2) + '%')
      },
      { label: 'road' },
    )
    return () => {
      unsub?.()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  const stations = [...SINCE_FRAMES].reverse()

  return (
    <Plate
      id="since"
      sectionRef={sectionRef}
      className="road-plate"
      meta={<span>How the two halves met</span>}
    >
      <Rule />
      <Cell col={1} end={13} l r flush className="road">
        <div ref={stageRef} className="road__stage">
          <svg
            className="road__rays"
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
          {/* Before the road in the source, in a corner of it on screen: without the pin this is
              the first thing read, and the words are what it is a title for. */}
          <h2 className="road__kicker">From design school to the whole stack</h2>
          <div className="road__deck">
            <div ref={planeRef} className="road__plane" aria-hidden="true">
              {stations.map((frame) => (
                <p
                  key={frame.id}
                  className="road__word"
                  data-word=""
                  style={{ '--len': frame.word.length } as React.CSSProperties}
                >
                  <span>{frame.word}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="road__haze" aria-hidden="true" />
          <div className="road__read">
            <ol className="road__ticks" aria-hidden="true">
              {SINCE_FRAMES.map((frame, i) => (
                <li
                  key={frame.id}
                  className="road__tick"
                  data-tick={i}
                  data-on={i === 0 ? '1' : '0'}
                />
              ))}
            </ol>
            <ol className="road__moments">
              {SINCE_FRAMES.map((frame, i) => (
                <li
                  key={frame.id}
                  className="road__moment"
                  data-moment={i}
                  data-on={i === 0 ? '1' : '0'}
                >
                  <span className="road__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="road__year">{frame.year ?? ''}</span>
                  <span className="road__caption">{frame.caption}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Cell>
      <Rule />
    </Plate>
  )
}
