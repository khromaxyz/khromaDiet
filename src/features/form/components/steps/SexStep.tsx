import { useEffect, useRef } from 'react';

import { menstrualPhaseOptions, sexOptions } from '@/features/form/config/formConfig';
import type { FormStepComponentProps, MenstrualPhase, SexType } from '@/lib/types';

import { GoalOptionCard } from '../GoalOptionCard';
import { StepNav } from '../StepNav';

const sexIconMap: Record<SexType, string> = {
  male: '\u2642\uFE0F',
  female: '\u2640\uFE0F',
};

const menstrualPhaseIconMap: Record<MenstrualPhase, string> = {
  follicular: '\u{1F331}',
  luteal: '\u{1F319}',
  unknown: '\u2753',
};

export const SexStep = ({ data, onPatch, onNext, onBack, stepIndex, totalSteps }: FormStepComponentProps) => {
  const shouldAutoAdvanceRef = useRef(false);

  useEffect(() => {
    if (!shouldAutoAdvanceRef.current) {
      return;
    }

    if (data.sex === 'female' && data.menstrualPhase === undefined) {
      return;
    }

    const timeout = window.setTimeout(() => {
      shouldAutoAdvanceRef.current = false;
      onNext();
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [data.menstrualPhase, data.sex, onNext]);

  return (
    <div className="question-sub-panel active" id="qpanel-sex">
      <div className="question-number">
        {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} - Sexo biológico
      </div>
      <h2 className="question-title">Qual é o seu sexo biológico?</h2>
      <p className="question-description">Usado para limiares de segurança e fórmulas metabólicas.</p>

      <div className="goal-cards-grid goal-cards-grid-2">
        {sexOptions.map((option) => (
          <GoalOptionCard
            key={option.id}
            option={{
              ...option,
              icon: sexIconMap[option.id as SexType] ?? option.icon,
            }}
            selected={data.sex === option.id}
            onSelect={(id) => {
              const nextSex = id as SexType;
              shouldAutoAdvanceRef.current = true;
              onPatch({
                sex: nextSex,
                menstrualPhase: nextSex === 'female' ? undefined : 'unknown',
              });
            }}
          />
        ))}
      </div>

      {data.sex === 'female' ? (
        <>
          <h3 className="question-title">Em qual fase do ciclo você está normalmente ao iniciar a dieta?</h3>
          <div className="goal-cards-grid goal-cards-grid-3">
            {menstrualPhaseOptions.map((option) => (
              <GoalOptionCard
                key={option.id}
                option={{
                  id: option.id,
                  icon: menstrualPhaseIconMap[option.id] ?? option.icon,
                  title: option.title,
                  description: option.description,
                }}
                selected={data.menstrualPhase === option.id}
                onSelect={(id) => {
                  shouldAutoAdvanceRef.current = true;
                  onPatch({ menstrualPhase: id as MenstrualPhase });
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
};

