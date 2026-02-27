import type { BmrResult, Ethnicity, SexType } from '../types';

import { toOneDecimal } from './math';

const CONFIDENCE_NOTE =
  'Estimativa com margem de ±10% — precisão real depende de calibração empírica';

const isNonWesternEthnicity = (ethnicity: Ethnicity | undefined): boolean =>
  ethnicity === 'asian' || ethnicity === 'african' || ethnicity === 'latin';

const calcHenry = ({ sex, age, weightKg }: { sex: SexType; age: number; weightKg: number }): number | null => {
  // Henry (2005): equações derivadas para populações amplas com melhor aderência fora do eixo ocidental.
  if (sex === 'male') {
    if (age >= 18 && age < 30) {
      return 15.057 * weightKg + 692.2;
    }
    if (age >= 30 && age <= 60) {
      return 11.472 * weightKg + 873.1;
    }
    return null;
  }

  if (age >= 18 && age < 30) {
    return 14.818 * weightKg + 486.6;
  }
  if (age >= 30 && age <= 60) {
    return 8.126 * weightKg + 845.6;
  }
  return null;
};

export interface CalcBMRInput {
  sex: SexType;
  age: number;
  weightKg: number;
  heightCm: number;
  bfPct: number | null;
  trainingSessions: number;
  ethnicity?: Ethnicity;
}

export const calcBMR = ({
  sex,
  age,
  weightKg,
  heightCm,
  bfPct,
  trainingSessions,
  ethnicity,
}: CalcBMRInput): BmrResult => {
  const hasValidBf = bfPct !== null && bfPct > 0 && bfPct < 70;

  if (hasValidBf) {
    const lbm = weightKg * (1 - bfPct / 100);

    // Cunningham (1980) e Katch-McArdle usam a mesma base via massa magra.
    const bmr = 370 + 21.6 * lbm;
    return {
      bmr: toOneDecimal(bmr),
      method: trainingSessions >= 4 ? 'cunningham' : 'katch_mcardle',
      lbm: toOneDecimal(lbm),
      confidenceNote: CONFIDENCE_NOTE,
    };
  }

  if (isNonWesternEthnicity(ethnicity)) {
    const henryBmr = calcHenry({ sex, age, weightKg });
    if (henryBmr !== null) {
      return {
        bmr: toOneDecimal(henryBmr),
        method: 'henry',
        lbm: null,
        confidenceNote: CONFIDENCE_NOTE,
      };
    }
  }

  // Mifflin-St Jeor (1990): fallback padrão quando BF não está disponível.
  const sexConstant = sex === 'male' ? 5 : -161;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sexConstant;

  return {
    bmr: toOneDecimal(bmr),
    method: 'mifflin',
    lbm: null,
    confidenceNote: CONFIDENCE_NOTE,
  };
};
