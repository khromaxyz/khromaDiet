Agente 1: CSS Audit — Relatório Completo de Valores Hardcoded
CONTEXTO:
Leia o arquivo .context/architecture.md para entender o projeto. O DietForge é um dashboard construído seção por seção por IAs diferentes. Existem 12 arquivos CSS em src/styles/ totalizando ~856KB. Cada seção foi criada independentemente, então é quase certo que existem valores inconsistentes, cores duplicadas, tipografia variada e espaçamentos diferentes entre seções.
O QUE FAZER:
Varra TODOS os 12 arquivos CSS em src/styles/ e extraia cada valor hardcoded. Gere o arquivo .context/css-audit.md com os resultados organizados por categoria.
CATEGORIAS PARA EXTRAIR:

Cores — Todo #hex, rgba(), hsla(), rgb(), hsl() encontrado. Para cada cor: o valor exato, em quais arquivos aparece, quantas vezes aparece no total. Agrupe cores similares (ex: #FF1744 e #FF1745 são a mesma). Liste separadamente: cores que JÁ são variáveis CSS vs cores hardcoded.
Font-family — Toda font-family declarada. Para cada: valor, arquivos, contagem. Identifique quantas famílias tipográficas distintas existem.
Font-size — Todo font-size encontrado. Liste em ordem crescente. Identifique quantos tamanhos distintos existem e agrupe os que são quase iguais (ex: 13px e 14px).
Font-weight — Todo font-weight encontrado com contagem.
Letter-spacing — Todo letter-spacing com contagem.
Line-height — Todo line-height com contagem.
Border-radius — Todo border-radius com contagem. Quantos valores distintos existem?
Box-shadow — Todo box-shadow com contagem.
Padding/Margin — Os 20 valores mais frequentes de padding e margin.
Gap — Todo gap/grid-gap/column-gap/row-gap com contagem.
Z-index — Todo z-index com contagem e arquivo.
Transition/Animation — Toda transition e animation-duration/timing-function.
Variáveis CSS existentes — Liste TODAS as variáveis declaradas no :root de tokens.css e qualquer redefinição em outros arquivos. Para cada variável redefinida: onde é redefinida e com qual valor diferente.

FORMATO DO RELATÓRIO:
Para cada categoria, quero:

Lista dos valores ÚNICOS encontrados (sem repetir)
Contagem total de ocorrências
Em quais arquivos aparece (nome do arquivo, não caminho completo)
Um resumo no topo da categoria: "X valores únicos encontrados, Y são variáveis, Z são hardcoded"

NO FINAL DO DOCUMENTO, INCLUA:

Resumo executivo: total de valores hardcoded por categoria
Top 10 inconsistências: os 10 casos mais gritantes de valores que deveriam ser iguais mas não são (ex: mesmo tipo de elemento com font-sizes diferentes entre seções)
Variáveis CSS sugeridas: uma lista preliminar de variáveis que PRECISAM existir no :root para cobrir todos os valores encontrados

REGRAS:

NÃO altere nenhum arquivo — este agente é 100% read-only
Dados concretos extraídos do código real, zero suposições
Se um valor aparece 200+ vezes, não liste cada ocorrência — agrupe por arquivo com contagem
Formate em Markdown limpo e navegável
Inclua a data da análise no topo