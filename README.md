# Luka Đelošević — Personal Portfolio

Live at: [lukaftnkm.github.io](https://lukaftnkm.github.io)

## Overview

Personal portfolio website for Luka Đelošević — Master's student in Electrical & Computer Engineering, co-founder of [Sokolus](https://sokolus.rs) and [TripVice](https://tripvice.net), InnovNation Serbia 2025 winner, and Web Summit Qatar 2026 speaker.

Dark terminal aesthetic: lime phosphor accent on near-black, JetBrains Mono throughout, with a boot sequence, an interactive mini-shell, and a user-tweakable accent/font/motion panel.

## Stack

- React 18 (UMD from CDN) — no framework bundler
- Components authored in plain `.jsx`, precompiled to `dist/*.js` with Babel (`npm run build`)
- All CSS lives in a single `<style>` block in `index.html`
- Font: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (IBM Plex Mono / Geist Mono selectable via the Tweaks panel)

## Structure

```
/
├── index.html         # Shell: all CSS, meta, script tags
├── tweaks-panel.jsx   # Floating Tweaks panel + form primitives
├── fx.jsx             # Motion/interaction primitives (Reveal, Typewriter, tilt, boot…)
├── sections.jsx       # Section components
├── app.jsx            # Nav, Hero, App composition + render
├── dist/              # Precompiled JS (generated — run `npm run build` after editing .jsx)
├── certificates/      # Certificate PDFs linked from the Certificates section
└── images/            # Static assets (og card, …)
```

## Sections

1. **Hero** — intro, rotating title, live terminal
2. **Projects** `01` — Sokolus and TripVice side by side
3. **Recognition** `02` — InnovNation 2025 award + languages
4. **About** `03` — background, interactive shell, stats
5. **Education** `04` — BSc → Erasmus (Universidad de Vigo) → MSc timeline
6. **Certificates** `05` — trainings, certificates, and programs (linked PDFs)
7. **Contact** `06` — email, phone, LinkedIn, GitHub, startups

## Development

```
npm install          # once
npm run build        # compile .jsx → dist/ (run after every .jsx edit)
npm run watch        # or keep Babel recompiling on save
python -m http.server 8000   # serve locally (must be HTTP, not file://)
```

## Deployment

Hosted via GitHub Pages. Pushing to `main` deploys automatically — remember to build (commit the updated `dist/`) before pushing `.jsx` changes.
