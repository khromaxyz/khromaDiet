import { derivePrecisionPresence, runPipeline } from '@/lib/engine/runPipeline';
import { renormalizeWeights } from '@/lib/engine/renormalizeWeights';
import type { CalculationResults, FormData, FormPatch } from '@/lib/types';

export const normalizeHealthConditions = (
  conditions: FormData['healthConditions'],
): FormData['healthConditions'] => {
  if (conditions.length === 0) {
    return ['none'];
  }

  if (conditions.includes('none') && conditions.length > 1) {
    return conditions.filter((condition) => condition !== 'none');
  }

  return conditions;
};

export const cloneFormData = (formData: FormData): FormData => ({
  ...formData,
  hormones: formData.hormones.map((hormone) => ({ ...hormone })),
  healthConditions: [...formData.healthConditions],
});

export const clonePartialFormData = (formData: Partial<FormData>): Partial<FormData> => {
  const next: Partial<FormData> = { ...formData };

  if (formData.hormones) {
    next.hormones = formData.hormones.map((hormone) => ({ ...hormone }));
  }

  if (formData.healthConditions) {
    next.healthConditions = [...formData.healthConditions];
  }

  return next;
};

export const sanitizeFormPatch = (patch: FormPatch): Partial<FormData> => {
  const entries = Object.entries(patch).filter(([, value]) => value !== undefined);
  return Object.fromEntries(entries) as Partial<FormData>;
};

export const mergeFormData = (base: FormData, patch: FormPatch): FormData => {
  const next = { ...base, ...sanitizeFormPatch(patch) };

  next.healthConditions = normalizeHealthConditions(next.healthConditions);

  if (!next.hormonesEnabled) {
    next.hormones = [];
  }

  return next;
};

export const computeForForm = (
  formData: FormData,
): {
  precisionPct: number;
  results: CalculationResults;
} => {
  const precisionPresence = derivePrecisionPresence(formData);
  const precisionState = renormalizeWeights(precisionPresence);
  const results = runPipeline({ formData, precisionState, precisionPresence });

  return {
    precisionPct: precisionState.precisionPct,
    results,
  };
};
