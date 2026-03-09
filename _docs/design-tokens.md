# Design Tokens

## Fonte

Tokens oficiais vivem em `src/styles/foundations/tokens.css`.

Este documento registra os tokens mais importantes para uso diario.

## Cores base

| Grupo | Light | Dark | Uso |
| --- | --- | --- | --- |
| `--bg-primary` | branco puro | preto abissal | canvas principal |
| `--bg-secondary` | neutro claro | neutro escuro | secoes e fundos auxiliares |
| `--bg-tertiary` | neutro claro mais denso | neutro escuro mais denso | areas de apoio |
| `--bg-accent` | verde vivo | verde vivo | CTA e sinal ativo |
| `--text-primary` | quase preto | quase branco | leitura principal |
| `--text-secondary` | neutro medio | neutro medio | descricoes |
| `--text-tertiary` | neutro suave | neutro suave | hints e apoio |
| `--text-accent` | verde escuro | verde claro | destaque textual |

## Superficies

| Token | Uso |
| --- | --- |
| `--surface-1` | shell principal e cards principais |
| `--surface-2` | camada interna e cards secundarios |
| `--surface-3` | controles, chips, backgrounds internos |
| `--surface-4` | divisores fortes e apoio neutro |

## Tipografia

| Token | Familia | Uso |
| --- | --- | --- |
| `--font-editorial` | Instrument Serif | titulos editoriais e atmosfera |
| `--font-display` | Space Grotesk | titulos estruturais e headlines |
| `--font-body` | Inter | texto corrido |
| `--font-mono` | JetBrains Mono | labels, counters, metadata |

## Escala de texto

| Token | Valor |
| --- | --- |
| `--text-xs` | 0.694rem |
| `--text-sm` | 0.833rem |
| `--text-base` | 1rem |
| `--text-md` | 1.125rem |
| `--text-lg` | 1.25rem |
| `--text-xl` | 1.563rem |
| `--text-2xl` | 1.953rem |
| `--text-3xl` | 2.441rem |
| `--text-4xl` | 3.052rem |

## Espacamento

Grid base: 8px

| Token | Valor |
| --- | --- |
| `--space-2` | 8px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |

## Raios

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-sm` | 4px | badges pequenos |
| `--radius-md` | 8px | controles compactos |
| `--radius-lg` | 12px | cards e buttons |
| `--radius-xl` | 16px | shells medios |
| `--radius-2xl` | 20px | shells principais |
| `--radius-full` | 9999px | pills |

## Bordas e sombras

| Token | Uso |
| --- | --- |
| `--border-primary` | borda padrao |
| `--border-strong` | contorno forte |
| `--border-accent` | CTA e destaque ativo |
| `--shadow-xs` | controles e detalhes |
| `--shadow-sm` | cards compactos |
| `--shadow-md` | cards principais |
| `--shadow-lg` | shells maiores |
| `--shadow-brutal-sm` | assinatura neo-brutal leve |
| `--shadow-brutal` | assinatura neo-brutal principal |
| `--shadow-brutal-green` | CTA principal |

## Motion

| Token | Uso |
| --- | --- |
| `--duration-fast` | hover e microestado |
| `--duration-normal` | transicoes principais |
| `--duration-slow` | entrada de blocos |
| `--ease-default` | comportamento geral |
| `--ease-snap` | toggles e mudancas mais firmes |
| `--ease-spring` | animacoes de entrada controladas |

## Tema

| Item | Valor |
| --- | --- |
| storage key | `khromadiet-theme` |
| estados | `light`, `dark` |
| bootstrap | `index.html` aplica tema antes do React |
| provider | `src/components/providers/ThemeProvider.tsx` |
| hook | `src/lib/theme.ts` |

## Praticas obrigatorias

- consumir tokens via CSS vars, primitives ou Tailwind aliases existentes
- nao hardcode novas cores de produto em feature CSS
- usar verde apenas quando o elemento realmente precisa de prioridade
- preferir contraste e estrutura antes de adicionar mais cor
