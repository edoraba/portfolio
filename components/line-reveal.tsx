'use client'
import { useGSAP } from '@gsap/react'
import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, setupGsap, SplitText, T } from '@/lib/motion/gsap'
import { useMotion } from '@/lib/motion/store'

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
  id?: string
}

/**
 * Masked line reveal (Osmo x Codrops values: 0.8s, stagger 0.08, editorial ease) for
 * headings that enter with scroll. Not for body text and not for anything in the first
 * viewport: `html.js .reveal` hides the element until GSAP takes over, which would delay
 * LCP above the fold. Under reduced motion the element simply fades in.
 */
export function LineReveal({ as = 'h2', className, children, id }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useMotion((s) => s.reduced)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (reduced) {
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: T.fade, ease: 'power2.out' })
        return
      }
      setupGsap()
      let split: SplitText | undefined
      let cancelled = false
      document.fonts.ready.then(() => {
        if (cancelled) return
        gsap.set(el, { visibility: 'visible' })
        // aria "auto" puts an aria-label on the parent, which is only valid on headings;
        // on spans the lines stay plain text so nothing is hidden from assistive tech.
        const isHeading = /^h[1-6]$/.test(String(as))
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line',
          autoSplit: true,
          aria: isHeading ? 'auto' : 'none',
          onSplit(self) {
            return gsap.fromTo(
              self.lines,
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: T.line,
                stagger: Math.min(T.lineStagger, T.lineStaggerBudget / self.lines.length),
                ease: 'editorial',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              },
            )
          },
        })
      })
      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: ref, dependencies: [reduced, as] },
  )

  const Tag = as
  return (
    <Tag ref={ref} id={id} className={['reveal', className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
