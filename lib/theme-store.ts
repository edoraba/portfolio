'use client'
import { create } from 'zustand'

export type Theme = 'dark' | 'light'

type ThemeState = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
}

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function apply(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  try {
    localStorage.setItem('theme', t)
  } catch {
    // Storage can be unavailable (private mode, blocked). The attribute still applies.
  }
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: readInitial(),
  setTheme: (t) => {
    apply(t)
    set({ theme: t })
  },
  toggle: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),
}))
