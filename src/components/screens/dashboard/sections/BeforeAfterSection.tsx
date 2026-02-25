import { beforeAfter } from '../../../../lib/constants/mockDashboard';

export const BeforeAfterSection = () => {
  return (
    <div className="dash-two-col">
      <div className="before-after-card">
        <div className="dash-section-header before-after-header">
          <div className="dash-section-title">Antes & Depois</div>
          <span className="before-after-badge">Semana 12</span>
        </div>
        <div className="before-after-row">
          <div className="ba-side">
            <div className="ba-side-label">Agora</div>
            <div className="ba-metric">
              <div className="ba-metric-value">{beforeAfter.now.weight}</div>
              <div className="ba-metric-label">Peso total</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value">{beforeAfter.now.bodyFat}</div>
              <div className="ba-metric-label">BF</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value">{beforeAfter.now.leanMass}</div>
              <div className="ba-metric-label">Massa Magra</div>
            </div>
          </div>
          <div className="ba-arrow-wrapper">
            <div className="ba-arrow">?</div>
            <div className="ba-weeks">12 semanas</div>
          </div>
          <div className="ba-side">
            <div className="ba-side-label after-label">Semana 12</div>
            <div className="ba-metric">
              <div className="ba-metric-value after-val">{beforeAfter.week12.weight}</div>
              <div className="ba-metric-label">Peso total</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value after-val">{beforeAfter.week12.bodyFat}</div>
              <div className="ba-metric-label">BF</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value after-val">{beforeAfter.week12.leanMass}</div>
              <div className="ba-metric-label">Massa Magra</div>
            </div>
          </div>
        </div>
      </div>

      <div className="speed-stack">
        <div className="speed-card">
          <div className="speed-label">? Velocidade de resultado</div>
          <div className="speed-main">
            ~<span className="highlight">0,43 kg</span> de gordura
            <br />
            por semana
          </div>
          <div className="speed-sub">
            Meta atingida em aproximadamente <strong className="speed-strong">~14 semanas</strong>
          </div>
        </div>

        <div className="speed-card speed-card-cyan">
          <div className="speed-label speed-label-cyan">?? Perda de gordura pura</div>
          <div className="speed-main">
            ~<span className="speed-highlight-cyan">5.8 kg</span> de gordura
            <br />
            total no protocolo
          </div>
          <div className="speed-sub">
            LBM preservada: <strong className="speed-strong">64.1kg (-1.5kg)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

