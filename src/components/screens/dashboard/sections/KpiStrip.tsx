import { Card } from '../../../ui/Card';
import { dashboardMock } from '../../../../lib/constants/mockDashboard';

export const KpiStrip = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Visão Geral</div>
      </div>
      <div className="kpi-strip">
        {dashboardMock.kpis.map((item) => {
          const glowClass = item.glow ? `glow-${item.glow}` : undefined;
          const toneClass = item.tone && item.tone !== 'default' ? `kpi-tone-${item.tone}` : undefined;
          return (
            <Card key={item.id} variant="kpi" className={[glowClass, toneClass].filter(Boolean).join(' ')}>
              <div className="kpi-card-label">{item.label}</div>
              <div className="kpi-card-value">{item.value}</div>
              <div className="kpi-card-sub">{item.sub}</div>
              <div className="kpi-card-trend">{item.trend}</div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

