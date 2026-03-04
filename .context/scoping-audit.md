# CSS Scoping Audit (Fase A)

> Auditoria read-only de escopo CSS nos 8 arquivos de secao. Nenhum arquivo de producao foi alterado nesta fase.

## Escopo

- Arquivos auditados: `screens.css`, `dashboard-final.css`, `dashboard-macros.css`, `dashboard-meals.css`, `dashboard-presentation.css`, `dashboard-projection.css`, `dashboard-simulator.css`, `dashboard-supplements.css`.
- Contexto consultado: `.context/architecture.md`, `src/styles/tokens.css`, `src/styles/shared-patterns.css`.
- Exclusoes aplicadas: regras em `@media`, regras em `@keyframes`, e declaracoes `--*`.

## Resumo Executivo

- Regras analisadas (apos exclusoes): **3339**
- Classes unicas encontradas: **1864**
- Classes em 2+ arquivos: **328**
- Classes unicas de arquivo (OK): **1536**

### Totais por Tipo

| Tipo | Total |
|---|---:|
| COLISAO ATIVA | 125 |
| COLISAO LATENTE | 89 |
| DUPLICACAO | 114 |
| OK | 1536 |

### Totais por Risco (somente classes em 2+ arquivos)

| Risco | Total |
|---|---:|
| ALTO | 12 |
| MEDIO | 161 |
| BAIXO | 155 |

## Regras de Classificacao Aplicadas

- `Decl. iguais = SIM`: Jaccard 1.00 entre conjuntos agregados `prop:value` por arquivo.
- `Decl. iguais = PARCIAL`: Jaccard >= 0.40 e < 1.00.
- `Decl. iguais = NAO`: Jaccard < 0.40.
- `DUPLICACAO`: classe em 2+ arquivos com `SIM`.
- `COLISAO ATIVA`: classe em 2+ arquivos com `PARCIAL/NAO` e seletores amplos concorrentes em 2+ arquivos (global/dashboard).
- `COLISAO LATENTE`: classe em 2+ arquivos com `PARCIAL/NAO` mas confinada a escopos de secao, incluindo base+override intencional.
- `OK`: classe presente em apenas 1 arquivo no escopo auditado.

## Tabela Principal (Curada - foco em ALTO/MEDIO)

| Classe | Arquivos | Declaracoes iguais? | Risco | Tipo | Evidencia |
|---|---|---|---|---|---|
| \.active | 6 (dashboard-final.css, dashboard-presentation.css, dashboard-projection.css, dashboard-simulator.css, dashboard-supplements.css, screens.css) | NAO (j=0.00; 0/58) | ALTO | COLISAO ATIVA | screens.css -> .question-sub-panel.active |
| \.highlight | 5 (dashboard-final.css, dashboard-presentation.css, dashboard-projection.css, dashboard-simulator.css, screens.css) | NAO (j=0.00; 0/19) | ALTO | COLISAO ATIVA | screens.css -> .speed-main .highlight |
| \.ba-metric-value | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.00; 0/15) | ALTO | COLISAO ATIVA | screens.css -> .ba-metric-value |
| \.before-after-card | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.00; 0/36) | ALTO | COLISAO ATIVA | screens.css -> .before-after-card |
| \.chart-subtitle | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.00; 0/11) | ALTO | COLISAO ATIVA | screens.css -> .chart-subtitle |
| \.chart-title | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.00; 0/14) | ALTO | COLISAO ATIVA | screens.css -> .chart-title |
| \.refeed-item | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.00; 0/29) | ALTO | COLISAO ATIVA | screens.css -> .refeed-item |
| \.selected | 3 (dashboard-presentation.css, dashboard-simulator.css, screens.css) | NAO (j=0.00; 0/52) | ALTO | COLISAO ATIVA | screens.css -> .goal-card.selected |
| \.meal-card | 3 (dashboard-meals.css, dashboard-presentation.css, screens.css) | NAO (j=0.02; 1/62) | ALTO | COLISAO ATIVA | screens.css -> .meal-card |
| \.macro-card | 3 (dashboard-macros.css, dashboard-presentation.css, screens.css) | NAO (j=0.02; 1/45) | ALTO | COLISAO ATIVA | screens.css -> .macro-card |
| \.chart-legend | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.17; 1/6) | ALTO | COLISAO ATIVA | screens.css -> .chart-legend |
| \.legend-line | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.17; 1/6) | ALTO | COLISAO ATIVA | screens.css -> .legend-line |
| \.chart-header | 3 (dashboard-presentation.css, dashboard-projection.css, screens.css) | NAO (j=0.30; 3/10) | MEDIO | COLISAO ATIVA | screens.css -> .chart-header |
| \.after-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/3) | MEDIO | COLISAO ATIVA | screens.css -> .ba-side-label.after-label |
| \.after-val | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/3) | MEDIO | COLISAO ATIVA | screens.css -> .ba-metric-value.after-val |
| \.ba-arrow | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .ba-arrow |
| \.ba-side | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .ba-side |
| \.ba-weeks | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .ba-weeks |
| \.badge-green | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/12) | MEDIO | COLISAO ATIVA | screens.css -> .badge-green |
| \.badge-yellow | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .meal-tag.badge-yellow |
| \.before-after-badge | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .before-after-badge |
| \.btn-dash-cta | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/25) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .btn-dash-cta |
| \.btn-form-back | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/34) | MEDIO | COLISAO ATIVA | screens.css -> .btn-form-back |
| \.btn-form-next | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/34) | MEDIO | COLISAO ATIVA | screens.css -> .btn-form-next |
| \.chart-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/22) | MEDIO | COLISAO ATIVA | screens.css -> .chart-card |
| \.dash-section-action | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/14) | MEDIO | COLISAO ATIVA | screens.css -> .dash-section-action |
| \.delta-negative | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .whatif-result-value.delta-negative, #screen-dashboard .whatif-result-diff.delta-negative |
| \.delta-positive | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .whatif-result-value.delta-positive, #screen-dashboard .whatif-result-diff.delta-positive |
| \.df-profile-trigger-fallback | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .df-profile-trigger-fallback |
| \.goal-card-title | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .goal-card-title |
| \.goal-cards-grid-3 | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .goal-cards-grid-3 |
| \.is-active | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .df-profile-card.is-active |
| \.kpi-card-value | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/19) | MEDIO | COLISAO ATIVA | screens.css -> .kpi-card-value |
| \.legend-line-red | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .legend-line-red |
| \.legend-line-violet | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/3) | MEDIO | COLISAO ATIVA | screens.css -> .legend-line-violet |
| \.meal-composition-carb | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-carb |
| \.meal-composition-fat | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-fat |
| \.meal-composition-prot | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-prot |
| \.meal-kcal | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .meal-kcal |
| \.meal-kcal-unit | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .meal-kcal-unit |
| \.meal-macro | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macro |
| \.meal-macro-val | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macro-val |
| \.meal-macros | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/5) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macros |
| \.meal-name | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/7) | MEDIO | COLISAO ATIVA | screens.css -> .meal-name |
| \.meal-time-badge | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/16) | MEDIO | COLISAO ATIVA | screens.css -> .meal-time-badge |
| \.pos-treino | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .meal-card.pos-treino |
| \.pre-treino | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .meal-card.pre-treino |
| \.priority-high | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .priority-high |
| \.priority-low | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .priority-low |
| \.priority-medium | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .priority-medium |
| \.projection-empty-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .projection-empty-card |
| \.refeed-badge | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/15) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-badge |
| \.refeed-card-wrapper | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-card-wrapper |
| \.refeed-info-box | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-info-box |
| \.refeed-info-text | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/7) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-info-text |
| \.refeed-item-subtitle | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-item-subtitle |
| \.refeed-item-value | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-item-value |
| \.slider-track | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/14) | MEDIO | COLISAO ATIVA | screens.css -> .slider-track |
| \.speed-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/29) | MEDIO | COLISAO ATIVA | screens.css -> .speed-card |
| \.speed-card-cyan | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> .speed-card-cyan |
| \.speed-direction-bulk | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .speed-direction-bulk |
| \.speed-direction-cut | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .speed-direction-cut |
| \.speed-label-cyan | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .speed-label-cyan |
| \.speed-main | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/15) | MEDIO | COLISAO ATIVA | screens.css -> .speed-main |
| \.speed-strong | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .speed-strong |
| \.speed-sub | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/5) | MEDIO | COLISAO ATIVA | screens.css -> .speed-sub |
| \.supp-icon | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/18) | MEDIO | COLISAO ATIVA | screens.css -> .supp-icon |
| \.supp-name | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .supp-name |
| \.supps-grid-uniform | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/5) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .supps-grid-uniform |
| \.supps-priority-block | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .supps-priority-block |
| \.target-info-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-card |
| \.target-info-highlight | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-highlight |
| \.target-info-icon | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-icon |
| \.target-info-text | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-text |
| \.whatif-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/30) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-card |
| \.whatif-card-zone | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .whatif-card-zone |
| \.whatif-preview | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-preview |
| \.whatif-result-diff | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-diff |
| \.whatif-result-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-label |
| \.whatif-result-row-last | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-row-last |
| \.whatif-result-value | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-value.changed |
| \.whatif-slider-item | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-item |
| \.whatif-slider-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.00; 0/7) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-label |
| \.goal-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.02; 1/63) | MEDIO | COLISAO ATIVA | screens.css -> .goal-card |
| \.supp-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.03; 1/31) | MEDIO | COLISAO ATIVA | screens.css -> .supp-card |
| \.dash-section-title | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.05; 1/20) | MEDIO | COLISAO ATIVA | screens.css -> .dash-section-title |
| \.projection-estimated-pill | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.06; 1/18) | MEDIO | COLISAO ATIVA | screens.css -> .projection-estimated-pill |
| \.slider-fill | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 1/13) | MEDIO | COLISAO ATIVA | screens.css -> .slider-fill |
| \.supps-priority-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 1/13) | MEDIO | COLISAO ATIVA | screens.css -> .supps-priority-label |
| \.range-input | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 3/38) | MEDIO | COLISAO ATIVA | screens.css -> .range-input |
| \.hero-content | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 1/12) | MEDIO | COLISAO ATIVA | screens.css -> .hero-content |
| \.kpi-card | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 3/36) | MEDIO | COLISAO ATIVA | screens.css -> .kpi-card |
| \.meals-grid | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 1/12) | MEDIO | COLISAO ATIVA | screens.css -> .meals-grid |
| \.whatif-preview-title | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.08; 1/12) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-preview-title |
| \.meal-tag | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.09; 2/23) | MEDIO | COLISAO ATIVA | screens.css -> .meal-tag |
| \.priority-badge | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.09; 1/11) | MEDIO | COLISAO ATIVA | screens.css -> .priority-badge |
| \.supp-dose | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.09; 1/11) | MEDIO | COLISAO ATIVA | screens.css -> .supp-dose |
| \.speed-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.10; 1/10) | MEDIO | COLISAO ATIVA | screens.css -> .speed-label |
| \.kpi-card-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.11; 2/18) | MEDIO | COLISAO ATIVA | screens.css -> .kpi-card-label |
| \.refeed-item-title | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.11; 1/9) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-item-title |
| \.supp-timing | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.11; 1/9) | MEDIO | COLISAO ATIVA | screens.css -> .supp-timing |
| \.whatif-slider-value | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.13; 1/8) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-value |
| \.dash-two-col | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.14; 1/7) | MEDIO | COLISAO ATIVA | screens.css -> .dash-two-col |
| \.refeed-grid | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.14; 1/7) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-grid |
| \.ba-side-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.17; 2/12) | MEDIO | COLISAO ATIVA | screens.css -> .ba-side-label |
| \.goal-cards-grid | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> .goal-cards-grid |
| \.meal-number | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.17; 2/12) | MEDIO | COLISAO ATIVA | screens.css -> .meal-number |
| \.refeed-item-macros | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .refeed-item-macros |
| \.supps-grid | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> .supps-grid |
| \.whatif-inner-grid | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-inner-grid |
| \.dash-section-header | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.20; 2/10) | MEDIO | COLISAO ATIVA | screens.css -> .dash-section-header |
| \.meal-macro-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.20; 1/5) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macro-label |
| \.supp-priority | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.20; 1/5) | MEDIO | COLISAO ATIVA | screens.css -> .supp-priority |
| \.whatif-result-row | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.22; 2/9) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-row |
| \.df-profile-trigger | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.24; 6/25) | MEDIO | COLISAO ATIVA | screens.css -> .df-profile-trigger |
| \.ba-metric-label | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.25; 1/4) | MEDIO | COLISAO ATIVA | screens.css -> .ba-metric-label |
| \.form-nav | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.29; 2/7) | MEDIO | COLISAO ATIVA | screens.css -> .form-nav |
| \.chart-wrapper | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.33; 1/3) | MEDIO | COLISAO ATIVA | screens.css -> .chart-wrapper |
| \.speed-direction | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.36; 4/11) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .speed-direction |
| \.chart-legend-item | 2 (dashboard-presentation.css, screens.css) | NAO (j=0.38; 3/8) | MEDIO | COLISAO ATIVA | screens.css -> .chart-legend-item |

## Appendix A - Inventario Completo de Colisoes (ATIVA + LATENTE)

| Classe | Arquivos | Declaracoes iguais? | Risco | Tipo | Evidencia |
|---|---|---|---|---|---|
| \.active | 6 | NAO (j=0.00; 0/58) | ALTO | COLISAO ATIVA | screens.css -> .question-sub-panel.active |
| \.highlight | 5 | NAO (j=0.00; 0/19) | ALTO | COLISAO ATIVA | screens.css -> .speed-main .highlight |
| \.ba-metric-value | 3 | NAO (j=0.00; 0/15) | ALTO | COLISAO ATIVA | screens.css -> .ba-metric-value |
| \.before-after-card | 3 | NAO (j=0.00; 0/36) | ALTO | COLISAO ATIVA | screens.css -> .before-after-card |
| \.chart-subtitle | 3 | NAO (j=0.00; 0/11) | ALTO | COLISAO ATIVA | screens.css -> .chart-subtitle |
| \.chart-title | 3 | NAO (j=0.00; 0/14) | ALTO | COLISAO ATIVA | screens.css -> .chart-title |
| \.refeed-item | 3 | NAO (j=0.00; 0/29) | ALTO | COLISAO ATIVA | screens.css -> .refeed-item |
| \.selected | 3 | NAO (j=0.00; 0/52) | ALTO | COLISAO ATIVA | screens.css -> .goal-card.selected |
| \.meal-card | 3 | NAO (j=0.02; 1/62) | ALTO | COLISAO ATIVA | screens.css -> .meal-card |
| \.macro-card | 3 | NAO (j=0.02; 1/45) | ALTO | COLISAO ATIVA | screens.css -> .macro-card |
| \.chart-legend | 3 | NAO (j=0.17; 1/6) | ALTO | COLISAO ATIVA | screens.css -> .chart-legend |
| \.legend-line | 3 | NAO (j=0.17; 1/6) | ALTO | COLISAO ATIVA | screens.css -> .legend-line |
| \.chart-header | 3 | NAO (j=0.30; 3/10) | MEDIO | COLISAO ATIVA | screens.css -> .chart-header |
| \.after-label | 2 | NAO (j=0.00; 0/3) | MEDIO | COLISAO ATIVA | screens.css -> .ba-side-label.after-label |
| \.after-val | 2 | NAO (j=0.00; 0/3) | MEDIO | COLISAO ATIVA | screens.css -> .ba-metric-value.after-val |
| \.ba-arrow | 2 | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .ba-arrow |
| \.ba-side | 2 | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .ba-side |
| \.ba-weeks | 2 | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .ba-weeks |
| \.badge-green | 2 | NAO (j=0.00; 0/12) | MEDIO | COLISAO ATIVA | screens.css -> .badge-green |
| \.badge-yellow | 2 | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .meal-tag.badge-yellow |
| \.before-after-badge | 2 | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .before-after-badge |
| \.btn-dash-cta | 2 | NAO (j=0.00; 0/25) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .btn-dash-cta |
| \.btn-form-back | 2 | NAO (j=0.00; 0/34) | MEDIO | COLISAO ATIVA | screens.css -> .btn-form-back |
| \.btn-form-next | 2 | NAO (j=0.00; 0/34) | MEDIO | COLISAO ATIVA | screens.css -> .btn-form-next |
| \.chart-card | 2 | NAO (j=0.00; 0/22) | MEDIO | COLISAO ATIVA | screens.css -> .chart-card |
| \.dash-section-action | 2 | NAO (j=0.00; 0/14) | MEDIO | COLISAO ATIVA | screens.css -> .dash-section-action |
| \.delta-negative | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .whatif-result-value.delta-negative, #screen-dashboard .whatif-result-diff.delta-negative |
| \.delta-positive | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .whatif-result-value.delta-positive, #screen-dashboard .whatif-result-diff.delta-positive |
| \.df-profile-trigger-fallback | 2 | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .df-profile-trigger-fallback |
| \.goal-card-title | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .goal-card-title |
| \.goal-cards-grid-3 | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .goal-cards-grid-3 |
| \.is-active | 2 | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .df-profile-card.is-active |
| \.kpi-card-value | 2 | NAO (j=0.00; 0/19) | MEDIO | COLISAO ATIVA | screens.css -> .kpi-card-value |
| \.legend-line-red | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .legend-line-red |
| \.legend-line-violet | 2 | NAO (j=0.00; 0/3) | MEDIO | COLISAO ATIVA | screens.css -> .legend-line-violet |
| \.meal-composition-carb | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-carb |
| \.meal-composition-fat | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-fat |
| \.meal-composition-prot | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-prot |
| \.meal-kcal | 2 | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .meal-kcal |
| \.meal-kcal-unit | 2 | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .meal-kcal-unit |
| \.meal-macro | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macro |
| \.meal-macro-val | 2 | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macro-val |
| \.meal-macros | 2 | NAO (j=0.00; 0/5) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macros |
| \.meal-name | 2 | NAO (j=0.00; 0/7) | MEDIO | COLISAO ATIVA | screens.css -> .meal-name |
| \.meal-time-badge | 2 | NAO (j=0.00; 0/16) | MEDIO | COLISAO ATIVA | screens.css -> .meal-time-badge |
| \.pos-treino | 2 | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .meal-card.pos-treino |
| \.pre-treino | 2 | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .meal-card.pre-treino |
| \.priority-high | 2 | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .priority-high |
| \.priority-low | 2 | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .priority-low |
| \.priority-medium | 2 | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .priority-medium |
| \.projection-empty-card | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .projection-empty-card |
| \.refeed-badge | 2 | NAO (j=0.00; 0/15) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-badge |
| \.refeed-card-wrapper | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-card-wrapper |
| \.refeed-info-box | 2 | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-info-box |
| \.refeed-info-text | 2 | NAO (j=0.00; 0/7) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-info-text |
| \.refeed-item-subtitle | 2 | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-item-subtitle |
| \.refeed-item-value | 2 | NAO (j=0.00; 0/10) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-item-value |
| \.slider-track | 2 | NAO (j=0.00; 0/14) | MEDIO | COLISAO ATIVA | screens.css -> .slider-track |
| \.speed-card | 2 | NAO (j=0.00; 0/29) | MEDIO | COLISAO ATIVA | screens.css -> .speed-card |
| \.speed-card-cyan | 2 | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> .speed-card-cyan |
| \.speed-direction-bulk | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .speed-direction-bulk |
| \.speed-direction-cut | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .speed-direction-cut |
| \.speed-label-cyan | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .speed-label-cyan |
| \.speed-main | 2 | NAO (j=0.00; 0/15) | MEDIO | COLISAO ATIVA | screens.css -> .speed-main |
| \.speed-strong | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .speed-strong |
| \.speed-sub | 2 | NAO (j=0.00; 0/5) | MEDIO | COLISAO ATIVA | screens.css -> .speed-sub |
| \.supp-icon | 2 | NAO (j=0.00; 0/18) | MEDIO | COLISAO ATIVA | screens.css -> .supp-icon |
| \.supp-name | 2 | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .supp-name |
| \.supps-grid-uniform | 2 | NAO (j=0.00; 0/5) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .supps-grid-uniform |
| \.supps-priority-block | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .supps-priority-block |
| \.target-info-card | 2 | NAO (j=0.00; 0/11) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-card |
| \.target-info-highlight | 2 | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-highlight |
| \.target-info-icon | 2 | NAO (j=0.00; 0/13) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-icon |
| \.target-info-text | 2 | NAO (j=0.00; 0/6) | MEDIO | COLISAO ATIVA | screens.css -> .target-info-text |
| \.whatif-card | 2 | NAO (j=0.00; 0/30) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-card |
| \.whatif-card-zone | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .whatif-card-zone |
| \.whatif-preview | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-preview |
| \.whatif-result-diff | 2 | NAO (j=0.00; 0/9) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-diff |
| \.whatif-result-label | 2 | NAO (j=0.00; 0/4) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-label |
| \.whatif-result-row-last | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-row-last |
| \.whatif-result-value | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-value.changed |
| \.whatif-slider-item | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-item |
| \.whatif-slider-label | 2 | NAO (j=0.00; 0/7) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-label |
| \.goal-card | 2 | NAO (j=0.02; 1/63) | MEDIO | COLISAO ATIVA | screens.css -> .goal-card |
| \.supp-card | 2 | NAO (j=0.03; 1/31) | MEDIO | COLISAO ATIVA | screens.css -> .supp-card |
| \.dash-section-title | 2 | NAO (j=0.05; 1/20) | MEDIO | COLISAO ATIVA | screens.css -> .dash-section-title |
| \.projection-estimated-pill | 2 | NAO (j=0.06; 1/18) | MEDIO | COLISAO ATIVA | screens.css -> .projection-estimated-pill |
| \.slider-fill | 2 | NAO (j=0.08; 1/13) | MEDIO | COLISAO ATIVA | screens.css -> .slider-fill |
| \.supps-priority-label | 2 | NAO (j=0.08; 1/13) | MEDIO | COLISAO ATIVA | screens.css -> .supps-priority-label |
| \.range-input | 2 | NAO (j=0.08; 3/38) | MEDIO | COLISAO ATIVA | screens.css -> .range-input |
| \.hero-content | 2 | NAO (j=0.08; 1/12) | MEDIO | COLISAO ATIVA | screens.css -> .hero-content |
| \.kpi-card | 2 | NAO (j=0.08; 3/36) | MEDIO | COLISAO ATIVA | screens.css -> .kpi-card |
| \.meals-grid | 2 | NAO (j=0.08; 1/12) | MEDIO | COLISAO ATIVA | screens.css -> .meals-grid |
| \.whatif-preview-title | 2 | NAO (j=0.08; 1/12) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-preview-title |
| \.meal-tag | 2 | NAO (j=0.09; 2/23) | MEDIO | COLISAO ATIVA | screens.css -> .meal-tag |
| \.priority-badge | 2 | NAO (j=0.09; 1/11) | MEDIO | COLISAO ATIVA | screens.css -> .priority-badge |
| \.supp-dose | 2 | NAO (j=0.09; 1/11) | MEDIO | COLISAO ATIVA | screens.css -> .supp-dose |
| \.speed-label | 2 | NAO (j=0.10; 1/10) | MEDIO | COLISAO ATIVA | screens.css -> .speed-label |
| \.kpi-card-label | 2 | NAO (j=0.11; 2/18) | MEDIO | COLISAO ATIVA | screens.css -> .kpi-card-label |
| \.refeed-item-title | 2 | NAO (j=0.11; 1/9) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-item-title |
| \.supp-timing | 2 | NAO (j=0.11; 1/9) | MEDIO | COLISAO ATIVA | screens.css -> .supp-timing |
| \.whatif-slider-value | 2 | NAO (j=0.13; 1/8) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-value |
| \.dash-two-col | 2 | NAO (j=0.14; 1/7) | MEDIO | COLISAO ATIVA | screens.css -> .dash-two-col |
| \.refeed-grid | 2 | NAO (j=0.14; 1/7) | MEDIO | COLISAO ATIVA | screens.css -> .refeed-grid |
| \.ba-side-label | 2 | NAO (j=0.17; 2/12) | MEDIO | COLISAO ATIVA | screens.css -> .ba-side-label |
| \.goal-cards-grid | 2 | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> .goal-cards-grid |
| \.meal-number | 2 | NAO (j=0.17; 2/12) | MEDIO | COLISAO ATIVA | screens.css -> .meal-number |
| \.refeed-item-macros | 2 | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .refeed-item-macros |
| \.supps-grid | 2 | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> .supps-grid |
| \.whatif-inner-grid | 2 | NAO (j=0.17; 1/6) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-inner-grid |
| \.dash-section-header | 2 | NAO (j=0.20; 2/10) | MEDIO | COLISAO ATIVA | screens.css -> .dash-section-header |
| \.meal-macro-label | 2 | NAO (j=0.20; 1/5) | MEDIO | COLISAO ATIVA | screens.css -> .meal-macro-label |
| \.supp-priority | 2 | NAO (j=0.20; 1/5) | MEDIO | COLISAO ATIVA | screens.css -> .supp-priority |
| \.whatif-result-row | 2 | NAO (j=0.22; 2/9) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-result-row |
| \.df-profile-trigger | 2 | NAO (j=0.24; 6/25) | MEDIO | COLISAO ATIVA | screens.css -> .df-profile-trigger |
| \.ba-metric-label | 2 | NAO (j=0.25; 1/4) | MEDIO | COLISAO ATIVA | screens.css -> .ba-metric-label |
| \.form-nav | 2 | NAO (j=0.29; 2/7) | MEDIO | COLISAO ATIVA | screens.css -> .form-nav |
| \.chart-wrapper | 2 | NAO (j=0.33; 1/3) | MEDIO | COLISAO ATIVA | screens.css -> .chart-wrapper |
| \.speed-direction | 2 | NAO (j=0.36; 4/11) | MEDIO | COLISAO ATIVA | screens.css -> #screen-dashboard .speed-direction |
| \.chart-legend-item | 2 | NAO (j=0.38; 3/8) | MEDIO | COLISAO ATIVA | screens.css -> .chart-legend-item |
| \.meal-composition-bar | 2 | NAO (j=0.38; 3/8) | MEDIO | COLISAO ATIVA | screens.css -> .meal-composition-bar |
| \.meal-header | 2 | PARCIAL (j=0.40; 2/5) | MEDIO | COLISAO ATIVA | screens.css -> .meal-header |
| \.whatif-slider-label-row | 2 | PARCIAL (j=0.40; 2/5) | MEDIO | COLISAO ATIVA | screens.css -> .whatif-slider-label-row |
| \.speed-stack | 2 | PARCIAL (j=0.50; 2/4) | MEDIO | COLISAO ATIVA | screens.css -> .speed-stack |
| \.before-after-row | 2 | PARCIAL (j=0.60; 3/5) | MEDIO | COLISAO ATIVA | screens.css -> .before-after-row |
| \.dfp-slide | 6 | NAO (j=0.00; 0/33) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .dfp-slide[data-section-id='final'] |
| \.page-wrapper | 4 | NAO (j=0.00; 0/37) | MEDIO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .page-wrapper |
| \.section-header | 4 | NAO (j=0.00; 0/10) | MEDIO | COLISAO LATENTE | dashboard-meals.css -> #screen-dashboard[data-dashboard-presentation] .meals-section-legacy .section-header |
| \.section-title | 4 | NAO (j=0.00; 0/31) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .section-title |
| \.carbs | 3 | NAO (j=0.00; 0/18) | MEDIO | COLISAO LATENTE | screens.css -> .macro-card.carbs |
| \.delay-1 | 3 | NAO (j=0.00; 0/3) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .animate-on-scroll.delay-1 |
| \.delay-2 | 3 | NAO (j=0.00; 0/3) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .animate-on-scroll.delay-2 |
| \.delay-3 | 3 | NAO (j=0.00; 0/3) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .animate-on-scroll.delay-3 |
| \.delay-4 | 3 | NAO (j=0.00; 0/3) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .animate-on-scroll.delay-4 |
| \.fat | 3 | NAO (j=0.00; 0/18) | MEDIO | COLISAO LATENTE | screens.css -> .macro-card.fat |
| \.negative | 3 | NAO (j=0.00; 0/7) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .delta.negative |
| \.positive | 3 | NAO (j=0.00; 0/5) | MEDIO | COLISAO LATENTE | screens.css -> .receipt-value.positive |
| \.protein | 3 | NAO (j=0.00; 0/18) | MEDIO | COLISAO LATENTE | screens.css -> .macro-card.protein |
| \.section-eyebrow | 3 | NAO (j=0.00; 0/18) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .section-eyebrow |
| \.section-subtitle | 3 | NAO (j=0.00; 0/11) | MEDIO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .section-subtitle |
| \.insight-card | 3 | NAO (j=0.17; 4/24) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .insight-card |
| \.visible | 3 | NAO (j=0.20; 1/5) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .modal-overlay.visible |
| \.section-header-right | 3 | NAO (j=0.29; 2/7) | MEDIO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .section-header-right |
| \.amber | 2 | NAO (j=0.00; 0/5) | MEDIO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .milestone-tag.amber |
| \.btn-icon | 2 | NAO (j=0.00; 0/20) | MEDIO | COLISAO LATENTE | screens.css -> .btn-icon |
| \.delay-5 | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .delay-5 |
| \.delay-6 | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .delay-6 |
| \.delay-7 | 2 | NAO (j=0.00; 0/2) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .delay-7 |
| \.down | 2 | NAO (j=0.00; 0/4) | MEDIO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .body-comp-item-change.down |
| \.footer-disclaimer | 2 | NAO (j=0.00; 0/3) | MEDIO | COLISAO LATENTE | screens.css -> .footer-disclaimer |
| \.gold | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .ticker-item-value.gold |
| \.green | 2 | NAO (j=0.00; 0/5) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .ticker-item-value.green |
| \.macros-section | 2 | NAO (j=0.00; 0/13) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .macros-section |
| \.modal-header | 2 | NAO (j=0.00; 0/8) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .modal-header |
| \.red | 2 | NAO (j=0.00; 0/5) | MEDIO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .milestone-tag.red |
| \.success | 2 | NAO (j=0.00; 0/7) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .toast-icon.success |
| \.timeline-track | 2 | NAO (j=0.00; 0/10) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .timeline-track |
| \.action-btn | 2 | NAO (j=0.05; 2/41) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .action-btn |
| \.protocol-badge | 2 | NAO (j=0.06; 2/31) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .protocol-badge |
| \.timeline-line | 2 | NAO (j=0.07; 1/15) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .timeline-line |
| \.bg-grid | 2 | NAO (j=0.09; 1/11) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .bg-grid |
| \.section-divider | 2 | NAO (j=0.11; 2/18) | MEDIO | COLISAO LATENTE | screens.css -> .section-divider |
| \.disclaimer-text | 2 | NAO (j=0.14; 1/7) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .disclaimer-text |
| \.toast-icon | 2 | NAO (j=0.16; 4/25) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .toast-icon |
| \.particle | 2 | NAO (j=0.17; 2/12) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .particle |
| \.modal-close | 2 | NAO (j=0.17; 5/29) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .modal-close |
| \.toast | 2 | NAO (j=0.22; 6/27) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .toast |
| \.modal-icon-wrap | 2 | NAO (j=0.25; 4/16) | MEDIO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .modal-icon-wrap |
| \.noise-overlay | 2 | NAO (j=0.25; 4/16) | MEDIO | COLISAO LATENTE | dashboard-meals.css -> #screen-dashboard[data-dashboard-presentation] .meals-section-legacy .noise-overlay |
| \.dfp-slide-inner | 2 | NAO (j=0.33; 5/15) | MEDIO | COLISAO LATENTE | dashboard-presentation.css -> #screen-dashboard[data-dashboard-presentation] .dfp-slide-inner |
| \.macro-card__details-inner | 2 | NAO (j=0.33; 1/3) | MEDIO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__details-inner |
| \.river-bar__seg-emoji | 2 | NAO (j=0.33; 1/3) | MEDIO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg-emoji |
| \.section-eyebrow-dot | 2 | NAO (j=0.33; 3/9) | MEDIO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .section-eyebrow-dot |
| \.section-header-left | 3 | PARCIAL (j=0.40; 2/5) | BAIXO | COLISAO LATENTE | dashboard-projection.css -> #screen-dashboard[data-dashboard-presentation] .projection-section-legacy .section-header-left |
| \.hero-metric__mini-seg--carb | 2 | PARCIAL (j=0.50; 1/2) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__mini-seg--carb |
| \.hero-metric__mini-seg--fat | 2 | PARCIAL (j=0.50; 1/2) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__mini-seg--fat |
| \.hero-metric__mini-seg--protein | 2 | PARCIAL (j=0.50; 1/2) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__mini-seg--protein |
| \.macro-card__kcal-divider | 2 | PARCIAL (j=0.50; 2/4) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__kcal-divider |
| \.macro-card__role | 2 | PARCIAL (j=0.50; 3/6) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__role |
| \.macro-card__stat-label | 2 | PARCIAL (j=0.50; 3/6) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__stat-label |
| \.hero-metric__icon-wrap | 2 | PARCIAL (j=0.56; 10/18) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__icon-wrap |
| \.range-gauge__limit | 2 | PARCIAL (j=0.57; 4/7) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__limit |
| \.modal-overlay | 2 | PARCIAL (j=0.58; 11/19) | BAIXO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .modal-overlay |
| \.toast-container | 2 | PARCIAL (j=0.60; 6/10) | BAIXO | COLISAO LATENTE | dashboard-final.css -> #screen-dashboard[data-dashboard-presentation] .final-section-legacy .toast-container |
| \.contrib-section__title | 2 | PARCIAL (j=0.63; 5/8) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-section__title |
| \.detail-cell__label | 2 | PARCIAL (j=0.63; 5/8) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-cell__label |
| \.range-gauge__title | 2 | PARCIAL (j=0.63; 5/8) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__title |
| \.detail-cell | 2 | PARCIAL (j=0.67; 8/12) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-cell |
| \.macro-card__ring-fill | 2 | PARCIAL (j=0.67; 4/6) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring-fill |
| \.macro-card__stat-item | 2 | PARCIAL (j=0.67; 4/6) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__stat-item |
| \.river-bar__seg-content | 2 | PARCIAL (j=0.67; 6/9) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg-content |
| \.density-pill | 2 | PARCIAL (j=0.69; 11/16) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill |
| \.caloric-proof__term | 2 | PARCIAL (j=0.69; 9/13) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__term |
| \.density-pills | 2 | PARCIAL (j=0.71; 5/7) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pills |
| \.macros-header | 2 | PARCIAL (j=0.71; 5/7) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macros-header |
| \.hero-metric | 2 | PARCIAL (j=0.75; 6/8) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric |
| \.hero-metric__mini-seg | 2 | PARCIAL (j=0.75; 3/4) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__mini-seg |
| \.insights-bar | 2 | PARCIAL (j=0.75; 6/8) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insights-bar |
| \.contrib-row__bar-text | 2 | PARCIAL (j=0.78; 7/9) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__bar-text |
| \.macro-card__kcal-row | 2 | PARCIAL (j=0.78; 7/9) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__kcal-row |
| \.macro-card__toggle-btn | 2 | PARCIAL (j=0.78; 18/23) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__toggle-btn |
| \.caloric-proof | 2 | PARCIAL (j=0.83; 15/18) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof |
| \.caloric-proof__result | 2 | PARCIAL (j=0.83; 10/12) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__result |
| \.macros-header__badge | 2 | PARCIAL (j=0.85; 22/26) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macros-header__badge |
| \.macro-card__ring-label | 2 | PARCIAL (j=0.86; 6/7) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring-label |
| \.composition-river | 2 | PARCIAL (j=0.89; 16/18) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river |
| \.contrib-row__bar-fill | 2 | PARCIAL (j=0.89; 16/18) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__bar-fill |
| \.contrib-section | 2 | PARCIAL (j=0.89; 16/18) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-section |
| \.macro-card__ring-pct | 2 | PARCIAL (j=0.89; 8/9) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring-pct |
| \.hero-metric__card | 2 | PARCIAL (j=0.89; 17/19) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__card |
| \.river-bar__seg | 2 | PARCIAL (j=0.89; 17/19) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg |
| \.macro-card__pct-badge | 2 | PARCIAL (j=0.94; 15/16) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__pct-badge |
| \.range-gauge__marker | 2 | PARCIAL (j=0.94; 16/17) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__marker |
| \.macro-card__emoji-wrap | 2 | PARCIAL (j=0.95; 19/20) | BAIXO | COLISAO LATENTE | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__emoji-wrap |

## Appendix B - Duplicacoes Tecnicas (SIM)

| Classe | Arquivos | Similaridade | Evidencia |
|---|---|---|---|
| \.caloric-proof__equation | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__equation |
| \.caloric-proof__header | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__header |
| \.caloric-proof__header-text | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__header-text |
| \.caloric-proof__op | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__op |
| \.caloric-proof__result-emoji | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__result-emoji |
| \.caloric-proof__result-label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__result-label |
| \.caloric-proof__result-value | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__result-value |
| \.caloric-proof__term-emoji | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__term-emoji |
| \.caloric-proof__term-info | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__term-info |
| \.caloric-proof__term-name | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__term-name |
| \.caloric-proof__term-val | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .caloric-proof__term-val |
| \.composition-river__check | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 10/10) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__check |
| \.composition-river__title | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__title |
| \.composition-river__title-emoji | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__title-emoji |
| \.composition-river__title-text | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__title-text |
| \.composition-river__total-badge | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__total-badge |
| \.composition-river__total-unit | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__total-unit |
| \.composition-river__total-val | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .composition-river__total-val |
| \.contrib-row | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row |
| \.contrib-row__bar-fill--carb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__bar-fill--carb |
| \.contrib-row__bar-fill--fat | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__bar-fill--fat |
| \.contrib-row__bar-fill--protein | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__bar-fill--protein |
| \.contrib-row__bar-wrap | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 7/7) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__bar-wrap |
| \.contrib-row__emoji | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__emoji |
| \.contrib-row__kcal | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 10/10) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__kcal |
| \.contrib-row__label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-row__label |
| \.contrib-section__header | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-section__header |
| \.contrib-section__subtitle | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .contrib-section__subtitle |
| \.density-pill__emoji | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill__emoji |
| \.density-pill__label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 7/7) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill__label |
| \.density-pill__number | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill__number |
| \.density-pill__number--carb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill__number--carb |
| \.density-pill__number--fat | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill__number--fat |
| \.density-pill__number--protein | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .density-pill__number--protein |
| \.detail-cell__value | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-cell__value |
| \.detail-cell--full | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-cell--full |
| \.detail-cell--highlight | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-cell--highlight |
| \.detail-cell--warn | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-cell--warn |
| \.detail-grid | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .detail-grid |
| \.hero-metric__content | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__content |
| \.hero-metric__label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__label |
| \.hero-metric__mini-bar | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__mini-bar |
| \.hero-metric__status | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 12/12) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__status |
| \.hero-metric__unit | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__unit |
| \.hero-metric__value | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__value |
| \.hero-metric__value-row | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .hero-metric__value-row |
| \.insight-card__emoji | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card__emoji |
| \.insight-card__label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card__label |
| \.insight-card__sub | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card__sub |
| \.insight-card__value | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 10/10) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card__value |
| \.insight-card--carb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card--carb .insight-card__value |
| \.insight-card--fat | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card--fat .insight-card__value |
| \.insight-card--protein | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card--protein .insight-card__value |
| \.insight-card--total | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .insight-card--total .insight-card__value |
| \.is-open | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__toggle-btn.is-open .macro-card__toggl |
| \.legend-line-cyan | 2 (dashboard-presentation.css, screens.css) | SIM (j=1.00; 1/1) | screens.css -> #screen-dashboard .legend-line-cyan |
| \.macro-card__accent-line | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 14/14) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__accent-line |
| \.macro-card__big-number | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__big-number |
| \.macro-card__body | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__body |
| \.macro-card__details | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__details |
| \.macro-card__glow-orb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 14/14) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__glow-orb |
| \.macro-card__grams-unit | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__grams-unit |
| \.macro-card__grams-value | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 10/10) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__grams-value |
| \.macro-card__header | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__header |
| \.macro-card__identity | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__identity |
| \.macro-card__kcal-formula | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__kcal-formula |
| \.macro-card__kcal-label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__kcal-label |
| \.macro-card__name | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__name |
| \.macro-card__name-group | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__name-group |
| \.macro-card__ring | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring |
| \.macro-card__ring-bg | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring-bg |
| \.macro-card__ring-section | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring-section |
| \.macro-card__ring-stats | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__ring-stats |
| \.macro-card__stat-value | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__stat-value |
| \.macro-card__toggle-icon | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 10/10) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__toggle-icon |
| \.macro-card__value-row | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card__value-row |
| \.macro-card--carb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 14/14) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card--carb:hover |
| \.macro-card--fat | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 14/14) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card--fat:hover |
| \.macro-card--protein | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 14/14) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-card--protein:hover |
| \.macro-trio | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macro-trio |
| \.macros-header__divider | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macros-header__divider |
| \.macros-header__subtitle | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 7/7) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macros-header__subtitle |
| \.macros-header__title | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 10/10) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .macros-header__title |
| \.projection-empty-actions | 2 (dashboard-presentation.css, screens.css) | SIM (j=1.00; 1/1) | screens.css -> .projection-empty-actions |
| \.range-gauge | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge |
| \.range-gauge__fill | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 13/13) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__fill |
| \.range-gauge__header | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__header |
| \.range-gauge__limit-label | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 7/7) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__limit-label |
| \.range-gauge__limits | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__limits |
| \.range-gauge__marker-tooltip | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 22/22) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__marker-tooltip |
| \.range-gauge__status | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 7/7) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__status |
| \.range-gauge__status--ideal | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__status--ideal |
| \.range-gauge__status--low | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__status--low |
| \.range-gauge__status--max | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__status--max |
| \.range-gauge__track | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__track |
| \.range-gauge__track-wrapper | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__track-wrapper |
| \.range-gauge__zone-ideal | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 8/8) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .range-gauge__zone-ideal |
| \.river-bar | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 7/7) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar |
| \.river-bar__divider | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__divider |
| \.river-bar__seg--carb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 1/1) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg--carb |
| \.river-bar__seg--fat | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg--fat |
| \.river-bar__seg--protein | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg--protein |
| \.river-bar__seg-info | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg-info |
| \.river-bar__seg-name | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg-name |
| \.river-bar__seg-pct | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 6/6) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-bar__seg-pct |
| \.river-legend | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 5/5) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend |
| \.river-legend__dot | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__dot |
| \.river-legend__dot--carb | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__dot--carb |
| \.river-legend__dot--fat | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__dot--fat |
| \.river-legend__dot--protein | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 2/2) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__dot--protein |
| \.river-legend__item | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 8/8) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__item |
| \.river-legend__text | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 3/3) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__text |
| \.river-legend__val | 2 (dashboard-macros.css, dashboard-presentation.css) | SIM (j=1.00; 4/4) | dashboard-macros.css -> #screen-dashboard[data-dashboard-presentation] .macros-section-legacy .river-legend__val |
| \.target-info-row | 2 (dashboard-presentation.css, screens.css) | SIM (j=1.00; 3/3) | screens.css -> .target-info-row |

## Appendix C - Amostras OK (prefixadas/isoladas)

| Classe | Arquivo | Motivo | Exemplo de seletor |
|---|---|---|---|
| \.dfp-carousel-dots | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .dfp-carousel-dots |
| \.dfp-loading | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .dfp-loading |
| \.dfp-mobile-dot | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .dfp-mobile-dot |
| \.dfp-mobile-progress | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .dfp-mobile-progress |
| \.dfp-shell | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .dfp-shell |
| \.dfp-toast | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .dfp-toast |
| \.final-section-legacy | dashboard-final.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .final-section-legacy |
| \.goal-card-accent-blue | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card.goal-card-accent-blue::before |
| \.goal-card-accent-green | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card.goal-card-accent-green::before |
| \.goal-card-accent-lime | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card.goal-card-accent-lime::before |
| \.goal-card-accent-orange | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card.goal-card-accent-orange::before |
| \.goal-card-accent-red | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card.goal-card-accent-red::before |
| \.goal-card-accent-violet | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card.goal-card-accent-violet::before |
| \.goal-card-badge | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card-badge |
| \.goal-card-check | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card-check |
| \.goal-card-check-selected | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-card-check-selected |
| \.goal-card-desc | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card-desc |
| \.goal-card-icon | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-card-icon |
| \.goal-cards-grid-2 | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-cards-grid-2 |
| \.goal-cards-grid-4 | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .goal-cards-grid-4 |
| \.goal-timeline-diagnostic | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic |
| \.goal-timeline-diagnostic-agressivo | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-agressivo |
| \.goal-timeline-diagnostic-bar-fill | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-bar-fill |
| \.goal-timeline-diagnostic-bar-row | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-bar-row |
| \.goal-timeline-diagnostic-bar-track | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-bar-track |
| \.goal-timeline-diagnostic-classification | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-classification |
| \.goal-timeline-diagnostic-divider | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-divider |
| \.goal-timeline-diagnostic-heading | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-heading |
| \.goal-timeline-diagnostic-heading-text | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-heading-text |
| \.goal-timeline-diagnostic-inviavel | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-inviavel |
| \.goal-timeline-diagnostic-label | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-label |
| \.goal-timeline-diagnostic-note | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-note |
| \.goal-timeline-diagnostic-realista | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-realista |
| \.goal-timeline-diagnostic-refresh | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-refresh .goal-timeline-diagnostic-value, #screen-form .goal-timeline-diagnostic-r |
| \.goal-timeline-diagnostic-row | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-row |
| \.goal-timeline-diagnostic-scale | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-scale |
| \.goal-timeline-diagnostic-title | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-title |
| \.goal-timeline-diagnostic-value | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-value |
| \.goal-timeline-diagnostic-viability | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-viability |
| \.goal-timeline-diagnostic-viability-label | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-viability-label |
| \.goal-timeline-diagnostic-viability-pct | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-viability-pct |
| \.goal-timeline-diagnostic-viability-row | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-viability-row |
| \.goal-timeline-diagnostic-warning | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-form .goal-timeline-diagnostic-warning |
| \.hero-badge | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-badge |
| \.hero-badge-dot | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-badge-dot |
| \.hero-bg-base | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-bg-base |
| \.hero-bg-grid | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-bg-grid |
| \.hero-bg-noise | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-bg-noise |
| \.hero-card | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-seq, #screen-dashboard[data-dashboard-presentation] .hero-card |
| \.hero-card-1 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-card-1 |
| \.hero-card-2 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-card-2 |
| \.hero-card-3 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-card-3 |
| \.hero-cta-group | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-cta-group |
| \.hero-eyebrow | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-eyebrow |
| \.hero-footer-strip | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-footer-strip |
| \.hero-glow-left | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-glow-top, #screen-dashboard[data-dashboard-presentation] .hero-glow |
| \.hero-glow-right | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-glow-top, #screen-dashboard[data-dashboard-presentation] .hero-glow |
| \.hero-glow-top | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-glow-top, #screen-dashboard[data-dashboard-presentation] .hero-glow |
| \.hero-grid-overlay | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-grid-overlay |
| \.hero-headline | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-headline |
| \.hero-headline-wrapper | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-headline-wrapper |
| \.hero-line-accent | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-line-accent |
| \.hero-scroll-cta | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-scroll-cta |
| \.hero-scroll-label | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-scroll-label |
| \.hero-scroll-mouse | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-scroll-mouse |
| \.hero-scroll-wheel | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-scroll-wheel |
| \.hero-seq | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .hero-seq, #screen-dashboard[data-dashboard-presentation] .hero-card |
| \.hero-seq-1 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-seq-1 |
| \.hero-seq-2 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-seq-2 |
| \.hero-seq-3 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-seq-3 |
| \.hero-seq-5 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-seq-5 |
| \.hero-seq-6 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-seq-6 |
| \.hero-seq-7 | dashboard-presentation.css | Classe aparece em apenas 1 arquivo do escopo auditado | #screen-dashboard[data-dashboard-presentation] .s1-content.is-active .hero-seq-7 |
| \.hero-stat | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-stat |
| \.hero-stat-divider | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-stat-divider |
| \.hero-stat-group | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-stat-group |
| \.hero-stat-label | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-stat-label |
| \.hero-stat-number | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-stat-number |
| \.hero-stats | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-stats |
| \.hero-subheadline | screens.css | Classe aparece em apenas 1 arquivo do escopo auditado | .hero-subheadline |

## Leituras para Fase B

- Estrategia preferida sem alterar `.tsx`: reforcar escopo por seletor pai de secao (`#screen-dashboard[data-dashboard-presentation] .<secao>-section-legacy ...`).
- Priorizar na Fase B classes de risco `ALTO` em 3+ arquivos e `j < 0.30`.
- Tratar `DUPLICACAO` separadamente (pode virar shared sem risco de colisao).

## Gate de Fase

**Fase A encerrada. Fases B/C bloqueadas ate aprovacao explicita.**
