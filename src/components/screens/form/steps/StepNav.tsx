import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

import { Button } from '@/components/ui/primitives/button';

interface StepNavProps {
  onBack: () => void;
  onNext: () => void;
  submit?: boolean;
}

export const StepNav = ({ onBack, onNext, submit = false }: StepNavProps) => {
  return (
    <div className="form-nav">
      <Button variant="ghost" className="form-nav-button form-nav-button-back" onClick={onBack} aria-label="Voltar">
        <ArrowLeft size={14} strokeWidth={2.5} />
        Voltar
      </Button>

      <Button
        variant="default"
        className="form-nav-button form-nav-button-next"
        onClick={onNext}
        aria-label={submit ? 'Gerar meu plano' : 'Pr\u00f3ximo'}
      >
        {submit ? <Zap size={14} strokeWidth={2.5} /> : null}
        {submit ? 'Gerar meu plano' : 'Pr\u00f3ximo'}
        {submit ? null : <ArrowRight size={14} strokeWidth={2.5} />}
      </Button>
    </div>
  );
};
