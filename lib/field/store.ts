'use client'
import { create } from 'zustand'
import type { Cell } from './quality'

export type FieldMode = 'hero' | 'band' | 'off'

type FieldState = {
  /** WebGL, CSS masks and motion are all available on this device. */
  enabled: boolean
  /** Ids of the components on screen that want the field; the canvas loads while any exist. */
  requests: string[]
  requested: boolean
  /** The renderer exists and is drawing. */
  mounted: boolean
  mode: FieldMode
  /** 0 to 1, overall visibility. */
  intensity: number
  /** Band range from the top of the viewport, 0..1, used in band mode. */
  band: [number, number]
  /** Pointer in viewport CSS pixels. */
  pointer: { x: number; y: number; active: boolean }
  cell: Cell
  setEnabled: (v: boolean) => void
  request: (id: string) => void
  release: (id: string) => void
  setMounted: (v: boolean) => void
  setMode: (m: FieldMode) => void
  setIntensity: (i: number) => void
  setBand: (b: [number, number]) => void
  setPointer: (x: number, y: number, active: boolean) => void
  setCell: (c: Cell) => void
}

export const useField = create<FieldState>((set, get) => ({
  enabled: false,
  requests: [],
  requested: false,
  mounted: false,
  mode: 'off',
  intensity: 0,
  band: [0.5, 1],
  pointer: { x: -1, y: -1, active: false },
  cell: 2,
  setEnabled: (enabled) => set({ enabled }),
  request: (id) => {
    const requests = Array.from(new Set([...get().requests, id]))
    set({ requests, requested: requests.length > 0 })
  },
  release: (id) => {
    const requests = get().requests.filter((r) => r !== id)
    set({ requests, requested: requests.length > 0 })
  },
  setMounted: (mounted) => set({ mounted }),
  setMode: (mode) => set({ mode }),
  setIntensity: (intensity) => set({ intensity }),
  setBand: (band) => set({ band }),
  setPointer: (x, y, active) => set({ pointer: { x, y, active } }),
  setCell: (cell) => set({ cell }),
}))
