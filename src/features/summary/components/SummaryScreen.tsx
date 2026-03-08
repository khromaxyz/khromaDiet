import { ArrowLeft, ArrowRight } from 'lucide-react';

import type { ScreenId } from '@/app/types';
import { SectionHeader, SectionShell } from '@/components/design-system';
import { Button } from '@/components/ui/primitives/button';
import { summaryCopy } from '@/features/summary/content/summaryCopy';

import { SummaryMetrics } from './SummaryMetrics';

interface SummaryScreenProps {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
}

export const SummaryScreen = ({ active, onNavigate }: SummaryScreenProps) => {
  return (
    <SectionShell id="screen-summary" level="abyss" className="screen active min-h-screen py-[var(--space-24)]">
      <div className="summary-shell">
        <SectionHeader eyebrow={summaryCopy.label} title={summaryCopy.title} subtitle={summaryCopy.subtitle} className="summary-header" />

        <SummaryMetrics active={active} />

        <div className="summary-cta-group">
          <Button variant="default" size="lg" className="summary-cta summary-cta-primary" onClick={() => onNavigate('dashboard')}>
            {'Ver an\u00e1lise completa'}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Button>

          <Button variant="ghost" size="lg" className="summary-cta summary-cta-secondary" onClick={() => onNavigate('form')}>
            <ArrowLeft size={14} strokeWidth={2.5} />
            Rever dados
          </Button>
        </div>
      </div>
    </SectionShell>
  );
};

