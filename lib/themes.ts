import { DEFAULT_THEME as DEFAULT, THEMES as DATA } from './themes.data.mjs'

export type ThemeName = 'signal' | 'field' | 'paper' | 'phosphor' | 'cobalt' | 'ash'

export type ThemeTokens = {
  canvas: string
  surface: string
  'surface-2': string
  ink: string
  'ink-muted': string
  hairline: string
  accent: string
  'accent-ink': string
  'field-on': string
  'field-off': string
}

export type Theme = {
  name: ThemeName
  label: string
  description: string
  scheme: 'light' | 'dark'
  tokens: ThemeTokens
}

export const THEMES = DATA as Theme[]
export const THEME_NAMES = THEMES.map((t) => t.name) as ThemeName[]
export const DEFAULT_THEME = DEFAULT as ThemeName

export function isThemeName(v: unknown): v is ThemeName {
  return typeof v === 'string' && (THEME_NAMES as string[]).includes(v)
}

export function themeByName(name: ThemeName): Theme {
  return THEMES.find((t) => t.name === name) ?? THEMES[0]
}

/** The theme after `current` in registry order, wrapping around. */
export function nextTheme(current: ThemeName, step = 1): ThemeName {
  const i = THEME_NAMES.indexOf(current)
  const n = THEME_NAMES.length
  return THEME_NAMES[((((i < 0 ? 0 : i) + step) % n) + n) % n]
}
