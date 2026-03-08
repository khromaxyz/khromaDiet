# KhromaDiet Frontend

Frontend React 18 + TypeScript + Vite de uma calculadora nutricional premium com fluxo:

`Hero -> Form -> Profile -> Summary -> Dashboard`

Esta base acabou de encerrar a consolidacao tecnica da Fase 0 e da Fase 1. O objetivo desta etapa foi reorganizar arquitetura, store helpers, imports, CSS e documentacao sem iniciar ainda a refatoracao visual definida no manifesto.

Observacao: partes do codigo e da copy interna ainda usam nomes historicos como `DietForge`. Isso foi preservado de proposito nesta fase para evitar churn de produto e regressao de comportamento.

## Stack

- React 18
- TypeScript
- Vite
- Zustand
- Vitest + Testing Library
- Framer Motion
- Nivo
- Tailwind utilities + CSS global segmentado por camada/feature

## Scripts

- `npm run dev`: sobe o app em modo desenvolvimento.
- `npm run lint`: valida ESLint com `--max-warnings=0`.
- `npm run test`: executa a suite Vitest.
- `npx vitest run`: execucao direta usada na validacao tecnica.
- `npm run build`: valida TypeScript e gera o build de producao.
- `npm run preview`: serve o build localmente.

## Estrutura

```text
src/
|- app/
|- components/
|  |- design-system/
|  |- layout/
|  \- ui/primitives/
|- features/
|  |- dashboard/
|  |- form/
|  |- hero/
|  |- profile/
|  \- summary/
|- hooks/
|- lib/
|  |- constants/
|  |- engine/
|  |- profiles/
|  |- types/
|  |- shareState.ts
|  \- utils.ts
|- store/
|- styles/
|  |- foundations/
|  |- features/
|  |- utilities/
|  \- index.css
\- test/
```

## Convencoes principais

- `src/app/` concentra orquestracao de fluxo, ordem de telas e tipos de navegacao.
- `src/features/*` concentra codigo por dominio, incluindo componentes, config, copy e storage locais.
- `src/components/*` fica reservado para compartilhados reais.
- `src/lib/*` fica reservado para logica pura de dominio, engine, types e persistencia de perfis.
- `src/store/useDietForgeStore.ts` continua sendo a API publica do estado global; helpers puros foram extraidos para `src/store/`.
- `src/styles/index.css` e a unica entrada global de estilos.
- Imports cruzando camadas ou features usam `@/`; relativo curto so dentro da mesma feature.

## Documentacao

- [`_docs/architecture.md`](/C:/Users/Pichau/Documents/khromaDiet%20-%20Copia/_docs/architecture.md): arquitetura consolidada da base.
- [`_docs/frontend-conventions.md`](/C:/Users/Pichau/Documents/khromaDiet%20-%20Copia/_docs/frontend-conventions.md): regras operacionais para novas mudancas.
- [`_docs/to-do.md`](/C:/Users/Pichau/Documents/khromaDiet%20-%20Copia/_docs/to-do.md): backlog por fase.
- [`_docs/branding.md`](/C:/Users/Pichau/Documents/khromaDiet%20-%20Copia/_docs/branding.md): referencias de marca.
- [manifest.md](/C:/Users/Pichau/Documents/khromaDiet%20-%20Copia/.agent/skills/promptforge/references/project/manifest.md): manifesto visual oficial para as fases de redesign.

## Estado atual

- Fase 0 concluida.
- Fase 1 concluida.
- Fase 2 ainda nao iniciada.
- `public/` foi reduzido para o asset real atual `favicon.svg`.
- O warning de chunk grande no build segue aberto para a Fase 7.
