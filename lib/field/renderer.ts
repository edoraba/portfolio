import { createGLField, type GLField } from './gl'
import type { Cell } from './quality'
import { fragment, UNIFORMS, vertex } from './shader'
import type { FieldMode } from './store'

export type FrameInput = {
  /** seconds */
  time: number
  mode: FieldMode
  intensity: number
  /** smoothed pointer in viewport CSS px plus presence 0..1 */
  pointer: { x: number; y: number; s: number }
  /** minimum density, 0.55 under the hero text */
  floor: number
  band?: [number, number]
}

const MODE = { hero: 0, band: 1, off: 2 } as const

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '')
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/**
 * Owns the WebGL context and the single full-screen triangle. Framework agnostic:
 * the React layer feeds it a FrameInput every frame and resizes it when the cell tier changes.
 */
export class FieldRenderer {
  private field: GLField
  private cell: Cell = 2
  private width = 1
  private height = 1
  readonly ready: Promise<void>

  constructor(private canvas: HTMLCanvasElement) {
    const field = createGLField(canvas, vertex, fragment, UNIFORMS)
    if (!field) throw new Error('WebGL2 unavailable')
    this.field = field
    this.ready = field.ready
    this.readColors()
    this.field.setUniform('uFloor', 0.55)
    this.field.setUniform('uBand', [0.4, 0.6])
    this.field.setUniform('uMode', MODE.off)
  }

  get lost() {
    return this.field.lost()
  }

  /** Pull the current theme colours from the CSS custom properties. */
  readColors() {
    const cs = getComputedStyle(document.documentElement)
    const read = (name: string, fallback: string) => hexToRgb(cs.getPropertyValue(name) || fallback)
    this.field.setUniform('uOn', read('--field-on', '#f2f2ef'))
    this.field.setUniform('uOff', read('--field-off', '#0b0c0e'))
    this.field.setUniform('uAccent', read('--accent', '#7d93ff'))
  }

  /** Canvas pixels are cells: the dither stays crisp because CSS scales the canvas with pixelated rendering. */
  resize(cell: Cell) {
    this.cell = cell
    this.width = Math.max(1, Math.ceil(window.innerWidth / cell))
    this.height = Math.max(1, Math.ceil(window.innerHeight / cell))
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.field.setUniform('uCells', [this.width, this.height])
    this.field.setUniform('uAspect', this.width / this.height)
  }

  clear() {
    this.field.clear()
  }

  frame(input: FrameInput) {
    if (!this.field.isReady()) return
    this.field.setUniform('uTime', input.time)
    this.field.setUniform('uMode', MODE[input.mode])
    this.field.setUniform('uIntensity', input.intensity)
    this.field.setUniform('uFloor', input.floor)
    this.field.setUniform('uPointer', [
      input.pointer.x / this.cell,
      (window.innerHeight - input.pointer.y) / this.cell,
    ])
    this.field.setUniform('uPointerStrength', input.pointer.s)
    if (input.band) this.field.setUniform('uBand', input.band)
    this.field.draw()
  }

  // The canvas leaves the DOM with the component and the browser reclaims the context.
  destroy() {}
}
