import { useScrambleNumber } from '../../../hooks/useScrambleNumber';
import { useDietForgeStore } from '../../../store/useDietForgeStore';

interface SummaryMetricsProps {
  active: boolean;
}

const SummaryMetricValue = ({
  target,
  active,
  tone,
  prefix,
  delayMs,
}: {
  target: number;
  active: boolean;
  tone: string;
  prefix?: string;
  delayMs: number;
}) => {
  const scrambled = useScrambleNumber(
    prefix !== undefined
      ? {
          value: target,
          active,
          prefix,
          durationMs: 800,
          delayMs,
        }
      : {
          value: target,
          active,
          durationMs: 800,
          delayMs,
        },
  );

  return <span className={`summary-metric-value ${tone}-val`}>{scrambled}</span>;
};

export const SummaryMetrics = ({ active }: SummaryMetricsProps) => {
  const results = useDietForgeStore((state) => state.results);

  const metrics: Array<{
    id: string;
    label: string;
    value: number;
    unit: string;
    tone: string;
    prefix?: string;
  }> = [
    {
      id: 'tdee',
      label: 'TDEE Final',
      value: results?.tdeeFinal ?? 0,
      unit: 'kcal / dia',
      tone: 'tdee',
    },
    {
      id: 'goal',
      label: 'Meta Calórica',
      value: results?.goalCalories ?? 0,
      unit: 'kcal / dia',
      tone: 'meta',
    },
    {
      id: 'delta',
      label: (results?.dailyDelta ?? 0) >= 0 ? 'Déficit Diário' : 'Superávit Diário',
      value: Math.abs(results?.dailyDelta ?? 0),
      unit: 'kcal / dia',
      tone: 'deficit',
      prefix: (results?.dailyDelta ?? 0) >= 0 ? '-' : '+',
    },
  ] as const;

  return (
    <div className="summary-metrics-row">
      {metrics.map((metric, index) => (
        <div key={metric.id} className="summary-metric-group">
          <div className="summary-metric">
            <div className="summary-metric-label">{metric.label}</div>
            <SummaryMetricValue
              target={metric.value}
              active={active}
              tone={metric.tone}
              delayMs={index * 200}
              {...(metric.prefix ? { prefix: metric.prefix } : {})}
            />
            <div className="summary-metric-unit">{metric.unit}</div>
          </div>
          {index !== metrics.length - 1 ? <div className="summary-metric-divider" /> : null}
        </div>
      ))}
    </div>
  );
};
