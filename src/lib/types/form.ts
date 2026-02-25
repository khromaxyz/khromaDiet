export type FormStepId =
  | 'goal'
  | 'activity'
  | 'measures'
  | 'profile'
  | 'nutrition'
  | 'target'
  | 'review';

export interface GoalOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: {
    label: string;
    tone: 'lime' | 'violet' | 'cyan' | 'orange' | 'red' | 'green';
  };
}

export interface SliderValue {
  value: number;
  min: number;
  max: number;
  step?: number;
}

export interface DietFormState {
  goalId: string;
  trainingFrequency: SliderValue;
  sessionDuration: SliderValue;
  dailySteps: SliderValue;
  stressLevel: SliderValue;
  age: number;
  currentWeight: number;
  height: number;
  bodyFat: number;
  biologicalSex: 'male' | 'female';
  liftingExperience: string;
  nutritionApproach: string;
  targetWeight: number;
  targetBodyFat: number;
  targetWeeks: number;
}

export interface FormPatch {
  [key: string]: string | number | SliderValue;
}

