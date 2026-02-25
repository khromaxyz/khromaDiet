import { ActivityStep } from '../../components/screens/form/steps/ActivityStep';
import { GoalStep } from '../../components/screens/form/steps/GoalStep';
import { MeasuresStep } from '../../components/screens/form/steps/MeasuresStep';
import { NutritionStep } from '../../components/screens/form/steps/NutritionStep';
import { ProfileStep } from '../../components/screens/form/steps/ProfileStep';
import { ReviewStep } from '../../components/screens/form/steps/ReviewStep';
import { TargetStep } from '../../components/screens/form/steps/TargetStep';
import type { FormStepDefinition } from '../types';

export const formSteps: FormStepDefinition[] = [
  { id: 'goal', title: 'Objetivo', component: GoalStep },
  { id: 'activity', title: 'Atividade', component: ActivityStep },
  { id: 'measures', title: 'Medidas', component: MeasuresStep },
  { id: 'profile', title: 'Perfil', component: ProfileStep },
  { id: 'nutrition', title: 'Nutrição', component: NutritionStep },
  { id: 'target', title: 'Meta', component: TargetStep },
  { id: 'review', title: 'Revisão', component: ReviewStep },
];

