import type { ScreenId } from '../lib/types';
import { useDietForgeStore } from '../store/useDietForgeStore';

const screens: ScreenId[] = ['hero', 'form', 'summary', 'dashboard'];

export const useWizardState = () => {
  const currentScreen = useDietForgeStore((state) => state.currentScreen);
  const currentFormStep = useDietForgeStore((state) => state.currentStep);
  const setScreen = useDietForgeStore((state) => state.setScreen);
  const nextStep = useDietForgeStore((state) => state.nextStep);
  const prevStep = useDietForgeStore((state) => state.prevStep);
  const setStep = useDietForgeStore((state) => state.setStep);

  const currentScreenIndex = screens.indexOf(currentScreen);

  return {
    screens,
    currentScreen,
    currentScreenIndex,
    currentFormStep,
    goToScreen: setScreen,
    goToScreenIndex: (index: number) => {
      const bounded = Math.max(0, Math.min(index, screens.length - 1));
      const next = screens[bounded];
      if (next) {
        setScreen(next);
      }
    },
    nextFormStep: nextStep,
    prevFormStep: prevStep,
    resetFormStep: () => setStep(1),
  };
};
