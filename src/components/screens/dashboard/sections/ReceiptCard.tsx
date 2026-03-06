import type { HTMLAttributes, ReactNode } from 'react';

import { DataCard, StatBlock, type StatColor } from '@/components/design-system';
import { Badge } from '@/components/ui/primitives/badge';
import { cn } from '@/lib/utils';

export interface ReceiptMetric {
  id: string;
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  note?: ReactNode;
  color?: StatColor;
}

export interface ReceiptCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  protocolLabel: ReactNode;
  classificationLabel: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  metrics: ReceiptMetric[];
  badge?: ReactNode;
  footerNote?: ReactNode;
}

const renderBadge = (badge: ReactNode) => {
  if (typeof badge !== 'string') {
    return badge;
  }

  return <Badge variant="secondary">{badge}</Badge>;
};

export const ReceiptCard = ({
  protocolLabel,
  classificationLabel,
  title = 'Recibo do protocolo',
  subtitle,
  metrics,
  badge,
  footerNote,
  className,
  ...props
}: ReceiptCardProps) => {
  return (
    <DataCard
      data-testid="final-receipt-card"
      glow="emerald"
      className={cn('dashboard-final-receipt p-[var(--space-6)]', className)}
      {...props}
    >
      <div className="dashboard-final-receipt__header">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
            Resumo do protocolo
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="text-[24px] font-semibold tracking-[-1px] text-[var(--text-primary)]">{title}</div>
            {badge ? renderBadge(badge) : null}
          </div>
          {subtitle ? (
            <p className="mt-2 max-w-[42rem] text-sm leading-[1.7] text-[var(--text-secondary)]">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{protocolLabel}</Badge>
          <Badge
            variant="outline"
            className="border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]"
          >
            {classificationLabel}
          </Badge>
        </div>
      </div>

      <div className="dashboard-final-receipt__grid">
        {metrics.map((metric) => (
          <StatBlock
            key={metric.id}
            value={metric.value}
            unit={metric.unit}
            label={metric.label}
            sublabel={metric.note}
            size="sm"
            color={metric.color ?? 'default'}
            className="dashboard-final-receipt__metric"
          />
        ))}
      </div>

      {footerNote ? (
        <div className="dashboard-final-receipt__footer">
          <span className="dashboard-final-receipt__footer-dot" aria-hidden />
          <span>{footerNote}</span>
        </div>
      ) : null}
    </DataCard>
  );
};
