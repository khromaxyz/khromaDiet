import { formSteps } from '@/features/form/config/formSteps';
import { initialFormData } from '@/features/form/config/formConfig';
import { parseShareState, serializeShareState } from '../../lib/shareState';
import { useDietForgeStore } from '../../store/useDietForgeStore';

describe('useDietForgeStore', () => {
  beforeEach(() => {
    useDietForgeStore.getState().resetAll();
  });

  it('patches form and updates precision', () => {
    const initialPrecision = useDietForgeStore.getState().precisionPct;

    useDietForgeStore.getState().patchFormData({ bodyFatDeclaredPct: 18 });

    const state = useDietForgeStore.getState();
    expect(state.formData.bodyFatDeclaredPct).toBe(18);
    expect(state.precisionPct).toBeGreaterThanOrEqual(initialPrecision);
  });

  it('reactively increases precision as optional fields are filled', () => {
    const store = useDietForgeStore.getState();
    const base = store.precisionPct;

    store.patchFormData({ bodyFatDeclaredPct: 18 });
    const afterBodyFat = useDietForgeStore.getState().precisionPct;

    store.patchFormData({ cardioMode: 'both', stepsPerDay: 9000, cardioMinutesPerDay: 30 });
    const afterCardio = useDietForgeStore.getState().precisionPct;

    store.patchFormData({ goalMode: 'fat_kg', targetFatKg: 5, targetWeeks: 12 });
    const afterGoal = useDietForgeStore.getState().precisionPct;

    expect(afterBodyFat).toBeGreaterThan(base);
    expect(afterCardio).toBeGreaterThan(afterBodyFat);
    expect(afterGoal).toBeGreaterThan(afterCardio);
  });

  it('computes simulator results and applies simulation', () => {
    const store = useDietForgeStore.getState();
    const baseline = store.computeResults();

    store.patchSimulatorData({ trainingSessions: 6, cardioMinutesPerDay: 45, cardioMode: 'structured' });
    const simulated = useDietForgeStore.getState().simulatorResults;

    expect(simulated).not.toBeNull();
    expect(simulated?.tdeeFinal).not.toBe(baseline.tdeeFinal);

    useDietForgeStore.getState().applySimulator();
    const applied = useDietForgeStore.getState().results;
    expect(applied?.tdeeFinal).toBe(simulated?.tdeeFinal);
  });

  it('serializes and hydrates share payload', () => {
    const goalStepIndex = formSteps.findIndex((step) => step.id === 'goal_timeline') + 1;
    const payload = serializeShareState({
      formData: initialFormData,
      currentStep: goalStepIndex,
      viewMode: 'technical',
    });

    const parsed = parseShareState(payload);
    expect(parsed).not.toBeNull();

    if (!parsed) {
      return;
    }

    useDietForgeStore.getState().hydrateFromShare({
      formData: parsed.formData,
      currentStep: parsed.currentStep,
      viewMode: parsed.viewMode,
    });

    const state = useDietForgeStore.getState();
    expect(state.currentScreen).toBe('dashboard');
    expect(state.currentStep).toBe(goalStepIndex);
  });
});
