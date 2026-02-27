import { useEffect, useMemo, useRef, useState } from 'react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';

type MacroKey = 'protein' | 'carbs' | 'fat';

interface MacroState {
  protein: number;
  carbs: number;
  fat: number;
}

const kcalPerGram: Record<MacroKey, number> = {
  protein: 4,
  carbs: 4,
  fat: 9,
};

const clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

const totalCalories = (macros: MacroState): number => macros.protein * 4 + macros.carbs * 4 + macros.fat * 9;

const calcSliderPct = (value: number, min: number, max: number): number => {
  if (max <= min) {
    return 0;
  }
  return Math.max(0, Math.min(100, ((value - min) * 100) / (max - min)));
};

const rebalanceMacros = ({
  base,
  changed,
  value,
  calorieTarget,
  floors,
  ceilings,
}: {
  base: MacroState;
  changed: MacroKey;
  value: number;
  calorieTarget: number;
  floors: MacroState;
  ceilings: MacroState;
}): MacroState => {
  const next: MacroState = { ...base };
  next[changed] = clamp(value, floors[changed], ceilings[changed]);

  const otherKeys = (['protein', 'carbs', 'fat'] as MacroKey[]).filter((key) => key !== changed);
  const remainingCalories = calorieTarget - next[changed] * kcalPerGram[changed];

  const baseOtherCalories = otherKeys.reduce((sum, key) => sum + base[key] * kcalPerGram[key], 0);

  if (baseOtherCalories <= 0) {
    const first = otherKeys[0];
    const second = otherKeys[1];
    if (!first || !second) {
      return next;
    }

    next[first] = clamp(remainingCalories / (kcalPerGram[first] + kcalPerGram[second]), floors[first], ceilings[first]);
    next[second] = clamp(
      (remainingCalories - next[first] * kcalPerGram[first]) / kcalPerGram[second],
      floors[second],
      ceilings[second],
    );
  } else {
    const first = otherKeys[0];
    const second = otherKeys[1];
    if (!first || !second) {
      return next;
    }

    const firstShare = (base[first] * kcalPerGram[first]) / baseOtherCalories;
    next[first] = clamp((remainingCalories * firstShare) / kcalPerGram[first], floors[first], ceilings[first]);
    next[second] = clamp(
      (remainingCalories - next[first] * kcalPerGram[first]) / kcalPerGram[second],
      floors[second],
      ceilings[second],
    );
  }

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const diff = calorieTarget - totalCalories(next);
    if (Math.abs(diff) < 1) {
      break;
    }

    for (const key of otherKeys) {
      const step = diff / kcalPerGram[key];
      const proposal = clamp(next[key] + step, floors[key], ceilings[key]);
      const changedBy = proposal - next[key];
      next[key] = proposal;
      const remaining = calorieTarget - totalCalories(next);
      if (Math.abs(remaining) < 1) {
        break;
      }
      if (Math.abs(changedBy) < 0.001) {
        continue;
      }
    }
  }

  const finalDiff = calorieTarget - totalCalories(next);
  if (Math.abs(finalDiff) >= 1) {
    const fallbackOrder: MacroKey[] = ['carbs', 'fat', 'protein'];
    for (const key of fallbackOrder) {
      if (key === changed) {
        continue;
      }
      const proposal = clamp(next[key] + finalDiff / kcalPerGram[key], floors[key], ceilings[key]);
      next[key] = proposal;
      if (Math.abs(calorieTarget - totalCalories(next)) < 1) {
        break;
      }
    }
  }

  return {
    protein: Math.round(next.protein),
    carbs: Math.round(next.carbs),
    fat: Math.round(next.fat),
  };
};

export const MacroCards = () => {
  const results = useDietForgeStore((state) => state.results);

  const initial = useMemo<MacroState>(() => {
    return {
      protein: results?.macros.proteinG ?? 0,
      carbs: results?.macros.carbsG ?? 0,
      fat: results?.macros.fatG ?? 0,
    };
  }, [results?.macros.carbsG, results?.macros.fatG, results?.macros.proteinG]);

  const [macros, setMacros] = useState<MacroState>(initial);
  const [pulseTotal, setPulseTotal] = useState(false);
  const pulseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMacros(initial);
  }, [initial]);

  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current !== null) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, []);

  if (!results) {
    return null;
  }

  const floors: MacroState = {
    protein: results.macros.floors.protein,
    carbs: results.macros.floors.carbs,
    fat: results.macros.floors.fat,
  };
  const ceilings: MacroState = {
    protein: results.macros.ceilings.protein,
    carbs: results.macros.ceilings.carbs,
    fat: results.macros.ceilings.fat,
  };

  const calorieTarget = results.goalCalories;

  const applyMacro = (key: MacroKey, value: number) => {
    setPulseTotal(true);
    if (pulseTimeoutRef.current !== null) {
      window.clearTimeout(pulseTimeoutRef.current);
    }
    pulseTimeoutRef.current = window.setTimeout(() => {
      setPulseTotal(false);
    }, 420);

    setMacros((current) =>
      rebalanceMacros({
        base: current,
        changed: key,
        value,
        calorieTarget,
        floors,
        ceilings,
      }),
    );
  };

  const items: Array<{ id: MacroKey; label: string; grams: number; color: string }> = [
    { id: 'protein', label: 'Proteína', grams: macros.protein, color: 'protein' },
    { id: 'carbs', label: 'Carboidrato', grams: macros.carbs, color: 'carbs' },
    { id: 'fat', label: 'Gordura', grams: macros.fat, color: 'fat' },
  ];

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Macros Diários</div>
        <span className="dash-section-action">Sliders com reequilíbrio automático</span>
      </div>
      <div className="macro-cards-grid">
        {items.map((macro) => {
          const macroCalories = macro.grams * kcalPerGram[macro.id];
          const caloriePct = calorieTarget > 0 ? (macroCalories * 100) / calorieTarget : 0;
          const sliderPct = calcSliderPct(macro.grams, floors[macro.id], ceilings[macro.id]);

          return (
            <div key={macro.id} className={`macro-card ${macro.color}`}>
              <div className="macro-card-bg" />
              <div className="macro-card-head">
                <div className="macro-type-label">
                  <span className="macro-type-dot" />
                  {macro.label}
                </div>
                <span className="macro-type-percent">{caloriePct.toFixed(1)}%</span>
              </div>
              <div className="macro-amount">
                {macro.grams} <span className="macro-amount-unit">g</span>
              </div>
              <div className="macro-kcal">
                {macroCalories.toLocaleString('pt-BR')} kcal · {caloriePct.toFixed(1)}% das calorias
              </div>
              <div className="macro-progress-bar">
                <div className="macro-progress-fill" style={{ width: `${sliderPct}%` }} />
              </div>
              <input
                type="range"
                className="range-input"
                min={floors[macro.id]}
                max={ceilings[macro.id]}
                step={1}
                value={macro.grams}
                title={`Min ${floors[macro.id]}g · Max ${ceilings[macro.id]}g`}
                aria-label={macro.label}
                onChange={(event) => applyMacro(macro.id, Number(event.target.value))}
              />
            </div>
          );
        })}
      </div>
      <div className="target-info-card">
        <div className="target-info-row">
          <span className="target-info-icon">=</span>
          <p className="target-info-text">
            Total atual:{' '}
            <span className={pulseTotal ? 'target-info-highlight macro-total-pulse' : 'target-info-highlight'}>
              {Math.round(totalCalories(macros))} kcal
            </span>
            {' · '}Meta fixa: {calorieTarget.toLocaleString('pt-BR')} kcal
          </p>
        </div>
      </div>
    </>
  );
};
