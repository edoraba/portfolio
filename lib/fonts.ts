import localFont from 'next/font/local'
import { Funnel_Display, Geist_Mono } from 'next/font/google'

// Funnel Display carries the big type. It is variable on one axis, weight 300 to 800, which is
// the axis the headline animates; it has no italic, so emphasis is weight.
export const funnel = Funnel_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-funnel',
})

// Switzer reads the text. It is self-hosted from assets/fonts; see the README there for why its
// files are fetched at build time instead of living in the repo.
export const switzer = localFont({
  src: [
    { path: './../assets/fonts/Switzer-Variable.woff2', weight: '100 900', style: 'normal' },
    { path: './../assets/fonts/Switzer-VariableItalic.woff2', weight: '100 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-switzer',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

export const fontClassNames = `${funnel.variable} ${switzer.variable} ${geistMono.variable}`
