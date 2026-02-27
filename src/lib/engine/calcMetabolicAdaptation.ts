import type { DeficitHistory, DeficitSeverity } from '../types';

export const calcMetabolicAdaptation = (
  deficitHistory: DeficitHistory | undefined,
  deficitSeverity: DeficitSeverity | undefined,
): number => {
  // Heinitz et al. (2020) e Nunes et al. (2022): adaptação metabólica cresce com duração/intensidade do déficit.
  if (deficitHistory === undefined || deficitHistory === 'none' || deficitHistory === 'lt4weeks') {
    return 0;
  }

  const severity = deficitSeverity ?? 'light';

  if (deficitHistory === '1to3months') {
    if (severity === 'moderate') {
      return -75;
    }
    if (severity === 'aggressive') {
      return -150;
    }
    return -50;
  }

  if (deficitHistory === 'gt3months') {
    if (severity === 'moderate') {
      return -100;
    }
    if (severity === 'aggressive') {
      return -200;
    }
    return -75;
  }

  return 0;
};
