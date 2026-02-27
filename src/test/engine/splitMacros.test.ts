import { splitMacros } from '../../lib/engine/splitMacros';

describe('splitMacros', () => {
  it('splits macros preserving calorie target and floors', () => {
    const result = splitMacros({
      tdee: 2800,
      caloriesTarget: 2400,
      goal: 'mini_cut',
      lbmKg: 62,
      weightKg: 80,
      trainingSessions: 5,
      mealsPerDay: 4,
      fastedTraining: false,
      insulinResistance: false,
    });

    expect(result.proteinG).toBeGreaterThanOrEqual(result.floors.protein);
    expect(result.carbsG).toBeGreaterThanOrEqual(0);
    expect(result.fatG).toBeGreaterThanOrEqual(result.floors.fat);
    expect(Math.abs(result.calories - 2400)).toBeLessThanOrEqual(30);
    expect(result.meals).toHaveLength(4);
  });

  it('raises protein target in aggressive hard cut', () => {
    const aggressive = splitMacros({
      tdee: 3200,
      caloriesTarget: 2200,
      goal: 'hard_cut',
      lbmKg: 65,
      weightKg: 85,
      trainingSessions: 5,
      mealsPerDay: 4,
      fastedTraining: false,
      insulinResistance: false,
    });

    const light = splitMacros({
      tdee: 3200,
      caloriesTarget: 2700,
      goal: 'hard_cut',
      lbmKg: 65,
      weightKg: 85,
      trainingSessions: 5,
      mealsPerDay: 4,
      fastedTraining: false,
      insulinResistance: false,
    });

    expect(aggressive.proteinG).toBeGreaterThan(light.proteinG);
  });
});