# Edoardo Baravaglio, personal site

Source of my personal portfolio. Frontend developer with a design degree, building web products end to end in Turin, Italy.

## Stack

Next.js 16 (App Router, React 19, React Compiler, Cache Components), TypeScript, Tailwind CSS 4 with every token declared in `@theme` plus CSS Modules for animated components, MDX typed with Content Collections, GSAP and Lenis for motion, one WebGL surface rendered with OGL. Vitest, Playwright with axe, Lighthouse CI. Deployable to Cloudflare Workers through OpenNext or to Vercel.

Design system: `DESIGN.md` (tokens and rules) and `docs/superpowers/specs/2026-09-03-portfolio-design.md` (spec). Product truth: `PRODUCT.md`. Research behind the direction: `docs/research/`. Implementation plans: `docs/superpowers/plans/`.

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

Unit tests also enforce two house rules: every colour in `DESIGN.md` exists in `app/globals.css`, and no em-dash or en-dash appears anywhere in code, content or docs.

## License

Code is MIT. Text, images and case study content under `content/` and `public/images/` are all rights reserved.
