import { experienceOptions, sexOptions } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps } from '../../../../lib/types';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const ProfileStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-4">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Perfil
      </div>
      <h2 className="question-title">Seu perfil de atleta</h2>
      <p className="question-description">
        Sexo biológico e tempo de treino impactam diretamente a resposta anabólica e a taxa de retenção muscular.
      </p>

      <div className="profile-step-block">
        <p className="profile-step-label">Sexo biológico</p>
        <div className="goal-cards-grid goal-cards-grid-2">
          {sexOptions.map((option) => (
            <GoalOptionCard
              key={option.id}
              option={option}
              selected={data.biologicalSex === option.id}
              onSelect={(id) =>
                onPatch({ biologicalSex: id === 'female' ? 'female' : 'male' })
              }
            />
          ))}
        </div>
      </div>

      <div className="profile-step-block profile-step-block-lg">
        <p className="profile-step-label">Tempo de treino de força</p>
        <div className="goal-cards-grid goal-cards-grid-4">
          {experienceOptions.map((option) => (
            <GoalOptionCard
              key={option.id}
              option={option}
              selected={data.liftingExperience === option.id}
              onSelect={(id) => onPatch({ liftingExperience: id })}
            />
          ))}
        </div>
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

