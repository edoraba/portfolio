'use client'
import { create } from 'zustand'
import type { Cell } from './quality'

export type FieldMode = 'hero' | 'band' | 'off'

type FieldState = {
  /** WebGL, CSS masks and motion are all available on this device. */
  enabled: boolean
  /** A page on screen wants the field (the canvas is only loaded while this is true). */
  requested: boolean
  /** The renderer exists and is drawing. */
  mounted: boolean
  mode: FieldMode
  /** 0 to 1, overall visibility. */
  intensity: number
  /** Pointer in viewport CSS pixels. */
  pointer: { x: number; y: number; active: boolean }
  cell: Cell
  setEnabled: (v: boolean) => void
  setRequested: (v: boolean) => void
  setMounted: (v: boolean) => void
  setMode: (m: FieldMode) => void
  setIntensity: (i: number) => void
  setPointer: (x: number, y: number, active: boolean) => void
  setCell: (c: Cell) => void
}

export const useField = create<FieldState>((set) => ({
  enabled: false,
  requested: false,
  mounted: false,
  mode: 'off',
  intensity: 0,
  pointer: { x: -1, y: -1, active: false },
  cell: 2,
  setEnabled: (enabled) => set({ enabled }),
  setRequested: (requested) => set({ requested }),
  setMounted: (mounted) => set({ mounted }),
  setMode: (mode) => set({ mode }),
  setIntensity: (intensity) => set({ intensity }),
  setPointer: (x, y, active) => set({ pointer: { x, y, active } }),
  setCell: (cell) => set({ cell }),
}))
