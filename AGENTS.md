<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

- Read `DESIGN.md`, `PRODUCT.md` and the spec in `docs/superpowers/specs/` before touching UI.
- Tokens live in `app/globals.css` under `@theme inline`; update `DESIGN.md` in the same commit. `tests/unit/tokens.test.ts` enforces parity.
- No em-dash or en-dash anywhere (enforced by `tests/unit/dashes.test.ts`). Hyphens only.
- Conventional commits, no co-author trailers.
- Facts about Edoardo come only from `content/` and `PRODUCT.md`. Unknown facts are `TODO(edoardo)`. Never mention LoL Brain.
- After any UI change, open the dev server in the in-app browser and check 1440x900 and 390x844 in both themes before reporting.
