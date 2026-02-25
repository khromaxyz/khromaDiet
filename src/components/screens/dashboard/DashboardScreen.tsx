import { motion, type Transition } from 'framer-motion';
import { Download, MoonStar, RotateCcw, Share2, Zap } from 'lucide-react';

import type { ScreenId } from '../../../lib/types';
import { DashboardFooter } from './sections/DashboardFooter';
import { BeforeAfterSection } from './sections/BeforeAfterSection';
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
}

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

export const DashboardScreen = ({ onNavigate }: DashboardScreenProps) => {
  return (
    <section className="screen active" id="screen-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo-area">
          <div className="dashboard-logo form-logo-inline">
            <Zap size={20} fill="var(--accent-lime)" color="var(--accent-lime)" />
            DIETFORGE
          </div>
          <div className="dashboard-header-badge">Plano Ativo</div>
        </div>
        <div className="dashboard-header-actions">
          <button className="theme-toggle" title="Alternar tema" aria-label="Alternar tema" type="button">
            <MoonStar size={14} />
          </button>
          <button className="btn-icon" title="Compartilhar" aria-label="Compartilhar" type="button">
            <Share2 size={16} strokeWidth={2} />
          </button>
          <button className="btn-restart" type="button" onClick={() => onNavigate('hero')}>
            <RotateCcw size={14} strokeWidth={2} />
            Recalcular
          </button>
          <button className="btn-export" type="button">
            <Download size={14} strokeWidth={2.5} />
            Exportar PDF
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <motion.div {...sectionMotion}>
          <ProfileStrip />
        </motion.div>
        <motion.div {...sectionMotion}>
          <KpiStrip />
        </motion.div>
        <motion.div {...sectionMotion}>
          <ReceiptCard />
        </motion.div>
        <motion.div {...sectionMotion}>
          <MacroCards />
        </motion.div>
        <motion.div {...sectionMotion}>
          <ProjectionSection />
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
          <DashboardFooter />
        </motion.div>
      </div>
    </section>
  );
};
