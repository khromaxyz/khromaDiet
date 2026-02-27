import {
  cardioIntensityOptions,
  cardioModalityOptions,
  cardioModeOptions,
  sliderTicks,
} from '../../../../lib/constants/mockForm';
import type { CardioIntensity, CardioModality, CardioMode, FormStepComponentProps } from '../../../../lib/types';
import { NumberField } from '../../../ui/NumberField';
import { Slider } from '../../../ui/Slider';

import { GoalOptionCard } from './GoalOptionCard';
import { StepNav } from './StepNav';

const STEPS_BENCH_MIN = 2000;
const STEPS_BENCH_MAX = 15000;
const STEPS_STEP = 500;

const stepsSliderTicks = ['2.000', '5.000', '8.000', '11.000', '15.000'];

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const normalizeStepsValue = (value: number): number => {
  const clamped = clamp(Math.round(value), STEPS_BENCH_MIN, STEPS_BENCH_MAX);
  return Math.round(clamped / STEPS_STEP) * STEPS_STEP;
};

const formatSteps = (value: number): string => new Intl.NumberFormat('pt-BR').format(Math.round(value));

const getStepsIntensity = (steps: number): { label: string; tone: 'sedentary' | 'active' | 'very-active' } => {
  if (steps < 6000) {
    return { label: 'Sedentário', tone: 'sedentary' };
  }
  if (steps <= 9500) {
    return { label: 'Ativo', tone: 'active' };
  }
  return { label: 'Muito ativo', tone: 'very-active' };
};

export const CardioStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps, issues }: FormStepComponentProps) => {
  const dedupInfo = issues.find((issue) => issue.field === 'cardioMode' && issue.severity === 'info');
  const stepsValue = normalizeStepsValue(data.stepsPerDay ?? 7000);
  const stepsIntensity = getStepsIntensity(stepsValue);

  return (
    <div className="question-sub-panel active" id="qpanel-cardio">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Cardio
      </div>
      <h2 className="question-title">
        Cardio e passos <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">Você pode usar passos, cardio estruturado ou ambos com deduplicação automática.</p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {cardioModeOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              id: option.id,
              icon: option.icon,
              title: option.title,
              description: option.description,
              accent: option.id === 'steps' ? 'cyan' : option.id === 'structured' ? 'violet' : 'lime',
            }}
            selected={data.cardioMode === option.id}
            onSelect={(id) => onPatch({ cardioMode: id as CardioMode })}
          />
        ))}
      </div>

      {(data.cardioMode === 'steps' || data.cardioMode === 'both') && (
        <div className="number-inputs-grid">
          <NumberField
            id="steps-per-day"
            label="PASSOS POR DIA"
            value={stepsValue}
            min={STEPS_BENCH_MIN}
            max={STEPS_BENCH_MAX}
            step={STEPS_STEP}
            unit="passos"
            unitBadge={{ label: 'MÉDIA', active: true }}
            valueFormatter={formatSteps}
            showStepper={false}
            keyboardStep={{ base: STEPS_STEP, fast: STEPS_STEP * 2 }}
            classificationSlot={
              <div className="steps-value-meta">
                <span className={`steps-intensity-badge steps-intensity-badge-${stepsIntensity.tone}`}>
                  {stepsIntensity.label}
                </span>
                <p className="steps-input-hint">↑↓ Use as setas ou clique</p>
              </div>
            }
            benchmarkSlot={
              <div className="steps-instrument-stack">
                <div className="steps-slider-block">
                  <Slider
                    id="steps-per-day-slider"
                    label="Ajuste no slider"
                    valueLabel={`${formatSteps(stepsValue)} passos`}
                    min={STEPS_BENCH_MIN}
                    max={STEPS_BENCH_MAX}
                    step={STEPS_STEP}
                    value={stepsValue}
                    ticks={stepsSliderTicks}
                    onChange={(event) => onPatch({ stepsPerDay: normalizeStepsValue(Number(event.target.value)) })}
                  />
                </div>
              </div>
            }
            onValueChange={(nextValue) => {
              if (nextValue === null) {
                return;
              }
              onPatch({ stepsPerDay: normalizeStepsValue(nextValue) });
            }}
          />
        </div>
      )}

      {(data.cardioMode === 'structured' || data.cardioMode === 'both') && (
        <>
          <div className="slider-group">
            <Slider
              id="cardio-minutes"
              label="Cardio estruturado"
              valueLabel={`${data.cardioMinutesPerDay ?? 20} min/dia`}
              min={0}
              max={90}
              step={5}
              value={data.cardioMinutesPerDay ?? 20}
              ticks={sliderTicks.cardioMinutes}
              onChange={(event) => onPatch({ cardioMinutesPerDay: Number(event.target.value) })}
            />
          </div>

          <div className="goal-cards-grid goal-cards-grid-3">
            {cardioModalityOptions.map((option) => (
              <GoalOptionCard
                key={option.id}
                option={{
                  id: option.id,
                  icon: '🏃',
                  title: option.title,
                  description: 'Modalidade selecionada',
                }}
                selected={data.cardioModality === option.id}
                onSelect={(id) => onPatch({ cardioModality: id as CardioModality })}
              />
            ))}
          </div>

          <div className="goal-cards-grid goal-cards-grid-3">
            {cardioIntensityOptions.map((option) => (
              <GoalOptionCard
                key={option.id}
                option={{
                  id: option.id,
                  icon: option.id === 'low' ? '🟢' : option.id === 'moderate' ? '🟡' : '🔴',
                  title: option.title,
                  description: 'Nível de esforço',
                  badge: { label: option.badge, tone: 'orange' },
                }}
                selected={data.cardioIntensity === option.id}
                onSelect={(id) => onPatch({ cardioIntensity: id as CardioIntensity })}
              />
            ))}
          </div>
        </>
      )}

      {dedupInfo ? (
        <div className="target-info-card">
          <div className="target-info-row">
            <span className="target-info-icon">i</span>
            <p className="target-info-text">{dedupInfo.message}</p>
          </div>
        </div>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};
