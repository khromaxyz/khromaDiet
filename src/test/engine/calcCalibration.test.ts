import { calcRealTDEE } from '../../lib/engine/calcCalibration';

describe('calcRealTDEE', () => {
  it('uses 4750 kcal/kg in the first 4 weeks', () => {
    const result = calcRealTDEE(2200, -1, 2);
    expect(result).toBeCloseTo(1860.7, 1);
  });

  it('uses 6000 kcal/kg between week 5 and 12', () => {
    const result = calcRealTDEE(2200, -1, 8);
    expect(result).toBeCloseTo(2092.9, 1);
  });

  it('uses 7000 kcal/kg after 12 weeks', () => {
    const result = calcRealTDEE(2200, -1, 20);
    expect(result).toBeCloseTo(2150, 1);
  });
});
