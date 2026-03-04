import { useDietForgeStore } from '../../../../store/useDietForgeStore';

const getAdaptationFactor = (week: number): number => Math.max(0.85, 1 - 0.005 * Math.floor(week / 4));

export const RefeedSection = () => {
  const results = useDietForgeStore((state) => state.results);

  const projection = results?.projection;
  if (!results || !projection) {
    return null;
  }

  if (projection.refeedWeeks.length === 0) {
    return (
      <>
        <div className="dash-section-header">
          <div className="dash-section-title">Estratégia de Refeed</div>
          <span className="refeed-badge">Não aplicável</span>
        </div>
        <div className="whatif-card refeed-card-wrapper">
          <div className="refeed-info-box">
            <p className="refeed-info-text">Semanas de refeed não são necessárias para o objetivo atual.</p>
          </div>
        </div>
      </>
    );
  }

  const rows = projection.refeedWeeks.map((week) => {
    const adaptationFactor = getAdaptationFactor(week);
    const maintenance = Math.round(results.tdeeFinal * adaptationFactor);
    const carbHigh = Math.round(results.macros.carbsG * 1.3);

    return {
      title: `Semana ${week} · Refeed`,
      value: `${maintenance.toLocaleString('pt-BR')} kcal`,
      subtitle: `Fator de adaptação ${adaptationFactor.toFixed(3)}`,
      macros: `CHO ${carbHigh}g · GORD ${results.macros.fatG}g · PROT ${results.macros.proteinG}g`,
    };
  });

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Estratégia de Refeed</div>
        <span className="refeed-badge">Semanas {projection.refeedWeeks.join(', ')}</span>
      </div>

      <div className="whatif-card refeed-card-wrapper">
        <div className="refeed-grid">
          {rows.map((week) => (
            <div key={week.title} className="refeed-item">
              <div className="refeed-item-title">{week.title}</div>
              <div className="refeed-item-value">{week.value}</div>
              <div className="refeed-item-subtitle">{week.subtitle}</div>
              <div className="refeed-item-macros">{week.macros}</div>
            </div>
          ))}
        </div>
        <div className="refeed-info-box">
          <p className="refeed-info-text">
            <span className="refeed-lamp" aria-hidden>
              *
            </span>
            Refeed usa manutenção temporária para aliviar adaptação metabólica e manter aderência do protocolo.
          </p>
        </div>
      </div>
    </>
  );
};
