# Arsenal de Skills — Roadmap do Ecossistema

Catálogo de todas as skills que existem, precisam existir, ou poderiam existir
pra automatizar o pipeline criativo e de desenvolvimento.

---

## Skills existentes (em uso)

### html-single-file
**O que faz:** Gera HTML completo em arquivo único com qualidade premium.
**Força:** Código completo sem truncamento, anti-preguiça eficaz, tipografia obrigatória.
**Fraqueza:** Não tem opinião estética forte (depende do prompt pra direcionar).
**Sinergia:** Consumidor direto dos prompts do PromptForge.

### frontend-design (user + public)
**O que faz:** Dá direção estética pra interfaces. Anti-slop, ousadia visual.
**Força:** Forçar escolhas criativas (tom, palette, composição).
**Fraqueza:** Genérica — funciona pra qualquer projeto, não é calibrada pra nenhum.
**Sinergia:** Princípios dela podem ser injetados no PromptForge.

### promptforge (v4)
**O que faz:** Gera prompts otimizados pro html-single-file.
**Força:** Parametrização granular, presets, workflow RLHF.
**Fraqueza:** Em evolução — ainda buscando o formato ótimo de prompt.
**Sinergia:** Orquestrador do pipeline de design.

### obsidian-notes
**O que faz:** Cria e organiza notas Obsidian com frontmatter, callouts, Dataview.
**Força:** Formato rich, exportável, integrado ao vault.
**Sinergia:** Exportar resultados de testes e insights como notas persistentes.

### ml-impa-study
**O que faz:** Sistema de estudo ML baseado no ISLP.
**Sinergia:** Nenhuma direta com pipeline de design, mas demonstra o pattern de
skill com comandos /, presets, e workflow estruturado.

---

## Skills a construir — Prioridade Alta

### html-to-react-converter
**O que faria:** Converte HTML de referência (gerado pelo html-single-file) em
componentes React respeitando o design system do projeto.
**Por que precisa:** Hoje a conversão é manual ou via prompt ad-hoc no Claude Code.
Uma skill dedicada teria: mapeamento de elementos HTML pra componentes React,
regras de normalização de valores hardcoded pra tokens CSS, checklist de conversão.
**Input:** HTML file + design system context (tokens, componentes)
**Output:** Componente React com TypeScript + Tailwind + tokens
**Onde roda:** Claude Code (precisa de filesystem)

### design-reviewer
**O que faria:** Analisa um HTML/screenshot e dá feedback estruturado de design.
**Por que precisa:** Hoje a avaliação é puramente subjetiva do Arthur. Uma skill que
analisa e identifica problemas (hierarquia fraca, espaçamento inconsistente,
paleta descoesa, motion ausente) acelera a iteração.
**Input:** HTML file ou screenshot + critérios de qualidade
**Output:** Relatório com: score por dimensão, problemas identificados, sugestões
**Onde roda:** Claude Web (análise de imagem/código)

### style-library
**O que faria:** Catálogo de estilos visuais reutilizáveis, cada um com manifesto,
paleta, tipografia, e referências. O PromptForge consulta quando `/estilo` é usado.
**Por que precisa:** Para organizar os estilos. Hoje temos Neo-Brutalismo Clean, Gemstone Luxury e Apple Premium como conceitos base documentados.
No futuro: Brutalist, Neo-Tokyo, Swiss Modern, etc. Cada um com manifesto curto
que pode ser injetado em prompts.
**Input:** Nome do estilo
**Output:** Bloco de contexto visual pra injeção em prompt
**Onde roda:** Reference file do PromptForge

### component-forge
**O que faria:** Gera componentes React isolados com qualidade premium.
Diferente do html-single-file (que gera HTML standalone) e do html-to-react
(que converte), este gera direto em React com Tailwind + Framer Motion.
**Por que precisa:** Pra componentes que vão direto pro projeto sem passar pelo
pipeline HTML → conversão.
**Input:** Descrição do componente + design system context
**Output:** Arquivo .tsx pronto pra importar
**Onde roda:** Claude Code

---

## Skills a construir — Prioridade Média

### prompt-analyzer
**O que faria:** Analisa um prompt e prediz: vai funcionar bem? Identifica
problemas (muito longo, tom burocrático, duplicação com html-single-file,
dados hardcoded demais) e sugere melhorias.
**Por que precisa:** Meta-skill — melhora o PromptForge automaticamente.
**Input:** Um prompt completo
**Output:** Score de qualidade + problemas + versão melhorada

### asset-generator
**O que faria:** Gera assets visuais: SVGs inline, ícones, patterns, noise textures,
gradientes complexos, backgrounds compostos. Tudo em código (SVG/CSS/Canvas).
**Por que precisa:** Muitas heros e dashboards precisam de assets custom que hoje
são pedidos como parte do HTML. Uma skill dedicada gera assets em isolamento
com mais qualidade.
**Input:** Descrição do asset + paleta + estilo
**Output:** SVG inline ou bloco CSS

### animation-choreographer
**O que faria:** Desenha sequências de animação GSAP complexas.
**Por que precisa:** Animação cinematográfica é o diferencial mais impactante,
mas também o mais difícil de especificar em prompt. Uma skill que entende
conceitos de choreography (stagger, orchestration, scene-based reveals)
e gera código GSAP otimizado.
**Input:** Descrição da sequência + elementos envolvidos
**Output:** Código GSAP com timeline completo

### code-polisher
**O que faria:** Pega HTML funcional mas com código sujo e refatora: organiza CSS,
remove duplicações, adiciona missing states (hover, focus, active), melhora
acessibilidade, adiciona responsividade faltante.
**Por que precisa:** O output do html-single-file às vezes é funcional mas tem
CSS redundante ou estados faltando. Uma segunda passada de polish no código.
**Input:** HTML file
**Output:** HTML melhorado

---

## Skills a construir — Prioridade Baixa / Exploratória

### layout-generator
Gera composições de layout (grid, flexbox, masonry, bento) baseado em
descrição do conteúdo e estilo. Output: CSS puro com containers nomeados.

### color-alchemist
Gera paletas de cor baseadas em conceitos abstratos ("obsidian e esmeralda",
"neve e cobre", "oceano profundo"). Output: CSS custom properties com
escalas completas (50-900 + glows + transparências).

### typography-curator
Seleciona pares de fontes do Google Fonts baseado em contexto (SaaS, editorial,
luxury, brutalist). Output: imports + variáveis CSS + escala tipográfica.

### responsive-adapter
Pega HTML desktop-first e adiciona/melhora responsividade pra mobile e tablet.
Não redesenha — adapta.

### a11y-auditor
Analisa HTML e identifica problemas de acessibilidade. Output: lista priorizada
de issues + código corrigido.

### performance-optimizer
Analisa HTML e otimiza performance: lazy loading, will-change, reduce repaints,
optimize GSAP timelines, compressão de SVGs.

---

## Sinergias entre skills

```
                    ┌──────────────────┐
                    │   PROMPTFORGE    │ (orquestrador)
                    │   Gera prompts   │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ HTML-SINGLE-FILE │ (gerador)
                    │   Gera HTML      │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───────┐ ┌───▼────┐ ┌───────▼───────┐
     │ DESIGN-REVIEWER│ │ CODE-  │ │ HTML-TO-REACT │
     │  Analisa e dá  │ │POLISHER│ │   Converte    │
     │   feedback     │ │ Refina │ │   pra React   │
     └────────┬───────┘ └───┬────┘ └───────┬───────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────▼─────────┐
                    │  PROJETO REAL    │
                    │  (DietForge)     │
                    └──────────────────┘
```

O PromptForge é o entry point. Gera prompt → html-single-file gera código →
design-reviewer dá feedback → promptforge itera → code-polisher refina →
html-to-react converte → projeto integra. Pipeline completo.

---

## Princípios do arsenal

1. **Cada skill faz UMA coisa bem.** Não criar skills que fazem tudo — criar
   skills que fazem uma coisa excepcionalmente e se integram.

2. **Skills são composáveis.** O output de uma é o input de outra. O pipeline
   é uma cadeia, não um monólito.

3. **Skills evoluem por evidência.** Testar, medir, iterar. Não assumir que
   uma skill funciona sem dados.

4. **Skills são documentadas.** Cada skill tem: o que faz, quando usar, input/output,
   sinergias, limitações. Sem documentação, a skill é inútil em 2 semanas.

5. **O arsenal nunca está completo.** Novos padrões de uso revelam gaps.
   Manter uma lista de "skills que sinto falta" e priorizar periodicamente.
