# Edoardo Baravaglio, personal site

Source of my personal portfolio. Frontend developer with a design degree, building web products end to end in Turin, Italy.

## Stack

Next.js 16 (App Router, React 19, React Compiler, Cache Components), TypeScript, Tailwind CSS 4 with every token declared in `@theme` plus CSS Modules for animated components, MDX typed with Content Collections, GSAP and Lenis for motion, one WebGL2 surface with a hand-written shader (no 3D library). Vitest, Playwright with axe, Lighthouse CI. Deployable to Cloudflare Workers through OpenNext or to Vercel.

Type: Funnel Display for the big type and Geist Mono for labels, both through `next/font/google`, and Switzer for the reading text, self-hosted from files `pnpm fonts` fetches at build time. Its licence allows self-hosting but not publishing the files in a public repository, so they are gitignored; `assets/fonts/README.md` has the detail.

Design system: `DESIGN.md` (tokens and rules), `docs/superpowers/specs/2026-09-03-portfolio-design.md` (concept spec) and `docs/superpowers/specs/2026-09-04-v2-ruled-sheet-design.md` (v2, the ruled sheet). Product truth: `PRODUCT.md`. Research behind the direction: `docs/research/`. Implementation plans: `docs/superpowers/plans/`.

## Run

```bash
pnpm install
pnpm dev
```

The production build blocks on `TODO(edoardo)` markers in content until every fact is confirmed. `ALLOW_TODO=1 pnpm build` builds a preview anyway.

## Verify

```bash
pnpm lint && pnpm typecheck && pnpm test
ALLOW_TODO=1 pnpm build && pnpm test:e2e
pnpm exec lhci autorun
```

Reviewing by eye, against a running `pnpm dev`:

```bash
GPU=1 node scripts/shots.mjs http://localhost:3000 shots / /work
node scripts/borders.mjs http://localhost:3000 / /work /about
```

`shots.mjs` writes screenshots at 1440 and 390 (`GPU=1` opens a headed browser with hardware
WebGL, because headless Chromium has no GL and the field silently falls back). `borders.mjs`
reads the content lines off the grid and reports any band that opens or closes off it, or any
pair of neighbours drawing two rules a gutter apart; the same audit runs as an e2e test.

Unit tests also enforce the house rules: every theme token in `DESIGN.md` matches `lib/themes.data.mjs` and the generated `app/themes.css`, every ink passes WCAG AA on every surface, the sheet tokens match between CSS and `lib/sheet.ts`, and no em-dash or en-dash appears anywhere in code, content or docs.

## The home

Seven plates, each a section of the grid with its own scroll choreography: the hero with the field showing through the headline and a strip; the about plate, where the mark draws itself bar by bar out of the same field; the pinned work stage, a hole cut in the sheet that opens until the screen is the void, its word parting into a shell of letters with the projects crossing it; the notes index with the field running in its lab plate; the toolbox where the stack falls into a container with 2D physics (Matter.js, loaded only when the plate is near); the since tunnel, five ruled bands arriving out of a vanishing point; and the grid cloth. Nothing pins below 1024px and every plate has a static layout under reduced motion.

How the movement is put together, and the rules that keep it from breaking, is `docs/motion.md`. Read it before writing any GSAP.

## Layout and themes

Every section is a `.sheet`: one full-bleed grid with 12, 6 or 4 columns; text lives in cells whose hairlines sit on column lines. Press `G` to see the grid, `T` to cycle the six themes (signal, field, paper, phosphor, cobalt, ash), `Cmd K` for the command palette. Themes live in `lib/themes.data.mjs`; `pnpm themes` regenerates `app/themes.css`.

## License

Code is MIT. Text, images and case study content under `content/` and `public/images/` are all rights reserved.
