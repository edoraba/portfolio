---
version: 1
name: specimen-in-the-field
description: "Design system of edoardo baravaglio's personal site. A typographic specimen fused with a dithered WebGL flow field: one variable grotesk (Bricolage Grotesque) set huge for display and small for text, Geist Mono for every label and number, a numbered index in the margin, and a single cobalt accent used as ink. Two complete themes behind one toggle: dark is the field (near-black #0B0C0E, off-white ink, dither in light), light is the paper (#F1EDE4, ink #141310, dither in ink). Radius 0, no shadows, elevation by surface step plus hairline. The headline is the window onto the shader."
source_of_truth: app/globals.css (@theme). This file explains the tokens; the CSS defines them. Change both in the same commit.

colors:
  signal:
    canvas: '#F5401F'
    surface: '#F7573A'
    surface-2: '#F96E55'
    ink: '#140E0C'
    ink-muted: '#2A0A04'
    hairline: 'rgba(20, 14, 12, 0.22)'
    accent: '#140E0C'
    accent-ink: '#F5401F'
    field-on: '#140E0C'
    field-off: '#F5401F'
  field:
    canvas: '#0B0C0E'
    surface: '#15171B'
    surface-2: '#1C1F24'
    ink: '#F2F2EF'
    ink-muted: '#8B8E93'
    hairline: 'rgba(242, 242, 239, 0.1)'
    accent: '#7D93FF'
    accent-ink: '#0B0C0E'
    field-on: '#F2F2EF'
    field-off: '#0B0C0E'
  paper:
    canvas: '#F1EDE4'
    surface: '#E6E0D3'
    surface-2: '#DDD6C6'
    ink: '#141310'
    ink-muted: '#625C50'
    hairline: 'rgba(20, 19, 16, 0.12)'
    accent: '#1F3BFF'
    accent-ink: '#F1EDE4'
    field-on: '#141310'
    field-off: '#F1EDE4'
  phosphor:
    canvas: '#0C0F0A'
    surface: '#151A10'
    surface-2: '#1C2315'
    ink: '#E9FF6A'
    ink-muted: '#9DAF52'
    hairline: 'rgba(233, 255, 106, 0.1)'
    accent: '#F2F2EF'
    accent-ink: '#0C0F0A'
    field-on: '#E9FF6A'
    field-off: '#0C0F0A'
  cobalt:
    canvas: '#1F3BFF'
    surface: '#1B34E6'
    surface-2: '#172ECF'
    ink: '#F1EDE4'
    ink-muted: '#D8DCFA'
    hairline: 'rgba(241, 237, 228, 0.22)'
    accent: '#E9FF6A'
    accent-ink: '#1F3BFF'
    field-on: '#F1EDE4'
    field-off: '#1F3BFF'
  ash:
    canvas: '#9C9E97'
    surface: '#A6A8A1'
    surface-2: '#B0B2AB'
    ink: '#1A1B18'
    ink-muted: '#262823'
    hairline: 'rgba(26, 27, 24, 0.22)'
    accent: '#1A1B18'
    accent-ink: '#9C9E97'
    field-on: '#F16D50'
    field-off: '#9C9E97'
  notes: signal is the default; hairline alpha 0.22 on bold canvases (signal, cobalt, ash), 0.10 on field and phosphor, 0.12 on paper

typography:
  families:
    display-and-text: 'Bricolage Grotesque, variable (opsz 12..96, wdth 75..100, wght 200..800), OFL, self-hosted'
    mono: 'Geist Mono, variable (wght 100..900), OFL, self-hosted'
  display-xl:
    fontFamily: Bricolage Grotesque
    fontSize: clamp(4rem, 13vw, 14rem)
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: -0.045em
    fontVariationSettings: "'opsz' 96, 'wdth' 100"
    note: home hero words only; width axis animates 78..100 near the pointer
  display:
    fontFamily: Bricolage Grotesque
    fontSize: clamp(2.5rem, 6.5vw, 6rem)
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: -0.04em
    fontVariationSettings: "'opsz' 96, 'wdth' 100"
  headline:
    fontFamily: Bricolage Grotesque
    fontSize: clamp(1.5rem, 2.6vw, 2.25rem)
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontVariationSettings: "'opsz' 48, 'wdth' 100"
  body:
    fontFamily: Bricolage Grotesque
    fontSize: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
    fontVariationSettings: "'opsz' 14, 'wdth' 100"
    measure: 58ch to 65ch
  body-muted:
    inherits: body
    color: ink-muted
  label-mono:
    fontFamily: Geist Mono
    fontSize: clamp(0.6875rem, 0.65rem + 0.15vw, 0.8125rem)
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.06em
    textTransform: uppercase
    fontVariantNumeric: tabular-nums
  number-mono:
    fontFamily: Geist Mono
    fontSize: inherit
    fontVariantNumeric: tabular-nums
    note: every number on the site is mono and tabular

rounded:
  all: 0px

spacing:
  unit: 4px
  page-padding: clamp(16px, 4vw, 64px)
  container-max: 1400px
  grid-columns: 12
  gutter: 24px
  section-gap: clamp(96px, 12vw, 192px)
  block-gap: clamp(32px, 4vw, 64px)
  stack-gap: 12px

hairline:
  width: 1px
  color: hairline

motion:
  dur-micro: 150ms to 250ms
  dur-reveal: 800ms
  dur-wipe: 1200ms
  dur-field: 2000ms
  ease-editorial: cubic-bezier(0.625, 0.05, 0, 1)
  ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
  ease-hop: cubic-bezier(0.56, 0, 0.35, 0.98)
  ease-inout-power3: cubic-bezier(0.65, 0, 0.35, 1)
  stagger-lines: 60ms
  stagger-items: 40ms
  pointer-attack: 25ms
  pointer-release: 175ms
  decode-tick: 40ms
  reduced-motion: field static, no smooth scroll, no split text, width axis static, 150ms opacity fades only

field:
  renderer: hand-written WebGL2, one fragment shader, full-screen triangle, parallel shader compile
  dither: ordered Bayer 8x8, cell 2 CSS px, image-rendering pixelated
  quality-tiers: cell 2, 3, 4 (step down when the p75 frame interval exceeds 22ms over 60 frames)
  modes: hero (masked by headline), band (thin horizontal band behind the index), off
  accent: only within the pointer radius, none at idle
  min-density-under-text: 55 percent on pixels
---

# Specimen in the Field

## Layout

- Mobile first. Every component is designed at 390px and verified at 390x844, 768x1024 and 1440x900 in both themes. No horizontal overflow, touch targets at least 24px, every hover state has a touch equivalent (tap, visible by default, or irrelevant).

- 12-column grid, 24px gutters, max 1400px, page padding clamp(16px, 4vw, 64px).
- Desktop (1024px and up): the numbered index lives in the right margin on home and /work, and is the table of contents on case studies. Below 1024px it collapses into the flow above the content it indexes.
- Sections are separated by space and one hairline, never by cards. Lab tiles are the only cards: surface step plus hairline, radius 0.
- Every image is a `<figure>` with a mono caption; case study figures are numbered "Fig. 01".
- Hero fits the first viewport: headline (three words), one sub line of at most 20 words, the email line. Nothing else above the fold.

## Type

- One family for display and text (Bricolage Grotesque), one mono (Geist Mono). Emphasis is italic or weight of the same family. No serif, no second sans.
- Big display, tiny mono, almost nothing in between. Headline size exists for case study section titles only.
- The width axis moves on exactly one heading per page. Everywhere else width is 100.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body. Tabular numerals everywhere.

## Colour

- The accent is ink, not fill: links, index numbers, focus rings, the lit part of the field. Never a button background larger than a label, never a section background.
- No pure black or white, no shadows, no gradients except the dither itself.
- Both themes are complete. Dark is the default when the OS states no preference. The toggle transitions the field (a 2000ms wipe of field colours), not just the CSS variables.

## Motion

- Content fast, field slow: text 600ms out (power4.in) and 800ms in (expo.out, 200ms delay); field 2000ms (expo.inOut); in parallel.
- Reveals are masked line reveals. Decode only on mono labels, once, 40ms ticks. Hover states are CSS transitions on transform, opacity and font-variation-settings.
- Page transitions: field persists, DOM swaps with a clip-path wipe on the hop ease; shared-element morph of the project number and cover from /work to a case study; back and forward crossfade in 200ms.
- Smooth scroll (Lenis, lerp 0.08) only on home and /work.
- Reduced motion is a parallel design, listed in the frontmatter, never a kill switch.

## Voice

- First person, present tense, maker verbs. Specific: numbers only when confirmed, sectors and cities named.
- Labels are plain ("Selected work", "Writing", "Now"), never poetic ("From the field", "Loose plates").
- No em-dash or en-dash anywhere: headlines, labels, body, captions, code, commits.

## Do not

- No preloader or percentage counter, no custom cursor, no marquee, no magnetic buttons, no curved sticky footer, no image-follows-cursor lists, no greeting-word intro, no "rotate your device", no horizontal-only scroll, no bento grid, no 3D avatar, no skill bars, no logo wall, no testimonial carousel, no scroll cue, no decorative status dots, no version stamps, no locale and weather strips, no glassmorphism, no purple gradients.
- No section-number eyebrows and at most one eyebrow per three sections. The numbering that exists (nav 1 to 4, project index 01 to 05, Fig. 01) encodes real order.
- No second WebGL scene. The field is the only rendered surface.
- Never mention LoL Brain.
