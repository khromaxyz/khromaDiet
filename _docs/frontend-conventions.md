# Frontend Conventions

## Regra principal

O manifesto e a autoridade conceitual. O winner implementado e a autoridade operacional.

Isso significa:

- nao reinterpretar livremente o sistema visual
- nao criar uma segunda linguagem paralela no produto
- nao usar o HTML vencedor como prototipo descartavel; ele ja foi traduzido para a base React oficial

## Branding e naming

- o branding visivel do produto deve ser `KhromaDiet`
- nomes internos legados como `useDietForgeStore` podem permanecer se nao houver ganho estrutural claro em renomea-los agora
- novos componentes, docs e copy visivel nao devem reintroduzir `DietForge`

## Tema

- o app opera com `light` e `dark`
- o estado visual deve sempre respeitar `html[data-theme]`
- novos componentes nao devem inferir cor por contexto local se isso puder ser resolvido por token global
- verde e reservado para CTA, foco, estados de energia visual e sinais de prioridade

## Cores

Use apenas tokens de `src/styles/foundations/tokens.css`.

Regras praticas:

- base clara: branco e neutros claros
- base escura: preto abissal e neutros escuros
- acento: verde KhromaDiet
- quando diferenciar dados, prefira hierarquia, opacidade, padrao, borda, rotulo e espessura antes de recorrer a novas cores

Nao criar:

- azul de produto novo
- dourado de produto novo
- violeta de produto novo
- gradientes ornamentais sem funcao semantica

## Tipografia

Familias oficiais:

- editorial: `Instrument Serif`
- display: `Space Grotesk`
- body: `Inter`
- mono: `JetBrains Mono`

Regras:

- titulos estruturais usam display
- momentos editoriais ou de destaque usam editorial com moderacao
- texto corrido usa body
- labels tecnicas, contadores e metadados usam mono

## Primitives obrigatorios

Ao construir ou refatorar UI, prefira primeiro:

- `Button`
- `Badge`
- `Input`
- `Progress`
- `Slider`
- `SectionShell`
- `SectionHeader`
- `DataCard`
- `StatBlock`
- `ChartContainer`

Se um caso nao couber nesses primitives, adapte o primitive ou crie um novo compartilhado. Nao replique visualmente o mesmo bloco em CSS local.

## CSS

- `src/main.tsx` importa apenas `src/styles/index.css`
- tokens ficam em `styles/foundations/`
- regras de composicao ficam em `styles/features/`
- CSS local pode ajustar layout e estados, mas nao deve criar nova fundacao visual

Antes de adicionar CSS local, pergunte:

1. existe token para isso?
2. existe primitive para isso?
3. isso e um padrao compartilhado ou apenas um ajuste de layout?

## Fluxo de implementacao

Para novas refatoracoes visuais:

1. conferir manifesto e winner
2. localizar primitive ou shell existente
3. aplicar tokens oficiais
4. ajustar a feature
5. validar em light e dark
6. rodar lint, testes e build
7. atualizar docs se a mudanca alterar convenção ou arquitetura

## Acessibilidade

- manter focus visivel com `--focus-ring`
- respeitar `prefers-reduced-motion`
- preservar contraste e legibilidade em light e dark
- evitar usar verde como unico portador de significado

## Validacao minima por entrega

- `npm run lint`
- `npx vitest run`
- `npm run build`

Quando a mudanca for visualmente relevante, revisar manualmente:

- hero
- um step denso do formulario
- profile create
- summary
- dashboard em pelo menos uma secao intermediaria e no final
