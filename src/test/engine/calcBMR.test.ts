import { calcBMR } from '../../lib/engine/calcBMR';

describe('calcBMR', () => {
  it('uses Cunningham for athlete profile with BF available', () => {
    const result = calcBMR({
      sex: 'male',
      age: 30,
      weightKg: 80,
      heightCm: 180,
      bfPct: 12,
      trainingSessions: 5,
      ethnicity: 'western',
    });

    expect(result.method).toBe('cunningham');
    expect(result.lbm).not.toBeNull();
    expect(result.confidenceNote).toMatch(/\+\/-|±/i);
  });

  it('uses Katch-McArdle for non-athlete profile with BF available', () => {
    const result = calcBMR({
      sex: 'female',
      age: 28,
      weightKg: 62,
      heightCm: 167,
      bfPct: 24,
      trainingSessions: 3,
      ethnicity: 'western',
    });

    expect(result.method).toBe('katch_mcardle');
    expect(result.lbm).not.toBeNull();
  });

  it('uses Henry for non-western ethnicity when BF is missing', () => {
    const result = calcBMR({
      sex: 'male',
      age: 35,
      weightKg: 85,
      heightCm: 180,
      bfPct: null,
      trainingSessions: 2,
      ethnicity: 'asian',
    });

    expect(result.method).toBe('henry');
    expect(result.lbm).toBeNull();
    expect(result.bmr).toBeGreaterThan(1500);
  });

  it('falls back to Mifflin when BF is missing and ethnicity is western/unspecified', () => {
    const result = calcBMR({
      sex: 'female',
      age: 28,
      weightKg: 62,
      heightCm: 167,
      bfPct: null,
      trainingSessions: 2,
      ethnicity: 'unspecified',
    });

    expect(result.method).toBe('mifflin');
    expect(result.lbm).toBeNull();
  });
});