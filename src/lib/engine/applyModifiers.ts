import type { HealthCondition, HormoneCompound, MenstrualPhase, ModifierBreakdown, SexType, ThermogenicOption } from '../types';

import { clamp, round, toOneDecimal } from './math';

export interface ApplyModifiersInput {
  tdeeRaw: number;
  age: number;
  sex: SexType;
  menstrualPhase: MenstrualPhase | undefined;
  hormonesEnabled: boolean;
  hormones: Array<{ compound: HormoneCompound; dose: number }>;
  healthConditions: HealthCondition[];
  thermogenic: ThermogenicOption;
}

const HORMONE_EFFECTS: Partial<Record<HormoneCompound, number>> = {
  testosterone: 0.08,
  oxandrolone: 0.05,
  deca: 0.1,
  tren: 0.12,
  gh: 0.1,
};

const HORMONE_REFERENCE_DOSES: Record<HormoneCompound, number> = {
  testosterone: 300,
  oxandrolone: 140,
  deca: 300,
  tren: 250,
  boldenone: 300,
  gh: 20,
  semaglutide: 3,
  other: 100,
};

const CONDITION_EFFECTS: Partial<Record<HealthCondition, number>> = {
  hypothyroidism: 0.9,
  insulin_resistance: 0.96,
  inflammatory_condition: 0.97,
  pcos: 0.97,
};

const THERMOGENIC_EFFECTS: Record<ThermogenicOption, number> = {
  none: 1,
  caffeine: 1.04,
  eca: 1.09,
};

export interface ApplyModifiersResult {
  tdeeFinal: number;
  breakdown: ModifierBreakdown;
}

export const applyModifiers = ({
  tdeeRaw,
  age,
  sex,
  menstrualPhase,
  hormonesEnabled,
  hormones,
  healthConditions,
  thermogenic,
}: ApplyModifiersInput): ApplyModifiersResult => {
  let muHorm = 1;
  const appliedHormones: HormoneCompound[] = [];
  if (hormonesEnabled) {
    for (const hormone of hormones) {
      const baseEffect = HORMONE_EFFECTS[hormone.compound];
      if (!baseEffect) {
        continue;
      }

      const referenceDose = HORMONE_REFERENCE_DOSES[hormone.compound];
      const normalizedDose = referenceDose > 0 ? clamp(hormone.dose / referenceDose, 0.7, 1.3) : 1;
      muHorm *= 1 + baseEffect * normalizedDose;
      appliedHormones.push(hormone.compound);
    }
  }

  let muCond = 1;
  const appliedConditions: HealthCondition[] = [];
  for (const condition of healthConditions) {
    const effect = CONDITION_EFFECTS[condition];
    if (!effect) {
      continue;
    }
    muCond *= effect;
    appliedConditions.push(condition);
  }

  const muTherm = THERMOGENIC_EFFECTS[thermogenic];
  const muAge = age > 40 ? Math.max(0.9, 1 - 0.005 * (age - 40)) : 1;

  // Variação entre fase folicular e lútea documentada em literatura de gasto energético feminino.
  let muCycle = 1;
  if (sex === 'female') {
    if (menstrualPhase === 'luteal') {
      muCycle = 1.03;
    } else if (menstrualPhase === 'follicular') {
      muCycle = 0.98;
    }
  }

  const muTotal = muHorm * muCond * muTherm * muAge * muCycle;
  const tdeeFinal = toOneDecimal(tdeeRaw * muTotal);

  return {
    tdeeFinal,
    breakdown: {
      muHorm: round(muHorm, 3),
      muCond: round(muCond, 3),
      muTherm: round(muTherm, 3),
      muAge: round(muAge, 3),
      muCycle: round(muCycle, 3),
      muTotal: round(muTotal, 3),
      appliedHormones,
      appliedConditions,
      thermogenic,
    },
  };
};
