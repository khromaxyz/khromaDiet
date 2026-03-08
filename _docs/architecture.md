# Arquitetura do Projeto

## Contexto

KhromaDiet e um frontend React 18 + TypeScript + Vite para calculo nutricional orientado por fluxo. A jornada principal validada hoje e:

`Hero -> Formulario em 14 steps -> Criacao de perfil -> Summary -> Dashboard`

Esta documentacao descreve a base apos o fechamento da Fase 0 e da Fase 1. A consolidacao foi estrutural: organizacao por feature, separacao de responsabilidades, limpeza de imports e segmentacao de CSS. O redesign visual do manifesto ainda nao comecou.

## Estrutura consolidada

```text
.
|- .agent/
|  \- skills/promptforge/
|- _docs/
|  |- architecture.md
|  |- branding.md
|  |- frontend-conventions.md
|  \- to-do.md
|- public/
|  \- favicon.svg
|- src/
|  |- app/
|  |  |- AppFlow.tsx
|  |  |- screens.ts
|  |  \- types.ts
|  |- components/
|  |  |- design-system/
|  |  |- layout/
|  |  \- ui/primitives/
|  |- features/
|  |  |- dashboard/
|  |  |- form/
|  |  |- hero/
|  |  |- profile/
|  |  \- summary/
|  |- hooks/
|  |- lib/
|  |  |- constants/
|  |  |- engine/
|  |  |- profiles/
|  |  |- types/
|  |  |- shareState.ts
|  |  \- utils.ts
|  |- store/
|  |  |- formState.ts
|  |  |- types.ts
|  |  \- useDietForgeStore.ts
|  |- styles/
|  |  |- foundations/
|  |  |- features/
|  |  |- utilities/
|  |  \- index.css
|  \- test/
|- README.md
|- package.json
|- tailwind.config.ts
|- vite.config.ts
\- vitest.config.ts
```

## Limites entre camadas

### `src/app/`

Camada de orquestracao do produto.

- `AppFlow.tsx` compoe as telas, controla navegacao de alto nivel, integra draft resume, perfis e preview do design system por query param.
- `screens.ts` registra ordem e metadados das telas.
- `types.ts` define `ScreenId` e contratos de navegacao.

`app/` pode importar features, store e componentes compartilhados. Features nao devem depender de `AppFlow.tsx`.

### `src/features/`

Camada principal de dominio de interface. Cada feature pode concentrar:

- `components/`
- `config/`
- `content/`
- `storage/`
- `index.ts` estreito para exportar entradas publicas

Estado atual:

- `features/hero/`: hero screen e copy local.
- `features/form/`: wizard, fields, steps, config, example data, copy e draft storage.
- `features/profile/`: criacao de perfil, drawer, trigger, avatar grid e config visual do perfil.
- `features/summary/`: summary screen, metricas e copy local.
- `features/dashboard/`: dashboard shell, footer, receipt card, chart e presentation slides.

### `src/components/`

Reservado apenas para compartilhados reais.

- `design-system/`: shells, cards, charts container, preview e blocos reutilizaveis.
- `layout/`: wrappers e navegacao compartilhada.
- `ui/primitives/`: primitives basicos.

Nao ha mais telas de produto em `src/components/`.

### `src/lib/`

Reservado para logica pura e contratos transversais.

- `engine/`: pipeline nutricional e calculos.
- `profiles/`: persistencia e resumo de perfis salvos.
- `types/`: contratos centrais de dominio.
- `constants/`: labels compartilhados que nao pertencem a uma feature visual.
- `shareState.ts`: serializacao/hidratacao de estado compartilhado.
- `utils.ts`: utilitarios puros compartilhados.

O rascunho do formulario saiu de `lib/profiles` e passou a morar em `features/form/storage/draftStorage.ts`.

### `src/store/`

Mantem um unico store Zustand nesta fase.

- `useDietForgeStore.ts`: API publica da aplicacao.
- `formState.ts`: helpers puros e estado inicial do formulario.
- `types.ts`: contratos internos do store.

Nesta consolidacao o store nao foi quebrado em multiplos stores; apenas foram extraidas responsabilidades auxiliares.

### `src/styles/`

Agora existe uma entrada unica:

- `styles/index.css`

Essa entrada importa:

- `styles/foundations/tokens.css`
- `styles/foundations/index.css`
- `styles/foundations/base.css`
- `styles/utilities/shared.css`
- `styles/features/hero.css`
- `styles/features/form.css`
- `styles/features/profile.css`
- `styles/features/summary.css`
- `styles/features/dashboard-shell.css`
- `styles/features/dashboard-presentation.css`
- `styles/features/dashboard-final.css`

`screens.css` foi removido. O objetivo foi reduzir o CSS monolitico sem redesenhar a interface.

## Decisoes estruturais desta fase

### Orquestracao de fluxo

- `src/App.tsx` virou um wrapper fino.
- `src/app/AppFlow.tsx` passou a ser o ponto central do fluxo.
- `ScreenId` saiu de `lib/types/app.ts` e foi movido para `src/app/types.ts`.

### Reorganizacao por feature

- Hero, form, profile, summary e dashboard agora vivem em `src/features/`.
- `HeightDualInput` e `NumberField` foram reclassificados como fields do formulario.
- `ProjectionTrendChart` foi movido para a feature de dashboard.
- `DesignSystemPreview` foi movido para `components/design-system/`.

### Conteudo e storage locais

- `heroCopy`, `formCopy` e `summaryCopy` sairam de `lib/constants/copy.ts`.
- `DraftPayload`, `loadDraft`, `saveDraft`, `clearDraft` e `DRAFT_STORAGE_KEY` passaram para `features/form/storage/draftStorage.ts`.
- `AVATAR_STYLES` e `GOAL_TONE_BY_OBJECTIVE` passaram para config do feature `profile`.

### Higiene de base

- `README.md` deixou de ser template Vite.
- `public/` foi reduzido ao asset atual `favicon.svg`.
- A base ficou com lint limpo.

## Fluxo de dados

1. `AppFlow.tsx` coordena a tela ativa e conecta os eventos de navegacao.
2. `useDietForgeStore.ts` centraliza os dados do wizard, resultados e simulacoes.
3. `lib/engine/*` recebe dados puros do formulario e produz `CalculationResults`.
4. `features/profile` persiste snapshots do estado via `lib/profiles/storage.ts`.
5. `features/form/storage/draftStorage.ts` guarda e recupera o draft do wizard.
6. `features/dashboard` consome resultados consolidados e renderiza as 9 secoes.

## Politica de imports

- `@/` e obrigatorio para imports cruzando features ou camadas.
- Import relativo curto e aceitavel apenas dentro da mesma feature.
- Nao criar novos imports apontando para caminhos legados de tela.
- `lib/` nao deve importar UI.
- `components/` nao deve concentrar codigo de fluxo de produto.

## Politica de CSS

- `styles/index.css` e a unica entrada importada por `src/main.tsx`.
- `foundations/` guarda tokens, Tailwind layer base e reset estrutural.
- `utilities/shared.css` guarda apenas padroes realmente reutilizados.
- `features/*.css` guarda regras por fluxo/tela sem redefinir o manifesto visual.
- Nesta fase nao houve troca de tokens visuais nem redesign.

## Validacao executada nesta consolidacao

- `npm run lint`
- `npx vitest run`
- `npm run build`

Cenarios cobertos e preservados:

- fluxo completo `hero -> form -> profile_create -> summary -> dashboard`
- navegacao para tras no wizard
- exemplo do dashboard
- salvar, carregar, renomear, compartilhar e excluir perfil
- retomar e descartar draft
- preview do design system via query param

## Limites para a proxima fase

- O manifesto em `.agent/skills/promptforge/references/project/manifest.md` continua sendo a referencia oficial para o redesign.
- A Fase 2 pode redefinir tokens e primitivos.
- A Fase 3 em diante pode iniciar o workflow `PromptForge -> HTML de referencia -> conversao para React`.
- O warning de chunk grande do build permanece documentado para a Fase 7.
