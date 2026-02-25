import { NumberField } from '../../../ui/NumberField';
import type { FormStepComponentProps } from '../../../../lib/types';

import { StepNav } from './StepNav';

export const MeasuresStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-3">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Medidas corporais
      </div>
      <h2 className="question-title">Suas medidas</h2>
      <p className="question-description">
        Usados no cálculo do BMR pelo método Katch-McArdle via estimativa de LBM.
      </p>

      <div className="number-inputs-grid">
        <NumberField
          label="Idade"
          value={data.age}
          min={14}
          max={90}
          unit="anos"
          onChange={(event) => onPatch({ age: Number(event.target.value) })}
        />
        <NumberField
          label="Peso Atual"
          value={data.currentWeight}
          min={30}
          max={250}
          step={0.1}
          unit="kg"
          onChange={(event) => onPatch({ currentWeight: Number(event.target.value) })}
        />
        <NumberField
          label="Altura"
          value={data.height}
          min={140}
          max={220}
          unit="cm"
          onChange={(event) => onPatch({ height: Number(event.target.value) })}
        />
        <NumberField
          label="% Gordura"
          optionalLabel="Estimado"
          value={data.bodyFat}
          min={3}
          max={60}
          step={0.5}
          unit="%BF"
          onChange={(event) => onPatch({ bodyFat: Number(event.target.value) })}
        />
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

