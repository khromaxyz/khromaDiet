import { dashboardMock } from '../../../../lib/constants/mockDashboard';

export const MacroCards = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Macros Diários</div>
        <span className="dash-section-action">Distribuição otimizada</span>
      </div>
      <div className="macro-cards-grid">
        {dashboardMock.macros.map((macro) => (
          <div key={macro.id} className={`macro-card ${macro.id}`}>
            <div className="macro-card-bg" />
            <div className="macro-type-label">
              <span className="macro-type-dot" />
              {macro.label}
            </div>
            <div className="macro-amount">
              {macro.grams} <span className="macro-amount-unit">g</span>
            </div>
            <div className="macro-kcal">{macro.kcalLabel}</div>
            <div className="macro-progress-bar">
              <div className="macro-progress-fill" style={{ width: `${macro.progress}%` }} />
            </div>
            <div className="macro-progress-label">
              <span>{macro.detailLeft}</span>
              <span>{macro.detailRight}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

