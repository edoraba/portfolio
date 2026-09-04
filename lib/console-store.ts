'use client'
import { create } from 'zustand'

type ConsoleState = {
  /** Current home plate, e.g. "P/03 WORK", or the page title on other routes. */
  plate: string
  /** Label of the link or control under the pointer, echoed in the console cell. */
  hover: string | null
  /** Scroll position and document height in CSS px. */
  progress: { y: number; h: number }
  setPlate: (plate: string) => void
  setHover: (hover: string | null) => void
  setProgress: (y: number, h: number) => void
}

export const useConsole = create<ConsoleState>((set) => ({
  plate: '',
  hover: null,
  progress: { y: 0, h: 1 },
  setPlate: (plate) => set({ plate }),
  setHover: (hover) => set({ hover }),
  setProgress: (y, h) => set({ progress: { y, h } }),
}))
