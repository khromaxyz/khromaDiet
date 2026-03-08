export type GoalType = 'hard_cut' | 'mini_cut' | 'recomp' | 'maintenance' | 'lean_bulk' | 'dirty_bulk';

export type SexType = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'athlete';

export type TrainingType = 'strength' | 'hiit' | 'endurance';

export type CardioMode = 'steps' | 'structured' | 'both';

export type CardioModality = 'treadmill' | 'bike' | 'elliptical' | 'swimming' | 'hiit';

export type CardioIntensity = 'low' | 'moderate' | 'high';

export type BodyFatMode = 'declared' | 'photos' | 'navy';

export type BfDecision = 'declared' | 'navy' | null;

export type HormoneCompound =
  | 'testosterone'
  | 'oxandrolone'
  | 'deca'
  | 'tren'
  | 'boldenone'
  | 'gh'
  | 'semaglutide'
  | 'other';

export type CyclePhase = 'start' | 'middle' | 'end' | 'pct';

export type OccupationType = 'sedentary' | 'mixed' | 'active' | 'very_active';

export type DeficitHistory = 'none' | 'lt4weeks' | '1to3months' | 'gt3months';

export type DeficitSeverity = 'light' | 'moderate' | 'aggressive';

export type MenstrualPhase = 'follicular' | 'luteal' | 'unknown';

export type Ethnicity = 'western' | 'asian' | 'african' | 'latin' | 'unspecified';

export type HealthCondition =
  | 'insulin_resistance'
  | 'hypothyroidism'
  | 'pcos'
  | 'inflammatory_condition'
  | 'eating_disorder_history'
  | 'none';

export type ThermogenicOption = 'none' | 'caffeine' | 'eca';

export type GoalMetricMode = 'weight' | 'bf' | 'fat_kg';

export type ViewMode = 'simple' | 'technical';

export interface HormoneSelection {
  compound: HormoneCompound;
  dose: number;
}

export interface FormData {
  goal: GoalType;
  sex: SexType;
  age: number;
  weightKg: number;
  heightCm: number;
  bodyFatMode: BodyFatMode;
  bodyFatDeclaredPct: number | null;
  bodyFatPhotoPresetPct: number | null;
  navyNeckCm: number | null;
  navyWaistCm: number | null;
  navyHipCm: number | null;
  bfDecision: BfDecision;
  activityLevel: ActivityLevel;
  trainingSessions: number;
  trainingType: TrainingType;
  trainingDurationMin: number;
  cardioMode: CardioMode;
  stepsPerDay: number | null;
  cardioMinutesPerDay: number | null;
  cardioModality: CardioModality;
  cardioIntensity: CardioIntensity;
  hormonesEnabled: boolean;
  hormones: HormoneSelection[];
  cyclePhase: CyclePhase;
  occupationType?: OccupationType;
  deficitHistory?: DeficitHistory;
  deficitSeverity?: DeficitSeverity;
  menstrualPhase?: MenstrualPhase;
  ethnicity?: Ethnicity;
  calibratedTdeeKcal?: number | null;
  healthConditions: HealthCondition[];
  thermogenic: ThermogenicOption;
  mealsPerDay: number;
  fastedTraining: boolean;
  plantBasedStrict: boolean;
  goalMode: GoalMetricMode;
  targetWeightKg: number | null;
  targetBodyFatPct: number | null;
  targetFatKg: number | null;
  targetWeeks: number | null;
}

export type FormPatch = {
  [K in keyof FormData]?: FormData[K] | undefined;
};

export type PrecisionWeightKey =
  | 'W01'
  | 'W02'
  | 'W03'
  | 'W04'
  | 'W05'
  | 'W06'
  | 'W07'
  | 'W08'
  | 'W09'
  | 'W10'
  | 'W11'
  | 'W12'
  | 'W13'
  | 'W14'
  | 'W15'
  | 'W16'
  | 'W17'
  | 'W18'
  | 'W19';

export type PrecisionWeightsMap = Record<PrecisionWeightKey, number>;

export type PrecisionPresenceMap = Record<PrecisionWeightKey, boolean>;

export interface PrecisionState {
  precisionPct: number;
  normalizedWeights: PrecisionWeightsMap;
  presentWeights: number;
  missingKeys: PrecisionWeightKey[];
}
