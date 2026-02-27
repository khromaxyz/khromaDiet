import { useMemo } from 'react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';
import { Card } from '../../../ui/Card';

const formatValue = (value: number): string => value.toLocaleString('pt-BR');

interface KpiStripProps {
  onGoToGoalStep: () => void;
}

interface KpiCardItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  context: string;
  trend: string;
  glow?: 'red' | 'violet';
  tone?: 'default' | 'red' | 'green';
  areaClass: 'kpi-area-40' | 'kpi-area-30';
}

export const KpiStrip = ({ onGoToGoalStep }: KpiStripProps) => {
  const results = useDietForgeStore((state) => state.results);
  const projection = results?.projection;
  const confidenceText = 'Margem científica: ±250 kcal · Calibre após 2 semanas';

  const finalWeek = projection?.weeksMin ?? projection?.milestones.at(-1)?.week ?? null;

  const kpis = useMemo<KpiCardItem[]>(() => {
    if (!results) {
      return [];
    }

    return [
      {
        id: 'tdee',
        label: 'TDEE',
        value: formatValue(results.tdeeFinal),
        sub: 'kcal / dia',
        context: confidenceText,
        trend: 'BASE',
        glow: 'red',
        tone: 'default',
        areaClass: 'kpi-area-40',
      },
      {
        id: 'goal',
        label: 'Meta Calórica',
        value: formatValue(results.goalCalories),
        sub: 'kcal / dia',
        context: `${results.goalDeltaPct >= 0 ? '+' : ''}${results.goalDeltaPct.toFixed(1)}% do TDEE`,
        trend: 'TARGET',
        glow: 'violet',
        tone: 'red',
        areaClass: 'kpi-area-30',
      },
      {
        id: 'delta',
        label: results.dailyDelta >= 0 ? 'Déficit' : 'Superávit',
        value: `${results.dailyDelta >= 0 ? '-' : '+'}${formatValue(Math.abs(results.dailyDelta))}`,
        sub: 'kcal / dia',
        context: results.dailyDelta >= 0 ? 'moderado' : 'controlado',
        trend: 'DELTA',
        tone: results.dailyDelta >= 0 ? 'red' : 'green',
        areaClass: 'kpi-area-30',
      },
    ];
  }, [confidenceText, results]);

  if (!results) {
    return null;
  }

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Visão Geral</div>
      </div>

      <div className="kpi-strip">
        {kpis.map((item) => {
          const glowClass = item.glow ? `glow-${item.glow}` : undefined;
          const toneClass = item.tone && item.tone !== 'default' ? `kpi-tone-${item.tone}` : undefined;

          return (
            <Card
              key={item.id}
              variant="kpi"
              className={[glowClass, toneClass, item.areaClass, item.id === 'delta' ? 'kpi-card-delta' : '']
                .filter(Boolean)
                .join(' ')}
            >
              <div className="kpi-card-label">{item.label}</div>
              <div className="kpi-card-value">{item.value}</div>
              <div className="kpi-card-sub">{item.sub}</div>
              <div className="kpi-card-context">{item.context}</div>
              <div className="kpi-card-trend">{item.trend}</div>
            </Card>
          );
        })}
      </div>

      {projection ? (
        <Card variant="kpi" className="kpi-card-timeline">
          <div className="kpi-card-label">Prazo estimado</div>
          <div className="kpi-card-value">{finalWeek ?? 'N/A'}</div>
          <div className="kpi-card-sub">semanas</div>
          <div className="kpi-timeline kpi-timeline-static">
            <div className="kpi-timeline-track" />
            <div className="kpi-timeline-stops">
              {[0, 4, 8, 12].map((week) => (
                <div key={week} className="kpi-timeline-stop">
                  <span className="kpi-timeline-stop-dot" />
                  <span className="kpi-timeline-label">Sem {week}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <Card variant="kpi" className="kpi-card-empty kpi-card-timeline-empty">
          <div className="kpi-card-label">Prazo estimado</div>
          <div className="kpi-card-empty-main">Preencha Meta e prazo</div>
          <div className="kpi-card-sub">Defina meta e prazo para habilitar projeção</div>
          <button type="button" className="btn-kpi-cta btn-dash-cta" onClick={onGoToGoalStep}>
            Ir para Meta e prazo
          </button>
        </Card>
      )}
    </>
  );
};

