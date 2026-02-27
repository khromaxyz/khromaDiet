import { sliderTicks, trainingTypeOptions } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps, TrainingType } from '../../../../lib/types';
import { Slider } from '../../../ui/Slider';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

export const TrainingStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active training-step-panel" id="qpanel-training">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Treino
      </div>
      <h2 className="question-title">Como é o seu treino semanal?</h2>
      <p className="question-description">Frequência, duração e tipo definem o EAT de treino.</p>

      <div className="slider-group">
        <Slider
          id="training-frequency"
          label="Frequência"
          valueLabel={`${data.trainingSessions}x/sem`}
          min={0}
          max={7}
          step={1}
          value={data.trainingSessions}
          ticks={sliderTicks.trainingFrequency}
          onChange={(event) => onPatch({ trainingSessions: Number(event.target.value) })}
        />

        <Slider
          id="training-duration"
          label="Duração média"
          valueLabel={`${data.trainingDurationMin} min`}
          min={20}
          max={120}
          step={5}
          value={data.trainingDurationMin}
          ticks={sliderTicks.trainingDuration}
          onChange={(event) => onPatch({ trainingDurationMin: Number(event.target.value) })}
        />
      </div>

      <div className="goal-cards-grid goal-cards-grid-3">
        {trainingTypeOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: option.icon,
              title: option.title,
              description: option.description,
              badge: { label: option.badge, tone: 'violet' },
            }}
            selected={data.trainingType === option.id}
            onSelect={(id) => onPatch({ trainingType: id as TrainingType })}
          />
        ))}
      </div>

      <div className="training-scroll-hint">Se estiver no celular, deslize para ver todos os cards de treino.</div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
