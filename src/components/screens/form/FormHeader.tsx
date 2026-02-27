import type { ReactNode } from 'react';
import { Clock3, Zap } from 'lucide-react';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
  precisionPct: number;
  profileTrigger?: ReactNode;
}

const getPrecisionTone = (value: number): 'low' | 'mid' | 'high' => {
  if (value < 50) {
    return 'low';
  }
  if (value > 80) {
    return 'high';
  }
  return 'mid';
};

export const FormHeader = ({ currentStep, totalSteps, precisionPct, profileTrigger }: FormHeaderProps) => {
  const stepLabel = String(currentStep).padStart(2, '0');
  const totalLabel = String(totalSteps).padStart(2, '0');
  const roundedPrecision = Math.round(precisionPct);
  const precisionTone = getPrecisionTone(roundedPrecision);

  return (
    <header className="form-header">
      <div className="form-header-main">
        <div className="form-logo form-logo-inline">
          <Zap size={20} fill="currentColor" className="form-logo-bolt" aria-hidden />
          <span className="form-logo-text">DIETFORGE</span>
        </div>

        <div className="form-step-badge" aria-label={`Pergunta ${stepLabel} de ${totalLabel}`}>
          <span className="form-step-badge-label">Pergunta</span>
          <span className="form-step-badge-current">{stepLabel}</span>
          <span className="form-step-badge-sep" aria-hidden>
            ·
          </span>
          <span className="form-step-badge-label">de</span>
          <span className="form-step-badge-total">{totalLabel}</span>
        </div>
      </div>

      <div className="form-header-side">
        <div className={`form-precision-badge form-precision-badge-${precisionTone}`}>
          Precisão <strong>{roundedPrecision}%</strong>
        </div>

        <button className="form-history-btn" title="Histórico" aria-label="Histórico" type="button">
          <Clock3 size={14} />
        </button>

        {profileTrigger}
      </div>
    </header>
  );
};
