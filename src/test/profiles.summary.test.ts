import { describe, expect, it } from 'vitest';

import { buildProfileSummary } from '../lib/profiles/summary';
import type { CalculationResults } from '../lib/types/engine';
import type { FormData } from '../lib/types/form';

describe('profiles/summary', () => {
  it('builds summary values from form snapshot and calculation results', () => {
    const formData = {
      targetWeeks: 16,
    } as FormData;

    const results = {
      tdeeFinal: 2843.9,
      goalCalories: 2230.2,
      dailyDelta: 613.7,
      macros: {
        proteinG: 192.4,
        carbsG: 253.9,
        fatG: 64.2,
      },
      precision: {
        precisionPct: 73.6,
      },
      projection: {
        milestones: [{ week: 14 }],
      },
      bmrMethod: 'mifflin',
    } as unknown as CalculationResults;

    const summary = buildProfileSummary(formData, results);

    expect(summary.tdee).toBe(2844);
    expect(summary.targetKcal).toBe(2230);
    expect(summary.deficit).toBe(614);
    expect(summary.protein).toBe(192);
    expect(summary.carb).toBe(254);
    expect(summary.fat).toBe(64);
    expect(summary.precisionPct).toBe(74);
    expect(summary.estimatedWeeks).toBe(14);
    expect(summary.bmrMethod).toBe('mifflin');
  });

  it('falls back to target weeks when projection milestones are absent', () => {
    const formData = {
      targetWeeks: 12,
    } as FormData;

    const results = {
      tdeeFinal: 2800,
      goalCalories: 2300,
      dailyDelta: 500,
      macros: {
        proteinG: 180,
        carbsG: 240,
        fatG: 60,
      },
      precision: {
        precisionPct: 66,
      },
      projection: null,
      bmrMethod: 'henry',
    } as unknown as CalculationResults;

    const summary = buildProfileSummary(formData, results);

    expect(summary.estimatedWeeks).toBe(12);
    expect(summary.bmrMethod).toBe('henry');
  });
});
