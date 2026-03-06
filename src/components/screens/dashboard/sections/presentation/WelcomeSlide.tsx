import { motion } from 'framer-motion';
import {
  Activity,
  CalendarDays,
  Clock3,
  Gauge,
  Scale,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { useCountUp } from '@/hooks/useCountUp';
import { GOAL_LABELS } from '@/lib/constants/labels';
import type { SharedProfileMeta } from '@/lib/profiles/types';
import type { CalculationResults, FormData } from '@/lib/types';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardPanelVariants,
  formatKcal,
  formatKg,
  formatPct,
  formatShortDate,
} from './shared';

interface WelcomeSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
  profileMeta: (SharedProfileMeta & { createdAt?: string }) | undefined;
}

const STATUS_STYLES = {
  active:
    'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
  caution: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
  danger: 'border-[var(--red-glow)] bg-[var(--red-glow)] text-[var(--red-400)]',
} as const;

const getPlanStatus = (
  classification: CalculationResults['projection'] extends infer T
    ? T extends { classification: infer C }
      ? C | null
      : null
    : null,
) => {
  if (classification === 'inviavel') {
    return {
      label: 'Ajuste requerido',
      className: STATUS_STYLES.danger,
    };
  }

  if (classification === 'agressivo') {
    return {
      label: 'Faixa agressiva',
      className: STATUS_STYLES.caution,
    };
  }

  return {
    label: 'Protocolo ativo',
    className: STATUS_STYLES.active,
  };
};

export const WelcomeSlide = ({ activated, results, formData, profileMeta }: WelcomeSlideProps) => {
  const goalLabel = GOAL_LABELS[formData.goal];
  const profileName = profileMeta?.name?.trim() || `Plano ${goalLabel}`;
  const createdAtLabel = formatShortDate(profileMeta?.createdAt);
  const projectedWeek = results.projection?.milestones.at(-1)?.week ?? formData.targetWeeks ?? null;
  const projectedWeight =
    formData.targetWeightKg ??
    results.beforeAfter?.projected.weightKg ??
    results.projection?.milestones.at(-1)?.weightKg ??
    null;
  const currentWeight = formData.weightKg;
  const remainingWeight =
    projectedWeight !== null ? Math.abs(currentWeight - projectedWeight) : null;
  const isDeficit = results.dailyDelta >= 0;
  const precisionPct = Math.round(results.precision.precisionPct);
  const activityKcal = Math.max(Math.round(results.tdeeFinal - results.bmr.bmr), 0);
  const weeklyRateTarget = Math.round(Math.abs(results.weeklyRateKg) * 10);

  const tdee = useCountUp(Math.round(results.tdeeFinal), activated, 900);
  const goalCalories = useCountUp(Math.round(results.goalCalories), activated, 900);
  const dailyDelta = useCountUp(Math.round(Math.abs(results.dailyDelta)), activated, 900);
  const projectedWeeks = useCountUp(projectedWeek ?? 0, activated, 900);
  const weeklyRate = useCountUp(weeklyRateTarget, activated, 900) / 10;

  const status = getPlanStatus(results.projection?.classification ?? null);
  const macroChips = [
    {
      id: 'protein',
      label: 'Proteina',
      value: `${Math.round(results.macros.proteinG)}g`,
      color: 'var(--emerald-400)',
      background: 'var(--emerald-glow-subtle)',
      border: 'var(--border-emerald)',
    },
    {
      id: 'carbs',
      label: 'Carbo',
      value: `${Math.round(results.macros.carbsG)}g`,
      color: 'var(--blue-400)',
      background: 'var(--blue-glow-subtle)',
      border: 'var(--border-blue)',
    },
    {
      id: 'fat',
      label: 'Gordura',
      value: `${Math.round(results.macros.fatG)}g`,
      color: 'var(--gold-400)',
      background: 'var(--gold-glow-subtle)',
      border: 'var(--border-gold)',
    },
  ];

  const kpis = [
    {
      id: 'tdee',
      label: 'TDEE',
      value: tdee,
      unit: 'kcal',
      sublabel: `Base ${formatKcal(results.bmr.bmr)} · atividade ${formatKcal(activityKcal)}`,
      icon: Gauge,
      color: 'emerald' as const,
    },
    {
      id: 'goal',
      label: 'Meta',
      value: goalCalories,
      unit: 'kcal',
      sublabel: goalLabel,
      icon: Target,
      color: 'emerald' as const,
    },
    {
      id: 'delta',
      label: isDeficit ? 'Deficit diario' : 'Superavit diario',
      value: dailyDelta,
      unit: 'kcal',
      sublabel: `${isDeficit ? '-' : '+'}${formatPct(Math.abs(results.goalDeltaPct))}% vs manutencao`,
      icon: isDeficit ? TrendingDown : TrendingUp,
      color: 'emerald' as const,
    },
    {
      id: 'timeline',
      label: 'Prazo',
      value: projectedWeek ? projectedWeeks : '--',
      unit: projectedWeek ? 'sem' : undefined,
      sublabel:
        projectedWeight !== null ? `Alvo ${formatKg(projectedWeight)} kg` : 'Revisar timeline',
      icon: Clock3,
      color: 'emerald' as const,
    },
  ];

  const title = (
    <span id="dfp-heading-welcome" className="block">
      {profileName}
    </span>
  );

  return (
    <SectionShell
      level="base"
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
            eyebrow="01 — WELCOME"
            title={title}
            subtitle="Leitura consolidada do protocolo: gasto, alvo calorico, ritmo e distribuicao de macros alinhados no mesmo plano."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] ${status.className}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  {status.label}
                </span>
                {createdAtLabel ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Criado em {createdAtLabel}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  {goalLabel}
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          variants={dashboardItemVariants}
        >
          {kpis.map((item) => {
            const Icon = item.icon;

            return (
              <DataCard key={item.id} glow="emerald" hoverable className="p-[var(--space-5)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                    <Icon className="h-4 w-4 text-[var(--emerald-400)]" />
                    {item.label}
                  </span>
                </div>

                <StatBlock
                  value={item.value}
                  unit={item.unit}
                  label={item.label}
                  sublabel={item.sublabel}
                  size="md"
                  color={item.color}
                  align="start"
                  className={CARDLESS_STAT_BLOCK_CLASSNAME}
                />
              </DataCard>
            );
          })}
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard
            hoverable
            className="grid gap-6 p-[var(--space-6)] xl:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Activity className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  Protocol snapshot
                </div>

                <div className="max-w-[42rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  {profileName} roda com manutencao em{' '}
                  <span className="text-[var(--text-primary)]">
                    {formatKcal(results.tdeeFinal)} kcal
                  </span>
                  , meta em{' '}
                  <span className="text-[var(--text-primary)]">
                    {formatKcal(results.goalCalories)} kcal
                  </span>{' '}
                  e uma taxa semanal estimada de{' '}
                  <span className="text-[var(--text-primary)]">
                    {formatPct(Math.abs(results.weeklyRateKg), 1)} kg
                  </span>
                  .
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Peso atual
                  </div>
                  <div className="font-mono text-[32px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {formatKg(currentWeight)}
                    <span className="ml-1 text-sm text-[var(--text-muted)]">kg</span>
                  </div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Alvo
                  </div>
                  <div className="font-mono text-[32px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {projectedWeight !== null ? formatKg(projectedWeight) : '--'}
                    <span className="ml-1 text-sm text-[var(--text-muted)]">kg</span>
                  </div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Distancia
                  </div>
                  <div className="font-mono text-[32px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {remainingWeight !== null ? formatKg(remainingWeight) : '--'}
                    <span className="ml-1 text-sm text-[var(--text-muted)]">kg</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-[var(--bg-surface)]/65 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] p-[var(--space-4)]">
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Precisao do modelo
                  </div>
                  <div className="font-mono text-[24px] font-semibold tracking-[-1px] text-[var(--emerald-400)] [text-shadow:var(--text-glow-emerald-stat)]">
                    {precisionPct}%
                  </div>
                </div>

                <div className="bg-[var(--bg-surface)]/65 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] p-[var(--space-4)]">
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Gasto basal
                  </div>
                  <div className="font-mono text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {formatKcal(results.bmr.bmr)}
                    <span className="ml-1 text-xs text-[var(--text-muted)]">kcal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[linear-gradient(180deg,var(--bg-deep)_0%,rgba(17,18,20,0.82)_100%)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                      Distribuicao de macros
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-secondary)]">
                      Split previsto para sustentar o protocolo.
                    </div>
                  </div>

                  <div className="rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                    {formatKcal(results.macros.calories)} kcal
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {macroChips.map((chip) => (
                    <span
                      key={chip.id}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        color: chip.color,
                        backgroundColor: chip.background,
                        borderColor: chip.border,
                      }}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[1.6px] opacity-80">
                        {chip.label}
                      </span>
                      <span className="font-mono text-[13px] font-semibold">{chip.value}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    {
                      id: 'protein',
                      label: 'Proteina',
                      pct: results.macros.proteinPct,
                      value: `${Math.round(results.macros.proteinG)}g`,
                      tone: 'var(--emerald-500)',
                    },
                    {
                      id: 'carbs',
                      label: 'Carbo',
                      pct: results.macros.carbsPct,
                      value: `${Math.round(results.macros.carbsG)}g`,
                      tone: 'var(--blue-500)',
                    },
                    {
                      id: 'fat',
                      label: 'Gordura',
                      pct: results.macros.fatPct,
                      value: `${Math.round(results.macros.fatG)}g`,
                      tone: 'var(--gold-500)',
                    },
                  ].map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-[var(--text-secondary)]">{item.label}</span>
                        <span className="font-mono text-[var(--text-primary)]">
                          {formatPct(item.pct)}% · {item.value}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-active)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(6, Math.min(100, item.pct))}%`,
                            backgroundColor: item.tone,
                            boxShadow: `0 0 20px ${item.tone}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                  <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    <Scale className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                    Ritmo semanal
                  </div>
                  <div className="font-mono text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {formatPct(weeklyRate, 1)}
                    <span className="ml-1 text-xs text-[var(--text-muted)]">kg/sem</span>
                  </div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                  <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                    Horizonte
                  </div>
                  <div className="font-mono text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    {projectedWeek ? projectedWeeks : '--'}
                    <span className="ml-1 text-xs text-[var(--text-muted)]">sem</span>
                  </div>
                </div>
              </div>
            </div>
          </DataCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
