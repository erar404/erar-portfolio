# DESIGN.md

## Scene
A hiring manager on a 13-inch laptop at a desk in an office with mixed daylight, skimming in the afternoon. The portrait was shot on a dark studio backdrop. Dark, warm charcoal surfaces with brass-toned accents let the portrait sit naturally and give the enterprise work a "machined tool" gravity, while high-contrast type keeps it readable in daylight.

## Color strategy
Committed. One warm brass accent carries the identity across hero, section markers, and interactive states. Neutrals are tinted toward the accent hue.

Tokens (OKLCH):
- --bg: oklch(0.17 0.008 70)        charcoal ground
- --bg-raised: oklch(0.21 0.009 70)
- --bg-sunken: oklch(0.14 0.007 70)
- --line: oklch(0.30 0.012 70)
- --ink: oklch(0.95 0.01 80)         primary text
- --ink-muted: oklch(0.72 0.014 75)
- --ink-faint: oklch(0.55 0.012 75)
- --brass: oklch(0.78 0.13 80)       accent
- --brass-strong: oklch(0.68 0.14 75)
- --brass-ink: oklch(0.20 0.05 80)   text on brass
- --signal-green: oklch(0.75 0.14 150)

## Typography
- Display: "Bricolage Grotesque" (Google Fonts) at weights 500 to 800, optical size axis. Wide, slightly quirky grotesque; industrial but friendly.
- Body: "Geist" (Google Fonts) 400 to 600.
- Mono labels: "Geist Mono" for tech-stack chips, dates and small metadata only.
- Scale: 1.333 ratio. Body 1rem / 1.6. Headline clamp(2.6rem, 6vw, 5.5rem) with tight tracking (-0.03em).

## Spacing
Section padding clamp(5rem, 12vh, 9rem). Content max width 1180px. Long-form text max 68ch.

## Elevation
Flat surfaces separated by 1px lines and background tint steps. No drop shadows on cards; a single soft glow on the brass CTA hover only.

## Components
- Section marker: number + label in mono, left aligned, followed by an oversized display heading.
- Project entry: alternating media/text rows, not a uniform card grid. Screenshot sits in a device-ish frame with 1px line and 12px radius.
- Tech chips: 1px line, mono, uppercase 11px, tracking 0.08em.
- Buttons: brass fill pill for primary, 1px line pill for secondary.

## Motion
- Entrance: opacity + 24px translateY, 700ms, cubic-bezier(0.16, 1, 0.3, 1), stagger 60ms capped at 8 items.
- Hover: 200ms, translateY(-2px) on interactive rows; brass line grows from 0 to 100% width under nav links.
- Scroll: thin brass progress bar at top; hero portrait parallax 6%.
- Reduced motion: opacity-only fades, 200ms.
