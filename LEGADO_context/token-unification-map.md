# Token Unification Map (Fase A)

> Este documento cobre somente inventario e classificacao. Nenhum CSS de producao foi alterado nesta fase.

## Resumo do inventario

- CSS escaneados: **12**
- Declaracoes de variaveis: **688**
- Nomes unicos totais: **391**
- Nomes unicos na tabela principal (6 sistemas): **309**
- Nomes unicos no apendice (fora dos 6 sistemas): **82**
- Acoes na tabela principal: **RENOMEAR -> PADRAO=21**, **PROMOVER=245**, **UNIFICAR=1**, **MANTER OVERRIDE=42**

## Tabela principal (6 sistemas alvo)

| Variavel | Valor em tokens.css | Valor em macros | Valor em final | Valor em supplements | Valor em simulator | Valor em presentation | Acao |
|---|---|---|---|---|---|---|---|
| --accent |  |  |  |  |  | #ff1744 \|\| var(--hero-accent) | PROMOVER |
| --accent-amber |  |  |  |  | #f5a623 |  | PROMOVER |
| --accent-blue |  |  |  |  | #3d8ef8 |  | PROMOVER |
| --accent-cyan | #22d3ee |  |  |  |  |  | MANTER OVERRIDE |
| --accent-cyan-dim | rgba(34, 211, 238, 0.12) |  |  |  |  |  | MANTER OVERRIDE |
| --accent-glow |  |  |  |  |  | rgba(255, 23, 68, 0.4) \|\| var(--hero-accent-glow) | PROMOVER |
| --accent-green | #4ade80 |  |  |  | #2ed573 |  | MANTER OVERRIDE |
| --accent-green-dim | rgba(74, 222, 128, 0.12) |  |  |  | rgba(46, 213, 115, 0.15) |  | MANTER OVERRIDE |
| --accent-lime | #ff2a2a |  |  |  |  |  | RENOMEAR -> PADRAO (--accent-primary) |
| --accent-lime-dim | rgba(255, 42, 42, 0.15) |  |  |  |  |  | MANTER OVERRIDE |
| --accent-lime-glow | rgba(255, 42, 42, 0.35) |  |  |  |  |  | RENOMEAR -> PADRAO (--accent-primary-glow) |
| --accent-orange | #fb923c |  |  |  | #f7612a |  | MANTER OVERRIDE |
| --accent-orange-dim | rgba(251, 146, 60, 0.12) |  |  |  |  |  | MANTER OVERRIDE |
| --accent-purple |  |  |  |  | #a855f7 |  | PROMOVER |
| --accent-red | #ff2a2a | #e63946 |  |  | #e8293a |  | RENOMEAR -> PADRAO (--accent-primary) |
| --accent-red-bright |  |  |  |  | #ff3347 |  | PROMOVER |
| --accent-red-dark |  | #c0313d |  |  |  |  | RENOMEAR -> PADRAO (--accent-primary-dark) |
| --accent-red-dim | rgba(255, 42, 42, 0.12) |  |  |  | #b01f2d |  | RENOMEAR -> PADRAO (--accent-primary-dim) |
| --accent-red-glow |  | rgba(230, 57, 70, 0.3) |  |  | rgba(232, 41, 58, 0.35) |  | PROMOVER |
| --accent-red-light |  | #ff4d5a |  |  |  |  | RENOMEAR -> PADRAO (--accent-primary-bright) |
| --accent-red-mid |  |  |  |  | rgba(232, 41, 58, 0.18) |  | PROMOVER |
| --accent-red-subtle |  | rgba(230, 57, 70, 0.08) |  |  | rgba(232, 41, 58, 0.08) |  | PROMOVER |
| --accent-subtle |  |  |  |  |  | rgba(255, 23, 68, 0.12) | PROMOVER |
| --accent-violet | #ff4444 |  |  |  |  |  | MANTER OVERRIDE |
| --accent-violet-dim | rgba(255, 68, 68, 0.16) |  |  |  |  |  | MANTER OVERRIDE |
| --accent-violet-glow | rgba(255, 68, 68, 0.4) |  |  |  |  |  | MANTER OVERRIDE |
| --bg-400 | #242424 |  |  |  |  |  | MANTER OVERRIDE |
| --bg-500 | #1a1a1a |  |  |  |  |  | MANTER OVERRIDE |
| --bg-600 | #141414 |  |  |  |  |  | MANTER OVERRIDE |
| --bg-700 | #0f0f0f |  |  |  |  |  | MANTER OVERRIDE |
| --bg-800 | #0b0b0b |  |  |  |  |  | MANTER OVERRIDE |
| --bg-900 | #080808 |  |  |  |  |  | MANTER OVERRIDE |
| --bg-active |  |  |  |  | #2a2a38 |  | PROMOVER |
| --bg-base |  |  |  |  | #0a0a0c |  | PROMOVER |
| --bg-card |  | #111119 |  |  |  | #141414 | PROMOVER |
| --bg-card-hover |  | #1c1c2a |  |  |  |  | PROMOVER |
| --bg-elevated |  | #1e1e2e |  |  | #18181f | #111111 \|\| var(--hero-bg-elevated) | PROMOVER |
| --bg-glass |  | rgba(17, 17, 25, 0.75) |  |  |  | rgba(17, 17, 25, 0.75) \|\| rgba(255, 255, 255, 0.03) | PROMOVER |
| --bg-glass-heavy |  | rgba(10, 10, 15, 0.85) |  |  |  |  | PROMOVER |
| --bg-glass-hover |  |  |  |  |  | rgba(255, 255, 255, 0.055) | PROMOVER |
| --bg-hover |  |  |  |  | #24242f |  | PROMOVER |
| --bg-panel |  |  |  |  | #1e1e28 |  | PROMOVER |
| --bg-primary |  | #0a0a0f |  |  |  | #0a0a0a | RENOMEAR -> PADRAO (--bg-base) |
| --bg-secondary |  | #12121a |  |  |  |  | RENOMEAR -> PADRAO (--bg-surface) |
| --bg-surface |  | rgba(255, 255, 255, 0.03) |  |  | #111116 | rgba(255, 255, 255, 0.03) | PROMOVER |
| --bg-tertiary |  | #1a1a28 |  |  |  |  | RENOMEAR -> PADRAO (--bg-elevated) |
| --black |  |  |  |  |  | var(--bg-primary) | PROMOVER |
| --body |  |  |  |  |  | 'Barlow', sans-serif | PROMOVER |
| --border |  |  |  |  |  | rgba(255, 255, 255, 0.08) | PROMOVER |
| --border-accent |  | rgba(230, 57, 70, 0.2) |  |  |  | rgba(230, 57, 70, 0.2) \|\| var(--hero-border-accent) | PROMOVER |
| --border-bright |  |  |  |  | rgba(255, 255, 255, 0.20) |  | PROMOVER |
| --border-default | rgba(255, 255, 255, 0.12) |  |  |  |  | rgba(255, 255, 255, 0.12) | UNIFICAR |
| --border-dim |  |  |  |  | rgba(255, 255, 255, 0.08) |  | PROMOVER |
| --border-glow |  | rgba(255, 255, 255, 0.08) |  |  |  | rgba(255, 255, 255, 0.08) | PROMOVER |
| --border-hover |  |  |  |  |  | rgba(255, 255, 255, 0.24) | PROMOVER |
| --border-medium |  |  |  |  |  | var(--hero-border-medium) | PROMOVER |
| --border-normal |  |  |  |  | rgba(255, 255, 255, 0.12) |  | PROMOVER |
| --border-primary |  | rgba(255, 255, 255, 0.06) |  |  |  |  | PROMOVER |
| --border-red |  |  |  |  |  | rgba(255, 23, 68, 0.38) | PROMOVER |
| --border-secondary |  | rgba(255, 255, 255, 0.03) |  |  |  |  | PROMOVER |
| --border-secondary-m |  |  |  |  |  | rgba(255, 255, 255, 0.03) | PROMOVER |
| --border-strong | rgba(255, 255, 255, 0.2) |  |  |  |  |  | MANTER OVERRIDE |
| --border-subtle | rgba(255, 255, 255, 0.07) |  |  |  | rgba(255, 255, 255, 0.05) | rgba(255, 255, 255, 0.06) \|\| var(--hero-border-subtle) | MANTER OVERRIDE |
| --carb-bg |  | rgba(244, 162, 97, 0.06) |  |  |  | rgba(244, 162, 97, 0.06) | PROMOVER |
| --carb-bg-mid |  | rgba(244, 162, 97, 0.10) |  |  |  | rgba(244, 162, 97, 0.10) | PROMOVER |
| --carb-color |  | #f4a261 |  |  |  | #f4a261 | PROMOVER |
| --carb-color-light |  | #ffbe85 |  |  |  | #ffbe85 | PROMOVER |
| --carb-color-lighter |  | #ffd4a8 |  |  |  | #ffd4a8 | PROMOVER |
| --carb-glow |  | rgba(244, 162, 97, 0.25) |  |  |  | rgba(244, 162, 97, 0.25) | PROMOVER |
| --carb-glow-strong |  | rgba(244, 162, 97, 0.4) |  |  |  | rgba(244, 162, 97, 0.4) | PROMOVER |
| --carb-gradient |  | linear-gradient(135deg, #f4a261, #ffbe85) |  |  |  | linear-gradient(135deg, #f4a261, #ffbe85) | PROMOVER |
| --carb-gradient-h |  | linear-gradient(90deg, #f4a261, #ffbe85) |  |  |  | linear-gradient(90deg, #f4a261, #ffbe85) | PROMOVER |
| --color-accent |  |  | #e63946 | #e02020 |  |  | RENOMEAR -> PADRAO (--accent-primary) |
| --color-accent-border |  |  |  | rgba(224, 32, 32, 0.30) |  |  | PROMOVER |
| --color-accent-dark |  |  | #b52d38 |  |  |  | RENOMEAR -> PADRAO (--accent-primary-dark) |
| --color-accent-glow |  |  | rgba(230, 57, 70, 0.35) | rgba(224, 32, 32, 0.18) |  |  | PROMOVER |
| --color-accent-light |  |  | #ff4d5a | #ff3333 |  |  | RENOMEAR -> PADRAO (--accent-primary-bright) |
| --color-accent-muted |  |  | rgba(230, 57, 70, 0.12) |  |  |  | PROMOVER |
| --color-accent-ultra |  |  |  | rgba(224, 32, 32, 0.06) |  |  | PROMOVER |
| --color-bg-base |  |  | #0a0a0c | #0f0f12 |  |  | RENOMEAR -> PADRAO (--bg-base) |
| --color-bg-card |  |  | #16161b |  |  |  | RENOMEAR -> PADRAO (--bg-card) |
| --color-bg-card-hover |  |  | #1c1c23 |  |  |  | PROMOVER |
| --color-bg-deep |  |  |  | #0a0a0c |  |  | PROMOVER |
| --color-bg-elevated |  |  | #18181d | #1a1a20 |  |  | RENOMEAR -> PADRAO (--bg-elevated) |
| --color-bg-float |  |  |  | #212128 |  |  | PROMOVER |
| --color-bg-overlay |  |  | #1f1f26 | #2a2a34 |  |  | PROMOVER |
| --color-bg-surface |  |  | #111114 | #141418 |  |  | RENOMEAR -> PADRAO (--bg-surface) |
| --color-border |  |  | rgba(255, 255, 255, 0.06) |  |  |  | PROMOVER |
| --color-border-accent |  |  | rgba(230, 57, 70, 0.3) |  |  |  | PROMOVER |
| --color-border-gold |  |  | rgba(212, 168, 67, 0.3) |  |  |  | PROMOVER |
| --color-gold |  |  | #d4a843 |  |  |  | RENOMEAR -> PADRAO (--accent-gold) |
| --color-gold-glow |  |  | rgba(212, 168, 67, 0.3) |  |  |  | PROMOVER |
| --color-gold-light |  |  | #f0c060 |  |  |  | RENOMEAR -> PADRAO (--accent-gold-light) |
| --color-gold-muted |  |  | rgba(212, 168, 67, 0.15) |  |  |  | PROMOVER |
| --color-text-accent |  |  | #e63946 |  |  |  | PROMOVER |
| --color-text-primary |  |  | #f0f0f5 |  |  |  | RENOMEAR -> PADRAO (--text-primary) |
| --color-text-secondary |  |  | #9898a8 |  |  |  | RENOMEAR -> PADRAO (--text-secondary) |
| --color-text-tertiary |  |  | #5a5a6e |  |  |  | RENOMEAR -> PADRAO (--text-tertiary) |
| --component-color |  |  |  |  |  | var(--tdee-text-tertiary) | PROMOVER |
| --display |  |  |  |  |  | 'Barlow Condensed', sans-serif | PROMOVER |
| --duration-fast |  |  |  |  |  | 180ms | PROMOVER |
| --duration-mid |  |  |  |  |  | 320ms | PROMOVER |
| --duration-slow |  |  |  |  |  | 600ms | PROMOVER |
| --ease-in-out |  |  |  |  | cubic-bezier(0.4, 0, 0.6, 1) |  | PROMOVER |
| --ease-out |  |  |  |  | cubic-bezier(0, 0, 0.2, 1) | cubic-bezier(0.16, 1, 0.3, 1) | PROMOVER |
| --ease-out-back |  | cubic-bezier(0.34, 1.56, 0.64, 1) |  |  |  | cubic-bezier(0.34, 1.56, 0.64, 1) | PROMOVER |
| --ease-out-expo |  | cubic-bezier(0.16, 1, 0.3, 1) |  |  |  | cubic-bezier(0.16, 1, 0.3, 1) | PROMOVER |
| --ease-smooth |  |  |  |  | cubic-bezier(0.4, 0, 0.2, 1) |  | PROMOVER |
| --ease-spring |  | cubic-bezier(0.22, 1, 0.36, 1) |  |  | cubic-bezier(0.34, 1.56, 0.64, 1) | cubic-bezier(0.22, 1, 0.36, 1) \|\| cubic-bezier(0.175, 0.885, 0.32, 1.275) | PROMOVER |
| --fat-bg |  | rgba(139, 92, 246, 0.06) |  |  |  | rgba(139, 92, 246, 0.06) | PROMOVER |
| --fat-bg-mid |  | rgba(139, 92, 246, 0.10) |  |  |  | rgba(139, 92, 246, 0.10) | PROMOVER |
| --fat-color |  | #8b5cf6 |  |  |  | #8b5cf6 | PROMOVER |
| --fat-color-light |  | #a78bfa |  |  |  | #a78bfa | PROMOVER |
| --fat-color-lighter |  | #c4b5fd |  |  |  | #c4b5fd | PROMOVER |
| --fat-glow |  | rgba(139, 92, 246, 0.25) |  |  |  | rgba(139, 92, 246, 0.25) | PROMOVER |
| --fat-glow-strong |  | rgba(139, 92, 246, 0.4) |  |  |  | rgba(139, 92, 246, 0.4) | PROMOVER |
| --fat-gradient |  | linear-gradient(135deg, #8b5cf6, #a78bfa) |  |  |  | linear-gradient(135deg, #8b5cf6, #a78bfa) | PROMOVER |
| --fat-gradient-h |  | linear-gradient(90deg, #8b5cf6, #a78bfa) |  |  |  | linear-gradient(90deg, #8b5cf6, #a78bfa) | PROMOVER |
| --font-body | 'Inter', 'Space Grotesk', sans-serif |  |  |  |  |  | MANTER OVERRIDE |
| --font-display | 'Space Grotesk', sans-serif |  |  |  |  | 'Inter', system-ui, sans-serif | MANTER OVERRIDE |
| --font-mono | 'JetBrains Mono', 'Fira Code', monospace | 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, monospace | 'SF Mono', 'Fira Code', 'Cascadia Code', monospace | 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', Menlo, monospace | 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace | 'JetBrains Mono', 'Fira Code', monospace | MANTER OVERRIDE |
| --font-sans |  |  | -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif |  | -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', system-ui, sans-serif |  | PROMOVER |
| --font-stack |  | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif |  |  |  | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif | PROMOVER |
| --font-system |  |  |  | -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif |  |  | PROMOVER |
| --header-height |  |  |  |  |  | 64px | PROMOVER |
| --header-side-padding |  |  |  |  |  | clamp(24px, 4vw, 64px) | PROMOVER |
| --hero-accent |  |  |  |  |  | #e63946 | PROMOVER |
| --hero-accent-dark |  |  |  |  |  | #9c1a23 | PROMOVER |
| --hero-accent-glow |  |  |  |  |  | rgba(230, 57, 70, 0.35) | PROMOVER |
| --hero-accent-vivid |  |  |  |  |  | #ff3d4d | PROMOVER |
| --hero-bg-elevated |  |  |  |  |  | #1e1e26 | PROMOVER |
| --hero-border-accent |  |  |  |  |  | rgba(230, 57, 70, 0.4) | PROMOVER |
| --hero-border-medium |  |  |  |  |  | rgba(255, 255, 255, 0.09) | PROMOVER |
| --hero-border-subtle |  |  |  |  |  | rgba(255, 255, 255, 0.055) | PROMOVER |
| --hero-font-mono |  |  |  |  |  | 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace | PROMOVER |
| --hero-font-system |  |  |  |  |  | -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif | PROMOVER |
| --hero-text-positive |  |  |  |  |  | #3dd68c | PROMOVER |
| --hero-text-primary |  |  |  |  |  | #f0f0f5 | PROMOVER |
| --hero-text-secondary |  |  |  |  |  | #9999aa | PROMOVER |
| --hero-text-tertiary |  |  |  |  |  | #555566 | PROMOVER |
| --info-color |  | #60a5fa |  |  |  | #60a5fa | PROMOVER |
| --mono |  |  |  |  |  | var(--font-mono) | PROMOVER |
| --protein-bg |  | rgba(230, 57, 70, 0.06) |  |  |  | rgba(230, 57, 70, 0.06) | PROMOVER |
| --protein-bg-mid |  | rgba(230, 57, 70, 0.10) |  |  |  | rgba(230, 57, 70, 0.10) | PROMOVER |
| --protein-color |  | #e63946 |  |  |  | #e63946 | PROMOVER |
| --protein-color-light |  | #ff6b76 |  |  |  | #ff6b76 | PROMOVER |
| --protein-color-lighter |  | #ff9da5 |  |  |  | #ff9da5 | PROMOVER |
| --protein-glow |  | rgba(230, 57, 70, 0.25) |  |  |  | rgba(230, 57, 70, 0.25) | PROMOVER |
| --protein-glow-strong |  | rgba(230, 57, 70, 0.4) |  |  |  | rgba(230, 57, 70, 0.4) | PROMOVER |
| --protein-gradient |  | linear-gradient(135deg, #e63946, #ff6b76) |  |  |  | linear-gradient(135deg, #e63946, #ff6b76) | PROMOVER |
| --protein-gradient-h |  | linear-gradient(90deg, #e63946, #ff6b76) |  |  |  | linear-gradient(90deg, #e63946, #ff6b76) | PROMOVER |
| --radius-2xl |  | 24px | 32px | 32px | 28px | 24px | PROMOVER |
| --radius-3xl |  | 32px |  |  |  | 32px | PROMOVER |
| --radius-control |  |  |  |  |  | 6px | PROMOVER |
| --radius-full |  | 100px | 9999px | 9999px |  | 100px \|\| 9999px | PROMOVER |
| --radius-lg | 20px | 16px | 18px | 16px | 14px | 12px | MANTER OVERRIDE |
| --radius-md | 14px | 12px | 12px | 10px | 10px | 8px | MANTER OVERRIDE |
| --radius-pill | 9999px |  |  |  |  |  | MANTER OVERRIDE |
| --radius-sm | 8px | 8px | 6px | 6px | 6px | 4px | MANTER OVERRIDE |
| --radius-xl | 28px | 20px | 24px | 24px | 20px | 16px | MANTER OVERRIDE |
| --radius-xs |  | 6px |  |  |  | 6px | PROMOVER |
| --red |  |  |  |  |  | var(--accent) | PROMOVER |
| --red-dim |  |  |  |  |  | #9b0013 | PROMOVER |
| --red-text |  |  |  |  |  | #ff3838 | PROMOVER |
| --shadow-2xl |  | 0 24px 64px rgba(0, 0, 0, 0.6) |  |  |  |  | PROMOVER |
| --shadow-accent |  |  | 0 0 32px rgba(230,57,70,0.2), 0 0 64px rgba(230,57,70,0.08) |  |  |  | PROMOVER |
| --shadow-card | 0 4px 24px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255, 255, 255, 0.04) inset |  |  |  |  |  | MANTER OVERRIDE |
| --shadow-card-hover | 0 8px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 42, 42, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.12) |  |  |  |  |  | MANTER OVERRIDE |
| --shadow-cyan | 0 0 30px rgba(34, 211, 238, 0.18), 0 4px 24px rgba(0, 0, 0, 0.5) |  |  |  |  |  | MANTER OVERRIDE |
| --shadow-glow-accent |  |  |  | 0 0 30px rgba(224, 32, 32, 0.25), 0 0 60px rgba(224, 32, 32, 0.10) |  |  | PROMOVER |
| --shadow-gold |  |  | 0 0 32px rgba(212,168,67,0.2), 0 0 64px rgba(212,168,67,0.08) |  |  |  | PROMOVER |
| --shadow-inner |  | inset 0 2px 4px rgba(0, 0, 0, 0.3) |  |  |  | inset 0 2px 4px rgba(0, 0, 0, 0.3) | PROMOVER |
| --shadow-lg |  | 0 8px 32px rgba(0, 0, 0, 0.4) | 0 8px 32px rgba(0,0,0,0.6) | 0 10px 30px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4) | 0 8px 40px rgba(0,0,0,0.6) | 0 8px 32px rgba(0, 0, 0, 0.4) | PROMOVER |
| --shadow-lime | 0 0 40px rgba(255, 42, 42, 0.18), 0 8px 32px rgba(0, 0, 0, 0.6) |  |  |  |  |  | MANTER OVERRIDE |
| --shadow-md |  | 0 4px 16px rgba(0, 0, 0, 0.3) | 0 4px 16px rgba(0,0,0,0.5) | 0 4px 12px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3) | 0 4px 20px rgba(0,0,0,0.5) | 0 4px 16px rgba(0, 0, 0, 0.3) | PROMOVER |
| --shadow-red |  |  |  |  | 0 0 40px rgba(232, 41, 58, 0.25) |  | PROMOVER |
| --shadow-red-sm |  |  |  |  | 0 0 16px rgba(232, 41, 58, 0.20) |  | PROMOVER |
| --shadow-sm |  | 0 2px 8px rgba(0, 0, 0, 0.2) | 0 1px 3px rgba(0,0,0,0.4) | 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3) | 0 2px 8px rgba(0,0,0,0.4) | 0 2px 8px rgba(0, 0, 0, 0.2) | PROMOVER |
| --shadow-violet | 0 0 40px rgba(255, 68, 68, 0.22), 0 8px 32px rgba(0, 0, 0, 0.6) |  |  |  |  |  | MANTER OVERRIDE |
| --shadow-xl |  | 0 16px 48px rgba(0, 0, 0, 0.5) | 0 16px 64px rgba(0,0,0,0.7) | 0 20px 50px rgba(0,0,0,0.7), 0 8px 20px rgba(0,0,0,0.5) | 0 16px 64px rgba(0,0,0,0.7) | 0 16px 48px rgba(0, 0, 0, 0.5) | PROMOVER |
| --space-1 |  |  |  | 4px |  |  | PROMOVER |
| --space-10 |  |  |  | 40px |  |  | PROMOVER |
| --space-12 |  |  |  | 48px |  |  | PROMOVER |
| --space-16 |  |  |  | 64px |  |  | PROMOVER |
| --space-2 |  |  |  | 8px |  |  | PROMOVER |
| --space-20 |  |  |  | 80px |  |  | PROMOVER |
| --space-24 |  |  |  | 96px |  |  | PROMOVER |
| --space-3 |  |  |  | 12px |  |  | PROMOVER |
| --space-4 |  |  |  | 16px |  |  | PROMOVER |
| --space-5 |  |  |  | 20px |  |  | PROMOVER |
| --space-6 |  |  |  | 24px |  |  | PROMOVER |
| --space-8 |  |  |  | 32px |  |  | PROMOVER |
| --spacing-1 |  |  |  |  |  | 4px | PROMOVER |
| --spacing-10 |  |  |  |  |  | 40px | PROMOVER |
| --spacing-12 |  |  |  |  |  | 48px | PROMOVER |
| --spacing-16 |  |  |  |  |  | 64px | PROMOVER |
| --spacing-2 |  |  |  |  |  | 8px | PROMOVER |
| --spacing-2xl |  |  |  |  |  | 48px | PROMOVER |
| --spacing-3 |  |  |  |  |  | 12px | PROMOVER |
| --spacing-3xl |  |  |  |  |  | 64px | PROMOVER |
| --spacing-4 |  |  |  |  |  | 16px | PROMOVER |
| --spacing-4xl |  |  |  |  |  | 96px | PROMOVER |
| --spacing-5 |  |  |  |  |  | 20px | PROMOVER |
| --spacing-6 |  |  |  |  |  | 24px | PROMOVER |
| --spacing-8 |  |  |  |  |  | 32px | PROMOVER |
| --spacing-lg |  |  |  |  |  | 24px | PROMOVER |
| --spacing-md |  |  |  |  |  | 16px | PROMOVER |
| --spacing-sm |  |  |  |  |  | 8px | PROMOVER |
| --spacing-xl |  |  |  |  |  | 32px | PROMOVER |
| --spacing-xs |  |  |  |  |  | 4px | PROMOVER |
| --success-bg |  | rgba(74, 222, 128, 0.06) |  |  |  | rgba(74, 222, 128, 0.06) | PROMOVER |
| --success-color |  | #4ade80 |  |  |  | #4ade80 | PROMOVER |
| --success-glow |  | rgba(74, 222, 128, 0.25) |  |  |  | rgba(74, 222, 128, 0.25) | PROMOVER |
| --sup-creatina-glow |  |  |  | rgba(0, 200, 255, 0.15) |  |  | PROMOVER |
| --sup-creatina-hue |  |  |  | 195 |  |  | PROMOVER |
| --sup-creatina-mid |  |  |  | #0099cc |  |  | PROMOVER |
| --sup-creatina-primary |  |  |  | #00c8ff |  |  | PROMOVER |
| --sup-creatina-ultra |  |  |  | rgba(0, 200, 255, 0.05) |  |  | PROMOVER |
| --sup-mag-glow |  |  |  | rgba(184, 127, 218, 0.12) |  |  | PROMOVER |
| --sup-mag-hue |  |  |  | 280 |  |  | PROMOVER |
| --sup-mag-mid |  |  |  | #9050c0 |  |  | PROMOVER |
| --sup-mag-primary |  |  |  | #b87fda |  |  | PROMOVER |
| --sup-mag-ultra |  |  |  | rgba(184, 127, 218, 0.04) |  |  | PROMOVER |
| --sup-omega-glow |  |  |  | rgba(123, 140, 222, 0.12) |  |  | PROMOVER |
| --sup-omega-hue |  |  |  | 220 |  |  | PROMOVER |
| --sup-omega-mid |  |  |  | #5566cc |  |  | PROMOVER |
| --sup-omega-primary |  |  |  | #7b8cde |  |  | PROMOVER |
| --sup-omega-ultra |  |  |  | rgba(123, 140, 222, 0.04) |  |  | PROMOVER |
| --sup-vitd-glow |  |  |  | rgba(255, 184, 48, 0.15) |  |  | PROMOVER |
| --sup-vitd-hue |  |  |  | 42 |  |  | PROMOVER |
| --sup-vitd-mid |  |  |  | #e09000 |  |  | PROMOVER |
| --sup-vitd-primary |  |  |  | #ffb830 |  |  | PROMOVER |
| --sup-vitd-ultra |  |  |  | rgba(255, 184, 48, 0.05) |  |  | PROMOVER |
| --sup-whey-glow |  |  |  | rgba(0, 232, 152, 0.15) |  |  | PROMOVER |
| --sup-whey-hue |  |  |  | 160 |  |  | PROMOVER |
| --sup-whey-mid |  |  |  | #00b574 |  |  | PROMOVER |
| --sup-whey-primary |  |  |  | #00e898 |  |  | PROMOVER |
| --sup-whey-ultra |  |  |  | rgba(0, 232, 152, 0.05) |  |  | PROMOVER |
| --surface |  |  |  |  |  | var(--bg-elevated) | PROMOVER |
| --surface-1 | rgba(255, 255, 255, 0.03) |  |  |  |  |  | MANTER OVERRIDE |
| --surface-2 | rgba(255, 255, 255, 0.06) |  |  |  |  | var(--bg-card) | MANTER OVERRIDE |
| --surface-3 | rgba(255, 255, 255, 0.09) |  |  |  |  | #1c1c22 | MANTER OVERRIDE |
| --tdee-accent |  |  |  |  |  | #ff453a | PROMOVER |
| --tdee-accent-glow |  |  |  |  |  | rgba(255, 69, 58, 0.25) | PROMOVER |
| --tdee-bg-card |  |  |  |  |  | rgba(255, 255, 255, 0.022) | PROMOVER |
| --tdee-bg-card-hover |  |  |  |  |  | rgba(255, 255, 255, 0.042) | PROMOVER |
| --tdee-bg-deep |  |  |  |  |  | var(--bg-primary, #050508) | PROMOVER |
| --tdee-border-medium |  |  |  |  |  | var(--border-default, rgba(255, 255, 255, 0.1)) | PROMOVER |
| --tdee-border-subtle |  |  |  |  |  | var(--border-subtle, rgba(255, 255, 255, 0.055)) | PROMOVER |
| --tdee-color-bmr |  |  |  |  |  | #ff453a | PROMOVER |
| --tdee-color-bmr-dim |  |  |  |  |  | rgba(255, 69, 58, 0.12) | PROMOVER |
| --tdee-color-cardio |  |  |  |  |  | #64d2ff | PROMOVER |
| --tdee-color-cardio-dim |  |  |  |  |  | rgba(100, 210, 255, 0.12) | PROMOVER |
| --tdee-color-eat |  |  |  |  |  | #32d74b | PROMOVER |
| --tdee-color-eat-dim |  |  |  |  |  | rgba(50, 215, 75, 0.12) | PROMOVER |
| --tdee-color-neat |  |  |  |  |  | #ff9f0a | PROMOVER |
| --tdee-color-neat-dim |  |  |  |  |  | rgba(255, 159, 10, 0.12) | PROMOVER |
| --tdee-color-tef |  |  |  |  |  | #bf5af2 | PROMOVER |
| --tdee-color-tef-dim |  |  |  |  |  | rgba(191, 90, 242, 0.12) | PROMOVER |
| --tdee-ease-out-expo |  |  |  |  |  | cubic-bezier(0.16, 1, 0.3, 1) | PROMOVER |
| --tdee-ease-out-quart |  |  |  |  |  | cubic-bezier(0.25, 1, 0.5, 1) | PROMOVER |
| --tdee-font-mono |  |  |  |  |  | var(--font-mono, 'JetBrains Mono', 'SF Mono', ui-monospace, monospace) | PROMOVER |
| --tdee-font-sans |  |  |  |  |  | 'Inter', system-ui, -apple-system, sans-serif | PROMOVER |
| --tdee-text-muted |  |  |  |  |  | #474754 | PROMOVER |
| --tdee-text-primary |  |  |  |  |  | var(--text-primary, #f5f5f7) | PROMOVER |
| --tdee-text-secondary |  |  |  |  |  | #a1a1aa | PROMOVER |
| --tdee-text-tertiary |  |  |  |  |  | #5a5a65 | PROMOVER |
| --text |  |  |  |  |  | var(--text-primary) | PROMOVER |
| --text-2xl |  |  |  | 1.5625rem |  |  | PROMOVER |
| --text-3xl |  |  |  | 2rem |  |  | PROMOVER |
| --text-4xl |  |  |  | 2.75rem |  |  | PROMOVER |
| --text-5xl |  |  |  | 3.5rem |  |  | PROMOVER |
| --text-accent | var(--accent-lime) |  |  |  |  |  | MANTER OVERRIDE |
| --text-base |  |  |  | 0.9375rem |  |  | PROMOVER |
| --text-dim |  |  |  |  |  | #b1b1bc | PROMOVER |
| --text-disabled |  |  |  |  | #3a3a50 |  | PROMOVER |
| --text-lg |  |  |  | 1.0625rem |  |  | PROMOVER |
| --text-muted |  | #4a4a5e |  |  | #5a5a72 | rgba(255, 255, 255, 0.2) \|\| var(--text-muted-legacy) | PROMOVER |
| --text-muted-legacy |  |  |  |  |  | #8e8e9a | PROMOVER |
| --text-positive |  |  |  |  |  | var(--hero-text-positive) | PROMOVER |
| --text-primary | #ffffff | #f0f0f5 |  |  | #f0f0f5 | #ffffff \|\| var(--hero-text-primary) | MANTER OVERRIDE |
| --text-secondary | rgba(255, 255, 255, 0.65) | #a0a0b8 |  |  | #9090a8 | rgba(255, 255, 255, 0.7) \|\| var(--hero-text-secondary) | MANTER OVERRIDE |
| --text-sm |  |  |  | 0.8125rem |  |  | PROMOVER |
| --text-tertiary | rgba(255, 255, 255, 0.3) | #6a6a80 |  |  |  | rgba(255, 255, 255, 0.4) \|\| var(--hero-text-tertiary) | MANTER OVERRIDE |
| --text-white |  | #ffffff |  |  |  |  | PROMOVER |
| --text-xl |  |  |  | 1.25rem |  |  | PROMOVER |
| --text-xs |  |  |  | 0.6875rem |  |  | PROMOVER |
| --transition-base | 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | 0.25s cubic-bezier(0.4, 0, 0.2, 1) | 250ms cubic-bezier(0.4, 0, 0.2, 1) | 250ms cubic-bezier(0.4, 0, 0.2, 1) |  |  | MANTER OVERRIDE |
| --transition-default |  |  |  |  |  | 0.2s ease | PROMOVER |
| --transition-fast | 180ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | 0.15s cubic-bezier(0.4, 0, 0.2, 1) | 150ms cubic-bezier(0.4, 0, 0.2, 1) | 150ms cubic-bezier(0.4, 0, 0.2, 1) | 120ms var(--ease-smooth) | 0.15s ease | MANTER OVERRIDE |
| --transition-normal |  |  |  |  | 220ms var(--ease-smooth) |  | PROMOVER |
| --transition-screen | 420ms cubic-bezier(0.65, 0, 0.35, 1) |  |  |  |  |  | MANTER OVERRIDE |
| --transition-slow | 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | 0.4s cubic-bezier(0.4, 0, 0.2, 1) | 400ms cubic-bezier(0.4, 0, 0.2, 1) | 400ms cubic-bezier(0.4, 0, 0.2, 1) | 380ms var(--ease-smooth) | 0.3s ease | MANTER OVERRIDE |
| --transition-smooth |  | 0.5s cubic-bezier(0.22, 1, 0.36, 1) |  |  |  |  | PROMOVER |
| --transition-spring |  | 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) | 500ms cubic-bezier(0.34, 1.56, 0.64, 1) | 500ms cubic-bezier(0.34, 1.56, 0.64, 1) | 500ms var(--ease-spring) | 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) | PROMOVER |
| --warning-bg |  | rgba(251, 191, 36, 0.08) |  |  |  | rgba(251, 191, 36, 0.08) | PROMOVER |
| --warning-color |  | #fbbf24 |  |  |  | #fbbf24 | PROMOVER |
| --weight-black |  |  |  | 900 |  |  | PROMOVER |
| --weight-bold |  |  |  | 700 |  |  | PROMOVER |
| --weight-light |  |  |  | 300 |  |  | PROMOVER |
| --weight-medium |  |  |  | 500 |  |  | PROMOVER |
| --weight-regular |  |  |  | 400 |  |  | PROMOVER |
| --weight-semibold |  |  |  | 600 |  |  | PROMOVER |
| --z-base |  |  |  | 0 |  |  | PROMOVER |
| --z-float |  |  |  | 20 |  |  | PROMOVER |
| --z-modal |  |  |  | 40 |  |  | PROMOVER |
| --z-overlay |  |  |  | 30 |  |  | PROMOVER |
| --z-raised |  |  |  | 10 |  |  | PROMOVER |
| --z-tooltip |  |  |  | 50 |  |  | PROMOVER |

## Rastreabilidade de origem (arquivo:linha) - 6 sistemas alvo

| Variavel | tokens | macros | final | supplements | simulator | presentation |
|---|---|---|---|---|---|---|
| --accent |  |  |  |  |  | src/styles/dashboard-presentation.css:12 \|\| src/styles/dashboard-presentation.css:622 |
| --accent-amber |  |  |  |  | src/styles/dashboard-simulator.css:20 |  |
| --accent-blue |  |  |  |  | src/styles/dashboard-simulator.css:23 |  |
| --accent-cyan | src/styles/tokens.css:23 |  |  |  |  |  |
| --accent-cyan-dim | src/styles/tokens.css:24 |  |  |  |  |  |
| --accent-glow |  |  |  |  |  | src/styles/dashboard-presentation.css:13 \|\| src/styles/dashboard-presentation.css:623 |
| --accent-green | src/styles/tokens.css:29 |  |  |  | src/styles/dashboard-simulator.css:21 |  |
| --accent-green-dim | src/styles/tokens.css:30 |  |  |  | src/styles/dashboard-simulator.css:22 |  |
| --accent-lime | src/styles/tokens.css:17 |  |  |  |  |  |
| --accent-lime-dim | src/styles/tokens.css:18 |  |  |  |  |  |
| --accent-lime-glow | src/styles/tokens.css:19 |  |  |  |  |  |
| --accent-orange | src/styles/tokens.css:25 |  |  |  | src/styles/dashboard-simulator.css:19 |  |
| --accent-orange-dim | src/styles/tokens.css:26 |  |  |  |  |  |
| --accent-purple |  |  |  |  | src/styles/dashboard-simulator.css:24 |  |
| --accent-red | src/styles/tokens.css:27 | src/styles/dashboard-macros.css:17 |  |  | src/styles/dashboard-simulator.css:12 |  |
| --accent-red-bright |  |  |  |  | src/styles/dashboard-simulator.css:13 |  |
| --accent-red-dark |  | src/styles/dashboard-macros.css:19 |  |  |  |  |
| --accent-red-dim | src/styles/tokens.css:28 |  |  |  | src/styles/dashboard-simulator.css:14 |  |
| --accent-red-glow |  | src/styles/dashboard-macros.css:20 |  |  | src/styles/dashboard-simulator.css:15 |  |
| --accent-red-light |  | src/styles/dashboard-macros.css:18 |  |  |  |  |
| --accent-red-mid |  |  |  |  | src/styles/dashboard-simulator.css:17 |  |
| --accent-red-subtle |  | src/styles/dashboard-macros.css:21 |  |  | src/styles/dashboard-simulator.css:16 |  |
| --accent-subtle |  |  |  |  |  | src/styles/dashboard-presentation.css:14 |
| --accent-violet | src/styles/tokens.css:20 |  |  |  |  |  |
| --accent-violet-dim | src/styles/tokens.css:21 |  |  |  |  |  |
| --accent-violet-glow | src/styles/tokens.css:22 |  |  |  |  |  |
| --bg-400 | src/styles/tokens.css:7 |  |  |  |  |  |
| --bg-500 | src/styles/tokens.css:6 |  |  |  |  |  |
| --bg-600 | src/styles/tokens.css:5 |  |  |  |  |  |
| --bg-700 | src/styles/tokens.css:4 |  |  |  |  |  |
| --bg-800 | src/styles/tokens.css:3 |  |  |  |  |  |
| --bg-900 | src/styles/tokens.css:2 |  |  |  |  |  |
| --bg-active |  |  |  |  | src/styles/dashboard-simulator.css:10 |  |
| --bg-base |  |  |  |  | src/styles/dashboard-simulator.css:5 |  |
| --bg-card |  | src/styles/dashboard-macros.css:10 |  |  |  | src/styles/dashboard-presentation.css:4 |
| --bg-card-hover |  | src/styles/dashboard-macros.css:11 |  |  |  |  |
| --bg-elevated |  | src/styles/dashboard-macros.css:12 |  |  | src/styles/dashboard-simulator.css:7 | src/styles/dashboard-presentation.css:3 \|\| src/styles/dashboard-presentation.css:624 |
| --bg-glass |  | src/styles/dashboard-macros.css:14 |  |  |  | src/styles/dashboard-presentation.css:90 \|\| src/styles/dashboard-presentation.css:602 |
| --bg-glass-heavy |  | src/styles/dashboard-macros.css:15 |  |  |  |  |
| --bg-glass-hover |  |  |  |  |  | src/styles/dashboard-presentation.css:603 |
| --bg-hover |  |  |  |  | src/styles/dashboard-simulator.css:9 |  |
| --bg-panel |  |  |  |  | src/styles/dashboard-simulator.css:8 |  |
| --bg-primary |  | src/styles/dashboard-macros.css:7 |  |  |  | src/styles/dashboard-presentation.css:2 |
| --bg-secondary |  | src/styles/dashboard-macros.css:8 |  |  |  |  |
| --bg-surface |  | src/styles/dashboard-macros.css:13 |  |  | src/styles/dashboard-simulator.css:6 | src/styles/dashboard-presentation.css:89 |
| --bg-tertiary |  | src/styles/dashboard-macros.css:9 |  |  |  |  |
| --black |  |  |  |  |  | src/styles/dashboard-presentation.css:38 |
| --body |  |  |  |  |  | src/styles/dashboard-presentation.css:49 |
| --border |  |  |  |  |  | src/styles/dashboard-presentation.css:42 |
| --border-accent |  | src/styles/dashboard-macros.css:31 |  |  |  | src/styles/dashboard-presentation.css:91 \|\| src/styles/dashboard-presentation.css:605 |
| --border-bright |  |  |  |  | src/styles/dashboard-simulator.css:34 |  |
| --border-default | src/styles/tokens.css:14 |  |  |  |  | src/styles/dashboard-presentation.css:6 |
| --border-dim |  |  |  |  | src/styles/dashboard-simulator.css:32 |  |
| --border-glow |  | src/styles/dashboard-macros.css:32 |  |  |  | src/styles/dashboard-presentation.css:92 |
| --border-hover |  |  |  |  |  | src/styles/dashboard-presentation.css:7 |
| --border-medium |  |  |  |  |  | src/styles/dashboard-presentation.css:604 |
| --border-normal |  |  |  |  | src/styles/dashboard-simulator.css:33 |  |
| --border-primary |  | src/styles/dashboard-macros.css:29 |  |  |  |  |
| --border-red |  |  |  |  |  | src/styles/dashboard-presentation.css:43 |
| --border-secondary |  | src/styles/dashboard-macros.css:30 |  |  |  |  |
| --border-secondary-m |  |  |  |  |  | src/styles/dashboard-presentation.css:93 |
| --border-strong | src/styles/tokens.css:15 |  |  |  |  |  |
| --border-subtle | src/styles/tokens.css:13 |  |  |  | src/styles/dashboard-simulator.css:31 | src/styles/dashboard-presentation.css:5 \|\| src/styles/dashboard-presentation.css:629 |
| --carb-bg |  | src/styles/dashboard-macros.css:49 |  |  |  | src/styles/dashboard-presentation.css:67 |
| --carb-bg-mid |  | src/styles/dashboard-macros.css:50 |  |  |  | src/styles/dashboard-presentation.css:68 |
| --carb-color |  | src/styles/dashboard-macros.css:44 |  |  |  | src/styles/dashboard-presentation.css:62 |
| --carb-color-light |  | src/styles/dashboard-macros.css:45 |  |  |  | src/styles/dashboard-presentation.css:63 |
| --carb-color-lighter |  | src/styles/dashboard-macros.css:46 |  |  |  | src/styles/dashboard-presentation.css:64 |
| --carb-glow |  | src/styles/dashboard-macros.css:47 |  |  |  | src/styles/dashboard-presentation.css:65 |
| --carb-glow-strong |  | src/styles/dashboard-macros.css:48 |  |  |  | src/styles/dashboard-presentation.css:66 |
| --carb-gradient |  | src/styles/dashboard-macros.css:51 |  |  |  | src/styles/dashboard-presentation.css:69 |
| --carb-gradient-h |  | src/styles/dashboard-macros.css:52 |  |  |  | src/styles/dashboard-presentation.css:70 |
| --color-accent |  |  | src/styles/dashboard-final.css:12 | src/styles/dashboard-supplements.css:16 |  |  |
| --color-accent-border |  |  |  | src/styles/dashboard-supplements.css:20 |  |  |
| --color-accent-dark |  |  | src/styles/dashboard-final.css:14 |  |  |  |
| --color-accent-glow |  |  | src/styles/dashboard-final.css:16 | src/styles/dashboard-supplements.css:18 |  |  |
| --color-accent-light |  |  | src/styles/dashboard-final.css:13 | src/styles/dashboard-supplements.css:17 |  |  |
| --color-accent-muted |  |  | src/styles/dashboard-final.css:15 |  |  |  |
| --color-accent-ultra |  |  |  | src/styles/dashboard-supplements.css:19 |  |  |
| --color-bg-base |  |  | src/styles/dashboard-final.css:5 | src/styles/dashboard-supplements.css:9 |  |  |
| --color-bg-card |  |  | src/styles/dashboard-final.css:9 |  |  |  |
| --color-bg-card-hover |  |  | src/styles/dashboard-final.css:10 |  |  |  |
| --color-bg-deep |  |  |  | src/styles/dashboard-supplements.css:8 |  |  |
| --color-bg-elevated |  |  | src/styles/dashboard-final.css:7 | src/styles/dashboard-supplements.css:11 |  |  |
| --color-bg-float |  |  |  | src/styles/dashboard-supplements.css:12 |  |  |
| --color-bg-overlay |  |  | src/styles/dashboard-final.css:8 | src/styles/dashboard-supplements.css:13 |  |  |
| --color-bg-surface |  |  | src/styles/dashboard-final.css:6 | src/styles/dashboard-supplements.css:10 |  |  |
| --color-border |  |  | src/styles/dashboard-final.css:28 |  |  |  |
| --color-border-accent |  |  | src/styles/dashboard-final.css:29 |  |  |  |
| --color-border-gold |  |  | src/styles/dashboard-final.css:30 |  |  |  |
| --color-gold |  |  | src/styles/dashboard-final.css:18 |  |  |  |
| --color-gold-glow |  |  | src/styles/dashboard-final.css:21 |  |  |  |
| --color-gold-light |  |  | src/styles/dashboard-final.css:19 |  |  |  |
| --color-gold-muted |  |  | src/styles/dashboard-final.css:20 |  |  |  |
| --color-text-accent |  |  | src/styles/dashboard-final.css:26 |  |  |  |
| --color-text-primary |  |  | src/styles/dashboard-final.css:23 |  |  |  |
| --color-text-secondary |  |  | src/styles/dashboard-final.css:24 |  |  |  |
| --color-text-tertiary |  |  | src/styles/dashboard-final.css:25 |  |  |  |
| --component-color |  |  |  |  |  | src/styles/dashboard-presentation.css:1903 |
| --display |  |  |  |  |  | src/styles/dashboard-presentation.css:48 |
| --duration-fast |  |  |  |  |  | src/styles/dashboard-presentation.css:617 |
| --duration-mid |  |  |  |  |  | src/styles/dashboard-presentation.css:618 |
| --duration-slow |  |  |  |  |  | src/styles/dashboard-presentation.css:619 |
| --ease-in-out |  |  |  |  | src/styles/dashboard-simulator.css:55 |  |
| --ease-out |  |  |  |  | src/styles/dashboard-simulator.css:54 | src/styles/dashboard-presentation.css:620 |
| --ease-out-back |  | src/styles/dashboard-macros.css:97 |  |  |  | src/styles/dashboard-presentation.css:107 |
| --ease-out-expo |  | src/styles/dashboard-macros.css:96 |  |  |  | src/styles/dashboard-presentation.css:106 |
| --ease-smooth |  |  |  |  | src/styles/dashboard-simulator.css:53 |  |
| --ease-spring |  | src/styles/dashboard-macros.css:98 |  |  | src/styles/dashboard-simulator.css:52 | src/styles/dashboard-presentation.css:108 \|\| src/styles/dashboard-presentation.css:621 |
| --fat-bg |  | src/styles/dashboard-macros.css:59 |  |  |  | src/styles/dashboard-presentation.css:77 |
| --fat-bg-mid |  | src/styles/dashboard-macros.css:60 |  |  |  | src/styles/dashboard-presentation.css:78 |
| --fat-color |  | src/styles/dashboard-macros.css:54 |  |  |  | src/styles/dashboard-presentation.css:72 |
| --fat-color-light |  | src/styles/dashboard-macros.css:55 |  |  |  | src/styles/dashboard-presentation.css:73 |
| --fat-color-lighter |  | src/styles/dashboard-macros.css:56 |  |  |  | src/styles/dashboard-presentation.css:74 |
| --fat-glow |  | src/styles/dashboard-macros.css:57 |  |  |  | src/styles/dashboard-presentation.css:75 |
| --fat-glow-strong |  | src/styles/dashboard-macros.css:58 |  |  |  | src/styles/dashboard-presentation.css:76 |
| --fat-gradient |  | src/styles/dashboard-macros.css:61 |  |  |  | src/styles/dashboard-presentation.css:79 |
| --fat-gradient-h |  | src/styles/dashboard-macros.css:62 |  |  |  | src/styles/dashboard-presentation.css:80 |
| --font-body | src/styles/tokens.css:38 |  |  |  |  |  |
| --font-display | src/styles/tokens.css:37 |  |  |  |  | src/styles/dashboard-presentation.css:28 |
| --font-mono | src/styles/tokens.css:39 | src/styles/dashboard-macros.css:88 | src/styles/dashboard-final.css:47 | src/styles/dashboard-supplements.css:56 | src/styles/dashboard-simulator.css:50 | src/styles/dashboard-presentation.css:27 |
| --font-sans |  |  | src/styles/dashboard-final.css:46 |  | src/styles/dashboard-simulator.css:49 |  |
| --font-stack |  | src/styles/dashboard-macros.css:87 |  |  |  | src/styles/dashboard-presentation.css:111 |
| --font-system |  |  |  | src/styles/dashboard-supplements.css:55 |  |  |
| --header-height |  |  |  |  |  | src/styles/dashboard-presentation.css:29 |
| --header-side-padding |  |  |  |  |  | src/styles/dashboard-presentation.css:34 |
| --hero-accent |  |  |  |  |  | src/styles/dashboard-presentation.css:590 |
| --hero-accent-dark |  |  |  |  |  | src/styles/dashboard-presentation.css:592 |
| --hero-accent-glow |  |  |  |  |  | src/styles/dashboard-presentation.css:593 |
| --hero-accent-vivid |  |  |  |  |  | src/styles/dashboard-presentation.css:591 |
| --hero-bg-elevated |  |  |  |  |  | src/styles/dashboard-presentation.css:594 |
| --hero-border-accent |  |  |  |  |  | src/styles/dashboard-presentation.css:601 |
| --hero-border-medium |  |  |  |  |  | src/styles/dashboard-presentation.css:600 |
| --hero-border-subtle |  |  |  |  |  | src/styles/dashboard-presentation.css:599 |
| --hero-font-mono |  |  |  |  |  | src/styles/dashboard-presentation.css:589 |
| --hero-font-system |  |  |  |  |  | src/styles/dashboard-presentation.css:588 |
| --hero-text-positive |  |  |  |  |  | src/styles/dashboard-presentation.css:598 |
| --hero-text-primary |  |  |  |  |  | src/styles/dashboard-presentation.css:595 |
| --hero-text-secondary |  |  |  |  |  | src/styles/dashboard-presentation.css:596 |
| --hero-text-tertiary |  |  |  |  |  | src/styles/dashboard-presentation.css:597 |
| --info-color |  | src/styles/dashboard-macros.css:69 |  |  |  | src/styles/dashboard-presentation.css:87 |
| --mono |  |  |  |  |  | src/styles/dashboard-presentation.css:47 |
| --protein-bg |  | src/styles/dashboard-macros.css:39 |  |  |  | src/styles/dashboard-presentation.css:57 |
| --protein-bg-mid |  | src/styles/dashboard-macros.css:40 |  |  |  | src/styles/dashboard-presentation.css:58 |
| --protein-color |  | src/styles/dashboard-macros.css:34 |  |  |  | src/styles/dashboard-presentation.css:52 |
| --protein-color-light |  | src/styles/dashboard-macros.css:35 |  |  |  | src/styles/dashboard-presentation.css:53 |
| --protein-color-lighter |  | src/styles/dashboard-macros.css:36 |  |  |  | src/styles/dashboard-presentation.css:54 |
| --protein-glow |  | src/styles/dashboard-macros.css:37 |  |  |  | src/styles/dashboard-presentation.css:55 |
| --protein-glow-strong |  | src/styles/dashboard-macros.css:38 |  |  |  | src/styles/dashboard-presentation.css:56 |
| --protein-gradient |  | src/styles/dashboard-macros.css:41 |  |  |  | src/styles/dashboard-presentation.css:59 |
| --protein-gradient-h |  | src/styles/dashboard-macros.css:42 |  |  |  | src/styles/dashboard-presentation.css:60 |
| --radius-2xl |  | src/styles/dashboard-macros.css:76 | src/styles/dashboard-final.css:43 | src/styles/dashboard-supplements.css:96 | src/styles/dashboard-simulator.css:47 | src/styles/dashboard-presentation.css:96 |
| --radius-3xl |  | src/styles/dashboard-macros.css:77 |  |  |  | src/styles/dashboard-presentation.css:97 |
| --radius-control |  |  |  |  |  | src/styles/dashboard-presentation.css:33 |
| --radius-full |  | src/styles/dashboard-macros.css:78 | src/styles/dashboard-final.css:44 | src/styles/dashboard-supplements.css:97 |  | src/styles/dashboard-presentation.css:98 \|\| src/styles/dashboard-presentation.css:606 |
| --radius-lg | src/styles/tokens.css:43 | src/styles/dashboard-macros.css:74 | src/styles/dashboard-final.css:41 | src/styles/dashboard-supplements.css:94 | src/styles/dashboard-simulator.css:45 | src/styles/dashboard-presentation.css:25 |
| --radius-md | src/styles/tokens.css:42 | src/styles/dashboard-macros.css:73 | src/styles/dashboard-final.css:40 | src/styles/dashboard-supplements.css:93 | src/styles/dashboard-simulator.css:44 | src/styles/dashboard-presentation.css:24 |
| --radius-pill | src/styles/tokens.css:45 |  |  |  |  |  |
| --radius-sm | src/styles/tokens.css:41 | src/styles/dashboard-macros.css:72 | src/styles/dashboard-final.css:39 | src/styles/dashboard-supplements.css:92 | src/styles/dashboard-simulator.css:43 | src/styles/dashboard-presentation.css:23 |
| --radius-xl | src/styles/tokens.css:44 | src/styles/dashboard-macros.css:75 | src/styles/dashboard-final.css:42 | src/styles/dashboard-supplements.css:95 | src/styles/dashboard-simulator.css:46 | src/styles/dashboard-presentation.css:26 |
| --radius-xs |  | src/styles/dashboard-macros.css:71 |  |  |  | src/styles/dashboard-presentation.css:95 |
| --red |  |  |  |  |  | src/styles/dashboard-presentation.css:35 |
| --red-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:36 |
| --red-text |  |  |  |  |  | src/styles/dashboard-presentation.css:37 |
| --shadow-2xl |  | src/styles/dashboard-macros.css:84 |  |  |  |  |
| --shadow-accent |  |  | src/styles/dashboard-final.css:36 |  |  |  |
| --shadow-card | src/styles/tokens.css:50 |  |  |  |  |  |
| --shadow-card-hover | src/styles/tokens.css:51 |  |  |  |  |  |
| --shadow-cyan | src/styles/tokens.css:49 |  |  |  |  |  |
| --shadow-glow-accent |  |  |  | src/styles/dashboard-supplements.css:104 |  |  |
| --shadow-gold |  |  | src/styles/dashboard-final.css:37 |  |  |  |
| --shadow-inner |  | src/styles/dashboard-macros.css:85 |  |  |  | src/styles/dashboard-presentation.css:104 |
| --shadow-lg |  | src/styles/dashboard-macros.css:82 | src/styles/dashboard-final.css:34 | src/styles/dashboard-supplements.css:102 | src/styles/dashboard-simulator.css:38 | src/styles/dashboard-presentation.css:102 |
| --shadow-lime | src/styles/tokens.css:47 |  |  |  |  |  |
| --shadow-md |  | src/styles/dashboard-macros.css:81 | src/styles/dashboard-final.css:33 | src/styles/dashboard-supplements.css:101 | src/styles/dashboard-simulator.css:37 | src/styles/dashboard-presentation.css:101 |
| --shadow-red |  |  |  |  | src/styles/dashboard-simulator.css:40 |  |
| --shadow-red-sm |  |  |  |  | src/styles/dashboard-simulator.css:41 |  |
| --shadow-sm |  | src/styles/dashboard-macros.css:80 | src/styles/dashboard-final.css:32 | src/styles/dashboard-supplements.css:100 | src/styles/dashboard-simulator.css:36 | src/styles/dashboard-presentation.css:100 |
| --shadow-violet | src/styles/tokens.css:48 |  |  |  |  |  |
| --shadow-xl |  | src/styles/dashboard-macros.css:83 | src/styles/dashboard-final.css:35 | src/styles/dashboard-supplements.css:103 | src/styles/dashboard-simulator.css:39 | src/styles/dashboard-presentation.css:103 |
| --space-1 |  |  |  | src/styles/dashboard-supplements.css:78 |  |  |
| --space-10 |  |  |  | src/styles/dashboard-supplements.css:85 |  |  |
| --space-12 |  |  |  | src/styles/dashboard-supplements.css:86 |  |  |
| --space-16 |  |  |  | src/styles/dashboard-supplements.css:87 |  |  |
| --space-2 |  |  |  | src/styles/dashboard-supplements.css:79 |  |  |
| --space-20 |  |  |  | src/styles/dashboard-supplements.css:88 |  |  |
| --space-24 |  |  |  | src/styles/dashboard-supplements.css:89 |  |  |
| --space-3 |  |  |  | src/styles/dashboard-supplements.css:80 |  |  |
| --space-4 |  |  |  | src/styles/dashboard-supplements.css:81 |  |  |
| --space-5 |  |  |  | src/styles/dashboard-supplements.css:82 |  |  |
| --space-6 |  |  |  | src/styles/dashboard-supplements.css:83 |  |  |
| --space-8 |  |  |  | src/styles/dashboard-supplements.css:84 |  |  |
| --spacing-1 |  |  |  |  |  | src/styles/dashboard-presentation.css:607 |
| --spacing-10 |  |  |  |  |  | src/styles/dashboard-presentation.css:614 |
| --spacing-12 |  |  |  |  |  | src/styles/dashboard-presentation.css:615 |
| --spacing-16 |  |  |  |  |  | src/styles/dashboard-presentation.css:616 |
| --spacing-2 |  |  |  |  |  | src/styles/dashboard-presentation.css:608 |
| --spacing-2xl |  |  |  |  |  | src/styles/dashboard-presentation.css:20 |
| --spacing-3 |  |  |  |  |  | src/styles/dashboard-presentation.css:609 |
| --spacing-3xl |  |  |  |  |  | src/styles/dashboard-presentation.css:21 |
| --spacing-4 |  |  |  |  |  | src/styles/dashboard-presentation.css:610 |
| --spacing-4xl |  |  |  |  |  | src/styles/dashboard-presentation.css:22 |
| --spacing-5 |  |  |  |  |  | src/styles/dashboard-presentation.css:611 |
| --spacing-6 |  |  |  |  |  | src/styles/dashboard-presentation.css:612 |
| --spacing-8 |  |  |  |  |  | src/styles/dashboard-presentation.css:613 |
| --spacing-lg |  |  |  |  |  | src/styles/dashboard-presentation.css:18 |
| --spacing-md |  |  |  |  |  | src/styles/dashboard-presentation.css:17 |
| --spacing-sm |  |  |  |  |  | src/styles/dashboard-presentation.css:16 |
| --spacing-xl |  |  |  |  |  | src/styles/dashboard-presentation.css:19 |
| --spacing-xs |  |  |  |  |  | src/styles/dashboard-presentation.css:15 |
| --success-bg |  | src/styles/dashboard-macros.css:66 |  |  |  | src/styles/dashboard-presentation.css:84 |
| --success-color |  | src/styles/dashboard-macros.css:64 |  |  |  | src/styles/dashboard-presentation.css:82 |
| --success-glow |  | src/styles/dashboard-macros.css:65 |  |  |  | src/styles/dashboard-presentation.css:83 |
| --sup-creatina-glow |  |  |  | src/styles/dashboard-supplements.css:26 |  |  |
| --sup-creatina-hue |  |  |  | src/styles/dashboard-supplements.css:23 |  |  |
| --sup-creatina-mid |  |  |  | src/styles/dashboard-supplements.css:25 |  |  |
| --sup-creatina-primary |  |  |  | src/styles/dashboard-supplements.css:24 |  |  |
| --sup-creatina-ultra |  |  |  | src/styles/dashboard-supplements.css:27 |  |  |
| --sup-mag-glow |  |  |  | src/styles/dashboard-supplements.css:51 |  |  |
| --sup-mag-hue |  |  |  | src/styles/dashboard-supplements.css:48 |  |  |
| --sup-mag-mid |  |  |  | src/styles/dashboard-supplements.css:50 |  |  |
| --sup-mag-primary |  |  |  | src/styles/dashboard-supplements.css:49 |  |  |
| --sup-mag-ultra |  |  |  | src/styles/dashboard-supplements.css:52 |  |  |
| --sup-omega-glow |  |  |  | src/styles/dashboard-supplements.css:45 |  |  |
| --sup-omega-hue |  |  |  | src/styles/dashboard-supplements.css:42 |  |  |
| --sup-omega-mid |  |  |  | src/styles/dashboard-supplements.css:44 |  |  |
| --sup-omega-primary |  |  |  | src/styles/dashboard-supplements.css:43 |  |  |
| --sup-omega-ultra |  |  |  | src/styles/dashboard-supplements.css:46 |  |  |
| --sup-vitd-glow |  |  |  | src/styles/dashboard-supplements.css:32 |  |  |
| --sup-vitd-hue |  |  |  | src/styles/dashboard-supplements.css:29 |  |  |
| --sup-vitd-mid |  |  |  | src/styles/dashboard-supplements.css:31 |  |  |
| --sup-vitd-primary |  |  |  | src/styles/dashboard-supplements.css:30 |  |  |
| --sup-vitd-ultra |  |  |  | src/styles/dashboard-supplements.css:33 |  |  |
| --sup-whey-glow |  |  |  | src/styles/dashboard-supplements.css:38 |  |  |
| --sup-whey-hue |  |  |  | src/styles/dashboard-supplements.css:35 |  |  |
| --sup-whey-mid |  |  |  | src/styles/dashboard-supplements.css:37 |  |  |
| --sup-whey-primary |  |  |  | src/styles/dashboard-supplements.css:36 |  |  |
| --sup-whey-ultra |  |  |  | src/styles/dashboard-supplements.css:39 |  |  |
| --surface |  |  |  |  |  | src/styles/dashboard-presentation.css:39 |
| --surface-1 | src/styles/tokens.css:9 |  |  |  |  |  |
| --surface-2 | src/styles/tokens.css:10 |  |  |  |  | src/styles/dashboard-presentation.css:40 |
| --surface-3 | src/styles/tokens.css:11 |  |  |  |  | src/styles/dashboard-presentation.css:41 |
| --tdee-accent |  |  |  |  |  | src/styles/dashboard-presentation.css:1671 |
| --tdee-accent-glow |  |  |  |  |  | src/styles/dashboard-presentation.css:1672 |
| --tdee-bg-card |  |  |  |  |  | src/styles/dashboard-presentation.css:1663 |
| --tdee-bg-card-hover |  |  |  |  |  | src/styles/dashboard-presentation.css:1664 |
| --tdee-bg-deep |  |  |  |  |  | src/styles/dashboard-presentation.css:1662 |
| --tdee-border-medium |  |  |  |  |  | src/styles/dashboard-presentation.css:1666 |
| --tdee-border-subtle |  |  |  |  |  | src/styles/dashboard-presentation.css:1665 |
| --tdee-color-bmr |  |  |  |  |  | src/styles/dashboard-presentation.css:1673 |
| --tdee-color-bmr-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:1678 |
| --tdee-color-cardio |  |  |  |  |  | src/styles/dashboard-presentation.css:1676 |
| --tdee-color-cardio-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:1681 |
| --tdee-color-eat |  |  |  |  |  | src/styles/dashboard-presentation.css:1675 |
| --tdee-color-eat-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:1680 |
| --tdee-color-neat |  |  |  |  |  | src/styles/dashboard-presentation.css:1674 |
| --tdee-color-neat-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:1679 |
| --tdee-color-tef |  |  |  |  |  | src/styles/dashboard-presentation.css:1677 |
| --tdee-color-tef-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:1682 |
| --tdee-ease-out-expo |  |  |  |  |  | src/styles/dashboard-presentation.css:1685 |
| --tdee-ease-out-quart |  |  |  |  |  | src/styles/dashboard-presentation.css:1686 |
| --tdee-font-mono |  |  |  |  |  | src/styles/dashboard-presentation.css:1684 |
| --tdee-font-sans |  |  |  |  |  | src/styles/dashboard-presentation.css:1683 |
| --tdee-text-muted |  |  |  |  |  | src/styles/dashboard-presentation.css:1670 |
| --tdee-text-primary |  |  |  |  |  | src/styles/dashboard-presentation.css:1667 |
| --tdee-text-secondary |  |  |  |  |  | src/styles/dashboard-presentation.css:1668 |
| --tdee-text-tertiary |  |  |  |  |  | src/styles/dashboard-presentation.css:1669 |
| --text |  |  |  |  |  | src/styles/dashboard-presentation.css:44 |
| --text-2xl |  |  |  | src/styles/dashboard-supplements.css:64 |  |  |
| --text-3xl |  |  |  | src/styles/dashboard-supplements.css:65 |  |  |
| --text-4xl |  |  |  | src/styles/dashboard-supplements.css:66 |  |  |
| --text-5xl |  |  |  | src/styles/dashboard-supplements.css:67 |  |  |
| --text-accent | src/styles/tokens.css:35 |  |  |  |  |  |
| --text-base |  |  |  | src/styles/dashboard-supplements.css:61 |  |  |
| --text-dim |  |  |  |  |  | src/styles/dashboard-presentation.css:45 |
| --text-disabled |  |  |  |  | src/styles/dashboard-simulator.css:29 |  |
| --text-lg |  |  |  | src/styles/dashboard-supplements.css:62 |  |  |
| --text-muted |  | src/styles/dashboard-macros.css:26 |  |  | src/styles/dashboard-simulator.css:28 | src/styles/dashboard-presentation.css:11 \|\| src/styles/dashboard-presentation.css:145 |
| --text-muted-legacy |  |  |  |  |  | src/styles/dashboard-presentation.css:46 |
| --text-positive |  |  |  |  |  | src/styles/dashboard-presentation.css:628 |
| --text-primary | src/styles/tokens.css:32 | src/styles/dashboard-macros.css:23 |  |  | src/styles/dashboard-simulator.css:26 | src/styles/dashboard-presentation.css:8 \|\| src/styles/dashboard-presentation.css:625 |
| --text-secondary | src/styles/tokens.css:33 | src/styles/dashboard-macros.css:24 |  |  | src/styles/dashboard-simulator.css:27 | src/styles/dashboard-presentation.css:9 \|\| src/styles/dashboard-presentation.css:626 |
| --text-sm |  |  |  | src/styles/dashboard-supplements.css:60 |  |  |
| --text-tertiary | src/styles/tokens.css:34 | src/styles/dashboard-macros.css:25 |  |  |  | src/styles/dashboard-presentation.css:10 \|\| src/styles/dashboard-presentation.css:627 |
| --text-white |  | src/styles/dashboard-macros.css:27 |  |  |  |  |
| --text-xl |  |  |  | src/styles/dashboard-supplements.css:63 |  |  |
| --text-xs |  |  |  | src/styles/dashboard-supplements.css:59 |  |  |
| --transition-base | src/styles/tokens.css:54 | src/styles/dashboard-macros.css:91 | src/styles/dashboard-final.css:50 | src/styles/dashboard-supplements.css:108 |  |  |
| --transition-default |  |  |  |  |  | src/styles/dashboard-presentation.css:31 |
| --transition-fast | src/styles/tokens.css:53 | src/styles/dashboard-macros.css:90 | src/styles/dashboard-final.css:49 | src/styles/dashboard-supplements.css:107 | src/styles/dashboard-simulator.css:57 | src/styles/dashboard-presentation.css:30 |
| --transition-normal |  |  |  |  | src/styles/dashboard-simulator.css:58 |  |
| --transition-screen | src/styles/tokens.css:56 |  |  |  |  |  |
| --transition-slow | src/styles/tokens.css:55 | src/styles/dashboard-macros.css:92 | src/styles/dashboard-final.css:51 | src/styles/dashboard-supplements.css:109 | src/styles/dashboard-simulator.css:59 | src/styles/dashboard-presentation.css:32 |
| --transition-smooth |  | src/styles/dashboard-macros.css:94 |  |  |  |  |
| --transition-spring |  | src/styles/dashboard-macros.css:93 | src/styles/dashboard-final.css:52 | src/styles/dashboard-supplements.css:110 | src/styles/dashboard-simulator.css:60 | src/styles/dashboard-presentation.css:109 |
| --warning-bg |  | src/styles/dashboard-macros.css:68 |  |  |  | src/styles/dashboard-presentation.css:86 |
| --warning-color |  | src/styles/dashboard-macros.css:67 |  |  |  | src/styles/dashboard-presentation.css:85 |
| --weight-black |  |  |  | src/styles/dashboard-supplements.css:75 |  |  |
| --weight-bold |  |  |  | src/styles/dashboard-supplements.css:74 |  |  |
| --weight-light |  |  |  | src/styles/dashboard-supplements.css:70 |  |  |
| --weight-medium |  |  |  | src/styles/dashboard-supplements.css:72 |  |  |
| --weight-regular |  |  |  | src/styles/dashboard-supplements.css:71 |  |  |
| --weight-semibold |  |  |  | src/styles/dashboard-supplements.css:73 |  |  |
| --z-base |  |  |  | src/styles/dashboard-supplements.css:113 |  |  |
| --z-float |  |  |  | src/styles/dashboard-supplements.css:115 |  |  |
| --z-modal |  |  |  | src/styles/dashboard-supplements.css:117 |  |  |
| --z-overlay |  |  |  | src/styles/dashboard-supplements.css:116 |  |  |
| --z-raised |  |  |  | src/styles/dashboard-supplements.css:114 |  |  |
| --z-tooltip |  |  |  | src/styles/dashboard-supplements.css:118 |  |  |

## Apendice - Variaveis fora dos 6 sistemas alvo

| Variavel | Arquivo(s) de origem | Valor(es) | Acao |
|---|---|---|---|
| --accent-muted | src/styles/dashboard-meals.css | rgba(230, 57, 70, 0.15) [src/styles/dashboard-meals.css:20] | MANTER OVERRIDE |
| --accent-primary | src/styles/dashboard-meals.css | #e63946 [src/styles/dashboard-meals.css:17] | MANTER OVERRIDE |
| --accent-secondary | src/styles/dashboard-meals.css | #ff4d5a [src/styles/dashboard-meals.css:18] | MANTER OVERRIDE |
| --accent-tertiary | src/styles/dashboard-meals.css | #ff6b76 [src/styles/dashboard-meals.css:19] | MANTER OVERRIDE |
| --bg-card-inner | src/styles/dashboard-meals.css | #1e1e24 [src/styles/dashboard-meals.css:13] | MANTER OVERRIDE |
| --border-active | src/styles/dashboard-projection.css | rgba(230,57,70,0.4) [src/styles/dashboard-projection.css:46] | MANTER OVERRIDE |
| --border-light | src/styles/dashboard-meals.css | rgba(255, 255, 255, 0.07) [src/styles/dashboard-meals.css:45] | MANTER OVERRIDE |
| --border-teal | src/styles/dashboard-projection.css | rgba(45,212,191,0.3) [src/styles/dashboard-projection.css:47] | MANTER OVERRIDE |
| --carb | src/styles/dashboard-meals.css | :before { background: var(--carb-color) [src/styles/dashboard-meals.css:941] | MANTER OVERRIDE |
| --chart-bf-color | src/styles/dashboard-projection.css | #2dd4bf [src/styles/dashboard-projection.css:88] | MANTER OVERRIDE |
| --chart-lbm-color | src/styles/dashboard-projection.css | #a855f7 [src/styles/dashboard-projection.css:89] | MANTER OVERRIDE |
| --chart-weight-color | src/styles/dashboard-projection.css | #e63946 [src/styles/dashboard-projection.css:87] | MANTER OVERRIDE |
| --color-accent-bright | src/styles/dashboard-projection.css | #ff4757 [src/styles/dashboard-projection.css:18] | MANTER OVERRIDE |
| --color-amber | src/styles/dashboard-projection.css | #f59e0b [src/styles/dashboard-projection.css:29] | MANTER OVERRIDE |
| --color-amber-muted | src/styles/dashboard-projection.css | rgba(245,158,11,0.12) [src/styles/dashboard-projection.css:30] | MANTER OVERRIDE |
| --color-bg-glass | src/styles/dashboard-projection.css | rgba(255,255,255,0.03) [src/styles/dashboard-projection.css:13] | MANTER OVERRIDE |
| --color-bg-glass-hover | src/styles/dashboard-projection.css | rgba(255,255,255,0.06) [src/styles/dashboard-projection.css:14] | MANTER OVERRIDE |
| --color-bg-primary | src/styles/dashboard-projection.css | #0a0a0f [src/styles/dashboard-projection.css:8] | MANTER OVERRIDE |
| --color-bg-secondary | src/styles/dashboard-projection.css | #0f0f1a [src/styles/dashboard-projection.css:9] | MANTER OVERRIDE |
| --color-blue | src/styles/dashboard-projection.css | #3b82f6 [src/styles/dashboard-projection.css:31] | MANTER OVERRIDE |
| --color-blue-muted | src/styles/dashboard-projection.css | rgba(59,130,246,0.12) [src/styles/dashboard-projection.css:32] | MANTER OVERRIDE |
| --color-green | src/styles/dashboard-projection.css | #22c55e [src/styles/dashboard-projection.css:33] | MANTER OVERRIDE |
| --color-green-muted | src/styles/dashboard-projection.css | rgba(34,197,94,0.12) [src/styles/dashboard-projection.css:34] | MANTER OVERRIDE |
| --color-kpi-accent-soft | src/styles/screens.css | #e17c84 [src/styles/screens.css:3386] | MANTER OVERRIDE |
| --color-kpi-positive-soft | src/styles/screens.css | #6eb38f [src/styles/screens.css:3387] | MANTER OVERRIDE |
| --color-purple | src/styles/dashboard-projection.css | #a855f7 [src/styles/dashboard-projection.css:27] | MANTER OVERRIDE |
| --color-purple-muted | src/styles/dashboard-projection.css | rgba(168,85,247,0.15) [src/styles/dashboard-projection.css:28] | MANTER OVERRIDE |
| --color-section-title | src/styles/screens.css | #e2e8f0 [src/styles/screens.css:3385] | MANTER OVERRIDE |
| --color-teal | src/styles/dashboard-projection.css | #2dd4bf [src/styles/dashboard-projection.css:24] | MANTER OVERRIDE |
| --color-teal-glow | src/styles/dashboard-projection.css | rgba(45,212,191,0.25) [src/styles/dashboard-projection.css:26] | MANTER OVERRIDE |
| --color-teal-muted | src/styles/dashboard-projection.css | rgba(45,212,191,0.15) [src/styles/dashboard-projection.css:25] | MANTER OVERRIDE |
| --dash-accent | src/styles/screens.css | #ff3030 [src/styles/screens.css:3378] | MANTER OVERRIDE |
| --dash-muted | src/styles/screens.css | rgba(248, 249, 255, 0.65) [src/styles/screens.css:3381] \|\| rgba(21, 24, 33, 0.66) [src/styles/screens.css:4342] | MANTER OVERRIDE |
| --dash-positive | src/styles/screens.css | #32b86f [src/styles/screens.css:3383] | MANTER OVERRIDE |
| --dash-soft | src/styles/screens.css | rgba(248, 249, 255, 0.35) [src/styles/screens.css:3382] \|\| rgba(21, 24, 33, 0.4) [src/styles/screens.css:4343] | MANTER OVERRIDE |
| --dash-surface | src/styles/screens.css | rgba(8, 8, 12, 0.76) [src/styles/screens.css:3379] \|\| rgba(255, 255, 255, 0.88) [src/styles/screens.css:4340] | MANTER OVERRIDE |
| --dash-text | src/styles/screens.css | #f8f9ff [src/styles/screens.css:3380] \|\| #151821 [src/styles/screens.css:4341] | MANTER OVERRIDE |
| --dash-yellow | src/styles/screens.css | #facc15 [src/styles/screens.css:3384] | MANTER OVERRIDE |
| --duration-normal | src/styles/dashboard-meals.css | 250ms [src/styles/dashboard-meals.css:88] | MANTER OVERRIDE |
| --duration-slower | src/styles/dashboard-meals.css | 600ms [src/styles/dashboard-meals.css:90] | MANTER OVERRIDE |
| --elev-1 | src/styles/dashboard-projection.css | 0 12px 32px rgba(2,4,18,0.4), 0 0 0 1px rgba(255,255,255,0.02) inset [src/styles/dashboard-projection.css:1919] | MANTER OVERRIDE |
| --elev-2 | src/styles/dashboard-projection.css | 0 18px 48px rgba(2,4,18,0.48), 0 0 0 1px rgba(255,255,255,0.03) inset [src/styles/dashboard-projection.css:1920] | MANTER OVERRIDE |
| --elev-3 | src/styles/dashboard-projection.css | 0 28px 74px rgba(2,4,18,0.56), 0 0 0 1px rgba(255,255,255,0.035) inset [src/styles/dashboard-projection.css:1921] | MANTER OVERRIDE |
| --fat | src/styles/dashboard-meals.css | :before { background: var(--fat-color) [src/styles/dashboard-meals.css:942] | MANTER OVERRIDE |
| --font-copy | src/styles/dashboard-projection.css | 'Inter', 'Space Grotesk', -apple-system, system-ui, sans-serif [src/styles/dashboard-projection.css:1926] | MANTER OVERRIDE |
| --form-accent | src/styles/screens.css | #ff2a2a [src/styles/screens.css:4689] \|\| #ff2a2a [src/styles/screens.css:5877] | MANTER OVERRIDE |
| --form-accent-border | src/styles/screens.css | rgba(255, 42, 42, 0.45) [src/styles/screens.css:4693] | MANTER OVERRIDE |
| --form-accent-dark | src/styles/screens.css | #cc0000 [src/styles/screens.css:4691] | MANTER OVERRIDE |
| --form-accent-glow | src/styles/screens.css | rgba(255, 42, 42, 0.2) [src/styles/screens.css:4694] | MANTER OVERRIDE |
| --form-accent-hover | src/styles/screens.css | #ff4444 [src/styles/screens.css:4690] | MANTER OVERRIDE |
| --form-accent-soft | src/styles/screens.css | rgba(255, 42, 42, 0.15) [src/styles/screens.css:4692] | MANTER OVERRIDE |
| --form-border | src/styles/screens.css | rgba(255, 255, 255, 0.08) [src/styles/screens.css:4697] | MANTER OVERRIDE |
| --form-surface | src/styles/screens.css | #111111 [src/styles/screens.css:4695] | MANTER OVERRIDE |
| --form-surface-hover | src/styles/screens.css | #161616 [src/styles/screens.css:4696] | MANTER OVERRIDE |
| --form-text-secondary | src/styles/screens.css | rgba(255, 255, 255, 0.55) [src/styles/screens.css:4698] | MANTER OVERRIDE |
| --form-text-tertiary | src/styles/screens.css | rgba(255, 255, 255, 0.35) [src/styles/screens.css:4699] | MANTER OVERRIDE |
| --glow-purple | src/styles/dashboard-projection.css | rgba(168,85,247,0.15) [src/styles/dashboard-projection.css:1924] | MANTER OVERRIDE |
| --glow-red | src/styles/dashboard-projection.css | rgba(230,57,70,0.2) [src/styles/dashboard-projection.css:1922] | MANTER OVERRIDE |
| --glow-teal | src/styles/dashboard-projection.css | rgba(45,212,191,0.16) [src/styles/dashboard-projection.css:1923] | MANTER OVERRIDE |
| --kcal-bg | src/styles/dashboard-meals.css | rgba(46, 196, 182, 0.12) [src/styles/dashboard-meals.css:35] | MANTER OVERRIDE |
| --kcal-color | src/styles/dashboard-meals.css | #2ec4b6 [src/styles/dashboard-meals.css:34] | MANTER OVERRIDE |
| --macro-track-gap | src/styles/screens.css | 8px [src/styles/screens.css:1623] \|\| 14px [src/styles/screens.css:3721] | MANTER OVERRIDE |
| --macro-track-size | src/styles/screens.css | 10px [src/styles/screens.css:1622] \|\| 12px [src/styles/screens.css:3720] | MANTER OVERRIDE |
| --protein | src/styles/dashboard-meals.css | :before { background: var(--protein-color) [src/styles/dashboard-meals.css:940] | MANTER OVERRIDE |
| --range-thumb-bg | src/styles/screens.css | #0a0a0a [src/styles/screens.css:728] \|\| #0a0a0a [src/styles/screens.css:4226] \|\| #130a1d [src/styles/screens.css:4232] \|\| #1b0f08 [src/styles/screens.css:4238] \|\| #08151b [src/styles/screens.css:4244] \|\| #0d0d0d [src/styles/screens.css:5783] | MANTER OVERRIDE |
| --range-thumb-border | src/styles/screens.css | var(--accent-lime) [src/styles/screens.css:729] \|\| var(--dash-accent) [src/styles/screens.css:4224] \|\| var(--accent-violet) [src/styles/screens.css:4230] \|\| var(--accent-orange) [src/styles/screens.css:4236] \|\| var(--accent-cyan) [src/styles/screens.css:4242] \|\| var(--form-accent) [src/styles/screens.css:5784] | MANTER OVERRIDE |
| --range-thumb-glow | src/styles/screens.css | rgba(200, 255, 0, 0.28) [src/styles/screens.css:730] \|\| rgba(255, 59, 59, 0.24) [src/styles/screens.css:4225] \|\| rgba(139, 92, 246, 0.24) [src/styles/screens.css:4231] \|\| rgba(251, 146, 60, 0.24) [src/styles/screens.css:4237] \|\| rgba(34, 211, 238, 0.24) [src/styles/screens.css:4243] \|\| rgba(255, 42, 42, 0.4) [src/styles/screens.css:5785] | MANTER OVERRIDE |
| --range-thumb-size | src/styles/screens.css | 18px [src/styles/screens.css:675] \|\| 18px [src/styles/screens.css:725] \|\| 20px [src/styles/screens.css:5782] | MANTER OVERRIDE |
| --range-track-gap | src/styles/screens.css | 8px [src/styles/screens.css:677] \|\| 8px [src/styles/screens.css:726] \|\| var(--macro-track-gap) [src/styles/screens.css:1625] \|\| var(--macro-track-gap) [src/styles/screens.css:1791] | MANTER OVERRIDE |
| --range-track-inset | src/styles/screens.css | calc(var(--range-thumb-size) / 2) [src/styles/screens.css:678] \|\| calc(var(--range-thumb-size) / 2) [src/styles/screens.css:727] \|\| calc(var(--range-thumb-size, 18px) / 2) [src/styles/screens.css:1626] | MANTER OVERRIDE |
| --range-track-size | src/styles/screens.css | 6px [src/styles/screens.css:676] \|\| 6px [src/styles/screens.css:724] \|\| var(--macro-track-size) [src/styles/screens.css:1624] \|\| var(--macro-track-size) [src/styles/screens.css:1790] \|\| 4px [src/styles/screens.css:5781] | MANTER OVERRIDE |
| --shadow-glow | src/styles/dashboard-meals.css | 0 0 40px rgba(230, 57, 70, 0.15) [src/styles/dashboard-meals.css:54] | MANTER OVERRIDE |
| --shadow-teal | src/styles/dashboard-projection.css | 0 0 30px rgba(45,212,191,0.15) [src/styles/dashboard-projection.css:55] | MANTER OVERRIDE |
| --space-32 | src/styles/dashboard-meals.css | 32px [src/styles/dashboard-meals.css:66] | MANTER OVERRIDE |
| --space-40 | src/styles/dashboard-meals.css | 40px [src/styles/dashboard-meals.css:67] | MANTER OVERRIDE |
| --space-48 | src/styles/dashboard-meals.css | 48px [src/styles/dashboard-meals.css:68] | MANTER OVERRIDE |
| --space-64 | src/styles/dashboard-meals.css | 64px [src/styles/dashboard-meals.css:69] | MANTER OVERRIDE |
| --spacing-card-gap | src/styles/screens.css | 17px [src/styles/screens.css:3389] | MANTER OVERRIDE |
| --spacing-section-gap | src/styles/screens.css | 42px [src/styles/screens.css:3388] | MANTER OVERRIDE |
| --stroke-accent | src/styles/dashboard-projection.css | rgba(230,57,70,0.34) [src/styles/dashboard-projection.css:1918] | MANTER OVERRIDE |
| --stroke-soft | src/styles/dashboard-projection.css | rgba(255,255,255,0.09) [src/styles/dashboard-projection.css:1916] | MANTER OVERRIDE |
| --stroke-strong | src/styles/dashboard-projection.css | rgba(255,255,255,0.16) [src/styles/dashboard-projection.css:1917] | MANTER OVERRIDE |

## Observacoes de classificacao

- UNIFICAR: somente quando o valor literal normalizado e identico entre 2+ sistemas.
- RENOMEAR -> PADRAO: aplicado conforme mapa de nomenclatura definido no plano.
- PROMOVER: variavel ausente em tokens.css e presente em pelo menos um sistema de secao.
- MANTER OVERRIDE: valores diferentes entre sistemas ou variavel local/global sem condicao para unificacao segura nesta fase.