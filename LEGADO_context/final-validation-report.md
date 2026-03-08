# Final Validation & Regression Report (Agente 10)

> Data: 2026-03-04  
> Projeto: DietForge (`src/styles`)  
> Modo: validacao final + correcoes minimas seguras

## 1) Validacao de integridade CSS

### 1.1 Variaveis CSS orfas (`var(--*)`)

Escopo analisado: 13 arquivos CSS em `src/styles`.

#### Resultado final
- Referencias `var(--*)` sem declaracao em `tokens.css`/arquivo local/`shared-patterns.css`: **28** ocorrencias brutas.
- Classificadas como `BUG CRITICO`: **0** (apos correcao).
- Classificadas como `runtime-injetada` (nao critico): **15 variaveis**.

#### Bug critico encontrado e corrigido
- **Bug**: `var(--color-bg-border)` sem declaracao.
- **Arquivo**: `src/styles/dashboard-final.css`.
- **Correcao aplicada**: troca para `var(--color-border)`.
- **Impacto**: elimina referencia invalida no gradiente da timeline.

#### Variaveis runtime-injetadas (nao criticas)
Estas variaveis sao injetadas por TS/TSX ou possuem fallback:
- `--x`, `--y`, `--size`, `--duration`, `--delay`, `--drift`, `--color`, `--glow`  
  Evidencia: `src/components/screens/dashboard/sections/presentation/WelcomeSlide.tsx` (linhas com style inline de particulas).
- `--card-color`, `--card-color-dim`, `--wf-color`, `--wf-color-dim`  
  Evidencia: `src/components/screens/dashboard/sections/presentation/TdeeSlide.tsx`.
- `--stat-accent`, `--stat-accent-bg`  
  Evidencia: `src/components/screens/dashboard/sections/presentation/projectionLegacy.generated.ts` (style inline nos cards de estatistica).
- `--input-stagger` (com fallback `0ms`)  
  Evidencia: `src/components/ui/NumberField.tsx` e `src/components/ui/HeightDualInput.tsx`.

### 1.2 Tokens nao utilizados (`tokens.css` -> secoes)

Regra: token declarado em `tokens.css` e nao referenciado em nenhum dos 8 CSS de secao.

#### Resultado
- Tokens orfaos (nao alias): **47**
- Alias nao referenciados diretamente (`alias ok`): **20**

#### Tokens orfaos (nao alias)
`--bg-400`, `--bg-800`, `--bg-active`, `--bg-glass-heavy`, `--accent-red-mid`, `--accent-violet-glow`, `--color-accent-glow`, `--color-gold-glow`, `--tdee-color-bmr`, `--tdee-color-bmr-dim`, `--tdee-color-cardio`, `--tdee-color-cardio-dim`, `--tdee-color-eat`, `--tdee-color-eat-dim`, `--tdee-color-neat`, `--tdee-color-neat-dim`, `--tdee-color-tef`, `--tdee-color-tef-dim`, `--sup-creatina-hue`, `--sup-mag-glow`, `--sup-mag-hue`, `--sup-mag-ultra`, `--sup-omega-glow`, `--sup-omega-hue`, `--sup-omega-ultra`, `--sup-vitd-hue`, `--sup-whey-hue`, `--carb-color-lighter`, `--protein-color-lighter`, `--text-5xl`, `--text-white`, `--radius-3xl`, `--radius-xs`, `--shadow-2xl`, `--shadow-cyan`, `--shadow-glow-accent`, `--shadow-gold`, `--shadow-red`, `--shadow-red-sm`, `--ease-in-out`, `--ease-out-expo`, `--transition-screen`, `--transition-smooth`, `--z-base`, `--z-float`, `--z-overlay`, `--z-raised`.

#### Alias ok (sem uso direto)
`--text-accent`, `--text-positive`, `--spacing-1`, `--spacing-10`, `--spacing-xs`, `--spacing-xl`, `--spacing-2xl`, `--spacing-4xl`, `--accent-red-dark`, `--accent-red-light`, `--bg-secondary`, `--color-accent-dark`, `--color-accent-light`, `--color-bg-base`, `--color-bg-surface`, `--color-gold`, `--color-gold-light`, `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`.

### 1.3 Seletores vazios

#### Encontrados e removidos
- `.meal-info {}` em `src/styles/screens.css`
- `#screen-dashboard[data-dashboard-presentation] .supplements-section-legacy .sup-card.expanded .sup-card-content { /* ... */ }` em `src/styles/dashboard-supplements.css`

#### Resultado final
- Seletores vazios remanescentes: **0**

### 1.4 Build check

Comandos executados:
```bash
npx tsc --noEmit
npx vitest run
```

Resultado:
- `tsc`: **PASS**
- `vitest`: **FAIL** (1 teste)
  - Arquivo: `src/test/App.test.tsx`
  - Caso: `DietForge app flow > navigates hero -> form (14 steps) -> profile create -> summary -> dashboard`
  - Erro: timeout de `5000ms`
  - Status agregado: **72 passed / 1 failed**

---

## 2) Metricas antes vs depois

| Metrica | Antes (Agente 1) | Depois (Agente 10) | Delta |
|---|---:|---:|---:|
| Total de arquivos CSS | 12 | 13 | +1 |
| Total de linhas CSS | ~28.000 | 27.257 | -743 |
| Tamanho total CSS (KB) | ~856 KB | 883,87 KB | +27,87 KB |
| Variaveis em tokens.css | 47 | 368 | +321 |
| Cores hardcoded | ~2.250 | 1.284 | -966 |
| Font-sizes hardcoded | ~746 | 506 | -240 |
| Font-weights hardcoded | ~433 | 0 | -433 |
| Letter-spacings hardcoded | ~314 | 19 | -295 |
| Line-heights hardcoded | ~123 | 19 | -104 |
| Spacing hardcoded (padding/margin/gap) | N/D | 92 | N/D |
| Seletores duplicados entre arquivos | N/D (proxy Agente 7: 128 pares fortes) | 103 pares fortes | N/D |
| Colisoes de escopo | N/D (proxy Agente 8: 214 = 125 ativas + 89 latentes) | 214 (proxy, sem mudanca estrutural de escopo) | 0 (proxy) |

Notas de baseline:
- Quando Agente 1 nao trouxe valor numerico direto, foi usado `N/D` com proxy dos agentes posteriores.
- `spacing-replacement-map.md` nao existe no workspace atual; metrica de spacing foi calculada diretamente do CSS atual.

---

## 3) Inventario de trabalho restante

### 3.1 Cores sem token (Design System)

- Ocorrencias hardcoded sem token (acionavel, excluindo transparent/black/white etc.): **1.351**
- Cores unicas sem token: **734**

Top 10:
1. `rgba(255,255,255,0.05)` - 28
2. `#22c55e` - 20
3. `rgba(230,57,70,0.15)` - 17
4. `rgba(255,255,255,0.02)` - 16
5. `rgba(255,255,255,0.14)` - 15
6. `rgba(255,255,255,0.01)` - 13
7. `rgba(255,255,255,0.15)` - 12
8. `rgba(255,255,255,0.16)` - 12
9. `rgba(255,255,255,0.55)` - 11
10. `rgba(255,255,255,0.9)` - 10

### 3.2 Font-sizes sem token

- Ocorrencias fora da escala de `--text-*`: **506**
- Valores unicos fora da escala: **88**

Mais comuns:
- `12px` (96)
- `10px` (96)
- `16px` (34)
- `14px` (32)
- `9px` (24)
- `18px` (19)
- `22px` (17)
- `0.7rem` (16)
- `28px` (12)
- `0.75rem` (11)

### 3.3 Spacing sem token

- Ocorrencias fora da escala `--space-*`: **20**
- Valores unicos fora da escala: **14**

Mais comuns:
- `34px` (3)
- `60px` (2)
- `9px` (2)
- `-1px` (2)
- `26px` (2)
- `-6px`, `30px`, `52px`, `42px`, `0.18em`, `17px`, `11px` (1 cada)

### 3.4 Padroes nao extraidos (< 3 ocorrencias)

- Padroes duplicados `<3` ocorrencias (com >=4 declaracoes e em >=2 arquivos): **70**
- Concentracao principal: `dashboard-presentation.css` vs `dashboard-macros.css`.

Top exemplos:
1. `range-gauge__marker-tooltip` (17 props compartilhadas, 2 ocorrencias)
2. `hero-metric__status` (12)
3. `contrib-row__bar-fill` (12)
4. `macros-header__title` (10)
5. `hero-metric__card` (10)
6. `macro-card__glow-orb` (10)
7. `composition-river__check` (10)
8. `river-bar__seg` (9)
9. `insight-card` (9)
10. `macro-card__accent-line::after` (8)

---

## 4) Recomendacoes para proxima fase

### 4.1 Quick wins (< 1 hora, alto impacto)

1. Criar 4-6 tokens para os brancos translucidos mais frequentes (`0.01/0.02/0.05/0.14/0.15/0.16`) e substituir os maiores hotspots.
2. Normalizar `10px` e `12px` para tokens tipograficos aprovados no escopo de labels/captions.
3. Corrigir o teste de fluxo longo (`App.test.tsx`) aumentando timeout local do caso ou quebrando o fluxo em assertions menores.
4. Remover/arquivar tokens claramente nao usados em secoes, mantendo apenas aliases de compatibilidade necessarios.

### 4.2 Design System priorities

1. **Tokens de cor translucida** (maior impacto imediato em volume).
2. **Escala tipografica de texto pequeno** (`10px/12px/14px/16px`).
3. **Escala de spacing residual** (`34px`, `26px`, `60px`, negativos).
4. **Componentizacao macros/presentation**: extrair primeiro os blocos com 8+ declaracoes compartilhadas.

### 4.3 Riscos

1. Colisoes de escopo altas continuam abertas (`.active`, `.selected`, `.highlight`, `.macro-card`, `.meal-card`, `.chart-*`, `.legend-line`).
2. Runtime CSS vars dependem de inline styles; regressao de markup pode quebrar estilos sem erro de build.
3. Uso extenso de cores sem token em opacidades finas dificulta consistencia visual entre secoes.

### 4.4 Divida tecnica adiada por seguranca

1. Nao houve refatoracao estrutural de seletores para evitar regressao visual.
2. Nao houve consolidacao ampla de duplicacao entre macros e presentation.
3. Nao houve recorte de tokens antigos para preservar compatibilidade.
4. Falha de timeout em teste end-to-end de fluxo permaneceu fora do escopo deste agente.

---

## 5) Mudancas aplicadas por este agente

1. `src/styles/dashboard-final.css`:
   - `var(--color-bg-border)` -> `var(--color-border)`.
2. `src/styles/screens.css`:
   - removido seletor vazio `.meal-info {}`.
3. `src/styles/dashboard-supplements.css`:
   - removido bloco vazio `.sup-card.expanded .sup-card-content`.

Sem alteracoes de API publica, tipos TS ou contratos de componente.

---

## 6) Apendice metodologico

Regras usadas na medicao/validacao:

1. Escopo de integridade: todos os CSS de `src/styles`.
2. Escopo de metricas de design system: 8 CSS de secao (`screens`, `dashboard-*`).
3. Exclusoes de analise de padrao: regras em `@media`, `@keyframes`, declaracoes `--*`.
4. `runtime-aware`: variavel nao declarada local/tokens/shared so e critica se tambem nao houver origem em TS/TSX/generated e sem fallback.
5. `alias ok`: token em `tokens.css` com valor no formato `var(--outro-token)`.
6. `font/spacing hardcoded`: contagem apenas em declaracoes sem `var(...)`.
7. Duplicacao de seletores entre arquivos: metrica de pares fortes por similaridade (Jaccard >= 0.80 e >=4 declaracoes compartilhadas) entre arquivos de secao.

---

## 7) Status de aceite

- [x] Nenhuma variavel classificada como critica permaneceu sem correcao.
- [x] Variaveis runtime-injetadas documentadas como nao criticas.
- [x] Seletores vazios removidos.
- [x] Relatorio final gerado em `.context/final-validation-report.md`.
- [x] `npx tsc --noEmit` executado.
- [x] `npx vitest run` executado e falha existente documentada.
- [x] Sem refatoracao estrutural ampla.
