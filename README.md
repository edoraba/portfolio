# Edoardo Baravaglio, personal site

Source of my personal portfolio. Frontend developer with a design degree, building web products end to end in Turin, Italy.

## Stack

Next.js 16 (App Router, React 19, React Compiler, Cache Components), TypeScript, Tailwind CSS 4 with every token declared in `@theme` plus CSS Modules for animated components, MDX typed with Content Collections, GSAP and Lenis for motion, one WebGL2 surface with a hand-written shader (no 3D library). Vitest, Playwright with axe, Lighthouse CI. Deployable to Cloudflare Workers through OpenNext or to Vercel.

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

Unit tests also enforce the house rules: every theme token in `DESIGN.md` matches `lib/themes.data.mjs` and the generated `app/themes.css`, every ink passes WCAG AA on every surface, the sheet tokens match between CSS and `lib/sheet.ts`, and no em-dash or en-dash appears anywhere in code, content or docs.

## The home

Seven plates, each a section of the grid with its own scroll choreography: the hero with the field showing through the headline and a strip, the about box that flattens, the pinned work stage with its timecode, the notes index, the toolbox, the since tunnel and the grid cloth. Nothing pins below 1024px and every plate has a static layout under reduced motion.

## Layout and themes

Every section is a `.sheet`: one full-bleed grid with 12, 6 or 4 columns; text lives in cells whose hairlines sit on column lines. Press `G` to see the grid, `T` to cycle the six themes (signal, field, paper, phosphor, cobalt, ash), `Cmd K` for the command palette. Themes live in `lib/themes.data.mjs`; `pnpm themes` regenerates `app/themes.css`.

## License

Code is MIT. Text, images and case study content under `content/` and `public/images/` are all rights reserved.
