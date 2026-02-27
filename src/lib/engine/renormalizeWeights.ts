import type { PrecisionPresenceMap, PrecisionState, PrecisionWeightsMap } from '../types';

import { BASE_PRECISION_WEIGHTS } from './constants';
import { round } from './math';

export const renormalizeWeights = (presentVariables: PrecisionPresenceMap): PrecisionState => {
  const keys = Object.keys(BASE_PRECISION_WEIGHTS) as Array<keyof PrecisionWeightsMap>;

  const presentWeights = keys.reduce((sum, key) => {
    return sum + (presentVariables[key] ? BASE_PRECISION_WEIGHTS[key] : 0);
  }, 0);

  const normalizedWeights = keys.reduce<PrecisionWeightsMap>((acc, key) => {
    const isPresent = presentVariables[key];
    const baseWeight = BASE_PRECISION_WEIGHTS[key];
    acc[key] = isPresent && presentWeights > 0 ? baseWeight / presentWeights : 0;
    return acc;
  }, { ...BASE_PRECISION_WEIGHTS });

  const missingKeys = keys.filter((key) => !presentVariables[key]);

  return {
    precisionPct: round(presentWeights * 100),
    normalizedWeights,
    presentWeights: round(presentWeights, 4),
    missingKeys,
  };
};
