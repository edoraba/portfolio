'use client'
import { useEffect, useRef, useState } from 'react'
import Tempus from 'tempus'
import { colOf, displace, lattice, polyline, rowOf, type Point } from '@/lib/motion/cloth'
import { smoothPointer, type Smoothed, type Target } from '@/lib/field/pointer'
import { useMotion } from '@/lib/motion/store'
import { site } from '@/lib/site'
import { CopyEmail } from '../copy-email'
import { FlipText } from '../flip-text'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

const COLS = 12
const ROWS = 8
const VB = { w: 1200, h: 700 }
const RADIUS = 0.28
const STRENGTH = 0.055
const ATTACK_MS = 25
const RELEASE_MS = 175

/**
 * P/07. A ruled cloth that bulges away from the pointer, with the call to action at its centre.
 * The lattice is plain SVG on the shared clock, so it costs nothing next to the field. Under
 * reduced motion the cloth is a still grid and the words simply swap.
 */
export function Cloth() {
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    const wrap = wrapRef.current
    if (!svg || !wrap || reduced) return
    const base = lattice(COLS, ROWS)
    const rows = svg.querySelectorAll<SVGPolylineElement>('[data-row]')
    const cols = svg.querySelectorAll<SVGPolylineElement>('[data-col]')
    const target: Target = { x: -1, y: -1, active: false }
    let smooth: Smoothed = { x: 0.5, y: 0.5, s: 0 }

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = (e.clientY - r.top) / r.height
      target.active = target.x >= -0.2 && target.x <= 1.2 && target.y >= -0.2 && target.y <= 1.2
    }
    const onLeave = () => {
      target.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    const unsub = Tempus.add(
      ({ deltaTime }) => {
        if (document.hidden) return
        const r = wrap.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) return
        smooth = smoothPointer(smooth, target, deltaTime, ATTACK_MS, RELEASE_MS)
        const pointer: Point | null = smooth.s > 0.001 ? { x: smooth.x, y: smooth.y } : null
        const pts = displace(base, pointer, RADIUS, STRENGTH * smooth.s)
        rows.forEach((line, r2) =>
          line.setAttribute('points', polyline(rowOf(pts, COLS, r2), VB.w, VB.h)),
        )
        cols.forEach((line, c) =>
          line.setAttribute('points', polyline(colOf(pts, COLS, ROWS, c), VB.w, VB.h)),
        )
      },
      { label: 'cloth' },
    )

    return () => {
      unsub?.()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  // The call to action flips to the invitation once the plate is properly on screen.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const io = new IntersectionObserver(([e]) => setFlipped(e.intersectionRatio > 0.6), {
      threshold: [0.6],
    })
    io.observe(wrap)
    return () => io.disconnect()
  }, [])

  const base = lattice(COLS, ROWS)

  return (
    <Plate id="contact" className="cloth-plate" meta={<span>{site.coordinates}</span>}>
      <Rule />
      <Cell col={1} end={13} l r flush>
        <div ref={wrapRef} className="cloth">
          <svg
            ref={svgRef}
            className="cloth__grid"
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: ROWS + 1 }, (_, r) => (
              <polyline
                key={`r${r}`}
                data-row={r}
                points={polyline(rowOf(base, COLS, r), VB.w, VB.h)}
              />
            ))}
            {Array.from({ length: COLS + 1 }, (_, c) => (
              <polyline
                key={`c${c}`}
                data-col={c}
                points={polyline(colOf(base, COLS, ROWS, c), VB.w, VB.h)}
              />
            ))}
          </svg>
          <div className="cloth__centre">
            <p className="cloth__cta flip display" data-flipped={flipped || undefined}>
              <FlipText alt="Write to me">Let us build</FlipText>
            </p>
            <CopyEmail className="cloth__email headline" />
            <p className="label text-ink-muted">Turin or remote</p>
          </div>
        </div>
      </Cell>
      <Rule />
    </Plate>
  )
}
