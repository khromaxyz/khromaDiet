import { ActivityStep } from '../../components/screens/form/steps/ActivityStep';
import { BasicsStep } from '../../components/screens/form/steps/BasicsStep';
import { BodyFatStep } from '../../components/screens/form/steps/BodyFatStep';
import { CardioStep } from '../../components/screens/form/steps/CardioStep';
import { DietHistoryStep } from '../../components/screens/form/steps/DietHistoryStep';
import { GoalStep } from '../../components/screens/form/steps/GoalStep';
import { GoalTimelineStep } from '../../components/screens/form/steps/GoalTimelineStep';
import { HealthStep } from '../../components/screens/form/steps/HealthStep';
import { HormonesStep } from '../../components/screens/form/steps/HormonesStep';
import { MealsStep } from '../../components/screens/form/steps/MealsStep';
import { OccupationStep } from '../../components/screens/form/steps/OccupationStep';
import { SexStep } from '../../components/screens/form/steps/SexStep';
import { ThermogenicsStep } from '../../components/screens/form/steps/ThermogenicsStep';
import { TrainingStep } from '../../components/screens/form/steps/TrainingStep';
import type { FormStepDefinition } from '../types';

export const formSteps: FormStepDefinition[] = [
  { id: 'goal', title: 'Objetivo', component: GoalStep },
  { id: 'sex', title: 'Sexo', component: SexStep },
  { id: 'basics', title: 'Dados básicos', component: BasicsStep },
  { id: 'body_fat', title: 'Body Fat', component: BodyFatStep },
  { id: 'diet_history', title: 'Histórico de dieta', component: DietHistoryStep },
  { id: 'activity', title: 'Atividade', component: ActivityStep },
  { id: 'occupation', title: 'Ocupação profissional', component: OccupationStep },
  { id: 'training', title: 'Treino', component: TrainingStep },
  { id: 'cardio', title: 'Cardio', component: CardioStep },
  { id: 'hormones', title: 'Hormônios', component: HormonesStep },
  { id: 'health', title: 'Saúde', component: HealthStep },
  { id: 'thermogenics', title: 'Termogênicos', component: ThermogenicsStep },
  { id: 'meals', title: 'Refeições', component: MealsStep },
  { id: 'goal_timeline', title: 'Meta e prazo', component: GoalTimelineStep },
];
