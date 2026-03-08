import { motion } from 'framer-motion';

import { DataCard } from '@/components/design-system';
import type { FormStepDefinition, FormStepComponentProps } from '@/lib/types';

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
      <DataCard glow="emerald" className="form-step-shell p-[var(--space-6)] sm:p-[var(--space-7)]">
        <motion.div
          key={definition.id}
          initial={{ opacity: 0, x: 32, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <StepComponent {...stepProps} stepIndex={activeStep - 1} totalSteps={steps.length} />
        </motion.div>
      </DataCard>
    </div>
  );
};

