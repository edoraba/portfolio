'use client'
import { create } from 'zustand'
import { DEFAULT_BAND, resolveClaims, sameClaim, type Claim } from './claims'
import type { Cell } from './quality'

export type FieldMode = 'hero' | 'band' | 'off' | 'calibrate'

type FieldState = {
  /** WebGL, CSS masks and motion are all available on this device. */
  enabled: boolean
  /** The renderer exists and is drawing. */
  mounted: boolean
  /** Every component currently asking for the field, by id. */
  claims: Record<string, Claim>
  /** True while anything wants the field; FieldMount loads the canvas on it. */
  requested: boolean
  /** The id holding the field, and the settings it asked for. Derived, never set directly. */
  owner: string | null
  mode: FieldMode
  intensity: number
  band: [number, number]
  /** Id of the SVG mask the owner cuts the canvas to, if it asked for one. */
  mask: string | null
  /** Pointer in viewport CSS pixels. */
  pointer: { x: number; y: number; active: boolean }
  cell: Cell
  setEnabled: (v: boolean) => void
  setMounted: (v: boolean) => void
  /** File or update a claim. Cheap to call every frame: an identical claim changes nothing. */
  claim: (id: string, claim: Claim) => void
  release: (id: string) => void
  setPointer: (x: number, y: number, active: boolean) => void
  setCell: (c: Cell) => void
}

export const useField = create<FieldState>((set, get) => ({
  enabled: false,
  mounted: false,
  claims: {},
  requested: false,
  owner: null,
  mode: 'off',
  intensity: 0,
  band: DEFAULT_BAND,
  mask: null,
  pointer: { x: -1, y: -1, active: false },
  cell: 2,
  setEnabled: (enabled) => set({ enabled }),
  setMounted: (mounted) => set({ mounted }),
  claim: (id, claim) => {
    const state = get()
    if (sameClaim(state.claims[id], claim)) return
    const claims = { ...state.claims, [id]: claim }
    set({ claims, requested: true, ...resolveClaims(claims, state.owner) })
  },
  release: (id) => {
    const state = get()
    if (!(id in state.claims)) return
    const claims = { ...state.claims }
    delete claims[id]
    const owner = state.owner === id ? null : state.owner
    set({
      claims,
      requested: Object.keys(claims).length > 0,
      ...resolveClaims(claims, owner),
    })
  },
  setPointer: (x, y, active) => set({ pointer: { x, y, active } }),
  setCell: (cell) => set({ cell }),
}))
