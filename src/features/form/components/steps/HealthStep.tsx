import { healthConditionOptions } from '@/features/form/config/formConfig';
import type { FormStepComponentProps, HealthCondition } from '@/lib/types';

import { GoalOptionCard } from '../GoalOptionCard';
import { StepNav } from '../StepNav';

const normalizeSelection = (selected: HealthCondition[], candidate: HealthCondition): HealthCondition[] => {
  if (candidate === 'none') {
    return ['none'];
  }

  const withoutNone = selected.filter((condition) => condition !== 'none');
  if (withoutNone.includes(candidate)) {
    const remaining = withoutNone.filter((condition) => condition !== candidate);
    return remaining.length === 0 ? ['none'] : remaining;
  }

  return [...withoutNone, candidate];
};

const getHealthIcon = (condition: HealthCondition): string => {
  if (condition === 'insulin_resistance') {
    return '🩸';
  }
  if (condition === 'hypothyroidism') {
    return '🦋';
  }
  if (condition === 'pcos') {
    return '♀️';
  }
  if (condition === 'inflammatory_condition') {
    return '🔥';
  }
  if (condition === 'eating_disorder_history') {
    return '⚠️';
  }
  return '✅';
};

export const HealthStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps, issues }: FormStepComponentProps) => {
  const visibleConditions =
    data.sex === 'female'
      ? healthConditionOptions
      : healthConditionOptions.filter((condition) => condition.id !== 'pcos');

  const blocking = issues.filter((issue) => issue.field === 'healthConditions' && issue.blocking);

  return (
    <div className="question-sub-panel active" id="qpanel-health">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Saúde
      </div>
      <h2 className="question-title">
        Condições de saúde <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">Selecione todas as condições aplicáveis para ajuste fino.</p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {visibleConditions.map((condition) => (
          <GoalOptionCard
            key={condition.id}
            option={{
              id: condition.id,
              icon: getHealthIcon(condition.id),
              title: condition.title,
              description: condition.description,
            }}
            selected={data.healthConditions.includes(condition.id)}
            onSelect={(id) =>
              onPatch({
                healthConditions: normalizeSelection(data.healthConditions, id as HealthCondition),
              })
            }
          />
        ))}
      </div>

      {blocking.length > 0 ? (
        <div className="target-info-card">
          {blocking.map((issue) => (
            <div key={issue.message} className="target-info-row">
              <span className="target-info-icon">!</span>
              <p className="target-info-text">{issue.message}</p>
            </div>
          ))}
        </div>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
