import { calcTDEE } from '../../lib/engine/calcTDEE';

describe('calcTDEE', () => {
  it('computes breakdown with structured cardio, residual steps and occupation NEAT', () => {
    const result = calcTDEE({
      bmr: 1700,
      weightKg: 80,
      activityLevel: 'moderate',
      trainingSessions: 4,
      trainingType: 'strength',
      trainingDurationMin: 60,
      cardioMode: 'both',
      cardioIntensity: 'moderate',
      cardioMinutesPerDay: 30,
      stepsPerDay: 9000,
      occupationType: 'active',
    });

    expect(result.activityBase).toBeCloseTo(2635, 0);
    expect(result.eatTraining).toBeGreaterThan(0);
    expect(result.eatCardioStructured).toBeGreaterThan(0);
    expect(result.eatCardioStepsResidual).toBeGreaterThan(0);
    expect(result.occupationNEAT).toBe(150);
    expect(result.tdeeBase).toBeGreaterThan(result.activityBase);
    expect(result.deduplicationApplied).toBe(true);
  });

  it('handles steps-only mode with sedentary occupation', () => {
    const result = calcTDEE({
      bmr: 1600,
      weightKg: 70,
      activityLevel: 'light',
      trainingSessions: 0,
      trainingType: 'strength',
      trainingDurationMin: 0,
      cardioMode: 'steps',
      cardioIntensity: 'low',
      cardioMinutesPerDay: null,
      stepsPerDay: 7000,
      occupationType: 'sedentary',
    });

    expect(result.eatCardioStructured).toBe(0);
    expect(result.eatCardioStepsResidual).toBeGreaterThan(0);
    expect(result.occupationNEAT).toBe(0);
    expect(result.tdeeBase).toBeGreaterThan(result.activityBase);
  });
});