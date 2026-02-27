import { toOneDecimal } from './math';

export interface CalcTefResult {
  total: number;
  breakdown: {
    protein: number;
    carb: number;
    fat: number;
  };
}

export const calcTEF = (proteinKcal: number, carbKcal: number, fatKcal: number): CalcTefResult => {
  // Bellisle (2004) e revisões posteriores: TEF é maior em proteína, seguido por carboidrato e gordura.
  const protein = proteinKcal * 0.25;
  const carb = carbKcal * 0.075;
  const fat = fatKcal * 0.015;

  return {
    total: toOneDecimal(protein + carb + fat),
    breakdown: {
      protein: toOneDecimal(protein),
      carb: toOneDecimal(carb),
      fat: toOneDecimal(fat),
    },
  };
};
