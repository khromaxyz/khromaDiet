import { screenDefinitions } from '@/app/screens';
import type { ScreenId } from '@/app/types';

interface ScreenNavPillProps {
  currentScreen: ScreenId;
  currentStep: number;
  totalSteps: number;
  onNavigate: (screen: ScreenId) => void;
}

export const ScreenNavPill = ({ currentScreen, currentStep, totalSteps, onNavigate }: ScreenNavPillProps) => {
  if (currentScreen === 'dashboard') {
    return null;
  }

  if (currentScreen === 'form') {
    return (
      <nav className="screen-nav-pill screen-nav-pill-form" id="screen-nav" aria-label="Progresso do formulario">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const stateClass =
            step === currentStep
              ? 'nav-pill-dot-active'
              : step < currentStep
                ? 'nav-pill-dot-past'
                : 'nav-pill-dot-future';

          return (
            <span
              key={step}
              className={`nav-pill-dot ${stateClass}`}
              aria-label={`Pergunta ${step} de ${totalSteps}`}
              role="presentation"
            />
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="screen-nav-pill screen-nav-pill-screen" id="screen-nav" aria-label="Navegacao de telas">
      {screenDefinitions.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === currentScreen ? 'nav-pill-dot nav-pill-dot-screen-active' : 'nav-pill-dot'}
          title={item.title}
          onClick={() => onNavigate(item.id)}
          aria-label={item.title}
        />
      ))}
    </nav>
  );
};
