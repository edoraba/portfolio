'use client'
import { useEffect, useState } from 'react'
import Tempus from 'tempus'
import { useConsole } from '@/lib/console-store'
import { Decode } from '../decode'

/**
 * The console readout: `P/03 WORK · 0342/2380` (plate, scroll position and document height in
 * 8px lines) or `> LABEL` while a link is hovered. Updated ten times a second on the shared
 * clock. Texture for sighted visitors, hidden from assistive tech.
 */
export function ConsoleLine() {
  const plate = useConsole((s) => s.plate)
  const hover = useConsole((s) => s.hover)
  const [pos, setPos] = useState({ y: 0, h: 1 })

  useEffect(() => {
    let lastY = -1
    const tick = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (y !== lastY) {
        lastY = y
        setPos({ y, h: Math.max(1, h) })
      }
    }
    tick()
    const unsub = Tempus.add(tick, { fps: 10, label: 'console' })
    return () => {
      unsub?.()
    }
  }, [])

  const lines = (px: number) => String(Math.round(px / 8)).padStart(4, '0')

  return (
    <span className="console-line label" aria-hidden="true">
      {hover ? (
        <>
          <span className="text-accent">{'>'} </span>
          <Decode key={hover}>{hover}</Decode>
        </>
      ) : (
        <>
          <span className="text-ink">{plate || 'EB'}</span>
          <span className="text-ink-muted">
            {' '}
            <span aria-hidden="true">·</span> {lines(pos.y)}/{lines(pos.h)}
          </span>
        </>
      )}
    </span>
  )
}
