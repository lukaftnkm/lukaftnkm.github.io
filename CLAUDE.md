# CLAUDE.md — Portfolio Project Context

## What this is

Single-page personal portfolio for **Luka Đelošević** hosted on GitHub Pages at `lukaftnkm.github.io`. No build system — everything is plain HTML, CSS, and vanilla JS in `index.html`.

## Owner

- **Name:** Luka Đelošević
- **Role:** MSc ECE student + co-founder of Sokolus
- **Email:** djelosevicluka002@gmail.com
- **GitHub:** lukaftnkm
- **LinkedIn:** luka-djelosevic

## Key facts to preserve

- University: Faculty of Technical Sciences, University of Pristina (FTN Pristina)
- Erasmus exchange: Universidad de Vigo, Spain (2025)
- Startup: **Sokolus** — co-founded with ikuDev team of 3; live at sokolus.rs
- Award: **1st place, InnovNation Serbia 2025** (Student Teams category)
- Event: **Web Summit Qatar 2026** speaker/pitcher
- Degree progress: BSc completed 2021–2025, MSc in progress 2025–present

## Design system

| Token | Value |
|---|---|
| Primary bg | `#0a0e17` |
| Card bg | `#141c2e` |
| Accent (cyan) | `#00d4ff` |
| Accent (purple) | `#7c3aed` |
| Accent (green) | `#10b981` |
| Accent (amber) | `#f59e0b` |
| Text primary | `#e8ecf4` |
| Text secondary | `#8b95a8` |
| Body font | Outfit (Google Fonts) |
| Mono font | JetBrains Mono (Google Fonts) |

## Deployment

- Repo: `https://github.com/lukaftnkm/lukaftnkm.github.io`
- Branch `main` → GitHub Pages auto-deploys
- No CI, no build step — push HTML and it's live

## Editing guidelines

- Keep everything in `index.html` unless a new page is explicitly requested
- Maintain the dark-theme aesthetic and cyan accent color
- Section order: Hero → About → Startup → Education → Skills → Recognition → Contact
- Section labels follow the pattern `01 — Name` through `06 — Name`
- Scroll reveal uses the `.reveal` / `.visible` class pattern via IntersectionObserver
- Mobile breakpoints: 900px (hide terminal, stack grids) and 600px (hamburger nav)
