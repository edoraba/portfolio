'use client'
import { create } from 'zustand'
import { DEFAULT_THEME, isThemeName, nextTheme, type ThemeName } from './themes'

type ThemeState = {
  theme: ThemeName
  set: (t: ThemeName) => void
  cycle: (step?: number) => void
}

function readInitial(): ThemeName {
  if (typeof document === 'undefined') return DEFAULT_THEME
  const v = document.documentElement.getAttribute('data-theme')
  return isThemeName(v) ? v : DEFAULT_THEME
}

function apply(t: ThemeName) {
  document.documentElement.setAttribute('data-theme', t)
  try {
    localStorage.setItem('theme', t)
  } catch {
    // Storage can be unavailable (private mode, blocked). The attribute still applies.
  }
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: readInitial(),
  set: (t) => {
    apply(t)
    set({ theme: t })
  },
  cycle: (step = 1) => get().set(nextTheme(get().theme, step)),
}))
