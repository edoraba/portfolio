'use client'
import { useEffect, type RefObject } from 'react'
import Tempus from 'tempus'
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
 * One registry and one loop for every plate. Intersection ratios are ambiguous once sections
 * are pinned (a pin spacer and a fixed section can both be "visible"), so the console names the
 * plate that actually covers the middle of the screen, falling back to the nearest one.
 */
const registry = new Map<PlateId, HTMLElement>()
let stop: (() => void) | undefined

function pick(): PlateId | null {
  const middle = window.innerHeight / 2
  let nearest: { id: PlateId; distance: number } | null = null
  for (const [id, el] of registry) {
    const r = el.getBoundingClientRect()
    if (r.top <= middle && r.bottom >= middle) return id
    const distance = r.top > middle ? r.top - middle : middle - r.bottom
    if (!nearest || distance < nearest.distance) nearest = { id, distance }
  }
  return nearest?.id ?? null
}

function start() {
  if (stop) return
  let last: PlateId | null = null
  stop = Tempus.add(
    () => {
      const id = pick()
      if (id && id !== last) {
        last = id
        useConsole.getState().setPlate(plateLabel(id))
      }
    },
    { fps: 10, label: 'plates' },
  )
}

export function usePlate(id: PlateId, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    registry.set(id, el)
    start()
    return () => {
      registry.delete(id)
      if (registry.size === 0) {
        stop?.()
        stop = undefined
        useConsole.getState().setPlate('')
      }
    }
  }, [id, ref])
}
