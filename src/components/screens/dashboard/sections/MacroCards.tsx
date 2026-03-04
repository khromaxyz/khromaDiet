import { useEffect, useMemo, useRef, useState } from 'react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';

type MacroKey = 'protein' | 'carbs' | 'fat';

interface MacroState {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroCardsProps {
  activated: boolean;
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

export const MacroCards = ({ activated }: MacroCardsProps) => {
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

  const items: Array<{ id: MacroKey; label: string; grams: number; color: string; delay: string }> = [
    { id: 'protein', label: 'Proteína', grams: macros.protein, color: 'prot', delay: 'delay-1' },
    { id: 'carbs', label: 'Carboidrato', grams: macros.carbs, color: 'carb', delay: 'delay-2' },
    { id: 'fat', label: 'Gordura', grams: macros.fat, color: 'fat', delay: 'delay-3' },
  ];

  return (
    <>
      {items.map((macro) => {
        const macroCalories = macro.grams * kcalPerGram[macro.id];
        const caloriePct = calorieTarget > 0 ? (macroCalories * 100) / calorieTarget : 0;

        return (
          <div key={macro.id} className={`macro-card ${macro.color} anim-ready ${macro.delay} ${activated ? 'anim-in' : ''}`}>
            <div className="macro-card-top">
              <div className="macro-card-name">{macro.label}</div>
              <div className="macro-card-grams">
                {macro.grams}
                <span className="macro-card-grams-unit">g</span>
              </div>
            </div>

            <div className="macro-card-meta">
              <div className="macro-meta-item">
                <div className="macro-meta-label">Calorias</div>
                <div className="macro-meta-value">{macroCalories.toLocaleString('pt-BR')} kcal</div>
              </div>
              <div className="macro-meta-item">
                <div className="macro-meta-label">Proporção</div>
                <div className="macro-meta-value">{caloriePct.toFixed(1)}%</div>
              </div>
              <div className="macro-meta-item">
                <div className="macro-meta-label">Faixa</div>
                <div className="macro-meta-value">
                  {floors[macro.id]}g - {ceilings[macro.id]}g
                </div>
              </div>
            </div>

            <div className="macro-slider-wrapper">
              <input
                type="range"
                className={`macro-slider ${macro.color}`}
                min={floors[macro.id]}
                max={ceilings[macro.id]}
                step={1}
                value={macro.grams}
                title={`Min ${floors[macro.id]}g · Max ${ceilings[macro.id]}g`}
                aria-label={macro.label}
                onChange={(event) => applyMacro(macro.id, Number(event.target.value))}
              />
              <div className="macro-slider-pct">{caloriePct.toFixed(1)}%</div>
            </div>
          </div>
        );
      })}

      <div className={`macro-total-line ${pulseTotal ? 'macro-total-pulse' : ''}`}>
        Total atual: <strong>{Math.round(totalCalories(macros)).toLocaleString('pt-BR')} kcal</strong> • Meta fixa:{' '}
        {calorieTarget.toLocaleString('pt-BR')} kcal
      </div>
    </>
  );
};
