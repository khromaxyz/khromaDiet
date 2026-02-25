import { ProgressBar } from '../../ui/ProgressBar';
import { formSteps } from '../../../lib/constants/steps';
import type { DietFormState } from '../../../lib/types';

import { FormHeader } from './FormHeader';
import { FormStepRenderer } from './FormStepRenderer';

interface FormScreenProps {
  step: number;
  data: DietFormState;
  onPatch: (patch: Partial<DietFormState>) => void;
  onPrevScreen: () => void;
  onSummary: () => void;
  onBackStep: () => void;
  onNextStep: () => void;
}

export const FormScreen = ({
  step,
  data,
  onPatch,
  onPrevScreen,
  onSummary,
  onBackStep,
  onNextStep,
}: FormScreenProps) => {
  const totalSteps = formSteps.length;
  const progress = (step / totalSteps) * 100;

  const onBack = () => {
    if (step <= 1) {
      onPrevScreen();
      return;
    }
    onBackStep();
  };

  const onNext = () => {
    if (step >= totalSteps) {
      onSummary();
      return;
    }
    onNextStep();
  };

  return (
    <section className="screen active" id="screen-form">
      <FormHeader currentStep={step} totalSteps={totalSteps} />
      <ProgressBar value={progress} />
      <div className="form-body">
        <FormStepRenderer
          activeStep={step}
          steps={formSteps}
          stepProps={{
            data,
            onPatch,
            onBack,
            onNext,
          }}
        />
      </div>
    </section>
  );
};

