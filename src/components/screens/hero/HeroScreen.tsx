import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '../../ui/Button';
import { heroCopy } from '../../../lib/constants/copy';
import { HeroParticlesCanvas } from './HeroParticlesCanvas';
import { HeroStats } from './HeroStats';
import type { ScreenId } from '../../../lib/types';

interface HeroScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HeroScreen = ({ onNavigate }: HeroScreenProps) => {
  return (
    <section className="screen active" id="screen-hero">
      <HeroParticlesCanvas />
      <div className="hero-grid-overlay" />
      <div className="hero-gradient-blob blob-1" />
      <div className="hero-gradient-blob blob-2" />
      <div className="hero-gradient-blob blob-3" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {heroCopy.badge}
        </div>

        <h1 className="hero-headline">
          <span className="line-1">{heroCopy.titleLine1}</span>
          <span className="line-2">{heroCopy.titleLine2}</span>
        </h1>

        <p className="hero-subheadline">{heroCopy.subtitle}</p>

        <div className="hero-cta-group">
          <Button
            variant="primary"
            onClick={() => onNavigate('form')}
            rightIcon={<ArrowRight size={16} strokeWidth={2.5} />}
          >
            Calcular minha dieta
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('dashboard')}>
            Ver exemplo
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <HeroStats />
        </motion.div>
      </div>
    </section>
  );
};

