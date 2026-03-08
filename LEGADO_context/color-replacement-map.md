# Color Replacement Map (Fase A)

> Documento de inventario e mapeamento. Nenhum CSS de producao foi alterado nesta fase.

## Resumo

- CSS escaneados em `src/styles`: **12**
- Ocorrencias de cores hardcoded em propriedades (sem `--var`): **2250**
- Cores unicas normalizadas (inclui excluidas por regra): **810**
- Cores unicas candidatas a substituicao (apos exclusoes): **805**
- Cores com match exato em tokens: **60** (404 ocorrencias)
- Cores sem match exato: **745** (1449 ocorrencias)
- Ocorrencias excluidas por regra (black/white/transparent/currentColor/inherit): **397**
- Ocorrencias green-neon detectadas (200,255,0): **38**

## Distribuicao Por Arquivo (ocorrencias hardcoded)

| Arquivo | Ocorrencias |
|---|---:|
| animations.css | 0 |
| base.css | 0 |
| dashboard-final.css | 143 |
| dashboard-macros.css | 111 |
| dashboard-meals.css | 53 |
| dashboard-presentation.css | 546 |
| dashboard-projection.css | 228 |
| dashboard-simulator.css | 119 |
| dashboard-supplements.css | 295 |
| index.css | 0 |
| screens.css | 755 |
| tokens.css | 0 |

## Tabela Principal (Match EXATO)

| Cor hardcoded | Variavel tokens.css | Match | Ocorrencias estimadas | Arquivos principais | Observacao |
|---|---|---|---:|---|---|
| rgba(255, 255, 255, 0.08) | --border-dim | EXATO (ambiguo por contexto) | 47 | screens.css (14), dashboard-presentation.css (13), dashboard-projection.css (9) | Candidatos: --border, --border-dim, --border-glow; escolhido por contexto (background, border, border-color) |
| rgba(255, 255, 255, 0.06) | --border-primary | EXATO (ambiguo por contexto) | 24 | dashboard-presentation.css (15), dashboard-supplements.css (4), dashboard-projection.css (3) | Candidatos: --border-primary, --color-border, --surface-2; escolhido por contexto (border, box-shadow, border-color) |
| rgba(255, 255, 255, 0.2) | --border-bright | EXATO (ambiguo por contexto) | 23 | screens.css (11), dashboard-presentation.css (10), dashboard-supplements.css (2) | Candidatos: --border-bright, --border-strong; escolhido por contexto (color, background, border) |
| rgba(255, 255, 255, 0.06) | --surface-2 | EXATO (ambiguo por contexto) | 21 | dashboard-presentation.css (9), dashboard-supplements.css (4), dashboard-macros.css (3) | Candidatos: --border-primary, --color-border, --surface-2; escolhido por contexto (background, background-image) |
| rgba(255, 255, 255, 0.03) | --surface-1 | EXATO (ambiguo por contexto) | 20 | screens.css (12), dashboard-presentation.css (4), dashboard-projection.css (3) | Candidatos: --border-secondary, --border-secondary-m, --surface-1; escolhido por contexto (background) |
| rgba(255, 255, 255, 0.3) | --text-tertiary | EXATO | 19 | dashboard-presentation.css (12), dashboard-supplements.css (4), dashboard-final.css (2) |  |
| #ff2a2a | --accent-primary | EXATO | 15 | screens.css (15) |  |
| #4ade80 | --accent-green | EXATO (ambiguo por contexto) | 14 | dashboard-final.css (7), dashboard-presentation.css (4), screens.css (3) | Candidatos: --accent-green, --success-color; escolhido por contexto (color, background) |
| rgba(230, 57, 70, 0.2) | --border-accent | EXATO | 14 | dashboard-presentation.css (8), dashboard-projection.css (4), dashboard-macros.css (2) |  |
| rgba(230, 57, 70, 0.12) | --color-accent-muted | EXATO | 13 | dashboard-presentation.css (6), dashboard-final.css (3), dashboard-macros.css (3) |  |
| rgba(255, 255, 255, 0.12) | --border-default | EXATO (ambiguo por contexto) | 13 | dashboard-presentation.css (4), dashboard-final.css (3), screens.css (3) | Candidatos: --border-default, --border-normal; escolhido por contexto (background, border-color, border) |
| #e63946 | --color-text-accent | EXATO (ambiguo por contexto) | 11 | dashboard-presentation.css (11) | Candidatos: --color-text-accent, --hero-accent, --protein-color; escolhido por contexto (color, background) |
| rgba(230, 57, 70, 0.08) | --accent-red-subtle | EXATO | 11 | dashboard-presentation.css (6), dashboard-projection.css (2), dashboard-final.css (1) |  |
| rgba(230, 57, 70, 0.25) | --protein-glow | EXATO | 9 | dashboard-presentation.css (7), dashboard-final.css (1), dashboard-macros.css (1) |  |
| rgba(255,255,255,0.07) | --border-subtle | EXATO | 8 | dashboard-presentation.css (3), dashboard-supplements.css (3), dashboard-projection.css (2) |  |
| rgba(139, 92, 246, 0.06) | --fat-bg | EXATO | 7 | screens.css (3), dashboard-macros.css (2), dashboard-presentation.css (2) |  |
| rgba(74, 222, 128, 0.12) | --accent-green-dim | EXATO | 7 | dashboard-macros.css (3), dashboard-presentation.css (2), dashboard-final.css (1) |  |
| rgba(230, 57, 70, 0.1) | --protein-bg-mid | EXATO | 6 | dashboard-presentation.css (3), dashboard-projection.css (3) |  |
| rgba(230, 57, 70, 0.3) | --color-border-accent | EXATO (ambiguo por contexto) | 6 | dashboard-presentation.css (5), dashboard-macros.css (1) | Candidatos: --accent-red-glow, --color-border-accent; escolhido por contexto (border-color, border) |
| rgba(255, 42, 42, 0.12) | --accent-primary-dim | EXATO | 6 | screens.css (6) |  |
| #60a5fa | --info-color | EXATO | 5 | dashboard-presentation.css (3), dashboard-meals.css (2) |  |
| #ff4d5a | --accent-primary-bright | EXATO | 5 | dashboard-presentation.css (5) |  |
| rgba(230, 57, 70, 0.3) | --accent-red-glow | EXATO (ambiguo por contexto) | 5 | dashboard-presentation.css (3), dashboard-macros.css (2) | Candidatos: --accent-red-glow, --color-border-accent; escolhido por contexto (background, text-shadow, filter) |
| #0f0f0f | --bg-700 | EXATO | 4 | screens.css (4) |  |
| #ff6b76 | --protein-color-light | EXATO | 4 | dashboard-meals.css (2), dashboard-presentation.css (2) |  |
| rgba(230, 57, 70, 0.06) | --protein-bg | EXATO | 4 | dashboard-projection.css (2), dashboard-macros.css (1), dashboard-presentation.css (1) |  |
| rgba(230, 57, 70, 0.35) | --color-accent-glow | EXATO (ambiguo por contexto) | 4 | dashboard-presentation.css (2), dashboard-projection.css (2) | Candidatos: --color-accent-glow, --hero-accent-glow; escolhido por contexto (box-shadow) |
| #3dd68c | --hero-text-positive | EXATO | 3 | dashboard-presentation.css (3) |  |
| #e63946 | --protein-color | EXATO (ambiguo por contexto) | 3 | dashboard-final.css (3) | Candidatos: --color-text-accent, --hero-accent, --protein-color; escolhido por contexto (background) |
| #fbbf24 | --warning-color | EXATO | 3 | dashboard-macros.css (1), dashboard-presentation.css (1), screens.css (1) |  |
| rgba(139, 92, 246, 0.25) | --fat-glow | EXATO | 3 | dashboard-macros.css (1), dashboard-presentation.css (1), screens.css (1) |  |
| rgba(230,57,70,0.4) | --hero-border-accent | EXATO (ambiguo por contexto) | 3 | dashboard-projection.css (2), dashboard-meals.css (1) | Candidatos: --hero-border-accent, --protein-glow-strong; escolhido por contexto (border-color, border-left, box-shadow) |
| rgba(255, 184, 48, 0.05) | --sup-vitd-ultra | EXATO | 3 | dashboard-supplements.css (3) |  |
| rgba(255, 255, 255, 0.03) | --border-secondary | EXATO (ambiguo por contexto) | 3 | dashboard-projection.css (2), dashboard-supplements.css (1) | Candidatos: --border-secondary, --border-secondary-m, --surface-1; escolhido por contexto (box-shadow, border-right) |
| rgba(255, 255, 255, 0.08) | --border-glow | EXATO (ambiguo por contexto) | 3 | dashboard-projection.css (3) | Candidatos: --border, --border-dim, --border-glow; escolhido por contexto (box-shadow) |
| rgba(255, 42, 42, 0.35) | --accent-primary-glow | EXATO | 3 | screens.css (3) |  |
| rgba(255,255,255,0.09) | --hero-border-medium | EXATO (ambiguo por contexto) | 3 | dashboard-projection.css (2), dashboard-presentation.css (1) | Candidatos: --hero-border-medium, --surface-3; escolhido por contexto (border, border-color) |
| rgba(74, 222, 128, 0.06) | --success-bg | EXATO | 3 | dashboard-macros.css (2), dashboard-presentation.css (1) |  |
| #080808 | --bg-900 | EXATO | 2 | screens.css (2) |  |
| #0a0a0c | --bg-base | EXATO (ambiguo por contexto) | 2 | dashboard-presentation.css (2) | Candidatos: --bg-base, --color-bg-deep; escolhido por contexto (background) |
| #7b8cde | --sup-omega-primary | EXATO | 2 | dashboard-supplements.css (2) |  |
| #a78bfa | --fat-color-light | EXATO | 2 | dashboard-meals.css (2) |  |
| #ffb830 | --sup-vitd-primary | EXATO | 2 | dashboard-supplements.css (2) |  |
| rgba(0, 200, 255, 0.15) | --sup-creatina-glow | EXATO | 2 | dashboard-supplements.css (2) |  |
| rgba(0, 232, 152, 0.05) | --sup-whey-ultra | EXATO | 2 | dashboard-supplements.css (2) |  |
| rgba(0, 232, 152, 0.15) | --sup-whey-glow | EXATO | 2 | dashboard-supplements.css (2) |  |
| rgba(230,57,70,0.4) | --protein-glow-strong | EXATO (ambiguo por contexto) | 2 | dashboard-final.css (1), dashboard-projection.css (1) | Candidatos: --hero-border-accent, --protein-glow-strong; escolhido por contexto (box-shadow) |
| rgba(244, 162, 97, 0.06) | --carb-bg | EXATO | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) |  |
| rgba(244, 162, 97, 0.25) | --carb-glow | EXATO | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) |  |
| rgba(251, 146, 60, 0.12) | --accent-orange-dim | EXATO | 2 | screens.css (2) |  |
| rgba(251, 191, 36, 0.08) | --warning-bg | EXATO | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) |  |
| rgba(255, 184, 48, 0.15) | --sup-vitd-glow | EXATO | 2 | dashboard-supplements.css (2) |  |
| rgba(255, 255, 255, 0.24) | --border-hover | EXATO | 2 | screens.css (2) |  |
| rgba(255, 42, 42, 0.15) | --accent-lime-dim | EXATO | 2 | screens.css (2) |  |
| rgba(255,255,255,0.65) | --text-secondary | EXATO | 2 | dashboard-supplements.css (2) |  |
| #22d3ee | --accent-cyan | EXATO | 1 | dashboard-presentation.css (1) |  |
| #c4b5fd | --fat-color-lighter | EXATO | 1 | screens.css (1) |  |
| #d4a843 | --accent-gold | EXATO | 1 | dashboard-final.css (1) |  |
| #f0c060 | --accent-gold-light | EXATO | 1 | dashboard-final.css (1) |  |
| #ff4444 | --accent-violet | EXATO | 1 | screens.css (1) |  |
| rgba(0, 200, 255, 0.05) | --sup-creatina-ultra | EXATO | 1 | dashboard-supplements.css (1) |  |
| rgba(123, 140, 222, 0.12) | --sup-omega-glow | EXATO | 1 | dashboard-supplements.css (1) |  |
| rgba(139, 92, 246, 0.4) | --fat-glow-strong | EXATO | 1 | screens.css (1) |  |
| rgba(184, 127, 218, 0.12) | --sup-mag-glow | EXATO | 1 | dashboard-supplements.css (1) |  |
| rgba(212, 168, 67, 0.15) | --color-gold-muted | EXATO | 1 | dashboard-final.css (1) |  |
| rgba(255,255,255,0.09) | --surface-3 | EXATO (ambiguo por contexto) | 1 | dashboard-projection.css (1) | Candidatos: --hero-border-medium, --surface-3; escolhido por contexto (background) |
| rgba(74, 222, 128, 0.25) | --success-glow | EXATO | 1 | dashboard-final.css (1) |  |

## Excluidas Por Regra

| Regra | Ocorrencias | Formas encontradas (top) | Arquivos principais |
|---|---:|---|---|
| Transparent (nao substituir) | 296 | transparent (296) | dashboard-presentation.css (75), screens.css (69), dashboard-final.css (42) |
| Branco absoluto (nao substituir) | 61 | #fff (45), white (10), #ffffff (6) | screens.css (33), dashboard-supplements.css (10), dashboard-final.css (5) |
| Preto absoluto (nao substituir) | 20 | black (16), #000 (4) | dashboard-presentation.css (8), dashboard-supplements.css (8), screens.css (4) |
| inherit (nao substituir) | 14 | inherit (14) | dashboard-presentation.css (5), dashboard-projection.css (3), dashboard-simulator.css (3) |
| currentColor (nao substituir) | 6 | currentColor (6) | dashboard-presentation.css (3), dashboard-macros.css (1), dashboard-projection.css (1) |

## Sem Match Exato (Exaustivo)

| Cor hardcoded | Variavel tokens.css | Match | Ocorrencias estimadas | Arquivos principais | Observacao |
|---|---|---|---:|---|---|
| rgba(255, 255, 255, 0.04) |  | SEM MATCH | 35 | dashboard-presentation.css (15), dashboard-supplements.css (8), screens.css (5) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card-hover (distancia 0.4). |
| rgba(255,255,255,0.05) |  | SEM MATCH | 28 | dashboard-supplements.css (8), dashboard-projection.css (6), dashboard-presentation.css (5) | SEM MATCH - criar variavel? Proximo de --bg-glass-hover (distancia 1.0). |
| #22c55e |  | SEM MATCH | 20 | dashboard-presentation.css (10), dashboard-projection.css (5), screens.css (5) | SEM MATCH - criar variavel? |
| rgba(255,255,255,0.1) |  | SEM MATCH | 18 | dashboard-final.css (3), dashboard-projection.css (3), dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --surface-3 (distancia 2.0). |
| rgba(230, 57, 70, 0.15) |  | SEM MATCH | 17 | dashboard-presentation.css (12), dashboard-final.css (2), dashboard-macros.css (2) | SEM MATCH - criar variavel? Proximo de --color-accent-muted (distancia 5.9). |
| rgba(255, 255, 255, 0.02) |  | SEM MATCH | 16 | dashboard-presentation.css (5), dashboard-macros.css (3), dashboard-projection.css (3) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 0.4). |
| rgba(255, 255, 255, 0.14) |  | SEM MATCH | 15 | screens.css (9), dashboard-presentation.css (2), dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --border-default (distancia 4.0). |
| rgba(255,255,255,0.01) |  | SEM MATCH | 13 | dashboard-projection.css (10), dashboard-final.css (2), dashboard-macros.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 2.4). |
| rgba(0, 0, 0, 0.5) |  | SEM MATCH | 12 | screens.css (7), dashboard-presentation.css (5) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.15) |  | SEM MATCH | 12 | screens.css (7), dashboard-final.css (1), dashboard-meals.css (1) | SEM MATCH - criar variavel? Proximo de --border-default (distancia 5.9). |
| rgba(255, 255, 255, 0.16) |  | SEM MATCH | 12 | screens.css (9), dashboard-presentation.css (2), dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --border-bright (distancia 7.9). |
| rgba(255, 255, 255, 0.55) |  | SEM MATCH | 11 | screens.css (7), dashboard-supplements.css (4) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 19.8). |
| rgba(0, 0, 0, 0.3) |  | SEM MATCH | 10 | dashboard-macros.css (4), dashboard-presentation.css (4), dashboard-supplements.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.9) |  | SEM MATCH | 10 | dashboard-supplements.css (5), dashboard-presentation.css (2), screens.css (2) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 19.8). |
| rgba(20, 20, 22, 0.92) |  | SEM MATCH | 9 | dashboard-presentation.css (9) | SEM MATCH - criar variavel? Proximo de --bg-600 (distancia 15.9). |
| rgba(255, 255, 255, 0.18) |  | SEM MATCH | 9 | screens.css (5), dashboard-presentation.css (2), dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --border-bright (distancia 4.0). |
| rgba(255, 42, 42, 0.08) |  | SEM MATCH | 9 | screens.css (9) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 7.9). |
| rgba(255,255,255,0.025) |  | SEM MATCH | 9 | dashboard-projection.css (3), dashboard-supplements.css (2), screens.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 0.6). |
| rgba(74, 222, 128, 0.1) |  | SEM MATCH | 9 | dashboard-final.css (3), dashboard-macros.css (2), dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 4.0). |
| rgba(139, 92, 246, 0.2) |  | SEM MATCH | 8 | screens.css (6), dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --fat-glow (distancia 9.9). |
| rgba(230,57,70,0) |  | SEM MATCH | 8 | dashboard-projection.css (8) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 11.9). |
| #818cf8 |  | SEM MATCH | 7 | dashboard-final.css (7) | SEM MATCH - criar variavel? |
| #8ce8f2 |  | SEM MATCH | 7 | dashboard-presentation.css (7) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.5) |  | SEM MATCH | 7 | screens.css (3), dashboard-projection.css (2), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(255,255,255,0.015) |  | SEM MATCH | 7 | dashboard-projection.css (3), dashboard-final.css (2), dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 1.4). |
| rgba(255,255,255,0.25) |  | SEM MATCH | 7 | dashboard-supplements.css (2), screens.css (2), dashboard-final.css (1) | SEM MATCH - criar variavel? Proximo de --border-hover (distancia 2.0). |
| rgba(255,255,255,0.4) |  | SEM MATCH | 7 | dashboard-supplements.css (6), screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-tertiary (distancia 19.8). |
| rgba(34, 197, 94, 0.12) |  | SEM MATCH | 7 | dashboard-presentation.css (7) | SEM MATCH - criar variavel? |
| #eab308 |  | SEM MATCH | 6 | screens.css (6) | SEM MATCH - criar variavel? |
| #ff6b6b |  | SEM MATCH | 6 | dashboard-final.css (4), screens.css (2) | SEM MATCH - criar variavel? Proximo de --protein-color-light (distancia 11.0). |
| rgba(0, 0, 0, 0.4) |  | SEM MATCH | 6 | dashboard-presentation.css (2), dashboard-final.css (1), dashboard-macros.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.35) |  | SEM MATCH | 6 | dashboard-projection.css (4), dashboard-presentation.css (1), screens.css (1) | SEM MATCH - criar variavel? |
| rgba(240, 240, 248, 0.03) |  | SEM MATCH | 6 | screens.css (6) | SEM MATCH - criar variavel? |
| rgba(245,158,11,0.15) |  | SEM MATCH | 6 | dashboard-projection.css (4), dashboard-presentation.css (1), screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 11.7). |
| rgba(255, 255, 255, 0.85) |  | SEM MATCH | 6 | screens.css (3), dashboard-supplements.css (2), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0.4) |  | SEM MATCH | 6 | screens.css (6) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 9.9). |
| #080810 |  | SEM MATCH | 5 | screens.css (5) | SEM MATCH - criar variavel? Proximo de --bg-base (distancia 4.9). |
| rgba(0,0,0,0.7) |  | SEM MATCH | 5 | dashboard-supplements.css (5) | SEM MATCH - criar variavel? |
| rgba(139, 92, 246, 0.12) |  | SEM MATCH | 5 | dashboard-macros.css (2), dashboard-presentation.css (2), screens.css (1) | SEM MATCH - criar variavel? Proximo de --fat-bg-mid (distancia 4.0). |
| rgba(232,41,58,0.12) |  | SEM MATCH | 5 | dashboard-simulator.css (5) | SEM MATCH - criar variavel? Proximo de --accent-red-mid (distancia 11.9). |
| rgba(232,41,58,0.2) |  | SEM MATCH | 5 | dashboard-simulator.css (5) | SEM MATCH - criar variavel? Proximo de --accent-red-mid (distancia 4.0). |
| rgba(232,41,58,0.3) |  | SEM MATCH | 5 | dashboard-simulator.css (5) | SEM MATCH - criar variavel? Proximo de --color-border-accent (distancia 20.1). |
| rgba(240, 240, 248, 0.07) |  | SEM MATCH | 5 | screens.css (5) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.6) |  | SEM MATCH | 5 | screens.css (3), dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 9.9). |
| rgba(255, 42, 42, 0.45) |  | SEM MATCH | 5 | screens.css (5) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 19.8). |
| rgba(255,255,255,0.35) |  | SEM MATCH | 5 | dashboard-supplements.css (4), screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-tertiary (distancia 9.9). |
| rgba(34, 197, 94, 0.1) |  | SEM MATCH | 5 | dashboard-projection.css (3), dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.2) |  | SEM MATCH | 5 | dashboard-presentation.css (4), screens.css (1) | SEM MATCH - criar variavel? |
| #a5b4fc |  | SEM MATCH | 4 | dashboard-final.css (4) | SEM MATCH - criar variavel? |
| #fde68a |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? |
| #ff2020 |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --accent-primary (distancia 14.1). |
| #ff3b3b |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --red-text (distancia 4.2). |
| rgba(139, 92, 246, 0.08) |  | SEM MATCH | 4 | screens.css (2), dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --fat-bg (distancia 4.0). |
| rgba(139, 92, 246, 0.3) |  | SEM MATCH | 4 | dashboard-macros.css (2), dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --fat-glow (distancia 9.9). |
| rgba(139, 92, 246, 0.5) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --fat-glow-strong (distancia 19.8). |
| rgba(200, 255, 0, 0.08) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.2) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? |
| rgba(230,57,70,0.05) |  | SEM MATCH | 4 | dashboard-final.css (1), dashboard-meals.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 2.0). |
| rgba(232, 0, 29, 0.2) |  | SEM MATCH | 4 | dashboard-presentation.css (4) | SEM MATCH - criar variavel? |
| rgba(232,41,58,0.10) |  | SEM MATCH | 4 | dashboard-simulator.css (4) | SEM MATCH - criar variavel? Proximo de --accent-red-mid (distancia 15.8). |
| rgba(244, 162, 97, 0.08) |  | SEM MATCH | 4 | dashboard-macros.css (2), dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --carb-bg (distancia 4.0). |
| rgba(244, 162, 97, 0.12) |  | SEM MATCH | 4 | dashboard-macros.css (2), dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --carb-bg-mid (distancia 4.0). |
| rgba(244, 162, 97, 0.15) |  | SEM MATCH | 4 | dashboard-meals.css (2), dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --carb-bg-mid (distancia 9.9). |
| rgba(244, 162, 97, 0.3) |  | SEM MATCH | 4 | dashboard-macros.css (2), dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --carb-glow (distancia 9.9). |
| rgba(247,97,42,0.12) |  | SEM MATCH | 4 | dashboard-simulator.css (4) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.2) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --accent-orange-dim (distancia 15.8). |
| rgba(255, 184, 48, 0.22) |  | SEM MATCH | 4 | dashboard-supplements.css (4) | SEM MATCH - criar variavel? Proximo de --sup-vitd-glow (distancia 13.8). |
| rgba(255, 255, 255, 0.45) |  | SEM MATCH | 4 | screens.css (3), dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.58) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 13.8). |
| rgba(255, 255, 255, 0.62) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 5.9). |
| rgba(255, 255, 255, 0.7) |  | SEM MATCH | 4 | screens.css (3), dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 9.9). |
| rgba(255, 255, 255, 0.82) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0.14) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 2.0). |
| rgba(255,255,255,0.8) |  | SEM MATCH | 4 | dashboard-supplements.css (2), screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255,255,255,0.88) |  | SEM MATCH | 4 | dashboard-supplements.css (2), screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255,255,255,0) |  | SEM MATCH | 4 | dashboard-projection.css (3), dashboard-simulator.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 4.3). |
| rgba(34, 211, 238, 0.2) |  | SEM MATCH | 4 | screens.css (4) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 15.8). |
| rgba(34, 211, 238, 0.5) |  | SEM MATCH | 4 | screens.css (3), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.10) |  | SEM MATCH | 4 | dashboard-simulator.css (4) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.12) |  | SEM MATCH | 4 | dashboard-simulator.css (4) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.6) |  | SEM MATCH | 4 | dashboard-simulator.css (4) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.12) |  | SEM MATCH | 4 | dashboard-presentation.css (4) | SEM MATCH - criar variavel? |
| rgba(74, 222, 128, 0.2) |  | SEM MATCH | 4 | screens.css (3), dashboard-final.css (1) | SEM MATCH - criar variavel? Proximo de --success-glow (distancia 9.9). |
| #3b82f6 |  | SEM MATCH | 3 | dashboard-presentation.css (3) | SEM MATCH - criar variavel? Proximo de --accent-blue (distancia 12.3). |
| #d9ffe8 |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| #f97316 |  | SEM MATCH | 3 | dashboard-macros.css (1), dashboard-presentation.css (1), screens.css (1) | SEM MATCH - criar variavel? |
| #facc15 |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --warning-color (distancia 19.9). |
| rgba(0, 200, 255, 0.10) |  | SEM MATCH | 3 | dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --sup-creatina-glow (distancia 9.9). |
| rgba(0, 232, 152, 0.10) |  | SEM MATCH | 3 | dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --sup-whey-glow (distancia 9.9). |
| rgba(0,0,0,0.2) |  | SEM MATCH | 3 | dashboard-supplements.css (2), screens.css (1) | SEM MATCH - criar variavel? |
| rgba(123, 140, 222, 0.08) |  | SEM MATCH | 3 | dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --sup-omega-glow (distancia 7.9). |
| rgba(123, 140, 222, 0.18) |  | SEM MATCH | 3 | dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --sup-omega-glow (distancia 11.9). |
| rgba(123, 140, 222, 0.22) |  | SEM MATCH | 3 | dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --sup-omega-glow (distancia 19.8). |
| rgba(139, 92, 246, 0.15) |  | SEM MATCH | 3 | dashboard-macros.css (1), dashboard-presentation.css (1), screens.css (1) | SEM MATCH - criar variavel? Proximo de --fat-bg-mid (distancia 9.9). |
| rgba(184, 127, 218, 0.18) |  | SEM MATCH | 3 | dashboard-supplements.css (3) | SEM MATCH - criar variavel? Proximo de --sup-mag-glow (distancia 11.9). |
| rgba(200, 255, 0, 0.12) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(21, 24, 33, 0.2) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(230, 57, 70, 0.07) |  | SEM MATCH | 3 | dashboard-final.css (1), dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-red-subtle (distancia 2.0). |
| rgba(230, 57, 70, 0.5) |  | SEM MATCH | 3 | dashboard-final.css (2), dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --hero-border-accent (distancia 19.8). |
| rgba(230,57,70,0.04) |  | SEM MATCH | 3 | dashboard-projection.css (2), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 4.0). |
| rgba(232,41,58,0.4) |  | SEM MATCH | 3 | dashboard-simulator.css (3) | SEM MATCH - criar variavel? Proximo de --hero-border-accent (distancia 20.1). |
| rgba(232,41,58,0.5) |  | SEM MATCH | 3 | dashboard-simulator.css (3) | SEM MATCH - criar variavel? |
| rgba(244, 162, 97, 0.2) |  | SEM MATCH | 3 | dashboard-macros.css (2), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --carb-glow (distancia 9.9). |
| rgba(250, 204, 21, 0.12) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --warning-bg (distancia 21.4). |
| rgba(255, 255, 255, 0.84) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0.55) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(255, 48, 48, 0.12) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 8.5). |
| rgba(255, 48, 48, 0.18) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 10.3). |
| rgba(255, 48, 48, 0.24) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 19.7). |
| rgba(255, 48, 48, 0.35) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 8.5). |
| rgba(255, 48, 48, 0.5) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(255, 48, 48, 0.55) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? |
| rgba(255,255,255,0.006) |  | SEM MATCH | 3 | dashboard-final.css (2), dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 3.2). |
| rgba(255,255,255,0.75) |  | SEM MATCH | 3 | dashboard-supplements.css (2), screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 19.8). |
| rgba(34, 211, 238, 0.06) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 11.9). |
| rgba(34, 211, 238, 0.1) |  | SEM MATCH | 3 | screens.css (3) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 4.0). |
| rgba(45,212,191,0.04) |  | SEM MATCH | 3 | dashboard-projection.css (3) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.2) |  | SEM MATCH | 3 | dashboard-simulator.css (3) | SEM MATCH - criar variavel? |
| #0d0d0d |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --bg-700 (distancia 3.5). |
| #34d399 |  | SEM MATCH | 2 | dashboard-meals.css (2) | SEM MATCH - criar variavel? Proximo de --hero-text-positive (distancia 16.1). |
| #6d28d9 |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| #9aabee |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? |
| #cbd5e1 |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| #ef4444 |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --hero-accent (distancia 14.4). |
| #f0c27f |  | SEM MATCH | 2 | dashboard-meals.css (2) | SEM MATCH - criar variavel? Proximo de --carb-color-light (distancia 16.6). |
| #ff6b00 |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| #ffd4d4 |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| #ffd7d7 |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| #ffe4e8 |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| #ffe5e9 |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(0, 0, 0, 0.42) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(0, 0, 0, 0.6) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(0, 200, 255, 0.06) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-creatina-ultra (distancia 2.0). |
| rgba(0, 200, 255, 0.22) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-creatina-glow (distancia 13.8). |
| rgba(0, 200, 255, 0.25) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-creatina-glow (distancia 19.8). |
| rgba(0, 232, 152, 0.20) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-whey-glow (distancia 9.9). |
| rgba(0, 232, 152, 0.22) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-whey-glow (distancia 13.8). |
| rgba(0,0,0,0.08) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.1) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.15) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.22) |  | SEM MATCH | 2 | dashboard-supplements.css (1), screens.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.38) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.8) |  | SEM MATCH | 2 | dashboard-supplements.css (1), screens.css (1) | SEM MATCH - criar variavel? |
| rgba(12,14,30,0) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? |
| rgba(123, 140, 222, 0.05) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-omega-ultra (distancia 2.0). |
| rgba(123, 140, 222, 0.10) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-omega-glow (distancia 4.0). |
| rgba(129, 140, 248, 0.12) |  | SEM MATCH | 2 | dashboard-final.css (2) | SEM MATCH - criar variavel? |
| rgba(129, 140, 248, 0.2) |  | SEM MATCH | 2 | dashboard-final.css (2) | SEM MATCH - criar variavel? |
| rgba(13, 13, 16, 0.85) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 4.4). |
| rgba(13, 13, 16, 0.9) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 10.8). |
| rgba(139, 92, 246, 0.22) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --fat-glow (distancia 5.9). |
| rgba(139, 92, 246, 0.55) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(139, 92, 246, 0.85) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.78) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? |
| rgba(15, 15, 25, 0.9) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 15.7). |
| rgba(184, 127, 218, 0.05) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-mag-ultra (distancia 2.0). |
| rgba(184, 127, 218, 0.07) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-mag-ultra (distancia 5.9). |
| rgba(184, 127, 218, 0.10) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-mag-glow (distancia 4.0). |
| rgba(184, 127, 218, 0.22) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-mag-glow (distancia 19.8). |
| rgba(200, 255, 0, 0.06) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.22) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.28) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.3) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.4) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(212, 168, 67, 0.05) |  | SEM MATCH | 2 | dashboard-final.css (2) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 19.8). |
| rgba(212, 168, 67, 0.12) |  | SEM MATCH | 2 | dashboard-final.css (2) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 5.9). |
| rgba(212,168,67,0.06) |  | SEM MATCH | 2 | dashboard-final.css (2) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 17.8). |
| rgba(212,168,67,0.2) |  | SEM MATCH | 2 | dashboard-final.css (2) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 9.9). |
| rgba(230, 57, 70, 0.02) |  | SEM MATCH | 2 | dashboard-meals.css (1), dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 7.9). |
| rgba(230, 57, 70, 0.03) |  | SEM MATCH | 2 | dashboard-final.css (1), dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 5.9). |
| rgba(230, 57, 70, 0.6) |  | SEM MATCH | 2 | dashboard-presentation.css (1), dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(230,57,70,0.11) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --color-accent-muted (distancia 2.0). |
| rgba(230,57,70,0.14) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --color-accent-muted (distancia 4.0). |
| rgba(230,57,70,0.22) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --border-accent (distancia 4.0). |
| rgba(230,57,70,0.45) |  | SEM MATCH | 2 | dashboard-final.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --hero-border-accent (distancia 9.9). |
| rgba(232, 0, 29, 0.12) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.35) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.4) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.55) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(232, 41, 58, 0.25) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? Proximo de --accent-red-mid (distancia 13.8). |
| rgba(232,41,58,0.05) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 20.2). |
| rgba(232,41,58,0.06) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 20.1). |
| rgba(232,41,58,0.07) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? Proximo de --accent-red-subtle (distancia 20.2). |
| rgba(232,41,58,0.08) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? Proximo de --accent-red-mid (distancia 19.8). |
| rgba(232,41,58,0.15) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? Proximo de --accent-red-mid (distancia 5.9). |
| rgba(232,41,58,0.6) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? |
| rgba(234, 179, 8, 0.45) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(24, 24, 27, 0.9) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --bg-elevated (distancia 19.9). |
| rgba(240, 240, 248, 0.08) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(240, 240, 248, 0.35) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(245, 158, 11, 0.14) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 10.8). |
| rgba(245,158,11,0.03) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 20.4). |
| rgba(245,158,11,0.05) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 17.1). |
| rgba(245,158,11,0.2) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 18.8). |
| rgba(245,158,11,0.35) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? |
| rgba(249, 115, 22, 0.08) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(249, 115, 22, 0.12) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 191, 36, 0.1) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --warning-bg (distancia 4.0). |
| rgba(251, 191, 36, 0.12) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --warning-bg (distancia 7.9). |
| rgba(251, 191, 36, 0.15) |  | SEM MATCH | 2 | dashboard-meals.css (2) | SEM MATCH - criar variavel? Proximo de --warning-bg (distancia 13.8). |
| rgba(255, 184, 0, 0.45) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 184, 48, 0.08) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-vitd-ultra (distancia 5.9). |
| rgba(255, 184, 48, 0.10) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-vitd-glow (distancia 9.9). |
| rgba(255, 184, 48, 0.12) |  | SEM MATCH | 2 | dashboard-supplements.css (2) | SEM MATCH - criar variavel? Proximo de --sup-vitd-glow (distancia 5.9). |
| rgba(255, 255, 255, 0.014) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 1.6). |
| rgba(255, 255, 255, 0.72) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 13.8). |
| rgba(255, 255, 255, 0.86) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.95) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 9.9). |
| rgba(255, 42, 42, 0.16) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 2.0). |
| rgba(255, 42, 42, 0.18) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 5.9). |
| rgba(255, 42, 42, 0.25) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 19.8). |
| rgba(255, 42, 42, 0.3) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 9.9). |
| rgba(255, 42, 42, 0.5) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0.6) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 48, 48, 0.08) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 11.6). |
| rgba(255, 48, 48, 0.45) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 21.5). |
| rgba(255, 48, 48, 0.65) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 48, 48, 0.9) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-primary (distancia 21.5). |
| rgba(255, 48, 48, 0) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(255, 59, 59, 0.28) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-accent-glow (distancia 11.7). |
| rgba(255, 59, 59, 0.32) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-accent-glow (distancia 17.1). |
| rgba(255, 69, 58, 0.08) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 7.9). |
| rgba(255, 69, 58, 0.15) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 5.9). |
| rgba(255, 69, 58, 0.2) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? Proximo de --tdee-accent-glow (distancia 9.9). |
| rgba(255,255,255,0.11) |  | SEM MATCH | 2 | dashboard-projection.css (1), screens.css (1) | SEM MATCH - criar variavel? Proximo de --border-default (distancia 2.0). |
| rgba(34, 197, 94, 0.06) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.14) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.3) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.45) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? |
| rgba(34, 211, 238, 0.08) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 7.9). |
| rgba(34, 211, 238, 0.14) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 4.0). |
| rgba(34, 211, 238, 0.4) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.1) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.22) |  | SEM MATCH | 2 | dashboard-projection.css (2) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.25) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.5) |  | SEM MATCH | 2 | dashboard-simulator.css (2) | SEM MATCH - criar variavel? |
| rgba(52, 211, 153, 0.15) |  | SEM MATCH | 2 | dashboard-meals.css (2) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.1) |  | SEM MATCH | 2 | dashboard-presentation.css (2) | SEM MATCH - criar variavel? |
| rgba(74, 222, 128, 0.04) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-bg (distancia 4.0). |
| rgba(74, 222, 128, 0.08) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-bg (distancia 4.0). |
| rgba(74, 222, 128, 0.14) |  | SEM MATCH | 2 | screens.css (2) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 4.0). |
| rgba(74, 222, 128, 0.15) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 5.9). |
| rgba(74, 222, 128, 0.18) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 11.9). |
| rgba(74, 222, 128, 0.3) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-glow (distancia 9.9). |
| rgba(74, 222, 128, 0.7) |  | SEM MATCH | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(96, 165, 250, 0.15) |  | SEM MATCH | 2 | dashboard-meals.css (2) | SEM MATCH - criar variavel? |
| #060608 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-900 (distancia 2.8). |
| #08080a |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-900 (distancia 2.0). |
| #0891b2 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #091e15 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-600 (distancia 14.9). |
| #0a0a10 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-base (distancia 4.0). |
| #0c0c0d |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-800 (distancia 2.4). |
| #0c0c12 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-700 (distancia 5.2). |
| #0d0d10 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-700 (distancia 3.0). |
| #0d2a1e |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-500 (distancia 21.0). |
| #101010 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-700 (distancia 1.7). |
| #111 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-surface (distancia 3.0). |
| #111112 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-surface (distancia 2.0). |
| #161922 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-elevated (distancia 5.5). |
| #1e1e32 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card-hover (distancia 8.5). |
| #2a2a40 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-active (distancia 8.0). |
| #2ec4b6 |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| #334155 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-disabled (distancia 11.1). |
| #4f4f5b |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --text-muted (distancia 7.7). |
| #5cc8ff |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-cardio (distancia 12.8). |
| #6366f1 |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| #6b0f17 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #7f1d1d |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #7fff00 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #854d0e |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #86efac |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #86f6c5 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #8888cc |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #8a1111 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #8ed7e4 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #93c5fd |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #9fd8b4 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #b4ebff |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #b8a6e5 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #c0182a |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| #c2410c |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #d53128 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #e7bd7d |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #e8001d |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #e9b188 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ecfdf5 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --hero-text-primary (distancia 13.6). |
| #f3a8a8 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-lighter (distancia 16.6). |
| #f7f8fb |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 11.4). |
| #f8f9ff |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 9.2). |
| #f8fafc |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 9.1). |
| #f9c8cf |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #fca5a5 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-lighter (distancia 8.5). |
| #fecaca |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #fef3c7 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ff2b2b |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary (distancia 1.4). |
| #ff6565 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-light (distancia 18.0). |
| #ff6b94 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ff6c7d |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-light (distancia 7.1). |
| #ff7070 |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-light (distancia 7.8). |
| #ff7676 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-light (distancia 11.0). |
| #ff8a8a |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ff8a95 |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| #ff8b98 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ff8c96 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ff9aa6 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-lighter (distancia 3.2). |
| #ff9d9d |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --protein-color-lighter (distancia 8.0). |
| #ff9f5c |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --carb-color (distancia 12.4). |
| #ffb3bc |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffb4b4 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ffb800 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffc2c9 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffc7cf |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd0d6 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd3d3 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ffd576 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd5da |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd6db |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd77c |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd860 |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| #ffd8dd |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffd9d9 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ffdd86 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffdede |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| #ffe2e6 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| #ffe6e9 |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --hero-text-primary (distancia 21.7). |
| #ffe8e8 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --hero-text-primary (distancia 21.4). |
| #ffedd5 |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 0, 0, 0.45) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 0, 0, 0.75) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 150, 200, 0.04) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 150, 200, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 150, 200, 0.14) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 180, 100, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 180, 100, 0.14) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 180, 110, 0.04) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 200, 120, 0.45) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 200, 120, 0.5) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 200, 255, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-creatina-ultra (distancia 5.9). |
| rgba(0, 200, 255, 0.12) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-creatina-glow (distancia 5.9). |
| rgba(0, 200, 255, 0.18) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-creatina-glow (distancia 5.9). |
| rgba(0, 200, 255, 0.2) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-creatina-glow (distancia 9.9). |
| rgba(0, 200, 255, 0.3) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 200, 255, 0.45) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 200, 255, 0.5) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 200, 255, 0.7) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 232, 152, 0.06) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-whey-ultra (distancia 2.0). |
| rgba(0, 232, 152, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-whey-ultra (distancia 5.9). |
| rgba(0, 232, 152, 0.12) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-whey-glow (distancia 5.9). |
| rgba(0, 232, 152, 0.18) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-whey-glow (distancia 5.9). |
| rgba(0, 232, 152, 0.25) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-whey-glow (distancia 19.8). |
| rgba(0, 232, 152, 0.30) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 232, 152, 0.5) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 232, 152, 0.7) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0, 255, 160, 0.40) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.12) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.36) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(0,0,0,0.85) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 20.6). |
| rgba(10, 10, 10, 0.8) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 11.1). |
| rgba(10, 10, 10, 0.82) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 7.8). |
| rgba(10, 10, 10, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 11.1). |
| rgba(10, 10, 14, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 9.9). |
| rgba(10, 10, 14, 0.92) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 13.9). |
| rgba(10, 12, 18, 0.94) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-base (distancia 13.4). |
| rgba(10, 8, 11, 0.98) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-base (distancia 4.5). |
| rgba(10,11,21,0.58) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(100, 60, 200, 0.04) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(104, 109, 224, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(109, 40, 217, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(109, 40, 217, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(11, 10, 19, 0.92) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 14.4). |
| rgba(12, 10, 16, 0.88) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 6.3). |
| rgba(12, 12, 13, 0.95) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-800 (distancia 10.2). |
| rgba(12, 12, 16, 0.92) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 14.1). |
| rgba(12, 12, 24, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 13.7). |
| rgba(12, 20, 18, 0.5) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(12, 20, 36, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(12, 9, 10, 0.92) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 14.9). |
| rgba(120, 120, 200, 0.06) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(123, 140, 222, 0.06) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-omega-ultra (distancia 4.0). |
| rgba(123, 140, 222, 0.07) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-omega-ultra (distancia 5.9). |
| rgba(123, 140, 222, 0.15) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-omega-glow (distancia 5.9). |
| rgba(123, 140, 222, 0.20) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-omega-glow (distancia 15.8). |
| rgba(123, 140, 222, 0.28) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(123, 140, 222, 0.5) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(123, 140, 222, 0.7) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(123,140,222,0.8) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(129, 140, 248, 0.05) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(129, 140, 248, 0.1) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(129, 140, 248, 0.15) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(129, 140, 248, 0.25) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(129, 140, 248, 0.4) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(13, 13, 16, 0.6) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(13, 13, 16, 0.7) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass (distancia 14.5). |
| rgba(13, 13, 16, 0.84) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 4.8). |
| rgba(13, 13, 26, 0.85) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 11.8). |
| rgba(13, 13, 26, 0.97) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-surface (distancia 10.2). |
| rgba(130, 60, 180, 0.04) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(130, 60, 180, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(130, 60, 180, 0.14) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(134, 239, 172, 0.12) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(134, 239, 172, 0.95) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(139, 92, 246, 0.05) |  | SEM MATCH | 1 | dashboard-macros.css (1) | SEM MATCH - criar variavel? Proximo de --fat-bg (distancia 2.0). |
| rgba(139, 92, 246, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --fat-bg-mid (distancia 7.9). |
| rgba(139, 92, 246, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --fat-glow-strong (distancia 9.9). |
| rgba(139, 92, 246, 0.78) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(14, 10, 13, 0.92) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 14.5). |
| rgba(14,14,30,0.98) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-surface (distancia 11.6). |
| rgba(14,16,34,0.2) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(140, 232, 242, 0.45) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(142, 215, 228, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(144,144,168,0.06) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(144,144,168,0.15) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(144,144,168,0.4) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(148, 163, 184, 0.12) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(148, 163, 184, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(148, 163, 184, 0.24) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(148, 163, 184, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(148, 163, 184, 0.32) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.1) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.2) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.72) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.74) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.75) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(148,163,184,0.88) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(15, 15, 19, 0.9) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 12.8). |
| rgba(153, 0, 0, 0.72) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(153, 27, 27, 0.15) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(153, 27, 27, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(16, 16, 16, 0.88) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 10.4). |
| rgba(160, 175, 255, 0.36) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(160, 180, 255, 0.12) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(160, 180, 255, 0.22) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(161, 98, 7, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(161, 98, 7, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(168,85,247,0.1) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(168,85,247,0.2) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(17, 17, 17, 0.95) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-surface (distancia 10.3). |
| rgba(17, 27, 45, 0.78) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(17,17,30,0.98) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card (distancia 8.6). |
| rgba(17,18,35,0.95) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card (distancia 14.2). |
| rgba(18, 18, 26, 0.5) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(18, 28, 24, 0.6) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(18, 9, 11, 0.92) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 16.5). |
| rgba(18,20,40,0.45) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(180, 0, 0, 0.06) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(180, 0, 0, 0.07) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(180, 235, 255, 0.86) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(184, 127, 218, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-mag-glow (distancia 7.9). |
| rgba(184, 127, 218, 0.15) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-mag-glow (distancia 5.9). |
| rgba(184, 127, 218, 0.28) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(184, 127, 218, 0.5) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(184, 127, 218, 0.7) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(184, 166, 229, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(19, 12, 15, 0.78) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass (distancia 12.8). |
| rgba(19,19,36,0.98) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card (distancia 10.7). |
| rgba(191, 90, 242, 0.02) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-tef-dim (distancia 19.8). |
| rgba(2,4,18,0.32) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(2,4,18,0.36) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(20, 10, 14, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 14.1). |
| rgba(20,20,34,0.98) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card (distancia 8.5). |
| rgba(20,20,36,0.96) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-elevated (distancia 12.0). |
| rgba(200, 120, 0, 0.04) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 140, 0, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 140, 0, 0.14) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.03) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.04) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.05) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.1) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.15) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.24) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.25) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.26) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.32) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.45) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.55) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(200, 255, 0, 0.6) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(203,213,225,0.86) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(21, 128, 61, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(21, 128, 61, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(21, 21, 26, 0.9) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card (distancia 19.8). |
| rgba(21, 24, 33, 0.06) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(21, 24, 33, 0.12) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(21, 24, 33, 0.45) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(212, 168, 67, 0.1) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 9.9). |
| rgba(212, 168, 67, 0.5) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? |
| rgba(212,168,67,0.08) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 13.8). |
| rgba(212,168,67,0.14) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? Proximo de --color-gold-muted (distancia 2.0). |
| rgba(212,168,67,0.4) |  | SEM MATCH | 1 | dashboard-final.css (1) | SEM MATCH - criar variavel? Proximo de --color-border-gold (distancia 19.8). |
| rgba(22, 10, 14, 0.65) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(220, 170, 255, 0.12) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(220, 170, 255, 0.22) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(220, 170, 255, 0.36) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(224, 32, 32, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-ultra (distancia 4.0). |
| rgba(224, 32, 32, 0.1) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-ultra (distancia 7.9). |
| rgba(224, 32, 32, 0.22) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-border (distancia 15.8). |
| rgba(224, 32, 32, 0.25) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-border (distancia 9.9). |
| rgba(224,32,32,0.03) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-ultra (distancia 5.9). |
| rgba(224,32,32,0.04) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-ultra (distancia 4.0). |
| rgba(224,32,32,0.07) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-ultra (distancia 2.0). |
| rgba(225, 124, 132, 0.18) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(226,232,240,0.8) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(23, 10, 13, 0.86) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 13.3). |
| rgba(230, 57, 70, 0.035) |  | SEM MATCH | 1 | dashboard-macros.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 4.9). |
| rgba(230, 57, 70, 0.13) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-muted (distancia 2.0). |
| rgba(230, 57, 70, 0.18) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --border-accent (distancia 4.0). |
| rgba(230, 57, 70, 0.52) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(230, 57, 70, 0.65) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(230, 57, 70, 0.7) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(230,57,70,0.025) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg (distancia 6.9). |
| rgba(230,57,70,0.28) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --color-border-accent (distancia 4.0). |
| rgba(230,57,70,0.34) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-glow (distancia 2.0). |
| rgba(232, 0, 29, 0.04) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.05) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.07) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.08) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.1) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.13) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.14) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.15) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.16) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232, 0, 29, 0.45) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(232,41,58,0.45) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(232,41,58,0.7) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(233, 177, 136, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(234, 179, 8, 0.12) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(234, 179, 8, 0.13) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(234, 179, 8, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(234, 179, 8, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(234, 179, 8, 0.8) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(239, 68, 68, 0.1) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --protein-bg-mid (distancia 14.4). |
| rgba(239, 68, 68, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-muted (distancia 14.9). |
| rgba(239, 68, 68, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --border-accent (distancia 14.4). |
| rgba(239, 68, 68, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --border-accent (distancia 14.9). |
| rgba(239, 68, 68, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --color-accent-glow (distancia 14.4). |
| rgba(239, 68, 68, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(239, 68, 68, 0.8) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(24,24,42,0.98) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-card-hover (distancia 6.9). |
| rgba(240, 240, 248, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(240, 240, 248, 0.65) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(244, 162, 97, 0.04) |  | SEM MATCH | 1 | dashboard-macros.css (1) | SEM MATCH - criar variavel? Proximo de --carb-bg (distancia 4.0). |
| rgba(244, 162, 97, 0.05) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? Proximo de --carb-bg (distancia 2.0). |
| rgba(244, 63, 94, 0.12) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(244, 63, 94, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(244, 63, 94, 0.4) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(245, 158, 11, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(245, 158, 11, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(245, 247, 251, 0.96) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --hero-text-primary (distancia 13.1). |
| rgba(245,158,11,0.04) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 18.8). |
| rgba(245,158,11,0.06) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 15.6). |
| rgba(245,158,11,0.1) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 10.8). |
| rgba(245,158,11,0.11) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 10.3). |
| rgba(245,158,11,0.25) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(245,158,11,0.3) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(245,158,11,0.34) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(245,158,11,0) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.06) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.08) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.1) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.12) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.15) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.4) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(245,166,35,0.6) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.05) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.06) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.1) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.2) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.25) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.5) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(247,97,42,0.6) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(248, 249, 255, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(248, 249, 255, 0.7) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-secondary (distancia 13.5). |
| rgba(248, 249, 255, 0.8) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(249, 115, 22, 0.13) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(250, 204, 21, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(250, 204, 21, 0.24) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(250, 204, 21, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(250, 204, 21, 0.38) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(250, 204, 21, 0.55) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.1) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-orange-dim (distancia 4.0). |
| rgba(251, 146, 60, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-orange-dim (distancia 4.0). |
| rgba(251, 146, 60, 0.15) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-orange-dim (distancia 5.9). |
| rgba(251, 146, 60, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-orange-dim (distancia 19.8). |
| rgba(251, 146, 60, 0.25) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.4) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.45) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 146, 60, 0.78) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(251, 191, 36, 0.05) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? Proximo de --warning-bg (distancia 5.9). |
| rgba(255, 125, 125, 0.4) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 159, 10, 0.025) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 18.8). |
| rgba(255, 159, 10, 0.15) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-neat-dim (distancia 5.9). |
| rgba(255, 184, 0, 0.5) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 184, 48, 0.18) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? Proximo de --sup-vitd-glow (distancia 5.9). |
| rgba(255, 184, 48, 0.30) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 184, 48, 0.6) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 184, 48, 0.7) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 220, 100, 0.15) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 220, 100, 0.25) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 220, 100, 0.50) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 23, 68, 0.14) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-subtle (distancia 4.0). |
| rgba(255, 23, 68, 0.3) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --border-red (distancia 15.8). |
| rgba(255, 255, 255, 0.035) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --border-secondary (distancia 1.0). |
| rgba(255, 255, 255, 0.23) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --border-hover (distancia 2.0). |
| rgba(255, 255, 255, 0.36) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-tertiary (distancia 11.9). |
| rgba(255, 255, 255, 0.42) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.48) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.52) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 255, 255, 0.96) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 7.9). |
| rgba(255, 255, 255, 0.97) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 5.9). |
| rgba(255, 255, 255, 0.98) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --text-primary (distancia 4.0). |
| rgba(255, 32, 32, 0.35) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 14.1). |
| rgba(255, 42, 42, 0.04) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 15.8). |
| rgba(255, 42, 42, 0.06) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 11.9). |
| rgba(255, 42, 42, 0.1) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 4.0). |
| rgba(255, 42, 42, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 9.9). |
| rgba(255, 42, 42, 0.48) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0.66) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0.75) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 42, 42, 0) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 48, 48, 0.06) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 14.6). |
| rgba(255, 48, 48, 0.09) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-dim (distancia 10.3). |
| rgba(255, 48, 48, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 8.7). |
| rgba(255, 48, 48, 0.15) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 8.5). |
| rgba(255, 48, 48, 0.16) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 8.7). |
| rgba(255, 48, 48, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 13.0). |
| rgba(255, 48, 48, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-lime-dim (distancia 16.2). |
| rgba(255, 48, 48, 0.28) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 16.2). |
| rgba(255, 48, 48, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 13.0). |
| rgba(255, 48, 48, 0.38) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 10.3). |
| rgba(255, 48, 48, 0.42) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-primary-glow (distancia 16.2). |
| rgba(255, 48, 48, 0.6) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 48, 48, 0.88) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 59, 59, 0.08) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 12.8). |
| rgba(255, 59, 59, 0.1) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 10.8). |
| rgba(255, 59, 59, 0.12) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 10.0). |
| rgba(255, 59, 59, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 10.8). |
| rgba(255, 59, 59, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-accent-glow (distancia 11.7). |
| rgba(255, 59, 59, 0.26) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-accent-glow (distancia 10.2). |
| rgba(255, 59, 59, 0.34) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-violet-glow (distancia 17.4). |
| rgba(255, 59, 59, 0.4) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-violet-glow (distancia 12.7). |
| rgba(255, 59, 59, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 59, 59, 0.52) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 59, 59, 0.65) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 59, 59, 0.7) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 68, 68, 0.85) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255, 68, 68, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-violet (distancia 19.8). |
| rgba(255, 69, 58, 0.065) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-bmr-dim (distancia 10.9). |
| rgba(255, 69, 58, 0.35) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-violet-glow (distancia 14.1). |
| rgba(255, 74, 74, 0.25) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-accent-glow (distancia 16.8). |
| rgba(255, 74, 74, 0.8) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(255,255,255,0.008) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 2.8). |
| rgba(255,255,255,0.012) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card (distancia 2.0). |
| rgba(255,255,255,0.045) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-bg-card-hover (distancia 0.6). |
| rgba(26, 11, 15, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 18.8). |
| rgba(28, 28, 32, 0.95) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --color-bg-card-hover (distancia 10.3). |
| rgba(3,6,20,0.45) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(30, 30, 42, 0.6) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.03) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.04) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.08) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.15) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.25) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.35) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 197, 94, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 211, 238, 0.04) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 15.8). |
| rgba(34, 211, 238, 0.15) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 5.9). |
| rgba(34, 211, 238, 0.18) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --accent-cyan-dim (distancia 11.9). |
| rgba(34, 211, 238, 0.26) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 211, 238, 0.28) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 211, 238, 0.32) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 211, 238, 0.78) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(34, 211, 238, 0) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(35, 18, 22, 0.7) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass (distancia 20.8). |
| rgba(37, 99, 235, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(37, 99, 235, 0.3) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(37, 99, 235, 0.45) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(38, 18, 24, 0.72) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass (distancia 21.9). |
| rgba(45,212,191,0.02) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.05) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.06) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.07) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.08) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.12) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.15) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.2) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0.5) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(45,212,191,0) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? |
| rgba(46, 196, 182, 0.1) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.05) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.06) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.08) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.15) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0.4) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(46,213,115,0) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(52, 211, 153, 0.05) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| rgba(52, 211, 153, 0.12) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| rgba(52, 211, 153, 0.2) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.03) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.04) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.06) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.08) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.25) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(59, 130, 246, 0.3) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(6, 6, 10, 0.95) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-900 (distancia 10.5). |
| rgba(61, 214, 140, 0.05) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-bg (distancia 19.5). |
| rgba(61, 214, 140, 0.06) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-bg (distancia 19.4). |
| rgba(61, 214, 140, 0.07) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-bg (distancia 19.5). |
| rgba(61, 214, 140, 0.08) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-bg (distancia 19.8). |
| rgba(61, 214, 140, 0.1) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 19.8). |
| rgba(61, 214, 140, 0.12) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 19.4). |
| rgba(61, 214, 140, 0.15) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --accent-green-dim (distancia 20.3). |
| rgba(61, 214, 140, 0.2) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? Proximo de --success-glow (distancia 21.8). |
| rgba(61, 214, 140, 0.7) |  | SEM MATCH | 1 | dashboard-presentation.css (1) | SEM MATCH - criar variavel? |
| rgba(61,142,248,0.04) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(61,142,248,0.4) |  | SEM MATCH | 1 | dashboard-simulator.css (1) | SEM MATCH - criar variavel? |
| rgba(74, 222, 128, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --success-glow (distancia 5.9). |
| rgba(74, 222, 128, 0.4) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(74, 222, 128, 0.5) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(74, 222, 128, 0.55) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(8, 8, 12, 0.85) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 4.1). |
| rgba(8, 8, 12, 0.92) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 14.4). |
| rgba(8, 8, 16, 0.85) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 3.0). |
| rgba(8, 8, 16, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 10.3). |
| rgba(8, 8, 8, 0.85) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 7.5). |
| rgba(8, 8, 8, 0.88) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 9.6). |
| rgba(80, 100, 200, 0.04) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(80, 100, 200, 0.08) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(80, 100, 200, 0.14) |  | SEM MATCH | 1 | dashboard-supplements.css (1) | SEM MATCH - criar variavel? |
| rgba(9, 11, 18, 0.9) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 10.4). |
| rgba(9, 9, 11, 0.95) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --bg-base (distancia 10.0). |
| rgba(9,10,20,0.9) |  | SEM MATCH | 1 | dashboard-projection.css (1) | SEM MATCH - criar variavel? Proximo de --bg-glass-heavy (distancia 11.1). |
| rgba(92, 200, 255, 0.08) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-cardio-dim (distancia 15.0). |
| rgba(92, 200, 255, 0.14) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-cardio-dim (distancia 13.4). |
| rgba(92, 200, 255, 0.2) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? Proximo de --tdee-color-cardio-dim (distancia 20.3). |
| rgba(92, 200, 255, 0.22) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(92, 200, 255, 0.24) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(92, 200, 255, 0.26) |  | SEM MATCH | 1 | screens.css (1) | SEM MATCH - criar variavel? |
| rgba(96, 165, 250, 0.05) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| rgba(96, 165, 250, 0.12) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |
| rgba(96, 165, 250, 0.2) |  | SEM MATCH | 1 | dashboard-meals.css (1) | SEM MATCH - criar variavel? |

## Green-neon Candidates (200,255,0)

| Arquivo:linha | Trecho atual | Proposta (fase C) | Observacao |
|---|---|---|---|
| screens.css:47 | background: rgba(200, 255, 0, 0.08); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |
| screens.css:48 | border: 1px solid rgba(200, 255, 0, 0.2); | var(--accent-primary) | Borda/contorno de destaque. |
| screens.css:184 | box-shadow: 0 0 0 0 rgba(200, 255, 0, 0); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:200 | box-shadow: 0 0 40px rgba(200, 255, 0, 0.45), 0 12px 40px rgba(0, 0, 0, 0.4); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:355 | box-shadow: 0 0 18px rgba(200, 255, 0, 0.32); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:420 | border: 1px solid rgba(200, 255, 0, 0.24); | var(--accent-primary) | Borda/contorno de destaque. |
| screens.css:421 | background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(200, 255, 0, 0.08) 100%); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |
| screens.css:422 | box-shadow: 0 0 30px rgba(200, 255, 0, 0.12); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:534 | background: linear-gradient(135deg, rgba(200, 255, 0, 0.06) 0%, transparent 60%); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |
| screens.css:543 | box-shadow: 0 14px 28px rgba(0, 0, 0, 0.42), 0 0 22px rgba(200, 255, 0, 0.3); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:552 | background: rgba(200, 255, 0, 0.05); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |
| screens.css:553 | box-shadow: 0 0 0 1px var(--accent-lime), 0 0 30px rgba(200, 255, 0, 0.28), 0 0 60px rgba(200, 255, 0, 0.12); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:553 | box-shadow: 0 0 0 1px var(--accent-lime), 0 0 30px rgba(200, 255, 0, 0.28), 0 0 60px rgba(200, 255, 0, 0.12); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:581 | background: linear-gradient(145deg, rgba(200, 255, 0, 0.22) 0%, transparent 65%); | var(--accent-primary-glow) | Background/accent intenso. |
| screens.css:1036 | box-shadow: 0 0 30px rgba(200, 255, 0, 0.4); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:1090 | radial-gradient(ellipse 50% 50% at 85% 50%, rgba(200, 255, 0, 0.12) 0%, transparent 70%), | var(--accent-primary-dim) | Background/accent medio. |
| screens.css:1388 | box-shadow: 0 0 20px rgba(200, 255, 0, 0.35); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:1493 | background: linear-gradient(90deg, transparent, rgba(200, 255, 0, 0.3), transparent); | var(--accent-primary-glow) | Background/accent intenso. |
| screens.css:1823 | text-shadow: 0 0 0 rgba(200, 255, 0, 0); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:1828 | text-shadow: 0 0 18px rgba(200, 255, 0, 0.55); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:1833 | text-shadow: 0 0 0 rgba(200, 255, 0, 0); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:1875 | background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), rgba(200, 255, 0, 0.4), transparent); | var(--accent-primary-glow) | Background/accent intenso. |
| screens.css:2039 | background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(200, 255, 0, 0.04) 100%); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |
| screens.css:2060 | color: rgba(200, 255, 0, 0.08); | var(--accent-primary) | Vestigio green-neon; migrar para familia accent primaria. |
| screens.css:2114 | box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(200, 255, 0, 0.15); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:2217 | background: conic-gradient(from 0deg, rgba(139, 92, 246, 0.5), rgba(200, 255, 0, 0.6), rgba(139, 92, 246, 0.5)); | var(--accent-primary-glow) | Background/accent intenso. |
| screens.css:2398 | border-color: rgba(200, 255, 0, 0.25); | var(--accent-primary) | Borda/contorno de destaque. |
| screens.css:2640 | box-shadow: 0 0 10px rgba(200, 255, 0, 0.5); | var(--accent-primary-glow) | Glow forte, usar token de glow. |
| screens.css:2664 | box-shadow: 0 0 0 1px rgba(200, 255, 0, 0.2), 0 8px 32px rgba(200, 255, 0, 0.1), 0 0 60px rgba(200, 255, 0, 0.06); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:2664 | box-shadow: 0 0 0 1px rgba(200, 255, 0, 0.2), 0 8px 32px rgba(200, 255, 0, 0.1), 0 0 60px rgba(200, 255, 0, 0.06); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:2664 | box-shadow: 0 0 0 1px rgba(200, 255, 0, 0.2), 0 8px 32px rgba(200, 255, 0, 0.1), 0 0 60px rgba(200, 255, 0, 0.06); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:2796 | border-color: rgba(200, 255, 0, 0.2); | var(--accent-primary) | Borda/contorno de destaque. |
| screens.css:3025 | border-color: rgba(200, 255, 0, 0.2); | var(--accent-primary) | Borda/contorno de destaque. |
| screens.css:3071 | background: linear-gradient(135deg, rgba(34, 211, 238, 0.06) 0%, rgba(200, 255, 0, 0.03) 100%); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |
| screens.css:3200 | box-shadow: 0 0 0 1px var(--accent-lime), 0 0 24px rgba(200, 255, 0, 0.22); | var(--accent-primary-dim) | Glow suave, usar token dim. |
| screens.css:3213 | background: radial-gradient(circle at 50% 26%, rgba(200, 255, 0, 0.28) 0%, rgba(240, 240, 248, 0.07) 68%, rgba(240, 240, 248, 0.03) 100%); | var(--accent-primary-glow) | Background/accent intenso. |
| screens.css:3264 | border-color: rgba(200, 255, 0, 0.26); | var(--accent-primary) | Borda/contorno de destaque. |
| screens.css:3265 | background: linear-gradient(135deg, rgba(200, 255, 0, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%); | var(--accent-red-subtle) | Background/accent sutil (alpha baixo). |

## Notas de Classificacao

- Match EXATO: equivalencia matematica apos normalizacao (hex/rgb/hsl -> rgba canonico).
- Ambiguo por contexto: mesma cor em mais de um token; escolha feita por semantica de propriedade + contexto do arquivo/seletor.
- SEM MATCH: nenhuma variavel do tokens.css com equivalencia exata; nao substituir automaticamente nas fases seguintes.
- Gate ativo: este documento encerra a Fase A. Fases B/C exigem aprovacao explicita.
