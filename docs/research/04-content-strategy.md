# 04. Content Strategy Research: Portfolio for Edoardo (Frontend Developer / Design Engineer, Turin)

Date: 2026-09-03
Scope: information architecture, case study structure, tone and copy, lab/craft pattern, personal touches, trust signals. Ends with concrete recommendations for this specific person: sitemap, project selection, case study template, home page beats, copy principles, hero statements.

Method: 46 web searches and page fetches. Sites studied directly: rauno.me (home, craft, projects), emilkowal.ski, paco.me, leerob.com, brittanychiang.com, delba.dev, jesperlandberg.com, robbowen.digital, joshwcomeau.com, cassie.codes, devouringdetails.com, maggieappleton.com/colophon, uses.tech, nownownow.com. Articles from hiring managers and portfolio reviewers: Open Doors Careers (two posts), GreatFrontend 2026 guide, Hakia 2026 guide, Keming (design hiring manager), Elliot Dahl, Toptal, IxDF and UX Playbook on NDA work, TechInterview.org on "built with AI" in 2026 interviews, Vercel "Design Engineering at Vercel", Paraform and uithings on the design engineer role, Aulab (Italian portfolio advice), Developers Digest and others on AI-assisted workflows. Full source list at the end.

A note on evidence quality: the "statistics" quoted by portfolio-advice blogs (73% of hiring managers, 80% spend under three minutes, 84% want working demos) are repeated across sites without primary sources. Treat them as directional, not as facts. The consistent qualitative findings across hiring-manager posts are far more reliable and they all point the same way.

---

## 0. Executive summary

1. The best design-engineer portfolios in 2026 are small, fast, first person, and specific. Rauno, Emil, Paco, Lee, Delba: one or two sentences of intro, three to nine projects, writing, and a proof-of-craft section. No skill bars, no logo walls, no "passionate about".
2. Reviewers follow the same five-step path: decide to click, judge visual craft in seconds, read the hero for positioning fit, skim the work for clarity and outcome, then read About only once the work has convinced them. Design the site for that path.
3. Hiring managers skim case studies. A case study works when a 30-second scan yields problem, approach, outcome, and your specific ownership. Decisions and trade-offs are what they stop to read. Linear "research, wireframes, final" storytelling is what they skip.
4. For Edoardo: five full case studies (Refattura, the Formula 1 supplier traceability platform under NDA, the HTML to Figma plugin, Redergo Sales, one internal tool with public source), a short-form grid for the rest, and a Lab with six to ten live pieces. Four featured on the home page.
5. English-only for the main site, with a single condensed Italian profile page. Reasoning in section 3.5.
6. Present AI the way the load-bearing products use it (Refattura extraction, Redergo Sales generation) and describe the workflow in one honest "How I work" piece with specifics and limits. Never in the hero.
7. "Partner" is a fact for the About page and the footer, not a title for the hero. Lead with what he makes, not what he coordinates.

---

## 1. Information architecture

### 1.1 What the reference portfolios actually contain

| Site | Nav / sections | Projects shown | Notes |
|---|---|---|---|
| rauno.me (Staff Design Engineer, Vercel) | Craft, Projects, History of Software Design, Field Notes, Devouring Details, archived years (2022, 2023) | 9 projects, title + year + link only | Home is a seven-line manifesto ("Make it fast ... Make it soulful ... Make it."), one sentence of identity. Craft page holds 60+ dated pieces. Photography exists as a grid. OS metaphor with dock and sounds. |
| emilkowal.ski (Linear, ex Vercel) | Projects, Writing, Newsletter | 4 project cards (Sonner, Vaul, aiforui, animations.dev) | Intro: "I work on the Web team at Linear. I like to build things for designers and developers, think deeply about the user interface, how it looks, feels, behaves." Ten essays. No demos on the home page; the credibility comes from open source and writing. |
| paco.me (Linear, ex Vercel) | Building, Projects, Writing, Now, Connect | 3 open-source projects | Intro: "Crafting interfaces. Building polished software and web experiences. Experimenting with magical details in user interfaces." Has a Now section that mixes philosophy and music. Single page. |
| leerob.com | Bio, Notes, Blog | none as cards | Intro leads with "an engineer and writer". Career told parenthetically ("previously Cursor, Vercel"). Writing carries the site. |
| brittanychiang.com | single page: About, Experience, Projects | 4 to 6 | Hero: builds "accessible, pixel-perfect experiences for the web". Timeline of roles with stack tags. Footer colophon quoted in section 6. |
| delba.dev | single page: Work, Personal, About me | short lists with outcomes | Opens with a direct availability line: "I'm looking for my next role in developer education or technical video production." Result-led bullets ("millions of developers reached"). |
| jesperlandberg.com (freelance design engineer) | Featured, Full index, newsletter, contact | 7 featured, full index | Hero states positioning plus proof: "Swedish design engineer, named Awwwards Independent of the Year in 2022 and 2024, building visually rich, motion-driven websites." Award count as a trust line. |
| robbowen.digital (independent creative developer) | Home, Work, About, Writing | capability sections, 3 open-source releases | Work page is organised by themes ("Considered development", "Code Choreography") with client names inline (Aardman, UNHCR, RNLI, Honda). Footer in Welsh, dated MMXXVI. |
| joshwcomeau.com | Category nav, courses, goodies, About | none | Sound toggle, dark mode, animated avatar. Educational site rather than a job-hunting portfolio, but the model for personality touches that do not feel gimmicky. |

Patterns:

- Page count is low. The modal structure is Home + Work (or Projects) + Writing + About + one differentiator (Craft, Lab, Now). Contact is a line, not a page.
- Curated beats exhaustive everywhere. Emil shows four, Paco three, Rauno nine (links only), Jesper seven featured plus an index. Hiring advice converges on three to five deep case studies (GreatFrontend says two to four; Keming, a design hiring manager, says three; Hakia says three to five). Italian advice (Aulab) says six to ten but immediately adds that quality matters more than count.
- Writing is the second pillar on almost every strong design-engineer site. It is how they demonstrate thinking without a case study.
- Archived previous versions of the site (Rauno keeps 2022 and 2023 live) are a quiet trust and craft signal.

### 1.2 What the home page must accomplish in five seconds

Synthesised from Open Doors Careers (recruiter and hiring manager review flow), Elliot Dahl (under ten seconds), Keming (30 to 60 seconds for the whole portfolio), Hakia (strongest work visible within 15 seconds):

1. Who you are and what you do, in one line, with a level signal (not junior).
2. Where you are and whether you are reachable (city, remote, timezone).
3. Visual craft. The site itself is the first work sample; typography and spacing are judged before a word is read.
4. Two to four pieces of work that look real and are one click away.
5. A path to About for the reader who is already convinced.

GreatFrontend's framing for developers is the best single test: the first click should answer "what did you own, what was hard, and why does this work matter."

### 1.3 What recruiters and hiring managers actually read

- Recruiters keyword-scan (stack, domain, seniority markers) and spend very little time. They need the hero and a stack line they can match against a job description.
- Hiring managers and senior engineers "read between the lines" for clarity, self-awareness and authentic tone. They skim case studies and stop at decisions and trade-offs. They open About only after the work convinced them, and then About becomes "the first place they click".
- Both groups distrust inflated metrics and team impact claimed as personal (GreatFrontend lists this among critical mistakes). Both want to see your specific contribution in team work.
- A reviewer should leave knowing your likely level: feature contributor, feature owner, product engineer, design-system specialist, lead. Make the level legible without stating it.
- 2026-specific: hiring managers at competitive companies now expect a portfolio for mid-to-senior frontend roles, and they expect ownership and scope to be explicit.

Implication for Edoardo: two reading paths must both work. The recruiter path is hero, stack line, four thumbnails, contact. The senior-engineer path is hero, one case study read to the "Key decisions" and "Tech notes" sections, Lab, About, colophon. Both should complete in under three minutes.

---

## 2. Case study structure for a design engineer

### 2.1 What the evidence recommends

Convergent structure across GreatFrontend (frontend-specific), Open Doors Careers (2025 case study post), Toptal, Keming, and the TechInterview.org guide to AI projects:

1. Light context, two or three sentences. Client or product, timeframe, why it existed.
2. Role, timeline, team in a scannable block (table or summary box). Say who did what. Never hide that others were involved.
3. Problem, framed sharply. One paragraph.
4. Decisions and trade-offs. Organise around challenges, options considered, and the choice made. This is the section reviewers actually read. Avoid the linear "research, sketches, wireframes, final" narrative.
5. Frontend and technical decisions explicitly named: state, data fetching, accessibility, performance, error handling, quality assurance. Reviewers want proof of judgment, not output.
6. Outcome with measurable results where possible. Put the number in the title when you have one ("12,000+ documents processed").
7. Learnings only if they reflect real growth. "Learned to collaborate" is noise; "understood the constraints of X" is signal.
8. Length: digestible in one to two minutes (Toptal). Test: someone scans it for 30 seconds and can name problem, approach, outcome (Open Doors).
9. Visuals: one big image per project on the index, not a collage. High-resolution (2x), captioned. Recorded walkthroughs beat static grids.
10. Meaningful section titles that tell the story, not template labels.

### 2.2 How the best design engineers do it in practice

- Rauno and Emil barely write case studies. Their proof is shipped open source, essays, and the craft archive. This works when the products are public and famous. It is not directly transferable to agency and SaaS work, which needs narrative.
- Jesper Landberg (freelance) uses featured case studies with heavy visuals and a credibility line (awards) rather than long process text. Works for motion-heavy marketing sites where the visual is the argument.
- Robb Owen organises work by capability themes and drops client names inline instead of using a logo wall.
- Delba leads every item with the outcome and a link, no process narrative at all; the audience (developer education) reads results.

For Edoardo the right hybrid is: narrative case studies for product work (Refattura, traceability, Redergo Sales), outcome-led short entries for sites and internal tools, a public artifact with numbers for the Figma plugin, and a developer-facing "tech notes" layer for LoL Brain.

### 2.3 Showing NDA work honestly

Sources: UX Playbook 2026 NDA guide, IxDF (two articles), Medium/Bootcamp posts, GreatFrontend "private work" section.

Rules that all sources agree on:

- Read the NDA and ask for written permission for a specific scope. Send the final page to the client before publishing. This one step protects more than any technique.
- Do not blur or black out real screens. IxDF is explicit: it creates narrative gaps and looks untrustworthy, and it may still breach the NDA. Use recreated or abstracted visuals instead: mockups with fictional data, a simplified design system view, a diagram of the flow.
- Describe the client by sector, not name: "a racing-suit manufacturer supplying Formula 1 teams" is the accepted pattern (equivalent to "a major fintech app"). If even the sector is sensitive, go one level up ("a motorsport safety-equipment manufacturer").
- Numbers: use relative figures and ranges ("roughly doubled", "12% increase") rather than raw values. If no number can be shared, say so in one line ("Metrics are confidential; happy to discuss in a call").
- Put a short confidentiality note at the top, not a wall of caveats. Example wording: "This project is under NDA. Screens below are recreated mockups with fictional data; the process, architecture and decisions are real."
- Offer depth privately: "I can walk through the real product in an interview." Password-protected pages are an accepted option but add friction; a one-line offer is enough.
- Focus the narrative on the parts that are yours regardless of confidentiality: architecture choices, the wallet and signing UX, why Solana, how you designed for non-technical factory staff, how you validated.

### 2.4 Presenting internal tools and side projects

- Internal tools (Redergo Hub, Envergo, Dynamic BG) are credible when framed as problems you noticed and scoped yourself. State the internal user ("a ten-person team"), the friction removed, and a proxy metric (time saved per week, adoption inside the team, number of env files managed). Hiring managers explicitly value "a tool that makes a recurring task faster" because it shows you can identify a problem, scope it, and ship it.
- Side projects and internal tools with public source (Envergo, Dynamic BG, the Figma plugin) should be the place where the developer-to-developer depth goes: architecture diagram, why a given runtime or storage choice, how AI features are evaluated, what broke. TechInterview.org's 2026 guidance for AI projects applies directly: say why AI was necessary, name the model and prompt strategy, show an evaluation method even on a small dataset, and include one failure and how you handled it. Glossy demos that only show successes are a red flag.
- Keep a clear label: "Side project", "Internal tool", "Client work", "Product (Redergo)". Reviewers penalise ambiguity about ownership more than they penalise modest scope.

---

## 3. Tone and copy

### 3.1 How the best portfolios write about themselves

Observed patterns from the sites above:

- First person, present tense, one to two sentences of identity. "I work on the Web team at Linear." "Crafting interfaces." "I build DX and education systems." "Independent creative developer from Abergavenny, South Wales."
- Verbs of making, not adjectives of being. Nobody strong calls themselves passionate, creative, detail-oriented, or a ninja. They say what they build and for whom.
- A specific place and a specific employer or client list anchors the person in reality. Robb names Aardman and Honda inline. Jesper names the award. Brittany names the stack in the footer.
- Career told in one parenthesis, not a timeline ("previously at Vercel").
- The About page carries the personality: photo, what drives you outside work, and one real opinion. Hiring managers read it after the work; recruiters skip it.
- Restraint as confidence. Rauno's project index is title and year only. The implicit message is "the work speaks."

Anti-patterns confirmed by reviewers: skill sliders and tool logo lists, GPAs, "Research / Define / Ideate" template headings, agency-style logo walls on an individual's site (SlateGit and Keming both warn that a studio look confuses recruiters scanning for one engineer), buried contact info, animation that hides the work.

### 3.2 Telling the "designer who became a developer" story without a resume

What works:

- Make it a one-sentence fact in the hero or About, then prove it through the work rather than narrating it. Adham Dannaway's split "designer / coder" hero is cited as one of the clearest positioning plays because it answers a hiring question instantly.
- Explain the switch as a decision with a reason, not as a timeline. "I started at Redergo designing interfaces and kept opening the code to fix what the handoff lost. In 2021 I stopped handing off." One paragraph.
- Use the engineering false start honestly and briefly. Two years of energy engineering before design school is a good line about how he thinks (systems, constraints, numbers), not a gap to hide.
- Let the Figma plugin, the 3D archive and the Lab carry the "designer" half. Let Refattura's database and NestJS backend carry the "engineer" half. The story is then visible without being told twice.

### 3.3 Presenting AI-assisted workflows credibly in 2026

Evidence: TechInterview.org (2026 interviews), Developers Digest, Microsoft and others on spec-driven development, hiring-focused pieces on "AI-aware" interviews.

The 2026 consensus: every developer uses AI on the job, so using it is table stakes and not portfolio-worthy by itself. What hiring managers evaluate is judgment: when and why you use it, how you verify, and whether you understand every component. "Vibe coder" is the label to avoid; "agentic engineering with specs and review" is the label serious engineers are converging on.

Credible framing rules:

1. Put AI where it is load-bearing in the product, with specifics: Refattura's document extraction (model, prompt strategy, how accuracy is measured on 12,000+ documents, failure handling, cost per document), Redergo Sales (how a site variant is generated per target company, what is templated and what is generated, how quality is checked before a human sees it), the video localisation pipeline.
2. Describe the workflow once, in a "How I work" section or essay, with concrete artifacts: specs before code, CLAUDE.md conventions, review and verification steps, what the tools are bad at (the Developers Digest author's line is a good model: "The bottleneck shifted. It used to be writing code. Now it is reviewing and directing."). Hedge numbers honestly ("I ship noticeably faster; I have not measured it precisely").
3. Mention that he brought spec-driven practice into a ten-person team as a team practice, with one sentence about what changed (fewer reworks, shared conventions). This is a leadership signal disguised as craft.
4. Never put "AI" in the hero or in the self-description. It dates instantly and reads as hype. Do not list Claude Code among skills as if it were a framework.
5. Optional but strong: a short essay on a dead end or failure with an AI-assisted build. Reviewers name "honest discussion of failure modes" as a top credibility marker.

### 3.4 The "partner in a company and open to opportunities" nuance

The evidence on this is thin (founder-to-employee guides on Medium and TechCrunch), so this is reasoned advice rather than a documented pattern:

- Do not use an "Open to work" badge or banner. It reads as urgency and creates an awkward signal for current clients and colleagues who will also visit the site.
- State the fact plainly in About and in the Now section: "I'm a partner at Redergo and I still write code every day." Then state the interest as a preference, not a plea: "I like talking to product teams that care about the last ten percent, in Italy or remote." Ending About with "If that sounds like your team, write to me" is the Delba pattern (direct availability line) softened for someone who is currently employed and invested.
- Frame the partner role as ownership rather than management: technical decisions, code review, hiring, spec practice. Recruiters read "partner" as seniority and stability, which helps. Senior engineers read it as risk of being a manager, so the hero and the work must scream hands-on.
- Keep a Now page. It allows the availability line to change without touching the About copy, and a dated Now page ("Updated September 2026") signals the site is alive.
- Positioning flexibility: the CV pattern (Design Engineer abroad, Frontend Developer in Italy) does not need two sites. Use one hero that contains both words in some form (see section 7.6), let the Italian profile page use "Frontend Developer" and the English site lean "design engineer".

### 3.5 Italian and English: bilingual or English-only

Facts gathered:

- English proficiency among Italian developers is high in tech hubs; Italian tech job postings mix Italian and English requirements; Milan holds about 40% of Italian tech jobs and remote hiring has spread to Turin and other cities. Italian consultancies and SMEs communicate in Italian day to day, but their technical recruiters read English portfolios without difficulty. Italian portfolio advice (Aulab, Hostinger IT, freeCodeCamp IT) never insists on Italian-language sites; the implicit norm is that developer portfolios are in English.
- International remote product companies (the "Design Engineer" target) read only English. A bilingual toggle adds no value for them and can add a locale-detection annoyance.
- Multilingual SEO advice is aimed at businesses selling to consumers; the "76% prefer their own language" statistic is about shoppers, not hiring managers.
- Cost: case studies are long and change often; maintaining two languages doubles the writing and review load and, in practice, the Italian copy rots. Hreflang and i18n routing are trivial for him technically, so the cost is purely content.

Recommendation: English-only for the whole site (home, work, case studies, lab, writing, about, colophon), plus one Italian page at /it that is a condensed profile: who he is, what he does, selected work list with one line each, contact, link to the Italian CV. Mark it with hreflang, link it from the footer as "Profilo in italiano". Do not translate case studies. If Italian client leads ever become a goal, revisit; for the job market the English site is the asset and the Italian page is a courtesy that also captures Italian-language searches for his name.

One tone note for the English copy: Italian professionals writing in English tend to over-formalise ("I am a highly motivated professional with a strong background in"). The reference sites are the opposite: short, plain, slightly conversational. Write like Emil, not like a European CV.

---

## 4. The Lab / Playground / Craft pattern

### 4.1 How the exemplars do it

- Rauno (rauno.me/craft): about 60 pieces, reverse-chronological from 2021 to 2026, each with a thumbnail or inline demo, a title, a month and year, and optionally a "View production", "Read essay" or "View prototype" link. Minimal descriptions; titles range from literal ("Gooey Tooltip") to conceptual ("Novelty"). Many pieces are production work from Vercel and Next.js shown as craft, which makes the archive a bridge between play and shipped work. His philosophy, from the ui.land interview: build in code immediately, share tiny videos and demos as early as possible, treat experiment code as throwaway, "build, build, build."
- Devouring Details: principles first, then prototypes with source, then resources. Credibility through pedigree, open-source usage numbers, and testimonials from heads of design.
- Jhey (jhey.dev): positioning line "Making your ideas click"; the demos live on CodePen and the site links out. Volume and playfulness are the point.
- Emil and Paco: no lab page; the craft is inside open-source components (Sonner, Vaul, cmdk) and essays. Their "lab" is npm.
- Cassie Evans took her personal site down in 2026 with a note that maintaining it stopped feeling meaningful. Relevant lesson: a lab is a commitment; an abandoned one dated 2023 hurts more than none.

### 4.2 What makes a lab credible

1. The pieces run live on the page, in the reader's browser, with a still or video fallback on low-power devices. Screenshots of interactions are not craft.
2. Each piece is dated. Dates prove continuity and make the archive honest about age.
3. Pieces come from real problems (a tooltip needed in a product, a mockup generator used weekly) rather than tutorial recreations. Rauno's mixing of production pieces into craft is the model.
4. Titles are short and specific. One line of description at most; a "Notes" expander for how it was built is a bonus for developer readers.
5. Volume threshold: six to ten pieces at launch reads as a real practice. Two or three reads as a placeholder. Sixty is a career.
6. A link to source for at least some pieces. Design engineers are judged on code quality too.
7. Restraint in the surrounding chrome. The lab page itself should be plain so the pieces carry the weight.

### 4.3 Candidate lab pieces for Edoardo, drawn from real work

- The HTML to Figma node-mapping visualiser (how DOM boxes become Figma frames), extracted from the plugin.
- Dynamic BG as a lab item: an inline mockup-generator with a few controls, rather than a separate "project".
- A GSAP scroll-driven sequence from one of the marketing sites (boerotrucks, atavola, thefootballroyale), stripped of branding.
- The invoice field-extraction review UI micro-interaction from Refattura (highlight, confidence, accept/correct), with fictional data.
- One 3D piece from the Cinema 4D / Blender years re-rendered as a small Three.js or shader experiment, to make the design background tangible without a 3D avatar.
- An Envergo interaction (diffing two env files) as a small, useful widget.
- A typography or theming piece from the portfolio itself (the theme switch, the sound toggle) documented as a craft item.

---

## 5. Personal touches: what works in 2026 and what feels dated

| Touch | Verdict | Evidence and reasoning |
|---|---|---|
| Photography | Keep only if the photos are genuinely his and good. | Rauno integrates a full-screen photo grid; reviewers praise it because it is sized well and clearly personal. A stock-looking "travel" grid reads as filler. |
| Sketches and design process artifacts | Keep, inside case studies. | Hiring managers ask for "the messy middle". Sketches with captions are the cheapest way to show design thinking. |
| 3D avatar hero | Skip. | 2026 trend pieces still praise "immersive 3D" but the curated galleries (Godly) favour restrained, typographic, editorial work, and the strongest design-engineer sites have none. A 3D avatar is the single most dated portfolio trope of 2021 to 2023. Edoardo's real 3D background is better shown as one crafted object in the Lab. |
| Sound | Optional, off by default, subtle. | Rauno and Josh Comeau use interface sounds with a visible toggle and reviewers call it "really satisfying". Without a toggle it annoys. |
| Timezone / local time / status | Keep, small. | "Turin, 14:32 local" in the footer or hero communicates remote-readiness in a glance. Keep it text, not a widget cluster. |
| Now page | Keep, dated. | Derek Sivers' definition: what you would tell a friend you had not seen in a year. It is the natural home for the availability line and for "currently building". Update when things change; show the date. |
| Uses page | Low value for hiring, cheap to add. | 934 sites on uses.tech; it is a community ritual, not a hiring signal. Fold a short "tools" list into the colophon instead of a full page. |
| Reading list / bookshelf | Skip unless maintained. | Same failure mode as an abandoned blog. |
| Spotify now-playing | Skip. | Widget culture from 2021 bento portfolios; reads as decoration. Paco lists music tastes in prose on the Now page, which is warmer and does not break. |
| Bento grid home | Skip. | The 2023 to 2024 template look; recruiters now associate it with template sites. |
| AI chatbot "ask me anything about Edoardo" | Skip. | Named as a 2026 trend by builder blogs, but it is gimmick territory for a person who wants to be judged on judgment about AI. |
| Archived previous site versions | Keep. | Rauno links 2022 and 2023. It shows growth and craft over time. Plan for it from v1: a /2026 archive URL when v2 ships. |
| Dark mode | Expected, not a feature. | Do it well; do not announce it. |
| Guest book or comments | Skip. | Indie-web charm but maintenance and spam. |

---

## 6. Trust signals for a solo person

| Signal | Use it? | How, for Edoardo |
|---|---|---|
| Client logos | Not as a wall. | A logo grid reads as an agency and confuses recruiters scanning for one engineer (SlateGit, Keming). Name clients inline in case studies and in one sentence on About ("work for a Formula 1 supplier, a funeral home, a truck dealer and a fitness platform" is more memorable than six logos). |
| Testimonials | Two or three short quotes, inside case studies. | Freelance advice says testimonials build trust fastest; job-hunting advice says carousels look like a studio. Compromise: one quote per case study from a client or colleague, with name and role, placed near the outcome. Ask the Refattura users and the traceability client. |
| GitHub activity | Link, and curate. | Pin the plugin, Envergo, this portfolio. Write READMEs structured around the problem (TechInterview.org: "lead with the README"). Do not embed a contribution graph; agency work happens in private repos and the graph will undersell him. |
| Talks and writing | Writing yes, three pieces at launch. | Every strong design-engineer site has essays. Suggested first three: the spec-driven workflow inside a small team, what the HTML to Figma mapping taught about both tools, how Refattura's extraction accuracy is measured. Talks: only if real. |
| Open source | The Figma plugin is the asset. | Show community install count if it can be read from the Figma page; link to the listing; show the source if it is public. |
| Lighthouse scores | Yes, once, in context. | "100 in all four categories" belongs in the Athena entry with a link to a live PageSpeed run. Also make the portfolio itself score 100 and say so in the colophon, since claiming performance on a slow site is fatal. |
| Colophon | Yes. | Brittany's footer is the minimal model: "Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel. All text is set in the Inter typeface." Maggie Appleton's page is the maximal model: stack, typography, content workflow, custom components, with opinions. For a design engineer, include the design decisions (type scale, colour system, motion rules) and one honest paragraph on how AI tools were used to build the site. |
| Changelog / site version | Lightweight. | A dated list of notable changes at the bottom of the colophon ("2026-09: v1 launched; 2026-11: added Lab pieces"). Do not run semver on a personal site; it looks precious. |
| Design source files | Yes, this is a differentiator. | Publish the Figma file of the site (or an embed) in the colophon. Almost no developer does this, and it proves the designer half in thirty seconds. |
| Awards | If any, one line in the style of Jesper. Otherwise skip. | |
| Education | One line in About. | IAAD plus the engineering years, as a story beat, not a credentials block. |

### 6.1 Presenting "partner and coordinator of a team" without sounding managerial

- Hero and work pages use only maker verbs: designed, built, shipped, migrated, measured.
- The word "partner" appears once in About and once in the footer or Now page, as a fact.
- Coordination is described as practice, not hierarchy: "I review most of the team's frontend code, set the conventions, and run our spec-driven workflow." Concrete practices read as senior IC; "manage a team of ten" reads as manager.
- Every case study has a Role block that states what he personally designed and wrote. If he did all of it, say "Solo: design, frontend, backend, database, deployment."
- The Lab exists partly for this reason: nobody with a live lab dated this month is read as a pure manager.

---

## 7. Recommendations for this person

### 7.1 Proposed sitemap

```
/                 Home
/work             Work index (featured case studies + short entries + archive list)
/work/[slug]      Case study pages (5 at launch)
/lab              Lab (6 to 10 live pieces at launch, dated)
/writing          Writing index (3 essays at launch)
/writing/[slug]
/about            About (story, photo, how I work, availability line)
/now              Now (dated, short)
/colophon         Colophon (stack, type, design file, AI note, changelog, tools)
/it               Italian condensed profile (hreflang it)
/cv               Optional: HTML CV with print stylesheet, EN, plus IT PDF link
```

Navigation: Work, Lab, Writing, About. Now and Colophon are footer links. Contact is an email line in the hero and the footer, not a page or a form.

Site archival plan: reserve a pattern (for example /v1 or a subdomain) so the 2026 version can stay online when v2 ships, as Rauno does.

### 7.2 Project selection and order

Criteria used: personally designed and built, has a public artifact or a shareable number, demonstrates a different capability from the others, intrigues a senior engineer, is safe to show.

Tier A, full case studies (in this order on /work):

1. Refattura. SaaS for Italian e-invoicing self-invoices with AI extraction, 12,000+ documents processed. The anchor: real users, real volume, regulation-heavy domain, full ownership from design to database to maintenance, and load-bearing AI with measurable accuracy. Title with the number. Tech notes: extraction pipeline, validation against SDI rules, cost per document, failure handling.
2. Blockchain traceability platform for a racing-suit manufacturer supplying Formula 1 teams (NDA). The intrigue piece. Recreated mockups with fictional data, architecture diagram, decision narrative (why Solana, wallet and signing UX for factory staff, offline and error states), and the one-line confidentiality note. Offer a private walkthrough. Confirm permission first (see 8).
3. HTML to Figma plugin. Public, verifiable, and the purest design-engineer artifact in the list: it literally translates between the two disciplines. Show install count, the hard mapping problems (flex to auto layout, text metrics, images), and what could not be mapped. Link to the community listing and to source if public.
4. Redergo Sales. AI lead generation that builds a tailored site variant per target company. Novel and 2026-relevant. Explain generation versus templating, quality gates, how leads are scored, and one honest limit. This is also where the "AI in the product" story is told without hype.
5. Envergo. Internal tool that stores and encrypts environment variables across every project the team runs, with public documentation. The developer-to-developer piece: threat model, encryption and key handling choices, CLI and web surfaces, adoption inside the team, what broke. Label clearly as an internal tool. Senior engineers will read this one to the end.

Tier B, short entries on /work (one image, 80 to 150 words, outcome first, stack tags, link):

6. athenaonoranzefunebri.com. Astro, 100 in all four Lighthouse categories, local SEO. Tasteful tone given the sector. Link to a live PageSpeed run.
7. AI video localisation for a fitness course platform. Pipeline diagram, languages, cost or time saved, quality control step.
8. Redergo Hub (internal CRM). Internal user count, what it replaced, one screenshot with fictional data.
9. Envergo (env variable manager). Problem, adoption inside the team, link to source if public.
10. Dynamic BG (mockup generator). Present as a tool, and reuse it as a Lab piece.

Tier C, archive list at the bottom of /work (name, year, one line, link): lampante.ai, boerotrucks.com, atavola.pro, rekupero.it, thefootballroyale.com. Include only the ones he personally designed and built; if a site was mostly someone else's design, either omit it or state the role honestly ("frontend build on an external design"). One of them can donate a GSAP sequence to the Lab.

Omit: anything where the role was small, anything he would not want to defend in an interview, and any early design-only work that has no code.

Home page shows four: Refattura, the traceability platform, the Figma plugin, and Redergo Sales (or Envergo if the audience is expected to be more engineers than recruiters; the order can be A/B'd by simply swapping the fourth card).

### 7.3 Case study template

Target length 700 to 1200 words plus visuals; scannable in 30 seconds via the header block and section titles; full read in two to three minutes.

```
Title with the outcome when possible
  e.g. "Refattura: self-invoicing for Italian freelancers, 12,000+ documents in"

Header block (table or definition list)
  Client / Product     Refattura (Redergo product) | Confidential client, motorsport
  Year                 2023 to present
  Role                 Design, frontend, backend, database, deployment, SEO (solo) 
                       or list who did what
  Team                 e.g. me + 1 backend developer + the client's operations lead
  Stack                Next.js, TypeScript, NestJS, PostgreSQL, Prisma, Vercel
  Status               Live, maintained | Live for client, NDA
  Links                Live site, Figma community page, source, PageSpeed run

Summary (3 sentences, outcome first)
  What it is, for whom, what happened as a result.

[Confidentiality note, only when needed, one or two lines]

Context (2 or 3 sentences)
  Why this existed. Business or user situation.

The problem (1 paragraph)
  Sharply framed. What was hard.

Constraints (bullet list, 3 to 5)
  Regulation, budget, timeline, legacy system, non-technical users, NDA.

Key decisions (3 to 5 sub-sections, each 60 to 120 words)
  Decision title as a sentence, e.g. "Extraction confidence is shown, never hidden"
  What the options were, what I chose, why, what it cost.
  At least one design decision and at least one engineering decision.

Design (visuals with captions)
  One or two hero images, then process artifacts: sketches, flows, component sheet.
  Every image captioned with what to look at.

Tech notes for developers (collapsible or clearly labelled)
  Architecture diagram, data model sketch, one interesting problem in depth,
  performance and accessibility work, testing approach, what the AI part
  actually does and how it is evaluated.

Outcome (numbers or honest proxies)
  12,000+ documents; 100/100/100/100; adoption; time saved; qualitative quote.
  If confidential: "Metrics are confidential; approximate ranges below."

What I would do differently (2 to 4 bullets)
  Only real lessons. Specific and slightly uncomfortable is good.

Credits
  Who else worked on it and what they did.

Testimonial (optional, one short quote with name and role)

Next / previous case study links
```

### 7.4 Home page narrative beats

1. Hero. Name, one-line positioning (section 7.6), location and time ("Turin, Italy, CET"), current fact ("Frontend developer and partner at Redergo"), email link. Nothing else above the fold except the start of the work.
2. Proof strip (optional, one line, three facts). "12,000+ invoices processed by Refattura. 100/100/100/100 on athenaonoranzefunebri.com. HTML to Figma on the Figma Community." Facts, not adjectives. If it feels like bragging, fold the facts into the cards instead.
3. Selected work. Four cards, one big image each, title with outcome, one line of role and stack. No "view all" button hierarchy games; a plain link to /work.
4. How I work. Three short paragraphs: design and code in the same hands; end to end from Figma to database to deployment; specs first and AI as a reviewed collaborator, with one concrete practice named. Link to the essay.
5. Lab teaser. Three live pieces inline, dated, link to /lab.
6. About teaser. Photo, the designer-to-developer sentence, the engineering false start in one clause, the "partner who still writes code every day" line. Link to /about.
7. Writing. Three titles with dates.
8. Now and contact. "Currently: ... Interested in talking to product teams that care about the last ten percent, in Italy or remote. Email." Dated.
9. Footer. Colophon link, Italian profile link, GitHub, LinkedIn, local time, year.

### 7.5 Copy principles

1. First person, present tense, short sentences. Maximum two sentences for any identity statement.
2. Verbs of making. Designed, built, shipped, measured, migrated, maintained. Ban: passionate, creative, innovative, cutting-edge, seamless, leverage, synergy, ninja, wizard, rockstar, "AI-powered" as a self-descriptor.
3. Specific over general. Name the stack, the number, the city, the client sector, the year. "12,000+ documents" beats "thousands"; "Formula 1 supplier" beats "enterprise client".
4. Outcome before process. Every project title, summary and card leads with what happened.
5. Own it precisely. State role and credits on every project. Solo work says solo. Team work names the split. Never claim team impact as personal.
6. Decisions are the content. Every case study section title should be a decision or a tension, not a phase name.
7. Honest limits. One line on what did not work or what is confidential builds more trust than a paragraph of polish. Hedge numbers you have not measured.
8. AI is described by what it does and how it is checked, never by its brand or its novelty.
9. Leadership as practice. "I review the team's frontend code and run our spec-driven workflow" rather than "I lead a team of ten."
10. Plain English, not CV English. Read every paragraph aloud; if it sounds like a LinkedIn summary, cut it in half.
11. Dates everywhere. Case studies, lab pieces, essays, Now, colophon changelog. Dates are the cheapest honesty signal on a personal site.
12. One tone across languages. The Italian profile page uses the same short, plain register, not the formal register of Italian CVs.

### 7.6 Three alternative one-line positioning statements for the hero

Each is followed by the same second line: "Frontend developer and partner at Redergo, Turin. Previously a designer, still a designer."

Option A, design-engineer lean (for international product companies):

> I design interfaces and then build them, end to end, from Figma to the database.

Option B, maker and product lean (works for both markets):

> I ship whole products: the design, the frontend, the backend, and the boring parts that keep them running.

Option C, story lean (for the About-first reader):

> Designer by training, developer by choice. I build web products where the last ten percent is not optional.

Notes: Option A is the safest default because it says design engineer without using the title, which keeps the Italian "Frontend Developer" positioning intact in the second line. Option B is the most memorable to engineers because "the boring parts" signals maintenance and ownership. Option C is warmest but leans on a phrase ("the last ten percent") that several design-engineer job posts also use, so it may read as borrowed to someone who reads a lot of them. For the /it page: "Progetto interfacce e le costruisco, dal Figma al database. Frontend developer e socio di Redergo, Torino."

### 7.7 Lab plan

Launch with eight pieces (section 4.3), each with: title, month and year, one-line description, live demo with reduced-motion and mobile fallback, optional "Notes" expander with how it was built and a source link. Add one piece per month or two; if the cadence cannot be sustained, keep the archive but do not promise more. Mix production-derived pieces with pure experiments, roughly half and half, as Rauno does.

### 7.8 Writing plan

Three essays at launch, 800 to 1500 words each, practical and opinionated:

1. "Specs before prompts: how a ten-person agency team adopted spec-driven development" (the AI credibility piece, with limits and a failure).
2. "Translating HTML to Figma taught me what both tools get wrong" (the design-engineer piece).
3. "Measuring extraction accuracy on 12,000 real invoices" (the product and evaluation piece).

### 7.9 Trust signal plan

- Case-study testimonials: request three (a Refattura user, the traceability client, a Redergo colleague or developer he coordinates).
- GitHub: pinned repos with problem-first READMEs; plugin, Envergo, this portfolio.
- Colophon with stack, type system, motion rules, Figma design file embed, the AI note, tools list, and a dated changelog.
- Portfolio itself at 100 across Lighthouse categories, verified before launch, stated once in the colophon.
- Now page dated and updated at least quarterly.

---

## 8. Things to verify before writing the copy

1. NDA scope for the traceability platform: get written permission for sector description, recreated mockups, architecture diagram, and any relative metrics. Send the final page to the client.
2. Refattura figures: confirm the 12,000+ number is shareable and current, and whether user counts or accuracy figures can be published.
3. Figma plugin install and like counts, and whether the source can be public.
4. For each Tier C site, confirm his actual role (design and build, or build only) so the archive line is honest.
5. Whether Redergo is comfortable with Redergo Sales and Redergo Hub being described publicly, and to what depth.
6. Availability wording agreed with his own comfort level as a partner (section 3.4).
7. Real photography: does he have a body of photos worth a grid, or should the personal touch be the 3D object and the sketches instead.

---

## 9. Sources

Portfolio sites studied directly:
- https://rauno.me/ , https://rauno.me/craft , https://rauno.me/projects
- https://emilkowal.ski/
- https://paco.me/
- https://leerob.com/
- https://brittanychiang.com/
- https://delba.dev/
- https://jesperlandberg.com/
- https://robbowen.digital/ , https://robbowen.digital/work/
- https://www.joshwcomeau.com/
- https://www.cassie.codes/
- https://devouringdetails.com/
- https://maggieappleton.com/colophon/
- https://uses.tech/
- https://nownownow.com/about
- https://www.killerportfolio.com/by/rauno-freiberg
- https://www.awwwards.com/sites/dennis-snellenberg-portfolio
- https://ui.land/interviews/rauno-freiberg

Hiring manager and reviewer perspectives:
- https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio
- https://blog.opendoorscareers.com/p/how-to-write-a-strong-case-study-for-your-portfolio-in-2025-a14b
- https://www.greatfrontend.com/blog/frontend-developer-portfolio
- https://hakia.com/skills/building-portfolio/
- https://keming.substack.com/p/make-a-stellar-design-portfolio
- https://elliotdahl.substack.com/p/get-noticed
- https://www.toptal.com/designers/ui/case-study-portfolio
- https://slategit.com/blog/developer-portfolio-examples-that-got-hired (summary via search; page blocked direct fetch)

NDA and confidential work:
- https://uxplaybook.org/articles/ux-design-portfolio-nda-guide-2026
- https://ixdf.org/literature/article/how-to-handle-non-disclosure-agreements-ndas-when-you-write-your-ux-case-study
- https://medium.com/design-bootcamp/tips-for-creating-a-design-portfolio-when-your-work-is-under-nda-e752088d015e

Design engineer role:
- https://vercel.com/blog/design-engineering-at-vercel
- https://www.paraform.com/blog/what-is-a-design-engineer-and-how-they-re-different-from-product-engineers
- https://uithings.com/design-engineering

AI-assisted work and credibility:
- https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/
- https://www.developersdigest.tech/blog/ai-developer-workflow-2026
- https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/
- https://towardsdatascience.com/from-vibe-coding-to-spec-driven-development/
- https://medium.com/@codegrey/the-new-ai-aware-coding-interview-how-to-prepare-in-2026-6a207d94b23a

Italian market and language:
- https://aulab.it/blog/come-creare-un-buon-portfolio-da-web-developer
- https://www.hostinger.com/it/tutorial/portfolio-per-sviluppatori-web/
- https://jobtrackr.it/blog/it-it-job-market-april-2026
- https://strapi.io/blog/multilingual-seo-best-practices

Trends and personal touches:
- https://blog.tomaszgil.me/rebuilding-my-personal-website-2025-edition
- https://elements.envato.com/learn/portfolio-trends
- https://www.socialscript.in/blog/design-inspiration-sites-for-2026 (on Godly's curation criteria)
- https://medium.com/@theo-james/digital-gardening-in-2025-the-return-of-the-curated-web-3ae36f7add77
- https://blog.copyfol.io/portfolio-website-credibility
- https://www.resumly.ai/blog/freelance-portfolio-that-wins-for-software-engineers-in-2026
