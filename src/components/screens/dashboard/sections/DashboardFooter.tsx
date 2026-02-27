import { Zap } from 'lucide-react';

import { useDietForgeStore } from '../../../../store/useDietForgeStore';

export const DashboardFooter = () => {
  const results = useDietForgeStore((state) => state.results);
  const methodLabel =
    results?.bmrMethod === 'cunningham'
      ? 'Cunningham'
      : results?.bmrMethod === 'katch_mcardle'
        ? 'Katch-McArdle'
        : results?.bmrMethod === 'henry'
          ? 'Henry'
          : 'Mifflin-St Jeor';

  const now = new Date();
  const dateLabel = now.toLocaleDateString('pt-BR');

  return (
    <div className="dashboard-footer">
      <div className="footer-logo footer-logo-inline">
        <Zap size={14} fill="var(--dash-accent, var(--accent-red))" color="var(--dash-accent, var(--accent-red))" />
        DIETFORGE
      </div>
      <div className="footer-note">
        Plano gerado com BMR {methodLabel}, ajuste NEAT/EAT/TEF e modificadores dinâmicos em {dateLabel}.
      </div>
      <div className="footer-disclaimer-wrap">
        <div className="footer-disclaimer">Uso educacional. Consulte nutricionista para acompanhamento clínico.</div>
        <details className="footer-docs-disclosure">
          <summary>Ver documentação técnica</summary>
          <div className="footer-docs-content">
            <p>
              BMR por Mifflin-St Jeor ou Katch-McArdle quando BF% disponível. TDEE = BMR + atividade + EAT treino + EAT
              cardio + TEF.
            </p>
            <p>
              Meta calórica deriva do objetivo (cut/bulk), com piso de segurança e validações. Projeção semanal aplica
              adaptação metabólica gradual e classificação de viabilidade.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};
