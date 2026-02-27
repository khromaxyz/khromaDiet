import { RefreshCw } from 'lucide-react';
import { useMemo } from 'react';

import { GOAL_ICONS, THERMOGENIC_ICONS } from '../../../../lib/constants/icons';
import { GOAL_LABELS, THERMOGENIC_LABELS } from '../../../../lib/constants/labels';
import { useDietForgeStore } from '../../../../store/useDietForgeStore';

const goalOptions = [
  { id: 'hard_cut', label: GOAL_LABELS.hard_cut, icon: GOAL_ICONS.hard_cut },
  { id: 'mini_cut', label: GOAL_LABELS.mini_cut, icon: GOAL_ICONS.mini_cut },
  { id: 'lean_bulk', label: GOAL_LABELS.lean_bulk, icon: GOAL_ICONS.lean_bulk },
] as const;

const thermogenicOptions = [
  { id: 'none', label: THERMOGENIC_LABELS.none, icon: THERMOGENIC_ICONS.none },
  { id: 'caffeine', label: THERMOGENIC_LABELS.caffeine, icon: THERMOGENIC_ICONS.caffeine },
  { id: 'eca', label: THERMOGENIC_LABELS.eca, icon: THERMOGENIC_ICONS.eca },
] as const;

interface DiffRow {
  label: string;
  value: string;
  diff?: string;
  changed?: boolean;
  deltaTone?: 'positive' | 'negative';
}

export const WhatIfSection = () => {
  const formData = useDietForgeStore((state) => state.formData);
  const results = useDietForgeStore((state) => state.results);
  const simulatorData = useDietForgeStore((state) => state.simulatorData);
  const simulatorResults = useDietForgeStore((state) => state.simulatorResults);
  const patchSimulatorData = useDietForgeStore((state) => state.patchSimulatorData);
  const clearSimulatorData = useDietForgeStore((state) => state.clearSimulatorData);
  const applySimulator = useDietForgeStore((state) => state.applySimulator);

  const preview = simulatorResults ?? results;
  const trainingSessions = simulatorData.trainingSessions ?? formData.trainingSessions;
  const cardioMinutes = simulatorData.cardioMinutesPerDay ?? formData.cardioMinutesPerDay ?? 20;
  const goal = simulatorData.goal ?? formData.goal;
  const thermogenic = simulatorData.thermogenic ?? formData.thermogenic;

  const diffRows = useMemo<DiffRow[]>(() => {
    if (!results || !preview) {
      return [];
    }

    const diffTdee = preview.tdeeFinal - results.tdeeFinal;
    const diffGoal = preview.goalCalories - results.goalCalories;

    return [
      {
        label: 'Novo TDEE',
        value: `${preview.tdeeFinal.toLocaleString('pt-BR')} kcal`,
        diff: `${diffTdee >= 0 ? '+' : ''}${diffTdee.toFixed(0)}`,
        changed: diffTdee !== 0,
        deltaTone: diffTdee >= 0 ? 'positive' : 'negative',
      },
      {
        label: 'Meta calórica',
        value: `${preview.goalCalories.toLocaleString('pt-BR')} kcal`,
        diff: `${diffGoal >= 0 ? '+' : ''}${diffGoal.toFixed(0)}`,
        changed: diffGoal !== 0,
        deltaTone: diffGoal >= 0 ? 'positive' : 'negative',
      },
      {
        label: preview.dailyDelta >= 0 ? 'Déficit real' : 'Superávit real',
        value: `${preview.dailyDelta.toFixed(0)} kcal`,
        changed: preview.dailyDelta !== results.dailyDelta,
      },
      {
        label: 'Perda/ganho semana',
        value: `${preview.weeklyRateKg.toFixed(2)} kg`,
      },
      {
        label: 'Classificação',
        value: preview.projection?.classification ?? 'sem projeção',
      },
      {
        label: 'Prazo',
        value: `${preview.projection?.milestones.at(-1)?.week ?? 'N/A'} semanas`,
      },
    ];
  }, [preview, results]);

  if (!results || !preview) {
    return null;
  }

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title dash-title-with-icon">
          <RefreshCw size={13} />
          E se você mudasse algo?
        </div>
        <span className="dash-section-action">Atualização em tempo real</span>
      </div>

      <div className="whatif-card whatif-card-zone">
        <div className="whatif-inner-grid">
          <div className="whatif-sliders">
            <div className="whatif-slider-item">
              <div className="whatif-slider-label-row">
                <span className="whatif-slider-label">Treino por semana</span>
                <span className="whatif-slider-value">{trainingSessions}x</span>
              </div>
              <div className="slider-track">
                <div className="slider-fill" style={{ width: `${(trainingSessions / 7) * 100}%` }} />
              </div>
              <input
                type="range"
                className="range-input"
                min={0}
                max={7}
                step={1}
                value={trainingSessions}
                aria-label="Treino por semana"
                onChange={(event) => patchSimulatorData({ trainingSessions: Number(event.target.value) })}
              />
            </div>

            <div className="whatif-slider-item">
              <div className="whatif-slider-label-row">
                <span className="whatif-slider-label">Cardio diário</span>
                <span className="whatif-slider-value">{cardioMinutes} min</span>
              </div>
              <div className="slider-track">
                <div className="slider-fill" style={{ width: `${(cardioMinutes / 90) * 100}%` }} />
              </div>
              <input
                type="range"
                className="range-input"
                min={0}
                max={90}
                step={5}
                value={cardioMinutes}
                aria-label="Cardio diário"
                onChange={(event) =>
                  patchSimulatorData({
                    cardioMode: 'structured',
                    cardioMinutesPerDay: Number(event.target.value),
                  })
                }
              />
            </div>

            <div className="whatif-slider-item">
              <div className="whatif-slider-label-row">
                <span className="whatif-slider-label">Objetivo</span>
                <span className="whatif-slider-value">{GOAL_LABELS[goal]}</span>
              </div>
              <div className="goal-cards-grid goal-cards-grid-3">
                {goalOptions.map((option) => (
                  <button
                    key={option.id}
                    className={goal === option.id ? 'goal-card selected' : 'goal-card'}
                    type="button"
                    onClick={() => patchSimulatorData({ goal: option.id })}
                  >
                    <div className="goal-card-icon">{option.icon}</div>
                    <div className="goal-card-title">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="whatif-slider-item">
              <div className="whatif-slider-label-row">
                <span className="whatif-slider-label">Termogênico</span>
                <span className="whatif-slider-value">{THERMOGENIC_LABELS[thermogenic]}</span>
              </div>
              <div className="goal-cards-grid goal-cards-grid-3">
                {thermogenicOptions.map((option) => (
                  <button
                    key={option.id}
                    className={thermogenic === option.id ? 'goal-card selected' : 'goal-card'}
                    type="button"
                    onClick={() => patchSimulatorData({ thermogenic: option.id })}
                  >
                    <div className="goal-card-icon">{option.icon}</div>
                    <div className="goal-card-title">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-nav">
              <button className="btn-form-back" type="button" onClick={clearSimulatorData}>
                Limpar simulação
              </button>
              <button className="btn-form-next" type="button" onClick={applySimulator}>
                Aplicar simulação
              </button>
            </div>
          </div>

          <div className="whatif-preview whatif-preview-live">
            <div className="whatif-preview-title">Preview · Resultado estimado</div>
            {diffRows.map((row, index) => (
              <div
                key={row.label}
                className={index === diffRows.length - 1 ? 'whatif-result-row whatif-result-row-last' : 'whatif-result-row'}
              >
                <span className="whatif-result-label">{row.label}</span>
                <span
                  className={[
                    'whatif-result-value',
                    row.changed ? 'changed whatif-delta-flash' : '',
                    row.deltaTone === 'positive' ? 'delta-positive' : '',
                    row.deltaTone === 'negative' ? 'delta-negative' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {row.value}
                  {row.diff ? (
                    <span
                      className={[
                        'whatif-result-diff',
                        row.deltaTone === 'positive' ? 'delta-positive' : '',
                        row.deltaTone === 'negative' ? 'delta-negative' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {row.diff}
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
