import { useEffect, useState, type ReactNode } from 'react';

import { formSteps } from '../../../lib/constants/steps';
import type { FormData, FormPatch, ValidationIssue } from '../../../lib/types';
import { ProgressBar } from '../../ui/ProgressBar';

import { FormHeader } from './FormHeader';
import { FormStepRenderer } from './FormStepRenderer';

interface FormScreenProps {
  step: number;
  data: FormData;
  precisionPct: number;
  issues: ValidationIssue[];
  profileTrigger?: ReactNode;
  onPatch: (patch: FormPatch) => void;
  onPrevScreen: () => void;
  onSummary: () => void;
  onBackStep: () => void;
  onNextStep: () => void;
  onCompute: () => ValidationIssue[];
}

const isStepValid = (stepId: string, data: FormData): boolean => {
  switch (stepId) {
    case 'goal':
      return Boolean(data.goal);
    case 'sex':
      if (!data.sex) {
        return false;
      }
      return data.sex === 'female' ? data.menstrualPhase !== undefined : true;
    case 'basics':
      return data.age > 0 && data.weightKg > 0 && data.heightCm > 0;
    case 'body_fat':
      if (data.bodyFatMode === 'declared') {
        return data.bodyFatDeclaredPct === null || data.bodyFatDeclaredPct > 0;
      }
      if (data.bodyFatMode === 'photos') {
        return data.bodyFatPhotoPresetPct !== null;
      }
      return data.navyNeckCm !== null && data.navyWaistCm !== null;
    case 'diet_history':
      if (!data.deficitHistory) {
        return true;
      }
      if (data.deficitHistory === 'none') {
        return true;
      }
      return data.deficitSeverity !== undefined;
    case 'activity':
      return Boolean(data.activityLevel);
    case 'occupation':
      return true;
    case 'training':
      return data.trainingDurationMin > 0;
    case 'cardio':
      return true;
    case 'hormones':
      return !data.hormonesEnabled || data.hormones.length > 0;
    case 'health':
      return data.healthConditions.length > 0;
    case 'thermogenics':
      return Boolean(data.thermogenic);
    case 'meals':
      return data.mealsPerDay >= 2;
    case 'goal_timeline':
      return true;
    default:
      return true;
  }
};

export const FormScreen = ({
  step,
  data,
  precisionPct,
  issues,
  profileTrigger,
  onPatch,
  onPrevScreen,
  onSummary,
  onBackStep,
  onNextStep,
  onCompute,
}: FormScreenProps) => {
  const totalSteps = formSteps.length;
  const stepProgressPct = (step / totalSteps) * 100;
  const currentStep = formSteps[step - 1];
  const blockingIssues = issues.filter((issue) => issue.blocking);
  const [showIntro, setShowIntro] = useState(step === 1);
  const [introSeen, setIntroSeen] = useState(false);

  useEffect(() => {
    if (step !== 1 || introSeen) {
      setShowIntro(false);
      return;
    }

    setShowIntro(true);
    const timeout = window.setTimeout(() => {
      setShowIntro(false);
      setIntroSeen(true);
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [introSeen, step]);

  const onBack = () => {
    if (step <= 1) {
      onPrevScreen();
      return;
    }
    onBackStep();
  };

  const onNext = () => {
    if (!currentStep || !isStepValid(currentStep.id, data)) {
      return;
    }

    if (step >= totalSteps) {
      const computedIssues = onCompute();
      const hasBlocking = computedIssues.some((issue) => issue.blocking);
      if (!hasBlocking) {
        onSummary();
      }
      return;
    }
    onNextStep();
  };

  return (
    <section className="screen active" id="screen-form">
      <FormHeader currentStep={step} totalSteps={totalSteps} precisionPct={precisionPct} profileTrigger={profileTrigger} />
      <ProgressBar value={stepProgressPct} />
      <div className="form-body">
        <div>
          {blockingIssues.length > 0 ? (
            <div className="target-info-card">
              {blockingIssues.map((issue) => (
                <div key={`${issue.field}-${issue.message}`} className="target-info-row">
                  <span className="target-info-icon">!</span>
                  <p className="target-info-text">{issue.message}</p>
                </div>
              ))}
            </div>
          ) : null}

          {showIntro ? (
            <div className="form-intro-card" role="status" aria-live="polite">
              <p className="form-intro-text">Responda com honestidade. Cada detalhe melhora sua precisão.</p>
            </div>
          ) : (
            <FormStepRenderer
              activeStep={step}
              steps={formSteps}
              stepProps={{
                data,
                onPatch,
                onBack,
                onNext,
                issues,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};
