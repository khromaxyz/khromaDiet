import { refeedWeeks } from '../../../../lib/constants/mockDashboard';

export const RefeedSection = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Estratégia de Refeed</div>
        <span className="refeed-badge">Semanas 4, 8 e 12</span>
      </div>

      <div className="whatif-card refeed-card-wrapper">
        <div className="refeed-grid">
          {refeedWeeks.map((week) => (
            <div key={week.title} className="refeed-item">
              <div className="refeed-item-title">{week.title}</div>
              <div className="refeed-item-value">{week.value}</div>
              <div className="refeed-item-subtitle">{week.subtitle}</div>
            </div>
          ))}
        </div>
        <div className="refeed-info-box">
          <p className="refeed-info-text">
            ?? <strong className="refeed-strong">Por que refeed?</strong> Semanas de refeed (caloria de manutenção)
            restauram leptina, hormônio tireoidiano T3 e testosterona, que caem com restrição calórica prolongada.
            Resultam em melhor retenção muscular e aderência ao protocolo.
          </p>
        </div>
      </div>
    </>
  );
};

