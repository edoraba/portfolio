'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { keyedRoutes } from '@/lib/site'
import { useTheme } from '@/lib/theme-store'
import { useUi } from '@/lib/ui-store'
import { switchTheme } from './theme-swatches'
import { nextTheme } from '@/lib/themes'

function isEditable(t: EventTarget | null) {
  return (
    t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
  )
}

/**
 * Single letter shortcuts, one listener. The numbers are the ones already printed next to the
 * names: the console prints 1 WORK, the menu prints 0 HOME, and pressing them goes there, with
 * the same forward transition a link would use. G toggles the grid, T cycles the theme, ? opens
 * the palette on its list of keys, Escape closes the menu. Ignored inside inputs and while the
 * palette is open, because the palette owns the keyboard then.
 */
export function Hotkeys() {
  const router = useRouter()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isEditable(e.target)) return
      const ui = useUi.getState()
      if (e.key === 'Escape' && ui.menuOpen) {
        ui.setMenuOpen(false)
        return
      }
      if (ui.paletteOpen) return
      const route = keyedRoutes.find((r) => r.n === e.key)
      if (route) {
        e.preventDefault()
        ui.setMenuOpen(false)
        router.push(route.href, { transitionTypes: ['nav-forward'] })
        return
      }
      if (e.key === '?') {
        e.preventDefault()
        ui.setPaletteOpen(true)
        return
      }
      if (e.key === 'g') ui.toggleGrid()
      else if (e.key === 't') void switchTheme(nextTheme(useTheme.getState().theme))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [router])
  return null
}
