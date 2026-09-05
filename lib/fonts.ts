import localFont from 'next/font/local'
import { Geist_Mono } from 'next/font/google'

// The two sans families are self-hosted from assets/fonts (see the README there for how each
// one gets on disk and why they are handled differently). Both are variable: Martian carries
// the width axis the headline animates, Switzer the weight range the text needs.
export const martian = localFont({
  src: './../assets/fonts/MartianGrotesk[wdth,wght].woff2',
  weight: '100 1000',
  style: 'normal',
  display: 'swap',
  variable: '--font-martian',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

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

export const fontClassNames = `${martian.variable} ${switzer.variable} ${geistMono.variable}`
