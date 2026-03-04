import { useEffect, useRef, useState } from 'react';

import { useCountUp } from '../../../../../hooks/useCountUp';
import { GOAL_LABELS } from '../../../../../lib/constants/labels';
import type { CalculationResults, FormData } from '../../../../../lib/types';

const formatKcal = (value: number): string => value.toLocaleString('pt-BR');

const CIRCUMFERENCE = 2 * Math.PI * 110; // r=110, C≈691.15

interface GoalSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
}

const getClassificationLabel = (classification: string | undefined): string => {
  switch (classification) {
    case 'realista':
      return 'Realista';
    case 'agressivo':
      return 'Agressivo';
    case 'inviavel':
      return 'Inviável';
    default:
      return 'Realista';
  }
};

const getClassificationIndex = (classification: string | undefined): number => {
  switch (classification) {
    case 'inviavel':
      return 0;
    case 'agressivo':
      return 1;
    default:
      return 3; // realista
  }
};

export const GoalSlide = ({ activated, results, formData }: GoalSlideProps) => {
  const tdee = useCountUp(results.tdeeFinal, activated, 900);
  const goal = useCountUp(results.goalCalories, activated, 900);
  const deficit = useCountUp(Math.abs(results.dailyDelta), activated, 900);

  const isDeficit = results.dailyDelta >= 0;
  const deficitPct = results.tdeeFinal > 0 ? Math.abs(results.goalDeltaPct) : 15;
  const metaPct = results.tdeeFinal > 0
    ? Math.max(0, Math.min(100, (results.goalCalories * 100) / results.tdeeFinal))
    : 85;

  const weeklyDeficit = Math.abs(results.dailyDelta) * 7;
  const fatEquivalentKg = (weeklyDeficit / 7700).toFixed(2);

  const totalWeeks = results.projection?.milestones?.at(-1)?.week ?? formData.targetWeeks ?? 16;
  const classification = results.projection?.classification ?? 'realista';
  const classificationLabel = getClassificationLabel(classification);
  const classificationIdx = getClassificationIndex(classification);

  // Radial chart animation
  const [chartAnimated, setChartAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activated) return;
    const timer = setTimeout(() => setChartAnimated(true), 600);
    return () => clearTimeout(timer);
  }, [activated]);

  // Progress bars animation
  const [barsAnimated, setBarsAnimated] = useState(false);
  useEffect(() => {
    if (!activated) return;
    const timer = setTimeout(() => setBarsAnimated(true), 1200);
    return () => clearTimeout(timer);
  }, [activated]);

  // Radial chart values
  const progressDash = chartAnimated ? (metaPct / 100) * CIRCUMFERENCE : 0;
  const deficitDash = chartAnimated ? (deficitPct / 100) * CIRCUMFERENCE : 0;

  // Bar widths based on rate
  const ritmoBarWidth = Math.min(100, (results.weeklyRateKg / 1.0) * 100);
  const prazoBarWidth = Math.min(100, Math.max(10, (Number(totalWeeks) / 24) * 100));

  const strategyName = isDeficit ? 'Mini Cut' : 'Lean Bulk';

  return (
    <div className="deficit-section" id="dfp-heading-goal">
      {/* Decorative Grid */}
      <div className="deficit-section__bg-grid" aria-hidden="true" />

      {/* Section Header */}
      <header className="deficit-section__header">
        <div className="deficit-section__eyebrow">
          <span>Protocolo Calórico</span>
        </div>
        <h2 className="deficit-section__title">Meta &amp; Déficit</h2>
        <p className="deficit-section__subtitle">
          Seu gasto energético traduzido em estratégia. O déficit calculado que transforma
          dados metabólicos em resultado previsível.
        </p>
      </header>

      {/* Deficit Type Strip */}
      <div className="deficit-type-strip" role="status" aria-label="Tipo de déficit aplicado">
        <div className="deficit-type-strip__dot" aria-hidden="true" />
        <span className="deficit-type-strip__text">
          Estratégia: <strong>{strategyName}</strong>
        </span>
        <div className="deficit-type-strip__separator" aria-hidden="true" />
        <span className="deficit-type-strip__text">
          Déficit de <strong>{results.goalDeltaPct >= 0 ? '-' : '+'}{Math.abs(results.goalDeltaPct).toFixed(0)}%</strong> vs TDEE
        </span>
        <div className="deficit-type-strip__separator" aria-hidden="true" />
        <span className="deficit-type-strip__text">
          Protocolo <strong>Ativo</strong>
        </span>
      </div>

      {/* Pipeline: TDEE → Déficit → Meta */}
      <div className="deficit-pipeline" role="region" aria-label="Pipeline de cálculo calórico">
        {/* Node 1: TDEE */}
        <div className="pipeline-node pipeline-node--tdee">
          <div className="pipeline-node__header">
            <div className="pipeline-node__icon pipeline-node__icon--tdee">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div>
              <div className="pipeline-node__label">TDEE Referência</div>
              <div className="pipeline-node__sublabel">Gasto energético total</div>
            </div>
          </div>
          <div className="pipeline-node__value-block">
            <div className="pipeline-node__value">
              <span>{formatKcal(tdee)}</span>
              <span className="pipeline-node__unit">kcal/dia</span>
            </div>
            <div className="pipeline-node__descriptor">
              Energia que seu corpo consome em 24h considerando todos os componentes metabólicos
            </div>
          </div>
          <div className="pipeline-node__tag pipeline-node__tag--info">
            <span className="pipeline-node__tag-dot" />
            Calculado via Harris-Benedict + FA
          </div>
        </div>

        {/* Connector 1: Subtraction */}
        <div className="pipeline-connector" aria-hidden="true">
          <div className="pipeline-connector__line">
            <div className="pipeline-connector__arrow pipeline-connector__arrow--subtract">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <div className="pipeline-connector__label">{Math.abs(results.goalDeltaPct).toFixed(0)}% off</div>
        </div>

        {/* Node 2: Déficit */}
        <div className="pipeline-node pipeline-node--deficit">
          <div className="pipeline-node__header">
            <div className="pipeline-node__icon pipeline-node__icon--deficit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div>
              <div className="pipeline-node__label">Déficit Aplicado</div>
              <div className="pipeline-node__sublabel">Calorias removidas/dia</div>
            </div>
          </div>
          <div className="pipeline-node__value-block">
            <div className="pipeline-node__value pipeline-node__value--deficit">
              <span>-{formatKcal(deficit)}</span>
              <span className="pipeline-node__unit">kcal/dia</span>
            </div>
            <div className="pipeline-node__descriptor">
              Redução estratégica de {Math.abs(results.goalDeltaPct).toFixed(0)}% sobre o TDEE — zona de corte moderada e sustentável
            </div>
          </div>
          <div className="pipeline-node__tag pipeline-node__tag--accent">
            <span className="pipeline-node__tag-dot" />
            {strategyName} — {GOAL_LABELS[formData.goal] ?? 'Moderado'}
          </div>
        </div>

        {/* Connector 2: Result */}
        <div className="pipeline-connector" aria-hidden="true">
          <div className="pipeline-connector__line">
            <div className="pipeline-connector__arrow pipeline-connector__arrow--result">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
          <div className="pipeline-connector__label">Resultado</div>
        </div>

        {/* Node 3: Meta */}
        <div className="pipeline-node pipeline-node--meta">
          <div className="pipeline-node__header">
            <div className="pipeline-node__icon pipeline-node__icon--meta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <div className="pipeline-node__label">Meta Calórica</div>
              <div className="pipeline-node__sublabel">Ingestão diária alvo</div>
            </div>
          </div>
          <div className="pipeline-node__value-block">
            <div className="pipeline-node__value pipeline-node__value--meta">
              <span>{formatKcal(goal)}</span>
              <span className="pipeline-node__unit">kcal/dia</span>
            </div>
            <div className="pipeline-node__descriptor">
              Quantidade exata que você deve consumir diariamente para atingir seu objetivo de forma e performance
            </div>
          </div>
          <div className="pipeline-node__tag pipeline-node__tag--success">
            <span className="pipeline-node__tag-dot" />
            Meta definida e ativa
          </div>
        </div>
      </div>

      {/* Radial Chart Visualization */}
      <div className="deficit-visual" role="img" aria-label={`Visualização proporcional: ${metaPct.toFixed(0)}% do TDEE é consumido, ${deficitPct.toFixed(0)}% é o déficit`}>
        <div className="deficit-visual__container">
          <div className="deficit-visual__inner">

            {/* Left: Legend */}
            <div className="deficit-visual__legend">
              <div className="deficit-legend-item">
                <div className="deficit-legend-item__marker deficit-legend-item__marker--meta">
                  {metaPct.toFixed(0)}%
                </div>
                <div className="deficit-legend-item__info">
                  <div className="deficit-legend-item__label">Meta Calórica</div>
                  <div className="deficit-legend-item__value">
                    {formatKcal(results.goalCalories)} <span>kcal</span>
                  </div>
                  <div className="deficit-legend-item__percent">
                    {metaPct.toFixed(0)}% do TDEE → Ingestão alvo
                  </div>
                </div>
              </div>
              <div className="deficit-legend-item">
                <div className="deficit-legend-item__marker deficit-legend-item__marker--deficit">
                  {deficitPct.toFixed(0)}%
                </div>
                <div className="deficit-legend-item__info">
                  <div className="deficit-legend-item__label">Zona de Déficit</div>
                  <div className="deficit-legend-item__value">
                    {formatKcal(Math.abs(results.dailyDelta))} <span>kcal</span>
                  </div>
                  <div className="deficit-legend-item__percent">
                    {deficitPct.toFixed(0)}% do TDEE → Calorias cortadas
                  </div>
                </div>
              </div>
              <div className="deficit-legend-item">
                <div className="deficit-legend-item__marker deficit-legend-item__marker--tdee">∑</div>
                <div className="deficit-legend-item__info">
                  <div className="deficit-legend-item__label">TDEE Total (100%)</div>
                  <div className="deficit-legend-item__value">
                    {formatKcal(results.tdeeFinal)} <span>kcal</span>
                  </div>
                  <div className="deficit-legend-item__percent">Gasto energético referência</div>
                </div>
              </div>
            </div>

            {/* Center: Radial Chart */}
            <div className="deficit-visual__chart" ref={chartRef}>
              <div className="radial-chart">
                <svg className="radial-chart__svg" viewBox="0 0 260 260">
                  <defs>
                    <linearGradient id="deficitRadialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e63946" />
                      <stop offset="50%" stopColor="#ff4d5a" />
                      <stop offset="100%" stopColor="#ff6b76" />
                    </linearGradient>
                  </defs>
                  <circle className="radial-chart__track" cx="130" cy="130" r="110" />
                  <circle
                    className="radial-chart__deficit-zone"
                    cx="130" cy="130" r="110"
                    strokeDasharray={`${deficitDash.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
                    strokeDashoffset="0"
                  />
                  <circle
                    className="radial-chart__progress"
                    cx="130" cy="130" r="110"
                    strokeDasharray={`${progressDash.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
                  />
                </svg>

                {/* Center Content */}
                <div className="radial-chart__center">
                  <div className="radial-chart__center-label">Sua Meta</div>
                  <div className="radial-chart__center-value">{formatKcal(goal)}</div>
                  <div className="radial-chart__center-unit">kcal / dia</div>
                  <div className="radial-chart__center-sub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    -{formatKcal(Math.abs(results.dailyDelta))} kcal do TDEE
                  </div>
                </div>

                {/* Badge */}
                <div
                  className={`radial-chart__badge${chartAnimated ? ' animate' : ''}`}
                  aria-label={`${metaPct.toFixed(0)}% do TDEE`}
                >
                  {metaPct.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Right: Equation */}
            <div className="deficit-visual__equation">
              <div className="equation-row">
                <div className="equation-row__operator equation-row__operator--base">∑</div>
                <div className="equation-row__content">
                  <div className="equation-row__name">TDEE Referência</div>
                  <div className="equation-row__number equation-row__number--base">
                    {formatKcal(results.tdeeFinal)} kcal
                  </div>
                </div>
              </div>

              <div className="equation-row">
                <div className="equation-row__operator equation-row__operator--minus">−</div>
                <div className="equation-row__content">
                  <div className="equation-row__name">
                    Déficit {Math.abs(results.goalDeltaPct).toFixed(0)}% ({strategyName})
                  </div>
                  <div className="equation-row__number equation-row__number--minus">
                    {formatKcal(Math.abs(results.dailyDelta))} kcal
                  </div>
                </div>
              </div>

              <div className="equation-divider" />

              <div className="equation-row">
                <div className="equation-row__operator equation-row__operator--equals">=</div>
                <div className="equation-row__content">
                  <div className="equation-row__name">Meta Calórica Diária</div>
                  <div className="equation-row__number equation-row__number--result">
                    {formatKcal(results.goalCalories)} kcal
                  </div>
                </div>
              </div>

              {/* Weekly deficit box */}
              <div className="deficit-weekly-box">
                <div className="deficit-weekly-box__header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span className="deficit-weekly-box__label">Déficit Semanal</span>
                </div>
                <div className="deficit-weekly-box__value">
                  -{formatKcal(Math.round(weeklyDeficit))} <span>kcal/semana</span>
                </div>
                <div className="deficit-weekly-box__sub">
                  ≈ {fatEquivalentKg} kg de gordura equivalente
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div className="deficit-results" role="region" aria-label="Resultados projetados do déficit calórico">

        {/* Ritmo Estimado */}
        <div className="result-card result-card--ritmo">
          <div className="result-card__icon result-card__icon--ritmo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="result-card__label">Ritmo Estimado de Perda</div>
          <div className="result-card__value result-card__value--ritmo">
            ~{results.weeklyRateKg.toFixed(2)} <span className="result-card__value-unit">kg/sem</span>
          </div>
          <div className="result-card__desc">
            Ritmo de perda consistente e sustentável, otimizado para preservação de massa muscular e aderência ao protocolo.
          </div>
          <div className="result-card__bar">
            <div
              className="result-card__bar-fill result-card__bar-fill--ritmo"
              style={{ width: barsAnimated ? `${ritmoBarWidth.toFixed(0)}%` : '0%' }}
            />
          </div>
          <div className="result-card__bar-label">
            <span>0 kg/sem</span>
            <span>Agressivo →</span>
            <span>1.0 kg/sem</span>
          </div>
        </div>

        {/* Prazo Projetado */}
        <div className="result-card result-card--prazo">
          <div className="result-card__icon result-card__icon--prazo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
            </svg>
          </div>
          <div className="result-card__label">Prazo Projetado</div>
          <div className="result-card__value result-card__value--prazo">
            {totalWeeks} <span className="result-card__value-unit">semanas</span>
          </div>
          <div className="result-card__desc">
            Aproximadamente {Math.ceil(Number(totalWeeks) / 4)} meses para atingir o objetivo proposto, com margem para ajustes adaptativos.
          </div>
          <div className="result-card__bar">
            <div
              className="result-card__bar-fill result-card__bar-fill--prazo"
              style={{ width: barsAnimated ? `${prazoBarWidth.toFixed(0)}%` : '0%' }}
            />
          </div>
          <div className="result-card__bar-label">
            <span>4 sem</span>
            <span>Moderado</span>
            <span>24 sem</span>
          </div>
        </div>

        {/* Classificação */}
        <div className="result-card result-card--class">
          <div className="result-card__icon result-card__icon--class">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="result-card__label">Classificação do Plano</div>

          <div className="classification-badge">
            <svg className="classification-badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="classification-badge__text">{classificationLabel}</span>
          </div>

          <div className="result-card__value result-card__value--class">
            {classificationLabel}
          </div>
          <div className="result-card__desc">
            Déficit de {Math.abs(results.goalDeltaPct).toFixed(0)}% está na zona ideal para resultados
            sustentáveis. Alta probabilidade de aderência e manutenção de performance.
          </div>

          {/* Classification Scale */}
          <div className="classification-scale">
            {[0, 1, 2, 3, 4].map((i) => {
              let segmentClass = 'classification-scale__segment';
              if (i === classificationIdx) segmentClass += ' classification-scale__segment--active';
              else if (i < 2) segmentClass += ' classification-scale__segment--danger';
              else if (i === 2) segmentClass += ' classification-scale__segment--warning';

              return (
                <div key={i} className={segmentClass} style={i === classificationIdx ? { position: 'relative' } : undefined}>
                  {i === classificationIdx && (
                    <div className={`classification-scale__pointer${chartAnimated ? ' animate' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M12 18l-6-6h12l-6 6z" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="classification-scale__labels">
            <span>Extremo</span>
            <span>Agressivo</span>
            <span>Moderado</span>
            <span>Realista</span>
            <span>Conservador</span>
          </div>
        </div>
      </div>

    </div>
  );
};
