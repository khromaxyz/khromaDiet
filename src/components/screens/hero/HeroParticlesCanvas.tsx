import { useRef } from 'react';

import { useHeroParticles } from '../../../hooks/useHeroParticles';

export const HeroParticlesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useHeroParticles(canvasRef);

  return (
    <div className="hero-canvas-wrapper">
      <canvas id="hero-canvas" ref={canvasRef} />
    </div>
  );
};

