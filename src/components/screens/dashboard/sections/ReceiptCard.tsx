import { useEffect, useMemo, useState } from 'react';

import {
  ACTIVITY_LEVEL_LABELS,
  CARDIO_MODALITY_LABELS,
  DEFICIT_HISTORY_LABELS,
  HEALTH_CONDITION_LABELS,
  HORMONE_LABELS,
  OCCUPATION_TYPE_LABELS,
  THERMOGENIC_LABELS,
  TRAINING_TYPE_LABELS,
} from '../../../../lib/constants/labels';
import { ACTIVITY_MULTIPLIERS, BASELINE_STEPS } from '../../../../lib/engine/constants';
import { useDietForgeStore } from '../../../../store/useDietForgeStore';
import { useCountUp } from '../../../../hooks/useCountUp';

const fmt = (value: number): string => value.toLocaleString('pt-BR');

interface ReceiptRowData {
  id: 'bmr' | 'activity' | 'occupation' | 'train' | 'cardio' | 'tef' | 'mods' | 'adaptation' | 'total' | 'goal';
  label: string;
  tag: string;
  value: number;
  kind: 'kcal' | 'multiplier';
  sign?: '+' | '-' | '=' | '';
  total?: boolean;
  meta?: boolean;
}

const ReceiptValue = ({ row, active }: { row: ReceiptRowData; active: boolean }) => {
  const kcalAmount = useCountUp(Math.round(Math.abs(row.value)), active && row.kind === 'kcal', 400);
  const multiplierAmount = useCountUp(Math.round(row.value * 100), active && row.kind === 'multiplier', 400) / 100;

  if (row.kind === 'multiplier') {
    return <>{`× ${multiplierAmount.toFixed(2)}`}</>;
  }

  const sign = row.sign ?? '';
  return <>{`${sign}${sign ? ' ' : ''}${fmt(kcalAmount)} kcal`}</>;
};

const BMR_METHOD_LABELS = {
  mifflin: 'Mifflin-St Jeor',
  katch_mcardle: 'Katch-McArdle',
  cunningham: 'Cunningham',
  henry: 'Henry',
} as const;

export const ReceiptCard = () => {
  const results = useDietForgeStore((state) => state.results);
  const formData = useDietForgeStore((state) => state.formData);
  const [visibleRows, setVisibleRows] = useState(0);
  const [showDivider, setShowDivider] = useState(false);

  const modifierTag = useMemo(() => {
    if (!results) {
      return '';
    }

    const tags: string[] = [];

    if (results.modifiers.appliedHormones.length > 0) {
      tags.push(...results.modifiers.appliedHormones.map((hormone) => HORMONE_LABELS[hormone]));
    }

    if (results.modifiers.appliedConditions.length > 0) {
      tags.push(...results.modifiers.appliedConditions.map((condition) => HEALTH_CONDITION_LABELS[condition]));
    }

    if (results.modifiers.thermogenic !== 'none') {
      tags.push(THERMOGENIC_LABELS[results.modifiers.thermogenic]);
    }

    if (formData.sex === 'female' && formData.menstrualPhase && formData.menstrualPhase !== 'unknown') {
      tags.push(formData.menstrualPhase === 'luteal' ? 'Fase lútea' : 'Fase folicular');
    }

    return tags.length > 0 ? tags.join(' · ') : 'nenhum ativo';
  }, [formData.menstrualPhase, formData.sex, results]);

  const cardioTag = useMemo(() => {
    const stepResidual = Math.max((formData.stepsPerDay ?? 0) - BASELINE_STEPS, 0);

    if (formData.cardioMode === 'steps') {
      return `${fmt(stepResidual)} passos extras`;
    }

    if (formData.cardioMode === 'structured') {
      return `${formData.cardioMinutesPerDay ?? 0} min · ${CARDIO_MODALITY_LABELS[formData.cardioModality]}`;
    }

    return `${formData.cardioMinutesPerDay ?? 0} min · ${CARDIO_MODALITY_LABELS[formData.cardioModality]} + ${fmt(stepResidual)} passos extras`;
  }, [formData.cardioMinutesPerDay, formData.cardioModality, formData.cardioMode, formData.stepsPerDay]);

  const activityMultiplier = ACTIVITY_MULTIPLIERS[formData.activityLevel];
  const occupationTag = OCCUPATION_TYPE_LABELS[formData.occupationType ?? 'sedentary'];
  const adaptationTag =
    results && formData.deficitHistory
      ? `${DEFICIT_HISTORY_LABELS[formData.deficitHistory]} · ${results.metabolicAdaptation} kcal`
      : 'Sem ajuste';

  const rows = useMemo<ReceiptRowData[]>(() => {
    if (!results) {
      return [];
    }

    return [
      {
        id: 'bmr',
        label: 'BMR base',
        tag:
          results.bmr.lbm !== null
            ? `${BMR_METHOD_LABELS[results.bmr.method]} · LBM: ${results.bmr.lbm.toFixed(1)}kg`
            : BMR_METHOD_LABELS[results.bmr.method],
        value: results.breakdown.bmr,
        kind: 'kcal',
      },
      {
        id: 'activity',
        label: 'NEAT/Atividade',
        tag: `×${activityMultiplier.toFixed(3)} · ${ACTIVITY_LEVEL_LABELS[formData.activityLevel]}`,
        value: results.breakdown.activityBase,
        kind: 'kcal',
        sign: '=',
      },
      {
        id: 'occupation',
        label: '+ NEAT Ocupacional',
        tag: occupationTag,
        value: results.breakdown.occupationNEAT,
        kind: 'kcal',
        sign: '+',
      },
      {
        id: 'train',
        label: '+ EAT Treino',
        tag: `${formData.trainingSessions}× semana · ${formData.trainingDurationMin}min · ${TRAINING_TYPE_LABELS[formData.trainingType]}`,
        value: results.breakdown.eatTraining,
        kind: 'kcal',
        sign: '+',
      },
      {
        id: 'cardio',
        label: '+ EAT Cardio',
        tag: cardioTag,
        value: results.breakdown.eatCardioStructured + results.breakdown.eatCardioStepsResidual,
        kind: 'kcal',
        sign: '+',
      },
      {
        id: 'tef',
        label: '+ TEF',
        tag: '25% prot · 7.5% carb · 1.5% gord',
        value: results.breakdown.tef,
        kind: 'kcal',
        sign: '+',
      },
      {
        id: 'mods',
        label: '× Modificadores',
        tag: modifierTag,
        value: results.breakdown.modifiers,
        kind: 'multiplier',
      },
      {
        id: 'adaptation',
        label: '× Adaptação metabólica',
        tag: adaptationTag,
        value: Math.abs(results.metabolicAdaptation),
        kind: 'kcal',
        sign: results.metabolicAdaptation < 0 ? '-' : '',
      },
      {
        id: 'total',
        label: 'TDEE Final',
        tag: 'Gasto energético total',
        value: results.tdeeFinal,
        kind: 'kcal',
        total: true,
      },
      {
        id: 'goal',
        label: 'Meta Calórica',
        tag: `${results.goalDeltaPct >= 0 ? '+' : ''}${results.goalDeltaPct.toFixed(1)}% vs TDEE`,
        value: results.goalCalories,
        kind: 'kcal',
        meta: true,
      },
    ];
  }, [
    activityMultiplier,
    adaptationTag,
    cardioTag,
    formData.activityLevel,
    formData.trainingDurationMin,
    formData.trainingSessions,
    formData.trainingType,
    modifierTag,
    occupationTag,
    results,
  ]);

  useEffect(() => {
    if (!results) {
      return undefined;
    }

    setVisibleRows(0);
    setShowDivider(false);

    const timers: number[] = [];
    const preTotalRows = 8;

    for (let index = 0; index < preTotalRows; index += 1) {
      timers.push(
        window.setTimeout(() => {
          setVisibleRows(index + 1);
        }, 280 + index * 100),
      );
    }

    const dividerStart = 280 + preTotalRows * 100;
    timers.push(
      window.setTimeout(() => {
        setShowDivider(true);
      }, dividerStart),
    );

    timers.push(
      window.setTimeout(() => {
        setVisibleRows(rows.length);
      }, dividerStart + 600),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [results, rows.length]);

  if (!results) {
    return null;
  }

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Recibo de Cálculo</div>
        <span className="dash-section-action">Pipeline sequencial + modificadores</span>
      </div>

      <div className="receipt-card">
        {rows.map((item, index) => {
          if (index >= visibleRows) {
            return null;
          }

          return (
            <div key={item.id}>
              {index === 8 ? <hr className={showDivider ? 'receipt-divider-line receipt-divider-animated' : 'receipt-divider-line'} /> : null}
              <div className={['receipt-row', 'receipt-row-enter', item.total ? 'total-row' : '', item.meta ? 'meta-row' : ''].filter(Boolean).join(' ')}>
                <div className="receipt-label">
                  <strong>{item.label}</strong>
                </div>
                <span
                  className={[
                    'receipt-tag',
                    `receipt-tag-tone-${item.id}`,
                    item.total ? 'receipt-tag-total' : '',
                    item.meta ? 'receipt-tag-meta' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {item.tag}
                </span>
                <div
                  className={[
                    'receipt-value',
                    `receipt-value-${item.id}`,
                    item.total ? 'total-val' : '',
                    item.meta ? 'meta-val-color' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <ReceiptValue row={item} active />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
