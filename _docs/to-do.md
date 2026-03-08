# To-Do Geral do Projeto

## Norte

Este backlog parte de duas decisoes travadas:

1. A base estrutural precisa ficar limpa, coerente e sustentavel antes de qualquer redesign pesado.
2. A direcao visual oficial do produto e o manifesto em `/.agent/skills/promptforge/references/project/manifest.md`.

## Status atual

- Fase 0 concluida.
- Fase 1 concluida.
- Fase 2 ainda nao iniciada.
- A arvore esta pronta para um commit limpo, mas esta tarefa nao criou commit.

---

## Fase 0 - Estrutura e higiene da base

### Concluido

- [x] Auditar a estrutura geral do repositorio.
- [x] Identificar arquivos mortos, duplicados e residuos versionados.
- [x] Remover artefatos locais do repositorio (`artifacts`, `dist`, `test-results`).
- [x] Atualizar `.gitignore` para impedir o retorno desses arquivos.
- [x] Remover modulos mortos de UI, hooks e barrels sem reachability.
- [x] Corrigir a configuracao do formulario, removendo naming ruim em `mockForm` e `steps`.
- [x] Criar `src/features/form/config/` para concentrar configuracao real do wizard.
- [x] Documentar a arquitetura atual em `_docs/architecture.md`.
- [x] Registrar em `_docs/architecture.md` que o manifesto e a referencia principal para as proximas etapas visuais.
- [x] Atualizar `README.md` com contexto real do produto, scripts, estrutura e docs.
- [x] Revisar `public/` para manter apenas assets reais do produto.
- [x] Revisar o diff estrutural e deixar a arvore pronta para um commit limpo.
- [x] Validar a base apos a limpeza com lint, testes e build.

---

## Fase 1 - Consolidacao arquitetural antes do redesign visual

Objetivo: reduzir acoplamentos e preparar o terreno para a refatoracao visual sem espalhar churn pela base inteira.

### Concluido

- [x] Criar `src/app/` para concentrar orquestracao, tipos e registro de telas.
- [x] Migrar `hero`, `form`, `profile`, `summary` e `dashboard` para namespaces em `src/features/`.
- [x] Manter `components/ui`, `components/layout` e `components/design-system` apenas para compartilhados reais.
- [x] Reclassificar `HeightDualInput`, `NumberField`, `ProjectionTrendChart` e `DesignSystemPreview`.
- [x] Revisar imports relativos profundos e preferir `@/` em cruzamentos de camada.
- [x] Confirmar `src/lib/` reservado para dominio, types e utilitarios puros.
- [x] Mover draft storage do formulario para `features/form/storage/draftStorage.ts`.
- [x] Mover copy local para as features `hero`, `form` e `summary`.
- [x] Mover config visual de perfil para `features/profile/config/`.
- [x] Extrair helpers do store sem quebrar a API publica de `useDietForgeStore`.
- [x] Quebrar o antigo CSS monolitico em `foundations`, `utilities` e arquivos por feature.
- [x] Criar `src/styles/index.css` como unica entrada global importada por `src/main.tsx`.
- [x] Revisar `base.css`, `tokens.css`, `index.css` e `shared.css` para definir papeis claros.
- [x] Atualizar `_docs/architecture.md` para refletir a base consolidada.
- [x] Criar `_docs/frontend-conventions.md` com convencoes da nova base.
- [x] Validar a reorganizacao com lint, testes e build.

---

## Fase 2 - Fundacao do novo sistema visual

Objetivo: preparar a linguagem Neo-Brutalismo Clean no nivel de tokens, tipografia, espacamento e primitivos antes de refatorar as telas.

### Tokens e fundamentos

- [ ] Redefinir tokens de cor com base no manifesto:
- branco para light mode
- preto abissal para dark mode
- verde vivo como accent e foco
- [ ] Remover dependencias de paletas paralelas antigas como dourado, azul, violeta e gradientes que nao pertencam ao novo sistema.
- [ ] Redefinir tipografia de display e body para o novo posicionamento premium.
- [ ] Redefinir escala de espacamento para suportar layout sparse.
- [ ] Redefinir bordas, raios, contornos e sombras para um brutalismo clean, menos glow e menos glass.
- [ ] Revisar `color-scheme`, estados de foco, selecao e contraste geral.

### Primitivos de UI

- [ ] Recalibrar `Button`, `DataCard`, `SectionShell`, `Badge` e outros blocos compartilhados.
- [ ] Definir variantes de CTA e superficie que sirvam ao manifesto inteiro.
- [ ] Garantir que os primitivos funcionem bem em light e dark mode.
- [ ] Atualizar ou recriar a preview de design system para virar referencia real da nova linguagem.

### Criterios de pronto da fase

- [ ] Existe um conjunto claro de tokens e primitivos que permite construir a Hero sem improviso.
- [ ] O sistema visual nao depende mais do look atual baseado em dark neon / glow emerald.

---

## Fase 3 - Workflow oficial de redesign por secao

Objetivo: executar a refatoracao visual do produto de forma controlada, sem desenhar direto no core sem referencia validada.

### Regra fixa para cada secao

- [ ] Gerar briefing criativo com PromptForge.
- [ ] Produzir HTML de referencia como artefato visual definitivo da etapa.
- [ ] Validar visual, estrutura, hierarquia, densidade e comportamento.
- [ ] Converter para React respeitando a arquitetura do projeto.
- [ ] Testar a secao integrada no fluxo real.
- [ ] So depois avancar para a proxima secao.

### Ordem sugerida

- [ ] Hero
- [ ] Form shell
- [ ] Steps do formulario
- [ ] Profile create
- [ ] Summary
- [ ] Dashboard welcome
- [ ] Dashboard goal
- [ ] Dashboard TDEE
- [ ] Dashboard macros
- [ ] Dashboard meals
- [ ] Dashboard projection
- [ ] Dashboard supplements
- [ ] Dashboard what-if
- [ ] Dashboard final

---

## Fase 4 - Hero como primeira entrega visual

Objetivo: usar a Hero como secao piloto para validar o novo processo inteiro.

### Briefing e referencia

- [ ] Gerar prompt com PromptForge para `escopo: tela hero` e `preset: polish`.
- [ ] Injetar no briefing o contexto do projeto e o manifesto oficial.
- [ ] Produzir HTML unico da Hero como referencia final.
- [ ] Validar headline, subheadline, CTA, preview de dados e densidade de layout.

### Conversao para o projeto

- [ ] Refatorar a Hero React a partir da referencia HTML validada.
- [ ] Ajustar copy apenas se necessario para consistencia do produto.
- [ ] Atualizar estilos compartilhados caso a Hero revele gaps reais no design system.
- [ ] Validar desktop e mobile.
- [ ] Garantir que a Hero continue conectada ao fluxo `hero -> form`.

### Criterios de pronto

- [ ] Hero validada visualmente.
- [ ] Hero integrada no fluxo real.
- [ ] Hero sem dependencia visual do estilo antigo.
- [ ] Hero servindo como padrao para as proximas secoes.

---

## Fase 5 - Refatoracao do formulario

Objetivo: levar o wizard inteiro para a nova linguagem sem quebrar a experiencia de preenchimento.

### Estrutura

- [ ] Refatorar o shell do formulario antes dos steps individuais.
- [ ] Revisar header, progresso, navegacao e feedback de validacao.
- [ ] Definir linguagem consistente para cards de opcao, sliders, campos numericos e blocos informativos.

### Steps

- [ ] Revisar cada step para verificar se a estrutura visual atual ainda faz sentido no novo sistema.
- [ ] Garantir consistencia entre states:
- default
- hover
- active
- selected
- disabled
- validation
- [ ] Ajustar os steps mais sensiveis primeiro:
- goal
- basics
- body fat
- training
- cardio
- goal timeline

### UX

- [ ] Preservar rapidez, clareza e legibilidade do fluxo.
- [ ] Evitar excesso de ornamento visual em etapas de coleta de dados.

---

## Fase 6 - Profile, Summary e Dashboard

Objetivo: levar a experiencia pos-calculo para o novo patamar visual sem perder densidade informativa.

### Profile e Summary

- [ ] Refatorar criacao de perfil.
- [ ] Refatorar drawer de perfis e estados associados.
- [ ] Refatorar summary como ponte premium entre formulario e dashboard.

### Dashboard

- [ ] Revisar navegacao lateral/mobile do dashboard.
- [ ] Definir padrao visual para secoes analiticas e secoes narrativas.
- [ ] Unificar linguagem de cards, metricas, receipt blocks, charts e simulador.
- [ ] Revisar cada uma das 9 secoes com base no novo sistema visual.
- [ ] Reavaliar se parte do CSS legado do dashboard deve virar componentes e utilitarios mais declarativos.

---

## Fase 7 - Qualidade, testes e manutencao

Objetivo: garantir que a evolucao visual nao degrade confiabilidade nem mantenabilidade.

### Testes

- [ ] Atualizar testes quando a estrutura visual mudar de forma relevante.
- [ ] Adicionar cobertura para componentes/padroes criticos novos.
- [ ] Considerar snapshots visuais ou testes de smoke por secao chave.

### Performance e integridade

- [ ] Revisar warning de chunk grande do build.
- [ ] Considerar code splitting para dashboard e rotas/presentations pesadas.
- [ ] Garantir que o build final continue limpo apos cada fase.

### Documentacao

- [ ] Manter `_docs/architecture.md` atualizado a cada mudanca estrutural relevante.
- [ ] Manter este arquivo `_docs/to-do.md` atualizado conforme as fases avancarem.
- [ ] Criar docs especificos quando nascerem decisoes importantes de design system ou arquitetura de features.

---

## Ordem recomendada de execucao agora

### Proximo bloco imediato

- [ ] Iniciar a Fase 2 com redefinicao de tokens, tipografia e primitivos.
- [ ] Validar a primeira versao do sistema visual antes de qualquer redesign de tela.
- [ ] Preparar o briefing PromptForge da Hero somente apos o fechamento dos fundamentos da Fase 2.

### Primeira entrega real apos isso

- [ ] HTML de referencia da Hero.
- [ ] Conversao da Hero para React.
- [ ] Validacao da Hero como padrao visual do restante do produto.

---

## Definicao de sucesso

- [x] A base continua simples de manter.
- [ ] O design system passa a refletir o manifesto oficial.
- [ ] Cada secao refatorada entra no core apenas depois de validada por HTML de referencia.
- [ ] O produto inteiro converge para uma linguagem unica, premium, limpa e consistente.
