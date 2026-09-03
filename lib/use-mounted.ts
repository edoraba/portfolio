'use client'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// True after hydration, false during SSR and the first client render.
// Uses useSyncExternalStore so no state is set inside an effect.
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
