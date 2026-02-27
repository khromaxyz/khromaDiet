import { thermogenicOptions } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps, ThermogenicOption } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const ThermogenicsStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-thermogenic">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Termogênicos
      </div>
      <h2 className="question-title">
        Termogênicos <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">Aplicamos ajuste de +4% para cafeína e +9% para ECA stack.</p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {thermogenicOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: option.icon,
              title: option.title,
              description: option.description,
            }}
            selected={data.thermogenic === option.id}
            onSelect={(id) => onPatch({ thermogenic: id as ThermogenicOption })}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};