'use client'
import { useMotion } from '@/lib/motion/store'
import { useTheme, type Theme } from '@/lib/theme-store'
import { useMounted } from '@/lib/use-mounted'

const HOP = 'cubic-bezier(0.56, 0, 0.35, 0.98)'

/**
 * The theme switch as a designed moment: two mono words, FIELD and PAPER, the active one in
 * the accent with a 1px rule underneath. Switching sweeps the new world across the page
 * (a polygon wipe on the hop ease through the View Transitions API). Radius 0, so no circle.
 * Reduced motion or no API support: instant swap.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const reduced = useMotion((s) => s.reduced)
  const mounted = useMounted()

  async function switchTo(next: Theme) {
    if (next === theme) return
    const root = document.documentElement
    if (reduced || typeof document.startViewTransition !== 'function') {
      setTheme(next)
      return
    }
    root.setAttribute('data-theme-switching', '')
    const transition = document.startViewTransition(() => setTheme(next))
    try {
      await transition.ready
      const toPaper = next === 'light'
      const from = toPaper
        ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
      const to = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      root.animate(
        { clipPath: [from, to] },
        {
          duration: window.innerWidth < 768 ? 400 : 600,
          easing: HOP,
          pseudoElement: '::view-transition-new(root)',
        },
      )
      await transition.finished
    } finally {
      root.removeAttribute('data-theme-switching')
    }
  }

  const isPaper = mounted && theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPaper}
      aria-label="Theme"
      onClick={() => switchTo(isPaper ? 'dark' : 'light')}
      className="theme-switch inline-flex min-h-6 items-center gap-1 py-2 label text-ink-muted"
    >
      <span className={isPaper ? '' : 'theme-switch__on'}>Field</span>
      <span aria-hidden="true">/</span>
      <span className={isPaper ? 'theme-switch__on' : ''}>Paper</span>
    </button>
  )
}
