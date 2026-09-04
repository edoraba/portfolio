# Design spec v2: "The ruled sheet"

Date: 2026-09-04. Status: approved in conversation (default theme Signal, Toolbox on the home page, loader yes). Supersedes the layout, colour and motion sections of `2026-09-03-portfolio-design.md`; concept, IA, content model, stack and quality gates of that spec still hold unless amended here.

Reference study (first hand, 2026-09-04): wodniack.dev (Astro, GSAP, Lenis; one crimson and one near-black; every section a bordered cell in a technical-drawing grid; loader with the logo bars; stripe canvas hero; awards in a 3D ruled box; pinned WORK letters that open into a grid while covers fly in; "coding my way since 1997" perspective tunnel; grid cloth CTA with a game; sliced-letter flips) and francescomichelini.com (Nuxt; full-viewport grid 24px + 8 columns + 24px; one mono for everything; eight three-colour themes; P/01 numbering; timecode bar; full-screen numbered menu). Nothing is copied: patterns are rebuilt on our tokens and content.

## 1. What changes and why

Version 1 is a clean typographic page. It lacks a signature: the header is a text row, there is no entrance, scroll only reveals lines, the palette is quiet, and the G grid is an overlay that governs nothing. Version 2 keeps the concept (the headline is the window onto the dither field, one variable grotesk plus one mono, two complete worlds behind one toggle) and rebuilds the site as a **ruled sheet**: a visible 12-column grid on which every element sits by construction, a console header, an entrance that does real work, one choreographed plate per home section, six themes, and a physics plate. The home page tells a story in seven plates: design then build, who, what, how, since when, let us, and the console footer.

## 2. The sheet (layout system)

One CSS grid for the whole site, full bleed, no max-width container.

```
--page: clamp(16px, 4vw, 64px)        outer tracks (grow beyond 1600px: max(that, (100vw - 1600px) / 2))
--gap: 24px (lg), 16px (md), 12px (sm)  column gap
--cols: 12 (lg, 1024px and up), 6 (md, 768px), 4 (sm)
--cell-pad: 12px                      inset of text inside a cell
.sheet { display: grid; grid-template-columns: var(--page) repeat(var(--cols), minmax(0, 1fr)) var(--page); column-gap: var(--gap); }
```

Rules:

- Every section is a `.sheet`. Children declare `grid-column` with the `col-*` utilities (`col-2/8` means column line 2 to 8 inside the content tracks; utilities exist for all three breakpoints). No padding wrappers, no `page-x`, no `site-container` (both removed).
- A **cell** (`.cell`) is a grid child with hairline borders on the sides the design calls for (`cell-l`, `cell-r`, `cell-t`, `cell-b`) and `padding: var(--cell-pad)`. Text sits inside cells; hairlines sit exactly on column lines. Column line N is the left edge of content column N.
- The **G overlay** draws the same `--cols` columns with the same `--page` and `--gap` (so it coincides with every hairline by construction) plus an 8px baseline and the viewport width. It never needs tuning per page.
- **Rules draw on scroll**: `.rule` elements (horizontal or vertical hairlines) are `scaleX(0)` or `scaleY(0)` until their cell enters the viewport, then draw in 800ms on the editorial ease, staggered 60ms in reading order. Reduced motion: drawn at once.
- Corner marks (`+`) at cell intersections are allowed on the home plates only, in the hairline colour, 8px.
- Vertical rhythm: cells snap to a 8px baseline; section heights are multiples of 8.

Acceptance: with G on, at 390, 768, 1024 and 1440, every hairline on the page lies on an overlay line and every text block starts at a column line plus `--cell-pad`.

## 3. Header: the console

Two rows of 40px on desktop, cells on the sheet:

```
row 1:  [1-2] monogram EB      [3-8] status 1: "Frontend developer with a design degree. Turin, IT"      [9] 1 Work  [10] 2 Lab  [11] 3 Writing  [12] 4 About
row 2:  [1-2] console          [3-8] status 2: "Partner at Redergo. Write me → edoardo@redergo.com"     [9-10] themes (six swatches)  [11] Cmd K  [12] G grid
```

- The **monogram** is the EB mark drawn as five vertical bars of varying height in the ink colour (the same bars the loader fills). It is a link to `/`.
- The **console** cell prints a mono status that updates live: current plate (`P/03 WORK`), scroll position as a line counter (`0342/2380`, current scrollY and document height in units of 8px), and, while hovering any link, that link's label decoded. It is `aria-hidden`; it is texture, not navigation.
- Status lines are true facts from `lib/site.ts`. The email is the copy-to-clipboard component.
- Nav items keep the number in the accent and the label; hover runs the **slice flip** (section 8).
- **Themes** are six 12px squares (canvas colour with a 1px ink border, the active one filled with ink); hover shows the name in the console; click switches with the polygon sweep. `T` cycles.
- Mobile (below 768px): row 1 is `[1] monogram [2] theme swatch (current only, tap cycles) [3-4] MENU`; row 2 is the console alone. MENU opens a full-screen numbered list (0 Home, 1 Work, 2 Lab, 3 Writing, 4 About, 5 Now, 6 Colophon) right-aligned in display size with the six swatches at the bottom; the field shows behind it in band mode. Focus trapped, Escape closes.
- The header is sticky. It keeps `view-transition-name: site-header` so page transitions never move it.

## 4. Entrance: the calibration loader

Shows only when all of these hold: the field can render (`canRenderField()`), motion is not reduced, and `sessionStorage.calibrated` is not set. Otherwise the page renders directly (no flash, no placeholder).

Sequence, total between 600ms and 1200ms, driven by real readiness (fonts and shader compiled), never by a fake timer:

1. Overlay: canvas colour, the monogram bars centred at 96px height, a mono line under them `CALIBRATING · CELL 8`. The field runs unmasked (mode `calibrate`, intensity 1, floor 1) behind a translucent overlay so the whole screen dithers coarsely.
2. As fonts and the shader resolve, the bars fill bottom-up (height scale on the editorial ease, one per resource: fonts, shader, content, images-above-fold, ready) and the cell steps 8 → 4 → 2 with the mono line updating.
3. Exit: the overlay wipes up (clip-path, 800ms hop ease), the field switches to hero mode (masked by the headline), the header cells draw their hairlines left to right, the headline words widen from wdth 78 to 100 over 800ms.
4. `sessionStorage.calibrated = 1`. Repeat visits in the session skip everything.

Reduced motion or no field: no overlay at all. No percentage, no counter; the mono line names a real state.

## 5. Themes

Six complete worlds. Tokens per theme: canvas, surface, surface-2, ink, ink-muted, hairline, accent, accent-ink, field-on, field-off, color-scheme. All pairings below pass WCAG AA for normal text (checked with the relative-luminance formula on 2026-09-04; the tokens test recomputes them).

| Theme            | canvas  | surface | surface-2 | ink     | ink-muted | accent  | field-on | field-off |
| ---------------- | ------- | ------- | --------- | ------- | --------- | ------- | -------- | --------- |
| signal (default) | #F5401F | #F7573A | #F96E55   | #140E0C | #2A0A04   | #140E0C | #140E0C  | #F5401F   |
| field            | #0B0C0E | #15171B | #1C1F24   | #F2F2EF | #8B8E93   | #7D93FF | #F2F2EF  | #0B0C0E   |
| paper            | #F1EDE4 | #E6E0D3 | #DDD6C6   | #141310 | #625C50   | #1F3BFF | #141310  | #F1EDE4   |
| phosphor         | #0C0F0A | #151A10 | #1C2315   | #E9FF6A | #9DAF52   | #F2F2EF | #E9FF6A  | #0C0F0A   |
| cobalt           | #1F3BFF | #1B34E6 | #172ECF   | #F1EDE4 | #D8DCFA   | #E9FF6A | #F1EDE4  | #1F3BFF   |
| ash              | #9C9E97 | #A6A8A1 | #B0B2AB   | #1A1B18 | #262823   | #1A1B18 | #F16D50  | #9C9E97   |

Hairline is the ink at 0.22 alpha on signal, cobalt and ash (bold canvases need visible rules), 0.10 on field and phosphor, 0.12 on paper. accent-ink is the canvas colour. color-scheme is light for signal, paper, cobalt and ash, dark for field and phosphor.

- `data-theme` takes the theme name. `public/theme.js` maps legacy stored values (`dark` → field, `light` → paper). With no stored value the default is **signal** regardless of OS preference; the OS preference only decides between field and paper when the visitor has previously chosen one of those two. The no-JS fallback is signal.
- The accent rule changes: on bold canvases (signal, cobalt, ash) the accent is the ink itself, links are underlined; on field, paper and phosphor the accent stays a second colour. Never an accent fill larger than a label.
- The field reads `--field-on` and `--field-off` from the active theme, so it follows every switch without code.
- The switch keeps the polygon sweep via View Transitions (600ms hop, 400ms below 768px). Reduced motion: instant.
- The palette lists all six under Site. Each theme has a one-line description in `lib/themes.ts` (name, tokens, description) which is the single source for CSS generation in `globals.css`, the swatches, the palette and the tokens test.

## 6. The home story, plate by plate

Each plate is a `.sheet` section with a mono plate number cell top-left (`P/01` to `P/07`), a title cell and its own scroll choreography. Desktop choreography uses GSAP ScrollTrigger with scrub; pins are at most 200vh long; mobile (below 768px) never pins for longer than 100vh; reduced motion turns every plate into a static layout with 150ms opacity fades. Every plate's content is real DOM text; decorative letters are `aria-hidden` duplicates.

### P/01 Hero "Design, then build."

- Rows: a ruled strip (mono meta: `45.07 N 7.69 E`, local time, `FIELD CELL 2`, viewport width) at 32px; the **stripe band**: the field in band mode filling `col 1/13`, 28vh tall, unmasked, with `uMode` band and floor 0.35, so it reads as a live stripe canvas that bends around the pointer; a second ruled strip; the headline (existing SVG mask) `col 1/13`, display-xl, the field visible through the letters; the sub line and the email in `col 1/7`; a four-item index (selected work with `P/0n`, client, year) in `col 8/13` on lg.
- Scroll: the band collapses (height to 0, scrub) in the first 40vh; the headline compresses on the wdth axis from 100 to 78 while it leaves; the mask hands the field to plate 02 as today.
- Pointer: nearest word widens (kept); the stripe band lights around the pointer (kept shader).
- Mobile: band 18vh, headline two lines, index below the email.

### P/02 About "In one sentence"

- A **ruled box in perspective**: a `col 2/12` cell with `transform-style: preserve-3d`, four side planes drawn as ruled surfaces (repeating hairline gradients) so the box reads as a drawer seen from the front, as in wodniack's awards. Inside: the bio sentence in headline size (`I design interfaces in Figma, then build the whole product, from the interface to the database.`) and a **facts table** in mono cells, two per row: `Based / Turin, IT`, `Since / 2020 at Redergo`, `Role / Partner, frontend and product`, `Team / 10 designers and developers`, `Trained / Digital Communication Design, IAAD`, `Before / two years of energy engineering, Politecnico di Torino`, `Stack / React, Next.js, Astro, TypeScript`, `Ships / design, frontend, backend, database, deployment`. Every fact comes from `about.mdx` or the CV repo; nothing new.
- Scroll: pinned for 150vh; the box rotates from rotateX(12deg) to 0 and its depth from 320px to 0 with scrub; rows reveal one per 8 percent of progress with their rules drawing; the field, in band mode at low intensity, sits behind the box floor.
- Mobile: no pin, no 3D; the box is a flat ruled table, rows reveal on enter.

### P/03 Work

- Pinned 200vh (100vh mobile). Left `col 1/3`: the word WORK set vertically in display-xl inside a pill-shaped ruled outline; `col 3/13`: the stage.
- Scroll, three beats: (1) the vertical letters slide apart and each letter multiplies into a row (W W W W W / O O O O O / ...) filling the stage as a letter grid, `aria-hidden`; (2) the five covers rise from below with a 6deg tilt that flattens as they reach their slot, one per 20 percent of progress, each a `figure` with the recreated cover image, `P/0n`, client and year in mono; (3) the letter grid parts to leave the covers in a 3 + 2 arrangement on the sheet columns (`col 3/6`, `col 6/9`, `col 9/12`, second row `col 4/8`, `col 8/12`).
- A **timecode bar** under the stage: five pins and a moving marker bound to progress; clicking a pin scrolls to that beat. Prev and Next buttons for keyboard.
- Hover: cover lifts 8px, its rule glows in the accent, the console prints the title. Click goes to the case study with the existing title morph.
- Mobile: static WORK header (horizontal), covers stacked one per row, tilt animation on enter only.

### P/04 Notes (Lab and Writing)

- A two-column ruled index (`col 1/7` Lab, `col 7/13` Writing), each entry a cell with number, title, date; entries reveal as their rules draw. The Lab cell holds a live 160px thumbnail of the field at cell 4 (the same canvas is not reused: it is a static SVG dither pattern that animates by cycling three pattern offsets, no second WebGL).
- No pin. Mobile: stacked.

### P/05 Toolbox (physics)

- Title cell: `Everything I ship with`. Stage: a ruled container `col 1/13`, 70vh, hairline walls. Inside, 20 to 30 mono **tags**, one per stack item, taken only from the `stack` fields of the case studies and from `about.mdx` (React, Next.js, Astro, TypeScript, Figma, Claude Code, Fatture in Cloud API, OAuth2 and the rest of what those files list; nothing added from memory) as DOM elements driven by **Matter.js** bodies (rectangles sized from the rendered element), with gravity 1, restitution 0.25, friction 0.6. Loaded with a dynamic import when the plate is within 100vh; the engine runs on the Tempus tick, sleeps when the plate is off screen.
- Interaction: bodies drop in when the plate is 50 percent visible, staggered 40ms; drag and throw with pointer or touch (Matter MouseConstraint on the container); the theme switch flips gravity for 1.5s so everything falls to the ceiling and back; the palette gets `Shake the toolbox`.
- Accessibility: the tags are a real `<ul>` of `<li>`; when reduced motion is on or the engine fails, the list lays out in flow as a wrapped row of mono tags. Bodies never leave the container.
- Mobile: container 60vh, 20 tags (largest first), touch drag.

### P/06 Since "From design school to the whole stack"

- The **tunnel**: a `col 1/13` plate, 150vh pinned (100vh mobile), with radial hairlines converging to a vanishing point (SVG lines, drawn once), the title in display at the centre receding, and five **frames** (ruled figures with a mono caption) flying past on the z axis as scroll progresses, in this order: `Energy engineering, Politecnico di Torino, two years`, `Digital Communication Design, IAAD`, `2020 · joining Redergo, interfaces in Figma`, `2021 · stopped handing off, first products shipped`, `2026 · Refattura, 12,000+ documents`. Years for the first two frames are `TODO(edoardo)` until confirmed; the frame shows the caption without a year meanwhile. No date is invented. Frames use `translateZ` from 1200px to -200px with perspective 900px on the plate; the field is off here.
- Mobile: no pin; frames stacked with the radial lines static behind.

### P/07 Contact "Let us"

- The **grid cloth**: a `col 1/13` plate 100vh with a 12 x 8 cell grid drawn as SVG lines; the lines bend toward the pointer (vertex displacement on a Tempus tick, spring with attack 25ms release 175ms as the field pointer). Centre cell: `Let us build` in display, each letter sliced in four horizontal strips; on hover or when the plate is 60 percent visible, strips flip to `Write to me` (the slice flip, section 8). Under it the email (copy component) and `Turin or remote`.
- The footer console follows: `col` cells for nav (1 to 6), location, local time, elsewhere, motion toggle and the closing line, all as cells with hairlines. The field returns in band mode behind the footer (kept).
- Mobile: 8 x 6 grid, cloth reacts to touch.

## 7. Other pages

Every page becomes a sheet: page header as a title cell (`col 1/9`) with a mono plate cell (`P/`), rules draw on enter, content in `col 1/8` (lg) with the ToC or index in `col 9/13`. `/work` is the index with covers in a 3 + 2 arrangement like plate 03's final state (no pin); `/work/[slug]` keeps the title morph, meta as cells; `/lab`, `/writing`, `/about`, `/now`, `/colophon`, 404: cells and rules. The colophon documents the six themes with swatches and the plate list.

## 8. Hover and micro-interactions

- **Slice flip**: text split into four horizontal strips (CSS `clip-path: inset()` on four absolutely positioned copies); on hover each strip translates X in alternating directions and returns with the second label, staggered 30ms, 500ms on the hop ease. Used on nav items, buttons and the CTA. Touch: the flipped state shows on focus and on tap.
- **Decode** stays for mono labels and numbers, once on enter and again on hover.
- **Cover lift** on work items: `translateY(-8px)` and the rule glows in the accent, 250ms.
- **Console echo**: hovering any link prints its label in the console cell.
- **Field pointer light** stays as is.
- Every hover has a focus equivalent; nothing depends on hover to be reachable.

## 9. Motion rules (amendments to DESIGN.md)

- Rules draw at 800ms editorial, stagger 60ms. Pins: at most 200vh desktop, 100vh mobile, one pin on screen at a time.
- Scrubbed animations use `scrub: true` on the Lenis-driven ScrollTrigger; nothing scrubs `filter` or `box-shadow`; transforms and clip-path only.
- Reduced motion is a parallel design: every plate has a static layout defined above; the loader does not show; the physics list lays out in flow; the tunnel frames stack.
- The `Do not` list changes: a loader is allowed when it reports real readiness, lasts at most 1.2s, shows once per session and never on reduced motion. Percentage counters, marquees, custom cursors, magnetic buttons and greeting words stay banned. CSS 3D perspective is allowed; a second WebGL scene is still not.

## 10. Architecture

```
lib/themes.ts                 theme registry (name, tokens, description, scheme); generates CSS in globals via a build script (scripts/gen-themes.mjs) and feeds swatches, palette, tests
lib/sheet.ts                  breakpoints, cols, gap, page tokens shared by CSS (via @theme) and the overlay
lib/plates.ts                 plate registry (id, number, title, ref) used by the console and the ToC
lib/loader.ts                 readiness aggregator: fonts.ready, field ready, content mounted, above-fold images; exposes progress steps
lib/physics/toolbox.ts        Matter.js world builder: bodies from elements, walls from the container, sync loop, gravity flip, sleep
lib/motion/rules.ts           drawRules(el): ScrollTrigger batch for .rule elements
lib/motion/slice-flip.ts      split into strips, hover handlers
components/sheet/*.tsx        Sheet, Cell, Rule, PlateNumber, CornerMarks
components/console/*.tsx      SiteHeader (console), ConsoleLine, ThemeSwatches, MobileMenu, Monogram
components/loader.tsx         calibration overlay
components/plates/*.tsx       Hero, AboutBox, WorkStage (+ Timecode), Notes, Toolbox, Tunnel, Cloth, FooterConsole
components/grid-overlay.tsx   reads lib/sheet.ts
```

State: `useTheme` becomes `{ theme: ThemeName, set, cycle }`; `useUi` gains `menuOpen`; the field store gains mode `calibrate` and a `cell` of 8; `useConsole` (zustand) holds `plate`, `hover`, `progress`.

Error handling: Matter import failure or a thrown engine step logs once and falls back to the flow list; shader failure keeps the static SVG dither (existing); the loader has a hard 1500ms cap after which it exits regardless (a stuck resource never blocks the page); every ScrollTrigger is created inside `useGSAP` with a scope and reverted on unmount; Lenis is destroyed on route change (existing).

## 11. Quality gates

- Unit: theme registry contrast (every ink and ink-muted and accent on canvas, surface, surface-2 at least 4.5), token parity DESIGN.md vs registry, no dashes, sheet tokens parity between CSS and `lib/sheet.ts`, physics helpers (body sizing, wall placement, gravity flip pure functions), loader aggregator (order, cap, skip rules).
- E2E (desktop 1440x900 and Pixel 7, both motion preferences, at least three themes): no horizontal overflow on every route, axe clean, hydration clean, loader shows once per session and never with reduced motion, G overlay lines coincide with hairlines (sample the left edge of ten `.cell` elements against overlay column positions, tolerance 1px), each plate reaches its end state after scrolling to its end, toolbox tags stay inside the container, the mobile menu traps focus, T cycles themes and persists.
- Lighthouse: performance at least 0.9 on desktop and mobile presets, accessibility 1.0, LCP under 2.5s on mobile emulation, TBT under 200ms (Matter loads lazily, GSAP plugins load with the plates).
- Visual review in the in-app browser at 390, 768 and 1440 in signal, field and paper, with G on, before every checkpoint report.

## 12. Plan series

- Plan 04 Sheet: theme registry and six themes, theme.js migration, sheet CSS and utilities, cells and rules with drawing, overlay parity, console header with mobile menu and swatches, slice flip, loader, other pages migrated to the sheet. Tests updated.
- Plan 05 Plates: P/01 hero band and compress, P/02 about box, P/03 work stage and timecode, P/04 notes, P/06 tunnel, P/07 cloth and footer console, `/work` index arrangement.
- Plan 06 Toolbox and polish: Matter.js plate, palette commands, colophon update, Lighthouse mobile pass, memory and docs.
