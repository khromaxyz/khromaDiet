import { projectionSeries } from '../../../../lib/constants/mockChart';
import { ProjectionChart } from '../../../charts/ProjectionChart';

export const ProjectionSection = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Projeção de 12 Semanas</div>
        <span className="dash-section-action">Dados baseados na taxa média de perda</span>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Composição Corporal · Projeção Semanal</div>
            <div className="chart-subtitle">
              Peso total (kg) e Gordura Corporal (%) ao longo do protocolo Mini Cut
            </div>
          </div>
          <div className="chart-legend">
            <div className="chart-legend-item">
              <div className="legend-line legend-line-lime" />
              Peso (kg)
            </div>
            <div className="chart-legend-item">
              <div className="legend-line legend-line-violet" />
              % BF
            </div>
            <div className="chart-legend-item">
              <div className="legend-line legend-line-orange" />
              Refeed Week
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          <ProjectionChart data={projectionSeries} />
        </div>
      </div>
    </>
  );
};

