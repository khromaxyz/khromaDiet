import { activityOptions } from '../../../../lib/constants/mockForm';
import type { ActivityLevel, FormStepComponentProps } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

const activityIconMap: Record<ActivityLevel, string> = {
  sedentary: '\u{1FA91}',
  light: '\u{1F6B6}',
  moderate: '\u{1F3C3}',
  very_active: '\u{1F3CB}\uFE0F',
  athlete: '\u{1F947}',
};

export const ActivityStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-activity">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Atividade
      </div>
      <h2 className="question-title">Qual é seu nível de atividade diária?</h2>
      <p className="question-description">Esse fator ajusta o componente base do TDEE (NEAT + rotina).</p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {activityOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: activityIconMap[option.id] ?? option.icon,
              title: option.title,
              description: option.description,
              badge: { label: option.badge, tone: 'cyan' },
            }}
            selected={data.activityLevel === option.id}
            onSelect={(id) => onPatch({ activityLevel: id as ActivityLevel })}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
