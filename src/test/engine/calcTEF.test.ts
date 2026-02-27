import { calcTEF } from '../../lib/engine/calcTEF';

describe('calcTEF', () => {
  it('computes dynamic thermic effect from macro calories', () => {
    const result = calcTEF(800, 1000, 600);

    expect(result.breakdown.protein).toBeCloseTo(200, 1);
    expect(result.breakdown.carb).toBeCloseTo(75, 1);
    expect(result.breakdown.fat).toBeCloseTo(9, 1);
    expect(result.total).toBeCloseTo(284, 1);
  });
});
