# 06. First-hand notes from the browser (3 September 2026)

Screenshots taken in the in-app browser at 1440x900 and 390x844. These complement the agent research in 01 and 02 with what the sites actually look like when they load.

## francescomichelini.com (Folio 2023)

- Palette in the wild is olive green (#3b4a37 range) with a lime accent, not black. The Awwwards page lists only the accent.
- Mono everywhere for metadata: `P/01`, `YEAR`, `AGENCY`, `ROLE`, `AWARDS` as small caps columns under a large project title in a wide grotesk. Values prefixed with `//`.
- Projects are a carousel: one project at a time, `PREV` and `NEXT` with a segmented progress bar (dashes, the active one longer), large cover image centred, `VISIT` button in a hairline box.
- Footer nav numbered `0 HOME 1 PROJECTS 2 INFO`, plus `F/23` and copyright in mono.
- Mobile at 390: identical vocabulary, header collapses to logo plus `MENU` in a hairline box, cover image full width, metadata columns wrap two per row. Nothing is hidden, nothing overflows.
- Borrow: the metadata column block for our case study header, the segmented progress indicator for the Lab or work index on mobile, the hairline box button.

## michelemazzucco.it

- Left rail on desktop: name, `Work` list with years in mono right aligned, `Side projects`, `Elsewhere`. Content column: one-sentence positioning, `About me`, then a photo grid of two columns, then principle statements with a small coloured marker and a bold lead-in.
- Mobile: hamburger, headline at about 32px, body at 16 to 17px, generous line height, photos stack to one column.
- Borrow: the rail-as-index pattern is exactly our margin index; the principles list with a bold lead-in phrase is a good "How I work" format.

## wodniack.dev

- Visible hairline grid over everything (thin lines dividing the header into cells, tiles, the whole page). Hot red background, near-black ink, a condensed display face for `CREATIVE + DEVELOPER`, a moiré line artwork tile in the hero.
- Mobile: the hero stacks to two rows of display text, the grid stays visible, header becomes logo, two icon links and `Hire me` plus a contrast toggle. Awards shown as typographic tiles (`AWWW ARDS`, `FWA`, `2025 Webby Awards Winner`).
- Borrow: the visible grid as an optional overlay (our Cmd+K grid toggle), tile borders as hairlines, the contrast toggle idea.

## thibaultguignand.com

- Hero is a dark room with a single flame, crosshair markers in the four corners and a centred `DISCOVER MY PROJECTS` label with a click-and-hold interaction. The flame is a WebGL scene; the DOM stays minimal.
- Borrow: corner markers as a framing device for the Lab piece frame; click-and-hold as an optional reveal on the 404 or a Lab piece.

## gionatannese.com

- Home is a WebGL collage of thumbnails floating in a circle around the centre, white canvas, a tiny top bar with `1 2 3` navigation. Heavy; renders nothing without WebGL.
- Lesson: our fallback-first approach is the differentiator here.

## rauno.me/craft

- Masonry of cards, each a screenshot or looping video with a caption row: title left, month and year right in small text, then a `View Production` button spanning the card width in a hairline box. Cards have soft corners and a light grey frame on black.
- Mobile: single column, cards keep the same caption row and button, a horizontal dotted position indicator sits at the top.
- Borrow: the caption row (title left, date right) and the full-width action button for our Lab tiles, with radius 0 and hairlines instead of soft cards.

## emilkowal.ski

- Almost pure typography: name and role, `Today` paragraph, `Projects` as title plus one-line description, `Writing` list. Max width about 640px, everything left aligned, a single top notice bar.
- Borrow: the restraint of the About page; two-line project entries.

## yannglt.com

- Dark, card grid with mono eyebrow labels (`SHORTS`, `NEW`), an identity card with `IDENTITY` and `ROLE` fields, letterpress style monogram tiles (`li`, `xp`), serif display headline, two CTAs.
- Borrow: the identity card as a compact About teaser on the home page (name, role, city, status) in mono fields.

## Mobile lessons across all of them

- Nothing breaks at 390 on the good ones: mono metadata wraps into two columns, images go full width, headers collapse to a logo plus one word (`MENU`, hamburger, `Hire me`).
- Hero type on mobile sits between 40px and 64px, two or three lines, never more.
- Touch replaces hover by making hover states visible by default (Rauno's buttons are always visible) or by tap-to-open (Michelini's carousel).
