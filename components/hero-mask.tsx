'use client'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { heroIntensity } from '@/lib/field/scroll'
import { useField } from '@/lib/field/store'
import { prefersReducedMotion } from '@/lib/field/support'

const WORDS = ['Design,', 'then', 'build.'] as const
const HEADLINE = 'Design, then build.'
const WIDTH_MIN = 78
const WIDTH_MAX = 100

/**
 * The home headline. Screen readers get a plain h1. Sighted visitors get the words as
 * SVG text drawn twice: once in the page (transparent, so the canvas shows through) and
 * once inside an SVG mask that clips the fixed field canvas to the letterforms. When the
 * field is unavailable the visible text is filled with a static 2px dither instead.
 */
export function HeroMask() {
  const active = useField((s) => s.enabled && s.mounted)
  const wrapRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef<SVGSVGElement>(null)
  const maskGroupRef = useRef<SVGGElement>(null)

  // Mask position follows the visible headline every frame, only writing when it moves.
  // Scroll fades the field and switches the mode; pointer proximity widens the nearest word.
  useEffect(() => {
    const wrap = wrapRef.current
    const visible = visibleRef.current
    const group = maskGroupRef.current
    if (!wrap || !visible || !group) return
    const store = useField
    const reduced = prefersReducedMotion()
    let lastTransform = ''
    store.getState().request('hero')

    const tick = () => {
      const rect = visible.getBoundingClientRect()
      const transform = `translate(${rect.left.toFixed(1)} ${rect.top.toFixed(1)})`
      if (transform !== lastTransform) {
        group.setAttribute('transform', transform)
        lastTransform = transform
      }
      const s = store.getState()
      if (!s.enabled) return
      if (s.mode === 'calibrate') return
      const intensity = heroIntensity(window.scrollY, window.innerHeight)
      if (intensity > 0) {
        // The hero owns the field while it is on screen.
        if (s.mode !== 'hero') s.setMode('hero')
        if (intensity !== s.intensity) s.setIntensity(intensity)
      } else if (s.mode === 'hero') {
        // Hand over: another owner (the footer) may take the field from here.
        s.setMode('off')
        s.setIntensity(0)
      }
    }
    const unsub = Tempus.add(tick, { label: 'hero-mask' })

    const spans = Array.from(wrap.querySelectorAll<SVGTSpanElement>('[data-word]'))
    const onMove = (e: PointerEvent) => {
      if (reduced) return
      const reach = window.innerWidth * 0.35
      for (const span of spans) {
        const r = span.getBoundingClientRect()
        const dx = Math.abs(e.clientX - (r.left + r.width / 2))
        const w = WIDTH_MIN + (WIDTH_MAX - WIDTH_MIN) * Math.max(0, 1 - dx / reach)
        span.style.fontVariationSettings = `'opsz' 96, 'wdth' ${w.toFixed(1)}`
      }
    }
    const onLeave = () => {
      for (const span of spans) span.style.fontVariationSettings = ''
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    // After the calibration loader: the words open from the narrow width to full.
    const onCalibrated = () => {
      if (reduced) return
      spans.forEach((span, i) => {
        span.animate(
          [
            { fontVariationSettings: `'opsz' 96, 'wdth' ${WIDTH_MIN}` },
            { fontVariationSettings: `'opsz' 96, 'wdth' ${WIDTH_MAX}` },
          ],
          { duration: 800, delay: i * 80, easing: 'cubic-bezier(0.625, 0.05, 0, 1)' },
        )
      })
    }
    window.addEventListener('calibrated', onCalibrated)

    return () => {
      unsub?.()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('calibrated', onCalibrated)
      const s = store.getState()
      if (s.mode === 'hero') {
        s.setMode('off')
        s.setIntensity(0)
      }
      s.release('hero')
    }
  }, [])

  const fill = active ? 'none' : 'url(#hero-dither)'

  return (
    <div ref={wrapRef} className="hero-mask">
      <h1 className="sr-only">{HEADLINE}</h1>
      <svg ref={visibleRef} className="hero-svg" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="hero-dither" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" className="hero-dither-cell" />
            <rect x="2" y="2" width="2" height="2" className="hero-dither-cell" />
          </pattern>
        </defs>
        <Lines fill={fill} mirror={false} />
      </svg>
      <svg className="hero-mask-defs" aria-hidden="true" focusable="false" width="0" height="0">
        <mask id="hero-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="8000" height="8000">
          <g ref={maskGroupRef}>
            <Lines fill="#fff" mirror />
          </g>
        </mask>
      </svg>
    </div>
  )
}

function Lines({ fill, mirror }: { fill: string; mirror: boolean }) {
  const word = (i: number, extra?: string) => (
    <tspan
      className={`${extra ?? ''}`.trim() || undefined}
      data-word={mirror ? undefined : i}
      data-mirror={mirror ? i : undefined}
    >
      {WORDS[i]}
    </tspan>
  )
  return (
    <>
      <text className="hero-text" x="0" y="0" dominantBaseline="text-before-edge" fill={fill}>
        {word(0)}
      </text>
      <text className="hero-text" x="0" y="0.86em" dominantBaseline="text-before-edge" fill={fill}>
        {word(1)} {word(2, 'hero-italic')}
      </text>
    </>
  )
}
