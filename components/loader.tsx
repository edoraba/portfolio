'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PRIORITY } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'
import { canRenderField } from '@/lib/field/support'
import { buildTiles, stopColumns } from '@/lib/loader-grid'
import { cellForProgress, createReadiness, shouldShowLoader } from '@/lib/loader'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { useMotion } from '@/lib/motion/store'
import { useMounted } from '@/lib/use-mounted'
import { Monogram } from './console/monogram'

/** How long the marker holds a stop before it will take the next one, however fast they arrive. */
const DWELL = 260
/** And how long it will wait for one that has not, so the rhythm never stalls on a slow resource. */
const PATIENCE = 450

/**
 * The calibration entrance. Renders nothing on the server and nothing at all unless the field can
 * run and motion is full.
 *
 * The screen is a grid of tiles in the theme's ink with a few holes in it, and a marker that hops
 * from hole to hole as real resources become ready: fonts, then the shader, then the content, then
 * the images above the fold. It counts 25, 50, 75 and lands on the mark. Then the grid drops away
 * tile by tile in a random order and the page is underneath, with the field already warm, which is
 * the whole point of holding it: without this the hero visibly changes when the shader takes over
 * from the printed dither.
 */
export function Loader() {
  const mounted = useMounted()
  const [phase, setPhase] = useState<'on' | 'done'>('on')
  const rootRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLParagraphElement>(null)

  // Every visit, not once per session: without it the field arrives after the first paint.
  const show = useMemo(() => {
    if (!mounted) return false
    const reduced = useMotion.getState().reduced
    return shouldShowLoader({ canRender: canRenderField(), reduced, calibrated: false })
  }, [mounted])

  useEffect(() => {
    if (!show) return
    const root = rootRef.current
    const grid = gridRef.current
    const marker = markerRef.current
    const count = countRef.current
    if (!root || !grid || !marker || !count) return
    setupGsap()

    const field = useField.getState()
    field.claim('loader', { mode: 'calibrate', intensity: 1, priority: PRIORITY.loader })
    field.setCell(8)

    // The grid is laid out from the viewport, one tile bigger than the screen on every side so no
    // half tile ever shows at an edge.
    const plan = buildTiles(window.innerWidth, window.innerHeight)
    grid.style.width = plan.columns * plan.size + 'px'
    grid.style.height = plan.rows * plan.size + 'px'
    const tiles: HTMLElement[] = []
    for (let i = 0; i < plan.columns * plan.rows; i++) {
      const tile = document.createElement('div')
      tile.className = 'loader__tile'
      tile.style.width = plan.size + 'px'
      tile.style.height = plan.size + 'px'
      grid.appendChild(tile)
      tiles.push(tile)
    }

    const middle = Math.floor(plan.rows / 2)
    const stops = stopColumns(plan.columns, plan.wide).map((c) => tiles[middle * plan.columns + c])
    for (const stop of stops) stop.dataset.stop = ''
    const rest = tiles.filter((t) => !stops.includes(t))

    gsap.set(rest, { opacity: 0 })
    gsap.set(marker, {
      width: plan.size,
      height: plan.size,
      x: stops[0].offsetLeft,
      y: stops[0].offsetTop,
    })
    // The tiles arrive out of order, so the screen fills rather than sweeps.
    const fill = gsap.to(rest, {
      opacity: 1,
      duration: 0.12,
      stagger: { amount: 0.5, from: 'random' },
    })

    // Readiness is real, and the marker only moves when something has become ready. A dwell keeps
    // two marks landing together from reading as one jump, and a patience timer keeps a slow
    // resource from stalling the count.
    const timers: ReturnType<typeof setTimeout>[] = []
    const r = createReadiness()
    // The screen may not drop before the mark has landed on it, however fast the page is ready:
    // an entrance that leaves in the middle of its own count is a flicker, not an entrance.
    let land: () => void = () => {}
    const landed = new Promise<void>((resolve) => {
      land = resolve
    })
    let at = 0
    let queued = 0
    let holding = false
    const hop = () => {
      at += 1
      const stop = stops[Math.min(at, stops.length - 1)]
      gsap.to(marker, {
        x: stop.offsetLeft,
        y: stop.offsetTop,
        duration: 0.55,
        ease: 'power2.inOut',
      })
      if (at >= stops.length - 1) {
        marker.dataset.at = 'mark'
        land()
        // The holes the marker walked through fill back in behind it, one after another, so the
        // grid is whole again by the time it drops.
        stops.slice(0, -1).forEach((stop, i) => {
          timers.push(setTimeout(() => delete stop.dataset.stop, 220 + i * 110))
        })
      } else {
        count.textContent = String((at + 1) * 25)
      }
      const cell = cellForProgress((at + 1) / stops.length)
      if (useField.getState().cell !== cell) useField.getState().setCell(cell)
    }
    const pump = () => {
      if (holding || queued < 1 || at >= stops.length - 1) return
      holding = true
      queued -= 1
      hop()
      timers.push(
        setTimeout(() => {
          holding = false
          pump()
        }, DWELL),
      )
    }
    const advance = () => {
      queued += 1
      pump()
    }
    // Whatever has not reported by now is counted anyway: the entrance is a door, not a gate.
    for (let i = 1; i < stops.length; i++) timers.push(setTimeout(advance, PATIENCE * i))

    document.fonts.ready.then(() => {
      r.mark('fonts')
      advance()
    })
    r.mark('content')
    queueMicrotask(advance)
    const unsub = useField.subscribe((s) => {
      if (s.mounted) {
        r.mark('shader')
        advance()
      }
    })
    if (useField.getState().mounted) {
      r.mark('shader')
      advance()
    }
    const images = Array.from(document.images).filter(
      (i) => i.loading !== 'lazy' && i.getBoundingClientRect().top < window.innerHeight,
    )
    Promise.allSettled(images.map((i) => (i.complete ? Promise.resolve() : i.decode()))).then(
      () => {
        r.mark('images')
        advance()
      },
    )

    let cancelled = false
    let out: gsap.core.Timeline | undefined
    Promise.all([r.done, landed]).then(async () => {
      if (cancelled) return
      // A beat on the mark before the screen goes, or nobody sees what they were waiting for.
      await new Promise((resolve) => timers.push(setTimeout(resolve, 320)))
      if (cancelled) return
      const state = useField.getState()
      state.release('loader')
      if (state.cell !== 2) state.setCell(2)
      out = gsap.timeline({
        onComplete: () => {
          if (!cancelled) setPhase('done')
        },
      })
      // The grid does not lift or fade: every tile drops out of its own top edge, in no order, so
      // the page appears through the holes before the screen is gone.
      out.to(tiles, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.55,
        ease: 'power3.out',
        stagger: { amount: 0.4, from: 'random' },
      })
      out.to(marker, { scaleY: 0, transformOrigin: 'top', duration: 0.55, ease: 'power3.out' }, 0)
      out.add(() => window.dispatchEvent(new Event('calibrated')), 0.35)
    })

    return () => {
      cancelled = true
      unsub()
      timers.forEach(clearTimeout)
      fill.kill()
      out?.kill()
    }
  }, [show])

  if (!show || phase === 'done') return null
  return (
    <div ref={rootRef} className="loader" data-loader={phase} aria-hidden="true">
      <div className="loader__bg" />
      <div ref={gridRef} className="loader__grid">
        <div ref={markerRef} className="loader__marker">
          <p ref={countRef} className="loader__count">
            25
          </p>
          <Monogram className="loader__mono" size={24} />
        </div>
      </div>
    </div>
  )
}
