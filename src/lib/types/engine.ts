import type {
  FormData,
  GoalType,
  PrecisionPresenceMap,
  PrecisionState,
  ThermogenicOption,
  HormoneCompound,
  HealthCondition,
} from './form';

export interface ValidationIssue {
  field: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  blocking: boolean;
}

export interface BmrResult {
  bmr: number;
  method: 'mifflin' | 'katch_mcardle' | 'cunningham' | 'henry';
  lbm: number | null;
  confidenceNote: string;
}

export interface TdeeResult {
  activityMultiplier: number;
  activityBase: number;
  eatTraining: number;
  eatCardioStructured: number;
  eatCardioStepsResidual: number;
  occupationNEAT: number;
  tdeeBase: number;
  deduplicationApplied: boolean;
}

export interface ModifierBreakdown {
  muHorm: number;
  muCond: number;
  muTherm: number;
  muAge: number;
  muCycle: number;
  muTotal: number;
  appliedHormones: HormoneCompound[];
  appliedConditions: HealthCondition[];
  thermogenic: ThermogenicOption;
}

export interface EngineBreakdown {
  bmr: number;
  activityBase: number;
  eatTraining: number;
  eatCardioStructured: number;
  eatCardioStepsResidual: number;
  occupationNEAT: number;
  tef: number;
  modifiers: number;
  tdeeFinal: number;
}

export interface MealMacroDistribution {
  id: string;
  number: string;
  name: string;
  time: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  tag: 'pre' | 'post' | 'standard';
}

export interface MacroTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  floors: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ceilings: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: MealMacroDistribution[];
}

export interface GoalProjectionMilestone {
  week: number;
  weightKg: number;
  bodyFatPct: number | null;
  fatLostKg: number;
  adaptationFactor: number;
  refeed: boolean;
}

export interface GoalProjectionResult {
  classification: 'realista' | 'agressivo' | 'inviavel';
  requiredDailyDelta: number;
  actualDailyDelta: number;
  weeksMin: number | null;
  targetFatKg: number;
  warningTargetWeightIncludesLbm: boolean;
  milestones: GoalProjectionMilestone[];
  refeedWeeks: number[];
}

export interface SupplementSuggestion {
  id: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  icon: string;
  name: string;
  dose: string;
  timing: string;
  glow?: 'lime' | 'violet';
}

export interface BeforeAfterComparison {
  now: {
    weightKg: number;
    bodyFatPct: number | null;
    leanMassKg: number | null;
  };
  projected: {
    week: number;
    weightKg: number;
    bodyFatPct: number | null;
    leanMassKg: number | null;
  };
}

export interface BodyFatInfo {
  value: number | null;
  source: 'declared' | 'photos' | 'navy' | 'estimated' | 'none';
  estimated: boolean;
}

export interface UncertaintyBand {
  weightedModelTdee: number;
  sequentialModelTdee: number;
  difference: number;
  lower: number;
  upper: number;
  showBand: boolean;
  missingFields: string[];
}

export interface CalculationResults {
  bmr: BmrResult;
  bmrMethod: 'mifflin' | 'katch_mcardle' | 'cunningham' | 'henry';
  tdeeRaw: number;
  tdeeEstimated: number;
  tdeeCalibrated: number | null;
  tdeeFinal: number;
  goalDeltaPct: number;
  goalCalories: number;
  dailyDelta: number;
  tefBreakdown: {
    protein: number;
    carb: number;
    fat: number;
  };
  metabolicAdaptation: number;
  occupationNEAT: number;
  confidenceInterval: {
    low: number;
    high: number;
    message: string;
  };
  breakdown: EngineBreakdown;
  modifiers: ModifierBreakdown;
  macros: MacroTargets;
  projection: GoalProjectionResult | null;
  precision: PrecisionState;
  uncertainty: UncertaintyBand;
  validations: ValidationIssue[];
  supplements: SupplementSuggestion[];
  beforeAfter: BeforeAfterComparison | null;
  bodyFatInfo: BodyFatInfo;
  weeklyRateKg: number;
}

export interface EngineInput {
  formData: FormData;
}

export interface PipelineInput {
  formData: FormData;
  precisionState: PrecisionState;
  precisionPresence: PrecisionPresenceMap;
}

export interface AppEngineContext {
  results: CalculationResults;
  issues: ValidationIssue[];
  goal: GoalType;
}
