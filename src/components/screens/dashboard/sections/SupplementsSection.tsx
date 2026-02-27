import { useMemo } from 'react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';

const priorityOrder = ['Alta', 'Média', 'Baixa'] as const;

const priorityToClass: Record<string, string> = {
  Alta: 'priority-high',
  Média: 'priority-medium',
  Baixa: 'priority-low',
};

const safeIcon = (icon: string): string => {
  const trimmed = icon.trim();
  if (!trimmed || trimmed.includes('\uFFFD')) {
    return '💊';
  }
  return trimmed;
};

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
                <span className="supp-icon">{safeIcon(supp.icon)}</span>
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
