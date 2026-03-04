import { Target } from 'lucide-react';
import { useMemo } from 'react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';
import { ProjectionChart } from '../../../charts/ProjectionChart';

const classificationLabel: Record<'realista' | 'agressivo' | 'inviavel', string> = {
  realista: 'Classificação: realista',
  agressivo: 'Classificação: agressivo',
  inviavel: 'Classificação: inviável',
};

interface ProjectionSectionProps {
  onGoToGoalStep: () => void;
  theme?: 'dark' | 'light';
}

const fallbackBf = (values: number[], fallback: number): number[] => {
  let last = Number.isFinite(fallback) ? fallback : 18;
  return values.map((value) => {
    if (Number.isFinite(value)) {
      last = value;
    }
    return last;
  });
};

export const ProjectionSection = ({ onGoToGoalStep, theme = 'dark' }: ProjectionSectionProps) => {
  const results = useDietForgeStore((state) => state.results);

  const projection = results?.projection;
  const chartData = useMemo(() => {
    if (!results || !projection) {
      return null;
    }

    const labels = projection.milestones.map((milestone) => `Sem ${milestone.week}`);
    const weight = projection.milestones.map((milestone) => (Number.isFinite(milestone.weightKg) ? milestone.weightKg : 0));
    const bodyFatRaw = projection.milestones.map((milestone) => milestone.bodyFatPct ?? Number.NaN);

    const bodyFat = fallbackBf(bodyFatRaw, results.bodyFatInfo.value ?? 18);

    const refeedWeeks = projection.milestones
      .map((milestone, index) => ({ week: milestone.week, index }))
      .filter((item) => projection.refeedWeeks.includes(item.week))
      .map((item) => item.index);

    if (labels.length === 0 || weight.length === 0 || bodyFat.length === 0) {
      return null;
    }

    return {
      labels,
      weight,
      bodyFat,
      refeedWeeks,
      bodyFatEstimated: results.bodyFatInfo.estimated,
    };
  }, [projection, results]);

  if (!results) {
    return null;
  }

  if (!projection || !chartData) {
    return (
      <>
        <div className="dash-section-header">
          <div className="dash-section-title">Projeção de Progresso</div>
          <span className="dash-section-action">Sem projeção</span>
        </div>

        <div className="target-info-card projection-empty-card">
          <div className="target-info-row">
            <span className="target-info-icon"><Target size={14} strokeWidth={1.5} /></span>
            <p className="target-info-text">
              Preencha sua meta em Meta e prazo para ver o prazo estimado e o gráfico de evolução.
            </p>
          </div>
          <div className="projection-empty-actions">
            <button type="button" className="btn-dash-cta" onClick={onGoToGoalStep}>
              Ir para Meta e prazo
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Projeção de Progresso</div>
        <span className="dash-section-action">{classificationLabel[projection.classification]}</span>
      </div>

      <div className="target-info-card">
        <div className="target-info-row">
          <span className="target-info-icon">i</span>
          <p className="target-info-text">
            Déficit necessário: {projection.requiredDailyDelta.toFixed(0)} kcal/dia · Déficit atual:{' '}
            {projection.actualDailyDelta.toFixed(0)} kcal/dia
            {projection.weeksMin ? ` · Prazo mínimo seguro: ${projection.weeksMin} semanas` : ''}
          </p>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Composição Corporal · Projeção Semanal</div>
            <div className="chart-subtitle">
              Peso total (kg) e BF% estimado com adaptação metabólica
              {chartData.bodyFatEstimated ? (
                <span className="projection-estimated-pill" title="Estimado por Deurenberg">
                  BF% estimado
                </span>
              ) : null}
            </div>
          </div>
          <div className="chart-legend">
            <div className="chart-legend-item">
              <div className="legend-line legend-line-red" />
              Peso (kg)
            </div>
            <div className="chart-legend-item">
              <div className="legend-line legend-line-violet" />
              BF%
            </div>
            <div className="chart-legend-item">
              <div className="legend-line legend-line-cyan" />
              Refeed
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          <ProjectionChart data={chartData} theme={theme} />
        </div>
      </div>

      {results.uncertainty.showBand ? (
        <div className="target-info-card">
          <div className="target-info-row">
            <span className="target-info-icon">!</span>
            <p className="target-info-text">
              Faixa de incerteza: <span className="target-info-highlight">{results.uncertainty.lower}</span> a{' '}
              <span className="target-info-highlight">{results.uncertainty.upper}</span> kcal. Preencha:{' '}
              {results.uncertainty.missingFields.join(', ') || 'campos opcionais'} para maior precisão.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};
