'use client'
import { useEffect, useRef } from 'react'
import { decode } from '@/lib/motion/decode'
import { useMotion } from '@/lib/motion/store'

/**
 * A mono label that decodes once when it enters the viewport. The visible span is decorative
 * (aria-hidden while it scrambles), a visually hidden twin carries the real text, so assistive
 * tech never hears the scramble. The markup is identical on the server and on every client
 * (motion preference only decides whether the effect runs), so hydration can never mismatch.
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
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  )
}
