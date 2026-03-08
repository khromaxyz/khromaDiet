import type { ScreenId } from '@/app/types';
import type { CalculationResults, ValidationIssue } from '@/lib/types/engine';
import type { BfDecision, FormData, ViewMode } from '@/lib/types/form';

export interface ExamplePreviewSnapshot {
  currentScreen: ScreenId;
  currentStep: number;
  formData: FormData;
  results: CalculationResults | null;
  simulatorData: Partial<FormData>;
  simulatorResults: CalculationResults | null;
  viewMode: ViewMode;
  precisionPct: number;
  validationIssues: ValidationIssue[];
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
  validationIssues: ValidationIssue[];
  bfDecision: BfDecision;
  isExamplePreview: boolean;
  snapshotBeforeExample: ExamplePreviewSnapshot | null;
}
