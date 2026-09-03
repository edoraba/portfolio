'use client'
import { useEffect, useRef } from 'react'
import { decode } from '@/lib/motion/decode'
import { useMotion } from '@/lib/motion/store'

/**
 * A mono label that decodes once when it enters the viewport. Server-rendered with the
 * final text, so nothing depends on JavaScript; under reduced motion it never scrambles.
 */
export function Decode({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useMotion((s) => s.reduced)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    let stop: (() => void) | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        stop = decode(el, children)
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop?.()
    }
  }, [children, reduced])

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}
