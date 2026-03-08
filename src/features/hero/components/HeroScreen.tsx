import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import type { ScreenId } from '@/app/types';
import { SectionShell } from '@/components/design-system';
import { Button } from '@/components/ui/primitives/button';
import { heroCopy } from '@/features/hero/content/heroCopy';

import { HeroStats } from './HeroStats';

interface HeroScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenExample: () => void;
}

const HERO_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: HERO_EASE,
    },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: HERO_EASE,
    },
  },
};

export const HeroScreen = ({ onNavigate, onOpenExample }: HeroScreenProps) => {
  return (
    <SectionShell
      id="screen-hero"
      level="abyss"
      className="screen active flex min-h-screen items-center py-[var(--space-24)] sm:py-[var(--space-28)]"
    >
      <motion.div
        className="hero-screen__content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="hero-screen__copy">
          <motion.div className="hero-screen__badge" variants={itemVariants}>
            <span className="hero-screen__badge-dot" aria-hidden />
            <span>{heroCopy.badge}</span>
          </motion.div>

          <motion.h1 className="hero-screen__headline" variants={itemVariants}>
            <span className="hero-screen__headline-line hero-screen__headline-line--base">
              {heroCopy.titleLine1}
            </span>
            <span className="hero-screen__headline-line hero-screen__headline-line--accent">
              {heroCopy.titleLine2}
            </span>
          </motion.h1>

          <motion.p className="hero-screen__subheadline" variants={itemVariants}>
            {heroCopy.subtitle}
          </motion.p>

          <motion.div className="hero-screen__cta-group" variants={itemVariants}>
            <Button
              variant="default"
              size="lg"
              className="hero-screen__cta hero-screen__cta--primary"
              onClick={() => onNavigate('form')}
            >
              {heroCopy.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hero-screen__cta hero-screen__cta--secondary"
              onClick={onOpenExample}
            >
              {heroCopy.secondaryCta}
            </Button>
          </motion.div>
        </div>

        <motion.div className="hero-screen__panel-wrap" variants={panelVariants}>
          <HeroStats />
        </motion.div>
      </motion.div>
    </SectionShell>
  );
};
