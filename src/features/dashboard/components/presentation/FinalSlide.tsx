import { motion } from 'framer-motion';
import { ArrowRight, Download, Link2, Sparkles, Target } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataCard, SectionHeader, SectionShell } from '@/components/design-system';
import { Badge } from '@/components/ui/primitives/badge';
import { Button } from '@/components/ui/primitives/button';
import { useCountUp } from '@/hooks/useCountUp';
import { GOAL_LABELS } from '@/lib/constants/labels';
import type { SharedProfileMeta } from '@/lib/profiles/types';
import { serializeShareState } from '@/lib/shareState';
import type { CalculationResults, FormData } from '@/lib/types';
import { useDietForgeStore } from '@/store/useDietForgeStore';

import { DashboardFooter } from '../DashboardFooter';
import { ReceiptCard, type ReceiptMetric } from '../ReceiptCard';
import {
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardMicroItemVariants,
  dashboardPanelVariants,
  dashboardStaggerGroupVariants,
  formatKcal,
  formatPct,
  formatShortDate,
} from './shared';

interface FinalSlideProps {
  activated: boolean;
  isActive: boolean;
  results: CalculationResults;
  formData: FormData;
  profileMeta?: (SharedProfileMeta & { createdAt?: string }) | undefined;
}

const BMR_METHOD_LABELS = {
  mifflin: 'BMR Mifflin-St Jeor',
  katch_mcardle: 'BMR Katch-McArdle',
  cunningham: 'BMR Cunningham',
  henry: 'BMR Henry',
} as const;

const CLASSIFICATION_LABELS = {
  realista: 'Classificacao realista',
  agressivo: 'Classificacao agressiva',
  inviavel: 'Classificacao inviavel',
} as const;

const formatSignedKcal = (value: number) =>
  `${value >= 0 ? '-' : '+'}${formatKcal(Math.abs(value))}`;

const formatMetricNumber = (value: number) => Math.round(value).toLocaleString('pt-BR');

export const FinalSlide = ({
  activated,
  isActive,
  results,
  formData,
  profileMeta,
}: FinalSlideProps) => {
  const currentStep = useDietForgeStore((state) => state.currentStep);
  const viewMode = useDietForgeStore((state) => state.viewMode);

  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [shareTone, setShareTone] = useState<'default' | 'destructive'>('default');

  useEffect(() => {
    if (!shareStatus) {
      return undefined;
    }

    const timer = window.setTimeout(() => setShareStatus(null), 2200);
    return () => window.clearTimeout(timer);
  }, [shareStatus]);

  const estimatedWeeks =
    results.projection?.milestones.at(-1)?.week ?? formData.targetWeeks ?? null;
  const classificationLabel = results.projection
    ? CLASSIFICATION_LABELS[results.projection.classification]
    : 'Classificacao em calibracao';
  const protocolLabel = GOAL_LABELS[formData.goal];
  const generatedAtLabel =
    formatShortDate(profileMeta?.createdAt ?? new Date().toISOString()) ?? 'Plano atual';
  const profileLabel = profileMeta?.name ? `Perfil ${profileMeta.name}` : undefined;

  const animatedTdee = useCountUp(Math.round(results.tdeeFinal), activated, 900);
  const animatedGoal = useCountUp(Math.round(results.goalCalories), activated, 900);
  const animatedDelta = useCountUp(Math.round(Math.abs(results.dailyDelta)), activated, 900);
  const animatedProtein = useCountUp(Math.round(results.macros.proteinG), activated, 850);
  const animatedCarbs = useCountUp(Math.round(results.macros.carbsG), activated, 850);
  const animatedFat = useCountUp(Math.round(results.macros.fatG), activated, 850);
  const animatedPace = useCountUp(Math.round(Math.abs(results.weeklyRateKg) * 100), activated, 900) / 100;
  const animatedWeeks = useCountUp(estimatedWeeks ?? 0, activated, 900);

  const receiptMetrics = useMemo<ReceiptMetric[]>(
    () => [
      {
        id: 'tdee',
        label: 'TDEE',
        value: formatMetricNumber(animatedTdee),
        unit: 'kcal',
        note: 'Gasto total diario',
      },
      {
        id: 'goal',
        label: 'Meta',
        value: formatMetricNumber(animatedGoal),
        unit: 'kcal',
        note: `${results.goalDeltaPct >= 0 ? '+' : ''}${results.goalDeltaPct.toFixed(1)}% vs TDEE`,
        color: 'emerald',
      },
      {
        id: 'delta',
        label: results.dailyDelta >= 0 ? 'Deficit diario' : 'Superavit diario',
        value: formatSignedKcal(results.dailyDelta >= 0 ? animatedDelta : -animatedDelta),
        note: 'Ajuste energetico do protocolo',
        color: 'gold',
      },
      {
        id: 'protein',
        label: 'Proteina',
        value: formatMetricNumber(animatedProtein),
        unit: 'g',
        note: `${formatPct(results.macros.proteinPct)}% das kcal`,
        color: 'emerald',
      },
      {
        id: 'carbs',
        label: 'Carboidrato',
        value: formatMetricNumber(animatedCarbs),
        unit: 'g',
        note: `${formatPct(results.macros.carbsPct)}% das kcal`,
        color: 'blue',
      },
      {
        id: 'fat',
        label: 'Gordura',
        value: formatMetricNumber(animatedFat),
        unit: 'g',
        note: `${formatPct(results.macros.fatPct)}% das kcal`,
        color: 'gold',
      },
      {
        id: 'pace',
        label: 'Ritmo',
        value: animatedPace.toFixed(2),
        unit: 'kg/sem',
        note: 'Velocidade estimada do protocolo',
        color: 'default',
      },
      {
        id: 'timeline',
        label: 'Prazo',
        value: estimatedWeeks ? animatedWeeks : 'N/D',
        unit: estimatedWeeks ? 'sem' : undefined,
        note: estimatedWeeks ? 'Janela estimada de conclusao' : 'Prazo ainda nao definido',
        color: 'default',
      },
    ],
    [
      animatedCarbs,
      animatedDelta,
      animatedFat,
      animatedGoal,
      animatedPace,
      animatedProtein,
      animatedTdee,
      animatedWeeks,
      estimatedWeeks,
      results,
    ],
  );

  const handleExportPdf = useCallback(() => {
    window.print();
  }, []);

  const handleSharePlan = useCallback(async () => {
    const sharedProfile =
      profileMeta?.name || typeof profileMeta?.avatarId === 'number'
        ? {
            ...(profileMeta?.name ? { name: profileMeta.name } : {}),
            ...(typeof profileMeta?.avatarId === 'number'
              ? { avatarId: profileMeta.avatarId }
              : {}),
          }
        : undefined;

    const payload = serializeShareState({
      formData,
      currentStep,
      viewMode,
      ...(sharedProfile ? { sharedProfile } : {}),
    });

    const url = new URL(window.location.href);
    url.searchParams.set('state', payload);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('clipboard_unavailable');
      }

      await navigator.clipboard.writeText(url.toString());
      setShareTone('default');
      setShareStatus('Link do plano copiado.');
    } catch {
      setShareTone('destructive');
      setShareStatus('Nao foi possivel copiar o link.');
    }
  }, [currentStep, formData, profileMeta, viewMode]);

  return (
    <SectionShell
      level="base"
      className="dashboard-final-section pb-[var(--space-12)] pt-[calc(var(--header-height)+var(--space-8))] sm:pt-[calc(var(--header-height)+var(--space-10))]"
      data-active={isActive ? 'true' : 'false'}
    >
      <motion.div
        className="flex flex-col gap-8 lg:gap-10"
        variants={dashboardContainerVariants}
        initial={false}
        animate={activated ? 'show' : 'hidden'}
      >
        <motion.div variants={dashboardItemVariants}>
          <SectionHeader
            eyebrow="09 - ENCERRAMENTO"
            title={<span id="dfp-heading-final">Protocolo completo</span>}
            subtitle="Todos os numeros-chave estao consolidados em um recibo compacto, com proximos passos claros para exportar, compartilhar ou seguir para a montagem da dieta."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <Badge variant="outline">{protocolLabel}</Badge>
                <Badge
                  variant="outline"
                  className="border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]"
                >
                  {classificationLabel}
                </Badge>
              </div>
            }
          />
        </motion.div>

        <motion.div variants={dashboardPanelVariants}>
          <ReceiptCard
            protocolLabel={protocolLabel}
            classificationLabel={classificationLabel}
            title="Recibo executivo do plano"
            subtitle="TDEE, meta, delta energetico, macros, ritmo e prazo final em uma unica leitura."
            badge="Plano fechado"
            metrics={receiptMetrics}
            footerNote={`${results.dailyDelta >= 0 ? 'Deficit' : 'Superavit'} ${formatSignedKcal(results.dailyDelta)} kcal por dia com ${formatPct(Math.abs(results.weeklyRateKg), 2)} kg/sem estimados.`}
          />
        </motion.div>

        <motion.div
          className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"
          variants={dashboardStaggerGroupVariants}
        >
          <motion.div variants={dashboardMicroItemVariants}>
            <DataCard
              data-testid="final-primary-card"
              glow="emerald"
              hoverable
              className="dashboard-final-cta-card dashboard-final-cta-card--primary p-[var(--space-6)]"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Feature futura</Badge>
                  <Badge variant="outline">Montagem guiada da dieta</Badge>
                </div>

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                    CTA principal
                  </div>
                  <div className="mt-2 text-[30px] font-semibold leading-[1.1] tracking-[-1.2px] text-[var(--text-primary)]">
                    Transformar o protocolo em refeicoes prontas para execucao.
                  </div>
                </div>

                <p className="max-w-[42rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  O proximo passo do produto vai usar o protocolo ja validado para montar a dieta
                  completa com distribuicao pratica e exportacao pronta.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    data-testid="final-primary-cta"
                    disabled
                    className="dashboard-final-primary-button h-auto min-h-14 rounded-[14px] px-6 py-4 text-base"
                  >
                    <Target className="h-4 w-4" />
                    Montar Minha Dieta
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Badge variant="secondary" className="dashboard-final-soon-badge">
                    Em breve
                  </Badge>
                </div>
              </div>
            </DataCard>
          </motion.div>

          <motion.div variants={dashboardMicroItemVariants}>
            <DataCard
              data-testid="final-secondary-card"
              hoverable
              className="dashboard-final-cta-card p-[var(--space-6)]"
            >
              <div className="flex h-full flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                    Proximas acoes
                  </div>

                  <div className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    Exporte o dashboard inteiro para PDF ou gere um link para compartilhar o plano
                    atual sem depender do legado.
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    data-testid="final-export-pdf"
                    className="justify-start rounded-[14px] px-4 py-5 text-sm"
                    onClick={handleExportPdf}
                  >
                    <Download className="h-4 w-4" />
                    Exportar PDF
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    data-testid="final-share-plan"
                    className="justify-start rounded-[14px] border border-[var(--border-default)] px-4 py-5 text-sm text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[rgba(255,255,255,0.03)]"
                    onClick={handleSharePlan}
                  >
                    <Link2 className="h-4 w-4" />
                    Compartilhar Plano
                  </Button>
                </div>

                {shareStatus ? (
                  <Badge data-testid="final-share-status" variant={shareTone} className="w-fit">
                    {shareStatus}
                  </Badge>
                ) : (
                  <div className="text-xs text-[var(--text-muted)]">
                    Share usa o estado atual do dashboard para gerar um link unico.
                  </div>
                )}
              </div>
            </DataCard>
          </motion.div>
        </motion.div>

        <motion.div variants={dashboardItemVariants}>
          <DashboardFooter
            planLabel={`Plano ${protocolLabel}`}
            generatedAtLabel={`Gerado ${generatedAtLabel}`}
            methodLabel={BMR_METHOD_LABELS[results.bmrMethod]}
            profileName={profileLabel}
            classificationLabel={classificationLabel}
          />
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
