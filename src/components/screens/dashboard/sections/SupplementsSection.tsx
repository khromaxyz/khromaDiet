import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { Coffee, Droplets, Fish, Moon, Pill, Sun, TestTubes, Zap } from 'lucide-react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';

const priorityOrder = ['Alta', 'Média', 'Baixa'] as const;

const priorityToClass: Record<string, string> = {
  Alta: 'priority-high',
  Média: 'priority-medium',
  Baixa: 'priority-low',
};

const SUPP_ICON_MAP: Record<string, ReactNode> = {
  creatine: <Pill size={22} strokeWidth={1.5} />,
  vitd: <Sun size={22} strokeWidth={1.5} />,
  omega3: <Fish size={22} strokeWidth={1.5} />,
  magnesium: <Moon size={22} strokeWidth={1.5} />,
  whey: <Droplets size={22} strokeWidth={1.5} />,
  b12: <TestTubes size={22} strokeWidth={1.5} />,
  caffeine: <Coffee size={22} strokeWidth={1.5} />,
  zma: <Zap size={22} strokeWidth={1.5} />,
};

const DEFAULT_ICON = <Pill size={22} strokeWidth={1.5} />;

export const SupplementsSection = () => {
  const supplements = useDietForgeStore((state) => state.results?.supplements ?? []);

  const grouped = useMemo(() => {
    return priorityOrder
      .map((priority) => ({
        priority,
        items: supplements.filter((supplement) => supplement.priority === priority),
      }))
      .filter((group) => group.items.length > 0);
  }, [supplements]);

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Suplementação Recomendada</div>
        <span className="dash-section-action">Lógica condicional por perfil</span>
      </div>

      {grouped.map((group) => (
        <div key={group.priority} className="supps-priority-block">
          <div className="supps-priority-label">Prioridade {group.priority}</div>
          <div className="supps-grid supps-grid-uniform">
            {group.items.map((supp) => (
              <div key={supp.id} className={supp.glow ? `supp-card glow-${supp.glow}` : 'supp-card'}>
                <div className="supp-priority">
                  <span className={`priority-badge ${priorityToClass[supp.priority] ?? 'priority-low'}`}>{supp.priority}</span>
                </div>
                <span className="supp-icon">{SUPP_ICON_MAP[supp.id] ?? DEFAULT_ICON}</span>
                <div className="supp-name">{supp.name}</div>
                <div className="supp-dose">{supp.dose}</div>
                <div className="supp-timing">{supp.timing}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

