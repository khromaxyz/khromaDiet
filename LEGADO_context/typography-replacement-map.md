# Typography Replacement Map (Fase A)

> Documento de inventario e proposta. Nenhum CSS de producao foi alterado nesta fase.

## Resumo Geral

- CSS escaneados em `src/styles`: **12**
- `font-size` hardcoded: **746** ocorrencias, **96** valores unicos
- `font-weight` hardcoded: **433** ocorrencias, **7** valores unicos
- `letter-spacing` hardcoded: **314** ocorrencias, **39** valores unicos
- `line-height` hardcoded: **123** ocorrencias, **20** valores unicos
- `font-family` hardcoded: **1** ocorrencias, **1** valores unicos
- `font` shorthand hardcoded: **0** ocorrencias, **0** valores unicos

## Distribuicao por Arquivo (hardcoded tipografico)

| Arquivo | font-size | font-weight | letter-spacing | line-height | font-family |
|---|---|---|---|---|---|
| animations.css | 0 | 0 | 0 | 0 | 0 |
| base.css | 0 | 0 | 0 | 0 | 0 |
| dashboard-final.css | 58 | 40 | 28 | 10 | 0 |
| dashboard-macros.css | 64 | 52 | 26 | 9 | 0 |
| dashboard-meals.css | 38 | 27 | 17 | 8 | 0 |
| dashboard-presentation.css | 244 | 130 | 91 | 32 | 0 |
| dashboard-projection.css | 67 | 51 | 37 | 18 | 1 |
| dashboard-simulator.css | 57 | 45 | 31 | 8 | 0 |
| dashboard-supplements.css | 11 | 0 | 30 | 11 | 0 |
| index.css | 0 | 0 | 0 | 0 | 0 |
| screens.css | 207 | 88 | 54 | 27 | 0 |
| tokens.css | 0 | 0 | 0 | 0 | 0 |

## Tabela 1 - Font-size Mapping

| Valor hardcoded | Token tokens.css | Diferenca (px) | Ocorrencias | Arquivos principais | Acao | Observacao |
|---|---|---|---|---|---|---|
| 11px | --text-xs (0.6875rem ~= 11px) | 0px | 127 | screens.css (44), dashboard-presentation.css (32), dashboard-projection.css (17) | SUBSTITUIR |  |
| 10px | --text-xs (0.6875rem ~= 11px) | 1px | 96 | dashboard-presentation.css (41), dashboard-simulator.css (16), screens.css (14) | RISCO VISUAL |  |
| 12px | --text-xs (0.6875rem ~= 11px) | 1px | 96 | screens.css (40), dashboard-presentation.css (18), dashboard-projection.css (12) | RISCO VISUAL |  |
| 13px | --text-sm (0.8125rem ~= 13px) | 0px | 63 | screens.css (27), dashboard-presentation.css (12), dashboard-final.css (7) | SUBSTITUIR |  |
| 16px | --text-base (0.9375rem ~= 15px) | 1px | 34 | screens.css (12), dashboard-presentation.css (8), dashboard-macros.css (5) | RISCO VISUAL |  |
| 14px | --text-sm (0.8125rem ~= 13px) | 1px | 32 | screens.css (11), dashboard-presentation.css (8), dashboard-macros.css (4) | RISCO VISUAL |  |
| 9px | --text-xs (0.6875rem ~= 11px) | 2px | 24 | dashboard-presentation.css (19), dashboard-simulator.css (3), dashboard-final.css (2) | NAO SUBSTITUIR (display/especial) |  |
| 15px | --text-base (0.9375rem ~= 15px) | 0px | 19 | screens.css (12), dashboard-final.css (2), dashboard-presentation.css (2) | SUBSTITUIR |  |
| 20px | --text-xl (1.25rem ~= 20px) | 0px | 19 | dashboard-presentation.css (7), dashboard-macros.css (5), dashboard-simulator.css (3) | SUBSTITUIR |  |
| 18px | --text-lg (1.0625rem ~= 17px) | 1px | 19 | screens.css (9), dashboard-presentation.css (5), dashboard-macros.css (4) | RISCO VISUAL |  |
| 22px | --text-xl (1.25rem ~= 20px) | 2px | 17 | dashboard-presentation.css (6), dashboard-simulator.css (3), screens.css (3) | NAO SUBSTITUIR |  |
| 0.7rem | --text-xs (0.6875rem ~= 11px) | 0.2px | 16 | dashboard-meals.css (9), dashboard-presentation.css (7) | RISCO VISUAL |  |
| 28px | --text-2xl (1.5625rem ~= 25px) | 3px | 12 | dashboard-presentation.css (5), screens.css (4), dashboard-macros.css (2) | NAO SUBSTITUIR |  |
| 0.75rem | --text-xs (0.6875rem ~= 11px) | 1px | 11 | dashboard-presentation.css (7), dashboard-meals.css (3), dashboard-supplements.css (1) | RISCO VISUAL |  |
| 24px | --text-2xl (1.5625rem ~= 25px) | 1px | 10 | dashboard-presentation.css (5), dashboard-macros.css (2), dashboard-final.css (1) | RISCO VISUAL |  |
| 0.65rem | --text-xs (0.6875rem ~= 11px) | 0.6px | 8 | dashboard-meals.css (4), dashboard-presentation.css (4) | RISCO VISUAL |  |
| 32px | --text-3xl (2rem ~= 32px) | 0px | 6 | screens.css (3), dashboard-final.css (1), dashboard-macros.css (1) | SUBSTITUIR |  |
| 8px | --text-xs (0.6875rem ~= 11px) | 3px | 6 | dashboard-presentation.css (5), dashboard-macros.css (1) | NAO SUBSTITUIR (display/especial) |  |
| 0.72rem | --text-xs (0.6875rem ~= 11px) | 0.52px | 6 | dashboard-meals.css (4), dashboard-presentation.css (2) | RISCO VISUAL |  |
| 26px | --text-2xl (1.5625rem ~= 25px) | 1px | 5 | dashboard-final.css (1), dashboard-macros.css (1), dashboard-presentation.css (1) | RISCO VISUAL |  |
| 0.85rem | --text-sm (0.8125rem ~= 13px) | 0.6px | 5 | dashboard-presentation.css (3), dashboard-meals.css (2) | RISCO VISUAL |  |
| 34px | --text-3xl (2rem ~= 32px) | 2px | 5 | screens.css (4), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 0.625rem | --text-xs (0.6875rem ~= 11px) | 1px | 5 | dashboard-supplements.css (5) | RISCO VISUAL |  |
| 40px | --text-4xl (2.75rem ~= 44px) | 4px | 4 | screens.css (2), dashboard-macros.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 1.1rem | --text-lg (1.0625rem ~= 17px) | 0.6px | 4 | dashboard-meals.css (2), dashboard-presentation.css (2) | RISCO VISUAL |  |
| 42px | --text-4xl (2.75rem ~= 44px) | 2px | 3 | dashboard-macros.css (1), dashboard-presentation.css (1), screens.css (1) | NAO SUBSTITUIR |  |
| 17px | --text-lg (1.0625rem ~= 17px) | 0px | 3 | dashboard-presentation.css (2), dashboard-macros.css (1) | SUBSTITUIR |  |
| 52px | --text-5xl (3.5rem ~= 56px) | 4px | 3 | dashboard-macros.css (1), dashboard-presentation.css (1), dashboard-simulator.css (1) | NAO SUBSTITUIR (display/especial) |  |
| 0.8rem | --text-sm (0.8125rem ~= 13px) | 0.2px | 3 | dashboard-presentation.css (2), dashboard-meals.css (1) | RISCO VISUAL |  |
| 1.15rem | --text-lg (1.0625rem ~= 17px) | 1.4px | 3 | dashboard-meals.css (2), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 0.5625rem | --text-xs (0.6875rem ~= 11px) | 2px | 3 | dashboard-supplements.css (3) | NAO SUBSTITUIR (display/especial) |  |
| clamp(48px, 8vw, 80px) |  | - | 3 | screens.css (3) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(32px, 3.5vw, 48px) |  | - | 2 | dashboard-final.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 38px | --text-3xl (2rem ~= 32px) | 6px | 2 | dashboard-final.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 44px | --text-4xl (2.75rem ~= 44px) | 0px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | SUBSTITUIR |  |
| 1.5rem | --text-2xl (1.5625rem ~= 25px) | 1px | 2 | dashboard-meals.css (2) | RISCO VISUAL |  |
| 0.55rem | --text-xs (0.6875rem ~= 11px) | 2.2px | 2 | dashboard-meals.css (2) | NAO SUBSTITUIR (display/especial) |  |
| 1rem | --text-base (0.9375rem ~= 15px) | 1px | 2 | dashboard-meals.css (1), dashboard-presentation.css (1) | RISCO VISUAL |  |
| clamp(48px, 6vw, 88px) |  | - | 2 | dashboard-presentation.css (2) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 0.6rem | --text-xs (0.6875rem ~= 11px) | 1.4px | 2 | dashboard-presentation.css (2) | NAO SUBSTITUIR (display/especial) |  |
| 30px | --text-3xl (2rem ~= 32px) | 2px | 2 | dashboard-presentation.css (2) | NAO SUBSTITUIR |  |
| 48px | --text-4xl (2.75rem ~= 44px) | 4px | 2 | screens.css (2) | NAO SUBSTITUIR |  |
| 36px | --text-3xl (2rem ~= 32px) | 4px | 2 | screens.css (2) | NAO SUBSTITUIR |  |
| clamp(34px, 3.4vw, 48px) |  | - | 2 | screens.css (2) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(36px, 5vw, 60px) |  | - | 1 | dashboard-final.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(15px, 2vw, 18px) |  | - | 1 | dashboard-final.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(28px, 3.5vw, 44px) |  | - | 1 | dashboard-final.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 1.75rem | --text-2xl (1.5625rem ~= 25px) | 3px | 1 | dashboard-meals.css (1) | NAO SUBSTITUIR |  |
| 2rem | --text-3xl (2rem ~= 32px) | 0px | 1 | dashboard-meals.css (1) | SUBSTITUIR |  |
| 0.82rem | --text-sm (0.8125rem ~= 13px) | 0.12px | 1 | dashboard-meals.css (1) | RISCO VISUAL |  |
| 2.2rem | --text-3xl (2rem ~= 32px) | 3.2px | 1 | dashboard-meals.css (1) | NAO SUBSTITUIR |  |
| 1.7rem | --text-2xl (1.5625rem ~= 25px) | 2.2px | 1 | dashboard-meals.css (1) | NAO SUBSTITUIR |  |
| clamp(32px, 3.7vw, 48px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(18px, 2.2vw, 28px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(14px, 1.3vw, 17px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(46px, 5vw, 72px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(46px, 12vw, 70px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(44px, 4.8vw, 64px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(44px, 5.2vw, 68px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(1.5rem, 2.2vw, 2rem) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 0.95rem | --text-base (0.9375rem ~= 15px) | 0.2px | 1 | dashboard-presentation.css (1) | RISCO VISUAL |  |
| clamp(2rem, 3vw, 2.75rem) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 2.5rem | --text-4xl (2.75rem ~= 44px) | 4px | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 0.68rem | --text-xs (0.6875rem ~= 11px) | 0.12px | 1 | dashboard-presentation.css (1) | RISCO VISUAL |  |
| clamp(1.75rem, 2.5vw, 2.25rem) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 0.58rem | --text-xs (0.6875rem ~= 11px) | 1.72px | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (display/especial) |  |
| 1.85rem | --text-3xl (2rem ~= 32px) | 2.4px | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| clamp(1.4rem, 2.2vw, 1.8rem) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 1.6rem | --text-2xl (1.5625rem ~= 25px) | 0.6px | 1 | dashboard-presentation.css (1) | RISCO VISUAL |  |
| clamp(1.1rem, 1.8vw, 1.5rem) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 1.4rem | --text-xl (1.25rem ~= 20px) | 2.4px | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 21px | --text-xl (1.25rem ~= 20px) | 1px | 1 | dashboard-presentation.css (1) | RISCO VISUAL |  |
| clamp(54px, 8vw, 88px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(28px, 10vw, 40px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(48px, 14vw, 72px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(28px, 4vw, 40px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(36px, 9vw, 56px) |  | - | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(34px, 2.8vw, 54px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(22px, 2vw, 34px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(26px, 1.65vw, 32px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(44px, 3.2vw, 68px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(34px, 2vw, 46px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(44px, 2.45vw, 52px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 31px | --text-3xl (2rem ~= 32px) | 1px | 1 | dashboard-projection.css (1) | RISCO VISUAL |  |
| clamp(30px, 5vw, 36px) |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(26px, 3vw, 36px) |  | - | 1 | dashboard-simulator.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 0.5rem | --text-xs (0.6875rem ~= 11px) | 3px | 1 | dashboard-supplements.css (1) | NAO SUBSTITUIR (display/especial) |  |
| clamp(52px, 8vw, 96px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(16px, 2.5vw, 20px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(24px, 4vw, 38px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(28px, 5vw, 48px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| 46px | --text-4xl (2.75rem ~= 44px) | 2px | 1 | screens.css (1) | NAO SUBSTITUIR |  |
| 50px | --text-4xl (2.75rem ~= 44px) | 6px | 1 | screens.css (1) | NAO SUBSTITUIR (display/especial) |  |
| clamp(36px, 4.8vw, 42px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(16px, 1.6vw, 21px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |
| clamp(34px, 5vw, 48px) |  | - | 1 | screens.css (1) | NAO SUBSTITUIR (regra calc/clamp) | valor em funcao responsiva |

## Tabela 2 - Font-weight Mapping

| Valor hardcoded | Token | Ocorrencias | Acao |
|---|---|---|---|
| 700 | --weight-bold (700) | 210 | SUBSTITUIR |
| 600 | --weight-semibold (600) | 81 | SUBSTITUIR |
| 500 | --weight-medium (500) | 58 | SUBSTITUIR |
| 800 |  | 53 | NAO SUBSTITUIR |
| 900 | --weight-black (900) | 21 | SUBSTITUIR |
| 400 | --weight-regular (400) | 6 | SUBSTITUIR |
| 300 | --weight-light (300) | 4 | SUBSTITUIR |

## Escala Proposta - Tracking (novo em tokens.css)

| Token proposto | Valor |
|---|---|
| --tracking-neg-xl | -1px |
| --tracking-neg-lg | -0.5px |
| --tracking-neg-md | -0.04em |
| --tracking-neg-sm | -0.03em |
| --tracking-neg-xs | -0.02em |
| --tracking-tight | -0.01em |
| --tracking-normal | 0em |
| --tracking-wide | 0.02em |
| --tracking-wider | 0.04em |
| --tracking-strong | 0.06em |
| --tracking-caps | 0.08em |
| --tracking-caps-wide | 0.1em |
| --tracking-caps-xwide | 0.12em |
| --tracking-caps-max | 0.15em |
| --tracking-px-wide | 0.5px |
| --tracking-px-wider | 1px |

## Tabela 3 - Letter-spacing Mapping

| Valor hardcoded | Token proposto | Diferenca | Ocorrencias | Arquivos principais | Acao | Observacao |
|---|---|---|---|---|---|---|
| 0.1em |  | - | 35 | screens.css (11), dashboard-presentation.css (7), dashboard-projection.css (6) | NAO SUBSTITUIR | formato nao suportado |
| 0.08em |  | - | 32 | dashboard-presentation.css (9), screens.css (9), dashboard-meals.css (4) | NAO SUBSTITUIR | formato nao suportado |
| -0.02em |  | - | 25 | dashboard-presentation.css (5), screens.css (5), dashboard-final.css (4) | NAO SUBSTITUIR | formato nao suportado |
| 0.12em |  | - | 23 | screens.css (8), dashboard-supplements.css (6), dashboard-presentation.css (5) | NAO SUBSTITUIR | formato nao suportado |
| 0.06em |  | - | 20 | screens.css (6), dashboard-projection.css (5), dashboard-simulator.css (4) | NAO SUBSTITUIR | formato nao suportado |
| -0.03em |  | - | 17 | dashboard-simulator.css (4), dashboard-final.css (3), dashboard-projection.css (3) | NAO SUBSTITUIR | formato nao suportado |
| -0.04em |  | - | 15 | dashboard-presentation.css (7), dashboard-meals.css (4), dashboard-final.css (2) | NAO SUBSTITUIR | formato nao suportado |
| 0.02em |  | - | 15 | dashboard-presentation.css (7), screens.css (4), dashboard-projection.css (2) | NAO SUBSTITUIR | formato nao suportado |
| 0.15em |  | - | 13 | dashboard-final.css (4), dashboard-presentation.css (4), screens.css (4) | NAO SUBSTITUIR | formato nao suportado |
| 0.05em |  | - | 13 | dashboard-projection.css (4), dashboard-final.css (3), dashboard-meals.css (3) | NAO SUBSTITUIR | formato nao suportado |
| -0.5px | --tracking-neg-lg (-0.5px) | 0px | 10 | dashboard-presentation.css (6), dashboard-macros.css (4) | SUBSTITUIR |  |
| 1px | --tracking-px-wider (1px) | 0px | 10 | dashboard-macros.css (5), dashboard-presentation.css (5) | SUBSTITUIR |  |
| 0.5px | --tracking-px-wide (0.5px) | 0px | 10 | dashboard-macros.css (5), dashboard-presentation.css (5) | SUBSTITUIR |  |
| 0.04em |  | - | 9 | dashboard-presentation.css (3), dashboard-simulator.css (2), dashboard-supplements.css (2) | NAO SUBSTITUIR | formato nao suportado |
| -1px | --tracking-neg-xl (-1px) | 0px | 7 | dashboard-presentation.css (4), dashboard-macros.css (3) | SUBSTITUIR |  |
| -0.01em |  | - | 6 | dashboard-simulator.css (2), dashboard-supplements.css (2), dashboard-final.css (1) | NAO SUBSTITUIR | formato nao suportado |
| 0.01em |  | - | 5 | dashboard-presentation.css (2), dashboard-final.css (1), dashboard-projection.css (1) | NAO SUBSTITUIR | formato nao suportado |
| 0.14em |  | - | 5 | dashboard-presentation.css (2), dashboard-simulator.css (1), dashboard-supplements.css (1) | NAO SUBSTITUIR | formato nao suportado |
| -0.3px | --tracking-neg-lg (-0.5px) | 0.2px | 4 | dashboard-macros.css (2), dashboard-presentation.css (2) | RISCO VISUAL |  |
| 0.03em |  | - | 4 | dashboard-presentation.css (3), dashboard-projection.css (1) | NAO SUBSTITUIR | formato nao suportado |
| 0.2em |  | - | 3 | dashboard-final.css (3) | NAO SUBSTITUIR | formato nao suportado |
| 0.18em |  | - | 3 | dashboard-final.css (2), dashboard-presentation.css (1) | NAO SUBSTITUIR | formato nao suportado |
| -0.025em |  | - | 3 | dashboard-supplements.css (2), dashboard-projection.css (1) | NAO SUBSTITUIR | formato nao suportado |
| 2px | --tracking-px-wider (1px) | 1px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| -1.5px | --tracking-neg-xl (-1px) | 0.5px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 1.2px | --tracking-px-wider (1px) | 0.2px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | RISCO VISUAL |  |
| -2px | --tracking-neg-xl (-1px) | 1px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| -3px | --tracking-neg-xl (-1px) | 2px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 0.3px | --tracking-px-wide (0.5px) | 0.2px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | RISCO VISUAL |  |
| 0.8px | --tracking-px-wider (1px) | 0.2px | 2 | dashboard-macros.css (1), dashboard-presentation.css (1) | RISCO VISUAL |  |
| 0 | --tracking-normal (0em) | 0px | 2 | dashboard-presentation.css (1), screens.css (1) | SUBSTITUIR |  |
| 0.012em |  | - | 2 | dashboard-projection.css (2) | NAO SUBSTITUIR | formato nao suportado |
| 0.11em |  | - | 2 | dashboard-projection.css (2) | NAO SUBSTITUIR | formato nao suportado |
| 0.09em |  | - | 2 | screens.css (2) | NAO SUBSTITUIR | formato nao suportado |
| 0.25em |  | - | 1 | dashboard-final.css (1) | NAO SUBSTITUIR | formato nao suportado |
| -1.3px | --tracking-neg-xl (-1px) | 0.3px | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| -0.028em |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR | formato nao suportado |
| 0.015em |  | - | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR | formato nao suportado |
| -0.035em |  | - | 1 | screens.css (1) | NAO SUBSTITUIR | formato nao suportado |

## Escala Proposta - Leading (novo em tokens.css)

| Token proposto | Valor |
|---|---|
| --leading-none | 1 |
| --leading-tight | 1.1 |
| --leading-snug | 1.2 |
| --leading-normal | 1.3 |
| --leading-comfy | 1.4 |
| --leading-relaxed | 1.5 |
| --leading-loose | 1.6 |
| --leading-looser | 1.7 |
| --leading-display | 0.95 |

## Tabela 4 - Line-height Mapping

| Valor hardcoded | Token proposto | Diferenca | Ocorrencias | Arquivos principais | Acao | Observacao |
|---|---|---|---|---|---|---|
| 1 | --leading-none (1) | 0 | 46 | screens.css (14), dashboard-presentation.css (12), dashboard-meals.css (5) | SUBSTITUIR |  |
| 1.6 | --leading-loose (1.6) | 0 | 13 | screens.css (5), dashboard-projection.css (3), dashboard-supplements.css (2) | SUBSTITUIR |  |
| 1.5 | --leading-relaxed (1.5) | 0 | 11 | dashboard-final.css (2), dashboard-projection.css (2), dashboard-simulator.css (2) | SUBSTITUIR |  |
| 1.1 | --leading-tight (1.1) | 0 | 8 | dashboard-final.css (2), dashboard-presentation.css (2), dashboard-macros.css (1) | SUBSTITUIR |  |
| 1.3 | --leading-normal (1.3) | 0 | 7 | dashboard-presentation.css (3), dashboard-macros.css (2), dashboard-projection.css (2) | SUBSTITUIR |  |
| 1.4 | --leading-comfy (1.4) | 0 | 6 | dashboard-presentation.css (3), screens.css (2), dashboard-projection.css (1) | SUBSTITUIR |  |
| 1.7 | --leading-looser (1.7) | 0 | 5 | dashboard-final.css (2), dashboard-macros.css (1), dashboard-presentation.css (1) | SUBSTITUIR |  |
| 1.2 | --leading-snug (1.2) | 0 | 4 | screens.css (2), dashboard-meals.css (1), dashboard-presentation.css (1) | SUBSTITUIR |  |
| 0.95 | --leading-display (0.95) | 0 | 4 | dashboard-projection.css (2), dashboard-presentation.css (1), screens.css (1) | SUBSTITUIR |  |
| 1.65 | --leading-loose (1.6) | 0.05 | 3 | dashboard-final.css (1), dashboard-presentation.css (1), dashboard-simulator.css (1) | RISCO VISUAL |  |
| 0.98 | --leading-none (1) | 0.02 | 3 | dashboard-projection.css (2), dashboard-presentation.css (1) | RISCO VISUAL |  |
| 1.55 | --leading-relaxed (1.5) | 0.05 | 3 | dashboard-supplements.css (3) | NAO SUBSTITUIR |  |
| 1.15 | --leading-tight (1.1) | 0.05 | 2 | dashboard-presentation.css (1), dashboard-supplements.css (1) | RISCO VISUAL |  |
| 1.05 | --leading-none (1) | 0.05 | 2 | dashboard-supplements.css (1), screens.css (1) | NAO SUBSTITUIR |  |
| 1.35 | --leading-comfy (1.4) | 0.05 | 1 | dashboard-presentation.css (1) | RISCO VISUAL |  |
| 1.25 | --leading-snug (1.2) | 0.05 | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 1.45 | --leading-comfy (1.4) | 0.05 | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 0.86 | --leading-display (0.95) | 0.09 | 1 | dashboard-presentation.css (1) | NAO SUBSTITUIR |  |
| 1.04 | --leading-none (1) | 0.04 | 1 | dashboard-projection.css (1) | RISCO VISUAL |  |
| 0.88 | --leading-display (0.95) | 0.07 | 1 | dashboard-projection.css (1) | NAO SUBSTITUIR |  |

## Tabela 5 - Font-family Mapping

| Valor hardcoded | Token candidato | Match | Ocorrencias | Acao |
|---|---|---|---|---|
| 'Segoe UI', system-ui, -apple-system, sans-serif |  | SEM MATCH | 1 | NAO SUBSTITUIR |

## Regras Aplicadas Nesta Fase

- Base de conversao: **1rem = 16px**.
- `font-size` em `calc()`/`clamp()` marcado como `NAO SUBSTITUIR (regra)`.
- `font` shorthand nao foi encontrado (0 ocorrencias hardcoded).
- Tolerancia para `letter-spacing`/`line-height`: **estrita** (match exato para `SUBSTITUIR`).
- Gate ativo: este documento encerra a Fase A; Fases B/C dependem de aprovacao explicita.