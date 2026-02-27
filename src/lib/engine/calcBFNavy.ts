import type { SexType } from '../types';

import { clamp, toOneDecimal } from './math';

export interface CalcBFNavyInput {
  sex: SexType;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm: number | null;
}

const cmToInches = (valueCm: number): number => valueCm / 2.54;

export const calcBFNavy = ({ sex, heightCm, neckCm, waistCm, hipCm }: CalcBFNavyInput): number | null => {
  if (heightCm <= 0 || neckCm <= 0 || waistCm <= 0) {
    return null;
  }

  const heightIn = cmToInches(heightCm);
  const neckIn = cmToInches(neckCm);
  const waistIn = cmToInches(waistCm);

  // Fórmula Navy exige razões geométricas positivas para o log10.
  if (sex === 'male') {
    const denominator = waistIn - neckIn;
    if (denominator <= 0) {
      return null;
    }

    const bf = 86.01 * Math.log10(denominator) - 70.041 * Math.log10(heightIn) + 36.76;
    return toOneDecimal(clamp(bf, 3, 60));
  }

  if (hipCm === null || hipCm <= 0) {
    return null;
  }

  const hipIn = cmToInches(hipCm);
  const denominator = waistIn + hipIn - neckIn;
  if (denominator <= 0) {
    return null;
  }

  const bf = 163.205 * Math.log10(denominator) - 97.684 * Math.log10(heightIn) - 78.387;
  return toOneDecimal(clamp(bf, 8, 65));
};
