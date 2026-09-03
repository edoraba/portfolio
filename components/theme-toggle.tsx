'use client'
import { useTheme } from '@/lib/theme-store'
import { useMounted } from '@/lib/use-mounted'

// The server does not know the visitor's theme, so both the label and the aria-label
// stay neutral until hydration and switch to the real state on the client.
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const mounted = useMounted()
  const next = theme === 'dark' ? 'paper' : 'field'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${next} theme` : 'Switch theme'}
      className="inline-flex items-center py-2 label text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      {mounted ? (theme === 'dark' ? 'Paper' : 'Field') : 'Theme'}
    </button>
  )
}
