'use client'
import Tempus from 'tempus'

export const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=<>/'

/**
 * One deliberately steppy clock (40ms, 25Hz) shared by every decoding label,
 * so all mono text on a page ticks as one instrument.
 */
const subs = new Set<() => void>()
let last = 0
let started = false

function start() {
  if (started || typeof window === 'undefined') return
  started = true
  Tempus.add(
    ({ time }) => {
      if (subs.size === 0) return
      if (time - last < 40) return
      last = time
      for (const fn of Array.from(subs)) fn()
    },
    { label: 'decode' },
  )
}

/** Pure: the frame of a decode at step i of n for a final string. */
export function decodeFrame(final: string, step: number, steps: number, random = Math.random) {
  const done = Math.floor((step / steps) * final.length)
  let out = final.slice(0, done)
  for (const c of final.slice(done)) {
    out += c === ' ' ? ' ' : CHARS[Math.floor(random() * CHARS.length)]
  }
  return out
}

export function decode(el: HTMLElement, final: string, steps = 12): () => void {
  start()
  el.style.minWidth = `${el.getBoundingClientRect().width}px`
  let i = 0
  const tick = () => {
    el.textContent = decodeFrame(final, i, steps)
    if (++i > steps) {
      el.textContent = final
      el.style.minWidth = ''
      subs.delete(tick)
    }
  }
  subs.add(tick)
  return () => {
    subs.delete(tick)
    el.textContent = final
    el.style.minWidth = ''
  }
}
