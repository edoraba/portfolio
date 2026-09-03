import { ViewTransition, type ReactNode } from 'react'

/**
 * Route-level transition wrapper. Links tagged `nav-forward` wipe the new page in from the
 * bottom on the hop ease, `nav-back` from the top; untyped navigations (browser back, refresh)
 * crossfade. Lives in every page.tsx, never in the layout, because layouts persist.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'vt-wipe-up', 'nav-back': 'vt-wipe-down', default: 'vt-fade' }}
      exit={{ default: 'vt-fade-out' }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
