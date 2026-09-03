# 02. Reference sites: non-portfolio websites worth stealing from

Research date: 3 September 2026. Scope: 2023 to today. Method: roughly 110 WebFetch and WebSearch calls across Awwwards (Sites of the Day, Month, Year, Developer Award pages), Codrops (2025 and 2026 case studies and tutorials), GSAP showcase, studio and product homepages, type foundries, and trend roundups. Awwwards detail pages were the richest structured source because they expose palette hex values, tech tags, and the dev-jury breakdown (animations, WPO, accessibility). Many JS-heavy studio sites returned only a shell to the fetcher, so where a claim is about motion feel it is marked as "observed via case study" or "inferred from tags" rather than first-hand.

Note for the reader: the goal is a personal portfolio for a design engineer in Turin at Awwwards SOTD level. Every entry ends with one idea to borrow. Section 2 (synthesis) is the part to reread before designing.

---

## 0. The 2025 to 2026 award landscape at a glance

Awwwards Site of the Year 2025: two winners, Lando Norris (OFF+BRAND, Glasgow) and Messenger (abeto, tiny WebGL delivery-planet game). 2024: Igloo Inc (abeto and Bureaux), Don't Board Me (The First The Last), Opal Tadpole (Claudio Guglieri). 2023: Lusion v3, Noomo Agency, Mana Yerba Mate (Louis Paquet). Independent of the Year 2025: Louis Paquet. Studio of the Year 2025: Malvah.

Sites of the Month 2025: Immersive Garden site (Jan), Dropbox Brand (Feb, Daybreak), Siena Film Foundation (Mar, Niccolò Miranda, Italian), Navigate (Apr, Resn), Anime.js (May, Julian Garnier), Montfort (Jun, Immersive Garden), Tracing Art (Jul, Resn), Cartier Watches & Wonders (Aug, Immersive Garden), Terminal Industries (Sep, REJOUICE), Ponpon Mania (Oct, Patrick Heng), Lando Norris (Dec), MindMarket (Dec, Louis Paquet).

Sites of the Month 2026: Bruno's Portfolio (Jan, Bruno Simon), The Renaissance Edition (Feb, Shopify Design), GQ & AP The Extraordinary Lab (Mar, Immersive Garden), Oryzo AI (Apr, Lusion), Floema (May, Bürocratik), Son Daven (Jun, The First The Last), Lama Lama (Jul).

Recent SOTDs with Developer Award (late Aug to 3 Sep 2026): Trevor Noah (OFF+BRAND), Paul Kalkbrenner (HOLOGRAPHIK), Squarespace Foundations (Resn), ERA Residence (The First The Last), HOBRO DIGITAL, Decathlon Yestalgia (index), Sharplink (Studio Freight), Kononenko Architectural Bureau (Reksa Andhika).

Pattern in the jury data: the winning sites score 8.0 to 9.6 on "Animations/Transitions" and usually 6.6 to 7.0 on "Accessibility". Accessibility is the consistently weakest dev sub-score across the board, so a portfolio that nails motion AND accessibility (reduced motion, focus states, semantic markup) has an unusual edge with the dev jury.

---

## 1. Site-by-site notes

Format: URL, category, what makes it special, signature interaction, typography, palette, motion language, one idea to borrow.

### A. Creative agencies and studios

#### 1. Lusion v3 and Lusion projects (Oryzo AI, EverSwap)

- URL: https://lusion.co, https://labs.lusion.co, project pages via awwwards.com/sites/oryzo-ai and /sites/everswap
- Category: WebGL studio, Bristol
- Special: Site of the Year 2023 for their own site; Oryzo AI won Site of the Month April 2026 (SOTD 7.86, dev 7.87) by turning "an ordinary cork coaster into an immersive digital experience". EverSwap (June 2026) is a DeFi site done as a storybook with Blender-made illustration.
- Signature interaction: 3D-to-2D-to-3D transitions, WebGL "sketches" you can play with inline, an interactive particle footer. Lusion's home page mixes full-frame motion graphics with layered interactive elements and audio.
- Typography: not exposed to the fetcher; visually their recent work leans on a single tight grotesk with tiny mono labels.
- Palette: Oryzo AI is #100904 (near-black brown) plus #FF8539 (orange). EverSwap is #FBFFF4 (off-white) plus #203727 (forest green). Both are strict two-colour systems.
- Motion: cinematic, long eases, camera-driven. Elements arrive as if a camera cut, not a fade. Hover states are physical (light, refraction).
- Borrow: the "interactive footer" idea. Make the footer a small playable WebGL or canvas toy (particles that react to the pointer) so the last screen is the most memorable one.

#### 2. OFF+BRAND (Lando Norris, Steven.com, Trevor Noah)

- URL: https://landonorris.com, https://steven.com, https://www.itsoffbrand.com/our-work/lando-norris, awwwards.com/sites/lando-norris, /sites/steven-com, /sites/trevor-noah
- Category: brand-led real-time agency, Glasgow, 30 people, built mostly in Webflow plus GSAP plus WebGL
- Special: Lando Norris took Site of the Year 2025 (8.18) with a site built in under two months; its hero became "widely recreated online". Steven.com (June 2026) uses a single interactive canvas as both navigation and experience. Trevor Noah (3 Sep 2026) is a "living collage", flat 2D elements with curated WebGL.
- Signature interaction: Lando: rotating 3D helmet that tracks reading position, cinematic scroll sequences, a modular "On Track / Off Track" layout. Steven: particle trail on the mouse, unusual navigation, menu-opening animation. Trevor Noah: collage layers that reshuffle.
- Typography: bold condensed display type for Lando (lime-green typography on black), editorial mixed sizes for Trevor Noah (tagged "Typography").
- Palette: Lando #D2FF00 on #111112. Steven #121212 and #FFFFFF. Trevor Noah #FF9BB4 (pink) on #1D2440 (navy).
- Motion: "speed-inspired animations, sharp transitions, cinematic scrolling create momentum". Fast ins, long settle. Motion is narrative first; their Aether1 site won a Webby for animation with a continuous scroll-timed arc.
- Borrow: one hero object that persists and tracks scroll progress (a helmet for a driver, for you maybe a rotating monogram, a Torino-inspired object, or the letterform of your initial) so the whole page feels like a single shot.

#### 3. abeto (Messenger, Igloo Inc)

- URL: awwwards.com/sites/messenger, https://www.igloo.inc
- Category: small WebGL studio
- Special: two Sites of the Year in a row. Messenger (Nov 2025, 7.92, dev 8.21, animations 9.0) is a tiny WebGL planet where "someone's gotta make the deliveries", with WebSockets multiplayer NPCs. Igloo (Jul 2024, animations 9.6) is a fully scroll-driven fluid journey with infinite scroll and transitions.
- Signature interaction: character navigation; a character configuration UI; scroll-as-camera.
- Palette: Messenger #81BFBC teal plus #C9D5C3 sage. Igloo #B6BAC5 plus #383E4E. Muted, desaturated, almost pastel: the opposite of "cyber neon".
- Motion: game-feel. Constant idle motion, responsive input, physical settling.
- Borrow: desaturated two-tone palettes as a counter-trend to acid accents. Also the idea that a portfolio can be a "place" (Codrops case study "More Than a Portfolio", joseph-san.com, does the same with a scroll-driven 3D world using GSAP Observer and snap-block pacing for a key sequence).

#### 4. Immersive Garden

- URL: https://www.immersive-g.com, awwwards.com/sites/immersive-garden-website
- Category: luxury experience studio, Paris (Cartier, Louis Vuitton, Dior, Longines, GQ)
- Special: their own site won Site of the Month Jan 2025 (8.0 overall, creativity 8.4, animations 8.8). Three Sites of the Month in 2025 and one in 2026.
- Signature interaction: "bas-relief" hover effect on project listings (image behaves like a carved surface under light), rapid scroll mode, menu transitions that behave like video cuts, an Off/On toggle.
- Typography: refined grotesk, small caps labels, luxury restraint.
- Palette: #000000 plus #C2C2C2. Monochrome with material texture doing the work of colour.
- Motion: slow, weighty, very long durations (1.2 to 2s), heavy inOut. Everything feels expensive because nothing is rushed.
- Borrow: a "material" hover (displacement or relief shader on project thumbnails) instead of the 2021 scale-and-fade.

#### 5. Resn (Squarespace Foundations, Tracing Art, Navigate)

- URL: https://resn.co.nz, https://brand.squarespace.com, awwwards.com/sites/squarespace-foundations
- Category: creative digital agency, Wellington
- Special: Squarespace Foundations (1 Sep 2026, SOTD plus Dev Award) is an editorial brand-book site in HTML5 plus GSAP with scrolling transitions, an interactive gallery and campaign carousel. Palette #FFFFFF and #292929.
- Motion: editorial restraint, GSAP-driven, "camera-like" section changes rather than parallax.
- Borrow: treat your portfolio like a brand-book: principles first, work second, with an interactive specimen for each principle.

#### 6. Studio Freight / darkroom.engineering (Sharplink)

- URL: https://darkroom.engineering, awwwards.com/sites/sharplink
- Category: engineering-led studio; authors of Lenis (smooth scroll), Hamo, Tempus, Satus
- Special: "work that ships". Sharplink (27 Aug 2026, Vue plus Three.js plus GSAP) has 3D page headers, animated footer, team modals, palette #0E76FF blue on #F3F3F3.
- Motion: Lenis-smooth scroll with lerp around 0.1, ScrollTrigger-scrubbed 3D headers, quick UI (0.4 to 0.6s), slow environment.
- Borrow: Lenis plus GSAP ticker as the single clock for DOM and WebGL. Their Satus starter is a good architectural reference for a Next-based portfolio.

#### 7. basement.studio

- URL: https://basement.studio
- Category: digital studio and branding, Buenos Aires and US (Vercel Ship, Daylight, KidSuper, Shop MrBeast)
- Special: "making cool shit that performs"; the Geist typeface was made with Vercel and basement. Their own site and Lab are technical showcases.
- Typography: Geist Sans and Geist Mono, huge uppercase display, mono for metadata.
- Palette: near-black, orange accent historically, lots of pure white text.
- Motion: snappy, developer-flavoured: quick masks, marquee strips, hover-swap images, terminal aesthetics.
- Borrow: mono metadata layer (index numbers, coordinates, timestamps, build hash) that gives a design-engineer site its "engineered" feel.

#### 8. Unseen Studio

- URL: https://unseen.co
- Category: Bristol and London, brand plus WebGL
- Special: "Enter with audio / without audio" gate, Click and Hold interactions, drag-to-explore. Hubtown won SOTD plus Dev Award June 2026. A "2025 Wrapped" page and an "Unseen World" section add personality.
- Typography: spaced-out letterforms as identity (U N S E E N).
- Motion: click-and-hold reveals, drag inertia, WebGL project previews.
- Borrow: a click-and-hold gesture for revealing case-study details (progress ring fills, content unfolds), which is tactile and not yet overused.

#### 9. Obys Agency

- URL: https://obys.agency
- Category: Kyiv design studio, 19 projects, also publishes design books and a grid course
- Special: known for kinetic typography systems where letters scale and split during scroll.
- Typography: editorial serif plus grotesk pairings, big index numbers; the studio literally teaches grids.
- Palette: paper whites, black, one accent per project.
- Motion: typographic; letters and words are the animated objects, images secondary.
- Borrow: a grid you can see. Toggle-able baseline grid or column overlay as an easter egg for a design-engineer portfolio.

#### 10. Locomotive

- URL: https://locomotive.ca/en
- Category: Montreal digital-first agency, 91 SOTDs, authors of Locomotive Scroll
- Special: "Design and code are only tools of expression. What sets us apart is people." Uses emoji-style badges and playful decoration while staying premium. Built the Pangram Pangram site (SOTD 2021, Locomotive Scroll plus Shopify).
- Motion: parallax with heavy damping, sticky sections, very consistent scroll rhythm.
- Borrow: playful badge system (round stickers with rotating text) used sparingly to break a strict grid.

#### 11. Antinomy and 27b

- URL: https://www.antinomy.studio, Codrops feature Aug 2026
- Category: Amsterdam and Berlin, systems-driven branding (i-D relaunch, Vast, Google Gemini launch, MetaMask, Adyen)
- Special: "systems thinking and brand expression are part of the same conversation". Motion language "reinforces usability and context".
- Borrow: treat the portfolio as a design system that is visibly consistent: tokens, spacing scale, motion tokens documented on an "about the site" page.

#### 12. Bureau Cool (Berlin) and Dogstudio (Chicago, Amsterdam, Paris)

- URL: https://bureau.cool, https://dogstudio.co
- Special: Bureau Cool does real-time graphics for Nike, pgLang, Teenage Engineering, Bottega Veneta; site is an expandable archive with category tags. Dogstudio: "We Make Good Shit", spaced letterforms, sound toggle, Kikk Festival identities.
- Borrow: the archive pattern: a featured set of 6 to 8 works plus an expandable dense list of 30 more, with tags. It shows range without diluting the hero.

#### 13. Toyfight

- URL: https://toyfight.co
- Category: "The Unmistakably Original Design Studio"
- Special: a command terminal (TOS Command Terminal) as secondary navigation: type "bw", "negative", "reset". Press "/" for help. Glitch text in the footer.
- Borrow: a keyboard-driven command palette (Cmd+K) with playful commands (theme, grid, sound, "goto work") is exactly right for a design engineer.

#### 14. Wild (wild.as), Exo Ape, 14islands, Bakken & Baeck, Phantom, Instrument, Hello Monday, North Kingdom, Merci-Michel, makemepulse, Noomo

- URLs: https://wild.as, https://exoape.com, https://www.14islands.com, https://bakkenbaeck.com, https://phantom.land, https://www.instrument.com, https://www.hellomonday.com, https://www.northkingdom.com, https://www.merci-michel.com, https://www.makemepulse.com, https://noomoagency.com
- Common patterns worth noting:
  - Wild: numbered work index (W/001, W/002) and a pastel card system (#FFFFA8, #BCB5EC, soft greys).
  - Exo Ape: "our work is best experienced in motion", headphones prompt, 2400px photographic heroes, Roermond NL.
  - Phantom: filter by year (2016 to 2026) and discipline, 92 projects.
  - Merci-Michel: ships a markdown version "for agents" alongside the interactive site (see trend 6.8).
  - makemepulse: "tech that's light as air"; Brunello Cucinelli AI e-com (SOTD Jul 2026, palette #F1EDE7 plus #282828) is a pageless, intent-led shop.
  - Noomo: "3D storytelling websites"; 50 plus awards displayed as a wall.
- Borrow: a year-filterable archive and an "awards wall" done with restraint (small mono list, not badges).

#### 15. good-fella.com (user's stated dark reference)

- URL: https://good-fella.com
- Category: "The digital landmark studio"
- Fetch returned only a LOADING state, which itself tells you the site is preloader-gated and fully client-rendered. Tagline and positioning are landmark-scale, dark, cinematic.
- Borrow: keep the preloader, but make it earn its place: show real progress and turn it into the first beat of the intro (see Goodgrowth "Insert Disc" below), and make sure there is an SSR text fallback so bots and the Awwwards dev jury see content.

### B. Product and startup marketing sites

#### 16. Linear

- URL: https://linear.app
- Special: the reference for "product-style" motion. Headline now "The product development system for teams and agents". Monochrome UI screenshots, timeline visualisations, code diffs as content.
- Typography: Inter family (Inter Display for headings historically), tight tracking, 1.1 line-height headlines.
- Palette: near-black with cool grey ramps, thin 1px borders, subtle glows.
- Motion: springy, short (200 to 400ms), ease-out, staggered fades of 8 to 16px. Nothing longer than half a second in UI. Scroll reveals are once-only.
- Borrow: the disciplined 1px-border card and gradient-mask fade for lists. Also, Linear's changelog page as a model for a "site log" on your own portfolio.

#### 17. Vercel (and vgpu Prism)

- URL: https://vercel.com, Codrops "From Rays to Meshes: Building Vercel's Prism with vgpu" (3 Sep 2026)
- Special: Geist Sans plus Geist Mono as the entire type system. The new vgpu landing hero is a glass prism refracting light into RGB with floating particles, with adaptive quality by GPU tier, battery and frame stability. "It does not need to simulate reality perfectly. It just needs to look convincing and run smoothly."
- Palette: pure black and white, one gradient (blue to purple to orange) used as light rather than fill.
- Borrow: adaptive rendering budget (measure FPS for 1s, downgrade quality tiers) as a documented feature of your WebGL hero; the dev jury notices WPO.

#### 18. Raycast

- URL: https://www.raycast.com
- Special: "Your shortcut to everything". Keyboard-key illustrations, glass surfaces, isolated 3D cubes, extension grid.
- Motion: crisp keyboard-driven micro-interactions, glass blur transitions.
- Borrow: keyboard hints rendered as real key caps in the UI (for your Cmd+K palette).

#### 19. Family (family.co)

- URL: https://www.family.co
- Special: "We sweat the details, no matter how small." The site's micro-interactions and phone mockups are constantly cited by product designers; Family's founder also published "Family Values" motion principles (drawer animations, spring physics, interruptible gestures).
- Motion: iOS-spring feel (mass 1, stiffness 200 to 300, damping 25 to 30 equivalents), everything interruptible.
- Borrow: interruptible animations: any hover or open state can be reversed mid-flight without jank. Use GSAP's overwrite and quickTo, or Motion springs.

#### 20. Rive, Spline, Framer, Cursor, Warp, Granola, Dia, Arc, Clerk, Cal.com, Loom, Pitch, Notion Calendar, Mercury

- Observed via fetch: nearly all now lead with "agents". Vercel: "coding agents to ship apps"; Cursor: "your coding agent"; Framer: "the AI design agent"; Warp: "cloud software factories". Visual language converges: white or near-black, one sans, product UI as the hero image, subtle gradients, testimonial cards.
- Rive: "The Interactive experience engine", 120fps GPU vector runtime; MindMarket (SOTM Dec 2025) used Rive animations on a scroll path with GSAP.
- Spline: "Make anything 3D", now with Hana canvas; templates for interactive websites.
- Granola: floating abstract imagery (explosions, posters) over neutral tones; functional animations only.
- Mercury: "Radically different banking", abstract geometric illustration, soft flowing forms, subtle motion.
- Warp: dark, monospace-heavy, labelled figures, terminal formatting.
- Borrow: (a) from Rive: ship one hand-crafted vector animation (a logo or avatar state machine) rather than a video; (b) from Warp and basement: labelled figures ("Fig. 01") for case-study images; (c) avoid the converged "agent SaaS" look; it is the template of 2026.

#### 21. Anthropic research page (and OpenAI, 403 to fetcher)

- URL: https://www.anthropic.com/research
- Special: warm off-white, serif plus sans pairing, card grid, filtered publication table, purpose-built scientific visualisation instead of stock imagery.
- Borrow: the filterable publication table pattern for an "index" or "writing" page.

### C. Editorial and typography-driven

#### 22. Klim Type Foundry

- URL: https://klim.co.nz
- Special: Söhne, Founders Grotesk, National 2, Tiempos, Die Grotesk ("shaped in the long shadow of Helvetica"). Long-form historical essays per typeface; "Fonts in use" galleries.
- Palette: neutral; type is the image.
- Borrow: write one long, well-typeset essay on the site (about your process, or one project) and design it like a Klim specimen page with pull quotes and margin notes.

#### 23. Pangram Pangram

- URL: https://pangrampangram.com (Locomotive-built version SOTD Nov 2021)
- Special: card and list view toggle, 62 typefaces, "Try for free". Neue Montreal ("the only Grotesk you'll ever need"), Editorial New, Monument Extended, new Palma and Neue Gstaad ("Calm. Efficient. Swiss").
- Palette: #000, #9C9C9C, #FFF.
- Borrow: the card/list toggle for the work index, with a Flip transition between the two states.

#### 24. ABC Dinamo

- URL: https://abcdinamo.com
- Special: "fonts are tools" attitude, font customiser with alternate glyphs, hardware merch, variable fonts (Gravity, Social, ROM, Oracle, Ginto, Diatype, Favorit). Are.na uses a custom Dinamo face (Areal).
- Borrow: an in-page type customiser or variable-axis slider as an interactive specimen of the portfolio's own typeface.

#### 25. Grilli Type

- URL: https://www.grillitype.com
- Special: "contemporary aesthetic in the Swiss tradition". Minisites for GT Mechanik and GT Standard, GT Academy, a Variable Fonts Guide, Grilli Kiosk. GT Flexa is a variable width workhorse.
- Borrow: a minisite mentality: each major case study gets its own typographic treatment or palette variation while sharing the shell.

#### 26. Are.na

- URL: https://www.are.na
- Special: "A toolkit for assembling new worlds from the scraps of the old." Custom Dinamo typeface Areal, numbered "how it works" flow, anti-algorithmic tone.
- Borrow: a "scraps" or "blocks" page: a channel-like grid of references and sketches that shows how you think, in Are.na's flat, connected style.

#### 27. Pudding.cool, Stripe Press, It's Nice That, Dazed

- URLs: https://pudding.cool, https://press.stripe.com, https://www.itsnicethat.com, https://www.dazeddigital.com
- Pudding: sticker-style navigation, numbered stories (#224 Aug 2026), grid cards, playful primary colours. Stripe Press: vertical stacked book list, each book a full section, animated geometric shapes for the film section. It's Nice That and Dazed: grid, big imagery, hierarchical nav, black on white.
- Borrow: numbered stories (#001 style) and a stack-of-sections rhythm where each project gets one full-height "spread".

#### 28. Pentagram

- URL: https://www.pentagram.com
- Special: "We design Everything for Everyone." Modular grid, filters by discipline and sector, retrospectives (Shakespeare in the Park across decades), partner quotes ("Type has spirit").
- Borrow: a "retrospective" module that shows one project evolving across years, useful if you have long-running client work.

### D. Experimental and WebGL

#### 29. Bruno Simon portfolio (2025 rebuild, Site of the Month Jan 2026)

- URL: https://bruno-simon.com
- Special: the drivable 3D world, rebuilt with Three.js on WebGPU via TSL, Rapier physics, Howler audio, achievements, a leaderboard, a 30-character community "Whispers" board, gamepad support, quality settings, multiple languages, all MIT open source.
- Borrow: quality settings and input agnosticism (mouse, keyboard, touch, gamepad) surfaced in the UI; an achievements or easter-egg system that rewards exploration.

#### 30. Codrops 2026 case studies (HAOQI.DESIGN, Goodgrowth, joseph-san)

- URLs: tympanus.net/codrops 15 Aug, 27 Aug and 28 Apr 2026
- HAOQI.DESIGN: iMac G3 retro-futurism. DOM does layout and accessibility, WebGL does hover reveals, entrance and refraction. A single "ScrollBus" and "PointerBus" feed DOM and R3F in the same frame (Lenis raf disabled and driven from the R3F loop) to kill one-frame lag. Ring light follows pointer with fast attack 0.025s and slow release 0.175s. Image "development" over 0.8s with a polarity inversion. "ScrambleLines" text decode on a shared 40ms ticker. Dark and light glass via Beer-Lambert absorption vs Hard Light. Respects prefers-reduced-motion.
- Goodgrowth: PlayStation and Dreamcast boot sequence, "Insert Disc" preloader with a CSS CD, thumbnails spiral inward (angle and radius tweened independently), Bayer dither shader for Y2K fidelity, Web Audio clock for sound scheduling, token-based theme toggles for live A/B testing colours.
- joseph-san.com: scroll-driven 3D world, GSAP Observer unifying wheel, touch and trackpad; free scroll most of the time, snap-block scroll for the one sequence that needs page-turn pacing; KTX2 and Draco compression, instancing.
- Borrow: (a) unified input bus so DOM and canvas never disagree; (b) a themed preloader that is the first beat of the story; (c) a text scramble on a shared ticker, used only on viewport entry.

#### 31. Codrops 2026 technique tutorials (transitions)

- Scroll-revealed WebGL gallery with GSAP, Three.js, Astro, Barba (Feb 2026): ScrollSmoother value on gsap.ticker drives mesh positions; reveal uniform 0 to 1 over 1.6s linear; text lines up with "expo" ease and 0.06s stagger; Flip of the selected image into the detail page over 1s power3.inOut while other meshes reverse-reveal.
- Custom page transitions in Astro with Barba and GSAP (Apr 2026): before, leave, after hooks; a pointer-events-none "is transitioning" class; clip-path via CSS variables; custom "hop" ease (0.56, 0, 0.35, 0.98), elastic.in(1,1) for text, sine.inOut for curves; 1 to 1.4s main durations; destroy SplitText before the next page; clearProps after.
- Seamless 3D transitions in Webflow with GSAP and Three.js (Mar 2026): one persistent Three.js Experience outside the Barba container; camera slides with expo.inOut over 2s while content exits with power4.in at 0.8s and enters with expo.out with 0.2 to 0.35s delays; spacers scale with directional transform origins.
- Borrow: the persistent-canvas architecture and the "content fast, camera slow" timing split (0.8s vs 2s) which is the single most reusable choreography rule found in this research.

#### 32. Codrops Playground and recent posts (WebGPU wave)

- Recent titles: datamosh effect in Three.js, Eiffel Tower catapult (Yuri Artiukh), glass caustics and sound, Garden Anomaly (WebGPU and TSL), music-reactive goo with WebGPU, relighting images with depth maps, mouse-following square lens with GLSL, interactive 3D cluster with TSL, procedural geometry with WebGPU, GSAP easeReverse clip menu, on-scroll 3D carousel.
- Trend: 7 of 18 latest posts are WebGPU or TSL. Depth-map relighting of flat photos is a fresh, cheap way to make 2D imagery feel 3D.
- Borrow: depth-map relighting on portrait or project photos (a pointer-driven light source) as a low-cost "wow" that does not require a full 3D scene.

#### 33. GSAP ecosystem shifts and showcase

- GSAP became fully free in May 2025 (v3.13, Webflow acquisition): SplitText rewrite (masks, accessibility, smaller), ScrollSmoother, MorphSVG, DrawSVG, Physics2D, Inertia, ScrambleText all free. Codrops demo timings: SplitText lines 0.8s with 0.08 stagger, words 0.6s with 0.06, chars 0.4s with 0.008, custom ease "0.625, 0.05, 0, 1"; dot grid with Inertia and elastic.out(1, 0.75) 1.5s; DrawSVG scribble underline 0.5s power2.inOut; MorphSVG 0.5s power4.inOut.
- GSAP showcase currently features Graffico Office (Italy), Gionatan Nese '26 (Milan), Jesper Landberg, Edolus, Bombon, Square43.
- Borrow: the DrawSVG hand-drawn scribble underline on links (six random variants) gives a designer's-hand feel without kitsch.

#### 34. Maxime Heckel's blog and Yuri Artiukh

- URLs: https://blog.maximeheckel.com, https://tympanus.net/codrops/author/akella
- Heckel 2026: "Shading Motion" (Aug), "On Rendering the Sky, Sunsets, and Planets" (May), "Shades of Halftone" (Feb). Interactive playgrounds inline. "Designed and Built in NYC". Artiukh: weekly live-coded WebGL deconstructions; Codrops author.
- Borrow: inline interactive figures (small shader sandboxes with sliders) inside case studies, which read as engineering competence more convincingly than a video.

#### 35. Anime.js v4 site (SOTM May 2025)

- URL: https://animejs.com, awwwards.com/sites/anime-js
- Special: animations 9.0/10 dev score; header animation, scroll scrubber, an "animator's toolbox" interface, modular lightweight demo. Palette #252423 charcoal and #DAD5D0 warm beige.
- Borrow: warm charcoal plus warm beige is the most "2025 to 2026" dark palette in this set (see section 3).

### E. Italian design excellence

#### 36. Siena Film Foundation (Niccolò Miranda, G-NS Studio)

- URL: awwwards.com/sites/siena-film-foundation (SOTM March 2025, 7.9 overall, animations 8.6)
- Special: brand intro animation, film-strip slider navigation, procedural slider rearrangement, "contact type lettering", infinite scroll. Palette #000000 plus #FAF7EF cream.
- Borrow: a film-strip index for projects: a horizontal strip with sprocket holes whose frames rearrange procedurally when filtered.

#### 37. Gionatan Nese '26 (Milan)

- URL: https://www.gionatannese.com (HM plus Developer Award Aug 2026, community 8.6)
- Special: "Turning bold ideas into ambitious cool Stuff that actually stick". Preloader, page transitions, interactive avatar, custom 404, sound, Three.js plus GSAP, infinite scroll. Palette strictly #000 and #FFF. Numeric nav (1, 2, 3) for Creative Space, Projects, About. Also on the GSAP showcase.
- Borrow: the numbered three-section nav and a "creative space" section separate from client work.

#### 38. Graffico Office (Modena and Napoli)

- URL: https://office.graffico.it, awwwards nominee 30 Aug 2026, GSAP showcase
- Special: a 3D studio you walk through ("Come inside and don't unplug anything"): live coding station, working radio with live stations, showreel screen, awards wall, heist board, coffee table, bookshelf, "Do Not Unplug" easter egg. Three.js, GSAP, Blender.
- Borrow: the "awards wall" as a diegetic object rather than a badge list; a hidden easter egg tied to the studio's story.

#### 39. Adoratorio Studio (Brescia and Amsterdam)

- URL: https://www.adoratorio.studio
- Special: Awwwards Studio of the Year alumni; Pelizzari Studio (SOTD 2019: WebGL, GSAP, PixiJS, Vue, palette #000 #9C9C9C #FFF, hover effects and slideshow). Recent: Colonia Zacamil. Co-founders spoke at Awwwards Tokyo on pitching.
- Borrow: Adoratorio's restraint: black, grey, white, one WebGL surface, generous whitespace, luxury-real-estate pacing.

#### 40. Other Italian entries seen on awwwards.com/websites/Italy (Jul to Aug 2026)

- Ducati Superleggera V4 Centenario (Craq Design Studio, HM Jul 2026): Next.js, Sass, GSAP; horizontal scroll, scrollytelling; #000000 plus Ducati red #E3001E.
- Brunello Cucinelli AI E-com (makemepulse, SOTD plus Dev Jul 2026): #F1EDE7 plus #282828.
- Caffè Gilli (thebrandingcrew, HM Aug 2026): #A9BDCC plus #142342, cinematic hero video. thebrandingcrew has six Florentine and hospitality sites on the page (Paszkowski, Giacosa, Moncalisse, Hot Lab, Stazione Leopolda).
- Lorenzo Lannino (Venice, creative developer, nominee Aug 2026): GSAP plus TypeScript on Vercel, font transitions, intro animation, custom 404, page transitions, community around 8.0.
- Studio K95 (Catania), Made In Evolve (Offporter, Roberto Collina), MONOGRID (Tuscan Journey, D&G Beauty GiftFinder), Agave Studio (Pelizzari), Deep White Gallery (Giacomo Morri), Kononenko Architectural Bureau (Reksa Andhika, SOTD plus Dev 23 Aug 2026, #FFF and #000, hover animations 8.2).
- Note: Bonsai (studiobonsai.it), Lovaspazio, Ilaria Vitali and Bmore did not resolve or are not visible on Awwwards. Bmore Studio online is a Baltimore company, not Italian.
- Observation: Italian award winners in 2026 fall into two camps, luxury hospitality (cream, navy, cinematic video, serif) and creative-developer portfolios (pure black and white, GSAP, custom 404, page transitions). A Turin design engineer can own a third space: warm dark, engineered mono details, Italian typographic culture (Piedmontese industrial heritage, Olivetti, Fiat, Torino Design) without the luxury clichés.

---

## 2. Synthesis

### 2.1 Motion languages: the "feels" that exist right now

1. Cinematic WebGL (Lusion, Immersive Garden, OFF+BRAND, Noomo, abeto)
   - Feel: camera moves, not element moves. Long durations (1.2 to 2.5s), expo.inOut or power4.inOut, scroll scrubbing with heavy damping, 3D-to-2D-to-3D handoffs.
   - Communicates: budget, ambition, spectacle. Risk: slow, heavy, mobile hostile; dev jury docks WPO and accessibility (6.6 to 7.0 typical).
   - Rule found in Codrops 2026: content fast (0.8s power4), camera slow (2s expo.inOut), run in parallel.

2. Heavy-ease editorial (By-Kin, Uncommon, Squarespace Foundations, Siena Film Foundation, Kononenko, Adoratorio)
   - Feel: masked line reveals (SplitText lines with overflow mask), power3/power4.out at 0.8 to 1.2s, 0.06 to 0.1s staggers, "weighted" smooth scroll (Lenis lerp 0.08 to 0.12), clip-path wipes, transitions that make the site "one continuous surface".
   - Communicates: taste, restraint, seniority. Hon Tran's verdict on By-Kin: "a masterclass in restraint". Works with two-colour palettes and big type.
   - This is the most credible default for a design-engineer portfolio.

3. Springy product (Linear, Family, Raycast, Vercel UI)
   - Feel: 150 to 400ms, ease-out or spring, 8 to 16px travel, interruptible, once-only reveals, hover states that are instant.
   - Communicates: product craft, "we ship". Reads as SaaS if used for the whole site; excellent for UI chrome (menus, palettes, toggles) inside an otherwise editorial site.

4. Kinetic typography (Mat Voyce, Obys, Denis Avramenko, Envato's 2026 trend list)
   - Feel: type is the animated object: weight and width axes scrubbed by scroll, letters scaling and splitting, subtle 3D rotation of words, low-contrast compositions where "object and background feel like part of the same space". Avramenko: "slow-paced animations, flowing transitions, animated typography with subtle 3D rotations".
   - Communicates: designer's eye, typographic literacy. Best when it "never blocks reading" (Mat Voyce praise).

5. Game feel and diegetic UI (Messenger, Bruno Simon, Graffico Office, Goodgrowth, Ponpon Mania, Toyfight)
   - Feel: idle animation, physics, input latency near zero, boot sequences, sound, achievements.
   - Communicates: play, personality, technical bravado. Site of the Year 2025 material, but a whole-site commitment.

6. Retro-futurist and dithered (HAOQI, Goodgrowth, Decathlon Yestalgia, Toyfight terminal)
   - Feel: Bayer dither, scanlines, CRT walls, text scramble decode on a 40ms ticker, boot screens. Fast-attack slow-release pointer following (0.025s / 0.175s).
   - Communicates: nostalgia with engineering chops. Fresh in 2026 because it is anti-glossy.

Recommendation for the portfolio: language 2 as the base (editorial heavy-ease with masked reveals), language 3 for chrome (command palette, toggles, menu), one moment of language 1 or 6 (a single WebGL or shader hero object with a persistent canvas), and one language 4 typographic set piece. Avoid full commitment to 5 unless the site becomes the project.

### 2.2 Typography systems in 2025 to 2026

- Foundries in vogue (Creative Boom top 50 for 2026, MaxiBestOf usage counts, Awwwards observation): Pangram Pangram (Neue Montreal ranks 3rd overall and "reached critical mass in late 2025"; Editorial New; Monument Extended; new Palma and Neue Gstaad), ABC Dinamo (Diatype 4th, Monument Grotesk 11th, Diatype Mono 14th; Favorit, Gravity, ROM variable), Klim (Söhne 13th, Founders Grotesk and Mono, Tiempos, National 2, Domaine, Die Grotesk), Grilli Type (GT America, GT Walsheim, GT Alpina, GT Sectra, GT Flexa variable, GT Pressura, GT Mechanik, GT Standard), Commercial Type (Druk, Graphik, Canela, Portrait, Publico), Sharp Type (Sharp Grotesk with mono, Beatrice, Ogg), Displaay (Roobert), Colophon (Basis Grotesque, Aperçu; now under Monotype since March 2025), CoType (Aeonik), Lineto (Replica, Akkurat), Vercel's Geist (free, Sans plus Mono), Inter and Inter Display (Linear).
- Dominant pairings seen on winners:
  1. Tight grotesk display plus the same family's mono for labels (Geist Sans plus Geist Mono; Founders Grotesk plus Founders Mono; Diatype plus Diatype Mono; Sharp Grotesk plus its mono). This is the design-engineer signature.
  2. Neo-serif or "reimagined serif" headline plus grotesk body (Editorial New or GT Alpina or Tiempos over Neue Montreal or Söhne). Fireart's 2026 trend: "neo-serif paired with monospace creates premium contrast".
  3. Condensed or extended display as image (Druk, Monument Extended, GT Pressura) for one hero word, then a quiet grotesk everywhere else (Lando Norris style).
- Scale: hero at 10 to 16vw or clamp(4rem, 12vw, 14rem), line-height 0.85 to 0.95, letter-spacing -0.03 to -0.05em; body 16 to 18px at 1.5; mono labels 11 to 12px uppercase with +0.08em tracking. Big display, tiny mono, almost no middle sizes is the 2026 rhythm.
- Variable font tricks: scroll-mapped weight and width (Envato: "font weight and width mapped to the user's scroll position"), hover-driven optical size, GT Flexa and Gravity style width axes for responsive headlines that reflow by width instead of by wrapping, and type customisers (Dinamo) as interactive specimens.
- Type-as-image heroes: full-viewport single word or initial, often masked over video or WebGL, often with a scramble or decode entrance (HAOQI), sometimes physically simulated (Physics2D text smash in Codrops GSAP demos).
- Italian angle: Olivetti-era grotesks and industrial mono cues would be distinctive for Turin; a free option is Geist plus a purchased neo-serif (Editorial New is inexpensive at Pangram Pangram, Neue Montreal is trialable).

### 2.3 Palette strategies: current vs dated

Observed award palettes (all two-colour systems as reported by Awwwards):

- Warm dark: Anime.js #252423 plus #DAD5D0; Oryzo AI #100904 plus #FF8539; Son Daven #2C2824 plus #A89474; Floema #241F21 plus #E9E778; Renaissance Edition #292919 plus #F7F7EE. Charcoal with brown or olive undertone plus a warm cream or one warm accent. Feels 2025 to 2026, human, "human authorship against AI homogeneity" (Fireart).
- Light editorial: Squarespace Foundations #FFFFFF plus #292929; Brunello Cucinelli #F1EDE7 plus #282828; Microsoft AI #FEF9ED plus #5D524B; Siena #FAF7EF plus #000; EverSwap #FBFFF4 plus #203727. Cream, not pure white, with near-black. Reads calm and expensive.
- One loud accent on black: Lando Norris #D2FF00 on #111112; Ducati #E3001E on #000; Serotoninn #ED3833 on #000; Sharplink #0E76FF on #F3F3F3; Apechain single #0054FA. Still current if the accent is used as light or ink, not as fill everywhere. Fireart calls it "deep cyber-monochrome interrupted by a single acid hue".
- Duotone pastel or desaturated: Messenger #81BFBC plus #C9D5C3; Igloo #B6BAC5 plus #383E4E; Iventions #E0FF98 plus #9C93E8; Ponpon Mania #7E7EFF plus #F894C0; Trevor Noah #FF9BB4 plus #1D2440; MindMarket #8ED462 plus #F5E211; Mat Voyce #00D3FF plus #DFFF6B; Wild's card pastels. Two mid-saturation colours with no black at all is the freshest look in the set and rare among developer portfolios.
- Pure black and white: Steven.com, Gionatan Nese, Kononenko, Immersive Garden (#000 plus #C2C2C2), Adoratorio, Pangram Pangram. Timeless but crowded in the Italian creative-dev space; needs texture (grain, dither, material shaders) to not look like a template.
- Dated in 2026: purple-to-blue "SaaS gradient" on navy; glassmorphism as decoration (unless tied to a real glass metaphor like Vercel Prism or HAOQI); neon cyberpunk multi-accent; pure #000 with #FFF and a blue link colour; big soft drop shadows. Fireart's "tactile brutalism" spells it out: 0 radius, explicit 1px borders, no drop shadows, CSS noise and SVG grain instead of heavy 3D.

Recommendation: warm dark base (around #141210 to #1C1917) with a warm paper light mode (around #F3EFE6), one accent used as light (a Torino-ish signal orange or a lime) plus mono grey labels, grain overlay at 3 to 5 percent, 1px borders, no shadows. Provide a real light theme; the 2026 dev jury tests both and OLED dark-first is expected.

### 2.4 Page transition and navigation patterns worth borrowing

1. Persistent canvas, swapped DOM. One Three.js or 2D canvas outside the router container; Barba or the framework router swaps HTML; camera or shader uniforms tween between page states (expo.inOut, 1.5 to 2s) while text exits fast (power4.in 0.6 to 0.8s) and enters with expo.out and 0.2 to 0.35s delays. Seen in Codrops Mar 2026, Lusion, Oryzo AI ("3D-to-2D-to-3D transitions").
2. Flip the thumbnail into the hero. Selected project image morphs (GSAP Flip, 1s power3.inOut) into the case-study header; other items reverse their reveal to 0. Codrops Feb 2026; Immersive Garden and Igloo do a variant.
3. Clip-path wipe with a CSS variable. Directional wipes driven by a custom "hop" ease (0.56, 0, 0.35, 0.98), 1 to 1.4s; add pointer-events none during transition and clearProps after. Simple, robust, no WebGL.
4. View Transitions API (cross-document supported broadly since Oct 2025) for the "boring" pages (about, writing) so every route has a transition without JS routing; use Barba or a SPA only where the canvas must persist.
5. Navigation as experience: Steven.com's single interactive canvas as nav; Toyfight's command terminal; Gionatan Nese's numeric 1/2/3 nav; Unseen's click-and-hold; Siena's film-strip slider that rearranges procedurally; Pangram Pangram's card/list toggle with Flip. Keep one unusual nav plus a conventional fallback (the dev jury checks usability; unusual nav sites average 7.1 to 7.4 usability).
6. Preloader that is the first beat. Goodgrowth "Insert Disc"; Gionatan Nese, Serotoninn, Renaissance Edition all list the preloader as a featured element. Show real progress, keep under 2s, and let it hand off into the hero animation rather than fading to a blank frame.
7. Footer as destination: Oryzo AI interactive particle footer, Sharplink and Serotoninn "animated footer", Apechain "playful footer". Awwwards has a "Footer Design" tag for a reason.
8. Custom 404 and About as showcase pages: consistently listed as featured elements on nominated portfolios (Nese, Lannino, Renaissance Edition, Kononenko).

### 2.5 "Wow" components still fresh in 2026 (not the 2021 clichés)

Fresh:

- Depth-map relighting of flat photos with a pointer-driven light (Codrops Aug 2026).
- Material or bas-relief hover on thumbnails (Immersive Garden) instead of scale-and-fade.
- Glass with real optics: Beer-Lambert tinted refraction, ring highlight that tracks pointer angle with fast-attack slow-release (HAOQI); prism dispersion with adaptive quality (Vercel vgpu).
- Scroll-scrubbed variable font axes (weight or width) on a single headline.
- Text decode or scramble on viewport entry, synchronised on one shared ticker, once only.
- Click-and-hold reveals with a progress ring (Unseen).
- Command palette (Cmd+K) with playful commands: theme, grid overlay, sound, "bw", "negative" (Toyfight).
- Interactive footer toy (particles, fluid, or a tiny physics scene).
- Inline interactive figures in case studies (shader sandbox with sliders, Heckel style) and labelled "Fig. 01" captions (Warp, basement).
- Diegetic awards wall or bookshelf instead of badge rows (Graffico Office).
- Dithered or halftone image treatments (Bayer dither in Goodgrowth, "Shades of Halftone" by Heckel) as a signature image style.
- Site changelog or "build log" page (Linear changelog pattern applied to a portfolio) with version numbers in mono.
- Real accessibility as a feature: visible focus styles that match the design, reduced-motion variants that are still designed, keyboard nav for the unusual nav.

Tired (avoid or reinvent):

- Custom cursor blob following the mouse, magnetic buttons, marquee strips of client logos, horizontal-scroll-everything, parallax image stacks, glassmorphism cards on gradient blobs, "scroll down" bouncing arrows, split-text word-by-word fade on every paragraph, full-page preloader percentage with no payoff, dark mode toggle as a sun/moon icon with no other personality, 3D blob hero (Spline default).

### 2.6 Trends specific to 2025 to 2026

1. WebGPU and TSL go mainstream in creative dev: Three.js Journey has a full WebGPU/TSL course; Bruno Simon's portfolio ships a WebGPU renderer option; 7 of the latest 18 Codrops posts are WebGPU or TSL; Vercel shipped vgpu. WebGL is still the safe production target, but a WebGPU path with fallback signals currency.
2. GSAP is free including SplitText, ScrollSmoother, MorphSVG, Flip (May 2025). The barrier dropped, so raw plugin use no longer impresses; choreography and restraint do. Awwwards claims "the majority of Awwwards-winning projects since 2020" use GSAP.
3. Restraint is the new spectacle. Hon Tran's 2026 judging: "beauty at 60fps is the whole discipline"; Iventions praised for "atmosphere instead of spectacle"; Psychoactive's buyer guide says to test on mid-range Android. Studios explicitly market performance budgets.
4. Two-colour palettes reported per site on Awwwards, and winners really are two-colour systems (plus greys). Warm charcoal replaces cold navy; cream replaces white; desaturated duotones replace neon.
5. "Tactile brutalism" and human authorship as a reaction to AI-generated sameness: 1px borders, zero radius, grain, dither, visible grids, hand-drawn SVG scribbles, retro hardware metaphors (iMac G3, PlayStation boot, CRTs).
6. Kinetic and variable typography as the hero, with scroll-mapped axes; oversized type carrying layouts (AVA SRG, Jitter, Museum of Money cited by Envato).
7. Sound returns: audio toggles on Unseen, Dogstudio, Exo Ape ("best experienced in motion, headphones"), Gionatan Nese, Graffico Office radio; Web Audio clock scheduling as a documented technique.
8. Sites publish "for agents": Merci-Michel serves a markdown version for AI agents; darkroom.engineering lists "AI guidance documentation"; Fireart calls it "Invisible Architecture" and Envato "Machine Experience". A portfolio with an llms.txt, clean semantic HTML and a text-first fallback under the WebGL is on-trend and helps SEO.
9. Product marketing converged on the "agent" template (Vercel, Cursor, Framer, Warp, Linear all lead with agents). For a portfolio this means the SaaS look is now the generic look; editorial and game-feel directions differentiate more.
10. Storytelling structure over page hierarchy: Metabole's 2026 roundup finds winners share "single defended ideas, scene logic over page hierarchy". Awwwards tags "Storytelling" appear on most 2026 SOTDs listed above.
11. Portfolios keep winning big: Bruno's Portfolio (SOTM Jan 2026), Gionatan Nese (Dev Award), Lorenzo Lannino, Jesper Landberg (Independent of the Year 2022 and 2024), Louis Paquet (Independent of the Year 2025). Personal sites are judged with the same rubric as brand sites, and the "Portfolio" honours category exists.
12. Accessibility is the open lane. Almost every 2026 winner scores 6.6 to 7.0 on accessibility while scoring 8 to 9 on animation. Designing reduced-motion, keyboard and screen-reader paths well is a differentiator the dev jury can measure.

---

## 3. Quick-reference tables

### Palettes lifted from 2025 to 2026 winners

| Site                  | Dark    | Light or accent | Feel                        |
| --------------------- | ------- | --------------- | --------------------------- |
| Anime.js              | #252423 | #DAD5D0         | warm charcoal and beige     |
| Oryzo AI (Lusion)     | #100904 | #FF8539         | near-black brown and orange |
| Son Daven             | #2C2824 | #A89474         | brown and taupe             |
| Floema                | #241F21 | #E9E778         | brown and warm yellow       |
| Renaissance Edition   | #292919 | #F7F7EE         | olive-black and off-white   |
| Lando Norris          | #111112 | #D2FF00         | black and acid lime         |
| Trevor Noah           | #1D2440 | #FF9BB4         | navy and pink               |
| Messenger             | #81BFBC | #C9D5C3         | teal and sage, no black     |
| Iventions             | #9C93E8 | #E0FF98         | lavender and lime           |
| Ponpon Mania          | #7E7EFF | #F894C0         | lavender and pink           |
| MindMarket            | #8ED462 | #F5E211         | green and yellow            |
| Brunello Cucinelli    | #282828 | #F1EDE7         | charcoal and cream          |
| Siena Film Foundation | #000000 | #FAF7EF         | black and cream             |
| Microsoft AI          | #5D524B | #FEF9ED         | warm brown and cream        |
| Immersive Garden      | #000000 | #C2C2C2         | black and grey              |

### Timing values quoted in 2025 to 2026 sources

| Element                            | Duration                      | Ease                          | Source                  |
| ---------------------------------- | ----------------------------- | ----------------------------- | ----------------------- |
| Camera or scene move between pages | 2.0s                          | expo.inOut                    | Codrops Mar 2026        |
| Content exit                       | 0.6 to 0.8s                   | power4.in                     | Codrops Mar 2026        |
| Content enter                      | 0.8s, delay 0.2 to 0.35s      | expo.out                      | Codrops Mar 2026        |
| Image Flip into detail             | 1.0s                          | power3.inOut                  | Codrops Feb 2026        |
| WebGL image reveal uniform         | 1.6s                          | linear                        | Codrops Feb 2026        |
| Line reveal (SplitText)            | 0.8s, stagger 0.06 to 0.08    | expo or custom 0.625,0.05,0,1 | Codrops 2025 and 2026   |
| Word reveal                        | 0.6s, stagger 0.06            | same                          | Codrops 2025            |
| Char reveal                        | 0.4s, stagger 0.008           | same                          | Codrops 2025            |
| Page wipe                          | 1.0 to 1.4s                   | custom hop 0.56,0,0.35,0.98   | Codrops Apr 2026        |
| Pointer-following highlight        | attack 0.025s, release 0.175s | damped lerp                   | HAOQI case study        |
| Image develop-in                   | 0.8s                          | polarity shift                | HAOQI case study        |
| Text scramble ticker               | 40ms per step                 | none                          | HAOQI case study        |
| Scribble underline                 | 0.5s in and out               | power2.inOut                  | Codrops GSAP demos      |
| Icon morph                         | 0.5s                          | power4.inOut                  | Codrops GSAP demos      |
| Dot grid spring back               | 1.5s                          | elastic.out(1, 0.75)          | Codrops GSAP demos      |
| Product UI micro-interaction       | 0.15 to 0.4s                  | ease-out or spring            | Linear, Family, Raycast |

### Tech stacks seen on 2026 winners

Webflow plus GSAP plus WebGL (OFF+BRAND, Son Daven), Next.js plus GSAP (Iventions, Ducati, Apechain), Nuxt plus WebGL plus GSAP (Floema, Ponpon Mania), Vue plus Three.js plus GSAP (Sharplink), Astro plus Barba plus GSAP plus Three.js (Codrops), React Three Fiber plus Lenis plus Next (HAOQI), vanilla ES modules plus Vite plus Three.js plus GSAP plus Lenis (Goodgrowth), Three.js on WebGPU with TSL plus Rapier (Bruno Simon). Common denominators: GSAP everywhere, Lenis or ScrollSmoother for scroll, Blender plus Draco or KTX2 for assets, Vercel hosting, Rive for vector animation (MindMarket).

---

## 4. Sources consulted (selection)

- awwwards.com/websites/sites_of_the_day, /sites_of_the_month, /sites_of_the_year, /websites/Italy, /developer-award, and the individual site pages: messenger, lando-norris, igloo-inc, trevor-noah, squarespace-foundations, sharplink, serotoninn, everswap, oryzo-ai, floema, son-daven, the-renaissance-edition, mindmarket, steven-com, apechain, iventions, mat-voyce, gionatan-nese-26, graffico-office, brunello-cucinelli-ai-e-com, siena-film-foundation, immersive-garden-website, terminal-industries, ponpon-mania, anime-js, microsoft-ai, ducati-superleggera-v4, pelizzari-studio, roberto-collina, caffe-gilli, lorenzo-lannino, kononenko-architectural-bureau, pangram-pangram-foundry, minh-pham, lama-lama, studio-k95, adoratorio-creative-collective
- tympanus.net/codrops: all-posts, playground, and articles dated 2 Feb, 18 Mar, 8 Apr, 28 Apr, 10 Aug, 13 Aug, 15 Aug, 17 Aug, 27 Aug, 3 Sep 2026 and 14 May 2025
- gsap.com/showcase, gsap.com/blog/3-13, webflow.com/blog/gsap-becomes-free
- hontran.dev/blog/best-award-winning-websites-2026, metabole.studio/en/blog/immersive-website-examples, psychoactive.co.nz best WebGL agencies, elements.envato.com/learn/web-design-trends, fireart.studio 2026 trends, creativeboom.com top 50 fonts 2026, maxibestof.one popular typefaces
- Studio and product sites listed inline: lusion.co, labs.lusion.co, itsoffbrand.com, darkroom.engineering, basement.studio, unseen.co, obys.agency, locomotive.ca, antinomy.studio, bureau.cool, dogstudio.co, toyfight.co, wild.as, exoape.com, 14islands.com, bakkenbaeck.com, phantom.land, instrument.com, hellomonday.com, northkingdom.com, merci-michel.com, makemepulse.com, noomoagency.com, immersive-g.com, resn.co.nz, activetheory.net, good-fella.com, linear.app, vercel.com, raycast.com, family.co, rive.app, spline.design, framer.com, cursor.com, warp.dev, granola.ai, diabrowser.com, arc.net, clerk.com, supabase.com, cal.com, loom.com, pitch.com, notion.com/product/calendar, mercury.com, anthropic.com/research, klim.co.nz, pangrampangram.com, abcdinamo.com, grillitype.com, colophon-foundry.org, typenetwork.com, are.na, pudding.cool, press.stripe.com, itsnicethat.com, dazeddigital.com, pentagram.com, bruno-simon.com, threejs-journey.com, blog.maximeheckel.com, experiments.withgoogle.com, gionatannese.com, graffico.it, office.graffico.it, jesperlandberg.com, adoratorio.studio
- Not reachable from this environment: openai.com/research (403), nytimes.com (blocked), readymag.com/examples (empty), fontshare.com (headline only), malvah.co.za, buzzworthy.studio, offbrand.studio (use itsoffbrand.com), bonsai-studio.it, lovaspazio.it, ilariavitali.com (DNS failures).
