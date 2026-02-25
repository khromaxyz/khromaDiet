import { MoonStar, Zap } from 'lucide-react';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const FormHeader = ({ currentStep, totalSteps }: FormHeaderProps) => {
  return (
    <header className="form-header">
      <div className="form-logo form-logo-inline">
        <Zap size={20} fill="var(--accent-lime)" color="var(--accent-lime)" />
        DIETFORGE
      </div>
      <div className="form-step-indicator">
        Pergunta <span>{currentStep}</span> de <span>{totalSteps}</span>
      </div>
      <button className="theme-toggle" title="Alternar tema" aria-label="Alternar tema" type="button">
        <MoonStar size={14} />
      </button>
    </header>
  );
};

