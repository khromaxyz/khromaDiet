import { motion } from 'framer-motion';
import { Activity, Clock3, Flame, Target, UtensilsCrossed } from 'lucide-react';
import { useMemo } from 'react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { Badge } from '@/components/ui/primitives/badge';
import { useCountUp } from '@/hooks/useCountUp';
import type { CalculationResults, FormData } from '@/lib/types';
import { cn } from '@/lib/utils';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardPanelVariants,
  formatKcal,
  formatPct,
} from './shared';

interface MealsSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
}

const formatGram = (value: number) =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const getMacroSegments = (proteinG: number, carbsG: number, fatG: number) => {
  const proteinKcal = proteinG * 4;
  const carbsKcal = carbsG * 4;
  const fatKcal = fatG * 9;
  const total = proteinKcal + carbsKcal + fatKcal;

  if (total <= 0) {
    return { proteinPct: 0, carbsPct: 0, fatPct: 0 };
  }

  const proteinPct = (proteinKcal * 100) / total;
  const carbsPct = (carbsKcal * 100) / total;
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  return { proteinPct, carbsPct, fatPct };
};

const normalizeShares = (shares: number[]) => {
  const total = shares.reduce((acc, value) => acc + value, 0);

  if (total <= 0) {
    return shares.map(() => 1 / shares.length);
  }

  return shares.map((value) => value / total);
};

const buildFallbackMeals = (
  macros: CalculationResults['macros'],
  formData: FormData,
): CalculationResults['macros']['meals'] => {
  const mealCount = Math.min(7, Math.max(2, Math.round(formData.mealsPerDay || 4)));
  const names = ['Cafe da manha', 'Lanche', 'Almoco', 'Pre-treino', 'Pos-treino', 'Jantar', 'Ceia'];
  const times = ['07:00', '10:00', '13:00', '16:30', '19:30', '21:30', '23:00'];
  const hasTraining = formData.trainingSessions > 0;
  const preIndex = hasTraining ? Math.max(0, Math.floor((mealCount - 1) / 2)) : -1;
  const postIndex = hasTraining ? Math.min(mealCount - 1, preIndex + 1) : -1;

  const proteinShares = Array.from({ length: mealCount }, () => 1 / mealCount);
  const carbShares = Array.from({ length: mealCount }, () => 1 / mealCount);
  const fatShares = Array.from({ length: mealCount }, () => 1 / mealCount);

  if (hasTraining && preIndex >= 0 && postIndex >= 0) {
    carbShares[preIndex] = (carbShares[preIndex] ?? 0) + 0.12;
    carbShares[postIndex] = (carbShares[postIndex] ?? 0) + 0.2;
    proteinShares[preIndex] = (proteinShares[preIndex] ?? 0) + 0.06;
    proteinShares[postIndex] = (proteinShares[postIndex] ?? 0) + 0.14;
    fatShares[preIndex] = Math.max(0.04, (fatShares[preIndex] ?? 0) - 0.06);
    fatShares[postIndex] = Math.max(0.04, (fatShares[postIndex] ?? 0) - 0.04);
  }

  const normalizedProteinShares = normalizeShares(proteinShares);
  const normalizedCarbShares = normalizeShares(carbShares);
  const normalizedFatShares = normalizeShares(fatShares);

  const meals: CalculationResults['macros']['meals'] = [];
  let proteinAssigned = 0;
  let carbsAssigned = 0;
  let fatAssigned = 0;

  for (let index = 0; index < mealCount; index += 1) {
    const isLast = index === mealCount - 1;
    const proteinG = isLast
      ? Math.max(0, Math.round(macros.proteinG - proteinAssigned))
      : Math.max(0, Math.round(macros.proteinG * (normalizedProteinShares[index] ?? 0)));
    const carbsG = isLast
      ? Math.max(0, Math.round(macros.carbsG - carbsAssigned))
      : Math.max(0, Math.round(macros.carbsG * (normalizedCarbShares[index] ?? 0)));
    const fatG = isLast
      ? Math.max(0, Math.round(macros.fatG - fatAssigned))
      : Math.max(0, Math.round(macros.fatG * (normalizedFatShares[index] ?? 0)));

    proteinAssigned += proteinG;
    carbsAssigned += carbsG;
    fatAssigned += fatG;

    let tag: CalculationResults['macros']['meals'][number]['tag'] = 'standard';
    if (index === preIndex) {
      tag = 'pre';
    } else if (index === postIndex) {
      tag = 'post';
    }

    meals.push({
      id: `fallback-meal-${index + 1}`,
      number: `Refeicao ${String(index + 1).padStart(2, '0')}`,
      name: names[index] ?? `Refeicao ${index + 1}`,
      time: times[index] ?? '00:00',
      kcal: proteinG * 4 + carbsG * 4 + fatG * 9,
      proteinG,
      carbsG,
      fatG,
      tag,
    });
  }

  return meals;
};

const getMealGlow = (tag: CalculationResults['macros']['meals'][number]['tag']) => {
  if (tag === 'post') {
    return 'emerald' as const;
  }

  if (tag === 'pre') {
    return 'gold' as const;
  }

  return 'none' as const;
};

const getMealTitle = (
  meal: CalculationResults['macros']['meals'][number],
  index: number,
  totalMeals: number,
) => {
  if (meal.tag === 'pre') {
    return 'Janela Pre-Treino';
  }

  if (meal.tag === 'post') {
    return 'Janela Pos-Treino';
  }

  if (index === 0) {
    return 'Cafe da manha';
  }

  if (index === totalMeals - 1) {
    return 'Fechamento do dia';
  }

  return meal.name;
};

const getMealBadge = (tag: CalculationResults['macros']['meals'][number]['tag']) => {
  if (tag === 'pre') {
    return {
      label: 'Pre-Treino',
      className: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
    };
  }

  if (tag === 'post') {
    return {
      label: 'Pos-Treino',
      className: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
    };
  }

  return null;
};

export const MealsSlide = ({ activated, results, formData }: MealsSlideProps) => {
  const usingFallbackMeals = results.macros.meals.length === 0;

  const displayMeals = useMemo(() => {
    if (!usingFallbackMeals) {
      return results.macros.meals;
    }

    return buildFallbackMeals(results.macros, formData);
  }, [formData, results.macros, usingFallbackMeals]);

  const totals = useMemo(() => {
    const aggregate = displayMeals.reduce(
      (acc, meal) => {
        acc.kcal += meal.kcal;
        acc.proteinG += meal.proteinG;
        acc.carbsG += meal.carbsG;
        acc.fatG += meal.fatG;
        return acc;
      },
      { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 },
    );

    const segments = getMacroSegments(aggregate.proteinG, aggregate.carbsG, aggregate.fatG);
    const targetCalories = results.macros.calories;
    const deltaCalories = aggregate.kcal - targetCalories;
    const completionPct = targetCalories > 0 ? Math.round((aggregate.kcal / targetCalories) * 100) : 0;

    return {
      ...aggregate,
      ...segments,
      targetCalories,
      deltaCalories,
      completionPct,
    };
  }, [displayMeals, results.macros.calories]);

  const totalCaloriesAnimated = useCountUp(totals.kcal, activated, 950);
  const totalProteinAnimated = useCountUp(totals.proteinG, activated, 950);
  const totalCarbsAnimated = useCountUp(totals.carbsG, activated, 950);
  const totalFatAnimated = useCountUp(totals.fatG, activated, 950);

  const totalBadgeClassName =
    totals.deltaCalories === 0
      ? 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]'
      : totals.deltaCalories > 0
        ? 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]'
        : 'border-[var(--border-blue)] bg-[var(--blue-glow-subtle)] text-[var(--blue-400)]';

  return (
    <SectionShell
      level="deep"
      className="pb-[var(--space-12)] pt-[calc(var(--header-height)+var(--space-8))] sm:pt-[calc(var(--header-height)+var(--space-10))]"
    >
      <motion.div
        className="flex flex-col gap-8 lg:gap-10"
        variants={dashboardContainerVariants}
        initial={false}
        animate={activated ? 'show' : 'hidden'}
      >
        <motion.div variants={dashboardItemVariants}>
          <SectionHeader
            eyebrow="06 - REFEICOES"
            title={<span id="dfp-heading-meals">Distribuicao das refeicoes no dia</span>}
            subtitle="Cada card mostra horario, calorias e macro split da refeicao. O total diario fecha contra a meta do protocolo sem depender da UI legacy."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <UtensilsCrossed className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  {displayMeals.length} refeicoes
                </span>
                {usingFallbackMeals ? (
                  <Badge variant="outline" className="border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]">
                    Dados de exemplo
                  </Badge>
                ) : null}
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]',
                    totalBadgeClassName,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  {totals.deltaCalories === 0
                    ? 'Meta fechada'
                    : totals.deltaCalories > 0
                      ? `${formatKcal(Math.abs(totals.deltaCalories))} kcal acima`
                      : `${formatKcal(Math.abs(totals.deltaCalories))} kcal abaixo`}
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard data-testid="meals-total-card" hoverable glow="emerald" className="grid gap-6 p-[var(--space-6)] xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                <Target className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                Total diario
              </div>

              <StatBlock
                value={totalCaloriesAnimated}
                unit="kcal"
                label="Soma das refeicoes"
                sublabel={`Meta ${formatKcal(totals.targetCalories)} kcal · ${formatPct(totals.completionPct)}% do alvo`}
                size="lg"
                color="emerald"
                className={CARDLESS_STAT_BLOCK_CLASSNAME}
              />

              <p className="max-w-[38rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                O dia fecha em {formatKcal(totals.kcal)} kcal distribuidas por {displayMeals.length} janelas de refeicao.
                A barra ao lado mostra o split calorico de proteina, carboidrato e gordura no mesmo material das secoes anteriores.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Split do dia
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">
                    {formatKcal(totals.kcal)} / {formatKcal(totals.targetCalories)} kcal planejadas.
                  </div>
                </div>

                <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                  4 / 4 / 9
                </span>
              </div>

              <div className="flex h-4 overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-active)]">
                <div style={{ width: `${Math.max(8, totals.proteinPct)}%` }} className="bg-[var(--emerald-500)]" />
                <div style={{ width: `${Math.max(8, totals.carbsPct)}%` }} className="bg-[var(--blue-500)]" />
                <div style={{ width: `${Math.max(8, totals.fatPct)}%` }} className="bg-[var(--gold-500)]" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[var(--radius-lg)] border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] p-[var(--space-4)]">
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">Proteina</div>
                  <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {formatGram(totalProteinAnimated)}g
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">Meta {formatGram(results.macros.proteinG)}g</div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border-blue)] bg-[var(--blue-glow-subtle)] p-[var(--space-4)]">
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--blue-400)]">Carboidrato</div>
                  <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {formatGram(totalCarbsAnimated)}g
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">Meta {formatGram(results.macros.carbsG)}g</div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] p-[var(--space-4)]">
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--gold-400)]">Gordura</div>
                  <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {formatGram(totalFatAnimated)}g
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">Meta {formatGram(results.macros.fatG)}g</div>
                </div>
              </div>
            </div>
          </DataCard>
        </motion.div>

        {displayMeals.length === 0 ? (
          <motion.div variants={dashboardPanelVariants}>
            <DataCard hoverable className="p-[var(--space-6)]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <UtensilsCrossed className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  Sem distribuicao valida
                </div>
                <div className="text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                  Nao foi possivel montar as refeicoes deste protocolo
                </div>
                <p className="max-w-[38rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  O slide permanece visivel mesmo quando os dados de refeicao nao fecham corretamente.
                </p>
              </div>
            </DataCard>
          </motion.div>
        ) : null}

        <motion.div className="grid gap-4 xl:grid-cols-2" variants={dashboardItemVariants}>
          {displayMeals.map((meal, index) => {
            const segments = getMacroSegments(meal.proteinG, meal.carbsG, meal.fatG);
            const badge = getMealBadge(meal.tag);

            return (
              <DataCard
                key={meal.id}
                data-testid="meal-card"
                hoverable
                glow={getMealGlow(meal.tag)}
                className="p-[var(--space-5)]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                      {meal.number}
                    </div>
                    <div className="mt-1 text-[22px] font-semibold leading-[1.2] tracking-[-0.8px] text-[var(--text-primary)]">
                      {getMealTitle(meal, index, displayMeals.length)}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-secondary)]">
                      <Clock3 className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                      {meal.time}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                    <div className="font-mono text-[30px] font-semibold tracking-[-1.5px] text-[var(--text-primary)]">
                      {formatKcal(meal.kcal)}
                      <span className="ml-1 text-xs text-[var(--text-muted)]">kcal</span>
                    </div>
                    {badge ? (
                      <span
                        className={cn(
                          'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]',
                          badge.className,
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                        {badge.label}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <StatBlock value={meal.proteinG} unit="g" label="Proteina" size="sm" color="emerald" />
                  <StatBlock value={meal.carbsG} unit="g" label="Carboidrato" size="sm" color="blue" />
                  <StatBlock value={meal.fatG} unit="g" label="Gordura" size="sm" color="gold" />
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                    <span className="text-[var(--text-secondary)]">Proporcao calorica</span>
                    <span className="font-mono text-[var(--text-primary)]">
                      {formatPct(Math.round((meal.kcal / Math.max(totals.kcal, 1)) * 100))}% do dia
                    </span>
                  </div>

                  <div className="flex h-3 overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-active)]">
                    <div style={{ width: `${Math.max(8, segments.proteinPct)}%` }} className="bg-[var(--emerald-500)]" />
                    <div style={{ width: `${Math.max(8, segments.carbsPct)}%` }} className="bg-[var(--blue-500)]" />
                    <div style={{ width: `${Math.max(8, segments.fatPct)}%` }} className="bg-[var(--gold-500)]" />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    <span>P {formatPct(segments.proteinPct)}%</span>
                    <span>C {formatPct(segments.carbsPct)}%</span>
                    <span>G {formatPct(segments.fatPct)}%</span>
                  </div>
                </div>
              </DataCard>
            );
          })}
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard hoverable className="p-[var(--space-6)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Leitura do dia
                </div>
                <div className="mt-1 text-sm leading-[1.7] text-[var(--text-secondary)]">
                  {displayMeals.some((meal) => meal.tag === 'pre')
                    ? 'A distribuicao reserva combustivel antes do treino e acelera a reposicao logo depois.'
                    : 'A distribuicao se mantem linear ao longo do dia, sem janelas especiais.'}
                  {usingFallbackMeals
                    ? ' Os cards abaixo usam uma distribuicao exemplo para a secao continuar visivel mesmo sem plano detalhado salvo.'
                    : ''}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Activity className="h-3.5 w-3.5 text-[var(--blue-400)]" />
                  {formatKcal(totals.kcal)} kcal no prato
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Flame className="h-3.5 w-3.5 text-[var(--gold-400)]" />
                  {formatGram(totals.proteinG + totals.carbsG + totals.fatG)}g de macros
                </span>
              </div>
            </div>
          </DataCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
