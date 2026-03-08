import { calcGoalProjection } from '../../lib/engine/calcGoalProjection';

describe('calcGoalProjection', () => {
  it('classifies viable cut goals and returns milestones', () => {
    const result = calcGoalProjection({
      tdee: 3000,
      caloriesTarget: 2500,
      weightKg: 85,
      bodyFatPct: 20,
      goal: 'mini_cut',
      goalMode: 'fat_kg',
      targetWeightKg: null,
      targetBodyFatPct: null,
      targetFatKg: 5,
      weeks: 12,
      hasHormones: false,
    });

    expect(result).not.toBeNull();
    expect(result?.classification).toBe('realista');
    expect(result?.milestones.length).toBeGreaterThan(3);
    expect(result?.refeedWeeks.length).toBeGreaterThan(0);
  });

  it('marks aggressive/inviable timelines and computes minimum weeks', () => {
    const result = calcGoalProjection({
      tdee: 2800,
      caloriesTarget: 2400,
      weightKg: 90,
      bodyFatPct: 25,
      goal: 'hard_cut',
      goalMode: 'fat_kg',
      targetWeightKg: null,
      targetBodyFatPct: null,
      targetFatKg: 10,
      weeks: 6,
      hasHormones: false,
    });

    expect(result).not.toBeNull();
    expect(result?.classification).toBe('inviavel');
    expect(result?.weeksMin).not.toBeNull();
  });
});
