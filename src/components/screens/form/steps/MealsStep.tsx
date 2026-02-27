import { sliderTicks } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps } from '../../../../lib/types';
import { Slider } from '../../../ui/Slider';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const MealsStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-meals">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Refeições
      </div>
      <h2 className="question-title">
        Quantas refeições por dia? <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">A distribuição de macros por refeição é ajustada dinamicamente.</p>

      <div className="slider-group">
        <Slider
          id="meals-per-day"
          label="Refeições/dia"
          valueLabel={`${data.mealsPerDay}`}
          min={2}
          max={6}
          step={1}
          value={data.mealsPerDay}
          ticks={sliderTicks.meals}
          onChange={(event) => onPatch({ mealsPerDay: Number(event.target.value) })}
        />
      </div>

      <div className="goal-cards-grid goal-cards-grid-2">
        <GoalOptionCard
          option={{ id: 'fasted-yes', icon: '🌅', title: 'Treino em jejum', description: 'Sim, em parte da semana' }}
          selected={data.fastedTraining}
          onSelect={() => onPatch({ fastedTraining: true })}
        />
        <GoalOptionCard
          option={{ id: 'fasted-no', icon: '🍽️', title: 'Treino alimentado', description: 'Não, treino alimentado' }}
          selected={!data.fastedTraining}
          onSelect={() => onPatch({ fastedTraining: false })}
        />
      </div>

      <div className="goal-cards-grid goal-cards-grid-2">
        <GoalOptionCard
          option={{ id: 'plant-yes', icon: '🌱', title: 'Plant-based estrita', description: 'Dieta 100% vegetal' }}
          selected={data.plantBasedStrict}
          onSelect={() => onPatch({ plantBasedStrict: true })}
        />
        <GoalOptionCard
          option={{ id: 'plant-no', icon: '🥩', title: 'Dieta tradicional', description: 'Com fontes animais' }}
          selected={!data.plantBasedStrict}
          onSelect={() => onPatch({ plantBasedStrict: false })}
        />
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};