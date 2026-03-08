# PromptForge — Pipeline & Workflow Guide

---

## Exemplo de Pipeline Completo de Design

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. IDEAÇÃO        → Decidir o que construir/refatorar          │
│     (Claude Web)     Escopo, referências, vibe                  │
│                                                                 │
│  2. PROMPTFORGE    → Gerar prompt otimizado                     │
│     (Claude Web)     /escopo + /gerar (ou natural language)     │
│                                                                 │
│  3. GERAÇÃO        → Executar prompt na skill html-single-file  │
│     (Claude Web)     Chat novo, colar prompt, receber HTML      │
│                                                                 │
│  4. AVALIAÇÃO      → Abrir HTML no browser, avaliar visual      │
│     (Browser)        Screenshot se quiser compartilhar          │
│                                                                 │
│  5. ITERAÇÃO       → Feedback pro PromptForge, gerar v2         │
│     (Claude Web)     "as sombras estão fracas, mais profundidade│
│                       nos cards" → novo prompt ajustado          │
│                                                                 │
│  6. APROVAÇÃO      → HTML final de referência escolhido         │
│     (Browser)        Salvar como referência visual              │
│                                                                 │
│  7. CONVERSÃO      → Claude Code converte HTML → React          │
│     (Claude Code)    Usando skill html-to-react (futura)        │
│                                                                 │
│  8. INTEGRAÇÃO     → Componente React no projeto real           │
│     (Claude Code)    Push, test, deploy                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Onde cada ferramenta brilha

| Fase | Ferramenta | Por quê |
|---|---|---|
| Ideação | Claude Web | Contexto longo, criatividade, decisões de design |
| Geração HTML | Claude Web + html-single-file | A skill é otimizada pra gerar código completo |
| Avaliação | Browser | A única forma real de avaliar design é ver |
| Conversão | Claude Code | Acesso ao filesystem, pode ler o projeto real |
| Integração | Claude Code | Git, npm, testes, deploy |

**PromptForge vive na fase 2 e 5.** Ele não gera código — gera o prompt que gera
código. É uma camada de abstração sobre a skill html-single-file.

## Quando usar cada preset

| Situação | Preset | Por quê |
|---|---|---|
| "Quero redesenhar a hero" | `polish` | Resultado equilibrado, bom pra primeira tentativa |
| "Não sei como quero, me mostra opções" | `arena` | 3-4 variações pra comparar |
| "Quero o card mais bonito possível" | `deep-dive` | 8000 linhas num elemento |
| "Quero algo maluco, sem restrições" | `explore` | Dual-mode, boost máximo |
| "Precisa ficar igual ao design system" | `fiel` | Tokens + componentes obrigatórios |

## Anti-patterns a evitar

**Não gere prompt e execute sem avaliar.** O pipeline é cíclico, não linear.
Sempre abra o HTML, olhe, e decida se precisa iterar.

**Não use boost 5 sempre.** O boost máximo não é o melhor boost — é o mais
intenso. Pra maioria dos casos, o boost destilado (padrão) produz resultados
melhores porque dá mais espaço criativo.

**Não hardcode copy.** Se sabe exatamente o que a headline deve dizer, escreva
você mesmo. O PromptForge é pra quando quer que a IA CRIE — dê o conceito,
não o texto final.

**Não repita regras.** A skill html-single-file já cuida de anti-preguiça,
responsividade, semântica, e organização de código. O prompt do PromptForge
deve focar em CRIATIVIDADE e DIREÇÃO VISUAL.
