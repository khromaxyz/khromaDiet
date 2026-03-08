import { useEffect, useMemo, useRef } from 'react';

import { bodyFatPhotoPresets } from '@/features/form/config/formConfig';
import { calcBFNavy } from '@/lib/engine/calcBFNavy';
import type { BodyFatMode, FormStepComponentProps } from '@/lib/types';
import { NumberField } from '@/features/form/components/fields/NumberField';

import { GoalOptionCard } from '../GoalOptionCard';
import { StepNav } from '../StepNav';

const modeOptions: Array<{
  id: BodyFatMode;
  icon: string;
  title: string;
  description: string;
  accent: 'blue' | 'violet' | 'cyan';
  badge?: { label: string; tone: 'cyan' | 'orange' | 'lime' | 'violet' | 'red' | 'green' };
}> = [
  {
    id: 'declared',
    icon: '📌',
    title: 'Valor direto',
    description: 'Você informa o BF% declarado.',
    accent: 'blue',
  },
  {
    id: 'photos',
    icon: '🖼️',
    title: 'Referência visual',
    description: 'Seleciona um preset aproximado por perfil.',
    accent: 'violet',
    badge: { label: '⭐ Recomendado', tone: 'red' },
  },
  {
    id: 'navy',
    icon: '📏',
    title: 'Método Navy',
    description: 'Calcula BF pelas medidas corporais.',
    accent: 'cyan',
  },
];

const getBodyFatClassification = (
  value: number,
): { label: string; tone: 'critical' | 'athletic' | 'fit' | 'average' | 'above' } => {
  if (value < 6) {
    return { label: '⚠️ Essencial — abaixo do saudável', tone: 'critical' };
  }
  if (value <= 13) {
    return { label: 'Atlético', tone: 'athletic' };
  }
  if (value <= 17) {
    return { label: 'Em forma', tone: 'fit' };
  }
  if (value <= 24) {
    return { label: 'Médio', tone: 'average' };
  }
  return { label: 'Acima da média', tone: 'above' };
};

export const BodyFatStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps, issues }: FormStepComponentProps) => {
  const navyEstimate = useMemo(
    () =>
      data.navyNeckCm !== null && data.navyWaistCm !== null
        ? calcBFNavy({
            sex: data.sex,
            heightCm: data.heightCm,
            neckCm: data.navyNeckCm,
            waistCm: data.navyWaistCm,
            hipCm: data.sex === 'female' ? data.navyHipCm : null,
          })
        : null,
    [data.heightCm, data.navyHipCm, data.navyNeckCm, data.navyWaistCm, data.sex],
  );

  const bfDiff =
    data.bodyFatDeclaredPct !== null && navyEstimate !== null
      ? Math.abs(data.bodyFatDeclaredPct - navyEstimate)
      : null;

  const promptedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (bfDiff === null || bfDiff <= 5 || data.bfDecision !== null) {
      return;
    }

    const key = `${data.bodyFatDeclaredPct ?? 'n'}-${navyEstimate ?? 'n'}`;
    if (promptedKeyRef.current === key) {
      return;
    }

    promptedKeyRef.current = key;

    const chooseNavy = window.confirm(
      `Diferença de ${bfDiff.toFixed(1)}pp entre BF declarado e Navy.\nClique em OK para usar Navy ou Cancelar para manter declarado.`,
    );

    onPatch({ bfDecision: chooseNavy ? 'navy' : 'declared' });
  }, [bfDiff, data.bfDecision, data.bodyFatDeclaredPct, navyEstimate, onPatch]);

  const infoIssue = issues.find((issue) => issue.field === 'bodyFatDecision');
  const declaredBodyFat = data.bodyFatDeclaredPct ?? 18;
  const bodyFatClassification = getBodyFatClassification(declaredBodyFat);

  return (
    <div className="question-sub-panel active" id="qpanel-body-fat">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Body fat
      </div>
      <h2 className="question-title">
        Body Fat % <span className="optional-badge">Opcional</span>
      </h2>
      <p className="question-description">Quanto melhor a estimativa de BF, maior a precisão do cálculo.</p>

      <div className="goal-cards-grid goal-cards-grid-3">
        {modeOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={option}
            selected={data.bodyFatMode === option.id}
            onSelect={(id) =>
              onPatch({
                bodyFatMode: id as BodyFatMode,
                bfDecision: null,
              })
            }
          />
        ))}
      </div>

      {data.bodyFatMode === 'declared' ? (
        <div className="number-inputs-grid number-inputs-grid-3">
          <NumberField
            id="body-fat-declared"
            label="BF DECLARADO"
            value={declaredBodyFat}
            min={3}
            max={60}
            step={0.5}
            unit="%"
            unitBadge={{ label: '%', active: true }}
            showStepper
            keyboardStep={{ base: 1, fast: 10 }}
            staggerIndex={0}
            classificationSlot={
              <span className={`input-bf-classification input-bf-classification-${bodyFatClassification.tone}`}>
                {bodyFatClassification.label}
              </span>
            }
            onValueChange={(nextValue) => {
              onPatch({ bodyFatDeclaredPct: nextValue === null ? null : nextValue });
            }}
          />
        </div>
      ) : null}

      {data.bodyFatMode === 'photos' ? (
        <div className="bf-photo-grid">
          {bodyFatPhotoPresets[data.sex].map((preset, index) => {
            const selected = data.bodyFatPhotoPresetPct === preset.value;
            return (
              <button
                key={preset.id}
                type="button"
                className={selected ? 'bf-photo-card selected' : 'bf-photo-card'}
                onClick={() => onPatch({ bodyFatPhotoPresetPct: preset.value })}
              >
                <div className={`bf-photo-silhouette bf-photo-level-${Math.min(index + 1, 5)}`} aria-hidden />
                <div className="bf-photo-label">{preset.label}</div>
                <div className="bf-photo-value">~{preset.value}%</div>
              </button>
            );
          })}
        </div>
      ) : null}

      {data.bodyFatMode === 'navy' ? (
        <div className="number-inputs-grid number-inputs-grid-3">
          <NumberField
            id="body-fat-navy-neck"
            label="PESCOÇO"
            value={data.navyNeckCm ?? 38}
            min={20}
            max={70}
            step={0.5}
            unit="cm"
            unitBadge={{ label: 'cm', active: true }}
            showStepper
            keyboardStep={{ base: 1, fast: 10 }}
            staggerIndex={0}
            onValueChange={(nextValue) => onPatch({ navyNeckCm: nextValue === null ? null : nextValue })}
          />
          <NumberField
            id="body-fat-navy-waist"
            label="CINTURA"
            value={data.navyWaistCm ?? 85}
            min={45}
            max={170}
            step={0.5}
            unit="cm"
            unitBadge={{ label: 'cm', active: true }}
            showStepper
            keyboardStep={{ base: 1, fast: 10 }}
            staggerIndex={1}
            onValueChange={(nextValue) => onPatch({ navyWaistCm: nextValue === null ? null : nextValue })}
          />
          {data.sex === 'female' ? (
            <NumberField
              id="body-fat-navy-hip"
              label="QUADRIL"
              value={data.navyHipCm ?? 95}
              min={60}
              max={170}
              step={0.5}
              unit="cm"
              unitBadge={{ label: 'cm', active: true }}
              showStepper
              keyboardStep={{ base: 1, fast: 10 }}
              staggerIndex={2}
              onValueChange={(nextValue) => onPatch({ navyHipCm: nextValue === null ? null : nextValue })}
            />
          ) : null}
        </div>
      ) : null}

      {navyEstimate !== null ? (
        <div className="target-info-card">
          <div className="target-info-row">
            <span className="target-info-icon">i</span>
            <p className="target-info-text">
              Navy estimado: <span className="target-info-highlight">{navyEstimate.toFixed(1)}%</span>
              {bfDiff !== null && bfDiff > 0 ? ` · Diferença para declarado: ${bfDiff.toFixed(1)}pp` : ''}
            </p>
          </div>
          {infoIssue ? <p className="target-info-text">{infoIssue.message}</p> : null}
        </div>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

