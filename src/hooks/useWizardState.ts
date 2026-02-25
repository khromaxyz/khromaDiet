import { useCallback, useMemo, useState } from 'react';

import type { ScreenId } from '../lib/types';

const screens: ScreenId[] = ['hero', 'form', 'summary', 'dashboard'];

export const useWizardState = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('hero');
  const [currentFormStep, setCurrentFormStep] = useState(1);

  const currentScreenIndex = useMemo(() => screens.indexOf(currentScreen), [currentScreen]);

  const goToScreen = useCallback((screen: ScreenId) => {
    setCurrentScreen(screen);
  }, []);

  const goToScreenIndex = useCallback((index: number) => {
    const bounded = Math.max(0, Math.min(index, screens.length - 1));
    const next = screens[bounded];
    if (next) {
      setCurrentScreen(next);
    }
  }, []);

  const nextFormStep = useCallback((totalSteps: number) => {
    setCurrentFormStep((prev) => {
      const next = prev + 1;
      return next > totalSteps ? totalSteps : next;
    });
  }, []);

  const prevFormStep = useCallback(() => {
    setCurrentFormStep((prev) => Math.max(1, prev - 1));
  }, []);

  const resetFormStep = useCallback(() => {
    setCurrentFormStep(1);
  }, []);

  return {
    screens,
    currentScreen,
    currentScreenIndex,
    currentFormStep,
    goToScreen,
    goToScreenIndex,
    nextFormStep,
    prevFormStep,
    resetFormStep,
  };
};

