import { DataCard, StatBlock } from '@/components/design-system';
import { useScrambleNumber } from '@/hooks/useScrambleNumber';
import { useDietForgeStore } from '@/store/useDietForgeStore';

interface SummaryMetricsProps {
  active: boolean;
}

const AnimatedMetricValue = ({
  target,
  active,
  delayMs,
  prefix,
}: {
  target: number;
  active: boolean;
  delayMs: number;
  prefix?: string;
}) => {
  const scrambled = useScrambleNumber(
    prefix
      ? {
          value: target,
          active,
          prefix,
          durationMs: 900,
          delayMs,
        }
      : {
          value: target,
          active,
          durationMs: 900,
          delayMs,
        },
  );

  return <>{scrambled}</>;
};

export const SummaryMetrics = ({ active }: SummaryMetricsProps) => {
  const results = useDietForgeStore((state) => state.results);

  if (!results) {
    return null;
  }

  const primaryMetrics = [
    {
      id: 'tdee',
      label: 'TDEE Final',
      value: results.tdeeFinal,
      unit: 'kcal/dia',
      color: 'emerald' as const,
      delayMs: 0,
    },
    {
      id: 'goal',
      label: 'Meta Calorica',
      value: results.goalCalories,
      unit: 'kcal/dia',
      color: 'emerald' as const,
      delayMs: 140,
    },
    {
      id: 'delta',
      label: results.dailyDelta >= 0 ? 'Deficit Diario' : 'Superavit Diario',
      value: Math.abs(results.dailyDelta),
      unit: 'kcal/dia',
      color: results.dailyDelta >= 0 ? ('gold' as const) : ('blue' as const),
      prefix: results.dailyDelta >= 0 ? '-' : '+',
      delayMs: 280,
    },
  ];

  const secondaryMetrics = [
    {
      id: 'bmr',
      label: 'BMR',
      value: results.breakdown.bmr,
      unit: 'kcal',
      delayMs: 340,
    },
    {
      id: 'lbm',
      label: 'LBM',
      value: results.bmr.lbm,
      unit: 'kg',
      delayMs: 420,
    },
    {
      id: 'tef',
      label: 'TEF',
      value: results.breakdown.tef,
      unit: 'kcal',
      delayMs: 500,
    },
  ];

  return (
    <div className="summary-metrics-grid">
      {primaryMetrics.map((metric) => (
        <DataCard key={metric.id} hoverable glow="emerald" className="summary-card summary-card-primary">
          <StatBlock
            value={
              <AnimatedMetricValue
                target={metric.value}
                active={active}
                delayMs={metric.delayMs}
                {...(metric.prefix ? { prefix: metric.prefix } : {})}
              />
            }
            unit={metric.unit}
            label={metric.label}
            size="lg"
            color={metric.color}
            className="summary-stat-block summary-stat-block-primary"
          />
        </DataCard>
      ))}

      {secondaryMetrics.map((metric) => (
        <DataCard key={metric.id} hoverable className="summary-card">
          <StatBlock
            value={
              metric.value === null || metric.value === undefined ? (
                'N/A'
              ) : (
                <AnimatedMetricValue target={metric.value} active={active} delayMs={metric.delayMs} />
              )
            }
            unit={metric.value === null || metric.value === undefined ? undefined : metric.unit}
            label={metric.label}
            size="md"
            color="default"
            className="summary-stat-block"
          />
        </DataCard>
      ))}

      <DataCard hoverable glow="emerald" className="summary-card summary-card-macros">
        <div className="summary-card-kicker">Macros</div>
        <div className="summary-macro-grid">
          <StatBlock
            value={<AnimatedMetricValue target={results.macros.proteinG} active={active} delayMs={560} />}
            unit="g"
            label="Proteina"
            size="sm"
            color="emerald"
            className="summary-stat-block"
          />
          <StatBlock
            value={<AnimatedMetricValue target={results.macros.carbsG} active={active} delayMs={620} />}
            unit="g"
            label="Carboidrato"
            size="sm"
            color="blue"
            className="summary-stat-block"
          />
          <StatBlock
            value={<AnimatedMetricValue target={results.macros.fatG} active={active} delayMs={680} />}
            unit="g"
            label="Gordura"
            size="sm"
            color="gold"
            className="summary-stat-block"
          />
        </div>
      </DataCard>
    </div>
  );
};

