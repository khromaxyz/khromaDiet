import { toOneDecimal } from './math';

export const calcRealTDEE = (avgDailyIntake: number, weightChangeKg: number, weeksSinceStart: number): number => {
  // Thomas et al. (2014): densidade energética do peso varia ao longo do tempo de intervenção.
  const safeWeeks = Math.max(1, weeksSinceStart);
  const energyCoeff = safeWeeks <= 4 ? 4750 : safeWeeks <= 12 ? 6000 : 7000;
  const dailyWeightChangeKcal = (weightChangeKg * energyCoeff) / (safeWeeks * 7);

  // Shook et al. (2018): ingestão média + custo energético da variação ponderal melhora a estimativa empírica de TDEE.
  return toOneDecimal(avgDailyIntake + dailyWeightChangeKcal);
};
