import { calcMetabolicAdaptation } from '../../lib/engine/calcMetabolicAdaptation';

describe('calcMetabolicAdaptation', () => {
  it('returns zero for none and short deficits', () => {
    expect(calcMetabolicAdaptation('none', 'aggressive')).toBe(0);
    expect(calcMetabolicAdaptation('lt4weeks', 'moderate')).toBe(0);
  });

  it('returns documented values for 1to3months', () => {
    expect(calcMetabolicAdaptation('1to3months', 'light')).toBe(-50);
    expect(calcMetabolicAdaptation('1to3months', 'moderate')).toBe(-75);
    expect(calcMetabolicAdaptation('1to3months', 'aggressive')).toBe(-150);
  });

  it('returns documented values for gt3months', () => {
    expect(calcMetabolicAdaptation('gt3months', 'light')).toBe(-75);
    expect(calcMetabolicAdaptation('gt3months', 'moderate')).toBe(-100);
    expect(calcMetabolicAdaptation('gt3months', 'aggressive')).toBe(-200);
  });
});
