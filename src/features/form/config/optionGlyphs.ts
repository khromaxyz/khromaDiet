import type { CardioMode, GoalType, ThermogenicOption, TrainingType } from '@/lib/types';

export const GOAL_ICONS: Record<GoalType, string> = {
  hard_cut: '🔥',
  mini_cut: '✂️',
  recomp: '⚖️',
  maintenance: '🎯',
  lean_bulk: '💪',
  dirty_bulk: '🏆',
};

export const TRAINING_ICONS: Record<TrainingType, string> = {
  strength: '🏋️',
  hiit: '⚡',
  endurance: '🚴',
};

export const CARDIO_MODE_ICONS: Record<CardioMode, string> = {
  steps: '👟',
  structured: '📊',
  both: '🔄',
};

export const THERMOGENIC_ICONS: Record<ThermogenicOption, string> = {
  none: '🧊',
  caffeine: '☕',
  eca: '🔥',
};
