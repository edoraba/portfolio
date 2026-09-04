'use client'
import { useEffect } from 'react'
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
 * Single-letter shortcuts, one listener: G toggles the grid overlay, T cycles the theme,
 * Escape closes the mobile menu. Ignored inside inputs and while the palette is open
 * (the palette owns the keyboard then).
 */
export function Hotkeys() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isEditable(e.target)) return
      const ui = useUi.getState()
      if (e.key === 'Escape' && ui.menuOpen) {
        ui.setMenuOpen(false)
        return
      }
      if (ui.paletteOpen) return
      if (e.key === 'g') ui.toggleGrid()
      else if (e.key === 't') void switchTheme(nextTheme(useTheme.getState().theme))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  return null
}
