# CSS Deduplication Map (Fase A)

> Inventario de duplicacao entre 8 CSS de secao. Esta fase e read-only para producao: nenhum `src/styles/*.css` foi alterado.

## Resumo Executivo

- Arquivos analisados: **8**
  - `screens.css`
  - `dashboard-final.css`
  - `dashboard-macros.css`
  - `dashboard-meals.css`
  - `dashboard-presentation.css`
  - `dashboard-projection.css`
  - `dashboard-simulator.css`
  - `dashboard-supplements.css`
- Regras analisadas (fora de `@media`/`@keyframes`, ignorando `--*`): **3363**
- Regras elegiveis para similaridade (`>=4` declaracoes): **1465**
- Pares candidatos (`sim >= 0.80` e `>=4` declaracoes compartilhadas): **128**
- Componentes conectados de duplicacao forte: **98**

Classificacao automatica (criterio estrito do algoritmo):
- `EXTRAIR`: **4**
- `EXTRAIR BASE + OVERRIDE`: **2**
- `NAO EXTRAIR`: **92**

Observacao estrutural relevante:
- Existe um padrao de reset universal (`box-sizing/margin/padding`) em **6 arquivos** com apenas 3 declaracoes. Ele foi promovido manualmente para o mapa curado por alta repeticao estrutural (mesmo ficando fora do limiar estrito de 4 declaracoes compartilhadas).

## Metodo Deterministico Utilizado

1. Parse com PostCSS.
2. Para cada regra, normalizacao de declaracoes para `prop:value` com trim e colapso de espacos.
3. Exclusoes:
   - regras dentro de `@media`
   - regras dentro de `@keyframes`
   - declaracoes `--*`
4. Similaridade entre regras de arquivos diferentes:
   - `sim = interseccao(prop:value) / uniao(prop:value)` (Jaccard)
5. Par candidato:
   - `sim >= 0.80`
   - `>=4` declaracoes compartilhadas
6. Agrupamento:
   - componentes por conectividade dos pares candidatos.
7. Classificacao:
   - `EXTRAIR`: `>=3` arquivos, core comum forte, sem divergencia relevante
   - `EXTRAIR BASE + OVERRIDE`: `>=3` arquivos, base comum com variacoes pontuais
   - `NAO EXTRAIR`: <3 arquivos ou risco de semantica/especificidade

## Tabela Principal (Curada)

| Padrao | Arquivos | Seletores | Props iguais (core) | Props diferentes | Acao |
|---|---|---|---|---|---|
| Legacy section root container | final, meals, simulator, supplements | `#screen-dashboard[data-dashboard-presentation] .final-section-legacy`, `.meals-section-legacy`, `.simulator-section-legacy`, `.supplements-section-legacy` | `position: relative`, `width: 100%`, `min-height: 100dvh`, `overflow: visible`, `isolation: isolate` | Sem diferenca no bloco detectado | EXTRAIR |
| `dfp-slide-inner` base | final, meals, simulator, supplements | `.dfp-slide[data-section-id='final'/'meals'/'whatif'/'supplements'] .dfp-slide-inner` | `width: 100%`, `max-width: none`, `margin: 0`, `flex: 1 1 100%`, `padding: calc(var(--header-height) + var(--spacing-md)) 0 56px` | Sem diferenca | EXTRAIR |
| Ring center absolute centering | macros, meals, presentation | `.macro-card__ring-center`, `.calorie-ring__center`, `.macro-card__ring-center` | `position: absolute`, `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)`, `text-align: center` | Sem diferenca | EXTRAIR |
| Stat value mono bold | macros, presentation, screens | `.macro-card__kcal-value` (macros/presentation), `.whatif-result-value` (screens) | `font-family: var(--font-mono)`, `font-size: var(--text-base)`, `font-weight: var(--weight-bold)`, `color: var(--text-primary)` | Sem diferenca | EXTRAIR |
| Legacy universal reset (promocao estrutural) | final, macros, meals, projection, simulator, supplements | seletores universais internos de cada secao (`*`, `*::before`, `*::after`) | `box-sizing: border-box`, `margin: 0`, `padding: 0` | Variacao apenas na forma do seletor composto (alguns incluem raiz + descendentes) | EXTRAIR (com cautela) |
| Arrow/summary vertical stack | screens, presentation, projection | `.ba-arrow-wrapper` (screens/presentation), `.summary-footer-item` (projection) | `display: flex`, `flex-direction: column`, `align-items: center`, `gap: var(--space-1)` | projection adiciona `text-align: center` | EXTRAIR BASE + OVERRIDE |
| Section header split (river/daily-stack) | macros, presentation, supplements | `.composition-river__header` (macros/presentation), `.daily-stack-header` (supplements) | `display: flex`, `align-items: center`, `justify-content: space-between`, `margin-bottom: var(--space-6)` | supplements adiciona `gap: var(--space-4)` | EXTRAIR BASE + OVERRIDE |

## Appendix A - Duplicacoes Fortes Nao Extraiveis (principalmente 2 arquivos)

### A.1 Concentracao macros vs presentation

Distribuicao de pares candidatos por par de arquivos (`sim >= 0.80`, `>=4` props compartilhadas):

| Par de arquivos | Pares fortes |
|---|---:|
| `dashboard-macros.css <> dashboard-presentation.css` | **80** |
| `dashboard-final.css <> screens.css` | 7 |
| `dashboard-supplements.css <> screens.css` | 4 |
| `dashboard-simulator.css <> dashboard-supplements.css` | 4 |
| demais pares | 1-3 |

Leitura tecnica:
- A maior massa de duplicacao forte esta entre macros e presentation, mas em geral em **apenas 2 arquivos**.
- Pelo criterio desta fase (`>=3` arquivos para extracao), esses blocos ficam em `NAO EXTRAIR` por enquanto.

Exemplos (2 arquivos, alta similaridade):
- `.range-gauge__marker-tooltip`
- `.hero-metric__status`
- `.contrib-row__bar-fill`
- `.macros-header__title`
- `.hero-metric__card`
- `.macro-card__glow-orb`

## Appendix B - Grupos Descartados por Baixo Valor

Foram descartados grupos que, apesar de repetidos, sao triviais de layout e com baixo ganho de manutencao para um shared file neste momento.

Exemplos:
- `display: flex + flex-direction: column + gap: var(--space-4)` em contextos semanticos diferentes
- `display: flex + align-items: center + gap: var(--space-2-5)` em cabecalhos/acoes heterogeneos
- `display: grid + gap + grid-template-columns` reaparecendo em componentes com semantica distinta

Motivo do descarte:
- risco de acoplamento semantico > beneficio de reducao de linhas,
- chance de override futuro quebrar intencao local,
- pouca representatividade visual compartilhada real.

## Candidatos Prioritarios para B/C (quando aprovado)

Ordem recomendada de extracao no `shared-patterns.css`:
1. `dfp-slide-inner` base (4 arquivos)
2. Legacy section root container (4 arquivos)
3. Ring center absolute centering (3 arquivos)
4. Stat value mono bold (3 arquivos)
5. Universal reset legado (6 arquivos, com cautela de especificidade)
6. Blocos `BASE + OVERRIDE` (arrow/summary e section-header split)

## Gate de Fase

**Fase A encerrada. Fases B/C bloqueadas ate aprovacao explicita.**
