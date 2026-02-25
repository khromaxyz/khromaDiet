import { dashboardMock } from '../../../../lib/constants/mockDashboard';

const priorityToClass: Record<string, string> = {
  Alta: 'priority-high',
  Média: 'priority-medium',
  Baixa: 'priority-low',
};

export const SupplementsSection = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Suplementação Recomendada</div>
        <span className="dash-section-action">Baseado em evidências</span>
      </div>

      <div className="supps-grid">
        {dashboardMock.supplements.map((supp) => (
          <div key={supp.id} className={supp.glow ? `supp-card glow-${supp.glow}` : 'supp-card'}>
            <div className="supp-priority">
              <span className={`priority-badge ${priorityToClass[supp.priority] ?? 'priority-low'}`}>
                {supp.priority}
              </span>
            </div>
            <span className="supp-icon">{supp.icon}</span>
            <div className="supp-name">{supp.name}</div>
            <div className="supp-dose">{supp.dose}</div>
            <div className="supp-timing">{supp.timing}</div>
          </div>
        ))}
      </div>
    </>
  );
};

