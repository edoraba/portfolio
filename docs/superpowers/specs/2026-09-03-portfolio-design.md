# Portfolio design spec: "Specimen in the Field"

Date: 2026-09-03. Status: approved direction (D), spec written for implementation planning.
Owner: Edoardo Baravaglio. Research base: `docs/research/01..04`, decisions in `docs/research/00-sintesi-e-domande.md`.

## 1. Purpose and audience

A personal site for Edoardo Baravaglio, frontend developer with a design degree, partner at Redergo (Turin). It must do three things at once: present him as a person, prove design and engineering craft in the site itself, and show a curated set of work he designed and built. Primary reader: international product companies and senior engineers (Design Engineer positioning). Secondary: recruiters who keyword-scan. Language: English only. No Italian pages.

Success looks like: a senior engineer opens it, is intrigued within five seconds, reads one case study to the "decisions" section, opens the Lab, checks the colophon and the public repo, and comes away thinking "this person designs and ships". Measurable gates are in section 10.

Explicit exclusions: LoL Brain is never mentioned anywhere on the site or in this repository. No client logo wall, no skill bars, no testimonial carousel, no 3D avatar, no preloader with a percentage, no custom cursor, no marquee, no magnetic buttons, no curved footer, no "Hi I'm" hero, no AI in the hero copy.

## 2. Concept

**The text is the window onto the shader.** Two visual systems fused into one idea:

- From "Specimen": a typographic specimen. One variable grotesk with width and optical-size axes, set huge for display and small for text, an always-visible numbered index in the margin on desktop, italic of the same family for emphasis, a paper light theme.
- From "Deep Field": a full-viewport ordered-dither flow field rendered in WebGL, reacting to the pointer, on a cool near-black canvas, with numbered navigation.

On the home hero the three words "Design, then build." are cut out of a mask; the field is visible only through the letterforms. Moving the pointer widens the nearest word (width axis) and lights the field with the accent. On scroll the mask opens, the field spills out of the letters and settles into a thin band behind the project index. Everywhere else the field is quiet: a band, a texture inside a heading, or absent.

Two complete worlds behind one toggle: dark is the field (near-black, off-white ink, dither in light), light is the paper (warm paper, ink, dither in ink). Same type, same index, same accent family. The theme toggle is a designed moment, not a sun and moon icon.

## 3. Information architecture

```
/                 Home: hero (mask), four selected works, how I work, Lab teaser, about teaser, writing, now, footer
/work             Index: five case studies (featured), short entries, archive list
/work/[slug]      refattura, traceability, html-to-figma, redergo-sales, envergo
/lab              Dated live pieces (target 8 at launch, minimum 6)
/lab/[slug]       One piece full screen with notes and source link
/writing          Three essays at launch (drafted by Claude, reviewed and rewritten by Edoardo before publish)
/writing/[slug]
/about            Story, photo, how I work, availability line
/now              Dated, short, updated quarterly
/colophon         Stack, type system, motion rules, tokens, AI note, changelog, repo link, Lighthouse statement
/404              Designed, uses the field as a controlled glitch
```

Navigation: four items, numbered in mono: `1 Work`, `2 Lab`, `3 Writing`, `4 About`. Now and Colophon live in the footer. Contact is the email as plain text with a copy-to-clipboard "Copied" state, in the hero footer line and in the site footer. Home shows four works: Refattura, Traceability (F1 supplier), HTML to Figma, Redergo Sales.

Case study set and framing (from `04-content-strategy.md` section 7.2, LoL Brain replaced by Envergo):

| Slug          | Title (outcome first)                                                     | Framing                                                                                                           |
| ------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| refattura     | Refattura: Italian e-invoicing self-invoices, 12,000+ documents generated | Anchor. Product, solo across design, frontend, backend, database, deployment                                      |
| traceability  | On-chain traceability for a Formula 1 supplier                            | NDA. Sector-only naming, recreated mockups with fictional data, confidentiality note, private walkthrough offered |
| html-to-figma | HTML to Figma: a Figma community plugin                                   | Public artifact, the purest design-engineer piece                                                                 |
| redergo-sales | Redergo Sales: an AI-built site variant for every lead                    | The honest AI-in-product story: what is templated, what is generated, quality gates                               |
| envergo       | Envergo: encrypted environment variables for a ten-person team            | Developer-to-developer depth: threat model, key handling, CLI and web, adoption                                   |

Short entries on /work: Athena (Lighthouse 100 in all four, live PageSpeed link), AI video localisation for a fitness course platform, Redergo Hub, Dynamic BG. Archive list: lampante.ai, boerotrucks.com, atavola.pro, rekupero.it, thefootballroyale.com, each with role stated honestly once Edoardo confirms it.

## 4. Visual system (tokens live in `DESIGN.md` and `app/globals.css`)

### 4.1 Colour

Two themes, one accent family. Roles, not names.

| Role                        | Dark (default when the OS has no preference) | Light               |
| --------------------------- | -------------------------------------------- | ------------------- |
| canvas                      | #0B0C0E                                      | #F1EDE4             |
| surface                     | #15171B                                      | #E6E0D3             |
| surface-2                   | #1C1F24                                      | #DDD6C6             |
| ink                         | #F2F2EF                                      | #141310             |
| ink-muted                   | #8B8E93                                      | #6E685C             |
| hairline                    | rgba(242,242,239,0.10)                       | rgba(20,19,16,0.12) |
| accent                      | #7D93FF                                      | #1F3BFF             |
| accent-ink (text on accent) | #0B0C0E                                      | #F1EDE4             |
| field-on                    | #F2F2EF                                      | #141310             |
| field-off                   | #0B0C0E                                      | #F1EDE4             |

Rules: the accent is used as ink (links, index numbers, the lit part of the field, focus rings), never as a fill for large areas. Contrast: every text pairing passes WCAG AA, body text targets AAA. No pure #000 or #FFF. No shadows; elevation is a surface step plus a hairline. Radius 0 everywhere. Grain is not used (the dither is the texture). The accent alternative, phosphor #E9FF6A on dark, stays in `DESIGN.md` as a one-token swap and is not the default.

### 4.2 Typography

- Display and text: **Bricolage Grotesque** (OFL, variable: opsz 12 to 96, wdth 75 to 100, wght 200 to 800), self-hosted woff2 via `next/font/local`, one file with all axes. Display at weight 500, tracking -0.045em, line-height 0.86 to 0.95, `text-wrap: balance`. Text at optical size 12 to 14, weight 400, line-height 1.5, measure 58 to 65ch, `text-wrap: pretty`. Emphasis is italic or weight of the same family. No second sans, no serif.
- Mono: **Geist Mono** (OFL), self-hosted, for nav, index numbers, dates, stack tags, captions, labels. 11 to 13px, uppercase with +0.06em tracking for labels, tabular numerals always.
- Scale (fluid, clamp): display-xl clamp(4rem, 13vw, 14rem); display clamp(2.5rem, 6.5vw, 6rem); headline clamp(1.5rem, 2.6vw, 2.25rem); body 1rem to 1.125rem; label 0.6875rem to 0.8125rem. Almost nothing between headline and display: big type, tiny mono, little in between.
- Kinetic axis: the width axis is animated on exactly one heading per page (home hero words; case study title on entry). Everywhere else width is static at 100.
- Fallbacks generated by `next/font` with size-adjust so CLS stays under 0.02.

### 4.3 Layout

- Container max 1400px, 12-column grid, gutters 24px, page padding clamp(16px, 4vw, 64px).
- Desktop: the numbered index sits in the right margin on home and /work and becomes the table of contents on case studies. Under 1024px it collapses into the flow.
- Sections are separated by space and hairlines, never by cards. Cards exist only for Lab tiles (they are screens) and use the hairline plus surface step.
- Every image sits in a `<figure>` with a caption. Case study figures are labelled "Fig. 01" in mono.

## 5. The field (WebGL) and the mask

### 5.1 Field renderer

- Library: **OGL** (about 29 KB, WebGL2 with WebGL1 fallback). One full-screen triangle, one fragment shader. No Three.js, no R3F.
- Shader: fbm value noise advected over time (flow), thresholded with an ordered 8x8 Bayer matrix at a fixed cell size of 2 CSS px (the dither must be pixel-crisp, so the canvas renders at exactly `viewport / cell` resolution with `image-rendering: pixelated`; device pixel ratio is ignored on purpose). Uniforms: time, resolution, pointer (smoothed on the JS side with attack 25ms and release 175ms), theme colours (field-on, field-off, accent), intensity (0 to 1, driven by scroll), reveal (0 to 1, driven by page transitions).
- Accent appears only within a radius around the pointer, falling off smoothly; idle state drifts slowly with no accent.
- One persistent `<canvas>` mounted in the root layout outside the route segment, `position: fixed`, `inset: 0`, `z-index` below content, `pointer-events: none`. Routes set its `intensity` and `mode` (`hero`, `band`, `off`) through a small store; the canvas never remounts on navigation.
- Frame loop: Tempus is the single rAF; Lenis and GSAP ticker are driven from it. The field pauses when `document.hidden`, when `intensity` is 0, and when the canvas is fully covered.
- Quality manager: measure frame time for the first second and after every resize; if p75 frame time is over 12ms, cell size steps 2 to 3 to 4 px; log the tier in the colophon ("rendering at cell 2").
- Budget: field JS under 40 KB gzip including OGL, loaded after LCP with `next/dynamic`, `ssr: false`. First paint never waits for it.

### 5.2 Text mask on the home hero

- The hero headline is an `<h1>` with the three words in `<span>`s. It is rendered twice: once visually hidden for accessibility and SEO (`sr-only`), once as SVG `<text>` inside an inline `<svg><mask id="hero-mask">` whose `<text>` uses the same font, size and `font-variation-settings` via CSS. The field canvas region behind the hero receives `mask-image: url(#hero-mask)` while `mode = hero`.
- Pointer proximity changes the `wdth` axis of the nearest word between 78 and 100 over 500ms with the expo-out ease. On scroll (0 to 1 over one viewport) the mask scale grows until it exceeds the viewport (the field appears to spill out of the letters), then `mode` switches to `band` and the field settles as a horizontal band behind the index.
- Fallback chain: if `mask-image` with an SVG reference is unsupported, or WebGL is unavailable, or `prefers-reduced-motion` is set, the words are filled with a static CSS dither (`background-clip: text` with a repeating conic gradient at 2px cells) and the canvas is not mounted. The composition, spacing and copy are identical in the fallback.
- Contrast: the field density under the letters is forced to at least 55 percent "on" pixels through the intensity uniform so the headline stays legible at every frame. The `sr-only` h1 guarantees text is always available to assistive tech.

## 6. Motion

Tokens (also in `DESIGN.md`):

| Token               | Value                             | Use                              |
| ------------------- | --------------------------------- | -------------------------------- |
| --dur-micro         | 150 to 250ms                      | hover, press, toggles            |
| --dur-reveal        | 800ms                             | masked line reveals              |
| --dur-wipe          | 1200ms                            | page transition wipe             |
| --dur-field         | 2000ms                            | field intensity and mode changes |
| --ease-out-expo     | cubic-bezier(0.16, 1, 0.3, 1)     | reveals, hover                   |
| --ease-hop          | cubic-bezier(0.56, 0, 0.35, 0.98) | page wipes                       |
| --ease-inout-power3 | cubic-bezier(0.65, 0, 0.35, 1)    | Flip, layout changes             |
| stagger             | 0.06s lines, 0.04s list items     | reveals                          |

Choreography rules:

- Content fast, field slow. Text exits in 600ms power4.in and enters in 800ms expo.out with a 200ms delay; the field takes 2000ms expo.inOut. They run in parallel.
- Reveals are masked line reveals (GSAP SplitText, `type: "lines"`, `mask: "lines"`, `aria: "auto"`, `autoSplit: true`). Never character reveals on body text. Text decode (40ms ticker, once, on viewport entry) is used only on mono labels.
- Page transitions: the field persists; the DOM swaps. Route changes use React `<ViewTransition>` through the Next.js App Router with a clip-path wipe (`--ease-hop`, 1200ms) and, from /work to a case study, a shared-element morph of the project number and cover. Browser back and forward use a 200ms crossfade.
- Hover states are CSS (`transform`, `opacity`, `font-variation-settings` transitions), never GSAP, so the main thread stays free for input.
- Lenis (lerp 0.08) runs only on home and /work. Case studies, writing, about, now, colophon use native scroll. Lenis is never started under reduced motion.
- Every hover or open state is interruptible (GSAP `overwrite: "auto"`, no `pointer-events: none` during hover animations).
- Reduced motion is a parallel design: field static (one frame rendered or the CSS dither fallback), no Lenis, no SplitText (text simply present), width axis static at 100, page transitions become a 150ms opacity fade, decode disabled, Lab pieces show a still frame with a "Play" control.
- A visible motion toggle in the footer and in Cmd+K mirrors the OS preference and is persisted.

## 7. Components

Server Components by default. Each animated piece is an isolated client leaf.

| Component         | Responsibility                                                       | Depends on                          |
| ----------------- | -------------------------------------------------------------------- | ----------------------------------- |
| `FieldCanvas`     | persistent WebGL field, quality manager, theme uniforms              | OGL, Tempus, field store            |
| `FieldController` | per-route intensity and mode, scroll mapping                         | field store, Lenis or native scroll |
| `HeroMask`        | h1, SVG mask, width-axis pointer logic, fallback dither              | field store                         |
| `SiteNav`         | numbered nav, theme toggle, motion toggle, Cmd+K trigger             | theme store                         |
| `MarginIndex`     | numbered index (home, work) and TOC (case study)                     | content                             |
| `LineReveal`      | SplitText masked reveal wrapper                                      | GSAP, @gsap/react                   |
| `Decode`          | mono label decode on entry                                           | shared 40ms ticker                  |
| `WorkCard`        | cover with dithered treatment, outcome title, meta line              | next/image                          |
| `CaseStudyLayout` | header block, sections, figures, tech notes, TOC                     | MDX components                      |
| `LabFrame`        | iframe-free live piece container with still fallback and Play        | per-piece module                    |
| `CommandMenu`     | Cmd+K palette: goto, theme, motion, grid overlay, copy email         | cmdk or Base UI                     |
| `ThemeToggle`     | dark and paper switch with designed transition (a wipe of the field) | theme store                         |
| `Footer`          | email with Copied state, Now and Colophon links, GitHub, LinkedIn    |                                     |
| `GridOverlay`     | baseline and column grid toggled from Cmd+K                          |                                     |
| `TypeTester`      | colophon and Lab: sliders on wdth, opsz, wght of the site font       |                                     |

Stores: a tiny Zustand store for `theme`, `motion`, `field` (mode, intensity, pointer). No global state for anything else.

## 8. Content model

MDX in the repo, typed with Content Collections (Zod).

- `content/work/*.mdx`: title, outcome, client, year, role, team, stack[], status, links{}, cover, featured, order, confidential (bool), summary, body sections following the case study template in `04-content-strategy.md` section 7.3.
- `content/lab/*.mdx`: title, date, description, component (registry key), source (url or null), stillImage, notes body.
- `content/writing/*.mdx`: title, date, description, draft (bool), body.
- `content/pages/{about,now,colophon}.mdx`.
- Build fails on schema errors. Draft content is excluded from production builds and the sitemap.

Copy rules (from research): first person, maker verbs, specific numbers only when confirmed, outcome before process, ownership stated per project, dates everywhere, no em-dashes anywhere (also enforced by a unit test over content and UI strings), one register.

Content that must be confirmed by Edoardo before publish: NDA scope for traceability; role on each archive site; plugin install count and source visibility; Redergo Sales and Hub depth; availability wording. Placeholders are marked `TODO(edoardo)` in MDX and block the production build.

## 9. Stack and architecture

- Next.js 16.3 App Router, React 19.2, TypeScript strict. `cacheComponents` and `partialPrefetching` on. React Compiler on. All routes statically prerendered.
- Styling: Tailwind CSS 4 for layout, spacing and responsive utilities, with every token declared in `@theme` as CSS custom properties. CSS Modules for animated components and pseudo-element work. `DESIGN.md` documents the same tokens; a unit test checks that every token in `DESIGN.md` exists in `globals.css`.
- Motion: GSAP 3.15 (ScrollTrigger, SplitText, Flip) via `@gsap/react`; Lenis 1.3; Tempus 1.0; React `<ViewTransition>` for route transitions. No Motion library (one animation system).
- WebGL: OGL. Field code under `lib/field/`.
- Content: Content Collections with `@content-collections/mdx`; `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`.
- Fonts: `next/font/local`, variable woff2 in `public/fonts` (Bricolage Grotesque, Geist Mono), license files alongside.
- Images: `next/image`, AVIF and WebP, `sizes` on every image. Covers pre-processed with a dither treatment at build time (sharp script) so the treatment is real pixels, not a runtime filter.
- SEO: Metadata API with title template, canonical, Open Graph per page via `opengraph-image.tsx` (`next/og`), `sitemap.ts`, `robots.ts`, JSON-LD `WebSite` plus `ProfilePage` with `Person` on home, `Article` on essays, `BreadcrumbList` on inner pages, RSS at `/feed.xml`, `llms.txt` at the root.
- Tooling: pnpm, ESLint 9 with `eslint-config-next`, Prettier with the Tailwind plugin, Husky plus lint-staged, commitlint (conventional commits). This matches Edoardo's existing repos.
- Tests: Vitest 5 for content schema, token parity, no-em-dash check, ease and dither utilities, quality manager logic. Playwright 1.62 for every route in both themes, reduced motion emulation, keyboard navigation, `@axe-core/playwright` with zero violations, and one `instant()` navigation check.
- CI: GitHub Actions on push and PR: typecheck, lint, unit, build, Playwright, Lighthouse CI with budgets (performance, accessibility, best practices, SEO all at 1.0 on mobile for `/` and `/work/refattura`; JS under 200 KB gzip on `/` excluding the lazily loaded field, which has its own 40 KB budget).
- Hosting: built to run on Cloudflare Workers through `@opennextjs/cloudflare`, with Vercel as the fallback target. Nothing Vercel-only is used. Deployment target and domain are decided with Edoardo before launch; the repo ships both configs.
- Analytics: none at launch. Umami can be added later without a cookie banner.
- Repository: public, MIT for code, "all rights reserved" for content in `content/` and `public/images` (stated in `LICENSE` and `README`). `AGENTS.md` for agents. `DESIGN.md` and `PRODUCT.md` at the root.

## 10. Quality gates (definition of done for launch)

1. Lighthouse mobile 100/100/100/100 on `/` and `/work/refattura`, run in CI and stated once in the colophon.
2. Core Web Vitals in lab conditions: LCP under 2.0s on simulated 4G, INP under 200ms with CPU 4x throttle on home while the field runs, CLS under 0.02.
3. Zero axe violations on every route in both themes. Skip link first in tab order. Visible focus on every interactive element that matches the design (accent hairline, not the browser default). One `<h1>` per page. Landmarks present.
4. Reduced motion path exercised in Playwright: no Lenis, no SplitText, field static, transitions fade only.
5. Keyboard path: entire site operable, Cmd+K opens with Ctrl+K and Cmd+K, closes with Escape, focus returns.
6. No em-dash anywhere (unit test over content and source strings).
7. Both themes reviewed by Claude in the in-app browser at 1440x900 and 390x844 for every route before a phase is called complete, with screenshots. This is a standing rule from Edoardo.
8. `TODO(edoardo)` count is zero in production content.
9. The public repo README explains stack rationale, architecture, budgets and how to run.

## 11. Error handling and degraded states

- WebGL unavailable or context lost: field not mounted or torn down, CSS dither fallback in headings, everything else identical. Context loss listener re-creates the renderer once, then falls back.
- Fonts fail to load: metric-matched fallbacks via `next/font`, layout holds; no FOIT longer than 100ms (`display: swap`).
- Content build errors: fail the build with the file and field name.
- Route not found: designed 404 with the field in glitch mode and links to Work, Lab, About.
- Runtime error: `error.tsx` per segment, plain typographic message, no field.
- JavaScript disabled: the site reads fully (server-rendered HTML, CSS dither fallback, no transitions).

## 12. Process rules for building it

- Spec first, plan second, small tasks third. Every task ends with a visual review in the in-app browser (desktop and mobile, both themes) before it is reported done.
- Conventional commits, no co-author lines, no em-dashes in code, copy, commits or docs.
- Skills in use: `design-taste-frontend` (design read and pre-flight), `impeccable` (critique, audit, polish, typeset, animate), `web-design-guidelines` (final UI review), `design-md-references` (token discipline).
- Content facts come only from the CV master and from Edoardo. Nothing is invented; unknowns are `TODO(edoardo)`.

## 13. Out of scope for v1

Italian pages, CMS, analytics, newsletter, comments, blog search, sound design (may come in v2 with a toggle), more than one WebGL scene, video hosting (Lab pieces are live code or still images), print stylesheet beyond sane defaults.
