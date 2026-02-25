import { Zap } from 'lucide-react';

export const DashboardFooter = () => {
  return (
    <div className="dashboard-footer">
      <div className="footer-logo footer-logo-inline">
        <Zap size={16} fill="var(--accent-lime)" color="var(--accent-lime)" />
        DIETFORGE™
      </div>
      <div className="footer-note">
        Plano gerado via protocolo Katch-McArdle com ajuste NEAT/EAT/TEF individualizado. Baseado nos dados fornecidos
        em 24/01/2025.
      </div>
      <div className="footer-disclaimer">Fins educacionais. Consulte um nutricionista.</div>
    </div>
  );
};

