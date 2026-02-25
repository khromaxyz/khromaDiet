import { whatIfSliderDefaults } from '../../../../lib/constants/mockForm';
import { whatIfPreview } from '../../../../lib/constants/mockDashboard';

export const WhatIfSection = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Simulador E Se? (What-If)</div>
        <span className="whatif-beta-badge">Beta</span>
      </div>

      <div className="whatif-card">
        <div className="whatif-inner-grid">
          <div className="whatif-sliders">
            {whatIfSliderDefaults.map((slider) => (
              <div key={slider.id} className="whatif-slider-item">
                <div className="whatif-slider-label-row">
                  <span className="whatif-slider-label">{slider.label}</span>
                  <span className="whatif-slider-value">{slider.value}</span>
                </div>
                <div className="slider-track">
                  <div className="slider-fill" style={{ width: `${slider.percent}%` }} />
                </div>
                <input type="range" min={0} max={100} value={slider.percent} readOnly aria-label={slider.label} />
              </div>
            ))}
          </div>

          <div className="whatif-preview">
            <div className="whatif-pulse-dot" />
            <div className="whatif-preview-title">Preview · Resultado Estimado</div>
            {whatIfPreview.map((result) => (
              <div
                key={result.label}
                className={
                  result.label === 'Prazo'
                    ? 'whatif-result-row whatif-result-row-last'
                    : 'whatif-result-row'
                }
              >
                <span className="whatif-result-label">{result.label}</span>
                <span className={result.changed ? 'whatif-result-value changed' : 'whatif-result-value'}>
                  {result.value}
                  {result.diff ? <span className="whatif-result-diff">{result.diff}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

