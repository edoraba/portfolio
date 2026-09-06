import { ViewTransition, type ReactNode } from 'react'

/**
 * Route-level transition wrapper. A typed navigation is a clip mask: the page being left keeps
 * moving the way the reader was going and dims to a quarter rather than vanishing, while the one
 * arriving is cut in over it from the edge it came from. `nav-forward` comes up from the bottom,
 * `nav-back` down from the top; untyped navigations (browser back, refresh) crossfade, because
 * there is no direction to honour. Lives in every page.tsx, never in the layout, because layouts
 * persist and would be masked with the page.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'vt-wipe-up', 'nav-back': 'vt-wipe-down', default: 'vt-fade' }}
      exit={{
        'nav-forward': 'vt-page-out',
        'nav-back': 'vt-page-out-back',
        default: 'vt-fade-out',
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
