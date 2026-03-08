import type { CalculationResults } from '../types/engine';
import type { FormData, GoalType } from '../types/form';

export interface ProfileSummary {
  tdee: number;
  targetKcal: number;
  deficit: number;
  protein: number;
  carb: number;
  fat: number;
  precisionPct: number;
  estimatedWeeks: number | null;
  bmrMethod: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarId: number;
  createdAt: string;
  lastUpdatedAt: string;
  objective: GoalType;
  formData: FormData;
  results: CalculationResults;
  summary: ProfileSummary;
}

export interface SharedProfileMeta {
  name?: string;
  avatarId?: number;
}
