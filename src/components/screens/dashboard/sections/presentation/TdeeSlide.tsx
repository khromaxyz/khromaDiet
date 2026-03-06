import { motion } from 'framer-motion';
import { Activity, Dumbbell, Flame, Footprints, Sparkles } from 'lucide-react';

import {
  ChartContainer,
  DataCard,
  SectionHeader,
  SectionShell,
  StatBlock,
  type ChartLegendItem,
  type DataCardGlow,
  type StatColor,
} from '@/components/design-system';
import { useCountUp } from '@/hooks/useCountUp';
import {
  ACTIVITY_LEVEL_LABELS,
  CARDIO_MODALITY_LABELS,
  TRAINING_TYPE_LABELS,
} from '@/lib/constants/labels';
import type { CalculationResults, FormData } from '@/lib/types';

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

const BMR_METHOD_LABELS = {
  mifflin: 'Mifflin-St Jeor',
  katch_mcardle: 'Katch-McArdle',
  cunningham: 'Cunningham',
  henry: 'Henry',
} as const;

interface TdeeSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
}

interface TdeeComponent {
  id: 'bmr' | 'neat' | 'eat' | 'cardio' | 'tef';
  shortLabel: string;
  title: string;
  description: string;
  value: number;
  color: StatColor;
  glow: DataCardGlow;
  railColor: string;
  legend: ChartLegendItem;
  icon: typeof Flame;
}

const resolveCardioMethod = (formData: FormData): string => {
  const steps = (formData.stepsPerDay ?? 0).toLocaleString('pt-BR');
  const minutes = formData.cardioMinutesPerDay ?? 0;
  const modality = CARDIO_MODALITY_LABELS[formData.cardioModality];

  if (formData.cardioMode === 'steps') {
    return `${steps} passos/dia`;
  }

  if (formData.cardioMode === 'structured') {
    return `${minutes} min · ${modality}`;
  }

  return `${steps} passos + ${minutes} min · ${modality}`;
};

export const TdeeSlide = ({ activated, results, formData }: TdeeSlideProps) => {
  const tdeeFinalRounded = Math.round(results.tdeeFinal);
  const bmrValue = Math.round(results.breakdown.bmr);
  const neatValue = Math.round(results.breakdown.activityBase + results.breakdown.occupationNEAT);
  const eatValue = Math.round(results.breakdown.eatTraining);
  const cardioValue = Math.round(
    results.breakdown.eatCardioStructured + results.breakdown.eatCardioStepsResidual,
  );
  const tefValue = Math.round(results.breakdown.tef);

  const tdeeAnimated = useCountUp(tdeeFinalRounded, activated, 1100);
  const bmrAnimated = useCountUp(bmrValue, activated, 950);
  const neatAnimated = useCountUp(neatValue, activated, 950);
  const eatAnimated = useCountUp(eatValue, activated, 950);
  const cardioAnimated = useCountUp(cardioValue, activated, 950);
  const tefAnimated = useCountUp(tefValue, activated, 950);
  const trainingSessionsAnimated = useCountUp(formData.trainingSessions, activated, 900);

  const components: TdeeComponent[] = [
    {
      id: 'bmr',
      shortLabel: 'BMR',
      title: 'Taxa basal',
      description: BMR_METHOD_LABELS[results.bmr.method],
      value: bmrValue,
      color: 'emerald',
      glow: 'emerald',
      railColor: 'var(--emerald-500)',
      legend: { label: 'BMR', tone: 'emerald' },
      icon: Flame,
    },
    {
      id: 'neat',
      shortLabel: 'NEAT',
      title: 'Movimento diario',
      description: ACTIVITY_LEVEL_LABELS[formData.activityLevel],
      value: neatValue,
      color: 'gold',
      glow: 'gold',
      railColor: 'var(--gold-500)',
      legend: { label: 'NEAT', tone: 'gold' },
      icon: Footprints,
    },
    {
      id: 'eat',
      shortLabel: 'EAT',
      title: 'Treino',
      description: `${formData.trainingSessions}x/sem · ${formData.trainingDurationMin}min · ${TRAINING_TYPE_LABELS[formData.trainingType]}`,
      value: eatValue,
      color: 'blue',
      glow: 'blue',
      railColor: 'var(--blue-500)',
      legend: { label: 'Treino', tone: 'blue' },
      icon: Dumbbell,
    },
    {
      id: 'cardio',
      shortLabel: 'Cardio',
      title: 'Cardio e passos',
      description: resolveCardioMethod(formData),
      value: cardioValue,
      color: 'default',
      glow: 'none',
      railColor: 'var(--emerald-300)',
      legend: { label: 'Cardio', tone: 'emerald', style: 'soft' },
      icon: Activity,
    },
    {
      id: 'tef',
      shortLabel: 'TEF',
      title: 'Efeito termico',
      description: 'Proteina, carbo e gordura',
      value: tefValue,
      color: 'default',
      glow: 'none',
      railColor: 'var(--text-secondary)',
      legend: { label: 'TEF', tone: 'muted', style: 'dashed' },
      icon: Sparkles,
    },
  ];

  const componentsSum = components.reduce((sum, component) => sum + component.value, 0);
  const animatedComponentValues = {
    bmr: bmrAnimated,
    neat: neatAnimated,
    eat: eatAnimated,
    cardio: cardioAnimated,
    tef: tefAnimated,
  } as const;

  const additiveSteps = components.reduce<
    Array<{
      id: string;
      title: string;
      delta: number;
      cumulative: number;
      previous: number;
      color: string;
      shortLabel: string;
    }>
  >((acc, component) => {
    const previous = acc.at(-1)?.cumulative ?? 0;
    const cumulative = previous + component.value;

    acc.push({
      id: component.id,
      title: component.title,
      delta: component.value,
      cumulative,
      previous,
      color: component.railColor,
      shortLabel: component.shortLabel,
    });

    return acc;
  }, []);

  const dedupApplied =
    results.breakdown.eatCardioStepsResidual > 0 || results.breakdown.eatCardioStructured > 0;

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
            eyebrow="02 - TDEE BREAKDOWN"
            title={<span id="dfp-heading-tdee">De onde vem seu gasto energetico</span>}
            subtitle="Basal, movimento, treino, cardio e efeito termico reunidos na mesma leitura. O TDEE final deixa de ser caixa-preta."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-400)] shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                  {BMR_METHOD_LABELS[results.bmr.method]}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  {dedupApplied ? 'Cardio deduplicado' : 'Sem sobreposicao'}
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard
            glow="emerald"
            hoverable
            className="grid gap-6 p-[var(--space-6)] xl:grid-cols-[1fr_0.9fr]"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
                <Activity className="h-3.5 w-3.5" />
                TDEE final
              </div>

              <StatBlock
                value={tdeeAnimated}
                unit="kcal"
                label="Total diario"
                sublabel="Leitura final apos basal, movimento, treino, cardio e efeito termico."
                size="lg"
                color="emerald"
                className={CARDLESS_STAT_BLOCK_CLASSNAME}
              />

              <p className="max-w-[42rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                Seu protocolo soma a base metabolica com o contexto real de atividade. Cada bloco
                abaixo explica de onde o gasto foi puxado antes de fechar a manutencao diaria.
              </p>
            </div>

            <motion.div className="grid gap-3 sm:grid-cols-2" variants={dashboardStaggerGroupVariants}>
              <motion.div
                className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                variants={dashboardMicroItemVariants}
              >
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Base metabolica
                </div>
                <div className="font-mono text-[28px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                  {formatKcal(bmrAnimated)}
                  <span className="ml-1 text-xs text-[var(--text-muted)]">kcal</span>
                </div>
              </motion.div>

              <motion.div
                className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                variants={dashboardMicroItemVariants}
              >
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Atividade diaria
                </div>
                <div className="font-mono text-[28px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                  {formatKcal(neatAnimated)}
                  <span className="ml-1 text-xs text-[var(--text-muted)]">kcal</span>
                </div>
              </motion.div>

              <motion.div
                className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                variants={dashboardMicroItemVariants}
              >
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Treino da semana
                </div>
                <div className="font-mono text-[28px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                  {trainingSessionsAnimated}x
                  <span className="ml-1 text-xs text-[var(--text-muted)]">sess/sem</span>
                </div>
              </motion.div>

              <motion.div
                className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                variants={dashboardMicroItemVariants}
              >
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Cardio
                </div>
                <div className="font-mono text-[16px] font-semibold tracking-[-0.6px] text-[var(--text-primary)]">
                  {resolveCardioMethod(formData)}
                </div>
              </motion.div>
            </motion.div>
          </DataCard>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          variants={dashboardStaggerGroupVariants}
        >
          {components.map((component) => {
            const Icon = component.icon;

            return (
              <motion.div key={component.id} variants={dashboardMicroItemVariants}>
                <DataCard glow={component.glow} hoverable className="p-[var(--space-5)]">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                        {component.shortLabel}
                      </div>
                      <div className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                        {component.title}
                      </div>
                    </div>

                    <div className="rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] p-2 text-[var(--text-secondary)]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <StatBlock
                    value={animatedComponentValues[component.id]}
                    unit="kcal"
                    label={component.title}
                    sublabel={component.description}
                    size="sm"
                    color={component.color}
                    className={CARDLESS_STAT_BLOCK_CLASSNAME}
                  />
                </DataCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <ChartContainer
            title="Composicao do gasto"
            subtitle="Percentual de cada componente e trilha cumulativa ate o TDEE final."
            legend={components.map((component) => component.legend)}
            height={360}
          >
            <div className="grid h-full gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)]">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Barra empilhada
                  </div>
                  <div className="mt-2 text-sm text-[var(--text-secondary)]">
                    Participacao percentual de cada fonte dentro do total.
                  </div>
                </div>

                <motion.div className="space-y-5" variants={dashboardStaggerGroupVariants}>
                  <div className="flex h-5 overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-active)]">
                    {components.map((component, index) => (
                      <motion.div
                        key={component.id}
                        initial={false}
                        animate={{
                          width: activated
                            ? `${componentsSum > 0 ? (component.value / componentsSum) * 100 : 0}%`
                            : '0%',
                        }}
                        transition={{
                          ...dashboardBarTransition,
                          delay: index * 0.05,
                        }}
                        style={{ backgroundColor: component.railColor }}
                      />
                    ))}
                  </div>

                  <motion.div className="space-y-3" variants={dashboardStaggerGroupVariants}>
                    {components.map((component) => (
                      <motion.div
                        key={component.id}
                        className="flex items-center justify-between gap-4 text-sm"
                        variants={dashboardMicroItemVariants}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: component.railColor }}
                          />
                          <span className="text-[var(--text-secondary)]">{component.title}</span>
                        </div>
                        <div className="font-mono text-[var(--text-primary)]">
                          {formatPct(
                            componentsSum > 0 ? (component.value / componentsSum) * 100 : 0,
                          )}
                          % · {formatKcal(component.value)} kcal
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)]">
                <div className="mb-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Trilho aditivo
                  </div>
                  <div className="mt-2 text-sm text-[var(--text-secondary)]">
                    Cada linha mostra a soma progressiva ate fechar {formatKcal(results.tdeeFinal)}{' '}
                    kcal.
                  </div>
                </div>

                <motion.div className="space-y-4" variants={dashboardStaggerGroupVariants}>
                  {additiveSteps.map((step, index) => {
                    const previousWidth =
                      results.tdeeFinal > 0 ? (step.previous / results.tdeeFinal) * 100 : 0;
                    const cumulativeWidth =
                      results.tdeeFinal > 0 ? (step.cumulative / results.tdeeFinal) * 100 : 0;

                    return (
                      <motion.div
                        key={step.id}
                        className="space-y-2"
                        variants={dashboardMicroItemVariants}
                      >
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <div className="text-[var(--text-secondary)]">
                            <span className="font-medium text-[var(--text-primary)]">
                              {step.shortLabel}
                            </span>{' '}
                            · {step.title}
                          </div>
                          <div className="font-mono text-[var(--text-primary)]">
                            +{formatKcal(step.delta)} · {formatKcal(step.cumulative)} kcal
                          </div>
                        </div>

                        <div className="relative h-3 overflow-hidden rounded-full bg-[var(--bg-active)]">
                          <motion.div
                            className="bg-[var(--text-ghost)]/50 absolute inset-y-0 left-0 rounded-full"
                            initial={false}
                            animate={{ width: activated ? `${previousWidth}%` : '0%' }}
                            transition={{
                              ...dashboardBarTransition,
                              delay: index * 0.05,
                            }}
                          />
                          <motion.div
                            className="absolute inset-y-0 rounded-full"
                            initial={false}
                            animate={{
                              left: activated ? `${previousWidth}%` : '0%',
                              width: activated ? `${Math.max(cumulativeWidth - previousWidth, 0)}%` : '0%',
                            }}
                            transition={{
                              ...dashboardBarTransition,
                              delay: index * 0.05,
                            }}
                            style={{
                              backgroundColor: step.color,
                              boxShadow: `0 0 24px ${step.color}`,
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </ChartContainer>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
