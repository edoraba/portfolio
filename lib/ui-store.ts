'use client'
import { create } from 'zustand'

export type Fx = 'none' | 'bw' | 'negative'

type UiState = {
  paletteOpen: boolean
  menuOpen: boolean
  grid: boolean
  fx: Fx
  setPaletteOpen: (open: boolean) => void
  setMenuOpen: (open: boolean) => void
  toggleGrid: () => void
  setFx: (fx: Fx) => void
}

function readGrid(): boolean {
  try {
    return localStorage.getItem('grid') === 'true'
  } catch {
    return false
  }
}

function applyFx(fx: Fx) {
  if (typeof document === 'undefined') return
  if (fx === 'none') delete document.documentElement.dataset.fx
  else document.documentElement.dataset.fx = fx
}

export const useUi = create<UiState>((set, get) => ({
  paletteOpen: false,
  menuOpen: false,
  grid: typeof window === 'undefined' ? false : readGrid(),
  fx: 'none',
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  toggleGrid: () => {
    const grid = !get().grid
    try {
      localStorage.setItem('grid', String(grid))
    } catch {
      // session only
    }
    set({ grid })
  },
  setFx: (fx) => {
    applyFx(fx)
    set({ fx })
  },
}))
