import { useEffect, useState, type ReactNode } from 'react';

/* =============================================
   Data & Types
   ============================================= */

const TDEE_TOTAL = 3985;

interface TDEEComponent {
  id: string;
  name: string;
  method: string;
  value: number;
  displayValue: string;
  prefix: string;
  color: string;
  colorDim: string;
  flexValue: number;
  barWidthPct: number;
  percentOfTotal: number;
  icon: ReactNode;
}

const MAX_VALUE = 2930;
const SUM_ALL = 1858 + 2930 + 286 + 370 + 320;

const components: TDEEComponent[] = [
  {
    id: 'bmr',
    name: 'Taxa Metabólica Basal',
    method: 'BMR — Cunningham',
    value: 1858,
    displayValue: '1.858',
    prefix: '',
    color: 'var(--color-bmr)',
    colorDim: 'rgba(255, 69, 58, 0.12)',
    flexValue: 1858,
    barWidthPct: (1858 / MAX_VALUE) * 100,
    percentOfTotal: Math.round((1858 / SUM_ALL) * 1000) / 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 0 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
      </svg>
    ),
  },
  {
    id: 'neat',
    name: 'Atividade Não-Exercício',
    method: 'NEAT — Moderadamente ativo',
    value: 2930,
    displayValue: '2.930',
    prefix: '+',
    color: 'var(--color-neat)',
    colorDim: 'rgba(255, 159, 10, 0.12)',
    flexValue: 2930,
    barWidthPct: (2930 / MAX_VALUE) * 100,
    percentOfTotal: Math.round((2930 / SUM_ALL) * 1000) / 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 'eat',
    name: 'Atividade de Treino',
    method: 'EAT — 4x/sem, 65min, Força/Hipertrofia',
    value: 286,
    displayValue: '286',
    prefix: '+',
    color: 'var(--color-eat)',
    colorDim: 'rgba(50, 215, 75, 0.12)',
    flexValue: 286,
    barWidthPct: (286 / MAX_VALUE) * 100,
    percentOfTotal: Math.round((286 / SUM_ALL) * 1000) / 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.4 14.4L9.6 9.6" />
        <path d="M18.657 21.485a2 2 0 0 1-2.829 0l-1.414-1.414a2 2 0 0 1 0-2.828l3.535-3.536a2 2 0 0 1 2.829 0l1.414 1.414a2 2 0 0 1 0 2.829l-3.535 3.535z" />
        <path d="M5.343 2.515a2 2 0 0 1 2.829 0l1.414 1.414a2 2 0 0 1 0 2.828L6.05 10.293a2 2 0 0 1-2.829 0L1.808 8.88a2 2 0 0 1 0-2.829l3.535-3.535z" />
      </svg>
    ),
  },
  {
    id: 'cardio',
    name: 'Cardio/Passos',
    method: 'EAT — 20 min, Esteira',
    value: 370,
    displayValue: '370',
    prefix: '+',
    color: 'var(--color-cardio)',
    colorDim: 'rgba(100, 210, 255, 0.12)',
    flexValue: 370,
    barWidthPct: (370 / MAX_VALUE) * 100,
    percentOfTotal: Math.round((370 / SUM_ALL) * 1000) / 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'tef',
    name: 'Efeito Térmico dos Alimentos',
    method: 'TEF — proteína/carb/gordura',
    value: 320,
    displayValue: '320',
    prefix: '+',
    color: 'var(--color-tef)',
    colorDim: 'rgba(191, 90, 242, 0.12)',
    flexValue: 320,
    barWidthPct: (320 / MAX_VALUE) * 100,
    percentOfTotal: Math.round((320 / SUM_ALL) * 1000) / 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6" />
        <path d="M10 3v5.172a2 2 0 0 1-.586 1.414l-2.828 2.828A2 2 0 0 0 6 13.828V18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4.172a2 2 0 0 0-.586-1.414l-2.828-2.828A2 2 0 0 1 14 8.172V3" />
      </svg>
    ),
  },
];

/* =============================================
   Hooks
   ============================================= */

function useCountUp(target: number, duration: number, delay: number): number {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return value;
}

function formatBR(n: number): string {
  return n.toLocaleString('pt-BR');
}

/* =============================================
   Main Component
   ============================================= */

export function App() {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(TDEE_TOTAL, 2200, 600);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tdee-page">
      <section className={`tdee-section ${visible ? 'is-visible' : ''}`}>
        {/* === Background Layers === */}
        <div className="tdee-bg-line" />
        <div className="tdee-bg-grid" />
        <div className="tdee-bg-glow" />
        <div className="tdee-bg-noise" />

        <div className="tdee-container">
          {/* === Header === */}
          <header className="tdee-header">
            <div className="tdee-eyebrow">
              <span className="tdee-eyebrow-dot" />
              GASTO ENERGÉTICO TOTAL
            </div>

            <p className="tdee-title">De onde vêm suas</p>

            <div className="tdee-number-row">
              <span className="tdee-big-number">{formatBR(count)}</span>
              <span className="tdee-unit">
                kcal<span>/dia</span>
              </span>
            </div>

            <p className="tdee-subtitle">
              Decomposição completa do Total Daily Energy Expenditure — cada componente que constrói
              seu gasto calórico diário
            </p>
          </header>

          {/* === Stacked Composition Bar === */}
          <div className="composition-section">
            <div className="composition-bar">
              {components.map((comp, i) => (
                <div
                  key={comp.id}
                  className="comp-segment"
                  style={{
                    flex: comp.flexValue,
                    backgroundColor: comp.color,
                    animationDelay: `${0.9 + i * 0.12}s`,
                  }}
                  title={`${comp.name}: ${comp.displayValue} kcal (${comp.percentOfTotal}%)`}
                />
              ))}
            </div>
            <div className="composition-legend">
              {components.map((comp, i) => (
                <div
                  key={comp.id}
                  className="comp-legend-item"
                  style={{
                    flex: comp.flexValue,
                    color: comp.color,
                    animationDelay: `${1.6 + i * 0.08}s`,
                  }}
                >
                  {comp.percentOfTotal}%
                </div>
              ))}
            </div>
          </div>

          {/* === Component Cards === */}
          <div className="components-list">
            {components.map((comp, i) => (
              <div
                key={comp.id}
                className="component-card"
                style={
                  {
                    '--card-color': comp.color,
                    '--card-color-dim': comp.colorDim,
                    animationDelay: `${1.1 + i * 0.1}s`,
                  } as React.CSSProperties
                }
              >
                {/* Top row: icon + text + value */}
                <div className="card-top">
                  <div
                    className="card-icon-wrap"
                    style={{
                      backgroundColor: comp.colorDim,
                      color: comp.color,
                    }}
                  >
                    {comp.icon}
                  </div>

                  <div className="card-text">
                    <div className="card-name">{comp.name}</div>
                    <span className="card-method">{comp.method}</span>
                  </div>

                  <div className="card-value-block">
                    <span className="card-kcal" style={{ color: comp.color }}>
                      {comp.prefix}{comp.displayValue}
                    </span>
                    <span className="card-kcal-label">kcal</span>
                  </div>
                </div>

                {/* Bar row */}
                <div className="card-bar-row">
                  <div className="card-bar-track">
                    <div
                      className="card-bar-fill"
                      style={{
                        width: `${comp.barWidthPct}%`,
                        backgroundColor: comp.color,
                        animationDelay: `${1.4 + i * 0.12}s`,
                      }}
                    />
                  </div>
                  <span className="card-pct" style={{ color: comp.color }}>
                    {comp.percentOfTotal}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* === Total Summary === */}
          <div className="tdee-total">
            <div className="total-divider" />
            <div className="total-content">
              <div className="total-left">
                <span className="total-label">RESULTADO TOTAL</span>
                <span className="total-desc">Soma de todos os componentes energéticos</span>
              </div>
              <div className="total-right">
                <span className="total-value">{formatBR(count)}</span>
                <span className="total-unit">kcal/dia</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
