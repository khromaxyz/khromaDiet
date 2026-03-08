import { validateInputs } from '../../lib/engine/validateInputs';
import { initialFormData } from '@/features/form/config/formConfig';

describe('validateInputs', () => {
  it('flags low calorie target as blocking error', () => {
    const issues = validateInputs({
      formData: { ...initialFormData, sex: 'female' },
      effectiveBodyFatPct: 18,
      navyBodyFatPct: null,
      goalCalories: 1000,
      tdeeFinal: 2200,
      projection: null,
    });

    expect(issues.some((issue) => issue.field === 'goalCalories' && issue.blocking)).toBe(true);
  });

  it('flags contradictions and infos', () => {
    const issues = validateInputs({
      formData: {
        ...initialFormData,
        goal: 'dirty_bulk',
        hormonesEnabled: true,
        hormones: [{ compound: 'semaglutide', dose: 2 }],
        cardioMode: 'both',
        stepsPerDay: 9000,
        cardioMinutesPerDay: 30,
      },
      effectiveBodyFatPct: 15,
      navyBodyFatPct: 9,
      goalCalories: 2800,
      tdeeFinal: 3000,
      projection: null,
    });

    expect(issues.some((issue) => issue.field === 'hormones')).toBe(true);
    expect(issues.some((issue) => issue.field === 'cardioMode')).toBe(true);
  });
});
