import { create } from 'zustand';

import type { ScreenId } from '@/app/types';
import { exampleFormData } from '@/features/form/config/exampleFormData';
import { initialFormData } from '@/features/form/config/formConfig';
import { GOAL_TIMELINE_STEP } from '@/features/form/config/formSteps';
import type {
  BfDecision,
  CalculationResults,
  FormData,
  FormPatch,
  ValidationIssue,
  ViewMode,
} from '@/lib/types';

import { cloneFormData, clonePartialFormData, computeForForm, mergeFormData } from './formState';
import type { DietForgeState, ExamplePreviewSnapshot } from './types';

interface DietForgeActions {
  setScreen: (screen: ScreenId) => void;
  setStep: (step: number) => void;
  nextStep: (totalSteps: number) => void;
  prevStep: () => void;
  patchFormData: (patch: FormPatch) => void;
  setViewMode: (mode: ViewMode) => void;
  setBfDecision: (decision: BfDecision) => void;
  resetAll: () => void;
  computeResults: () => CalculationResults;
  patchSimulatorData: (patch: Partial<FormData>) => void;
  clearSimulatorData: () => void;
  computeSimulatorResults: () => CalculationResults;
  applySimulator: () => void;
  setValidationIssues: (issues: ValidationIssue[]) => void;
  hydrateFromShare: (payload: {
    formData: FormData;
    currentStep?: number;
    viewMode?: ViewMode;
    results?: CalculationResults | null;
  }) => void;
  openExamplePreview: () => void;
  restoreFromExamplePreview: () => void;
}

type DietForgeStore = DietForgeState & DietForgeActions;

const buildSnapshot = (state: DietForgeStore): ExamplePreviewSnapshot => ({
  currentScreen: state.currentScreen,
  currentStep: state.currentStep,
  formData: cloneFormData(state.formData),
  results: state.results,
  simulatorData: clonePartialFormData(state.simulatorData),
  simulatorResults: state.simulatorResults,
  viewMode: state.viewMode,
  precisionPct: state.precisionPct,
  validationIssues: state.validationIssues,
  bfDecision: state.bfDecision,
});

const initialComputed = computeForForm(initialFormData);

export const useDietForgeStore = create<DietForgeStore>((set, get) => ({
  currentScreen: 'hero',
  currentStep: 1,
  formData: initialFormData,
  results: initialComputed.results,
  simulatorData: {},
  simulatorResults: null,
  viewMode: 'technical',
  precisionPct: initialComputed.precisionPct,
  validationIssues: initialComputed.results.validations,
  bfDecision: initialFormData.bfDecision,
  isExamplePreview: false,
  snapshotBeforeExample: null,

  setScreen: (screen) => set({ currentScreen: screen }),

  setStep: (step) => set({ currentStep: Math.max(1, step) }),

  nextStep: (totalSteps) =>
    set((state) => ({
      currentStep: Math.min(totalSteps, state.currentStep + 1),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(1, state.currentStep - 1),
    })),

  patchFormData: (patch) =>
    set((state) => {
      const formData = mergeFormData(state.formData, patch);
      const computed = computeForForm(formData);

      return {
        formData,
        precisionPct: computed.precisionPct,
        results:
          state.currentScreen === 'dashboard' || state.currentScreen === 'summary'
            ? computed.results
            : state.results,
        validationIssues: computed.results.validations,
        bfDecision: formData.bfDecision,
      };
    }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setBfDecision: (decision) =>
    set((state) => {
      const formData = { ...state.formData, bfDecision: decision };
      const computed = computeForForm(formData);
      return {
        bfDecision: decision,
        formData,
        precisionPct: computed.precisionPct,
        validationIssues: computed.results.validations,
      };
    }),

  resetAll: () => {
    const computed = computeForForm(initialFormData);
    set({
      currentScreen: 'hero',
      currentStep: 1,
      formData: initialFormData,
      results: computed.results,
      simulatorData: {},
      simulatorResults: null,
      viewMode: 'technical',
      precisionPct: computed.precisionPct,
      validationIssues: computed.results.validations,
      bfDecision: initialFormData.bfDecision,
      isExamplePreview: false,
      snapshotBeforeExample: null,
    });
  },

  computeResults: () => {
    const { formData } = get();
    const computed = computeForForm(formData);
    set({
      results: computed.results,
      precisionPct: computed.precisionPct,
      validationIssues: computed.results.validations,
    });
    return computed.results;
  },

  patchSimulatorData: (patch) =>
    set((state) => {
      const simulatorData = { ...state.simulatorData, ...patch };
      const simulatedForm = mergeFormData(state.formData, simulatorData);
      const computed = computeForForm(simulatedForm);

      return {
        simulatorData,
        simulatorResults: computed.results,
      };
    }),

  clearSimulatorData: () => set({ simulatorData: {}, simulatorResults: null }),

  computeSimulatorResults: () => {
    const { formData, simulatorData } = get();
    const simulatedForm = mergeFormData(formData, simulatorData);
    const computed = computeForForm(simulatedForm);
    set({ simulatorResults: computed.results });
    return computed.results;
  },

  applySimulator: () => {
    const { formData, simulatorData } = get();
    const mergedForm = mergeFormData(formData, simulatorData);
    const computed = computeForForm(mergedForm);

    set({
      formData: mergedForm,
      results: computed.results,
      precisionPct: computed.precisionPct,
      simulatorData: {},
      simulatorResults: null,
      validationIssues: computed.results.validations,
      bfDecision: mergedForm.bfDecision,
    });
  },

  setValidationIssues: (issues) => set({ validationIssues: issues }),

  hydrateFromShare: (payload) => {
    const mergedForm = mergeFormData(initialFormData, payload.formData);
    const computed = computeForForm(mergedForm);

    set({
      currentScreen: 'dashboard',
      currentStep: payload.currentStep ?? GOAL_TIMELINE_STEP,
      formData: mergedForm,
      results: payload.results ?? computed.results,
      simulatorData: {},
      simulatorResults: null,
      viewMode: payload.viewMode ?? 'technical',
      precisionPct: computed.precisionPct,
      validationIssues: computed.results.validations,
      bfDecision: mergedForm.bfDecision,
      isExamplePreview: false,
      snapshotBeforeExample: null,
    });
  },

  openExamplePreview: () =>
    set((state) => {
      if (state.isExamplePreview) {
        return {};
      }

      const previewForm = cloneFormData(exampleFormData);
      const computed = computeForForm(previewForm);

      return {
        snapshotBeforeExample: buildSnapshot(state),
        isExamplePreview: true,
        currentScreen: 'dashboard',
        currentStep: GOAL_TIMELINE_STEP,
        formData: previewForm,
        results: computed.results,
        simulatorData: {},
        simulatorResults: null,
        precisionPct: computed.precisionPct,
        validationIssues: computed.results.validations,
        bfDecision: previewForm.bfDecision,
      };
    }),

  restoreFromExamplePreview: () =>
    set((state) => {
      if (!state.isExamplePreview || !state.snapshotBeforeExample) {
        return {};
      }

      const snapshot = state.snapshotBeforeExample;

      return {
        currentScreen: snapshot.currentScreen,
        currentStep: snapshot.currentStep,
        formData: cloneFormData(snapshot.formData),
        results: snapshot.results,
        simulatorData: clonePartialFormData(snapshot.simulatorData),
        simulatorResults: snapshot.simulatorResults,
        viewMode: snapshot.viewMode,
        precisionPct: snapshot.precisionPct,
        validationIssues: snapshot.validationIssues,
        bfDecision: snapshot.bfDecision,
        isExamplePreview: false,
        snapshotBeforeExample: null,
      };
    }),
}));
