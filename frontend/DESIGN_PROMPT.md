# VoiceBrief — UI Redesign Prompt

## Goal
Redesign the VoiceBrief frontend in a **Swiss / International Typographic Style** direction:
minimal, editorial, confident, and design-literate. Strip every "AI-generated SaaS" tell
and replace them with restraint, type, and grid. The result should look like it was made by
someone with taste, not assembled from effect presets.

## North star
Think a print editorial layout or a design studio's index page — not a dashboard.
Whitespace is the primary design element. Typography does the work. Color is almost absent.

---

## Hard rules

**Remove entirely** (these are the current "vibe-coded" tells):
- Glassmorphism / `backdrop-filter` blur on cards and header
- Gradient text (`.gradient-text`), animated gradient backgrounds (`.gradient-bg`)
- Glow / box-shadow halos (`.glow-teal`, `.glow-red`, `--shadow-glow`)
- Confetti, `celebrate`, `float`, `pulse-glow` animations
- The red→orange waveform; teal everywhere
- Drop shadows on cards (`--shadow-card`, large soft shadows)
- Emoji used as UI icons (🗑 📝 ⏳ ✅) — replace with text labels or 1px line icons

**Keep / enforce:**
- Flat surfaces. Depth comes from **hairline 1px rules**, not shadows.
- Near-zero border radius (0–2px). No pill buttons, no big rounded cards.
- One accent color, used sparingly (links, single CTA, active state only).
- Generous, consistent spacing on a strict grid.

---

## Design tokens (replace `:root` in `src/index.css`)

```
Canvas / paper      #FFFFFF  (or #FAFAFA for a softer paper)
Ink (primary text)  #0A0A0A
Secondary text      #6B6B6B
Muted / meta        #9A9A9A
Hairline rule       #E6E6E6
Hover surface       #F4F4F4
Accent (single)     #E5462B   ← Swiss vermilion. Used ONLY for the primary action,
                                links, and the "processing/active" mark. Swappable to
                                ink-black if you want zero color.
Success / done      inherits ink (a "COMPLETE" label, not a green badge)
Error               #C0392B
```

Radius: `--radius: 2px` (one value, used rarely). Remove the radius scale.
Shadows: delete all shadow tokens.

## Typography
- **Display / headings:** a grotesque — Inter Tight, Neue Haas Grotesk, Helvetica Now,
  or ABC Diatype. Tight leading (1.05–1.15), slightly negative letter-spacing on large sizes.
- **Body:** Inter / system grotesque, 1.5 leading.
- **Metadata, timestamps, status, list indices:** a monospace (e.g. `ui-monospace`,
  `IBM Plex Mono`, `Geist Mono`) at small size, uppercase, wide tracking.
- Establish a real scale: e.g. 48/32/20/16/13px. Big jumps between levels.
- Left-aligned everywhere. No centered hero text.

## Layout & grid
- Max content width ~960px, but generous outer margins (don't fill the viewport).
- A visible structural grid feel: section labels in the left margin, content to the right.
- Separate sections with **1px hairline rules**, not cards-with-shadows.
- Numbered lists (`01`, `02`, `03`) for the notes — editorial index style.

## Motion
- Minimal and fast. Opacity + small translateY fades, 120–180ms, standard easing.
- Processing state = a thin **indeterminate hairline** or a blinking monospace caret /
  cycling dots — NOT a colored pulsing badge.
- No floating, no confetti, no celebration pops, no glows.

---

## Screen-by-screen (current files → intended treatment)

**Header** (`components/dashboard/Header.tsx`)
- Wordmark in plain ink type (no gradient, no glowing logo circle). "voicebrief" or
  "VoiceBrief" set tight. Hairline bottom rule instead of blurred sticky bar.
- User: small monospace initials or name, a plain text "Log out" link — no gradient avatar.

**Hero** (`components/dashboard/HeroSection.tsx`)
- Demote drastically. Large left-aligned headline + one line of secondary text. No centered
  block, no gradient, no animation. Or fold it into a simple page title.

**Record + Upload** (`RecordCard.tsx`, `UploadCard.tsx`)
- Not two glassy "flashcards." Render as two restrained actions on one hairline-bordered row,
  or as text-forward buttons: `[ Record ]` (filled, accent) and `Upload a file` (text/ghost).
- Recording state: monospace running timer + a minimal hairline level meter (flat, ink/gray),
  not the red gradient waveform.
- Upload progress: the thin hairline progress bar already added — restyle to ink/accent, flat.

**Notes list** (`JobsList.tsx`)
- Editorial index: numbered rows (`01`, `02`…), filename/title in ink, status as a small
  **monospace uppercase label** right-aligned (`COMPLETE`, `WORKING…`, `FAILED`).
- Rows separated by hairline rules; hover = `#F4F4F4` surface fill, no lift/shadow.
- View = text link; Delete = small "×" or "Delete" text link, not an emoji button.
- Pagination: minimal `← Prev / Next →` text links with `01 / 03`-style mono counter.

**Result panel** (`ResultPanel.tsx`)
- Treat like a printed article: large title, summary as readable prose column, Key Points and
  Action Items as clean lists with hairline section dividers and small mono section labels
  ("KEY POINTS", "ACTION ITEMS"). No card chrome, no glow.

**Auth pages** (`pages/Login.tsx`, `pages/Signup.tsx`)
- Single left-aligned column, generous whitespace. Inputs = bottom-hairline-underline or a
  thin full border, square corners, no glow on focus (focus = accent underline / 1px accent
  border). One filled accent submit button.

**Landing** (`pages/Landing.tsx`)
- Big editorial headline, lots of air, one accent CTA, hairline-separated sections. No animated
  gradient background, no floating elements.

---

## Acceptance check
- [ ] No blur, glow, gradient, confetti, or float anywhere in the codebase
- [ ] Palette ≤ 5 grays + 1 accent; accent appears in only a few places per screen
- [ ] Every section divided by 1px hairlines, zero drop shadows
- [ ] Monospace used for status / timestamps / indices; grotesque for headings
- [ ] Square (≤2px) corners throughout
- [ ] Reads as calm, typographic, and intentional at first glance
```
