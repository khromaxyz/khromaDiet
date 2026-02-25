import { ArrowLeft, ArrowRight } from 'lucide-react';

import { summaryCopy } from '../../../lib/constants/copy';
import { summaryMiniStats } from '../../../lib/constants/mockSummary';
import type { ScreenId } from '../../../lib/types';
import { Button } from '../../ui/Button';

import { SummaryMetrics } from './SummaryMetrics';

interface SummaryScreenProps {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
}

export const SummaryScreen = ({ active, onNavigate }: SummaryScreenProps) => {
  return (
    <section className="screen active" id="screen-summary">
      <div className="summary-bg-gradient" />
      <div className="summary-grid-lines" />

      <div className="summary-content">
        <div className="summary-label">
          <div className="summary-label-line" />
          {summaryCopy.label}
          <div className="summary-label-line summary-label-line-right" />
        </div>

        <h2 className="summary-title">{summaryCopy.title}</h2>
        <p className="summary-subtitle">{summaryCopy.subtitle}</p>

        <SummaryMetrics active={active} />

        <div className="summary-cta-group">
          <Button
            variant="summary"
            onClick={() => onNavigate('dashboard')}
            rightIcon={<ArrowRight size={16} strokeWidth={2.5} />}
          >
            Ver análise completa
          </Button>
          <Button
            variant="secondary"
            onClick={() => onNavigate('form')}
            leftIcon={<ArrowLeft size={14} strokeWidth={2.5} />}
          >
            Rever dados
          </Button>
        </div>

        <div className="summary-mini-stats">
          {summaryMiniStats.map((item) => (
            <div key={item.id} className="summary-mini-stat">
              <div className={`summary-mini-stat-dot dot-${item.tone}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

