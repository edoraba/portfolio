# Plan 04: Sheet, themes, console header, loader

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the site shell on the ruled sheet: a full-bleed 12-column grid every element sits on (and the G overlay coincides with), six verified themes from one registry, the console header with mobile menu, sliced-letter hover, and the calibration loader.

**Architecture:** One CSS grid (`.sheet`) with named column lines `c 1..13` replaces the padded container; cells carry hairlines on column lines; `.rule` elements draw on scroll via one ScrollTrigger batch. Themes live in `lib/themes.ts` and generate `app/themes.css` at build; stores read and write `data-theme` names. The loader aggregates real readiness signals and drives the field in a new `calibrate` mode.

**Tech Stack:** Next.js 16 App Router, Tailwind 4 (`@utility`, functional utilities), zustand, GSAP ScrollTrigger, Tempus, WebGL2 field (existing), Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-04-v2-ruled-sheet-design.md` sections 2, 3, 4, 5, 8, 10, 11.

---

## File map

- Create `lib/themes.ts`: `THEMES` array `{ name, label, description, scheme, tokens }`, `THEME_NAMES`, `DEFAULT_THEME = 'signal'`, `isThemeName()`, `nextTheme()`.
- Create `scripts/gen-themes.mjs`: writes `app/themes.css` (`:root` = signal, `[data-theme='x']` blocks) from `lib/themes.ts` (loaded through `tsx`-free approach: the registry is plain data in `lib/themes.data.mjs`, re-exported by `lib/themes.ts`).
- Create `lib/themes.data.mjs` (data), `app/themes.css` (generated, committed, checked by a test).
- Modify `public/theme.js`: legacy mapping, default signal.
- Modify `lib/theme-store.ts`: `ThemeName`, `set`, `cycle`.
- Replace `components/theme-toggle.tsx` with `components/console/theme-swatches.tsx` (keeps the sweep).
- Create `lib/sheet.ts` (breakpoint table shared by CSS comments and the overlay), sheet CSS in `app/globals.css` (`.sheet`, `.cell*`, `.rule`, `@utility col-*`, `@utility cole-*`).
- Create `components/sheet/{sheet,cell,rule,plate-number}.tsx`.
- Create `lib/motion/rules.ts` (`drawRules`), `components/sheet/rules-observer.tsx` (mounts once in layout, batches `.rule`).
- Modify `components/grid-overlay.tsx`: render as a sheet, hide columns beyond `--cols`.
- Create `lib/console-store.ts`, `lib/plates.ts`, `components/console/{site-header,monogram,console-line,mobile-menu,nav-cells}.tsx`; delete `components/site-nav.tsx`, `components/palette-trigger.tsx` (folded into header cells).
- Create `lib/motion/slice-flip.ts`, `components/flip-text.tsx`.
- Create `lib/loader.ts`, `components/loader.tsx`; modify `lib/field/store.ts` (mode `calibrate`, cell 8), `lib/field/shader.ts` (mode 3 unmasked full), `lib/field/quality.ts` (Cell type includes 8), `components/field-canvas.tsx` (floor for calibrate = 1), `components/field-mount.tsx` (mount when requested by loader).
- Migrate pages: `app/page.tsx` (shell only, plates come in Plan 05), `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/lab/*`, `app/writing/*`, `app/about|now|colophon` via `components/mdx-page.tsx`, `app/not-found.tsx`, `components/page-header.tsx`, `components/footer.tsx` (cells), `components/work-list.tsx`, `components/toc.tsx`.
- Tests: `tests/unit/themes.test.ts` (contrast, generated CSS parity, DESIGN.md parity), `tests/unit/loader.test.ts`, `tests/unit/sheet.test.ts`, `tests/e2e/sheet.spec.ts` (overlay parity), `tests/e2e/themes.spec.ts` (T cycles, persists, swatches), `tests/e2e/loader.spec.ts`, update `routes`, `a11y`, `hydration`, `motion` specs for new selectors.
- Docs: `DESIGN.md` (themes per name, sheet tokens, loader rule, do-not amendments), `README.md`, colophon changelog.

---

### Task 1: Theme registry, generated CSS, contrast test

**Files:** create `lib/themes.data.mjs`, `lib/themes.ts`, `scripts/gen-themes.mjs`, `app/themes.css`, `tests/unit/themes.test.ts`; modify `app/globals.css` (import themes.css, remove inline token blocks), `package.json` (`"themes": "node scripts/gen-themes.mjs"`, run in `prebuild` and `pretest`).

- [ ] Write `tests/unit/themes.test.ts`: for every theme, `contrast(ink, canvas|surface|surface-2) >= 4.5`, same for `ink-muted` and `accent`; `app/themes.css` equals the generator output (import the generator's `render()` and compare with the file); DESIGN.md `colors.<theme>` equals `tokens` for every theme.
- [ ] Run `pnpm vitest run tests/unit/themes.test.ts`, expect failure (module missing).
- [ ] Write `lib/themes.data.mjs` with the six themes from spec section 5 (hairline alpha 0.22 for signal, cobalt, ash; 0.10 field, phosphor; 0.12 paper; `accentInk` = canvas; `scheme`).
- [ ] Write `scripts/gen-themes.mjs` exporting `render()` and writing `app/themes.css` when run directly: `:root { ...signal; color-scheme: light }` then `[data-theme='name'] { ... }` for all six (signal included so `data-theme='signal'` is explicit).
- [ ] Write `lib/themes.ts` re-exporting the data with types (`ThemeName`, `Theme`, `THEMES`, `THEME_NAMES`, `DEFAULT_THEME`, `isThemeName`, `nextTheme`).
- [ ] Replace the token blocks in `app/globals.css` with `@import './themes.css';` (keep `@theme inline`). Remove the `prefers-color-scheme` fallback block (default is signal regardless of OS).
- [ ] Update DESIGN.md frontmatter `colors:` to six named blocks; update `tests/unit/tokens.test.ts` to compare against the registry instead of the CSS (delete the CSS parsing).
- [ ] Run unit tests, expect pass. Commit `feat(themes): six-theme registry with generated CSS and contrast test`.

### Task 2: Theme runtime (theme.js, store, T key, palette)

**Files:** modify `public/theme.js`, `lib/theme-store.ts`, `components/command-menu.tsx`; create `components/console/theme-swatches.tsx`; delete `components/theme-toggle.tsx`; update `tests/e2e/routes.spec.ts` (theme test), `tests/e2e/hydration.spec.ts` (`data-theme` regex), create `tests/e2e/themes.spec.ts`.

- [ ] `public/theme.js`: read `localStorage.theme`; map `dark` → `field`, `light` → `paper`; accept only the six names; otherwise `signal`. Keep `js` and `no-transitions`.
- [ ] `lib/theme-store.ts`: `theme: ThemeName`, `set(name)`, `cycle()`; `readInitial` reads the attribute and validates.
- [ ] `components/console/theme-swatches.tsx`: six `button`s in a `radiogroup` (`role="radio"`, `aria-checked`, `aria-label` = label), 12px squares coloured with the theme's canvas token via inline style, active one filled with ink; click runs the existing sweep (`document.startViewTransition` + polygon on `::view-transition-new(root)`, from the left when the target index is lower, from the right otherwise). Hover writes the theme label to the console store (Task 5); until then no-op.
- [ ] Global `T` key in the same key handler as `G` (move both into `components/console/hotkeys.tsx`): cycles the theme, ignored in inputs and when the palette or menu is open.
- [ ] Palette Site group lists all six themes (`Theme: Signal`, ...).
- [ ] `tests/e2e/themes.spec.ts`: T cycles from signal to field and persists on reload; the swatch radiogroup has six radios; `data-theme` after clicking Paper is `paper`; legacy `localStorage.theme = 'dark'` maps to `field`.
- [ ] Update `routes.spec.ts` theme test to click the `Paper` radio. Run e2e themes and routes, expect pass. Commit `feat(themes): signal default, swatches, T cycles, legacy mapping`.

### Task 3: Sheet CSS, cells, rules, overlay parity

**Files:** modify `app/globals.css`, `components/grid-overlay.tsx`; create `lib/sheet.ts`, `components/sheet/sheet.tsx`, `cell.tsx`, `rule.tsx`, `plate-number.tsx`, `lib/motion/rules.ts`, `components/sheet/rules-observer.tsx`, `tests/unit/sheet.test.ts`, `tests/e2e/sheet.spec.ts`.

- [ ] Tokens in `globals.css` `@layer base html`: `--page: clamp(16px, 4vw, 64px); --gap: 12px; --cols: 4; --cell-pad: 12px;` and `@media (min-width: 768px) { --gap: 16px; --cols: 6 }`, `@media (min-width: 1024px) { --gap: 24px; --cols: 12 }`, `@media (min-width: 1600px) { --page: calc((100vw - 1600px) / 2 + 64px) }`.
- [ ] `.sheet { display: grid; grid-template-columns: [page-start] var(--page) repeat(var(--cols), [c] minmax(0, 1fr)) [c] var(--page) [page-end]; column-gap: var(--gap); }` (with `repeat(var(--cols))` invalid in CSS for a custom property count, write the three explicit `repeat(4|6|12, ...)` under the same media queries).
- [ ] `@utility col-* { grid-column-start: c --value(integer); }` and `@utility cole-* { grid-column-end: c --value(integer); }`; `@utility col-full { grid-column: page-start / page-end; }`.
- [ ] `.cell { padding: var(--cell-pad); min-width: 0; }` and `.cell-l|r|t|b` borders `1px solid var(--hairline)`; `.rule { background: var(--hairline); height: 1px; }` `.rule-v { width: 1px; height: 100%; }`; `html.js[data-motion='full'] .rule:not(.is-drawn) { transform: scaleX(0); transform-origin: left }` (`scaleY` for `.rule-v`, origin top); `.rule { transition: transform 800ms var(--ease-editorial) }`.
- [ ] `lib/motion/rules.ts`: `drawRules(root: ParentNode)` uses `ScrollTrigger.batch('.rule', { start: 'top 90%', once: true, onEnter: batch => batch.forEach((el, i) => setTimeout(() => el.classList.add('is-drawn'), i * 60)) })`; returns a kill function. `components/sheet/rules-observer.tsx` (client, mounted in layout) calls it on mount and on route change (pathname effect) and reverts.
- [ ] Sheet components: `Sheet` (`as` prop, className merge, `role` passthrough), `Cell` (`l r t b` booleans, `col` and `end` responsive props map to the utilities), `Rule` (`vertical`), `PlateNumber` (`n`, renders `P/0n` in a mono cell with `Decode`).
- [ ] `grid-overlay.tsx`: render `<div class="guides"><div class="guides__sheet sheet"> 12 x <div class="guides__col">` with `.guides__col:nth-child(n + 5) { display: none }` below 768, `n + 7` below 1024; `.guides__col` takes `grid-column: span 1` so it falls on the same tracks. Corner label unchanged.
- [ ] `tests/unit/sheet.test.ts`: `lib/sheet.ts` exports `BREAKPOINTS = { sm: { cols: 4, gap: 12 }, md: { min: 768, cols: 6, gap: 16 }, lg: { min: 1024, cols: 12, gap: 24 } }` and the test asserts the globals.css media queries contain the same numbers (regex).
- [ ] `tests/e2e/sheet.spec.ts`: on `/` and `/work` at both viewports, toggle G, collect `getBoundingClientRect().left` of every `.guides__col` and of every `.cell-l` element; every cell left edge is within 1px of a column left edge. Expect failure until pages migrate (Task 4), so mark `test.fixme` until then and unfixme in Task 4.
- [ ] Commit `feat(sheet): named-line grid, cells, drawing rules, overlay parity`.

### Task 4: Migrate every page to the sheet

**Files:** modify `app/layout.tsx`, `app/page.tsx` (shell: hero cell, selected work cells, notes cells, plates later), `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/lab/page.tsx`, `app/lab/[slug]/page.tsx`, `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`, `app/not-found.tsx`, `components/page-header.tsx`, `components/mdx-page.tsx`, `components/work-list.tsx`, `components/toc.tsx`, `components/footer.tsx`; delete `page-x` and `site-container` utilities from `globals.css`.

- [ ] `PageHeader`: `<Sheet as="header"><PlateNumber col={1} /><Cell col={1} end={9} l t b><h1 className="display">..</h1><p ...></Cell></Sheet>`, on md `col 1 / end 7`, on sm `col 1 / end 5`.
- [ ] `MdxPage`: content `Cell col 1 end 9 (lg)`, ToC or nothing `col 9 end 13`; `.prose` measure inside the cell.
- [ ] `WorkList`: each item a row of cells: number `col 1 end 2`, title and summary `col 2 end 11`, year `col 11 end 13`, hairline top on the row (`Rule` full width in `col 1 end 13` before the cells).
- [ ] Case study: back link cell, title cell `col 1 end 10`, meta as a grid of `Cell` (`dt` label, `dd`), ToC `col 1 end 4`, body `col 4 end 11`.
- [ ] Footer: cells for the CTA (`col 1 end 8`), nav (`col 8 end 13`), then a row of four `Cell`s (`col 1 end 4`, `4 end 7`, `7 end 10`, `10 end 13`) for location, local time, elsewhere, motion; closing line `col 1 end 13`. `FooterField` unchanged.
- [ ] Remove `page-x` and `site-container` from CSS and grep the repo for leftovers (`rg "page-x|site-container"` must return nothing).
- [ ] Unfixme `tests/e2e/sheet.spec.ts`; run `pnpm test:e2e`, fix overflow or alignment until green (`routes`, `a11y`, `sheet`).
- [ ] Visual review at 390, 768, 1440 with G on, signal and field. Commit `feat(sheet): every page on the grid`.

### Task 5: Console header and mobile menu

**Files:** create `lib/console-store.ts`, `lib/plates.ts`, `components/console/{site-header,monogram,console-line,nav-cells,mobile-menu,hotkeys}.tsx`; modify `app/layout.tsx`, `lib/ui-store.ts` (`menuOpen`), `components/command-menu.tsx` (palette trigger cell), `lib/site.ts` (`status1`, `status2` strings), delete `components/site-nav.tsx`, `components/palette-trigger.tsx`; update `tests/e2e/a11y.spec.ts`, `routes.spec.ts` (skip link, nav names), create `tests/e2e/console.spec.ts`.

- [ ] `lib/console-store.ts`: `{ plate: string, hover: string | null, progress: { y: number, h: number }, setPlate, setHover, setProgress }`.
- [ ] `lib/plates.ts`: `PLATES = [{ id: 'hero', n: 1, title: 'Design, then build' }, ...]` for the seven home plates and a `usePlate(id)` hook that registers an IntersectionObserver on the plate element and sets `plate` in the store when it is the most visible.
- [ ] `Monogram`: inline SVG, five bars (`x` 0, 6, 12, 18, 24; heights 100, 60, 80, 40, 90 percent), `fill: currentColor`, `aria-hidden`, wrapped in the home `Link` with `aria-label={site.name}`.
- [ ] `ConsoleLine`: client, `aria-hidden`, mono, reads the store; on a Tempus tick at 10 Hz (`Tempus.add(fn, { fps: 10 })`) writes `progress` from `scrollY` and `document.documentElement.scrollHeight`; renders `P/0n TITLE · 0342/2380` or `> HOVER LABEL` (decoded through `Decode` keyed by the label so it re-runs on change).
- [ ] `NavCells`: four `Cell`s `col 9|10|11|12 end +1` with `FlipText` (Task 6; until then plain label) and the number in accent; `onPointerEnter` sets `hover`, `onPointerLeave` clears. Hidden below md.
- [ ] `SiteHeader`: `<header class="site-header sheet sticky top-0 z-50 bg-canvas" style={{ viewTransitionName: 'site-header' }}>` two rows of 40px on lg via `grid-auto-rows: 40px` (mobile: rows 48px). Row 1 cells: monogram `col 1 end 3`, status1 `col 3 end 9` (hidden below lg), nav cells; row 2: console `col 1 end 3`, status2 with `CopyEmail` inline `col 3 end 9`, `ThemeSwatches` `col 9 end 11`, palette trigger cell `col 11 end 12` (`Cmd K`), grid cell `col 12 end 13` (`G`, toggles the overlay, `aria-pressed`). Below md: row 1 monogram `col 1 end 2`, current swatch `col 2 end 3` (tap cycles), MENU button `col 3 end 5` (`aria-expanded`, `aria-controls="site-menu"`); row 2 console `col 1 end 5`.
- [ ] `MobileMenu`: `dialog`-like `div` (`role="dialog"`, `aria-modal`, `aria-label="Menu"`) fixed, `bg-canvas`, list of seven links in `display` size right-aligned with numbers 0 to 6, the six swatches at the bottom; focus trap (first and last focusable loop), Escape closes, closes on navigation; the field is requested in band mode while open (`request('menu')`).
- [ ] `Hotkeys`: one keydown listener for `g`, `t`, and `Escape` (closes the menu), ignoring editable targets and open palette.
- [ ] Layout: `<SiteHeader />` replaces `<SiteNav />`, `<Hotkeys />` and `<RulesObserver />` mounted once.
- [ ] `tests/e2e/console.spec.ts`: header has two rows at 1440 (height 80 within 1px); nav links are reachable by keyboard in order; console line changes text after scrolling 1000px; on Pixel 7 the MENU button opens the dialog, Tab stays inside, Escape closes and returns focus to the button; skip link still first.
- [ ] Run `pnpm test:e2e`; fix axe issues. Visual review. Commit `feat(console): two-row console header, mobile menu, hotkeys`.

### Task 6: Slice flip hover

**Files:** create `lib/motion/slice-flip.ts`, `components/flip-text.tsx`, `tests/unit/slice-flip.test.ts`; modify `components/console/nav-cells.tsx`, `components/copy-email.tsx` (label uses FlipText), `app/globals.css`.

- [ ] `lib/motion/slice-flip.ts`: pure `sliceClipPaths(n = 4)` returns `inset(top% 0 bottom% 0)` strings; `flipDelays(n, step = 30)` returns alternating directions `[{ delay: 0, dir: 1 }, { delay: 30, dir: -1 }, ...]`. Test both.
- [ ] `FlipText({ children, alt })`: renders the visible label as `n` absolutely positioned copies (aria-hidden) each clipped to its strip, over a `sr-only` real label; on hover/focus of the parent (`.flip` group class) strips translate X by `dir * 100%` then swap text to `alt` and return; implemented in CSS with `transition-delay` per strip and a `[data-flipped]` attribute toggled by pointer and focus events; reduced motion: text swaps with no translate.
- [ ] Apply to nav cells (`alt` = the number and label swapped, e.g. `WORK 1`), to the palette and grid cells (`Cmd K` → `Palette`, `G` → `Grid`) and to the email (`edoardo@redergo.com` → `Copy`).
- [ ] Commit `feat(motion): sliced-letter flip on header links`.

### Task 7: Calibration loader

**Files:** create `lib/loader.ts`, `components/loader.tsx`, `tests/unit/loader.test.ts`, `tests/e2e/loader.spec.ts`; modify `lib/field/store.ts`, `lib/field/quality.ts`, `lib/field/shader.ts`, `lib/field/renderer.ts` (mode mapping), `components/field-canvas.tsx`, `components/field-mount.tsx`, `app/layout.tsx`, `components/hero-mask.tsx` (widen words 78 → 100 when the loader exits), `app/globals.css`.

- [ ] `lib/loader.ts` (pure): `shouldShowLoader({ canRender, reduced, calibrated })`; `createReadiness(steps: string[], { min = 600, max = 1200, cap = 1500 }, now)` returns `{ mark(step), progress(), done: Promise<void> }` where `done` resolves when all steps are marked and at least `min` elapsed, or at `max` when all but images are marked, or at `cap` regardless. Tests: skip rules, ordering, min, max, cap (use fake timers).
- [ ] Field: `Cell` type `2 | 3 | 4 | 8`; `CELLS` for quality stays `[2, 3, 4]`; store `mode: 'hero' | 'band' | 'off' | 'calibrate'`; shader `uMode == 3` renders the full field with floor from the uniform; `FieldCanvas` floor for `calibrate` is 1 and applies no mask; `FieldMount` mounts as soon as any request exists (already) and the loader requests `'loader'` on first paint.
- [ ] `components/loader.tsx` (client, in layout before the page): if `shouldShowLoader` is false renders nothing. Otherwise renders a fixed overlay `bg-canvas/80` with the `Monogram` at 96px whose bars are `scaleY` from 0.15 to 1 as steps mark (fonts: `document.fonts.ready`; shader: field store `mounted`; content: mount effect; images: all `img[loading!=lazy]` in the first viewport decoded, or none; ready: `min` reached), a mono line `CALIBRATING · CELL 8` that updates to 4 and 2 as steps complete (calls `setCell`), sets field mode `calibrate` intensity 1; on `done`: sets `sessionStorage.calibrated = '1'`, releases `'loader'` (the hero takes the field back), animates `clipPath` inset from `0` to `0 0 100% 0` in 800ms hop and unmounts; dispatches `window.dispatchEvent(new Event('calibrated'))`.
- [ ] `HeroMask`: on `calibrated` event, animate `wdth` from 78 to 100 over 800ms (editorial) on each word via `font-variation-settings` keyframes.
- [ ] `tests/e2e/loader.spec.ts`: fresh context on `/` shows the overlay (`[data-loader]`) and it is gone within 2s, `sessionStorage.calibrated` is `1`; reload shows no overlay; with `reducedMotion: 'reduce'` no overlay; the hydration spec still passes (overlay markup identical server and client: it renders only after mount, from a `useEffect`, so SSR emits nothing).
- [ ] Lighthouse desktop: keep performance at least 0.9 (the overlay is DOM only; the field was already mounting).
- [ ] Commit `feat(loader): calibration entrance driven by real readiness`.

### Task 8: Docs, cleanup, CI

**Files:** `DESIGN.md`, `README.md`, `content/pages/colophon.mdx`, `AGENTS.md`, memory.

- [ ] DESIGN.md: sheet tokens under `spacing`, six themes under `colors`, loader rule under `motion`, `Do not` amendments (spec section 9), layout rule "Every section is a sheet; text lives in cells".
- [ ] Colophon changelog line `2026-09: v2, the ruled sheet: six themes, console header, calibration loader.` README: themes and hotkeys (G grid, T theme, Cmd K palette).
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e`; push; CI green.
- [ ] Update memory `portfolio-project-goals.md` with the v2 direction and plan status.
