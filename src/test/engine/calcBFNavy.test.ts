import { calcBFNavy } from '../../lib/engine/calcBFNavy';

describe('calcBFNavy', () => {
  it('calculates male body fat with valid geometry', () => {
    const result = calcBFNavy({
      sex: 'male',
      heightCm: 178,
      neckCm: 40,
      waistCm: 84,
      hipCm: null,
    });

    expect(result).not.toBeNull();
    expect(result).toBeGreaterThan(5);
    expect(result).toBeLessThan(25);
  });

  it('returns null on invalid geometry', () => {
    const result = calcBFNavy({
      sex: 'female',
      heightCm: 165,
      neckCm: 150,
      waistCm: 70,
      hipCm: 80,
    });

    expect(result).toBeNull();
  });
});
