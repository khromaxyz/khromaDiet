import type { ComponentType } from 'react';
import type { DietFormState, FormStepId } from './form';

export interface FormStepComponentProps {
  data: DietFormState;
  onPatch: (patch: Partial<DietFormState>) => void;
  onNext: () => void;
  onBack: () => void;
  stepIndex: number;
  totalSteps: number;
}

export interface FormStepDefinition {
  id: FormStepId;
  title: string;
  component: ComponentType<FormStepComponentProps>;
}

