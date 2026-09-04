'use client'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { heroIntensity } from '@/lib/field/scroll'
import { useField } from '@/lib/field/store'
import { prefersReducedMotion } from '@/lib/field/support'
import { clamp01, lerp } from '@/lib/motion/scrub'

const WORDS = ['Design,', 'then', 'build.'] as const
const HEADLINE = 'Design, then build.'
const WIDTH_MIN = 78
const WIDTH_MAX = 100
/** The headline compresses to the narrow width over the first 60 percent of a viewport. */
const COMPRESS_OVER = 0.6

/**
 * The home headline. Screen readers get a plain h1. Sighted visitors get the words as
 * SVG text drawn twice: once in the page (transparent, so the canvas shows through) and
 * once inside an SVG mask that clips the fixed field canvas to the letterforms. The mask also
 * carries the hero band rectangle, so one canvas lights two windows: the words and the strip.
 * When the field is unavailable the visible text is filled with a static 2px dither instead.
 */
export function HeroMask({ band }: { band?: React.RefObject<HTMLElement | null> }) {
  const active = useField((s) => s.enabled && s.mounted)
  const wrapRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef<SVGSVGElement>(null)
  const maskGroupRef = useRef<SVGGElement>(null)
  const bandRectRef = useRef<SVGRectElement>(null)

  // Everything the hero owns runs in one tick: the mask follows the visible headline and the
  // band cell, scroll fades the field and narrows the words, the pointer widens the nearest one.
  useEffect(() => {
    const wrap = wrapRef.current
    const visible = visibleRef.current
    const group = maskGroupRef.current
    if (!wrap || !visible || !group) return
    const store = useField
    const reduced = prefersReducedMotion()
    let lastTransform = ''
    store.getState().request('hero')

    // Visible words and their twins inside the mask, paired by index so both carry the same width.
    const words = WORDS.map((_, i) => ({
      visible: wrap.querySelector<SVGTSpanElement>(`[data-word="${i}"]`),
      mirror: wrap.querySelector<SVGTSpanElement>(`[data-mirror="${i}"]`),
      last: '',
    }))

    const pointer = { x: -1, active: false }
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }

    const tick = () => {
      const rect = visible.getBoundingClientRect()
      const transform = `translate(${rect.left.toFixed(1)} ${rect.top.toFixed(1)})`
      if (transform !== lastTransform) {
        group.setAttribute('transform', transform)
        lastTransform = transform
      }

      // The band is a second window in the same mask: a rectangle over the empty band cell.
      const bandEl = band?.current
      const bandRect = bandRectRef.current
      if (bandEl && bandRect) {
        const b = bandEl.getBoundingClientRect()
        bandRect.setAttribute('x', b.left.toFixed(1))
        bandRect.setAttribute('y', b.top.toFixed(1))
        bandRect.setAttribute('width', Math.max(0, b.width).toFixed(1))
        bandRect.setAttribute('height', Math.max(0, b.height).toFixed(1))
      }

      const s = store.getState()
      if (!s.enabled) return
      if (s.mode === 'calibrate') return
      const intensity = heroIntensity(window.scrollY, window.innerHeight)
      if (intensity > 0) {
        if (s.mode !== 'hero') s.setMode('hero')
        if (intensity !== s.intensity) s.setIntensity(intensity)
      } else if (s.mode === 'hero') {
        s.setMode('off')
        s.setIntensity(0)
      }

      if (reduced) return
      // Width has two inputs: scroll compresses every word, the pointer widens the nearest.
      const scrolled = clamp01(window.scrollY / (window.innerHeight * COMPRESS_OVER))
      const base = lerp(WIDTH_MAX, WIDTH_MIN, scrolled)
      const reach = window.innerWidth * 0.35
      for (const word of words) {
        if (!word.visible) continue
        // At rest every word sits at the scroll width; a pointer narrows the ones far from it.
        let w = base
        if (pointer.active) {
          const r = word.visible.getBoundingClientRect()
          const near = Math.max(0, 1 - Math.abs(pointer.x - (r.left + r.width / 2)) / reach)
          w = WIDTH_MIN + (base - WIDTH_MIN) * near
        }
        const value = `'opsz' 96, 'wdth' ${w.toFixed(1)}`
        if (value !== word.last) {
          word.last = value
          word.visible.style.fontVariationSettings = value
          if (word.mirror) word.mirror.style.fontVariationSettings = value
        }
      }
    }
    const unsub = Tempus.add(tick, { label: 'hero-mask' })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    // After the calibration loader: the words open from the narrow width to full.
    const onCalibrated = () => {
      if (reduced) return
      words.forEach((word, i) => {
        word.visible?.animate(
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
  }, [band])

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
          <rect ref={bandRectRef} x="0" y="0" width="0" height="0" fill="#fff" />
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
