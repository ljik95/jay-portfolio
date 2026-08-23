# Jay Thom — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://jaythom.dev)

Personal portfolio for **Jay Thom**, a Senior Software Engineer with 7 years shipping
full-stack production software. Editorial layout on warm paper, one accent color, and
motion that supports the reading rather than performing over it.

**→ [Live Site](https://jaythom.dev)**

---

## Design system

Everything is driven by tokens in `src/styles/tokens.css` — change a value there and it
propagates through every section.

| | |
| --- | --- |
| **Surface** | Warm newsprint (`#f2efe9`) with a low-opacity SVG grain, and one inverted spread for the closing contact section |
| **Ink** | A four-step ramp — heading, body, muted, faint — all at or above 4.5:1 on paper, plus a separate `--ink-whisper` reserved for non-text ornament |
| **Accent** | Exactly one: vermillion `#b83a1a` on paper, lightened to `#e8613a` where it carries text on the dark spread |
| **Type** | Newsreader (variable, 500 for display) for headings, Inter for body, JetBrains Mono for metadata. Self-hosted via `@fontsource`, so first paint never waits on a third-party origin |
| **Scale** | Fluid `clamp()` throughout — no typographic breakpoints |
| **Rhythm** | 8pt spacing scale; hairline rules carry the structure instead of card borders |

## Motion

A small shared vocabulary (`src/lib/motion.jsx`), reused everywhere:

- **`Reveal`** — content rises ~22px and fades in as it enters the viewport.
- **`MaskLine`** — a line of display type slides up out of an `overflow: hidden` mask.
- **`SplitWords`** — the same, word by word with a slight rotation, for section titles.
- **`Magnetic`** — leans toward the pointer while it is nearby, then springs back.

Keeping the vocabulary this small is deliberate: a page where every element enters
differently reads as a demo. The trigger lives on the mask *wrapper*, not on the
travelling span — a clipped element never intersects the viewport, so an observer
attached to it would wait forever. `SplitWords` animates words, never letters: per-letter
motion on a heading shreds the line for screen readers, so the full string stays in an
`sr-only` node and the animated words are hidden from the a11y tree.

Set pieces:

| | |
| --- | --- |
| **`Curtain`** | A paper panel over first paint that lifts after ~820ms. Never blocks content — everything is painted underneath. Once per session via `sessionStorage`. |
| **`TypeLine`** | The hero statement types itself out. Every character is in the DOM from frame one and untyped ones are dimmed, so nothing is appended, the line never reflows, and there is no layout shift to pay for. |
| **`HeroGrid`** | The layout's own twelve-column frame, drawn in once on load, then still. |
| **`Marquee`** | A band of the stack that drifts sideways and reacts to scroll velocity — it speeds up, skews, and reverses with the reader. |
| **`Cursor`** | A small ink dot under the pointer with a hairline ring lagging on a spring. Built from the page's own parts — one-pixel rules, one accent, mono micro-labels; no filled discs. It opens up over links, sets an `Open` / `Close` label beside itself on the work rows, and flips to paper tones over the inverted closing spread. |

`Work` opens its first row a beat after the list scrolls into view, so the visitor
watches the accordion open and learns the rows are interactive — and it backs off if
they have already opened one themselves.

Everything is gated behind `prefers-reduced-motion`: `MotionConfig reducedMotion="user"`
drops transforms while keeping opacity fades, CSS keyframes are neutralized in
`styles/base.css`, the curtain and custom cursor do not render at all, the typed line
appears complete on the first frame, and the marquee falls back to a static row.

## Accessibility

- Every text/background pair meets WCAG AA (4.5:1 body, 3:1 large).
- Skip link, visible focus ring on every interactive element, logical tab order.
- The work accordion is a real `<button>` with `aria-expanded` / `aria-controls`;
  the mobile menu traps scroll and closes on <kbd>Esc</kbd>.
- Active nav state is mirrored with `aria-current`, not color alone.
- The custom cursor is additive only, gated behind `(hover: hover) and (pointer: fine)`
  along with the rule that hides the native arrow — touch and stylus are unaffected, and
  no interaction depends on the ring being visible.

## Structure

```
src/
├── components/     Curtain · Cursor · Navbar · Hero · HeroGrid · TypeLine · About
│                   Work · Marquee · Experience · Skills · Contact · Footer
├── lib/motion.jsx  Reveal, MaskLine, SplitWords, Magnetic, SectionIndex, SectionHead
├── styles/
│   ├── tokens.css      color, type, spacing, motion — the whole system
│   ├── base.css        reset, paper grain, focus, reduced motion
│   ├── layout.css      shell, section header, buttons, shared primitives
│   └── components.css  per-section styles
└── main.jsx        self-hosted fonts + mount
```

## Running locally

```bash
git clone https://github.com/ljik95/jay-portfolio.git
cd jay-portfolio
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # production build
npm run preview      # preview the build locally
```

## Contact

**Jay Thom** — Senior Software Engineer

- Email: [ljik95@gmail.com](mailto:ljik95@gmail.com)
- LinkedIn: [linkedin.com/in/jongikthom](https://linkedin.com/in/jongikthom)
- GitHub: [github.com/ljik95](https://github.com/ljik95)
