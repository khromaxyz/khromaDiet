export interface EngineInput {
  form: import('./form').DietFormState;
}

export interface EngineOutput {
  tdee: number;
  goalCalories: number;
  dailyDeficit: number;
  bmr: number;
  leanBodyMass: number;
  tef: number;
}

