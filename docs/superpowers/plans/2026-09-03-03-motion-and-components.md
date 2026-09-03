# Plan 03: Motion and Borrowed Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the typographic site its motion language and the components the research singled out: masked line reveals, mono decode, Lenis on home and work, native page transitions with a wipe and a shared element, the theme toggle as a designed moment, a command palette with playful commands, a grid overlay, a footer that brings the field back, a sticky table of contents on case studies, and a site-level motion toggle. Everything mobile first, everything with a reduced-motion parallel design.

**Architecture:** GSAP 3.15 (CustomEase, SplitText, ScrollTrigger) driven from the existing Tempus loop so the field, Lenis and GSAP share one clock. A `useMotion` store resolves the user's motion preference (OS setting or the site toggle) and every animated component reads it. Page transitions use React `<ViewTransition>` through the Next.js App Router with CSS keyframes (a clip-path wipe on the hop ease for typed navigations, a 200ms crossfade otherwise, the header and the field canvas anchored). The theme toggle uses `document.startViewTransition` with a polygon sweep. The palette is cmdk (MIT) styled with our tokens. The footer requests the field in band mode when it enters the viewport.

**Tech Stack:** gsap 3.15.0, @gsap/react 2.1.2, lenis 1.3.26 (root mode, autoRaf off), tempus 1.0.0, cmdk (latest 1.x), React `ViewTransition` (App Router canary), CSS view transition pseudo-elements.

References: `docs/research/05-components-to-borrow.md` sections C0, C1, C3, C4, C5, C6, C7, C8, C9, C12, C15, C17 and `docs/research/06-firsthand-notes.md`. Licences: GSAP Standard (free), Lenis MIT, cmdk MIT, Codrops values published, Next.js docs.

---

## File structure

```
lib/motion/
  gsap.ts            registers plugins once, CustomEases "editorial" and "wipe", Tempus drives gsap.updateRoot
  store.ts           useMotion: preference 'auto' | 'full' | 'reduced', resolved boolean, persisted
  decode.ts          shared 40ms ticker for mono label decode
  scrollspy.ts       useScrollspy(ids) with IntersectionObserver
components/
  smooth-scroll.tsx  Lenis root on home and work only, bridged to ScrollTrigger and Tempus
  line-reveal.tsx    SplitText lines with mask, reduced fallback
  decode.tsx         mono label that decodes once on viewport entry
  page-transition.tsx  <ViewTransition> wrapper with nav types for every page
  theme-toggle.tsx   FIELD / PAPER switch with polygon sweep (rewrite)
  command-menu.tsx   cmdk palette with navigation, theme, grid, motion, bw, negative, dither, copy email
  grid-overlay.tsx   12/6/4 column overlay plus baseline, G key, persisted
  motion-toggle.tsx  footer control bound to useMotion
  footer.tsx         rewrite: field band request, meta dl (location, local time, status), palette hint
  local-time.tsx     Turin clock, updates once a minute
  toc.tsx            sticky table of contents for case studies
  site-nav.tsx       add the palette trigger and view-transition-name
app/globals.css      motion tokens, view transition CSS, palette, overlay, toc styles
app/*/page.tsx       wrap in PageTransition, mark shared elements
tests/unit/motion.test.ts
tests/e2e/motion.spec.ts
```

## Motion tokens (DESIGN.md already lists them; add the editorial ease)

| Token            | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| --ease-editorial | cubic-bezier(0.625, 0.05, 0, 1)                              |
| --ease-hop       | cubic-bezier(0.56, 0, 0.35, 0.98)                            |
| --ease-out-expo  | cubic-bezier(0.16, 1, 0.3, 1)                                |
| line reveal      | 0.8s, stagger 0.08 (capped at 0.5s total), yPercent 110 to 0 |
| decode           | 40ms ticks, 12 steps, once                                   |
| route wipe       | 1000ms hop, old page fades 300ms                             |
| crossfade        | 200ms                                                        |
| theme sweep      | 600ms hop (400ms under 768px)                                |
| palette          | no open animation (Emil: 100x a day actions do not animate)  |

---

### Task 1: Motion foundation

- [ ] Install: `pnpm add cmdk`.
- [ ] `lib/motion/gsap.ts`:

```ts
'use client'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Tempus from 'tempus'

let ready = false
export function setupGsap() {
  if (ready || typeof window === 'undefined') return gsap
  ready = true
  gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText)
  CustomEase.create('editorial', '0.625, 0.05, 0, 1')
  CustomEase.create('wipe', '0.56, 0, 0.35, 0.98')
  // One clock: Tempus drives GSAP (and the field, and Lenis).
  gsap.ticker.remove(gsap.updateRoot)
  Tempus.add(({ time }) => gsap.updateRoot(time / 1000), { order: -10, label: 'gsap' })
  gsap.ticker.lagSmoothing(0)
  return gsap
}
export { gsap, ScrollTrigger, SplitText }
```

- [ ] `lib/motion/store.ts`: zustand store `{ preference: 'auto' | 'full' | 'reduced', reduced: boolean }` where `reduced` = preference === 'reduced' || (preference === 'auto' && OS reduce). Persist preference in localStorage key `motion`; listen to the media query. Export `isReduced()` for non-React code (the field's `canRenderField` must call it instead of the raw media query).
- [ ] Unit tests for the resolution table and the decode step function.
- [ ] Commit: `feat(motion): gsap setup on the shared clock and motion preference store`.

### Task 2: Line reveal and decode

- [ ] `components/line-reveal.tsx`: client wrapper `<LineReveal as="h1" className>` that, when not reduced, runs `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, aria: 'auto', onSplit(self) { return gsap.fromTo(self.lines, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: Math.min(0.08, 0.5 / self.lines.length), ease: 'editorial', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }) } })` after `document.fonts.ready`; when reduced, a 400ms autoAlpha fade. Never used on body text, never on the hero (the hero has its own SVG). Text with `text-wrap: balance` is disabled on split elements (`text-wrap: initial`).
- [ ] `lib/motion/decode.ts` + `components/decode.tsx`: shared ticker (40ms), `decode(el, final, steps = 12)`, `aria-label` set before decoding, width locked, triggered once at 30 percent visibility, skipped when reduced. Use on: nav numbers, index numbers in WorkList and MarginIndex, case meta `dt` labels, footer dl labels.
- [ ] Apply LineReveal to: PageHeader h1 and lede, case study h1 and summary, home section labels are plain (no reveal on 11px labels), WorkList titles (lines).
- [ ] Browser review at 1440 and 390, both themes, with and without reduced motion (emulate in devtools: `matchMedia` override through the site toggle later; for now use Chrome devtools rendering emulation or the OS setting). Commit: `feat(motion): masked line reveals and mono decode`.

### Task 3: Lenis on home and work

- [ ] `components/smooth-scroll.tsx`: client; mounts `new Lenis({ lerp: 0.08, autoRaf: false, smoothWheel: true, syncTouch: false })`, `lenis.on('scroll', ScrollTrigger.update)`, `Tempus.add(({ time }) => lenis.raf(time), { order: -5 })`; destroyed on unmount; not created when reduced. Rendered by `app/page.tsx` and `app/work/page.tsx` only (as a sibling component, root mode so no wrapper divs). Add `data-lenis-prevent` to the palette list.
- [ ] Check the field's scroll mapping still reads `window.scrollY` correctly (root mode keeps native scroll) and that anchor links and the skip link still work.
- [ ] Commit: `feat(motion): lenis smooth scroll on home and work`.

### Task 4: Page transitions

- [ ] `components/page-transition.tsx`: `<ViewTransition enter={{ 'nav-forward': 'wipe-up', 'nav-back': 'wipe-down', default: 'fade' }} exit={{ 'nav-forward': 'fade-out', 'nav-back': 'fade-out', default: 'fade-out' }} default="none">{children}</ViewTransition>`. Wrap the content of every `page.tsx` (never the layout).
- [ ] Links: WorkList, MarginIndex, home teasers, nav items get `transitionTypes={['nav-forward']}`; "back" links inside case studies and a "Back to work" link get `['nav-back']`.
- [ ] Shared element: in WorkList wrap the `01` index span and the title in `<ViewTransition name={`work-${slug}`} share="morph" default="none">`; in the case study header wrap the same pair. Prefetch is on by default for `Link` in view.
- [ ] `app/globals.css`:

```css
::view-transition {
  pointer-events: none;
}
::view-transition-group(site-header),
::view-transition-group(field-canvas) {
  animation: none;
}
::view-transition-old(site-header),
::view-transition-old(field-canvas) {
  display: none;
}
::view-transition-new(site-header),
::view-transition-new(field-canvas) {
  animation: none;
}
::view-transition-old(.fade-out) {
  animation: 300ms var(--ease-out-expo) both vt-fade reverse;
}
::view-transition-new(.fade) {
  animation: 200ms var(--ease-out-expo) both vt-fade;
}
::view-transition-new(.wipe-up) {
  animation: 1000ms var(--ease-hop) both vt-wipe-up;
}
::view-transition-new(.wipe-down) {
  animation: 1000ms var(--ease-hop) both vt-wipe-down;
}
::view-transition-group(.morph) {
  animation-duration: 600ms;
  animation-timing-function: var(--ease-hop);
}
@keyframes vt-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes vt-wipe-up {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0);
  }
}
@keyframes vt-wipe-down {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 150ms !important;
    animation-name: vt-fade !important;
  }
}
```

The header gets `style={{ viewTransitionName: 'site-header' }}` and the canvas `view-transition-name: field-canvas` in `.field-canvas`. The site-level motion toggle sets `data-motion="reduced"` on `html`; add the same 150ms rule under `html[data-motion='reduced']`.

- [ ] Browser review: navigate home to work to a case and back; the wipe plays, the header and the field do not move, the index number and title morph. Commit: `feat(motion): native page transitions with wipe and shared element`.

### Task 5: Theme toggle as a designed moment

- [ ] Rewrite `components/theme-toggle.tsx`: `<button role="switch" aria-checked={theme === 'light'} aria-label="Theme">` showing `FIELD / PAPER` in mono, the active word in `--accent`, a 1px indicator under the active word. On click: if reduced or no `startViewTransition`, swap instantly; else `await document.startViewTransition(() => flushSync(() => setTheme(next))).ready` then `document.documentElement.animate({ clipPath: ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'] }, { duration: 600, easing: 'cubic-bezier(0.56, 0, 0.35, 0.98)', pseudoElement: '::view-transition-new(root)' })` (right to left when going back to field). CSS: `::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }` scoped by a `data-theme-switching` attribute so it does not fight route transitions.
- [ ] Field: `readColors` already reacts to `data-theme`. Commit: `feat(theme): field and paper switch with a polygon sweep`.

### Task 6: Command palette and grid overlay

- [ ] `components/command-menu.tsx` (cmdk): opens with Cmd+K, Ctrl+K and `/` outside inputs; groups: Go (Home, Work, Lab, Writing, About, Now, Colophon), Index (every work, lab and writing item), Site (Theme field, Theme paper, Grid, Motion full, Motion reduced, Motion auto), Play (Black and white, Negative, Dither 2 to 8, Reset), Contact (Copy email). Styling: hairline panel, radius 0, `max-width: 560px`, top 15vh, mono 13px, selected item shows a `>` prefix in accent. Mobile: full-width bottom sheet, input 16px, `padding-bottom: env(safe-area-inset-bottom)`. No open animation.
- [ ] `components/grid-overlay.tsx`: fixed overlay, 12 columns at lg, 6 at md, 4 below, sharing `--spacing-page` and a 24px gutter, baseline 8px, viewport width in a mono corner label; `G` toggles when focus is not editable; persisted in localStorage; `aria-hidden`.
- [ ] Palette trigger in the nav (`⌘K` mono, `aria-label="Open command menu"`) and a hint in the footer. Colophon gains a line "Press G for the grid, Cmd+K for the palette".
- [ ] Commit: `feat: command palette and grid overlay`.

### Task 7: Footer as a destination, local time, motion toggle, case study ToC

- [ ] `components/footer.tsx` rewrite: top hairline, CTA line with CopyEmail, footer nav (numbered, mono), `dl` with Location (Turin, IT, 45.0703 N 7.6869 E), Local time (`<LocalTime />`, updates each minute, `aria-live="off"`), Status (`TODO(edoardo)` availability line), Colophon link, `⌘K` hint, motion toggle (`components/motion-toggle.tsx`, three-state `Motion: auto / full / reduced`). When the footer enters the viewport (IntersectionObserver), it sets the field `requested` true and `mode` band with `band` equal to the footer's viewport range (recomputed on scroll via the field controller); leaving resets. On home the hero controller owns the mode above the fold; the footer takes over below.
- [ ] `lib/motion/scrollspy.ts` + `components/toc.tsx`: for case studies, collect `h2[id]` from the rendered MDX (server side: parse headings from the compiled body is not available, so the ToC reads the DOM on mount), sticky at lg in a left column, `aria-current` on the active item, 1px accent rule; below lg a `<details>` "On this page" above the body. Layout: case body in columns 4 to 10 at lg with the ToC in 1 to 3.
- [ ] Commit: `feat: footer with field band, local time and motion toggle; case study table of contents`.

### Task 8: Tests, review, docs

- [ ] `tests/e2e/motion.spec.ts`: palette opens with Ctrl+K and closes with Escape and returns focus; `G` toggles the overlay; theme switch is a `role=switch` and flips `data-theme`; navigating from /work to a case study lands on the right h1 (transition does not block); with reduced motion emulated no `.line` masks exist and Lenis is not started (`html` has no `lenis` class).
- [ ] Unit: motion store resolution, decode steps, scrollspy active index logic.
- [ ] Browser review of every route at 1440 and 390 in both themes, with and without reduced motion; Lighthouse must stay 100.
- [ ] Update DESIGN.md motion frontmatter (editorial ease, palette rule), colophon changelog, README. Commit, push, CI green.

## Self-review against the spec

Spec 6 (motion): tokens, choreography rules, reveals, decode, transitions, Lenis scope, interruptible hovers (CSS), reduced motion parallel design and visible toggle: Tasks 1 to 7. Spec 7 components: SiteNav additions, LineReveal, Decode, CommandMenu, ThemeToggle, Footer, GridOverlay delivered; TypeTester and LabFrame remain for Plan 05, WorkCard covers for Plan 04. Spec 10 gates: axe, keyboard path for the palette, reduced motion exercised in Playwright, Lighthouse 100. Mobile rule: bottom sheet palette, 4-column overlay, footer stacking, ToC as details.
