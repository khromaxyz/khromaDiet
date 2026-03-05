# Mapeamento de Substituicao - Correcao Final (Zero Vermelho Visivel)

Gerado em: 2026-03-04T17:19:10-03:00

## Regras aplicadas
| Padrao | Substituicao |
|---|---|
| `#ff2a2a`, `#e63946`, `#e8293a`, `#ff3333`, `#ff4444`, `#ff2b2b`, `#e8001d`, `#e02020` | `#10b981` |
| `#ff4d5a`, `#ff6b76`, `#ff6b7a`, `#ff8a95`, `#ff9aa6`, `#ff8c96`, `#ff8b98`, `#ff6c7d`, `#ff7676`, `#ff6b6b` | `#34d399` / `#6ee7b7` (highlights claros) |
| `#7f1d1d`, `#cc0000`, `#b91c1c` | `#047857` |
| `#ff3030`, `#ff3b3b`, `#ff2020`, `#ff6565`, `#ff4757` | `#10b981` |
| `rgba(255,42,42,a)`, `rgba(232,41,58,a)`, `rgba(230,57,70,a)`, `rgba(255,68,68,a)` | `rgba(16,185,129,a)` |
| `rgba(200,255,0,a)`, `rgb(200,255,0)`, `#c8ff00` | equivalente emerald |
| `color/background/border/fill/stroke: red` | `var(--accent-primary)` ou `#10b981` |

## Contagem por familia de padrao (HEAD -> atual)
| Familia | Antes | Depois | Substituidas |
|---|---:|---:|---:|
| `#ff2a2a` family | 52 | 9 | 43 |
| coral/salmon claros | 25 | 1 | 24 |
| dark reds | 4 | 0 | 4 |
| bright reds legados | 11 | 0 | 11 |
| rgba reds | 263 | 6 | 257 |
| neon verde legado | 39 | 0 | 39 |
| `red` em style value | 1 | 0 | 1 |

## Totais executados por tipo
| Tipo | Substituicoes |
|---|---:|
| CSS de secao (`src/styles/*.css`, sem `tokens.css/base.css/index.css`) | 293 |
| CSS de tokens/base (`tokens.css` + suporte) | 36 |
| TS/TSX (nao generated) | 22 |
| `.generated.ts` | 28 |
| SVG | 0 |

## Arquivos com maior volume de substituicao
| Arquivo | Tipo | Substituicoes |
|---|---|---:|
| `src/styles/screens.css` | CSS | 118 |
| `src/styles/dashboard-presentation.css` | CSS | 46 |
| `src/styles/dashboard-projection.css` | CSS | 44 |
| `src/styles/dashboard-simulator.css` | CSS | 44 |
| `src/styles/tokens.css` | CSS | 36 |
| `src/components/screens/dashboard/sections/presentation/projectionLegacy.generated.ts` | generated | 17 |
| `src/styles/dashboard-final.css` | CSS | 16 |
| `src/styles/dashboard-meals.css` | CSS | 14 |

## Mapeamento por subsistema (resumo)
| Subsistema | Arquivos principais | Decisao |
|---|---|---|
| Projection chart React | `ProjectionChart.tsx` | vermelho/coral -> emerald |
| Presentation slides React | `WelcomeSlide.tsx`, `GoalSlide.tsx`, `MacrosSlide.tsx` | stops/strokes e gradients -> emerald |
| Presentation generated | `projectionLegacy.generated.ts`, `mealsLegacy.generated.ts`, `simulatorLegacy.generated.ts`, `supplementsLegacy.generated.ts`, `finalLegacy.generated.ts` | inline styles hardcoded -> emerald |
| Profile/avatar | `ProfileAvatar.tsx`, `src/lib/profiles/constants.ts` | paletas vermelhas -> emerald/dark-emerald |
| CSS de secao | `dashboard-*.css`, `screens.css` | hardcoded red/coral/neon -> emerald equivalents |

## Excecoes mantidas
- `#ef4444/#dc2626/#f87171` apenas em contexto semantico de erro/destrutivo.
- Nomes legados (`type-red`, `--accent-red*`) preservados quando o valor visual final e emerald.
