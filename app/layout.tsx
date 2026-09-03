import type { Metadata } from 'next'
import Script from 'next/script'
import { fontClassNames } from '@/lib/fonts'
import { themeScript } from '@/lib/theme-script'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Edoardo Baravaglio', template: '%s, Edoardo Baravaglio' },
  description:
    'Frontend developer with a design degree, building whole products end to end from Turin, Italy.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  )
}
