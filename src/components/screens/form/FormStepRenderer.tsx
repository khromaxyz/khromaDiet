import { motion } from 'framer-motion';

import type { FormStepDefinition, FormStepComponentProps } from '../../../lib/types';

interface FormStepRendererProps {
  activeStep: number;
  steps: FormStepDefinition[];
  stepProps: Omit<FormStepComponentProps, 'stepIndex' | 'totalSteps'>;
}

export const FormStepRenderer = ({ activeStep, steps, stepProps }: FormStepRendererProps) => {
  const definition = steps[activeStep - 1];
  if (!definition) {
    return null;
  }

  const StepComponent = definition.component;

  return (
    <div className="question-panel">
      <motion.div
        key={definition.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <StepComponent {...stepProps} stepIndex={activeStep - 1} totalSteps={steps.length} />
      </motion.div>
    </div>
  );
};
