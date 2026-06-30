# CLAUDE.md — Portfolio Project Context

## What this is

Single-page personal portfolio for **Luka Đelošević** hosted on GitHub Pages at `lukaftnkm.github.io`. **No build step** — React 18 + Babel are loaded from CDNs and the app is authored in plain `.jsx` files compiled in the browser.

## Owner

- **Name:** Luka Đelošević
- **Role:** MSc ECE student + co-founder of Sokolus & TripVice
- **Email:** djelosevicluka002@gmail.com
- **Phone:** +381 65 861 0815
- **GitHub:** lukaftnkm
- **LinkedIn:** luka-djelosevic

## Key facts to preserve

- University: Faculty of Technical Sciences, University of Pristina (FTN, Kosovska Mitrovica)
- Erasmus exchange: Universidad de Vigo, Spain (2025)
- Startup 1: **Sokolus** — co-founded with ikuDev team of 3; live at sokolus.rs; role co-founder & CPO
- Startup 2: **TripVice** — smart trip finder for budget travelers (flights + hotels + activities + eSIMs); built by **BLDxp** (Bogdan, Luka, Djordje); live at tripvice.net and bldxp.pages.dev
- Award: **1st place, InnovNation Serbia 2025** (Student Teams category)
- Event: **Web Summit Qatar 2026** speaker/pitcher
- Degree progress: BSc completed 2025 (240 ECTS, GPA 8.09, module Computing & Informatics); MSc in progress 2025–present
- Certificates: 3× EIT Higher Education Initiative trainings (2025), SoftUni JavaScript (2024), BSc Diploma; InteRussia program (Novosibirsk, AI in Medicine)

## Architecture (no build system)

`index.html` is the shell: it holds **all CSS** (in one `<style>`), the boot/tweaks bootstrap script, a `#root` div, and `<script type="text/babel" src="...">` tags that load four JSX files **in order**:

| File | Contents |
|---|---|
| `tweaks-panel.jsx` | The floating Tweaks panel + its primitives |
| `fx.jsx` | Motion/interaction primitives: `Reveal`, `Magnetic`, `Counter`, `Typewriter`, `Scramble`, `useCardFx`, `useScrollProgress`, `useActiveSection`, `AnimatedBar`, `BootSequence`, `LiveClock`, Konami, confetti |
| `sections.jsx` | Section components: `About`, `Sokolus` (Projects), `Education`, `Awards`, `Certificates`, `Contact`, `Footer` — exported via `Object.assign(window, {...})` |
| `app.jsx` | `Nav`, `Hero`, `App` composition, `TWEAK_DEFAULTS`, and `ReactDOM.createRoot(...).render(<App/>)` |

Babel compiles each `<script type="text/babel">` as a **classic script** (not a module), so top-level `function` declarations are global and shared across files. Files must stay loaded in the order above.

## Design system (actual)

| Token | Value |
|---|---|
| Primary bg | `#08090b` (`--bg`) |
| Secondary bg | `#0c0e11` (`--bg-2`) |
| Panel | `rgba(255,255,255,0.02)` (`--panel`) |
| Accent | **lime `#c5ff36`** (`--accent`) — user-tweakable |
| Text | `#e8ebe4` (`--text`) + dim/faint variants |
| Danger | `#ff5d4d` |
| Mono font | **JetBrains Mono** (also IBM Plex Mono, Geist Mono via Tweaks) |

The accent and mono font are user-tweakable through the Tweaks panel and persisted in `localStorage` (`luka-tweaks`). There is no Outfit font and no cyan — keep the dark terminal aesthetic with the lime accent.

## Sections (render order in app.jsx)

Hero → Projects `01` → Recognition/Awards `02` → About `03` → Education `04` → Certificates `05` → Contact `06` → Footer.

- Each section: `<section className="section" id="..." data-screen-label="...">` with `<SectionHead num label />` + `<Reveal as="h2" className="section-title">`.
- Nav (`app.jsx`) lists numbered links; a new section must be added to the `links` array (its id auto-joins `useActiveSection`) and rendered in `App`.
- Projects `01` shows **Sokolus** and **TripVice** as side-by-side cards.
- Scroll reveal uses the `.reveal` → `.in` class pattern via IntersectionObserver (the `Reveal` component in `fx.jsx`).
- Pointer FX: `.project-card`, `.award-card`, `.cert-card` get 3D tilt + spotlight via `useCardFx`; the `.reveal.<card>` transition override in `index.html` keeps the tilt snappy.

### Certificates section (`05`)

`Certificates` (in `sections.jsx`) renders two groups — **A: Certificates & Trainings** and **B: Programs & Participations** — as `.cert-card` grids. Each item is `{ type, title, issuer, date, href, cta? }`; a card becomes a link (opens in a new tab, shows the `cta` / "view certificate" affordance) only when `href` is set. Certificate PDFs live in `certificates/` and are linked by relative path — see `certificates/README.md` for the expected filenames.

## Deployment

- Repo: `https://github.com/lukaftnkm/lukaftnkm.github.io`
- Branch `main` → GitHub Pages auto-deploys. No CI, no build step — push and it's live.
- The site **must be served over HTTP** (Babel fetches the `.jsx` files); `file://` is blocked by CORS. For local preview: `python -m http.server 8000` then open `http://127.0.0.1:8000`.

## Editing guidelines

- Keep CSS in `index.html`; keep components in the JSX files. Don't introduce a build step or framework bundler.
- Maintain the dark terminal aesthetic and the lime accent (`--accent`).
- Reuse existing primitives (`Reveal`, `SectionHead`, `useCardFx`, `Magnetic`, `Counter`) rather than re-implementing motion.
- Section labels follow `// Name`; section numbers `01`…`06` track render order — renumber consistently when inserting a section.
- Mobile breakpoints in use: 980/900px (stack grids, hide nav links), 720/600/560px (tighten spacing, hamburger-less compact nav, single-column grids).
