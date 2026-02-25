import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

import { Button } from '../../../ui/Button';

interface StepNavProps {
  onBack: () => void;
  onNext: () => void;
  submit?: boolean;
}

export const StepNav = ({ onBack, onNext, submit = false }: StepNavProps) => {
  return (
    <div className="form-nav">
      <Button
        variant="form-back"
        onClick={onBack}
        leftIcon={<ArrowLeft size={14} strokeWidth={2.5} />}
        aria-label="Voltar"
      >
        Voltar
      </Button>
      <Button
        variant={submit ? 'submit' : 'form-next'}
        onClick={onNext}
        rightIcon={submit ? undefined : <ArrowRight size={14} strokeWidth={2.5} />}
        leftIcon={submit ? <Zap size={14} strokeWidth={2.5} /> : undefined}
        aria-label={submit ? 'Gerar meu plano' : 'Próximo'}
      >
        {submit ? 'Gerar meu plano' : 'Próximo'}
      </Button>
    </div>
  );
};

