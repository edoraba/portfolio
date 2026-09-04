export type ThemeName = 'signal' | 'field' | 'paper' | 'phosphor' | 'cobalt' | 'ash'
export type Theme = {
  name: ThemeName
  label: string
  description: string
  scheme: 'light' | 'dark'
  tokens: {
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
}
export const THEMES: Theme[]
export const DEFAULT_THEME: ThemeName
export const THEME_NAMES: ThemeName[]
