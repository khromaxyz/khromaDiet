import { useCountUp } from '../../../hooks/useCountUp';
import { summaryMetrics } from '../../../lib/constants/mockSummary';

interface SummaryMetricsProps {
  active: boolean;
}

const SummaryMetricValue = ({
  target,
  active,
  tone,
  prefix,
}: {
  target: number;
  active: boolean;
  tone: string;
  prefix?: string;
}) => {
  const value = useCountUp(target, active);
  return (
    <span className={`summary-metric-value ${tone}-val`}>
      {prefix ?? ''}
      {value.toLocaleString('pt-BR')}
    </span>
  );
};

export const SummaryMetrics = ({ active }: SummaryMetricsProps) => {
  return (
    <div className="summary-metrics-row">
      {summaryMetrics.map((metric, index) => (
        <div key={metric.id} className="summary-metric-group">
          <div className="summary-metric">
            <div className="summary-metric-label">{metric.label}</div>
            {metric.prefix ? (
              <SummaryMetricValue
                target={metric.value}
                active={active}
                tone={metric.tone}
                prefix={metric.prefix}
              />
            ) : (
              <SummaryMetricValue target={metric.value} active={active} tone={metric.tone} />
            )}
            <div className="summary-metric-unit">{metric.unit}</div>
          </div>
          {index !== summaryMetrics.length - 1 ? <div className="summary-metric-divider" /> : null}
        </div>
      ))}
    </div>
  );
};
