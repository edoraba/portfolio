// The six worlds. Plain data so the build script, the app and the tests read one source.
// Every ink, ink-muted and accent passes WCAG AA (4.5) on canvas, surface and surface-2;
// tests/unit/themes.test.ts recomputes the ratios. hairline is the ink at an alpha that
// stays visible on that canvas. accentInk is the text colour on an accent fill.

/** @typedef {'signal'|'field'|'paper'|'phosphor'|'cobalt'|'ash'} ThemeName */

/**
 * @typedef {object} Theme
 * @property {ThemeName} name
 * @property {string} label
 * @property {string} description
 * @property {'light'|'dark'} scheme
 * @property {{canvas:string,surface:string,'surface-2':string,ink:string,'ink-muted':string,hairline:string,accent:string,'accent-ink':string,'field-on':string,'field-off':string}} tokens
 */

/** @type {Theme[]} */
export const THEMES = [
  {
    name: 'signal',
    label: 'Signal',
    description: 'Vermilion sheet, black ink, the dither drawn in ink.',
    scheme: 'light',
    tokens: {
      canvas: '#F5401F',
      surface: '#F7573A',
      'surface-2': '#F96E55',
      ink: '#140E0C',
      'ink-muted': '#2A0A04',
      hairline: 'rgba(20, 14, 12, 0.22)',
      accent: '#140E0C',
      'accent-ink': '#F5401F',
      'field-on': '#140E0C',
      'field-off': '#F5401F',
    },
  },
  {
    name: 'field',
    label: 'Field',
    description: 'Near-black, off-white ink, cobalt accent, the dither in light.',
    scheme: 'dark',
    tokens: {
      canvas: '#0B0C0E',
      surface: '#15171B',
      'surface-2': '#1C1F24',
      ink: '#F2F2EF',
      'ink-muted': '#8B8E93',
      hairline: 'rgba(242, 242, 239, 0.1)',
      accent: '#7D93FF',
      'accent-ink': '#0B0C0E',
      'field-on': '#F2F2EF',
      'field-off': '#0B0C0E',
    },
  },
  {
    name: 'paper',
    label: 'Paper',
    description: 'Warm paper, dark ink, cobalt accent, the dither in ink.',
    scheme: 'light',
    tokens: {
      canvas: '#F1EDE4',
      surface: '#E6E0D3',
      'surface-2': '#DDD6C6',
      ink: '#141310',
      'ink-muted': '#625C50',
      hairline: 'rgba(20, 19, 16, 0.12)',
      accent: '#1F3BFF',
      'accent-ink': '#F1EDE4',
      'field-on': '#141310',
      'field-off': '#F1EDE4',
    },
  },
  {
    name: 'phosphor',
    label: 'Phosphor',
    description: 'Black glass, lime ink, off-white accent, a terminal after dark.',
    scheme: 'dark',
    tokens: {
      canvas: '#0C0F0A',
      surface: '#151A10',
      'surface-2': '#1C2315',
      ink: '#E9FF6A',
      'ink-muted': '#9DAF52',
      hairline: 'rgba(233, 255, 106, 0.1)',
      accent: '#F2F2EF',
      'accent-ink': '#0C0F0A',
      'field-on': '#E9FF6A',
      'field-off': '#0C0F0A',
    },
  },
  {
    name: 'cobalt',
    label: 'Cobalt',
    description: 'Full cobalt, off-white ink, lime accent.',
    scheme: 'light',
    tokens: {
      canvas: '#1F3BFF',
      surface: '#1B34E6',
      'surface-2': '#172ECF',
      ink: '#F1EDE4',
      'ink-muted': '#D8DCFA',
      hairline: 'rgba(241, 237, 228, 0.22)',
      accent: '#E9FF6A',
      'accent-ink': '#1F3BFF',
      'field-on': '#F1EDE4',
      'field-off': '#1F3BFF',
    },
  },
  {
    name: 'ash',
    label: 'Ash',
    description: 'Warm grey, dark ink, the dither in coral.',
    scheme: 'light',
    tokens: {
      canvas: '#9C9E97',
      surface: '#A6A8A1',
      'surface-2': '#B0B2AB',
      ink: '#1A1B18',
      'ink-muted': '#262823',
      hairline: 'rgba(26, 27, 24, 0.22)',
      accent: '#1A1B18',
      'accent-ink': '#9C9E97',
      'field-on': '#F16D50',
      'field-off': '#9C9E97',
    },
  },
]

export const DEFAULT_THEME = 'signal'
export const THEME_NAMES = THEMES.map((t) => t.name)
