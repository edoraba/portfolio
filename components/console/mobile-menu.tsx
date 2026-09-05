'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { PRIORITY } from '@/lib/field/claims'
import { useField } from '@/lib/field/store'
import { navItems } from '@/lib/site'
import { useUi } from '@/lib/ui-store'
import { ThemeSwatches } from './theme-swatches'

const ITEMS = [
  { n: '0', label: 'Home', href: '/' },
  ...navItems,
  { n: '5', label: 'Now', href: '/now' },
  { n: '6', label: 'Colophon', href: '/colophon' },
] as const

/**
 * Full-screen menu below lg: seven numbered links in display size, right-aligned, the six
 * theme swatches at the bottom, the field in band mode behind. Focus is trapped while open,
 * Escape and navigation close it, focus returns to the MENU button.
 */
export function MobileMenu({ returnTo }: { returnTo: React.RefObject<HTMLButtonElement | null> }) {
  const open = useUi((s) => s.menuOpen)
  const setOpen = useUi((s) => s.setMenuOpen)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  // Close on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) returnTo.current?.focus()
      wasOpen.current = false
      return
    }
    wasOpen.current = true
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
  }, [open, returnTo])

  if (!open) return null
  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="menu"
    >
      <ol className="menu__list">
        {ITEMS.map((item) => (
          <li key={item.href}>
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
