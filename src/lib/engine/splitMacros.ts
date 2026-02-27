import type { GoalType, MacroTargets, MealMacroDistribution } from '../types';

import { clamp, round, toOneDecimal } from './math';

export interface SplitMacrosInput {
  tdee: number;
  caloriesTarget: number;
  goal: GoalType;
  lbmKg: number | null;
  weightKg: number;
  trainingSessions: number;
  mealsPerDay: number;
  fastedTraining: boolean;
  insulinResistance: boolean;
}

const isCutGoal = (goal: GoalType): boolean => goal === 'hard_cut' || goal === 'mini_cut';

const isBulkGoal = (goal: GoalType): boolean => goal === 'lean_bulk' || goal === 'dirty_bulk';

const PROTEIN_TARGETS: Record<
  GoalType,
  {
    base?: number;
    deficit_light?: number;
    deficit_moderate?: number;
    deficit_aggressive?: number;
  }
> = {
  hard_cut: {
    deficit_light: 2.4,
    deficit_moderate: 2.7,
    deficit_aggressive: 3.1,
  },
  mini_cut: {
    deficit_light: 2.3,
    deficit_moderate: 2.4,
    deficit_aggressive: 2.7,
  },
  recomp: { base: 2.5 },
  maintenance: { base: 1.8 },
  lean_bulk: { base: 2.0 },
  dirty_bulk: { base: 1.8 },
};

const getDeficitTier = (deficitRatio: number): 'deficit_light' | 'deficit_moderate' | 'deficit_aggressive' => {
  if (deficitRatio > 0.25) {
    return 'deficit_aggressive';
  }
  if (deficitRatio >= 0.2) {
    return 'deficit_moderate';
  }
  return 'deficit_light';
};

const getProteinMultiplier = (goal: GoalType, deficitRatio: number): number => {
  const target = PROTEIN_TARGETS[goal];
  if (!target) {
    return 2;
  }

  if (target.base !== undefined) {
    return target.base;
  }

  const tier = getDeficitTier(deficitRatio);
  return target[tier] ?? 2.2;
};

const kcalFromMacros = (proteinG: number, carbsG: number, fatG: number): number =>
  proteinG * 4 + carbsG * 4 + fatG * 9;

const normalizeShares = (shares: number[]): number[] => {
  const sum = shares.reduce((acc, value) => acc + value, 0);
  if (sum <= 0) {
    return shares.map(() => 1 / shares.length);
  }
  return shares.map((value) => value / sum);
};

const buildMealDistribution = ({
  mealsPerDay,
  proteinG,
  carbsG,
  fatG,
  fastedTraining,
  trainingSessions,
}: {
  mealsPerDay: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fastedTraining: boolean;
  trainingSessions: number;
}): MealMacroDistribution[] => {
  const mealCount = clamp(Math.round(mealsPerDay), 2, 7);
  const names = ['Café da manhã', 'Lanche', 'Almoço', 'Pré-treino', 'Pós-treino', 'Jantar', 'Ceia'];
  const times = ['07:00', '10:00', '13:00', '16:30', '19:30', '21:30', '23:00'];

  const hasTraining = trainingSessions > 0;
  const preIndex = hasTraining ? Math.max(0, Math.floor((mealCount - 1) / 2)) : -1;
  const postIndex = hasTraining ? Math.min(mealCount - 1, preIndex + 1) : -1;

  const proteinShares = Array.from({ length: mealCount }, () => 1 / mealCount);
  const carbShares = Array.from({ length: mealCount }, () => 1 / mealCount);
  const fatShares = Array.from({ length: mealCount }, () => 1 / mealCount);

  if (hasTraining && preIndex >= 0 && postIndex >= 0) {
    const carbBoostPre = fastedTraining ? 0.05 : 0.12;
    const carbBoostPost = fastedTraining ? 0.32 : 0.2;
    const proteinBoostPre = fastedTraining ? 0.04 : 0.06;
    const proteinBoostPost = fastedTraining ? 0.2 : 0.14;

    carbShares[preIndex] = (carbShares[preIndex] ?? 0) + carbBoostPre;
    carbShares[postIndex] = (carbShares[postIndex] ?? 0) + carbBoostPost;
    proteinShares[preIndex] = (proteinShares[preIndex] ?? 0) + proteinBoostPre;
    proteinShares[postIndex] = (proteinShares[postIndex] ?? 0) + proteinBoostPost;

    fatShares[preIndex] = (fatShares[preIndex] ?? 0) - 0.06;
    fatShares[postIndex] = (fatShares[postIndex] ?? 0) - 0.04;
  }

  const normProteinShares = normalizeShares(proteinShares.map((value) => Math.max(0.01, value)));
  const normCarbShares = normalizeShares(carbShares.map((value) => Math.max(0.01, value)));
  const normFatShares = normalizeShares(fatShares.map((value) => Math.max(0.01, value)));

  const meals: MealMacroDistribution[] = [];
  let proteinAssigned = 0;
  let carbsAssigned = 0;
  let fatAssigned = 0;

  for (let index = 0; index < mealCount; index += 1) {
    const isLast = index === mealCount - 1;
    const proteinShare = normProteinShares[index] ?? 0;
    const carbsShare = normCarbShares[index] ?? 0;
    const fatShare = normFatShares[index] ?? 0;

    const mealProtein = isLast ? round(proteinG - proteinAssigned) : round(proteinG * proteinShare);
    const mealCarbs = isLast ? round(carbsG - carbsAssigned) : round(carbsG * carbsShare);
    const mealFat = isLast ? round(fatG - fatAssigned) : round(fatG * fatShare);

    proteinAssigned += mealProtein;
    carbsAssigned += mealCarbs;
    fatAssigned += mealFat;

    const kcal = round(kcalFromMacros(mealProtein, mealCarbs, mealFat));

    let tag: MealMacroDistribution['tag'] = 'standard';
    if (index === preIndex) {
      tag = 'pre';
    } else if (index === postIndex) {
      tag = 'post';
    }

    meals.push({
      id: `meal-${index + 1}`,
      number: `Refeição ${String(index + 1).padStart(2, '0')}`,
      name: names[index] ?? `Refeição ${index + 1}`,
      time: times[index] ?? '00:00',
      kcal,
      proteinG: Math.max(0, mealProtein),
      carbsG: Math.max(0, mealCarbs),
      fatG: Math.max(0, mealFat),
      tag,
    });
  }

  return meals;
};

export const splitMacros = ({
  tdee,
  caloriesTarget,
  goal,
  lbmKg,
  weightKg,
  trainingSessions,
  mealsPerDay,
  fastedTraining,
  insulinResistance,
}: SplitMacrosInput): MacroTargets => {
  const massBase = lbmKg ?? weightKg;
  const deficitRatio = tdee > 0 ? Math.max(0, (tdee - caloriesTarget) / tdee) : 0;
  const proteinMultiplier = getProteinMultiplier(goal, deficitRatio);

  const proteinFloor = 1.6 * weightKg;
  const proteinCeiling = isCutGoal(goal) ? 3.2 * weightKg : 2.8 * weightKg;

  let proteinG = clamp(massBase * proteinMultiplier, proteinFloor, proteinCeiling);

  const fatPct = isCutGoal(goal) ? 0.22 : isBulkGoal(goal) ? 0.28 : 0.25;
  const fatFloor = Math.max(0.6 * weightKg, 40);
  const fatCeiling = Math.max(1.4 * weightKg, 95);

  let fatG = clamp((caloriesTarget * fatPct) / 9, fatFloor, fatCeiling);

  let carbsG = (caloriesTarget - proteinG * 4 - fatG * 9) / 4;

  const carbFloor = trainingSessions >= 5 ? 2 * weightKg : trainingSessions >= 3 ? 1.5 * weightKg : weightKg;
  const carbCeiling = insulinResistance ? 3.2 * weightKg : 6 * weightKg;

  if (carbsG < carbFloor) {
    const kcalNeeded = (carbFloor - carbsG) * 4;
    const fatRoom = (fatG - fatFloor) * 9;
    const fromFat = Math.min(kcalNeeded, fatRoom);
    fatG -= fromFat / 9;

    const remainingKcal = kcalNeeded - fromFat;
    if (remainingKcal > 0) {
      const proteinRoom = (proteinG - proteinFloor) * 4;
      const fromProtein = Math.min(remainingKcal, proteinRoom);
      proteinG -= fromProtein / 4;
    }

    carbsG = (caloriesTarget - proteinG * 4 - fatG * 9) / 4;
  }

  if (carbsG > carbCeiling) {
    const kcalExcess = (carbsG - carbCeiling) * 4;
    const fatCapacity = (fatCeiling - fatG) * 9;
    const toFat = Math.min(kcalExcess, fatCapacity);
    fatG += toFat / 9;

    const remainingKcal = kcalExcess - toFat;
    if (remainingKcal > 0) {
      const proteinCapacity = (proteinCeiling - proteinG) * 4;
      const toProtein = Math.min(remainingKcal, proteinCapacity);
      proteinG += toProtein / 4;
    }

    carbsG = (caloriesTarget - proteinG * 4 - fatG * 9) / 4;
  }

  proteinG = round(Math.max(proteinFloor, proteinG));
  fatG = round(clamp(fatG, fatFloor, fatCeiling));
  carbsG = round((caloriesTarget - proteinG * 4 - fatG * 9) / 4);

  if (carbsG < 0) {
    carbsG = 0;
    fatG = round((caloriesTarget - proteinG * 4) / 9);
  }

  const totalCalories = kcalFromMacros(proteinG, carbsG, fatG);
  const meals = buildMealDistribution({
    mealsPerDay,
    proteinG,
    carbsG,
    fatG,
    fastedTraining,
    trainingSessions,
  });

  return {
    calories: round(totalCalories),
    proteinG,
    carbsG,
    fatG,
    proteinPct: toOneDecimal((proteinG * 4 * 100) / totalCalories),
    carbsPct: toOneDecimal((carbsG * 4 * 100) / totalCalories),
    fatPct: toOneDecimal((fatG * 9 * 100) / totalCalories),
    floors: {
      protein: round(proteinFloor),
      carbs: round(carbFloor),
      fat: round(fatFloor),
    },
    ceilings: {
      protein: round(proteinCeiling),
      carbs: round(carbCeiling),
      fat: round(fatCeiling),
    },
    meals,
  };
};
