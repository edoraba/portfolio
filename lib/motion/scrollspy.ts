'use client'
import { useEffect, useState } from 'react'

/**
 * Which heading is current: the one intersecting a band near the top of the viewport
 * (20 percent from the top, 70 percent from the bottom). Keeps the previous answer when
 * nothing intersects, so long sections never lose their marker.
 */
export function useScrollspy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (ids.length === 0) return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
