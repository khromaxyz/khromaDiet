# Agente 2 — Dead Code Cleanup

## Contexto

Você está trabalhando no DietForge, um dashboard nutricional React/TypeScript/Vite. O Agente 1 já gerou um relatório de auditoria CSS completo em `.context/css-audit.md`. Leia esse arquivo primeiro — ele contém todas as variáveis, seletores e valores existentes no projeto.

A arquitetura do projeto está documentada em `.context/architecture.md`. Leia também.

## Objetivo

Remover código morto do projeto: CSS não utilizado, variáveis CSS órfãs, arquivos placeholder, e arquivos de log. **O visual do site deve permanecer 100% idêntico após suas alterações.**

## Regra de Ouro

**NÃO remova nada que possa ser referenciado dinamicamente.** Este projeto tem 5 arquivos `*.generated.ts` que contêm HTML/JS legado injetado via `dangerouslySetInnerHTML` + `new Function`. Seletores CSS que parecem "mortos" numa busca por JSX podem estar vivos dentro dessas strings. Antes de remover qualquer seletor CSS, busque o nome da classe em:

1. Todos os arquivos `.tsx` e `.ts` em `src/`
2. Todos os 5 arquivos `*.generated.ts` em `src/components/screens/dashboard/sections/presentation/`
3. Todos os arquivos HTML em `legacy/` (classes podem ser referenciadas lá e injetadas via generated)

Se encontrar QUALQUER referência em qualquer um desses 3 grupos → NÃO remova.

## Tarefas

### Tarefa 1: Remover os 5 steps placeholder

Remova completamente estes 5 arquivos:
- `src/components/screens/form/steps/MeasuresStep.tsx`
- `src/components/screens/form/steps/NutritionStep.tsx`
- `src/components/screens/form/steps/ProfileStep.tsx`
- `src/components/screens/form/steps/ReviewStep.tsx`
- `src/components/screens/form/steps/TargetStep.tsx`

São componentes de ~6 linhas cada que exportam um `<div>` vazio.

**Depois de deletar os arquivos**, atualize TODOS os lugares que os importam ou referenciam:
- `src/lib/constants/steps.ts` — remova as entradas desses steps do array de definição
- `src/components/screens/form/FormStepRenderer.tsx` — remova os imports e cases/condições que renderizam esses steps
- Qualquer outro arquivo que importe esses componentes (busque com grep)

**Validação:** Após a remoção, rode `npx tsc --noEmit` para garantir que não há erros de importação.

### Tarefa 2: Remover variáveis CSS declaradas mas nunca usadas

Busque em todos os 12 arquivos CSS de `src/styles/` por variáveis declaradas (padrão `--nome: valor`) que **nunca são referenciadas** via `var(--nome)` em nenhum lugar do projeto (CSS, TSX, TS, HTML legado, generated.ts).

Metodologia:
1. Extraia a lista de todas as variáveis declaradas nos 12 CSS
2. Para cada variável, busque `var(--nome)` em todo o `src/` e `legacy/`
3. Se encontrar 0 referências → candidata a remoção
4. Antes de remover, faça uma segunda busca pelo nome sem `var()` (pode ser referenciado em JS como string)
5. Somente remova se ambas as buscas retornarem 0

**Atenção especial:** As variáveis em `dashboard-presentation.css` que redefinem tokens do `tokens.css` NÃO são "não utilizadas" — elas são usadas pelo CSS escopado sob `#screen-dashboard[data-dashboard-presentation]`. Não toque nessas.

### Tarefa 3: Identificar seletores CSS potencialmente mortos (NÃO remover automaticamente)

Para esta tarefa, **não remova nada**. Apenas gere um relatório.

Varra os 12 CSS e extraia todos os seletores (classes, IDs). Para cada seletor, busque referências nos TSX, TS, generated.ts e HTML legado. Gere o arquivo `.context/dead-selectors-candidates.md` com:

```
## Seletores sem referência encontrada (CANDIDATOS — verificar manualmente)

| Seletor | Arquivo CSS | Linha | Referências encontradas |
|---------|------------|-------|------------------------|
| .classe-xyz | screens.css | 423 | 0 |
```

**Por que não remover automaticamente:** Seletores podem ser construídos dinamicamente em JS (ex: `className={`prefix-${variable}`}`), referenciados em strings template dos generated.ts com concatenação, ou usados por pseudo-seletores e combinadores CSS que dependem de outros seletores. A remoção automática é muito arriscada neste projeto.

### Tarefa 4: Remover arquivos de log do Vitest

Delete os seguintes arquivos da raiz do projeto (se existirem):
- `vitest-out.log`
- `vitest-proper-status.log`
- `vitest-proper-utf8.log`
- `vitest-proper-verbose.log`
- `vitest-utf8.log`

Adicione ao `.gitignore`:
```
vitest-*.log
```

### Tarefa 5: Limpar arquivo animations.css

O arquivo `src/styles/animations.css` tem apenas 3 linhas (um comentário). Se o conteúdo for apenas comentário sem regras CSS reais, remova o conteúdo mas **mantenha o arquivo e o import em main.tsx** — ele será usado depois quando migrarmos animações.

## O que NÃO fazer

- **NÃO** remova arquivos da pasta `legacy/` — são referência de design
- **NÃO** remova os arquivos `*.generated.ts` — são usados ativamente pelos slides
- **NÃO** altere nenhum valor visual (cores, tamanhos, posições)
- **NÃO** remova seletores CSS automaticamente — apenas gere o relatório (Tarefa 3)
- **NÃO** toque em arquivos de teste (src/test/)
- **NÃO** remova classes Tailwind do tailwind.config.ts (a remoção é complexa e de baixo impacto)

## Entregáveis

1. Steps placeholder removidos + imports atualizados
2. Variáveis CSS órfãs removidas (com lista do que foi removido)
3. `.context/dead-selectors-candidates.md` gerado
4. Arquivos vitest-*.log removidos + .gitignore atualizado
5. animations.css limpo

## Verificação Final

Rode esses comandos e confirme que passam:
```bash
npx tsc --noEmit          # zero erros de tipo
npx vitest run            # testes passando
```

Reporte:
- Quantos arquivos foram deletados
- Quantas variáveis CSS órfãs foram removidas (e de quais arquivos)
- Quantos seletores candidatos a mortos foram identificados no relatório
- Status do `tsc` e `vitest`

## IMPORTANTE

O modo apresentação do dashboard (slides com dangerouslySetInnerHTML + arquivos .generated.ts) é a parte visual que o usuário vê. NÃO destrua essa funcionalidade. A refatoração é ESTRUTURAL, não visual — o visual vai mudar depois quando o Design System novo for aplicado.