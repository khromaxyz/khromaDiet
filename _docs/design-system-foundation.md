# Design System Foundation

## Status oficial

O sistema visual implementado nesta base React e a materializacao oficial do manifesto.

Fonte de verdade:

1. `.agent/skills/promptforge/references/project/manifest.md`
2. `_docs/design-references/beta/Winner_opusN_8.7_none.html`
3. implementacao React atual

O winner nao e mais referencia inspiracional. Ele e o sistema operacional visual do produto.

## Principios

### Neo-Brutalismo Clean

- bordas fortes e legiveis
- superficies planas ou levemente graduadas
- sombras com peso, sem excesso de glow
- brutalismo soft: impacto com acabamento premium

### Premium e amigavel

- densidade controlada
- muito respiro
- hierarquia tipografica clara
- software maduro, nao landing experimental

### Verde como energia, nao como tinta de fundo

- CTA principal
- foco
- destaque de estado
- sinais de prioridade

O verde nao deve banhar toda a tela.

### Light e dark equivalentes

- light nao e fallback fraco
- dark nao e efeito especial
- ambos devem manter a mesma estrutura, hierarquia e materialidade

## Fundacao de composicao

### Superficies

- `surface-1`: shell principal
- `surface-2`: camada secundaria
- `surface-3`: apoio, controles, areas internas
- `surface-4`: divisores e realces neutros

Use shells grandes com borda mais forte e sombra mais estrutural. Use blocos internos com sombra reduzida.

### Bordas e sombras

- borda padrao visivel, nunca fantasma
- CTA e caixas principais podem usar borda de 2px
- sombra brutal pequena para controles e cards compactos
- sombra brutal maior para shells principais

### Espacamento

- grid de 8px
- composicoes sparse
- preferir menos blocos por viewport com mais leitura

## Tipografia operacional

- `Space Grotesk`: titulos estruturais e nomes fortes
- `Instrument Serif`: momentos editoriais e atmosfericos
- `Inter`: copy utilitaria e texto corrido
- `JetBrains Mono`: labels, passos, contadores e metadados

## Componentes base

### `SectionShell`

Container macro de secao. Controla camada, largura e divisao estrutural.

### `SectionHeader`

Hierarquia oficial. Variantes:

- `default`
- `pill`
- `editorial`
- `numbered`

### `DataCard`

Card base do sistema. Deve ser o ponto de partida para shells internos e cards de analise.

### `StatBlock`

Bloco numerico oficial para metricas, KPIs e micro-resumos.

### `ChartContainer`

Shell padrao de visualizacao de dados, com legenda e linguagem coerente com o restante do sistema.

## Convencoes de tela

### Hero

- editorial e forte
- poucas decisoes visuais
- CTA direto
- atmosfera controlada

### Formulario

- coleta de dados com clareza brutalista
- shells evidentes
- estados ativos nitidos
- sem ruído decorativo

### Summary e Profile

- ponte premium entre coleta e analise
- cards fortes, legiveis, sem plasticidade excessiva

### Dashboard

- linguagem de software analitico maduro
- topbar, navegacao e secoes sob a mesma fundacao
- charts e recibos seguindo os mesmos materiais dos cards

## O que nao fazer

- reintroduzir neon como assinatura
- inventar uma paleta secundaria de produto
- usar gradiente como ornamento sem funcao
- criar componentes locais duplicando `DataCard`, `StatBlock` ou `SectionHeader`
- tratar o winner como apenas uma referencia parcial
