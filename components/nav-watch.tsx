'use client'
import { useEffect } from 'react'
import { markNavigation } from '@/lib/nav'

/**
 * Mounted once in the layout. Marks the moment a navigation starts, from the click itself rather
 * than from a render, so that by the time the arriving page's effects run they already know they
 * were navigated to. Everything that reveals itself on arrival reads that mark and stays still:
 * the page transition is the entrance, and a second one on top of it is the thing that makes a
 * navigation look like it happened twice.
 */
export function NavWatch() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      const href = link.getAttribute('href') ?? ''
      if (!href.startsWith('/')) return
      markNavigation()
    }
    document.addEventListener('click', onClick, true)
    window.addEventListener('popstate', markNavigation)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', markNavigation)
    }
  }, [])
  return null
}
