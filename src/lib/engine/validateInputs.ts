import type { GoalProjectionResult, ValidationIssue } from '../types';

import type { FormData } from '../types';

export interface ValidateInputsInput {
  formData: FormData;
  effectiveBodyFatPct: number | null;
  navyBodyFatPct: number | null;
  goalCalories: number;
  tdeeFinal: number;
  projection: GoalProjectionResult | null;
}

const hasHormone = (formData: FormData): boolean => formData.hormonesEnabled && formData.hormones.length > 0;

const hasSemaglutide = (formData: FormData): boolean =>
  formData.hormones.some((hormone) => hormone.compound === 'semaglutide');

export const validateInputs = ({
  formData,
  effectiveBodyFatPct,
  navyBodyFatPct,
  goalCalories,
  tdeeFinal,
  projection,
}: ValidateInputsInput): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  const caloriesFloor = formData.sex === 'female' ? 1200 : 1500;
  if (goalCalories < caloriesFloor) {
    issues.push({
      field: 'goalCalories',
      severity: 'error',
      blocking: true,
      message: `Meta calórica abaixo do limite seguro (${caloriesFloor} kcal).`,
    });
  }

  if (effectiveBodyFatPct !== null) {
    const criticalBf = formData.sex === 'male' ? 4 : 10;
    if (effectiveBodyFatPct < criticalBf) {
      issues.push({
        field: 'bodyFat',
        severity: 'warning',
        blocking: false,
        message: 'BF muito baixo para aplicação geral das fórmulas. Interprete com cautela.',
      });
    }

    if (formData.goal === 'hard_cut' && formData.sex === 'male' && effectiveBodyFatPct < 8) {
      issues.push({
        field: 'goal',
        severity: 'error',
        blocking: true,
        message: 'Hard Cut bloqueado para BF abaixo de 8%. Considere Mini Cut.',
      });
    }
  }

  if (hasSemaglutide(formData) && formData.goal === 'dirty_bulk') {
    issues.push({
      field: 'hormones',
      severity: 'warning',
      blocking: false,
      message: 'Semaglutida com Dirty Bulk é uma combinação contraditória.',
    });
  }

  if (formData.trainingSessions >= 7 && !hasHormone(formData)) {
    issues.push({
      field: 'trainingSessions',
      severity: 'warning',
      blocking: false,
      message: 'Treino 7x/semana sem suporte pode elevar risco de overreaching.',
    });
  }

  if (formData.bodyFatDeclaredPct !== null && navyBodyFatPct !== null) {
    const diff = Math.abs(formData.bodyFatDeclaredPct - navyBodyFatPct);
    if (diff > 5) {
      issues.push({
        field: 'bodyFatDecision',
        severity: 'info',
        blocking: false,
        message: 'Diferença > 5pp entre BF declarado e Navy. Defina a fonte preferida.',
      });
    }
  }

  const deficitPct = tdeeFinal > 0 ? ((tdeeFinal - goalCalories) / tdeeFinal) * 100 : 0;
  if (
    formData.healthConditions.includes('eating_disorder_history') &&
    formData.goal !== 'maintenance' &&
    deficitPct > 20
  ) {
    issues.push({
      field: 'healthConditions',
      severity: 'error',
      blocking: true,
      message: 'Histórico de transtorno alimentar: déficit acima de 20% foi bloqueado.',
    });
  }

  if (formData.age < 18) {
    issues.push({
      field: 'age',
      severity: 'warning',
      blocking: false,
      message: 'As fórmulas são calibradas para adultos e podem perder precisão <18 anos.',
    });
  }

  if (projection?.classification === 'inviavel') {
    issues.push({
      field: 'targetWeeks',
      severity: 'error',
      blocking: true,
      message: `Prazo inviável para a meta atual. Prazo mínimo sugerido: ${projection.weeksMin ?? '-'} semanas.`,
    });
  }

  if (formData.goalMode === 'weight') {
    issues.push({
      field: 'goalMode',
      severity: 'info',
      blocking: false,
      message: 'Meta por peso pode incluir variação de massa magra. BF% tende a ser mais preciso.',
    });
  }

  const isCutGoal = formData.goal === 'hard_cut' || formData.goal === 'mini_cut' || formData.goal === 'recomp';
  if (isCutGoal && formData.targetWeeks !== null && formData.targetWeeks < 2) {
    issues.push({
      field: 'targetWeeks',
      severity: 'warning',
      blocking: false,
      message: 'Prazo abaixo de 2 semanas é insuficiente para mensuração confiável.',
    });
  }

  if (formData.cardioMode === 'both' && formData.stepsPerDay !== null && formData.cardioMinutesPerDay !== null) {
    issues.push({
      field: 'cardioMode',
      severity: 'info',
      blocking: false,
      message: 'Passos e cardio foram deduplicados usando apenas passos residuais acima do baseline.',
    });
  }

  return issues;
};
