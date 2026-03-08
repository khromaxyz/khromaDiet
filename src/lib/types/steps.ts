import type { ComponentType, ReactNode } from 'react';

import type { ValidationIssue } from './engine';
import type { FormData, FormPatch } from './form';

export type FormStepId =
  | 'goal'
  | 'sex'
  | 'basics'
  | 'body_fat'
  | 'diet_history'
  | 'activity'
  | 'occupation'
  | 'training'
  | 'cardio'
  | 'hormones'
  | 'health'
  | 'thermogenics'
  | 'meals'
  | 'goal_timeline';

export interface GoalOption {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  accent?: 'red' | 'orange' | 'violet' | 'green' | 'cyan' | 'lime' | 'blue';
  badge?: {
    label: string;
    tone: 'lime' | 'violet' | 'cyan' | 'orange' | 'red' | 'green';
  };
}

export interface FormStepComponentProps {
  data: FormData;
  onPatch: (patch: FormPatch) => void;
  onNext: () => void;
  onBack: () => void;
  stepIndex: number;
  totalSteps: number;
  issues: ValidationIssue[];
}

export interface FormStepDefinition {
  id: FormStepId;
  title: string;
  component: ComponentType<FormStepComponentProps>;
}
