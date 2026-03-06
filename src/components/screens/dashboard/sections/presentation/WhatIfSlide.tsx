import { motion } from 'framer-motion';
import {
  Activity,
  Flame,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingDown,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { Button } from '@/components/ui/primitives/button';
import { Slider } from '@/components/ui/primitives/slider';
import { useCountUp } from '@/hooks/useCountUp';
import type { CalculationResults, FormData, GoalType, ThermogenicOption } from '@/lib/types';
import { cn } from '@/lib/utils';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardBarTransition,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardMicroItemVariants,
  dashboardPanelVariants,
  dashboardStaggerGroupVariants,
  formatKcal,
  formatKg,
} from './shared';

interface WhatIfSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
}

type ActivityLevel = FormData['activityLevel'];

interface ScenarioState {
  trainingSessions: number;
  cardioMinutesPerDay: number;
  goal: Extract<GoalType, 'hard_cut' | 'mini_cut' | 'lean_bulk'>;
  activityLevel: ActivityLevel;
  thermogenic: ThermogenicOption;
}

const THERMO_BONUS: Record<ThermogenicOption, number> = {
  none: 0,
  caffeine: 80,
  eca: 200,
};

const CARDIO_KCAL_PER_MIN = 8;
const WORKOUT_BONUS_PER_SESSION = 60;

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

const GOAL_OPTIONS: Array<{ id: ScenarioState['goal']; label: string; icon: typeof Flame }> = [
  { id: 'hard_cut', label: 'Hard Cut', icon: Flame },
  { id: 'mini_cut', label: 'Mini Cut', icon: Zap },
  { id: 'lean_bulk', label: 'Lean Bulk', icon: Sparkles },
];

const ACTIVITY_OPTIONS: Array<{ id: ActivityLevel; label: string }> = [
  { id: 'sedentary', label: 'Sedentario' },
  { id: 'light', label: 'Leve' },
  { id: 'moderate', label: 'Moderado' },
  { id: 'very_active', label: 'Alto' },
  { id: 'athlete', label: 'Atleta' },
];

const THERMO_OPTIONS: Array<{ id: ThermogenicOption; label: string }> = [
  { id: 'none', label: 'Nenhum' },
  { id: 'caffeine', label: 'Cafeina' },
  { id: 'eca', label: 'ECA' },
];

const GOAL_CONFIG: Record<
  ScenarioState['goal'],
  {
    label: string;
    calorieMultiplier: number;
    proteinPct: number;
    carbsPct: number;
    fatPct: number;
    classification: string;
  }
> = {
  hard_cut: {
    label: 'Hard Cut',
    calorieMultiplier: 0.75,
    proteinPct: 0.4,
    carbsPct: 0.3,
    fatPct: 0.3,
    classification: 'Agressivo',
  },
  mini_cut: {
    label: 'Mini Cut',
    calorieMultiplier: 0.85,
    proteinPct: 0.35,
    carbsPct: 0.38,
    fatPct: 0.27,
    classification: 'Moderado',
  },
  lean_bulk: {
    label: 'Lean Bulk',
    calorieMultiplier: 1.1,
    proteinPct: 0.3,
    carbsPct: 0.45,
    fatPct: 0.25,
    classification: 'Superavit limpo',
  },
};

const getInitialScenario = (formData: FormData): ScenarioState => ({
  trainingSessions: formData.trainingSessions,
  cardioMinutesPerDay: formData.cardioMinutesPerDay ?? 20,
  goal:
    formData.goal === 'lean_bulk'
      ? 'lean_bulk'
      : formData.goal === 'hard_cut'
        ? 'hard_cut'
        : 'mini_cut',
  activityLevel: formData.activityLevel,
  thermogenic: formData.thermogenic,
});

const getGoalFatPct = (formData: FormData, results: CalculationResults) => {
  if (typeof formData.targetBodyFatPct === 'number' && formData.targetBodyFatPct > 0) {
    return formData.targetBodyFatPct;
  }

  if (typeof results.beforeAfter?.projected.bodyFatPct === 'number') {
    return results.beforeAfter.projected.bodyFatPct;
  }

  if (typeof results.bodyFatInfo.value === 'number') {
    return Math.max(10, Math.round(results.bodyFatInfo.value - 4));
  }

  return 12;
};

const getMacroSegments = (proteinG: number, carbsG: number, fatG: number) => {
  const proteinKcal = proteinG * 4;
  const carbsKcal = carbsG * 4;
  const fatKcal = fatG * 9;
  const total = proteinKcal + carbsKcal + fatKcal;

  if (total <= 0) {
    return { proteinPct: 0, carbsPct: 0, fatPct: 0 };
  }

  return {
    proteinPct: (proteinKcal * 100) / total,
    carbsPct: (carbsKcal * 100) / total,
    fatPct: Math.max(0, 100 - (proteinKcal * 100) / total - (carbsKcal * 100) / total),
  };
};

const getStatusTone = (goal: ScenarioState['goal']) => {
  if (goal === 'hard_cut') {
    return 'gold' as const;
  }

  if (goal === 'mini_cut') {
    return 'blue' as const;
  }

  return 'emerald' as const;
};

export const WhatIfSlide = ({ activated, results, formData }: WhatIfSlideProps) => {
  const [scenario, setScenario] = useState<ScenarioState>(() => getInitialScenario(formData));

  const baselineGoalFatPct = getGoalFatPct(formData, results);

  const preview = useMemo(() => {
    const baseActivityMultiplier = ACTIVITY_MULTIPLIERS[formData.activityLevel];
    const selectedActivityMultiplier = ACTIVITY_MULTIPLIERS[scenario.activityLevel];
    const activityDelta = Math.round(
      (selectedActivityMultiplier - baseActivityMultiplier) * results.bmr.bmr,
    );
    const cardioBase = formData.cardioMinutesPerDay ?? 20;
    const cardioDelta = Math.round(
      (scenario.cardioMinutesPerDay - cardioBase) * CARDIO_KCAL_PER_MIN,
    );
    const workoutDelta = Math.round(
      ((scenario.trainingSessions - formData.trainingSessions) * WORKOUT_BONUS_PER_SESSION) / 7,
    );
    const thermoDelta =
      THERMO_BONUS[scenario.thermogenic] - THERMO_BONUS[formData.thermogenic];
    const newTdee = Math.max(
      1200,
      Math.round(results.tdeeFinal + activityDelta + cardioDelta + workoutDelta + thermoDelta),
    );

    const goalConfig = GOAL_CONFIG[scenario.goal];
    const targetCalories = Math.max(1200, Math.round(newTdee * goalConfig.calorieMultiplier));
    const dailyDelta = targetCalories - newTdee;
    const weeklyRateKg = (dailyDelta * 7) / 7700;

    const proteinG = Math.round((targetCalories * goalConfig.proteinPct) / 4);
    const carbsG = Math.round((targetCalories * goalConfig.carbsPct) / 4);
    const fatG = Math.round((targetCalories * goalConfig.fatPct) / 9);

    const currentBodyFatPct = results.bodyFatInfo.value ?? 18;
    const currentFatMass = formData.weightKg * (currentBodyFatPct / 100);
    const leanMass = formData.weightKg - currentFatMass;

    let projectedWeightKg = formData.weightKg;
    let weeksToGoal = 0;

    if (scenario.goal === 'lean_bulk') {
      const targetFatMass = currentFatMass + 3;
      weeksToGoal =
        weeklyRateKg > 0
          ? Math.max(1, Math.round((targetFatMass - currentFatMass) / weeklyRateKg))
          : 0;
      projectedWeightKg =
        formData.weightKg + Math.max(0, weeklyRateKg) * Math.max(weeksToGoal, 8);
    } else {
      const goalWeight = leanMass / (1 - baselineGoalFatPct / 100);
      const targetFatMass = goalWeight * (baselineGoalFatPct / 100);
      const kgToLose = Math.max(0, currentFatMass - targetFatMass);
      weeksToGoal =
        weeklyRateKg < 0 ? Math.max(1, Math.round(kgToLose / Math.abs(weeklyRateKg))) : 999;
      projectedWeightKg = goalWeight;
    }

    return {
      goalConfig,
      newTdee,
      targetCalories,
      dailyDelta,
      weeklyRateKg,
      weeksToGoal,
      projectedWeightKg,
      proteinG,
      carbsG,
      fatG,
      segments: getMacroSegments(proteinG, carbsG, fatG),
    };
  }, [baselineGoalFatPct, formData, results, scenario]);

  const animatedNewTdee = useCountUp(preview.newTdee, activated, 900);
  const animatedTargetCalories = useCountUp(preview.targetCalories, activated, 900);
  const animatedDailyDelta = useCountUp(Math.abs(preview.dailyDelta), activated, 900);
  const animatedWeeklyRate = useCountUp(Math.round(Math.abs(preview.weeklyRateKg) * 100), activated, 900) / 100;
  const animatedProtein = useCountUp(preview.proteinG, activated, 850);
  const animatedCarbs = useCountUp(preview.carbsG, activated, 850);
  const animatedFat = useCountUp(preview.fatG, activated, 850);
  const animatedWeeks = useCountUp(preview.weeksToGoal >= 999 ? 0 : preview.weeksToGoal, activated, 900);

  const resetScenario = () => setScenario(getInitialScenario(formData));

  const comparisonRows = [
    {
      label: 'TDEE',
      baseline: `${formatKcal(results.tdeeFinal)} kcal`,
      scenario: `${formatKcal(preview.newTdee)} kcal`,
    },
    {
      label: 'Meta',
      baseline: `${formatKcal(results.goalCalories)} kcal`,
      scenario: `${formatKcal(preview.targetCalories)} kcal`,
    },
    {
      label: 'Ritmo',
      baseline: `${results.weeklyRateKg.toFixed(2)} kg/sem`,
      scenario: `${Math.abs(preview.weeklyRateKg).toFixed(2)} kg/sem`,
    },
    {
      label: 'Peso final',
      baseline: `${formatKg(results.beforeAfter?.projected.weightKg ?? formData.weightKg)} kg`,
      scenario: `${formatKg(preview.projectedWeightKg)} kg`,
    },
  ];

  const tone = getStatusTone(scenario.goal);

  return (
    <SectionShell
      level="elevated"
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
            eyebrow="08 - SIMULADOR"
            title={<span id="dfp-heading-whatif">Cenario local de ajuste do protocolo</span>}
            subtitle="Ajuste treino, cardio, atividade, objetivo e termogenico para ver o impacto imediato no plano sem gravar nada no estado global."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <RefreshCcw className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  Preview local
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Target className="h-3.5 w-3.5 text-[var(--blue-400)]" />
                  {preview.goalConfig.classification}
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div
          className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"
          variants={dashboardPanelVariants}
        >
          <DataCard data-testid="whatif-controls-card" hoverable className="p-[var(--space-6)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Controles do cenario
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  Todos os controles abaixo recalculam o preview em tempo real.
                </div>
              </div>

              <Button type="button" variant="outline" size="sm" onClick={resetScenario}>
                <RefreshCcw className="h-4 w-4" />
                Resetar cenario
              </Button>
            </div>

            <motion.div className="space-y-6" variants={dashboardStaggerGroupVariants}>
              <motion.div className="grid gap-4 md:grid-cols-2" variants={dashboardStaggerGroupVariants}>
                <motion.div
                  className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                  variants={dashboardMicroItemVariants}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                      Treinos por semana
                    </div>
                    <span
                      data-testid="whatif-training-value"
                      className="font-mono text-[var(--text-primary)]"
                    >
                      {scenario.trainingSessions}x
                    </span>
                  </div>
                  <Slider
                    value={[scenario.trainingSessions]}
                    min={1}
                    max={7}
                    step={1}
                    onValueChange={(value) =>
                      setScenario((current) => ({
                        ...current,
                        trainingSessions: value[0] ?? 1,
                      }))
                    }
                    aria-label="Treinos por semana"
                  />
                </motion.div>

                <motion.div
                  className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                  variants={dashboardMicroItemVariants}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                      Cardio diario
                    </div>
                    <span
                      data-testid="whatif-cardio-value"
                      className="font-mono text-[var(--text-primary)]"
                    >
                      {scenario.cardioMinutesPerDay} min
                    </span>
                  </div>
                  <Slider
                    value={[scenario.cardioMinutesPerDay]}
                    min={0}
                    max={60}
                    step={5}
                    onValueChange={(value) =>
                      setScenario((current) => ({
                        ...current,
                        cardioMinutesPerDay: value[0] ?? 0,
                      }))
                    }
                    aria-label="Cardio diario"
                  />
                </motion.div>
              </motion.div>

              <motion.div className="space-y-3" variants={dashboardMicroItemVariants}>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Objetivo
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {GOAL_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const selected = scenario.goal === option.id;

                    return (
                      <Button
                        key={option.id}
                        type="button"
                        variant={selected ? 'default' : 'outline'}
                        className={cn(
                          'h-auto justify-start rounded-[var(--radius-lg)] px-4 py-4 text-left',
                          selected && 'shadow-[var(--shadow-emerald)]',
                        )}
                        onClick={() => setScenario((current) => ({ ...current, goal: option.id }))}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div className="space-y-3" variants={dashboardMicroItemVariants}>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Nivel de atividade
                </div>
                <div className="grid gap-2 md:grid-cols-5">
                  {ACTIVITY_OPTIONS.map((option) => {
                    const selected = scenario.activityLevel === option.id;

                    return (
                      <Button
                        key={option.id}
                        type="button"
                        size="sm"
                        variant={selected ? 'secondary' : 'outline'}
                        className="justify-center rounded-full"
                        onClick={() =>
                          setScenario((current) => ({ ...current, activityLevel: option.id }))
                        }
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div className="space-y-3" variants={dashboardMicroItemVariants}>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Termogenico
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {THERMO_OPTIONS.map((option) => {
                    const selected = scenario.thermogenic === option.id;

                    return (
                      <Button
                        key={option.id}
                        type="button"
                        variant={selected ? 'default' : 'outline'}
                        className="rounded-[var(--radius-lg)]"
                        onClick={() =>
                          setScenario((current) => ({ ...current, thermogenic: option.id }))
                        }
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </DataCard>

          <DataCard
            data-testid="whatif-results-card"
            hoverable
            glow={tone}
            className="p-[var(--space-6)]"
          >
            <div className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                Resultado simulado
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                O preview reflete o cenario atual sem gravar alteracoes no plano ativo.
              </div>
            </div>

            <motion.div className="grid gap-3 sm:grid-cols-2" variants={dashboardStaggerGroupVariants}>
              <motion.div variants={dashboardMicroItemVariants}>
                <StatBlock value={animatedNewTdee} unit="kcal" label="Novo TDEE" size="sm" color="blue" />
              </motion.div>
              <motion.div variants={dashboardMicroItemVariants}>
                <StatBlock
                  value={animatedTargetCalories}
                  unit="kcal"
                  label="Meta calorica"
                  size="sm"
                  color={tone === 'gold' ? 'gold' : tone === 'emerald' ? 'emerald' : 'blue'}
                />
              </motion.div>
              <motion.div variants={dashboardMicroItemVariants}>
                <StatBlock
                  value={animatedDailyDelta}
                  unit="kcal"
                  label={preview.dailyDelta < 0 ? 'Deficit diario' : 'Superavit diario'}
                  size="sm"
                  color={tone === 'gold' ? 'gold' : tone === 'emerald' ? 'emerald' : 'blue'}
                />
              </motion.div>
              <motion.div variants={dashboardMicroItemVariants}>
                <StatBlock
                  value={animatedWeeklyRate.toFixed(2)}
                  unit="kg/sem"
                  label="Ritmo estimado"
                  size="sm"
                  color="emerald"
                />
              </motion.div>
            </motion.div>

            <div className="mt-5 rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    Split de macros
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">
                    Distribuicao simplificada para o objetivo selecionado.
                  </div>
                </div>
                <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                  {preview.goalConfig.label}
                </span>
              </div>

              <div className="flex h-4 overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-active)]">
                <motion.div
                  initial={false}
                  animate={{ width: activated ? `${Math.max(8, preview.segments.proteinPct)}%` : '0%' }}
                  transition={dashboardBarTransition}
                  className="bg-[var(--emerald-500)]"
                />
                <motion.div
                  initial={false}
                  animate={{ width: activated ? `${Math.max(8, preview.segments.carbsPct)}%` : '0%' }}
                  transition={{ ...dashboardBarTransition, delay: 0.05 }}
                  className="bg-[var(--blue-500)]"
                />
                <motion.div
                  initial={false}
                  animate={{ width: activated ? `${Math.max(8, preview.segments.fatPct)}%` : '0%' }}
                  transition={{ ...dashboardBarTransition, delay: 0.1 }}
                  className="bg-[var(--gold-500)]"
                />
              </div>

              <motion.div className="mt-4 grid gap-3 sm:grid-cols-3" variants={dashboardStaggerGroupVariants}>
                <motion.div variants={dashboardMicroItemVariants}>
                  <StatBlock value={animatedProtein} unit="g" label="Proteina" size="sm" color="emerald" />
                </motion.div>
                <motion.div variants={dashboardMicroItemVariants}>
                  <StatBlock value={animatedCarbs} unit="g" label="Carboidrato" size="sm" color="blue" />
                </motion.div>
                <motion.div variants={dashboardMicroItemVariants}>
                  <StatBlock value={animatedFat} unit="g" label="Gordura" size="sm" color="gold" />
                </motion.div>
              </motion.div>
            </div>
          </DataCard>
        </motion.div>

        <motion.div
          className="grid gap-4 xl:grid-cols-[1fr_0.95fr]"
          variants={dashboardPanelVariants}
        >
          <DataCard data-testid="whatif-comparison-card" hoverable className="p-[var(--space-6)]">
            <div className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                Antes vs simulacao
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                Comparativo direto entre o estado atual do plano e o cenario local.
              </div>
            </div>

            <motion.div className="space-y-3" variants={dashboardStaggerGroupVariants}>
              {comparisonRows.map((row) => (
                <motion.div
                  key={row.label}
                  className="grid grid-cols-[88px_1fr_auto_1fr] items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] px-[var(--space-4)] py-[var(--space-3)]"
                  variants={dashboardMicroItemVariants}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    {row.label}
                  </div>
                  <div className="font-mono text-sm text-[var(--text-secondary)]">{row.baseline}</div>
                  <TrendingDown className="h-4 w-4 text-[var(--text-muted)]" />
                  <div className="text-right font-mono text-sm text-[var(--text-primary)]">
                    {row.scenario}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </DataCard>

          <DataCard hoverable className="p-[var(--space-6)]">
            <div className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                Leitura do cenario
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                Resumo rapido do impacto operacional do ajuste.
              </div>
            </div>

            <motion.div className="grid gap-4" variants={dashboardStaggerGroupVariants}>
              <motion.div
                className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)] shadow-[var(--shadow-inner-deep)]"
                variants={dashboardMicroItemVariants}
              >
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  <Activity className="h-3.5 w-3.5 text-[var(--blue-400)]" />
                  Horizonte
                </div>
                <StatBlock
                  value={preview.weeksToGoal >= 999 ? '--' : animatedWeeks}
                  unit={preview.weeksToGoal >= 999 ? '' : 'sem'}
                  label="Prazo estimado"
                  sublabel={
                    preview.weeksToGoal >= 999
                      ? 'Meta aberta neste cenario.'
                      : `Peso final aproximado ${formatKg(preview.projectedWeightKg)} kg`
                  }
                  size="md"
                  color="default"
                  className={CARDLESS_STAT_BLOCK_CLASSNAME}
                />
              </motion.div>

              <motion.div className="grid gap-3 sm:grid-cols-2" variants={dashboardStaggerGroupVariants}>
                <motion.div
                  className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                  variants={dashboardMicroItemVariants}
                >
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    <Flame className="h-3.5 w-3.5 text-[var(--gold-400)]" />
                    Objetivo
                  </div>
                  <div className="text-sm leading-[1.7] text-[var(--text-secondary)]">
                    {preview.goalConfig.label} com {scenario.trainingSessions} treinos/sem e{' '}
                    {scenario.cardioMinutesPerDay} min de cardio.
                  </div>
                </motion.div>

                <motion.div
                  className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]"
                  variants={dashboardMicroItemVariants}
                >
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                    Termogenico
                  </div>
                  <div className="text-sm leading-[1.7] text-[var(--text-secondary)]">
                    {scenario.thermogenic === 'none'
                      ? 'Sem bonus adicional de termogenico.'
                      : `Bonus diario estimado de ${THERMO_BONUS[scenario.thermogenic]} kcal.`}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </DataCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
