import type { FormStepComponentProps } from '../../../../lib/types';

import { StepNav } from './StepNav';

const buildReviewRows = (data: FormStepComponentProps['data']) => [
  { label: 'Objetivo', title: 'Mini Cut', subtitle: '-465 kcal/dia', tone: 'accent-orange' },
  { label: 'Dieta', title: 'Tradicional', subtitle: '3–5 refeições/dia' },
  {
    label: 'Medidas',
    title: `${data.currentWeight}kg · ${data.height}cm`,
    subtitle: `${data.bodyFat}% BF · ${data.age} anos`,
  },
  {
    label: 'Treino',
    title: `${data.trainingFrequency.value}× / semana`,
    subtitle: `${data.sessionDuration.value} min · ${data.dailySteps.value.toLocaleString('pt-BR')} passos`,
  },
  { label: 'Perfil', title: 'Masculino · Intermediário', subtitle: '3 anos de treino' },
  {
    label: 'Meta',
    title: `${data.targetWeight}kg · ${data.targetBodyFat}% BF`,
    subtitle: `Prazo: ${data.targetWeeks} semanas`,
  },
];

export const ReviewStep = ({ data, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  const items = buildReviewRows(data);

  return (
    <div className="question-sub-panel active" id="qpanel-7">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} — Revisão
      </div>
      <h2 className="question-title">Confirme seus dados</h2>
      <p className="question-description">Revise as informações antes de gerar seu plano personalizado.</p>

      <div className="review-card">
        <div className="review-grid">
          {items.map((item) => (
            <div key={item.label} className="review-item">
              <div className="review-item-label">{item.label}</div>
              <div className="review-item-title">{item.title}</div>
              <div className={item.tone ? `review-item-sub ${item.tone}` : 'review-item-sub'}>
                {item.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      <StepNav onBack={onBack} onNext={onNext} submit />
    </div>
  );
};

