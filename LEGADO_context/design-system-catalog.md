# Design System Catalog - Component Pattern Extraction (Agent 9)

> Data: 2026-03-04
> Modo: documentacao + utilities de referencia (sem refatoracao de JSX)
> Escopo: `src/styles/*.css` (12 arquivos), com foco analitico nos 8 arquivos de secao

## 1) Escopo e Metodo

- Fontes principais: `screens.css`, `dashboard-presentation.css`, `dashboard-macros.css`, `dashboard-meals.css`, `dashboard-projection.css`, `dashboard-simulator.css`, `dashboard-supplements.css`, `dashboard-final.css`.
- Fontes de contexto: `base.css`, `index.css`, `tokens.css`, `shared-patterns.css`.
- Exclusoes: regras dentro de `@media`, `@keyframes`, e declaracoes `--*`.
- Metodo deterministico:
- Parse com PostCSS.
- Normalizacao por assinatura `prop:value`.
- Contagem por seletor, classe e arquivo.
- Agrupamento por taxonomia visual: `Layout`, `Content`, `Data Display`, `Typography`, `Feedback`, `Decoration`, `Interactive`.
- Regra para utility class: somente assinatura identica com `>= 5` ocorrencias.

## 2) Resumo Executivo

| Metrica | Valor |
|---|---:|
| Padroes catalogados (curados) | 21 |
| Categorias cobertas | 7 |
| Utilities aceitas (estrito + base) | 12 |
| Utilities rejeitadas (nao-componente / semantica local) | 6 |
| Economia estimada com migracao para `.df-u-*` | 176 declaracoes |

### 2.1 Padroes por Categoria

| Categoria | Padroes |
|---|---:|
| Layout | 3 |
| Content | 3 |
| Data Display | 3 |
| Typography | 3 |
| Feedback | 3 |
| Decoration | 3 |
| Interactive | 3 |

### 2.2 Top 10 Padroes Mais Repetidos

| Rank | Padrao | Ocorrencias | Distribuicao principal |
|---|---|---:|---|
| 1 | Card surface base cluster | 342 | screens (144), presentation (135), macros (42) |
| 2 | Modal and toast interaction | 109 | final (47), supplements (34), projection (16) |
| 3 | KPI metric cluster | 104 | presentation (57), screens (38) |
| 4 | Progress ring gauge cluster | 104 | screens (50), presentation (17), macros (12) |
| 5 | Button CTA cluster | 96 | screens (46), presentation (20), simulator (16) |
| 6 | Glass card subtle | 92 | screens (46), presentation (30) |
| 7 | State modifiers active/selected | 86 | simulator (29), presentation (17), screens (13) |
| 8 | Badge tag pill cluster | 56 | screens (27), presentation (17) |
| 9 | Structural stack primitives | 47 | projection (14), presentation (11) |
| 10 | Section title stack | 40 | projection (9), supplements (9), presentation (7) |

## 3) Catalogo Detalhado

## Layout

### Layout - Legacy Section Root Container
**Ocorrencias:** 16 (shared-patterns: 4, final: 3, meals: 3, simulator: 3, supplements: 3)
**Propriedades core:**
- `position: relative`
- `width: 100%`
- `min-height: 100dvh`
- `overflow: visible`
- `isolation: isolate`
**Variacoes:**
1. Base consolidada em `shared-patterns.css`.
2. Repeticoes locais ainda presentes nos CSS de secao.
**Tokens envolvidos:** `--header-height` (indireto no layout do slide), `--spacing-*` (contexto da secao).
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .final-section-legacy`
- `#screen-dashboard[data-dashboard-presentation] .meals-section-legacy`
- `#screen-dashboard[data-dashboard-presentation] .simulator-section-legacy`
- `#screen-dashboard[data-dashboard-presentation] .supplements-section-legacy`

### Layout - DFP Slide Inner Base
**Ocorrencias:** 4 (shared-patterns: 4)
**Propriedades core:**
- `width: 100%`
- `max-width: none`
- `margin: 0`
- `flex: 1 1 100%`
- `padding: calc(var(--header-height) + var(--spacing-md)) 0 56px`
**Variacoes:**
1. `data-section-id='final'`
2. `data-section-id='meals'`
3. `data-section-id='whatif'`
4. `data-section-id='supplements'`
**Tokens envolvidos:** `--header-height`, `--spacing-md`
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .dfp-slide[data-section-id='final'] .dfp-slide-inner`
- `#screen-dashboard[data-dashboard-presentation] .dfp-slide[data-section-id='meals'] .dfp-slide-inner`

### Layout - Structural Stack Primitives
**Ocorrencias:** 47 (projection: 14, presentation: 11, supplements: 6, screens: 5, simulator: 5, meals: 3, final: 2, macros: 1)
**Propriedades core:**
- `display: flex`
- `flex-direction: column`
- `gap: var(--space-1|2|3|4)`
**Variacoes:**
1. Stack compacta (`gap: var(--space-1)`).
2. Stack media (`gap: var(--space-2|3)`).
3. Stack espacada (`gap: var(--space-4)`).
**Tokens envolvidos:** `--space-1`, `--space-2`, `--space-3`, `--space-4`
**Evidencias:**
- `.speed-stack`
- `#screen-dashboard[data-dashboard-presentation] .projection-section-legacy .section-header-left`
- `#screen-dashboard[data-dashboard-presentation] .supplements-section-legacy .modal-benefit-list`

## Content

### Content - Card Surface Base
**Ocorrencias:** 342 (screens: 144, presentation: 135, macros: 42, projection: 11, meals: 10)
**Propriedades core:**
- `background` em superficies escuras ou semi-transparentes
- `border` com `var(--border-dim|default|subtle)`
- `border-radius` com `var(--radius-md|lg|xl)`
- `padding` com `var(--space-4|5|6)`
**Variacoes:**
1. Card informativo (`chart-card`, `target-info-card`).
2. Card de bloco de dados (`kpi-card`, `goal-card`, `macro-card`).
3. Card de secao (`meal-card`, `supp-card`, `refeed-item`).
**Tokens envolvidos:** `--surface-*`, `--border-*`, `--radius-*`, `--space-*`
**Evidencias:**
- `.chart-card`
- `.kpi-card`
- `.goal-card`
- `.macro-card`
**Risco de scoping:** alto para `.meal-card`, `.macro-card`, `.before-after-card` (colisoes ativas no scoping audit).

### Content - Glass Card Subtle
**Ocorrencias:** 92 (screens: 46, presentation: 30, meals: 10, projection: 6)
**Propriedades core:**
- `background: rgba(15, 15, 19, 0.9)` ou superficie equivalente
- `border: 1px solid var(--border-dim)`
- contexto frequente com `backdrop-filter` em variacoes locais
**Variacoes:**
1. Glass estavel (sem hover).
2. Glass com destaque em cards de dashboard.
**Tokens envolvidos:** `--border-dim`, `--bg-glass`, `--bg-glass-heavy`
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .target-info-card`
- `#screen-dashboard[data-dashboard-presentation] .whatif-card`
- `#screen-dashboard[data-dashboard-presentation] .before-after-card`

### Content - Action Card Hover Lift
**Ocorrencias:** 21 (presentation: 12, macros: 5, screens: 4)
**Propriedades core:**
- `transform: translateY(-1px)`
- `border-color: rgba(255, 255, 255, 0.14)`
- `box-shadow` de elevacao + glow
**Variacoes:**
1. Hover em cards de secao (`speed-card`, `supp-card`).
2. Hover em cards de macro e blocos de destaque (`macro-card`, `s3-block`).
**Tokens envolvidos:** `--border-hover` (equivalente semantico), `--shadow-card-hover` (equivalente semantico)
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .macro-card:hover`
- `#screen-dashboard[data-dashboard-presentation] .supp-card:hover`
- `.macro-card:hover`

## Data Display

### Data Display - KPI Metric Cluster
**Ocorrencias:** 104 (presentation: 57, screens: 38, macros: 7, projection: 1, shared-patterns: 1)
**Propriedades core:**
- bloco com valor numerico destacado
- label/auxiliar com contraste reduzido
- composicao vertical ou inline com unidade
**Variacoes:**
1. KPI card (`.kpi-card*`).
2. Before/After metric (`.ba-metric-*`).
3. What-if result (`.whatif-result-*`).
**Tokens envolvidos:** `--text-primary`, `--text-secondary`, `--text-tertiary`, `--font-mono`
**Evidencias:**
- `.kpi-card-value`
- `.ba-metric-value`
- `.whatif-result-value`

### Data Display - Progress Ring Gauge Cluster
**Ocorrencias:** 104 (screens: 50, presentation: 17, macros: 12, simulator: 11, projection: 5, final: 5, meals: 2, shared-patterns: 2)
**Propriedades core:**
- trilha (`track`) + preenchimento (`fill`)
- versoes lineares (progress bar, slider) e circulares (ring, gauge)
- estados com cores de status
**Variacoes:**
1. `progress-bar-fill` no formulario.
2. `range-gauge__*` na secao de macros.
3. `calorie-ring__*` em refeicoes.
**Tokens envolvidos:** `--accent-*`, `--surface-*`, `--space-*`
**Evidencias:**
- `.progress-bar-fill`
- `#screen-dashboard[data-dashboard-presentation] .range-gauge__fill`
- `#screen-dashboard[data-dashboard-presentation] .meals-section-legacy .calorie-ring`

### Data Display - Chart / Legend Wrapper Cluster
**Ocorrencias:** 39 (screens: 16, presentation: 13, projection: 10)
**Propriedades core:**
- header de grafico com titulo/subtitulo
- legenda com linhas coloridas
- wrapper com spacing consistente
**Variacoes:**
1. Estrutura base (`chart-header`, `chart-title`, `chart-subtitle`).
2. Itens de legenda (`chart-legend-item`, `legend-line*`).
**Tokens envolvidos:** `--text-*`, `--accent-*`, `--space-*`
**Evidencias:**
- `.chart-header`
- `.chart-legend`
- `.legend-line`
**Risco de scoping:** alto para `.chart-title`, `.chart-subtitle`, `.chart-legend`, `.legend-line`.

## Typography

### Typography - Section Title Stack
**Ocorrencias:** 40 (projection: 9, supplements: 9, presentation: 7, simulator: 6, screens: 5, final: 3, meals: 1)
**Propriedades core:**
- titulo principal com peso alto
- subtitulo/eyebrow com contraste reduzido
- espacamento vertical curto
**Variacoes:**
1. `section-title` generico.
2. `section-subtitle` em projecao.
3. `dash-section-title` no dashboard global.
**Tokens envolvidos:** `--font-display`, `--weight-*`, `--text-*`, `--tracking-*`
**Evidencias:**
- `.section-title`
- `.section-subtitle`
- `.dash-section-title`

### Typography - Text XS Tertiary Label
**Ocorrencias:** 9 (screens: 4, final: 4, presentation: 1)
**Propriedades core:**
- `font-size: 12px`
- `color: var(--text-tertiary)`
**Variacoes:**
1. Unidade/legenda curta (`meal-kcal-unit`).
2. Texto auxiliar em toast/modal/footer.
**Tokens envolvidos:** `--text-tertiary`
**Evidencias:**
- `.meal-kcal-unit`
- `.kpi-card-sub`
- `#screen-dashboard[data-dashboard-presentation] .final-section-legacy .toast-desc`

### Typography - Mono Numeric Emphasis
**Ocorrencias:** 22 (presentation: 8, macros: 7, screens: 4, shared-patterns: 3)
**Propriedades core:**
- `font-family: var(--font-mono)`
- peso alto para numero (`var(--weight-bold)`) 
- destaque em cor primaria de texto
**Variacoes:**
1. Valor kcal de macro.
2. Valor de what-if.
3. Valor de hero metric.
**Tokens envolvidos:** `--font-mono`, `--weight-bold`, `--text-primary`, `--text-base`
**Evidencias:**
- `.whatif-result-value`
- `.macro-card__kcal-value`
- `.hero-metric__value`

## Feedback

### Feedback - Badge / Tag / Pill Cluster
**Ocorrencias:** 56 (screens: 27, presentation: 17, projection: 6, final: 6)
**Propriedades core:**
- chips compactos com radius pill
- cores semanticas por estado/categoria
- tipografia curta com tracking de label
**Variacoes:**
1. `badge-*` generico.
2. `meal-tag` por refeicao.
3. `projection-estimated-pill` e `protocol-badge`.
**Tokens envolvidos:** `--radius-pill`, `--accent-*`, `--text-*`
**Evidencias:**
- `.badge-green`
- `.meal-tag`
- `.projection-estimated-pill`

### Feedback - Delta Positive / Negative
**Ocorrencias:** 12 (screens: 5, presentation: 2, simulator: 2, final: 2, projection: 1)
**Propriedades core:**
- diferencia visual para ganho/perda
- combinacao de cor + possivel glow
**Variacoes:**
1. `.delta-positive`
2. `.delta-negative`
3. `.positive` / `.negative` em componentes legados
**Tokens envolvidos:** `--accent-green`, `--accent-red`, `--success-color`, `--warning-color`
**Evidencias:**
- `#screen-dashboard .whatif-result-value.delta-positive`
- `#screen-dashboard .whatif-result-diff.delta-negative`
- `.receipt-value.positive`

### Feedback - State Modifiers (active/selected/visible)
**Ocorrencias:** 86 (simulator: 29, presentation: 17, screens: 13, projection: 13, supplements: 9, final: 5)
**Propriedades core:**
- ativacao visual por classe de estado
- controle de visibilidade e destaque
**Variacoes:**
1. `.active` para navegacao/estado de painel.
2. `.selected` para cards/opcoes.
3. `.visible` para overlays/modais.
**Tokens envolvidos:** depende do contexto do componente.
**Evidencias:**
- `.question-sub-panel.active`
- `.goal-card.selected`
- `.modal-overlay.visible`
**Risco de scoping:** alto (`.active`, `.selected`, `.highlight`) no scoping audit.

## Decoration

### Decoration - Noise / Glow / Overlay Cluster
**Ocorrencias:** 35 (final: 16, presentation: 11, meals: 3, supplements: 3, projection: 2)
**Propriedades core:**
- camadas visuais para profundidade (noise, glow, particles)
- overlays absolutos sem interacao do usuario
**Variacoes:**
1. `hero-glow*` e `hero-bg-noise`.
2. `noise-overlay` por secao.
3. `particle` e `bg-grid` em final.
**Tokens envolvidos:** `--accent-*`, `--bg-glass*`, `--shadow-*`
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .hero-bg-noise`
- `#screen-dashboard[data-dashboard-presentation] .final-section-legacy .particle`
- `#screen-dashboard[data-dashboard-presentation] .meals-section-legacy .noise-overlay`

### Decoration - Divider and Line Accents
**Ocorrencias:** 21 (screens: 8, presentation: 5, final: 5, macros: 1, meals: 1, projection: 1)
**Propriedades core:**
- linhas de separacao e guias visuais
- versoes neutras e coloridas
**Variacoes:**
1. `section-divider`.
2. `legend-line*` para legenda de grafico.
3. `timeline-line` e `river-bar__divider`.
**Tokens envolvidos:** `--border-*`, `--accent-*`
**Evidencias:**
- `.section-divider`
- `.legend-line`
- `#screen-dashboard[data-dashboard-presentation] .final-section-legacy .timeline-line`

### Decoration - Absolute Decorative Fill
**Ocorrencias:** 9 (presentation: 8, supplements: 1)
**Propriedades core:**
- `position: absolute`
- `inset: 0`
- `pointer-events: none`
**Variacoes:**
1. camadas `tdee-bg-*`
2. `modal-header-bg` em suplementos
**Tokens envolvidos:** `--z-*` (contextual), `--accent-*` (na camada)
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .tdee-bg-line`
- `#screen-dashboard[data-dashboard-presentation] .supplements-section-legacy .modal-header-bg`

## Interactive

### Interactive - Button / CTA Cluster
**Ocorrencias:** 96 (screens: 46, presentation: 20, simulator: 16, final: 14)
**Propriedades core:**
- botao com transicao curta
- variantes por intencao (primario, secundario, iconico)
- estado hover e active
**Variacoes:**
1. `btn-primary`, `btn-icon`.
2. `btn-form-*` no formulario.
3. `action-btn` e CTAs de secao.
**Tokens envolvidos:** `--transition-fast`, `--radius-*`, `--accent-*`, `--text-*`
**Evidencias:**
- `.btn-primary`
- `.btn-form-next`
- `#screen-dashboard[data-dashboard-presentation] .action-btn`

### Interactive - Toggle and Disclosure States
**Ocorrencias:** 4 (presentation: 2, macros: 2)
**Propriedades core:**
- abrir/fechar detalhes com classe de estado
- rotacao de icone de toggle
**Variacoes:**
1. `.macro-card__toggle-btn.is-open`
2. `.macro-card__details.is-open`
**Tokens envolvidos:** `--transition-*`, `--ease-*`
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .macro-card__toggle-btn.is-open .macro-card__toggle-icon`
- `#screen-dashboard[data-dashboard-presentation] .macro-card__details.is-open`

### Interactive - Modal and Toast Interaction Surfaces
**Ocorrencias:** 109 (final: 47, supplements: 34, projection: 16, simulator: 8, meals: 4)
**Propriedades core:**
- overlays de bloqueio + container de conteudo
- feedback temporal (toast)
- tooltip contextual
**Variacoes:**
1. `modal-*` (header/body/close/icon).
2. `toast-*` (container/item/icon).
3. `tooltip-*` em projection/meals.
**Tokens envolvidos:** `--z-modal`, `--z-overlay`, `--bg-glass*`, `--border-*`
**Evidencias:**
- `#screen-dashboard[data-dashboard-presentation] .final-section-legacy .modal-overlay`
- `#screen-dashboard[data-dashboard-presentation] .final-section-legacy .toast-container`
- `#screen-dashboard[data-dashboard-presentation] .projection-section-legacy .tooltip-week`

## 4) Candidatos a Utility Classes (Estrito + Base)

Criterio de aceite:
- Assinatura identica `prop:value`.
- `>= 5` ocorrencias em seletores com classe.
- Nao encapsular semantica de dominio especifica.

### 4.1 Utilities Aceitas

| Utility | Declaracoes | Ocorrencias | Arquivos |
|---|---|---:|---:|
| `.df-u-stack-col-1` | `display:flex; flex-direction:column; gap:var(--space-1)` | 6 | 5 |
| `.df-u-stack-col-2` | `display:flex; flex-direction:column; gap:var(--space-2)` | 6 | 3 |
| `.df-u-stack-col-3` | `display:flex; flex-direction:column; gap:var(--space-3)` | 6 | 2 |
| `.df-u-stack-col-4` | `display:flex; flex-direction:column; gap:var(--space-4)` | 9 | 5 |
| `.df-u-row-center-gap-2-5` | `display:flex; align-items:center; gap:var(--space-2-5)` | 8 | 5 |
| `.df-u-row-center-gap-3` | `display:flex; align-items:center; gap:var(--space-3)` | 5 | 4 |
| `.df-u-row-between-center` | `display:flex; align-items:center; justify-content:space-between` | 5 | 3 |
| `.df-u-row-baseline-gap-2` | `display:flex; align-items:baseline; gap:var(--space-2)` | 5 | 2 |
| `.df-u-abs-fill-passive` | `position:absolute; inset:0; pointer-events:none` | 5 | 2 |
| `.df-u-card-glass-subtle` | `background:rgba(15, 15, 19, 0.9); border:1px solid var(--border-dim)` | 7 | 1 |
| `.df-u-card-hover-lift:hover` | `transform:translateY(-1px); border-color:rgba(255, 255, 255, 0.14); box-shadow:0 4px 24px rgba(0, 0, 0, 0.4), 0 0 32px rgba(232, 0, 29, 0.05)` | 7 | 1 |
| `.df-u-text-xs-tertiary` | `font-size:12px; color:var(--text-tertiary)` | 5 | 2 |

### 4.2 Candidatos Rejeitados (neste agente)

| Assinatura / Grupo | Motivo de rejeicao |
|---|---|
| `opacity:1; transform:none` (reduced-motion) | Regra de acessibilidade/estado global, nao primitive de componente. |
| `-webkit-appearance:none; margin:0` (spin buttons) | Fix especifico de browser. |
| `background: var(--dash-surface); border-color: var(--border-dim)` | Semantica local do dashboard global; depende de contexto de tema. |
| `opacity:0; transform:translateY(30px)` | Estado de animacao inicial, nao bloco visual de composicao. |
| `height:18px; width:18px` para `svg` icones | Primitive utilitaria muito generica e sem ganho semantico. |
| `text-align:center` combinada com stacks locais | Reuso heterogeneo entre dominios distintos. |

## 5) Estimativa de Reducao de CSS

Formula adotada: `economia ~= sum((n - 1) * d)`

- `n`: ocorrencias da assinatura original.
- `d`: numero de declaracoes da assinatura.

Resultado para as 12 utilities aceitas:
- Economia minima estimada: **176 declaracoes**.
- Economia real esperada na migracao para React: **220-320 linhas CSS**, considerando remocao de repeticoes de bloco e consolidacao de variacoes (`--hover`, estados e wrappers).

## 6) Riscos e Notas de Scoping

- Colisoes ativas de alto risco continuam relevantes para migracao futura: `.active`, `.highlight`, `.ba-metric-value`, `.before-after-card`, `.chart-title`, `.chart-subtitle`, `.refeed-item`, `.selected`, `.meal-card`, `.macro-card`, `.chart-legend`, `.legend-line`.
- Este agente nao altera seletores existentes nem aplica utilities em JSX. As classes `.df-u-*` sao apenas referencia para fase de refatoracao.
- `DUPLICACAO` macros vs presentation permanece como oportunidade de extracao adicional em fase de componentizacao.
