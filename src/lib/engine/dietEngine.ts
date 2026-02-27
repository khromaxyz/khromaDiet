import type { CalculationResults, EngineInput } from '../types';

import { derivePrecisionPresence, runPipeline } from './runPipeline';
import { renormalizeWeights } from './renormalizeWeights';

export const runDietEngine = ({ formData }: EngineInput): CalculationResults => {
  const precisionPresence = derivePrecisionPresence(formData);
  const precisionState = renormalizeWeights(precisionPresence);

  return runPipeline({
    formData,
    precisionState,
    precisionPresence,
  });
};
