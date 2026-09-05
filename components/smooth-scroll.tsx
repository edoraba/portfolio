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
    // Pinned plates measure in pixels, and every pin they add changes the document height for
    // the ones below it. Remeasure once the fonts are in and once everything has mounted,
    // otherwise the last plate on the page keeps the distances of a shorter document.
    let cancelled = false
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh()
    }
    document.fonts.ready.then(refresh)
    if (document.readyState === 'complete') requestAnimationFrame(refresh)
    else window.addEventListener('load', refresh, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', refresh)
      unsub?.()
      instance = null
      lenis.destroy()
    }
  }, [reduced])

  return null
}
