'use client'
import { useTheme } from '@/lib/theme-store'
import { useMounted } from '@/lib/use-mounted'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const mounted = useMounted()
  const next = theme === 'dark' ? 'paper' : 'field'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="label text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      {mounted ? (theme === 'dark' ? 'Paper' : 'Field') : 'Theme'}
    </button>
  )
}
