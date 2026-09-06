'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { PRIORITY } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'
import { keyedRoutes } from '@/lib/site'
import { useUi } from '@/lib/ui-store'
import { ThemeSwatches } from './theme-swatches'

/**
 * Full-screen menu below lg: the numbered links in display size, right-aligned, the six theme
 * swatches at the bottom, the field in band mode behind.
 *
 * It opens out of the console rather than appearing: the panel is cut down from the top edge and
 * each line rises out of its own mask behind it, and closing runs the panel back up. The element
 * stays mounted until the closing animation has finished, which is what makes the way out as
 * smooth as the way in. Focus is trapped while it is open, Escape and navigation close it, focus
 * returns to the MENU button.
 */
export function MobileMenu({ returnTo }: { returnTo: React.RefObject<HTMLButtonElement | null> }) {
  const open = useUi((s) => s.menuOpen)
  const setOpen = useUi((s) => s.setMenuOpen)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'closed' | 'in' | 'out'>('closed')

  // Close on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  // Adjusting state while the prop changes rather than in an effect: opening is immediate,
  // closing hands over to the animation, and a menu that was never open stays that way.
  const [was, setWas] = useState(open)
  if (open !== was) {
    setWas(open)
    if (open) setPhase('in')
    else if (phase !== 'closed') setPhase('out')
  }

  useEffect(() => {
    if (phase !== 'in') return
    const root = ref.current
    if (!root) return
    useField.getState().claim('menu', {
      mode: 'band',
      intensity: 0.4,
      band: [0.55, 1],
      priority: PRIORITY.menu,
    })
    document.documentElement.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'),
      )
    focusables()[0]?.focus()
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const f = focusables()
      if (f.length === 0) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    root.addEventListener('keydown', trap)
    return () => {
      root.removeEventListener('keydown', trap)
      document.documentElement.style.overflow = ''
      useField.getState().release('menu')
    }
  }, [phase])

  // The panel is gone when its own closing animation ends, not when the state flips.
  const onEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === ref.current && phase === 'out') {
      setPhase('closed')
      returnTo.current?.focus()
    }
  }

  if (phase === 'closed') return null
  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="menu"
      data-phase={phase}
      onAnimationEnd={onEnd}
    >
      <ol className="menu__list">
        {keyedRoutes.map((item, i) => (
          <li key={item.href} className="menu__line" style={{ '--i': i } as React.CSSProperties}>
            <Link
              href={item.href}
              className="menu__link display"
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="menu__n label text-accent">{item.n}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
      <div className="menu__foot">
        <ThemeSwatches />
        <button type="button" className="label text-ink-muted" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
