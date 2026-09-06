# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js 16.3 App Router with React 19, TypeScript, Tailwind CSS 4 plus CSS Modules, GSAP 3.15, Lenis, Tempus, OGL for one WebGL surface, MDX typed with Content Collections, Vitest and Playwright, Lighthouse CI. Chosen because it is Edoardo's daily stack (the site must also show what he works with) and because darkroom.engineering's Satus proves it at award level. Deploy target: Cloudflare Workers via OpenNext, Vercel as fallback, decided before launch. Rationale in docs/research/03-stack.md.

## Users

Primary: engineering and design leads at international product companies, and senior engineers they ask to look at a candidate. Situation: they open the site from a CV, a LinkedIn profile or a GitHub README, usually on a laptop, sometimes on a phone from a chat, and decide in under a minute whether to read further. Job: judge visual craft first, positioning second, then read one case study for ownership, decisions and outcome, then check the Lab and the colophon for engineering depth.

Secondary: technical recruiters who keyword-scan for stack, seniority and location; other developers who arrive from social links and want to see how it is built.

## Product Purpose

A personal site that presents Edoardo Baravaglio as a person and proves, in the site itself and in curated work, that he designs interfaces and builds whole products end to end. It exists because the CV cannot show craft, and because his current GitHub shows little of the client work that lives in private repositories. Success: a senior engineer leaves intrigued and convinced he is a design engineer, not a template user; an Italian or international product team writes to him.

## Positioning

A frontend developer who ships whole products: frontend, backend, database, deployment, SEO, maintenance. Partner at Redergo since 2025, still writing code every day. He came to it from design (IAAD, Digital Communication Design) and stopped handing off in 2021, and the training shows in the work rather than in the title. What a neighbouring portfolio cannot truthfully copy: shipped products with real volume (Refattura, 12,000+ documents), a public Figma community plugin that translates between design and code, and a site whose type and concept are its own.

## Operating Context

The site is read alongside a CV generated from a YAML master (private repo cv-generator) whose truth rules apply here too: nothing invented, backend "chewed, not boasted", web3 means wallet integration and on-chain traceability on Solana and not smart contract authoring, Figma is not a differentiator. Client work is often under NDA; one case study (the Formula 1 supplier traceability platform) is shown with recreated mockups and sector-only naming. Edoardo runs his development through spec-driven agentic workflows with Claude Code; the site is built the same way and the repository is public.

## Capabilities and Constraints

- English only, international market. No Italian pages.
- Routes: home, work index, five case studies (Refattura, traceability for an F1 supplier, HTML to Figma plugin, Redergo Sales, Envergo), Lab with dated live pieces, about, colophon, designed 404. Writing and Now were cut on 2026-09-06: neither had enough behind it to earn a page, and an empty index says more about the site than no index does.
- LoL Brain, a personal side project, must never be mentioned on the site or in this repository.
- Facts that still need Edoardo's confirmation before publish: NDA scope for traceability, his role on each archive site (lampante.ai, boerotrucks.com, atavola.pro, rekupero.it, thefootballroyale.com), Figma plugin install count and source visibility, depth allowed for Redergo Sales and Redergo Hub, availability wording, domain and hosting.
- Numbers allowed today: Refattura 12,000+ documents; athenaonoranzefunebri.com 100 in all four Lighthouse categories; Redergo is a ten-person team; partner since early 2025; at Redergo since 2020, developer since 2021.
- Terminology: "case study" for the five deep pages, "Lab" for live pieces, "Colophon" for how the site is built.

## Brand Commitments

- Name: Edoardo Baravaglio, full name everywhere; "EB" only as favicon and monogram.
- Voice: first person, present tense, maker verbs, specific, plain English, no buzzwords, no "AI" in self-description, no em-dashes anywhere.
- Binding visual constraint volunteered by the user: follow the Awwwards creative-developer register; direction D "Specimen in the Field" approved on 2026-09-03 and recorded in DESIGN.md and docs/superpowers/specs/2026-09-03-portfolio-design.md.
- Contact: edo.baravaglio@gmail.com (also in the GitHub profile README). GitHub: github.com/edoraba. LinkedIn: linkedin.com/in/edoardo-baravaglio.

## Evidence on Hand

- CV master (private repo edoraba/cv-generator): experience bullets, projects with problem and outcome notes, skills, education. The only source for facts and numbers.
- Public GitHub profile README with the current stack and "how I work" paragraph.
- Live sites: refattura.it, athenaonoranzefunebri.com, lampante.ai, boerotrucks.com, atavola.pro, rekupero.it, thefootballroyale.com, dynamic-bg.avrean.net, envergo.redergo.net/docs, the HTML to Figma plugin on the Figma community.
- Research reports in docs/research (portfolios, reference sites, stack, content strategy) and the Italian synthesis with recorded decisions.
- Absent, do not fabricate: testimonials, client logos with permission, photography of Edoardo, install counts, metrics beyond the two numbers above, awards.

## Product Principles

1. The site is the first work sample: typography, spacing and motion are judged before a word is read, so craft in the site outranks quantity of content.
2. Prove, do not claim: the engineering shows in the Lab, the colophon, the public repo and the performance numbers, and the training shows in the type system and the concept without being announced; the words "hybrid" and "designer who codes" never appear.
3. Accessibility and performance are features of the design, not constraints on it: reduced motion is a parallel design, Lighthouse 100 on mobile is a launch gate, the WebGL field always has a finished fallback.
4. Honest ownership: every project states role, team and what is confidential; unknown facts stay marked until Edoardo confirms them.
5. One idea per surface: the headline as a window onto the field on home, decisions as the content of case studies, touchable proof in the Lab.

## Accessibility & Inclusion

WCAG 2.2 AA across both themes, AAA target for body text. Full keyboard operation including the command menu and the theme and motion toggles. Screen reader path for the masked hero through a visually hidden h1. Reduced motion respected at OS level and through a visible toggle. Zero axe violations on every route is a launch gate.
