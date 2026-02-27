import { useDietForgeStore } from '../../../../store/useDietForgeStore';

const formatBf = (value: number | null): string => (value === null ? 'N/A' : `${value.toFixed(1)}%`);

export const BeforeAfterSection = () => {
  const results = useDietForgeStore((state) => state.results);

  if (!results?.beforeAfter) {
    return null;
  }

  const beforeAfter = results.beforeAfter;
  const isCut = results.dailyDelta >= 0;
  const speedArrow = isCut ? '↓' : '↑';

  return (
    <div className="dash-two-col">
      <div className="before-after-card">
        <div className="dash-section-header before-after-header">
          <div className="dash-section-title">Antes & Depois</div>
          <span className="before-after-badge">Semana {beforeAfter.projected.week}</span>
        </div>
        <div className="before-after-row">
          <div className="ba-side">
            <div className="ba-side-label">Agora</div>
            <div className="ba-metric">
              <div className="ba-metric-value">{beforeAfter.now.weightKg.toFixed(1)} kg</div>
              <div className="ba-metric-label">Peso total</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value">{formatBf(beforeAfter.now.bodyFatPct)}</div>
              <div className="ba-metric-label">BF</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value">
                {beforeAfter.now.leanMassKg !== null ? `${beforeAfter.now.leanMassKg.toFixed(1)} kg` : 'N/A'}
              </div>
              <div className="ba-metric-label">Massa magra</div>
            </div>
          </div>
          <div className="ba-arrow-wrapper">
            <div className="ba-arrow">&gt;</div>
            <div className="ba-weeks">{beforeAfter.projected.week} semanas</div>
          </div>
          <div className="ba-side">
            <div className="ba-side-label after-label">Projetado</div>
            <div className="ba-metric">
              <div className="ba-metric-value after-val">{beforeAfter.projected.weightKg.toFixed(1)} kg</div>
              <div className="ba-metric-label">Peso total</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value after-val">{formatBf(beforeAfter.projected.bodyFatPct)}</div>
              <div className="ba-metric-label">BF</div>
            </div>
            <div className="ba-metric">
              <div className="ba-metric-value after-val">
                {beforeAfter.projected.leanMassKg !== null
                  ? `${beforeAfter.projected.leanMassKg.toFixed(1)} kg`
                  : 'N/A'}
              </div>
              <div className="ba-metric-label">Massa magra</div>
            </div>
          </div>
        </div>
      </div>

      <div className="speed-stack">
        <div className="speed-card">
          <div className="speed-label">Velocidade de resultado</div>
          <div className="speed-main speed-main-premium">
            ~<span className="highlight">{results.weeklyRateKg.toFixed(2)} kg</span> por semana
          </div>
          <div className={isCut ? 'speed-direction speed-direction-cut' : 'speed-direction speed-direction-bulk'}>
            <span className="speed-direction-arrow">{speedArrow}</span>
            <span>{isCut ? 'Cutting' : 'Bulk'}</span>
          </div>
          <div className="speed-sub speed-sub-premium">
            Déficit/superávit diário: <strong className="speed-strong">{results.dailyDelta.toFixed(0)} kcal</strong>
          </div>
        </div>

        <div className="speed-card speed-card-cyan">
          <div className="speed-label speed-label-cyan">Evolução projetada</div>
          <div className="speed-main">
            {results.projection
              ? `Meta em ~${results.projection.milestones.at(-1)?.week ?? 'N/A'} semanas`
              : 'Sem projeção por prazo'}
          </div>
          <div className="speed-sub">
            {results.projection?.classification
              ? `Classificação: ${results.projection.classification}`
              : 'Preencha meta e prazo para habilitar classificação'}
          </div>
        </div>
      </div>
    </div>
  );
};
