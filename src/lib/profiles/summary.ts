import type { CalculationResults } from '../types/engine';
import type { FormData } from '../types/form';

import type { ProfileSummary } from './types';

export const buildProfileSummary = (formData: FormData, results: CalculationResults): ProfileSummary => ({
  tdee: Math.round(results.tdeeFinal),
  targetKcal: Math.round(results.goalCalories),
  deficit: Math.round(results.dailyDelta),
  protein: Math.round(results.macros.proteinG),
  carb: Math.round(results.macros.carbsG),
  fat: Math.round(results.macros.fatG),
  precisionPct: Math.round(results.precision.precisionPct),
  estimatedWeeks: results.projection?.milestones.at(-1)?.week ?? formData.targetWeeks ?? null,
  bmrMethod: results.bmrMethod,
});
