import { motion } from 'framer-motion';
import { Activity, ArrowRight, Clock3, Sparkles, Target, TrendingDown } from 'lucide-react';
import { useMemo } from 'react';

import { ProjectionTrendChart, type ProjectionTrendPoint } from '@/components/charts/ProjectionTrendChart';
import { ChartContainer, DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { Badge } from '@/components/ui/primitives/badge';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';
import type { CalculationResults, FormData } from '@/lib/types';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardPanelVariants,
  formatKcal,
  formatKg,
  formatPct,
} from './shared';

interface ProjectionSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
  onGoToGoalStep: () => void;
}

const CLASSIFICATION_META = {
  realista: {
    label: 'Realista',
    className: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
    glow: 'emerald' as const,
  },
  agressivo: {
    label: 'Agressivo',
    className: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
    glow: 'gold' as const,
  },
  inviavel: {
    label: 'Inviavel',
    className: 'border-[var(--red-glow)] bg-[var(--red-glow)] text-[var(--red-400)]',
    glow: 'none' as const,
  },
} as const;

const formatDecimal = (value: number, digits = 1) =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const getInterpolatedValue = (start: number, end: number, progress: number) => start + (end - start) * progress;

const getPaceMeta = (weeklyRateKg: number) => {
  const rate = Math.abs(weeklyRateKg);

  if (rate < 0.35) {
    return {
      label: 'Ritmo conservador',
      className: 'border-[var(--border-default)] bg-[var(--bg-deep)] text-[var(--text-secondary)]',
    };
  }

  if (rate < 0.75) {
    return {
      label: 'Ritmo moderado',
      className: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
    };
  }

  return {
    label: 'Ritmo acelerado',
    className: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
  };
};

const getFatMassKg = (weightKg: number, bodyFatPct: number | null) => {
  if (bodyFatPct === null) {
    return null;
  }

  return weightKg * (bodyFatPct / 100);
};

const getLeanMassKg = (weightKg: number, bodyFatPct: number | null, fallback: number | null) => {
  if (bodyFatPct === null) {
    return fallback;
  }

  return weightKg * (1 - bodyFatPct / 100);
};

const buildProjectionPoints = (
  projection: NonNullable<CalculationResults['projection']>,
  beforeAfter: NonNullable<CalculationResults['beforeAfter']>,
): ProjectionTrendPoint[] => {
  const anchors = [
    {
      week: 0,
      weightKg: beforeAfter.now.weightKg,
      bodyFatPct: beforeAfter.now.bodyFatPct,
      fatLostKg: 0,
    },
    ...projection.milestones.map((milestone) => ({
      week: milestone.week,
      weightKg: milestone.weightKg,
      bodyFatPct: milestone.bodyFatPct,
      fatLostKg: milestone.fatLostKg,
    })),
  ]
    .filter((anchor, index, list) => list.findIndex((item) => item.week === anchor.week) === index)
    .sort((left, right) => left.week - right.week);

  const lastWeek = anchors.at(-1)?.week ?? 0;

  return Array.from({ length: lastWeek + 1 }, (_, week) => {
    const exact = anchors.find((anchor) => anchor.week === week);
    if (exact) {
      return {
        week,
        label: `S${week}`,
        weightKg: exact.weightKg,
        bodyFatPct: exact.bodyFatPct,
        fatLostKg: exact.fatLostKg,
      };
    }

    const nextIndex = anchors.findIndex((anchor) => anchor.week > week);
    const next = nextIndex >= 0 ? anchors[nextIndex] : anchors.at(-1);
    const previous = nextIndex > 0 ? anchors[nextIndex - 1] : anchors[0];

    if (!previous || !next) {
      const fallback = anchors[0];
      return {
        week,
        label: `S${week}`,
        weightKg: fallback?.weightKg ?? 0,
        bodyFatPct: fallback?.bodyFatPct ?? null,
        fatLostKg: fallback?.fatLostKg ?? 0,
      };
    }

    const span = Math.max(next.week - previous.week, 1);
    const progress = (week - previous.week) / span;
    const bodyFatPct =
      typeof previous.bodyFatPct === 'number' && typeof next.bodyFatPct === 'number'
        ? getInterpolatedValue(previous.bodyFatPct, next.bodyFatPct, progress)
        : previous.bodyFatPct ?? next.bodyFatPct ?? null;

    return {
      week,
      label: `S${week}`,
      weightKg: getInterpolatedValue(previous.weightKg, next.weightKg, progress),
      bodyFatPct,
      fatLostKg: getInterpolatedValue(previous.fatLostKg, next.fatLostKg, progress),
    };
  });
};

const getPointForWeek = (points: ProjectionTrendPoint[], week: number): ProjectionTrendPoint | null => {
  const fallback = points[0];
  if (!fallback) {
    return null;
  }

  const direct = points.find((point) => point.week === week);
  if (direct) {
    return direct;
  }

  return points.reduce((closest, point) => {
    if (!closest) {
      return point;
    }

    return Math.abs(point.week - week) < Math.abs(closest.week - week) ? point : closest;
  }, fallback);
};

export const ProjectionSlide = ({ activated, results, formData, onGoToGoalStep }: ProjectionSlideProps) => {
  const projection = results.projection;
  const beforeAfter = results.beforeAfter;

  const projectionState = useMemo(() => {
    if (!projection || !beforeAfter) {
      return null;
    }

    const points = buildProjectionPoints(projection, beforeAfter);
    if (points.length === 0) {
      return null;
    }

    const totalWeeks = points.at(-1)?.week ?? formData.targetWeeks ?? 0;
    const checkpointWeeks = [0, Math.max(1, Math.round(totalWeeks * 0.25)), Math.max(1, Math.round(totalWeeks * 0.5)), totalWeeks]
      .filter((week, index, list) => list.indexOf(week) === index)
      .map((week) => getPointForWeek(points, week))
      .filter((point): point is ProjectionTrendPoint => point !== null);

    const currentFatMass = getFatMassKg(beforeAfter.now.weightKg, beforeAfter.now.bodyFatPct);
    const projectedFatMass = getFatMassKg(beforeAfter.projected.weightKg, beforeAfter.projected.bodyFatPct);
    const currentLeanMass = getLeanMassKg(beforeAfter.now.weightKg, beforeAfter.now.bodyFatPct, beforeAfter.now.leanMassKg);
    const projectedLeanMass = getLeanMassKg(
      beforeAfter.projected.weightKg,
      beforeAfter.projected.bodyFatPct,
      beforeAfter.projected.leanMassKg,
    );

    return {
      points,
      totalWeeks,
      targetWeightKg: beforeAfter.projected.weightKg,
      currentWeightKg: beforeAfter.now.weightKg,
      projectedWeightKg: beforeAfter.projected.weightKg,
      currentBodyFatPct: beforeAfter.now.bodyFatPct,
      projectedBodyFatPct: beforeAfter.projected.bodyFatPct,
      currentFatMass,
      projectedFatMass,
      currentLeanMass,
      projectedLeanMass,
      checkpointWeeks,
      totalLossKg: beforeAfter.now.weightKg - beforeAfter.projected.weightKg,
    };
  }, [beforeAfter, formData.targetWeeks, projection]);

  const classificationMeta = projection ? CLASSIFICATION_META[projection.classification] : CLASSIFICATION_META.realista;
  const paceMeta = getPaceMeta(results.weeklyRateKg);

  const currentWeightAnimated = useCountUp(
    Math.round((projectionState?.currentWeightKg ?? results.beforeAfter?.now.weightKg ?? results.beforeAfter?.projected.weightKg ?? 0) * 10),
    activated,
    950,
  );
  const targetWeightAnimated = useCountUp(
    Math.round((projectionState?.projectedWeightKg ?? 0) * 10),
    activated,
    950,
  );
  const weeklyRateAnimated = useCountUp(Math.round(Math.abs(results.weeklyRateKg) * 100), activated, 950);
  const totalWeeksAnimated = useCountUp(projectionState?.totalWeeks ?? formData.targetWeeks ?? 0, activated, 950);

  if (!projection || !beforeAfter || !projectionState) {
    const sampleWeeks = Math.max(8, formData.targetWeeks ?? 12);
    const sampleWeeklyRate = Math.max(0.3, Math.abs(results.weeklyRateKg) || 0.45);
    const sampleTargetWeight =
      results.dailyDelta >= 0
        ? Math.max(formData.weightKg - sampleWeeklyRate * sampleWeeks, formData.weightKg * 0.84)
        : formData.weightKg + sampleWeeklyRate * sampleWeeks;

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
              eyebrow="05 - PROJECAO"
              title={<span id="dfp-heading-projection">Curva semanal ate a meta</span>}
              subtitle="Sem projeccao fechada, o dashboard continua exibindo uma leitura de referencia para a secao nunca ficar vazia."
              action={
                <Badge variant="outline" className="border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]">
                  Dados de exemplo
                </Badge>
              }
            />
          </motion.div>

          <motion.div variants={dashboardPanelVariants}>
            <DataCard hoverable glow="gold" className="grid gap-6 p-[var(--space-6)] xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
                    <Target className="h-3.5 w-3.5" />
                    Sem projeccao ativa
                  </div>
                  <div className="text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                    Defina meta e prazo para liberar a curva
                  </div>
                  <p className="max-w-[38rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    A meta quantitativa ainda nao fechou uma curva valida. Enquanto isso, a secao mostra uma referencia visual para manter ritmo, prazo e direcao legiveis.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <StatBlock
                    value={formatDecimal(sampleWeeklyRate, 2)}
                    unit="kg/sem"
                    label="Ritmo de referencia"
                    sublabel="Estimativa padrao para manter leitura da secao."
                    size="sm"
                    color="gold"
                  />
                  <StatBlock
                    value={sampleWeeks}
                    unit="sem"
                    label="Janela simulada"
                    sublabel="Prazo base usado enquanto a meta nao fecha."
                    size="sm"
                    color="blue"
                  />
                  <StatBlock
                    value={formatDecimal(sampleTargetWeight, 1)}
                    unit="kg"
                    label="Peso final exemplo"
                    sublabel="Referencia visual temporaria."
                    size="sm"
                    color="emerald"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-5 rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]">
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    O que falta
                  </div>
                  <p className="text-sm leading-[1.7] text-[var(--text-secondary)]">
                    Feche meta quantitativa e prazo no fluxo principal para liberar a curva completa, checkpoints semanais e leitura antes-vs-depois.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Meta quantitativa</Badge>
                    <Badge variant="outline">Prazo definido</Badge>
                    <Badge variant="outline">Curva semanal</Badge>
                  </div>
                </div>

                <button type="button" className="btn-dash-cta self-start" onClick={onGoToGoalStep}>
                  Ir para meta e prazo
                </button>
              </div>
            </DataCard>
          </motion.div>
        </motion.div>
      </SectionShell>
    );
  }

  const timelineCopy = [
    {
      title: 'Partida',
      tone: 'emerald',
      description: `Peso atual ${formatKg(projectionState.currentWeightKg)} kg${
        projectionState.currentBodyFatPct !== null ? ` · BF ${formatDecimal(projectionState.currentBodyFatPct, 1)}%` : ''
      }.`,
    },
    {
      title: 'Checkpoint inicial',
      tone: 'blue',
      description: `A curva ja acumula ${formatDecimal(projectionState.checkpointWeeks[1]?.fatLostKg ?? 0, 1)} kg estimados de gordura.`,
    },
    {
      title: 'Meio do protocolo',
      tone: 'gold',
      description: `Semana ${projectionState.checkpointWeeks[2]?.week ?? 0} com ${formatKg(projectionState.checkpointWeeks[2]?.weightKg ?? 0)} kg projetados.`,
    },
    {
      title: 'Chegada',
      tone: 'emerald',
      description: `Meta em ${projectionState.totalWeeks} semanas, fechando em ${formatKg(projectionState.projectedWeightKg)} kg.`,
    },
  ] as const;

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
            eyebrow="05 - PROJECAO"
            title={<span id="dfp-heading-projection">Curva semanal ate a meta</span>}
            subtitle="Peso atual e peso alvo aparecem na mesma trilha, com leitura semanal continua, ritmo estimado e checkpoints fixos do protocolo."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]',
                    classificationMeta.className,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  {classificationMeta.label}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]',
                    paceMeta.className,
                  )}
                >
                  <Activity className="h-3.5 w-3.5" />
                  {paceMeta.label}
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <ChartContainer
            title="Peso projetado semana a semana"
            subtitle={`Curva fechada em ${projectionState.totalWeeks} semanas com meta final de ${formatKg(projectionState.projectedWeightKg)} kg.`}
            legend={[
              { label: 'Peso projetado', tone: 'emerald', style: 'solid' },
              { label: 'Meta final', tone: 'muted', style: 'dashed' },
            ]}
            height={380}
            glow="emerald"
          >
            <ProjectionTrendChart
              points={projectionState.points}
              targetWeightKg={projectionState.targetWeightKg}
            />
          </ChartContainer>
        </motion.div>

        <motion.div className="grid gap-4 xl:grid-cols-4" variants={dashboardItemVariants}>
          <DataCard hoverable className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <Target className="h-4 w-4 text-[var(--emerald-400)]" />
              Peso atual
            </div>
            <StatBlock
              value={formatDecimal(currentWeightAnimated / 10, 1)}
              unit="kg"
              label="Partida do protocolo"
              sublabel="Estado atual usado como ancora da curva."
              size="md"
              color="default"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable glow="emerald" className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <TrendingDown className="h-4 w-4 text-[var(--emerald-400)]" />
              Peso final
            </div>
            <StatBlock
              value={formatDecimal(targetWeightAnimated / 10, 1)}
              unit="kg"
              label="Chegada estimada"
              sublabel={`${formatDecimal(projectionState.totalLossKg, 1)} kg abaixo do peso atual`}
              size="md"
              color="emerald"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable glow="gold" className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <Sparkles className="h-4 w-4 text-[var(--gold-400)]" />
              Velocidade
            </div>
            <StatBlock
              value={formatDecimal(weeklyRateAnimated / 100, 2)}
              unit="kg/sem"
              label="Ritmo semanal"
              sublabel={`${formatKcal(Math.abs(results.dailyDelta))} kcal de ajuste por dia`}
              size="md"
              color="gold"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <Clock3 className="h-4 w-4 text-[var(--blue-400)]" />
              Horizonte
            </div>
            <StatBlock
              value={totalWeeksAnimated}
              unit="sem"
              label="Janela estimada"
              sublabel={`Aproximadamente ${Math.max(1, Math.ceil(projectionState.totalWeeks / 4))} meses para completar a curva.`}
              size="md"
              color="blue"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>
        </motion.div>

        <motion.div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]" variants={dashboardPanelVariants}>
          <DataCard data-testid="projection-before-after" hoverable glow={classificationMeta.glow} className="p-[var(--space-6)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Antes vs depois
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  Comparacao direta entre o estado atual e a estimativa final do protocolo.
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] uppercase tracking-[2px] text-[var(--text-secondary)]">
                Semana {projectionState.totalWeeks}
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
              <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]">
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">Atual</div>
                <div className="mt-3 font-mono text-[36px] font-semibold tracking-[-2px] text-[var(--text-primary)]">
                  {formatKg(projectionState.currentWeightKg)}
                  <span className="ml-1 text-sm text-[var(--text-muted)]">kg</span>
                </div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  {projectionState.currentBodyFatPct !== null
                    ? `BF ${formatDecimal(projectionState.currentBodyFatPct, 1)}%`
                    : 'BF indisponivel'}
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  {projectionState.currentLeanMass !== null
                    ? `${formatDecimal(projectionState.currentLeanMass, 1)} kg de massa magra`
                    : 'Massa magra indisponivel'}
                </div>
              </div>

              <div className="hidden items-center justify-center lg:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-[var(--radius-xl)] border border-[var(--border-emerald)] bg-[linear-gradient(135deg,var(--emerald-glow-subtle),transparent)] p-[var(--space-5)]">
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
                  Projeccao final
                </div>
                <div className="mt-3 font-mono text-[36px] font-semibold tracking-[-2px] text-[var(--emerald-400)] [text-shadow:var(--text-glow-emerald-stat)]">
                  {formatKg(projectionState.projectedWeightKg)}
                  <span className="ml-1 text-sm text-[var(--text-secondary)]">kg</span>
                </div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  {projectionState.projectedBodyFatPct !== null
                    ? `BF ${formatDecimal(projectionState.projectedBodyFatPct, 1)}%`
                    : 'BF indisponivel'}
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  {projectionState.projectedLeanMass !== null
                    ? `${formatDecimal(projectionState.projectedLeanMass, 1)} kg de massa magra`
                    : 'Massa magra indisponivel'}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">Peso</div>
                <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--emerald-400)]">
                  -{formatDecimal(projectionState.totalLossKg, 1)}
                  <span className="ml-1 text-xs text-[var(--text-secondary)]">kg</span>
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">Gordura</div>
                <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--gold-400)]">
                  {projectionState.currentFatMass !== null && projectionState.projectedFatMass !== null
                    ? `-${formatDecimal(projectionState.currentFatMass - projectionState.projectedFatMass, 1)}`
                    : '--'}
                  <span className="ml-1 text-xs text-[var(--text-secondary)]">kg</span>
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">Massa magra</div>
                <div className="mt-2 font-mono text-[22px] font-semibold tracking-[-1px] text-[var(--blue-400)]">
                  {projectionState.currentLeanMass !== null && projectionState.projectedLeanMass !== null
                    ? formatDecimal(projectionState.projectedLeanMass - projectionState.currentLeanMass, 1)
                    : '--'}
                  <span className="ml-1 text-xs text-[var(--text-secondary)]">kg</span>
                </div>
              </div>
            </div>
          </DataCard>

          <DataCard data-testid="projection-timeline" hoverable className="p-[var(--space-6)]">
            <div className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                Timeline estimada
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                Quatro marcos fixos para ler o protocolo sem depender da tabela legacy.
              </div>
            </div>

            <div className="space-y-4">
              {projectionState.checkpointWeeks.map((point, index) => (
                <div key={`${point.week}-${timelineCopy[index]?.title}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] font-semibold',
                        timelineCopy[index]?.tone === 'emerald' &&
                          'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
                        timelineCopy[index]?.tone === 'blue' &&
                          'border-[var(--border-blue)] bg-[var(--blue-glow-subtle)] text-[var(--blue-400)]',
                        timelineCopy[index]?.tone === 'gold' &&
                          'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
                      )}
                    >
                      S{point.week}
                    </div>
                    {index < projectionState.checkpointWeeks.length - 1 ? (
                      <div className="mt-2 h-full min-h-[36px] w-px bg-[linear-gradient(to_bottom,var(--border-emerald),transparent)]" />
                    ) : null}
                  </div>

                  <div className="min-w-0 pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]">{timelineCopy[index]?.title}</div>
                      <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)]">
                        {formatKg(point.weightKg)} kg
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-[1.7] text-[var(--text-secondary)]">
                      {timelineCopy[index]?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DataCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
