# Design System Mapping - Obsidian + Emerald

Source of truth: `_newLegacy/designSystem/v1_8.0_opusNT.html`

## Obsidian Scale

| Token           | Exact value | Primary use                                    |
| --------------- | ----------- | ---------------------------------------------- |
| `--bg-abyss`    | `#050607`   | Global page background                         |
| `--bg-deepest`  | `#08090a`   | Deep tracks, scrollbar track, low-depth panels |
| `--bg-deep`     | `#0c0d0f`   | Inputs, internal wells, deep surfaces          |
| `--bg-base`     | `#111214`   | Core cards, data points, base app surfaces     |
| `--bg-elevated` | `#18191c`   | Raised panels and secondary surfaces           |
| `--bg-surface`  | `#1e2023`   | Gradient card tops, tabs, table headers        |
| `--bg-overlay`  | `#222326`   | Popovers, tooltips, scrollbar thumb            |
| `--bg-hover`    | `#2a2b2f`   | Hover states                                   |
| `--bg-active`   | `#323338`   | Active rails, toggles, skeleton midpoint       |

## Emerald Scale

| Token                   | Exact value                | Primary use                     |
| ----------------------- | -------------------------- | ------------------------------- |
| `--emerald-50`          | `#ecfdf5`                  | Full tint reference             |
| `--emerald-100`         | `#d1fae5`                  | Full tint reference             |
| `--emerald-200`         | `#a7f3d0`                  | Light accent scale              |
| `--emerald-300`         | `#6ee7b7`                  | Badge text / light accent       |
| `--emerald-400`         | `#34d399`                  | Display numerals, active labels |
| `--emerald-500`         | `#10b981`                  | Primary accent core             |
| `--emerald-600`         | `#059669`                  | Primary gradient dark stop      |
| `--emerald-700`         | `#047857`                  | Progress fills / deeper accent  |
| `--emerald-800`         | `#065f46`                  | Deep emerald gradient stop      |
| `--emerald-900`         | `#064e3b`                  | Dark emerald reference          |
| `--emerald-glow`        | `rgba(16, 185, 129, 0.15)` | Soft emerald ambient glow       |
| `--emerald-glow-strong` | `rgba(16, 185, 129, 0.35)` | Strong emerald hover glow       |
| `--emerald-glow-subtle` | `rgba(16, 185, 129, 0.06)` | Tint wash / badge background    |

## Gold Scale

| Token                | Exact value                | Primary use                        |
| -------------------- | -------------------------- | ---------------------------------- |
| `--gold-50`          | `#fffbeb`                  | Full tint reference                |
| `--gold-100`         | `#fef3c7`                  | Full tint reference                |
| `--gold-200`         | `#fde68a`                  | Light accent scale                 |
| `--gold-300`         | `#fcd34d`                  | Badge text / light accent          |
| `--gold-400`         | `#fbbf24`                  | Display numerals, highlight labels |
| `--gold-500`         | `#f59e0b`                  | Secondary accent core              |
| `--gold-600`         | `#d97706`                  | Secondary gradient dark stop       |
| `--gold-700`         | `#b45309`                  | Progress fills / deeper accent     |
| `--gold-800`         | `#92400e`                  | Deep gold gradient stop            |
| `--gold-900`         | `#78350f`                  | Dark gold reference                |
| `--gold-glow`        | `rgba(245, 158, 11, 0.15)` | Soft gold ambient glow             |
| `--gold-glow-strong` | `rgba(245, 158, 11, 0.35)` | Strong gold hover glow             |
| `--gold-glow-subtle` | `rgba(245, 158, 11, 0.06)` | Tint wash / badge background       |

## Blue Scale

| Token                | Exact value                | Primary use                  |
| -------------------- | -------------------------- | ---------------------------- |
| `--blue-50`          | `#eff6ff`                  | Full tint reference          |
| `--blue-100`         | `#dbeafe`                  | Full tint reference          |
| `--blue-200`         | `#bfdbfe`                  | Light accent scale           |
| `--blue-300`         | `#93c5fd`                  | Badge text / light accent    |
| `--blue-400`         | `#60a5fa`                  | Display numerals, labels     |
| `--blue-500`         | `#3b82f6`                  | Info accent core             |
| `--blue-600`         | `#2563eb`                  | Gradient dark stop           |
| `--blue-700`         | `#1d4ed8`                  | Progress fills / deep accent |
| `--blue-800`         | `#1e40af`                  | Deep blue gradient stop      |
| `--blue-900`         | `#1e3a8a`                  | Dark blue reference          |
| `--blue-glow`        | `rgba(59, 130, 246, 0.15)` | Soft blue ambient glow       |
| `--blue-glow-strong` | `rgba(59, 130, 246, 0.35)` | Strong blue hover glow       |
| `--blue-glow-subtle` | `rgba(59, 130, 246, 0.06)` | Tint wash / badge background |

## Red Scale

| Token        | Exact value               | Primary use                    |
| ------------ | ------------------------- | ------------------------------ |
| `--red-400`  | `#f87171`                 | Error text / destructive hover |
| `--red-500`  | `#ef4444`                 | Destructive core               |
| `--red-600`  | `#dc2626`                 | Destructive gradient dark stop |
| `--red-glow` | `rgba(239, 68, 68, 0.15)` | Error tint / glow              |

## Text Scale

| Token              | Exact value | Primary use                   |
| ------------------ | ----------- | ----------------------------- |
| `--text-primary`   | `#f1f1f3`   | Main text                     |
| `--text-secondary` | `#a1a1aa`   | Supporting text               |
| `--text-tertiary`  | `#71717a`   | Lower-contrast text           |
| `--text-muted`     | `#52525b`   | Labels, meta text             |
| `--text-ghost`     | `#3f3f46`   | Faint helper text, chart axes |

## Borders

| Token              | Exact value                 | Primary use                    |
| ------------------ | --------------------------- | ------------------------------ |
| `--border-subtle`  | `rgba(255, 255, 255, 0.04)` | Hairline dividers              |
| `--border-default` | `rgba(255, 255, 255, 0.07)` | Default cards and inputs       |
| `--border-strong`  | `rgba(255, 255, 255, 0.12)` | Hover / stronger outlines      |
| `--border-emerald` | `rgba(16, 185, 129, 0.25)`  | Emerald glow cards and accents |
| `--border-gold`    | `rgba(245, 158, 11, 0.25)`  | Gold glow cards and accents    |
| `--border-blue`    | `rgba(59, 130, 246, 0.25)`  | Blue glow cards and accents    |

## Shadows

| Token                      | Exact value                                                           | Primary use                 |
| -------------------------- | --------------------------------------------------------------------- | --------------------------- |
| `--shadow-sm`              | `0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)`          | Base card shadow            |
| `--shadow-md`              | `0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)`          | Hover for lighter surfaces  |
| `--shadow-lg`              | `0 10px 25px rgba(0, 0, 0, 0.4), 0 6px 10px rgba(0, 0, 0, 0.3)`       | Popovers / larger panels    |
| `--shadow-xl`              | `0 20px 50px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)`      | Card hover state            |
| `--shadow-2xl`             | `0 30px 70px rgba(0, 0, 0, 0.6), 0 15px 30px rgba(0, 0, 0, 0.4)`      | Hero / mini dashboard shell |
| `--shadow-emerald`         | `0 0 20px rgba(16, 185, 129, 0.1), 0 0 60px rgba(16, 185, 129, 0.05)` | Emerald glow cards          |
| `--shadow-gold`            | `0 0 20px rgba(245, 158, 11, 0.1), 0 0 60px rgba(245, 158, 11, 0.05)` | Gold glow cards             |
| `--shadow-blue`            | `0 0 20px rgba(59, 130, 246, 0.1), 0 0 60px rgba(59, 130, 246, 0.05)` | Blue glow cards             |
| `--shadow-inner-highlight` | `inset 0 1px 0 rgba(255, 255, 255, 0.03)`                             | Top inner sheen             |
| `--shadow-inner-deep`      | `inset 0 2px 4px rgba(0, 0, 0, 0.3)`                                  | Inputs and deep wells       |
| `--shadow-card`            | `var(--shadow-inner-highlight), var(--shadow-sm)`                     | Derived default card shadow |
| `--shadow-card-hover`      | `var(--shadow-inner-highlight), var(--shadow-xl)`                     | Derived hover card shadow   |

## Text Shadows

| Token                         | Exact value                                                                                               | Primary use                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------- |
| `--text-glow-emerald-display` | `0 0 30px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)`                                      | Large emerald mono numerals |
| `--text-glow-gold-display`    | `0 0 30px rgba(245, 158, 11, 0.3), 0 0 60px rgba(245, 158, 11, 0.1)`                                      | Large gold mono numerals    |
| `--text-glow-blue-display`    | `0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)`                                      | Large blue mono numerals    |
| `--text-glow-emerald-stat`    | `0 0 20px rgba(16, 185, 129, 0.3), 0 0 50px rgba(16, 185, 129, 0.15), 0 0 100px rgba(16, 185, 129, 0.05)` | Emerald stat blocks         |
| `--text-glow-gold-stat`       | `0 0 20px rgba(245, 158, 11, 0.3), 0 0 50px rgba(245, 158, 11, 0.15), 0 0 100px rgba(245, 158, 11, 0.05)` | Gold stat blocks            |
| `--text-glow-blue-stat`       | `0 0 20px rgba(59, 130, 246, 0.3), 0 0 50px rgba(59, 130, 246, 0.15), 0 0 100px rgba(59, 130, 246, 0.05)` | Blue stat blocks            |

## Radius

| Token             | Exact value          | Primary use                        |
| ----------------- | -------------------- | ---------------------------------- |
| `--radius-sm`     | `6px`                | Badges, small pills, tiny controls |
| `--radius-md`     | `10px`               | Buttons, tabs, inputs              |
| `--radius-lg`     | `14px`               | Large buttons, toasts, tabs shell  |
| `--radius-xl`     | `18px`               | Cards, charts, major surfaces      |
| `--radius-2xl`    | `24px`               | Mini dashboard shell               |
| `--radius-full`   | `9999px`             | Pills, tracks, circular rails      |
| `--radius-card`   | `var(--radius-xl)`   | Semantic card alias                |
| `--radius-button` | `var(--radius-md)`   | Semantic button alias              |
| `--radius-input`  | `var(--radius-md)`   | Semantic input alias               |
| `--radius-badge`  | `var(--radius-sm)`   | Semantic badge alias               |
| `--radius-pill`   | `var(--radius-full)` | Semantic pill alias                |

## Motion

| Token               | Exact value                               | Primary use               |
| ------------------- | ----------------------------------------- | ------------------------- |
| `--ease-out-expo`   | `cubic-bezier(0.16, 1, 0.3, 1)`           | Default premium easing    |
| `--ease-out-back`   | `cubic-bezier(0.34, 1.56, 0.64, 1)`       | Small bounce interactions |
| `--ease-spring`     | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Springier reactions       |
| `--duration-fast`   | `150ms`                                   | Hover and small changes   |
| `--duration-normal` | `250ms`                                   | Default interactions      |
| `--duration-slow`   | `400ms`                                   | Larger reveals            |
| `--duration-slower` | `600ms`                                   | Ambient transitions       |

## Typography

| Token              | Exact value                                                                                                    | Primary use            |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `--font-body`      | `'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | Main UI font           |
| `--font-display`   | `var(--font-body)`                                                                                             | Display alias          |
| `--font-sans`      | `var(--font-body)`                                                                                             | Tailwind sans alias    |
| `--font-mono`      | `'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', 'Liberation Mono', monospace`          | Data and mono numerals |
| `--font-editorial` | `'Georgia', 'Times New Roman', 'Palatino Linotype', serif`                                                     | Editorial accent       |

Used font weights from the showcase: `300`, `400`, `500`, `600`, `700`, `800`.

## Type Scale

| Style             | Value                          | Primary use                |
| ----------------- | ------------------------------ | -------------------------- |
| `Display 1`       | `64px / 800 / -3px / 1.05`     | Hero and strongest headers |
| `Display 2`       | `48px / 700 / -2px / 1.1`      | Large section headers      |
| `Heading 1`       | `36px / 700 / -1.5px / 1.2`    | Top section titles         |
| `Heading 2`       | `28px / 600 / -1px / 1.25`     | Sub-section titles         |
| `Heading 3`       | `22px / 600 / -0.5px / 1.3`    | Local titles               |
| `Body Large`      | `18px / 400 / 1.7`             | Lead text                  |
| `Body`            | `15px / 400 / 1.7`             | Default paragraph          |
| `Body Small`      | `13px / 400 / 1.6`             | Secondary body copy        |
| `Caption / Label` | `11px / 500 / uppercase / 1px` | Labels and metadata        |
| `Mono Display`    | `56px / 700 / -2px`            | Signature numeric displays |
| `Mono LG`         | `32px / 600 / -1px`            | Large data values          |
| `Mono MD`         | `20px / 500`                   | Medium data values         |
| `Mono SM`         | `13px / 400`                   | Small data labels          |
| `Editorial`       | `24px / italic / 1.5`          | Editorial accent quote     |

## Key Semantic Aliases Kept

| Alias                     | Resolves to             | Why it stays                                            |
| ------------------------- | ----------------------- | ------------------------------------------------------- |
| `--bg-900`                | `var(--bg-deepest)`     | Existing app background convention                      |
| `--bg-card`               | `var(--bg-base)`        | Existing card token                                     |
| `--bg-card-hover`         | `var(--bg-surface)`     | Existing hover token                                    |
| `--bg-glass`              | `var(--bg-overlay)`     | Existing overlay token                                  |
| `--accent-primary`        | `var(--emerald-500)`    | Existing primary accent contract                        |
| `--accent-primary-bright` | `var(--emerald-400)`    | Existing hover/bright accent contract                   |
| `--accent-primary-dark`   | `var(--emerald-700)`    | Existing dark accent contract                           |
| `--accent-gold`           | `var(--gold-500)`       | Existing gold contract                                  |
| `--accent-gold-light`     | `var(--gold-400)`       | Existing gold hover contract                            |
| `--protein-*`             | emerald scale           | Existing macro semantic contract                        |
| `--carb-*`                | blue scale              | Existing macro semantic contract                        |
| `--fat-*`                 | gold scale              | Existing macro semantic contract                        |
| `--border`                | `var(--border-default)` | Preserves direct consumers and Tailwind `border-border` |
| `--accent`                | `var(--accent-primary)` | Preserves direct consumers and Tailwind `bg-accent`     |

## Shadcn Mapping

| Shadcn var                 | DietForge token    | Final value                 |
| -------------------------- | ------------------ | --------------------------- |
| `--background`             | `--bg-abyss`       | `#050607`                   |
| `--foreground`             | `--text-primary`   | `#f1f1f3`                   |
| `--card`                   | `--bg-card`        | `#111214`                   |
| `--card-foreground`        | `--text-primary`   | `#f1f1f3`                   |
| `--popover`                | `--bg-overlay`     | `#222326`                   |
| `--popover-foreground`     | `--text-primary`   | `#f1f1f3`                   |
| `--primary`                | `--emerald-500`    | `#10b981`                   |
| `--primary-foreground`     | literal            | `#ffffff`                   |
| `--secondary`              | `--gold-500`       | `#f59e0b`                   |
| `--secondary-foreground`   | literal            | `#1a1a1a`                   |
| `--muted`                  | `--bg-elevated`    | `#18191c`                   |
| `--muted-foreground`       | `--text-secondary` | `#a1a1aa`                   |
| `--accent-foreground`      | `--text-primary`   | `#f1f1f3`                   |
| `--destructive`            | `--red-500`        | `#ef4444`                   |
| `--destructive-foreground` | literal            | `#ffffff`                   |
| `--input`                  | `--border-default` | `rgba(255, 255, 255, 0.07)` |
| `--ring`                   | `--emerald-500`    | `#10b981`                   |
| `--radius`                 | `--radius-md`      | `10px`                      |
| `--chart-1`                | `--emerald-500`    | `#10b981`                   |
| `--chart-2`                | `--gold-500`       | `#f59e0b`                   |
| `--chart-3`                | `--blue-500`       | `#3b82f6`                   |
| `--chart-4`                | `--text-secondary` | `#a1a1aa`                   |
| `--chart-5`                | `--text-muted`     | `#52525b`                   |

## Atmosphere

- `body::before` uses the showcase noise texture verbatim: inline SVG, `feTurbulence` fractal noise, `baseFrequency='0.9'`, `numOctaves='4'`, `background-size: 256px 256px`, `opacity: 0.025`.
- `body::after` uses four fixed radial gradients:
  - emerald at `15% 10%` with `rgba(16, 185, 129, 0.03)`
  - blue at `85% 20%` with `rgba(59, 130, 246, 0.02)`
  - gold at `50% 60%` with `rgba(245, 158, 11, 0.015)`
  - emerald at `30% 90%` with `rgba(16, 185, 129, 0.02)`
- `#app` sits at `z-index: 1` so content stays above the atmospheric orbs.
- Scrollbar mirrors the showcase: `8px` width, `--bg-deepest` track, `--bg-overlay` thumb, `2px` deep border, hover to `--bg-hover`.
- `::selection` was added by implementation request with `rgba(16, 185, 129, 0.34)` background and `--text-primary` text.

## Divergences Found vs Previous Project Tokens

- Previous backgrounds were lighter in the wrong places: `--bg-base`, `--bg-surface`, `--bg-hover`, and `--bg-active` did not match the showcase.
- Previous text colors used semi-transparent whites instead of the fixed neutral scale from the showcase.
- Previous radii were smaller: `md/lg/xl/2xl` were `8/12/16/20` instead of `10/14/18/24`.
- Previous shadows were heavier and less structured than the showcase stack.
- Previous font setup used remote `Inter` and `Geist Mono`, while the showcase uses only system/body/editorial stacks.
- The showcase does not define `::selection`.
- The showcase does not import Google Fonts or any CDN font asset.
