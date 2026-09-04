import type { Metadata } from 'next'
import { CommandMenuServer } from '@/components/command-menu-server'
import { Hotkeys } from '@/components/console/hotkeys'
import { SiteHeader } from '@/components/console/site-header'
import { FieldMount } from '@/components/field-mount'
import { Footer } from '@/components/footer'
import { GridOverlay } from '@/components/grid-overlay'
import { RulesObserver } from '@/components/sheet/rules-observer'
import { SkipLink } from '@/components/skip-link'
import { fontClassNames } from '@/lib/fonts'
import { site } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s, ${site.name}` },
  description: `${site.role}. Whole products, from the interface to the database, shipped from ${site.location}.`,
  openGraph: { type: 'website', siteName: site.name },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <head>
        {/* Sync so the theme is set before the first paint. next/script runs after paint in prod. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme.js" />
      </head>
      <body className="flex min-h-dvh flex-col">
        <FieldMount />
        <div className="page flex min-h-dvh flex-col">
          <SkipLink />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CommandMenuServer />
        <GridOverlay />
        <Hotkeys />
        <RulesObserver />
      </body>
    </html>
  )
}
