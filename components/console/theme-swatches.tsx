'use client'
import { useConsole } from '@/lib/console-store'
import { useMotion } from '@/lib/motion/store'
import { useTheme } from '@/lib/theme-store'
import { THEMES, THEME_NAMES, type ThemeName } from '@/lib/themes'
import { useMounted } from '@/lib/use-mounted'

const HOP = 'cubic-bezier(0.56, 0, 0.35, 0.98)'

/**
 * Switches the theme with a polygon sweep across the page (View Transitions API on the hop
 * ease). Sweeps from the left when moving down the registry, from the right when moving up.
 * Reduced motion or no API support: instant swap.
 */
export async function switchTheme(next: ThemeName) {
  const { theme, set } = useTheme.getState()
  if (next === theme) return
  const root = document.documentElement
  const reduced = useMotion.getState().reduced
  if (reduced || typeof document.startViewTransition !== 'function') {
    set(next)
    return
  }
  root.setAttribute('data-theme-switching', '')
  const transition = document.startViewTransition(() => set(next))
  try {
    await transition.ready
    const fromLeft = THEME_NAMES.indexOf(next) > THEME_NAMES.indexOf(theme)
    const from = fromLeft
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

/**
 * Six 12px squares, one per world, each filled with that theme's canvas and outlined in
 * the current ink; the active one is filled with ink. A radiogroup for assistive tech.
 * Hovering a swatch prints the theme name in the console cell.
 */
export function ThemeSwatches({ className }: { className?: string }) {
  const theme = useTheme((s) => s.theme)
  const mounted = useMounted()
  const setHover = useConsole((s) => s.setHover)
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`swatches ${className ?? ''}`.trim()}
      onPointerLeave={() => setHover(null)}
    >
      {THEMES.map((t) => {
        const active = mounted && t.name === theme
        return (
          <button
            key={t.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t.label}
            title={t.description}
            className="swatch"
            data-active={active || undefined}
            style={{ '--swatch': t.tokens.canvas } as React.CSSProperties}
            onClick={() => switchTheme(t.name)}
            onPointerEnter={() => setHover(`Theme ${t.label}`)}
            onFocus={() => setHover(`Theme ${t.label}`)}
            onBlur={() => setHover(null)}
          />
        )
      })}
    </div>
  )
}
