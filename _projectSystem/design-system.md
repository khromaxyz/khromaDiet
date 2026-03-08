# DietForge Design System — Obsidian + Emerald

> Versão: 1.0 (draft para aprovação)
> Direção: Ultra-premium editorial (Stripe/Linear)
> Paleta: Obsidian backgrounds + Emerald accent + Gold secondary
> Tipografia: Inter (body/display) + Geist Mono (dados numéricos)

---

## 1. Filosofia de Design

**Princípios:**
1. **Precisão sobre decoração** — cada elemento serve um propósito. Sem ornamentos gratuitos.
2. **Hierarquia por contraste** — informação primária salta; secundária recua. Nunca competem.
3. **Emerald como sinal** — verde aparece APENAS onde exige atenção. Uso contido = impacto máximo.
4. **Obsidian como vazio** — backgrounds ultra-escuros criam profundidade. Não é "dark mode" — é ausência intencional.
5. **Dados são o herói** — números, gráficos e métricas são os protagonistas visuais. UI é moldura.

**Anti-padrões (evitar):**
- Glow neon excessivo (cyberpunk)
- Gradientes coloridos em backgrounds
- Bordas grossas ou shadows pesados
- Cor em texto corrido (só em accent points)
- Tipografia display onde body resolve

---

## 2. Paleta de Cores

### 2.1 Backgrounds — Obsidian Scale

Escala de 6 níveis. Diferenças sutis (delta ~3-4 lightness) criam profundidade sem contraste agressivo.

| Token | Hex | HSL approx | Uso |
|-------|-----|------------|-----|
| `--bg-deep` | `#08090a` | 210° 11% 3% | Void — fundo absoluto |
| `--bg-base` | `#0c0d0f` | 220° 11% 4% | Fundo principal da app |
| `--bg-raised` | `#111214` | 220° 10% 7% | Cards, painéis |
| `--bg-surface` | `#161719` | 210° 5% 9% | Superfícies interativas |
| `--bg-elevated` | `#1c1d20` | 225° 5% 12% | Hover, popovers |
| `--bg-wash` | `#222326` | 225° 4% 14% | Inputs, wells |

Nota: leve tint azul (210-225°) no obsidian evita a "morte" do preto puro e adiciona profundidade perceptual.

### 2.2 Accent Primário — Emerald

Escala completa 50-700 + dim/glow para efeitos.

| Token | Valor | Uso |
|-------|-------|-----|
| `--emerald-50` | `#ecfdf5` | Background sutil (light contexts) |
| `--emerald-100` | `#d1fae5` | Badge backgrounds |
| `--emerald-200` | `#a7f3d0` | Tags, pills |
| `--emerald-300` | `#6ee7b7` | Glow suave |
| `--emerald-400` | `#34d399` | ★ Accent em texto e ícones |
| `--emerald-500` | `#10b981` | ★ Accent primário (botões, CTAs, rings) |
| `--emerald-600` | `#059669` | Pressed/active states |
| `--emerald-700` | `#047857` | Backgrounds escuros com accent |
| `--emerald-dim` | `rgba(16,185,129,0.12)` | Background glow containers |
| `--emerald-glow` | `rgba(16,185,129,0.25)` | Box-shadow glow |

Regra de uso: `--emerald-500` para superfícies sólidas (botões), `--emerald-400` para texto/ícones (melhor legibilidade no fundo escuro).

### 2.3 Accent Secundário — Gold

| Token | Valor | Uso |
|-------|-------|-----|
| `--gold-50` | `#fffbeb` | — |
| `--gold-100` | `#fef3c7` | Badge bg |
| `--gold-300` | `#fcd34d` | Bright gold |
| `--gold-400` | `#fbbf24` | ★ Accent em texto/ícones |
| `--gold-500` | `#f59e0b` | ★ Gold primário |
| `--gold-600` | `#d97706` | Pressed |
| `--gold-dim` | `rgba(245,158,11,0.12)` | Background glow |
| `--gold-glow` | `rgba(245,158,11,0.20)` | Box-shadow |

### 2.4 Borders

| Token | Valor | Uso |
|-------|-------|-----|
| `--border-subtle` | `rgba(255,255,255,0.04)` | Quase invisível — separadores de conteúdo |
| `--border-dim` | `rgba(255,255,255,0.06)` | Separadores leves |
| `--border-default` | `rgba(255,255,255,0.09)` | Borda padrão de cards |
| `--border-strong` | `rgba(255,255,255,0.14)` | Hover, focus rings |
| `--border-accent` | `rgba(16,185,129,0.25)` | Destaque emerald |

### 2.5 Text

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-primary` | `#f0f0f0` | Texto principal (NÃO branco puro — reduz fadiga) |
| `--text-secondary` | `rgba(240,240,240,0.64)` | Texto auxiliar |
| `--text-tertiary` | `rgba(240,240,240,0.40)` | Labels, captions, metadata |
| `--text-muted` | `rgba(240,240,240,0.24)` | Placeholders, disabled |
| `--text-accent` | `#34d399` | Texto emerald (usar emerald-400, não 500) |
| `--text-gold` | `#fbbf24` | Texto gold |

### 2.6 Macronutrientes

Decisão estratégica: proteína = emerald (accent primário), gordura = gold (accent secundário), carboidrato = blue (neutro).

| Token | Valor | Contexto |
|-------|-------|----------|
| `--protein` | `#10b981` | Emerald — macro mais relevante no contexto cutting |
| `--protein-dim` | `rgba(16,185,129,0.15)` | Background |
| `--carb` | `#3b82f6` | Blue — neutro, informativo |
| `--carb-dim` | `rgba(59,130,246,0.15)` | Background |
| `--fat` | `#f59e0b` | Gold — atenção sem alarme |
| `--fat-dim` | `rgba(245,158,11,0.15)` | Background |

### 2.7 Semantic

| Token | Valor |
|-------|-------|
| `--success` / `--success-dim` | `#10b981` / `rgba(16,185,129,0.12)` |
| `--warning` / `--warning-dim` | `#f59e0b` / `rgba(245,158,11,0.12)` |
| `--error` / `--error-dim` | `#ef4444` / `rgba(239,68,68,0.12)` |
| `--info` / `--info-dim` | `#3b82f6` / `rgba(59,130,246,0.12)` |

### 2.8 Suplementos (mantém identidade)

| Suplemento | Primary | Ajuste |
|------------|---------|--------|
| Creatina | `#00c8ff` (cyan) | Mantém — sem conflito |
| Vitamina D | `#ffb830` (gold) | Ajustar → `#f59e0b` (unificar com gold scale) |
| Whey | `#00e898` (green) | Ajustar → `#34d399` (unificar com emerald-400) |
| Ômega-3 | `#7b8cde` (blue) | Ajustar → `#818cf8` (indigo mais vibrante) |
| Magnésio | `#b87fda` (purple) | Mantém — sem conflito |

---

## 3. Tipografia

### 3.1 Famílias

| Token | Stack | Uso |
|-------|-------|-----|
| `--font-body` | `'Inter', system-ui, -apple-system, sans-serif` | Todo texto corrido |
| `--font-display` | `'Inter', system-ui, sans-serif` | Headings (mesmo Inter, weight diferencia) |
| `--font-mono` | `'Geist Mono', 'JetBrains Mono', 'SF Mono', monospace` | Números, KPIs, dados, code |

Inter carrega: 300, 400, 500, 600, 700, 800.
Geist Mono: via CDN ou self-hosted.

### 3.2 Escala (mantém existente)

| Token | Valor | Uso editorial |
|-------|-------|---------------|
| `--text-xs` | 0.6875rem (11px) | Captions, metadata, timestamps |
| `--text-sm` | 0.8125rem (13px) | Labels, secondary text |
| `--text-base` | 0.9375rem (15px) | Body text padrão |
| `--text-lg` | 1.0625rem (17px) | Subheadings |
| `--text-xl` | 1.25rem (20px) | Section titles |
| `--text-2xl` | 1.5625rem (25px) | Page headings |
| `--text-3xl` | 2rem (32px) | Hero subheading |
| `--text-4xl` | 2.75rem (44px) | Hero heading |
| `--text-5xl` | 3.5rem (56px) | Display (hero impacto) |

### 3.3 Regras editoriais

1. **Headings:** Inter 700-800, `--tracking-neg-xs` (-0.02em), `--leading-tight` (1.1)
2. **Body:** Inter 400, `--tracking-normal`, `--leading-relaxed` (1.6)
3. **Labels/Captions:** Inter 500-600, `--tracking-caps` (0.06em), uppercase
4. **Numbers/KPIs:** Geist Mono 700, `--tracking-neg-sm` (-0.03em), `--leading-none` (1)
5. **Monospaced data:** Geist Mono 500, tabular nums

---

## 4. Spacing (mantém escala existente)

Sem mudança. Escala `--space-*` (1=4px até 24=96px) já está tokenizada.

---

## 5. Borders & Radius

### 5.1 Radius (ajuste editorial)

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 6px | Inputs, small elements |
| `--radius-md` | 8px | Badges, tags |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Painéis, modais |
| `--radius-2xl` | 20px | Hero containers |
| `--radius-pill` | 9999px | Pills, toggles |

Princípio: radius maiores que o tema anterior (era 8-12px max). Editorial moderno usa 12-16px em cards.

### 5.2 Shadows

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle lift |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Cards |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` | Modais, popovers |
| `--shadow-glow-emerald` | `0 0 40px rgba(16,185,129,0.12)` | Hero CTA |
| `--shadow-glow-gold` | `0 0 40px rgba(245,158,11,0.10)` | Destaques gold |

Princípio: shadows escuros (não coloridos) para elevação. Glow APENAS em CTAs e hero elements.

---

## 6. Motion & Transitions

| Token | Valor | Uso |
|-------|-------|-----|
| `--ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Transições gerais |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entradas |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Toggles, expansões |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interações |
| `--duration-fast` | `120ms` | Hover, focus |
| `--duration-normal` | `200ms` | Transições padrão |
| `--duration-slow` | `400ms` | Modais, expansões |
| `--duration-enter` | `300ms` | Entradas com reveal |

Princípio editorial: movimentos sutis e rápidos. Nada chama atenção — tudo parece "já estava ali".

---

## 7. Mapeamento Old → New (tokens.css)

### 7.1 Backgrounds
```
--bg-900 (#0a0a0c)         → --bg-deep (#08090a)
--bg-primary (#0f0f11)     → --bg-base (#0c0d0f)
--bg-card (#141416)        → --bg-raised (#111214)
--bg-secondary             → --bg-surface (#161719)
--bg-tertiary              → --bg-elevated (#1c1d20)
--bg-glass                 → --bg-wash (#222326)
```

### 7.2 Accents
```
--accent-primary (#ff2a2a) → --emerald-500 (#10b981)
--accent-lime              → --emerald-500 (deprecated alias)
--accent-red (#e63946)     → --emerald-500
--accent-red-subtle        → --emerald-dim
--accent-primary-dim       → --emerald-dim
--accent-primary-glow      → --emerald-glow
--accent-green (#4ade80)   → --emerald-400 (#34d399)
--color-accent             → --emerald-500
--color-text-accent        → --text-accent (#34d399)
```

### 7.3 Macros
```
--protein-color (#4ade80)  → --protein (#10b981)
--carb-color (#60a5fa)     → --carb (#3b82f6)
--fat-color (#fbbf24)      → --fat (#f59e0b)
```

### 7.4 Text
```
--text-primary             → --text-primary (#f0f0f0) [sem mudança significativa]
--text-secondary           → --text-secondary (rgba 0.64) [ajuste de opacidade]
--text-tertiary            → --text-tertiary (rgba 0.40)
```

---

## 8. Implementação

### Fase 1: Atualizar tokens.css
Trocar valores das variáveis existentes para a nova paleta. Como todo o CSS já referencia `var(--*)`, a mudança propaga automaticamente.

### Fase 2: Hero/Landing redesign
Primeira seção a receber tratamento editorial completo.

### Fase 3: Dashboard sections (uma por vez)
Macros → Final → Meals → Projection → Simulator → Supplements

### Fase 4: Presentation mode
Adaptar slides ao novo tema.

---

## 9. Decisões pendentes (para Arthur aprovar)

1. **Proteína = Emerald?** Proteína vira a cor do accent primário. Faz sentido no contexto cutting (proteína é o macro mais importante), mas muda a associação visual.

2. **Vitamina D e Whey unificar com gold/emerald?** Ou manter cores próprias distintas?

3. **Font loading:** Inter via Google Fonts + Geist Mono via CDN Vercel? Ou self-hosted?

4. **Border radius increase:** de 8-12px para 12-16px. OK?