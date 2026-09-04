# Plan 07: Field fixes and plate rework

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. One task at a time, one commit per task, visual review per task with `scripts/shots.mjs`, report in Italian at the end. Read `docs/superpowers/HANDOFF-2026-09-04.md` and `AGENTS.md` first.

**Goal:** Fix the defects Edoardo found after Plan 05, rebuild the two plates he rejected (P/02 about, P/03 work) on a better reference, and put the GSAP work on a correct footing.

**Written 2026-09-04 by the session that built Plan 05, from Edoardo's review. Nothing here was implemented; every task is open.** Root causes below were traced in the code, not guessed; file and line numbers are from commit `9b28e99`.

**Edoardo's words, so the intent does not get lost in translation:**

- "Quando scrollo, la banda in alto in hero tipo sfarfalla un po' e lagga, mi sembra succeda solo con dither fine, probabilmente un bug visivo."
- "La sezione 'I design interfaces in Figma, then build the whole product, from the interface to the database.' e fatta male, sia come layout che come implementazione e pin. Prendi spunto migliore da wodniack.dev."
- "Anche per quanto riguarda la sezione work non mi piace come e strutturato. Prendi spunto dalla sezione work di wodniack.dev dove ci arrivi da una specie di oblo, entrandoci dentro e le lettere W O R K si separano formando questo effetto di spazio molto bello con i lavori che fluttuano li in mezzo."
- "Metti il user-select none ai testi o elementi che se selezionati danno fastidio, come le parole con il dither, o quelle con la fisica."
- "Anche la sezione 'From design school to the whole stack' ha qualcosa di interessante ma non ci siamo ancora, migliorabile."
- "Abbiamo qualche problema nel footer, intanto a volte il dither compare in sezioni piu in alto, non si sa bene come, e poi su molti temi il testo e illeggibile, prova tu stesso con il tema bg nero."

Order of work: Task 1 (field ownership) and Task 2 (footer legibility) first, because they are correctness and they change the rules the plates play by. Then Task 3 (band flicker), Task 4 (user-select), Task 5 (GSAP foundation), then the reworks (Task 6 about, Task 7 work, Task 8 tunnel), then Task 9 (docs and gates).

---

## Task 1: One owner for the field, and no more leaks

**Symptom (Edoardo):** the dither band shows up in sections far above the footer, unpredictably.

**Root cause, confirmed.** Three components mutate the single global field state directly and each one decides on its own whether to switch it off. Two of them read the store into a local `s`, call `s.release(...)`, and then test `s.requests.length === 0` on the snapshot taken **before** the release. The snapshot still contains their own id, so the test is never true and the band is never turned off:

- `components/plates/about-box.tsx:91` (`s.release('about')` then `s.requests.length === 0` at line 92) and the effect cleanup at line 103 releases without ever resetting mode or intensity.
- `components/console/mobile-menu.tsx:73` (`s.release('menu')` then the same stale test at line 74).

Once the About plate has set `mode: 'band'`, `band: [0.45, 1]`, `intensity: 0.2` and failed to reset, the band stays on for the rest of the page, and `components/footer-field.tsx:47` only rewrites the range while the footer is actually visible. Result: a dither band across the lower half of whatever section happens to be on screen.

**Fix.** Do not patch the two call sites. Give the store real arbitration, so no component can leave the field in a state it does not own:

- In `lib/field/store.ts`, replace `request(id)` / `setMode` / `setIntensity` / `setBand` with a single `claim(id, { mode, intensity, band, floor?, priority })` and `release(id)`. Keep a map of claims. After every claim or release the store recomputes the winner by priority and applies its settings, or switches to `mode: 'off', intensity: 0` when the map is empty.
- Priorities, highest first: `loader` 40, `hero` 30, `menu` 20, `footer` 10, `about` (and any future plate) 5.
- Every caller becomes declarative: `claim('about', { mode: 'band', intensity: 0.2, band: [0.45, 1], priority: 5 })` on enter and `release('about')` on leave and on unmount. No caller ever calls `setMode('off')`.
- `components/footer-field.tsx` keeps updating its band range each frame, but through `claim('footer', ...)` with the new range; the store ignores it while a higher priority claim exists.
- Keep `requested` derived from the map size for `FieldMount`.

**Tests.** `tests/unit/field.test.ts`: claim and release in every order (about then footer, footer then about, menu over both, release out of order) always ends at `off` with intensity 0 when the map empties; the winner is the highest priority claim; a lower priority claim does not overwrite a higher one. `tests/e2e/field.spec.ts`: scroll the home from top to bottom in steps and assert that at every step either `mode` is `off` or the band's own plate is on screen; specifically assert no band while the tunnel plate is centred.

**Acceptance:** scrolling the whole home page never shows the dither outside the hero, the footer strip and the mobile menu.

---

## Task 2: The field never renders behind body text

**Symptom (Edoardo):** in many themes the footer text is unreadable, worst on the dark themes.

**Root cause, confirmed by the tokens.** The lit dither cell is painted with `--field-on`, and in five of the six themes `--field-on` is exactly `--ink`:

| theme    | field-on | ink     | same |
| -------- | -------- | ------- | ---- |
| signal   | #140E0C  | #140E0C | yes  |
| field    | #F2F2EF  | #F2F2EF | yes  |
| paper    | #141310  | #141310 | yes  |
| phosphor | #E9FF6A  | #E9FF6A | yes  |
| cobalt   | #F1EDE4  | #F1EDE4 | yes  |
| ash      | #F16D50  | #1A1B18 | no   |

The footer band covers the whole footer (`components/footer-field.tsx:44` builds the range from the footer's own rect) at intensity 0.45 with floor 0.04, so every line of footer text sits on a scatter of cells in exactly its own colour. It reads only because the scatter is sparse.

**Fix.** Make it a rule of the system, not a tuning: **the field only ever renders in bands that contain no text.**

- The footer claims a band of fixed height at the very top of the footer (96px desktop, 64px mobile), above the first cell of text, not the whole footer. Compute the range from the footer's top edge plus that height.
- Add the rule to `DESIGN.md` under Colour: "The field is texture, never a backdrop for reading. A band is a strip with no text in it. Body text never sits over dither."
- Optional, only if the strip feels thin: keep the whole-footer band but drop intensity to 0.12 and give every footer text cell `background-color: var(--canvas)`. Prefer the strip; the second option reintroduces filled cells, which the system avoids.

**Test.** New `tests/e2e/contrast.spec.ts`: for each of the six themes, scroll to the footer, read the field canvas band range from the store (expose it on `window.__field` in development, or compute from the DOM), and assert the band rectangle does not intersect the bounding box of any element matching `.site-footer :is(p, a, dd, dt, li, button)`. Keep the existing axe runs.

**Acceptance:** in all six themes, at 1440 and 390, every footer line sits on flat canvas. Check phosphor and field first, they are the ones Edoardo called out.

---

## Task 3: The hero band stops flickering

**Symptom (Edoardo):** the hero strip shimmers and lags while scrolling, only at the fine dither.

**Root causes, three of them, all in the same frame path.**

1. `components/hero-mask.tsx:70-74` writes all four attributes of the mask rectangle **every single frame**, whether or not the values changed. An SVG mask attribute write invalidates the mask and forces the browser to re-rasterise it and re-composite the masked canvas. At cell 2 the canvas is four times the pixels of cell 4, so the cost only shows at the fine setting. The mask group transform right above it is already guarded by a comparison; the band rect is not.
2. The values are written as CSS pixels with one decimal, while the canvas is drawn at `viewport / cell` and scaled up with `image-rendering: pixelated`. A mask edge on a fractional pixel against nearest-neighbour cells makes the first and last row of cells flick on and off as the band moves.
3. `app/globals.css:945` animates the band's **height** through `--band-scale` under a scrub. Animating height runs layout every frame, and `getBoundingClientRect()` in the same frame forces a synchronous reflow.

**Fix.**

- Animate a transform, not a size: give `.hero-band` a fixed height and scrub `transform: scaleY(var(--band-scale))` with `transform-origin: top`. No layout per frame.
- Snap the mask rectangle to whole dither cells: read `cell` from the field store and round x, y, width and height to multiples of it (`Math.round(v / cell) * cell`). The mask edge then always falls on a cell boundary.
- Write attributes only when a snapped value changes, exactly as the group transform already does.
- Once the band is collapsed (height 0), remove the rectangle from the mask instead of writing zeros.
- Read the rect once per frame into a local and reuse it; never call `getBoundingClientRect()` twice in the same tick.

**Test.** `tests/e2e/field.spec.ts`: with the field forced to cell 2, scroll the hero through its whole range while sampling `requestAnimationFrame` deltas, and assert the 75th percentile stays under the existing budget in `lib/field/quality.ts` (22ms). Add a unit test for the snapping helper (`snapRect(rect, cell)`).

**Acceptance:** at cell 2, scrolling the hero is as smooth as at cell 4, and the band edge does not shimmer.

---

## Task 4: user-select where selection is noise

**Symptom (Edoardo):** selecting the dither words or the physics tags is annoying.

**Fix.** Add `user-select: none` (with `-webkit-user-select`) to decoration only. Nothing that a reader might legitimately want to copy loses selection.

Set it on: `.hero-svg` and `.hero-text` (the headline is duplicated as a real `h1.sr-only`, which stays selectable and copyable), `.letters` and `.letters__glyph`, `.toolbox__tag` and `.toolbox` (dragging must never start a selection; also set `-webkit-touch-callout: none`), `.monogram`, `.cover__panel`, `.tunnel__panel`, `.tunnel__rays`, `.cloth__grid`, `.guides`, `.console-line`, `.flip-text__strips` (the strips are duplicates of the real label), `.notes-plate__dither`, `.loader`, `.timecode__pin` and `.timecode__marker`.

Keep selectable: every paragraph, case study title, caption, fact value, email, nav label, footer text.

**Test.** `tests/e2e/plates.spec.ts`: assert `getComputedStyle(el).userSelect === 'none'` for a sample of the decoration list, and `!== 'none'` for the hero `h1.sr-only`, the about sentence and the footer email.

---

## Task 5: GSAP and ScrollTrigger on a correct footing

Read before writing any of the reworks. The local skill `taste-gpt-tasteskill` is a general design skill, not a GSAP reference; take only its motion paradigms (pinned title with content scrolling past, scrubbed reveals, scale and fade on enter, stacking cards) and follow the rules below, which come from the GSAP ScrollTrigger documentation and from what already bit us in Plan 05.

**Rules for this codebase.**

- Every trigger is created inside `useGSAP` with a `scope` and torn down in the returned cleanup. Breakpoint variants go in `gsap.matchMedia()` and the cleanup calls `mm.revert()`. Never create a trigger outside a scope.
- Lenis drives the clock: `lenis.on('scroll', ScrollTrigger.update)` and Lenis runs on the Tempus tick at order -5 with `gsap.updateRoot` at -10 (`lib/motion/gsap.ts`, `components/smooth-scroll.tsx`). Do not add `ScrollTrigger.normalizeScroll`, and do not register a `scrollerProxy`: Lenis is in root mode and the window is the scroller.
- `start` and `end` are functions when they depend on measured values, and every pinned trigger sets `invalidateOnRefresh: true`, so a resize recomputes instead of keeping stale pixels. Pins start below the sticky console: `start: () => \`top top+=${headerHeight()}\`` (`lib/sheet.ts`).
- A pinned section must fit `100dvh - var(--header-h)`. If it does not, the reader cannot see the bottom of it. Set the height explicitly on the plate at the pin breakpoint.
- Set `refreshPriority` in document order on the pinned plates (about 1, work 2, tunnel 3) so a refresh recalculates them top to bottom and pin spacers do not fight.
- Call `ScrollTrigger.refresh()` once after `document.fonts.ready` (already in `components/smooth-scroll.tsx`) and after any content that changes height. Add `ScrollTrigger.config({ ignoreMobileResize: true })` in `setupGsap` so the mobile browser chrome hiding does not trigger a refresh storm.
- Scrub only transforms, opacity and clip-path. Never scrub height, width, top, left, filter or box-shadow. Task 3 exists because a scrub animated a height.
- Per-frame writes use `gsap.quickSetter` or `gsap.quickTo`, or plain `style.setProperty` of a custom property that CSS consumes. Do not create tweens inside `onUpdate`.
- `anticipatePin: 1` only where the pin visibly jumps on a fast flick; it costs a layout read.
- `will-change` goes on the handful of elements that actually move, and comes off when the animation ends.
- Reduced motion is a separate branch, not a speed change: `if (reduced) return` before creating triggers, and the plate must already look finished in CSS.
- One pinned plate on screen at a time. Two adjacent pins whose spacers overlap will jump.

**Deliverable for this task:** a short `docs/motion.md` holding the rules above plus the two diagrams of the tick order and the pin geometry, linked from `AGENTS.md`. No behaviour change.

---

## Task 6: Rebuild P/02, the about plate

**What is wrong now.** The sentence and eight facts sit on one wide slab; the perspective sides read as a floor rather than an object; the pin runs 150vh for one small gesture; the facts fade in and out with no rhythm; the plate wastes most of its height.

**The reference.** On wodniack.dev the about section is a narrow ruled column of text, roughly 40 percent of the width, with everything else left as ruled emptiness, and the three dimensional treatment is reserved for a separate object below it (the awards box, seen slightly from above, its side planes ruled). The text is never inside the 3D object.

**Rebuild.**

- Layout: the sentence in `display` size in a cell spanning `col 3/9` (`col 1/7` at md, full width at sm), left aligned, on flat canvas. Ruled empty cells left and right. This is the only thing in the first screen of the plate.
- Below it, the facts as a ruled table: two columns of four rows on desktop (`col 3/6` and `col 6/9`), one column below md, each row its own cell with the mono label and the value. They draw in with the standard rule batch, no bespoke opacity ramp.
- The three dimensional object becomes a separate small element in `col 9/13`: a shallow ruled drawer, at most 320px wide, holding the EB mark, tilted about 10 degrees and flattening as the plate crosses the viewport. It is decoration next to the text, not the container of it.
- Pin: remove it. The plate animates on enter (sentence line reveal, facts drawing, drawer flattening) and is done. If a pin is still wanted after seeing it, cap it at 80vh with a single gesture.
- Keep `lib/about-facts.ts` as the single source of the facts.

**Acceptance:** the plate reads as a page of a specimen book, not as a slab; at 1440 the sentence is two lines at most; the facts table is scannable; nothing is pinned; with the grid on every cell edge is on a column line.

---

## Task 7: Rebuild P/03, the work plate, as the porthole

**What Edoardo asked for.** Arrive at a porthole, enter it, and inside find a space where the letters W O R K separate and the projects float between them.

**The reference, and how to study it.** Open wodniack.dev and scroll slowly through the WORK section. Three moments to capture with `scripts/shots.mjs` (`SCROLLS` with three values) before writing any code: the stadium shaped porthole with the vertical word inside it; the moment it fills the screen; the interior with the letters spread out and the project screenshots floating at different sizes and tilts. Note the timing of each beat as a fraction of the pinned range.

**Build.**

- **Beat 1, approach.** A stadium shaped aperture centred on the plate, about 320px wide and 60 percent of the plate tall, its interior filled with `surface-2` and the vertical word WORK in `display-xl` inside it. The aperture is the one curve allowed on the site; see the DESIGN.md amendment below.
- **Beat 2, entering.** As the scrub advances the aperture scales up (transform, not width) until it fills the viewport, and its interior becomes the ground of the section. The rest of the page dims behind it. The vertical word scales with the aperture and breaks into its four letters as the aperture passes about 70 percent of the viewport width.
- **Beat 3, inside.** The four letters drift apart to different depths (`translateZ` with a perspective on the plate, from -600px to 200px) and to different corners, slowly and continuously. The five project plates float between them at three depths, each with a slow idle drift (a few pixels, sine on the shared clock) so the space feels alive while the reader is still.
- **Beat 4, leaving.** The covers settle into the reading arrangement (the current 3 plus 2 on the sheet) and the letters recede. The timecode bar stays: it is the one control that makes the pinned range navigable and Edoardo has not objected to it.
- Keep the covers as typographic plates (`components/plates/work-cover.tsx`) until real screenshots exist; the floating treatment does not depend on images.
- Mobile: no pin, no porthole. The word WORK sits horizontally over a stack of covers that land on enter, exactly as now.
- Reduced motion: no porthole, no floating; the final arrangement, static.

**DESIGN.md amendment to raise with Edoardo before building:** the system says radius 0 everywhere. The porthole is a curved aperture. Either add the exception explicitly ("one aperture on the site, the work porthole, radius 999px; no other rounded corner exists") or build the aperture as an octagon cut with `clip-path`, which keeps radius 0 literally true and still reads as a hatch. Ask; do not decide silently.

**Acceptance:** entering the section feels like passing through an opening; at the end the five projects are readable and reachable; the pinned range is at most 200vh; the timecode still moves the reader; with the grid on the final arrangement is on the columns.

---

## Task 8: Improve P/06, the tunnel

**What is wrong now.** The frames all fly down the same central axis, so it reads as one object pulsing rather than a corridor; the title fades to 0.35 and is covered by every frame; the stage is mostly empty; the years are buried in the caption.

**Improve.**

- Give each frame its own lateral and vertical offset so they pass at different points of the field of view, and a slight rotation. Keep the z travel.
- Print the year as a large mono number that scales with the frame, so the corridor reads as a timeline. Frames without a confirmed year (`lib/since-frames.ts`, the two study frames) show the caption alone; do not invent years.
- Move the title out of the flight path: top left of the stage, static, in `headline` size, with the plate number. The `display` size in the middle of the corridor is what forces the fade.
- Let the rays react: the vanishing point drifts a few percent with the pointer, so the corridor turns slightly.
- Reduce the stage height so the corridor is dense, and keep the exit clean: the last frame passes and the plate ends.

**Acceptance:** at 1440 the corridor reads as depth with frames passing at different points; the title is always legible; on mobile the frames are a plain stack.

---

## Task 9: Documentation and gates

- `DESIGN.md`: the field rule from Task 2, the porthole decision from Task 7, the user-select rule from Task 4, and a line in `motion` pointing at `docs/motion.md`.
- `docs/motion.md` from Task 5, linked in `AGENTS.md`.
- Colophon changelog: one line naming the rework.
- Update `docs/superpowers/HANDOFF-2026-09-04.md` section 1 with the new state, and the memory file `portfolio-project-goals.md`.
- Full gate before reporting: `pnpm lint && pnpm typecheck && pnpm test`, then `ALLOW_TODO=1 pnpm build && pnpm test:e2e`, then both Lighthouse configs. Kill any server left on port 3100 before the e2e run or Playwright reuses it and tests a stale build.
- Visual review at 1440 and 390 in signal, field and paper with the grid on, plus one pass in phosphor for the footer.

---

## Still open from earlier plans

- Lighthouse mobile is 0.85, held back by LCP 3.9s. See Plan 06 Task 3 for the approach.
- Plan 06 still owes: palette commands to jump to a plate, `Calibrate again`, colophon theme swatches.
- Facts Edoardo still owes: team and role per case study, the years for IAAD and Politecnico (they block the production build through `scripts/check-content.mjs`), the availability line, domain and hosting, real cover screenshots.
