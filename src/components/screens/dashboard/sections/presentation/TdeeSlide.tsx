import type { CSSProperties, ReactNode } from 'react';

import { useCountUp } from '../../../../../hooks/useCountUp';
import { ACTIVITY_LEVEL_LABELS, CARDIO_MODALITY_LABELS, TRAINING_TYPE_LABELS } from '../../../../../lib/constants/labels';
import type { CalculationResults, FormData } from '../../../../../lib/types';

const formatKcal = (value: number): string => value.toLocaleString('pt-BR');

const BMR_METHOD_LABELS = {
  mifflin: 'Mifflin-St Jeor',
  katch_mcardle: 'Katch-McArdle',
  cunningham: 'Cunningham',
  henry: 'Henry',
} as const;

type TdeeComponentId = 'bmr' | 'neat' | 'eat' | 'cardio' | 'tef';
type TdeePrefix = '' | '+';

interface TdeeComponent {
  id: TdeeComponentId;
  abbr: string;
  name: string;
  method: string;
  value: number;
  prefix: TdeePrefix;
  color: string;
  colorDim: string;
  icon: ReactNode;
}

interface TdeeSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
}

const resolveCardioMethod = (formData: FormData): string => {
  const steps = (formData.stepsPerDay ?? 0).toLocaleString('pt-BR');
  const minutes = formData.cardioMinutesPerDay ?? 0;
  const modality = CARDIO_MODALITY_LABELS[formData.cardioModality];

  if (formData.cardioMode === 'steps') {
    return `${steps} passos/dia`;
  }

  if (formData.cardioMode === 'structured') {
    return `${minutes} min · ${modality}`;
  }

  return `${steps} passos + ${minutes} min · ${modality}`;
};

const getComponentIcon = (id: TdeeComponentId): ReactNode => {
  if (id === 'bmr') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 0 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
      </svg>
    );
  }

  if (id === 'neat') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }

  if (id === 'eat') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14.4 14.4L9.6 9.6" />
        <path d="M18.657 21.485a2 2 0 0 1-2.829 0l-1.414-1.414a2 2 0 0 1 0-2.828l3.535-3.536a2 2 0 0 1 2.829 0l1.414 1.414a2 2 0 0 1 0 2.829l-3.535 3.535z" />
        <path d="M5.343 2.515a2 2 0 0 1 2.829 0l1.414 1.414a2 2 0 0 1 0 2.828L6.05 10.293a2 2 0 0 1-2.829 0L1.808 8.88a2 2 0 0 1 0-2.829l3.535-3.535z" />
      </svg>
    );
  }

  if (id === 'cardio') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3h6" />
      <path d="M10 3v5.172a2 2 0 0 1-.586 1.414l-2.828 2.828A2 2 0 0 0 6 13.828V18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4.172a2 2 0 0 0-.586-1.414l-2.828-2.828A2 2 0 0 1 14 8.172V3" />
    </svg>
  );
};

const formatSigned = (prefix: TdeePrefix, value: number): string => `${prefix}${formatKcal(value)}`;

export const TdeeSlide = ({ activated, results, formData }: TdeeSlideProps) => {
  const tdeeFinal = Math.round(results.tdeeFinal);
  const tdeeAnimated = useCountUp(tdeeFinal, activated, 2200);

  const bmr = Math.round(results.breakdown.bmr);
  const neat = Math.round(results.breakdown.activityBase + results.breakdown.occupationNEAT);
  const eat = Math.round(results.breakdown.eatTraining);
  const cardio = Math.round(results.breakdown.eatCardioStructured + results.breakdown.eatCardioStepsResidual);
  const tef = Math.round(results.breakdown.tef);

  const components: TdeeComponent[] = [
    {
      id: 'bmr',
      abbr: 'BMR',
      name: 'Taxa Metabólica Basal',
      method: `BMR — ${BMR_METHOD_LABELS[results.bmr.method]}`,
      value: bmr,
      prefix: '',
      color: 'var(--tdee-color-bmr)',
      colorDim: 'var(--tdee-color-bmr-dim)',
      icon: getComponentIcon('bmr'),
    },
    {
      id: 'neat',
      abbr: 'NEAT',
      name: 'Atividade Não-Exercício',
      method: `NEAT — ${ACTIVITY_LEVEL_LABELS[formData.activityLevel]}`,
      value: neat,
      prefix: '+',
      color: 'var(--tdee-color-neat)',
      colorDim: 'var(--tdee-color-neat-dim)',
      icon: getComponentIcon('neat'),
    },
    {
      id: 'eat',
      abbr: 'EAT',
      name: 'Atividade de Treino',
      method: `EAT — ${formData.trainingSessions}x/sem · ${formData.trainingDurationMin}min · ${TRAINING_TYPE_LABELS[formData.trainingType]}`,
      value: eat,
      prefix: '+',
      color: 'var(--tdee-color-eat)',
      colorDim: 'var(--tdee-color-eat-dim)',
      icon: getComponentIcon('eat'),
    },
    {
      id: 'cardio',
      abbr: 'CARDIO',
      name: 'Cardio / Passos',
      method: `EAT — ${resolveCardioMethod(formData)}`,
      value: cardio,
      prefix: '+',
      color: 'var(--tdee-color-cardio)',
      colorDim: 'var(--tdee-color-cardio-dim)',
      icon: getComponentIcon('cardio'),
    },
    {
      id: 'tef',
      abbr: 'TEF',
      name: 'Efeito Térmico dos Alimentos',
      method: 'TEF — proteína/carb/gordura',
      value: tef,
      prefix: '+',
      color: 'var(--tdee-color-tef)',
      colorDim: 'var(--tdee-color-tef-dim)',
      icon: getComponentIcon('tef'),
    },
  ];

  const componentsSum = components.reduce((sum, component) => sum + component.value, 0);
  const maxComponentValue = Math.max(...components.map((component) => component.value), 1);
  const waterfallMax = Math.max(tdeeFinal, ...components.map((component) => component.value), 1);

  return (
    <section className={`tdee-section ${activated ? 'is-visible' : ''}`} id="dfp-heading-tdee">
      <div className="tdee-bg-line" aria-hidden />
      <div className="tdee-bg-grid" aria-hidden />
      <div className="tdee-bg-glow" aria-hidden />
      <div className="tdee-bg-noise" aria-hidden />

      <div className="tdee-container">
        <header className="tdee-header">
          <div className="tdee-eyebrow">
            <span className="tdee-eyebrow-dot" aria-hidden />
            Gasto Energético Total
          </div>

          <p className="tdee-title">De onde vêm suas</p>

          <div className="tdee-number-row">
            <span className="tdee-big-number">{formatKcal(tdeeAnimated)}</span>
            <span className="tdee-unit">
              kcal<span>/dia</span>
            </span>
          </div>

          <p className="tdee-subtitle">
            Decomposição completa do Total Daily Energy Expenditure — cada componente que constrói seu gasto
            calórico diário
          </p>
        </header>

        <div className="composition-section" aria-label="Composição proporcional do gasto energético diário">
          <div className="composition-bar" role="img" aria-label="Barra empilhada da composição do TDEE">
            {components.map((component, index) => {
              const percent = componentsSum > 0 ? (component.value / componentsSum) * 100 : 0;

              return (
                <div
                  key={component.id}
                  className="comp-segment"
                  style={{
                    flex: component.value,
                    backgroundColor: component.color,
                    animationDelay: `${0.9 + index * 0.12}s`,
                  }}
                  title={`${component.name}: ${formatKcal(component.value)} kcal (${percent.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          <div className="composition-legend" aria-label="Percentuais da composição do TDEE">
            {components.map((component, index) => {
              const percent = componentsSum > 0 ? (component.value / componentsSum) * 100 : 0;
              return (
                <div
                  key={component.id}
                  className="comp-legend-item"
                  style={{
                    color: component.color,
                    flex: component.value,
                    animationDelay: `${1.6 + index * 0.08}s`,
                  }}
                >
                  {percent.toFixed(1)}%
                </div>
              );
            })}
          </div>

          <div className="composition-components-legend" aria-label="Legenda de componentes da composição do TDEE">
            {components.map((component, index) => {
              const percent = componentsSum > 0 ? (component.value / componentsSum) * 100 : 0;
              return (
                <div
                  key={`legend-${component.id}`}
                  className="composition-component-item"
                  style={
                    {
                      '--component-color': component.color,
                      animationDelay: `${1.72 + index * 0.08}s`,
                    } as CSSProperties
                  }
                >
                  <span className="composition-component-dot" aria-hidden />
                  <span className="composition-component-name">{component.abbr}</span>
                  <span className="composition-component-pct">{percent.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="components-list" aria-label="Detalhamento dos componentes do TDEE">
          {components.map((component, index) => {
            const componentPercent = componentsSum > 0 ? (component.value / componentsSum) * 100 : 0;
            const barPercent = (component.value / maxComponentValue) * 100;

            return (
              <article
                key={component.id}
                className="component-card"
                style={
                  {
                    '--card-color': component.color,
                    '--card-color-dim': component.colorDim,
                    animationDelay: `${1.1 + index * 0.1}s`,
                  } as CSSProperties
                }
              >
                <div className="card-top">
                  <div className="card-icon-wrap">{component.icon}</div>

                  <div className="card-text">
                    <div className="card-name">{component.name}</div>
                    <span className="card-method">{component.method}</span>
                  </div>

                  <div className="card-value-block">
                    <span className="card-kcal">{formatSigned(component.prefix, component.value)}</span>
                    <span className="card-kcal-label">kcal</span>
                  </div>
                </div>

                <div className="card-bar-row">
                  <div className="card-bar-track">
                    <div
                      className="card-bar-fill"
                      style={
                        {
                          width: `${barPercent}%`,
                          backgroundColor: component.color,
                          animationDelay: `${1.4 + index * 0.12}s`,
                        } as CSSProperties
                      }
                    />
                  </div>
                  <span className="card-pct" style={{ color: component.color }}>
                    {componentPercent.toFixed(1)}%
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <section className="waterfall-section" aria-label="Decomposição empilhada do TDEE em gráfico waterfall">
          <div className="waterfall-header">
            <span className="waterfall-title">Decomposição empilhada — Waterfall</span>
            <span className="waterfall-hint">em kcal/dia</span>
          </div>

          <div className="waterfall-chart">
            {components.map((component, index) => {
              const heightPct = (component.value / waterfallMax) * 100;

              return (
                <div key={component.id} className="waterfall-step">
                  <div className="wf-col">
                    <div className="wf-bar-wrap">
                      <div
                        className="wf-bar"
                        style={
                          {
                            '--wf-color': component.color,
                            '--wf-color-dim': component.colorDim,
                            height: `${heightPct}%`,
                            animationDelay: `${0.7 + index * 0.18}s`,
                          } as CSSProperties
                        }
                      >
                        <span className="wf-val">{formatSigned(component.prefix, component.value)}</span>
                      </div>
                    </div>
                    <span className="wf-label">{component.abbr}</span>
                  </div>

                  {index < components.length - 1 ? <span className="wf-connector">+</span> : null}
                </div>
              );
            })}

            <span className="wf-connector wf-connector-equals">=</span>

            <div className="wf-col total-col">
              <div className="wf-bar-wrap">
                <div
                  className="wf-bar wf-total"
                  style={{
                    height: '100%',
                    animationDelay: `${0.7 + components.length * 0.18 + 0.15}s`,
                  }}
                >
                  <span className="wf-val">{formatKcal(tdeeFinal)}</span>
                </div>
              </div>
              <span className="wf-label wf-total-label">TDEE</span>
            </div>
          </div>
        </section>

        <div className="tdee-total">
          <div className="total-divider" />
          <div className="total-content">
            <div className="total-left">
              <span className="total-label">Resultado total</span>
              <span className="total-desc">Soma de BMR + NEAT + EAT + Cardio + TEF</span>
            </div>
            <div className="total-right">
              <span className="total-value">{formatKcal(tdeeAnimated)}</span>
              <span className="total-unit">kcal/dia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
