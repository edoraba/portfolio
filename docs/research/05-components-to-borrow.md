# 05. Components to borrow: implementation catalogue

Research date: 3 September 2026. Built on 01-portfolios.md and 02-reference-sites.md, plus about 95 additional WebFetch and WebSearch calls against GitHub repos, GSAP docs, Codrops write-ups (Guignand, HAOQI, Rocca, Lallé/Monavon, Michelini), Awwwards case pages, the Next.js view-transitions guide, and the live competitor sites. Where code is quoted it was fetched from the source named. Where a site is closed, the description is reconstructed from the Awwwards feature list, the Codrops article and the visible DOM, and is marked "reconstructed".

Target stack for every "adapt" line: Next.js 16, React 19, Tailwind 4 tokens (`--accent`, `--ink`, `--canvas`, `--hairline`), GSAP 3.15 with all plugins, Lenis, a WebGL2 dither field behind the home hero, two themes (near-black "field" and warm "paper"), Bricolage Grotesque variable plus Geist Mono, radius 0, hairlines instead of shadows. Hard rules: no percentage preloader, no custom cursor, no marquee, no magnetic buttons, no curved sticky footer, no image-follows-cursor lists, no greeting-word intro, fully responsive at 390px, reduced motion as a parallel design.

Licence legend: MIT = copy freely with notice. ISC = same as MIT in practice. "Codrops demo" = MIT unless the repo says otherwise (the two checked without a LICENSE file are flagged). "Attribution licence" = usable as reference only, do not copy files. "Closed" = describe and rebuild, never copy assets.

---

## Part A. Open-source sources index

| Source                                | URL                                                                                                                            | Licence                                                             | Take from it                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Bruno Simon folio-2025                | github.com/brunosimon/folio-2025                                                                                               | MIT (sounds CC0)                                                    | 15-stage game loop ordering, KTX2/ETC1S asset pipeline (`npm run compress`), quality presets by device, input agnosticism         |
| Henry Heffernan portfolio             | github.com/henryjeff/portfolio-website and /portfolio-inner-site                                                               | MIT                                                                 | Split-repo pattern (3D shell, 2D iframe OS); do not copy the metaphor                                                             |
| Brittany Chiang v4                    | github.com/bchiang7/v4                                                                                                         | MIT (asks for a credit link)                                        | Skip-to-content link, numbered nav counters, side email rail                                                                      |
| davidhckh portfolio-2025              | github.com/davidhckh/portfolio-2025                                                                                            | Attribution licence, no commercial reuse of substantial parts       | Reference only: Vue 3 + GSAP + Lenis + Three + Howler, per-language project content files, `src/three/` shader demos              |
| darkroom.engineering Satus            | github.com/darkroomengineering/satus                                                                                           | MIT                                                                 | Next + Tailwind 4 + CSS Modules, Lenis wiring, Tempus ticker, `lib/features` gating for WebGL, grid debug overlay, llms.txt route |
| Lenis                                 | github.com/darkroomengineering/lenis                                                                                           | MIT                                                                 | ScrollTrigger bridge, `prefersReducedMotion` flag, `lenis/react`                                                                  |
| cmdk                                  | github.com/pacocoursey/cmdk                                                                                                    | MIT                                                                 | Command palette primitives, nested pages, data-attribute styling                                                                  |
| Sonner / Vaul                         | github.com/emilkowalski/sonner, /vaul                                                                                          | MIT                                                                 | Toast and drawer motion values, `translateY(100%)` hide, iOS drawer curve                                                         |
| Emil Kowalski animation standards     | github.com/emilkowalski/skills (review-animations/STANDARDS.md)                                                                | MIT repo                                                            | 43 timing and easing rules (quoted in C0)                                                                                         |
| Osmo x Codrops 5 GSAP demos           | tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/ and codepen.io/osmosupply | Codrops/CodePen educational (MIT-style)                             | Masked SplitText reveal values, DrawSVG scribble, MorphSVG toggle, Inertia dot grid                                               |
| Codrops EaseReverseClipMenu           | github.com/codrops/EaseReverseClipMenu                                                                                         | MIT                                                                 | Clip menu with `easeReverse`, open vs close easing split                                                                          |
| Codrops Astro + Barba transitions     | github.com/Ibaliqbal/codrops-barbajs-page-transition                                                                           | No LICENSE file found (treat as reference)                          | Clip-path overlay via `--clip` CSS var, CustomEase "hop", SplitText lifecycle                                                     |
| Codrops scroll-revealed WebGL gallery | github.com/J0SUKE/gsap-threejs-codrops                                                                                         | MIT                                                                 | Flip thumbnail into detail, reveal uniform 1.6s, ticker-driven scroll                                                             |
| Codrops infinite gallery + Flip       | github.com/surya-aditya/codrops-infinite-scroll-and-content-transition                                                         | Not verified                                                        | Observer-driven wheel + touch, Flip.from 1.2s power4.inOut, Flip.fit close                                                        |
| Codrops grid to preview               | github.com/gwen-bo/codrops-grid-to-preview                                                                                     | MIT                                                                 | Cross-shaped clip-path polygon preview, 100ms hover debounce, dual timelines                                                      |
| Codrops SVG mask scroll transitions   | github.com/Hiro-kiii/Scroll-Transition                                                                                         | MIT                                                                 | Blinds and grid masks, scrub 2 to 2.5, stagger 0.02                                                                               |
| Codrops Bayer dither background       | github.com/zavalit/bayer-dithering-webgl-demo                                                                                  | No LICENSE file found (the Bayer maths is public knowledge)         | `Bayer2/4/8/16` GLSL macros, 0.2 ms at 4K, 3 KB                                                                                   |
| Niccolò Fanton dithering shader       | github.com/niccolofanton/dithering-shader                                                                                      | MIT                                                                 | `DitheringEffect` for the postprocessing library: gridSize, pixelSizeRatio, grayscaleOnly, invertColor                            |
| Maxime Heckel halftone                | blog.maximeheckel.com/posts/shades-of-halftone/                                                                                | Blog (reference)                                                    | Halftone GLSL, CMYK angles, fwidth AA                                                                                             |
| Vercel react-view-transitions-demo    | github.com/vercel-labs/react-view-transitions-demo                                                                             | Licence not shown on the page (Vercel Labs demos are typically MIT) | Complete `globals.css` for morph, slide, crossfade, reduced motion                                                                |
| Glyphrow (repo name fontproof)        | github.com/quitequinn/fontproof                                                                                                | ISC                                                                 | Accessible variable-axis type tester, vanilla + React                                                                             |
| Medienbäcker layout guides            | medienbaecker.com/articles/layout-grids-in-the-browser                                                                         | Blog (reference, short)                                             | Ctrl+G grid overlay with localStorage and breakpoint column counts                                                                |
| Akash Hamirwasia theme toggle         | akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/                                           | Blog (reference, short)                                             | `startViewTransition` + circle clip-path from the click point                                                                     |
| Maxime Heckel scrollspy               | blog.maximeheckel.com/posts/scrollspy-demystified/                                                                             | Blog (reference)                                                    | `useScrollspy` IntersectionObserver hook                                                                                          |
| GSAP docs                             | gsap.com/docs/v3                                                                                                               | Docs                                                                | SplitText mask/autoSplit/onSplit/aria, Flip, ScrollTrigger pin, Observer, matchMedia, CustomEase, ScrambleText                    |
| Next.js view transitions guide        | nextjs.org/docs/app/guides/view-transitions                                                                                    | Docs                                                                | `<ViewTransition name share default enter exit>`, `Link transitionTypes`, header anchoring                                        |

Not reachable this session: github.com/raunofreiberg/ui (404), ui.rauno.me (404), codepen.io pens directly (403; the Codrops article values are used instead), thibaultguignand.com (JS shell), simone-dev.com (DNS), obys.agency/grids (404).

---

## Part B. Closed sites, described for rebuilding

Each entry: 2 or 3 components, with structure, trigger, timing (stated where the source states it, otherwise marked "est."), mobile behaviour and accessibility.

### B1. Thibault Guignand, thibaultguignand.com (Codrops, May 2026; Vite + React 18 + GSAP + OGL + Lenis)

1. Line reveal = SplitText lines + ScrambleText + clip-path wipe. Each line is a masked element; `gsap.to(line, { scrambleText: { text, chars: 'A!B@C#D$E%F&G*H?J[K]L{M}N=O+P-QRSTUVWXYZ', revealDelay, speed }, ease: 'none' })` runs while `onStart` fires a parallel `clipPath: 'inset(0 0% 0 0)'` tween, 0.6s power2.out, from `inset(0 100% 0 0)`. Line height is locked and text pre-filled at final width before scrambling so nothing reflows. Effect: "the user only ever sees the part of the text that's already legible". Trigger: viewport entry (once) and page enter.
2. "Next project" scroll morph. A pinned block at the end of each case page. `ScrollTrigger` with `scrub: 1`; `onUpdate` mutates the DOM directly (no React state): counter `textContent` 0 to 100, background `scale` 1.3 to 1.0, `clipPath` from `inset(20% 40% 20% 40%)` to `inset(0 0 0 0)`, SVG ring `strokeDashoffset = C - progress * C`. At 100 percent, and only if the user has passed through low progress first (guard against phantom navigation on refresh), it navigates. A click spawns a GSAP tween of the same progress value to 1 and scrolls in parallel, so click and scroll produce identical frames.
3. Page transition = GSAP fade + View Transitions API. Preload the route chunk and hero image first, then a staged fade: WebGL background, grid overlay, side texts fade to `opacity 0` over 0.3s power2.inOut at t=0; content over 0.35s at t=0.25. `await Promise.all([chunkReady, imageReady])`, then `startViewTransition(() => flushSync(() => navigate(path)))`. Idle guard: the rAF loop stops after 90 frames without pointer input. Reduced motion: "a real, degraded version that still conveys the same intent without the vestibular cost" (Cassie Evans' framing): scramble and wipes become opacity, the flowmap is off, the scroll morph still counts but does not scale.
   Mobile: pointer effects (flowmap) off, scroll morph kept, the video carousel falls back to native `<video>` outside transitions. Accessibility: SplitText `aria: 'auto'`, text pre-filled so screen readers get the final string immediately.

### B2. Francesco Michelini, francescomichelini.com (Folio23, Nuxt 3 + GSAP + Lenis; design Unlearn Studio)

1. Numbered footer nav "0 Home / 1 Projects / 2 Info" in mono, plus a header pair "Projects / Info" and a toggle menu. Numbers are plain text, not CSS counters, so they survive without styling.
2. Project metadata block with `//` prefixes: `Year // 2021`, `Agency // Fanfanfan`, `Role // Front-end Development / WebGL Development`, `Awards // Site of the Day, Dev Award...`. A carousel (Prev/Next) of case headers; the header image is the shared element between list and case (Awwwards features: "Projects Listing (Scroll)", "Homepage Gallery", "Single Case Study").
3. "Color Theme Switching" is a listed feature: single accent #c4ff58 on dark, switched to light. No published detail; a two-token swap on `html[data-theme]` (reconstructed).
   Scores: Accessibility 7.2, the best among Italian portfolios. Footer signifier "F/23" as a version stamp. Mobile: "Mobile Screens" is a listed feature; the carousel becomes a vertical list. Avoid: its percentage preloader.

### B3. Gionatan Nese, gionatannese.com (2026, Three.js + GSAP, sound)

1. Numeric nav "1 Creative Space / 2 Projects / 3 About" with logo "GN .D" as home. Numbers are the primary label on mobile, words on desktop (reconstructed).
2. Two lists: "Selected Work" rows (title link, category tags, description capped at about 120 characters) and "Explorations" cards (Blob, Athena, Minerals, Ferrari 330 P4) with a "View Case" action. Footer counter "001" per case.
3. Preloader, page transitions, interactive avatar, custom 404 and a sound toggle are all Awwwards-listed features. Palette strictly #000/#FFF. Take the two-list split and the numeric nav, not the preloader.

### B4. Michele Mazzucco, michelemazzucco.it (Next.js)

1. Six numbered principle cards, each a bold sentence plus one line: "Quality creates gravity. Craft is strategic." / "Obsessed in solving problems." / "Self starter attitude." / "Shipping, not polishing images." / "Explore form, refine against reality." / "Design is a team game." Static, numbered 01 to 06.
2. Work as three dated rows (Portchain 2018 to now, Beefree 2015 to 2018, Incode 2014 to 2018) plus Side projects (Homegym 2025, Agata 2017, Kenzai 2017). Photography strip of four captioned images (Monte Dolada, keyboard). Footer "Made in the dolomites". No theme toggle. Take: the principles block and place-as-identity photography.

### B5. Jesper Landberg, jesperlandberg.com

1. Hero as three plain sentences: name and role ("design engineer"), one line of what he builds, credentials as numbers ("74 awards: 30x Awwwards, 37x FWA, 3x Webby, 2x Lovie").
2. Featured (7) list of `<a>` rows: project name plus one-sentence description; a single link "Full index, every project by name" switches to the dense list. Newsletter, socials, email and an `llms.txt` page in the footer. Take: the two density modes and the llms.txt.

### B6. Antoine Wodniack, wodniack.dev (Astro + GSAP + WebGL)

1. "Change contrast" toggle in the nav: swaps the hot pink #f40c3f on #160000 pair for a higher-contrast pair. Same mechanism as a theme toggle but framed as accessibility.
2. Project grid items carry mono ID codes "#3vva-0000/34" (hash, four-char code, running index over total). 34 items link out to live sites. 3D gallery of desk photos 2006/2016/2020 and old portfolio screenshots 2011/2014/2021 as the "about". Footer "Coding my way since 1987". Take: the mono ID scheme and the contrast toggle idea.

### B7. Grégory Lallé, gregorylalle.com (design Thomas Monavon; SOTD Oct 2024; single colour #111111, WPO 8.2)

1. Homepage loader reveal into a numbered project grid 0 to 10 (Orage, Quechua SS25, Thibaud Fellay, Pebble, Angus Emmerson, Mooders, Theud, Storm, Denise, Firm). Each item has hash anchors (`#orage`), so the "works focus view" is URL state: clicking a number zooms the grid to that work and updates the hash (reconstructed from the DOM).
2. Works page transition and focus view, page transitions, About and 404 are the listed features. Monavon: "no WebGL, no unnecessary animations, just a clean and original design". Take: hash-addressable focus state and the discipline of one colour.

### B8. Davide Baratta, davidebaratta.com (built by Michelini: Astro, Storyblok, Taxi.js, PiecesJS, GSAP, Lenis)

1. Draggable project grid, about 14 items, each with title, year and paired thumbnails; nav Work / Information / Archive. `data-taxi` containers for transitions. Footer with coordinates "51.5072° N, 0.1276° W". Take: the coordinates line (Turin: 45.0703° N, 7.6869° E) and Archive as a third nav item.

### B9. Luca Volino, lucavolino.com (GSAP + Barba + WebGL)

1. Nav Work / About / Lab / Contact me. "Design Lab" section: four cards (EcoRush, Inner Test, Momentum, Copy Notion Table) with thumbnail and description and a "View all experiments" link. Footer in four columns: Explore, Get in touch, Social, Legal. Take: Lab teaser of four plus "view all".

### B10. Simone Andreotti, simone-dev.com (unreachable this session; from 01-portfolios.md)

1. Rotating hero messages that change on return visits (localStorage visit counter). 2. Lab cards with video previews. 3. Spiral card nav for Lab / Work / Stack (novelty; skip). Take: return-visit awareness only.

### B11. Yann-Edern Gillet, yannglt.com

1. Identity card block: Name / Role (Software Designer, Linear) / Focus (Developer Experience) / Location (Paris, France) as a label-value grid. 2. Mono identifier strings such as "LF-11235813-21345892-150242392" as decorative provenance. 3. Projects tagged "xp" (explorations) vs "li" (Linear). Footer in three groups: Me (Index, About, Moodboard, Writing), Work (Now, Track Record, Feed), Connect (Contact, Twitter, Instagram, RSS). Changelog page. Take: Changelog, identity card, two-letter tags.

### B12. Hayden Bleasel, haydenbleasel.com

1. Home page is a timeline of age 0 to 33 paired with years 1993 to 2026; each entry is a paragraph with inline links to launches and acquisitions. The same timeline is repeated as a structured list below for accessibility. Nav About / Writing / Speaking / Press. Take: a compact version (a "Track record" year list) rather than the whole hero.

### B13. Emil Kowalski, emilkowal.ski

1. Hero: name, "Design Engineer", one-paragraph bio. 2. Projects as four rows (aiforui.dev, Sonner, animations.dev, Vaul). 3. Writing as ten titled links. Newsletter block. Everything is text; the proof is the components. His rules are in C0.

### B14. Rauno Freiberg, rauno.me/craft

1. Craft page: single column, reverse chronological; each entry is a thumbnail or video (base64 LQIP), title, month and year, and a link labelled "View production" or "Read essay". Entries seen: Posters (Aug 2026), History of Software Design (Feb 2026), DD System (Jun 2026), Devouring Details (Jul 2025), Testimonials (Sep 2025), X-Ray Interaction (May 2024), Designing Depth (Jul 2024), SwiftUI Dock (Dec 2023). Bottom nav Home / Craft / Projects. Take: this exact list format for the Lab.

---

## Part C. Component catalogue

Each component: name, best reference, source and licence, implementation notes (structure, CSS, GSAP or CSS timing, easing), mobile behaviour, accessibility, one-line adaptation to this site.

### C0. Motion tokens to reuse everywhere

Quoted rules from `emilkowalski/skills/review-animations/STANDARDS.md` (MIT repo):

- Actions done 100+ times a day (keyboard shortcuts, command palette): "No animation. Ever." Tens of times a day (hover, list navigation): remove or reduce. Rare: can add delight.
- Enter and exit: `ease-out`. Move or morph: `ease-in-out`. Hover and colour: `ease`. Constant motion: `linear`.
- Strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`. Strong ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)`. iOS drawer `cubic-bezier(0.32, 0.72, 0, 1)`.
- Button feedback 100 to 160ms; tooltips 125 to 200ms; dropdowns 150 to 250ms; modals and drawers 200 to 500ms; UI under 300ms.
- Never `scale(0)`; start from `scale(0.9 to 0.97)` plus `opacity 0`. Press: `scale(0.97)` on `:active`, 160ms ease-out.
- Springs: `{ type: "spring", duration: 0.5, bounce: 0.2 }`, bounce 0.1 to 0.3.
- Stagger group entrances 30 to 80ms. Add `filter: blur(2px)` during crossfades.
- Reduced motion: keep opacity and colour changes, drop transform motion.

Editorial values (Codrops, Osmo): `CustomEase.create("osmo", "0.625, 0.05, 0, 1")`; lines 0.8s stagger 0.08; words 0.6s stagger 0.06; chars 0.4s stagger 0.008; page wipe `CustomEase.create("hop", "0.56, 0, 0.35, 0.98")` 1.0s; content exit 0.6 to 0.8s power4.in; content enter expo.out 0.8s with 0.2 to 0.35s delay; camera or shader 2.0s expo.inOut.

Proposed tokens for this site:

```css
:root {
  --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-inout-strong: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-editorial: cubic-bezier(0.625, 0.05, 0, 1); /* Osmo */
  --ease-wipe: cubic-bezier(0.56, 0, 0.35, 0.98); /* hop */
  --dur-ui: 160ms;
  --dur-pop: 200ms;
  --dur-panel: 400ms;
  --dur-line: 0.8s;
  --stagger-line: 0.08s;
  --dur-wipe: 1s;
}
```

```ts
// motion.ts (GSAP side)
gsap.registerPlugin(CustomEase)
CustomEase.create('editorial', '0.625, 0.05, 0, 1')
CustomEase.create('wipe', '0.56, 0, 0.35, 0.98')
export const T = {
  line: 0.8,
  lineStagger: 0.08,
  word: 0.6,
  wordStagger: 0.06,
  wipe: 1,
  exit: 0.7,
  enter: 0.8,
}
```

Reduced motion as a parallel design, the mechanism (GSAP matchMedia docs, shape verbatim):

```js
const mm = gsap.matchMedia()
mm.add(
  { full: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' },
  (ctx) => {
    const { reduced } = ctx.conditions
    // build BOTH variants here; the reduced one uses opacity and colour only: no pin, no scrub, no scramble
    return () => {} // cleanup runs automatically when the query flips
  },
)
```

Rule of thumb (CSS-Tricks "No Motion Isn't Always prefers-reduced-motion", Guignand, Rocca): keep fades, colour, small scale; remove large translation, parallax, zoom, autoplay loops, scramble, pinning. Default CSS to the reduced version and enhance inside `@media (prefers-reduced-motion: no-preference)`:

```css
@keyframes modal-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: no-preference) {
  @keyframes modal-enter {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
```

Lenis exposes `lenis.prefersReducedMotion` and disables smoothing itself under `reduce`. The Lenis + ScrollTrigger bridge, verbatim from the README:

```js
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

Defaults: `lerp 0.1`, `duration 1.2`, `easing (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `smoothWheel true`, `syncTouch false` (leave touch native).

---

### C1. Numbered site navigation + full-screen or drawer menu (not the Snellenberg rounded panel)

Best references: Michelini footer nav "0 Home / 1 Projects / 2 Info"; Nese numeric nav "1 / 2 / 3"; Codrops EaseReverseClipMenu (github.com/codrops/EaseReverseClipMenu, MIT) for the open/close easing split (`ease: 'expo', easeReverse: 'elastic.out(0.3)'` in the demo); GreenSock "Fullscreen Menu Overlay GSAP" pen (codepen.io/GreenSock/pen/yLEJRRM) for a labelled timeline with staggered items; Brittany Chiang v4 (MIT) for skip link and focus handling.

Source: choreography is reproducible from GSAP docs; the design is yours.

Structure:

```html
<a class="skip" href="#main">Skip to content</a>
<header class="nav">
  <a class="nav__brand" href="/">EB</a>
  <nav aria-label="Primary" class="nav__list">
    <ol>
      <!-- ordered list gives the numbers semantically -->
      <li>
        <a href="/work"><span class="idx">01</span> Work</a>
      </li>
      <li>
        <a href="/lab"><span class="idx">02</span> Lab</a>
      </li>
      <li>
        <a href="/about"><span class="idx">03</span> About</a>
      </li>
      <li>
        <a href="/writing"><span class="idx">04</span> Writing</a>
      </li>
    </ol>
  </nav>
  <button class="nav__toggle" aria-expanded="false" aria-controls="menu">Menu</button>
</header>
<div id="menu" class="menu" hidden>
  <nav aria-label="Menu">
    <ol>
      ...same items, larger...
    </ol>
  </nav>
  <p class="menu__meta mono">Turin, IT · 45.0703° N 7.6869° E · 14:32 CET · Available Oct 2026</p>
</div>
```

CSS essentials: `.idx { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; color: color-mix(in oklch, var(--ink) 55%, transparent); }`. The menu is a full-viewport panel, `clip-path: inset(0 0 100% 0)` closed and `inset(0 0 0 0)` open, `border-top: 1px solid var(--hairline)`, radius 0, no curve. Items in Bricolage at `clamp(2.5rem, 9vw, 7rem)`, line-height 0.95, each masked (SplitText `mask: "lines"`) so they rise into view.

GSAP (reconstructed from the EaseReverseClipMenu approach and the GreenSock overlay pen; `easeReverse` is a real GSAP 3.13+ tween property):

```js
const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', easeReverse: 'power2.in' } })
tl.set(menu, { autoAlpha: 1 })
  .fromTo(
    menu,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'wipe' },
  )
  .from(items, { yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'editorial' }, '-=0.35')
  .from(meta, { autoAlpha: 0, duration: 0.4 }, '-=0.4')
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true'
  toggle.setAttribute('aria-expanded', String(!open))
  open ? tl.timeScale(1.4).reverse() : tl.timeScale(1).play()
})
```

Mobile (390px): header shows brand, a live mono availability chip, and the `Menu` button (44px hit area). Menu items stack; the numbers stay as a left column in mono; the meta line moves to the bottom. `100dvh`, never `100vh`.

Accessibility: `<ol>` so numbers are announced; `aria-expanded` and `aria-controls`; `inert` on page content while open; focus moves to the first item on open and back to the toggle on close; Escape closes; the `hidden` attribute is restored after the close animation completes. Reduced motion: clip-path becomes a 150ms opacity fade, items do not translate.

Adapt: numbers in Geist Mono 11px at 55 percent `--ink`, labels in Bricolage, hairline separators, the panel painted `--canvas` with a 1px top gap so the dither field shows through on the field theme.

---

### C2. Project list / index with hover reveal that works on touch

Best references: Jesper Landberg Featured vs Full index; Nese Selected Work rows; HAOQI dot-matrix hover reveal (Codrops Aug 2026, shader quoted); Codrops "Animated Product Grid Preview with GSAP and Clip-Path" (github.com/gwen-bo/codrops-grid-to-preview, MIT) for the 100ms debounce and dual-timeline discipline.

Source: HAOQI shader published in the article; grid-to-preview MIT; the list is yours.

Pattern: an `<ol>` of rows (index, title, client, year, tags). The preview is NOT a floating image following the cursor. It lives in a fixed slot: a right-hand "viewer" column on desktop that shows the hovered or focused row's image, and an inline expander on touch (tap a row to open thumbnail and metadata beneath it; a second tap or the "Open case" link navigates).

```html
<section class="index" data-density="featured">
  <div class="index__tools" role="group" aria-label="Density">
    <button aria-pressed="true" data-density="featured">Featured</button>
    <button aria-pressed="false" data-density="all">Full index</button>
  </div>
  <ol class="index__rows">
    <li class="row" data-featured="true">
      <a href="/work/fanfanfan" class="row__link">
        <span class="row__idx mono">01</span>
        <span class="row__title">Fanfanfan</span>
        <span class="row__meta mono">Agency // 2021 // WebGL</span>
      </a>
      <button class="row__expand" aria-expanded="false" aria-controls="p-fanfanfan">Preview</button>
      <div id="p-fanfanfan" class="row__panel" hidden>...img + 2 lines + Open case...</div>
    </li>
  </ol>
  <aside class="index__viewer" aria-hidden="true"><canvas></canvas></aside>
</section>
```

Desktop reveal: on `pointerenter`, debounce 100ms (grid-to-preview: `hoverDelay = setTimeout(() => setProduct(p), 100)`, cleared on leave), swap the viewer texture and run the HAOQI dot-matrix reveal. Core of the published shader:

```glsl
vec2 cellSizeUv = vec2(max(2.0, uDotPixelSize)) / viewportPx;
vec2 cellUv = fract(screenUv / cellSizeUv);
float squareDist = max(abs(cellUv.x - 0.5), abs(cellUv.y - 0.5));
float radius = progress * (maxRadius + 0.12);
float grow = 1.0 - smoothstep(radius - 0.12, radius + 0.12, distToCenter);
float squareExtent = mix(0.0, 0.5, grow);
float squareAa = max(fwidth(squareDist), 0.0001);
float squareMask = 1.0 - smoothstep(squareExtent - squareAa, squareExtent + squareAa, squareDist);
vec4 color = mix(baseColor, hoverColor, squareMask);
```

`uHoverRevealProgress` tweens 0 to 1 over about 0.5s power2.out and back over 0.35s (est.). CSS fallback without WebGL: the viewer `<img>` goes from `clip-path: inset(0 100% 0 0)` to `inset(0)` in 0.5s `var(--ease-editorial)` and from `filter: contrast(1.6) grayscale(1)` to `none` over 0.8s (a cheap develop-in).

Row hover: index turns `--accent`; title underline drawn by a `::after` scaleX 0 to 1 in 0.3s; no row background change, hairline dividers only.

Density toggle (Landberg): `[data-density="featured"] .row[data-featured="false"] { display: none }`; animate the switch with Flip: `const s = Flip.getState(rows); section.dataset.density = next; Flip.from(s, { duration: 0.6, ease: "power3.inOut", onEnter: els => gsap.fromTo(els, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }), onLeave: els => gsap.to(els, { autoAlpha: 0, duration: 0.2 }) })`.

Mobile: `.index__viewer` hidden; `.row__expand` visible; tapping the row header toggles an inline panel (16:10 thumbnail, two lines, "Open case"). Rows at least 56px tall. Simpler alternative under 768px: always show a 64px thumbnail on the left of each row, which removes the need for hover at all.

Accessibility: rows are real links; the viewer is `aria-hidden` (decorative duplicate); `focusin` on the link triggers the same reveal as hover; the expand button carries `aria-expanded`. Reduced motion: no wipe; the viewer swaps with a 150ms opacity.

Adapt: mono index and `//` meta (Michelini), Bricolage titles at `clamp(1.5rem, 3vw, 2.75rem)`, hairline rows, viewer image dithered through the hero shader (C14) so Work and hero share one image language.

---

### C3. Case study header block and long-form layout with sticky table of contents

Best references: Michelini metadata block; Guignand next-project block (C13); Maxime Heckel `useScrollspy` (code quoted); CSS-Tricks "Sticky Table of Contents with Scrolling Active States"; Klim essay pages for rhythm.

Source: scrollspy hook published; layout is yours.

Header block:

```html
<header class="case">
  <p class="case__idx mono">02 / 08</p>
  <h1 class="case__title">Fanfanfan</h1>
  <p class="case__dek">One-sentence outcome, not a tagline.</p>
  <dl class="case__meta mono">
    <div>
      <dt>Year</dt>
      <dd>2021</dd>
    </div>
    <div>
      <dt>Client</dt>
      <dd>Fanfanfan</dd>
    </div>
    <div>
      <dt>Role</dt>
      <dd>Design and front-end</dd>
    </div>
    <div>
      <dt>Stack</dt>
      <dd>Next, GSAP, WebGL</dd>
    </div>
    <div>
      <dt>Live</dt>
      <dd><a href="...">fanfanfan.it</a> (archived 2024)</dd>
    </div>
  </dl>
  <figure class="case__hero"><!-- <ViewTransition name={`cover-${slug}`}> --></figure>
</header>
```

Layout: 12-column grid; header spans 12; body text spans columns 4 to 10 at `max-width: 68ch`; figures may span 3 to 12. Columns 1 to 3 hold the sticky ToC (`position: sticky; top: calc(var(--nav-h) + 1rem)`), rendered only at `min-width: 1024px`. Figures carry mono captions "Fig. 01".

Scrollspy (Maxime Heckel, essentials verbatim):

```ts
const useScrollspy = (
  elements: Element[],
  options?: { offset?: number; root?: Element },
): [number] => {
  const [current, setCurrent] = React.useState(-1)
  const rootMargin = `-${(options && options.offset) || 0}px 0px 0px 0px`
  const observer = React.useRef<IntersectionObserver>()
  React.useEffect(() => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(
      (entries) => {
        const i = entries.findIndex((e) => e.intersectionRatio > 0)
        setCurrent(i)
      },
      { root: (options && options.root) || null, rootMargin },
    )
    elements.forEach((el) => el && observer.current!.observe(el))
    return () => observer.current!.disconnect()
  }, [elements, options, rootMargin])
  return [current]
}
```

Improvement for long sections: observe `h2[id]` with `rootMargin: "-20% 0px -70% 0px"` so the active heading is the one in the top band, and keep the previous active when nothing intersects.

ToC markup: `<nav aria-label="On this page"><ol>` with `aria-current="true"` on the active item; a 1px `--accent` rule slides along the left edge (`translateY` 0.3s ease-out). Targets get `scroll-margin-top: var(--nav-h)`. With Lenis, intercept clicks and call `lenis.scrollTo(target, { offset: -navH })`; `scroll-behavior: smooth` only under `no-preference`.

Mobile: the ToC becomes a `<details>` "On this page" above the body, or a chip row that scrolls inside its own `overflow-x: auto` container (never the page). The `dl` goes to two columns, then one at 390px.

Accessibility: `<dl>` for metadata, one `<h1>`, ordered headings, `<figcaption>`. The "archived" note answers Laxenaire's warning about dead client sites.

Adapt: mono `dt` labels 11px uppercase 0.08em at 55 percent `--ink`; hairline above the `dl`; hero figure wrapped in `<ViewTransition name>` so it morphs from the index (C6b).

---

### C4. Masked line reveal for text (SplitText lines with mask) with reduced-motion fallback

Best reference: Osmo x Codrops masked text reveal (codepen.io/osmosupply/pen/pvvKezw; article values: lines 0.8s stagger 0.08, words 0.6s stagger 0.06, letters 0.4s stagger 0.008, `yPercent: 110` to 0, CustomEase `0.625, 0.05, 0, 1`, SplitText `type: "lines, words, chars"`, `mask: "lines"`); GSAP SplitText v3.13 docs.

Source: values published; API verbatim from docs. GSAP is free.

Docs, verbatim:

```js
SplitText.create('.split', {
  type: 'words,lines',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.lines, { yPercent: 20, opacity: 0, stagger: 1 })
  },
})
```

Site implementation:

```js
gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase)
CustomEase.create('editorial', '0.625, 0.05, 0, 1')

export function revealLines(el, { duration = 0.8, stagger = 0.08, once = true } = {}) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines', // wraps each line in an element with visibility: clip
    linesClass: 'line++', // line line1, line line2 ...
    autoSplit: true, // re-split on font load and container resize
    aria: 'auto', // aria-label on the parent, aria-hidden on the pieces
    onSplit(self) {
      return gsap.fromTo(
        self.lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration,
          stagger,
          ease: 'editorial',
          scrollTrigger: { trigger: el, start: 'top 85%', once },
        },
      )
    },
  })
}
```

Returning the tween from `onSplit` lets GSAP keep `totalTime()` in sync when it re-splits mid-animation (documented). Words: 0.6s, 0.06. Chars: 0.4s, 0.008, reserved for one hero word only (split chars on every heading is on the anti-pattern list).

CSS: nothing for the mask itself; avoid `text-wrap: balance` on split headings (it changes line breaks between splits).

Reduced motion (parallel): inside `gsap.matchMedia`, the reduced branch does `gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })` on the whole element and never splits. Wait for `document.fonts.ready` before the first split (autoSplit handles later loads).

Mobile: identical, but cap the stagger so a 6-line paragraph at 390px does not take 1.3s: `stagger: Math.min(0.08, 0.5 / self.lines.length)`.

Accessibility: `aria: "auto"` keeps a readable `aria-label`; do not split text containing links (pieces become aria-hidden); never split body paragraphs.

Adapt: use on `h1`, section titles and the case dek only; ease "editorial", 0.8s, 0.08; on the paper theme lower `yPercent` to 60.

---

### C5. Text decode / scramble on a shared ticker (HAOQI style)

Best references: HAOQI ScrambleLines (Codrops Aug 2026: one shared 40ms ticker at 25Hz, capitals, numerals and symbols, each line tracks its own decode progress, fires once on viewport entry or when a fullscreen transition begins); Guignand SplitText + ScrambleText + clip-path wipe (code in B1); GSAP ScrambleTextPlugin docs.

Source: GSAP plugin API verbatim; HAOQI described (not published); Guignand snippet published.

GSAP route:

```js
gsap.registerPlugin(ScrambleTextPlugin)
const CHARS = 'A!B@C#D$E%F&G*H?J[K]L{M}N=O+P-QRSTUVWXYZ0123456789' // Guignand set plus digits
gsap.to(el, {
  duration: 0.9,
  ease: 'none',
  scrambleText: {
    text: '{original}',
    chars: CHARS,
    speed: 0.4,
    revealDelay: 0.2,
    tweenLength: false,
  },
  onStart() {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' },
    )
  },
})
```

Shared-ticker route (HAOQI behaviour, reconstructed; use when many mono labels must decode as one system):

```ts
const subs = new Set<() => void>()
let last = 0
gsap.ticker.add((time) => {
  // one clock for every instance
  if (time - last < 0.04) return // 40ms = 25Hz, deliberately steppy
  last = time
  subs.forEach((fn) => fn())
})
export function decode(el: HTMLElement, final: string, steps = 12) {
  el.style.minWidth = `${el.getBoundingClientRect().width}px` // lock width, no reflow
  let i = 0
  const tick = () => {
    const done = Math.floor((i / steps) * final.length)
    el.textContent =
      final.slice(0, done) +
      [...final.slice(done)]
        .map((c) => (c === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0]))
        .join('')
    if (++i > steps) {
      el.textContent = final
      subs.delete(tick)
      el.style.minWidth = ''
    }
  }
  subs.add(tick)
}
```

Trigger: IntersectionObserver once at 30 percent visibility, and on route enter for header meta. Never on hover, never looping, never on body text.

Mobile: same, limited to mono labels (index numbers, coordinates, time), never the H1.

Accessibility: set `aria-label={final}` before decoding so screen readers get the final text. Reduced motion: skip entirely (HAOQI does) and fade.

Adapt: Geist Mono labels only (nav numbers, `Year // Client`, coordinates, footer clock), 40ms ticker, uppercase and digits so it reads as an instrument, not a glitch.

---

### C6. Page transitions

#### C6a. Clip-path wipe with a custom ease

Best reference: Codrops "Creating Custom Page Transitions in Astro with Barba.js and GSAP" (Apr 2026; repo github.com/Ibaliqbal/codrops-barbajs-page-transition, no LICENSE file: reuse the technique, not the files; demo page-transitions-astro-barba-gsap.crnacura.workers.dev).

Verbatim essentials:

```html
<div class="transition__overlay"><h1 class="title__destination">we're going to</h1></div>
```

```css
.transition__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 100;
  will-change: clip-path;
  pointer-events: none;
  visibility: hidden;
}
.is__transitioning a {
  pointer-events: none;
}
```

```js
CustomEase.create('hop', '0.56, 0, 0.35, 0.98')
// leave: band around the title, then full screen (defaults duration 1, ease expo.inOut)
tl.to(overlay, {
  '--clip': `polygon(0 ${50 - v}%, 100% ${50 - v}%, 100% ${50 + v}%, 0 ${50 + v}%)`,
}).to(overlay, { '--clip': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
// after: words exit up, overlay collapses to the top edge with "hop"
tl2
  .to(split.words, {
    yPercent: -120,
    duration: 0.5,
    stagger: { amount: 0.25 },
    ease: 'elastic.in(1, 1)',
  })
  .to(
    overlay,
    { '--clip': 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 1, ease: 'hop' },
    '<+0.25',
  )
```

Lifecycle rules from the article: `revert()` the previous SplitText before creating a new one (`type: "words", mask: "words"`), add `is__transitioning` in `before`, remove it in `after`, `clearProps` anything set inline, `autoAlpha: 0` the overlay at the end. The `--clip` custom property is what makes the polygon tweenable.

In Next.js (no Barba): run the "leave" half in the link's `onClick` (`preventDefault`, await the timeline, then `router.push`), the "after" half in a client effect on the new route; or wrap the navigation in `document.startViewTransition(() => flushSync(() => router.push(href)))` as Guignand does after a 0.3s fade.

Mobile: same overlay, `100dvh`, durations reduced 25 percent under 768px. Accessibility: overlay `aria-hidden`, `inert` on `main` during the wipe, focus moved to the new `h1`. Reduced motion: no overlay; a 200ms opacity crossfade.

Adapt: overlay painted `--accent` on field and `--ink` on paper; the destination word replaced by the mono route index ("02 / Lab") in Bricolage at 5vw uppercase.

#### C6b. Shared element morph

(1) Native: React 19 `<ViewTransition>` in Next.js 16 (docs quoted; demo repo github.com/vercel-labs/react-view-transitions-demo).

```tsx
import { ViewTransition } from 'react'
// index
<Link href={`/work/${slug}`} transitionTypes={['nav-forward']}>
  <ViewTransition name={`cover-${slug}`} share="morph" default="none">
    <Image src={cover} alt={title} />
  </ViewTransition>
</Link>
// case page
<ViewTransition name={`cover-${slug}`} share="morph" default="none">
  <div style={{ position: 'relative', aspectRatio: '3 / 2' }}><Image src={cover} alt={title} fill /></div>
</ViewTransition>
```

```css
::view-transition-group(.morph) {
  animation-duration: 400ms;
}
::view-transition-image-pair(.morph) {
  animation-name: via-blur;
}
@keyframes via-blur {
  30% {
    filter: blur(3px);
  }
}
::view-transition {
  pointer-events: none;
}
::view-transition-group(site-header) {
  animation: none;
  z-index: 100;
}
::view-transition-old(site-header) {
  display: none;
}
::view-transition-new(site-header) {
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

Documented constraints: the morph only forms when the destination renders in the same commit (prefetched pages), so prefetch case pages on hover or in view; put page-level `<ViewTransition>` in `page.tsx`, never `layout.tsx`; `default="none"` is required alongside `share="morph"` or every named element crossfades on unrelated transitions. Directional slides: `--slide-offset: 60px`, exit `150ms ease-in`, enter `210ms ease-out 150ms`, move `400ms ease-in-out`; browser back has no transition type, so only the morph plays.

(2) GSAP Flip, for morphs within one route (Codrops Feb 2026 gallery, MIT; Codrops Jul 2026 infinite gallery): `const state = Flip.getState(img); /* move node into the detail slot */ Flip.from(state, { absolute: true, duration: 1, ease: "power3.inOut" })`; close with `Flip.fit(preview, wrapper, { duration: 1, ease: "power3.inOut", absolute: true })`; non-selected items reverse their reveal to 0 over 0.5s power2.out in parallel. The Jul 2026 demo uses 1.2s power4.inOut for the open.

#### C6c. Persistent canvas with swapped DOM

References: Codrops Mar 2026 "Seamless 3D transitions" (camera 2s expo.inOut while content exits 0.8s power4.in and enters expo.out with 0.2 to 0.35s delay), HAOQI ScrollBus/PointerBus, Guignand's single mounted `FlowmapEffect` ("the context survives, only the texture swaps"; idle guard stops the rAF after 90 frames without input).

HAOQI, verbatim: Lenis driven from the R3F loop instead of its own rAF.

```tsx
;<ReactLenis options={{ autoRaf: false }}>
  <LenisScrollEnvBridge />
  {children}
</ReactLenis>
// bridge
useEffect(() => {
  if (!lenis) return
  return addEffect((time: number) => {
    lenis.raf(time)
  })
}, [lenis])
```

Architecture for this site: the WebGL2 dither field is mounted once in `app/layout.tsx`; routes only tween uniforms (`uDensity`, `uTint`, `uSeed`) over 1.6s expo.inOut while text uses C6a or C6b. On the paper theme the field renders at about 4 percent opacity as grain.

---

### C7. Theme toggle as a designed moment (not a sun/moon icon)

Best references: Akash Hamirwasia "Full-page theme toggle animation with View Transitions API" (code quoted); Wodniack's "Change contrast" framing; Michelini's "Color Theme Switching" feature; Goodgrowth token-based theme toggles (Codrops 2026); Immersive Garden Off/On toggle.

Source: blog code (short, reference); the rest is yours.

Verbatim core (React, from the blog):

```js
const toggleDarkMode = async (isDark) => {
  if (
    !ref.current ||
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    setIsDarkMode(isDark)
    return
  }
  await document.startViewTransition(() => {
    flushSync(() => setIsDarkMode(isDark))
  }).ready
  const { top, left, width, height } = ref.current.getBoundingClientRect()
  const x = left + width / 2,
    y = top + height / 2
  const maxRadius = Math.hypot(
    Math.max(left, window.innerWidth - left),
    Math.max(top, window.innerHeight - top),
  )
  document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
    { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
  )
}
```

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

Designed moment for this site (radius 0, so no circle): a horizontal wipe with a dithered edge. Replace the `circle()` keyframes with `polygon()` sweeping left to right over 600ms `var(--ease-wipe)`, and during the transition set the dither field's `uThreshold` so the boundary pixelates (Bayer ordered dither on the edge) instead of feathering. The control itself is a two-state mono word pair, `FIELD / PAPER`, with the active one in `--accent` and a 1px indicator that slides: `<button role="switch" aria-checked="true" aria-label="Theme: field">FIELD<span aria-hidden>/</span>PAPER</button>`. Persist in `localStorage` and read it in an inline `<script>` in `<head>` to avoid a flash (the `next-themes` pattern); set `color-scheme` on `html`.

Mobile: same control in the header at 44px hit area; the wipe is shorter (400ms).

Accessibility: `role="switch"` with `aria-checked`; label announces the resulting theme; respects `prefers-color-scheme` on first visit; reduced motion: instant swap (already in the code above); the transition never blocks input longer than 600ms (`::view-transition { pointer-events: none }`).

Adapt: two token sets on `html[data-theme="field"|"paper"]`: `--canvas #14120f / #f3efe6`, `--ink #ece7dc / #17140f`, `--hairline` at 14 percent of `--ink`, `--accent` shared. The field's `uTint` tweens with the theme.

---

### C8. Command palette (Cmd+K) with playful commands

Best references: cmdk (github.com/pacocoursey/cmdk, MIT; code quoted); Toyfight TOS terminal (opens with `/`, closes with Esc, commands `home services work connect store bw negative reset close`, a "Clear Effects" button, prompt `:/ Enter Command`); Raycast key caps.

cmdk, verbatim:

```jsx
const [open, setOpen] = React.useState(false)
React.useEffect(() => {
  const down = (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener('keydown', down)
  return () => document.removeEventListener('keydown', down)
}, [])
return (
  <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
    <Command.Input />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Letters">
        <Command.Item>a</Command.Item>
      </Command.Group>
    </Command.List>
  </Command.Dialog>
)
```

Nested pages (verbatim pattern): keep `pages` state, pop on `Escape` or on `Backspace` when the search is empty. Styling hooks: `[cmdk-root]`, `[cmdk-input]`, `[cmdk-list]` with `--cmdk-list-height`, `[cmdk-item][data-selected]`, `[cmdk-group-heading]`. React 18+, unstyled, performant to about 2,000 items.

Command set for this site (Toyfight-inspired, each a `Command.Item` with `keywords`):

- Navigation: `go work`, `go lab`, `go about`, `go writing`, plus every case study and lab piece as searchable items (group "Index").
- Site: `theme field`, `theme paper`, `grid` (toggle C15), `motion off` / `motion on` (site-level reduced motion override stored in localStorage), `sound` (only if the site ever has sound; otherwise omit).
- Play: `bw` (grayscale filter on `html`), `negative` (`filter: invert(1) hue-rotate(180deg)`), `dither 1..8` (sets the field's cell size), `reset`.
- Contact: `copy email` (C12), `cv` (opens the PDF), `now` (Turin time and availability).
  Also open with `/` when focus is not in an input (Toyfight) and from a visible mono hint in the footer: `⌘K`.

Motion: none on open (Emil's rule for 100x-a-day actions), or at most 120ms opacity. The dialog is a 1px `--hairline` panel, radius 0, `max-width: 560px`, `top: 15vh`, results in Geist Mono 13px, selected item shows a `>` prefix in `--accent` rather than a filled background.

Mobile: open from a "Search" button in the menu; full-width sheet from the bottom with `100dvh - safe-area`; input `font-size: 16px` to prevent iOS zoom.

Accessibility: Radix Dialog underneath (focus trap, `aria-modal`, Escape); cmdk labels items; `Command.Dialog label="Command menu"`. Keyboard only path is complete by default.

Adapt: palette chrome uses hairlines and `--canvas`; group headings mono uppercase; the "Index" group doubles as the site search.

---

### C9. Footer as a destination (interactive but light, no marquee)

Best references: Lusion Oryzo AI interactive particle footer (Awwwards SOTM Apr 2026); Sharplink animated footer; Baratta's coordinates footer; Chiang's colophon; Landberg's llms.txt link; Michelini's "F/23" stamp; Osmo Inertia dot grid (Codrops, elastic.out(1, 0.75), resistance 750).

Source: the dot grid values are published; the rest is yours.

Structure:

```html
<footer class="foot">
  <div class="foot__field" aria-hidden="true"><canvas></canvas></div>
  <!-- the same dither shader, pointer-reactive -->
  <div class="foot__grid">
    <p class="foot__cta">
      Working on something in Turin or remote? <a href="mailto:...">Write to me</a>
      <button class="copy">…</button>
    </p>
    <nav aria-label="Footer">
      <ol>
        01 Work 02 Lab 03 About 04 Writing
      </ol>
    </nav>
    <dl class="mono">
      <dt>Location</dt>
      <dd>Turin, IT · 45.0703° N 7.6869° E</dd>
      <dt>Local time</dt>
      <dd><time>14:32 CET</time></dd>
      <dt>Status</dt>
      <dd>Available from Oct 2026</dd>
      <dt>Colophon</dt>
      <dd>
        Bricolage Grotesque, Geist Mono · Next 16 · GSAP · Vercel · <a href="/changelog">v2.0</a> ·
        <a href="/llms.txt">llms.txt</a>
      </dd>
    </dl>
  </div>
</footer>
```

Interaction: the footer canvas is the hero shader again, but the pointer drives a local threshold ripple (Bayer dither demo: click spawns ripples; 0.2 ms per frame at 4K). Touch: a tap spawns the same ripple. Keep the render loop idle-guarded (stop after 90 idle frames). Alternative without WebGL: the Osmo dot grid with Inertia (`resistance: 750`, return `elastic.out(1, 0.75)` 1.5s) drawn on a 2D canvas.

No marquee, no curved reveal, no giant "Let's work together". The footer sits in normal flow; the last hairline of the page is its top border.

Mobile: canvas height 40vh, everything stacks, the `dl` in two columns.

Accessibility: canvas `aria-hidden`; every fact is real text; `time` has `datetime`; the clock updates once a minute and is `aria-live="off"`. Reduced motion: the canvas renders a static frame.

Adapt: the footer is where the dither field returns after the hero, closing the loop; mono meta throughout; the version link goes to a Changelog page (yannglt pattern).

---

### C10. Lab / craft grid and single-piece frame with still fallback and play control

Best references: rauno.me/craft (list format described in B14); Volino Design Lab teaser; Nese Explorations; Codrops GSAP Flip gallery (open 1.2s power4.inOut, close `Flip.fit` 1s power3.inOut); Rocca's `useScrollAnimateIn` (once: true).

Source: Flip code MIT; format described.

Grid: single column on mobile, two columns from 768px, each item:

```html
<article class="piece" id="piece-dither-toggle">
  <a class="piece__media" href="/lab/dither-toggle">
    <video
      muted
      loop
      playsinline
      preload="none"
      poster="/lab/dither-toggle.jpg"
      width="1200"
      height="750"
    ></video>
    <button class="piece__play" aria-pressed="false" aria-label="Play preview">Play</button>
  </a>
  <h3 class="piece__title">Dither toggle</h3>
  <p class="piece__meta mono">
    Aug 2026 · WebGL2, GSAP · <a href="/lab/dither-toggle">View piece</a> ·
    <a href="https://github.com/...">Source</a>
  </p>
</article>
```

Behaviour: the poster is always the first paint (still fallback). Video plays on hover or focus on pointer devices, and only when in view (`IntersectionObserver`, threshold 0.6) and `prefers-reduced-motion: no-preference` and `navigator.connection?.saveData !== true`. On touch the explicit Play button toggles playback; never autoplay on mobile. Pause when scrolled out.

Single-piece frame (`/lab/[slug]`): a 16:10 frame with a hairline border and a mono toolbar: `Play/Pause`, `Restart`, `Reduced motion: on/off` (per-piece override), `FPS` readout optional, `Source` link. The piece itself is a client component lazy-loaded with `next/dynamic`; while loading show the poster. Quality tiers as in Bruno's portfolio: on `matchMedia('(pointer: coarse)')` or `devicePixelRatio > 2` cap the canvas DPR at 1.5 and drop post-processing.

Expand in place (optional, Flip): from grid card to a fullscreen frame, `Flip.from(state, { absolute: true, duration: 1.2, ease: "power4.inOut" })`, others fade `autoAlpha 0` 0.5s; close with `Flip.fit`.

Accessibility: the play button is a real `<button>` with `aria-pressed`; the video has `aria-label` describing the piece; every piece has a text description under the frame (what it does, how it was built) so the page is useful without the canvas; Escape closes the expanded frame.

Adapt: card meta in mono with the month-year and stack; Rauno's "View production / Read essay" becomes "View piece / Read notes"; the Lab teaser on the home page shows four pieces with a "View all" link (Volino).

---

### C11. Type tester with variable font sliders (ABC Dinamo style)

Best reference: Glyphrow (github.com/quitequinn/fontproof, ISC; code quoted), used for The Designers Foundry; ABC Dinamo customiser as the design reference.

Verbatim:

```js
import { Glyphrow } from 'glyphrow'
import 'glyphrow/styles.css'
new Glyphrow(el, {
  fontFamily: 'Bricolage Grotesque',
  text: 'Turin, Italy',
  size: 96,
  variable: {
    wght: { min: 200, max: 800 },
    wdth: { min: 75, max: 100, default: 100, label: 'Width' },
    opsz: { min: 12, max: 96, default: 96, label: 'Optical' },
  },
  controls: { size: true, tracking: true, weight: true, axes: true, features: true },
})
```

React: `import { Glyphrow } from "glyphrow/react"` with the same props and `onChange(state)`. Accessibility built in: native range inputs, `role="textbox"` editable region with `aria-multiline`, `aria-pressed` toggles, Escape closes the features panel, polite live region, respects `prefers-reduced-motion`.

Bricolage Grotesque axes: `wght` 200 to 800, `wdth` 75 to 100, `opsz` 12 to 96. A hand-rolled minimal version if the dependency is unwanted:

```html
<div class="tester">
  <p
    class="tester__sample"
    contenteditable="true"
    spellcheck="false"
    style="font-variation-settings: 'wght' var(--w), 'wdth' var(--d), 'opsz' var(--o)"
  >
    Torino
  </p>
  <label>Weight <input type="range" min="200" max="800" value="500" data-axis="w" /></label>
  <label>Width <input type="range" min="75" max="100" value="100" data-axis="d" /></label>
  <label>Optical <input type="range" min="12" max="96" value="96" data-axis="o" /></label>
</div>
```

```js
tester.addEventListener('input', (e) => {
  const i = e.target
  if (!(i instanceof HTMLInputElement)) return
  sample.style.setProperty(`--${i.dataset.axis}`, i.value) // direct DOM, no React state at input rate
})
```

A scroll-scrubbed variant for one headline (Envato 2026 trend, kinetic typography): `gsap.to(h, { "--w": 800, scrollTrigger: { trigger: h, start: "top 80%", end: "top 20%", scrub: true } })` with `font-variation-settings` reading the variable. Use exactly once on the site.

Mobile: sliders stack under the sample; sample at `clamp(3rem, 14vw, 8rem)`; `contenteditable` gets `inputmode="text"`.

Accessibility: every range has a visible label and `aria-valuetext` (for example "Weight 500"); contenteditable region labelled with `aria-label="Sample text"`. Reduced motion: no scroll scrub; the headline is static at its final weight.

Adapt: place in the About page's "Typography notes" (colophon) as the interactive specimen; sliders are 1px hairline tracks with a square thumb in `--accent`, radius 0.

---

### C12. Copy-to-clipboard email with "Copied" state

Best references: Rauno's copy interaction (observed pattern), Modern UI CopyButton, React Aria `useClipboard`. Code below is standard.

```tsx
function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number>()
  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 1800)
  }
  return (
    <span className="copy">
      <a href={`mailto:${email}`} className="copy__mail">
        {email}
      </a>
      <button type="button" onClick={copy} className="copy__btn mono" aria-label={`Copy ${email}`}>
        {state === 'idle' ? 'Copy' : state === 'copied' ? 'Copied' : 'Press ⌘C'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied'
          ? 'Email copied to clipboard'
          : state === 'failed'
            ? 'Copy failed, select the text'
            : ''}
      </span>
    </span>
  )
}
```

Motion: the label swap uses a 120ms opacity crossfade (Emil: hover and small feedback under 160ms, `ease`), no scale bounce, no confetti. On "Copied" the button text turns `--accent` and the underline under the email draws with `scaleX` 0 to 1 in 200ms. The `mailto:` link stays a real link so the email is always usable without JS.

Mobile: the button has a 44px hit area; `navigator.clipboard` requires a user gesture and HTTPS (Vercel is fine). Fallback state "Press ⌘C" becomes "Long-press to copy" on `pointer: coarse`.

Accessibility: visible text change plus a polite live region; the button's `aria-label` includes the address; the email is never an image or obfuscated (Wodniack uses Cloudflare email protection, which breaks copy; avoid).

Adapt: mono button text at 11px uppercase, hairline underline, no icon; place it in the footer (C9), the About page, and the command palette (`copy email`).

---

### C13. Sticky-stack and pinned sections done right (ScrollTrigger pin), and where not to use them

Best references: GSAP ScrollTrigger docs (quoted); GreenSock "GSAP Stacking Cards" (codepen.io/GreenSock/pen/MWmVwpX, `pinSpacing: false`) and "Variable height stacked pinning" (KKpLdWW); Guignand's next-project block (B1, code quoted); Codrops SVG mask scroll transitions (MIT; scrub 2 to 2.5, stagger 0.02).

Docs, verbatim:

```js
gsap.to('.box', {
  scrollTrigger: { trigger: '.container', pin: true, start: 'top top', end: '+=500' },
})
// scrub: true = locked to scrollbar; scrub: 1 = one second catch-up
// anticipatePin: 1 counteracts the flash on fast scroll
// pinSpacing: false for stacked/overlapping sections; "margin" as an alternative
```

Warnings from the docs: never pin an element inside another pinned element; do not animate the pinned element itself (wrap the content); ancestors with `transform` or `will-change` break pinning (use `pinReparent: true` at a performance cost); test pinning on touch and use `anticipatePin`.

Stacked sections (GreenSock pattern): each `.panel` gets `ScrollTrigger.create({ trigger: panel, start: "top top", pin: true, pinSpacing: false })` so the next panel slides over the previous one; with variable heights use `start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom"`.

Where to use on this site (at most two places):

1. The "next project" block at the end of a case page (Guignand): pinned for `end: "+=100%"`, `scrub: 1`, direct DOM writes in `onUpdate`: counter, `scale` 1.3 to 1, `clip-path inset(20% 40% ...)` to 0, ring `strokeDashoffset`; navigate at 100 percent only after the user has seen low progress. A click tweens the same progress value.
2. Optionally the home Lab teaser: four cards stacking with `pinSpacing: false`.

Where NOT to use: the hero (Lenis plus pin fights the browser's scroll restoration and the address-bar resize on iOS), the project index (breaks find-in-page and keyboard scanning), the case body (readers lose their place), anything at 390px where the pinned block would exceed `100svh`. Under 768px replace pins with plain flow plus `once: true` reveals. Under `prefers-reduced-motion: reduce`, do not pin at all (`gsap.matchMedia` reduced branch): the next-project block becomes a static card with a "Next" link.

Lenis note: with Lenis running, ScrollTrigger must be updated from Lenis (`lenis.on('scroll', ScrollTrigger.update)`) and `normalizeScroll` should stay off.

Adapt: the ring is a 1px `--hairline` circle with a `--accent` stroke, the counter in Geist Mono, the background image dithered by the field shader as it scales.

---

### C14. Image treatments: dither shader, "develop-in" reveal, bas-relief hover

#### C14a. Ordered dither (Bayer) as the signature image style

Best references: Codrops "Interactive WebGL Backgrounds: A Quick Guide to Bayer Dithering" (github.com/zavalit/bayer-dithering-webgl-demo; renders in under 0.2 ms at 4K, ships in about 3 KB); Codrops "Building a Real-Time Dithering Shader" (github.com/niccolofanton/dithering-shader, MIT); Efecto (Jan 2026) for CPU error-diffusion variants; Goodgrowth Bayer shader.

Verbatim Bayer macros (Codrops):

```glsl
float Bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
#define Bayer4(a)  (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
#define Bayer8(a)  (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))
#define Bayer16(a) (Bayer8(0.5 * (a)) * 0.25 + Bayer2(a))
// threshold usage
float dither = Bayer8(fragCoord);
mask += dither - 0.5;
mask = step(0.5, mask);
```

Fanton's post-processing variant exposes `gridSize`, `pixelSizeRatio`, `grayscaleOnly`, `invertColor`, `luminanceMethod`; early-outs `if (brightness > 16.0/17.0) return false; if (brightness < 1.0/17.0) return true;` and pixelates first: `vec2 pixelatedUV = floor(fragCoord / pixelSize) * pixelSize / resolution;`.

For this site (WebGL2, no Three): a single fullscreen quad. Uniforms: `uTex`, `uCell` (2 to 8 px), `uInk`, `uCanvas` (theme tokens as vec3), `uPointer`, `uTime`, `uProgress`. Fragment: sample luminance, pixelate to `uCell`, compare against `Bayer8(gl_FragCoord.xy / uCell)`, output `mix(uCanvas, uInk, step)`. Two-colour output means the image always sits in the theme palette (field: ink on near-black; paper: ink on cream), which is the site's image language. Halftone alternative (Heckel): `cellUv = fract(uv * uGridSize); dist = length(cellUv - 0.5); radius = uRadius * (0.1 + luma); aa = fwidth(dist); circle = smoothstep(radius - aa, radius + aa, dist)`; CMYK angles 15/75/0/45 degrees; grid 8 to 16 px; radius 0.25 to 0.5.

CSS-only fallback (no WebGL): `filter: grayscale(1) contrast(1.3)` plus an SVG `feTurbulence` + `feComponentTransfer` dither pattern as `mask-image`, or simply a two-tone `mix-blend-mode: multiply` over `--canvas`. Acceptable, not equal.

#### C14b. "Develop-in" reveal (HAOQI)

Verbatim: `uniform float uPolarityPositive; vec3 applyPolarity(vec3 rgb) { float t = clamp(uPolarityPositive, 0.0, 1.0); return mix(1.0 - rgb, rgb, t); }`. Tween `uPolarityPositive` 0 to 1 over 0.8s when the image enters the viewport; reset to 0 when it leaves completely; skipped under reduced motion. For the dither field, pair polarity with `uCell` going from 8 to the final 2 to 3 px over the same 0.8s so the image "develops" from coarse negative to fine positive. Ease: power2.out.

#### C14c. Bas-relief hover (Immersive Garden)

Closed. From the Awwwards case study: real 3D bas-relief meshes with KTX-compressed, channel-packed textures; Three.js; the effect is lighting on relief geometry, not a 2D filter. Cheap 2D reconstruction: a normal map per thumbnail (generated offline from luminance with a Sobel filter, 512 px), and a fragment shader that computes `N.L` with the light direction following the pointer through the HAOQI ring-light damper (`dampAngle` with `lambda 6`, verbatim below), adding `specular = pow(max(dot(N, H), 0.0), 24.0) * 0.15`. Touch: light comes from a slow orbit instead of the pointer.

```ts
const dampAngle = (current, target, lambda, dt) => {
  const shortest = Math.atan2(Math.sin(target - current), Math.cos(target - current))
  return current + shortest * (1 - Math.exp(-lambda * dt))
}
```

HAOQI's velocity envelope, verbatim values: attack time constant 0.025, release 0.175 (`tau = target > activity ? 0.025 : 0.175; alpha = 1 - exp(-dt / tau)`), max curl 0.06. Use the same envelope to modulate `uCell` by scroll velocity (fast scroll = coarser dither), which makes the field feel mechanical.

Mobile: DPR capped at 1.5, `uCell` minimum 3 px, idle guard; the shader is cheap enough for mid-range Android (the Bayer demo is 0.2 ms).

Accessibility: every canvas image has a DOM `<img>` with alt text either behind it (`visibility: hidden` but present) or as the fallback; reduced motion: static dither, no develop-in, no pointer light.

Adapt: this is the site's core visual. One shader module, three uses: hero field, Work viewer, footer. Tokens in, two colours out.

---

### C15. Grid overlay / baseline grid toggle (Obys style)

Best references: Obys GRIDS project (grid mode toggle; page unreachable this session); Medienbäcker "Layout grids in the browser" (code quoted, adapted to DOM methods); Satus grid debug overlay (MIT).

Adapted from Medienbäcker (the original builds the column markup as a string; this version uses DOM methods):

```js
export default class Guides {
  constructor(breakpoints = { '(max-width: 767px)': 4, '(max-width: 1023px)': 6 }) {
    this.breakpoints = breakpoints
    this.guides = document.createElement('div')
    this.guides.className = 'guides'
    this.guides.setAttribute('aria-hidden', 'true')
    this.updateColumns()
    document.body.appendChild(this.guides)
    if (localStorage.getItem('guides') === 'true') this.guides.style.visibility = 'visible'
    document.addEventListener('keydown', (e) => {
      const t = e.target
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
      )
        return
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey) this.toggleVisibility()
    })
    window.addEventListener('resize', () => {
      this.updateColumns()
      this.updateWindowWidth()
    })
  }
  toggleVisibility() {
    const visible = this.guides.style.visibility === 'visible'
    this.guides.style.visibility = visible ? 'hidden' : 'visible'
    localStorage.setItem('guides', (!visible).toString())
  }
  getCurrentColumns() {
    for (const [q, cols] of Object.entries(this.breakpoints))
      if (window.matchMedia(q).matches) return cols
    return 12
  }
  updateWindowWidth() {
    this.guides.dataset.windowWidth = String(window.innerWidth)
  }
  updateColumns() {
    const inner = document.createElement('div')
    inner.className = 'guides__inner grid'
    for (let i = 0; i < this.getCurrentColumns(); i++)
      inner.appendChild(
        Object.assign(document.createElement('div'), { className: 'guides__guide' }),
      )
    this.guides.replaceChildren(inner)
  }
}
```

```css
.guides {
  position: fixed;
  inset: 0;
  z-index: calc(infinity);
  pointer-events: none;
  visibility: hidden;
  --guide: color-mix(in oklch, var(--accent) 25%, transparent);
}
.guides__inner {
  height: 100%;
} /* shares --cols, --gutter, --margin with the real layout grid */
.guides__guide {
  outline: 1px solid var(--guide);
  background: color-mix(in srgb, var(--guide), transparent 75%);
}
.guides::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    var(--guide) 0 1px,
    transparent 1px var(--baseline, 8px)
  );
}
.guides::after {
  content: attr(data-window-width) 'px';
  font: 11px var(--font-mono);
  color: var(--accent);
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
```

Rules for this site: the overlay must consume the same tokens as the layout (`--cols`, `--gutter`, `--margin`, `--baseline: 8px`) so it is a true debug view; show the viewport width in mono in a corner; toggle with `G` (no modifier) when focus is not in an editable element, and from the command palette (`grid`); persist in localStorage. On the field theme `--accent` at 25 percent; on paper `--ink` at 20 percent.

Mobile: works; 4 columns under 768px, 6 under 1024px.

Accessibility: `aria-hidden="true"`, `pointer-events: none`, the shortcut is ignored inside inputs and while the palette is open. No motion.

Adapt: an easter egg that also signals the design degree; mention it in the colophon ("press G").

---

### C16. 404 page ideas

References: Lallé, Nese, Michelini and Lannino all list a custom 404 as an Awwwards feature; 404s.design gallery (typographic and brutalist examples such as James Walsh Studio, sasuke haraguchi, Native Security).

Ideas that fit this site (pick one):

1. Dithered void: the field shader with `uCell` at 12 px and no image, and a single mono line "404 // no signal at this address". A command palette hint "⌘K to find what you were looking for". Cheapest and most on-brand.
2. Decode failure: the H1 renders as a scramble (C5) that never resolves; the final text is in `aria-label`, so screen readers get "Page not found" while sighted users see a stuck decode. A "Go home" link resolves it on hover.
3. Coordinates: "45.0703° N, 7.6869° E is here. /this-path is not." with the site index below (Lallé's numbered list as the recovery path).
4. Grid overlay forced on (C15) with the message set in the columns, so the "broken" page shows the system.
   Rules: real `<h1>`, `status 404` from Next `not-found.tsx`, the primary nav present, no auto-redirect, search or palette available, reduced motion honoured (no permanent scramble under `reduce`).

---

### C17. Mobile-specific patterns (390px)

Observed across the surveyed sites and the docs:

- Hero: type-only statement in 3 lines (Michelini: what, where, status). Hero at `clamp(2.25rem, 11vw, 4rem)` fits 390px without orphans if `text-wrap: balance` is used on the non-split variant. The dither field still runs (0.2 ms Bayer), DPR capped at 1.5, idle guard, no pointer light. Bruno drops water blur and DoF and reduces shadow maps on mobile; do the equivalent (fewer cells, no develop-in).
- Nav: brand + status chip + Menu button; the menu is a full-height panel with numbers in a left mono column (C1). Nese keeps numbers as the primary label.
- Project list: no hover; inline expander or always-visible 64px thumbnails (C2). Landberg's dense index is already mobile-native.
- Touch alternatives to hover: tap = preview, second tap or explicit link = navigate; `:focus-visible` mirrors hover on desktop; on `pointer: coarse` swap pointer-driven shaders for slow autonomous motion or scroll-driven progress (Guignand keeps scroll morph, drops the flowmap; HAOQI adapts hover reveals to pointer mechanics).
- Wheel and touch as one input: GSAP Observer (`type: "wheel,touch"`, `preventDefault: true`, `onChange(self)` with `deltaY`, `velocityY`) when a component needs its own scroll (lab piece galleries), never for the document.
- Lenis: `syncTouch: false` (default) so iOS keeps native momentum; smooth wheel only.
- Pins: none under 768px (C13). Reveals: `once: true` opacity plus 8 to 12px translate.
- Videos: `preload="none"`, poster first, explicit Play (C10). No autoplay on `saveData`.
- Type tester: sliders stacked under the sample (C11). Palette: bottom sheet, 16px input.
- Safe areas: `padding-bottom: env(safe-area-inset-bottom)` on the footer and palette; `100dvh` everywhere; no horizontal page scroll (wide tables inside their own `overflow-x: auto`).
- Never: "rotate your device", horizontal-only sections, enter gates.

---

## Part D. Prioritised shortlist: the 12 components to build first

Ordered by how much they define the site and how safely they can be built from open sources.

1. Dither field shader and image language (C14a, C14b). Follow: Codrops Bayer dithering (github.com/zavalit/bayer-dithering-webgl-demo, no LICENSE file, maths is public) and Fanton dithering-shader (MIT) for the pixelate-then-threshold structure; HAOQI polarity reveal (published snippet). One WebGL2 module reused in hero, Work viewer and footer.
2. Motion tokens and reduced-motion parallel branch (C0). Follow: Emil Kowalski STANDARDS.md (MIT), Osmo/Codrops values, GSAP `matchMedia` docs, Lenis README bridge (MIT).
3. Masked line reveal (C4). Follow: Osmo x Codrops masked text reveal (educational, values published) with GSAP SplitText 3.13 `mask`, `autoSplit`, `onSplit`, `aria`.
4. Numbered nav and clip-path menu (C1). Follow: Michelini and Nese for the numbering; Codrops EaseReverseClipMenu (MIT) for open/close easing split.
5. Project index with fixed viewer and touch expander (C2). Follow: Landberg's two densities (closed, described); HAOQI dot-matrix reveal (published shader); grid-to-preview (MIT) for the 100ms debounce.
6. Shared-element morph index to case (C6b). Follow: Next.js view-transitions guide and vercel-labs/react-view-transitions-demo (licence not confirmed on page; Vercel Labs demos are typically MIT), `share="morph" default="none"`, 400ms with blur.
7. Clip-path route wipe for non-morph routes (C6a). Follow: Codrops Astro + Barba + GSAP (repo without LICENSE, use technique only): `--clip` CSS var, `CustomEase("hop", "0.56, 0, 0.35, 0.98")`, 1s.
8. Case study header, long-form grid and sticky ToC (C3). Follow: Michelini's `//` metadata (closed, described), Maxime Heckel `useScrollspy` (blog code).
9. Theme toggle as a dithered wipe (C7). Follow: Akash Hamirwasia View Transitions theme toggle (blog code) with the circle replaced by a polygon sweep and the dither edge; `role="switch"`.
10. Command palette with playful commands (C8). Follow: cmdk (MIT) plus Toyfight's command list (closed, described) for `bw`, `negative`, `reset`, `grid`, `theme`.
11. Lab grid and single-piece frame (C10). Follow: rauno.me/craft format (closed, described), Codrops Flip gallery (github.com/J0SUKE/gsap-threejs-codrops, MIT) for expand in place, Bruno's mobile quality presets (MIT repo).
12. Footer as destination plus copy email and grid overlay easter egg (C9, C12, C15). Follow: Osmo Inertia dot grid values or the same dither shader; Baratta's coordinates and Michelini's version stamp (closed, described); Medienbäcker grid overlay (blog code) and Satus debug grid (MIT); standard clipboard code with `role="status"`.

Deferred: type tester (C11, Glyphrow ISC) into the About colophon in a second pass; scroll-scrubbed variable-weight headline (C11) once, if at all; sticky stacks (C13) only for the next-project block; 404 (C16) as the last page, reusing 1, 5 and 8.
