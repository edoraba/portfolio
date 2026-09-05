'use client'
import { useEffect, useId, useRef } from 'react'
import Tempus from 'tempus'
import { PRIORITY } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'

/**
 * A rectangular window onto the field, for a plate that wants the dither as a picture rather
 * than as a wash. It files a claim while it is on screen and cuts the canvas to its own box, so
 * the same surface that runs behind the headline and the footer also fills a plate.
 *
 * Never put text over one: in five of the six themes the lit dither cell is exactly the ink
 * colour (see DESIGN.md, Colour). Without a field it falls back to a printed dither, so the
 * plate is never an empty rectangle.
 */
export function FieldPlate({
  id,
  intensity = 1,
  className,
}: {
  /** Claim id, unique on the page. */
  id: string
  intensity?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const maskId = `field-plate-${uid}`
  const live = useField((s) => s.owner === id && s.mounted)

  useEffect(() => {
    const el = ref.current
    const rect = rectRef.current
    if (!el || !rect) return
    const store = useField
    let visible = false
    let last = ''

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        if (!visible) store.getState().release(id)
      },
      { threshold: 0 },
    )
    io.observe(el)

    const unsub = Tempus.add(
      () => {
        if (!visible || document.hidden) return
        const r = el.getBoundingClientRect()
        if (r.width <= 0) return
        // Written only when it moves: every attribute change re-rasterises the mask.
        const next = [
          Math.round(r.left),
          Math.round(r.top),
          Math.round(r.width),
          Math.round(r.height),
        ].join(' ')
        if (next !== last) {
          last = next
          const [x, y, w, h] = next.split(' ')
          rect.setAttribute('x', x)
          rect.setAttribute('y', y)
          rect.setAttribute('width', w)
          rect.setAttribute('height', h)
        }
        store.getState().claim(id, {
          mode: 'hero',
          intensity,
          mask: maskId,
          priority: PRIORITY.plate,
        })
      },
      { label: `field-plate-${id}` },
    )

    return () => {
      io.disconnect()
      unsub?.()
      store.getState().release(id)
    }
  }, [id, intensity, maskId])

  return (
    <div
      ref={ref}
      className={['field-plate', live ? null : 'field-plate--printed', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <svg className="field-plate__defs" aria-hidden="true" focusable="false" width="0" height="0">
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="8000" height="8000">
          <rect ref={rectRef} x="0" y="0" width="0" height="0" fill="#fff" />
        </mask>
      </svg>
    </div>
  )
}
