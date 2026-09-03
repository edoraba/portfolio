import { Bricolage_Grotesque, Geist_Mono } from 'next/font/google'

// Both families are downloaded at build time and self-hosted by next/font.
// Bricolage carries the optical size and width axes the design system animates.
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  variable: '--font-bricolage',
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

export const fontClassNames = `${bricolage.variable} ${geistMono.variable}`
