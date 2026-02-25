import { useEffect, useRef, type RefObject } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 120;

const palette = ['#c8ff00', '#8b5cf6', '#22d3ee'];

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  radius: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.5 + 0.1,
  color: palette[Math.floor(Math.random() * palette.length)] ?? '#c8ff00',
  pulseSpeed: Math.random() * 0.02 + 0.005,
  pulseOffset: Math.random() * Math.PI * 2,
});

const hexToRgb = (hex: string) => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export const useHeroParticles = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let frame = 0;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height),
      );
    };

    const drawConnections = () => {
      const maxDist = 140;
      for (let i = 0; i < particles.length; i += 1) {
        const current = particles[i];
        if (!current) {
          continue;
        }
        for (let j = i + 1; j < particles.length; j += 1) {
          const next = particles[j];
          if (!next) {
            continue;
          }
          const dx = current.x - next.x;
          const dy = current.y - next.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            context.beginPath();
            context.strokeStyle = `rgba(200,255,0,${alpha})`;
            context.lineWidth = 0.5;
            context.moveTo(current.x, current.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }
      }
    };

    const animate = () => {
      frame += 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const pulse = Math.sin(frame * particle.pulseSpeed + particle.pulseOffset);
        const opacity = particle.opacity * (0.7 + pulse * 0.3);
        const radius = particle.radius * (0.8 + pulse * 0.2);
        const { r, g, b } = hexToRgb(particle.color);

        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          radius * 4,
        );
        gradient.addColorStop(0, `rgba(${r},${g},${b},${opacity})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        context.fillStyle = gradient;
        context.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [canvasRef]);
};

