'use client'
import { useEffect, useState } from 'react'
import { useUi } from '@/lib/ui-store'

const COLS = 12

/**
 * The layout grid made visible: 12 columns at lg, 6 at md, 4 below, plus an 8px baseline
 * and the viewport width in a mono corner. Toggled with G (outside inputs) or from the palette,
 * persisted per visitor. An easter egg that shows the system the site is built on.
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
      <div className="guides__cols site-container page-x">
        {Array.from({ length: COLS }, (_, i) => (
          <div key={i} className="guides__col" />
        ))}
      </div>
    </div>
  )
}
