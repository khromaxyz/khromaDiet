import type { FormStepComponentProps } from '../../../../lib/types';

export const NutritionStep = ({ onNext }: FormStepComponentProps) => {
  return <button type="button" onClick={onNext} hidden aria-hidden="true" />;
};
