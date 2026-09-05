'use client'
import { useEffect } from 'react'
import Tempus from 'tempus'
import { PRIORITY } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'

/** Height of the dither strip at the top of the footer, in CSS pixels. */
const STRIP = 96
const STRIP_SM = 64

/**
 * Brings the field back at the end of every page as a strip in the empty margin just above the
 * footer. It is a strip above the text and not a wash behind it on purpose: in five of the six
 * themes the lit dither cell is exactly the ink colour, so text over the field is unreadable.
 * The field is texture, never a backdrop for reading (see DESIGN.md, Colour).
 */
export function FooterField({ target }: { target: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const el = target.current
    if (!el) return
    const store = useField
    let visible = false

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        if (!visible) store.getState().release('footer')
      },
      { threshold: 0 },
    )
    io.observe(el)

    const unsub = Tempus.add(
      () => {
        const s = store.getState()
        // Claim whether or not the canvas exists yet: claiming is what brings it in.
        if (!visible) return
        const h = window.innerHeight
        const strip = window.innerWidth < 768 ? STRIP_SM : STRIP
        const r = el.getBoundingClientRect()
        // The strip lives in the gap above the footer, never over its first line of text.
        const top = Math.max(0, Math.min(1, (r.top - strip) / h))
        const bottom = Math.max(0, Math.min(1, r.top / h))
        if (bottom <= top) {
          store.getState().release('footer')
          return
        }
        s.claim('footer', {
          mode: 'band',
          intensity: 0.45,
          band: [top, bottom],
          priority: PRIORITY.footer,
        })
      },
      { label: 'footer-field' },
    )

    return () => {
      io.disconnect()
      unsub?.()
      store.getState().release('footer')
    }
  }, [target])

  return null
}
