import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

import { CursorFx } from './components/layout/CursorFx';
import { PageWrapper } from './components/layout/PageWrapper';
import { ScreenNavPill } from './components/layout/ScreenNavPill';
import { DashboardScreen } from './components/screens/dashboard/DashboardScreen';
import { FormScreen } from './components/screens/form/FormScreen';
import { HeroScreen } from './components/screens/hero/HeroScreen';
import { SummaryScreen } from './components/screens/summary/SummaryScreen';
import { useFormState } from './hooks/useFormState';
import { useWizardState } from './hooks/useWizardState';
import type { ScreenId } from './lib/types';

const transition: Transition = {
  duration: 0.42,
  ease: [0.65, 0, 0.35, 1],
};

const ScreenContainer = ({ screen, children }: { screen: ScreenId; children: ReactNode }) => {
  return (
    <motion.div
      key={screen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
      className="screen-frame"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const wizard = useWizardState();
  const form = useFormState();

  const navigate = (screen: ScreenId) => {
    if (screen === 'hero' && wizard.currentScreen === 'dashboard') {
      wizard.resetFormStep();
      form.reset();
    }
    wizard.goToScreen(screen);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && wizard.currentScreenIndex < wizard.screens.length - 1) {
        wizard.goToScreenIndex(wizard.currentScreenIndex + 1);
      }
      if (event.key === 'ArrowLeft' && wizard.currentScreenIndex > 0) {
        wizard.goToScreenIndex(wizard.currentScreenIndex - 1);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [wizard]);

  return (
    <>
      <CursorFx />
      <ScreenNavPill currentScreen={wizard.currentScreen} onNavigate={navigate} />
      <PageWrapper>
        <AnimatePresence mode="wait" initial={false}>
          {wizard.currentScreen === 'hero' ? (
            <ScreenContainer screen="hero">
              <HeroScreen onNavigate={navigate} />
            </ScreenContainer>
          ) : null}

          {wizard.currentScreen === 'form' ? (
            <ScreenContainer screen="form">
              <FormScreen
                step={wizard.currentFormStep}
                data={form.formData}
                onPatch={form.onPatch}
                onBackStep={wizard.prevFormStep}
                onNextStep={() => wizard.nextFormStep(7)}
                onPrevScreen={() => navigate('hero')}
                onSummary={() => navigate('summary')}
              />
            </ScreenContainer>
          ) : null}

          {wizard.currentScreen === 'summary' ? (
            <ScreenContainer screen="summary">
              <SummaryScreen active={wizard.currentScreen === 'summary'} onNavigate={navigate} />
            </ScreenContainer>
          ) : null}

          {wizard.currentScreen === 'dashboard' ? (
            <ScreenContainer screen="dashboard">
              <DashboardScreen onNavigate={navigate} />
            </ScreenContainer>
          ) : null}
        </AnimatePresence>
      </PageWrapper>
    </>
  );
}

export default App;
