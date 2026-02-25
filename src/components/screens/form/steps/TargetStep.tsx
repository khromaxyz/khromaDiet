import { NumberField } from '../../../ui/NumberField';
import type { FormStepComponentProps } from '../../../../lib/types';

import { StepNav } from './StepNav';

export const TargetStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  return (
    <div className="question-sub-panel active" id="qpanel-6">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Meta
      </div>
      <h2 className="question-title">
        Qual é o seu peso alvo? <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">
        Se informado, calculamos o prazo estimado e a velocidade de perda/ganho semanal ideal.
      </p>

      <div className="number-inputs-grid number-inputs-grid-3">
        <NumberField
          label="Peso alvo"
          value={data.targetWeight}
          min={30}
          max={250}
          step={0.5}
          unit="kg"
          onChange={(event) => onPatch({ targetWeight: Number(event.target.value) })}
        />
        <NumberField
          label="% BF alvo"
          value={data.targetBodyFat}
          min={3}
          max={35}
          step={0.5}
          unit="%"
          onChange={(event) => onPatch({ targetBodyFat: Number(event.target.value) })}
        />
        <NumberField
          label="Prazo desejado"
          value={data.targetWeeks}
          min={4}
          max={52}
          unit="semanas"
          onChange={(event) => onPatch({ targetWeeks: Number(event.target.value) })}
        />
      </div>

      <div className="target-info-card">
        <div className="target-info-row">
          <span className="target-info-icon">??</span>
          <p className="target-info-text">
            A taxa de perda segura recomendada é de <span className="target-info-highlight">0,5–1% do peso corporal por semana</span> para
            maximizar retenção muscular. Para 80kg, isso equivale a 400–800g/semana.
          </p>
        </div>
      </div>

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

