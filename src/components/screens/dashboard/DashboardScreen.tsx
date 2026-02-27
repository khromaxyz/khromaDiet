import { motion, type Transition } from 'framer-motion';
import { Download, MoonStar, RotateCcw, Share2, SlidersHorizontal, Sun, Zap } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { formSteps } from '../../../lib/constants/steps';
import { serializeShareState } from '../../../lib/shareState';
import type { SharedProfileMeta } from '../../../lib/profiles/types';
import type { ScreenId } from '../../../lib/types';
import { useDietForgeStore } from '../../../store/useDietForgeStore';
import { BeforeAfterSection } from './sections/BeforeAfterSection';
import { CalibrationSection } from './sections/CalibrationSection';
import { DashboardFooter } from './sections/DashboardFooter';
import { KpiStrip } from './sections/KpiStrip';
import { MacroCards } from './sections/MacroCards';
import { MealsSection } from './sections/MealsSection';
import { ProfileStrip } from './sections/ProfileStrip';
import { ProjectionSection } from './sections/ProjectionSection';
import { ReceiptCard } from './sections/ReceiptCard';
import { RefeedSection } from './sections/RefeedSection';
import { SupplementsSection } from './sections/SupplementsSection';
import { WhatIfSection } from './sections/WhatIfSection';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  profileTrigger?: ReactNode;
  activeProfileMeta?: SharedProfileMeta;
}

type DashboardTheme = 'dark' | 'light';

const DASHBOARD_THEME_KEY = 'dietforge.dashboard.theme';

const sectionTransition: Transition = {
  duration: 0.45,
  ease: [0.25, 0.46, 0.45, 0.94],
};

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: sectionTransition,
};

export const DashboardScreen = ({ onNavigate, profileTrigger, activeProfileMeta }: DashboardScreenProps) => {
  const formData = useDietForgeStore((state) => state.formData);
  const currentStep = useDietForgeStore((state) => state.currentStep);
  const viewMode = useDietForgeStore((state) => state.viewMode);
  const isExamplePreview = useDietForgeStore((state) => state.isExamplePreview);
  const setViewMode = useDietForgeStore((state) => state.setViewMode);
  const resetAll = useDietForgeStore((state) => state.resetAll);
  const restoreFromExamplePreview = useDietForgeStore((state) => state.restoreFromExamplePreview);
  const setStep = useDietForgeStore((state) => state.setStep);

  const [shareStatus, setShareStatus] = useState('');
  const [dashboardTheme, setDashboardTheme] = useState<DashboardTheme>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return window.localStorage.getItem(DASHBOARD_THEME_KEY) === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.body.classList.add('dashboard-active');
    return () => {
      document.body.classList.remove('dashboard-active');
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DASHBOARD_THEME_KEY, dashboardTheme);
  }, [dashboardTheme]);

  const handleShare = async () => {
    const shareState = activeProfileMeta
      ? {
          formData,
          currentStep,
          viewMode,
          sharedProfile: activeProfileMeta,
        }
      : {
          formData,
          currentStep,
          viewMode,
        };

    const payload = serializeShareState(shareState);

    const url = new URL(window.location.href);
    url.searchParams.set('state', payload);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus('Link copiado');
      setTimeout(() => setShareStatus(''), 2200);
    } catch {
      setShareStatus('Falha ao copiar');
      setTimeout(() => setShareStatus(''), 2200);
    }
  };

  const handleRestart = () => {
    if (isExamplePreview) {
      restoreFromExamplePreview();
      onNavigate('hero');
      return;
    }
    resetAll();
    onNavigate('hero');
  };

  const handleGoToGoalStep = () => {
    const goalStepIndex = formSteps.findIndex((step) => step.id === 'goal_timeline');
    setStep(goalStepIndex >= 0 ? goalStepIndex + 1 : formSteps.length);
    onNavigate('form');
  };

  const modeLabel = viewMode === 'technical' ? 'Visão técnica' : 'Resultados';

  return (
    <section className="screen active" id="screen-dashboard" data-theme={dashboardTheme}>
      <header className="dashboard-header">
        <div className="dashboard-header-top">
          <div className="dashboard-logo-area">
            <div className="dashboard-logo form-logo-inline">
              <Zap size={20} fill="var(--dash-accent, var(--accent-red))" color="var(--dash-accent, var(--accent-red))" />
              DIETFORGE
            </div>
            <div className="dashboard-header-badge">{isExamplePreview ? 'Modo Exemplo' : 'Plano Ativo'}</div>
            {shareStatus ? <div className="dashboard-header-badge">{shareStatus}</div> : null}
          </div>
          <div className="dashboard-header-actions">
            <button
              className="theme-toggle icon-tooltip"
              title="Alternar tema do dashboard"
              aria-label="Alternar tema do dashboard"
              aria-pressed={dashboardTheme === 'light'}
              type="button"
              data-tooltip={dashboardTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              onClick={() => setDashboardTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            >
              {dashboardTheme === 'dark' ? <Sun size={14} /> : <MoonStar size={14} />}
            </button>
            <button
              className="btn-icon icon-tooltip"
              title="Alternar visão"
              aria-label="Alternar visão"
              type="button"
              data-tooltip={`Alternar para ${viewMode === 'technical' ? 'resultados' : 'visão técnica'}`}
              onClick={() => setViewMode(viewMode === 'technical' ? 'simple' : 'technical')}
            >
              <SlidersHorizontal size={16} strokeWidth={2} />
            </button>
            <button
              className="btn-icon icon-tooltip"
              title="Compartilhar"
              aria-label="Compartilhar"
              type="button"
              data-tooltip="Copiar link com estado"
              onClick={handleShare}
            >
              <Share2 size={16} strokeWidth={2} />
            </button>
            <button className="btn-restart" type="button" onClick={handleRestart}>
              <RotateCcw size={14} strokeWidth={2} />
              {isExamplePreview ? 'Sair do exemplo' : 'Recalcular'}
            </button>
            <button className="btn-export" type="button" onClick={() => window.print()}>
              <Download size={14} strokeWidth={2.5} />
              Exportar PDF
            </button>
            {profileTrigger}
          </div>
        </div>
        <div className="dashboard-header-sub">
          <span className="dashboard-header-sub-item">MODO</span>
          <div
            className={viewMode === 'technical' ? 'dashboard-mode-toggle technical' : 'dashboard-mode-toggle simple'}
            role="tablist"
            aria-label="Modo de visualização do dashboard"
          >
            <span className="dashboard-mode-thumb" aria-hidden />
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'simple'}
              className={viewMode === 'simple' ? 'dashboard-mode-btn active' : 'dashboard-mode-btn'}
              onClick={() => setViewMode('simple')}
            >
              Resultados
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'technical'}
              className={viewMode === 'technical' ? 'dashboard-mode-btn active' : 'dashboard-mode-btn'}
              onClick={() => setViewMode('technical')}
            >
              Visão técnica
            </button>
          </div>
          <span className="dashboard-header-sub-state">{modeLabel}</span>
        </div>
      </header>

      <div className="dashboard-body">
        <motion.div {...sectionMotion}>
          <ProfileStrip />
        </motion.div>
        <motion.div {...sectionMotion}>
          <KpiStrip onGoToGoalStep={handleGoToGoalStep} />
        </motion.div>
        <motion.div {...sectionMotion}>
          <MacroCards />
        </motion.div>

        {viewMode === 'technical' ? (
          <>
            <motion.div {...sectionMotion}>
              <ReceiptCard />
            </motion.div>
            <motion.div {...sectionMotion}>
              <ProjectionSection onGoToGoalStep={handleGoToGoalStep} theme={dashboardTheme} />
            </motion.div>
            <motion.div {...sectionMotion}>
              <BeforeAfterSection />
            </motion.div>
            <motion.div {...sectionMotion}>
              <SupplementsSection />
            </motion.div>
            <motion.div {...sectionMotion}>
              <WhatIfSection />
            </motion.div>
            <motion.div {...sectionMotion}>
              <MealsSection />
            </motion.div>
            <motion.div {...sectionMotion}>
              <RefeedSection />
            </motion.div>
            <motion.div {...sectionMotion}>
              <CalibrationSection />
            </motion.div>
          </>
        ) : null}

        <motion.div {...sectionMotion}>
          <DashboardFooter />
        </motion.div>
      </div>
    </section>
  );
};
