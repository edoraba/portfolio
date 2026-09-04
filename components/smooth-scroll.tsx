'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'
import Tempus from 'tempus'
import { ScrollTrigger, setupGsap } from '@/lib/motion/gsap'
import { useMotion } from '@/lib/motion/store'

/**
 * Lenis in root mode on the pages that scroll as a composition (home, work).
 * Native scroll stays underneath (anchors, sticky, keyboard and the field's scrollY all work),
 * the wheel just gets a light lerp. Never created under reduced motion, never on reading pages.
 */
let instance: Lenis | null = null

/** The live Lenis instance, or null on reading pages and under reduced motion. */
export function getLenis(): Lenis | null {
  return instance
}

export function SmoothScroll() {
  const reduced = useMotion((s) => s.reduced)

  useEffect(() => {
    if (reduced) return
    setupGsap()
    const lenis = new Lenis({ lerp: 0.08, autoRaf: false, smoothWheel: true, syncTouch: false })
    instance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const unsub = Tempus.add(({ time }) => lenis.raf(time), { order: -5, label: 'lenis' })
    // Pinned plates measure in pixels: remeasure once the real fonts are in and the layout settles.
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
      unsub?.()
      instance = null
      lenis.destroy()
    }
  }, [reduced])

  return null
}
