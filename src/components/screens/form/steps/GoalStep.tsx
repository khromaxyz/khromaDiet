import { primaryGoals } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const GoalStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-1">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Objetivo
      </div>
      <h2 className="question-title">Qual é o seu objetivo principal?</h2>
      <p className="question-description">
        Isso define o protocolo de calorias e macros que será aplicado no seu plano.
      </p>

      <div className="goal-cards-grid">
        {primaryGoals.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={option}
            selected={data.goalId === option.id}
            onSelect={(id) => onPatch({ goalId: id })}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

