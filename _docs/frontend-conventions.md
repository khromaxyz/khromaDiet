# Frontend Conventions

## Objetivo

Estas convencoes foram adotadas ao fim da Fase 1 para manter a base previsivel enquanto o redesign visual ainda nao comecou.

## Onde cada tipo de codigo mora

### `src/app/`

Use para:

- orquestracao do fluxo entre telas
- ordem de telas
- tipos de navegacao
- integracoes cross-feature que pertencem ao shell da aplicacao

Nao use para:

- componentes especificos de feature
- calculos de dominio
- copy local de tela

### `src/features/<feature>/`

Use para tudo que pertence claramente a um fluxo ou dominio de interface:

- `components/`
- `config/`
- `content/`
- `storage/`
- `index.ts`

Regra pratica: se a mudanca faz sentido so para uma feature, ela deve nascer dentro da feature.

### `src/components/`

Use apenas para compartilhados reais:

- `design-system/`
- `layout/`
- `ui/primitives/`

Nao reintroduzir telas de produto em `src/components/`.

### `src/lib/`

Use para codigo puro:

- engine
- persistencia de perfis
- utilitarios puros
- types de dominio
- labels compartilhados

`lib/` nao deve depender de React, tela, CSS ou hierarquia de feature.

### `src/store/`

`useDietForgeStore.ts` continua sendo a API publica do estado global.

Helpers puros, tipos internos e estado inicial podem morar em arquivos auxiliares dentro de `src/store/`, mas sem espalhar novas APIs publicas desnecessarias.

## Politica de imports

- Use `@/` para qualquer import cruzando features ou camadas.
- Use relativo curto apenas dentro da mesma feature.
- Evite imports atravessando dois ou tres niveis de pastas quando `@/` deixa o caminho mais claro.
- Nao criar novos imports apontando para caminhos legados de tela.

## Politica de CSS

- `src/main.tsx` importa apenas `src/styles/index.css`.
- `styles/foundations/` contem tokens, Tailwind layer base e reset estrutural.
- `styles/utilities/` contem apenas padroes realmente compartilhados e usados.
- `styles/features/` contem regras por fluxo/tela.
- Nao recriar um CSS monolitico.
- Quando uma regra pertence claramente a uma feature, ela deve morar no arquivo da feature.

## Conteudo, config e storage locais

- Copy local de tela fica na propria feature.
- Config visual ou semantica de uma feature fica na propria feature.
- Persistencia especifica de uma feature fica na propria feature.

Exemplos atuais:

- `features/hero/content/heroCopy.ts`
- `features/form/content/formCopy.ts`
- `features/form/storage/draftStorage.ts`
- `features/profile/config/profileOptions.ts`
- `features/summary/content/summaryCopy.ts`

## Regra de fase

Enquanto a Fase 2 nao comecar oficialmente:

- nao redefinir tokens visuais
- nao trocar linguagem visual
- nao fazer polish de interface
- nao iniciar redesign de Hero, Form, Summary ou Dashboard

Mudancas permitidas nesta base:

- clareza arquitetural
- reducao de acoplamento
- organizacao por feature
- limpeza de naming
- segmentacao estrutural de CSS
- documentacao e validacao

## Checklist minimo para mudancas estruturais

- manter comportamento do fluxo intacto
- manter testes verdes
- rodar `npm run lint`
- rodar `npx vitest run`
- rodar `npm run build`
- atualizar docs se a arquitetura mudar
