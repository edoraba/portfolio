# Motion

How movement works on this site, and the rules that keep it from breaking. Written after Plan 05,
where three of the defects Edoardo found came from breaking one of them, and extended after the
2026-09-05 rebuilds of P/02, P/03, P/04 and P/06.

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
  plates go work 2, since 1: each measures a document that already contains the pin spacers of
  everything above it. Getting this backwards is silent and total, the last plate simply never
  pins because its distances were measured against a shorter page.
- **One pin on screen at a time.** Two pinned sections whose spacers overlap will jump.
- **`ignoreMobileResize: true`** in `setupGsap`, so the mobile browser chrome hiding does not fire
  a refresh storm mid-scroll.
- **`anticipatePin: 1`** only where a fast flick visibly overshoots the pin; it costs a layout read
  every scroll.
- **A pinned element carries a transform, and a transformed ancestor is the containing block for
  everything `position: fixed` inside it.** So a fixed layer inside a pinned plate is positioned
  against the plate, not the viewport: P/03's stage started below the console and full screen had
  a bar across the top. Either keep the fixed layer outside the pinned subtree, or subtract the
  pinned element's own rect from the layer's `top` and `left` while the pin is active, which is
  what `work-stage.tsx` does.
- **`perspective` applies to an element's own children and no further.** Put it a level too high
  and every 3D transform below the gap renders flat, at full size, with no foreshortening: P/03's
  shell of letters was three times the size it was meant to be and nobody could see why. If a
  layer sits between the perspective and the transformed elements, the perspective moves down to
  the layer.
- **Do not assume where a fixed layer's origin is: measure it.** GSAP leaves a transform on a
  plate it has pinned whether or not the pin is currently running, so the containing block for
  anything fixed inside is the plate at some times and the viewport at others. Where the layer
  lands when told to sit at its own top left is the offset to cancel, and it is right in every
  case.
- **Viewport units count the scrollbar.** A full bleed fixed layer at `width: 100vw` gives the
  page a sideways scroll of exactly one scrollbar. Size it from `documentElement.clientWidth`.
- **A clip path clips its whole subtree, fixed descendants included.** Anything the reader has to
  reach (P/03's timecode) goes outside the clipped element, or it stops being reachable the moment
  the shape is small.

## Rows on a plate

`Plate` names its own rows: the rule is row 1, the number and the meta cell are row 2. A plate
whose content sets explicit rows must therefore start at row 3. This is not decoration: CSS grid
auto placement does not go backwards, so a sheet whose content claims rows 2 and 3 leaves its own
auto placed header nowhere to go but the bottom, which is exactly where P/02's number and title
ended up. If a plate reflows below `lg`, put the row in a class (`[grid-row:5] lg:[grid-row:3/5]`)
rather than the `row` prop: an inline style cannot answer to a breakpoint.

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

A claim may also name an SVG mask, and the canvas is cut to it. That is how the field is seen
through a shape rather than washed behind one, and it is the same machinery every time: the
headline's letters and the strip above them, the mark of P/02, the lab plate of P/04. Only the
footer takes a plain horizontal band. The mask lives in a hidden SVG in viewport coordinates and
is rewritten only when the shape it follows moves.

Because the canvas is fixed to the viewport, anything showing it has the texture swimming
underneath while the page scrolls. Two things stop that: the shader samples the noise at an offset
taken from the scroll position and quantised to whole cells, so the pattern travels with the page,
and the flow clock holds still while the page is moving. A pattern that both drifts and slides
under a moving window reads as flicker.

Anything that can show the live field must also print the same dither when it does not have it:
the field has one owner, so a second claimant is left with nothing to draw. A window that goes
blank while the headline still holds the field is worse than one that was never live.

Three more rules the field obeys:

- It renders only in bands that contain no text. The lit dither cell is drawn in `field-on`, which
  equals `ink` in five of the six themes.
- Its mask edges are snapped to whole dither cells (`lib/field/snap.ts`) and written only when
  they move, and the canvas is scaled by exactly the cell size. A fractional upscale or a
  fractional mask edge makes the boundary cells flicker whenever anything moves.
- In band mode the fade at the top edge is a share of the band, not a fixed slice of the viewport.
  A fixed one washes out a short band completely, which is why the footer strip was invisible.

The one place the field cannot serve is P/03. Inside the void the ground is the dark half of the
theme, and the field always paints its own ground in `field-off`, which is the page colour. That
space prints its dither instead.

## Reduced motion

A parallel design, never a speed setting. `data-motion` is written before the first paint by
`public/theme.js`, so nothing flashes between paint and hydration. Under reduced motion a plate
creates no triggers at all and its CSS already shows the finished state: no pins, no letter field,
no physics, no cloth deformation, and the loader never appears.

## Cells that fall back

A cell's span at md and sm is worked out proportionally from its span at lg unless it is given
one. That is right for a cell in a row of cells and wrong for a cell of prose: a body starting at
column 4 of 12 fits to column 2 of 4, and the reader gets a paragraph seven words wide down the
middle of a phone. Every cell that carries running text names its own `sm`, and there is a script
that finds the ones that do not:

    <Cell col={4} end={11} md={{ col: 1, end: 7 }} sm={{ col: 1, end: 5 }} />

## The entrance, and the transition between pages

The entrance is a grid of tiles in the theme's ink covering the screen, with four holes in it on
the middle row and a marker the size of one tile that hops from hole to hole. It hops when
something has actually become ready, in this order: fonts, the shader, the content, the images
above the fold, carrying the EB mark from the first frame. Then the whole screen lifts in one movement,
and that is the only time any of the page is seen.

Three rules hold it together:

- **A dwell and a patience.** Two resources reporting in the same tick would read as one jump, so
  a stop is held for 260ms before the next can be taken; and a resource that never reports would
  stall the count, so each stop is taken anyway after 450ms of waiting. The entrance is a door,
  not a gate.
- **The page is never half seen.** The ground stays under the tiles for the whole entrance and the
  screen lifts as one plate: the mask closes towards its own top edge while everything on it rises
  a little faster, so it reads as a plate being lifted. The first version dropped the tiles one by
  one over a ground that outlived them, which meant a flat colour and then a cut to the page.
- **It covers from the first paint, not from hydration.** The loader is a client component, so
  `public/theme.js` puts an opaque ground up before anything is drawn and the loader takes it down
  as soon as it is drawing over it. On a machine that cannot run the field there is no entrance to
  hide behind, so the ground fades rather than being switched off, and a safety timeout in the
  script removes it whatever happens: a bundle that never boots must not leave a blank screen.
- **It may not leave in the middle of its own count.** The screen drops when readiness is done
  _and_ the mark has landed, plus a beat to see it. Gating on readiness alone let the grid fall
  while the marker was still at 50, which reads as a flicker rather than an entrance.
- **Tiles are laid out odd.** An odd number of tiles across and down gives a true middle column
  and a true middle row for the mark to land on, and one extra tile beyond every edge means no
  half tile ever shows at the border. `lib/loader-grid.ts` does that arithmetic and is tested.

The page transition is a clip mask on React's `ViewTransition`, one animation shared by two
pages: the one being left keeps moving the way the reader was going and thins out, the one
arriving is cut in over it from the edge it came from. Two things it needs that a demo on
same-sized pages does not:

- **The arriving page has to carry a ground.** A page here is transparent, so without a background
  on `::view-transition-new` the two pages are read through each other.
- **The leaving page has to be gone before the mask finishes.** These pages are not all the same
  height, so a snapshot still at a quarter opacity under a moving one reads as two pages at once
  rather than as depth. It reaches zero at 55% of the run, while the mask is still opening.

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
| a masked window on it   | `components/field-plate.tsx`                  |
| mask snapping           | `lib/field/snap.ts`                           |
| smooth scroll and Lenis | `components/smooth-scroll.tsx`                |

## The home plates, and what each one owes the reader

| plate        | what moves                                                                         |
| ------------ | ---------------------------------------------------------------------------------- |
| P/01 hero    | the headline's weight, on scroll and under the pointer; the strip closes on scroll |
| P/02 about   | the mark draws itself bar by bar and is a window onto the field                    |
| P/03 work    | pinned: the hole opens to the screen, the word parts into a shell, cards cross it  |
| P/04 notes   | the lab plate is a window onto the field                                           |
| P/05 toolbox | the tags fall into a ruled container, physics loaded only when the plate is near   |
| P/06 since   | pinned: a paragraph opens until one word fills the plate, walked word by word      |
| P/07 contact | the cloth bulges away from the pointer                                             |

Two things learned building P/03 and P/06 that generalise:

- **Depth is worth solving from apparent size, not easing on its own.** At a constant speed in z
  an object crawls while it is far away and then leaps past in the last moment, which is exactly
  the part a reader needs it to hold still for. P/06 solves z from a straight line in scale, so a
  band grows at one steady rate the whole way down.
- **Repainting beats compositing only when there is no choice.** A shape that only moves and
  scales is one element with a constant clip path and a transform, and costs nothing while it
  runs; only the layer whose contents must stay still while the shape grows has to be recut every
  frame. P/03 has three octagons and recuts one. The same goes for texture: the dither in the void
  stopped drifting, because animating a background position across a full screen layer repaints
  it every frame, and what follows the pointer is a transform instead.
- **A zoom into type is arithmetic if nothing reflows.** P/06 grows a paragraph from reading size
  to one word filling the plate and keeps the plate centred on whichever word the sentence has
  reached. That only stays cheap because the lines never rewrap and the tracking never changes: a
  word's place in the block is then a straight multiple of the size, measured once on mount. The
  version that animated tracking along with the size moved every word along its line by a
  different amount and the aim missed by half a screen.
- **Aim at the middle before you aim at a word.** Blending the target from the block's own centre
  to the word's centre as the type opens means the closed state is simply a centred paragraph and
  the opening is a zoom. Aiming at the first word from the first frame slides the paragraph out of
  the plate before the reader has read it.
- **A zoom needs something outside it that grows too.** P/03's octagon scales from one factor on a
  fixed half width, half height and corner, so its shape never changes; ruled squares outside it
  scale at the same rate. Without them a hole opening reads as a shape changing size rather than
  as the reader moving in.
