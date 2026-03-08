import type { FormStepDefinition, FormStepId } from '@/lib/types';

import { ActivityStep } from '@/features/form/components/steps/ActivityStep';
import { BasicsStep } from '@/features/form/components/steps/BasicsStep';
import { BodyFatStep } from '@/features/form/components/steps/BodyFatStep';
import { CardioStep } from '@/features/form/components/steps/CardioStep';
import { DietHistoryStep } from '@/features/form/components/steps/DietHistoryStep';
import { GoalStep } from '@/features/form/components/steps/GoalStep';
import { GoalTimelineStep } from '@/features/form/components/steps/GoalTimelineStep';
import { HealthStep } from '@/features/form/components/steps/HealthStep';
import { HormonesStep } from '@/features/form/components/steps/HormonesStep';
import { MealsStep } from '@/features/form/components/steps/MealsStep';
import { OccupationStep } from '@/features/form/components/steps/OccupationStep';
import { SexStep } from '@/features/form/components/steps/SexStep';
import { ThermogenicsStep } from '@/features/form/components/steps/ThermogenicsStep';
import { TrainingStep } from '@/features/form/components/steps/TrainingStep';

export const formSteps: FormStepDefinition[] = [
  { id: 'goal', title: 'Objetivo', component: GoalStep },
  { id: 'sex', title: 'Sexo', component: SexStep },
  { id: 'basics', title: 'Dados basicos', component: BasicsStep },
  { id: 'body_fat', title: 'Body Fat', component: BodyFatStep },
  { id: 'diet_history', title: 'Historico de dieta', component: DietHistoryStep },
  { id: 'activity', title: 'Atividade', component: ActivityStep },
  { id: 'occupation', title: 'Ocupacao profissional', component: OccupationStep },
  { id: 'training', title: 'Treino', component: TrainingStep },
  { id: 'cardio', title: 'Cardio', component: CardioStep },
  { id: 'hormones', title: 'Hormonios', component: HormonesStep },
  { id: 'health', title: 'Saude', component: HealthStep },
  { id: 'thermogenics', title: 'Termogenicos', component: ThermogenicsStep },
  { id: 'meals', title: 'Refeicoes', component: MealsStep },
  { id: 'goal_timeline', title: 'Meta e prazo', component: GoalTimelineStep },
];

export const getFormStepNumber = (stepId: FormStepId): number => {
  const index = formSteps.findIndex((step) => step.id === stepId);
  return index >= 0 ? index + 1 : formSteps.length;
};

export const GOAL_TIMELINE_STEP = getFormStepNumber('goal_timeline');
