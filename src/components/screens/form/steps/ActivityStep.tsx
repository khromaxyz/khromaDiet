import { Slider } from '../../../ui/Slider';
import { sliderTicks, stressLabels } from '../../../../lib/constants/mockForm';
import type { FormStepComponentProps } from '../../../../lib/types';

import { StepNav } from './StepNav';

const formatSteps = (value: number) => value.toLocaleString('pt-BR');

export const ActivityStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-2">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Atividade
      </div>
      <h2 className="question-title">Qual é o seu nível de atividade?</h2>
      <p className="question-description">
        Isso determina seu NEAT e EAT — os dois maiores componentes do seu TDEE.
      </p>

      <div className="slider-group">
        <Slider
          id="slider-freq"
          label="Frequência de treino"
          valueLabel={`${data.trainingFrequency.value}× / semana`}
          min={data.trainingFrequency.min}
          max={data.trainingFrequency.max}
          step={data.trainingFrequency.step}
          value={data.trainingFrequency.value}
          ticks={sliderTicks.frequency}
          onChange={(event) => {
            onPatch({
              trainingFrequency: {
                ...data.trainingFrequency,
                value: Number(event.target.value),
              },
            });
          }}
        />
        <Slider
          id="slider-dur"
          label="Duração média por sessão"
          valueLabel={`${data.sessionDuration.value} min`}
          min={data.sessionDuration.min}
          max={data.sessionDuration.max}
          step={data.sessionDuration.step}
          value={data.sessionDuration.value}
          ticks={sliderTicks.duration}
          onChange={(event) => {
            onPatch({
              sessionDuration: {
                ...data.sessionDuration,
                value: Number(event.target.value),
              },
            });
          }}
        />
        <Slider
          id="slider-steps"
          label="Passos diários (NEAT / cardio)"
          valueLabel={formatSteps(data.dailySteps.value)}
          min={data.dailySteps.min}
          max={data.dailySteps.max}
          step={data.dailySteps.step}
          value={data.dailySteps.value}
          ticks={sliderTicks.steps}
          onChange={(event) => {
            onPatch({
              dailySteps: {
                ...data.dailySteps,
                value: Number(event.target.value),
              },
            });
          }}
        />
        <Slider
          id="slider-stress"
          label="Nível de estresse geral"
          valueLabel={stressLabels[data.stressLevel.value - 1] ?? 'Moderado'}
          min={data.stressLevel.min}
          max={data.stressLevel.max}
          step={data.stressLevel.step}
          value={data.stressLevel.value}
          ticks={sliderTicks.stress}
          onChange={(event) => {
            onPatch({
              stressLevel: {
                ...data.stressLevel,
                value: Number(event.target.value),
              },
            });
          }}
        />
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

