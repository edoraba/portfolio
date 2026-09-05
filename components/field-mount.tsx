'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useField } from '@/lib/field/store'
import { canRenderField } from '@/lib/field/support'

const FieldCanvas = dynamic(() => import('./field-canvas'), { ssr: false })

/**
 * Loads the field only when the device can run it and a page on screen asks for it,
 * and only after the page has painted and the browser is idle, so the first frame and
 * pages without the field never pay for WebGL. Once loaded it stays mounted across
 * navigations and simply idles when no page requests it.
 */
export function FieldMount() {
  const [load, setLoad] = useState(false)
  const requested = useField((s) => s.requested)

  useEffect(() => {
    if (load || !requested) return
    if (!canRenderField()) return
    useField.getState().setEnabled(true)
    let cancelled = false
    const start = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
      idle(() => {
        if (!cancelled) setLoad(true)
      })
    }
    // The calibration loader wants the field on screen at once; every other requester waits
    // for the page to load and the browser to idle.
    if ('loader' in useField.getState().claims) queueMicrotask(() => !cancelled && setLoad(true))
    else if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', start)
    }
  }, [load, requested])

  return load ? <FieldCanvas /> : null
}
