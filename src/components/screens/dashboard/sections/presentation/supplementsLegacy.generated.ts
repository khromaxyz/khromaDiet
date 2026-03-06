/* eslint-disable */
/**
 * @deprecated Legacy supplements payload retained temporarily for cleanup verification only.
 * Auto-generated from legacy/suplementos.html
 * Generated at: 2026-03-03T00:06:15.653Z
 */

export const LEGACY_SUPPLEMENTS_HTML = `<div class="page-wrapper">
    <section class="section-container" id="supplement-stack" aria-label="Stack de Suplementação">

      <!-- ============================================= -->
      <!-- SEÇÃO: CABEÇALHO                              -->
      <!-- ============================================= -->
      <header class="section-header anim-fade-up">

        <div class="section-header-left">
          <div class="section-eyebrow" role="status">
            <span class="section-eyebrow-dot" aria-hidden="true"></span>
            <span class="section-eyebrow-text">Stack Personalizado</span>
          </div>
          <h2 class="section-title">
            Protocolo de<br/><em>Suplementação</em>
          </h2>
          <p class="section-subtitle">
            Seleção baseada no seu perfil metabólico, objetivos e biometria atual. Cada composto validado por evidência clínica.
          </p>
        </div>

        <div class="section-header-right">
          <!-- Perfil Match Score -->
          <div class="profile-match-badge" role="group" aria-label="Score de compatibilidade com perfil">
            <div class="match-score-ring" aria-hidden="true">
              <svg viewBox="0 0 44 44" width="52" height="52">
                <circle class="match-score-ring-track" cx="22" cy="22" r="22"></circle>
                <circle class="match-score-ring-fill" cx="22" cy="22" r="22"></circle>
              </svg>
              <span class="match-score-number">85%</span>
            </div>
            <div class="match-score-info">
              <span class="match-score-label">Match de Perfil</span>
              <span class="match-score-value">Excelente</span>
              <span class="match-score-sub">5 compostos · 2 níveis</span>
            </div>
          </div>

          <!-- Controles de visualização -->
          <div class="view-controls" role="group" aria-label="Modo de visualização">
            <button class="view-btn active" id="btn-grid" aria-label="Visualização em grade" title="Grade">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
              </svg>
            </button>
            <button class="view-btn" id="btn-list" aria-label="Visualização em lista" title="Lista">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="2" width="14" height="2.5" rx="1.25" fill="currentColor" opacity="0.9"/>
                <rect x="1" y="6.75" width="14" height="2.5" rx="1.25" fill="currentColor" opacity="0.9"/>
                <rect x="1" y="11.5" width="14" height="2.5" rx="1.25" fill="currentColor" opacity="0.9"/>
              </svg>
            </button>
          </div>
        </div>

      </header>

      <!-- ============================================= -->
      <!-- SEÇÃO: PRIORIDADE ALTA — CARDS               -->
      <!-- ============================================= -->
      <div class="priority-divider anim-fade-up anim-delay-1" role="separator" aria-label="Prioridade Alta">
        <div class="priority-divider-line" aria-hidden="true"></div>
        <div class="priority-divider-badge high" aria-label="3 suplementos de alta prioridade">
          <span class="priority-divider-icon" aria-hidden="true"></span>
          Prioridade Alta
          <span class="priority-divider-count" aria-hidden="true">· 3</span>
        </div>
        <div class="priority-divider-line" aria-hidden="true"></div>
      </div>

      <div class="supplements-high-grid" id="high-priority-grid" role="list">

        <!-- ————— CARD: CREATINA MONOHIDRATADA ————— -->
        <article
          class="sup-card sup-card--creatina anim-fade-up anim-delay-2"
          role="listitem"
          tabindex="0"
          aria-label="Creatina Monohidratada — Alta Prioridade"
          onclick="openModal('creatina')"
          onkeydown="if(event.key==='Enter'||event.key===' ')openModal('creatina')"
        >
          <!-- Decoração molecular -->
          <svg class="molecule-deco" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="40" r="8" stroke="#00c8ff" stroke-width="1.5"/>
            <circle cx="90" cy="70" r="6" stroke="#00c8ff" stroke-width="1.5"/>
            <circle cx="30" cy="70" r="6" stroke="#00c8ff" stroke-width="1.5"/>
            <circle cx="60" cy="95" r="5" stroke="#00c8ff" stroke-width="1.2"/>
            <circle cx="20" cy="30" r="4" stroke="#00c8ff" stroke-width="1"/>
            <circle cx="100" cy="30" r="4" stroke="#00c8ff" stroke-width="1"/>
            <line x1="60" y1="48" x2="87" y2="65" stroke="#00c8ff" stroke-width="1" opacity="0.6"/>
            <line x1="60" y1="48" x2="33" y2="65" stroke="#00c8ff" stroke-width="1" opacity="0.6"/>
            <line x1="90" y1="76" x2="62" y2="92" stroke="#00c8ff" stroke-width="1" opacity="0.6"/>
            <line x1="30" y1="76" x2="58" y2="92" stroke="#00c8ff" stroke-width="1" opacity="0.6"/>
            <line x1="60" y1="32" x2="22" y2="32" stroke="#00c8ff" stroke-width="1" opacity="0.4"/>
            <line x1="60" y1="32" x2="98" y2="32" stroke="#00c8ff" stroke-width="1" opacity="0.4"/>
          </svg>

          <!-- Bg gradiente do card -->
          <div class="sup-card-bg" aria-hidden="true"></div>
          <!-- Shine no topo -->
          <div class="sup-card-shine" aria-hidden="true"></div>

          <!-- Conteúdo -->
          <div class="sup-card-content">
            <!-- Header do card -->
            <div class="sup-card-header">
              <div class="sup-icon-wrap" aria-hidden="true">
                <div class="sup-icon-bg"></div>
                <div class="sup-icon-svg">
                  <!-- Ícone: molécula/átomo estilizado para creatina -->
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="4" fill="#00c8ff" opacity="0.9"/>
                    <circle cx="14" cy="4" r="2.5" fill="#00c8ff" opacity="0.55"/>
                    <circle cx="14" cy="24" r="2.5" fill="#00c8ff" opacity="0.55"/>
                    <circle cx="4" cy="14" r="2.5" fill="#00c8ff" opacity="0.55"/>
                    <circle cx="24" cy="14" r="2.5" fill="#00c8ff" opacity="0.55"/>
                    <circle cx="6.08" cy="6.08" r="2" fill="#00c8ff" opacity="0.35"/>
                    <circle cx="21.92" cy="6.08" r="2" fill="#00c8ff" opacity="0.35"/>
                    <circle cx="6.08" cy="21.92" r="2" fill="#00c8ff" opacity="0.35"/>
                    <circle cx="21.92" cy="21.92" r="2" fill="#00c8ff" opacity="0.35"/>
                    <line x1="14" y1="10" x2="14" y2="6.5" stroke="#00c8ff" stroke-width="1" opacity="0.5"/>
                    <line x1="14" y1="18" x2="14" y2="21.5" stroke="#00c8ff" stroke-width="1" opacity="0.5"/>
                    <line x1="10" y1="14" x2="6.5" y2="14" stroke="#00c8ff" stroke-width="1" opacity="0.5"/>
                    <line x1="18" y1="14" x2="21.5" y2="14" stroke="#00c8ff" stroke-width="1" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              <span class="sup-priority-pill high" role="status">
                <span class="sup-priority-pip" aria-hidden="true"></span>
                Alta
              </span>
            </div>

            <!-- Identidade -->
            <div class="sup-identity">
              <h3 class="sup-name">Creatina<br/>Monohidratada</h3>
              <div class="sup-type-tag">
                <span class="sup-type-tag-line" aria-hidden="true"></span>
                Força · Recuperação
              </div>
            </div>

            <!-- Dose hero -->
            <div class="sup-dose-hero" role="group" aria-label="Dosagem: 5 gramas por dia">
              <div class="sup-dose-hero-bg" aria-hidden="true"></div>
              <span class="sup-dose-number">5</span>
              <span class="sup-dose-unit">g</span>
              <span class="sup-dose-label">/ dia</span>
            </div>

            <!-- Meta row -->
            <div class="sup-meta-row" role="list">
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Forma</span>
                <span class="sup-meta-val">Monohidratada</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Pureza</span>
                <span class="sup-meta-val">&gt; 99.9%</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Horário</span>
                <span class="sup-meta-val">Qualquer</span>
              </div>
            </div>

            <!-- Timing visual -->
            <div class="sup-timing-section">
              <span class="sup-timing-label">Janela de consumo</span>
              <div class="sup-timing-track" role="progressbar" aria-valuetext="Qualquer horário do dia">
                <div class="sup-timing-fill" style="left:0%; width:100%;"></div>
              </div>
              <div class="sup-timing-markers" aria-hidden="true">
                <span class="sup-timing-marker">06:00</span>
                <span class="sup-timing-marker">12:00</span>
                <span class="sup-timing-marker">18:00</span>
                <span class="sup-timing-marker">24:00</span>
              </div>
              <div class="sup-timing-pills" role="list" aria-label="Momentos sugeridos">
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Manhã
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Pré-treino
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Pós-treino
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Noite
                </span>
              </div>
            </div>

            <!-- Insight -->
            <div class="sup-insight">
              <svg class="sup-insight-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="10" stroke="#00c8ff" stroke-width="1.5" opacity="0.5"/>
                <path d="M11 7v5" stroke="#00c8ff" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="11" cy="15.5" r="1" fill="#00c8ff" opacity="0.8"/>
              </svg>
              <p class="sup-insight-text">
                <strong>Consistência &gt; Timing.</strong> Saturação muscular ocorre em 28 dias. O horário é irrelevante — o que importa é não falhar nenhum dia.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <footer class="sup-card-footer">
            <div class="sup-condition">
              <svg class="sup-condition-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L8.8 5.2H13L9.6 7.8L10.9 12L7 9.4L3.1 12L4.4 7.8L1 5.2H5.2L7 1Z" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linejoin="round"/>
              </svg>
              <span>Evidência nível A</span>
            </div>
            <button class="sup-detail-btn" aria-label="Ver detalhes da Creatina Monohidratada">
              Ver detalhes
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </footer>
        </article>

        <!-- ————— CARD: VITAMINA D3 + K2 ————— -->
        <article
          class="sup-card sup-card--vitd anim-fade-up anim-delay-3"
          role="listitem"
          tabindex="0"
          aria-label="Vitamina D3 + K2 — Alta Prioridade"
          onclick="openModal('vitd')"
          onkeydown="if(event.key==='Enter'||event.key===' ')openModal('vitd')"
        >
          <!-- Decoração raios de sol -->
          <svg class="sun-rays-deco" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="70" cy="70" r="25" stroke="#ffb830" stroke-width="2"/>
            <line x1="70" y1="5" x2="70" y2="30" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="70" y1="110" x2="70" y2="135" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="5" y1="70" x2="30" y2="70" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="110" y1="70" x2="135" y2="70" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="23.43" y1="23.43" x2="40.1" y2="40.1" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="99.9" y1="99.9" x2="116.57" y2="116.57" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="116.57" y1="23.43" x2="99.9" y2="40.1" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
            <line x1="40.1" y1="99.9" x2="23.43" y2="116.57" stroke="#ffb830" stroke-width="2" stroke-linecap="round"/>
          </svg>

          <div class="sup-card-bg" aria-hidden="true"></div>
          <div class="sup-card-shine" aria-hidden="true"></div>

          <div class="sup-card-content">
            <div class="sup-card-header">
              <div class="sup-icon-wrap" aria-hidden="true">
                <div class="sup-icon-bg"></div>
                <div class="sup-icon-svg">
                  <!-- Ícone: sol estilizado para Vitamina D -->
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="6" fill="#ffb830" opacity="0.85"/>
                    <circle cx="14" cy="14" r="9" stroke="#ffb830" stroke-width="1" opacity="0.25"/>
                    <line x1="14" y1="1" x2="14" y2="5" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
                    <line x1="14" y1="23" x2="14" y2="27" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
                    <line x1="1" y1="14" x2="5" y2="14" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
                    <line x1="23" y1="14" x2="27" y2="14" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
                    <line x1="4.05" y1="4.05" x2="6.87" y2="6.87" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                    <line x1="21.13" y1="21.13" x2="23.95" y2="23.95" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                    <line x1="23.95" y1="4.05" x2="21.13" y2="6.87" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                    <line x1="6.87" y1="21.13" x2="4.05" y2="23.95" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              <span class="sup-priority-pill high" role="status">
                <span class="sup-priority-pip" aria-hidden="true"></span>
                Alta
              </span>
            </div>

            <div class="sup-identity">
              <h3 class="sup-name">Vitamina<br/>D3 <span style="opacity:0.45;font-size:0.75em;">+</span> K2</h3>
              <div class="sup-type-tag">
                <span class="sup-type-tag-line" aria-hidden="true"></span>
                Imunidade · Ossos · Humor
              </div>
            </div>

            <!-- Dose hero com range -->
            <div class="sup-dose-hero" role="group" aria-label="Dosagem: 2000 a 5000 UI por dia">
              <div class="sup-dose-hero-bg" aria-hidden="true"></div>
              <span class="sup-dose-number" style="font-size:2rem;">2k–5k</span>
              <span class="sup-dose-unit">UI</span>
              <span class="sup-dose-label">/ dia</span>
            </div>

            <!-- Range slider visual -->
            <div class="dose-range-wrap" style="background:rgba(255,184,48,0.04);border:1px solid rgba(255,184,48,0.10);" role="group" aria-label="Faixa de dosagem">
              <div class="dose-range-row">
                <span class="dose-range-label">Faixa Terapêutica</span>
                <span class="dose-range-value" style="color:#ffb830;">2.000 → 5.000 UI</span>
              </div>
              <div class="dose-range-slider" aria-hidden="true">
                <div class="dose-range-active" style="background:linear-gradient(90deg,#e09000,#ffb830,#ffd860);left:0%;right:0%;box-shadow:0 0 8px rgba(255,184,48,0.4);"></div>
                <div class="dose-range-thumb" style="left:25%;border-color:#ffb830;background:#1a1a20;"></div>
                <div class="dose-range-thumb" style="left:75%;border-color:#ffd860;background:#1a1a20;"></div>
              </div>
              <div class="dose-range-labels">
                <span class="dose-range-min-label">1.000 UI</span>
                <span class="dose-range-max-label">10.000 UI</span>
              </div>
            </div>

            <div class="sup-meta-row" role="list">
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">D3 Fonte</span>
                <span class="sup-meta-val">Colecalciferol</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">K2 Forma</span>
                <span class="sup-meta-val">MK-7</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Horário</span>
                <span class="sup-meta-val">Manhã</span>
              </div>
            </div>

            <div class="sup-timing-section">
              <span class="sup-timing-label">Janela de consumo</span>
              <div class="sup-timing-track" role="progressbar" aria-valuetext="Período da manhã com refeição">
                <div class="sup-timing-fill" style="left:8%; width:22%;"></div>
              </div>
              <div class="sup-timing-markers" aria-hidden="true">
                <span class="sup-timing-marker">06:00</span>
                <span class="sup-timing-marker">12:00</span>
                <span class="sup-timing-marker">18:00</span>
                <span class="sup-timing-marker">24:00</span>
              </div>
              <div class="sup-timing-pills" role="list" aria-label="Momentos sugeridos">
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Manhã
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Com refeição
                </span>
                <span class="sup-timing-pill" role="listitem" style="opacity:0.4;">
                  <span class="sup-timing-pill-dot" aria-hidden="true" style="background:rgba(255,255,255,0.2);"></span>Tarde
                </span>
              </div>
            </div>

            <div class="sup-insight">
              <svg class="sup-insight-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="10" stroke="#ffb830" stroke-width="1.5" opacity="0.5"/>
                <path d="M7 11.5l2.5 2.5L15 8.5" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="sup-insight-text">
                <strong>Lipossolúvel — tome com gordura.</strong> A K2 (MK-7) direciona o cálcio para os ossos, evitando calcificação arterial. Sinergia essencial.
              </p>
            </div>
          </div>

          <footer class="sup-card-footer">
            <div class="sup-condition">
              <svg class="sup-condition-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L8.8 5.2H13L9.6 7.8L10.9 12L7 9.4L3.1 12L4.4 7.8L1 5.2H5.2L7 1Z" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linejoin="round"/>
              </svg>
              <span>Evidência nível A</span>
            </div>
            <button class="sup-detail-btn" aria-label="Ver detalhes da Vitamina D3 e K2">
              Ver detalhes
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </footer>
        </article>

        <!-- ————— CARD: WHEY PROTEIN ————— -->
        <article
          class="sup-card sup-card--whey anim-fade-up anim-delay-4"
          role="listitem"
          tabindex="0"
          aria-label="Whey Protein — Alta Prioridade"
          onclick="openModal('whey')"
          onkeydown="if(event.key==='Enter'||event.key===' ')openModal('whey')"
        >
          <div class="sup-card-bg" aria-hidden="true"></div>
          <div class="sup-card-shine" aria-hidden="true"></div>

          <div class="sup-card-content">
            <div class="sup-card-header">
              <div class="sup-icon-wrap" aria-hidden="true">
                <div class="sup-icon-bg"></div>
                <div class="sup-icon-svg">
                  <!-- Ícone: proteína / aminoácido para Whey -->
                  <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18C4 18 6 8 10 8C14 8 12 18 16 18C20 18 18 8 22 8C26 8 26 14 26 14" stroke="#00e898" stroke-width="2.2" stroke-linecap="round"/>
                    <circle cx="10" cy="8" r="2" fill="#00e898" opacity="0.7"/>
                    <circle cx="16" cy="18" r="2" fill="#00e898" opacity="0.7"/>
                    <circle cx="22" cy="8" r="2" fill="#00e898" opacity="0.7"/>
                    <path d="M4 22h22" stroke="#00e898" stroke-width="1.2" stroke-linecap="round" opacity="0.25"/>
                    <path d="M8 24h14" stroke="#00e898" stroke-width="1.2" stroke-linecap="round" opacity="0.15"/>
                  </svg>
                </div>
              </div>
              <span class="sup-priority-pill high" role="status">
                <span class="sup-priority-pip" aria-hidden="true"></span>
                Alta
              </span>
            </div>

            <div class="sup-identity">
              <h3 class="sup-name">Whey<br/>Protein</h3>
              <div class="sup-type-tag">
                <span class="sup-type-tag-line" aria-hidden="true"></span>
                Síntese Proteica · Massa
              </div>
            </div>

            <!-- Dose hero range para whey -->
            <div class="sup-dose-hero" role="group" aria-label="Dosagem: 25 a 40 gramas por dose">
              <div class="sup-dose-hero-bg" aria-hidden="true"></div>
              <span class="sup-dose-number" style="font-size:2rem;">25–40</span>
              <span class="sup-dose-unit">g</span>
              <span class="sup-dose-label">/ dose</span>
            </div>

            <!-- Indicador de dose por peso corporal -->
            <div class="dose-range-wrap" style="background:rgba(0,232,152,0.04);border:1px solid rgba(0,232,152,0.10);" role="group" aria-label="Meta diária de proteína">
              <div class="dose-range-row">
                <span class="dose-range-label">Meta Proteica Diária</span>
                <span class="dose-range-value" style="color:#00e898;">1.8 g / kg</span>
              </div>
              <div class="dose-range-slider" aria-hidden="true">
                <div class="dose-range-active" style="background:linear-gradient(90deg,#00b574,#00e898,#60ffb8);left:0%;right:25%;box-shadow:0 0 8px rgba(0,232,152,0.4);"></div>
                <div class="dose-range-thumb" style="left:75%;border-color:#00e898;background:#1a1a20;"></div>
              </div>
              <div class="dose-range-labels">
                <span class="dose-range-min-label">1.2 g/kg</span>
                <span class="dose-range-max-label">2.4 g/kg</span>
              </div>
            </div>

            <div class="sup-meta-row" role="list">
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Tipo</span>
                <span class="sup-meta-val">Concentrado</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Proteína</span>
                <span class="sup-meta-val">~25g/scoop</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">BCAA</span>
                <span class="sup-meta-val">~6g dose</span>
              </div>
            </div>

            <div class="sup-timing-section">
              <span class="sup-timing-label">Janela de consumo</span>
              <div class="sup-timing-track" role="progressbar" aria-valuetext="Pós-treino ou conforme necessidade proteica">
                <div class="sup-timing-fill" style="left:50%; width:20%;"></div>
              </div>
              <div class="sup-timing-markers" aria-hidden="true">
                <span class="sup-timing-marker">06:00</span>
                <span class="sup-timing-marker">12:00</span>
                <span class="sup-timing-marker">18:00</span>
                <span class="sup-timing-marker">24:00</span>
              </div>
              <div class="sup-timing-pills" role="list" aria-label="Momentos sugeridos">
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Pós-treino
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Conforme meta
                </span>
                <span class="sup-timing-pill" role="listitem" style="opacity:0.4;">
                  <span class="sup-timing-pill-dot" aria-hidden="true" style="background:rgba(255,255,255,0.2);"></span>Manhã
                </span>
              </div>
            </div>

            <div class="sup-insight">
              <svg class="sup-insight-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="10" stroke="#00e898" stroke-width="1.5" opacity="0.5"/>
                <path d="M11 7v5" stroke="#00e898" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="11" cy="15.5" r="1" fill="#00e898" opacity="0.8"/>
              </svg>
              <p class="sup-insight-text">
                <strong>Priorize alimento real.</strong> Whey complementa, não substitui. Meta: atingir ingestão proteica diária quando difícil por sólidos.
              </p>
            </div>
          </div>

          <footer class="sup-card-footer">
            <div class="sup-condition">
              <svg class="sup-condition-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5C9 1.5 11.5 3.5 11.5 7C11.5 10.5 9.5 12.5 7 12.5C4.5 12.5 2.5 10.5 2.5 7C2.5 3.5 5 1.5 7 1.5Z" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
                <path d="M5 7h4M7 5v4" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
              <span>Condicional ao perfil</span>
            </div>
            <button class="sup-detail-btn" aria-label="Ver detalhes do Whey Protein">
              Ver detalhes
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </footer>
        </article>

      </div><!-- /high-priority-grid -->

      <!-- ============================================= -->
      <!-- SEÇÃO: PRIORIDADE MÉDIA — CARDS              -->
      <!-- ============================================= -->
      <div class="priority-divider anim-fade-up anim-delay-5" role="separator" aria-label="Prioridade Média">
        <div class="priority-divider-line" aria-hidden="true"></div>
        <div class="priority-divider-badge medium" aria-label="2 suplementos de média prioridade">
          <span class="priority-divider-icon" aria-hidden="true"></span>
          Prioridade Média
          <span class="priority-divider-count" aria-hidden="true">· 2</span>
        </div>
        <div class="priority-divider-line" aria-hidden="true"></div>
      </div>

      <div class="supplements-medium-grid" id="medium-priority-grid" role="list">

        <!-- ————— CARD: ÔMEGA-3 EPA/DHA ————— -->
        <article
          class="sup-card sup-card--omega anim-fade-up anim-delay-6"
          role="listitem"
          tabindex="0"
          aria-label="Ômega-3 EPA/DHA — Média Prioridade"
          onclick="openModal('omega')"
          onkeydown="if(event.key==='Enter'||event.key===' ')openModal('omega')"
        >
          <div class="sup-card-bg" aria-hidden="true"></div>
          <div class="sup-card-shine" aria-hidden="true"></div>

          <div class="sup-card-content">
            <div class="sup-card-header">
              <div class="sup-icon-wrap" aria-hidden="true">
                <div class="sup-icon-bg"></div>
                <div class="sup-icon-svg">
                  <!-- Ícone: onda/omega para Ômega-3 -->
                  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 16C2 16 4 4 8 4C12 4 12 14 15 14C18 14 18 4 22 4C26 4 28 14 28 14" stroke="#7b8cde" stroke-width="2.2" stroke-linecap="round"/>
                    <path d="M2 21C2 21 5 13 8 13C11 13 11 21 14 21" stroke="#7b8cde" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
                    <circle cx="8" cy="4" r="2.5" fill="#7b8cde" opacity="0.6"/>
                    <circle cx="15" cy="14" r="2.5" fill="#7b8cde" opacity="0.6"/>
                    <circle cx="22" cy="4" r="2.5" fill="#7b8cde" opacity="0.6"/>
                  </svg>
                </div>
              </div>
              <span class="sup-priority-pill medium" role="status">
                <span class="sup-priority-pip" aria-hidden="true"></span>
                Média
              </span>
            </div>

            <div class="sup-identity">
              <h3 class="sup-name">Ômega-3<br/>EPA / DHA</h3>
              <div class="sup-type-tag">
                <span class="sup-type-tag-line" aria-hidden="true"></span>
                Cardio · Anti-inflamatório
              </div>
            </div>

            <div class="sup-dose-hero" role="group" aria-label="Dosagem: 2 gramas por dia">
              <div class="sup-dose-hero-bg" aria-hidden="true"></div>
              <span class="sup-dose-number">2</span>
              <span class="sup-dose-unit">g</span>
              <span class="sup-dose-label">/ dia</span>
            </div>

            <!-- Split de EPA e DHA -->
            <div style="display:flex;flex-direction:column;gap:8px;padding:14px 16px;background:rgba(123,140,222,0.04);border:1px solid rgba(123,140,222,0.10);border-radius:12px;" role="group" aria-label="Composição EPA e DHA">
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="font-size:0.625rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Composição Ativa</span>
                <span style="font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.5);">2.000 mg/dia</span>
              </div>
              <!-- EPA bar -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:0.6875rem;font-weight:600;color:#7b8cde;">EPA</span>
                  <span style="font-size:0.6875rem;color:rgba(255,255,255,0.45);font-family:var(--font-mono);">~1.100 mg</span>
                </div>
                <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:999px;overflow:hidden;" aria-hidden="true">
                  <div style="height:100%;width:55%;background:linear-gradient(90deg,#5566cc,#7b8cde);border-radius:999px;box-shadow:0 0 6px rgba(123,140,222,0.5);"></div>
                </div>
              </div>
              <!-- DHA bar -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:0.6875rem;font-weight:600;color:#a0b0f0;">DHA</span>
                  <span style="font-size:0.6875rem;color:rgba(255,255,255,0.45);font-family:var(--font-mono);">~700 mg</span>
                </div>
                <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:999px;overflow:hidden;" aria-hidden="true">
                  <div style="height:100%;width:35%;background:linear-gradient(90deg,#8090d0,#a0b0f0);border-radius:999px;box-shadow:0 0 6px rgba(160,176,240,0.5);"></div>
                </div>
              </div>
            </div>

            <div class="sup-meta-row" role="list">
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Fonte</span>
                <span class="sup-meta-val">Peixe/Alga</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Forma</span>
                <span class="sup-meta-val">Triglicerídeo</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Horário</span>
                <span class="sup-meta-val">Refeições</span>
              </div>
            </div>

            <div class="sup-timing-section">
              <span class="sup-timing-label">Janela de consumo</span>
              <div class="sup-timing-track" role="progressbar" aria-valuetext="Junto às refeições, manhã e almoço preferencialmente">
                <div class="sup-timing-fill" style="left:8%; width:20%;"></div>
              </div>
              <div class="sup-timing-markers" aria-hidden="true">
                <span class="sup-timing-marker">06:00</span>
                <span class="sup-timing-marker">12:00</span>
                <span class="sup-timing-marker">18:00</span>
                <span class="sup-timing-marker">24:00</span>
              </div>
              <div class="sup-timing-pills" role="list" aria-label="Momentos sugeridos">
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Com refeições
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Almoço
                </span>
                <span class="sup-timing-pill" role="listitem" style="opacity:0.4;">
                  <span class="sup-timing-pill-dot" aria-hidden="true" style="background:rgba(255,255,255,0.2);"></span>Noite
                </span>
              </div>
            </div>

            <div class="sup-insight">
              <svg class="sup-insight-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="10" stroke="#7b8cde" stroke-width="1.5" opacity="0.5"/>
                <path d="M7.5 14.5c1-3 5-4 5-4s-2-4 1-5" stroke="#7b8cde" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              <p class="sup-insight-text">
                <strong>Razão EPA:DHA &gt; 1.5:1</strong> para fins anti-inflamatórios. Prefira forma triglicerídeo — absorção 70% superior ao éster etílico.
              </p>
            </div>
          </div>

          <footer class="sup-card-footer">
            <div class="sup-condition">
              <svg class="sup-condition-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5C9 1.5 11.5 3.5 11.5 7C11.5 10.5 9.5 12.5 7 12.5C4.5 12.5 2.5 10.5 2.5 7C2.5 3.5 5 1.5 7 1.5Z" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
                <path d="M5 7h4M7 5v4" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
              <span>Condicional ao perfil</span>
            </div>
            <button class="sup-detail-btn" aria-label="Ver detalhes do Ômega-3">
              Ver detalhes
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </footer>
        </article>

        <!-- ————— CARD: MAGNÉSIO GLICINATO ————— -->
        <article
          class="sup-card sup-card--mag anim-fade-up anim-delay-7"
          role="listitem"
          tabindex="0"
          aria-label="Magnésio Glicinato — Média Prioridade"
          onclick="openModal('mag')"
          onkeydown="if(event.key==='Enter'||event.key===' ')openModal('mag')"
        >
          <div class="sup-card-bg" aria-hidden="true"></div>
          <div class="sup-card-shine" aria-hidden="true"></div>

          <div class="sup-card-content">
            <div class="sup-card-header">
              <div class="sup-icon-wrap" aria-hidden="true">
                <div class="sup-icon-bg"></div>
                <div class="sup-icon-svg">
                  <!-- Ícone: lua/sono/relaxamento para Magnésio -->
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 13.5C21 18.195 17.195 22 12.5 22C7.805 22 4 18.195 4 13.5C4 8.805 7.805 5 12.5 5C13.19 5 13.86 5.085 14.5 5.245C12.72 6.37 11.5 8.3 11.5 10.5C11.5 13.814 14.186 16.5 17.5 16.5C19.01 16.5 20.39 15.945 21.44 15.03C21.145 14.555 21 14 21 13.5Z" fill="#b87fda" opacity="0.75"/>
                    <circle cx="20" cy="7" r="1.2" fill="#b87fda" opacity="0.5"/>
                    <circle cx="23" cy="11" r="0.8" fill="#b87fda" opacity="0.35"/>
                    <circle cx="18" cy="4" r="0.7" fill="#b87fda" opacity="0.3"/>
                    <line x1="20" y1="5" x2="21.5" y2="3.5" stroke="#b87fda" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
                  </svg>
                </div>
              </div>
              <span class="sup-priority-pill medium" role="status">
                <span class="sup-priority-pip" aria-hidden="true"></span>
                Média
              </span>
            </div>

            <div class="sup-identity">
              <h3 class="sup-name">Magnésio<br/>Glicinato</h3>
              <div class="sup-type-tag">
                <span class="sup-type-tag-line" aria-hidden="true"></span>
                Sono · Relaxamento · Músculo
              </div>
            </div>

            <div class="sup-dose-hero" role="group" aria-label="Dosagem: 300 a 400 miligramas por dia">
              <div class="sup-dose-hero-bg" aria-hidden="true"></div>
              <span class="sup-dose-number" style="font-size:2rem;">300–400</span>
              <span class="sup-dose-unit">mg</span>
              <span class="sup-dose-label">/ dia</span>
            </div>

            <!-- Indicador de sleep quality -->
            <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:rgba(184,127,218,0.04);border:1px solid rgba(184,127,218,0.10);border-radius:12px;" role="group" aria-label="Benefícios do sono">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:0.625rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Impacto no Sono</span>
                <span style="font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.5);">Noturno</span>
              </div>
              <!-- Latência de sono -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;">
                  <span style="font-size:0.6875rem;font-weight:600;color:#b87fda;">↓ Latência</span>
                  <span style="font-size:0.6875rem;color:rgba(255,255,255,0.4);font-family:var(--font-mono);">−17 min avg</span>
                </div>
                <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:999px;overflow:hidden;" aria-hidden="true">
                  <div style="height:100%;width:70%;background:linear-gradient(90deg,#9050c0,#b87fda);border-radius:999px;box-shadow:0 0 6px rgba(184,127,218,0.5);"></div>
                </div>
              </div>
              <!-- Qualidade do sono profundo -->
              <div style="display:flex;flex-direction:column;gap:4px;">
                <div style="display:flex;justify-content:space-between;">
                  <span style="font-size:0.6875rem;font-weight:600;color:#d0a8f0;">↑ Sono Profundo</span>
                  <span style="font-size:0.6875rem;color:rgba(255,255,255,0.4);font-family:var(--font-mono);">+12% SWS</span>
                </div>
                <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:999px;overflow:hidden;" aria-hidden="true">
                  <div style="height:100%;width:55%;background:linear-gradient(90deg,#a060d0,#d0a8f0);border-radius:999px;box-shadow:0 0 6px rgba(208,168,240,0.4);"></div>
                </div>
              </div>
            </div>

            <div class="sup-meta-row" role="list">
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Forma</span>
                <span class="sup-meta-val">Glicinato</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Absorção</span>
                <span class="sup-meta-val">Alta</span>
              </div>
              <div class="sup-meta-item" role="listitem">
                <span class="sup-meta-key">Horário</span>
                <span class="sup-meta-val">Noite</span>
              </div>
            </div>

            <div class="sup-timing-section">
              <span class="sup-timing-label">Janela de consumo</span>
              <div class="sup-timing-track" role="progressbar" aria-valuetext="Noite, pré-sono, entre 21h e 23h">
                <div class="sup-timing-fill" style="left:62%; width:22%;"></div>
              </div>
              <div class="sup-timing-markers" aria-hidden="true">
                <span class="sup-timing-marker">06:00</span>
                <span class="sup-timing-marker">12:00</span>
                <span class="sup-timing-marker">18:00</span>
                <span class="sup-timing-marker">24:00</span>
              </div>
              <div class="sup-timing-pills" role="list" aria-label="Momentos sugeridos">
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Noite
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>Pré-sono
                </span>
                <span class="sup-timing-pill active" role="listitem">
                  <span class="sup-timing-pill-dot" aria-hidden="true"></span>21h–23h
                </span>
                <span class="sup-timing-pill" role="listitem" style="opacity:0.4;">
                  <span class="sup-timing-pill-dot" aria-hidden="true" style="background:rgba(255,255,255,0.2);"></span>Manhã
                </span>
              </div>
            </div>

            <div class="sup-insight">
              <svg class="sup-insight-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="10" stroke="#b87fda" stroke-width="1.5" opacity="0.5"/>
                <path d="M11 7v5" stroke="#b87fda" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="11" cy="15.5" r="1" fill="#b87fda" opacity="0.8"/>
              </svg>
              <p class="sup-insight-text">
                <strong>Glicinato = mínimo efeito laxante.</strong> Formas como óxido têm absorção 4× inferior. 80% da população tem deficiência subclínica de Mg.
              </p>
            </div>
          </div>

          <footer class="sup-card-footer">
            <div class="sup-condition">
              <svg class="sup-condition-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5C9 1.5 11.5 3.5 11.5 7C11.5 10.5 9.5 12.5 7 12.5C4.5 12.5 2.5 10.5 2.5 7C2.5 3.5 5 1.5 7 1.5Z" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
                <path d="M5 7h4M7 5v4" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
              <span>Condicional ao perfil</span>
            </div>
            <button class="sup-detail-btn" aria-label="Ver detalhes do Magnésio Glicinato">
              Ver detalhes
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </footer>
        </article>

      </div><!-- /medium-priority-grid -->

      <!-- ============================================= -->
      <!-- SEÇÃO: DAILY STACK TIMELINE                  -->
      <!-- ============================================= -->
      <div class="daily-stack-section anim-fade-up anim-delay-8">
        <div class="daily-stack-header">
          <div>
            <h3 class="daily-stack-title">Protocolo Diário</h3>
            <p class="daily-stack-subtitle">Distribuição dos compostos ao longo do dia</p>
          </div>
          <div class="stack-total-pill" aria-label="Total de 5 compostos no protocolo">
            <span class="stack-total-num">5</span>
            <span class="stack-total-label">compostos</span>
          </div>
        </div>

        <div class="timeline-wrap" role="region" aria-label="Linha do tempo do protocolo diário">
          <!-- Linha de "agora" — posicionada via JS -->
          <div class="timeline-now-line" id="timeline-now" aria-label="Hora atual" role="presentation">
            <div class="timeline-now-label">AGORA</div>
          </div>

          <!-- Horas do dia -->
          <div class="timeline-hours" aria-hidden="true">
            <div class="timeline-hour-labels" id="hour-labels">
              <!-- Gerado via JS -->
            </div>
          </div>

          <!-- Faixas de cada suplemento -->
          <div class="timeline-tracks" role="list">

            <!-- Creatina — qualquer horário -->
            <div class="timeline-track" role="listitem" aria-label="Creatina: qualquer horário">
              <span class="timeline-track-name" style="color:rgba(0,200,255,0.8);">Creatina 5g</span>
              <div class="timeline-track-bar-wrap">
                <div class="timeline-track-bg" aria-hidden="true">
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                </div>
                <!-- Bloco: qualquer horário — manhã + pré-treino -->
                <div class="timeline-dose-block" style="left:calc(7/24*100%); width:calc(3/24*100%); background:linear-gradient(90deg,rgba(0,150,200,0.65),rgba(0,200,255,0.75)); border:1px solid rgba(0,200,255,0.3);">
                  <span class="timeline-dose-block-text">5g — Manhã</span>
                </div>
              </div>
            </div>

            <!-- Vitamina D3+K2 — manhã com refeição -->
            <div class="timeline-track" role="listitem" aria-label="Vitamina D3+K2: manhã com refeição">
              <span class="timeline-track-name" style="color:rgba(255,184,48,0.8);">D3+K2 2–5kUI</span>
              <div class="timeline-track-bar-wrap">
                <div class="timeline-track-bg" aria-hidden="true">
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                </div>
                <div class="timeline-dose-block" style="left:calc(7.5/24*100%); width:calc(2/24*100%); background:linear-gradient(90deg,rgba(200,140,0,0.65),rgba(255,184,48,0.75)); border:1px solid rgba(255,184,48,0.3);">
                  <span class="timeline-dose-block-text">Com café</span>
                </div>
              </div>
            </div>

            <!-- Whey Protein — pós-treino -->
            <div class="timeline-track" role="listitem" aria-label="Whey Protein: pós-treino">
              <span class="timeline-track-name" style="color:rgba(0,232,152,0.8);">Whey 25–40g</span>
              <div class="timeline-track-bar-wrap">
                <div class="timeline-track-bg" aria-hidden="true">
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                </div>
                <div class="timeline-dose-block" style="left:calc(18/24*100%); width:calc(1.5/24*100%); background:linear-gradient(90deg,rgba(0,181,116,0.65),rgba(0,232,152,0.75)); border:1px solid rgba(0,232,152,0.3);">
                  <span class="timeline-dose-block-text">Pós-treino</span>
                </div>
              </div>
            </div>

            <!-- Ômega-3 — almoço -->
            <div class="timeline-track" role="listitem" aria-label="Ômega-3: com o almoço">
              <span class="timeline-track-name" style="color:rgba(123,140,222,0.8);">Ômega-3 2g</span>
              <div class="timeline-track-bar-wrap">
                <div class="timeline-track-bg" aria-hidden="true">
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                </div>
                <div class="timeline-dose-block" style="left:calc(12/24*100%); width:calc(1.5/24*100%); background:linear-gradient(90deg,rgba(85,102,204,0.65),rgba(123,140,222,0.75)); border:1px solid rgba(123,140,222,0.3);">
                  <span class="timeline-dose-block-text">Almoço</span>
                </div>
              </div>
            </div>

            <!-- Magnésio — noite pré-sono -->
            <div class="timeline-track" role="listitem" aria-label="Magnésio: noite pré-sono">
              <span class="timeline-track-name" style="color:rgba(184,127,218,0.8);">Mg 300–400mg</span>
              <div class="timeline-track-bar-wrap">
                <div class="timeline-track-bg" aria-hidden="true">
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                  <div class="timeline-track-bg-cell"></div><div class="timeline-track-bg-cell"></div>
                </div>
                <div class="timeline-dose-block" style="left:calc(21/24*100%); width:calc(1.5/24*100%); background:linear-gradient(90deg,rgba(144,80,192,0.65),rgba(184,127,218,0.75)); border:1px solid rgba(184,127,218,0.3);">
                  <span class="timeline-dose-block-text">Pré-sono</span>
                </div>
              </div>
            </div>

          </div><!-- /timeline-tracks -->
        </div><!-- /timeline-wrap -->
      </div><!-- /daily-stack-section -->

      <!-- ============================================= -->
      <!-- SEÇÃO: INFO STRIP INFERIOR                   -->
      <!-- ============================================= -->
      <div class="info-strip anim-fade-up anim-delay-9" role="list">

        <!-- Card 1: Segurança -->
        <div class="info-strip-card" role="listitem">
          <div class="info-strip-icon" style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.15);" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L17 5V10C17 14 13.5 17.5 10 18C6.5 17.5 3 14 3 10V5L10 2Z" stroke="#10b981" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M7 10l2 2 4-4" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="info-strip-body">
            <h4 class="info-strip-heading">Protocolos Validados</h4>
            <p class="info-strip-desc">Todos os compostos são baseados em ensaios clínicos randomizados com evidência de nível A ou B.</p>
          </div>
        </div>

        <!-- Card 2: Personalização -->
        <div class="info-strip-card" role="listitem">
          <div class="info-strip-icon" style="background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.12);" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" stroke="#00c8ff" stroke-width="1.5"/>
              <circle cx="10" cy="10" r="3" fill="#00c8ff" opacity="0.6"/>
              <line x1="10" y1="2" x2="10" y2="5" stroke="#00c8ff" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="10" y1="15" x2="10" y2="18" stroke="#00c8ff" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="2" y1="10" x2="5" y2="10" stroke="#00c8ff" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="15" y1="10" x2="18" y2="10" stroke="#00c8ff" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="info-strip-body">
            <h4 class="info-strip-heading">Adaptado ao Seu Perfil</h4>
            <p class="info-strip-desc">Dosagens calculadas com base no seu peso, biometria, frequência de treino e objetivos declarados.</p>
          </div>
        </div>

        <!-- Card 3: Revisão -->
        <div class="info-strip-card" role="listitem">
          <div class="info-strip-icon" style="background:rgba(184,127,218,0.06);border:1px solid rgba(184,127,218,0.12);" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10" stroke="#b87fda" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M14 2L18 2L18 6" stroke="#b87fda" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 2L12 8" stroke="#b87fda" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M10 6v4l2.5 2.5" stroke="#b87fda" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="info-strip-body">
            <h4 class="info-strip-heading">Revisão em 30 Dias</h4>
            <p class="info-strip-desc">O stack é reavaliado mensalmente com base em progresso, exames e feedbacks de performance.</p>
          </div>
        </div>

      </div><!-- /info-strip -->

    </section>
  </div><!-- /page-wrapper -->

  <!-- ============================================= -->
  <!-- SEÇÃO: MODAIS DE DETALHE                      -->
  <!-- ============================================= -->
  <div
    class="modal-overlay"
    id="modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
    onclick="handleOverlayClick(event)"
  >
    <div class="modal-panel" id="modal-panel" role="document">
      <!-- Conteúdo injetado via JS -->
    </div>
  </div>

  <!-- ============================================= -->
  <!-- SEÇÃO: JAVASCRIPT                             -->
  <!-- ============================================= -->`;

export const LEGACY_SUPPLEMENTS_SCRIPT = `// =============================================
    // SEÇÃO: DADOS DOS SUPLEMENTOS
    // =============================================
    const supplements = {
      creatina: {
        name: 'Creatina Monohidratada',
        type: 'Força · Recuperação · Performance',
        priority: 'high',
        color: '#00c8ff',
        colorMid: '#0099cc',
        colorGlow: 'rgba(0,200,255,0.15)',
        gradientModal: 'radial-gradient(ellipse 120% 60% at 100% 0%, rgba(0,200,255,0.08) 0%, transparent 60%)',
        iconHtml: \`<svg width="36" height="36" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="4" fill="#00c8ff" opacity="0.9"/><circle cx="14" cy="4" r="2.5" fill="#00c8ff" opacity="0.55"/><circle cx="14" cy="24" r="2.5" fill="#00c8ff" opacity="0.55"/><circle cx="4" cy="14" r="2.5" fill="#00c8ff" opacity="0.55"/><circle cx="24" cy="14" r="2.5" fill="#00c8ff" opacity="0.55"/><circle cx="6.08" cy="6.08" r="2" fill="#00c8ff" opacity="0.35"/><circle cx="21.92" cy="6.08" r="2" fill="#00c8ff" opacity="0.35"/><circle cx="6.08" cy="21.92" r="2" fill="#00c8ff" opacity="0.35"/><circle cx="21.92" cy="21.92" r="2" fill="#00c8ff" opacity="0.35"/><line x1="14" y1="10" x2="14" y2="6.5" stroke="#00c8ff" stroke-width="1" opacity="0.5"/><line x1="14" y1="18" x2="14" y2="21.5" stroke="#00c8ff" stroke-width="1" opacity="0.5"/><line x1="10" y1="14" x2="6.5" y2="14" stroke="#00c8ff" stroke-width="1" opacity="0.5"/><line x1="18" y1="14" x2="21.5" y2="14" stroke="#00c8ff" stroke-width="1" opacity="0.5"/></svg>\`,
        stats: [
          { key: 'Dose Diária', val: '5g', sub: 'Dose manutenção' },
          { key: 'Horário', val: 'Qualquer', sub: 'Consistência > Timing' },
          { key: 'Evidência', val: 'Nível A', sub: 'Meta-análises RCT' },
        ],
        benefits: [
          { text: '<strong>+8–12% de força</strong> nos principais levantamentos em 4–8 semanas de uso contínuo com treinamento resistido.' },
          { text: '<strong>Ressíntese de ATP acelerada:</strong> regenera fosfocreatina intramuscular, retardando a fadiga em esforços de alta intensidade.' },
          { text: '<strong>Volumização celular:</strong> atrai água para o músculo, criando ambiente anabólico favorável para síntese proteica.' },
          { text: '<strong>Benefícios cognitivos documentados:</strong> melhora de memória de trabalho e função executiva em populações deficientes.' },
          { text: '<strong>Protocolo simples:</strong> fase de saturação opcional (20g/dia por 5–7 dias). Manutenção eficaz com 3–5g/dia.' },
        ],
        warning: '<strong>Hidratação essencial.</strong> A creatina aumenta a retenção intramuscular de água — aumente o consumo hídrico em ~500ml/dia. Não requer ciclar.',
        condition: 'Evidência nível A — universalmente indicada',
      },

      vitd: {
        name: 'Vitamina D3 + K2',
        type: 'Imunidade · Hormonal · Ósseo',
        priority: 'high',
        color: '#ffb830',
        colorMid: '#e09000',
        colorGlow: 'rgba(255,184,48,0.15)',
        gradientModal: 'radial-gradient(ellipse 100% 60% at 50% -20%, rgba(255,184,48,0.10) 0%, transparent 60%)',
        iconHtml: \`<svg width="36" height="36" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="6" fill="#ffb830" opacity="0.85"/><circle cx="14" cy="14" r="9" stroke="#ffb830" stroke-width="1" opacity="0.25"/><line x1="14" y1="1" x2="14" y2="5" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><line x1="14" y1="23" x2="14" y2="27" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><line x1="1" y1="14" x2="5" y2="14" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><line x1="23" y1="14" x2="27" y2="14" stroke="#ffb830" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><line x1="4.05" y1="4.05" x2="6.87" y2="6.87" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><line x1="21.13" y1="21.13" x2="23.95" y2="23.95" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><line x1="23.95" y1="4.05" x2="21.13" y2="6.87" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><line x1="6.87" y1="21.13" x2="4.05" y2="23.95" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>\`,
        stats: [
          { key: 'Faixa D3', val: '2k–5k UI', sub: 'Dose diária' },
          { key: 'K2 Forma', val: 'MK-7', sub: 'Maior meia-vida' },
          { key: 'Horário', val: 'Manhã', sub: 'Com refeição gordurosa' },
        ],
        benefits: [
          { text: '<strong>Modulação imune:</strong> VDR (receptores de vitamina D) estão presentes em praticamente todas as células do sistema imunológico.' },
          { text: '<strong>Saúde óssea:</strong> D3 aumenta absorção intestinal de cálcio. K2 (MK-7) ativa osteocalcina, dirigindo cálcio para o osso — não para as artérias.' },
          { text: '<strong>Função hormonal:</strong> relacionada diretamente com produção de testosterona, regulação do humor e prevenção de depressão sazonal.' },
          { text: '<strong>Performance muscular:</strong> deficiência de D3 associada a fraqueza, fadiga e risco aumentado de lesões musculoesqueléticas.' },
          { text: '<strong>Proteção cardiovascular via K2:</strong> inibe calcificação arterial ao ativar MGP (proteína Gla da matriz).' },
        ],
        warning: '<strong>Lipossolúvel — tome com alimento contendo gordura</strong> (abacate, ovos, azeite). Dosar pelo exame 25-OH vitamina D. Meta: 40–60 ng/mL.',
        condition: 'Recomendada — 80% da população tem deficiência',
      },

      whey: {
        name: 'Whey Protein',
        type: 'Síntese Proteica · Hipertrofia',
        priority: 'high',
        color: '#00e898',
        colorMid: '#00b574',
        colorGlow: 'rgba(0,232,152,0.15)',
        gradientModal: 'radial-gradient(ellipse 100% 60% at 0% 0%, rgba(0,232,152,0.07) 0%, transparent 60%)',
        iconHtml: \`<svg width="36" height="28" viewBox="0 0 30 28" fill="none"><path d="M4 18C4 18 6 8 10 8C14 8 12 18 16 18C20 18 18 8 22 8C26 8 26 14 26 14" stroke="#00e898" stroke-width="2.2" stroke-linecap="round"/><circle cx="10" cy="8" r="2" fill="#00e898" opacity="0.7"/><circle cx="16" cy="18" r="2" fill="#00e898" opacity="0.7"/><circle cx="22" cy="8" r="2" fill="#00e898" opacity="0.7"/></svg>\`,
        stats: [
          { key: 'Dose/Dose', val: '25–40g', sub: 'Proteína isolada' },
          { key: 'Meta Diária', val: '1.8g/kg', sub: 'Bodyweight alvo' },
          { key: 'Horário', val: 'Pós-treino', sub: 'Ou por necessidade' },
        ],
        benefits: [
          { text: '<strong>Maior velocidade de absorção</strong> entre as proteínas — pico aminoacídico em 90 min, ideal para janela pós-treino.' },
          { text: '<strong>Alto teor de leucina</strong> (~10–11%): ativa diretamente mTORC1, principal sinalização de síntese proteica muscular.' },
          { text: '<strong>Perfil completo de aminoácidos essenciais (EAA)</strong> incluindo todos os BCAAs em proporção ótima para hipertrofia.' },
          { text: '<strong>Praticidade:</strong> solução eficiente para atingir meta proteica diária quando a ingestão por sólidos é insuficiente.' },
          { text: '<strong>Concentrado vs Isolado:</strong> para lactose, opte por isolado ou hidrolisado. Diferença no resultado é mínima para maioria das pessoas.' },
        ],
        warning: '<strong>Complemento, não substituto.</strong> Priorize sempre proteína de fontes alimentares integrais. Whey complementa quando a meta diária não é atingida via dieta.',
        condition: 'Condicional — baseado em meta proteica diária',
      },

      omega: {
        name: 'Ômega-3 EPA/DHA',
        type: 'Cardiovascular · Anti-inflamatório',
        priority: 'medium',
        color: '#7b8cde',
        colorMid: '#5566cc',
        colorGlow: 'rgba(123,140,222,0.12)',
        gradientModal: 'radial-gradient(ellipse 100% 60% at 0% 50%, rgba(123,140,222,0.07) 0%, transparent 60%)',
        iconHtml: \`<svg width="36" height="28" viewBox="0 0 30 24" fill="none"><path d="M2 16C2 16 4 4 8 4C12 4 12 14 15 14C18 14 18 4 22 4C26 4 28 14 28 14" stroke="#7b8cde" stroke-width="2.2" stroke-linecap="round"/><circle cx="8" cy="4" r="2.5" fill="#7b8cde" opacity="0.6"/><circle cx="15" cy="14" r="2.5" fill="#7b8cde" opacity="0.6"/><circle cx="22" cy="4" r="2.5" fill="#7b8cde" opacity="0.6"/></svg>\`,
        stats: [
          { key: 'Dose Total', val: '2g/dia', sub: 'EPA + DHA combinados' },
          { key: 'Razão', val: 'EPA>DHA', sub: 'Para inflamação' },
          { key: 'Horário', val: 'Refeições', sub: 'Absorção otimizada' },
        ],
        benefits: [
          { text: '<strong>Anti-inflamatório sistêmico:</strong> EPA compete com ácido araquidônico, reduzindo produção de eicosanoides pró-inflamatórios.' },
          { text: '<strong>Saúde cardiovascular:</strong> reduz triglicerídeos em 15–30% em doses de 2–4g/dia. Melhora função endotelial.' },
          { text: '<strong>DHA essencial para cérebro:</strong> componente estrutural de membranas neuronais — associado a cognição, humor e neuroproteção.' },
          { text: '<strong>Recuperação muscular acelerada:</strong> reduz DOMS (dor muscular de início tardio) e marcadores inflamatórios pós-treino.' },
          { text: '<strong>Forma triglicerídeo:</strong> absorção 70% superior ao éster etílico. Identificável na rotulagem como "TG form" ou "natural form".' },
        ],
        warning: '<strong>Atenção se usa anticoagulantes</strong> (varfarina, AAS). Acima de 3g/dia pode aumentar levemente tempo de sangramento. Consulte médico.',
        condition: 'Condicional — perfil inflamatório e cardiovascular',
      },

      mag: {
        name: 'Magnésio Glicinato',
        type: 'Sono · Neuromuscular · Relaxamento',
        priority: 'medium',
        color: '#b87fda',
        colorMid: '#9050c0',
        colorGlow: 'rgba(184,127,218,0.12)',
        gradientModal: 'radial-gradient(ellipse 100% 60% at 100% 0%, rgba(184,127,218,0.08) 0%, transparent 60%)',
        iconHtml: \`<svg width="30" height="30" viewBox="0 0 26 26" fill="none"><path d="M21 13.5C21 18.195 17.195 22 12.5 22C7.805 22 4 18.195 4 13.5C4 8.805 7.805 5 12.5 5C13.19 5 13.86 5.085 14.5 5.245C12.72 6.37 11.5 8.3 11.5 10.5C11.5 13.814 14.186 16.5 17.5 16.5C19.01 16.5 20.39 15.945 21.44 15.03C21.145 14.555 21 14 21 13.5Z" fill="#b87fda" opacity="0.75"/><circle cx="20" cy="7" r="1.2" fill="#b87fda" opacity="0.5"/><circle cx="23" cy="11" r="0.8" fill="#b87fda" opacity="0.35"/></svg>\`,
        stats: [
          { key: 'Dose Diária', val: '300–400mg', sub: 'Mg elementar' },
          { key: 'Forma', val: 'Glicinato', sub: '+ biodisponível' },
          { key: 'Horário', val: 'Noite', sub: '1–2h pré-sono' },
        ],
        benefits: [
          { text: '<strong>Co-fator em 300+ reações enzimáticas:</strong> síntese proteica, DNA, função nervosa e muscular dependem de Mg adequado.' },
          { text: '<strong>Melhora qualidade do sono:</strong> ativa receptores GABA (neuroinibição), reduz cortisol noturno e diminui latência do sono.' },
          { text: '<strong>Redução de câimbras e espasmos:</strong> regula contração muscular — particularmente útil para atletas treinando com alta frequência.' },
          { text: '<strong>Efeito ansiolítico leve:</strong> o glicina presente na forma glicinato tem ação neurinibitória independente, amplificando o relaxamento.' },
          { text: '<strong>Glicinato vs Óxido:</strong> óxido tem absorção <15%. Glicinato e malato apresentam absorção de 50–80%, sem efeito laxante.' },
        ],
        warning: '<strong>Deficiência subclínica muito comum</strong> (estimada em 60–80% da população). Dieta industrializada é pobre em Mg. Suplementar é geralmente seguro.',
        condition: 'Condicional — indicadores de deficiência no perfil',
      },
    };

    // =============================================
    // SEÇÃO: FUNÇÕES DO MODAL
    // =============================================
    function openModal(supKey) {
      try {
        const sup = supplements[supKey];
        if (!sup) {
          console.error('[DietForge] Suplemento não encontrado:', supKey);
          return;
        }

        const overlay = document.getElementById('modal-overlay');
        const panel   = document.getElementById('modal-panel');

        if (!overlay || !panel) {
          console.error('[DietForge] Elementos do modal não encontrados.');
          return;
        }

        const priorityLabel    = sup.priority === 'high' ? 'Alta Prioridade' : 'Média Prioridade';
        const priorityPillClass = sup.priority === 'high' ? 'high' : 'medium';

        const benefitsHtml = sup.benefits.map(b => \`
          <div class="modal-benefit-item">
            <div class="modal-benefit-check" style="background:\${sup.colorGlow};border:1px solid \${sup.color}33;">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5l2.5 2.5L8 3" stroke="\${sup.color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="modal-benefit-text">\${b.text}</p>
          </div>
        \`).join('');

        const statsHtml = sup.stats.map(s => \`
          <div class="modal-stat">
            <span class="modal-stat-key">\${s.key}</span>
            <span class="modal-stat-val" style="color:\${sup.color};">\${s.val}</span>
            <span class="modal-stat-sub">\${s.sub}</span>
          </div>
        \`).join('');

        panel.innerHTML = \`
          <div class="modal-header">
            <div class="modal-header-bg" style="background:\${sup.gradientModal};" aria-hidden="true"></div>
            <button class="modal-close" onclick="closeModal()" aria-label="Fechar modal" title="Fechar (Esc)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="modal-icon-row">
              <div class="modal-icon-wrap" style="background:\${sup.colorGlow};border:1px solid \${sup.color}33;" aria-hidden="true">
                \${sup.iconHtml}
              </div>
              <div>
                <div id="modal-title" class="modal-name">\${sup.name}</div>
                <div class="modal-type" style="color:\${sup.color};">\${sup.type}</div>
                <div style="margin-top:8px;">
                  <span class="sup-priority-pill \${priorityPillClass}" role="status">
                    <span class="sup-priority-pip" aria-hidden="true"></span>
                    \${priorityLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <!-- Stats -->
            <div>
              <div class="modal-section-title">Dosagem e Protocolo</div>
              <div class="modal-stats-grid">\${statsHtml}</div>
            </div>

            <!-- Benefícios -->
            <div>
              <div class="modal-section-title">Benefícios Documentados</div>
              <div class="modal-benefit-list">\${benefitsHtml}</div>
            </div>

            <!-- Warning -->
            <div class="modal-warning" role="note" aria-label="Observação importante">
              <svg class="modal-warning-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1L17 16H1L9 1Z" stroke="#ffb830" stroke-width="1.4" stroke-linejoin="round"/>
                <line x1="9" y1="7" x2="9" y2="11" stroke="#ffb830" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="9" cy="13.5" r="0.8" fill="#ffb830"/>
              </svg>
              <p class="modal-warning-text">\${sup.warning}</p>
            </div>

            <!-- Condição de uso -->
            <div style="display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:10px;">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <path d="M5 7l1.5 1.5L9 5.5" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span style="font-size:0.75rem;color:rgba(255,255,255,0.45);">\${sup.condition}</span>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-btn-secondary" onclick="closeModal()">Fechar</button>
            <button class="modal-btn-primary" style="background:linear-gradient(135deg,\${sup.colorMid},\${sup.color});" aria-label="Adicionar \${sup.name} ao planejamento">
              Adicionar ao Plano
            </button>
          </div>
        \`;

        // Abre o modal
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus trap
        const closeBtn = panel.querySelector('.modal-close');
        if (closeBtn) {
          setTimeout(() => closeBtn.focus(), 50);
        }

      } catch (err) {
        console.error('[DietForge] Erro ao abrir modal:', err);
      }
    }

    function closeModal() {
      try {
        const overlay = document.getElementById('modal-overlay');
        if (!overlay) return;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      } catch (err) {
        console.error('[DietForge] Erro ao fechar modal:', err);
      }
    }

    function handleOverlayClick(event) {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    }

    // =============================================
    // SEÇÃO: KEYBOARD NAVIGATION (MODAL)
    // =============================================
    document.addEventListener('keydown', function(e) {
      const overlay = document.getElementById('modal-overlay');
      if (!overlay) return;
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeModal();
      }
    });

    // =============================================
    // SEÇÃO: TIMELINE — HORA ATUAL E LABELS
    // =============================================
    function initTimeline() {
      try {
        // Gera labels de horas
        const hourLabels = document.getElementById('hour-labels');
        if (hourLabels) {
          const now = new Date();
          const currentHour = now.getHours();

          for (let h = 0; h < 24; h++) {
            const label = document.createElement('div');
            label.className = 'timeline-hour-label' + (h === currentHour ? ' active' : '');
            // Mostra apenas horas pares para não poluir
            label.textContent = (h % 2 === 0) ? String(h).padStart(2, '0') : '';
            hourLabels.appendChild(label);
          }
        }

        // Posiciona linha de "agora"
        updateNowLine();
        setInterval(updateNowLine, 60000); // Atualiza a cada minuto

      } catch (err) {
        console.error('[DietForge] Erro ao inicializar timeline:', err);
      }
    }

    function updateNowLine() {
      try {
        const nowLine = document.getElementById('timeline-now');
        if (!nowLine) return;

        const now = new Date();
        const totalMinutes = now.getHours() * 60 + now.getMinutes();
        const percentage = (totalMinutes / (24 * 60)) * 100;

        nowLine.style.left = percentage + '%';
      } catch (err) {
        console.error('[DietForge] Erro ao atualizar linha de now:', err);
      }
    }

    // =============================================
    // SEÇÃO: VIEW TOGGLE (GRID / LIST)
    // =============================================
    function initViewToggle() {
      try {
        const btnGrid = document.getElementById('btn-grid');
        const btnList = document.getElementById('btn-list');
        const highGrid = document.getElementById('high-priority-grid');
        const medGrid  = document.getElementById('medium-priority-grid');

        if (!btnGrid || !btnList || !highGrid || !medGrid) return;

        btnGrid.addEventListener('click', function() {
          btnGrid.classList.add('active');
          btnList.classList.remove('active');

          highGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
          medGrid.style.gridTemplateColumns  = 'repeat(2, 1fr)';

          // Remove list styles
          document.querySelectorAll('.sup-card').forEach(card => {
            card.style.flexDirection  = '';
            card.style.maxHeight      = '';
          });

          document.querySelectorAll('.sup-timing-section, .sup-insight, .dose-range-wrap').forEach(el => {
            el.style.display = '';
          });
        });

        btnList.addEventListener('click', function() {
          btnList.classList.add('active');
          btnGrid.classList.remove('active');

          highGrid.style.gridTemplateColumns = '1fr';
          medGrid.style.gridTemplateColumns  = '1fr';

          document.querySelectorAll('.sup-card').forEach(card => {
            card.style.flexDirection = 'row';
            card.style.flexWrap     = 'wrap';
          });

          document.querySelectorAll('.sup-card-content').forEach(el => {
            el.style.flexDirection = 'row';
            el.style.flexWrap      = 'wrap';
            el.style.alignItems    = 'center';
          });
        });

      } catch (err) {
        console.error('[DietForge] Erro ao inicializar view toggle:', err);
      }
    }

    // =============================================
    // SEÇÃO: INTERSECTION OBSERVER — ANIMAÇÃO
    // =============================================
    function initAnimations() {
      try {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        document.querySelectorAll('.anim-fade-up').forEach(el => {
          el.style.animationPlayState = 'paused';
          observer.observe(el);
        });

      } catch (err) {
        // Fallback: mostra tudo sem animação
        document.querySelectorAll('.anim-fade-up').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }
    }

    // =============================================
    // SEÇÃO: TIMING TRACK ANIMATION
    // =============================================
    function initTimingTracks() {
      try {
        // Anima as barras de timing quando visíveis
        const tracks = document.querySelectorAll('.sup-timing-fill');
        if (!tracks.length) return;

        if (!('IntersectionObserver' in window)) return;

        const trackObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.style.width;
                const targetLeft  = fill.style.left;
                fill.style.width = '0';
                fill.style.opacity = '0';
                requestAnimationFrame(() => {
                  fill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, opacity 0.4s ease 0.2s';
                  fill.style.width   = targetWidth;
                  fill.style.opacity = '1';
                });
                trackObserver.unobserve(fill);
              }
            });
          },
          { threshold: 0.3 }
        );

        tracks.forEach(track => {
          trackObserver.observe(track);
        });

      } catch (err) {
        console.error('[DietForge] Erro nas animações de timing track:', err);
      }
    }

    // =============================================
    // SEÇÃO: MATCH SCORE RING ANIMATION
    // =============================================
    function initMatchRing() {
      try {
        const ringFill = document.querySelector('.match-score-ring-fill');
        if (!ringFill) return;

        // Stroke-dasharray para círculo de raio 22: circunferência = 2 * PI * 22 ≈ 138.16
        // 85% = 138.16 * 0.85 = 117.44 => dashoffset = 138.16 - 117.44 = 20.72
        // Já configurado no CSS via keyframe

      } catch (err) {
        console.error('[DietForge] Erro no ring animation:', err);
      }
    }

    // =============================================
    // SEÇÃO: INICIALIZAÇÃO
    // =============================================
    document.addEventListener('DOMContentLoaded', function() {
      initTimeline();
      initViewToggle();
      initAnimations();
      initTimingTracks();
      initMatchRing();
    });`;
