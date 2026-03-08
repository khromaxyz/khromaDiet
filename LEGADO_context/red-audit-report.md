# Auditoria Final de Vermelho/Neon (Obsidian + Emerald)

Gerado em: 2026-03-04T17:18:42-03:00

## Escopo
- `src/styles/**/*.css`
- `src/**/*.ts`
- `src/**/*.tsx`
- `src/**/*.generated.ts`
- `src/**/*.svg`

## Baseline (pre-correcao, conforme auditoria anterior)
- CSS (`src/styles`): `10` hex + `10` rgba + `3` neon + `58` ocorrencias com `red` em propriedades/vars.
- TS/TSX (`src`): `11` hex + `24` rgba + `6` style-value/red.
- `*.generated.ts`: `31` ocorrencias.

## Resultado dos scans finais (mesmos padroes do plano)
| Scan | Contagem | Observacao |
|---|---:|---|
| 1.1 CSS hex reds | 6 | 5 em comentarios historicos + `--error-color: #ef4444` semantico |
| 1.1 CSS rgba reds | 4 | 100% em comentarios historicos |
| 1.1 CSS neon legado | 0 | limpo |
| 1.1 CSS `red` em propriedades | 28 | nomes legados (`--accent-red*`, `--glow-red`) com valor emerald |
| 1.2 TS/TSX hex reds | 0 | limpo |
| 1.2 TS/TSX rgba reds | 0 | limpo |
| 1.2 TS/TSX style-value/red | 3 | `#ff6b00`/`#ffb830` (laranja/gold), nao vermelho |
| 1.2 TS/TSX color identifiers | 0 | limpo |
| 1.2 TS/TSX neon legado | 0 | limpo |
| 1.3 `.generated.ts` | 41 | falso-positivo por texto contendo `red` (ex.: `Reducao`, `hoveredWeek`, classe `type-red`) |
| 1.4 SVG inline | 0 | limpo |
| 1.4 SVG files | 0 | limpo |
| 1.5 catch-all `#ff....` | 13 | comentarios + tons orange/gold (`#ff6b00`, `#ff9f0a`) |

## Verificacao de acionaveis (sem comentarios)
Foi executada uma checagem adicional removendo comentarios e validando apenas padroes de cor proibidos.

Resultado: `TOTAL_ACTIONABLE=0`

Ou seja: nao restou vermelho/coral/salmon/crimson hardcoded acionavel em `src/`, exceto vermelho semantico de erro (`--error-color`).

## Residuos permitidos
- `src/styles/tokens.css` -> `--error-color: #ef4444` (semantico de erro).
- Nomes legados como `--accent-red*`, `.type-red`, `.milestone-tag.red` permanecem apenas como identificadores; valores visuais estao em emerald/gold.

## Saida completa dos scans
- Arquivo bruto com todas as linhas retornadas pelos scans: `.context/final-red-audit-raw.txt`
