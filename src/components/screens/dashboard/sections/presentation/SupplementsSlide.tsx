import { motion } from 'framer-motion';
import { Pill, ShieldCheck, Sparkles, TimerReset } from 'lucide-react';
import { useMemo } from 'react';

import { DataCard, SectionHeader, SectionShell, StatBlock } from '@/components/design-system';
import type { CalculationResults } from '@/lib/types';
import { cn } from '@/lib/utils';

import {
  CARDLESS_STAT_BLOCK_CLASSNAME,
  dashboardContainerVariants,
  dashboardItemVariants,
  dashboardPanelVariants,
} from './shared';

interface SupplementsSlideProps {
  activated: boolean;
  results: CalculationResults;
}

type SupplementPriority = CalculationResults['supplements'][number]['priority'];
type PriorityKey = 'Alta' | 'Media' | 'Baixa';

interface SupplementPresentationMeta {
  category: string;
  rationale: string;
  evidence: string;
}

const PRIORITY_ORDER: PriorityKey[] = ['Alta', 'Media', 'Baixa'];

const PRIORITY_META: Record<
  PriorityKey,
  {
    badgeClassName: string;
    dividerClassName: string;
    glow: 'none' | 'emerald' | 'gold';
  }
> = {
  Alta: {
    badgeClassName: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
    dividerClassName: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]',
    glow: 'emerald',
  },
  Media: {
    badgeClassName: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
    dividerClassName: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]',
    glow: 'gold',
  },
  Baixa: {
    badgeClassName: 'border-[var(--border-default)] bg-[var(--bg-deep)] text-[var(--text-secondary)]',
    dividerClassName: 'border-[var(--border-default)] bg-[var(--bg-deep)] text-[var(--text-secondary)]',
    glow: 'none',
  },
};

const LEGACY_METADATA_ALIASES: Record<string, string> = {
  creatine: 'creatina',
  omega3: 'omega',
  magnesium: 'mag',
};

const LEGACY_METADATA: Record<string, SupplementPresentationMeta> = {
  creatina: {
    category: 'Forca · Recuperacao · Performance',
    rationale: 'Saturacao muscular previsivel e melhora consistente de desempenho em treino resistido.',
    evidence: 'Evidencia nivel A',
  },
  vitd: {
    category: 'Imunidade · Hormonal · Osseo',
    rationale: 'Base para suporte hormonal e osseo, especialmente quando a exposicao solar e baixa.',
    evidence: 'Recomendada para checagem laboratorial',
  },
  whey: {
    category: 'Sintese Proteica · Hipertrofia',
    rationale: 'Fecha a meta proteica diaria com absorcao rapida quando a dieta solida nao cobre o alvo.',
    evidence: 'Condicional a meta proteica diaria',
  },
  omega: {
    category: 'Cardiovascular · Anti-inflamatorio',
    rationale: 'Apoia modulacao inflamatoria e recuperacao quando o protocolo pede maior consistencia.',
    evidence: 'Melhor com refeicoes principais',
  },
  mag: {
    category: 'Sono · Neuromuscular · Relaxamento',
    rationale: 'Ajuda recuperacao noturna e reduz ruido de fadiga quando o volume de treino sobe.',
    evidence: 'Mais util no bloco noturno',
  },
  caffeine: {
    category: 'Performance · Foco',
    rationale: 'Opcao tatica para elevar alerta e intensidade em sessoes-chave de treino.',
    evidence: 'Uso opcional e dose-resposta',
  },
  zma: {
    category: 'Sono · Recuperacao',
    rationale: 'Suporte secundario para recuperacao quando o corte e o volume de treino apertam o descanso.',
    evidence: 'Baixa prioridade e uso situacional',
  },
  b12: {
    category: 'Micronutrientes · Dieta Plant-Based',
    rationale: 'Cobertura basica para dietas estritamente vegetais com baixa disponibilidade natural de B12.',
    evidence: 'Alta prioridade em dieta plant-based',
  },
};

const normalizePriority = (priority: SupplementPriority): PriorityKey => {
  if (priority === 'Média') {
    return 'Media';
  }

  return priority as PriorityKey;
};

const getPresentationMeta = (supplement: CalculationResults['supplements'][number]): SupplementPresentationMeta => {
  const metadataKey = LEGACY_METADATA_ALIASES[supplement.id] ?? supplement.id;
  const metadata = LEGACY_METADATA[metadataKey];

  if (metadata) {
    return metadata;
  }

  return {
    category: 'Suporte do protocolo',
    rationale: `${supplement.name} entra como complemento ${supplement.priority.toLowerCase()} com foco em consistencia de dose e timing.`,
    evidence: `Timing sugerido: ${supplement.timing}`,
  };
};

const getPriorityLabel = (priority: PriorityKey) => (priority === 'Media' ? 'Media' : priority);

export const SupplementsSlide = ({ activated, results }: SupplementsSlideProps) => {
  const supplements = results.supplements ?? [];

  const groupedSupplements = useMemo(() => {
    return PRIORITY_ORDER.map((priority) => ({
      priority,
      items: supplements.filter((supplement) => normalizePriority(supplement.priority) === priority),
    })).filter((group) => group.items.length > 0);
  }, [supplements]);

  if (groupedSupplements.length === 0) {
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
              eyebrow="07 - SUPLEMENTOS"
              title={<span id="dfp-heading-supplements">Stack recomendado para este protocolo</span>}
              subtitle="Quando o motor nao sinaliza suplementos, esta secao mostra um estado neutro em vez de herdar a UI legacy."
            />
          </motion.div>

          <motion.div variants={dashboardPanelVariants}>
            <DataCard hoverable className="p-[var(--space-6)]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Pill className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  Sem stack ativo
                </div>
                <div className="text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">
                  Nenhum suplemento foi priorizado neste calculo
                </div>
                <p className="max-w-[38rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  O painel de suplementacao aparece quando o motor encontra itens com prioridade operacional para o protocolo atual.
                </p>
              </div>
            </DataCard>
          </motion.div>
        </motion.div>
      </SectionShell>
    );
  }

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
            eyebrow="07 - SUPLEMENTOS"
            title={<span id="dfp-heading-supplements">Stack recomendado para este protocolo</span>}
            subtitle="Os itens entram ordenados por prioridade operacional, com dose, timing e a justificativa curta herdada da logica do protocolo."
            action={
              <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <Pill className="h-3.5 w-3.5 text-[var(--emerald-400)]" />
                  {supplements.length} itens
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-deep)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-secondary)]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--blue-400)]" />
                  Priorizacao por perfil
                </span>
              </div>
            }
          />
        </motion.div>

        {groupedSupplements.map((group) => {
          const priorityMeta = PRIORITY_META[group.priority];

          return (
            <motion.div
              key={group.priority}
              data-testid="supplement-priority-group"
              className="flex flex-col gap-4"
              variants={dashboardPanelVariants}
            >
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--border-default),transparent)]" />
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]',
                    priorityMeta.dividerClassName,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  Prioridade {getPriorityLabel(group.priority)}
                  <span className="text-[var(--text-muted)]">{group.items.length}</span>
                </span>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--border-default),transparent)]" />
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                {group.items.map((supplement) => {
                  const metadata = getPresentationMeta(supplement);

                  return (
                    <DataCard
                      key={supplement.id}
                      data-testid="supplement-card"
                      hoverable
                      glow={priorityMeta.glow}
                      className="p-[var(--space-5)]"
                    >
                      <div className="flex h-full flex-col gap-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] text-[22px] shadow-[var(--shadow-inner-deep)]">
                              <span aria-hidden>{supplement.icon}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                                {metadata.category}
                              </div>
                              <div className="mt-1 text-[22px] font-semibold leading-[1.2] tracking-[-0.8px] text-[var(--text-primary)]">
                                {supplement.name}
                              </div>
                            </div>
                          </div>

                          <span
                            className={cn(
                              'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[2px]',
                              priorityMeta.badgeClassName,
                            )}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                            {getPriorityLabel(group.priority)}
                          </span>
                        </div>

                        <StatBlock
                          value={supplement.dose}
                          label="Dose sugerida"
                          sublabel={metadata.evidence}
                          size="sm"
                          color={priorityMeta.glow === 'gold' ? 'gold' : priorityMeta.glow === 'emerald' ? 'emerald' : 'default'}
                          className={CARDLESS_STAT_BLOCK_CLASSNAME}
                        />

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                              <TimerReset className="h-3.5 w-3.5 text-[var(--gold-400)]" />
                              Timing
                            </div>
                            <p className="text-sm leading-[1.7] text-[var(--text-secondary)]">{supplement.timing}</p>
                          </div>

                          <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-deep)] p-[var(--space-4)]">
                            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
                              <Sparkles className="h-3.5 w-3.5 text-[var(--blue-400)]" />
                              Justificativa
                            </div>
                            <p className="text-sm leading-[1.7] text-[var(--text-secondary)]">{metadata.rationale}</p>
                          </div>
                        </div>
                      </div>
                    </DataCard>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
};
