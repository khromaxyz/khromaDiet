import type { GoalMetricMode, GoalProjectionResult, GoalType } from '../types';

import { KCAL_PER_KG_FAT } from './constants';
import { clamp, round, toOneDecimal } from './math';

export interface CalcGoalProjectionInput {
  tdee: number;
  caloriesTarget: number;
  weightKg: number;
  bodyFatPct: number | null;
  goal: GoalType;
  goalMode: GoalMetricMode;
  targetWeightKg: number | null;
  targetBodyFatPct: number | null;
  targetFatKg: number | null;
  weeks: number | null;
  hasHormones: boolean;
}

const buildRefeedWeeks = (goal: GoalType, weeks: number): number[] => {
  if (goal === 'hard_cut') {
    const points: number[] = [];
    for (let current = 5; current <= weeks; current += 5) {
      points.push(current);
    }
    return points;
  }

  if (goal === 'mini_cut') {
    const points: number[] = [];
    for (let current = 7; current <= weeks; current += 7) {
      points.push(current);
    }
    return points;
  }

  return [];
};

const isCutGoal = (goal: GoalType): boolean => goal === 'hard_cut' || goal === 'mini_cut' || goal === 'recomp';

const resolveTargetFatKg = ({
  goalMode,
  weightKg,
  bodyFatPct,
  targetWeightKg,
  targetBodyFatPct,
  targetFatKg,
}: {
  goalMode: GoalMetricMode;
  weightKg: number;
  bodyFatPct: number | null;
  targetWeightKg: number | null;
  targetBodyFatPct: number | null;
  targetFatKg: number | null;
}): { targetFatKg: number | null; weightFlag: boolean } => {
  if (goalMode === 'weight') {
    if (targetWeightKg === null) {
      return { targetFatKg: null, weightFlag: true };
    }
    return { targetFatKg: weightKg - targetWeightKg, weightFlag: true };
  }

  if (goalMode === 'bf') {
    if (targetBodyFatPct === null || bodyFatPct === null) {
      return { targetFatKg: null, weightFlag: false };
    }

    return {
      targetFatKg: (weightKg * (bodyFatPct - targetBodyFatPct)) / 100,
      weightFlag: false,
    };
  }

  if (targetFatKg === null) {
    return { targetFatKg: null, weightFlag: false };
  }

  return {
    targetFatKg,
    weightFlag: false,
  };
};

export const calcGoalProjection = ({
  tdee,
  caloriesTarget,
  weightKg,
  bodyFatPct,
  goal,
  goalMode,
  targetWeightKg,
  targetBodyFatPct,
  targetFatKg,
  weeks,
  hasHormones,
}: CalcGoalProjectionInput): GoalProjectionResult | null => {
  if (weeks === null || weeks < 1) {
    return null;
  }

  const target = resolveTargetFatKg({
    goalMode,
    weightKg,
    bodyFatPct,
    targetWeightKg,
    targetBodyFatPct,
    targetFatKg,
  });

  if (target.targetFatKg === null) {
    return null;
  }

  const targetFat = target.targetFatKg;
  const requiredDailyDelta = (targetFat * KCAL_PER_KG_FAT) / (weeks * 7);
  const actualDailyDelta = tdee - caloriesTarget;

  const cutGoal = isCutGoal(goal);
  const realisticLimit = cutGoal ? (hasHormones ? 750 : 500) : 350;
  const aggressiveLimit = cutGoal ? (hasHormones ? 1000 : 750) : 500;
  const requiredAbs = Math.abs(requiredDailyDelta);

  let classification: GoalProjectionResult['classification'];
  if (requiredAbs <= realisticLimit) {
    classification = 'realista';
  } else if (requiredAbs <= aggressiveLimit) {
    classification = 'agressivo';
  } else {
    classification = 'inviavel';
  }

  const weeksMin =
    classification === 'inviavel'
      ? Math.ceil((Math.abs(targetFat) * KCAL_PER_KG_FAT) / (aggressiveLimit * 7))
      : null;

  const refeedWeeks = buildRefeedWeeks(goal, weeks);

  const milestoneWeeks = [1, 2, 4, 6, 8, 12, 16, weeks]
    .filter((week) => week > 0 && week <= weeks)
    .filter((week, index, list) => list.indexOf(week) === index)
    .sort((a, b) => a - b);

  const fatMassNow = bodyFatPct !== null ? (weightKg * bodyFatPct) / 100 : null;

  const milestones = milestoneWeeks.map((week) => {
    // Adaptação metabólica: redução progressiva de 0.5% a cada bloco de 4 semanas.
    const adaptationFactor = Math.max(0.85, 1 - 0.005 * Math.floor(week / 4));
    const fatLostKg = ((actualDailyDelta * 7 * week) / KCAL_PER_KG_FAT) * adaptationFactor;
    const weightAtWeek = weightKg - fatLostKg;

    let bodyFatAtWeek: number | null = null;
    if (fatMassNow !== null && weightAtWeek > 0) {
      const fatMassAtWeek = fatMassNow - fatLostKg;
      bodyFatAtWeek = toOneDecimal(clamp((fatMassAtWeek / weightAtWeek) * 100, 3, 60));
    }

    return {
      week,
      weightKg: toOneDecimal(weightAtWeek),
      bodyFatPct: bodyFatAtWeek,
      fatLostKg: toOneDecimal(fatLostKg),
      adaptationFactor: toOneDecimal(adaptationFactor),
      refeed: refeedWeeks.includes(week),
    };
  });

  return {
    classification,
    requiredDailyDelta: round(requiredDailyDelta),
    actualDailyDelta: round(actualDailyDelta),
    weeksMin,
    targetFatKg: toOneDecimal(targetFat),
    warningTargetWeightIncludesLbm: target.weightFlag,
    milestones,
    refeedWeeks,
  };
};
