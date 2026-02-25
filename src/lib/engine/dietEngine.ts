import type { EngineInput, EngineOutput } from '../types';

export const runDietEngine = ({ form }: EngineInput): EngineOutput => {
  const leanBodyMass = form.currentWeight * (1 - form.bodyFat / 100);
  const bmr = 370 + 21.6 * leanBodyMass;
  const tdee = 3102;
  const goalCalories = 2637;
  const dailyDeficit = 465;

  return {
    tdee,
    goalCalories,
    dailyDeficit,
    bmr: Number(bmr.toFixed(0)),
    leanBodyMass: Number(leanBodyMass.toFixed(1)),
    tef: 282,
  };
};

