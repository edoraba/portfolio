# Motion

How movement works on this site, and the rules that keep it from breaking. Written after Plan 05,
where three of the defects Edoardo found came from breaking one of them.

## One clock

Everything animated runs on a single `requestAnimationFrame`, owned by Tempus. GSAP's own ticker
is removed and `gsap.updateRoot` is driven from Tempus instead (`lib/motion/gsap.ts`), so tweens,
smooth scroll, the WebGL field, the cloth and the physics all advance in a fixed order inside one
frame. Nothing schedules its own rAF.

Order, lowest first:

| order | who     | what it does                                                    |
| ----- | ------- | --------------------------------------------------------------- |
| -10   | `gsap`  | advances every tween and timeline                               |
| -5    | `lenis` | applies the smoothed scroll, then calls `ScrollTrigger.update`  |
| 0     | plates  | read layout and write their own custom properties (hero, cloth) |
| 0     | `field` | draws the WebGL frame with the state the plates just wrote      |

A plate that reads `getBoundingClientRect()` therefore sees the position the browser is about to
paint, not the previous frame. Anything that reads layout must run after Lenis, so leave it at the
default order.

## Smooth scroll

Lenis runs in root mode on the home and `/work` only (`components/smooth-scroll.tsx`): the window
is the scroller, native scrolling still works, anchors and keyboard still work. Because the window
is the scroller there is no `scrollerProxy` and no `ScrollTrigger.normalizeScroll` (it fights
Lenis). `lenis.on('scroll', ScrollTrigger.update)` is the only wiring.

`ScrollTrigger.refresh()` runs once after `document.fonts.ready`, because pinned distances are
measured in pixels and the real fonts change every measurement.

## ScrollTrigger rules

- **Scope and cleanup.** Every trigger is created inside `useGSAP` with a `scope`, and killed in
  the returned cleanup. Breakpoint variants live in `gsap.matchMedia()` and the cleanup calls
  `mm.revert()`. A trigger created outside a scope survives navigation and fights the next page.
- **Pins start below the console.** The header is sticky and 80px tall (96px below `lg`), so a pin
  that starts at `top top` hides its own first row behind it. Use
  `start: () => 'top top+=' + headerHeight()` from `lib/sheet.ts`.
- **A pinned plate fits one screen.** `min-height: calc(100dvh - var(--header-h))` at the pin
  breakpoint, with the rows sized so nothing falls below the fold. If the reader cannot see the
  bottom of a pinned section, the pin is wrong.
- **Function based start and end, plus `invalidateOnRefresh: true`.** Otherwise a resize keeps the
  pixel values measured at the old size.
- **`refreshPriority` counts down the page.** A higher number refreshes earlier, so the pinned
  plates go work 2, tunnel 1: each measures a document that already contains the pin spacers of
  everything above it. Getting this backwards is silent and total, the last plate simply never
  pins because its distances were measured against a shorter page.
- **One pin on screen at a time.** Two pinned sections whose spacers overlap will jump.
- **`ignoreMobileResize: true`** in `setupGsap`, so the mobile browser chrome hiding does not fire
  a refresh storm mid-scroll.
- **`anticipatePin: 1`** only where a fast flick visibly overshoots the pin; it costs a layout read
  every scroll.

## What may be scrubbed

Transforms, opacity and `clip-path`. Nothing else.

Scrubbing a size or a position (`height`, `width`, `top`, `left`) runs layout on every frame, and
any code reading `getBoundingClientRect()` in the same frame then forces a synchronous reflow. The
hero strip did exactly this and stuttered; it now animates `transform: scaleY()` with
`transform-origin: top` and the layout never changes. Filters and shadows are not scrubbed either:
they repaint the whole layer.

Per frame writes use `element.style.setProperty('--something', value)` and let CSS consume it, or
`gsap.quickSetter`. Never create a tween inside `onUpdate`.

## The field is one surface

There is one WebGL canvas for the whole site and one owner at a time. Components do not switch the
field on and off; they file a claim while they are on screen and drop it when they leave
(`lib/field/claims.ts`), and the store hands the field to the highest priority claim: loader,
hero, menu, footer, plate. This exists because two components used to reset the field on their own
and one of them left a band stranded on screen for the rest of the page.

A claim is also what brings the canvas in: `FieldMount` loads the renderer once anything has
claimed the field, and only then is `enabled` true. Never gate a claim on `enabled`, or nothing
ever claims and the field never appears. `html[data-field]` says whether anything is asking, and
an end to end test watches it.

The letters are the only live window onto the field. The canvas is fixed to the viewport, so
anything else that shows it has the texture swimming underneath while the page scrolls; the hero
strip carries the same dither as a printed pattern instead, and scrolls with the page.

Two rules the field itself obeys:

- It renders only in bands that contain no text. The lit dither cell is drawn in `field-on`, which
  equals `ink` in five of the six themes.
- Its mask edges are snapped to whole dither cells (`lib/field/snap.ts`) and written only when
  they move, and the canvas is scaled by exactly the cell size. A fractional upscale or a
  fractional mask edge makes the boundary cells flicker whenever anything moves.

## Reduced motion

A parallel design, never a speed setting. `data-motion` is written before the first paint by
`public/theme.js`, so nothing flashes between paint and hydration. Under reduced motion a plate
creates no triggers at all and its CSS already shows the finished state: no pins, no letter field,
no physics, no cloth deformation, and the loader never appears.

## Where things live

| what                    | file                                          |
| ----------------------- | --------------------------------------------- |
| clock, eases, plugins   | `lib/motion/gsap.ts`                          |
| scroll maths            | `lib/motion/scrub.ts`                         |
| drawing rules           | `lib/motion/rules.ts`, `sheet/rules-observer` |
| line reveals, decode    | `components/line-reveal.tsx`, `decode.tsx`    |
| sliced letter flip      | `lib/motion/slice-flip.ts`, `flip-text.tsx`   |
| cloth lattice           | `lib/motion/cloth.ts`                         |
| physics helpers         | `lib/physics/toolbox.ts`                      |
| field ownership         | `lib/field/claims.ts`, `store.ts`             |
| mask snapping           | `lib/field/snap.ts`                           |
| smooth scroll and Lenis | `components/smooth-scroll.tsx`                |
