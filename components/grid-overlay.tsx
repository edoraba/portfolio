'use client'
import { useEffect, useState } from 'react'
import { BREAKPOINTS } from '@/lib/sheet'
import { useUi } from '@/lib/ui-store'
import { spanStyle } from './sheet/span'

const COLS = BREAKPOINTS.lg.cols

/**
 * The sheet made visible: the same grid every component sits on (same page tracks, same gaps,
 * same column count per breakpoint), plus an 8px baseline and the viewport width in a mono
 * corner. Because it is literally a `.sheet`, its lines coincide with every hairline on the
 * page by construction. Toggled with G (see console/hotkeys.tsx) or from the palette.
 */
export function GridOverlay() {
  const grid = useUi((s) => s.grid)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!grid) return
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [grid])

  if (!grid) return null
  return (
    <div className="guides" aria-hidden="true" data-width={width}>
      <div className="guides__sheet sheet">
        {Array.from({ length: COLS }, (_, i) => (
          <div
            key={i}
            className="guides__col on-sheet"
            style={spanStyle({
              col: i + 1,
              end: i + 2,
              md: { col: i + 1, end: i + 2 },
              sm: { col: i + 1, end: i + 2 },
            })}
          />
        ))}
      </div>
    </div>
  )
}
