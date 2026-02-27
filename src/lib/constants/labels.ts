import type {
  ActivityLevel,
  CardioIntensity,
  CardioModality,
  CardioMode,
  DeficitHistory,
  DeficitSeverity,
  Ethnicity,
  GoalMetricMode,
  GoalType,
  HealthCondition,
  HormoneCompound,
  MenstrualPhase,
  OccupationType,
  SexType,
  ThermogenicOption,
  TrainingType,
} from '../types';

export const GOAL_LABELS: Record<GoalType, string> = {
  hard_cut: 'Hard Cut',
  mini_cut: 'Mini Cut',
  recomp: 'Recomposi\u00e7\u00e3o',
  maintenance: 'Manuten\u00e7\u00e3o',
  lean_bulk: 'Lean Bulk',
  dirty_bulk: 'Dirty Bulk',
};

export const SEX_LABELS: Record<SexType, string> = {
  male: 'Masculino',
  female: 'Feminino',
};

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedent\u00e1rio',
  light: 'Levemente ativo',
  moderate: 'Moderadamente ativo',
  very_active: 'Muito ativo',
  athlete: 'Atleta',
};

export const TRAINING_TYPE_LABELS: Record<TrainingType, string> = {
  strength: 'For\u00e7a/Hipertrofia',
  hiit: 'HIIT/Cross',
  endurance: 'Endurance',
};

export const CARDIO_MODE_LABELS: Record<CardioMode, string> = {
  steps: 'Passos/dia',
  structured: 'Cardio estruturado',
  both: 'Ambos',
};

export const CARDIO_MODALITY_LABELS: Record<CardioModality, string> = {
  treadmill: 'Esteira',
  bike: 'Bike',
  elliptical: 'El\u00edptico',
  swimming: 'Nata\u00e7\u00e3o',
  hiit: 'HIIT',
};

export const CARDIO_INTENSITY_LABELS: Record<CardioIntensity, string> = {
  low: 'Baixa',
  moderate: 'Moderada',
  high: 'Alta',
};

export const THERMOGENIC_LABELS: Record<ThermogenicOption, string> = {
  none: 'Nenhum',
  caffeine: 'Cafe\u00edna',
  eca: 'ECA stack',
};

export const HEALTH_CONDITION_LABELS: Record<HealthCondition, string> = {
  insulin_resistance: 'Resist\u00eancia \u00e0 insulina',
  hypothyroidism: 'Hipotireoidismo',
  pcos: 'SOP/PCOS',
  inflammatory_condition: 'Condi\u00e7\u00e3o inflamat\u00f3ria',
  eating_disorder_history: 'Hist\u00f3rico de transtorno alimentar',
  none: 'Nenhuma',
};

export const HORMONE_LABELS: Record<HormoneCompound, string> = {
  testosterone: 'Testosterona',
  oxandrolone: 'Oxandrolona',
  deca: 'Deca',
  tren: 'Trembolona',
  boldenone: 'Boldenona',
  gh: 'GH',
  semaglutide: 'Semaglutida',
  other: 'Outro',
};

export const GOAL_MODE_LABELS: Record<GoalMetricMode, string> = {
  weight: 'Peso alvo',
  bf: 'BF% alvo',
  fat_kg: 'Kg de gordura',
};

export const OCCUPATION_TYPE_LABELS: Record<OccupationType, string> = {
  sedentary: 'Sedent\u00e1rio',
  mixed: 'Misto',
  active: 'Ativo',
  very_active: 'Muito ativo',
};

export const DEFICIT_HISTORY_LABELS: Record<DeficitHistory, string> = {
  none: 'N\u00e3o est\u00e1 em d\u00e9ficit',
  lt4weeks: 'H\u00e1 menos de 4 semanas',
  '1to3months': 'H\u00e1 1 a 3 meses',
  gt3months: 'H\u00e1 mais de 3 meses',
};

export const DEFICIT_SEVERITY_LABELS: Record<DeficitSeverity, string> = {
  light: 'Leve',
  moderate: 'Moderado',
  aggressive: 'Agressivo',
};

export const MENSTRUAL_PHASE_LABELS: Record<MenstrualPhase, string> = {
  follicular: 'Fase folicular',
  luteal: 'Fase l\u00fatea',
  unknown: 'N\u00e3o sei / N\u00e3o aplica',
};

export const ETHNICITY_LABELS: Record<Ethnicity, string> = {
  western: 'Ocidental/Europeia',
  asian: 'Asi\u00e1tica/Oriental',
  african: 'Africana',
  latin: 'Latino-americana',
  unspecified: 'Prefiro n\u00e3o informar',
};

export const PROJECTION_CLASSIFICATION_LABELS = {
  realista: 'Classifica\u00e7\u00e3o: realista',
  agressivo: 'Classifica\u00e7\u00e3o: agressivo',
  inviavel: 'Classifica\u00e7\u00e3o: invi\u00e1vel',
} as const;