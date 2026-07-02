---
name: luka.dev — Personal Portfolio
description: Terminal-native personal portfolio — lime phosphor on near-black glass, JetBrains Mono throughout, everything alive.
colors:
  terminal-black: "#08090b"
  console-panel: "#0c0e11"
  panel-wash: "#FFFFFF05"
  phosphor-white: "#e8ebe4"
  phosphor-dim: "#E8EBE494"
  phosphor-dimmer: "#E8EBE45C"
  phosphor-faint: "#E8EBE42E"
  hairline: "#E8EBE414"
  hairline-strong: "#E8EBE429"
  phosphor-lime: "#c5ff36"
  lime-ink: "#0a0b0a"
  alert-red: "#ff5d4d"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(64px, 12vw, 168px)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(40px, 5.5vw, 76px)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(20px, 2.4vw, 28px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "48px"
  xl: "64px"
  section: "110px"
components:
  button-primary:
    backgroundColor: "{colors.phosphor-lime}"
    textColor: "{colors.lime-ink}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.phosphor-white}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  chip:
    backgroundColor: "{colors.panel-wash}"
    textColor: "{colors.phosphor-dim}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  project-card:
    backgroundColor: "{colors.panel-wash}"
    textColor: "{colors.phosphor-white}"
    rounded: "{rounded.lg}"
    padding: "32px 28px"
  terminal:
    backgroundColor: "{colors.console-panel}"
    textColor: "{colors.phosphor-white}"
    rounded: "{rounded.lg}"
---

# Design System: luka.dev

## 1. Overview

**Creative North Star: "The Live Terminal"**

The site is a running machine the visitor is logged into. It boots, it has a shell you can actually type into, a clock ticking Belgrade time, pulsing status dots, and a cursor that blinks. Nothing is decoration pretending to be a terminal; the terminal artifacts (scanlines, phosphor tint, mono type) frame real interactivity. The playfulness is the proof of engineering skill — per PRODUCT.md, "the site is the proof."

The system explicitly rejects the generic template portfolio: no centered hero with icon-card grids, no purple gradients, no stock photography, no sterile corporate white. It equally rejects costume terminals: if an element looks alive (a dot, a bar, a cursor), it must actually be running.

**Key Characteristics:**
- Single mono family (JetBrains Mono) carrying the entire hierarchy through weight and scale contrast (800 display down to 400 body).
- One saturated accent — phosphor lime `#c5ff36` — on a near-black, green-tinted neutral field (Committed color strategy).
- Flat surfaces separated by hairline borders; depth comes from glow, not shadow.
- Ambient motion everywhere, but every loop respects calm mode, `prefers-reduced-motion`, and pauses when the tab hides.
- The accent and font are user-tweakable at runtime (Tweaks panel, persisted in `localStorage`); the system must look right under any accent hue.

## 2. Colors

A phosphor CRT palette: one lime voice over green-tinted blacks and whites.

### Primary
- **Phosphor Lime** (#c5ff36): the machine's live signal. Prompts, active nav, status dots, counters, key words inside headlines, primary button fill, glows and spotlights. Softened via `color-mix(... 18%, transparent)` for ambient glow (`--accent-soft`). User-tweakable; never hardcode it — always `var(--accent)`.
- **Lime Ink** (#0a0b0a): text sitting on a lime fill (primary button, selection).

### Neutral
- **Terminal Black** (#08090b): page background (`--bg`).
- **Console Panel** (#0c0e11): raised panels — terminal windows, award card (`--bg-2`).
- **Panel Wash** (rgba(255,255,255,0.02)): barely-there card fill (`--panel`).
- **Phosphor White** (#e8ebe4): primary text. Deliberately green-tinted, never `#fff`.
- **Phosphor Dim / Dimmer / Faint** (58% / 36% / 18% alpha of #e8ebe4): secondary text, metadata, and decorative grid lines respectively.
- **Hairline / Hairline Strong** (8% / 16% alpha of #e8ebe4): the border system; nearly every boundary is one of these two.

### Named Rules
**The Phosphor Rule.** Pure `#fff` and pure `#000` are forbidden. Every neutral is tinted toward the green phosphor family (#e8ebe4 / #08090b).
**The Live Accent Rule.** The accent is a variable, not a color. Always `var(--accent)`; derive tints with `color-mix`. A hardcoded `#c5ff36` in CSS breaks the Tweaks panel contract (SVG art is the one tolerated exception).
**The Alert Exception.** Alert Red (#ff5d4d) appears only for errors (shell `command not found`) and the red traffic-light dot. It never decorates.

## 3. Typography

**Display Font:** JetBrains Mono (ui-monospace fallback)
**Body Font:** JetBrains Mono (same family — deliberate)
**Label/Mono Font:** JetBrains Mono, swappable to IBM Plex Mono or Geist Mono via Tweaks

**Character:** One mono voice at wildly different volumes. Hierarchy is carried entirely by weight (800 → 400), scale (168px → 11px), and tight negative tracking at large sizes — never by a second family.

### Hierarchy
- **Display** (800, clamp(64px, 12vw, 168px), 0.88, -0.055em): the hero name only.
- **Headline** (700, clamp(40px, 5.5vw, 76px), 0.95, -0.04em): section titles, one lime-accented word each, `text-wrap: balance`.
- **Title** (600–700, clamp(20–28px, ~2.4vw, 28–52px), 1.2): card and timeline headings.
- **Body** (400, 14px base / 16–17px prose, 1.55–1.7): prose capped at 46–56ch. `<strong>` runs 500–600 in Phosphor White with a lime underline wash in About prose.
- **Label** (500, 10–12px, 0.05–0.08em tracking, UPPERCASE): section heads, chips, stat labels, dates.

### Named Rules
**The One Font Rule.** A second typeface family is prohibited. If hierarchy fails, push weight and size further apart (≥1.25 scale ratio), don't add a font.
**The Tracking Slope Rule.** Tracking is negative and proportional to size: -0.055em at display, -0.04em at headline, ~0 at body, positive (+0.05–0.08em) at uppercase labels.

## 4. Elevation

The system is flat. Depth is conveyed by hairline borders, background steps (Terminal Black → Console Panel → Panel Wash), and lime glow — not by shadow stacks. The single true drop shadow in the system belongs to terminal windows (`0 30px 80px rgba(0,0,0,.5)`), which float above the page like focused OS windows. Interactive cards lift via 3D tilt and a pointer-tracking lime spotlight, never via shadow growth.

### Shadow Vocabulary
- **Window float** (`box-shadow: 0 30px 80px rgba(0,0,0,.5), inset ring`): terminal panels only.
- **Signal glow** (`box-shadow: 0 0 8–12px var(--accent)`): live dots and the nav progress bar.

### Named Rules
**The Glow-Not-Shadow Rule.** Emphasis glows lime; it does not cast gray. If an element needs "elevation," give it a hairline border and a background step.

## 5. Components

### Buttons
- **Shape:** Softly rounded (8px), mono 13px/500, 14px 22px padding (≥44px tall — touch-safe).
- **Primary:** lime fill, Lime Ink text, weight 600; hover lightens fill via `color-mix(85%, white)` and lifts -1px.
- **Ghost:** transparent with Hairline Strong border; hover turns border and text lime.
- **Behavior:** magnetic drift toward the pointer (hover-capable devices only); trailing `→` / `↗` arrow nudges on hover.

### Chips
- **Style:** pill (999px), Panel Wash fill, Hairline Strong border, 11px dim text, leading 5px lime dot.
- **State:** static credentials markers; not interactive, no hover state.

### Cards / Containers
- **Corner Style:** 12px (project, cert, lang), 16px (award, art panels).
- **Background:** Panel Wash over Terminal Black; award card uses Console Panel plus a lime-to-transparent 1px gradient ring.
- **Shadow Strategy:** none (see Elevation); hover sharpens border to Hairline Strong.
- **Pointer FX:** 3D tilt (max 5–7°) plus a lime radial spotlight tracking the cursor (`--mx`/`--my`); disabled in calm mode, reduced motion, and on touch.
- **Internal Padding:** 22–40px, denser on smaller cards.

### Inputs / Fields
- The only input is the hidden mini-shell field: invisible (opacity 0) behind a rendered prompt line with a blinking block cursor; 16px font so iOS never zooms. Errors print in Alert Red as shell output.

### Navigation
- **Style:** fixed, blurred (`backdrop-filter: blur(12px)`) 70% Terminal Black, hairline bottom border, 2px lime scroll-progress bar with glow.
- **Links:** `01 projects` pattern — dim number + label, 12px; hover brightens, active turns lime (scroll-spy).
- **Mobile (≤900px):** links become a horizontally scrollable strip under the brand row (no hamburger); edges fade via mask to signal overflow.

### The Terminal Window (signature)
Console Panel body, 12px radius, traffic-light dots (the one place foreign colors are allowed: #ff5f57 / #febc2e / #28c840), 11px dim title, window-float shadow. Contents are real: typewriter output in the hero, an interactive shell in About. If it renders a prompt, it must accept input or animate output — never a static screenshot of fake code.

## 6. Do's and Don'ts

### Do:
- **Do** use `var(--accent)` for every lime appearance; the Tweaks panel can recolor the whole site at runtime.
- **Do** give every new animation a calm-mode gate, a `prefers-reduced-motion` kill, and inclusion in the `body[data-paused]` pause net. PRODUCT.md: "motion respects the visitor" is non-negotiable.
- **Do** keep every interactive target ≥44px on touch and reachable without hover.
- **Do** carry hierarchy with weight and scale inside JetBrains Mono (800/700/600/400; ≥1.25 ratio between steps).
- **Do** keep sections numbered (`01`–`06`) and renumber consistently when inserting one.

### Don't:
- **Don't** use cyan, the Outfit font, or a light theme — PRODUCT.md names all three as fixed anti-references.
- **Don't** build "generic template portfolio" patterns: centered icon-card grids, purple gradients, stock photography, buzzword copy.
- **Don't** use pure `#fff`/`#000` (The Phosphor Rule) or gray drop shadows for emphasis (The Glow-Not-Shadow Rule).
- **Don't** add gradient text, side-stripe borders, or glassmorphism cards; the only blur in the system is the nav and Konami backdrop.
- **Don't** render fake terminal content. A prompt that can't type is costume; every live-looking element must actually run.
