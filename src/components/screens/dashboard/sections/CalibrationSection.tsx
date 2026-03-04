import { useEffect, useMemo, useState } from 'react';

import { calcRealTDEE } from '../../../../lib/engine/calcCalibration';
import { useDietForgeStore } from '../../../../store/useDietForgeStore';

const FIRST_SEEN_KEY = 'dietforge.dashboard.first_seen_at';
const DAY_MS = 24 * 60 * 60 * 1000;

export const CalibrationSection = () => {
  const formData = useDietForgeStore((state) => state.formData);
  const results = useDietForgeStore((state) => state.results);
  const patchFormData = useDietForgeStore((state) => state.patchFormData);

  const [eligible, setEligible] = useState(false);
  const [daysSinceStart, setDaysSinceStart] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(formData.weightKg);
  const [adherencePct, setAdherencePct] = useState(85);

  useEffect(() => {
    const now = new Date();
    const rawFirstSeen = window.localStorage.getItem(FIRST_SEEN_KEY);

    if (!rawFirstSeen) {
      window.localStorage.setItem(FIRST_SEEN_KEY, now.toISOString());
      setEligible(false);
      return;
    }

    const firstSeen = new Date(rawFirstSeen);
    const diffDays = Math.floor((now.getTime() - firstSeen.getTime()) / DAY_MS);
    setDaysSinceStart(diffDays);
    setEligible(diffDays >= 14);
  }, []);

  const calibration = useMemo(() => {
    if (!results || !eligible) {
      return null;
    }

    const weeksSinceStart = Math.max(2, daysSinceStart / 7);
    const weightChangeKg = currentWeight - formData.weightKg;
    const avgDailyIntake =
      results.goalCalories + (results.tdeeEstimated - results.goalCalories) * (1 - adherencePct / 100);
    const tdeeReal = calcRealTDEE(avgDailyIntake, weightChangeKg, weeksSinceStart);

    return {
      tdeeReal: Math.round(tdeeReal),
      weeksSinceStart,
    };
  }, [adherencePct, currentWeight, daysSinceStart, eligible, formData.weightKg, results]);

  if (!results || !eligible || !calibration) {
    return null;
  }

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Calibrar meu TDEE</div>
        <span className="dash-section-action">Baseado na variação de peso real após 2 semanas</span>
      </div>

      <div className="target-info-card">
        <div className="target-info-row">
          <span className="target-info-icon">i</span>
          <p className="target-info-text">
            Seu TDEE estimado era {results.tdeeEstimated.toLocaleString('pt-BR')} kcal. Com base na sua variação de peso
            real, seu TDEE é aproximadamente {calibration.tdeeReal.toLocaleString('pt-BR')} kcal.
          </p>
        </div>
      </div>

      <div className="whatif-card">
        <div className="whatif-slider-item">
          <div className="whatif-slider-label-row">
            <span className="whatif-slider-label">Peso atual</span>
            <span className="whatif-slider-value">{currentWeight.toFixed(1)} kg</span>
          </div>
          <input
            type="number"
            className="range-input"
            min={30}
            max={300}
            step={0.1}
            value={currentWeight}
            onChange={(event) => setCurrentWeight(Number(event.target.value))}
          />
        </div>

        <div className="whatif-slider-item">
          <div className="whatif-slider-label-row">
            <span className="whatif-slider-label">Aderência estimada ao plano</span>
            <span className="whatif-slider-value">{adherencePct}%</span>
          </div>
          <input
            type="range"
            className="range-input"
            min={40}
            max={100}
            step={1}
            value={adherencePct}
            onChange={(event) => setAdherencePct(Number(event.target.value))}
          />
        </div>

        <div className="form-nav">
          <button
            type="button"
            className="btn-form-next"
            onClick={() => patchFormData({ calibratedTdeeKcal: Math.round(calibration.tdeeReal) })}
          >
            Usar TDEE calibrado
          </button>
        </div>
      </div>
    </>
  );
};
