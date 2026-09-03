'use client'
import { create } from 'zustand'

export type MotionPreference = 'auto' | 'full' | 'reduced'

const KEY = 'motion'
const QUERY = '(prefers-reduced-motion: reduce)'

/** Pure resolution: the site toggle wins, otherwise the OS decides. */
export function resolveReduced(preference: MotionPreference, osReduced: boolean): boolean {
  if (preference === 'reduced') return true
  if (preference === 'full') return false
  return osReduced
}

function readPreference(): MotionPreference {
  if (typeof localStorage === 'undefined') return 'auto'
  try {
    const v = localStorage.getItem(KEY)
    return v === 'full' || v === 'reduced' ? v : 'auto'
  } catch {
    return 'auto'
  }
}

function osReduced(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia(QUERY).matches
}

type MotionState = {
  preference: MotionPreference
  reduced: boolean
  setPreference: (p: MotionPreference) => void
}

export const useMotion = create<MotionState>((set) => {
  const preference = readPreference()
  const apply = (p: MotionPreference) => {
    const reduced = resolveReduced(p, osReduced())
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-motion', reduced ? 'reduced' : 'full')
    }
    return reduced
  }
  if (typeof matchMedia !== 'undefined') {
    matchMedia(QUERY).addEventListener('change', () => {
      const p = useMotion.getState().preference
      set({ reduced: apply(p) })
    })
  }
  return {
    preference,
    reduced: apply(preference),
    setPreference: (p) => {
      try {
        localStorage.setItem(KEY, p)
      } catch {
        // storage unavailable: the choice lasts for the session
      }
      set({ preference: p, reduced: apply(p) })
    },
  }
})

/** For non-React code (field support check, GSAP setup). */
export function isReduced(): boolean {
  return useMotion.getState().reduced
}
