import { nutritionOptions } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const NutritionStep = ({
  data,
  onPatch,
  onNext,
  onBack,
  stepIndex,
  totalSteps,
}: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-5">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Abordagem nutricional
      </div>
      <h2 className="question-title">Qual abordagem alimentar você prefere?</h2>
      <p className="question-description">
        Isso não altera calorias, mas define a distribuição de macros e timing de refeições.
      </p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {nutritionOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={option}
            selected={data.nutritionApproach === option.id}
            onSelect={(id) => onPatch({ nutritionApproach: id })}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

