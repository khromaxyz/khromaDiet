import type { CalculationResults } from './engine';
import type { BfDecision, FormData, ViewMode } from './form';

export type ScreenId = 'hero' | 'form' | 'profile_create' | 'summary' | 'dashboard';

export interface ScreenDefinition {
  id: ScreenId;
  title: string;
}

export interface ExamplePreviewSnapshot {
  currentScreen: ScreenId;
  currentStep: number;
  formData: FormData;
  results: CalculationResults | null;
  simulatorData: Partial<FormData>;
  simulatorResults: CalculationResults | null;
  viewMode: ViewMode;
  precisionPct: number;
  validationIssues: import('./engine').ValidationIssue[];
  bfDecision: BfDecision;
}

export interface DietForgeState {
  currentScreen: ScreenId;
  currentStep: number;
  formData: FormData;
  results: CalculationResults | null;
  simulatorData: Partial<FormData>;
  simulatorResults: CalculationResults | null;
  viewMode: ViewMode;
  precisionPct: number;
  validationIssues: import('./engine').ValidationIssue[];
  bfDecision: BfDecision;
  isExamplePreview: boolean;
  snapshotBeforeExample: ExamplePreviewSnapshot | null;
}
