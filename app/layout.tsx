import type { Metadata } from 'next'
import Script from 'next/script'
import { CommandMenuServer } from '@/components/command-menu-server'
import { FieldMount } from '@/components/field-mount'
import { Footer } from '@/components/footer'
import { GridOverlay } from '@/components/grid-overlay'
import { SiteNav } from '@/components/site-nav'
import { SkipLink } from '@/components/skip-link'
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
        <FieldMount />
        {/* .page is the filter target for the playful palette commands; the field stays outside. */}
        <div className="page flex min-h-dvh flex-col">
          <SkipLink />
          <SiteNav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CommandMenuServer />
        <GridOverlay />
      </body>
    </html>
  )
}
