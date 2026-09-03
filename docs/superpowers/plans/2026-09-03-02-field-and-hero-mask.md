# Plan 02: Field and Hero Mask Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The site's signature: a persistent ordered-dither flow field rendered in WebGL behind the page, visible on the home page only through the letterforms of "Design, then build.", lit by the pointer, fading out on scroll, with a finished static fallback whenever WebGL, masks or motion are unavailable.

**Architecture:** One `<canvas>` mounted once in the root layout, `position: fixed`, behind all content (`z-index: -1`). A small Zustand store (`lib/field/store.ts`) carries mode, intensity and pointer; the renderer reads it every frame outside React. OGL renders one full-screen triangle with a fragment shader (`lib/field/shader.ts`) at `viewport / cell` resolution with `image-rendering: pixelated`, so the dither is pixel-crisp and cheap. The home hero (`components/hero-mask.tsx`) renders the headline as SVG text twice: once visible (transparent fill, so the canvas shows through) and once inside an SVG `<mask>` applied to the canvas through CSS `mask-image`, translated every frame to the visible headline's viewport position. Pure logic (pointer smoothing, quality tiers, scroll mapping) lives in tested modules.

**Tech Stack:** OGL 1.0.11 (WebGL2 with GLSL ES 3.00), Tempus 1.0 as the single rAF loop, Zustand 5, CSS `mask-image` referencing an inline SVG mask, `next/dynamic` with `ssr: false` for the canvas, Vitest for pure modules, Playwright for presence and fallback behaviour.

---

## File structure

```
lib/field/
  store.ts          zustand store: mode, intensity, pointer, quality, enabled, setters
  shader.ts         vertex and fragment GLSL sources
  renderer.ts       FieldRenderer class: init, resize(cell), frame(state), destroy
  pointer.ts        smoothPointer(prev, target, dt, attackMs, releaseMs): pure
  quality.ts        pickCell(frameTimes, currentCell): pure quality tiers 2, 3, 4
  scroll.ts         heroIntensity(scrollY, heroHeight): pure 1 to 0 mapping
  support.ts        canRenderField(): WebGL2 present, no reduced motion, mask supported
components/
  field-mount.tsx   client; decides whether to load; next/dynamic import of FieldCanvas
  field-canvas.tsx  client; owns canvas, renderer, Tempus loop, pointer and resize listeners
  hero-mask.tsx     client; sr-only h1, visible SVG headline, mask SVG, width axis interaction
tests/unit/field.test.ts
tests/e2e/field.spec.ts
app/layout.tsx      mounts <FieldMount />
app/page.tsx        uses <HeroMask />
app/globals.css     .field-canvas and .hero-text styles
```

## Field parameters (also in DESIGN.md)

| Parameter              | Value                                                                            |
| ---------------------- | -------------------------------------------------------------------------------- |
| cell size              | 2 CSS px (tiers 3 and 4 when the p75 frame interval exceeds 22ms over 60 frames) |
| dither                 | ordered Bayer 8x8                                                                |
| noise                  | value noise fbm, 4 octaves, domain warped, time scaled 0.06                      |
| pointer                | attack 25ms, release 175ms, radius 0.45 of the short viewport side               |
| accent                 | only within pointer radius, weight 0.9 at the centre                             |
| min density under text | 0.55 (uFloor) in hero mode                                                       |
| intensity vs scroll    | 1 at top, 0 at 80 percent of one viewport, linear                                |
| modes                  | hero (masked), band (reserved for Plan 03), off (loop paused)                    |

---

### Task 1: Pure modules with tests

**Files:**

- Create: `lib/field/pointer.ts`, `lib/field/quality.ts`, `lib/field/scroll.ts`, `tests/unit/field.test.ts`

- [ ] **Step 1: Failing tests**

`tests/unit/field.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { smoothPointer } from '@/lib/field/pointer'
import { pickCell } from '@/lib/field/quality'
import { heroIntensity } from '@/lib/field/scroll'

describe('smoothPointer', () => {
  it('moves fast towards a nearer target (attack) and slowly away (release)', () => {
    const a = smoothPointer({ x: 0, y: 0, s: 0 }, { x: 1, y: 1, active: true }, 16, 25, 175)
    expect(a.s).toBeGreaterThan(0.4)
    const r = smoothPointer({ x: 1, y: 1, s: 1 }, { x: 1, y: 1, active: false }, 16, 25, 175)
    expect(r.s).toBeLessThan(1)
    expect(r.s).toBeGreaterThan(0.85)
  })
  it('never overshoots', () => {
    const p = smoothPointer({ x: 0, y: 0, s: 0 }, { x: 1, y: 0, active: true }, 1000, 25, 175)
    expect(p.x).toBeLessThanOrEqual(1)
    expect(p.s).toBeLessThanOrEqual(1)
  })
})

describe('pickCell', () => {
  it('keeps cell 2 when frames are fast', () => {
    expect(pickCell(Array(60).fill(8), 2)).toBe(2)
  })
  it('steps down one tier when p75 frame time exceeds 12ms', () => {
    expect(pickCell(Array(60).fill(20), 2)).toBe(3)
    expect(pickCell(Array(60).fill(20), 3)).toBe(4)
    expect(pickCell(Array(60).fill(20), 4)).toBe(4)
  })
  it('needs a full window before deciding', () => {
    expect(pickCell(Array(10).fill(30), 2)).toBe(2)
  })
})

describe('heroIntensity', () => {
  it('is 1 at the top and 0 after 80 percent of the hero height', () => {
    expect(heroIntensity(0, 900)).toBe(1)
    expect(heroIntensity(360, 900)).toBeCloseTo(0.5)
    expect(heroIntensity(720, 900)).toBe(0)
    expect(heroIntensity(2000, 900)).toBe(0)
  })
})
```

- [ ] **Step 2: Implementations**

`lib/field/pointer.ts`:

```ts
export type Smoothed = { x: number; y: number; s: number }
export type Target = { x: number; y: number; active: boolean }

// Exponential smoothing with separate time constants: the light snaps towards
// the pointer (attack) and lingers when it leaves (release). dt in ms.
export function smoothPointer(
  prev: Smoothed,
  target: Target,
  dt: number,
  attackMs: number,
  releaseMs: number,
): Smoothed {
  const goalS = target.active ? 1 : 0
  const tau = goalS > prev.s ? attackMs : releaseMs
  const k = 1 - Math.exp(-dt / tau)
  const kPos = 1 - Math.exp(-dt / attackMs)
  return {
    x: prev.x + (target.x - prev.x) * (target.active ? kPos : 0),
    y: prev.y + (target.y - prev.y) * (target.active ? kPos : 0),
    s: prev.s + (goalS - prev.s) * k,
  }
}
```

`lib/field/quality.ts`:

```ts
export const CELLS = [2, 3, 4] as const
export type Cell = (typeof CELLS)[number]
export const WINDOW = 60
export const BUDGET_MS = 12

export function p75(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.75))]
}

// One tier down when the last WINDOW frames are too slow; never back up automatically.
export function pickCell(frameTimes: number[], current: Cell): Cell {
  if (frameTimes.length < WINDOW) return current
  if (p75(frameTimes.slice(-WINDOW)) <= BUDGET_MS) return current
  const i = CELLS.indexOf(current)
  return CELLS[Math.min(CELLS.length - 1, i + 1)]
}
```

`lib/field/scroll.ts`:

```ts
// Field intensity on the home page: full at the top, gone after 80 percent of the hero height.
export function heroIntensity(scrollY: number, heroHeight: number): number {
  const end = heroHeight * 0.8
  if (end <= 0) return 0
  return Math.min(1, Math.max(0, 1 - scrollY / end))
}
```

- [ ] **Step 3: Run** `pnpm test -- field`, expected all green. Commit: `feat(field): pure pointer, quality and scroll modules`.

---

### Task 2: Store, shader and renderer

**Files:**

- Create: `lib/field/store.ts`, `lib/field/shader.ts`, `lib/field/renderer.ts`, `lib/field/support.ts`

- [ ] **Step 1: Store**

```ts
'use client'
import { create } from 'zustand'
import type { Cell } from './quality'

export type FieldMode = 'hero' | 'band' | 'off'

type FieldState = {
  enabled: boolean // WebGL and mask available, motion allowed
  mounted: boolean // renderer created
  mode: FieldMode
  intensity: number // 0..1
  pointer: { x: number; y: number; active: boolean } // CSS px in viewport
  cell: Cell
  setEnabled: (v: boolean) => void
  setMounted: (v: boolean) => void
  setMode: (m: FieldMode) => void
  setIntensity: (i: number) => void
  setPointer: (x: number, y: number, active: boolean) => void
  setCell: (c: Cell) => void
}

export const useField = create<FieldState>((set) => ({
  enabled: false,
  mounted: false,
  mode: 'off',
  intensity: 0,
  pointer: { x: -1, y: -1, active: false },
  cell: 2,
  setEnabled: (enabled) => set({ enabled }),
  setMounted: (mounted) => set({ mounted }),
  setMode: (mode) => set({ mode }),
  setIntensity: (intensity) => set({ intensity }),
  setPointer: (x, y, active) => set({ pointer: { x, y, active } }),
  setCell: (cell) => set({ cell }),
}))
```

- [ ] **Step 2: Shader** (GLSL ES 3.00, see `lib/field/shader.ts` in the repo for the final source). Uniforms: `uCells` (grid size), `uAspect`, `uTime`, `uPointer` (cell coords), `uPointerStrength`, `uIntensity`, `uFloor`, `uOn`, `uOff`, `uAccent`, `uMode`, `uBand`. Density = domain-warped fbm, boosted near the pointer, floored at `uFloor`, scaled by `uIntensity`, thresholded by a Bayer 8x8 constant array indexed by `cell mod 8`. On pixels mix `uOn` towards `uAccent` by pointer proximity; off pixels are `uOff`. Alpha 1 in hero mode, band-limited in band mode, 0 in off mode.

- [ ] **Step 3: Renderer class** wrapping OGL: `new Renderer({ canvas, dpr: 1, alpha: true, premultipliedAlpha: false, antialias: false, webgl: 2 })`, `Triangle`, `Program` with `transparent: true`, `Mesh`. `resize(cell)` sets the canvas size to `ceil(innerWidth / cell)` by `ceil(innerHeight / cell)` and updates `uCells` and `uAspect`. `frame(state, time)` writes uniforms from the store snapshot and renders. Colours are read from the computed CSS variables `--field-on`, `--field-off`, `--accent` on theme change (a `MutationObserver` on `data-theme`). Context loss: listen to `webglcontextlost`, prevent default, try one restore, then disable.

- [ ] **Step 4: Support check** `lib/field/support.ts`: WebGL2 context creation on a probe canvas, `matchMedia('(prefers-reduced-motion: reduce)')`, `CSS.supports('mask-image', 'url(#x)')`, and `navigator.hardwareConcurrency` is not used (unreliable). Commit: `feat(field): store, shader and OGL renderer`.

---

### Task 3: FieldMount and FieldCanvas

- [ ] `components/field-mount.tsx` (client): on mount, run `canRenderField()`; if true, set `enabled`, and after `window` load plus `requestIdleCallback` (fallback `setTimeout` 200ms) dynamically import `FieldCanvas` with `next/dynamic({ ssr: false })`. Renders nothing otherwise.
- [ ] `components/field-canvas.tsx` (client): renders `<canvas className="field-canvas" aria-hidden="true" />`; effects: create renderer, size to cell, `Tempus.add(frame, { label: 'field' })`; pointer listeners on `window` (`pointermove`, `pointerleave`, `blur`) writing into a local target, smoothed per frame with `smoothPointer`; `resize` listener; `visibilitychange` pauses; quality manager collects frame durations and calls `setCell` then `resize`. When `intensity === 0` or `mode === 'off'`, skip rendering (clear once) so the loop costs nothing. Applies `style.maskImage = mode === 'hero' ? 'url(#hero-mask)' : 'none'`.
- [ ] `app/globals.css`: `.field-canvas { position: fixed; inset: 0; width: 100vw; height: 100dvh; z-index: -1; pointer-events: none; image-rendering: pixelated; }`.
- [ ] `app/layout.tsx`: `<FieldMount />` as the first child of `<body>`.
- [ ] Commit: `feat(field): persistent canvas with quality manager and pointer light`.

---

### Task 4: HeroMask

- [ ] `components/hero-mask.tsx` (client): props `words: [string, string, string]` (Design, / then / build.). Renders:
  1. `<h1 className="sr-only">Design, then build.</h1>`
  2. Visible `<svg aria-hidden className="hero-svg">` with two `<text>` lines using `dominant-baseline="text-before-edge"`, `y="0"` and `y="0.86em"`; tspans with `style={{ fontVariationSettings: "'opsz' 96, 'wdth' N" }}`; fill `none` when the field is active, `url(#hero-dither)` otherwise. A `<pattern id="hero-dither">` of 2px cells in `var(--field-on)` inside `<defs>`.
  3. A zero-size `<svg>` holding `<mask id="hero-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="8000" height="8000">` with a `<g>` that mirrors the two `<text>` lines in white, translated to the visible svg's `getBoundingClientRect()` left and top; the translate is refreshed from a Tempus callback only when it changes.
  4. Pointer proximity per word: `wdth = 78 + 22 * max(0, 1 - |dx| / (viewportWidth * 0.35))`, transitioned by CSS `transition: font-variation-settings 500ms var(--ease-out-expo)`. Under reduced motion the width stays 100.
  5. Scroll: on each frame `setIntensity(heroIntensity(scrollY, heroHeight))`, `setMode(intensity > 0 ? 'hero' : 'off')`; on unmount `setMode('off')`.
- [ ] `app/globals.css`: `.hero-text { font-family: var(--font-sans); font-size: var(--text-display-xl); font-weight: 500; letter-spacing: -0.045em; font-variation-settings: 'opsz' 96, 'wdth' 100; }`, `.hero-svg { display:block; width:100%; height: calc(var(--text-display-xl) * 1.85); overflow: visible; }`, italic tspan `font-style: italic`.
- [ ] `app/page.tsx`: replace the `<h1>` block with `<HeroMask />`.
- [ ] Browser review: dark and light at 1440 and 390, pointer over the words widens them and lights the field in accent, scroll fades the field, reduced motion (emulate in devtools) shows the dithered static fill, hard reload shows no flash. Commit: `feat(hero): headline as a window onto the field`.

---

### Task 5: Tests, docs, review

- [ ] `tests/e2e/field.spec.ts`: home has exactly one `h1` with text "Design, then build."; with default motion a `canvas.field-canvas` appears within 3s; with `page.emulateMedia({ reducedMotion: 'reduce' })` no canvas is mounted and the hero text still renders; axe still zero violations on home in both themes.
- [ ] Update `content/lab/field.mdx` description (still a placeholder piece until Plan 05) and the colophon changelog line: `2026-09: the field`.
- [ ] Update `DESIGN.md` field section if any parameter changed during implementation.
- [ ] Run `pnpm lint && pnpm typecheck && pnpm test && ALLOW_TODO=1 pnpm build && pnpm test:e2e && pnpm exec lhci autorun`. Performance on home must stay at 100 with the field loaded after LCP.
- [ ] Commit, push, CI green.

## Self-review against the spec

Spec 5.1: renderer, shader, dither, cell size, quality tiers, persistent canvas, pause rules, lazy load after LCP: Tasks 2 and 3. Spec 5.2: SVG mask, width axis on pointer, scroll opening and band are partially delivered (fade out now, band and spill in Plan 03 with GSAP), fallback chain and sr-only h1: Task 4. Spec 11: context loss and no-WebGL fallback: Tasks 2 and 4. Spec 12: browser review steps in Task 4.
