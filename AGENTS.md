<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

- Start with `docs/superpowers/HANDOFF-2026-09-04.md`: state of the project, decisions, workflow, gotchas. The open work is `docs/superpowers/plans/2026-09-04-07-field-fixes-and-plate-rework.md`.
- Motion and ScrollTrigger rules live in `docs/motion.md`. Read it before writing any GSAP.
- Read `DESIGN.md`, `PRODUCT.md` and the specs in `docs/superpowers/specs/` (v2: `2026-09-04-v2-ruled-sheet-design.md`) before touching UI.
- Theme tokens live in `lib/themes.data.mjs` (run `pnpm themes` to regenerate `app/themes.css`); sheet and type tokens in `app/globals.css`. Update `DESIGN.md` in the same commit. `tests/unit/themes.test.ts` and `tests/unit/sheet.test.ts` enforce parity and WCAG AA.
- Every section is a `.sheet`; text lives in `Cell`s (see `components/sheet/`). No padding wrappers or containers: the G overlay must coincide with every hairline.
- No em-dash or en-dash anywhere (enforced by `tests/unit/dashes.test.ts`). Hyphens only.
- Conventional commits, no co-author trailers.
- Facts about Edoardo come only from `content/` and `PRODUCT.md`. Unknown facts are `TODO(edoardo)`. Never mention LoL Brain.
- After any UI change, review screenshots at 1440x900 and 390x844 in at least signal, field and paper with the grid on (`node scripts/shots.mjs`, run from PowerShell) and check `node scripts/console-check.mjs` for console and hydration errors before reporting.
- Everything is mobile responsive: design for 390px first, verify at 390x844, 768x1024 and 1440x900 in both themes. No horizontal overflow, touch targets at least 24px, hover states have a touch equivalent.
- Before building a component, check `docs/research/05-components-to-borrow.md` for the reference implementation to follow; borrow only from permissively licensed sources and re-implement on our tokens.
