import { deficitHistoryOptions, deficitSeverityOptions } from '@/features/form/config/formConfig';
import type { DeficitHistory, DeficitSeverity, FormStepComponentProps } from '@/lib/types';

import { GoalOptionCard } from '../GoalOptionCard';
import { StepNav } from '../StepNav';

const deficitHistoryIconMap: Record<DeficitHistory, string> = {
  none: '\u{1F7F0}',
  lt4weeks: '\u{1F552}',
  '1to3months': '\u{1F4C6}',
  gt3months: '\u23F3',
};

const deficitSeverityIconMap: Record<DeficitSeverity, string> = {
  light: '\u{1F7E2}',
  moderate: '\u{1F7E0}',
  aggressive: '\u{1F534}',
};

export const DietHistoryStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  const history = data.deficitHistory ?? 'none';
  const shouldShowSeverity = history !== 'none';
  const severity = data.deficitSeverity ?? 'light';

  return (
    <div className="question-sub-panel active" id="qpanel-diet-history">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Histórico de dieta
      </div>
      <h2 className="question-title">Você está em déficit calórico atualmente?</h2>
      <p className="question-description">Restrições prolongadas reduzem o metabolismo e precisam ser compensadas.</p>

      <div className="goal-cards-grid goal-cards-grid-2">
        {deficitHistoryOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: deficitHistoryIconMap[option.id] ?? option.icon,
              title: option.title,
              description: option.description,
            }}
            selected={history === option.id}
            onSelect={(id) =>
              onPatch({
                deficitHistory: id as DeficitHistory,
                deficitSeverity: id === 'none' ? 'light' : data.deficitSeverity,
              })
            }
          />
        ))}
      </div>

      {shouldShowSeverity ? (
        <>
          <h3 className="question-title">Qual a intensidade desse déficit?</h3>
          <div className="goal-cards-grid goal-cards-grid-3">
            {deficitSeverityOptions.map((option) => (
              <GoalOptionCard
                key={option.id}
                option={{
                  id: option.id,
                  icon: deficitSeverityIconMap[option.id] ?? option.icon,
                  title: option.title,
                  description: option.description,
                }}
                selected={severity === option.id}
                onSelect={(id) => onPatch({ deficitSeverity: id as DeficitSeverity })}
              />
            ))}
          </div>
        </>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

