import { applyModifiers } from '../../lib/engine/applyModifiers';

describe('applyModifiers', () => {
  it('applies multiplicative modifiers from hormones, conditions, thermogenic, age and cycle', () => {
    const result = applyModifiers({
      tdeeRaw: 2800,
      age: 45,
      sex: 'female',
      menstrualPhase: 'luteal',
      hormonesEnabled: true,
      hormones: [
        { compound: 'testosterone', dose: 300 },
        { compound: 'gh', dose: 20 },
      ],
      healthConditions: ['hypothyroidism'],
      thermogenic: 'caffeine',
    });

    expect(result.breakdown.muHorm).toBeGreaterThan(1);
    expect(result.breakdown.muCond).toBeLessThan(1);
    expect(result.breakdown.muTherm).toBeCloseTo(1.04, 2);
    expect(result.breakdown.muAge).toBeLessThan(1);
    expect(result.breakdown.muCycle).toBeCloseTo(1.03, 2);
    expect(result.tdeeFinal).toBeGreaterThan(2000);
  });

  it('returns neutral multipliers when nothing is active', () => {
    const result = applyModifiers({
      tdeeRaw: 2500,
      age: 30,
      sex: 'male',
      menstrualPhase: undefined,
      hormonesEnabled: false,
      hormones: [],
      healthConditions: ['none'],
      thermogenic: 'none',
    });

    expect(result.breakdown.muTotal).toBe(1);
    expect(result.breakdown.muCycle).toBe(1);
    expect(result.tdeeFinal).toBe(2500);
  });
});