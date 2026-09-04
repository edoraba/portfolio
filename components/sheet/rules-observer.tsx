'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { drawAllRules, drawRules } from '@/lib/motion/rules'
import { useMotion } from '@/lib/motion/store'

/**
 * Mounted once in the layout. After every navigation, and whenever new cells appear in the
 * document, it registers the undrawn cells and rules with the drawing batch. Under reduced
 * motion everything is marked drawn immediately.
 */
export function RulesObserver() {
  const pathname = usePathname()
  const reduced = useMotion((s) => s.reduced)

  useEffect(() => {
    if (reduced) {
      drawAllRules()
      const mo = new MutationObserver(() => drawAllRules())
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }
    let kill = drawRules()
    let timer = 0
    const mo = new MutationObserver(() => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        kill = ((prev) => {
          const next = drawRules()
          return () => {
            prev()
            next()
          }
        })(kill)
      }, 200)
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      window.clearTimeout(timer)
      mo.disconnect()
      kill()
    }
  }, [pathname, reduced])

  return null
}
