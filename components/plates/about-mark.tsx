'use client'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { PRIORITY } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01 } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { MONOGRAM_PARTS, MONOGRAM_PART_COUNT, MONOGRAM_SIZE } from '../console/monogram'

const MASK_ID = 'about-mark-mask'
const PATTERN_ID = 'about-mark-dither'
/** How long one part takes, as a share of the whole run: a fifth each, plus a little overlap. */
const SPAN = (1 / MONOGRAM_PART_COUNT) * 1.35
/** Starts are spread over what is left, so the last part still finishes exactly at the end. */
const START = (1 - SPAN) / (MONOGRAM_PART_COUNT - 1)

/** 0 to 1 for one part, given the progress of the whole mark. */
function partProgress(p: number, part: number) {
  return clamp01((p - part * START) / SPAN)
}

/**
 * The mark of P/02: the same ten rectangles as the monogram, at the scale of an object rather
 * than an icon, cut out of the live field so the dither runs inside the letters the way it runs
 * inside the headline. The bars draw themselves in the order the mark is built, stems first,
 * as the plate crosses the viewport.
 *
 * Two copies of the geometry: one visible, in the flow, and one inside a mask in viewport
 * coordinates that the canvas is cut to. When the field is off, or while the headline still
 * holds it, the visible copy falls back to a printed dither so the mark is never a blank shape.
 */
export function AboutMark() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const drawnRef = useRef<SVGGElement>(null)
  const maskedRef = useRef<SVGGElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const reduced = useMotion((s) => s.reduced)
  const live = useField((s) => s.owner === 'about-mark' && s.mounted)

  // The mask follows the visible mark, and the mark holds the field while it is on screen.
  useEffect(() => {
    const wrap = wrapRef.current
    const group = groupRef.current
    if (!wrap || !group) return
    const store = useField
    let visible = false
    let last = ''

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        if (!visible) store.getState().release('about-mark')
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    const unsub = Tempus.add(
      () => {
        if (!visible || document.hidden) return
        const r = wrap.getBoundingClientRect()
        if (r.width <= 0) return
        // Written only when it moves: the mask re-rasterises on every attribute change.
        const next = `translate(${r.left.toFixed(1)} ${r.top.toFixed(1)}) scale(${(r.width / MONOGRAM_SIZE).toFixed(5)})`
        if (next !== last) {
          last = next
          group.setAttribute('transform', next)
        }
        store.getState().claim('about-mark', {
          mode: 'hero',
          intensity: 1,
          mask: MASK_ID,
          priority: PRIORITY.plate,
        })
      },
      { label: 'about-mark' },
    )

    return () => {
      io.disconnect()
      unsub?.()
      store.getState().release('about-mark')
    }
  }, [])

  // Drawing in: each bar grows along its own axis, part by part, as the plate arrives.
  useGSAP(
    () => {
      const drawn = drawnRef.current
      const masked = maskedRef.current
      const wrap = wrapRef.current
      if (!drawn || !masked || !wrap) return
      const pairs = MONOGRAM_PARTS.map((r, i) => ({
        r,
        a: drawn.children[i] as SVGRectElement,
        b: masked.children[i] as SVGRectElement,
      }))
      const write = (p: number) => {
        for (const { r, a, b } of pairs) {
          const t = partProgress(p, r.part)
          // 'c' parts are the two tongues: they open from their own centre, not from an edge.
          const w = r.grow === 'y' ? r.w : r.w * t
          const h = r.grow === 'x' ? r.h : r.h * t
          const x = r.grow === 'c' ? r.x + (r.w - w) / 2 : r.x
          const y = r.grow === 'c' ? r.y + (r.h - h) / 2 : r.y
          for (const el of [a, b]) {
            el.setAttribute('x', x.toFixed(2))
            el.setAttribute('y', y.toFixed(2))
            el.setAttribute('width', w.toFixed(2))
            el.setAttribute('height', h.toFixed(2))
          }
        }
      }
      if (reduced) {
        write(1)
        return
      }
      setupGsap()
      const state = { p: 0 }
      write(0)
      const tween = gsap.to(state, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'center 60%',
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: () => write(state.p),
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        write(1)
      }
    },
    { scope: wrapRef, dependencies: [reduced] },
  )

  const bars = (ref: React.Ref<SVGGElement>, fill: string) => (
    <g ref={ref} fill={fill}>
      {MONOGRAM_PARTS.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} />
      ))}
    </g>
  )

  return (
    <div ref={wrapRef} className="about-mark">
      <svg
        className="about-mark__svg"
        viewBox={`0 0 ${MONOGRAM_SIZE} ${MONOGRAM_SIZE}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* 10 of the 1000 units is about 4px at the size the mark is drawn, the same cell as
              the headline's printed dither. */}
          <pattern id={PATTERN_ID} width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="var(--ink)" />
            <rect x="5" y="5" width="5" height="5" fill="var(--ink)" />
          </pattern>
        </defs>
        {bars(drawnRef, live ? 'none' : `url(#${PATTERN_ID})`)}
      </svg>
      <svg className="about-mark__defs" aria-hidden="true" focusable="false" width="0" height="0">
        <mask id={MASK_ID} maskUnits="userSpaceOnUse" x="0" y="0" width="8000" height="8000">
          <g ref={groupRef}>{bars(maskedRef, '#fff')}</g>
        </mask>
      </svg>
    </div>
  )
}
