import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { summaryCopy } from '../../../lib/constants/copy';
import type { ScreenId } from '../../../lib/types';
import { useDietForgeStore } from '../../../store/useDietForgeStore';
import { Button } from '../../ui/Button';

import { SummaryMetrics } from './SummaryMetrics';

interface SummaryScreenProps {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
}

export const SummaryScreen = ({ active, onNavigate }: SummaryScreenProps) => {
  const results = useDietForgeStore((state) => state.results);

  const miniStats: Array<{
    id: string;
    tone: 'violet' | 'cyan' | 'lime' | 'orange';
    content: ReactNode;
  }> = [
    {
      id: 'bmr',
      content: `BMR: ${(results?.breakdown.bmr ?? 0).toLocaleString('pt-BR')} kcal`,
      tone: 'violet',
    },
    {
      id: 'lbm',
      content: `LBM: ${results?.bmr.lbm !== null && results?.bmr.lbm !== undefined ? `${results.bmr.lbm.toLocaleString('pt-BR')} kg` : 'N/A'}`,
      tone: 'cyan',
    },
    {
      id: 'tef',
      content: `TEF: ${(results?.breakdown.tef ?? 0).toLocaleString('pt-BR')} kcal`,
      tone: 'lime',
    },
    {
      id: 'macros',
      content: (
        <span>
          Proteína <strong className="summary-mini-stat-val-protein">{results?.macros.proteinG ?? 0}g</strong> · Carb{' '}
          <strong className="summary-mini-stat-val-carb">{results?.macros.carbsG ?? 0}g</strong> · Gordura{' '}
          <strong className="summary-mini-stat-val-fat">{results?.macros.fatG ?? 0}g</strong>
        </span>
      ),
      tone: 'orange',
    },
  ];

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
          {miniStats.map((item) => (
            <div key={item.id} className="summary-mini-stat">
              <div className={`summary-mini-stat-dot dot-${item.tone}`} />
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
