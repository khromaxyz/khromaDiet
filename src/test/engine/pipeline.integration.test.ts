import { initialFormData } from '../../lib/constants/mockForm';
import { derivePrecisionPresence, runPipeline } from '../../lib/engine/runPipeline';
import { renormalizeWeights } from '../../lib/engine/renormalizeWeights';

const execute = (formData: typeof initialFormData) => {
  const precisionPresence = derivePrecisionPresence(formData);
  const precisionState = renormalizeWeights(precisionPresence);
  return runPipeline({ formData, precisionState, precisionPresence });
};

describe('runPipeline integration', () => {
  it('computes hard_cut profile with projection', () => {
    const formData = {
      ...initialFormData,
      goal: 'hard_cut' as const,
      bodyFatDeclaredPct: 20,
      targetWeeks: 12,
      goalMode: 'fat_kg' as const,
      targetFatKg: 5,
      deficitHistory: 'gt3months' as const,
      deficitSeverity: 'moderate' as const,
      occupationType: 'active' as const,
    };

    const result = execute(formData);

    expect(result.tdeeFinal).toBeGreaterThan(0);
    expect(result.goalCalories).toBeLessThan(result.tdeeFinal);
    expect(result.projection).not.toBeNull();
    expect(result.occupationNEAT).toBe(150);
    expect(result.metabolicAdaptation).toBe(-100);
  });

  it('computes mini_cut without bf using mifflin fallback', () => {
    const formData = {
      ...initialFormData,
      goal: 'mini_cut' as const,
      bodyFatDeclaredPct: null,
      bodyFatMode: 'declared' as const,
      targetWeeks: 10,
      goalMode: 'weight' as const,
      targetWeightKg: 74,
      ethnicity: 'unspecified' as const,
    };

    const result = execute(formData);

    expect(result.bmr.method).toBe('mifflin');
    expect(result.goalCalories).toBeLessThan(result.tdeeFinal);
    expect(result.bodyFatInfo.estimated).toBe(true);
    expect(result.projection?.milestones.some((milestone) => milestone.bodyFatPct !== null)).toBe(true);
  });

  it('computes bulk profile and positive delta', () => {
    const formData = {
      ...initialFormData,
      goal: 'lean_bulk' as const,
      bodyFatDeclaredPct: 15,
      targetWeeks: 16,
      goalMode: 'weight' as const,
      targetWeightKg: 85,
    };

    const result = execute(formData);

    expect(result.goalCalories).toBeGreaterThan(result.tdeeFinal);
    expect(result.dailyDelta).toBeLessThan(0);
  });

  it('applies cardio deduplication when steps and structured cardio coexist', () => {
    const formData = {
      ...initialFormData,
      cardioMode: 'both' as const,
      stepsPerDay: 9000,
      cardioMinutesPerDay: 30,
      bodyFatDeclaredPct: 18,
    };

    const result = execute(formData);

    expect(result.breakdown.eatCardioStructured).toBeGreaterThan(0);
    expect(result.breakdown.eatCardioStepsResidual).toBeGreaterThan(0);
    expect(result.validations.some((issue) => issue.field === 'cardioMode')).toBe(true);
  });

  it('shows uncertainty band when precision is very low', () => {
    const precisionPresence = {
      W01: true,
      W02: false,
      W03: false,
      W04: false,
      W05: false,
      W06: false,
      W07: false,
      W08: false,
      W09: false,
      W10: false,
      W11: false,
      W12: false,
      W13: false,
      W14: false,
      W15: false,
      W16: false,
      W17: false,
      W18: false,
      W19: false,
    };
    const precisionState = renormalizeWeights(precisionPresence);
    const result = runPipeline({
      formData: initialFormData,
      precisionState,
      precisionPresence,
    });

    expect(result.uncertainty.showBand).toBe(true);
    expect(result.uncertainty.difference).toBeGreaterThan(150);
  });
});