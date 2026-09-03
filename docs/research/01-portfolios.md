# Research 01: Award-winning developer and design-engineer portfolios (2023 to September 2026)

Purpose: reference material for an AWWWARDS-grade personal portfolio of a Turin-based frontend developer with a design degree (design engineer profile). Target audience of the final site: other developers, design leads, agencies and studios who must be intrigued within seconds and then convinced by craft.

Method: roughly 90 web searches and page fetches across awwwards.com (portfolio winners category, Developer Award feed, individual SOTD pages with jury score breakdowns), cssdesignawards.com, minimal.gallery, siteinspire, dark.design, muz.li top 100 of 2026, Codrops Developer Spotlights and portfolio case studies (2025 and 2026), UX Tools, dev.to and WeAreDevelopers round-ups, Emma Bostian's developer-portfolios repo (1,968 entries), LinkedIn threads on copycat portfolios, plus direct fetches of the portfolios themselves. Several sites are heavy WebGL single-page apps that return almost no server-rendered text; for those the description relies on the Awwwards case page, the Codrops write-up, GitHub repo or the site's own metadata, and this is flagged. Anything that could not be verified is marked "not verified".

Note on Awwwards scoring, since it is cited repeatedly below: SOTD is Design 40%, Usability 30%, Creativity 20%, Content 10%. Every SOTD winner is then re-judged by a developer jury on six sub-criteria (Semantics/SEO, Animations/Transitions, Accessibility, WPO, Responsive, Markup/Meta-data); above 7.0 earns the Developer Award. Across almost every personal portfolio checked, Accessibility is the lowest sub-score (5.7 to 7.0) while Animations/Transitions is the highest (7.6 to 8.7). That gap is the single most exploitable opportunity for a portfolio that wants to read as "real engineer".

---

## Part A. Portfolio catalogue

Format per entry: URL, who, stack, hero, nav and transitions, projects, typography, palette, signature moment, what works, what does not.

### A1. Creative developers (animation and WebGL heavy)

#### 1. Bruno Simon, bruno-simon.com (2025 rebuild, SOTD Jan 21 2026, Site of the Month Feb 2026)

- Who: French creative developer, author of Three.js Journey.
- Stack: Three.js with TSL (Three.js Shading Language), WebGPU renderer with WebGL fallback, Rapier physics, Howler.js audio, Blender with Python scripting for world building, DRACO and KTX2 (ETC1S/UASTC) compression. Code on GitHub under MIT. Fonts: Amatic SC and Nunito.
- Hero: the whole site is a drivable 3D world. "Please drive around to learn more about me and discover the many secrets of this world."
- Nav: icon menu (map, settings, gamepad, achievements); keyboard, mouse, touch and gamepad input. No page transitions because there are no pages.
- Projects: discovered as objects inside the world; achievements unlock content and car skins.
- Signature: multiplayer layer (moderated "Whispers", global cookie counter, circuit leaderboard), live weather and seasons shared by all visitors, 3D UI instead of HTML overlays.
- Scores: SOTD 8.11 (highest of any portfolio surveyed), Dev 7.65, Accessibility 6.60, Markup 6.80.
- Works: the concept is the brand; performance discipline (instancing, frustum culling, looping terrain, quality presets on mobile) is documented in the Awwwards case study. Quote: "Performance is the real constraint on creativity".
- Does not work: inaccessible by nature, heavy first load, the "portfolio as game" idea is now copied so often that it reads as Bruno's idea whoever does it. Do not attempt a driving game.

#### 2. Antoine Wodniack, wodniack.dev (SOTD Dec 12 2024, Developer Award)

- Who: French creative developer, ex Waaark co-founder, 16 SOTD, coding "since 1987" framing.
- Stack: Astro (asset paths under /_astro/), GSAP, WebGL for the 3D gallery, Lenis-style smooth scroll. Single page.
- Hero: binary 1/0 texture motif, "Creative Developer" with star glyph, "Coding globally from France. Available for freelance work."
- Nav: About, Work, Contact anchors plus a "Change contrast" toggle (rare and good).
- Projects: 34+ items in a grid with ID codes like #3vva-0000/34, linking out to live sites; a timeline of desk setups (2006, 2016, 2020) and old portfolio screenshots 2011 to 2021 as an "about" device.
- Typography: mono-flavoured, retro computing. Palette: #f40c3f hot pink on #160000 near-black.
- Signature: intro animation, 3D image gallery, contact hover animation.
- Scores: SOTD 7.56, Creativity 7.96, Dev 7.58, Animations 8.40, Accessibility 6.20.
- Works: strong personal concept (retro computing autobiography) that is not a template; awards listed as data rather than bragging.
- Does not work: accessibility 6.2 despite the contrast toggle; single-page means no deep case studies.

#### 3. Francesco Michelini, francescomichelini.com (Folio23, SOTD Dec 19 2023, Developer Award) - Italian, Modena

- Who: independent creative developer "focusing on 3d / interaction / smooth animations", Awwwards jury 2026. Design by Unlearn Studio (Davide Baratta).
- Stack (from Codrops spotlight, Jan 2025): Nuxt 3, GSAP, Lenis, Three.js, TresJS, Astro on some projects, Storyblok CMS.
- Hero: minimal typographic statement plus location "Based in Modena (IT) / working remotely worldwide". Percentage preloader.
- Nav: Projects and Info; numbered footer nav (0 Home, 1 Projects, 2 Info).
- Projects: carousel of case pages with structured metadata (Year, Agency, Role, Awards).
- Palette: single accent #c4ff58 acid green on dark.
- Scores: SOTD 7.29, Dev 7.53, Animations 8.00, Accessibility 7.20 (one of the better ones).
- Works: clear role (developer who partners with designers), credits the designer, structured project metadata that is easy to scan.
- Does not work: percentage preloader is the 2019 to 2022 cliche; content is thin on process.

#### 4. Davide Perozzi, davideperozzi.com (SOTD Apr 28 2019; still widely referenced)

- Who: Italian-born creative developer in Karlsruhe. Design by Norman Dubois.
- Stack: Vue, WebGL, custom cursor, typography-first.
- Palette: #000, #D14836, #fff. Dev 7.08, Accessibility 5.67.
- Included only as a cautionary benchmark: 2019 vintage cursor and parallax patterns, low accessibility.

#### 5. Jesper Landberg, jesperlandberg.com

- Who: Swedish "design engineer", Awwwards Independent of the Year 2022 and 2024, 74 awards (30 Awwwards, 37 FWA, 3 Webby).
- Stack: not disclosed on the site; known GSAP power user, WebGL. Note that he self-labels as design engineer but the work is agency-grade creative development.
- Hero: typographic statement about "building visually rich, motion-driven websites", awards stated as plain text.
- Nav: Featured (7) and Full index views, newsletter, "Elsewhere" for socials.
- Projects: one-sentence descriptions, link to case pages. Restraint.
- Works: index-style project list with two density modes; credibility via numbers not adjectives.
- Does not work: little about him as a person; the site is a list.

#### 6. Grégory Lallé, gregorylalle.com (SOTD Oct 30 2024, Developer Award)

- Who: creative developer in Lyon; design by Thomas Monavon.
- Hero: name plus "Creative developer" only. Ten numbered projects (0 to 10) as anchor-linked gallery.
- Palette: single color #111111.
- Scores: SOTD 7.48, Dev 7.57, WPO 8.20, Animations 8.00, Accessibility 6.60.
- Signature: homepage loader reveal, works focus view, custom 404.
- Works: extreme restraint, one color, high WPO.
- Does not work: interchangeable with a dozen other minimal dark folios; accessibility.

#### 7. Gianluca Gradogna, gianlucagradogna.com (SOTD Jan 23 2025, Developer Award) - Italian, Florence

- Who: multidisciplinary designer (design, advertising, code, photography). Credits: Norman Gabriel.
- Hero: "Gianluca Gradogna, Multidisciplinary Designer", loading transition, horizontal layout with infinite scroll, "Please rotate your device" on mobile (a red flag).
- Palette: #0D0D0D and #FFFFFF.
- Scores: SOTD 7.4, Dev 7.44, Animations 7.80, WPO 7.80, Accessibility 6.80.
- Signature: hover image effects, clip animations, menu interaction, page transitions.
- Does not work: forcing device rotation is hostile; horizontal-only layouts fail on mobile.

#### 8. Pacôme Pertant, pacomepertant.com (SOTD Jun 9 2026, Developer Award) built by Louis Bocquet and Colin Demouge

- Who: motion and sound designer in Paris; developer credit to Louis Bocquet.
- Stack: Nuxt (/_nuxt/ assets), GSAP, Three.js.
- Hero: repeated "showreel • 2025 •" marquee text, entry gate "enter with sound / enter without sound".
- Palette: #0a0a0a and #fafafa.
- Scores: SOTD 7.76, Creativity 8.09, Dev 7.62, Animations 8.60, Accessibility 7.00, Markup 6.60.
- Works: sound as first-class with explicit opt-in gate.
- Does not work: marquee text hero and enter gates are recognisable 2020 to 2023 tropes; Markup 6.6 suggests div soup.

#### 9. Elliott Mangham, elliott.mangham.dev (SOTD Dec 2 2025, Developer Award)

- Who: UK WordPress developer positioning as "trusted right-hand for agencies".
- Stack: GSAP, vanilla JS, Vite (per Awwwards). Palette #121212 and #fff.
- Hero: long personal paragraph with emoji flags, "Available September 2026" availability indicator, discovery-call and cost-estimate CTAs, collapsible rates.
- Projects: 18+ case studies in a carousel with walkthrough video modals; "brands" logo wall; revenue metrics ("$1B+ Client Revenue").
- Scores: SOTD 7.24, Dev 7.4, WPO 8.20, Accessibility 7.00.
- Works: business clarity (availability, rates, booking) and video walkthroughs for work you cannot link.
- Does not work: percentage bars, metric inflation, emoji in headings, reads as a sales page more than a craft page.

#### 10. Studio Null, madebynull.com (SOTD May 2 2025) and NOTHIN', noth.in (SOTD Aug 10 2026, Webflow + WebGL + GSAP)

- Studio sites, included because personal portfolios now imitate them: audio enter gate, Prismic CMS, Spotify "Radio" section, 3D rendered objects, hero shaders with mouse interaction, 01/14 pagination.
- NOTHIN' scores: SOTD 7.45, Dev 7.24, Accessibility 6.80, Semantics 6.80. Webflow plus WebGL is now award-viable, which lowers the bar for "creative developer" claims.

#### 11. Luis Bizarro, bizar.ro

- Who: Brazilian creative technologist (Apple, Active Theory), 9 SOTD, Independent of the Year 2021. Design by Kacper.
- Stack: WebGPU, WebGL, shaders, TypeScript stated in the bio.
- Projects: grouped by affiliation (Apple, Active Theory, Personal) with one-paragraph "what I built" summaries, for example Xbox Museum "main museum selector scene, 3D screens animations and states, user progress tracking".
- Works: the best template for describing contribution on team projects without owning the visuals. Typography experiments published on Instagram as a lab.

#### 12. Aristide Benoist, aristidebenoist.com

- Current site is a near-empty "Aristide Benoist, Independent developer, 0 0 1" WebGL page; v1 (2017, SOTD) was Three.js with design by Ben Mingo. Included for the pattern of crediting the designer and 3D artist explicitly.

#### 13. Simone Andreotti, simone-dev.com - Italian (Lotrek)

- Who: frontend and creative developer, Three.js, Astro, Vue, GSAP, GLSL.
- Hero: rotating messages that change on return visits; spiral card navigation for Lab, Work, Stack.
- Projects: cards with video previews; the "2025 Website" has "a standard version, an open world exploration and a full VR world". Minigame with graphics settings and procedural map.
- Works: Lab first, explicit claim "rooted in best performance, semantic HTML, accessibility".
- Does not work: too many socials (nine), spiral nav is a novelty that hides content.

#### 14. Martin Laxenaire, martin-laxenaire.fr (Codrops write-up Oct 2025)

- Who: French creative developer, author of gpu-curtains.
- Stack: Nuxt 3, Sanity, GSAP, WebGPU via gpu-curtains, TypeScript.
- Concept: gamified portfolio where WebGPU scenes unlock content; each scene bound to real data (GitHub stats, invoice totals, video metadata). Gamification is disabled for prefers-reduced-motion users. Real-time FPS monitor drives a quality manager.
- Quote worth keeping: detailed case study pages "often become outdated when projects go offline or cannot be publicly shared".

#### 15. Thibault Guignand, thibaultguignand.com (Codrops write-up May 2026)

- Stack: Vite, React 18, TypeScript, GSAP (SplitText, ScrollTrigger), OGL instead of Three.js, Lenis, SCSS BEM, i18n FR/EN.
- Techniques: a single GSAP-tweened progress value pushed to shader uniforms; clip-path text wipes layered on character scramble; ScrollTrigger scrub: 1 driving scale, inset clip-path and an SVG progress ring; GSAP timelines coordinated with the View Transitions API; direct DOM mutation instead of React state at 120 Hz; idle guard suspends the render loop.
- Reduced motion is "treated as a parallel design" not a kill switch. This is the current best practice sentence.

#### 16. Stas Bondar, stabondar.com (Codrops 2025 standout redesign, Nominee Independent of the Year 2025)

- Front-end developer, Awwwards jury, Webflow plus GSAP. Hero repeats "Front-End Developer" rhythmically, personal story from pro athletics, "Unavailable for Freelance Projects" stated openly, awards list 2021 to 2026.
- Works: honesty about availability, personality copy. Does not work: repeated-word hero is a marquee variant.

#### 17. Rogier de Boevé, rogierdeboeve.com (Codrops spotlight May 2025)

- Belgian creative developer and visual artist. Astro, Three.js, GSAP, Theatre.js for timeline motion. Full creative control design through dev. Quote: "it's not about how fancy the code is or whether you're using the latest framework".

### A2. Design engineers (product and interaction craft, typographic, fast)

#### 18. Rauno Freiberg, rauno.me

- Who: Estonian interaction designer, Vercel, Devouring Details.
- Stack: Next.js (Vercel), custom.
- Hero: mantra list "Make it fast. Make it beautiful. Make it consistent. Make it carefully. Make it timeless. Make it soulful. Make it."
- Nav: Craft, Projects, Field Notes, History of Software Design, archived years 2022 and 2023 linked (archives kept live).
- Craft page: reverse-chronological single column of thumbnails and videos of interaction experiments (sliders, menus, inputs, SwiftUI, shaders, Next.js poster), each with "View production" or "Read essay".
- Works: the "craft" page is the canonical design-engineer format, videos of details instead of case-study prose; keeping old versions online as history.
- Does not work: almost nothing to look at above the fold if you do not already know who he is.

#### 19. Paco Coursey, paco.me

- Who: design engineer, Linear (previously Vercel).
- Sections: Building, Projects (cmdk, Writer, next-themes with GitHub links), Writing, Now, Connect. Markdown-like hierarchy, 2025 footer. Copy: "Everything around me is someone's life work".
- Works: open-source projects as the portfolio; quiet confidence.

#### 20. Emil Kowalski, emilkowal.ski

- Who: design engineer, Linear (ex Vercel), author of animations.dev.
- Sections: Projects (Sonner, Vaul, animations.dev, aiforui.dev), Writing (10 essays on taste, friction, animation), newsletter.
- His own published animation rules (emilkowal.ski/ui/great-animations): animate only transform and opacity, ease-out for interactions, under 300 ms, interruptible, do not animate repeated actions, respect prefers-reduced-motion with opacity-only alternatives, spring for natural motion.
- Works: writing as proof of taste; components with real adoption.

#### 21. Jhey Tompkins, jhey.dev

- Who: design engineer, Shopify (ex Google, Vercel). Tagline "Making your ideas click".
- Site is a hub: live widgets (location and weather via weatherapi.com, Spotify now playing, Steam), CodePen and YouTube links, GitHub AMA. The Craft of UI course.
- Works: live data widgets signal "I ship and I play". Does not work: the portfolio itself is thin; the real work lives on CodePen.

#### 22. Yann-Edern Gillet, yannglt.com

- Who: software designer at Linear, Paris. Headline "Crafting interfaces, products, and systems".
- Nav: Now, Writing, About; footer Index, Moodboard, Track Record, Changelog. Monospace identifier strings, "High Voltage" motif, Pokémon references.
- Essay "The Rosetta Stone of Design Engineering" is directly about the hybrid story. Frames itself as "a non-portfolio-only digital place".
- Works: Changelog and Moodboard pages, work grouped as "xp" explorations vs "li" Linear projects.

#### 23. Hayden Bleasel, haydenbleasel.com

- Australian software engineer and product designer at OpenAI. The whole home page is an age/year timeline 1993 to 2026 with inline links to launches and acquisitions. Nav About, Writing, Speaking, Press.
- Works: a single strong information architecture idea replaces the standard hero.

#### 24. Pedro Duarte, ped.ro

- Raycast, Radix creator. "Yo! I'm Pedro Duarte." Sections Writing, Speaking, Shooting. Conversational, credibility via numbers (Radix 20M monthly downloads).

#### 25. Brittany Chiang, brittanychiang.com

- Frontend engineer at Klaviyo. "I build accessible, pixel-perfect experiences for the web." Next.js, Tailwind, Inter, Vercel, colophon "Designed in Figma, coded in VS Code". Skip-to-content link, spotlight cursor glow on desktop, Tardis GIF "time travel" to old versions.
- Works: accessibility as a stated brand, colophon. Does not work: cloned thousands of times (GitHub template), so the layout itself is now generic.

#### 26. Josh W. Comeau, joshwcomeau.com

- Educator. Sound toggle, dark mode, whimsical details, categories CSS/React/Animation. Included for the sound-toggle pattern and for how writing becomes the portfolio.

#### 27. Michele Mazzucco, michelemazzucco.it - Italian, Dolomites

- Generalist design engineer, 10+ years B2B SaaS. Next.js. Six numbered philosophy cards ("Quality creates gravity. Craft is strategic."), Work (Portchain, Beefree, Incode) and Side projects, personal photography, "Made in the dolomites".
- Works: the clearest Italian example of the design-plus-engineering narrative for product work.

#### 28. Federico Pian, federicopian.com - Italian, Udine (Overpx co-founder)

- "Ciao, I'm Fede!" with live CEST clock. Vercel image optimisation. Eight projects 2020 to 2025 with agency, year, tagline and Visit link; 0% progress indicator and "scroll/swipe to discover" horizontal project navigation.
- Does not work: horizontal-only discovery and percentage indicator again.

#### 29. Gionatan Nese, gionatannese.com (Developer HM Aug 4 2026, CSSDA UI/UX/Innovation Sep 2 2026) - Italian, Milan

- Multi-disciplinary designer. GSAP, Three.js, WebGL, sound, infinite scroll, black and white. "Selected Work" (4) plus "Explorations" (7, including a Ferrari 330 P4 digital tribute). Copy: "bold ideas into ambitious cool Stuff™ that actually stick". Community score 8.67 on 15 votes.
- Works: separating Work from Explorations; Italian and current.

#### 30. Other Italians checked

- Fabio Ottaviani (Supah), supah.it: creative developer at studiogusto (Perugia), 11 Awwwards, 11 FWA; site is a WebGL canvas with no server text; portfolio of experiments lives on CodePen (Supah DailyUI). Model for "CodePen as lab".
- Niccolò Miranda, niccolomiranda.com: Italian in Amsterdam, hedgehog mascot, horizontal drag work carousel, testimonial quote "Blurring the line between design & dev"; SOTD for both his 2018 folio and "Paper Portfolio" (7.92). His Awwwards Academy course is literally "Creative Portfolios".
- Davide Baratta, davidebaratta.com (SOTD Nov 18 2024): designer, Unlearn Studio; built by Francesco Michelini with Astro, Storyblok, Cloudflare, Lenis, PiecesJs, GSAP, Taxi.js, Nanostores, PixiJS. Dev 7.49, Accessibility 7.40, WPO 8.20. Black and white, drag projects navigation.
- Luca Volino, lucavolino.com (Nominee Oct 2025): UX/UI designer, GSAP, Barba.js, WebGL, #141414; sections Work, About, Lab, Contact with a "Design Lab" of side tools.
- dverso studio (Milan, caffe.design SOTD Jun 18 2025): immersive 3D studio, sets the local bar for WebGL.
- No notable Turin-based design engineer portfolio surfaced in any gallery or award feed. That is a positioning gap, not a problem.

### A3. Reference points and cautionary cases

- Dennis Snellenberg, dennissnellenberg.com: the most copied portfolio of the decade (rounded slide-in menu, magnetic buttons, sticky curved footer, image-follow project list, "Hello / Ciao / Hola" word preloader, Lenis smooth scroll, Framer Motion). He built copydennis.com (HM Dec 29 2022, #1C1D20 and #FFD600) to catalogue the clones. The GitHub reconstruction lists Next.js, Framer Motion, GSAP, Lenis, Styled Components, Tailwind. Awwwards judge Marten Kuipers' 2024 thread: judges now recognise these patterns instantly and penalise them.
- Cassie Evans, cassie.codes: former poster child of SVG and GSAP portfolios; in 2026 the site is a farewell page ("It was a joy to maintain a personal site") after her entire site was cloned for invoice scams (cassieevancs.com, May 2025). Two lessons: playful SVG hero animation remains loved, and a portfolio can be stolen wholesale.
- Henry Heffernan, henryheffernan.com: 3D computer that boots a 2D OS (React, Three.js; 2.3k GitHub stars). Now a genre ("portfolio as OS"; see also os.ryo.lu "ryOS" and dustinbrett.com).
- Lynn Fisher, lynnandtonic.com: "v. XIX", annual redesigns with a responsive-illustration gimmick each year, archive kept. Pattern: version numbering and archives as proof of longevity.
- Robb Owen, robbowen.digital: "ambitious yet accessible web projects", skip link, Welsh footer "Gwneud yn Ne Cymru", SynthWave '84 downloads as metric. Pattern: accessibility as positioning plus open-source metrics.
- Louis Paquet, louispaquet.com (Independent of the Year 2025): Montréal creative director, 50+ SOTD, projects as a plain link list, courses section. Even the top independent presents work as a list.
- Sean Halpin, seanhalpin.xyz: illustrated product designer folio, cloned as often as Brittany Chiang's; cartoon avatar heroes now read as 2019.
- Matt Farley, mattfarley.ca: Bulma, "I design and code beautifully simple things"; honest but visually evergreen-generic.
- Artiom Yakushev, art-yakushev.com (SOTD Dec 27 2025, Webflow) and Olha Lazarieva (SOTD Oct 2 2025): designer folios with Webflow. Webflow and Framer folios now win SOTD regularly, so tooling alone no longer signals engineering.
- Names in the brief that have no current standalone portfolio worth citing: Kevin Pinney (domain dead), Franck Cinquin (not found), Yuri Artiukh (work on CodePen, YouTube and riverco.de), Gianmarco Simone (pmndrs, X only), Nicolas Errico (not found), Adrian Kuleszo (agency site designme.agency), Kuon Yagi (kuon.space, a one-page "Lunam Et Stellas" card, no work), Tim Rodenbröker (creative-coding educator site, list-based), Sarah Drasner (redirects to thefivefortyfive.com). Lee Robinson (leerob.com) is now a pure writing site.

---

## Part B. Synthesis

### B1. Recurring patterns that work in top-tier developer portfolios

Hero types, ranked by how often they appear among 2024 to 2026 winners and design-engineer favourites:

1. Typographic statement plus location plus availability (Michelini, Lallé, Landberg, Wodniack). One line of what you do, one of where, one of status. The location line is a differentiator for a Turin developer; Michelini's "Based in Modena (IT) / working remotely worldwide" is the exact formula.
2. Mantra or manifesto list (Rauno's "Make it fast..."; Mazzucco's six principles). Signals values, not services.
3. Single structural idea replacing a hero (Bleasel's age timeline, Wodniack's binary autobiography, Bruno's world). Concept-first beats decoration-first.
4. Live data or state (Jhey's weather and Spotify, Pian's live clock, Simone Andreotti's return-visit messages, Bruno's shared weather). Proves the site is alive and coded, not exported.
5. WebGL or shader hero with mouse interaction (NOTHIN', Pertant, Nese). Still wins, but only when the shader is specific to the concept.

Navigation:

- Three to four items max (Work, About, Contact, plus Lab or Writing). Numbered items (00, 01, 02) appear on Michelini, Lallé, Wodniack.
- Two density modes for the work list (Landberg's Featured vs Full; Grellier's "See my projects" vs "Quick overview").
- Footer as a second nav with socials, email in plain text, and a colophon (Chiang) or credits to designer and type foundry (Michelini, Baratta, Perozzi).

Page transitions:

- 2024 to 2025: GSAP timelines with Barba.js or Taxi.js (Volino, Baratta) or Nuxt page hooks.
- 2026: View Transitions API coordinated with GSAP (Guignand), cross-document view transitions now baseline across browsers (Interop 2026). List-to-detail morph (project card into project page) is the canonical use.

Project presentation:

- Structured metadata line: Year, Client/Agency, Role, Stack, Awards (Michelini, Landberg, Saggiomo's "01 to 05 / role / year").
- Contribution paragraph for team work: "what I built" (Bizarro).
- Video walkthroughs and thumbnails of details rather than full case studies (Rauno's Craft, Mangham's modals).
- Separate "Selected Work" from "Explorations" or "Lab" (Nese, Volino, Andreotti, Rauno).
- Live link plus archived screenshot; Laxenaire's warning that client sites die is real.

About page storytelling:

- Timeline (Bleasel by age; Wodniack by desk photos; Chiang by role).
- Principles cards (Mazzucco) or a short manifesto (Yann Gillet).
- Photography of place (Mazzucco's Dolomites). Place is identity; Turin can be used the same way.
- Honest status lines: "Available September 2026", "Unavailable for Freelance Projects".

Contact and footer: plain email visible, copy-to-clipboard with "Copied" state (Rauno), one CTA, timezone. Curved sticky footers and giant "Let's work together" marquees are the Snellenberg tell.

Loaders: still present on most SOTD winners (Michelini, Gradogna, Lallé, Pertant, Pian) but the percentage counter is now the most recognised cliche. Acceptable 2026 forms: a sub-second reveal tied to a real asset load, or none. Bruno and Laxenaire justify loaders with actual GPU assets; a typographic site cannot.

Cursors: custom cursors appear on almost none of the design-engineer sites and on fewer 2025 to 2026 winners than 2023 ones. Where present they are contextual (label on hover over a project) not decorative dots.

Scroll: Lenis is near-universal on the creative side; design engineers do not smooth scroll. Scroll-driven CSS animations replace ScrollTrigger for simple reveals in 2026. Horizontal-only scroll (Gradogna, Pian, Miranda) recurs and is the most complained-about pattern on mobile.

Typography: one display face with personality plus one text face, or a single variable family. Mono is used for metadata, IDs, timestamps (Wodniack, Yann Gillet). Design engineers default to Inter, Geist or system stacks; that reads as product, not as design-degree. Named fonts were rarely retrievable, which itself is a finding: the best sites serve self-hosted woff2 with obfuscated names.

Palette: black plus white plus one accent dominates winners (#c4ff58 Michelini, #f40c3f Wodniack, #D14836 Perozzi and Benoist, #FFD600 copydennis). Pure black/white with no accent (Lallé, Baratta, Nese, Gradogna) is the safe award look and is starting to feel like a uniform. A confident, unusual accent is a cheap way to be memorable.

Sound: opt-in only, with explicit gate or toggle (Pertant, Studio Null, Comeau). Never autoplay.

3D and shaders: dominant in 2025 (Codrops year review: Three.js, R3F, TSL, WebGPU everywhere). Winning usage is either total (Bruno) or a single meaningful object or hero shader (Nese, NOTHIN'). Decorative floating blobs are the losing usage.

Playground or Lab: the strongest single trend. UX Tools' "The portfolio is becoming a playground" (2025): hiring managers spend about 55 seconds, click rather than read, and respond to touchable proof of work. Rauno's Craft, Emil's components, Jhey's CodePen, Volino's Design Lab, Andreotti's Lab, Nese's Explorations.

Writing: every design-engineer site has it (Rauno Field Notes, Emil, Paco, Yann, Comeau, Chiang's four posts). Creative developers rarely do, so a creative developer who writes technically stands out.

### B2. Anti-patterns and cliches that now read as dated or generic

Be blunt about these; award judges are (Kuipers 2024 thread, copydennis.com):

1. The Snellenberg kit: rounded slide-in mobile menu with curved edge, magnetic buttons, "Hello Ciao Hola" word preloader, project list where an image follows the cursor, curved sticky footer with a giant "Let's work together", Lenis plus Framer Motion. Judges call it out on sight. copydennis.com exists to shame it.
2. Percentage preloader counters and progress bars on sites that load 400 KB of text.
3. Dot custom cursor that grows on hover, blend-mode difference cursor, cursor trails.
4. Repeated-word marquee heroes ("showreel • 2025 •", "Front-End Developer Front-End Developer") and infinite marquees of client logos or skills.
5. "Hi, I'm X 👋" heroes, emoji flags in headings, "passionate about creating iconic digital experiences", "pixel-perfect", "bringing ideas to life".
6. Cartoon avatar or Memoji hero (Halpin lineage).
7. Skill bars, percentage skill charts, tech logo grids, GitHub streak widgets.
8. Glassmorphism cards, neon gradient blobs, grainy noise overlays as the only texture, purple-to-blue gradients.
9. Portfolio as OS or as driving game or as ramen shop: any full metaphor already done by Heffernan, Bruno, Jesse Zhou.
10. Horizontal-only project scroll with "scroll or swipe to discover", and "Please rotate your device".
11. Enter gates with sound on sites that do not need sound.
12. Award badges and metric inflation ("$326B combined market cap") above the work.
13. Dark mode as the only mode with #000 and #fff and no accent: the 2024 to 2026 award uniform.
14. Text scramble and split-character reveals on every heading; SplitText everywhere now that GSAP is free.
15. Section headers "Selected Works", "About Me", "Get in touch" set in 8vw uppercase with tight tracking.
16. Framer or Webflow template tells (framer.website subdomains, Webflow badge) on a site claiming engineering.
17. Nine social icons.
18. Testimonial carousels with stock-looking avatars.
19. "Scroll" indicator with bouncing chevron; letterspaced "S c r o l l".
20. Glitch text on hover (Kulbachny 2019 era).

### B3. What signals "real engineer, not template user" to another developer

Ranked by how quickly a peer notices:

1. Speed. Instant first paint, no loader, no layout shift. Lallé, Baratta and Wodniack score WPO 7.8 to 8.2 while animating heavily. Design-engineer sites feel instant.
2. Reduced motion handled as a parallel design (Guignand), not display:none on animations. Laxenaire disables gamification under prefers-reduced-motion. Emil's rule: opacity-only fallbacks. Almost no award winner does this well; Accessibility sub-scores of 5.7 to 7.0 prove it.
3. Keyboard and screen-reader sanity: skip link (Chiang, Owen), focus states that match the hover design, semantic headings, real buttons. Wodniack's contrast toggle.
4. View source quality: readable class names or a design-token layer, self-hosted fonts, no 2 MB bundle for a text site, native features (View Transitions, scroll-timeline, :has, container queries, anchor positioning) used where they replace libraries.
5. A visible colophon or "how this site is built" note listing stack, type, and hosting (Chiang, Mazzucco implicitly, Baratta's Awwwards credits). Even better: a public repo (Bruno, Heffernan, davidhckh).
6. Technical writing about the site itself: Codrops-style breakdowns (Guignand, Laxenaire, Bruno's case study) are the most convincing artifacts found in this research. One article on how the portfolio's transitions work is worth more than three case studies.
7. Details that cost effort: "Copied" state on email, live timezone, changelog page (Yann Gillet), version number and archived years (Fisher, Rauno), custom 404 that is designed, print stylesheet, real OG images per page.
8. Correct mobile behaviour of heavy effects: quality presets, idle guards that stop the render loop, texture swapping instead of remounts (Bruno, Guignand).
9. Open-source components with adoption numbers (Emil, Paco, Pedro Duarte, Owen).
10. Honesty: credits to the designer when there was one (Michelini, Perozzi, Benoist), clear role statements on team projects (Bizarro).

### B4. How top portfolios handle the design plus engineering hybrid story

- Name it once and prove it everywhere. Rauno and Emil never say "hybrid"; the Craft page and the components do it. Yann Gillet writes an essay on design engineering as translation ("where design and engineering meet, overlap, and translate meaning"). Mazzucco says "generalist design engineer" and then shows principles, product work and photography.
- Show the two skills in one artifact: an interaction video where the design intent and the implementation detail are both visible (Rauno's sliders and menus). Andreotti's cards show video previews of the code running.
- Split the archive by mode: Work (shipped, client) vs Explorations or Lab (design-led experiments, shaders, type). Nese, Volino, Rauno all do this; it lets a visitor judge taste and engineering separately.
- Credit lines make the hybrid legible: "Design and development by me" on the portfolio itself, and "Design by X, development by me" on client work. Michelini credits Unlearn Studio for his own site's design; the reverse (a developer who also designed the folio) is a stronger hybrid signal if the design is actually good.
- Use the design degree in the typography and layout decisions, then explain one of them in writing. A short "Typography notes" or colophon on face choices and grid signals both halves.
- Testimonials that speak to the hybrid ("Blurring the line between design & dev, Niccolo has an unmatched eye for detail") are more useful than metrics.
- Design engineers publish taste as writing (Emil "taste", "friction as feature"). A design-degree developer can write about type, motion curves, or colour systems from a practitioner's view.

### B5. Handling client work under NDA or not publicly viewable

What the surveyed portfolios and guides (IxDF, UX Playbook 2026, DESK/vanschneider, Wonderlist) actually do:

1. Logo plus confidentiality note: client logo linking to a short note that the project is under NDA (Noemie le Coz with Apple, per DESK).
2. Role description without visuals: "what I built" paragraphs (Bizarro's Xbox Museum) covering scope, stack, and your specific contribution.
3. Abstracted visuals: recreate the interaction pattern with dummy content and neutral branding; blur or replace text; show design-system pieces (tokens, components, motion specs) rather than screens. Present as "recreated for portfolio, not client assets".
4. Process storytelling: wireframes, motion studies, prototypes, before/after performance numbers, a timeline of decisions. Generalise metrics ("significant improvement in completion rate").
5. Video walkthroughs on request (Mangham's modals) or password-protected case pages with client consent.
6. Archive your own screenshots and recordings the day a project ships; Laxenaire notes client sites die and case pages rot.
7. Fill the gap with Lab work that demonstrates the same technique the NDA project used, and link the two ("this reveal pattern was built for a client project in fintech; here it is rebuilt with public data").
8. Say the word NDA plainly; hiding it looks like you have no work. Client list as text ("Selected clients") is acceptable without visuals.
9. Get written permission early; make it a contract conversation at kickoff.

### B6. Trends 2025 to 2026 versus 2022 to 2023

2022 to 2023 (Snellenberg era):

- Next.js or Nuxt plus GSAP plus Lenis plus Framer Motion; Barba.js or Taxi.js for transitions.
- Preloaders with percentages or greeting words; dot cursors; marquees; magnetic buttons; curved footers.
- Full-screen project image lists, image-follows-cursor, parallax.
- Black on cream or #1C1D20 with one warm accent.
- Custom smooth scroll on everything, horizontal galleries.
- Three.js as decoration (floating shapes, distortion on hover).
- Case studies as long pages with device mockups.

2025 to 2026:

- WebGPU and TSL become mainstream (Bruno, Laxenaire, Bizarro; Interop 2026 baseline). Lightweight WebGL libraries (OGL, gpu-curtains) instead of full Three.js for 2D shader effects.
- GSAP fully free (2025) so SplitText and MorphSVG are everywhere; the differentiator is restraint and purpose, not the plugin.
- Native platform features replace libraries: View Transitions API for page morphs, CSS scroll-driven animations, anchor positioning, popover. Guignand coordinates GSAP with View Transitions.
- Astro rises for portfolio sites (Wodniack, Baratta, de Boevé, Andreotti, Farley) alongside Nuxt 3 and Vite plus vanilla or Vue. Next.js remains the design-engineer default.
- Playground and Lab sections outrank case studies; UX Tools frames it as proof-of-work you can touch.
- Live and shared state: multiplayer traces, live clocks, now-playing, weather, return-visit awareness.
- Sound as opt-in layer with real design (spatialised audio, CC0 tracks).
- Business transparency: availability dates, rates, booking links, "unavailable" notices.
- Reduced motion and quality presets discussed openly in write-ups; still weak in jury scores, which is the opportunity.
- Aesthetics: pure black and white minimalism becomes the award uniform; typography as brand (variable fonts, weight animation, mixed-weight hierarchies); tactile texture and retro-computing motifs (Wodniack); playful 3D objects (NOTHIN'); AI-generated video backgrounds start appearing (NOTHIN' "IA video background") and will date fast.
- Webflow and Framer sites win SOTD and even Developer Awards, so the "creative developer" label needs proof beyond the tool.
- Portfolios get cloned wholesale for scams (Cassie Evans); some veterans shut sites down. Signing your work (colophon, repo, writing) is also provenance.
- Italian scene: Michelini (Modena), Baratta and Unlearn (Brescia/London), Gradogna (Florence), Nese (Milan), dverso (Milan), Pian (Udine), Mazzucco (Dolomites), Andreotti (Lotrek). Nobody visible from Turin.

---

## Part C. Shortlist to open in a browser

1. rauno.me and rauno.me/craft (design-engineer canon; craft page format)
2. bruno-simon.com (ceiling of 3D portfolios; read the Awwwards case study too)
3. wodniack.dev (personal concept done with restraint, Astro, contrast toggle)
4. francescomichelini.com (Italian creative developer benchmark, Nuxt 3 and GSAP)
5. thibaultguignand.com (2026 GSAP plus View Transitions plus OGL, reduced motion as parallel design)
6. gionatannese.com (2026 Italian, Work vs Explorations split, WebGL and sound)
7. emilkowal.ski (typographic design engineer, writing as portfolio, animation rules)
8. yannglt.com (design engineering essay, changelog and moodboard pages)
9. michelemazzucco.it (Italian generalist design engineer narrative)
10. martin-laxenaire.fr (gamified WebGPU with reduced-motion fallback)
11. jesperlandberg.com (index-style work list, two density modes)
12. dennissnellenberg.com and copydennis.com (to recognise and avoid the kit)

## Part D. Implications for a Turin design-engineer portfolio (short)

- Lead with a typographic hero carrying one real idea, plus "Turin, Italy" and availability. Add one live element (time in Turin, current weather, or what you are building).
- Make the Lab or Craft section as prominent as Work; ship 6 to 10 short interaction pieces with video previews and source.
- Use a bold accent no other winner uses (avoid acid green, hot red, yellow on charcoal) and a display face with character; put type and grid decisions in a colophon.
- Page transitions with the View Transitions API orchestrated by GSAP; scroll-driven CSS for reveals; Lenis only if it earns its weight.
- No percentage loader, no dot cursor, no marquee, no curved footer, no rotate-your-device.
- Reduced motion as a parallel design; keyboard and screen-reader paths tested; target the Accessibility sub-score that every winner fails.
- One technical article on how the site is built, one public repo or colophon, an archive of past versions.
- For NDA work: role paragraphs, abstracted recreations, process artifacts, and Lab pieces that echo the technique.

Sources consulted (main): awwwards.com/websites/winner_category_portfolio, awwwards.com/websites/developer, individual Awwwards SOTD pages for Wodniack, Michelini, Gradogna, Lallé, Pertant, Mangham, Bruno's Portfolio, Baratta 24, Perozzi, Benoist, Kulbachny, Miranda, Nese, NOTHIN', Volino, copydennis; awwwards.com/brunos-portfolio-case-study.html; tympanus.net Codrops Developer Spotlights (Michelini Jan 2025, de Boevé May 2025), "Self Doubt and the Quest for Fun" (Laxenaire, Oct 2025), "From Shader Uniforms to Clip-Path Wipes" (Guignand, May 2026), "2025: A Very Special Year in Review"; uxtools.co "The portfolio is becoming a playground"; thecrit.co design trends 2026; muz.li top 100 portfolios 2026; minimal.gallery, dark.design, siteinspire, cssdesignawards portfolio galleries; ui.land Rauno interview; emilkowal.ski/ui/great-animations; vanschneider.com and uxplaybook.org NDA guides; github.com/emmabostian/developer-portfolios; LinkedIn threads by Dennis Snellenberg, Marten Kuipers and Cassie Evans; wearedevelopers.com and dev.to portfolio round-ups; direct fetches of every portfolio URL listed above.
