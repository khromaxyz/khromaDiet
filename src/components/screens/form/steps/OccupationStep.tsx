import { occupationTypeOptions } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps, OccupationType } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

const occupationIconMap: Record<OccupationType, string> = {
  sedentary: '\u{1FA91}',
  mixed: '\u{1F6B6}',
  active: '\u{1F3D7}\uFE0F',
  very_active: '\u2692\uFE0F',
};

export const OccupationStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  const selectedOccupation = data.occupationType ?? 'sedentary';

  return (
    <div className="question-sub-panel active" id="qpanel-occupation">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Ocupação profissional
      </div>
      <h2 className="question-title">Como é seu trabalho no dia a dia?</h2>
      <p className="question-description">O tipo de trabalho afeta o gasto energético além do exercício.</p>

      <div className="goal-cards-grid goal-cards-grid-2">
        {occupationTypeOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: occupationIconMap[option.id] ?? option.icon,
              title: option.title,
              description: option.description,
            }}
            selected={selectedOccupation === option.id}
            onSelect={(id) => onPatch({ occupationType: id as OccupationType })}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
