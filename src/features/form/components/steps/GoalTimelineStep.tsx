import { useEffect, useMemo, useState } from 'react';

import { goalModeOptions, sliderTicks } from '@/features/form/config/formConfig';
import { derivePrecisionPresence, runPipeline } from '@/lib/engine/runPipeline';
import { renormalizeWeights } from '@/lib/engine/renormalizeWeights';
import type { FormStepComponentProps, GoalMetricMode } from '@/lib/types';
import { NumberField } from '@/features/form/components/fields/NumberField';

import { FormSliderField } from '../FormSliderField';
import { GoalOptionCard } from '../GoalOptionCard';
import { StepNav } from '../StepNav';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getViabilityPct = ({
  requiredDailyDelta,
  goal,
  hormonesEnabled,
}: {
  requiredDailyDelta: number;
  goal: FormStepComponentProps['data']['goal'];
  hormonesEnabled: boolean;
}): number => {
  const cutGoal = goal === 'hard_cut' || goal === 'mini_cut' || goal === 'recomp';
  const realisticLimit = cutGoal ? (hormonesEnabled ? 750 : 500) : 350;
  const aggressiveLimit = cutGoal ? (hormonesEnabled ? 1000 : 750) : 500;
  const requiredAbs = Math.abs(requiredDailyDelta);

  if (requiredAbs <= realisticLimit) {
    const ratio = requiredAbs / realisticLimit;
    return clamp(Math.round(100 - ratio * 18), 82, 100);
  }

  if (requiredAbs <= aggressiveLimit) {
    const ratio = (requiredAbs - realisticLimit) / (aggressiveLimit - realisticLimit);
    return clamp(Math.round(82 - ratio * 32), 50, 82);
  }

  const ratio = (requiredAbs - aggressiveLimit) / aggressiveLimit;
  return clamp(Math.round(50 - ratio * 40), 8, 50);
};

const getClassificationLabel = (classification: 'realista' | 'agressivo' | 'inviavel'): string => {
  if (classification === 'realista') {
    return 'REALISTA';
  }
  if (classification === 'agressivo') {
    return 'AGRESSIVO';
  }
  return 'INVIAVEL';
};

export const GoalTimelineStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps, issues }: FormStepComponentProps) => {
  const [isDiagnosticRefreshing, setIsDiagnosticRefreshing] = useState(false);

  const previewProjection = useMemo(() => {
    const precisionPresence = derivePrecisionPresence(data);
    const precisionState = renormalizeWeights(precisionPresence);
    const result = runPipeline({
      formData: data,
      precisionState,
      precisionPresence,
    });
    return result.projection;
  }, [data]);

  const targetIssue = issues.find((issue) => issue.field === 'targetWeeks' && issue.blocking);

  const isCutOrBulk =
    data.goal === 'hard_cut' || data.goal === 'mini_cut' || data.goal === 'lean_bulk' || data.goal === 'dirty_bulk';

  useEffect(() => {
    if (!isCutOrBulk) {
      return;
    }

    const patch: Partial<FormStepComponentProps['data']> = {};

    if (data.targetWeeks === null) {
      patch.targetWeeks = 12;
    }

    if (data.goalMode === 'weight' && data.targetWeightKg === null) {
      patch.targetWeightKg = 75;
    }

    if (data.goalMode === 'bf' && data.targetBodyFatPct === null) {
      patch.targetBodyFatPct = 12;
    }

    if (data.goalMode === 'fat_kg' && data.targetFatKg === null) {
      patch.targetFatKg = 6;
    }

    if (Object.keys(patch).length > 0) {
      onPatch(patch);
    }
  }, [
    data.goalMode,
    data.targetBodyFatPct,
    data.targetFatKg,
    data.targetWeightKg,
    data.targetWeeks,
    isCutOrBulk,
    onPatch,
  ]);

  const viability = previewProjection
    ? getViabilityPct({
        requiredDailyDelta: previewProjection.requiredDailyDelta,
        goal: data.goal,
        hormonesEnabled: data.hormonesEnabled,
      })
    : null;

  const weeklyRateKg = previewProjection ? Math.abs((previewProjection.actualDailyDelta * 7) / 7700) : null;

  const diagnosticTone = previewProjection?.classification ?? 'realista';

  useEffect(() => {
    if (!previewProjection || viability === null) {
      return;
    }

    setIsDiagnosticRefreshing(true);
    const timeoutId = window.setTimeout(() => setIsDiagnosticRefreshing(false), 150);
    return () => window.clearTimeout(timeoutId);
  }, [
    previewProjection,
    previewProjection?.actualDailyDelta,
    previewProjection?.classification,
    previewProjection?.requiredDailyDelta,
    previewProjection?.weeksMin,
    viability,
  ]);

  return (
    <div className="question-sub-panel active" id="qpanel-goal-timeline">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - {'Meta e prazo'}
      </div>
      <h2 className="question-title">
        {'Defina sua meta quantitativa'} <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">{'Escolha um \u00fanico modo de meta e o prazo em semanas.'}</p>

      {isCutOrBulk ? (
        <>
          <div className="goal-cards-grid goal-cards-grid-3">
            {goalModeOptions.map((mode) => (
              <GoalOptionCard
                key={mode.id}
                option={{
                  id: mode.id,
                  icon: mode.id === 'weight' ? '\u2696\uFE0F' : mode.id === 'bf' ? '\u{1F3AF}' : '\u{1F4A7}',
                  title: mode.title,
                  description: mode.description,
                }}
                selected={data.goalMode === mode.id}
                onSelect={(id) => onPatch({ goalMode: id as GoalMetricMode })}
              />
            ))}
          </div>

          <div className="number-inputs-grid number-inputs-grid-3">
            {data.goalMode === 'weight' ? (
              <NumberField
                id="target-weight"
                label="PESO ALVO"
                value={data.targetWeightKg ?? 75}
                min={30}
                max={250}
                step={0.5}
                unit="kg"
                unitBadge={{ label: 'kg', active: true }}
                showStepper
                keyboardStep={{ base: 1, fast: 10 }}
                onValueChange={(nextValue) => onPatch({ targetWeightKg: nextValue === null ? null : nextValue })}
              />
            ) : null}
            {data.goalMode === 'bf' ? (
              <NumberField
                id="target-body-fat"
                label="BF ALVO"
                value={data.targetBodyFatPct ?? 12}
                min={3}
                max={55}
                step={0.5}
                unit="%"
                unitBadge={{ label: '%', active: true }}
                showStepper
                keyboardStep={{ base: 1, fast: 10 }}
                onValueChange={(nextValue) => onPatch({ targetBodyFatPct: nextValue === null ? null : nextValue })}
              />
            ) : null}
            {data.goalMode === 'fat_kg' ? (
              <NumberField
                id="target-fat-kg"
                label="GORDURA ALVO"
                value={data.targetFatKg ?? 6}
                min={0.5}
                max={30}
                step={0.1}
                unit="kg"
                unitBadge={{ label: 'kg', active: true }}
                showStepper
                keyboardStep={{ base: 1, fast: 10 }}
                onValueChange={(nextValue) => onPatch({ targetFatKg: nextValue === null ? null : nextValue })}
              />
            ) : null}
          </div>

          <div className="slider-group">
            <FormSliderField
              id="target-weeks"
              label="Prazo desejado"
              valueLabel={`${data.targetWeeks ?? 12} semanas`}
              min={1}
              max={52}
              step={1}
              value={data.targetWeeks ?? 12}
              ticks={sliderTicks.targetWeeks}
              onValueChange={(value) => onPatch({ targetWeeks: value })}
            />
          </div>

          {previewProjection && viability !== null ? (
            <div
              className={[
                'goal-timeline-diagnostic',
                `goal-timeline-diagnostic-${diagnosticTone}`,
                isDiagnosticRefreshing ? 'goal-timeline-diagnostic-refresh' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="goal-timeline-diagnostic-heading">
                <span className="goal-timeline-diagnostic-heading-text">{'An\u00e1lise do prazo'}</span>
              </div>

              <div className="goal-timeline-diagnostic-row">
                <span className="goal-timeline-diagnostic-label">{'Classifica\u00e7\u00e3o'}</span>
                <strong className="goal-timeline-diagnostic-value goal-timeline-diagnostic-classification">
                  {getClassificationLabel(previewProjection.classification)}
                </strong>
              </div>

              <div className="goal-timeline-diagnostic-row">
                <span className="goal-timeline-diagnostic-label">{'D\u00e9ficit necess\u00e1rio'}</span>
                <strong className="goal-timeline-diagnostic-value">
                  {Math.abs(previewProjection.requiredDailyDelta).toFixed(0)} kcal/dia
                </strong>
              </div>

              <div className="goal-timeline-diagnostic-row">
                <span className="goal-timeline-diagnostic-label">{'Perda estimada'}</span>
                <strong className="goal-timeline-diagnostic-value">~{weeklyRateKg?.toFixed(2) ?? '0.00'} kg/semana</strong>
              </div>

              <div className="goal-timeline-diagnostic-divider" />

              <div className="goal-timeline-diagnostic-viability-row">
                <span className="goal-timeline-diagnostic-viability-label">Viabilidade</span>
                <strong className="goal-timeline-diagnostic-viability-pct">{viability}%</strong>
              </div>

              <div className="goal-timeline-diagnostic-bar-row">
                <div className="goal-timeline-diagnostic-bar-track" aria-hidden>
                  <div className="goal-timeline-diagnostic-bar-fill" style={{ width: `${viability}%` }} />
                </div>
                <span className="goal-timeline-diagnostic-scale">/100</span>
              </div>

              {previewProjection.classification === 'inviavel' && previewProjection.weeksMin ? (
                <div className="goal-timeline-diagnostic-warning">{'Prazo m\u00ednimo sugerido:'} {previewProjection.weeksMin} semanas</div>
              ) : null}

              {previewProjection.warningTargetWeightIncludesLbm ? (
                <div className="goal-timeline-diagnostic-note">{'Meta por peso pode incluir varia\u00e7\u00e3o de massa magra.'}</div>
              ) : null}
            </div>
          ) : null}

          {targetIssue ? (
            <div className="target-info-card">
              <div className="target-info-row">
                <span className="target-info-icon">!</span>
                <p className="target-info-text">{targetIssue.message}</p>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="target-info-card">
          <div className="target-info-row">
            <span className="target-info-icon">i</span>
            <p className="target-info-text">
              {'Para manuten\u00e7\u00e3o/recomposi\u00e7\u00e3o, esta etapa \u00e9 opcional e a proje\u00e7\u00e3o n\u00e3o ser\u00e1 exibida no dashboard.'}
            </p>
          </div>
        </div>
      )}

      <StepNav onBack={onBack} onNext={onNext} submit />
    </div>
  );
};

