# Sintesi della ricerca e domande aperte

Data: 3 settembre 2026. Questo documento riassume i quattro report in `docs/research/01..04` e li incrocia con il profilo di Edoardo (repo `edoraba`, master del CV in `cv-generator`). Serve come base per la discussione prima di qualsiasi decisione di design.

---

## 1. Cosa ho capito di te

- Frontend developer con laurea in design (IAAD), due anni di ingegneria energetica al Politecnico prima. In Redergo dal 2020 come UX-UI designer, dal 2021 sviluppo, socio da inizio 2025, coordini gli sviluppatori di un team di dieci.
- Spedisci prodotti interi: design, decisioni tecniche, database, frontend, backend, SEO, manutenzione. Stack quotidiano Next.js 16, React 19, TypeScript, Tailwind 4, Astro, GSAP, Lenis, Motion, Prisma/Drizzle, Postgres/Mongo, NestJS, Vercel, Cloudflare.
- Lavori più forti: Refattura (SaaS fatturazione elettronica, 12.000+ documenti), piattaforma di tracciabilità su Solana per un fornitore di tute da F1 (NDA), plugin HTML to Figma pubblicato, Redergo Sales, Redergo Hub, Envergo, Dynamic BG, Athena (Lighthouse 100x4).
- Il tuo gusto, dai lavori recenti: dark caldo, un accento deciso, grotesk più mono, angoli vivi, hairline invece di ombre, scramble text. Riferimento dichiarato: good-fella.com.
- Il CLAUDE.md del CV dice esplicitamente che il portfolio è "la prova più forte che manca" per il posizionamento Design Engineer. Questo sito è quella prova.

## 2. Cosa dice la ricerca (i dieci punti che contano)

1. **L'accessibilità è la corsia libera.** Ogni portfolio vincitore Awwwards controllato prende 7.6 a 8.7 in Animations e solo 5.7 a 7.0 in Accessibility. Un sito che anima pesante e tratta reduced-motion come design parallelo, con skip link, focus visibili e primo paint istantaneo, viene letto come "vero ingegnere" da un pari in pochi secondi. Quasi nessuno lo fa.
2. **Lab batte case study.** Il cambiamento più netto 2025-26: le sezioni Craft/Lab/Explorations (Rauno, Emil, Nese, Volino) valgono più delle pagine progetto lunghe. I reviewer spendono circa 55 secondi e cliccano invece di leggere. Separare Work da Lab permette di giudicare gusto e ingegneria separatamente.
3. **Il kit Snellenberg è radioattivo.** Menu arrotondato che scivola, magnetic button, preloader con saluti in più lingue, immagine che segue il cursore nella lista progetti, footer curvo sticky, Lenis + Framer Motion. I giudici lo riconoscono a vista. Stessa sorte per: loader a percentuale, cursore a pallino, marquee, "Hi I'm X 👋", scroll solo orizzontale, "ruota il dispositivo", bento grid, avatar 3D, skill bar, muro di loghi.
4. **L'uniforme dei premiati è bianco e nero puro.** Lallé, Baratta, Nese, Gradogna, NOTHIN' sono tutti #000/#fff senza accento. Un accento deciso e insolito più un display con carattere è differenziazione a costo zero. Le palette più "2026" sono dark caldo (charcoal con sottotono bruno/oliva + crema o un accento caldo: Anime.js #252423/#DAD5D0, Oryzo #100904/#FF8539) e i duotoni desaturati senza nero.
5. **Il linguaggio di movimento vincente è "editoriale a ease pesante", non spettacolo.** Reveal a righe mascherate (SplitText lines, 0.8s, stagger 0.06-0.08, expo/power4.out), Lenis con lerp 0.08-0.1, wipe clip-path 1-1.4s. Regola più riusabile trovata (Codrops 2026): contenuto veloce (0.8s power4), camera o canvas lenti (2s expo.inOut), in parallelo.
6. **Architettura delle transizioni standard: canvas persistente, DOM sostituito.** Un canvas fuori dal router, uniform tweenate tra stati di pagina, Flip della thumbnail nell'hero del case study (1s power3.inOut). View Transitions API per le rotte "noiose".
7. **Tipografia: display enorme, mono minuscolo, quasi niente in mezzo.** Grotesk stretto + il suo mono per le etichette è la firma del design engineer (Geist, Diatype, Söhne, Neue Montreal). Assi variabili scrubbati dallo scroll e text-decode in ingresso sono i trucchi correnti.
8. **Componenti "wow" ancora freschi:** relighting con depth map di foto piatte, hover materico/bassorilievo sulle thumbnail, vetro con ottica reale, click-and-hold con anello di progresso, command palette Cmd+K con comandi giocosi (tema, griglia, suono), footer giocattolo interattivo, figure interattive inline nei case study, immagini con dither/halftone, pagina changelog del sito.
9. **Segnali da "vero ingegnere":** velocità senza loader, reduced-motion progettato, tastiera e screen reader sani, view-source pulito con feature native (View Transitions, scroll-timeline, :has, anchor positioning), colophon o repo pubblica, un articolo tecnico su come è costruito il sito, dettagli costosi (stato "Copied", ora locale, 404 disegnata, OG image per pagina), quality preset e idle guard su mobile.
10. **Scena italiana:** Michelini (Modena), Baratta (Brescia), Gradogna (Firenze), Nese (Milano), Pian (Udine), Mazzucco (Dolomiti). Nessuno visibile da Torino. I premiati italiani 2026 sono in due campi: hospitality di lusso (crema, navy, video) e portfolio creative-dev bianco e nero. Uno spazio "dark caldo, ingegnerizzato, Torino industriale" è libero.

## 3. Stack raccomandato (report 03, versioni verificate su npm il 3 settembre 2026)

| Livello   | Scelta                                                                                                                                      | Perché                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | Next.js 16.3.4, React 19.2.8, TypeScript 7                                                                                                  | È il tuo stack, è quello di Satus (darkroom.engineering), `cacheComponents` + `partialPrefetching` danno navigazioni istantanee, `<ViewTransition>` funziona senza configurazione |
| Styling   | Tailwind 4.3 per layout con token in `@theme`, CSS Modules per i componenti animati                                                         | Stesso contratto di Satus; i token sono anche variabili CSS animabili da GSAP                                                                                                     |
| Motion    | GSAP 3.15 (gratis al 100% dal 3.13) con ScrollTrigger, SplitText, Flip via `@gsap/react`                                                    | Standard dei siti premiati; SplitText ha ARIA integrato                                                                                                                           |
| Scroll    | Lenis 1.3.26 opzionale, spento con reduced-motion, spento sulle pagine di lettura; Tempus come unico rAF                                    | Lenis gira su scroll nativo, sticky e ancore funzionano                                                                                                                           |
| 3D        | Una sola scena: R3F 9.7 + WebGPURenderer con fallback WebGL2, oppure OGL per un singolo fragment shader                                     | Lazy dopo LCP, poster, dpr cap, idle guard                                                                                                                                        |
| Contenuti | MDX nel repo tipizzato con Content Collections 0.15                                                                                         | Git è il CMS; niente Sanity o Payload per cinque case study                                                                                                                       |
| i18n      | next-intl 4.14 con `[locale]` solo se serve la pagina /it                                                                                   |                                                                                                                                                                                   |
| Qualità   | Vitest 5, Playwright 1.62 + axe, Lighthouse CI con budget, bundle analyzer, `next/og`, sitemap, JSON-LD ProfilePage + Person, RSS, llms.txt | Sono le cose che un senior guarda nel repo                                                                                                                                        |
| Hosting   | Cloudflare Workers via OpenNext 1.20 (piano 5$ per stare sotto il cap del Worker), Cloudflare DNS davanti                                   | Vercel Hobby è solo non commerciale; Cloudflare Pages è in maintenance                                                                                                            |
| Analytics | Umami (MIT, cookieless)                                                                                                                     | Niente banner cookie                                                                                                                                                              |

Alternativa onesta: Astro 7.3 con isole React, se contano più peso minimo e hosting statico gratis che mostrare React. Trade-off da saper raccontare: Next spedisce un runtime React su un sito quasi statico; `<ViewTransition>` è ancora canary sotto l'App Router; Lenis e ScrollSmoother si sovrappongono, Flip e ViewTransition si sovrappongono, GSAP e Motion si sovrappongono: uno per lavoro.

## 4. Struttura e contenuti proposti (report 04)

Sitemap: `/` home, `/work` indice, `/work/[slug]` cinque case study, `/lab` 6-10 pezzi vivi e datati, `/writing` tre saggi, `/about`, `/now` datata, `/colophon`, `/it` profilo condensato in italiano con hreflang. Nav: Work, Lab, Writing, About. Contatto come riga email, non pagina.

Case study completi, in ordine: Refattura (àncora, numero nel titolo), piattaforma tracciabilità F1 (NDA, mockup ricreati con dati fittizi, nota di confidenzialità in una riga, walkthrough privato su richiesta), HTML to Figma (l'artefatto design-engineer più puro), Redergo Sales (la storia AI-nel-prodotto senza hype), Envergo o Dynamic BG (il pezzo developer-to-developer, con sorgente). Voci brevi: Athena con link a PageSpeed live, localizzazione video, Redergo Hub, Envergo, Dynamic BG. Archivio a una riga: Lampante, Boero Trucks, A Tavola, Rekupero, Football Royale, solo dove il ruolo è confermato.

Template case study: titolo con esito, blocco header (cliente, anno, ruolo, team, stack, stato, link), sommario di tre frasi, contesto, problema, vincoli, 3-5 "decisioni chiave" scritte come frasi con alternative e costo, artefatti di design con didascalie, "tech notes" per sviluppatori, esito con numeri o proxy onesti, "cosa farei diversamente", crediti, una testimonianza.

Copy: prima persona, verbi del fare, specifico, esito prima del processo, date ovunque, mai "AI" nella hero, il ruolo di socio come fatto in About e footer e mai come titolo, coordinamento descritto come pratica (review, convenzioni, spec) non come gerarchia. Lingua: inglese per tutto il sito, pagina /it condensata.

Hero, tre opzioni:

- A: "I design interfaces and then build them, end to end, from Figma to the database."
- B: "I ship whole products: the design, the frontend, the backend, and the boring parts that keep them running."
- C: "Designer by training, developer by choice. I build web products where the last ten percent is not optional."

## 5. Tre direzioni di concept (proposta preliminare, da discutere)

**Direzione 1, "Editoriale ingegnerizzato" (quella che consiglio).** Base editoriale a ease pesante: reveal mascherati, wipe clip-path, Lenis leggero. Palette dark caldo (charcoal bruno intorno a #141210) con tema light carta (#F3EFE6) reale, un solo accento usato come luce, grana al 3-5%, bordi 1px, zero ombre, angoli vivi. Grotesk stretto + mono per metadati (indici, coordinate, timestamp, hash di build). Un solo oggetto WebGL o shader persistente nella hero che accompagna le transizioni di pagina e diventa il filo del sito; il resto è DOM. Lab in evidenza quanto Work. Cmd+K con comandi giocosi come nav secondaria. Accessibilità trattata come feature dichiarata nel colophon. Torino come identità (Olivetti, industria, Torino Design) senza clichè di lusso. Perché: occupa lo spazio libero nella scena italiana, valorizza la laurea in design nella tipografia, tiene i costi di performance sotto controllo, è la lettura più credibile per un design engineer.

**Direzione 2, "Il sito come strumento".** Navigazione interamente da command palette e tastiera, estetica terminale/Warp/Toyfight, pagine come "comandi", changelog e versione in evidenza, tutto mono. Perché sì: parla forte agli ingegneri, è coerente con il lavoro su tool interni (Envergo, Hub). Perché no: è già un genere ("portfolio as OS"), lascia poco spazio al lato design, rischia di sembrare freddo per i recruiter.

**Direzione 3, "Spettacolo cinematico".** Canvas WebGL persistente stile Lusion/Oryzo, transizioni 3D-to-2D, scene per ogni progetto, suono opzionale. Perché sì: massimo impatto Awwwards, mostra i tuoi anni di Cinema 4D e Blender. Perché no: costo di sviluppo e di performance alto, il dev jury penalizza WPO e accessibilità, ombra lunga di Bruno Simon, e i case study diventano secondari rispetto all'esperienza.

La mia raccomandazione è la 1 con un innesto misurato della 3 (un solo oggetto o shader di firma) e della 2 (Cmd+K come easter egg funzionale, non come nav primaria).

## 6. Decisioni prese (3 settembre 2026)

- Sito interamente in inglese, mercato internazionale. Niente pagina /it.
- Direzione visiva: il mondo Awwwards dei creative developer. Riferimento gradito: francescomichelini.com. Nessun vincolo di continuità con lavori precedenti.
- Via libera a raccontare i lavori per clienti e prodotti Redergo con la profondità che serve; permessi formali da verificare prima della pubblicazione.
- Repo pubblica creata da Claude: github.com/edoraba/portfolio.

## 7. Domande aperte

Le prime tre cambiano il lavoro in modo materiale; le altre servono per scrivere copy e case study onesti.

1. **Lettore primario e lingua.** Aziende di prodotto internazionali (posizionamento Design Engineer, sito solo in inglese con pagina /it condensata) oppure mercato italiano (bilingue completo)? La ricerca consiglia la prima.
2. **Direzione di concept.** Delle tre sopra, quale ti risuona? E sull'accento: hai un colore che senti tuo? C'è un colore, un materiale o un riferimento torinese che senti tuo?
3. **Autorizzazioni.** Posso descrivere il progetto F1 per settore con mockup ricreati? Redergo Sales e Redergo Hub si possono raccontare pubblicamente e fino a che profondità? I numeri di Refattura (12.000+) sono pubblicabili e aggiornati?
4. **Ruolo sui siti in archivio.** Lampante, Boero Trucks, A Tavola, Rekupero, Football Royale: design e sviluppo tuoi, o solo build su design altrui?
5. **Plugin HTML to Figma.** Quante installazioni? Il sorgente può essere pubblico?
6. **Dominio e hosting.** Che dominio vuoi usare? Cloudflare Workers via OpenNext, Vercel Pro o VPS tuo? Umami self-hosted ti va?
7. **Materiale personale.** Hai fotografie tue di qualità, sketch di processo, i lavori 3D degli anni IAAD? Foto di Torino?
8. **Lab.** Sei disposto a mantenerlo (otto pezzi al lancio, uno ogni uno o due mesi)? Quali dei candidati in `04-content-strategy.md` sezione 4.3 ti piacciono?
9. **Writing.** Ti va di scrivere tre saggi al lancio (spec-driven in team, HTML to Figma, accuratezza dell'estrazione su 12.000 fatture) o preferisci partire senza sezione Writing?
10. **Disponibilità.** Come vuoi trattare il "socio ma aperto a opportunità"? Riga in About e Now, come suggerisce il report, o niente del tutto?
11. **Suono.** Sì con toggle, o no?
12. **Nome.** "Edoardo Baravaglio" ovunque, o "edoraba" come marchio?
13. **Repo pubblica.** La creo io su github.com/edoraba (nome proposto: `portfolio`) o la crei tu e la collego?
