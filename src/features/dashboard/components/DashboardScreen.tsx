import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import type { ScreenId } from '@/app/types';
import { GOAL_TIMELINE_STEP } from '@/features/form/config/formSteps';
import type { SharedProfileMeta } from '@/lib/profiles/types';
import { useDietForgeStore } from '@/store/useDietForgeStore';
import { FinalSlide } from './presentation/FinalSlide';
import { GoalSlide } from './presentation/GoalSlide';
import { MacrosSlide } from './presentation/MacrosSlide';
import { MealsSlide } from './presentation/MealsSlide';
import { ProjectionSlide } from './presentation/ProjectionSlide';
import { SupplementsSlide } from './presentation/SupplementsSlide';
import { TdeeSlide } from './presentation/TdeeSlide';
import type { DashboardSectionId, DashboardSectionItem } from './presentation/types';
import { WelcomeSlide } from './presentation/WelcomeSlide';
import { WhatIfSlide } from './presentation/WhatIfSlide';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  profileTrigger?: ReactNode;
  activeProfileMeta?: (SharedProfileMeta & { createdAt?: string }) | undefined;
}

const isInteractiveTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  return Boolean(target.closest('input, textarea, select, button, [role="slider"], [contenteditable="true"]'));
};

const makeSectionRefs = (): Record<DashboardSectionId, HTMLElement | null> => ({
  welcome: null,
  tdee: null,
  goal: null,
  macros: null,
  projection: null,
  meals: null,
  supplements: null,
  whatif: null,
  final: null,
});

const makeRatioMap = (): Record<DashboardSectionId, number> => ({
  welcome: 0,
  tdee: 0,
  goal: 0,
  macros: 0,
  projection: 0,
  meals: 0,
  supplements: 0,
  whatif: 0,
  final: 0,
});

const areSetsEqual = <T,>(left: Set<T>, right: Set<T>): boolean => {
  if (left.size !== right.size) {
    return false;
  }

  for (const item of left) {
    if (!right.has(item)) {
      return false;
    }
  }

  return true;
};

const usePrefersReducedMotion = (): boolean => {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReduced(media.matches);

    media.addEventListener?.('change', onChange);
    media.addListener?.(onChange);

    return () => {
      media.removeEventListener?.('change', onChange);
      media.removeListener?.(onChange);
    };
  }, []);

  return prefersReduced;
};

export const DashboardScreen = ({ onNavigate, profileTrigger, activeProfileMeta }: DashboardScreenProps) => {
  const formData = useDietForgeStore((state) => state.formData);
  const isExamplePreview = useDietForgeStore((state) => state.isExamplePreview);
  const results = useDietForgeStore((state) => state.results);
  const resetAll = useDietForgeStore((state) => state.resetAll);
  const restoreFromExamplePreview = useDietForgeStore((state) => state.restoreFromExamplePreview);
  const setStep = useDietForgeStore((state) => state.setStep);

  const reducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<DashboardSectionId, HTMLElement | null>>(makeSectionRefs());
  const ratiosRef = useRef<Record<DashboardSectionId, number>>(makeRatioMap());
  const activeSectionRef = useRef<DashboardSectionId>('welcome');

  const [activeSectionId, setActiveSectionId] = useState<DashboardSectionId>('welcome');
  const [visitedSectionIds, setVisitedSectionIds] = useState<Set<DashboardSectionId>>(() => new Set(['welcome']));
  const [activatedSectionIds, setActivatedSectionIds] = useState<Set<DashboardSectionId>>(() => new Set(['welcome']));

  const markSectionActivated = useCallback((sectionId: DashboardSectionId) => {
    setActivatedSectionIds((previous) => {
      if (previous.has(sectionId)) {
        return previous;
      }

      const next = new Set(previous);
      next.add(sectionId);
      return next;
    });
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSectionId;
  }, [activeSectionId]);

  useEffect(() => {
    document.body.classList.add('dashboard-active');
    return () => {
      document.body.classList.remove('dashboard-active');
    };
  }, []);

  const handleRestart = useCallback(() => {
    if (isExamplePreview) {
      restoreFromExamplePreview();
      onNavigate('hero');
      return;
    }

    resetAll();
    onNavigate('hero');
  }, [isExamplePreview, onNavigate, resetAll, restoreFromExamplePreview]);

  const handleGoToGoalStep = useCallback(() => {
    setStep(GOAL_TIMELINE_STEP);
    onNavigate('form');
  }, [onNavigate, setStep]);

  const sections = useMemo<DashboardSectionItem[]>(() => {
    if (!results) {
      return [];
    }

    return [
      { id: 'welcome', label: 'Abertura', headingId: 'dfp-heading-welcome' },
      { id: 'tdee', label: 'TDEE', headingId: 'dfp-heading-tdee' },
      { id: 'goal', label: 'Meta', headingId: 'dfp-heading-goal' },
      { id: 'macros', label: 'Macros', headingId: 'dfp-heading-macros' },
      { id: 'projection', label: 'Projeção', headingId: 'dfp-heading-projection' },
      { id: 'meals', label: 'Refeições', headingId: 'dfp-heading-meals' },
      { id: 'supplements', label: 'Suplementos', headingId: 'dfp-heading-supplements' },
      { id: 'whatif', label: 'Simulador', headingId: 'dfp-heading-whatif' },
      { id: 'final', label: 'Encerramento', headingId: 'dfp-heading-final' },
    ];
  }, [results]);

  const activeSectionMeta = useMemo(() => {
    const activeIndex = sections.findIndex((section) => section.id === activeSectionId);

    if (activeIndex < 0) {
      return { index: '01', label: 'Abertura' };
    }

    return {
      index: String(activeIndex + 1).padStart(2, '0'),
      label: sections[activeIndex]?.label ?? 'Abertura',
    };
  }, [activeSectionId, sections]);

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const sectionIdsKey = useMemo(() => sectionIds.join('|'), [sectionIds]);

  const scrollToSection = useCallback(
    (index: number) => {
      const targetId = sectionIds[index];
      if (!targetId) {
        return;
      }

      markSectionActivated(targetId);
      sectionRefs.current[targetId]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      setActiveSectionId((current) => (current === targetId ? current : targetId));
    },
    [markSectionActivated, reducedMotion, sectionIds],
  );

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const valid = new Set(sectionIds);
    const firstSectionId = sectionIds[0] ?? 'welcome';

    setVisitedSectionIds((previous) => {
      const next = new Set(Array.from(previous).filter((id) => valid.has(id)));
      next.add(firstSectionId);
      return areSetsEqual(previous, next) ? previous : next;
    });

    setActivatedSectionIds((previous) => {
      const next = new Set(Array.from(previous).filter((id) => valid.has(id)));
      next.add(firstSectionId);
      return areSetsEqual(previous, next) ? previous : next;
    });

    setActiveSectionId((previous) => (valid.has(previous) ? previous : firstSectionId));
  }, [sectionIdsKey, sectionIds]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || sectionIds.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rawId = entry.target.getAttribute('data-section-id') as DashboardSectionId | null;
          if (!rawId) {
            return;
          }

          ratiosRef.current[rawId] = entry.intersectionRatio;

          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            markSectionActivated(rawId);
          }
        });

        let nextActive = activeSectionRef.current;
        let maxRatio = -1;

        sectionIds.forEach((id) => {
          const ratio = ratiosRef.current[id] ?? 0;
          if (ratio > 0.05 && ratio > maxRatio) {
            maxRatio = ratio;
            nextActive = id;
          }
        });

        if (nextActive !== activeSectionRef.current) {
          setActiveSectionId(nextActive);
        }
      },
      {
        root,
        threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75],
      },
    );

    sectionIds.forEach((id) => {
      const node = sectionRefs.current[id];
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [markSectionActivated, sectionIdsKey, sectionIds]);

  useEffect(() => {
    setVisitedSectionIds((previous) => {
      if (previous.has(activeSectionId)) {
        return previous;
      }
      const next = new Set(previous);
      next.add(activeSectionId);
      return next;
    });
  }, [activeSectionId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }

      if (isInteractiveTarget(event.target)) {
        return;
      }

      const currentIndex = sectionIds.indexOf(activeSectionRef.current);
      if (currentIndex < 0) {
        return;
      }

      event.preventDefault();

      if (event.key === 'ArrowDown') {
        scrollToSection(Math.min(sectionIds.length - 1, currentIndex + 1));
      } else {
        scrollToSection(Math.max(0, currentIndex - 1));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [scrollToSection, sectionIds]);

  const renderSectionContent = (sectionId: DashboardSectionId): ReactNode => {
    if (!results) {
      return null;
    }

    switch (sectionId) {
      case 'welcome':
        return (
          <WelcomeSlide
            activated={activatedSectionIds.has('welcome')}
            results={results}
            formData={formData}
            profileMeta={activeProfileMeta}
          />
        );
      case 'tdee':
        return <TdeeSlide activated={activatedSectionIds.has('tdee')} results={results} formData={formData} />;
      case 'goal':
        return <GoalSlide activated={activatedSectionIds.has('goal')} results={results} formData={formData} />;
      case 'macros':
        return <MacrosSlide results={results} activated={activatedSectionIds.has('macros')} />;
      case 'projection':
        return (
          <ProjectionSlide
            activated={activatedSectionIds.has('projection')}
            results={results}
            formData={formData}
            onGoToGoalStep={handleGoToGoalStep}
          />
        );
      case 'meals':
        return <MealsSlide activated={activatedSectionIds.has('meals')} results={results} formData={formData} />;
      case 'supplements':
        return <SupplementsSlide activated={activatedSectionIds.has('supplements')} results={results} />;
      case 'whatif':
        return <WhatIfSlide activated={activatedSectionIds.has('whatif')} results={results} formData={formData} />;
      case 'final':
        return (
          <FinalSlide
            activated={activatedSectionIds.has('final')}
            isActive={activeSectionId === 'final'}
            results={results}
            formData={formData}
            profileMeta={activeProfileMeta}
          />
        );
      default:
        return null;
    }
  };

  if (!results) {
    return (
      <section className="screen active" id="screen-dashboard">
        <div className="dfp-loading">Resultados indisponíveis.</div>
      </section>
    );
  }

  return (
    <section
      className="screen active"
      id="screen-dashboard"
      data-dashboard-presentation
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
    >
      <div id="topbar">
        <div className="logo">
          <span className="logo-accent">Diet</span>
          <span className="logo-main">Forge</span>
        </div>
        <p className="topbar-section-pill" aria-live="polite">
          <span className="topbar-section-index">{activeSectionMeta.index}</span>
          <span className="topbar-section-separator" aria-hidden>
            ·
          </span>
          <span className="topbar-section-label">{activeSectionMeta.label}</span>
        </p>
        <div className="topbar-right">
          <span className="topbar-mode">{isExamplePreview ? 'Modo Exemplo' : 'Plano Ativo'}</span>
          <button type="button" className={`topbar-btn${isExamplePreview ? ' is-danger' : ''}`} onClick={handleRestart}>
            <RotateCcw size={14} />
            {isExamplePreview ? 'Sair do exemplo' : 'Recalcular'}
          </button>
          {profileTrigger}
        </div>
      </div>

      <nav id="sidenav" aria-label="Progresso das seções">
        {sections.map((section, index) => {
          const stateClass =
            section.id === activeSectionId ? 'active' : visitedSectionIds.has(section.id) ? 'visited' : 'future';

          return (
            <button
              key={section.id}
              type="button"
              className={`nav-dot ${stateClass}`}
              data-section={index}
              onClick={() => scrollToSection(index)}
              aria-label={`Ir para seção ${section.label}`}
            >
              <span className="nav-dot-label">{section.label}</span>
              <span className="nav-pip" aria-hidden />
            </button>
          );
        })}
      </nav>

      <div className="dfp-mobile-progress" aria-label="Progresso mobile das seções">
        {sections.map((section, index) => {
          const stateClass =
            section.id === activeSectionId ? 'is-active' : visitedSectionIds.has(section.id) ? 'is-visited' : 'is-future';

          return (
            <button
              key={section.id}
              type="button"
              className={`dfp-mobile-dot ${stateClass}`}
              onClick={() => scrollToSection(index)}
              aria-label={`Ir para seção ${section.label}`}
            />
          );
        })}
      </div>

      <div className="dfp-shell" ref={scrollRef}>
        {sections.map((section) => (
          <section
            key={section.id}
            ref={(node) => {
              sectionRefs.current[section.id] = node;
            }}
            className="dfp-slide section"
            data-section-id={section.id}
            data-active={section.id === activeSectionId ? 'true' : 'false'}
            data-activated={activatedSectionIds.has(section.id) ? 'true' : 'false'}
            tabIndex={0}
            aria-labelledby={section.headingId}
          >
            <div className="dfp-slide-inner">{renderSectionContent(section.id)}</div>
          </section>
        ))}
      </div>

    </section>
  );
};

