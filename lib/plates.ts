'use client'
import { useEffect, type RefObject } from 'react'
import { useConsole } from './console-store'

/** The seven home plates, in story order. The console prints `P/0n TITLE` for the visible one. */
export const PLATES = [
  { id: 'hero', n: 1, title: 'Design, then build' },
  { id: 'about', n: 2, title: 'In one sentence' },
  { id: 'work', n: 3, title: 'Work' },
  { id: 'notes', n: 4, title: 'Notes' },
  { id: 'toolbox', n: 5, title: 'Toolbox' },
  { id: 'since', n: 6, title: 'Since' },
  { id: 'contact', n: 7, title: 'Let us' },
] as const

export type PlateId = (typeof PLATES)[number]['id']

export function plateLabel(id: PlateId) {
  const p = PLATES.find((x) => x.id === id)
  return p ? `P/${String(p.n).padStart(2, '0')} ${p.title.toUpperCase()}` : ''
}

/**
 * Registers a plate element: while it is the most visible plate on screen the console shows
 * its number and title. Cheap: one IntersectionObserver with a few thresholds per plate.
 */
export function usePlate(id: PlateId, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.3) {
            useConsole.getState().setPlate(plateLabel(id))
          }
        }
      },
      { threshold: [0.3, 0.6] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [id, ref])
}
