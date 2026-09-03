---
name: design-md-references
description: Use when writing or revising this project's DESIGN.md, choosing palette, type scale or motion tokens, or when a reference brand's design language is mentioned (Linear, Vercel, Resend, Sanity, Runway, Claude, Warp, Ferrari, Stripe, PlayStation). Points to the vendored DESIGN.md files under docs/design-references and explains the DESIGN.md convention from Google Stitch and VoltAgent's awesome-design-md.
---

# DESIGN.md references

`DESIGN.md` is a plain-text design system document (convention introduced by Google Stitch, catalogued by VoltAgent's awesome-design-md, MIT) that design and coding agents read to generate UI consistent with a visual language. It sits at the project root next to `AGENTS.md` / `CLAUDE.md`.

| File | Who reads it | What it defines |
|---|---|---|
| `CLAUDE.md` / `AGENTS.md` | coding agents | how to build the project |
| `DESIGN.md` | design agents | how the project must look, feel and move |

## Vendored references

Ten DESIGN.md files extracted from public sites live in `docs/design-references/*.DESIGN.md` (source: github.com/VoltAgent/awesome-design-md, license in `LICENSE.awesome-design-md`). They were chosen because each covers one dimension relevant to this portfolio:

| File | Why it is here |
|---|---|
| `linear.app.DESIGN.md` | near-black surfaces, hairline borders, one accent used sparingly, product-style motion |
| `vercel.DESIGN.md` | Geist Sans + Geist Mono system, black and white precision, mono metadata layer |
| `resend.DESIGN.md` | minimal dark with monospace accents, developer tone |
| `sanity.DESIGN.md` | dark-first editorial marketing, 112px display type, mono eyebrows, single accent for the top CTA |
| `runwayml.DESIGN.md` | cinematic dark heroes alternating with paper-white reading bands, single sans |
| `claude.DESIGN.md` | warm terracotta accent on warm neutrals, editorial layout: the warm counterpoint |
| `warp.DESIGN.md` | terminal aesthetics, labelled figures, mono-heavy |
| `ferrari.DESIGN.md` | Italian brand, one loud red on black, motorsport heritage |
| `stripe.DESIGN.md` | thin-weight display with negative tracking, editorial density |
| `playstation.DESIGN.md` | game-feel UI, diegetic chrome |

## How to use them

1. **As a format model.** When writing this project's own `DESIGN.md`, mirror the structure: YAML frontmatter (`version`, `name`, `description`), then `colors`, `typography`, `rounded`, `spacing`, `components`, followed by prose sections on layout, motion, voice, do and do not. Keep every token concrete (hex, px, ms, easing).
2. **As calibration, never as identity.** Read a reference to understand how a mature system distributes an accent, how many surface steps it uses, how tight display tracking gets. Do not copy a brand's palette, typeface or signature. This portfolio must be recognisably Edoardo's, not "Linear but orange".
3. **As a shared vocabulary.** When the user says "Linear-tight" or "Runway paper band", open the matching file and quote the exact token instead of guessing.
4. **Cross-check with research.** `docs/research/02-reference-sites.md` section 2.3 lists the palettes of 2025 to 2026 Awwwards winners; `docs/research/01-portfolios.md` section B2 lists the clichés to avoid. A token that appears in both a reference DESIGN.md and the anti-pattern list is a red flag.

## Writing this project's DESIGN.md

- One `DESIGN.md` at the repo root, kept in sync with `app/globals.css` `@theme` tokens (the CSS is the source of truth, the markdown is the explanation).
- Every color has a role name (canvas, surface-1, ink, ink-muted, accent, hairline), a hex, and a rule for when it may be used.
- Type scale expressed as roles (display-xl, display, headline, body, label-mono) with family, size or clamp(), weight, line-height, tracking.
- Motion tokens: durations, eases (as cubic-bezier or GSAP names), stagger values, and the reduced-motion equivalents. Reduced motion is a parallel design, not a kill switch.
- A "Do not" list specific to this site (no percentage preloader, no dot cursor, no magnetic buttons, no curved footer, no marquee, no em-dashes in copy).
- Update `DESIGN.md` in the same commit as any token change.
