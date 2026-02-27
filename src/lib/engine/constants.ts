import type {
  ActivityLevel,
  CardioIntensity,
  GoalType,
  OccupationType,
  PrecisionWeightsMap,
  TrainingType,
} from '../types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

export const TRAINING_METS: Record<TrainingType, number> = {
  strength: 5.5,
  hiit: 8.5,
  endurance: 7,
};

export const CARDIO_METS: Record<CardioIntensity, number> = {
  low: 4,
  moderate: 6,
  high: 8,
};

export const BASELINE_STEPS = 5000;

export const OCCUPATION_NEAT_KCAL: Record<OccupationType, number> = {
  sedentary: 0,
  mixed: 50,
  active: 150,
  very_active: 300,
};

export const KCAL_PER_KG_FAT = 7700;

export const GOAL_DELTA_PCT: Record<GoalType, number> = {
  hard_cut: -0.25,
  mini_cut: -0.15,
  recomp: -0.08,
  maintenance: 0,
  lean_bulk: 0.1,
  dirty_bulk: 0.18,
};

export const BASE_PRECISION_WEIGHTS: PrecisionWeightsMap = {
  W01: 0.07,
  W02: 0.04,
  W03: 0.05,
  W04: 0.08,
  W05: 0.05,
  W06: 0.13,
  W07: 0.07,
  W08: 0.07,
  W09: 0.07,
  W10: 0.06,
  W11: 0.08,
  W12: 0.04,
  W13: 0.04,
  W14: 0.05,
  W15: 0.02,
  W16: 0.02,
  W17: 0.02,
  W18: 0.02,
  W19: 0.02,
};

export const PRECISION_FIELD_LABELS: Record<keyof PrecisionWeightsMap, string> = {
  W01: 'objetivo',
  W02: 'sexo biol\u00f3gico',
  W03: 'idade',
  W04: 'peso',
  W05: 'altura',
  W06: 'body fat',
  W07: 'atividade',
  W08: 'treino',
  W09: 'cardio/passos',
  W10: 'horm\u00f4nios',
  W11: 'sa\u00fade',
  W12: 'termog\u00eanicos',
  W13: 'refei\u00e7\u00f5es',
  W14: 'meta e prazo',
  W15: 'ocupa\u00e7\u00e3o profissional',
  W16: 'hist\u00f3rico de d\u00e9ficit',
  W17: 'severidade do d\u00e9ficit',
  W18: 'fase menstrual',
  W19: 'origem \u00e9tnica',
};