import { useEffect, useRef } from "react";

const TOTAL_KCAL = 3985;

const components = [
  {
    id: "bmr",
    name: "Taxa Metabólica Basal",
    tech: "BMR — CUNNINGHAM",
    desc: "Energia em repouso absoluto",
    kcal: 1858,
    prefix: "",
    color: "var(--bmr-color)",
    glow: "rgba(232,58,58,0.16)",
    iconBg: "rgba(232,58,58,0.1)",
    iconBorder: "rgba(232,58,58,0.22)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    wfDelay: "0.7s",
  },
  {
    id: "neat",
    name: "Atividade Não-Exercício",
    tech: "NEAT — MODERADAMENTE ATIVO",
    desc: "Movimentos do cotidiano",
    kcal: 930,
    prefix: "+",
    color: "var(--neat-color)",
    glow: "rgba(255,140,66,0.16)",
    iconBg: "rgba(255,140,66,0.1)",
    iconBorder: "rgba(255,140,66,0.22)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    wfDelay: "0.9s",
  },
  {
    id: "eat",
    name: "Atividade de Treino",
    tech: "EAT — 4×/SEM · 65MIN · FORÇA",
    desc: "Gasto calórico do treino",
    kcal: 286,
    prefix: "+",
    color: "var(--eat-color)",
    glow: "rgba(124,108,250,0.16)",
    iconBg: "rgba(124,108,250,0.1)",
    iconBorder: "rgba(124,108,250,0.22)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v6a6 6 0 0 0 12 0V4" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
    ),
    wfDelay: "1.1s",
  },
  {
    id: "cardio",
    name: "Cardio & Passos",
    tech: "EAT — 20MIN · ESTEIRA",
    desc: "Exercício aeróbico diário",
    kcal: 370,
    prefix: "+",
    color: "var(--cardio-color)",
    glow: "rgba(58,184,232,0.16)",
    iconBg: "rgba(58,184,232,0.1)",
    iconBorder: "rgba(58,184,232,0.22)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    wfDelay: "1.3s",
  },
  {
    id: "tef",
    name: "Efeito Térmico",
    tech: "TEF — PROTEÍNA / CARB / GORDURA",
    desc: "Energia para digerir alimentos",
    kcal: 320,
    prefix: "+",
    color: "var(--tef-color)",
    glow: "rgba(58,232,124,0.16)",
    iconBg: "rgba(58,232,124,0.1)",
    iconBorder: "rgba(58,232,124,0.22)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    wfDelay: "1.5s",
  },
];

// Bar heights for waterfall — proportional to max (TOTAL_KCAL)
const wfMax = TOTAL_KCAL;
const barHeights = components.map((c) => Math.round((c.kcal / wfMax) * 100));
const totalHeight = 100; // 100% for total bar

function formatKcal(v: number) {
  return v.toLocaleString("pt-BR");
}

export function App() {
  const barsRef = useRef<HTMLDivElement[]>([]);
  const miniBarsRef = useRef<HTMLDivElement[]>([]);
  const totalBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate waterfall bars after stagger
    const timers: ReturnType<typeof setTimeout>[] = [];
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const delay = 700 + i * 200;
      timers.push(
        setTimeout(() => {
          bar.classList.add("animated");
        }, delay)
      );
    });

    // Total bar
    if (totalBarRef.current) {
      timers.push(
        setTimeout(() => {
          totalBarRef.current!.classList.add("animated");
        }, 700 + components.length * 200 + 150)
      );
    }

    // Mini card bars
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            miniBarsRef.current.forEach((bar, i) => {
              if (!bar) return;
              setTimeout(() => {
                bar.style.transform = "scaleX(1)";
              }, 800 + i * 180);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector(".tdee-section");
    if (section) observer.observe(section);

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="tdee-section">
      <div className="tdee-inner">

        {/* Eyebrow */}
        <div className="section-eyebrow">
          <span className="eyebrow-dot" />
          <span className="eyebrow-label">Gasto Energético Total</span>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            De onde vêm<br />
            suas <em>3.985 kcal</em>
          </h2>
          <p className="section-subtitle">
            Cada caloria tem uma origem. Veja como seu organismo
            distribui o gasto energético diário entre cinco sistemas distintos.
          </p>
        </div>

        {/* TDEE Total Hero Strip */}
        <div className="tdee-total-strip">
          <div className="total-left">
            <span className="total-label-top">TDEE · Total Daily Energy Expenditure</span>
            <span className="total-label-main">Seu gasto calórico diário total</span>
          </div>

          <div className="total-center">
            <div className="total-number">
              <div className="total-number-glow" />
              {formatKcal(TOTAL_KCAL)}
            </div>
            <span className="total-unit">kcal/dia</span>
          </div>

          <div className="total-right">
            <span className="total-badge">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="4" />
              </svg>
              5 COMPONENTES
            </span>
            <span className="total-meta">BMR + NEAT + EAT + Cardio + TEF</span>
          </div>
        </div>

        {/* Stacked Bar */}
        <div className="stacked-viz-wrap">
          <div className="stacked-bar-container">
            {components.map((c) => {
              const pct = (c.kcal / TOTAL_KCAL * 100).toFixed(1);
              return (
                <div
                  key={c.id}
                  className={`stacked-segment seg-${c.id}`}
                  title={`${c.name}: ${formatKcal(c.kcal)} kcal (${pct}%)`}
                  style={{ width: `${pct}%`, background: c.color }}
                />
              );
            })}
          </div>
          <div className="stacked-legend">
            {components.map((c) => (
              <div className="legend-item" key={c.id}>
                <span className="legend-dot" style={{ background: c.color }} />
                <span>{c.id.toUpperCase()}</span>
                <span style={{ color: "var(--text-muted)" }}>
                  {Math.round(c.kcal / TOTAL_KCAL * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Cards Grid */}
        <div className="breakdown-grid">
          {components.map((c, i) => {
            const pct = Math.round(c.kcal / TOTAL_KCAL * 100);
            return (
              <div
                key={c.id}
                className="breakdown-card"
                style={{
                  ["--card-color" as string]: c.color,
                  ["--card-shadow" as string]: c.glow,
                  ["--card-icon-bg" as string]: c.iconBg,
                  ["--card-icon-border" as string]: c.iconBorder,
                  ["--card-glow" as string]: c.glow,
                }}
              >
                {/* Top row: icon + pct */}
                <div className="card-header-row">
                  <div
                    className="card-icon-wrap"
                    style={{ color: c.color }}
                  >
                    {c.icon}
                  </div>
                  <span className="card-pct-badge">{pct}%</span>
                </div>

                {/* Name + tech */}
                <div>
                  <div className="card-name">{c.name}</div>
                  <div className="card-tech">{c.tech}</div>
                  <div className="card-tech" style={{ marginTop: "2px", color: "var(--text-muted)" }}>
                    {c.desc}
                  </div>
                </div>

                {/* Value */}
                <div className="card-value-section">
                  <div className="card-value">
                    {c.prefix && (
                      <span className="card-prefix" style={{ color: c.color }}>
                        {c.prefix}
                      </span>
                    )}
                    {formatKcal(c.kcal)}
                    <span className="card-value-unit">kcal</span>
                  </div>

                  {/* Mini bar */}
                  <div className="card-mini-bar">
                    <div
                      className="card-mini-bar-fill"
                      ref={(el) => {
                        if (el) miniBarsRef.current[i] = el;
                      }}
                      style={{
                        background: c.color,
                        width: `${pct}%`,
                        boxShadow: `0 0 8px ${c.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Waterfall Chart */}
        <div className="waterfall-section">
          <div className="waterfall-header">
            <span className="waterfall-title">Decomposição Empilhada — Waterfall</span>
            <span className="waterfall-hint">EM KCAL/DIA</span>
          </div>

          <div className="waterfall-chart">
            {components.map((c, i) => (
              <div key={c.id} style={{ display: "contents" }}>
                <div className="wf-col">
                  <div className="wf-bar-wrap">
                    <div
                      className="wf-bar"
                      ref={(el) => {
                        if (el) barsRef.current[i] = el;
                      }}
                      style={{
                        height: `${barHeights[i]}%`,
                        background: c.color,
                        boxShadow: `0 0 20px ${c.glow}, 0 0 40px ${c.glow}`,
                        transitionDelay: `${i * 0.18}s`,
                      }}
                    >
                      <div className="wf-bar-inner-glow" />
                      <span className="wf-val" style={{ color: c.color }}>
                        {c.prefix}{formatKcal(c.kcal)}
                      </span>
                    </div>
                  </div>
                  <span className="wf-label" style={{ color: c.color }}>
                    {c.id.toUpperCase()}
                  </span>
                </div>

                {i < components.length - 1 && (
                  <div className="wf-connector">+</div>
                )}
              </div>
            ))}

            {/* Equals separator */}
            <div className="wf-connector" style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
              =
            </div>

            {/* Total col */}
            <div className="wf-col total-col">
              <div className="wf-bar-wrap">
                <div
                  className="wf-bar"
                  ref={totalBarRef}
                  style={{
                    height: `${totalHeight}%`,
                    transitionDelay: `${components.length * 0.18 + 0.15}s`,
                  }}
                >
                  <div className="wf-bar-inner-glow" />
                  <span className="wf-val" style={{ color: "var(--accent-bright)" }}>
                    {formatKcal(TOTAL_KCAL)}
                  </span>
                </div>
              </div>
              <span className="wf-label" style={{ color: "var(--accent-bright)", fontWeight: 700 }}>
                TDEE
              </span>
            </div>
          </div>
        </div>

        {/* Formula Row */}
        <div className="formula-row">
          {components.map((c, i) => (
            <div key={c.id} className="formula-item">
              {i > 0 && <span className="formula-op">+</span>}
              <span className="formula-dot" style={{ background: c.color }} />
              <span className="formula-abbr" style={{ color: c.color }}>
                {c.id.toUpperCase()}
              </span>
              <span className="formula-val">{formatKcal(c.kcal)}</span>
            </div>
          ))}
          <span className="formula-eq">=</span>
          <span className="formula-total">{formatKcal(TOTAL_KCAL)} kcal</span>
        </div>

      </div>
    </section>
  );
}
