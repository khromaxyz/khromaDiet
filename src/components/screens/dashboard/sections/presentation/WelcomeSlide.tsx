import { useEffect, useRef, type CSSProperties } from 'react';

import { useCountUp } from '../../../../../hooks/useCountUp';
import { GOAL_LABELS } from '../../../../../lib/constants/labels';
import type { SharedProfileMeta } from '../../../../../lib/profiles/types';
import type { CalculationResults, FormData } from '../../../../../lib/types';

const formatKcal = (value: number): string => value.toLocaleString('pt-BR');
const formatKg = (value: number): string =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

interface HeroParticle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
}

const HERO_PARTICLE_COLORS: readonly [string, ...string[]] = [
  'rgba(16, 185, 129, 0.6)',
  'rgba(16, 185, 129, 0.4)',
  'rgba(52, 211, 153, 0.3)',
  'rgba(4, 120, 87, 0.5)',
  'rgba(255, 255, 255, 0.15)',
  'rgba(255, 255, 255, 0.1)',
  'rgba(61, 214, 140, 0.25)',
];
const HERO_PARTICLE_DEFAULT_COLOR: string = HERO_PARTICLE_COLORS[0];

const createHeroParticles = (): HeroParticle[] => {
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  return Array.from({ length: 22 }, () => {
    const size = Math.round((random() * 3 + 1) * 100) / 100;
    return {
      x: Math.round(random() * 10000) / 100,
      y: Math.round(random() * 4000) / 100,
      size,
      duration: Math.round((random() * 12 + 8) * 100) / 100,
      delay: Math.round(random() * 1000) / 100,
      drift: Math.round(((random() - 0.5) * 80) * 100) / 100,
      color: HERO_PARTICLE_COLORS[Math.floor(random() * HERO_PARTICLE_COLORS.length)] ?? HERO_PARTICLE_DEFAULT_COLOR,
    };
  });
};

const HERO_PARTICLES: HeroParticle[] = createHeroParticles();

const ICON_BOLT_BADGE = 'M13 2L3 14h9l-1 8 10-12h-9l1-8z';
const ICON_CLOCK =
  'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z';
const ICON_TDEE = 'M17 2H7L2 12h5v10l10-12h-6l6-8z';
const ICON_META = 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 3a4 4 0 100 8 4 4 0 000-8z';
const ICON_DEFICIT = 'M20 12a8 8 0 01-8 8V12H4a8 8 0 018-8v8h8z';
const ICON_SURPLUS = 'M12 4l-6 6h4v8h4v-8h4l-6-6z';
const ICON_TAG_STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
const ICON_TAG_LINK =
  'M9 11H7a5 5 0 000 10h3v-2H7a3 3 0 010-6h2v-2zm5-2h2a5 5 0 010 10h-3v-2h3a3 3 0 000-6h-2V9zm-4 3h4v2h-4v-2z';
const ICON_TAG_HEART =
  'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 18v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z';
const ICON_TAG_PLAY = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z';
const ICON_TAG_CLOUD =
  'M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z';

const getParticleStyle = (particle: HeroParticle): CSSProperties =>
  ({
    '--x': `${particle.x}%`,
    '--y': `${particle.y}%`,
    '--size': `${particle.size}px`,
    '--duration': `${particle.duration}s`,
    '--delay': `${particle.delay}s`,
    '--drift': `${particle.drift}px`,
    '--color': particle.color,
    '--glow': `${particle.size * 4}px`,
  }) as CSSProperties;

interface WelcomeSlideProps {
  activated: boolean;
  results: CalculationResults;
  formData: FormData;
  profileMeta: SharedProfileMeta | undefined;
}

const HeroIcon = ({ path, size = 18 }: { path: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

export const WelcomeSlide = ({ activated, results, formData }: WelcomeSlideProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowTopRef = useRef<HTMLDivElement | null>(null);

  const tdee = useCountUp(results.tdeeFinal, activated, 900);
  const goalCalories = useCountUp(results.goalCalories, activated, 900);
  const delta = useCountUp(Math.abs(results.dailyDelta), activated, 900);

  const goalLabel = GOAL_LABELS[formData.goal];
  const projectionMilestones = results.projection?.milestones ?? [];
  const projectedWeek = projectionMilestones.length > 0 ? projectionMilestones[projectionMilestones.length - 1]?.week : null;
  const endWeek = projectedWeek ?? formData.targetWeeks ?? null;
  const projectedWeight =
    projectionMilestones.length > 0 ? projectionMilestones[projectionMilestones.length - 1]?.weightKg ?? null : null;

  const precisionPct = Math.round(results.precision.precisionPct);
  const isDeficit = results.dailyDelta >= 0;
  const deltaSign = isDeficit ? '−' : '+';
  const deltaLabel = isDeficit ? 'Déficit Calórico Diário' : 'Superávit Calórico Diário';
  const deltaStatusLabel = isDeficit ? 'No Alvo' : 'Ajuste Ativo';

  const activityFactor = results.bmr.bmr > 0 ? results.tdeeFinal / results.bmr.bmr : 1;
  const activityFactorLabel = activityFactor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const goalDeltaPct = Math.round(Math.abs(results.goalDeltaPct));
  const weeklyDelta = Math.abs(results.dailyDelta * 7);
  const weeklyRate = results.weeklyRateKg.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const basalKcal = Math.round(results.bmr.bmr);
  const activityKcal = Math.max(Math.round(results.tdeeFinal - results.bmr.bmr), 0);

  const currentWeight = formData.weightKg;
  const targetWeight = formData.targetWeightKg ?? projectedWeight ?? results.beforeAfter?.projected.weightKg ?? null;
  const remainingWeight = targetWeight !== null ? Math.abs(currentWeight - targetWeight) : null;
  const remainingDirection = targetWeight !== null && targetWeight < currentWeight ? '−' : '+';
  const projectionLabel = endWeek ? `${endWeek} sem` : 'n/d';

  const handleScrollNext = () => {
    const welcomeSection = document.querySelector<HTMLElement>(".dfp-slide[data-section-id='welcome']");
    if (!welcomeSection) {
      return;
    }

    const nextSection = welcomeSection.nextElementSibling;
    if (!(nextSection instanceof HTMLElement)) {
      return;
    }

    const dashboardRoot = welcomeSection.closest<HTMLElement>('#screen-dashboard[data-dashboard-presentation]');
    const prefersReduced = dashboardRoot?.dataset.reducedMotion === 'true';

    nextSection.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    const badge = badgeRef.current;
    if (!root || !badge) {
      return undefined;
    }

    const dashboardRoot = root.closest<HTMLElement>('#screen-dashboard[data-dashboard-presentation]');
    if (dashboardRoot?.dataset.reducedMotion === 'true') {
      return undefined;
    }

    const timeoutIds: number[] = [];
    const intervalId = window.setInterval(() => {
      badge.classList.add('is-pulsing');
      const timeoutId = window.setTimeout(() => {
        badge.classList.remove('is-pulsing');
      }, 800);
      timeoutIds.push(timeoutId);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      badge.classList.remove('is-pulsing');
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const grid = gridRef.current;
    const glowTop = glowTopRef.current;
    if (!root || !grid || !glowTop) {
      return undefined;
    }

    const dashboardRoot = root.closest<HTMLElement>('#screen-dashboard[data-dashboard-presentation]');
    const reducedMotion = dashboardRoot?.dataset.reducedMotion === 'true';
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reducedMotion || !canHover) {
      return undefined;
    }

    let frameId = 0;
    const onMouseMove = (event: MouseEvent) => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        const xRatio = (event.clientX / window.innerWidth - 0.5) * 2;
        const yRatio = (event.clientY / window.innerHeight - 0.5) * 2;

        grid.style.backgroundPosition = `${50 + xRatio * 4}px ${50 + yRatio * 4}px`;
        glowTop.style.transform = `translateX(calc(-50% + ${xRatio * 30}px)) translateY(${yRatio * 15}px)`;
      });
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      document.removeEventListener('mousemove', onMouseMove);
      grid.style.backgroundPosition = '';
      glowTop.style.transform = '';
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const dashboardRoot = root.closest<HTMLElement>('#screen-dashboard[data-dashboard-presentation]');
    const reducedMotion = dashboardRoot?.dataset.reducedMotion === 'true';
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reducedMotion || !canHover) {
      return undefined;
    }

    const cards = Array.from(root.querySelectorAll<HTMLElement>('.kpi-card'));
    if (cards.length === 0) {
      return undefined;
    }

    const cleanupFns = cards.map((card) => {
      const onMouseMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        const maxTilt = 5;
        const rotateX = (-(mouseY / (rect.height / 2)) * maxTilt).toFixed(2);
        const rotateY = ((mouseX / (rect.width / 2)) * maxTilt).toFixed(2);

        card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition =
          'transform 0.1s linear, border-color 320ms ease, background 320ms ease, box-shadow 320ms ease';
      };

      const onMouseLeave = () => {
        card.style.transform = '';
        card.style.transition = '';
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
        card.style.transform = '';
        card.style.transition = '';
      };
    });

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className={`s1-content ${activated ? 'is-active' : ''}`} id="dfp-heading-welcome" ref={rootRef}>
      <div className="hero-bg-base" aria-hidden />
      <div className="hero-bg-noise" aria-hidden />
      <div className="hero-bg-grid" aria-hidden ref={gridRef} />
      <div className="hero-glow-top" aria-hidden ref={glowTopRef} />
      <div className="hero-glow-left" aria-hidden />
      <div className="hero-glow-right" aria-hidden />
      <div className="hero-line-accent" aria-hidden />

      <div className="particles-container" aria-hidden>
        {HERO_PARTICLES.map((particle, index) => (
          <span key={`${particle.x}-${particle.y}-${index}`} className="particle" style={getParticleStyle(particle)} />
        ))}
      </div>

      <div className="hero-content">
        <div className="protocol-badge hero-seq hero-seq-1" role="status" ref={badgeRef}>
          <span className="protocol-badge-icon" aria-hidden>
            <HeroIcon path={ICON_BOLT_BADGE} size={12} />
          </span>
          <span className="protocol-badge-label">Protocolo</span>
          <span className="protocol-badge-sep" aria-hidden />
          <span className="protocol-badge-name">{goalLabel}</span>
          {endWeek ? (
            <span className="protocol-badge-duration">
              <HeroIcon path={ICON_CLOCK} size={10} />
              {endWeek} semanas
            </span>
          ) : null}
        </div>

        <div className="hero-headline-wrapper hero-seq hero-seq-2">
          <p className="hero-eyebrow">Análise de Protocolo Ativo</p>
          <h2 className="hero-title">
            <span className="hero-title-line1">Seu plano está</span>
            <span className="hero-title-accent">calibrado.</span>
          </h2>
          <p className="hero-subtitle">
            Modelo metabólico calculado com base em <strong>7 variáveis biométricas</strong>. Protocolo{' '}
            <strong>{goalLabel}</strong> em execução — cada caloria está contada, cada grama importa.
          </p>
        </div>

        <div
          className="confidence-strip hero-seq hero-seq-3"
          role="meter"
          aria-valuenow={precisionPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Precisão do modelo: ${precisionPct}%`}
        >
          <span className="confidence-label">Precisão do Modelo</span>
          <span className="confidence-bar-track" aria-hidden>
            <span className="confidence-bar-fill" style={{ width: activated ? `${precisionPct}%` : '0%' }} />
          </span>
          <span className="confidence-value">{activated ? `${precisionPct}%` : '0%'}</span>
          <span className="confidence-sep" aria-hidden />
          <span className="confidence-desc">Alta confiança — dados suficientes</span>
        </div>

        <div className="kpi-grid" role="list" aria-label="KPIs do protocolo">
          <article className="kpi-card kpi-card--tdee hero-card hero-card-1" role="listitem" tabIndex={0}>
            <div className="kpi-card-corner" aria-hidden />
            <div className="kpi-card-glow" aria-hidden />

            <header className="kpi-card-header">
              <span className="kpi-card-icon-wrap" aria-hidden>
                <HeroIcon path={ICON_TDEE} size={18} />
              </span>
              <span className="kpi-card-status kpi-card-status--neutral">
                <span className="kpi-card-status-dot" aria-hidden />
                Calculado
              </span>
            </header>

            <div className="kpi-card-body">
              <p className="kpi-card-value">
                <span className="kpi-card-number">{formatKcal(tdee)}</span>
                <span className="kpi-card-unit">kcal</span>
              </p>
              <p className="kpi-card-label">TDEE — Gasto Total Diário</p>
            </div>

            <footer className="kpi-card-footer">
              <p className="kpi-card-meta-text">
                Metabolismo basal <strong>{formatKcal(basalKcal)} kcal</strong>
                <br />+ Atividade física <strong>+{formatKcal(activityKcal)} kcal</strong>
              </p>
              <span className="kpi-mini-chart" aria-hidden>
                <svg width="56" height="28" viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline
                    points="0,22 8,18 16,20 24,12 32,14 40,8 48,10 56,6"
                    stroke="rgba(120,120,200,0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <polyline
                    points="0,22 8,18 16,20 24,12 32,14 40,8 48,10 56,6 56,28 0,28"
                    fill="url(#sparkGradTdee)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="sparkGradTdee" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8888cc" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <circle cx="56" cy="6" r="2.5" fill="#8888cc" opacity="0.8" />
                </svg>
              </span>
            </footer>
          </article>

          <article className="kpi-card kpi-card--meta hero-card hero-card-2" role="listitem" tabIndex={0}>
            <div className="kpi-card-corner" aria-hidden />
            <div className="kpi-card-glow" aria-hidden />

            <header className="kpi-card-header">
              <span className="kpi-card-icon-wrap" aria-hidden>
                <HeroIcon path={ICON_META} size={18} />
              </span>
              <span className="kpi-card-status kpi-card-status--primary">
                <span className="kpi-card-status-dot" aria-hidden />
                Meta Ativa
              </span>
            </header>

            <div className="kpi-card-body">
              <p className="kpi-card-value">
                <span className="kpi-card-number">{formatKcal(goalCalories)}</span>
                <span className="kpi-card-unit">kcal</span>
              </p>
              <p className="kpi-card-label">Meta Calórica Diária</p>
            </div>

            <footer className="kpi-card-footer">
              <p className="kpi-card-meta-text">
                Proteína <strong>{Math.round(results.macros.proteinG)}g</strong> · Carbo{' '}
                <strong>{Math.round(results.macros.carbsG)}g</strong>
                <br />
                Gordura <strong>{Math.round(results.macros.fatG)}g</strong> · Fibras <strong>35g+</strong>
              </p>
              <span className="kpi-mini-chart" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="14" stroke="rgba(16,185,129,0.12)" strokeWidth="3" fill="none" />
                  <circle
                    cx="20"
                    cy="20"
                    r="14"
                    stroke="url(#ringGradHero)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="72 88"
                    strokeDashoffset="22"
                    strokeLinecap="round"
                    transform="rotate(-90 20 20)"
                  />
                  <defs>
                    <linearGradient id="ringGradHero" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <text x="20" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.6)">
                    85%
                  </text>
                </svg>
              </span>
            </footer>
          </article>

          <article
            className={`kpi-card ${isDeficit ? 'kpi-card--deficit' : 'kpi-card--surplus'} hero-card hero-card-3`}
            role="listitem"
            tabIndex={0}
          >
            <div className="kpi-card-corner" aria-hidden />
            <div className="kpi-card-glow" aria-hidden />

            <header className="kpi-card-header">
              <span className="kpi-card-icon-wrap" aria-hidden>
                <HeroIcon path={isDeficit ? ICON_DEFICIT : ICON_SURPLUS} size={18} />
              </span>
              <span className={`kpi-card-status ${isDeficit ? 'kpi-card-status--positive' : 'kpi-card-status--primary'}`}>
                <span className="kpi-card-status-dot" aria-hidden />
                {deltaStatusLabel}
              </span>
            </header>

            <div className="kpi-card-body">
              <p className="kpi-card-value">
                <span className="kpi-card-sign" aria-hidden>
                  {deltaSign}
                </span>
                <span className="kpi-card-number">{formatKcal(delta)}</span>
                <span className="kpi-card-unit">kcal</span>
              </p>
              <p className="kpi-card-label">{deltaLabel}</p>
            </div>

            <footer className="kpi-card-footer">
              <p className="kpi-card-meta-text">
                Projeção semanal <strong>{isDeficit ? '−' : '+'}{formatKcal(Math.round(weeklyDelta))} kcal</strong>
                <br />≈ <strong>{weeklyRate} kg</strong> de {isDeficit ? 'perda' : 'ganho'}/semana
              </p>
              <span className="kpi-mini-chart" aria-hidden>
                <svg width="56" height="28" viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline
                    points="0,6 8,10 16,8 24,14 32,12 40,18 48,16 56,20"
                    stroke={isDeficit ? 'rgba(61,214,140,0.5)' : 'rgba(16,185,129,0.5)'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <polyline
                    points="0,6 8,10 16,8 24,14 32,12 40,18 48,16 56,20 56,28 0,28"
                    fill={isDeficit ? 'url(#sparkGradDeficit)' : 'url(#sparkGradSurplus)'}
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="sparkGradDeficit" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#3dd68c" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="sparkGradSurplus" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <circle cx="56" cy="20" r="2.5" fill={isDeficit ? '#3dd68c' : '#10b981'} opacity="0.8" />
                </svg>
              </span>
            </footer>
          </article>
        </div>

        <div className="protocol-detail-row hero-seq hero-seq-5" role="list" aria-label="Detalhes do protocolo">
          <span className="proto-tag proto-tag--highlight" role="listitem">
            <HeroIcon path={ICON_TAG_STAR} size={11} />
            {goalLabel}
          </span>
          {endWeek ? (
            <span className="proto-tag" role="listitem">
              <HeroIcon path={ICON_TAG_LINK} size={11} />
              Semana 3 / {endWeek}
            </span>
          ) : null}
          <span className="proto-tag" role="listitem">
            <HeroIcon path={ICON_CLOCK} size={11} />
            {goalDeltaPct}% {isDeficit ? 'Déficit' : 'Superávit'}
          </span>
          <span className="proto-tag" role="listitem">
            <HeroIcon path={ICON_TAG_HEART} size={11} />
            Fator Atividade {activityFactorLabel}
          </span>
          <span className="proto-tag" role="listitem">
            <HeroIcon path={ICON_TAG_PLAY} size={11} />
            Ajuste Automático
          </span>
          <span className="proto-tag" role="listitem">
            <HeroIcon path={ICON_TAG_CLOUD} size={11} />
            Sync Diário
          </span>
        </div>

        <div className="hero-footer-strip hero-seq hero-seq-6" role="region" aria-label="Estatísticas de progresso">
          <div className="footer-stat">
            <span className="footer-stat-value">{formatKg(currentWeight)} kg</span>
            <span className="footer-stat-label">Peso Atual</span>
          </div>

          <span className="footer-divider" aria-hidden />

          <div className="footer-stat">
            <span className="footer-stat-value">{targetWeight !== null ? `${formatKg(targetWeight)} kg` : '--'}</span>
            <span className="footer-stat-label">Meta Final</span>
          </div>

          <span className="footer-divider" aria-hidden />

          <div className="footer-stat">
            <span className="footer-stat-value">
              {remainingWeight !== null ? `${remainingDirection}${formatKg(remainingWeight)} kg` : '--'}
            </span>
            <span className="footer-stat-label">Restante</span>
          </div>

          <span className="footer-divider" aria-hidden />

          <div className="footer-stat">
            <span className="footer-stat-value">{precisionPct}%</span>
            <span className="footer-stat-label">Precisão</span>
          </div>

          <span className="footer-divider" aria-hidden />

          <div className="footer-stat">
            <span className="footer-stat-value">{projectionLabel}</span>
            <span className="footer-stat-label">Projeção</span>
          </div>

          <span className="footer-divider" aria-hidden />

          <div className="footer-stat">
            <span className="footer-stat-value">{weeklyRate} kg/sem</span>
            <span className="footer-stat-label">Taxa Semanal</span>
          </div>
        </div>

        <button
          type="button"
          className="hero-scroll-cta hero-seq hero-seq-7"
          onClick={handleScrollNext}
          aria-label="Rolar para ver mais detalhes"
        >
          <span className="hero-scroll-label">Explorar protocolo</span>
          <span className="hero-scroll-mouse" aria-hidden>
            <span className="hero-scroll-wheel" />
          </span>
        </button>
      </div>
    </div>
  );
};
