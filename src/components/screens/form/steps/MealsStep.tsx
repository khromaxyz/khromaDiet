import { sliderTicks } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps } from '../../../../lib/types';

import { FormSliderField } from './FormSliderField';
import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const MealsStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-meals">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - {'Refei\u00e7\u00f5es'}
      </div>
      <h2 className="question-title">
        {'Quantas refei\u00e7\u00f5es por dia?'} <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">{'A distribui\u00e7\u00e3o de macros por refei\u00e7\u00e3o \u00e9 ajustada dinamicamente.'}</p>

      <div className="slider-group">
        <FormSliderField
          id="meals-per-day"
          label={'Refei\u00e7\u00f5es por dia'}
          valueLabel={`${data.mealsPerDay}`}
          min={2}
          max={6}
          step={1}
          value={data.mealsPerDay}
          ticks={sliderTicks.meals}
          onValueChange={(value) => onPatch({ mealsPerDay: value })}
        />
      </div>

      <div className="goal-cards-grid goal-cards-grid-2">
        <GoalOptionCard
          option={{ id: 'fasted-yes', icon: '\u{1F31E}', title: 'Treino em jejum', description: 'Sim, em parte da semana' }}
          selected={data.fastedTraining}
          onSelect={() => onPatch({ fastedTraining: true })}
        />
        <GoalOptionCard
          option={{ id: 'fasted-no', icon: '\u{1F37D}\uFE0F', title: 'Treino alimentado', description: 'N\u00e3o, treino alimentado' }}
          selected={!data.fastedTraining}
          onSelect={() => onPatch({ fastedTraining: false })}
        />
      </div>

      <div className="goal-cards-grid goal-cards-grid-2">
        <GoalOptionCard
          option={{ id: 'plant-yes', icon: '\u{1F331}', title: 'Plant-based estrita', description: 'Dieta 100% vegetal' }}
          selected={data.plantBasedStrict}
          onSelect={() => onPatch({ plantBasedStrict: true })}
        />
        <GoalOptionCard
          option={{ id: 'plant-no', icon: '\u{1F969}', title: 'Dieta tradicional', description: 'Com fontes animais' }}
          selected={!data.plantBasedStrict}
          onSelect={() => onPatch({ plantBasedStrict: false })}
        />
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
