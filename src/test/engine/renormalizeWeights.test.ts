import { renormalizeWeights } from '../../lib/engine/renormalizeWeights';

describe('renormalizeWeights', () => {
  it('renormalizes present weights to sum 1 and computes precision', () => {
    const result = renormalizeWeights({
      W01: true,
      W02: true,
      W03: true,
      W04: true,
      W05: true,
      W06: false,
      W07: true,
      W08: true,
      W09: false,
      W10: false,
      W11: false,
      W12: false,
      W13: true,
      W14: false,
      W15: false,
      W16: false,
      W17: false,
      W18: false,
      W19: false,
    });

    const sum = Object.values(result.normalizedWeights).reduce((acc, value) => acc + value, 0);
    expect(sum).toBeCloseTo(1, 4);
    expect(result.precisionPct).toBeLessThan(100);
    expect(result.missingKeys.length).toBeGreaterThan(0);
  });
});