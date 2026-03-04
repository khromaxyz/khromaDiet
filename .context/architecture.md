# DietForge — Mapa da Arquitetura

> Gerado em 2026-03-04. Dados extraídos diretamente do código-fonte.

---

## 1. Estrutura de Arquivos

### Raiz do projeto

```
khromaDiet/
├── index.html                    (25 linhas)   Entry point HTML — carrega fontes + monta #root
├── package.json                  (54 linhas)   Deps, scripts, metadata
├── vite.config.ts                (10 linhas)   Config Vite com plugin React
├── tailwind.config.ts            (48 linhas)   Tokens Tailwind mapeados a CSS vars
├── postcss.config.cjs            (10 linhas)   PostCSS: tailwindcss + autoprefixer
├── tsconfig.json                 (5 linhas)    Referencia tsconfig.app + tsconfig.node
├── tsconfig.app.json             (26 linhas)   Config TS para o app
├── tsconfig.node.json            (24 linhas)   Config TS para scripts Node
├── vitest.config.ts              (12 linhas)   Config Vitest (happy-dom)
├── eslint.config.js              (50 linhas)   ESLint flat config
├── .prettierrc                   (6 linhas)    Prettier config
├── .prettierignore               (3 linhas)    Prettier ignore
├── .gitignore                    (3 linhas)    Git ignore
├── README.md                     (77 linhas)   Documentação do projeto
│
├── src/                          (153 filhos)  Código-fonte React/TypeScript
├── legacy/                       (31 filhos)   HTML monolíticos de referência
├── tools/                        (2 arquivos)  Scripts de sync legacy → generated
├── public/                       (2 arquivos)  Assets estáticos
├── .context/                     (1 arquivo)   Documentação contextual
├── .input/                       (1 arquivo)   Prompts de referência
├── .output/                      (1 arquivo)   Metodologia exportada
├── dist/                                       Build de produção
├── test-results/                               Resultados de teste
└── node_modules/                               Dependências instaladas
```

### `src/` — Código-fonte principal

```
src/
├── main.tsx                      (17 linhas)   Bootstrap React — importa CSS, renderiza <App/>
├── App.tsx                       (556 linhas)  Componente raiz — roteamento de screens, lógica de perfis, animations
│
├── components/
│   ├── charts/
│   │   └── ProjectionChart.tsx   (11KB)        Gráfico de projeção com Chart.js/react-chartjs-2
│   │
│   ├── layout/
│   │   ├── PageWrapper.tsx       (165B)        Container wrapper simples
│   │   └── ScreenNavPill.tsx     (1.9KB)       Pill de navegação entre seções do dashboard
│   │
│   ├── profile/
│   │   ├── ProfileAvatar.tsx     (4KB)         Avatar SVG com grade de cores
│   │   ├── ProfileAvatarGrid.tsx (969B)        Grid de seleção de avatares
│   │   ├── ProfileCreationScreen.tsx (5.3KB)   Tela de criação de perfil
│   │   ├── ProfileDrawer.tsx     (7.9KB)       Drawer lateral para lista de perfis
│   │   ├── ProfileSettingsPanel.tsx (4.2KB)    Painel de configurações do perfil
│   │   └── ProfileTriggerButton.tsx (699B)     Botão que abre o drawer
│   │
│   ├── ui/
│   │   ├── Badge.tsx             (699B)        Badge genérico
│   │   ├── Button.tsx            (1.1KB)       Botão reutilizável com variantes
│   │   ├── Card.tsx              (784B)        Card wrapper
│   │   ├── HeightDualInput.tsx   (10.8KB)      Input duplo altura (cm / ft+in)
│   │   ├── NumberField.tsx       (13.6KB)      Campo numérico com validação
│   │   ├── ProgressBar.tsx       (493B)        Barra de progresso do formulário
│   │   └── Slider.tsx            (1.5KB)       Slider customizado
│   │
│   └── screens/
│       ├── hero/
│       │   ├── HeroScreen.tsx    (1.5KB)       Landing page / tela inicial
│       │   └── HeroStats.tsx     (564B)        Stats exibidos na hero
│       │
│       ├── form/
│       │   ├── FormScreen.tsx    (4.8KB)       Container do formulário wizard
│       │   ├── FormHeader.tsx    (1.9KB)       Header com logo + step indicator
│       │   ├── FormStepRenderer.tsx (908B)     Renderiza o step ativo
│       │   └── steps/            (21 arquivos) Steps individuais do formulário:
│       │       ├── GoalStep.tsx          (1.2KB)   Seleção de objetivo
│       │       ├── SexStep.tsx           (3.2KB)   Sexo + fase menstrual
│       │       ├── BasicsStep.tsx        (6.7KB)   Idade, peso, altura
│       │       ├── BodyFatStep.tsx       (8.3KB)   % gordura (declarado/fotos/navy)
│       │       ├── DietHistoryStep.tsx   (2.8KB)   Histórico de dieta
│       │       ├── ActivityStep.tsx      (1.6KB)   Nível de atividade
│       │       ├── OccupationStep.tsx    (1.7KB)   Ocupação
│       │       ├── TrainingStep.tsx      (2.4KB)   Treino (duração, volume)
│       │       ├── CardioStep.tsx        (6.9KB)   Cardio detalhado
│       │       ├── HormonesStep.tsx      (5.1KB)   Hormônios/esteróides
│       │       ├── HealthStep.tsx        (3.1KB)   Condições de saúde
│       │       ├── ThermogenicsStep.tsx  (1.4KB)   Uso de termogênicos
│       │       ├── MealsStep.tsx         (2.5KB)   Refeições por dia
│       │       ├── GoalTimelineStep.tsx  (11.4KB)  Timeline de meta (peso/BF/prazo)
│       │       ├── GoalOptionCard.tsx    (2.1KB)   Card de opção de goal
│       │       ├── StepNav.tsx           (923B)    Navegação prev/next
│       │       ├── MeasuresStep.tsx      (225B)    Placeholder
│       │       ├── NutritionStep.tsx     (226B)    Placeholder
│       │       ├── ProfileStep.tsx       (224B)    Placeholder
│       │       ├── ReviewStep.tsx        (223B)    Placeholder
│       │       └── TargetStep.tsx        (223B)    Placeholder
│       │
│       ├── summary/
│       │   ├── SummaryScreen.tsx  (3.1KB)      Resumo pré-dashboard
│       │   └── SummaryMetrics.tsx (2.4KB)      Métricas exibidas no resumo
│       │
│       └── dashboard/
│           ├── DashboardScreen.tsx (15.3KB)    Container principal do dashboard — scroll-snap, keyboard nav
│           └── sections/
│               ├── BeforeAfterSection.tsx  (4.7KB)   Antes/depois visual
│               ├── CalibrationSection.tsx  (4.2KB)   Painel de calibração
│               ├── DashboardFooter.tsx     (1.8KB)   Footer do dashboard
│               ├── KpiStrip.tsx            (4.4KB)   Faixa de KPIs
│               ├── MacroCards.tsx           (8.2KB)   Cards de macronutrientes
│               ├── MealsSection.tsx         (3.1KB)   Seção de refeições
│               ├── ProfileStrip.tsx         (2.1KB)   Strip do perfil ativo
│               ├── ProjectionSection.tsx    (5.6KB)   Seção de projeção
│               ├── ReceiptCard.tsx          (9KB)     Card detalhado "receita" do plano
│               ├── RefeedSection.tsx        (2.6KB)   Seção de refeed
│               ├── SupplementsSection.tsx   (2.6KB)   Seção de suplementos
│               ├── WhatIfSection.tsx        (9.2KB)   Simulador "what-if"
│               │
│               └── presentation/           (16 arquivos) Modo apresentação (slides)
│                   ├── WelcomeSlide.tsx          (25.6KB)  Slide de boas-vindas
│                   ├── GoalSlide.tsx             (23.3KB)  Slide de objetivo
│                   ├── TdeeSlide.tsx             (14.5KB)  Slide de TDEE
│                   ├── MacrosSlide.tsx           (55.5KB)  Slide de macros (MAIOR componente)
│                   ├── MealsSlide.tsx            (9.5KB)   Slide de refeições
│                   ├── ProjectionSlide.tsx       (19KB)    Slide de projeção
│                   ├── SupplementsSlide.tsx      (13.2KB)  Slide de suplementos
│                   ├── WhatIfSlide.tsx           (10.9KB)  Slide do simulador
│                   ├── RefeedSlide.tsx           (3.2KB)   Slide de refeed
│                   ├── FinalSlide.tsx            (12.2KB)  Slide final
│                   ├── types.ts                  (262B)    Tipos do sistema de slides
│                   │
│                   │  ── ARQUIVOS GERADOS (legacy → TS) ──
│                   ├── mealsLegacy.generated.ts       (74KB)   HTML/JS extraído de legacy/refeicoes.html
│                   ├── projectionLegacy.generated.ts  (91KB)   HTML/JS extraído de legacy/projecao.html
│                   ├── supplementsLegacy.generated.ts (90KB)   HTML/JS extraído de legacy/suplementos.html
│                   ├── simulatorLegacy.generated.ts   (55KB)   HTML/JS extraído de legacy/simulador.html
│                   └── finalLegacy.generated.ts       (74KB)   HTML/JS extraído de legacy/encerramento.html
│
├── hooks/
│   ├── useCountUp.ts             (807B)        Hook de animação contagem
│   ├── useFormState.ts           (445B)        Hook genérico de form state
│   ├── useScrambleNumber.ts      (1.6KB)       Hook de número scramble animado
│   └── useWizardState.ts         (1.1KB)       Hook de wizard multi-step
│
├── store/
│   └── useDietForgeStore.ts      (323 linhas)  Store Zustand — state global do app
│
├── lib/
│   ├── utils.ts                  (6 linhas)    `cn()` helper (clsx + twMerge)
│   ├── shareState.ts             (87 linhas)   Serialização/deserialização de state para URL sharing
│   │
│   ├── constants/
│   │   ├── index.ts              (226B)        Barrel export
│   │   ├── copy.ts               (857B)        Textos/copy do app
│   │   ├── exampleForm.ts        (1KB)         Dados de exemplo pré-preenchidos
│   │   ├── icons.ts              (899B)        Ícones SVG como strings
│   │   ├── icons.tsx             (2.6KB)       Ícones SVG como componentes React
│   │   ├── labels.ts             (3.6KB)       Labels de UI (atividade, hormônios, etc.)
│   │   ├── mockChart.ts          (539B)        Dados mock para gráfico
│   │   ├── mockDashboard.ts      (6.8KB)       Dados mock do dashboard
│   │   ├── mockForm.ts           (12KB)        Dados iniciais completos do formulário
│   │   ├── mockSummary.ts        (705B)        Dados mock do sumário
│   │   └── steps.ts              (2.2KB)       Definição dos steps do wizard
│   │
│   ├── engine/                   (16 arquivos) Motor de cálculo nutricional
│   │   ├── index.ts              (400B)        Barrel export
│   │   ├── dietEngine.ts         (499B)        Facade da engine
│   │   ├── runPipeline.ts        (470 linhas)  Pipeline principal de cálculos
│   │   ├── calcBMR.ts            (2.3KB)       Cálculo de BMR (Mifflin, Katch)
│   │   ├── calcTDEE.ts           (2.5KB)       Cálculo de TDEE
│   │   ├── calcTEF.ts            (670B)        Efeito Térmico dos Alimentos
│   │   ├── calcBFNavy.ts         (1.2KB)       Body Fat método Navy
│   │   ├── calcCalibration.ts    (656B)        Calibração dinâmica
│   │   ├── calcGoalProjection.ts (4.9KB)       Projeção de meta
│   │   ├── calcMetabolicAdaptation.ts (884B)   Adaptação metabólica
│   │   ├── splitMacros.ts        (8.5KB)       Distribuição de macronutrientes
│   │   ├── applyModifiers.ts     (3.1KB)       Modificadores (hormônios, termogênicos)
│   │   ├── validateInputs.ts     (4.5KB)       Validação de inputs
│   │   ├── renormalizeWeights.ts (1KB)         Re-normalização de pesos
│   │   ├── constants.ts          (1.8KB)       Constantes da engine
│   │   └── math.ts               (397B)        Utilitários math (clamp, round)
│   │
│   ├── profiles/
│   │   ├── constants.ts          (1.5KB)       Constantes de perfis
│   │   ├── storage.ts            (5.9KB)       Persistência localStorage
│   │   ├── summary.ts            (718B)        Sumário de perfil
│   │   └── types.ts              (754B)        Tipos de perfil
│   │
│   └── types/                    (8 arquivos)  Tipos TypeScript
│       ├── index.ts              (214B)        Barrel export
│       ├── app.ts                (1.1KB)       Tipos do app (screens, view modes)
│       ├── chart.ts              (254B)        Tipos de gráfico
│       ├── dashboard.ts          (1.3KB)       Tipos do dashboard
│       ├── engine.ts             (4.3KB)       Tipos da engine (CalculationResults, etc.)
│       ├── form.ts               (3.5KB)       Tipos do formulário (FormData)
│       ├── steps.ts              (1.1KB)       Tipos dos steps
│       └── ui.ts                 (417B)        Tipos de UI
│
├── styles/                       (12 arquivos) CSS do projeto
│   ├── index.css                 (4 linhas)    Directives Tailwind (@tailwind base/components/utilities)
│   ├── tokens.css                (57 linhas)   Design tokens CSS custom properties
│   ├── base.css                  (87 linhas)   Reset, body, scrollbar, screen system
│   ├── animations.css            (3 linhas)    Placeholder — Framer Motion assume animações
│   ├── screens.css               (6.709 linhas / 168KB) Estilos completos: hero, form, summary, dashboard
│   ├── dashboard-presentation.css(7.375 linhas / 201KB) Modo apresentação (slides) do dashboard
│   ├── dashboard-macros.css      (79KB)        Estilos específicos da seção Macros
│   ├── dashboard-projection.css  (89KB)        Estilos específicos da seção Projeção
│   ├── dashboard-meals.css       (62KB)        Estilos específicos da seção Refeições
│   ├── dashboard-simulator.css   (77KB)        Estilos específicos do Simulador
│   ├── dashboard-supplements.css (84KB)        Estilos específicos de Suplementos
│   └── dashboard-final.css       (96KB)        Estilos específicos da seção Final
│
└── test/                         (20 arquivos) Testes automatizados
    ├── setup.ts                  (2KB)         Setup do Vitest (happy-dom)
    ├── App.test.tsx              (2.7KB)       Testes de integração do App
    ├── dashboard.test.tsx        (34.6KB)      Testes extensivos do dashboard
    ├── formWizard.test.tsx       (5.2KB)       Testes do wizard
    ├── profiles.storage.test.ts  (3.6KB)       Testes de storage de perfis
    ├── profiles.summary.test.ts  (1.9KB)       Testes de sumário de perfis
    ├── shareState.test.ts        (1.3KB)       Testes de share state
    └── engine/                   (13 testes)   Testes unitários de cada módulo da engine
        ├── calcBMR.test.ts, calcTDEE.test.ts, calcTEF.test.ts, calcBFNavy.test.ts
        ├── calcCalibration.test.ts, calcGoalProjection.test.ts
        ├── calcMetabolicAdaptation.test.ts, splitMacros.test.ts
        ├── applyModifiers.test.ts, renormalizeWeights.test.ts
        ├── validateInputs.test.ts, store.test.ts
        └── pipeline.integration.test.ts
```

### `tools/` — Scripts de build

```
tools/
├── sync-meals-legacy.mjs         (65 linhas)  Extrai HTML/JS de legacy/refeicoes.html → mealsLegacy.generated.ts
└── sync-projection-legacy.mjs    (65 linhas)  Extrai HTML/JS de legacy/projecao.html → projectionLegacy.generated.ts
```

### `public/` — Assets estáticos

```
public/
├── favicon.svg                   (950B)       Ícone SVG do app
└── vite.svg                      (1.5KB)      Logo Vite (default)
```

---

## 2. Organização Atual

### Arquitetura geral

| Aspecto | Status |
|---------|--------|
| **Framework** | React 18 SPA |
| **Bundler** | Vite 5 |
| **Linguagem** | TypeScript strict |
| **State** | Zustand (single store: `useDietForgeStore`) |
| **Roteamento** | Sem router — screens controladas por state (`currentScreen`) |
| **Estilo** | Hybrid: Tailwind CSS 3 + CSS puro massivo |

### Modularidade

O projeto é **modular com exceções significativas**:

- **Componentes**: Bem separados em pastas por feature (`screens/`, `ui/`, `profile/`, `charts/`)
- **Engine de cálculo**: Totalmente modular em `lib/engine/` — cada fórmula em arquivo próprio
- **Types**: Separados em `lib/types/` com barrel exports
- **Constantes**: Centralizadas em `lib/constants/`

**Exceção principal**: Os Slides do modo apresentação (`presentation/*.tsx`) são **componentes monolíticos enormes** que misturam lógica, markup e estilos inline. `MacrosSlide.tsx` sozinho tem **55KB**.

### CSS — Organização

| Tipo | Descrição |
|------|-----------|
| **CSS Custom Properties** | `tokens.css` define todas as variáveis (cores, fontes, radii, shadows, transitions) |
| **Base/Reset** | `base.css` — reset, body, scrollbar, sistema de screens |
| **Tailwind directives** | `index.css` — apenas `@tailwind base/components/utilities` |
| **CSS puro massivo** | `screens.css` (6.709 linhas) + 7 arquivos `dashboard-*.css` |
| **CSS nos componentes** | Nenhum CSS Module — todo CSS é global via classes |
| **Tailwind no JSX** | Componentes `ui/*.tsx` e alguns outros usam classes Tailwind inline |

**Total estimado de CSS**: ~856KB em 12 arquivos (sem contar o CSS gerado pelo Tailwind).

### JS/TS — Organização

- **Zero JS inline** no HTML — tudo via módulos ES
- **Zero `<script>` tags** (exceto o module entry point em `index.html`)
- Nem `<style>` tags no HTML — CSS importado via `main.tsx`
- **5 arquivos `.generated.ts`** contêm HTML/JS legado como template literals (gerados por scripts em `tools/`)

---

## 3. Dependências Externas

### Fontes (Google Fonts CDN)

Carregadas via `<link>` no `index.html`:

| Fonte | Pesos | Uso |
|-------|-------|-----|
| **Inter** | 300–800 | `--font-body` (fallback) |
| **Space Grotesk** | 300–800 | `--font-display` — headlines, UI principal |
| **JetBrains Mono** | 400–700 | `--font-mono` — números, dados técnicos |
| **Fira Code** | 400–700 | `--font-mono` — fallback mono |
| **Barlow Condensed** | 300–900 + italic | `--display` no modo apresentação |
| **Barlow** | 300–800 | `--body` no modo apresentação |
| **Share Tech Mono** | 400 | Referenciada mas pouco usada |

> **7 famílias tipográficas** carregadas. O modo apresentação usa **sistema de fontes diferente** (Barlow) do resto do app (Space Grotesk/Inter).

### Bibliotecas JS (dependencies)

| Pacote | Versão | Uso |
|--------|--------|-----|
| `react` + `react-dom` | ^18.3.1 | Framework UI |
| `zustand` | ^5.0.11 | State management |
| `framer-motion` | ^12.23.24 | Animações e transições |
| `chart.js` + `react-chartjs-2` | ^4.5.1 / ^5.3.0 | Gráfico de projeção |
| `lucide-react` | ^0.554.0 | Ícones SVG |
| `class-variance-authority` | ^0.7.1 | Variantes de componentes (cva) |
| `clsx` | ^2.1.1 | Class names condicionais |
| `tailwind-merge` | ^3.3.1 | Merge de classes Tailwind |

### DevDependencies relevantes

| Pacote | Uso |
|--------|-----|
| `tailwindcss` ^3.4 + `postcss` + `autoprefixer` | Pipeline CSS |
| `vitest` ^2.1 + `happy-dom` | Testing |
| `@testing-library/react` ^16 | Testing utils |
| `prettier` + `prettier-plugin-tailwindcss` | Formatação |
| `eslint` ^9 + plugins React | Linting |
| `typescript` ^5.7 | Compilação |

### Recursos externos (CDN)

- `fonts.googleapis.com` — fontes
- `fonts.gstatic.com` — arquivos de fonte (preconnect)
- **Nenhuma outra CDN** — sem analytics, sem tracking, sem bibliotecas externas via CDN

---

## 4. Fluxo de Carregamento

### Entry point e sequência

```
1. index.html
   ├── <link preconnect> fonts.googleapis.com
   ├── <link preconnect> fonts.gstatic.com
   ├── <link stylesheet> Google Fonts (7 famílias)
   ├── <div id="root">
   └── <script type="module" src="/src/main.tsx">

2. src/main.tsx
   ├── import App from './App'
   ├── import './styles/index.css'           → @tailwind directives
   ├── import './styles/tokens.css'          → CSS custom properties
   ├── import './styles/base.css'            → Reset + screen system
   ├── import './styles/animations.css'      → Placeholder (vazio)
   ├── import './styles/screens.css'         → 6.709 linhas de CSS global
   ├── import './styles/dashboard-presentation.css' → 7.375 linhas CSS
   └── createRoot(#root).render(<StrictMode><App/></StrictMode>)

3. App.tsx (renderização)
   ├── Zustand store inicializa com formData mock (initialFormData)
   ├── Pipeline de cálculo roda imediatamente (computeForForm)
   ├── Checa URL hash para state compartilhado (?s=base64)
   ├── Renderiza screen baseada em currentScreen:
   │   hero → HeroScreen
   │   form → FormScreen (wizard multi-step)
   │   profile_create → ProfileCreationScreen
   │   summary → SummaryScreen
   │   dashboard → DashboardScreen
   └── AnimatePresence (framer-motion) anima transições entre screens
```

### Lazy loading

- **Não há lazy loading** de componentes (nenhum `React.lazy()`)
- **Não há code splitting** — tudo é bundled em um único chunk
- **Não há dynamic imports** — todos imports são estáticos
- O `vite.config.ts` tem `chunkSizeWarningLimit: 800` (KB), indicando awareness de bundle size grande

### Inicialização JS

- **Nenhum `DOMContentLoaded`** — React monta via `createRoot().render()`
- O Zustand store inicializa **síncronamente** com dados mock + cálculos iniciais
- Hash da URL é checado no `useEffect` do `App` para hydration de share state
- Perfis são carregados do `localStorage` via `lib/profiles/storage.ts`

### CSS — Onde cada arquivo é importado

| Arquivo CSS | Importado por |
|-------------|---------------|
| `index.css` | `main.tsx` |
| `tokens.css` | `main.tsx` |
| `base.css` | `main.tsx` |
| `animations.css` | `main.tsx` |
| `screens.css` | `main.tsx` |
| `dashboard-presentation.css` | `main.tsx` |
| `dashboard-macros.css` | `MacrosSlide.tsx` |
| `dashboard-meals.css` | `MealsSlide.tsx` |
| `dashboard-projection.css` | `ProjectionSlide.tsx` |
| `dashboard-simulator.css` | `WhatIfSlide.tsx` |
| `dashboard-supplements.css` | `SupplementsSlide.tsx` |
| `dashboard-final.css` | `FinalSlide.tsx` |

Os 6 CSS globais são importados em `main.tsx` (carregados imediatamente). Os 6 CSS de seção são importados pelos respectivos Slide components — porém como **não há lazy loading**, o Vite inclui todos no bundle final de qualquer forma.

---

## 5. Pasta `legacy/`

### Conteúdo

```
legacy/
├── index-legacy.html             (208KB)  Site monolítico original completo
├── legacy-style.css              (83KB)   CSS do site legado
├── abertura.html                 (68KB)   Seção de abertura/hero
├── dashboard-teste.html          (95KB)   Dashboard de teste
├── macros.html                   (116KB)  Seção de macronutrientes
├── macros_beta_v2_teste.html     (93KB)   Beta v2 de macros (teste)
├── meta.html                     (85KB)   Seção de meta/déficit
├── projecao.html                 (157KB)  Seção de projeção
├── questionario-legacy.html      (91KB)   Formulário original
├── refeicoes.html                (121KB)  Seção de refeições
├── simulador.html                (113KB)  Simulador what-if
├── suplementos.html              (151KB)  Seção de suplementos
├── encerramento.html             (144KB)  Seção final/encerramento
│
├── tdee-opus/                    (9 filhos)   Calculadora TDEE (versão Opus)
│   ├── index.html, package.json, vite.config.ts, tsconfig.json
│   └── src/ (4 arquivos)
│
└── tdee-sonnet/                  (9 filhos)   Calculadora TDEE (versão Sonnet)
    ├── index.html, package.json, vite.config.ts, tsconfig.json
    └── src/ (4 arquivos)
```

### Relação com o site atual

| Status | Descrição |
|--------|-----------|
| **Referência de design** | Os HTMLs legados servem como _pixel-reference_ para o modo apresentação |
| **Integrados via generated** | 5 arquivos são extraídos por scripts (`tools/sync-*.mjs`) e injetados como template literals nos `*.generated.ts` |
| **Parcialmente usados** | Os slides do modo apresentação (`presentation/*.tsx`) renderizam o HTML legado via `dangerouslySetInnerHTML` |
| **NÃO são servidos** | Nenhum HTML legado é linkado ou servido pelo Vite — são apenas fonte de dados |

#### Mapa legacy → generated

| Legacy Source | → Generated File | Script |
|---------------|-------------------|--------|
| `legacy/refeicoes.html` | `mealsLegacy.generated.ts` | `tools/sync-meals-legacy.mjs` |
| `legacy/projecao.html` | `projectionLegacy.generated.ts` | `tools/sync-projection-legacy.mjs` |
| `legacy/suplementos.html` | `supplementsLegacy.generated.ts` | _(script não encontrado — manual?)_ |
| `legacy/simulador.html` | `simulatorLegacy.generated.ts` | _(script não encontrado — manual?)_ |
| `legacy/encerramento.html` | `finalLegacy.generated.ts` | _(script não encontrado — manual?)_ |

> ⚠️ **Apenas 2 scripts de sync existem** (`tools/sync-meals-legacy.mjs` e `tools/sync-projection-legacy.mjs`), mas existem **5 arquivos `.generated.ts`**. Os outros 3 foram provavelmente gerados manualmente ou por scripts que foram removidos.

#### `tdee-opus/` e `tdee-sonnet/`

São **projetos Vite independentes** (cada um com seu `package.json`, `vite.config.ts`). Parecem ser protótipos/experimentos de calculadora TDEE gerados por diferentes LLMs (Opus e Sonnet). **Não são usados pelo site principal** e não têm dependência nenhuma — são referências de implementação puras.

---

## 6. Problemas Estruturais Identificados

### 🔴 CSS — Duplicação e tamanho extremo

1. **~856KB de CSS puro** distribuídos em 12 arquivos. O `dashboard-presentation.css` sozinho tem **7.375 linhas** (201KB) e `screens.css` tem **6.709 linhas** (168KB).

2. **Redefinição massiva de CSS variables**: O `dashboard-presentation.css` redefine praticamente todas as custom properties (`--bg-primary`, `--border-subtle`, `--text-primary`, `--text-secondary`, `--radius-*`, `--spacing-*`, `--transition-*`) que já existem em `tokens.css`, criando um **sistema de design paralelo**. As mesmas variáveis com nomes iguais ou quase iguais existem em 2 sistemas desconectados.

3. **CSS scoping manual via prefixos**: Todo o `dashboard-presentation.css` usa o seletor `#screen-dashboard[data-dashboard-presentation]` prefixado em cada regra (repetido centenas de vezes), em vez de usar CSS Modules, CSS nesting, ou scoping nativo.

4. **Os 6 CSS de seção** (`dashboard-macros.css`, `dashboard-meals.css`, etc.) possivelmente duplicam estilos entre si — patterns como cards, grids, e tipografia são provavelmente repetidos em cada arquivo em vez de compartilhados.

### 🔴 Componentes de apresentação monolíticos

1. **`MacrosSlide.tsx` (55KB)** é o maior componente do projeto. Mistura markup massivo, lógica de estado, e estilos inline. Deveria ser decomposto em sub-componentes.

2. **`WelcomeSlide.tsx` (25.6KB)** e **`GoalSlide.tsx` (23.3KB)** também são excessivamente grandes.

3. Os 5 **`*.generated.ts`** injetam HTML/JS legado (total: ~384KB) que é renderizardo via `dangerouslySetInnerHTML` — alto risco de segurança se os dados legados não forem confiáveis, e impossibilita tree-shaking.

### 🟡 Arquitetura CSS híbrida inconsistente

1. **Tailwind + CSS puro lado a lado**: Componentes `ui/*.tsx` usam Tailwind classes, mas todo o sistema visual está definido em CSS puro global. Não há padrão claro sobre quando usar qual.

2. **`tailwind.config.ts` mapeia custom properties** (`bg900: 'var(--bg-900)'`), mas o CSS de apresentação redefine essas mesmas properties com valores diferentes, quebrando o mapeamento.

3. **Sem CSS Modules**: Nenhum arquivo `.module.css` no projeto — todo CSS é global, gerando risco de colisões de nomes.

### 🟡 Falta de code splitting

1. **Nenhum `React.lazy()`** — o bundle inteiro é carregado na abertura
2. Com 5 arquivos `*.generated.ts` (~384KB de strings) + CSS massivo, o bundle de produção é provavelmente muito pesado
3. O `chunkSizeWarningLimit: 800` no Vite sugere que chunks já excedem os limites padrão

### 🟡 Steps placeholder

5 steps do formulário (`MeasuresStep`, `NutritionStep`, `ProfileStep`, `ReviewStep`, `TargetStep`) são **placeholders vazios** (~224 bytes cada) que exportam um `<div>` vazio. São importados e registrados mas não fazem nada.

### 🟢 Pontos positivos

- **Engine de cálculo bem modularizada** — cada fórmula/cálculo é testável isoladamente
- **Suite de testes abrangente** — 20+ arquivos de teste cobrindo engine, store, integração
- **Design tokens centralizados** em `tokens.css`
- **Types bem definidos** em `lib/types/`
- **Zustand store único e organizado** com ações claras

---

## Resumo Quantitativo

| Métrica | Valor |
|---------|-------|
| Arquivos fonte (src/) | ~91 TS/TSX + 12 CSS |
| Arquivos de teste | ~20 |
| Arquivos legados | 13 HTML + 1 CSS + 2 subprojetos |
| Dependências runtime | 8 pacotes |
| Dependências dev | 16 pacotes |
| CSS total | ~856KB em 12 arquivos |
| Maior componente | `MacrosSlide.tsx` (55KB) |
| Maior CSS | `dashboard-presentation.css` (201KB / 7.375 linhas) |
| Fontes externas | 7 famílias (Google Fonts) |
| Screens do app | 5 (hero, form, profile_create, summary, dashboard) |
| Steps do wizard | 21 definidos (16 funcionais + 5 placeholders) |
| Seções do dashboard | 12 |
| Slides de apresentação | 10 |
