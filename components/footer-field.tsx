'use client'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { useField } from '@/lib/field/store'

/**
 * Brings the field back at the end of every page: while the footer is on screen the canvas
 * runs in band mode behind it, the band tracking the footer's position each frame.
 * The hero keeps priority on the home page; the footer only takes the field when it is free.
 */
export function FooterField({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const owning = useRef(false)

  useEffect(() => {
    const el = target.current
    if (!el) return
    const store = useField
    let visible = false

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        if (visible) store.getState().request('footer')
        else {
          if (owning.current) {
            owning.current = false
            const s = store.getState()
            if (s.mode === 'band') {
              s.setMode('off')
              s.setIntensity(0)
            }
          }
          store.getState().release('footer')
        }
      },
      { threshold: 0 },
    )
    io.observe(el)

    const unsub = Tempus.add(
      () => {
        if (!visible) return
        const s = store.getState()
        if (!s.enabled || s.mode === 'hero') return
        const r = el.getBoundingClientRect()
        const h = window.innerHeight
        const band: [number, number] = [
          Math.max(0, Math.min(1, r.top / h)),
          Math.max(0, Math.min(1, r.bottom / h)),
        ]
        if (band[1] <= band[0]) return
        if (s.mode !== 'band') {
          s.setMode('band')
          s.setIntensity(0.45)
          owning.current = true
        }
        if (Math.abs(band[0] - s.band[0]) > 0.002 || Math.abs(band[1] - s.band[1]) > 0.002) {
          s.setBand(band)
        }
      },
      { label: 'footer-field' },
    )

    return () => {
      io.disconnect()
      unsub?.()
      const s = store.getState()
      if (owning.current && s.mode === 'band') {
        s.setMode('off')
        s.setIntensity(0)
      }
      s.release('footer')
    }
  }, [target])

  return null
}
