# 03. Stack research: awwwards-grade personal portfolio, September 2026

Research date: 2026-09-03. Versions were checked against the npm registry on this date unless noted. Sources are listed inline with the date of the source. Anything I could not verify from a primary source is marked **UNVERIFIED**.

Target: a frontend developer with a design degree (Turin), daily stack Next.js 16 / React 19 / TypeScript / Tailwind v4 / Astro / GSAP / Lenis / Motion / shadcn/ui / Prisma-Drizzle / Vercel / Cloudflare. Site is animation-heavy, content-light (a few case studies, maybe a blog), SEO-relevant, bilingual (IT/EN), self-hosted by the owner.

---

## 0. Recommended stack (summary)

| Layer | Pick | Version verified | Why |
|---|---|---|---|
| Framework | Next.js App Router | 16.3.4 (2026-08-31) | Matches daily stack, matches darkroom's Satus, Cache Components + partial prefetching give instant navigations, React `<ViewTransition>` works out of the box in the App Router |
| UI runtime | React | 19.2.8 (2026-07-21) | Stable line; App Router bundles the canary that adds `ViewTransition` |
| Language | TypeScript | 7.0.2 (2026-07-08) | Native TS 7 type checking in `next build` since 16.3 |
| Styling | Tailwind CSS v4 + CSS Modules for motion-heavy components, tokens in `@theme` as CSS custom properties | 4.3.3 (2026-07-16) | Same split Satus uses; utilities for layout, hand-written CSS where GSAP and pseudo-elements need it |
| Animation | GSAP + ScrollTrigger + SplitText + Flip via `@gsap/react` | gsap 3.15.0 (2026-04-13), @gsap/react 2.1.2 | 100 percent free since 3.13, industry default for awwwards work |
| Smooth scroll | Lenis (opt-in, off under `prefers-reduced-motion`) | 1.3.26 (2026-08-05) | Native scroll under the hood, sticky and anchors keep working |
| Frame loop | Tempus | 1.0.0 (2026-07-29) | Single rAF for GSAP + Lenis + WebGL |
| React micro-interactions | Motion (optional, only if you want layout/gesture animations or `animateView`) | 13.2.0 (2026-09-02) | Do not run two competing animation systems on the same elements |
| 3D / shaders | React Three Fiber + drei + three, one scene max, WebGPURenderer with automatic WebGL 2 fallback. OGL if it is a single full-screen shader | @react-three/fiber 9.7.0, drei 10.7.8, three 0.185.1, ogl 1.0.11 | R3F v9 is the React 19 line; WebGPU is ~87 percent global |
| Content | MDX in the repo, typed with Content Collections (or plain `@next/mdx` + `import.meta.glob`) | @content-collections/core 0.15.2, @next/mdx 16.3.4 | Zero external services, Git is the CMS, type-safe frontmatter |
| i18n | next-intl with `[locale]` segment + `next/root-params` | 4.14.2 (2026-09-01) | Only maintained App Router i18n lib with static rendering story |
| Fonts | `next/font/local` with variable WOFF2 from Fontshare (ITF Free Font License) or a purchased Pangram Pangram web license | n/a | Self-hosted, size-adjust fallbacks generated automatically |
| Tests | Vitest + Playwright (+ `@axe-core/playwright`, `@next/playwright` `instant()`) | vitest 5.0.0 (2026-09-03), @playwright/test 1.62.1 | Same as Satus, plus a regression test for instant navigation |
| CI | GitHub Actions: typecheck, lint (oxlint or Biome), unit, e2e, Lighthouse CI with budgets, bundle analyzer | @lhci/cli 0.15.1 | Signals a recruiter can read in the repo |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` (free tier if the Worker fits 3 MiB gzip) or Vercel Pro. Vercel Hobby is non-commercial only | @opennextjs/cloudflare 1.20.6 (2026-09-02) | "Host it myself" plus Next.js 16 support |
| Analytics | Umami (MIT, self-hosted, cookieless) or Vercel Web Analytics if on Vercel | Umami v3 | No cookie banner needed |

Alternative if you want the lightest possible site and free static hosting: **Astro 7.3 with React islands**, native cross-document view transitions, GSAP in vanilla scripts. See section 1.7.

---

## 1. Framework choice

### 1.1 Next.js 16 (current: 16.3.4)

Source: nextjs.org/blog/next-16 (2025-10-21), nextjs.org/blog/next-16-3 (2026-08-03), nextjs.org/blog index (checked 2026-09-03, latest post 2026-09-03 "How Turbopack chunks your JavaScript").

Verified facts:

- **16.0 (2025-10-21)**: Turbopack stable and default for dev and build (webpack via `--webpack`). React Compiler support stable (opt-in `reactCompiler: true`, Babel-based, slower builds). Cache Components (`cacheComponents: true`) replace the `experimental.ppr` and `dynamicIO` flags: PPR + `"use cache"` directive, everything dynamic by default, caching fully opt-in. `middleware.ts` renamed to `proxy.ts` (Node runtime). Build Adapters API alpha. New `updateTag()`, `refresh()`, `revalidateTag(tag, profile)`. Enhanced routing: layout deduplication and incremental prefetching. React 19.2 features (View Transitions, `useEffectEvent`, `<Activity/>`) via the bundled React canary. Minimums: Node 20.9, TS 5.1, Chrome/Edge/Firefox 111+, Safari 16.4+. Removed: AMP, `next lint`, automatic `scroll-behavior: smooth` (opt back in with `data-scroll-behavior="smooth"` on `<html>`; relevant for Lenis users), sync `params`/`cookies()`.
- **16.2 (March 2026)**: Adapter API stable (source: opennext.js.org/news/2026-03-25-3-years-of-opennext). Payload requires 16.2.6+.
- **16.3 (2026-08-03)**: "Instant Navigations" opt-in suite: `cacheComponents: true` + `partialPrefetching: true`, Instant Insights devtool that flags non-instant navigations, Navigation Inspector, `@next/playwright` `instant()` test helper, better ISR (loading shell for non-prerendered params). Also: up to 90 percent less dev memory (disk cache + memory eviction on by default), Turbopack disk cache for `next build` on by default, TypeScript 7 type checking, native Node streams for SSR (+22 percent throughput), `catchError` custom error boundaries, `import.meta.glob` in Turbopack, `next/root-params` (`import { lang } from 'next/root-params'`), prefetch inlining, immutable static assets across deploys. Experimental: Rust React Compiler inside Turbopack (`experimental.turbopackRustReactCompiler`), `experimental.useOffline`. Vercel says Instant Navigations behaviors become the default in the next major.
- **View Transitions**: nextjs.org/docs/app/guides/view-transitions (updated 2026-08-25). "View transitions work in the App Router with no configuration." `import { ViewTransition } from 'react'`, `<Link transitionTypes={['nav-forward']}>`, `router.push(href, { transitionTypes })`. Route navigations are React Transitions so `<ViewTransition>` activates automatically. Browser-initiated back/forward carries no transition type. Guide includes `prefers-reduced-motion` CSS and `::view-transition { pointer-events: none }` recipe. Requires Chromium 125+ style features (transition types, `view-transition-class`), "some animations may behave differently in Safari".
- **React Compiler**: React Compiler 1.0 shipped 2025-10-07 (react.dev/blog/2025/10/07/react-compiler-1). Stable in Next 16 but not on by default. For a portfolio with GSAP refs the compiler is safe and low-value; enable it, it costs only build time.
- **MDX**: `@next/mdx` 16.3.4, Turbopack accepts remark/rehype plugins as string names only (no function options). Rust `mdxRs` still experimental (docs updated 2026-08-25).

Fit for this project: excellent for a React developer, but note the honest overhead: React runtime plus RSC payloads on a site that could be 95 percent static HTML. The Cache Components model mitigates it (fully prerendered shells, instant navigations) and the App Router is now the only React framework where `<ViewTransition>` works without installing a canary yourself.

### 1.2 Satus by darkroom.engineering (the canonical awwwards Next.js starter)

Source: github.com/darkroomengineering/satus README and package.json (fetched 2026-09-03, 1,104 commits on main).

Current contents:

- Runtime: Next.js **16.3.4**, React **19.2.8**, TypeScript **7.0.2**, Bun >= 1.4 as runtime and test runner, Node >= 24.20.
- Flags on: `cacheComponents` (instant navigations), React Compiler, strict TS, security headers, rate limiting, **performance budgets in CI**.
- Styling: Tailwind CSS **4.3.3** (`@tailwindcss/postcss` and `@tailwindcss/vite`) side by side with **CSS Modules** "under one cascade contract", `postcss-preset-env`, `postcss-functions`, `@csstools/postcss-global-data`, `colorjs.io`.
- Motion: `gsap` ^3.15.0, `@gsap/react` ^2.1.2, `lenis` ^1.3.26, `tempus` ^1.0.0, `hamo` ^1.0.3, `@theatre/core` + `@theatre/studio` 0.7.2 (timeline tooling for WebGL scenes).
- WebGL (opt-in module under `lib/webgl` behind feature flags): `@react-three/fiber` ^9.7.0, `@react-three/drei` ^10.7.8, `three` ^0.185.1, `postprocessing` ^6.39.4.
- UI primitives: `@base-ui/react` ^1.7.0 (not Radix), `clsx`, `zustand` ^5, `zod` ^4.
- Integrations (isolated, removable with `bun run setup:project`): Sanity (`sanity` ^6.11, `next-sanity` ^13.3, `@portabletext/react`), Shopify.
- SEO surfaces in `app/`: `llms.txt`, `sitemap.ts`, `robots.ts`.
- Analytics: `@vercel/analytics` ^2.0.1.
- Tooling: `oxlint` + `oxfmt` (oxc toolchain, replaces Biome/ESLint/Prettier), `lefthook`, Storybook **10.5** (`@storybook/nextjs-vite`, `@storybook/addon-mcp`), Playwright **1.62.1** + `@axe-core/playwright`, `@next/playwright`, `@next/bundle-analyzer`, `react-scan`, `happy-dom` + Testing Library for unit tests, `deslop-cli`.

Takeaway: the studio that made Lenis, Tempus and Hamo still bets on Next.js App Router with Tailwind v4 + CSS Modules, GSAP, R3F and Base UI. Copying this shape is defensible in front of any senior engineer; copying the whole starter is not (Sanity, Shopify, Theatre and Storybook are agency needs, not portfolio needs).

### 1.3 Astro 7 (current: 7.3.1)

Source: astro.build/blog (7.0 on 2026-06-22, 7.1 2026-07-16, 7.2 2026-08-06, 7.3 2026-09-03), docs.astro.build upgrade-to/v7, docs view-transitions guide, docs fonts guide.

- **7.0**: Vite 8 with Rolldown ("10 to 30x faster than Rollup"), Rust rewrite of the `.astro` compiler (stricter HTML, JSX-style whitespace, `compressHTML: 'jsx'` default), Sätteri Rust Markdown/MDX processor replacing remark/rehype by default (opt back in with `@astrojs/markdown-remark`), queued rendering stable (~2.4x), Advanced Routing via `src/fetch.ts` (Hono middleware compatible), route caching stable with Netlify/Vercel/Cloudflare CDN providers, background dev server and JSON logs for agents. `@astrojs/db` removed. Builds 15 to 61 percent faster.
- **7.1 to 7.3**: CSP controls, pagination and content collection improvements, experimental incremental static builds (Cloudflare integration supported), `astro preview --ignore-lock`.
- **View transitions**: `<ClientRouter />` (renamed from `<ViewTransitions />` in Astro 5) gives SPA-style navigation with `transition:name`, `transition:animate`, `transition:persist`, five lifecycle events, `fallback="animate|swap|none"`, respects `prefers-reduced-motion` and announces routes for AT. Docs explicitly note browser-native cross-document view transitions (`@view-transition { navigation: auto }`) as a lighter alternative. Joost de Valk (2026-04-22) dropped ClientRouter for native cross-document transitions + Speculation Rules and documented that ClientRouter was breaking iOS Safari Reader Mode; his trade-off list: keep ClientRouter if you need persistent UI across navigations (a persistent WebGL canvas or Lenis instance is exactly that case).
- **Fonts API**: stable (no experimental flag in the main docs). Providers: local, Google, Fontsource, Fontshare, Bunny, Adobe, NPM. Generates preload links, `size-adjust` fallbacks, downloads and self-hosts at build time.
- **Content**: Content Layer API (loaders for local files, CMS, APIs) since v5; Live Content Collections stable (runtime), per Astro changelog.
- React 19 islands work via `@astrojs/react` (`client:load|visible|only`), plus `withState()`/`getActionState()` for Astro Actions with `useActionState`. UNVERIFIED: exact React peer range, the integration docs did not state it.

Fit: the best raw performance and simplest hosting (static output, free on Cloudflare Workers static assets). Real-world 2026 awwwards portfolios do use it (Codrops case study 2026-02-18: Joffrey Spitzer, Astro + GSAP + Lenis + Three.js + Swup + Tailwind + Prismic + Netlify, vanilla JS, "Astro makes SSG straightforward"). Downsides for this user: persistent Lenis/WebGL across navigations requires ClientRouter or Swup/Barba rather than the native MPA path; R3F inside islands is fine but the "React everywhere" mental model is gone; fewer of his daily skills are on display.

### 1.4 TanStack Start

Source: tanstack.com/start docs overview and static-prerendering guide (checked 2026-09-03), npm `@tanstack/react-start` 1.168.49 (2026-08-22).

Docs still label it "Release Candidate: feature-complete, API stable, not bug-free". 1.0 RC was announced 2025-09 and re-announced 2026-03-17 with GA "shortly after". Static prerendering exists (`tanstackStart({ prerender: { enabled, crawlLinks: true, autoStaticPathsDiscovery } })`) with Vite or Rsbuild. Type-safe router is the selling point. No RSC. Verdict: attractive and modern, but the RC label and the small pool of creative-site examples make it a weaker "explain to a recruiter" story than Next.js or Astro for a portfolio. **UNVERIFIED**: whether a non-RC 1.0 tag was cut between March and September 2026; the docs page I fetched still says RC.

### 1.5 Nuxt 4, SvelteKit

- Nuxt **4.5.2** (2026-08-05); 4.5 (2026-07-18) brought Vite 8, Rspack 2, experimental SSR streaming. No Nuxt 5 announced (nuxt.com/blog). Arnaud Rocca's 2026 portfolio (Codrops 2026-03-31) is Nuxt + GSAP + Lenis + OGL + Prismic, so Nuxt is a real creative-dev option, but it is not this user's ecosystem.
- SvelteKit **2.70.3** (2026-08-18), SvelteKit 3 in prerelease (`3.0.0-next.13`, svelte.dev "What's new" August 2026), Svelte 5.55.x. Excellent for motion-heavy sites (small runtime, built-in transitions) but zero overlap with the user's React skills.

### 1.6 Plain Vite + React

Codrops 2026-05-06 ("From Shader Uniforms to Clip-Path Wipes") is Vite + React 18 + OGL + GSAP. Fine for a WebGL toy, weak for SEO and bilingual content without adding a prerender step. Not recommended when Next.js or Astro cost the same to set up.

### 1.7 Recommendation and trade-offs

**Primary: Next.js 16.3 App Router.**

Reasons: it is what he uses daily and what Italian and European agencies hiring React developers screen for; Satus proves it is the awwwards-tier default; `cacheComponents` + `partialPrefetching` give fully prerendered shells and instant navigations; `<ViewTransition>` and `Link transitionTypes` work today without a canary install; `next/font`, `next/og`, `sitemap.ts`, `robots.ts`, `import.meta.glob` for MDX are all first-party; next-intl 4 plus `next/root-params` (16.3) make the IT/EN split clean.

Costs he should be able to name: React runtime and RSC payload on a mostly static site (mitigate: Server Components by default, a single `"use client"` boundary per animated section, `@next/bundle-analyzer` in CI); Node server or adapter needed for anything not statically exportable (mitigate: OpenNext on Cloudflare Workers, or accept Vercel); the React canary underneath the App Router means `ViewTransition` API surface can still change.

**Alternative: Astro 7.3.** Choose it if the priority is the lightest page weight, free static hosting, and native cross-document transitions. Keep ClientRouter (or Swup) if a Lenis instance or WebGL canvas must survive navigation. This is the second-best "explain it to a senior" story because the reasoning ("islands, zero JS by default, MPA with native view transitions") is crisp.

What top creative developers actually use in 2025 to 2026 (evidence, not vibes): Satus (Next.js), Codrops case studies (Astro, Nuxt, Vite+React), and across all of them the same motion layer: GSAP + Lenis, Three.js or OGL, Prismic or Sanity for content, Tailwind or hand-written CSS. The framework is the least consistent choice; the motion stack is nearly universal.

---

## 2. Animation stack

### 2.1 GSAP

Sources: gsap.com/blog (3.15 on 2026-04-13, 3.14 on 2025-12-08, 3.13 on 2025-04-29), gsap.com/community/standard-license (effective 2025-04-30, last modified 2025-05-30), webflow.com/blog/gsap-becomes-free, npm gsap 3.15.0 (2026-04-13).

- **Licensing**: GSAP Standard License. 100 percent free including every former Club plugin (SplitText, MorphSVG, DrawSVG, ScrollSmoother, ScrambleText, Inertia, Physics2D, MotionPath, etc.), commercial and client work included, AI-generated code explicitly permitted, no attribution required. Only prohibition that matters: you may not use GSAP inside a no-code visual animation builder that competes with Webflow, and no reverse engineering. Webflow acquired GreenSock 2024-10-15.
- **3.13 (2025-04-29)**: everything free. SplitText rewritten: 50 percent smaller, `aria: "auto" | "hidden" | "none"` (default `auto` puts `aria-label` on the parent and `aria-hidden` on the split children), `autoSplit` re-splits on font load and resize, `onSplit()` re-runs animations, `mask: "lines" | "words" | "chars"` for clip reveals, `deepSlice`, `propIndex`, `smartWrap`. Breaking: no more `position: "absolute"`, `lineThreshold` removed. Also `color: "var(--brand)"` targets animate to CSS variables.
- **3.14 (2025-12-08)**: MorphSVG `smooth` option.
- **3.15 (2026-04-13)**: `easeReverse` (reversing a tween reverses the easing curve, so ease-out becomes ease-in).
- **Plugins that matter for a portfolio**: ScrollTrigger (pin, scrub, batch), SplitText (text reveals with built-in ARIA), Flip (layout morphs between grid and detail views; overlaps with `<ViewTransition>`, pick one per transition), Observer (wheel/touch/pointer normalization for full-page sections), MotionPath (SVG path following), DrawSVG and MorphSVG (SVG line and shape animation). ScrollSmoother is now free but overlaps Lenis; pick one (Lenis is smaller and framework-agnostic, ScrollSmoother integrates with ScrollTrigger effects out of the box).
- **@gsap/react 2.1.2 (2025-01-15)**: `useGSAP()` wraps `gsap.context()`, reverts on unmount, `scope` ref for selector text, `dependencies` + `revertOnUpdate`, `contextSafe()` for handlers created after setup, uses `useLayoutEffect` with an isomorphic fallback, needs `"use client"`. Not updated in 2026 but it is a 200-line hook that does not need to be. Rocca's case study (2026-03-31) documents the classic bug it prevents: re-running SplitText on already-split DOM.
- Motion's own blog (2026-01-26, "hardware-accelerate your favourite GSAP easing functions") argues GSAP runs on the main thread and shows porting GSAP eases to CSS `linear()`. Fair point for INP: keep GSAP off the main thread during interaction-heavy moments, use CSS/WAAPI for hover states, GSAP for choreography and scroll.

### 2.2 Motion (formerly Framer Motion)

Sources: npm motion 13.2.0 and framer-motion 13.2.0 (both 2026-09-02), motion.dev/docs/react-upgrade-guide, motion.dev/magazine (2026-06-30 animateView post; 2026-07-23 "Introducing Motion UI").

- Import from `motion/react`; `framer-motion` is kept as an alias package. 13.0 (2026-08-05) breaking change: removed the optional `@emotion/is-prop-valid` dependency (only matters with styled-components/Emotion). 12.x had no React breaking changes.
- **animateView()** (2026-06-30) is free in core: a wrapper over the native View Transition API that auto-generates `view-transition-name`s, accepts Motion springs/easings instead of CSS keyframes, queues interrupted transitions, auto-crops morphing layers to fix aspect-ratio distortion, groups layers to match DOM structure, staggers. Works in vanilla JS and React.
- Motion+ is the paid tier (Cursor, Carousel, Ticker components); core stays MIT.
- Role alongside GSAP: Motion is the better tool for declarative React state-driven UI (layout animations, `AnimatePresence`, gestures, springs) and for hardware-accelerated transforms/opacity via WAAPI. GSAP is the better tool for timelines, scroll choreography and text splitting. Running both is normal (Satus does not, it uses GSAP only). Rule: never let both libraries write to the same element's transform.

### 2.3 Lenis, Tempus, Hamo

Sources: github.com/darkroomengineering/lenis README, npm lenis 1.3.26 (2026-08-05), tempus 1.0.0 (2026-07-29), hamo 1.0.3 (2026-08-14).

- **Lenis 1.3.26**: under 4 KB, zero deps, runs on native scroll (`scrollTo` based, not transform based), so `position: sticky`, anchor links, keyboard and screen-reader navigation keep working. `lenis/react` (`<ReactLenis root>` + `useLenis`), `lenis/snap` plugin for scroll-snap, `allowNestedScroll` and `data-lenis-prevent`. Respects `prefers-reduced-motion` by default. Known limits: Safari caps at 60 fps, no iframe wheel forwarding, `position: fixed` can lag on pre-M1 Safari, CSS `scroll-snap` needs the snap plugin. ScrollTrigger integration: `lenis.on('scroll', ScrollTrigger.update)` and drive `lenis.raf` from `gsap.ticker` (or Tempus) with `lagSmoothing(0)`. No Lenis 2 announced (**UNVERIFIED** beyond a GitHub issues search).
- **Is smooth scroll still acceptable in 2026?** The criticism ("scroll hijacking") targets transform-based fake scroll. Lenis was built to answer it and the community consensus (dev.to 2026 analysis, Lunardi 2025, Codrops case studies) is that Lenis-style inertia on top of native scroll is fine when: it is disabled under `prefers-reduced-motion`, it is not stacked with CSS scroll-snap, and the site is not text-heavy documentation. Next.js 16 removed its automatic `scroll-behavior: smooth`, which avoids a double-smoothing conflict. Recommendation: ship Lenis with a small lerp (0.08 to 0.1), an accessible toggle, and reduced-motion off switch; do not use it on the blog/reading pages.
- **Tempus 1.0.0**: ~1 KB shared rAF loop with explicit ordering, frame budget and FPS throttling; you remove GSAP's ticker and feed `gsap.updateRoot(time / 1000)`, and feed `lenis.raf(time)`. Worth it once Lenis + GSAP + a WebGL loop coexist.
- **Hamo 1.0.3**: tree-shakeable React hooks: `useRect`, `useWindowSize`, `useResizeObserver`, `useLazyState`, `useDebounce*`, `useObjectFit`, `useIntersectionObserver`, `useMediaQuery`, `useEffectEvent` polyfill, `useScrollTrigger`, `useTransform`. Use it instead of hand-rolling observers.

### 2.4 CSS scroll-driven animations

Sources: caniuse animation-timeline (87.01 percent global), webkit.org blog 17101 (2025-06-20, Safari 26), MDN Firefox 155 release notes (2026-09-01), Interop 2026 (web.dev 2026-02-12).

- Chrome/Edge 115+, Safari 26.0+ (September 2025; threaded scroll-driven animations in 26.4), Firefox **still behind** `layout.css.scroll-driven-animations.enabled` in Firefox 155 (stable 2026-09-01). caniuse lists Firefox 158 as supported; Firefox 158 is scheduled 2026-10-13 (whattrainisitnow), so treat Firefox as "shipping this autumn", **UNVERIFIED until it lands**. Scroll-driven animations are a named Interop 2026 focus area, so all engines are committed.
- What they replace: parallax, progress bars, reveal-on-enter (`animation-timeline: view()`, `animation-range: entry 0% cover 40%`), sticky header state (better via scroll-state queries), horizontal scroll progress. They run off the main thread and cost zero JS, which helps INP.
- What they do not replace: pinning with scrub of a JS timeline, SplitText choreography, Lenis-synchronized effects (Lenis moves native scroll, so CSS timelines do follow it, but with the lerp delay), anything needing callbacks. Pattern: CSS timelines for decorative motion with a `@supports (animation-timeline: view())` guard and ScrollTrigger for narrative sections.

### 2.5 View Transitions API

Sources: caniuse view-transitions (91.54 percent, same-document), caniuse `@view-transition` (86.21 percent, cross-document), MDN, Baseline 2025 list (web.dev/baseline/2025), Interop 2026.

- Same-document (`document.startViewTransition`): Chrome 111+, Safari 18+, Firefox 144+ (October 2025). Baseline 2025 Newly available. `view-transition-class` also Baseline 2025.
- Cross-document (`@view-transition { navigation: auto }`): Chrome 126+, Safari 18.2+, Firefox not shipped through 158. Interop 2026 focus area.
- **React `<ViewTransition>`**: react.dev reference shows it on `19.3.0-canary`; still Canary/Experimental, not in stable 19.2.x (latest 19.2.8). Props: `enter`, `exit`, `update`, `share`, `default`, `name`, `onEnter/onExit/onUpdate/onShare`, plus `addTransitionType()`. Caveats from the docs: must be the first thing before DOM nodes, only activates inside Transitions/Suspense/`useDeferredValue`, one mounted `name` at a time, no automatic reduced-motion handling, back button (popstate) skips animations unless the router uses the Navigation API. No React 19.3 or 20 stable announced as of 2026-09-03.
- **Next.js exposure**: works in the App Router by default (bundled canary), `Link transitionTypes`, guide with shared-element morph, Suspense reveal, directional slides, same-route crossfade (see 1.1).
- **Astro exposure**: `<ClientRouter />` (same-document, with fallbacks for unsupported browsers) or native cross-document at-rule with zero JS (see 1.3).
- **Motion `animateView()`** for imperative use in any framework.

---

## 3. 3D and shaders

Sources: npm three 0.185.1 (2026-07-01), @react-three/fiber 9.7.0 (2026-07-31), @react-three/drei 10.7.8 (2026-08-05), postprocessing 6.39.4, ogl 1.0.11 (2025-01-27), r3f.docs.pmnd.rs v9 migration guide, caniuse webgpu (87.14 percent), WebKit Safari 26 announcement (2025-06-09).

- **three r185**: WebGPURenderer keeps gaining features (texture-array render targets, WebXR, descriptor caching), TSL improvements (3x faster compilation, `textureGather`, `storageTexture3D`), WebGL path still maintained in parallel. Community consensus: WebGPURenderer became a production option around **r171** (September 2025) with automatic WebGL 2 fallback (`import { WebGPURenderer } from 'three/webgpu'`); **UNVERIFIED** exact release note wording, taken from utsubo.com and buildmvpfast 2026 guides. TSL (Three Shading Language) compiles to WGSL and GLSL, so one shader serves both backends.
- **WebGPU support**: Chrome/Edge 113+, Safari 26+ (macOS, iOS, iPadOS, September 2025), Chrome Android 152+, Firefox desktop marked "disabled by default" through 158 on caniuse (Firefox shipped WebGPU on Windows only in 141 per my prior knowledge; **UNVERIFIED** here). Linux, Intel Macs and older Android remain gaps. Always keep the WebGL 2 fallback.
- **React Three Fiber v9**: React 19 compatibility release; StrictMode now inherited from react-dom; `gl` prop accepts an async factory (needed for WebGPURenderer's `await renderer.init()`); TypeScript `ThreeElements['mesh']` replaces `MeshProps`; `useLoader` pooling. Satus pins fiber 9.7.0 + drei 10.7.8 + postprocessing.
- **OGL 1.0.11**: 29 KB minzipped total (core 8, math 6, extras 15), Unlicense, no dependencies, WebGL only (no WebGPU). Two 2026 Codrops portfolios (Rocca, and the clip-path/shader-uniform one) chose OGL for a single fluid or distortion shader. Pick OGL when the 3D is one full-screen fragment shader or image distortion; pick R3F when you need scene graph, GLTF, post-processing, or drei helpers.
- **When a portfolio should not use WebGL**: when it is decorative on every page (battery, INP, mobile GPUs), when it blocks LCP, when there is no reduced-motion or no-WebGL fallback, when the content is the case studies and the shader is noise. Use it for one hero or one interactive moment, lazy-load it after LCP, pause on `visibilitychange` and when off-screen, cap `dpr` at 1.5 to 2, keep draw calls under ~100, target under 16 ms frame on a mid-range Android, provide a static poster and `prefers-reduced-motion` path (Rocca ships a full no-JS HTML/CSS version).
- **Performance budgets (recommend and enforce in CI)**: JS shipped to the home page under 200 KB gzip including React (three alone is ~150 KB gzip when tree-shaken, so a 3D hero pushes you to ~350 KB; document this as a conscious exception loaded after interaction or after LCP), LCP under 2.0 s on 4G, INP under 200 ms, CLS under 0.05, total page under 1.5 MB with images in AVIF/WebP, fonts under 150 KB. Satus ships "performance budgets in CI" as a headline feature; do the same with Lighthouse CI assertions.

---

## 4. Typography tooling

- **next/font** (docs version 16.3.4): `next/font/local` and `next/font/google`; Google fonts are downloaded at build time and self-hosted (no requests to Google), variable fonts need no `weight`, `axes: ['slnt']` for extra axes, `display: 'swap'` default, `preload` per route based on where the loader is called, `adjustFontFallback` generates `size-adjust`/`ascent-override` metric-matched fallbacks to kill CLS, `variable: '--font-x'` for Tailwind `@theme inline { --font-sans: var(--font-x) }`. Load each font once in a `fonts.ts` file.
- **Astro Fonts API**: stable, providers include Fontshare and Fontsource, same preload and fallback generation.
- **Fontshare (ITF Free Font License)**: personal and commercial use, web self-hosting of the WOFF2 allowed, no pageview limit, no attribution beyond keeping the license file; you may not resell, redistribute, or modify and redistribute the fonts. Strong variable families: Satoshi, General Sans, Clash Display, Switzer, Cabinet Grotesk. Source: fontshare.com/licenses/itf-ffl (page content did not render for me; terms confirmed via Indian Type Foundry licensing page and 2026 reviews, so mark the exact clause wording **UNVERIFIED**).
- **Pangram Pangram**: fonts are free to try for personal use only; portfolios are listed as personal, but a portfolio used to win paid work is commercial in most foundries' reading. Web licenses are priced by monthly pageviews; buy one or use Fontshare. Variable versions available.
- **Google Fonts variable**: fine, but self-host via next/font; avoid the `fonts.googleapis.com` link for privacy (GDPR rulings in the EU) and performance.
- **Fluid type**: `clamp()` via Utopia (utopia.fyi calculators generate the clamp scale between a min and max viewport; a methodology, not a package). Pair with Capsize (`@capsizecss/core`, `@capsizecss/metrics`, `@capsizecss/unpack`) if you want cap-height based sizing and trimmed leading in JS today.
- **`text-wrap: balance`** (headings, up to ~6 lines) and **`text-wrap: pretty`** (body): Baseline 2024 per MDN; Safari 26 added `pretty` with improved hyphenation. Use both unconditionally.
- **`text-box: trim-both cap alphabetic`** (formerly `leading-trim`): Chrome 133, Safari 18.2, Firefox 154 per Chrome blog (2025-01-14). Now cross-browser; use it on display headings and buttons, keep Capsize only for legacy fallback.
- **`font-size-adjust`**: Chrome 127+, Firefox 118+, Safari 17+ (89 percent). Useful for fallback matching; next/font's override descriptors cover most of it.
- **`font-palette`**: Chrome 101, Firefox 107, Safari 15.4 (95 percent). Only relevant if you use a COLRv1 color font for a display moment.
- **SplitText and accessibility**: leave `aria: "auto"` (parent gets `aria-label`, children `aria-hidden`); for text containing links, set `aria: "none"` and add a visually-hidden duplicate; only split what you animate (`type: "lines"` or `"words"`, chars only for short headings); use `mask` instead of `overflow: hidden` wrappers; `autoSplit: true` with the animation inside `onSplit` so font loading and resize re-split cleanly; wrap in `useGSAP` so it reverts on unmount. Under `prefers-reduced-motion`, skip SplitText entirely (do not even split).

---

## 5. Styling

- **Tailwind CSS 4.3.3** (2026-07-16; 4.3 announced 2026-05-08, 4.1 2025-04-03, 4.0 2025-01-22). CSS-first config: `@import "tailwindcss"; @theme { --color-ink: oklch(...); --font-display: var(--font-x) }`, Lightning CSS engine, `@utility`, `@variant` (stacked and compound in 4.3), `@container-size`, scrollbar utilities, logical property utilities, `font-features-*`, `@starting-style` variants, container queries built in. Browser floor: Chrome 111, Safari 16.4, Firefox 128 (same as Next.js 16). Docs say CSS Modules coexist but do not use `@apply` inside them (each module triggers a Tailwind run); use the `@theme` CSS variables directly in module CSS instead. That is exactly the Satus contract.
- **CSS Modules**: still first-class in Next.js and Astro, zero runtime, ideal for components with many pseudo-elements, keyframes, `::view-transition-*` rules and GSAP-controlled custom properties, which are awkward as utilities.
- **vanilla-extract**: maintained (~450k weekly downloads reported in 2026 comparisons), zero-runtime, TypeScript tokens; still a niche choice and does not fit Astro islands well. Skip unless you want typed themes badly.
- **What awwwards sites actually do**: mixed. Spitzer's Astro portfolio uses Tailwind; Satus uses Tailwind + CSS Modules; many studio sites are hand-written CSS with custom properties (Rocca's Nuxt site). Nobody wins awards for the CSS strategy; they win for restraint.
- **Recommendation**: Tailwind v4 for layout, spacing, responsive and state utilities, with all design tokens declared in `@theme` (so they are also plain CSS variables for GSAP: `gsap.to(el, { '--reveal': 1 })`). CSS Modules (or a colocated `.css` file per component) for anything animated or pseudo-element heavy. shadcn/ui only for the few real UI widgets (dialog, command menu, toast); note shadcn moved to **Base UI as default** in July 2026 and Satus uses `@base-ui/react` 1.7.0 directly, so either is current. Do not import a full component library for a portfolio.

---

## 6. Content

Sources: nextjs.org/docs/app/guides/mdx (2026-08-25), Content Collections README, velite.js.org, npm versions, payloadcms.com installation docs, Sanity pricing summaries (2026), wisp.blog on Contentlayer, dub.co migration post.

- **Contentlayer**: abandoned (Stackbit acquired by Netlify). Do not use.
- **Content Collections 0.15.2** (2026-06-16, Sebastian Sdorra, MIT): Zod schemas, generated types, hot reload, adapters for Next.js (`@content-collections/next`), Vite, SvelteKit, Qwik, Solid, Remix, plus CLI; `@content-collections/mdx` compiles MDX to a component you render with `<MDXContent code={post.mdx} />`. Dub.co migrated to it from Contentlayer. Best drop-in for a Next.js MDX portfolio.
- **Velite 0.4.0** (2026-06-17, MIT, Lei): framework-agnostic build step, Zod schemas, MDX, built-in relative asset and image processing. Equally good; slightly less Next.js-specific glue.
- **@next/mdx 16.3.4**: first-party, MDX files as routes or imports, `mdx-components.tsx` required, no frontmatter by default (use `export const metadata` or `gray-matter`), Turbopack requires plugin names as strings, `experimental.mdxRs` Rust compiler still experimental. Combined with Next 16.3's `import.meta.glob('./posts/*.mdx', { eager: true })` you can build a typed index with no extra library; you lose schema validation.
- **next-mdx-remote 6.0.0** (2026-02-12): only needed for MDX fetched at runtime from a CMS. Not needed for repo-based content.
- **Payload 3.88.0** (2026-08-11): runs inside the Next.js app (`/admin` route), requires Next.js 15.2.9 to 15.4.x or **16.2.6+**, Node 20.9+, adapters for MongoDB, Postgres, SQLite. Great product, but it turns a static portfolio into a database-backed app that needs a persistent server or serverless DB (D1/Postgres). Overkill for 5 case studies.
- **Sanity 6.12.0 / next-sanity 13.3.4** (2026-09-01): free plan (2 datasets, 2 non-admin users, 500k CDN requests, 10 GB bandwidth, 20 GB assets per 2026 pricing summaries, **UNVERIFIED** against sanity.io/pricing directly) is enough forever for a portfolio, Studio can be embedded at `/studio`. Satus uses it because agencies need editors. A solo developer does not.
- **Recommendation**: Markdown/MDX in the repo, typed with Content Collections (Zod schema per case study: title, client, year, role, stack, cover, locale, `draft`), one folder per locale (`content/work/en/*.mdx`, `content/work/it/*.mdx`), rendered in Server Components, images through `next/image` with `sizes`. Git history is the CMS, PR previews are the editorial workflow, and "I did not add a CMS because the content changes four times a year" is a good senior-engineer answer. Add Sanity later only if a non-technical person must edit.

---

## 7. Quality signals a senior developer or recruiter checks

### 7.1 Performance

- **Lighthouse 13** (October 2025, Chrome 143 stable): legacy audits replaced by the same "insights" as the DevTools Performance panel; scoring unchanged. Lighthouse also added an **llms.txt audit for agentic browsing** (llmstxt.org). Target 100/100/100/100 on mobile for home and one case study, and say so in the README with a screenshot and a CI badge.
- **Core Web Vitals**: LCP <= 2.5 s, **INP <= 200 ms** at p75 (web.dev/articles/inp), CLS <= 0.1. INP is the one motion-heavy sites fail: long main-thread tasks from GSAP tickers, Lenis rAF, and WebGL loops delay input handling. Mitigations: Tempus single loop, `will-change` only during animation, CSS/WAAPI for hover and press states, `scheduler.yield()`/`requestIdleCallback` for non-urgent work, pause loops off-screen, avoid layout thrash (read then write, `useLazyState` from Hamo), test with CPU 4x throttle.
- **Lighthouse CI** (`@lhci/cli` 0.15.1, 2025-06-25, Apache-2.0; maintenance is slow but it works): `lhci autorun` in GitHub Actions with `assert` budgets (performance >= 0.95, total-byte-weight, unused-javascript) and `upload` to temporary public storage. Alternative: Unlighthouse or the PageSpeed Insights API; the Next.js 16.3 `@next/playwright` `instant()` helper is a good complement for navigation speed regressions.
- **Bundle analysis**: `@next/bundle-analyzer` 16.3.4 on `ANALYZE=true`, plus `react-scan` in dev for re-renders (Satus does both).

### 7.2 Accessibility with heavy motion

- `prefers-reduced-motion: reduce`: disable Lenis, skip SplitText, set GSAP `gsap.globalTimeline.timeScale(...)` or use `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` blocks, zero out `::view-transition-*` durations (recipe in the Next.js guide), stop WebGL loops and show a poster. Offer a visible motion toggle too (not everyone sets the OS flag).
- Focus management with custom scroll: Lenis keeps native focus scrolling, but pinned ScrollTrigger sections can trap focus behind pinned layers; ensure every focusable element is reachable in DOM order, `scrollIntoView` on focus for pinned content, `:focus-visible` styles that survive dark WebGL backgrounds.
- Skip link as the first focusable element, `<main id="main">`, one `<h1>` per page, landmarks (`header`, `nav`, `main`, `footer`), buttons for actions and links for navigation, `aria-live="polite"` route announcer if you replace the router (Astro ClientRouter does it; Next.js App Router has one built in).
- Automated: `@axe-core/playwright` on every route in CI (Satus does this), plus manual VoiceOver and keyboard pass (Rocca's write-up shows this is what serious creative devs do).

### 7.3 SEO and metadata

- Next.js Metadata API for `title` templates, `alternates.languages` (hreflang for `it` and `en`), canonical, `robots.ts`, `sitemap.ts` (with per-locale alternates), `opengraph-image.tsx` with `ImageResponse` from `next/og` (Satori + Resvg, flexbox only, 500 KB bundle cap, ttf/otf/woff fonts, no woff2).
- JSON-LD: Google's rich-result gallery does not list `Person` as a rich result type, but it does list **Profile page** (`ProfilePage` with a `mainEntity: Person`), `Article`/`BlogPosting`, `BreadcrumbList`, `Organization`. Emit `WebSite` + `ProfilePage`/`Person` on the home page (name, `jobTitle`, `sameAs` to GitHub/LinkedIn, `knowsAbout`, `address.addressLocality: Torino`), `BreadcrumbList` everywhere, `Article` on posts. Inline `<script type="application/ld+json">` in Server Components.
- RSS/Atom via a Route Handler (`app/feed.xml/route.ts`) built from the Content Collections index; JSON Feed is a nice extra.
- `llms.txt` at the root (Lighthouse now audits it; Satus ships `app/llms.txt`): a short Markdown index of who you are and links to `.md` versions of case studies.
- Fully prerender everything: with `cacheComponents` every route without dynamic data is static HTML at build; check `next build` output shows static routes.

### 7.4 i18n (Italian and English)

- **next-intl 4.14.2** (2026-09-01; 4.0 on 2025-03-12 brought strictly typed locales, typed ICU arguments, ESM-only, GDPR-friendly session cookie; 2026-01-19 added ahead-of-time message compilation; 2026-08-04 post covers `next/root-params` in 16.3). Use `app/[locale]/` routing with `localePrefix: 'as-needed'` (Italian at `/`, English at `/en`, or the reverse), `generateStaticParams` for both locales, `hasLocale()` guard, `setRequestLocale` for static rendering. Alternative without a library: two content folders and a hand-written `[lang]` segment reading `import { lang } from 'next/root-params'`; fine for a dozen UI strings, but next-intl gives you typed messages, date/number formatting and hreflang helpers for almost nothing.
- Content per locale lives in MDX; UI strings in `messages/it.json` and `messages/en.json`.

### 7.5 Repo hygiene, tests, CI

- Public repo with: README (stack rationale, architecture diagram, Lighthouse and CWV screenshots, performance budget table, how to run), `AGENTS.md` (Next 16.3 dev writes a version-matched block automatically), MIT or "source-available, content all rights reserved" license (be explicit about your case-study copy and images), conventional commits, `lefthook` or `husky` pre-commit with oxlint/Biome + typecheck.
- Tests: **Vitest 5.0.0** (2026-09-03; needs Vite >= 6.4 and Node >= 22.12; browser-mode trace view) for utilities, content schema and a few components; **Playwright 1.62.1** for e2e on both locales, axe scans, reduced-motion emulation (`page.emulateMedia({ reducedMotion: 'reduce' })`) and a `instant()` navigation test.
- CI: GitHub Actions matrix (Node 22 LTS), steps: install, typecheck (`tsc` 7 or `next build` with TS 7), lint, unit, build, Playwright, Lighthouse CI with budgets, bundle-size comment on PRs.

### 7.6 Analytics

- **Vercel Web Analytics** (`@vercel/analytics` 2.0.1): free on Hobby up to 50,000 events/month, 1 month retention, collection pauses after the limit; only makes sense if you deploy on Vercel.
- **Plausible CE**: AGPLv3, self-host with Docker (Postgres + ClickHouse), cookieless, updates twice a year, no premium features. Heavy to run for one site.
- **Umami v3**: MIT, Next.js + Prisma, Postgres 12.14+, Docker one-liner, cookieless, also has a hosted cloud with a free tier. Best fit for "self-hosted and privacy-first" and a talking point since it is itself a Next.js app.
- Whatever you pick, no cookie banner is needed for cookieless analytics under Italian Garante guidance if no personal data is stored (state that in a privacy page).

### 7.7 Hosting (he wants to host it himself)

- **Vercel**: Hobby is free but the docs and fair-use guidelines restrict it to **non-commercial personal use**; a portfolio whose purpose is to win paid work is a grey zone that Vercel's own KB treats as commercial. Pro is $20/developer/month. Zero-config for everything in Next.js 16.3 including Cache Components and `ImageResponse`.
- **Cloudflare Workers via OpenNext** (`@opennextjs/cloudflare` 1.20.6, 2026-09-02): supports all Next.js 16 minors and the latest 14/15 minors, App Router, SSR/SSG/ISR, PPR, `use cache`, Turbopack, `next/after`, image optimization through Cloudflare Images; Node middleware (`proxy.ts` Node runtime) not yet supported (**UNVERIFIED** whether this changed after the docs snapshot). Runs on Workers with static assets, not Pages. Worker size limit **3 MiB gzip on Free, 10 MiB on Paid ($5/month)**; a Next.js 16 server bundle can exceed 3 MiB, so budget for the $5 plan. Static asset requests are free and unlimited; Free plan is 100k Worker requests/day. OpenNext members joined the Next.js Ecosystem Working Group (March 2026) and the Adapter API is stable since 16.2, so this path is now sanctioned by Vercel.
- **Cloudflare Pages**: in maintenance mode; Cloudflare says new projects should start on Workers (migration guide exists). Do not start a new project on Pages.
- **Netlify**: Next.js via the OpenNext Netlify adapter, supports Cache Components, `use cache`, PPR, ISR, Turbopack; free tier is generous for a portfolio.
- **Static export escape hatch**: if you avoid `ImageResponse` at request time, dynamic routes without `generateStaticParams`, and server-only features, `output: 'export'` produces plain HTML that runs anywhere for free (Cloudflare Workers static assets, GitHub Pages, any VPS with Caddy). You lose ISR, `proxy.ts`, and `next/image` optimization (use a loader or pre-optimized assets). For a truly static portfolio this is the cheapest and most "I understand what my framework does" option; Astro gets you there with less friction.
- **Own VPS** (Hetzner or similar with Docker + Caddy + `next start`): fully self-hosted, ~5 EUR/month, needs you to run Umami anyway; a legitimate "I host it myself" story, but it removes edge caching unless you put Cloudflare in front.

Recommendation: Cloudflare Workers + OpenNext (Paid $5 plan for headroom) with Cloudflare DNS and cache in front, Umami on a small VPS or Umami Cloud free tier. If you would rather not operate anything, Vercel Pro is the honest answer for a commercial portfolio.

---

## 8. Other notable platform changes (2025 to 2026)

- **Baseline 2025 (Newly available in 2025)**: View Transitions (same-document), `view-transition-class`, Popover, invoker commands (`commandfor`), `content-visibility`, `scrollbar-color`, `::details-content`, `abs()`/`sign()`, `print-color-adjust`, Screen Wake Lock, `contenteditable="plaintext-only"`. "Widely available" means 30 months after Newly available.
- **Interop 2026** (web.dev, 2026-02-12) focus areas: anchor positioning, container style queries, scroll-driven animations, scroll snap, `shape()`, `zoom`, dialogs and popovers (`closedby`, `:open`), view transitions (same and cross-document), `attr()`, `contrast-color()`, custom highlights, Navigation API, WebRTC, WebTransport. Anything on this list is safe to ship as progressive enhancement and will be Baseline within the year.
- **Anchor positioning**: Chrome 125+, Safari 26 (`position-area`), Firefox in progress (Interop 2026 focus). Use for tooltips and menus with a `@supports (anchor-name: --a)` fallback.
- **Scroll-state container queries** (`@container scroll-state(stuck: top)`, `snapped`, `scrollable`): Chromium only, ~68 to 71 percent global, not Baseline; perfect progressive enhancement for a sticky header shadow.
- **`@starting-style`**: Chrome 117, Firefox 129, Safari 17.5 (91.9 percent). Use for entry animations of `display: none` to visible elements and popovers instead of JS.
- **`linear()` easing**: Chrome 113, Firefox 112, Safari 17.2 (93 percent). Lets you express springs and GSAP-like eases in CSS/WAAPI; Motion's blog shows the port.
- **Container queries and `:has()`**: Baseline since 2023, use freely.
- **`text-box-trim`**: cross-browser as of Firefox 154 (see section 4).
- **`corner-shape`** (squircles), `sibling-index()`/`sibling-count()` (Baseline Newly available per Chrome I/O 2026 coverage), `if()`, `@function`, `reading-flow`, `attr()` for any property (Firefox 155), `progress()` and `alpha()` (Firefox 155), `contrast-color()`: shipping across 2025 to 2026, most Chromium-first. Fine as enhancements, do not depend on them.
- **Speculation Rules API**: Chrome/Edge 109+ full (`prerender`, `eagerness`, `where` from 121), Safari 26.2 has it **disabled by default**, Firefox none; 77 percent global, unsupported browsers ignore the tag. Add `<script type="speculationrules">` with `"eagerness": "moderate"` prerender for internal links on an Astro/MPA build; on Next.js the router's own prefetching (partial prefetching in 16.3) covers the same ground.
- **WebGPU**: Chrome 113, Safari 26, Firefox partial (see section 3).
- **Safari 26** (September 2025) in one line: WebGPU, scroll-driven animations, anchor positioning, `text-wrap: pretty`, `contrast-color()`, `margin-trim`, HDR images, SVG favicons, Trusted Types, URLPattern.
- **Next.js removed automatic `scroll-behavior: smooth`** in 16; if you rely on hash links with native smooth scrolling, add `data-scroll-behavior="smooth"` (but not together with Lenis).

---

## 9. Flags: things I could not fully verify

1. Firefox scroll-driven animations: caniuse says Firefox 158 (2026-10-13 scheduled); MDN 155 notes say still behind a pref. Treat as "shipping soon", check on release.
2. three.js r171 as the WebGPURenderer "production ready" milestone and exact fallback semantics: taken from 2026 secondary guides, not from the three.js release notes (GitHub release page fetch returned a mangled date).
3. Firefox WebGPU: caniuse shows desktop Firefox disabled by default; Firefox 141 shipped WebGPU on Windows only per my prior knowledge.
4. Fontshare ITF Free Font License exact wording: license page did not render; terms confirmed via ITF licensing page and third-party reviews.
5. Sanity free plan numbers: from 2026 pricing summaries, not sanity.io/pricing directly.
6. TanStack Start: docs still say Release Candidate at 1.168.x; a GA announcement between March and September 2026 may exist that I did not find.
7. OpenNext Cloudflare "Node middleware not supported": from the docs snapshot; may have changed with `proxy.ts` on Node runtime in Next 16.
8. @astrojs/react exact React peer range and Astro 7 minimum Node version: not stated on the pages fetched.
9. Lenis 2: no evidence of a v2 or roadmap; 1.3.x is current.
10. Motion `animateView` bundle size and React-specific API: not stated in the announcement.

---

## 10. Source list (primary, with dates)

- nextjs.org/blog/next-16 (2025-10-21); nextjs.org/blog/next-16-3 (2026-08-03); nextjs.org/blog index (2026-09-03); nextjs.org/docs/app/guides/view-transitions (2026-08-25); nextjs.org/docs/app/guides/mdx (2026-08-25); nextjs.org/docs/app/api-reference/components/font; nextjs.org/docs/app/api-reference/functions/image-response (2026-08-25)
- react.dev/blog/2025/10/01/react-19-2; react.dev/blog/2025/10/07/react-compiler-1; react.dev/reference/react/ViewTransition (canary); react.dev/blog index (latest post 2026-02-24)
- github.com/darkroomengineering/satus (README + package.json, 2026-09-03); github.com/darkroomengineering/lenis; github.com/darkroomengineering/tempus; github.com/darkroomengineering/hamo
- astro.build/blog (7.0 2026-06-22 through 7.3 2026-09-03); docs.astro.build view-transitions, fonts, upgrade-to/v7, integrations-guide/react; joost.blog/replacing-astro-clientrouter (2026-04-22)
- tanstack.com/start docs overview and static-prerendering; tanstack.com/blog/announcing-tanstack-start-v1 (RC 2026-03-17)
- gsap.com/blog (3.13 2025-04-29, 3.14 2025-12-08, 3.15 2026-04-13); gsap.com/community/standard-license (2025-05-30); gsap.com/resources/React; gsap.com/docs/v3/Plugins/SplitText; webflow.com/blog/gsap-becomes-free
- motion.dev/magazine/a-view-transitions-api-for-the-rest-of-us (2026-06-30); motion.dev/docs/react-upgrade-guide; motion.dev magazine index
- webkit.org/blog/17101 (2025-06-20); webkit.org/blog/16993 Safari 26 beta (2025-06-09)
- caniuse.com: view-transitions, mdn-css_at-rules_view-transition, mdn-css_properties_animation-timeline, mdn-html_elements_script_type_speculationrules, webgpu, mdn-css_types_easing-function_linear-function, mdn-css_at-rules_starting-style, font-size-adjust, mdn-css_properties_font-palette (all 2026-09-03)
- developer.mozilla.org: text-wrap, CSS anchor positioning, Speculation Rules API, Firefox 155 release notes (2026-09-01)
- web.dev/blog/interop-2026 (2026-02-12); web.dev/baseline and web.dev/baseline/2025; web.dev/articles/inp; developer.chrome.com/blog/css-text-box-trim (2025-01-14); developer.chrome.com/blog/lighthouse-13-0 and moving-lighthouse-to-insights (2025-10)
- r3f.docs.pmnd.rs/tutorials/v9-migration-guide; github.com/oframe/ogl
- tailwindcss.com/blog (v4.3 2026-05-08); tailwindcss.com/docs/compatibility
- content-collections README (github.com/sdorra/content-collections); velite.js.org; payloadcms.com/docs/getting-started/installation; sanity pricing summaries (2026)
- opennext.js.org/cloudflare; opennext.js.org/news/2026-03-25-3-years-of-opennext; developers.cloudflare.com/workers/platform/pricing; developers.cloudflare.com/workers/framework-guides/web-apps/astro; docs.netlify.com Next.js overview; vercel.com/docs/plans/hobby (2026-08-11)
- next-intl.dev/blog (4.0 2025-03-12; root-params post 2026-08-04); ui.shadcn.com/docs/changelog (Base UI default, July 2026)
- vitest.dev/blog/vitest-5 (2026-09-03); github.com/GoogleChrome/lighthouse-ci; plausible.io/docs/self-hosting; github.com/umami-software/umami; llmstxt.org
- developers.google.com/search/docs/appearance/structured-data/search-gallery
- Codrops case studies: Joffrey Spitzer (2026-02-18), Arnaud Rocca (2026-03-31), Scroll-Revealed WebGL Gallery (2026-02-02), From Shader Uniforms to Clip-Path Wipes (2026-05-06)
- npm registry (registry.npmjs.org) for every version number and publish date cited, queried 2026-09-03
