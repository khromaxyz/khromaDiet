import { motion } from 'framer-motion';
import { Activity, Clock3, Sparkles, Target, TrendingDown, TrendingUp } from 'lucide-react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import { useCountUp } from '@/hooks/useCountUp';
import { GOAL_LABELS } from '@/lib/constants/labels';
import type { CalculationResults, FormData } from '@/lib/types';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardPanelVariants,
  formatKcal,
  formatPct,
} from './shared';

interface GoalSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
}

const CLASSIFICATION_META = {
  realista: {
    label: 'Realista',
    glow: 'emerald',
    className:
      'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
  },
  agressivo: {
    label: 'Agressivo',
    glow: 'gold',
    className: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
  },
  inviavel: {
    label: 'Inviavel',
    glow: 'none',
    className: 'border-[var(--red-glow)] bg-[var(--red-glow)] text-[var(--red-400)]',
  },
} as const;

export const GoalSlide = ({ activated, results, formData }: GoalSlideProps) => {
  const isDeficit = results.dailyDelta >= 0;
  const goalLabel = GOAL_LABELS[formData.goal];
  const classification = results.projection?.classification ?? 'realista';
  const classificationMeta = CLASSIFICATION_META[classification];
  const totalWeeks = results.projection?.milestones.at(-1)?.week ?? formData.targetWeeks ?? 16;
  const weeklyDeficit = Math.round(Math.abs(results.dailyDelta) * 7);
  const weeklyEquivalentKg = weeklyDeficit / 7700;
  const maintenancePct = 100;
  const goalPct =
    results.tdeeFinal > 0
      ? Math.max(8, Math.min(100, (results.goalCalories / results.tdeeFinal) * 100))
      : 100;
  const deltaPct = Math.max(4, Math.min(100, Math.abs(results.goalDeltaPct)));
  const rateAnimated =
    useCountUp(Math.round(Math.abs(results.weeklyRateKg) * 100), activated, 900) / 100;

  const maintenance = useCountUp(Math.round(results.tdeeFinal), activated, 900);
  const adjustment = useCountUp(Math.round(Math.abs(results.dailyDelta)), activated, 900);
  const goal = useCountUp(Math.round(results.goalCalories), activated, 900);
  const projectedWeeks = useCountUp(totalWeeks, activated, 900);
  const weeklyKcal = useCountUp(weeklyDeficit, activated, 900);

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
            eyebrow="03 — GOAL PROTOCOL"
            title={<span id="dfp-heading-goal">Meta calorica com ajuste explicito</span>}
            subtitle="Manutencao, ajuste diario e alvo final aparecem no mesmo eixo. O plano deixa claro o que foi retirado ou acrescentado para chegar na meta."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  {goalLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] ${classificationMeta.className}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  {classificationMeta.label}
                </span>
              </div>
            }
          />
        </motion.div>

        <motion.div className="grid gap-4 xl:grid-cols-3" variants={dashboardItemVariants}>
          <DataCard hoverable className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <Activity className="h-4 w-4 text-[var(--emerald-400)]" />
              Manutencao
            </div>
            <StatBlock
              value={maintenance}
              unit="kcal"
              label="TDEE de referencia"
              sublabel="Ponto de partida para calibrar o protocolo."
              size="md"
              color="emerald"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable glow={classificationMeta.glow} className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              {isDeficit ? (
                <TrendingDown className="h-4 w-4 text-[var(--gold-400)]" />
              ) : (
                <TrendingUp className="h-4 w-4 text-[var(--gold-400)]" />
              )}
              Ajuste diario
            </div>
            <StatBlock
              value={adjustment}
              unit="kcal"
              label={isDeficit ? 'Deficit aplicado' : 'Superavit aplicado'}
              sublabel={`${isDeficit ? '-' : '+'}${formatPct(Math.abs(results.goalDeltaPct))}% vs manutencao`}
              size="md"
              color="gold"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable glow="emerald" className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <Target className="h-4 w-4 text-[var(--emerald-400)]" />
              Meta final
            </div>
            <StatBlock
              value={goal}
              unit="kcal"
              label="Ingestao alvo"
              sublabel="Calorias que o plano pede todos os dias."
              size="md"
              color="emerald"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <DataCard
            glow={classificationMeta.glow}
            hoverable
            className="grid gap-6 p-[var(--space-6)] xl:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Rail de comparacao
                </div>
                <div className="mt-2 max-w-[38rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  A manutencao fica no topo da trilha e a meta mostra exatamente quanto do TDEE
                  continua no prato. O restante representa o ajuste diario do protocolo.
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-5)]">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="text-sm text-[var(--text-secondary)]">
                    Meta como percentual da manutencao
                  </div>
                  <div className="font-mono text-[var(--text-primary)]">
                    {formatPct(goalPct)}% · {formatKcal(results.goalCalories)} kcal
                  </div>
                </div>

                <div className="relative h-4 overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-active)]">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[var(--emerald-500)] shadow-[0_0_28px_rgba(16,185,129,0.35)]"
                    style={{ width: `${goalPct}%` }}
                  />
                  <div
                    className="bg-[var(--gold-500)]/70 absolute inset-y-0 rounded-full"
                    style={{
                      left: `${goalPct}%`,
                      width: `${Math.max(maintenancePct - goalPct, 0)}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  <span>0</span>
                  <span>Meta {formatPct(goalPct)}%</span>
                  <span>Manutencao 100%</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Formula do plano
                </div>
                <div className="font-mono text-[20px] font-semibold tracking-[-0.8px] text-[var(--text-primary)]">
                  {formatKcal(results.tdeeFinal)} - {formatKcal(Math.abs(results.dailyDelta))} ={' '}
                  {formatKcal(results.goalCalories)}
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Direcao do ajuste
                </div>
                <div className="text-sm leading-[1.7] text-[var(--text-secondary)]">
                  {isDeficit
                    ? 'Ajuste em corte moderado para reduzir gordura mantendo aderencia e performance.'
                    : 'Ajuste em superavit controlado para empurrar ganho sem perder controle do plano.'}
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                  Classificacao
                </div>
                <div className="text-sm leading-[1.7] text-[var(--text-secondary)]">
                  {classificationMeta.label} · {formatPct(deltaPct)}% de ajuste sobre a manutencao.
                </div>
              </div>
            </div>
          </DataCard>
        </motion.div>

        <motion.div className="grid gap-4 xl:grid-cols-3" variants={dashboardItemVariants}>
          <DataCard hoverable className="p-[var(--space-5)]">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              Deficit semanal
            </div>
            <StatBlock
              value={weeklyKcal}
              unit="kcal"
              label="Corte acumulado"
              sublabel={`≈ ${formatPct(weeklyEquivalentKg, 2)} kg equivalentes por semana`}
              size="sm"
              color="default"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable glow="emerald" className="p-[var(--space-5)]">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              Ritmo estimado
            </div>
            <StatBlock
              value={formatPct(rateAnimated, 2)}
              unit="kg/sem"
              label="Velocidade do protocolo"
              sublabel="Estimativa semanal projetada pela curva atual."
              size="sm"
              color="emerald"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>

          <DataCard hoverable className="p-[var(--space-5)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              <Clock3 className="h-4 w-4 text-[var(--emerald-400)]" />
              Prazo projetado
            </div>
            <StatBlock
              value={projectedWeeks}
              unit="sem"
              label="Horizonte"
              sublabel={`Aproximadamente ${Math.max(1, Math.ceil(totalWeeks / 4))} meses para completar o alvo.`}
              size="sm"
              color="default"
              className={CARDLESS_STAT_BLOCK_CLASSNAME}
            />
          </DataCard>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
