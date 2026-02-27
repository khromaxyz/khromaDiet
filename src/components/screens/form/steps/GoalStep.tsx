import { goalOptions } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps, GoalType } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const GoalStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-goal">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Objetivo
      </div>
      <h2 className="question-title">Qual é o seu objetivo principal?</h2>
      <p className="question-description">Esse objetivo define o déficit/superávit aplicado no plano.</p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {goalOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={option}
            selected={data.goal === option.id}
            onSelect={(id) => onPatch({ goal: id as GoalType })}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
