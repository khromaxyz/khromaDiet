---
name: promptforge
description: >
  Gerador de prompts otimizados para criação e refatoração de interfaces web premium.
  Monta prompts estruturados para serem usados com a skill html-single-file ou diretamente
  em chats de design. Controle informando a intenção e os parâmetros adicionais, ex: projeto=dietforge, motion: 3.
  Use esta skill SEMPRE que o usuário instruir "use skill promptforge",
  "use promptforge", "monta um prompt pra", "gera o prompt do", ou qualquer variação de
  pedido para montar prompts de design. Também use quando o usuário mencionar "prompt pro
  html-single-file", "prompt pra seção", ou "prompt de polish". O usuário passará as customizações em formato `param: valor`.
---

# PromptForge v4

Skill que monta prompts pra gerar interfaces premium. Acione descrevendo o que deseja gerar e adicione configurações extras no formato `parametro: valor` ou `parametro=valor`.
O output é um prompt pronto pra copiar e colar num chat com a skill html-single-file.

Filosofia central: **o prompt é um briefing criativo, não um formulário técnico**.
Tom natural, conversacional, como briefar um designer sênior. Menos regras, mais
espaço criativo. A skill html-single-file já cobre qualidade de código, anti-preguiça,
responsividade e organização — o prompt do PromptForge foca em DIREÇÃO CRIATIVA.

---

## Regras de montagem

1. **Tom de briefing.** O prompt gerado deve ler como prosa fluida — não bullet points,
   não templates, não headers de formulário. Parágrafos naturais com entusiasmo pelo
   projeto. A IA espelha o tom: prompt criativo → output criativo.

2. **Não repetir o que html-single-file cobre.** A skill do chat de destino já garante:
   arquivo único, anti-preguiça, protocolo de continuação, responsividade, semântica
   HTML, acessibilidade, Google Fonts, qualidade de engenharia. O prompt NÃO repete.

3. **Não hardcodar copy.** Dar o CONCEITO do que comunicar, não o texto exato. A IA
   escreve headlines e copy melhores quando tem liberdade. Exceção: dados numéricos
   (TDEE, macros, etc.) são injetados porque são factuais.

4. **Boost é destilado.** 2-3 frases potentes > 40 bullet points. Intensidade vem da
   precisão da linguagem, não do volume. Ver `references/boost-library.md`.

5. **Tokens como contexto, não spec.** Injetar paleta como "aqui estão as cores do
   projeto" — não como "USE EXCLUSIVAMENTE ESTAS VARIÁVEIS SEM EXCEÇÃO".

---

## Parâmetros Disponíveis

O usuário descreverá o que quer em linguagem natural e incluirá parâmetros extras em formato `parametro: valor` ou `parametro=valor`. Se os parâmetros listados abaixo não forem mencionados, use o comportamento "Default".

### Core

`projeto` — Carrega contexto. Default: nenhum. (Não use manifestos predefinidos, deixe a IA criar e decidir o design se não especificado).
`escopo` — Identifica o alvo. Ex: `escopo: tela hero`, `escopo: seção de macros` ou `escopo=card`. Muitas vezes implícito no pedido do usuário.
`dados` — Dados injetados. Default: `arthur`. Opções: `mock`, `custom:<desc>`.
`preset` — Carrega combinação de parâmetros.

### Criatividade

`liberdade` — Default: `3`.
  0=reprodução fiel do DS, 1=DS com variações, 2=paleta obrigatória+layout livre, 3=livre (IA decide design, cores, fontes, etc).
`motion` — Default: `2`.
  0=estático, 1=hover/transições, 2=entradas+micro-interações, 3=cinematográfico.
`densidade` — Default: `balanced`. Opções: `sparse|balanced|dense`.
`ref` — Referência visual. Opcional. Use `random` para deixar a IA decidir qual será o tipo de design, estética e fontes livremente.

### Exploração

`variações` — Arena de design. Gera N variações distintas. Default: off. (Ex: `variações=3`)
  Mutuamente exclusivo com foco-total.
`foco-total` — Toggle. 8000+ linhas num único elemento. Força boost 4+. Default: off.
  Mutuamente exclusivo com variações.

### Controle do prompt

`tamanho` — Comprimento do prompt. Default: `medio`. Opções: `compacto|medio|extenso`.
`tecnico` — Instruções de implementação. Default: `off`. Opções: `on|off`.
`especificidade` — Specs visuais granulares (hex, px). Default: `off`. Opções: `on|off`.
`feature` — Feature técnica específica. Ex: `feature: Three.js orb 3D`.

### Output e iteração

`formato` — Default: `html`. Opções: `html|react|livre`.
`dual` — Gera Prompt A (criação livre) + Prompt B (padronização). Default: off. Opções: `on|off`.
`boost` — Pressão de qualidade. Default: `2`. Ver boost-library.md. Opções: `0-5`.
`feedback` — Administrado interativamente. Incorpora ajustes no próximo prompt.
`contexto-livre` — Injeta instrução custom.
---

## Presets

### `preset: polish` (o 80% dos casos)
liberdade 2, motion 2, boost 3, tamanho medio, tecnico off, especificidade off

### `preset: explore` (ideias radicais)
liberdade 3, motion 3, boost 5, dual on, tamanho compacto, tecnico off

### `preset: arena` (comparar variações)
variações 4, liberdade 3, boost 3, tamanho medio, tecnico off

### `preset: deep-dive` (um elemento perfeito)
foco-total on, boost 4, tamanho medio, motion 3, especificidade on

### `preset: fiel` (aderência ao DS)
liberdade 0, boost 1, tamanho extenso, tecnico on, especificidade on

---

## Como montar o prompt

O prompt é montado em PROSA, não em blocos separados. A estrutura é um guia interno
pra ordem do conteúdo, mas o output deve ler como um texto fluido e natural.

### Estrutura interna (não visível pro usuário)

```
1. Abertura com persona/tom          ← sempre
2. Contexto do projeto               ← do projeto carregado
3. O que construir (escopo)          ← do texto do pedido ou param escopo
4. Dados relevantes                  ← do param dados, só os pertinentes ao escopo
5. Feature técnica                   ← se param feature definido
6. Direção visual (manifesto)        ← do projeto (se houver), ou IA cria direção livremente
7. Paleta/tokens como contexto       ← se liberdade ≤ 2, como referência
8. Calibração (motion, densidade)    ← integrado na prosa
9. Referência visual                 ← se param ref
10. Modo especial (variações/foco)   ← se ativo
11. Feedback de iteração             ← se feedback acumulado
12. Contexto livre                   ← se definido
13. Boost                            ← do boost-library.md
```

### Guia de tom por tamanho

**Compacto (~200-400 palavras):** Briefing de elevador. 2-3 parágrafos. Projeto +
escopo + vibe + boost. A IA preenche os gaps criativamente.

**Medio (~500-900 palavras):** Briefing de reunião. Projeto, escopo, dados, direção
visual, motion, boost. Prosa fluida mas com densidade de informação.

**Extenso (~1000-1500 palavras):** Briefing detalhado. Tudo incluso, cada aspecto
elaborado, exemplos de referência, specs quando especificidade=on. Ainda em prosa,
nunca em bullet points.

### Guia de injeção por liberdade

**Liberdade 3 (Default):** IA decide de forma totalmente autônoma. Não use nosso manifesto, não use nossas fontes, não use nossas cores. Deixe a IA decidir tudo sobre a estética e estilo, a menos que o projeto especifique o contrário.

**Liberdade 2:** IA parte de referências básicas (como paleta central opcional), mas elabora layout e composição livremente.

**Liberdade 1:** Fiel a tokens e design system (se fornecido), permitindo apenas variação de composição criativa.

**Liberdade 0:** Amarra exata às specs, cores, tokens e design sem nenhuma divergência criativa.

### Guia de motion na prosa

**0:** Não mencionar animação. A skill html-single-file adiciona hover states por padrão.

**1:** "Transições suaves, nada chamativo."

**2:** "Animações de entrada com stagger, micro-interações nos hovers, números que
contam. O tipo de motion que faz a interface parecer viva sem parecer forçada."

**3:** Descrever cinematograficamente: "Quero que a sequência de entrada pareça o
trailer de um filme. Cada elemento aparece no momento perfeito, com o easing
perfeito. Parallax nas camadas de fundo. Partículas ou luzes flutuando. GSAP
é permitido e encorajado. O tipo de animação que faz alguém querer ver de novo."

### Modo variações

Quando ativo, adicionar após o escopo:

"Quero ver {N} abordagens completamente diferentes pra isso. Não são variações de
cor — são filosofias visuais distintas. Uma pode ser tipografia monumental, outra
pode ser data-driven, outra pode ser atmosférica. Organize todas no mesmo HTML
com separadores claros e me diga em uma frase o que cada uma propõe."

### Modo foco total

Quando ativo, substituir a abertura por tom de imersão:

"Toda a sua capacidade nesta sessão vai pra um único elemento. Não existe resto
da página, não existe contexto. Só este [elemento] em isolamento, com um nível
absurdo de detalhe. 8000 linhas pra uma única coisa. Cada estado é um micro-design.
Cada sombra tem camadas. Cada animação tem keyframes detalhados."

### Modo dual

**Prompt A:** Monta prompt sem tokens e sem componentes, com boost ≥ 3 e instrução:
"Liberdade total. Crie o design mais impressionante que conseguir. Me surpreenda."

**Prompt B:** Prompt independente de normalização com tokens + componentes completos:
"Normalize este HTML pro design system. Substitua valores por tokens. Mapeie pra
componentes. Preserve o design criativo — normalize a linguagem técnica."

---

## Exemplo de prompt gerado (modo medio, boost 3, tela:hero)

O prompt abaixo é um EXEMPLO do formato de saída. O conteúdo varia com os parâmetros.

```
Preciso que você crie a hero screen de um produto chamado NŪTRA — uma plataforma
nutricional premium que transforma dados pessoais em protocolos de nutrição calibrados.
A estética do projeto se chama Neo-Brutalismo Clean: pense em uma inspiração limpa da
Apple e do WhatsApp. O fundo é branco absoluto, a tipografia é preta profunda e o accent
principal é um verde marcante estritamente para CTAs. Nada de brutalismo caótico.
Bordas originais e limpas, arredondadas, podendo ter um 1px solid black sutil.

Essa hero é a primeira coisa que o usuário vê. Uma única tela fullscreen, sem scroll.
Precisa comunicar precisão de engenharia e saúde. Além do headline e CTA, inclua um
mini-dashboard preview mostrando dados: TDEE 3.985 kcal, Meta 3.387.

Pra motion, pense em interações rápidas, secas e muito fluidas (snappy). Nada de
animações lentas ou elásticas demais. Os hovers nos botões verdes devem ser imediatos.
A densidade de layout é *sparse*, muito respiro visual.

Este não é um exercício. É a peça central do projeto e precisa estar no nível dos
melhores apps modernos. Cada pixel com intenção e precisão brutalista limpa.
```
