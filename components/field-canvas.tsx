'use client'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { smoothPointer, type Smoothed, type Target } from '@/lib/field/pointer'
import { IGNORE_ABOVE_MS, WINDOW, pickCell, type Cell } from '@/lib/field/quality'
import { FieldRenderer } from '@/lib/field/renderer'
import { useField } from '@/lib/field/store'

const ATTACK_MS = 25
const RELEASE_MS = 175
const FLOOR_HERO = 0.55
const FLOOR_BAND = 0.04
const FLOOR_CALIBRATE = 0.35

/**
 * The one persistent WebGL surface. Mounted lazily by FieldMount, it draws only while
 * the store says the field is visible, follows the pointer with attack and release
 * smoothing, steps down its cell size when frames drop, and masks itself to the hero
 * headline while the home page is in hero mode.
 */
export default function FieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const store = useField
    let renderer: FieldRenderer
    try {
      renderer = new FieldRenderer(canvas)
    } catch {
      store.getState().setEnabled(false)
      return
    }

    let cell: Cell = store.getState().cell
    renderer.resize(cell)
    renderer.ready
      .then(() => store.getState().setMounted(true))
      .catch(() => store.getState().setEnabled(false))

    // The pattern travels with the page in whole cells, and the flow holds still while the page
    // moves: a texture that both drifts and slides under a moving window reads as flicker.
    let clock = 0
    let lastScroll = window.scrollY
    const target: Target = { x: -1, y: -1, active: false }
    let smooth: Smoothed = { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4, s: 0 }
    const intervals: number[] = []
    let cleared = false

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      target.active = true
    }
    const onLeave = () => {
      target.active = false
    }
    const onResize = () => renderer.resize(cell)
    const applyMask = (mask: string | null) => {
      const value = mask ? `url(#${mask})` : 'none'
      canvas.style.maskImage = value
      canvas.style.setProperty('-webkit-mask-image', value)
    }
    // Published so a test can check the band never covers text, and so the state is visible
    // in the inspector without reaching into the store.
    const publish = (mode: string, band: [number, number]) => {
      canvas.dataset.mode = mode
      canvas.dataset.band = mode === 'band' ? `${band[0].toFixed(3)},${band[1].toFixed(3)}` : ''
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', onResize)

    const themeObserver = new MutationObserver(() => renderer.readColors())
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    applyMask(store.getState().mask)
    publish(store.getState().mode, store.getState().band)
    const unsubStore = store.subscribe((s, prev) => {
      if (s.mask !== prev.mask) applyMask(s.mask)
      if (s.mode !== prev.mode || s.band !== prev.band) publish(s.mode, s.band)
      if (s.cell !== cell) {
        // Changed from outside (the palette's dither commands).
        cell = s.cell
        renderer.resize(cell)
        intervals.length = 0
      }
    })

    const unsubTick = Tempus.add(
      ({ deltaTime }) => {
        if (document.hidden) return
        const s = store.getState()
        if (s.mode === 'off' || s.intensity <= 0) {
          if (!cleared) {
            renderer.clear()
            cleared = true
          }
          return
        }
        cleared = false
        const scroll = window.scrollY
        const moving = Math.abs(scroll - lastScroll) > 0.5
        lastScroll = scroll
        if (!moving) clock += deltaTime
        // Negative because the shader's y axis points up: scrolling down has to move the
        // pattern up with the page. Quantised to whole cells so it never resamples between
        // canvas pixels.
        const offset = -(Math.round(scroll / cell) * cell) / window.innerHeight
        smooth = smoothPointer(smooth, target, deltaTime, ATTACK_MS, RELEASE_MS)
        renderer.frame({
          time: clock / 1000,
          offset,
          mode: s.mode,
          intensity: s.intensity,
          pointer: smooth,
          floor:
            s.mode === 'hero' ? FLOOR_HERO : s.mode === 'calibrate' ? FLOOR_CALIBRATE : FLOOR_BAND,
          band: s.band,
        })
        if (deltaTime < IGNORE_ABOVE_MS) {
          intervals.push(deltaTime)
          if (intervals.length > WINDOW) intervals.shift()
          const next = pickCell(intervals, cell)
          if (next !== cell) {
            cell = next
            s.setCell(next)
            renderer.resize(cell)
            intervals.length = 0
          }
        }
      },
      { label: 'field' },
    )

    return () => {
      unsubTick?.()
      unsubStore()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', onResize)
      renderer.destroy()
      store.getState().setMounted(false)
    }
  }, [])

  return <canvas ref={ref} className="field-canvas" aria-hidden="true" />
}
