import type { ActivityLevel, CardioIntensity, CardioMode, OccupationType, TdeeResult, TrainingType } from '../types';

import { ACTIVITY_MULTIPLIERS, BASELINE_STEPS, CARDIO_METS, OCCUPATION_NEAT_KCAL, TRAINING_METS } from './constants';
import { toOneDecimal } from './math';

export interface CalcTDEEInput {
  bmr: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  trainingSessions: number;
  trainingType: TrainingType;
  trainingDurationMin: number;
  cardioMode: CardioMode;
  cardioIntensity: CardioIntensity;
  cardioMinutesPerDay: number | null;
  stepsPerDay: number | null;
  occupationType: OccupationType | undefined;
}

export const calcTDEE = ({
  bmr,
  weightKg,
  activityLevel,
  trainingSessions,
  trainingType,
  trainingDurationMin,
  cardioMode,
  cardioIntensity,
  cardioMinutesPerDay,
  stepsPerDay,
  occupationType,
}: CalcTDEEInput): TdeeResult => {
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  const activityBase = bmr * activityMultiplier;

  const safeSessions = Math.max(0, trainingSessions);
  const safeDurationHours = Math.max(0, trainingDurationMin) / 60;
  const trainingMet = TRAINING_METS[trainingType];
  const eatTraining = (safeSessions * trainingMet * weightKg * safeDurationHours) / 7;

  const hasStructuredCardio =
    (cardioMode === 'structured' || cardioMode === 'both') &&
    cardioMinutesPerDay !== null &&
    cardioMinutesPerDay > 0;

  const structuredHours = hasStructuredCardio && cardioMinutesPerDay !== null ? cardioMinutesPerDay / 60 : 0;
  const cardioMet = CARDIO_METS[cardioIntensity];
  const eatCardioStructured = structuredHours * cardioMet * weightKg;

  const hasSteps = (cardioMode === 'steps' || cardioMode === 'both') && stepsPerDay !== null;
  const effectiveSteps = hasSteps && stepsPerDay !== null ? Math.max(0, stepsPerDay - BASELINE_STEPS) : 0;

  const eatCardioStepsResidual = effectiveSteps * 0.000762 * weightKg * 0.9;
  const occupationNEAT = OCCUPATION_NEAT_KCAL[occupationType ?? 'sedentary'];
  const tdeeBase = activityBase + eatTraining + eatCardioStructured + eatCardioStepsResidual + occupationNEAT;

  return {
    activityMultiplier,
    activityBase: toOneDecimal(activityBase),
    eatTraining: toOneDecimal(eatTraining),
    eatCardioStructured: toOneDecimal(eatCardioStructured),
    eatCardioStepsResidual: toOneDecimal(eatCardioStepsResidual),
    occupationNEAT: toOneDecimal(occupationNEAT),
    tdeeBase: toOneDecimal(tdeeBase),
    deduplicationApplied: hasStructuredCardio && hasSteps,
  };
};
