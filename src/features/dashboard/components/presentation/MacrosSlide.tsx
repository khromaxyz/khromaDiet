import { motion } from 'framer-motion';
import { Activity, Sparkles, Target } from 'lucide-react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { useCountUp } from '@/hooks/useCountUp';
import type { CalculationResults } from '@/lib/types';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardBarTransition,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardMicroItemVariants,
  dashboardPanelVariants,
  dashboardStaggerGroupVariants,
  formatKcal,
  formatPct,
} from './shared';

interface MacrosSlideProps {
  results: CalculationResults;
  activated: boolean;
}

type MacroId = 'protein' | 'carbs' | 'fat';

interface MacroCardItem {
  id: MacroId;
  label: string;
  value: number;
  percentage: number;
  calories: number;
  floor: number;
  ceiling: number;
  glow: 'emerald' | 'blue' | 'gold';
  statColor: 'emerald' | 'blue' | 'gold';
  railColor: string;
  background: string;
  border: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const MacrosSlide = ({ results, activated }: MacrosSlideProps) => {
  const totalCalories = Math.round(results.macros.calories);
  const totalCaloriesAnimated = useCountUp(totalCalories, activated, 1000);
  const proteinTarget = Math.round(results.macros.proteinG);
  const carbsTarget = Math.round(results.macros.carbsG);
  const fatTarget = Math.round(results.macros.fatG);

  const macroItems: MacroCardItem[] = [
    {
      id: 'protein',
      label: 'Proteina',
      value: proteinTarget,
      percentage: results.macros.proteinPct,
      calories: Math.round(results.macros.proteinG * 4),
      floor: Math.round(results.macros.floors.protein),
      ceiling: Math.round(results.macros.ceilings.protein),
      glow: 'emerald',
      statColor: 'emerald',
      railColor: 'var(--emerald-500)',
      background: 'var(--emerald-glow-subtle)',
      border: 'var(--border-emerald)',
    },
    {
      id: 'carbs',
      label: 'Carboidrato',
      value: carbsTarget,
      percentage: results.macros.carbsPct,
      calories: Math.round(results.macros.carbsG * 4),
      floor: Math.round(results.macros.floors.carbs),
      ceiling: Math.round(results.macros.ceilings.carbs),
      glow: 'blue',
      statColor: 'blue',
      railColor: 'var(--blue-500)',
      background: 'var(--blue-glow-subtle)',
      border: 'var(--border-blue)',
    },
    {
      id: 'fat',
      label: 'Gordura',
      value: fatTarget,
      percentage: results.macros.fatPct,
      calories: Math.round(results.macros.fatG * 9),
      floor: Math.round(results.macros.floors.fat),
      ceiling: Math.round(results.macros.ceilings.fat),
      glow: 'gold',
      statColor: 'gold',
      railColor: 'var(--gold-500)',
      background: 'var(--gold-glow-subtle)',
      border: 'var(--border-gold)',
    },
  ];

  const animatedValues = {
    protein: useCountUp(proteinTarget, activated, 950),
    carbs: useCountUp(carbsTarget, activated, 950),
    fat: useCountUp(fatTarget, activated, 950),
  };

  const totalGrams = macroItems.reduce((sum, macro) => sum + macro.value, 0);

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
            eyebrow="04 - MACRONUTRIENTS"
            title={<span id="dfp-heading-macros">Distribuicao calorica por macro</span>}
            subtitle="Proteina, carboidrato e gordura aparecem como cards da mesma familia visual, com faixa recomendada, participacao calorica e validacao final da soma."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Target className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  {formatKcal(totalCalories)} kcal
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-400)] shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                  Split ativo
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard hoverable className="grid gap-6 p-[var(--space-6)] xl:grid-cols-[1fr_0.95fr]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                <Activity className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                Calorias do protocolo
              </div>

              <StatBlock
                value={totalCaloriesAnimated}
                unit="kcal"
                label="Target diario"
                sublabel="Soma validada dos tres macros em uma unica meta diaria."
                size="lg"
                color="emerald"
                className={CARDLESS_STAT_BLOCK_CLASSNAME}
              />

              <p className="max-w-[38rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                O total calorico foi decomposto em {totalGrams.toLocaleString('pt-BR')}g de macros.
                Cada card abaixo mostra a participacao no total e o quanto o valor atual avancou
                dentro da faixa recomendada.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Composicao calorica
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">
                    Participacao de cada macro dentro das {formatKcal(totalCalories)} kcal.
                  </div>
                </div>

                <div className="rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                  4 / 4 / 9
                </div>
              </div>

              <motion.div className="space-y-4" variants={dashboardStaggerGroupVariants}>
                <div className="flex h-5 overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-active)]">
                  {macroItems.map((macro, index) => (
                    <motion.div
                      key={macro.id}
                      initial={false}
                      animate={{
                        width: activated ? `${Math.max(6, macro.percentage)}%` : '0%',
                      }}
                      transition={{
                        ...dashboardBarTransition,
                        delay: index * 0.05,
                      }}
                      style={{ backgroundColor: macro.railColor }}
                    />
                  ))}
                </div>

                <motion.div className="grid gap-3 sm:grid-cols-3" variants={dashboardStaggerGroupVariants}>
                  {macroItems.map((macro) => (
                    <motion.div
                      key={macro.id}
                      className="rounded-[var(--radius-lg)] border p-[var(--space-4)]"
                      style={{ borderColor: macro.border, backgroundColor: macro.background }}
                      variants={dashboardMicroItemVariants}
                    >
                      <div
                        className="text-[11px] font-semibold uppercase tracking-[2px]"
                        style={{ color: macro.railColor }}
                      >
                        {macro.label}
                      </div>
                      <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                        {formatPct(macro.percentage)}%
                      </div>
                      <div className="mt-1 text-sm text-[var(--text-secondary)]">
                        {formatKcal(macro.calories)} kcal
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </DataCard>
        </motion.div>

        <motion.div className="grid gap-4 xl:grid-cols-3" variants={dashboardStaggerGroupVariants}>
          {macroItems.map((macro) => {
            const rangeSpan = Math.max(macro.ceiling - macro.floor, 1);
            const fillPct = clamp(((macro.value - macro.floor) / rangeSpan) * 100, 0, 100);

            return (
              <motion.div key={macro.id} variants={dashboardMicroItemVariants}>
                <DataCard glow={macro.glow} hoverable className="p-[var(--space-5)]">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                        {macro.label}
                      </div>
                      <div className="mt-1 text-sm text-[var(--text-secondary)]">
                        {formatPct(macro.percentage)}% do total · {formatKcal(macro.calories)} kcal
                      </div>
                    </div>

                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]"
                      style={{
                        color: macro.railColor,
                        borderColor: macro.border,
                        backgroundColor: macro.background,
                      }}
                    >
                      {macro.floor} - {macro.ceiling}g
                    </span>
                  </div>

                  <StatBlock
                    value={animatedValues[macro.id]}
                    unit="g"
                    label={macro.label}
                    sublabel={`Faixa recomendada ${macro.floor}g a ${macro.ceiling}g`}
                    size="lg"
                    color={macro.statColor}
                    className={CARDLESS_STAT_BLOCK_CLASSNAME}
                  />

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-[var(--text-secondary)]">Posicao na faixa</span>
                      <span className="font-mono text-[var(--text-primary)]">
                        {formatPct(fillPct)}%
                      </span>
                    </div>

                    <div className="relative h-3 overflow-hidden rounded-full bg-[var(--bg-active)]">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        initial={false}
                        animate={{
                          width: activated ? `${Math.max(5, fillPct)}%` : '0%',
                        }}
                        transition={dashboardBarTransition}
                        style={{
                          backgroundColor: macro.railColor,
                          boxShadow: `0 0 28px ${macro.railColor}`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                      <span>Min {macro.floor}g</span>
                      <span>Atual {macro.value}g</span>
                      <span>Max {macro.ceiling}g</span>
                    </div>
                  </div>
                </DataCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard hoverable className="p-[var(--space-6)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Prova calorica
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  Validacao direta da soma dos macros com a densidade 4 / 4 / 9 kcal por grama.
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                Soma validada
              </span>
            </div>

            <motion.div
              className="grid gap-4 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.1fr] xl:items-center"
              variants={dashboardStaggerGroupVariants}
            >
              {macroItems.map((macro, index) => (
                <motion.div key={macro.id} className="contents" variants={dashboardMicroItemVariants}>
                  <div
                    className="rounded-[var(--radius-lg)] border p-[var(--space-4)]"
                    style={{ borderColor: macro.border, backgroundColor: macro.background }}
                  >
                    <div
                      className="text-[11px] font-semibold uppercase tracking-[2px]"
                      style={{ color: macro.railColor }}
                    >
                      {macro.label}
                    </div>
                    <div className="mt-2 font-mono text-[20px] font-semibold tracking-[-0.8px] text-[var(--text-primary)]">
                      {animatedValues[macro.id]}g
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-secondary)]">
                      {formatKcal(macro.calories)} kcal
                    </div>
                  </div>

                  {index < macroItems.length - 1 ? (
                    <div className="hidden text-center font-mono text-[24px] text-[var(--text-muted)] xl:block">
                      +
                    </div>
                  ) : null}
                </motion.div>
              ))}

              <div className="hidden text-center font-mono text-[24px] text-[var(--text-muted)] xl:block">
                =
              </div>

              <motion.div
                className="rounded-[var(--radius-xl)] border border-[var(--border-emerald)] bg-[linear-gradient(135deg,var(--emerald-glow-subtle),transparent)] p-[var(--space-5)]"
                variants={dashboardMicroItemVariants}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
                  Resultado
                </div>
                <div className="mt-2 font-mono text-[32px] font-semibold tracking-[-1.5px] text-[var(--emerald-400)] [text-shadow:var(--text-glow-emerald-stat)]">
                  {formatKcal(totalCaloriesAnimated)}
                  <span className="ml-1 text-sm text-[var(--text-secondary)]">kcal</span>
                </div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  Meta final fechada para o protocolo diario.
                </div>
              </motion.div>
            </motion.div>
          </DataCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
