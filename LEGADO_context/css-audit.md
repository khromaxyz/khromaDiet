# DietForge — CSS Audit: Relatório de Valores Hardcoded

> **Data da análise:** 2026-03-04
> **Escopo:** 12 arquivos CSS em `src/styles/` (~856KB total)
> **Modo:** 100% read-only — zero modificações

---

## Índice

1. [Cores](#1-cores)
2. [Font-family](#2-font-family)
3. [Font-size](#3-font-size)
4. [Font-weight](#4-font-weight)
5. [Letter-spacing](#5-letter-spacing)
6. [Line-height](#6-line-height)
7. [Border-radius](#7-border-radius)
8. [Box-shadow](#8-box-shadow)
9. [Padding / Margin](#9-padding--margin)
10. [Gap](#10-gap)
11. [Z-index](#11-z-index)
12. [Transition / Animation](#12-transition--animation)
13. [Variáveis CSS Existentes](#13-variáveis-css-existentes)
14. [Resumo Executivo](#14-resumo-executivo)
15. [Top 10 Inconsistências](#15-top-10-inconsistências)
16. [Variáveis CSS Sugeridas](#16-variáveis-css-sugeridas)

---

## 1. Cores

> **26 tons únicos hardcoded + 4 sistemas paralelos de variáveis locais. 0 valores são reutilizados via tokens globais nas seções de apresentação.**

### 1.1 Variáveis CSS JÁ existentes (tokens.css — sistema global)

| Variável | Valor | Categoria |
|----------|-------|-----------|
| `--bg-900` | `#080808` | Background |
| `--bg-800` | `#0b0b0b` | Background |
| `--bg-700` | `#0f0f0f` | Background |
| `--bg-600` | `#141414` | Background |
| `--bg-500` | `#1a1a1a` | Background |
| `--bg-400` | `#242424` | Background |
| `--surface-1` | `rgba(255,255,255,0.03)` | Surface |
| `--surface-2` | `rgba(255,255,255,0.06)` | Surface |
| `--surface-3` | `rgba(255,255,255,0.09)` | Surface |
| `--border-subtle` | `rgba(255,255,255,0.07)` | Border |
| `--border-default` | `rgba(255,255,255,0.12)` | Border |
| `--border-strong` | `rgba(255,255,255,0.2)` | Border |
| `--accent-lime` | `#ff2a2a` | Accent |
| `--accent-lime-dim` | `rgba(255,42,42,0.15)` | Accent |
| `--accent-lime-glow` | `rgba(255,42,42,0.35)` | Accent |
| `--accent-violet` | `#ff4444` | Accent |
| `--accent-violet-dim` | `rgba(255,68,68,0.16)` | Accent |
| `--accent-violet-glow` | `rgba(255,68,68,0.4)` | Accent |
| `--accent-cyan` | `#22d3ee` | Accent |
| `--accent-cyan-dim` | `rgba(34,211,238,0.12)` | Accent |
| `--accent-orange` | `#fb923c` | Accent |
| `--accent-orange-dim` | `rgba(251,146,60,0.12)` | Accent |
| `--accent-red` | `#ff2a2a` | Accent |
| `--accent-red-dim` | `rgba(255,42,42,0.12)` | Accent |
| `--accent-green` | `#4ade80` | Accent |
| `--accent-green-dim` | `rgba(74,222,128,0.12)` | Accent |
| `--text-primary` | `#ffffff` | Text |
| `--text-secondary` | `rgba(255,255,255,0.65)` | Text |
| `--text-tertiary` | `rgba(255,255,255,0.3)` | Text |

### 1.2 Cores hardcoded encontradas nos CSS

#### screens.css — Cores puramente hardcoded

| Valor | Ocorrências | Contexto |
|-------|-------------|---------|
| `rgba(200,255,0,…)` | ~15× | Accent original (lime/verde-neon) — cor do design antigo, diferente do `--accent-lime` atual (#ff2a2a) |
| `rgba(139,92,246,…)` | ~10× | Violet/purple hardcoded |
| `rgba(239,68,68,…)` | ~6× | Vermelho Tailwind (diferente de `--accent-red`) |
| `rgba(234,179,8,…)` | ~4× | Amarelo/warning hardcoded |
| `rgba(251,146,60,…)` | ~8× | Laranja (aprox. `--accent-orange`, mas sem usar var) |
| `rgba(34,211,238,…)` | ~6× | Cyan (aprox. `--accent-cyan`, mas sem usar var) |
| `rgba(240,240,248,…)` | ~3× | Off-white textual |
| `rgba(8,8,16,…)` | 1× | Background overlay |
| `rgba(244,63,94,…)` | 1× | Rose/vermelho Tailwind |
| `rgba(74,222,128,…)` | 2× | Verde (`--accent-green` sem var) |
| `rgba(0,0,0,…)` | ~30× | Sombras pretas |
| `rgba(255,255,255,…)` | ~20× | Branco com opacidade |
| `#fff` / `#ffffff` | ~10× | Branco puro |

#### dashboard-macros.css — Sistema local de variáveis (redefinições)

Define seu próprio `:root`-like dentro do seletor de escopo com valores **diferentes** dos globais:

| Variável local | Valor | Conflito com |
|---------------|-------|--------------|
| `--bg-primary` | `#0a0a0f` | `--bg-900: #080808` |
| `--bg-secondary` | `#12121a` | `--bg-800: #0b0b0b` |
| `--bg-tertiary` | `#1a1a28` | `--bg-700: #0f0f0f` |
| `--bg-card` | `#111119` | — (sem equivalente global) |
| `--bg-card-hover` | `#1c1c2a` | — |
| `--bg-elevated` | `#1e1e2e` | — |
| `--accent-red` | `#e63946` | `--accent-red: #ff2a2a` (tokens.css) ← **CONFLITO CRÍTICO** |
| `--accent-red-light` | `#ff4d5a` | — |
| `--accent-red-dark` | `#c0313d` | — |
| `--text-primary` | `#f0f0f5` | `--text-primary: #ffffff` (tokens.css) ← **CONFLITO** |
| `--text-secondary` | `#a0a0b8` | `--text-secondary: rgba(255,255,255,0.65)` ← **CONFLITO** |
| `--text-tertiary` | `#6a6a80` | `--text-tertiary: rgba(255,255,255,0.3)` ← **CONFLITO** |
| `--text-muted` | `#4a4a5e` | — |

#### dashboard-final.css — Outro sistema local

| Variável local | Valor | Conflito com |
|---------------|-------|--------------|
| `--color-bg-base` | `#0a0a0c` | `--bg-900: #080808` |
| `--color-bg-surface` | `#111114` | `--bg-800: #0b0b0b` |
| `--color-bg-elevated` | `#18181d` | — |
| `--color-bg-overlay` | `#1f1f26` | — |
| `--color-bg-card` | `#16161b` | — |
| `--color-accent` | `#e63946` | `--accent-lime: #ff2a2a` ← **CONFLITO** |
| `--color-accent-light` | `#ff4d5a` | — |
| `--color-accent-dark` | `#b52d38` | — |
| `--color-gold` | `#d4a843` | — (sem equivalente global) |
| `--color-gold-light` | `#f0c060` | — |
| `--color-text-primary` | `#f0f0f5` | `--text-primary: #ffffff` ← **CONFLITO** |
| `--color-text-secondary` | `#9898a8` | `--text-secondary: rgba(...)` ← **CONFLITO** |
| `--color-text-tertiary` | `#5a5a6e` | `--text-tertiary: rgba(...)` ← **CONFLITO** |
| `--color-text-accent` | `#e63946` | — |

Cores hardcoded inline em `dashboard-final.css`:
`#4ade80`, `#818cf8`, `#a5b4fc`, `#6366f1`, `#ff6b6b`, `#e63946`, `#fff`

#### dashboard-supplements.css — Terceiro sistema local

Além das vars de background e accent, define variáveis **por suplemento**:

| Variável | Valor |
|----------|-------|
| `--sup-creatina-primary` | `#00c8ff` |
| `--sup-creatina-mid` | `#0099cc` |
| `--sup-vitd-primary` | `#ffb830` |
| `--sup-vitd-mid` | `#e09000` |
| `--sup-whey-primary` | `#00e898` |
| `--sup-whey-mid` | `#00b574` |
| `--sup-omega-primary` | `#7b8cde` |
| `--sup-omega-mid` | `#5566cc` |
| `--sup-mag-primary` | `#b87fda` |
| `--sup-mag-mid` | `#9050c0` |
| `--color-accent` | `#e02020` | ← diferente de macros (#e63946) e tokens (#ff2a2a) |

#### dashboard-simulator.css — Quarto sistema local

| Variável | Valor |
|----------|-------|
| `--accent-red` | `#e8293a` | ← 4ª definição diferente para "vermelho primário" |
| `--accent-red-bright` | `#ff3347` |
| `--accent-orange` | `#f7612a` |
| `--accent-amber` | `#f5a623` |
| `--accent-green` | `#2ed573` | ← diferente de tokens.css (#4ade80) |
| `--accent-blue` | `#3d8ef8` |
| `--accent-purple` | `#a855f7` |

---

## 2. Font-family

> **3 valores únicos em variáveis globais, mas 4 famílias hardcoded adicionais nos CSS de seção. 2 sistemas tipográficos paralelos.**

| Valor | Arquivos | Ocorrências | Tipo |
|-------|----------|-------------|------|
| `var(--font-display)` | screens.css, base.css | ~25× | ✅ Variável |
| `var(--font-mono)` | screens.css | ~60× | ✅ Variável |
| `var(--font-body)` | screens.css, base.css | ~3× | ✅ Variável |
| `'Barlow Condensed', sans-serif` | dashboard-presentation.css, dashboard-macros.css, dashboard-final.css, dashboard-supplements.css, dashboard-simulator.css | ~40× | ❌ Hardcoded |
| `'Barlow', sans-serif` | dashboard-presentation.css, dashboard-macros.css, dashboard-final.css, dashboard-supplements.css | ~30× | ❌ Hardcoded |
| `'JetBrains Mono', monospace` | dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~15× | ❌ Hardcoded |
| `'Space Grotesk', sans-serif` | dashboard-macros.css | 2× | ❌ Hardcoded |
| `'Inter', sans-serif` | dashboard-final.css | 1× | ❌ Hardcoded |
| `monospace` (genérico) | dashboard-macros.css | 2× | ❌ Hardcoded |

**Resumo:** 3 famílias via variável, **6 valores hardcoded distintos**. O sistema de apresentação (slides) usa deliberadamente Barlow/Barlow Condensed — é um sistema tipográfico separado. Porém deveria ter suas próprias variáveis no escopo.

---

## 3. Font-size

> **~67 valores únicos encontrados. 3 são variáveis, 64 são hardcoded. Mistura de px, em, rem, clamp() e vw.**

### Escala px (do menor ao maior) — sem incluir clamp()

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `10px` | screens.css | ~3× |
| `11px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~10× |
| `12px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~25× |
| `13px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~20× |
| `14px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~18× |
| `15px` | screens.css, dashboard-macros.css | ~12× |
| `16px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~20× |
| `17px` | dashboard-macros.css, dashboard-supplements.css | ~5× |
| `18px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~15× |
| `19px` | dashboard-supplements.css | ~2× |
| `20px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~8× |
| `22px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~5× |
| `24px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~10× |
| `26px` | dashboard-macros.css, dashboard-supplements.css | ~4× |
| `28px` | screens.css, dashboard-macros.css | ~5× |
| `32px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~8× |
| `36px` | dashboard-macros.css, dashboard-supplements.css | ~6× |
| `40px` | screens.css, dashboard-supplements.css | ~4× |
| `42px` | dashboard-macros.css | ~2× |
| `48px` | screens.css, dashboard-macros.css | ~5× |
| `52px` | dashboard-supplements.css | ~2× |
| `56px` | dashboard-macros.css, dashboard-supplements.css | ~4× |
| `60px` | dashboard-macros.css | ~2× |
| `64px` | dashboard-macros.css, dashboard-supplements.css | ~3× |
| `72px` | dashboard-macros.css, dashboard-supplements.css | ~4× |
| `80px` | dashboard-macros.css | ~2× |
| `88px` | dashboard-supplements.css | ~1× |
| `96px` | dashboard-macros.css | ~1× |
| `100px` | dashboard-supplements.css | ~1× |
| `120px` | dashboard-supplements.css | ~1× |
| `128px` | dashboard-macros.css | ~1× |

### Clamp responsivos

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `clamp(52px, 8vw, 96px)` | screens.css | 1× |
| `clamp(16px, 2.5vw, 20px)` | screens.css | 1× |
| `clamp(24px, 4vw, 38px)` | screens.css | 1× |
| `clamp(28px, 5vw, 48px)` | screens.css | 1× |
| `clamp(48px, 8vw, 80px)` | screens.css | 3× |

**Total estimado: ~67 tamanhos únicos. Apenas 12–18 seriam necessários em uma escala tipográfica bem definida.**

---

## 4. Font-weight

> **6 valores únicos encontrados. Todos hardcoded — nenhuma variável CSS de peso existe.**

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `300` | dashboard-macros.css, dashboard-supplements.css | ~5× |
| `400` | screens.css, dashboard-supplements.css, dashboard-simulator.css | ~10× |
| `500` | dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~15× |
| `600` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-projection.css | ~40× |
| `700` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css, dashboard-final.css | ~200× |
| `800` | screens.css, dashboard-macros.css | ~8× |

**Resumo:** 6 valores únicos, todos hardcoded. `700` é dominante (80%+ dos casos).

---

## 5. Letter-spacing

> **~17 valores únicos encontrados. Todos hardcoded — nenhuma variável CSS existe.**

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `-0.035em` | screens.css | 1× |
| `-0.03em` | screens.css | 1× |
| `-0.02em` | screens.css, dashboard-supplements.css | ~6× |
| `0` | screens.css | 1× |
| `0.02em` | screens.css, dashboard-macros.css | ~6× |
| `0.04em` | screens.css | 1× |
| `0.06em` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~10× |
| `0.08em` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~15× |
| `0.09em` | screens.css | 1× |
| `0.1em` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~20× |
| `0.12em` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~20× |
| `0.15em` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~10× |
| `0.16em` | dashboard-macros.css | ~2× |
| `0.18em` | dashboard-macros.css | ~2× |
| `0.2em` | dashboard-macros.css, dashboard-supplements.css | ~5× |
| `0.25em` | dashboard-macros.css, dashboard-supplements.css | ~3× |
| `0.3em` | dashboard-macros.css | ~2× |

**Resumo:** 17 valores únicos, nenhuma variável. Faixa razoável seria 4–6 valores padronizados.

---

## 6. Line-height

> **~17 valores únicos encontrados. Todos hardcoded.**

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `0.95` | screens.css | 1× |
| `1` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~30× |
| `1.04` | dashboard-projection.css | 1× |
| `1.05` | screens.css, dashboard-supplements.css | ~3× |
| `1.1` | dashboard-supplements.css, dashboard-simulator.css, dashboard-macros.css | ~5× |
| `1.15` | dashboard-supplements.css, dashboard-macros.css | ~4× |
| `1.2` | screens.css, dashboard-macros.css | ~6× |
| `1.3` | dashboard-macros.css | ~3× |
| `1.4` | screens.css, dashboard-macros.css | ~5× |
| `1.45` | dashboard-macros.css | ~2× |
| `1.5` | screens.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~15× |
| `1.55` | dashboard-supplements.css | ~5× |
| `1.6` | screens.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~20× |
| `1.65` | dashboard-simulator.css | 1× |
| `1.7` | dashboard-supplements.css | ~2× |
| `1.75` | dashboard-macros.css | ~2× |
| `1.8` | dashboard-macros.css | ~2× |

**Resumo:** 17 valores únicos, nenhuma variável. 3–4 seriam suficientes (tight ~1.1, normal ~1.5, loose ~1.7).

---

## 7. Border-radius

> **~14 valores únicos encontrados. 5 são variáveis globais, 9 são hardcoded.**

### Valores via variável (✅ correto)
`var(--radius-sm)` (8px), `var(--radius-md)` (14px), `var(--radius-lg)` (20px), `var(--radius-xl)` (28px), `var(--radius-pill)` (9999px)

### Valores hardcoded (❌)

| Valor | Arquivos | Ocorrências | Deveria ser |
|-------|----------|-------------|-------------|
| `50%` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~25× | — (OK para círculos) |
| `999px` | screens.css, dashboard-macros.css | ~8× | `var(--radius-pill)` |
| `3px` | screens.css, base.css (scrollbar) | ~5× | `var(--radius-xs)` (a criar) |
| `2px` | screens.css | ~3× | `var(--radius-xs)` |
| `1px` | screens.css | ~2× | `var(--radius-xs)` |
| `4px` | dashboard-macros.css, dashboard-supplements.css | ~4× | `var(--radius-xs)` |
| `6px` | screens.css, dashboard-macros.css | ~4× | `var(--radius-sm)` ou `var(--radius-xs)` |
| `10px` | screens.css | ~4× | `var(--radius-sm)` |
| `12px` | dashboard-macros.css, dashboard-supplements.css | ~6× | `var(--radius-sm)` |
| `16px` | dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~8× | `var(--radius-md)` |
| `24px` | dashboard-macros.css, dashboard-supplements.css | ~4× | `var(--radius-lg)` |
| `32px` | dashboard-macros.css | ~3× | `var(--radius-xl)` |
| `inherit` | screens.css | ~2× | — (OK) |

**Resumo:** 13 hardcoded além do `50%`. Necessário adicionar `--radius-xs: 4px` e substituir `999px` por `var(--radius-pill)`.

---

## 8. Box-shadow

> **Múltiplas sombras one-off hardcoded. 5 variáveis globais existem mas raramente são usadas nos CSS de seção.**

### Variáveis globais de shadow (tokens.css)
`--shadow-lime`, `--shadow-violet`, `--shadow-cyan`, `--shadow-card`, `--shadow-card-hover`

### Padrões hardcoded recorrentes em screens.css

| Padrão | Ocorrências |
|--------|-------------|
| Sombras `rgba(200,255,0,…)` — cor antiga lime/verde | ~8× |
| Sombras `rgba(139,92,246,…)` — violet | ~5× |
| Sombras `rgba(251,146,60,…)` — orange | ~4× |
| Sombras `rgba(34,211,238,…)` — cyan | ~5× |
| Sombras `rgba(0,0,0,…)` isoladas | ~15× |
| `var(--shadow-card)` | ~10× ✅ |
| `var(--shadow-card-hover)` | ~5× ✅ |

### Em dashboard-macros / supplements / simulator / projection / final
Cada seção define suas próprias shadows únicas inline, raramente usando as variáveis globais.

---

## 9. Padding / Margin

> **Top 20 valores mais frequentes (estimativa por amostragem — grep truncou em 50 resultados por arquivo).**

| Valor | Arquivos | Ocorrências estimadas |
|-------|----------|-----------------------|
| `0` | Todos | ~200× |
| `4px` | Todos | ~80× |
| `8px` | Todos | ~150× |
| `12px` | Todos | ~100× |
| `16px` | Todos | ~120× |
| `20px` | Todos | ~80× |
| `24px` | Todos | ~80× |
| `32px` | Todos | ~60× |
| `40px` | screens.css, dashboard-macros.css | ~40× |
| `48px` | screens.css, dashboard-macros.css | ~30× |
| `2px` | Todos | ~40× |
| `6px` | screens.css, dashboard-macros.css | ~40× |
| `10px` | screens.css, dashboard-macros.css | ~30× |
| `14px` | screens.css, dashboard-macros.css | ~20× |
| `56px` | dashboard-macros.css | ~10× |
| `64px` | dashboard-macros.css, dashboard-supplements.css | ~10× |
| `80px` | dashboard-macros.css | ~5× |
| `1px` | screens.css | ~10× |
| `3px` | screens.css, base.css | ~8× |
| `5px` | screens.css, dashboard-macros.css | ~8× |

Nenhum valor de padding/margin usa variável CSS. Sistema de spacing local em alguns seção-CSS com `--spacing-*` vars mas não conectadas ao tokens.css global.

---

## 10. Gap

> **~22 valores únicos encontrados. Nenhum usa variável CSS.**

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `0` | screens.css | ~3× |
| `2px` | dashboard-macros.css, dashboard-supplements.css | ~4× |
| `4px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~15× |
| `6px` | screens.css, dashboard-macros.css | ~15× |
| `8px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-simulator.css | ~50× |
| `10px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~20× |
| `12px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~20× |
| `14px` | screens.css, dashboard-macros.css | ~10× |
| `16px` | screens.css, dashboard-macros.css, dashboard-supplements.css, dashboard-projection.css | ~30× |
| `20px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~15× |
| `24px` | screens.css, dashboard-supplements.css | ~10× |
| `28px` | dashboard-macros.css | ~4× |
| `32px` | screens.css, dashboard-macros.css, dashboard-supplements.css | ~10× |
| `36px` | dashboard-macros.css, dashboard-supplements.css | ~4× |
| `40px` | screens.css, dashboard-macros.css | ~5× |
| `48px` | dashboard-macros.css, dashboard-supplements.css | ~4× |
| `56px` | dashboard-macros.css | ~2× |
| `64px` | dashboard-macros.css, dashboard-supplements.css | ~3× |
| `80px` | dashboard-supplements.css | ~2× |
| `column-gap` values | screens.css | ~5 valores distintos |
| `row-gap` values | screens.css | ~4 valores distintos |

---

## 11. Z-index

> **~18 valores únicos. Nenhum usa variável CSS (exceto `--z-tooltip` e `--z-modal` em dashboard-supplements.css — variáveis definidas localmente nesse arquivo).**

| Valor | Arquivos | Ocorrências |
|-------|----------|-------------|
| `0` | screens.css, dashboard-supplements.css, dashboard-simulator.css | ~8× |
| `1` | screens.css, dashboard-supplements.css, dashboard-simulator.css, dashboard-projection.css | ~20× |
| `2` | screens.css, dashboard-supplements.css, dashboard-simulator.css | ~15× |
| `3` | dashboard-supplements.css | ~2× |
| `5` | dashboard-supplements.css | ~2× |
| `10` | dashboard-supplements.css, dashboard-macros.css | ~4× |
| `20` | screens.css | 1× |
| `99` | screens.css | ~3× |
| `100` | screens.css, dashboard-projection.css | ~5× |
| `1000` | screens.css, dashboard-simulator.css, dashboard-projection.css | ~5× |
| `2090` | screens.css | 1× |
| `2100` | screens.css | 1× |
| `2200` | screens.css | 1× |
| `2210` | screens.css | 1× |
| `2250` | screens.css | 1× |
| `9999` | base.css (noise overlay) | 1× |
| `var(--z-tooltip)` | dashboard-supplements.css | 1× ✅ |
| `var(--z-modal)` | dashboard-supplements.css | 1× ✅ |

**⚠️ Valores como 2090, 2100, 2200, 2210, 2250 são arbitrários e indicam falta de sistema de z-index.**

---

## 12. Transition / Animation

> **Mistura de `var(--transition-*)` globais com valores hardcoded, especialmente nos CSS de seção.**

### Variáveis globais usadas corretamente (tokens.css)
`--transition-fast` (180ms), `--transition-base` (300ms), `--transition-slow` (500ms), `--transition-screen` (420ms)

### Durações hardcoded encontradas

| Duração | Easing | Arquivos | Ocorrências |
|---------|--------|----------|-------------|
| `150ms ease` | ease | screens.css, dashboard-supplements.css | ~25× |
| `160ms ease` | ease | screens.css | ~2× |
| `180ms ease` | ease | screens.css | ~3× |
| `200ms ease` | ease | screens.css | ~8× |
| `220ms ease` | ease | screens.css | ~2× |
| `300ms ease-out` | ease-out | screens.css | ~2× |
| `500ms cubic-bezier(0.25,0.46,0.45,0.94)` | same as --transition-slow | screens.css | 2× |
| `1.2s cubic-bezier(...)` | — | screens.css | 1× |
| `all 150ms ease` | — | screens.css | ~5× (evitar `all`) |
| `all 200ms ease` | — | screens.css | ~3× |

Durations em dashboard-macros, supplements, simulator usam exclusivamente hardcoded — raramente `var(--transition-*)`.

---

## 13. Variáveis CSS Existentes

### Declaradas no tokens.css (:root global)

```
Backgrounds: --bg-900, --bg-800, --bg-700, --bg-600, --bg-500, --bg-400
Surfaces:    --surface-1, --surface-2, --surface-3
Borders:     --border-subtle, --border-default, --border-strong
Accents:     --accent-lime, --accent-lime-dim, --accent-lime-glow
             --accent-violet, --accent-violet-dim, --accent-violet-glow
             --accent-cyan, --accent-cyan-dim
             --accent-orange, --accent-orange-dim
             --accent-red, --accent-red-dim
             --accent-green, --accent-green-dim
Text:        --text-primary, --text-secondary, --text-tertiary, --text-accent
Fonts:       --font-display, --font-body, --font-mono
Radii:       --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-pill
Shadows:     --shadow-lime, --shadow-violet, --shadow-cyan, --shadow-card, --shadow-card-hover
Transitions: --transition-fast, --transition-base, --transition-slow, --transition-screen
```
**Total: ~40 variáveis globais**

### Redefinições em outros arquivos

| Arquivo | Scope | Variáveis redefinidas (nomes conflitantes com globais) |
|---------|-------|-------------------------------------------------------|
| `dashboard-macros.css` | seletor de escopo | `--text-primary`, `--text-secondary`, `--text-tertiary`, `--accent-red` (valores diferentes) |
| `dashboard-final.css` | seletor de escopo | `--color-text-primary` (nome diferente), `--color-accent` |
| `dashboard-supplements.css` | seletor de escopo | `--color-accent` (3ª definição) |
| `dashboard-simulator.css` | seletor de escopo | `--accent-red` (4ª definição), `--accent-green` (diferente) |
| `dashboard-presentation.css` | seletor amplo | Redefine praticamente toda a paleta com novos nomes |
| `screens.css` | local em componentes | `--range-track-gap`, `--macro-track-gap`, `--range-thumb-glow` (vars ad-hoc locais) |

---

## 14. Resumo Executivo

| Categoria | Valores únicos | Via variável | Hardcoded | Índice de caos |
|-----------|---------------|-------------|-----------|----------------|
| Cores (#hex + rgba) | ~90 | ~29 (tokens.css) | **~61** | 🔴 Alto |
| Font-family | 9 | 3 | **6** | 🟠 Médio |
| Font-size | ~67 | 0 | **~67** | 🔴 Alto |
| Font-weight | 6 | 0 | **6** | 🟡 Baixo |
| Letter-spacing | 17 | 0 | **17** | 🟠 Médio |
| Line-height | 17 | 0 | **17** | 🟠 Médio |
| Border-radius | 14 | 5 | **9** | 🟡 Baixo |
| Box-shadow | ~30+ | 7 | **~23+** | 🟠 Médio |
| Padding/Margin | ~20 top | 0 | **~20** | 🟠 Médio |
| Gap | 22 | 0 | **22** | 🟠 Médio |
| Z-index | 18 | 2 (locais) | **16** | 🟡 Baixo |
| Transition | ~15 | ~10 | **~5+** | 🟡 Baixo |

**Total estimado de ocorrências hardcoded: ~3.000–5.000 linhas afetadas nos 12 arquivos.**

---

## 15. Top 10 Inconsistências

### 1. 🔴 O vermelho primário existe em 4 versões diferentes

O projeto deveria ter uma cor de accent primária única, que é o vermelho. Mas encontramos:

| Arquivo | Variável | Valor hex |
|---------|----------|-----------|
| `tokens.css` | `--accent-lime` / `--accent-red` | `#ff2a2a` |
| `dashboard-macros.css` | `--accent-red` | `#e63946` |
| `dashboard-final.css` | `--color-accent` | `#e63946` |
| `dashboard-supplements.css` | `--color-accent` | `#e02020` |
| `dashboard-simulator.css` | `--accent-red` | `#e8293a` |
| `screens.css` (hardcoded) | — | `rgba(200,255,0,…)` ← cor COMPLETAMENTE diferente! |

**Impacto**: Cada seção do dashboard exibe um vermelho ligeiramente diferente. Visualmente inconsistente.

### 2. 🔴 --text-primary é #ffffff em tokens.css mas #f0f0f5 nas seções

`tokens.css` define `--text-primary: #ffffff` (branco puro), mas `dashboard-macros.css` e `dashboard-final.css` redeclaram `--text-primary: #f0f0f5` (branco acinzentado). Usuário vê textos em brancos diferentes entre seções.

### 3. 🔴 screens.css usa rgba(200,255,0,…) — cor radicalmente diferente do design atual

`rgba(200,255,0,…)` é um verde-neon que foi a cor primária original do projeto, antes de mudar para vermelho. Aparece ~15× em `screens.css` como accent principal da hero e form. Isso significa que hero/form ainda têm o design antigo em verde, enquanto o dashboard usa vermelho.

### 4. 🔴 Font-size sem nenhuma escala tipográfica: 67 valores únicos

Do menor ao maior: `10px` → `128px`. Não existe uma escala regular. Valores como `13px`, `15px`, `17px`, `19px` coexistem com `12px`, `14px`, `16px`, `18px` — servindo ao mesmo propósito tipográfico mas com tamanhos inconsistentes entre seções.

### 5. 🟠 gap: 8px usado >50× mas também gap: 6px (~15×) e gap: 10px (~20×) para espaçamentos equivalentes

Seções diferentes usam `gap: 6px`, `gap: 8px` ou `gap: 10px` para separar itens internos de cards — o mesmo padrão visual com dimensões ligeiramente diferentes.

### 6. 🟠 border-radius: 999px e border-radius: var(--radius-pill) coexistem

`var(--radius-pill)` existe justamente para ser `9999px`, mas `999px` está hardcoded em pelo menos 8 lugares em `screens.css` em vez de usar a variável.

### 7. 🟠 letter-spacing: 0.1em é "tracking padrão de labels" mas 0.08em, 0.09em, 0.12em também são usados para o mesmo tipo de elemento

Labels de seção, títulos de cards e rótulos de dados usam tracking de `0.08em` até `0.15em` sem padrão. Deveriam ser `--tracking-normal` e `--tracking-wide`.

### 8. 🟠 transition: 150ms ease hardcoded ~25× vs var(--transition-fast) = 180ms

Um terço das transições usa `150ms ease` (hardcoded) em vez de `var(--transition-fast)` (180ms). Transições se comportam com durações ligeiramente diferentes, quebrando a sensação de responsividade uniforme.

### 9. 🟠 line-height: 1.6 (body text) vs 1.55 vs 1.65 — mesmos blocos de texto em seções diferentes

Parágrafos e descrições de cards deveriam ter line-height consistente. Encontramos `1.55`, `1.6`, `1.65` em arquivos diferentes para o mesmo padrão visual.

### 10. 🟡 z-index sem sistema: valores como 2090, 2100, 2200, 2210, 2250 em screens.css

São z-indexes de modais e overlays com valores arbitrários e próximos uns dos outros. Não há nomenclatura ou escala definida. Risco de conflito conforme o projeto cresce.

---

## 16. Variáveis CSS Sugeridas

Lista de variáveis que **PRECISAM** existir no `:root` de `tokens.css` para cobrir todos os valores encontrados:

### Cores (a consolidar)
```css
/* Accent principal — consolidar as 4 versões de vermelho */
--accent-primary: #e63946;          /* ou #ff2a2a — decisão de design */
--accent-primary-bright: #ff4d5a;
--accent-primary-dim: rgba(230, 57, 70, 0.12);
--accent-primary-glow: rgba(230, 57, 70, 0.35);

/* Backgrounds da grade dark */
--bg-base: #0a0a0c;                 /* mais escuro que --bg-900 */
--bg-surface: #111114;
--bg-elevated: #18181d;
--bg-card: #16161b;
--bg-card-hover: #1c1c23;

/* Off-white textual */
--text-body: #f0f0f5;               /* alternativa ao #ffffff puro */
--text-dim: #9898a8;
--text-muted: #5a5a6e;

/* Utilidades */
--white: #ffffff;
--black: #000000;
```

### Tipografia
```css
/* Família de apresentação */
--font-display-condensed: 'Barlow Condensed', sans-serif;
--font-display-barlow: 'Barlow', sans-serif;

/* Escala de tamanhos — substituir 67 valores por ~12 tokens */
--text-xs:    11px;
--text-sm:    13px;
--text-base:  15px;
--text-md:    16px;
--text-lg:    18px;
--text-xl:    24px;
--text-2xl:   32px;
--text-3xl:   48px;
--text-4xl:   72px;
--text-5xl:   96px;
--text-hero:  clamp(52px, 8vw, 96px);

/* Pesos */
--weight-regular: 400;
--weight-medium:  500;
--weight-semibold: 600;
--weight-bold:    700;
--weight-extrabold: 800;

/* Tracking */
--tracking-tight:  -0.02em;
--tracking-normal:  0.02em;
--tracking-wide:    0.08em;
--tracking-wider:   0.12em;
--tracking-widest:  0.15em;

/* Leading */
--leading-tight:  1.1;
--leading-snug:   1.3;
--leading-normal: 1.5;
--leading-loose:  1.7;
```

### Espaçamento
```css
/* Escala de spacing para padding/margin/gap */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Z-index
```css
--z-base:    1;
--z-raised:  10;
--z-overlay: 100;
--z-modal:   1000;
--z-tooltip: 2000;
--z-top:     9999;
```

### Border-radius (adicionar)
```css
--radius-xs: 4px;    /* atualmente hardcoded como 2px, 3px, 4px */
```

### Box-shadow (adicionar)
```css
/* Sombras de accent by color — substituir inline shadows */
--shadow-accent:  0 0 30px var(--accent-primary-glow), 0 8px 32px rgba(0,0,0,0.6);
--shadow-cyan:    0 0 30px rgba(34, 211, 238, 0.18), 0 4px 24px rgba(0,0,0,0.5);
--shadow-orange:  0 0 30px rgba(251, 146, 60, 0.18), 0 4px 24px rgba(0,0,0,0.5);
--shadow-green:   0 0 30px rgba(74, 222, 128, 0.18), 0 4px 24px rgba(0,0,0,0.5);
--shadow-overlay: 0 16px 40px rgba(0,0,0,0.6);
--shadow-inset:   inset 0 2px 4px rgba(0,0,0,0.5);
```

### Transitions (adicionar)
```css
--transition-instant: 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* 150ms hardcoded → mapear aqui */
```

---

*Fim do relatório. Total de arquivos auditados: 12. Total de linhas escaneadas: ~28.000.*
