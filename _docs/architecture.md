# Arquitetura do Projeto

## Contexto

KhromaDiet e um frontend React 18 + TypeScript + Vite para calculo nutricional orientado por fluxo.

O estado atual da base ja incorpora a Fase 2 do redesign:

- o manifesto em `.agent/skills/promptforge/references/project/manifest.md` continua sendo a autoridade principal
- o arquivo `_docs/design-references/beta/Winner_opusN_8.7_none.html` passou a ser a referencia visual operacional
- a implementacao React agora trata esse winner como materializacao oficial do manifesto

O fluxo principal preservado continua:

`Hero -> Formulario em 14 steps -> Criacao de perfil -> Summary -> Dashboard`

## Estrutura atual

```text
.
|- _docs/
|  |- architecture.md
|  |- design-system-foundation.md
|  |- design-tokens.md
|  |- frontend-conventions.md
|  \- to-do.md
|- src/
|  |- app/
|  |- components/
|  |  |- design-system/
|  |  |- layout/
|  |  |- providers/
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
|  |  |- theme.ts
|  |  \- utils.ts
|  |- store/
|  |- styles/
|  |  |- foundations/
|  |  |- features/
|  |  |- utilities/
|  |  \- index.css
|  \- test/
|- index.html
|- tailwind.config.ts
\- package.json
```

## Camadas e responsabilidades

### `src/app/`

Camada de orquestracao.

- `AppFlow.tsx` compoe telas, navega fluxo, integra draft, perfis, preview do design system e agora conecta o tema visual global.
- `screens.ts` e `types.ts` continuam definindo a ordem e os contratos de navegacao.

### `src/components/`

Camada de compartilhados reais.

- `components/design-system/`: fundacao visual oficial do produto.
- `components/layout/`: wrappers e controles de layout compartilhados, incluindo o toggle de tema.
- `components/providers/ThemeProvider.tsx`: provider React dedicado ao tema.
- `components/ui/primitives/`: primitives de interface usados por features e pelo design system.

### `src/features/`

Camada de produto por dominio de interface.

- `hero/`: hero real do produto, ja traduzida para a nova linguagem base.
- `form/`: wizard, header, steps, shell, draft storage e copy.
- `profile/`: criacao de perfil, drawer, settings e avatares.
- `summary/`: ponte entre calculo e dashboard.
- `dashboard/`: shell, topbar, apresentacao em 9 secoes, receipt e footer.

### `src/lib/`

Codigo puro e contratos transversais.

- `engine/`: calculos nutricionais.
- `profiles/`: persistencia e resumo de perfis.
- `shareState.ts`: serializacao e hidratacao de compartilhamento.
- `theme.ts`: contrato puro de tema, contexto, storage key, resolucao inicial e hook de consumo.

### `src/store/`

Um unico store Zustand continua sendo a API publica do estado de produto.

- `useDietForgeStore.ts` permanece como fachada do estado global.
- nomes internos legados ligados a `DietForge` foram preservados quando nao causam ambiguidade arquitetural.

## Sistema visual implementado

### Fonte de verdade

- manifesto: direcao conceitual e criterios obrigatorios
- winner HTML: referencia visual concreta
- React real: implementacao oficial sustentavel

### Fundacao

- `index.html` inicializa o tema antes do boot do React e carrega as familias tipograficas oficiais
- `src/styles/foundations/tokens.css` concentra tokens finais de cor, tipografia, espacamento, raio, sombra, motion e aliases de compatibilidade
- `src/styles/foundations/base.css` aplica reset, ambiente, focus, selection, scrollbars e infraestrutura global
- `src/styles/foundations/index.css` conecta tokens ao layer base e aos aliases consumidos por Tailwind e primitives

### Tema

- temas suportados: `light | dark`
- persistencia: `localStorage['khromadiet-theme']`
- resolucao inicial: `preferencia salva -> sistema -> light`
- controle visivel: toggle compartilhado no shell da aplicacao e no topbar do dashboard

### Componentizacao

O design system oficial se apoia principalmente em:

- `SectionShell`
- `SectionHeader`
- `DataCard`
- `StatBlock`
- `ChartContainer`
- `Button`
- `Badge`
- `Input`
- `Slider`
- `Progress`

Esses componentes agora carregam a linguagem do winner: superfícies limpas, bordas fortes, sombra medida, tipografia consistente e uso restrito do verde como acento.

## Politica atual de CSS

- `src/styles/index.css` continua sendo a unica entrada global
- `foundations/` define sistema e tokens
- `features/*.css` aplica composicao e ajustes locais sem recriar paletas ou tokens paralelos
- `utilities/shared.css` permanece apenas para casos realmente compartilhados

Nao reintroduzir:

- glassmorphism solto
- glow neon como linguagem principal
- overrides locais de azul, violeta ou dourado como sistema paralelo

## Fluxo de dados

1. `App.tsx` monta `ThemeProvider`.
2. `AppFlow.tsx` coordena tela ativa, drafts, perfis, preview e navegação.
3. `useDietForgeStore.ts` concentra formulario, resultados, simulacoes e transicoes de fluxo.
4. `lib/engine/*` produz `CalculationResults` a partir de dados puros.
5. `features/profile` persiste snapshots do estado.
6. `features/dashboard` consome resultados e renderiza as 9 secoes dentro do sistema visual oficial.

## Documentos de manutencao

- `_docs/design-system-foundation.md`: principios operacionais do sistema visual
- `_docs/design-tokens.md`: tokens finais e convenções de uso
- `_docs/frontend-conventions.md`: regras praticas para evoluir a base
- `_docs/to-do.md`: backlog vivo apos a Fase 2

## Validacao executada nesta fase

- `npm run lint`
- `npx vitest run`
- `npm run build`

O fluxo funcional, os calculos, a navegacao e a persistencia foram mantidos.
