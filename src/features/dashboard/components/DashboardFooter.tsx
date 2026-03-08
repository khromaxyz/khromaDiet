import type { HTMLAttributes, ReactNode } from 'react';

import { Badge } from '@/components/ui/primitives/badge';
import { cn } from '@/lib/utils';

export interface DashboardFooterProps extends HTMLAttributes<HTMLElement> {
  planLabel: ReactNode;
  generatedAtLabel: ReactNode;
  methodLabel: ReactNode;
  profileName?: ReactNode;
  classificationLabel?: ReactNode;
  versionLabel?: ReactNode;
  disclaimer?: ReactNode;
  brandLabel?: ReactNode;
}

export const DashboardFooter = ({
  planLabel,
  generatedAtLabel,
  methodLabel,
  profileName,
  classificationLabel,
  versionLabel = 'DietForge dashboard v9',
  disclaimer = 'Uso educacional. Consulte nutricionista para acompanhamento clinico.',
  brandLabel = 'DietForge',
  className,
  ...props
}: DashboardFooterProps) => {
  return (
    <footer
      data-testid="final-footer"
      className={cn('dashboard-final-footer rounded-[var(--radius-xl)] border border-[var(--border-default)]', className)}
      {...props}
    >
      <div className="dashboard-final-footer__top">
        <div>
          <div className="dashboard-final-footer__brand">{brandLabel}</div>
          <div className="dashboard-final-footer__version">{versionLabel}</div>
        </div>

        <div className="dashboard-final-footer__chips">
          <Badge variant="outline">{planLabel}</Badge>
          <Badge variant="outline">{generatedAtLabel}</Badge>
          <Badge variant="outline">{methodLabel}</Badge>
          {profileName ? <Badge variant="outline">{profileName}</Badge> : null}
          {classificationLabel ? (
            <Badge
              variant="outline"
              className="border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-400)]"
            >
              {classificationLabel}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="dashboard-final-footer__copy">
        <p>Plano consolidado com TDEE, meta calorica, macros e prazo prontos para consulta rapida.</p>
        <p>{disclaimer}</p>
      </div>
    </footer>
  );
};
