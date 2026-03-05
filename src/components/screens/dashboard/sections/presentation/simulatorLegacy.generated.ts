/* eslint-disable */
/**
 * Auto-generated from legacy/simulador.html
 * Generated at: 2026-03-03T01:13:31.182Z
 */

export const LEGACY_SIMULATOR_HTML = `<div class="page-wrapper">
  <div class="simulator-root">

    <!-- =========================================== -->
    <!-- SECTION HEADER                              -->
    <!-- =========================================== -->
    <header class="section-header">
      <div class="section-header-left">
        <div class="section-badge">
          <span class="section-badge-dot"></span>
          <span class="section-badge-text">Simulador Interativo</span>
        </div>
        <h1 class="section-title">
          Protocol <span>Forge</span>
        </h1>
        <p class="section-subtitle">
          Ajuste os parâmetros em tempo real e veja como cada variável impacta seu protocolo nutricional. Os resultados são recalculados instantaneamente.
        </p>
      </div>
      <div class="section-header-right">
        <div class="header-stat">
          <span class="header-stat-label">TDEE Base</span>
          <span class="header-stat-value">2<span class="header-stat-unit">,</span>840<span class="header-stat-unit">kcal</span></span>
        </div>
        <div class="header-divider"></div>
        <div class="header-stat">
          <span class="header-stat-label">Peso Atual</span>
          <span class="header-stat-value">82<span class="header-stat-unit">.</span>4<span class="header-stat-unit">kg</span></span>
        </div>
        <div class="header-divider"></div>
        <div class="header-stat">
          <span class="header-stat-label">Gordura</span>
          <span class="header-stat-value">16<span class="header-stat-unit">.</span>2<span class="header-stat-unit">%</span></span>
        </div>
      </div>
    </header>

    <!-- =========================================== -->
    <!-- MAIN SIMULATOR GRID                         -->
    <!-- =========================================== -->
    <main class="simulator-grid" role="main">

      <!-- ======== CONTROLS PANEL ======== -->
      <section class="panel controls-panel" aria-label="Controles do Simulador">
        <div class="panel-inner-glow"></div>
        <div class="cockpit-lines" aria-hidden="true">
          <div class="cockpit-line"></div>
          <div class="cockpit-line"></div>
          <div class="cockpit-line"></div>
          <div class="cockpit-line"></div>
        </div>

        <div class="controls-panel-header">
          <div class="controls-panel-title">
            <div class="panel-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-primary)">
                <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <div>
              <div class="panel-title-text">Parâmetros de Simulação</div>
              <div class="panel-title-sub">Deslize, selecione e veja o resultado</div>
            </div>
          </div>
          <div class="status-pill">
            <span class="status-pill-dot"></span>
            LIVE
          </div>
        </div>

        <!-- CONTROLS GRID -->
        <div class="controls-grid">

          <!-- SLIDER: TREINOS POR SEMANA -->
          <div class="control-group">
            <div class="control-label-row">
              <div class="control-label">
                <div class="control-label-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>
                </div>
                <span class="control-label-text">Treinos / Semana</span>
              </div>
              <div class="control-value-display">
                <span class="control-current-value" id="val-workouts">4</span>
                <span class="control-value-unit">×/sem</span>
              </div>
            </div>

            <div class="slider-container">
              <div class="slider-track-wrapper"
                   id="slider-workouts"
                   role="slider"
                   aria-label="Treinos por semana"
                   aria-valuemin="1"
                   aria-valuemax="7"
                   aria-valuenow="4"
                   tabindex="0">
                <div class="slider-track-fill" id="fill-workouts"></div>
                <div class="slider-glow-orb" id="orb-workouts"></div>
                <div class="slider-thumb" id="thumb-workouts"></div>
              </div>
              <div class="slider-marks" id="marks-workouts"></div>
            </div>

            <div class="intensity-bar" id="intensity-workouts">
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
            </div>
          </div>

          <!-- SLIDER: CARDIO DIÁRIO -->
          <div class="control-group">
            <div class="control-label-row">
              <div class="control-label">
                <div class="control-label-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <span class="control-label-text">Cardio Diário</span>
              </div>
              <div class="control-value-display">
                <span class="control-current-value" id="val-cardio">20</span>
                <span class="control-value-unit">min</span>
              </div>
            </div>

            <div class="slider-container">
              <div class="slider-track-wrapper"
                   id="slider-cardio"
                   role="slider"
                   aria-label="Cardio diário em minutos"
                   aria-valuemin="0"
                   aria-valuemax="60"
                   aria-valuenow="20"
                   tabindex="0">
                <div class="slider-track-fill" id="fill-cardio"></div>
                <div class="slider-glow-orb" id="orb-cardio"></div>
                <div class="slider-thumb" id="thumb-cardio"></div>
              </div>
              <div class="slider-marks" id="marks-cardio"></div>
            </div>

            <div class="intensity-bar" id="intensity-cardio">
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
              <div class="intensity-segment"></div>
            </div>
          </div>

          <!-- SEPARATOR -->
          <div class="controls-section-sep control-group-full">
            <div class="controls-section-sep-line"></div>
            <span class="controls-section-sep-label">Objetivo &amp; Suplementação</span>
            <div class="controls-section-sep-line"></div>
          </div>

          <!-- OBJECTIVE SELECTOR -->
          <div class="control-group">
            <div class="control-label-row">
              <div class="control-label">
                <div class="control-label-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <span class="control-label-text">Objetivo</span>
              </div>
            </div>

            <div class="objective-selector" role="radiogroup" aria-label="Selecione seu objetivo">

              <div class="objective-option selected"
                   data-obj="hard-cut"
                   role="radio"
                   aria-checked="true"
                   tabindex="0">
                <div class="objective-icon-wrap">🔥</div>
                <div class="objective-text-col">
                  <div class="objective-name">Hard Cut</div>
                  <div class="objective-desc">Déficit agressivo — perda rápida de gordura</div>
                </div>
                <span class="objective-badge">−25%</span>
                <div class="objective-check">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="2 6 5 9 10 3"/>
                  </svg>
                </div>
              </div>

              <div class="objective-option"
                   data-obj="mini-cut"
                   role="radio"
                   aria-checked="false"
                   tabindex="0">
                <div class="objective-icon-wrap">⚡</div>
                <div class="objective-text-col">
                  <div class="objective-name">Mini Cut</div>
                  <div class="objective-desc">Déficit moderado — preserva musculatura</div>
                </div>
                <span class="objective-badge">−15%</span>
                <div class="objective-check">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="2 6 5 9 10 3"/>
                  </svg>
                </div>
              </div>

              <div class="objective-option"
                   data-obj="lean-bulk"
                   role="radio"
                   aria-checked="false"
                   tabindex="0">
                <div class="objective-icon-wrap">💪</div>
                <div class="objective-text-col">
                  <div class="objective-name">Lean Bulk</div>
                  <div class="objective-desc">Superávit limpo — ganho de massa magra</div>
                </div>
                <span class="objective-badge">+10%</span>
                <div class="objective-check">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="2 6 5 9 10 3"/>
                  </svg>
                </div>
              </div>

            </div>
          </div>

          <!-- THERMOGENIC SELECTOR -->
          <div class="control-group">
            <div class="control-label-row">
              <div class="control-label">
                <div class="control-label-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a7 7 0 0 1 7 7c0 4.41-7 13-7 13S5 13.41 5 9a7 7 0 0 1 7-7z"/>
                  </svg>
                </div>
                <span class="control-label-text">Termogênico</span>
              </div>
            </div>

            <div class="thermo-selector" role="radiogroup" aria-label="Selecione o termogênico">

              <div class="thermo-option"
                   data-thermo="none"
                   role="radio"
                   aria-checked="false"
                   tabindex="0">
                <span class="thermo-emoji">⚪</span>
                <span class="thermo-name">Nenhum</span>
                <span class="thermo-boost">+0 kcal</span>
              </div>

              <div class="thermo-option selected"
                   data-thermo="caffeine"
                   role="radio"
                   aria-checked="true"
                   tabindex="0">
                <span class="thermo-emoji">☕</span>
                <span class="thermo-name">Cafeína</span>
                <span class="thermo-boost">+80 kcal</span>
              </div>

              <div class="thermo-option"
                   data-thermo="eca"
                   role="radio"
                   aria-checked="false"
                   tabindex="0">
                <span class="thermo-emoji">💊</span>
                <span class="thermo-name">ECA Stack</span>
                <span class="thermo-boost">+200 kcal</span>
              </div>

            </div>

            <!-- Thermo warning -->
            <div id="thermo-warning" style="display:none; margin-top:8px; padding:10px 12px; background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.2); border-radius:8px; font-size:11px; color:var(--text-secondary); line-height:1.5;">
              ⚠️ <strong style="color:var(--accent-primary)">ECA Stack</strong> é um protocolo avançado. Consulte um profissional de saúde antes de utilizar.
            </div>
          </div>

        </div><!-- /controls-grid -->

      </section>

      <!-- ======== RESULT PANEL ======== -->
      <aside class="panel result-panel" aria-label="Resultado da Simulação" aria-live="polite">
        <div class="panel-inner-glow"></div>

        <!-- Result Header -->
        <div class="result-header">
          <div class="result-title-group">
            <div class="result-title">Resultado Estimado</div>
            <div class="result-protocol-name" id="result-protocol-name">Hard Cut · Cafeína</div>
          </div>
          <div class="result-update-badge" id="result-update-badge">
            <span class="result-update-dot"></span>
            CALCULANDO
          </div>
        </div>

        <!-- MAIN KPI -->
        <div class="result-main-kpi" id="result-main-kpi">
          <div class="kpi-top-row">
            <div class="kpi-label">META CALÓRICA DIÁRIA</div>
            <div class="kpi-delta negative" id="kpi-delta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 15 12 9 18 15"/>
              </svg>
              <span id="kpi-delta-val">−710</span>
            </div>
          </div>

          <div class="kpi-calorie-display">
            <span class="kpi-calorie-number" id="kpi-calories">2.130</span>
            <span class="kpi-calorie-unit">kcal</span>
          </div>

          <!-- Calorie bar viz -->
          <div class="calorie-viz">
            <div class="calorie-viz-label">
              <span>0</span>
              <span id="viz-tdee-label">TDEE: 2.840</span>
              <span id="viz-max-label">3.500</span>
            </div>
            <div class="calorie-bar-track">
              <div class="calorie-bar-tdee" id="bar-tdee" style="width:81%"></div>
              <div class="calorie-bar-target cut" id="bar-target" style="width:61%"></div>
            </div>
          </div>
        </div>

        <!-- GAUGE — DEFICIT -->
        <div class="result-main-kpi" style="background:var(--bg-elevated)">
          <div class="kpi-label">INTENSIDADE DO DÉFICIT / SUPERÁVIT</div>
          <div class="gauge-container">
            <div class="gauge-svg-wrap">
              <svg class="gauge-svg" viewBox="0 0 130 76" aria-hidden="true">
                <!-- Track -->
                <path class="gauge-track"
                      d="M 15 65 A 50 50 0 0 1 115 65"
                      stroke="var(--bg-base)"/>
                <!-- Color zones -->
                <path d="M 15 65 A 50 50 0 0 1 38 22"
                      fill="none" stroke="rgba(46,213,115,0.25)" stroke-width="10" stroke-linecap="butt"/>
                <path d="M 38 22 A 50 50 0 0 1 65 15"
                      fill="none" stroke="rgba(245,166,35,0.25)" stroke-width="10" stroke-linecap="butt"/>
                <path d="M 65 15 A 50 50 0 0 1 92 22"
                      fill="none" stroke="rgba(247,97,42,0.25)" stroke-width="10" stroke-linecap="butt"/>
                <path d="M 92 22 A 50 50 0 0 1 115 65"
                      fill="none" stroke="rgba(16,185,129,0.25)" stroke-width="10" stroke-linecap="butt"/>
                <!-- Fill arc -->
                <path class="gauge-fill"
                      id="gauge-fill-arc"
                      d="M 15 65 A 50 50 0 0 1 115 65"
                      stroke="var(--accent-primary)"
                      stroke-dasharray="157"
                      stroke-dashoffset="55"/>
                <!-- Needle -->
                <polygon class="gauge-needle"
                         id="gauge-needle"
                         points="65,62 63,65 65,35 67,65"
                         fill="var(--text-primary)"/>
                <circle cx="65" cy="65" r="5" fill="var(--bg-elevated)" stroke="var(--border-normal)" stroke-width="1.5"/>
                <circle cx="65" cy="65" r="2.5" fill="var(--text-primary)"/>
                <!-- Labels -->
                <text x="10" y="75" fill="var(--text-disabled)" font-size="8" font-family="monospace">Bulk</text>
                <text x="102" y="75" fill="var(--text-disabled)" font-size="8" font-family="monospace">Cut</text>
              </svg>
              <div class="gauge-center-text">
                <span class="gauge-center-value" id="gauge-value">−25%</span>
                <span class="gauge-center-label">Déficit</span>
              </div>
            </div>
          </div>
        </div>

        <!-- METRICS GRID -->
        <div class="result-metrics-grid">

          <div class="metric-card type-blue">
            <div class="metric-label">Novo TDEE</div>
            <div class="metric-value" id="m-tdee">2.840</div>
            <div class="metric-sub">kcal/dia</div>
            <div class="metric-sparkbar">
              <div class="metric-sparkbar-fill" id="spark-tdee" style="width:75%"></div>
            </div>
          </div>

          <div class="metric-card type-red">
            <div class="metric-label">Déficit Real</div>
            <div class="metric-value" id="m-deficit">−710</div>
            <div class="metric-sub">kcal/dia</div>
            <div class="metric-sparkbar">
              <div class="metric-sparkbar-fill" id="spark-deficit" style="width:50%"></div>
            </div>
          </div>

          <div class="metric-card type-amber">
            <div class="metric-label">Perda/Ganho</div>
            <div class="metric-value" id="m-rate">−0.72</div>
            <div class="metric-sub">kg/semana</div>
            <div class="metric-sparkbar">
              <div class="metric-sparkbar-fill" id="spark-rate" style="width:60%"></div>
            </div>
          </div>

          <div class="metric-card type-purple">
            <div class="metric-label">Prazo Est.</div>
            <div class="metric-value" id="m-weeks">9 sem</div>
            <div class="metric-sub">até a meta</div>
            <div class="metric-sparkbar">
              <div class="metric-sparkbar-fill" id="spark-weeks" style="width:65%"></div>
            </div>
          </div>

        </div>

        <!-- CLASSIFICATION -->
        <div class="classification-block extreme classification-extreme" id="classification-block">
          <div class="classification-icon-wrap" id="class-icon">🔥</div>
          <div class="classification-texts">
            <div class="classification-level-label">Classificação do Protocolo</div>
            <div class="classification-level-name" id="class-name">Agressivo Extremo</div>
            <div class="classification-desc" id="class-desc">Déficit elevado. Alto risco de perda muscular sem treino adequado.</div>
          </div>
        </div>

        <!-- MACRO BREAKDOWN -->
        <div class="macro-breakdown">
          <div class="macro-breakdown-header">
            <span class="macro-breakdown-title">Distribuição de Macros</span>
            <span class="macro-breakdown-total" id="macro-total">2.130 kcal</span>
          </div>
          <div class="macro-stacked-bar">
            <div class="macro-bar-protein" id="macro-bar-p" style="flex:1.8"></div>
            <div class="macro-bar-carbs" id="macro-bar-c" style="flex:1.2"></div>
            <div class="macro-bar-fat" id="macro-bar-f" style="flex:0.6"></div>
          </div>
          <div class="macro-legend">
            <div class="macro-legend-item">
              <div class="macro-legend-dot-row">
                <div class="macro-dot protein"></div>
                <span class="macro-legend-label">Prot</span>
              </div>
              <span class="macro-legend-value" id="macro-p">213</span>
              <span class="macro-legend-unit">g/dia</span>
            </div>
            <div class="macro-legend-item">
              <div class="macro-legend-dot-row">
                <div class="macro-dot carbs"></div>
                <span class="macro-legend-label">Carb</span>
              </div>
              <span class="macro-legend-value" id="macro-c">160</span>
              <span class="macro-legend-unit">g/dia</span>
            </div>
            <div class="macro-legend-item">
              <div class="macro-legend-dot-row">
                <div class="macro-dot fat"></div>
                <span class="macro-legend-label">Gord</span>
              </div>
              <span class="macro-legend-value" id="macro-f">57</span>
              <span class="macro-legend-unit">g/dia</span>
            </div>
          </div>
        </div>

        <!-- DIFF SUMMARY -->
        <div class="diff-summary">
          <div class="diff-summary-header">Comparativo: Atual → Simulação</div>

          <div class="diff-row">
            <span class="diff-row-label">TDEE</span>
            <span class="diff-row-before">2.760</span>
            <span class="diff-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
            <span class="diff-row-after up" id="diff-tdee">2.840</span>
            <span class="diff-row-delta up" id="diff-tdee-d">+80</span>
          </div>

          <div class="diff-row">
            <span class="diff-row-label">Meta</span>
            <span class="diff-row-before">2.070</span>
            <span class="diff-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
            <span class="diff-row-after down" id="diff-meta">2.130</span>
            <span class="diff-row-delta up" id="diff-meta-d">+60</span>
          </div>

          <div class="diff-row">
            <span class="diff-row-label">Taxa/sem</span>
            <span class="diff-row-before">−0.65 kg</span>
            <span class="diff-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
            <span class="diff-row-after down" id="diff-rate">−0.72 kg</span>
            <span class="diff-row-delta down" id="diff-rate-d">−0.07</span>
          </div>

        </div>

        <!-- DEADLINE -->
        <div class="deadline-display">
          <div class="deadline-left">
            <div class="deadline-label">Prazo para Meta</div>
            <div class="deadline-value" id="deadline-value">~9 semanas</div>
            <div class="deadline-sub" id="deadline-date">Previsão: ~Setembro 2025</div>
          </div>
          <div class="deadline-timeline">
            <div class="timeline-weeks" id="timeline-dots"></div>
            <div class="timeline-label" id="timeline-label">9 semanas</div>
          </div>
        </div>

      </aside>

      <!-- ======== ACTIONS PANEL ======== -->
      <div class="panel actions-panel" role="toolbar" aria-label="Ações do Simulador">

        <div class="actions-left">
          <button class="action-btn btn-clear" id="btn-clear" aria-label="Limpar simulação e resetar valores">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.2"/>
            </svg>
            Limpar Simulação
          </button>

          <div class="simulation-info-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Simulação não salva automaticamente
          </div>
        </div>

        <div class="actions-right">
          <button class="action-btn btn-apply" id="btn-apply" aria-label="Aplicar simulação ao protocolo ativo">
            Aplicar Simulação
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

      </div>

    </main>

  </div>
</div>

<!-- Toast Container -->
<div class="toast-container" id="toast-container" role="status" aria-live="polite"></div>

<!-- =========================================== -->
<!-- JAVASCRIPT                                  -->
<!-- =========================================== -->`;

export const LEGACY_SIMULATOR_SCRIPT = `// =========================================== //
  // STATE MANAGEMENT                            //
  // =========================================== //
  const state = {
    workouts:   4,    // 1-7
    cardio:     20,   // 0-60 min
    objective:  'hard-cut',
    thermo:     'caffeine',

    // Base user data (from profile — read-only)
    baseTDEE:   2760,
    weight:     82.4,
    fatPercent: 16.2,
    fatMass:    13.35,  // kg de gordura (82.4 * 0.162)
    goalFatPct: 10,     // meta: 10% de gordura
  };

  const DEFAULT_STATE = { ...state };

  // Thermogenic bonus kcal/day
  const THERMO_BONUS = { none: 0, caffeine: 80, eca: 200 };

  // Cardio kcal/min
  const CARDIO_KCAL_PER_MIN = 8;

  // Workout activity bonus (on top of baseTDEE)
  const WORKOUT_BONUS_PER_SESSION = 60; // kcal per workout session per week, spread daily
  // e.g. 4 sessions × 60 kcal = 240 weekly / 7 = ~34/day

  // Objective multipliers vs TDEE
  const OBJECTIVE_CONFIG = {
    'hard-cut': { name: 'Hard Cut · Cafeína', label: 'Hard Cut', deficit: -0.25, icon: '🔥', color: 'green' },
    'mini-cut': { name: 'Mini Cut',           label: 'Mini Cut', deficit: -0.15, icon: '⚡', color: 'orange' },
    'lean-bulk':{ name: 'Lean Bulk',          label: 'Lean Bulk',deficit: +0.10, icon: '💪', color: 'green' },
  };

  // =========================================== //
  // CALCULATION ENGINE                          //
  // =========================================== //
  function calculate(s) {
    const thermoBonus  = THERMO_BONUS[s.thermo];
    const cardioBonus  = Math.round(s.cardio * CARDIO_KCAL_PER_MIN);
    const workoutBonus = Math.round((s.workouts * WORKOUT_BONUS_PER_SESSION) / 7);
    const newTDEE      = s.baseTDEE + thermoBonus + cardioBonus + workoutBonus;

    const objConfig   = OBJECTIVE_CONFIG[s.objective];
    const targetCals  = Math.round(newTDEE * (1 + objConfig.deficit));
    const deficitReal = targetCals - newTDEE;

    // Weekly rate: 7700 kcal = 1 kg of fat
    const weeklyRateKg = (deficitReal * 7) / 7700;

    // How many kg to lose/gain to reach goal
    const currentFatMass = s.fatMass;
    const leanMass       = s.weight - currentFatMass;
    let targetFatMass, weeksToGoal;

    if (s.objective === 'lean-bulk') {
      targetFatMass = currentFatMass + 3; // gain 3kg fat in bulk context
      weeksToGoal   = weeklyRateKg > 0
                      ? Math.round((targetFatMass - currentFatMass) / weeklyRateKg)
                      : 0;
    } else {
      // Cut to goal fat %
      // goalFat = leanMass / (1 - goalFatPct/100) — solve for fatMass at goal
      const goalWeight  = leanMass / (1 - s.goalFatPct / 100);
      targetFatMass     = goalWeight * (s.goalFatPct / 100);
      const kgToLose    = Math.max(0, currentFatMass - targetFatMass);
      weeksToGoal       = weeklyRateKg < 0
                          ? Math.round(kgToLose / Math.abs(weeklyRateKg))
                          : 999;
    }

    // Deficit percentage
    const deficitPct = objConfig.deficit * 100;

    // Macro distribution (cuts: high-protein)
    let pPct, cPct, fPct;
    if (s.objective === 'hard-cut') {
      pPct = 0.40; cPct = 0.30; fPct = 0.30;
    } else if (s.objective === 'mini-cut') {
      pPct = 0.35; cPct = 0.38; fPct = 0.27;
    } else {
      pPct = 0.30; cPct = 0.45; fPct = 0.25;
    }

    const protG = Math.round((targetCals * pPct) / 4);
    const carbG = Math.round((targetCals * cPct) / 4);
    const fatG  = Math.round((targetCals * fPct) / 9);

    // Classification
    let classification;
    const absDef = Math.abs(deficitPct);
    if (s.objective === 'lean-bulk') {
      classification = { key: 'lean', label: 'Lean Bulk', icon: '💪', desc: 'Superávit limpo. Ganho de massa magra com mínima gordura.' };
    } else if (absDef >= 25) {
      classification = { key: 'extreme', label: 'Agressivo Extremo', icon: '🔥', desc: 'Déficit elevado. Alto risco de perda muscular sem treino adequado.' };
    } else if (absDef >= 20) {
      classification = { key: 'aggressive', label: 'Agressivo', icon: '⚡', desc: 'Déficit forte. Progresso rápido com bom nível de treinamento.' };
    } else if (absDef >= 12) {
      classification = { key: 'moderate', label: 'Moderado', icon: '🎯', desc: 'Déficit equilibrado. Ótimo para sustentabilidade a longo prazo.' };
    } else {
      classification = { key: 'lean', label: 'Conservador', icon: '🛡️', desc: 'Déficit mínimo. Máxima preservação muscular.' };
    }

    return {
      newTDEE,
      targetCals,
      deficitReal,
      weeklyRateKg,
      weeksToGoal,
      deficitPct,
      protG, carbG, fatG,
      classification,
      objConfig,
    };
  }

  // =========================================== //
  // UI UPDATE ENGINE                            //
  // =========================================== //
  let updateTimer = null;

  function animateValue(el, newVal, suffix = '') {
    if (!el) return;
    el.classList.add('value-updating');
    el.addEventListener('animationend', () => {
      el.classList.remove('value-updating');
    }, { once: true });
    el.textContent = newVal + suffix;
  }

  function updateUI(s) {
    const r = calculate(s);

    // Show "CALCULANDO" badge briefly
    const badge = document.getElementById('result-update-badge');
    badge.classList.add('visible');
    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => badge.classList.remove('visible'), 1200);

    // ---- Protocol name ----
    const protName = document.getElementById('result-protocol-name');
    const thermoLabel = { none: '', caffeine: '· Cafeína', eca: '· ECA Stack' }[s.thermo];
    protName.textContent = \`\${r.objConfig.label} \${thermoLabel}\`;

    // ---- KPI Main ----
    const kpiEl = document.getElementById('kpi-calories');
    animateValue(kpiEl, formatNum(r.targetCals));

    const deltaEl = document.getElementById('kpi-delta');
    const deltaValEl = document.getElementById('kpi-delta-val');
    const sign = r.deficitReal > 0 ? '+' : '';
    deltaValEl.textContent = sign + formatNum(r.deficitReal);

    if (r.deficitReal < 0) {
      deltaEl.className = 'kpi-delta negative';
      deltaEl.querySelector('svg').innerHTML = '<polyline points="6 15 12 9 18 15"/>';
    } else {
      deltaEl.className = 'kpi-delta positive';
      deltaEl.querySelector('svg').innerHTML = '<polyline points="6 9 12 15 18 9"/>';
    }

    // Highlight main KPI
    const mainKpi = document.getElementById('result-main-kpi');
    mainKpi.classList.add('highlight');
    setTimeout(() => mainKpi.classList.remove('highlight'), 800);

    // ---- Calorie bars ----
    const maxCal  = 3500;
    const tdeeW   = Math.min((r.newTDEE / maxCal) * 100, 100);
    const targetW = Math.min((r.targetCals / maxCal) * 100, 100);

    document.getElementById('bar-tdee').style.width   = tdeeW + '%';
    document.getElementById('bar-target').style.width = targetW + '%';

    const barTarget = document.getElementById('bar-target');
    if (r.deficitReal < 0) {
      barTarget.className = 'calorie-bar-target cut';
    } else {
      barTarget.className = 'calorie-bar-target bulk';
    }

    document.getElementById('viz-tdee-label').textContent = \`TDEE: \${formatNum(r.newTDEE)}\`;

    // ---- Gauge ----
    updateGauge(r.deficitPct);

    // ---- Metric cards ----
    animateValue(document.getElementById('m-tdee'), formatNum(r.newTDEE));
    animateValue(document.getElementById('m-deficit'), (r.deficitReal >= 0 ? '+' : '') + formatNum(r.deficitReal));
    animateValue(document.getElementById('m-rate'), (r.weeklyRateKg >= 0 ? '+' : '') + r.weeklyRateKg.toFixed(2));
    animateValue(document.getElementById('m-weeks'), r.weeksToGoal >= 999 ? '∞' : r.weeksToGoal + ' sem');

    // sparkbars
    document.getElementById('spark-tdee').style.width    = Math.min((r.newTDEE / 4000) * 100, 100) + '%';
    document.getElementById('spark-deficit').style.width = Math.min((Math.abs(r.deficitReal) / 1200) * 100, 100) + '%';
    document.getElementById('spark-rate').style.width    = Math.min((Math.abs(r.weeklyRateKg) / 1.5) * 100, 100) + '%';
    document.getElementById('spark-weeks').style.width   = r.weeksToGoal >= 999 ? 100 : Math.min((r.weeksToGoal / 24) * 100, 100) + '%';

    // ---- Classification ----
    const cb = document.getElementById('classification-block');
    cb.className = \`classification-block \${r.classification.key} classification-\${r.classification.key}\`;
    document.getElementById('class-icon').textContent    = r.classification.icon;
    document.getElementById('class-name').textContent    = r.classification.label;
    document.getElementById('class-desc').textContent    = r.classification.desc;

    // ---- Macros ----
    document.getElementById('macro-total').textContent = formatNum(r.targetCals) + ' kcal';
    animateValue(document.getElementById('macro-p'), r.protG);
    animateValue(document.getElementById('macro-c'), r.carbG);
    animateValue(document.getElementById('macro-f'), r.fatG);

    // macro bars ratios
    const totalMacroG = (r.protG * 4) + (r.carbG * 4) + (r.fatG * 9);
    document.getElementById('macro-bar-p').style.flex = ((r.protG * 4) / totalMacroG * 3).toFixed(2);
    document.getElementById('macro-bar-c').style.flex = ((r.carbG * 4) / totalMacroG * 3).toFixed(2);
    document.getElementById('macro-bar-f').style.flex = ((r.fatG * 9)  / totalMacroG * 3).toFixed(2);

    // ---- Diff summary ----
    const diffTDEE  = r.newTDEE - state.baseTDEE;
    const prevMeta  = 2070; // baseline
    const diffMeta  = r.targetCals - prevMeta;
    const prevRate  = -0.65;
    const diffRate  = r.weeklyRateKg - prevRate;

    const diffTDEEEl = document.getElementById('diff-tdee');
    diffTDEEEl.textContent = formatNum(r.newTDEE);
    diffTDEEEl.className   = 'diff-row-after ' + (diffTDEE >= 0 ? 'up' : 'down');

    const diffTDEEDEl = document.getElementById('diff-tdee-d');
    diffTDEEDEl.textContent = (diffTDEE >= 0 ? '+' : '') + diffTDEE;
    diffTDEEDEl.className   = 'diff-row-delta ' + (diffTDEE >= 0 ? 'up' : 'down');

    const diffMetaEl = document.getElementById('diff-meta');
    diffMetaEl.textContent = formatNum(r.targetCals);
    diffMetaEl.className   = 'diff-row-after ' + (diffMeta >= 0 ? 'up' : 'down');

    const diffMetaDEl = document.getElementById('diff-meta-d');
    diffMetaDEl.textContent = (diffMeta >= 0 ? '+' : '') + diffMeta;
    diffMetaDEl.className   = 'diff-row-delta ' + (diffMeta >= 0 ? 'up' : 'down');

    const diffRateEl = document.getElementById('diff-rate');
    diffRateEl.textContent = r.weeklyRateKg.toFixed(2) + ' kg';
    diffRateEl.className   = 'diff-row-after ' + (r.weeklyRateKg < 0 ? 'down' : 'up');

    const diffRateDEl = document.getElementById('diff-rate-d');
    diffRateDEl.textContent = (diffRate >= 0 ? '+' : '') + diffRate.toFixed(2);
    diffRateDEl.className   = 'diff-row-delta ' + (diffRate < 0 ? 'down' : 'up');

    // ---- Deadline ----
    const wks = r.weeksToGoal >= 999 ? '∞' : \`~\${r.weeksToGoal} semanas\`;
    document.getElementById('deadline-value').textContent = wks;

    // Date estimate
    if (r.weeksToGoal < 999) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + (r.weeksToGoal * 7));
      const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
      document.getElementById('deadline-date').textContent = \`Previsão: ~\${monthNames[futureDate.getMonth()]} \${futureDate.getFullYear()}\`;
    } else {
      document.getElementById('deadline-date').textContent = 'Meta indefinida no superávit';
    }

    // Timeline dots
    buildTimelineDots(Math.min(r.weeksToGoal, 16), r.deficitReal < 0);
    document.getElementById('timeline-label').textContent = r.weeksToGoal >= 999 ? '∞ semanas' : r.weeksToGoal + ' semanas';
  }

  function formatNum(n) {
    return Math.round(n).toLocaleString('pt-BR');
  }

  // =========================================== //
  // GAUGE UPDATER                               //
  // =========================================== //
  function updateGauge(deficitPct) {
    // deficitPct: -25% (hard cut) to +10% (lean bulk)
    // Map: -25 → right (cut) | 0 → center | +10 → left (bulk)
    // Arc total: 157 (π × 50)
    // Offset: 157 = empty, 0 = full
    // Center = dashoffset 78.5
    // Full cut (−25%) = dashoffset 20
    // Full bulk (+10%) = dashoffset 125

    const clampedPct = Math.max(-30, Math.min(15, deficitPct));
    // Map [-30, 15] → [1.0, 0.0] for fill fraction
    const fillFraction = 1 - (clampedPct + 30) / 45;
    const dashOffset   = Math.round(fillFraction * 157);

    const arc = document.getElementById('gauge-fill-arc');
    arc.style.strokeDashoffset = dashOffset;

    // Color
    if (deficitPct >= 5) {
      arc.style.stroke = 'var(--accent-green)';
    } else if (deficitPct >= 0) {
      arc.style.stroke = 'var(--accent-amber)';
    } else if (deficitPct > -20) {
      arc.style.stroke = 'var(--accent-orange)';
    } else {
      arc.style.stroke = 'var(--accent-primary)';
    }

    // Gauge value text
    const sign = deficitPct > 0 ? '+' : '';
    document.getElementById('gauge-value').textContent = sign + deficitPct.toFixed(0) + '%';

    // Needle rotation: center = 0°, full right = -90° (cut), full left = +90° (bulk)
    const needleRot = -((clampedPct + 30) / 45) * 180 + 90;
    document.getElementById('gauge-needle').style.transform = \`rotate(\${needleRot - 90}deg)\`;
  }

  // =========================================== //
  // TIMELINE DOTS                               //
  // =========================================== //
  function buildTimelineDots(weeks, isCut) {
    const container = document.getElementById('timeline-dots');
    container.innerHTML = '';
    const maxDots = 12;
    const showDots = Math.min(weeks, maxDots);
    const filledCount = Math.min(Math.ceil(weeks / 2), maxDots);

    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'timeline-week-dot';
      if (i < filledCount) {
        dot.classList.add('filled');
        if (!isCut) dot.classList.add('green');
      }
      container.appendChild(dot);
    }
  }

  // =========================================== //
  // INTENSITY BAR UPDATER                       //
  // =========================================== //
  function updateIntensityBar(id, value, max) {
    const bar = document.getElementById(id);
    if (!bar) return;
    const segments = bar.querySelectorAll('.intensity-segment');
    const total = segments.length;
    const fraction = value / max;
    const lit = Math.round(fraction * total);

    segments.forEach((seg, i) => {
      seg.classList.remove('lit', 'amber', 'green');
      if (i < lit) {
        seg.classList.add('lit');
        const pos = i / (total - 1);
        if (pos < 0.4) seg.classList.add('green');
        else if (pos < 0.7) seg.classList.add('amber');
      }
    });
  }

  // =========================================== //
  // CUSTOM SLIDER ENGINE                        //
  // =========================================== //
  function initSlider(config) {
    const {
      trackId, fillId, thumbId, orbId, marksId,
      intensityId,
      min, max, step,
      stateKey,
      marks,
    } = config;

    const track = document.getElementById(trackId);
    const fill  = document.getElementById(fillId);
    const thumb = document.getElementById(thumbId);
    const orb   = document.getElementById(orbId);
    const marksEl = document.getElementById(marksId);

    // Build marks
    if (marksEl && marks) {
      marks.forEach(m => {
        const span = document.createElement('span');
        span.className = 'slider-mark';
        span.textContent = m;
        marksEl.appendChild(span);
      });
    }

    function getPct(v) {
      return (v - min) / (max - min);
    }

    function setSlider(value, triggerUpdate = true) {
      const clamped = Math.max(min, Math.min(max, Math.round(value / step) * step));
      state[stateKey] = clamped;

      const pct = getPct(clamped) * 100;

      fill.style.width  = \`calc(\${pct}% + 1px)\`;
      thumb.style.left  = \`\${pct}%\`;
      orb.style.left    = \`\${pct}%\`;

      // Value display
      const valEl = document.getElementById(\`val-\${stateKey}\`);
      if (valEl) {
        valEl.textContent = clamped;
        valEl.classList.add('changing');
        setTimeout(() => valEl.classList.remove('changing'), 300);
      }

      // Update ARIA
      track.setAttribute('aria-valuenow', clamped);

      // Intensity bar
      if (intensityId) {
        updateIntensityBar(intensityId, clamped - min, max - min);
      }

      // Active mark
      if (marksEl) {
        const markEls = marksEl.querySelectorAll('.slider-mark');
        markEls.forEach((m, idx) => {
          const markVal = marks[idx];
          m.classList.toggle('active-mark', String(markVal) === String(clamped) || (idx === 0 && clamped <= min) || (idx === marks.length - 1 && clamped >= max));
        });
      }

      if (triggerUpdate) {
        debouncedUpdate();
      }
    }

    function getValueFromEvent(e) {
      const rect = track.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return min + ratio * (max - min);
    }

    let isDragging = false;

    thumb.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      thumb.classList.add('active');
    });

    thumb.addEventListener('touchstart', (e) => {
      isDragging = true;
      thumb.classList.add('active');
    }, { passive: true });

    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      thumb.classList.add('active');
      setSlider(getValueFromEvent(e));
    });

    track.addEventListener('touchstart', (e) => {
      isDragging = true;
      thumb.classList.add('active');
      setSlider(getValueFromEvent(e));
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSlider(getValueFromEvent(e));
    });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSlider(getValueFromEvent(e));
    }, { passive: true });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        thumb.classList.remove('active');
      }
    });

    document.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        thumb.classList.remove('active');
      }
    });

    // Keyboard
    track.addEventListener('keydown', (e) => {
      let newVal = state[stateKey];
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        newVal += step;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        newVal -= step;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newVal = min;
      } else if (e.key === 'End') {
        e.preventDefault();
        newVal = max;
      }
      setSlider(newVal);
    });

    // Init
    setSlider(state[stateKey], false);

    return { setSlider };
  }

  // =========================================== //
  // DEBOUNCED UPDATE                            //
  // =========================================== //
  let debounceTimer = null;
  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => updateUI(state), 30);
  }

  // =========================================== //
  // OBJECTIVE SELECTOR                          //
  // =========================================== //
  function initObjectiveSelector() {
    const options = document.querySelectorAll('.objective-option');

    options.forEach(opt => {
      function select() {
        options.forEach(o => {
          o.classList.remove('selected');
          o.setAttribute('aria-checked', 'false');
        });
        opt.classList.add('selected');
        opt.setAttribute('aria-checked', 'true');
        state.objective = opt.dataset.obj;
        debouncedUpdate();
      }

      opt.addEventListener('click', select);
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select();
        }
      });
    });
  }

  // =========================================== //
  // THERMOGENIC SELECTOR                        //
  // =========================================== //
  function initThermoSelector() {
    const options = document.querySelectorAll('.thermo-option');

    options.forEach(opt => {
      function select() {
        options.forEach(o => {
          o.classList.remove('selected');
          o.setAttribute('aria-checked', 'false');
        });
        opt.classList.add('selected');
        opt.setAttribute('aria-checked', 'true');
        state.thermo = opt.dataset.thermo;

        // Show warning for ECA
        const warning = document.getElementById('thermo-warning');
        warning.style.display = state.thermo === 'eca' ? 'block' : 'none';

        debouncedUpdate();
      }

      opt.addEventListener('click', select);
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select();
        }
      });
    });
  }

  // =========================================== //
  // ACTION BUTTONS                              //
  // =========================================== //
  function initActionButtons() {
    // Clear
    document.getElementById('btn-clear').addEventListener('click', function(e) {
      createRipple(e, this);

      // Reset state
      state.workouts  = DEFAULT_STATE.workouts;
      state.cardio    = DEFAULT_STATE.cardio;
      state.objective = DEFAULT_STATE.objective;
      state.thermo    = DEFAULT_STATE.thermo;

      // Reset sliders
      workoutsSlider.setSlider(DEFAULT_STATE.workouts, false);
      cardioSlider.setSlider(DEFAULT_STATE.cardio, false);

      // Reset objective
      document.querySelectorAll('.objective-option').forEach(opt => {
        const isDefault = opt.dataset.obj === DEFAULT_STATE.objective;
        opt.classList.toggle('selected', isDefault);
        opt.setAttribute('aria-checked', isDefault ? 'true' : 'false');
      });

      // Reset thermo
      document.querySelectorAll('.thermo-option').forEach(opt => {
        const isDefault = opt.dataset.thermo === DEFAULT_STATE.thermo;
        opt.classList.toggle('selected', isDefault);
        opt.setAttribute('aria-checked', isDefault ? 'true' : 'false');
      });

      document.getElementById('thermo-warning').style.display = 'none';

      updateUI(state);
      showToast('Simulação resetada para os valores padrão.', 'success');
    });

    // Apply
    document.getElementById('btn-apply').addEventListener('click', function(e) {
      createRipple(e, this);
      const btn = this;
      btn.classList.add('applying');
      btn.innerHTML = \`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
          <circle cx="12" cy="12" r="10" stroke-dasharray="63" stroke-dashoffset="63" style="animation: dash-anim 1s linear infinite; transform-origin:center">
          </circle>
        </svg>
        Aplicando...
      \`;

      setTimeout(() => {
        btn.classList.remove('applying');
        btn.innerHTML = \`
          Aplicar Simulação
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        \`;
        showToast('Protocolo atualizado com sucesso! As alterações foram aplicadas.', 'success');
      }, 1400);
    });
  }

  // =========================================== //
  // RIPPLE EFFECT                               //
  // =========================================== //
  function createRipple(e, btn) {
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = \`
      width: \${size}px;
      height: \${size}px;
      left: \${e.clientX - rect.left - size/2}px;
      top: \${e.clientY - rect.top - size/2}px;
    \`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  // =========================================== //
  // TOAST NOTIFICATION                          //
  // =========================================== //
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = \`toast \${type}\`;
    toast.innerHTML = \`
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div>\${msg}</div>
    \`;
    container.appendChild(toast);

    // Force reflow then animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('visible');
      });
    });

    // Auto-dismiss
    setTimeout(() => {
      toast.classList.add('hiding');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3500);
  }

  // =========================================== //
  // SMOOTH HOVER PARALLAX ON PANELS            //
  // =========================================== //
  function initPanelParallax() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        panel.style.transform = \`perspective(1200px) rotateY(\${x * 0.5}deg) rotateX(\${-y * 0.5}deg)\`;
      });

      panel.addEventListener('mouseleave', () => {
        panel.style.transform = '';
      });
    });
  }

  // =========================================== //
  // INIT                                        //
  // =========================================== //
  let workoutsSlider, cardioSlider;

  function init() {
    // Init sliders
    workoutsSlider = initSlider({
      trackId:     'slider-workouts',
      fillId:      'fill-workouts',
      thumbId:     'thumb-workouts',
      orbId:       'orb-workouts',
      marksId:     'marks-workouts',
      intensityId: 'intensity-workouts',
      min: 1, max: 7, step: 1,
      stateKey: 'workouts',
      marks: ['1×', '2×', '3×', '4×', '5×', '6×', '7×'],
    });

    cardioSlider = initSlider({
      trackId:     'slider-cardio',
      fillId:      'fill-cardio',
      thumbId:     'thumb-cardio',
      orbId:       'orb-cardio',
      marksId:     'marks-cardio',
      intensityId: 'intensity-cardio',
      min: 0, max: 60, step: 5,
      stateKey: 'cardio',
      marks: ['0', '15', '30', '45', '60'],
    });

    initObjectiveSelector();
    initThermoSelector();
    initActionButtons();
    initPanelParallax();

    // Initial calculation
    updateUI(state);
  }

  document.addEventListener('DOMContentLoaded', init);`;
