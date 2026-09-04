'use client'
import { useEffect } from 'react'
import { useConsole } from '@/lib/console-store'

/** Sets the console readout for a page that is not the home (its title in mono caps). */
export function ConsolePlate({ label }: { label: string }) {
  useEffect(() => {
    useConsole.getState().setPlate(label.toUpperCase())
    return () => useConsole.getState().setPlate('')
  }, [label])
  return null
}
