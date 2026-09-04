# Plan 06: Toolbox physics and polish

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline, one task at a time, commit per task, visual review per task). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add plate P/05, the Toolbox (stack tags falling into a ruled container with 2D physics, draggable, gravity flips on theme switch), then polish: palette commands, colophon, Lighthouse mobile, docs, memory.

**Architecture:** Matter.js (MIT, `matter-js@0.20`, `@types/matter-js`) drives bodies; the DOM `li` tags are positioned from the bodies each Tempus tick (no Matter renderer). Loaded with `next/dynamic` when the plate is within 100vh; engine sleeps off screen. Reduced motion or engine failure: the same `ul` lays out in flow as a wrapped row of mono tags. Tag list comes only from the case studies' `stack` fields and `about.mdx`.

**Spec:** `docs/superpowers/specs/2026-09-04-v2-ruled-sheet-design.md` section 6 (P/05), 10 (architecture, error handling), 11 (gates).

---

## Task 1: Pure physics helpers

**Files:** create `lib/physics/toolbox.ts`, `tests/unit/toolbox.test.ts`; `pnpm add matter-js` and `pnpm add -D @types/matter-js`.

- [ ] Helpers with tests: `tagsFromContent(works, aboutStack)` (unique, ordered by first appearance, trimmed; excludes generic words like "Web", "CLI" only if listed in `EXCLUDE`), `bodyFor(rect, index)` (Matter rectangle options: `restitution 0.25`, `friction 0.6`, `frictionAir 0.01`, `chamfer 0`), `wallsFor(width, height, thickness = 64)` (four static bodies just outside the container so nothing escapes), `flipGravity(engine, ms)` returns a function that sets `engine.gravity.y = -1` and back to `1` after `ms`, `sleepWhenHidden(io)`.
- [ ] Commit `feat(physics): toolbox helpers`.

## Task 2: The Toolbox plate

**Files:** create `components/plates/toolbox.tsx` (server wrapper reading tags from content), `components/plates/toolbox-stage.tsx` (client, dynamic import of `matter-js`), `app/globals.css`.

- [ ] Markup: `Plate id="toolbox" n={5} title="Everything I ship with"`; stage cell `col 1/13`, 70vh (60vh mobile), `flush`, hairline walls; inside a `ul` of `li.tag` (mono label, 1px ink border, radius 0, padding 8px 12px). Before the engine starts the tags are laid out in flow (this is also the reduced-motion and failure state), so the markup is identical on server and client.
- [ ] Engine: when the plate is within 100vh, import Matter, measure each `li` (`getBoundingClientRect`), create bodies stacked above the container top (`y` negative, staggered 40ms via `Matter.Composite.add` per tick), walls, `MouseConstraint` on the container (pointer and touch), `Runner` replaced by `Engine.update(engine, deltaTime)` inside `Tempus.add`; write `transform: translate(x, y) rotate(a)` to each `li` (positions relative to the container, `position: absolute` once the engine owns them, container `position: relative`). Sleep the tick when the plate is off screen (IntersectionObserver).
- [ ] Theme switch flips gravity for 1500ms (`useTheme.subscribe`). Palette command `Shake the toolbox` applies a random impulse to every body (`Body.applyForce`). Both are no-ops before the engine starts.
- [ ] Mobile: 20 tags (longest first dropped), touch drag; the container never scrolls the page while dragging (`touch-action: none` on the stage only while a body is grabbed).
- [ ] Accessibility: `ul` with `aria-label="Stack"`, each `li` is text; the stage has `role="img"` on a wrapper only if the list is removed from the tree (it is not; keep the list). Keyboard users get the flow list because bodies are not interactive controls.
- [ ] Error handling: dynamic import failure or a thrown `Engine.update` logs once (`console.warn`) and reverts the list to flow layout.
- [ ] `tests/e2e/toolbox.spec.ts`: the list has between 20 and 30 tags from content; after scrolling the plate into view and waiting 3s, every tag rect is inside the container rect (desktop); reduced motion shows the flow list with no `transform` set; the palette lists `Shake the toolbox`.
- [ ] Visual review at 1440 and 390 in three themes (theme switch while the plate is visible flips gravity). Commit `feat(plates): the toolbox`.

## Task 3: Polish

**Files:** `components/command-menu.tsx`, `content/pages/colophon.mdx`, `DESIGN.md`, `README.md`, `lighthouserc.json`, `.github/workflows/ci.yml`.

- [ ] Palette: `Shake the toolbox`, `Go to plate P/0n` for the seven plates (scroll with Lenis), `Calibrate again` (clears `sessionStorage.calibrated` and reloads).
- [ ] Colophon: document the six themes with swatches (a small server component listing `THEMES` with the tokens), the plate list, the physics and the loader rule; changelog line `2026-09: toolbox physics, palette commands`.
- [ ] Lighthouse mobile is at 0.85 after Plan 05 (`lighthouserc.mobile.json`), held back by LCP at 3.9s on emulated mobile; desktop is green. Raise the gate back to 0.9 by: identifying the LCP element with a throttled trace (the audit reports none, which points at an element that is replaced during load), preloading only the two font weights the first screen uses, and splitting the GSAP plugins so only the plates on screen pull ScrollTrigger. If TBT rises above 200ms, import Matter on first scroll instead of at 100vh.
- [ ] `DESIGN.md`: physics rules (one physics plate, tags only, gravity 1, restitution 0.25), `Do not` unchanged otherwise. `README.md`: mention the plates and the physics.
- [ ] Update memory `portfolio-project-goals.md` with the state after Plan 06. Commit, push, CI green, report in Italian with the list of inputs still needed from Edoardo (team and roles per case study, years for IAAD and Politecnico, availability line, domain and hosting, real cover screenshots).
