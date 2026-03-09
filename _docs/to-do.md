# To-Do Geral do Projeto

## Status consolidado

- Fase 0 concluida
- Fase 1 concluida
- Fase 2 concluida
- o winner final ja foi integrado ao core React como fundacao visual oficial

## Fase 2 - Conclusao registrada

Entregue:

- [x] tokens finais consolidados em `src/styles/foundations/`
- [x] light e dark como temas oficiais com toggle visivel e persistencia
- [x] primitives e design system recalibrados para o winner
- [x] hero, formulario, profile, summary e dashboard movidos para a nova linguagem base
- [x] preview do design system mantida como referencia React do sistema
- [x] documentacao de fundacao e tokens criada em `_docs`
- [x] lint, testes e build executados apos a refatoracao

## Backlog ativo

### Fase 3 - Polimento orientado por produto

Objetivo: aprofundar acabamento, consistencia e densidade de cada area sem trocar a direcao visual.

- [ ] revisar copy visivel restante para remover qualquer resquicio de branding antigo
- [ ] eliminar strings com encoding legado ainda presentes em algumas labels do dashboard
- [ ] revisar todos os slides do dashboard em light e dark com captura visual comparativa
- [ ] refinar charts e legendas onde a diferenciacao ainda depende demais de tons auxiliares
- [ ] revisar microestados de hover, focus e disabled nos componentes menos frequentes

### Fase 4 - Qualidade visual e performance

- [ ] reduzir o warning de chunk grande do build com code splitting controlado
- [ ] decidir se `dashboard/presentation` deve ser quebrado em chunks por secao
- [ ] validar mobile real em breakpoints criticos do dashboard
- [ ] considerar smoke visual automatizado para hero, form, summary e dashboard

### Fase 5 - Evolucao do produto

- [ ] iniciar novas entregas funcionais sobre a base visual oficial
- [ ] manter docs atualizadas quando tokens, primitives ou contratos compartilhados mudarem

## Definicao de sucesso daqui para frente

- [x] o manifesto continua soberano
- [x] o winner implementado e o design system oficial
- [x] a base real sustenta as proximas etapas sem linguagem visual paralela
- [ ] a evolucao futura acontece por refinamento do sistema atual, nao por novo redesign concorrente
