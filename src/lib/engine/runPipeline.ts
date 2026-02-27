import type {
  CalculationResults,
  FormData,
  PrecisionPresenceMap,
  PrecisionState,
  SupplementSuggestion,
  GoalType,
} from '../types';

import { applyModifiers } from './applyModifiers';
import { calcBFNavy } from './calcBFNavy';
import { calcBMR } from './calcBMR';
import { calcGoalProjection } from './calcGoalProjection';
import { calcMetabolicAdaptation } from './calcMetabolicAdaptation';
import { calcTEF } from './calcTEF';
import { calcTDEE } from './calcTDEE';
import { GOAL_DELTA_PCT, PRECISION_FIELD_LABELS } from './constants';
import { clamp, round, toOneDecimal } from './math';
import { splitMacros } from './splitMacros';
import { validateInputs } from './validateInputs';

export const resolveEffectiveBodyFat = (
  formData: FormData,
): {
  effectiveBodyFatPct: number | null;
  navyBodyFatPct: number | null;
  source: CalculationResults['bodyFatInfo']['source'];
} => {
  const navyBodyFatPct =
    formData.navyNeckCm !== null && formData.navyWaistCm !== null
      ? calcBFNavy({
          sex: formData.sex,
          heightCm: formData.heightCm,
          neckCm: formData.navyNeckCm,
          waistCm: formData.navyWaistCm,
          hipCm: formData.sex === 'female' ? formData.navyHipCm : null,
        })
      : null;

  if (formData.bodyFatMode === 'navy') {
    return { effectiveBodyFatPct: navyBodyFatPct, navyBodyFatPct, source: navyBodyFatPct === null ? 'none' : 'navy' };
  }

  if (formData.bodyFatMode === 'photos') {
    return {
      effectiveBodyFatPct: formData.bodyFatPhotoPresetPct,
      navyBodyFatPct,
      source: formData.bodyFatPhotoPresetPct === null ? 'none' : 'photos',
    };
  }

  if (formData.bfDecision === 'navy' && navyBodyFatPct !== null) {
    return { effectiveBodyFatPct: navyBodyFatPct, navyBodyFatPct, source: 'navy' };
  }

  return {
    effectiveBodyFatPct: formData.bodyFatDeclaredPct,
    navyBodyFatPct,
    source: formData.bodyFatDeclaredPct === null ? 'none' : 'declared',
  };
};

const estimateBodyFatDeurenberg = (formData: FormData): number => {
  const heightM = formData.heightCm / 100;
  if (heightM <= 0) {
    return 18;
  }

  const bmi = formData.weightKg / (heightM * heightM);
  const sexFactor = formData.sex === 'male' ? 1 : 0;
  const estimated = 1.2 * bmi + 0.23 * formData.age - 10.8 * sexFactor - 5.4;

  return clamp(toOneDecimal(estimated), 4, 55);
};

const hasGoalTarget = (formData: FormData): boolean => {
  if (formData.targetWeeks === null) {
    return false;
  }

  if (formData.goalMode === 'weight') {
    return formData.targetWeightKg !== null;
  }

  if (formData.goalMode === 'bf') {
    return formData.targetBodyFatPct !== null;
  }

  return formData.targetFatKg !== null;
};

const getGoalCalories = (formData: FormData, tdeeReference: number, goalDeltaPct: number): number => {
  const minCalories = formData.sex === 'female' ? 1200 : 1500;
  const uncappedGoalCalories = tdeeReference * (1 + goalDeltaPct);
  return round(Math.max(minCalories, uncappedGoalCalories));
};

export const derivePrecisionPresence = (formData: FormData): PrecisionPresenceMap => ({
  W01: Boolean(formData.goal),
  W02: Boolean(formData.sex),
  W03: formData.age > 0,
  W04: formData.weightKg > 0,
  W05: formData.heightCm > 0,
  W06:
    formData.bodyFatDeclaredPct !== null ||
    formData.bodyFatPhotoPresetPct !== null ||
    (formData.navyNeckCm !== null && formData.navyWaistCm !== null),
  W07: Boolean(formData.activityLevel),
  W08: formData.trainingSessions > 0 && formData.trainingDurationMin > 0,
  W09:
    formData.stepsPerDay !== null ||
    (formData.cardioMinutesPerDay !== null && formData.cardioMinutesPerDay > 0),
  W10: formData.hormonesEnabled ? formData.hormones.length > 0 : false,
  W11: formData.healthConditions.some((condition) => condition !== 'none'),
  W12: formData.thermogenic !== 'none',
  W13: formData.mealsPerDay !== 4 || formData.fastedTraining || formData.plantBasedStrict,
  W14: hasGoalTarget(formData),
  W15: formData.occupationType !== undefined,
  W16: formData.deficitHistory !== undefined,
  W17: formData.deficitHistory === 'none' ? true : formData.deficitSeverity !== undefined,
  W18: formData.sex === 'female' ? formData.menstrualPhase !== undefined : true,
  W19: formData.ethnicity !== undefined,
});

const isCutGoal = (goal: GoalType): boolean => goal === 'hard_cut' || goal === 'mini_cut' || goal === 'recomp';

const getSupplements = (formData: FormData): SupplementSuggestion[] => {
  const supplements: SupplementSuggestion[] = [
    {
      id: 'creatine',
      priority: 'Alta',
      icon: '💊',
      name: 'Creatina Monohidratada',
      dose: '5g/dia',
      timing: 'Qualquer horário',
      glow: 'lime',
    },
    {
      id: 'vitd',
      priority: 'Alta',
      icon: '☀️',
      name: 'Vitamina D3 + K2',
      dose: '2000-5000 UI/dia',
      timing: 'Manhã com refeição',
    },
    {
      id: 'omega3',
      priority: 'Média',
      icon: '🐟',
      name: 'Ômega-3 EPA/DHA',
      dose: '2g EPA+DHA/dia',
      timing: 'Com refeições principais',
    },
    {
      id: 'magnesium',
      priority: 'Média',
      icon: '🌙',
      name: 'Magnésio Glicinato',
      dose: '300-400mg/dia',
      timing: 'Noite, pré-sono',
    },
  ];

  if (!formData.plantBasedStrict) {
    supplements.push({
      id: 'whey',
      priority: 'Alta',
      icon: '🥤',
      name: 'Whey Protein',
      dose: '25-40g por dose',
      timing: 'Conforme necessidade de proteína',
      glow: 'violet',
    });
  } else {
    supplements.push({
      id: 'b12',
      priority: 'Alta',
      icon: '🧬',
      name: 'Vitamina B12',
      dose: '1000mcg/semana',
      timing: 'Com refeição',
      glow: 'violet',
    });
  }

  if (formData.thermogenic === 'none') {
    supplements.push({
      id: 'caffeine',
      priority: 'Baixa',
      icon: '☕',
      name: 'Cafeína pré-treino',
      dose: '100-200mg',
      timing: '30min antes do treino',
    });
  }

  if (isCutGoal(formData.goal) && formData.trainingSessions >= 5) {
    supplements.push({
      id: 'zma',
      priority: 'Baixa',
      icon: '😴',
      name: 'ZMA',
      dose: '1 dose à noite',
      timing: 'Longe de cálcio',
    });
  }

  return supplements;
};

const getUncertainty = (
  tdeeFinal: number,
  precisionState: PrecisionState,
  precisionPresence: PrecisionPresenceMap,
): CalculationResults['uncertainty'] => {
  const weightedModelTdee = round(tdeeFinal + (100 - precisionState.precisionPct) * 3.2);
  const difference = Math.abs(weightedModelTdee - tdeeFinal);
  const bandSpan = round(Math.max(80, (100 - precisionState.precisionPct) * 6));

  const missingFields = precisionState.missingKeys
    .filter((key) => precisionPresence[key] === false)
    .map((key) => PRECISION_FIELD_LABELS[key]);

  return {
    weightedModelTdee,
    sequentialModelTdee: round(tdeeFinal),
    difference,
    lower: round(tdeeFinal - bandSpan),
    upper: round(tdeeFinal + bandSpan),
    showBand: difference > 150,
    missingFields,
  };
};

const getBeforeAfter = (
  formData: FormData,
  projection: CalculationResults['projection'],
  bodyFatPct: number | null,
): CalculationResults['beforeAfter'] => {
  if (!projection || projection.milestones.length === 0) {
    return null;
  }

  const lastMilestone = projection.milestones[projection.milestones.length - 1];
  if (!lastMilestone) {
    return null;
  }

  const nowLeanMass = bodyFatPct !== null ? formData.weightKg * (1 - bodyFatPct / 100) : null;
  const projectedLeanMass =
    lastMilestone.bodyFatPct !== null ? lastMilestone.weightKg * (1 - lastMilestone.bodyFatPct / 100) : null;

  return {
    now: {
      weightKg: toOneDecimal(formData.weightKg),
      bodyFatPct,
      leanMassKg: nowLeanMass !== null ? toOneDecimal(nowLeanMass) : null,
    },
    projected: {
      week: lastMilestone.week,
      weightKg: toOneDecimal(lastMilestone.weightKg),
      bodyFatPct: lastMilestone.bodyFatPct,
      leanMassKg: projectedLeanMass !== null ? toOneDecimal(projectedLeanMass) : null,
    },
  };
};

export interface RunPipelineInput {
  formData: FormData;
  precisionState: PrecisionState;
  precisionPresence: PrecisionPresenceMap;
}

export const runPipeline = ({ formData, precisionState, precisionPresence }: RunPipelineInput): CalculationResults => {
  const { effectiveBodyFatPct, navyBodyFatPct, source } = resolveEffectiveBodyFat(formData);
  const estimatedBodyFatPct = effectiveBodyFatPct === null ? estimateBodyFatDeurenberg(formData) : null;
  const bodyFatForProjection = effectiveBodyFatPct ?? estimatedBodyFatPct;

  const bmrResult = calcBMR({
    sex: formData.sex,
    age: formData.age,
    weightKg: formData.weightKg,
    heightCm: formData.heightCm,
    bfPct: effectiveBodyFatPct,
    trainingSessions: formData.trainingSessions,
    ...(formData.ethnicity !== undefined ? { ethnicity: formData.ethnicity } : {}),
  });

  const tdeeResult = calcTDEE({
    bmr: bmrResult.bmr,
    weightKg: formData.weightKg,
    activityLevel: formData.activityLevel,
    trainingSessions: formData.trainingSessions,
    trainingType: formData.trainingType,
    trainingDurationMin: formData.trainingDurationMin,
    cardioMode: formData.cardioMode,
    cardioIntensity: formData.cardioIntensity,
    cardioMinutesPerDay: formData.cardioMinutesPerDay,
    stepsPerDay: formData.stepsPerDay,
    occupationType: formData.occupationType,
  });

  const rawGoalDeltaPct = GOAL_DELTA_PCT[formData.goal];
  const cappedGoalDeltaPct =
    formData.healthConditions.includes('eating_disorder_history') && rawGoalDeltaPct < -0.2
      ? -0.2
      : rawGoalDeltaPct;

  const metabolicAdaptation = calcMetabolicAdaptation(formData.deficitHistory, formData.deficitSeverity);
  const seedGoalCalories = getGoalCalories(formData, tdeeResult.tdeeBase, cappedGoalDeltaPct);

  const seedSplit = splitMacros({
    tdee: tdeeResult.tdeeBase,
    caloriesTarget: seedGoalCalories,
    goal: formData.goal,
    lbmKg: bmrResult.lbm,
    weightKg: formData.weightKg,
    trainingSessions: formData.trainingSessions,
    mealsPerDay: formData.mealsPerDay,
    fastedTraining: formData.fastedTraining,
    insulinResistance: formData.healthConditions.includes('insulin_resistance'),
  });

  const seedTef = calcTEF(seedSplit.proteinG * 4, seedSplit.carbsG * 4, seedSplit.fatG * 9);
  const tdeeRawSeed = round(tdeeResult.tdeeBase + seedTef.total);

  const modifierSeed = applyModifiers({
    tdeeRaw: tdeeRawSeed,
    age: formData.age,
    sex: formData.sex,
    menstrualPhase: formData.menstrualPhase,
    hormonesEnabled: formData.hormonesEnabled,
    hormones: formData.hormones,
    healthConditions: formData.healthConditions,
    thermogenic: formData.thermogenic,
  });

  const estimatedAfterSeed = round(modifierSeed.tdeeFinal + metabolicAdaptation);
  const intermediateGoalCalories = getGoalCalories(formData, estimatedAfterSeed, cappedGoalDeltaPct);

  const intermediateSplit = splitMacros({
    tdee: estimatedAfterSeed,
    caloriesTarget: intermediateGoalCalories,
    goal: formData.goal,
    lbmKg: bmrResult.lbm,
    weightKg: formData.weightKg,
    trainingSessions: formData.trainingSessions,
    mealsPerDay: formData.mealsPerDay,
    fastedTraining: formData.fastedTraining,
    insulinResistance: formData.healthConditions.includes('insulin_resistance'),
  });

  const tefEstimated = calcTEF(
    intermediateSplit.proteinG * 4,
    intermediateSplit.carbsG * 4,
    intermediateSplit.fatG * 9,
  );
  const tdeeRawEstimated = round(tdeeResult.tdeeBase + tefEstimated.total);

  const modifierResult = applyModifiers({
    tdeeRaw: tdeeRawEstimated,
    age: formData.age,
    sex: formData.sex,
    menstrualPhase: formData.menstrualPhase,
    hormonesEnabled: formData.hormonesEnabled,
    hormones: formData.hormones,
    healthConditions: formData.healthConditions,
    thermogenic: formData.thermogenic,
  });

  const tdeeEstimated = round(modifierResult.tdeeFinal + metabolicAdaptation);
  const hasCalibratedTdee = typeof formData.calibratedTdeeKcal === 'number' && formData.calibratedTdeeKcal > 0;
  const tdeeCalibrated = hasCalibratedTdee ? round(formData.calibratedTdeeKcal ?? 0) : null;
  const tdeeFinal = tdeeCalibrated ?? tdeeEstimated;

  const goalCalories = getGoalCalories(formData, tdeeFinal, cappedGoalDeltaPct);
  const dailyDelta = round(tdeeFinal - goalCalories);

  const split = splitMacros({
    tdee: tdeeFinal,
    caloriesTarget: goalCalories,
    goal: formData.goal,
    lbmKg: bmrResult.lbm,
    weightKg: formData.weightKg,
    trainingSessions: formData.trainingSessions,
    mealsPerDay: formData.mealsPerDay,
    fastedTraining: formData.fastedTraining,
    insulinResistance: formData.healthConditions.includes('insulin_resistance'),
  });
  const tefDisplay = calcTEF(split.proteinG * 4, split.carbsG * 4, split.fatG * 9);

  const projection = hasGoalTarget(formData)
    ? calcGoalProjection({
        tdee: tdeeFinal,
        caloriesTarget: goalCalories,
        weightKg: formData.weightKg,
        bodyFatPct: bodyFatForProjection,
        goal: formData.goal,
        goalMode: formData.goalMode,
        targetWeightKg: formData.targetWeightKg,
        targetBodyFatPct: formData.targetBodyFatPct,
        targetFatKg: formData.targetFatKg,
        weeks: formData.targetWeeks,
        hasHormones: formData.hormonesEnabled && formData.hormones.length > 0,
      })
    : null;

  const validations = validateInputs({
    formData,
    effectiveBodyFatPct,
    navyBodyFatPct,
    goalCalories,
    tdeeFinal,
    projection,
  });

  const uncertainty = getUncertainty(tdeeFinal, precisionState, precisionPresence);
  const beforeAfter = getBeforeAfter(formData, projection, bodyFatForProjection);
  const supplements = getSupplements(formData);
  const confidenceLow = round(tdeeEstimated - 250);
  const confidenceHigh = round(tdeeEstimated + 250);

  const bodyFatInfo: CalculationResults['bodyFatInfo'] = {
    value: bodyFatForProjection,
    source: bodyFatForProjection === null ? 'none' : effectiveBodyFatPct === null ? 'estimated' : source,
    estimated: effectiveBodyFatPct === null && bodyFatForProjection !== null,
  };

  return {
    bmr: bmrResult,
    bmrMethod: bmrResult.method,
    tdeeRaw: round(tdeeResult.tdeeBase + tefDisplay.total),
    tdeeEstimated,
    tdeeCalibrated,
    tdeeFinal,
    goalDeltaPct: toOneDecimal(cappedGoalDeltaPct * 100),
    goalCalories,
    dailyDelta,
    tefBreakdown: tefDisplay.breakdown,
    metabolicAdaptation,
    occupationNEAT: round(tdeeResult.occupationNEAT),
    confidenceInterval: {
      low: confidenceLow,
      high: confidenceHigh,
      message: `Seu TDEE real provavelmente está entre ${confidenceLow} e ${confidenceHigh} kcal/dia`,
    },
    breakdown: {
      bmr: round(bmrResult.bmr),
      activityBase: round(tdeeResult.activityBase),
      eatTraining: round(tdeeResult.eatTraining),
      eatCardioStructured: round(tdeeResult.eatCardioStructured),
      eatCardioStepsResidual: round(tdeeResult.eatCardioStepsResidual),
      occupationNEAT: round(tdeeResult.occupationNEAT),
      tef: round(tefDisplay.total),
      modifiers: modifierResult.breakdown.muTotal,
      tdeeFinal,
    },
    modifiers: modifierResult.breakdown,
    macros: split,
    projection,
    precision: precisionState,
    uncertainty,
    validations,
    supplements,
    beforeAfter,
    bodyFatInfo,
    weeklyRateKg: toOneDecimal(Math.abs((dailyDelta * 7) / 7700)),
  };
};
