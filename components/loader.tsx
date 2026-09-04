'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useField } from '@/lib/field/store'
import { canRenderField } from '@/lib/field/support'
import { cellForProgress, createReadiness, shouldShowLoader, type LoaderStep } from '@/lib/loader'
import { useMotion } from '@/lib/motion/store'
import { useMounted } from '@/lib/use-mounted'
import { MONOGRAM_BARS } from './console/monogram'

const HOP = 'cubic-bezier(0.56, 0, 0.35, 0.98)'
const KEY = 'calibrated'

/**
 * The calibration entrance. Renders nothing on the server and nothing at all unless the field
 * can run, motion is full and this session has not calibrated yet. While shown, the field
 * draws unmasked at a coarse cell behind a translucent overlay; the monogram bars fill as real
 * resources become ready (fonts, shader, content, images); the cell steps 8, 4, 2; then the
 * overlay wipes up and the hero takes the field. Never longer than 1.5s.
 */
export function Loader() {
  const mounted = useMounted()
  const [phase, setPhase] = useState<'on' | 'out' | 'done'>('on')
  const [marked, setMarked] = useState<LoaderStep[]>([])
  const [cell, setCell] = useState<8 | 4 | 2>(8)
  const ref = useRef<HTMLDivElement>(null)

  // Decided once, on the client: the sessionStorage flag we set on exit must not hide the wipe.
  const show = useMemo(() => {
    if (!mounted) return false
    let calibrated = false
    try {
      calibrated = sessionStorage.getItem(KEY) === '1'
    } catch {
      calibrated = false
    }
    const reduced = useMotion.getState().reduced
    return shouldShowLoader({ canRender: canRenderField(), reduced, calibrated })
  }, [mounted])

  useEffect(() => {
    if (!show) return
    const field = useField.getState()
    field.request('loader')
    field.setMode('calibrate')
    field.setIntensity(1)
    field.setCell(8)

    const r = createReadiness()
    const update = () => {
      setMarked(r.marked())
      const c = cellForProgress(r.progress())
      setCell(c)
      if (useField.getState().cell !== c) useField.getState().setCell(c)
    }
    document.fonts.ready.then(() => {
      r.mark('fonts')
      update()
    })
    r.mark('content')
    queueMicrotask(update)
    const unsub = useField.subscribe((s) => {
      if (s.mounted) {
        r.mark('shader')
        update()
      }
    })
    if (useField.getState().mounted) r.mark('shader')
    const imgs = Array.from(document.images).filter(
      (i) => i.loading !== 'lazy' && i.getBoundingClientRect().top < window.innerHeight,
    )
    Promise.allSettled(imgs.map((i) => (i.complete ? Promise.resolve() : i.decode()))).then(() => {
      r.mark('images')
      update()
    })

    let cancelled = false
    r.done.then(async () => {
      if (cancelled) return
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        // session only
      }
      setMarked([...r.marked(), 'ready'])
      setPhase('out')
      const el = ref.current
      const s = useField.getState()
      s.release('loader')
      if (s.mode === 'calibrate') {
        s.setMode('off')
        s.setIntensity(0)
      }
      if (s.cell !== 2) s.setCell(2)
      window.dispatchEvent(new Event('calibrated'))
      if (el) {
        const anim = el.animate(
          { clipPath: ['inset(0 0 0 0)', 'inset(0 0 100% 0)'] },
          { duration: 800, easing: HOP, fill: 'forwards' },
        )
        await anim.finished.catch(() => {})
      }
      setPhase('done')
    })
    return () => {
      cancelled = true
      unsub()
    }
  }, [show])

  if (!show || phase === 'done') return null
  return (
    <div ref={ref} className="loader" data-loader={phase} aria-hidden="true">
      <div className="loader__mark">
        <svg width="116" height="96" viewBox="0 0 116 96" focusable="false">
          {MONOGRAM_BARS.map((h, i) => {
            const on = i < marked.length
            return (
              <rect
                key={i}
                className="loader__bar"
                data-on={on || undefined}
                x={i * 24}
                y={96 - 96 * h}
                width={12}
                height={96 * h}
                fill="currentColor"
                style={{ transformOrigin: `${i * 24 + 6}px 96px` }}
              />
            )
          })}
        </svg>
        <p className="loader__line label">
          {phase === 'out' ? 'Calibrated' : 'Calibrating'} <span aria-hidden="true">·</span> cell{' '}
          {cell}
        </p>
      </div>
    </div>
  )
}
