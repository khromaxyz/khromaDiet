# Redesign Status — DietForge

> Gerado em 2026-03-06. Fatos sobre o estado atual do projeto.

---

## 1. Estrutura de `src/`

```
src/
├── App.tsx                          # Root component, roteamento entre telas
├── main.tsx                         # Entry point React (ReactDOM.createRoot)
├── vite-env.d.ts
│
├── components/
│   ├── charts/
│   │   └── ProjectionChart.tsx
│   │
│   ├── layout/
│   │   ├── PageWrapper.tsx
│   │   └── ScreenNavPill.tsx
│   │
│   ├── profile/
│   │   ├── ProfileAvatar.tsx
│   │   ├── ProfileAvatarGrid.tsx
│   │   ├── ProfileCreationScreen.tsx
│   │   ├── ProfileDrawer.tsx
│   │   ├── ProfileSettingsPanel.tsx
│   │   └── ProfileTriggerButton.tsx
│   │
│   ├── screens/
│   │   ├── dashboard/
│   │   │   ├── DashboardScreen.tsx       # Orquestra as 9 seções do dashboard
│   │   │   └── sections/
│   │   │       ├── BeforeAfterSection.tsx
│   │   │       ├── CalibrationSection.tsx
│   │   │       ├── DashboardFooter.tsx
│   │   │       ├── KpiStrip.tsx
│   │   │       ├── MacroCards.tsx
│   │   │       ├── MealsSection.tsx
│   │   │       ├── ProfileStrip.tsx
│   │   │       ├── ProjectionSection.tsx
│   │   │       ├── ReceiptCard.tsx
│   │   │       ├── RefeedSection.tsx
│   │   │       ├── SupplementsSection.tsx
│   │   │       ├── WhatIfSection.tsx
│   │   │       └── presentation/
│   │   │           ├── WelcomeSlide.tsx
│   │   │           ├── TdeeSlide.tsx
│   │   │           ├── GoalSlide.tsx
│   │   │           ├── MacrosSlide.tsx
│   │   │           ├── ProjectionSlide.tsx   ← usa .generated.ts
│   │   │           ├── MealsSlide.tsx        ← usa .generated.ts
│   │   │           ├── SupplementsSlide.tsx  ← usa .generated.ts
│   │   │           ├── WhatIfSlide.tsx       ← usa .generated.ts
│   │   │           ├── FinalSlide.tsx        ← usa .generated.ts
│   │   │           ├── RefeedSlide.tsx
│   │   │           ├── types.ts
│   │   │           ├── projectionLegacy.generated.ts
│   │   │           ├── mealsLegacy.generated.ts
│   │   │           ├── supplementsLegacy.generated.ts
│   │   │           ├── simulatorLegacy.generated.ts
│   │   │           └── finalLegacy.generated.ts
│   │   │
│   │   ├── form/
│   │   │   ├── FormScreen.tsx
│   │   │   ├── FormHeader.tsx
│   │   │   ├── FormStepRenderer.tsx
│   │   │   └── steps/
│   │   │       ├── ActivityStep.tsx
│   │   │       ├── BasicsStep.tsx
│   │   │       ├── BodyFatStep.tsx
│   │   │       ├── CardioStep.tsx
│   │   │       ├── DietHistoryStep.tsx
│   │   │       ├── GoalOptionCard.tsx
│   │   │       ├── GoalStep.tsx
│   │   │       ├── GoalTimelineStep.tsx
│   │   │       ├── HealthStep.tsx
│   │   │       ├── HormonesStep.tsx
│   │   │       ├── MealsStep.tsx
│   │   │       ├── OccupationStep.tsx
│   │   │       ├── SexStep.tsx
│   │   │       ├── StepNav.tsx
│   │   │       └── (outros steps)
│   │   │
│   │   ├── hero/
│   │   │   ├── HeroScreen.tsx
│   │   │   └── HeroStats.tsx
│   │   │
│   │   └── summary/
│   │       ├── SummaryScreen.tsx
│   │       └── SummaryMetrics.tsx
│   │
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── HeightDualInput.tsx
│       ├── NumberField.tsx
│       ├── ProgressBar.tsx
│       └── Slider.tsx
│
├── hooks/
│   ├── useCountUp.ts
│   ├── useFormState.ts
│   ├── useScrambleNumber.ts
│   └── useWizardState.ts
│
├── lib/
│   ├── constants/
│   │   ├── copy.ts
│   │   ├── exampleForm.ts
│   │   ├── icons.ts / icons.tsx
│   │   ├── index.ts
│   │   ├── labels.ts
│   │   ├── mockChart.ts
│   │   ├── mockDashboard.ts
│   │   ├── mockForm.ts
│   │   ├── mockSummary.ts
│   │   └── steps.ts
│   ├── engine/              # Motor de cálculo (BMR, TDEE, macros, etc.)
│   │   ├── dietEngine.ts
│   │   ├── runPipeline.ts
│   │   ├── calcBMR.ts, calcTDEE.ts, calcTEF.ts, etc.
│   │   └── (12 arquivos)
│   ├── profiles/
│   │   ├── constants.ts
│   │   ├── storage.ts
│   │   ├── summary.ts
│   │   └── types.ts
│   ├── shareState.ts
│   ├── types/               # Tipagem centralizada
│   │   ├── app.ts, chart.ts, dashboard.ts, engine.ts
│   │   ├── form.ts, steps.ts, ui.ts
│   │   └── index.ts
│   └── utils.ts
│
├── store/
│   └── useDietForgeStore.ts   # Zustand store global
│
└── styles/
    ├── tokens.css               # Design tokens (variáveis :root)
    ├── base.css                 # Reset + estilos base
    ├── index.css                # Entry point CSS (importa os demais)
    ├── screens.css              # Hero, Form, Summary + layout geral
    ├── animations.css           # Keyframes e transições
    ├── shared-patterns.css      # Padrões reutilizáveis (cards, badges)
    ├── dashboard-presentation.css  # Shell do dashboard (topbar, sidenav, slides)
    ├── dashboard-macros.css     # Seção Macros
    ├── dashboard-projection.css # Seção Projeção
    ├── dashboard-meals.css      # Seção Refeições
    ├── dashboard-supplements.css# Seção Suplementos
    ├── dashboard-simulator.css  # Seção Simulador (What-If)
    └── dashboard-final.css      # Seção Final/Encerramento
```

---

## 2. Estado de cada seção do Dashboard

O Dashboard tem **9 seções** (slides verticais com scroll-snap):

| # | Seção | Slide (.tsx) | Componente React? | Usa .generated.ts? | CSS Dedicado? | Completude Visual |
|---|-------|-------------|-------------------|-------------------|---------------|-------------------|
| 1 | Welcome (Abertura) | `WelcomeSlide.tsx` | ✅ Sim | ❌ Não | `dashboard-presentation.css` (compartilhado) | **polido** |
| 2 | TDEE | `TdeeSlide.tsx` | ✅ Sim | ❌ Não | `dashboard-presentation.css` (compartilhado) | **polido** |
| 3 | Meta / Déficit | `GoalSlide.tsx` | ✅ Sim | ❌ Não | `dashboard-presentation.css` (compartilhado) | **polido** |
| 4 | Macros | `MacrosSlide.tsx` | ✅ Sim | ❌ Não | `dashboard-macros.css` | **polido** |
| 5 | Projeção | `ProjectionSlide.tsx` | ✅ Wrapper | ✅ `projectionLegacy.generated.ts` | `dashboard-projection.css` | **protótipo** — HTML/JS injetado via dangerouslySetInnerHTML |
| 6 | Refeições | `MealsSlide.tsx` | ✅ Wrapper | ✅ `mealsLegacy.generated.ts` | `dashboard-meals.css` | **protótipo** — idem |
| 7 | Suplementos | `SupplementsSlide.tsx` | ✅ Wrapper | ✅ `supplementsLegacy.generated.ts` | `dashboard-supplements.css` | **protótipo** — idem |
| 8 | Simulador (What-If) | `WhatIfSlide.tsx` | ✅ Wrapper | ✅ `simulatorLegacy.generated.ts` | `dashboard-simulator.css` | **protótipo** — idem |
| 9 | Encerramento (Final) | `FinalSlide.tsx` | ✅ Wrapper | ✅ `finalLegacy.generated.ts` | `dashboard-final.css` | **protótipo** — idem |

**Componentes standalone em `sections/` (não são slides):**
Existem 12 componentes em `sections/` fora de `presentation/`: `BeforeAfterSection`, `CalibrationSection`, `DashboardFooter`, `KpiStrip`, `MacroCards`, `MealsSection`, `ProfileStrip`, `ProjectionSection`, `ReceiptCard`, `RefeedSection`, `SupplementsSection`, `WhatIfSection`. Esses são componentes React nativos mas **não são usados pelo DashboardScreen atual** (que renderiza apenas os Slides de `presentation/`). Parecem ser versões alternativas ou componentes prontos para substituir os wrappers legacy.

---

## 3. Landing / Hero

**Existe?** Sim — `HeroScreen.tsx` + `HeroStats.tsx`.

**O que tem:**
- Badge de branding ("DIETFORGE — Calculadora de Dieta Premium")
- Headline em duas linhas (copy de `heroCopy`)
- Subheadline
- Dois CTAs: "Calcular minha dieta" (→ form) e "Ver exemplo" (→ abre preview com dados mock)
- `HeroStats` — bloco animado com estatísticas da landing (framer-motion)
- Visual: grid overlay de background, dark theme

**Entry point do usuário:** HeroScreen é a tela inicial. Botão primário leva ao formulário.

---

## 4. Flow do Usuário

```
hero → form (14 steps wizard) → profile_create → summary → dashboard
```

Detalhamento:
1. **Hero** — Landing page. CTA "Calcular minha dieta" → navega para `form`. Botão "Ver exemplo" carrega dados mock e pula direto para `dashboard`.
2. **Form** — Wizard de 14 passos (goal, sex, basics, body_fat, diet_history, activity, occupation, training, cardio, hormones, health, thermogenics, meals, goal_timeline). Último step chama `computeResults()` e navega para `profile_create`.
3. **Profile Create** — Tela para nomear e escolher avatar do perfil. Salva e navega para `summary`.
4. **Summary** — Resumo dos resultados (BMR, LBM, TEF, macros). CTA "Ver análise completa" → `dashboard`. CTA "Rever dados" → `form`.
5. **Dashboard** — 9 seções em scroll-snap vertical com sidenav lateral e topbar.

**Navegação global:**
- `ScreenNavPill` — pill flutuante que mostra tela e step atuais
- `ProfileDrawer` — drawer lateral para gerenciar perfis salvos
- Setas do teclado: Left/Right entre telas, Up/Down entre seções do dashboard
- Draft auto-save no form (localStorage)
- Share via URL (`?state=...`)

---

## 5. Dependências de UI (package.json)

| Dependência | Versão | Uso |
|------------|--------|-----|
| `react` | ^18.3.1 | Framework |
| `react-dom` | ^18.3.1 | Renderização |
| `framer-motion` | ^12.23.24 | Animações e transições entre telas |
| `zustand` | ^5.0.11 | State management global |
| `lucide-react` | ^0.554.0 | Ícones SVG |
| `chart.js` | ^4.5.1 | Gráficos (projeção) |
| `react-chartjs-2` | ^5.3.0 | Wrapper React para Chart.js |
| `class-variance-authority` | ^0.7.1 | Variantes de componentes (cva) |
| `clsx` | ^2.1.1 | Concatenação de classes |
| `tailwind-merge` | ^3.3.1 | Merge de classes Tailwind |
| `tailwindcss` | ^3.4.17 | Framework CSS (devDep, mas ativo) |

---

## 6. Arquivos Legacy

### `.generated.ts` (5 arquivos — HTML+JS inline stringificado)

Todos em `src/components/screens/dashboard/sections/presentation/`:

| Arquivo | Exporta | Usado por |
|---------|---------|-----------|
| `projectionLegacy.generated.ts` | `LEGACY_PROJECTION_HTML`, `LEGACY_PROJECTION_SCRIPT` | `ProjectionSlide.tsx` |
| `mealsLegacy.generated.ts` | `LEGACY_MEALS_HTML`, `LEGACY_MEALS_SCRIPT` | `MealsSlide.tsx` |
| `supplementsLegacy.generated.ts` | `LEGACY_SUPPLEMENTS_HTML`, `LEGACY_SUPPLEMENTS_SCRIPT` | `SupplementsSlide.tsx` |
| `simulatorLegacy.generated.ts` | `LEGACY_SIMULATOR_HTML`, `LEGACY_SIMULATOR_SCRIPT` | `WhatIfSlide.tsx` |
| `finalLegacy.generated.ts` | `LEGACY_FINAL_HTML`, `LEGACY_FINAL_SCRIPT` | `FinalSlide.tsx` |

### Protótipos em `legacy/` (raiz do projeto)

| Arquivo | Descrição |
|---------|-----------|
| `abertura.html` | Seção de abertura (HTML standalone) |
| `macros.html` | Seção macros (HTML standalone) |
| `macros_beta_v2_teste.html` | Variante beta da seção macros |
| `meta.html` | Seção Meta/Déficit |
| `projecao.html` | Seção de projeção |
| `refeicoes.html` | Seção de refeições |
| `suplementos.html` | Seção de suplementos |
| `simulador.html` | Seção simulador |
| `encerramento.html` | Seção de encerramento |
| `questionario-legacy.html` | Formulário antigo |
| `index-legacy.html` | Landing page antiga |
| `dashboard-teste.html` | Dashboard teste |
| `legacy-style.css` | CSS do sistema legacy |
| `tdee-opus/` | Protótipo TDEE (Vite app separado) |
| `tdee-sonnet/` | Protótipo TDEE alternativo (Vite app separado) |

**Ferramentas de sync em `tools/`:**
- `sync-projection-legacy.mjs` — extrai HTML/JS de `legacy/projecao.html` → `.generated.ts`
- `sync-meals-legacy.mjs` — extrai HTML/JS de `legacy/refeicoes.html` → `.generated.ts`

---

## 7. Estado Visual (Descrição)

| Tela / Seção | Descrição Visual |
|-------------|------------------|
| **Hero** | Dark theme premium. Grid overlay no background. Headline bold em duas linhas, badge branding, dois botões CTA (primário glorificado + secundário ghost). Stats animadas com framer-motion embaixo. Polido. |
| **Form** | Dark theme. Header com logo + step counter + precision meter. Progress bar no topo. Wizard de cards — cada step é um card com opções/inputs. StepNav com botões voltar/avançar. Polido. |
| **Profile Create** | Dark theme. Grid de avatares (12 opções), campo de nome. Botão "Salvar". Funcional mas simples. |
| **Summary** | Dark theme com gradiente de fundo e grid lines. Label decorado, título "Plano calculado". 4 mini-stats (BMR, LBM, TEF, Macros) com dots coloridos. 2 CTAs. Polido. |
| **Dashboard — Welcome** | Cartão de boas-vindas com nome do perfil, data, e métricas resumo. Polido. |
| **Dashboard — TDEE** | Breakdown visual do TDEE com valores numéricos animados. Cards para BMR, TEF, NEAT, EAT. Polido. |
| **Dashboard — Goal** | Meta calórica e déficit/superávit. Cards comparativos. Polido. |
| **Dashboard — Macros** | Cards de macronutrientes (proteína, carb, gordura) com gramas e percentuais. CSS dedicado. Polido. |
| **Dashboard — Projeção** | **Legacy wrapper.** Chart.js com projeção de peso ao longo de semanas. HTML/JS injetado de `.generated.ts`. Funcional mas não integrado ao design system React. Protótipo. |
| **Dashboard — Refeições** | **Legacy wrapper.** Tabela de distribuição de refeições. HTML/JS injetado. Protótipo. |
| **Dashboard — Suplementos** | **Legacy wrapper.** Lista de suplementos recomendados. HTML/JS injetado. Protótipo. |
| **Dashboard — Simulador** | **Legacy wrapper.** Sliders interativos para simular mudanças. HTML/JS injetado. Protótipo. |
| **Dashboard — Final** | **Legacy wrapper.** Tela de encerramento com ações finais. HTML/JS injetado. Protótipo. |
