import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '../../ui/Button';
import { heroCopy } from '../../../lib/constants/copy';
import { HeroStats } from './HeroStats';
import type { ScreenId } from '../../../lib/types';

interface HeroScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenExample: () => void;
}

export const HeroScreen = ({ onNavigate, onOpenExample }: HeroScreenProps) => {
  return (
    <section className="screen active" id="screen-hero">
      <div className="hero-grid-overlay" />

      <div className="hero-content">
        <div className="hero-badge">{heroCopy.badge}</div>

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
          <Button variant="secondary" onClick={onOpenExample}>
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
