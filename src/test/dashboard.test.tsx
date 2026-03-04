import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { vi } from 'vitest';

import App from '../App';
import { useDietForgeStore } from '../store/useDietForgeStore';

const openExampleDashboard = async () => {
  fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
  await screen.findByText(/protocolo ativo/i);
};

const clickSectionDot = (sectionName: RegExp) => {
  const [target] = screen.getAllByRole('button', { name: sectionName });
  if (!target) {
    throw new Error(`Dot de seção não encontrado: ${sectionName.toString()}`);
  }
  fireEvent.click(target);
};

const hasProjectionBrandCheckError = (callArgs: unknown[]) => {
  const flattened = callArgs.map((arg) => String(arg)).join(' ');
  return /does not implement interface (Document|Window)/i.test(flattened);
};

const hasSupplementsLegacyRuntimeError = (callArgs: unknown[]) => {
  const flattened = callArgs.map((arg) => String(arg)).join(' ');
  return /Supplements legacy script execution error:/i.test(flattened);
};

const hasSimulatorLegacyRuntimeError = (callArgs: unknown[]) => {
  const flattened = callArgs.map((arg) => String(arg)).join(' ');
  return /Simulator legacy script execution error:/i.test(flattened);
};

const hasFinalLegacyRuntimeError = (callArgs: unknown[]) => {
  const flattened = callArgs.map((arg) => String(arg)).join(' ');
  return /Final legacy (script execution|runtime callback) error:/i.test(flattened);
};

describe('Dashboard presentation mode', () => {
  beforeEach(() => {
    vi.useRealTimers();
    useDietForgeStore.getState().resetAll();
    window.localStorage.removeItem('dietforge_profiles');
    window.localStorage.removeItem('dietforge_active_profile_id');
    window.localStorage.removeItem('dietforge_draft');
    window.localStorage.removeItem('dietforge.dashboard.first_seen_at');
    vi.restoreAllMocks();
  });

  it('renders welcome slide with animated summary data', async () => {
    render(<App />);
    await openExampleDashboard();

    expect(screen.getByText(/protocolo ativo/i)).toBeInTheDocument();
    expect(screen.getByText(/seu plano está/i)).toBeInTheDocument();
    expect(screen.getByText(/calibrado/i)).toBeInTheDocument();
    expect(screen.getByText(/tdee\s*[—-]\s*gasto total diário/i)).toBeInTheDocument();
    expect(screen.getAllByText(/meta cal[oó]rica/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/^scroll$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rolar para ver mais detalhes/i })).toBeInTheDocument();
  });

  it('applies and resets hero card tilt on pointer interaction', async () => {
    render(<App />);
    await openExampleDashboard();

    const card = document.querySelector('.kpi-card') as HTMLElement | null;
    expect(card).not.toBeNull();
    if (!card) {
      return;
    }

    Object.defineProperty(card, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        x: 100,
        y: 100,
        top: 100,
        left: 100,
        right: 420,
        bottom: 360,
        width: 320,
        height: 260,
        toJSON: () => ({}),
      }),
    });

    fireEvent.mouseMove(card, { clientX: 280, clientY: 220 });

    expect(card.style.transform).toContain('translateY(-4px)');
    expect(card.style.transform).toContain('perspective(800px)');
    expect(card.style.transform).toContain('rotateX(');
    expect(card.style.transform).toContain('rotateY(');
    expect(card.style.transition).toContain('transform 0.1s linear');

    fireEvent.mouseLeave(card);

    expect(card.style.transform).toBe('');
    expect(card.style.transition).toBe('');
  });

  it('pulses protocol badge on 4500ms cycle and clears pulse after 800ms', async () => {
    const intervalSpy = vi.spyOn(window, 'setInterval');
    const timeoutSpy = vi.spyOn(window, 'setTimeout');

    render(<App />);
    await openExampleDashboard();

    const badge = document.querySelector('.protocol-badge') as HTMLElement | null;
    expect(badge).not.toBeNull();
    if (!badge) {
      return;
    }

    const intervalCall = intervalSpy.mock.calls.find(([, delay]) => delay === 4500);
    expect(intervalCall).toBeDefined();
    if (!intervalCall) {
      return;
    }

    const [pulseTick] = intervalCall;
    expect(typeof pulseTick).toBe('function');
    if (typeof pulseTick !== 'function') {
      return;
    }

    expect(badge.classList.contains('is-pulsing')).toBe(false);
    act(() => {
      pulseTick();
    });
    expect(badge.classList.contains('is-pulsing')).toBe(true);

    const timeoutCall = timeoutSpy.mock.calls.find(([, delay]) => delay === 800);
    expect(timeoutCall).toBeDefined();
    if (!timeoutCall) {
      return;
    }

    const [clearPulse] = timeoutCall;
    expect(typeof clearPulse).toBe('function');
    if (typeof clearPulse !== 'function') {
      return;
    }

    act(() => {
      clearPulse();
    });
    expect(badge.classList.contains('is-pulsing')).toBe(false);
  });

  it('uses fixed rail dots with 9 sections', async () => {
    render(<App />);
    await openExampleDashboard();

    const rail = screen.getByLabelText(/progresso das seções/i);
    const dots = within(rail).getAllByRole('button');
    expect(dots.length).toBe(9);
  });

  it('renders opus tdee section with dynamic components, waterfall, and composition legend', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para seção tdee/i);

    await waitFor(() => {
      expect(document.querySelector('.tdee-section')).not.toBeNull();
    });

    const tdeeSection = document.querySelector('.tdee-section') as HTMLElement | null;
    expect(tdeeSection).not.toBeNull();
    if (!tdeeSection) {
      return;
    }

    expect(tdeeSection).toHaveTextContent(/gasto energ/i);
    expect(tdeeSection).toHaveTextContent(/de onde v/i);
    expect(tdeeSection).toHaveTextContent(/kcal\s*\/\s*dia/i);

    expect(tdeeSection).toHaveTextContent(/taxa metab/i);
    expect(tdeeSection).toHaveTextContent(/atividade n/i);
    expect(tdeeSection).toHaveTextContent(/atividade de treino/i);
    expect(tdeeSection).toHaveTextContent(/cardio \/ passos/i);
    expect(tdeeSection).toHaveTextContent(/efeito t/i);
    expect(tdeeSection).toHaveTextContent(/waterfall/i);

    const compositionLegend = document.querySelector('.composition-components-legend') as HTMLElement | null;
    expect(compositionLegend).not.toBeNull();
    if (!compositionLegend) {
      return;
    }

    expect(compositionLegend).toHaveTextContent(/BMR/);
    expect(compositionLegend).toHaveTextContent(/NEAT/);
    expect(compositionLegend).toHaveTextContent(/EAT/);
    expect(compositionLegend).toHaveTextContent(/CARDIO/);
    expect(compositionLegend).toHaveTextContent(/TEF/);
    expect(document.querySelector('.formula-row')).toBeNull();
    expect(tdeeSection.textContent ?? '').not.toMatch(/[�ÃÂ]/);
  });

  it('shows active section in header and updates after section navigation', async () => {
    render(<App />);
    await openExampleDashboard();

    const headerPill = document.querySelector('.topbar-section-pill');
    expect(headerPill).not.toBeNull();
    expect(headerPill).toHaveTextContent(/01.*abertura/i);

    clickSectionDot(/ir para seção meta/i);

    await waitFor(() => {
      expect(headerPill).toHaveTextContent(/03.*meta/i);
    });
  });

  it('renders projection section as legacy literal structure', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o proje\u00e7\u00e3o/i);

    const projectionRoot = await waitFor(() => {
      const root = document.querySelector('#dfp-heading-projection');
      if (!root) {
        throw new Error('Root da projeção não encontrado');
      }
      return root as HTMLElement;
    });

    const sectionTitle = projectionRoot.querySelector('.section-title');
    expect(sectionTitle).not.toBeNull();
    const normalizedTitle = (sectionTitle?.textContent ?? '').replace(/\s+/g, ' ').trim();
    expect(normalizedTitle).toContain('Projeção & Progresso');
    expect(sectionTitle?.textContent ?? '').toMatch(/Proje\u00e7\u00e3o/i);
    expect(sectionTitle?.textContent ?? '').toMatch(/Progresso/i);
    expect(projectionRoot).toHaveTextContent(/Protocolo DietForge/i);

    expect(document.querySelector('#statWeeks')).not.toBeNull();
    expect(document.querySelector('#statLoss')).not.toBeNull();
    expect(document.querySelector('#statDeficit')).not.toBeNull();
    expect(document.querySelector('#statSpeed')).not.toBeNull();
    expect(document.querySelector('#statBf')).not.toBeNull();

    expect(document.querySelector('#projectionChart')).not.toBeNull();
    expect(document.querySelector('.bottom-row')).not.toBeNull();
    expect(document.querySelector('.info-row')).not.toBeNull();
    expect(document.querySelector('#weeklyTable')).not.toBeNull();
    expect(document.querySelector('#weeklyTableBody')).not.toBeNull();
    expect(document.querySelector('.projection-disclaimer')).not.toBeNull();
    expect(document.querySelector('.summary-footer')).not.toBeNull();

    await waitFor(() => {
      expect(document.querySelectorAll('.week-selector-wrap .week-pill').length).toBe(17);
    });

    const refeedWeeks = Array.from(document.querySelectorAll('.week-selector-wrap .week-pill.refeed')).map((pill) =>
      (pill.textContent ?? '').trim(),
    );
    expect(refeedWeeks).toEqual(expect.arrayContaining(['4', '8', '12', '15']));

    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(17);
    });

    await waitFor(() => {
      const chart = document.querySelector('#projectionChart') as HTMLCanvasElement | null;
      expect(chart).not.toBeNull();
      expect((chart as HTMLCanvasElement).width).toBeGreaterThan(0);
      expect((chart as HTMLCanvasElement).height).toBeGreaterThan(0);
    });

    const projectionText = document.querySelector('#dfp-heading-projection')?.textContent ?? '';
    expect(projectionText).not.toContain('\uFFFD');
    expect(projectionText).not.toContain('Ã');
  });

  it('keeps projection rendering alive with limited canvas context', async () => {
    const noop = vi.fn();
    const gradient = {
      addColorStop: noop,
    };

    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      return {
        clearRect: noop,
        createLinearGradient: vi.fn(() => gradient),
        fillRect: noop,
        beginPath: noop,
        moveTo: noop,
        lineTo: noop,
        stroke: noop,
        setLineDash: noop,
        fillText: noop,
        save: noop,
        restore: noop,
        translate: noop,
        rotate: noop,
        closePath: noop,
        fill: noop,
        arc: noop,
        rect: noop,
        bezierCurveTo: noop,
        scale: noop,
        setTransform: noop,
      } as unknown as CanvasRenderingContext2D;
    });

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<App />);
    await openExampleDashboard();
    clickSectionDot(/ir para se\u00e7\u00e3o proje\u00e7\u00e3o/i);

    await waitFor(() => {
      expect(document.querySelectorAll('.week-selector-wrap .week-pill').length).toBe(17);
    });

    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(17);
    });

    const chart = document.querySelector('#projectionChart') as HTMLCanvasElement | null;
    expect(chart).not.toBeNull();
    expect(getContextSpy).toHaveBeenCalled();
    expect(window.toggleSeries).toEqual(expect.any(Function));
    expect(window.highlightWeek).toEqual(expect.any(Function));
    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining('Projection legacy script execution error'));
    expect(errorSpy.mock.calls.some((call) => hasProjectionBrandCheckError(call))).toBe(false);
  });

  it('keeps projection stable after remount without brand-check errors', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o proje\u00e7\u00e3o/i);
    await waitFor(() => {
      expect(document.querySelectorAll('.week-selector-wrap .week-pill').length).toBe(17);
    });
    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(17);
    });

    clickSectionDot(/ir para seção tdee/i);
    await waitFor(() => {
      expect(document.querySelector('.tdee-section')).not.toBeNull();
    });

    clickSectionDot(/ir para se\u00e7\u00e3o proje\u00e7\u00e3o/i);
    await waitFor(() => {
      expect(document.querySelectorAll('.week-selector-wrap .week-pill').length).toBe(17);
    });
    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(17);
    });

    const chart = document.querySelector('#projectionChart') as HTMLCanvasElement | null;
    expect(chart).not.toBeNull();
    expect((chart as HTMLCanvasElement).width).toBeGreaterThan(0);
    expect((chart as HTMLCanvasElement).height).toBeGreaterThan(0);
    expect(errorSpy.mock.calls.some((call) => hasProjectionBrandCheckError(call))).toBe(false);
  });

  it('renders meals section from legacy with day selector, timeline, and expand toggle', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o refei\u00e7\u00f5es/i);

    const mealsRoot = await waitFor(() => {
      const root = document.querySelector('#dfp-heading-meals');
      if (!root) {
        throw new Error('Root de Refei\u00e7\u00f5es n\u00e3o encontrado');
      }
      return root as HTMLElement;
    });

    const headerTitle = mealsRoot.querySelector('.section-header__title');
    expect(headerTitle).not.toBeNull();
    const normalizedHeader = (headerTitle?.textContent ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    expect(normalizedHeader).toContain('Plano Alimentar Diario');

    const dayButtons = mealsRoot.querySelectorAll('.day-selector__btn');
    expect(dayButtons.length).toBe(7);
    expect(mealsRoot.querySelector('.day-selector__btn--active')).not.toBeNull();

    const secondDay = dayButtons[1] as HTMLButtonElement | undefined;
    expect(secondDay).toBeDefined();
    if (secondDay) {
      fireEvent.click(secondDay);
      expect(secondDay.classList.contains('day-selector__btn--active')).toBe(true);
    }

    expect(mealsRoot.querySelectorAll('.meal-card').length).toBe(4);
    expect(mealsRoot.querySelector('.timeline-line')).not.toBeNull();

    await waitFor(() => {
      const progress = mealsRoot.querySelector<HTMLElement>('.timeline-line__progress');
      expect(progress).not.toBeNull();
      expect(progress?.style.height).toBe('100%');
    });

    const toggle = mealsRoot.querySelector<HTMLElement>('.meal-card__expand-toggle');
    expect(toggle).not.toBeNull();
    const foods = toggle?.nextElementSibling as HTMLElement | null;
    expect(foods).not.toBeNull();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');

    if (toggle && foods) {
      fireEvent.click(toggle);
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(toggle.classList.contains('is-expanded')).toBe(true);
      expect(foods.classList.contains('is-expanded')).toBe(true);
      expect(toggle.textContent ?? '').toMatch(/ocultar alimentos/i);

      fireEvent.click(toggle);
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(toggle.classList.contains('is-expanded')).toBe(false);
      expect(foods.classList.contains('is-expanded')).toBe(false);
      expect(toggle.textContent ?? '').toMatch(/ver alimentos/i);
    }

    const sectionText = mealsRoot.textContent ?? '';
    expect(sectionText).not.toContain('\uFFFD');
    expect(sectionText).not.toContain('Ãƒ');
  });

  it('renders supplements section from legacy with cards, timeline, toggle, and modal flow', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para seção suplementos/i);

    const supplementsRoot = await waitFor(() => {
      const root = document.querySelector('#dfp-heading-supplements');
      if (!root) {
        throw new Error('Root de Suplementos não encontrado');
      }
      return root as HTMLElement;
    });

    const sectionTitle = supplementsRoot.querySelector('.section-title');
    expect(sectionTitle).not.toBeNull();
    const normalizedTitle = (sectionTitle?.textContent ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    expect(normalizedTitle).toMatch(/Protocolo de\s*Suplementacao/i);

    const highPriorityCards = supplementsRoot.querySelectorAll('#high-priority-grid .sup-card');
    const mediumPriorityCards = supplementsRoot.querySelectorAll('#medium-priority-grid .sup-card');
    expect(highPriorityCards.length).toBe(3);
    expect(mediumPriorityCards.length).toBe(2);

    const timelineTracks = supplementsRoot.querySelectorAll('.timeline-tracks .timeline-track');
    expect(timelineTracks.length).toBe(5);

    await waitFor(() => {
      const nowLine = supplementsRoot.querySelector<HTMLElement>('#timeline-now');
      expect(nowLine).not.toBeNull();
      expect(nowLine?.style.left).toMatch(/%$/);
    });

    const btnGrid = supplementsRoot.querySelector<HTMLButtonElement>('#btn-grid');
    const btnList = supplementsRoot.querySelector<HTMLButtonElement>('#btn-list');
    const highGrid = supplementsRoot.querySelector<HTMLElement>('#high-priority-grid');
    const mediumGrid = supplementsRoot.querySelector<HTMLElement>('#medium-priority-grid');
    expect(btnGrid).not.toBeNull();
    expect(btnList).not.toBeNull();
    expect(highGrid).not.toBeNull();
    expect(mediumGrid).not.toBeNull();

    if (btnGrid && btnList && highGrid && mediumGrid) {
      fireEvent.click(btnList);
      expect(btnList.classList.contains('active')).toBe(true);
      expect(btnGrid.classList.contains('active')).toBe(false);
      expect(highGrid.style.gridTemplateColumns).toBe('1fr');
      expect(mediumGrid.style.gridTemplateColumns).toBe('1fr');

      fireEvent.click(btnGrid);
      expect(btnGrid.classList.contains('active')).toBe(true);
      expect(btnList.classList.contains('active')).toBe(false);
      expect(highGrid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
      expect(mediumGrid.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
    }

    const firstSupplementCard = supplementsRoot.querySelector<HTMLElement>('#high-priority-grid .sup-card');
    const overlay = supplementsRoot.querySelector<HTMLElement>('#modal-overlay');
    expect(firstSupplementCard).not.toBeNull();
    expect(overlay).not.toBeNull();

    if (firstSupplementCard && overlay) {
      fireEvent.click(firstSupplementCard);

      await waitFor(() => {
        expect(overlay.classList.contains('open')).toBe(true);
        expect(overlay.getAttribute('aria-hidden')).toBe('false');
      });

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(overlay.classList.contains('open')).toBe(false);
        expect(overlay.getAttribute('aria-hidden')).toBe('true');
      });
    }

    const sectionText = supplementsRoot.textContent ?? '';
    expect(sectionText).not.toContain('\uFFFD');
    expect(sectionText).not.toMatch(/[ÃÂ][\w]/);
  });

  it('keeps supplements runtime stable after remount', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para seção suplementos/i);
    await waitFor(() => {
      expect(document.querySelectorAll('#high-priority-grid .sup-card').length).toBe(3);
    });
    await waitFor(() => {
      expect(document.querySelectorAll('.timeline-tracks .timeline-track').length).toBe(5);
    });

    clickSectionDot(/ir para seção tdee/i);
    await waitFor(() => {
      expect(document.querySelector('.tdee-section')).not.toBeNull();
    });

    clickSectionDot(/ir para seção suplementos/i);
    await waitFor(() => {
      expect(document.querySelectorAll('#high-priority-grid .sup-card').length).toBe(3);
    });
    await waitFor(() => {
      expect(document.querySelectorAll('.timeline-tracks .timeline-track').length).toBe(5);
    });

    expect(errorSpy.mock.calls.some((call) => hasSupplementsLegacyRuntimeError(call))).toBe(false);
  });

  it('renders simulator section from legacy with live controls and actions', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o simulador/i);

    const simulatorRoot = await waitFor(() => {
      const root = document.querySelector('#dfp-heading-whatif');
      if (!root) {
        throw new Error('Root de Simulador n\u00e3o encontrado');
      }
      return root as HTMLElement;
    });

    const sectionTitle = simulatorRoot.querySelector('.section-title');
    expect(sectionTitle).not.toBeNull();
    expect((sectionTitle?.textContent ?? '').replace(/\s+/g, ' ').trim()).toContain('Protocol Forge');

    const workoutsSlider = simulatorRoot.querySelector<HTMLElement>('#slider-workouts');
    const cardioSlider = simulatorRoot.querySelector<HTMLElement>('#slider-cardio');
    const valWorkouts = simulatorRoot.querySelector<HTMLElement>('#val-workouts');
    const valCardio = simulatorRoot.querySelector<HTMLElement>('#val-cardio');
    expect(workoutsSlider).not.toBeNull();
    expect(cardioSlider).not.toBeNull();
    expect(valWorkouts?.textContent?.trim()).toBe('4');
    expect(valCardio?.textContent?.trim()).toBe('20');

    if (workoutsSlider) {
      fireEvent.keyDown(workoutsSlider, { key: 'ArrowRight' });
      await waitFor(() => {
        expect(workoutsSlider.getAttribute('aria-valuenow')).toBe('5');
      });
      expect(valWorkouts?.textContent?.trim()).toBe('5');
    }

    const miniCut = simulatorRoot.querySelector<HTMLElement>('.objective-option[data-obj=\"mini-cut\"]');
    expect(miniCut).not.toBeNull();
    if (miniCut) {
      fireEvent.click(miniCut);
      expect(miniCut.classList.contains('selected')).toBe(true);
      expect(miniCut.getAttribute('aria-checked')).toBe('true');
    }

    const ecaOption = simulatorRoot.querySelector<HTMLElement>('.thermo-option[data-thermo=\"eca\"]');
    const warning = simulatorRoot.querySelector<HTMLElement>('#thermo-warning');
    expect(ecaOption).not.toBeNull();
    expect(warning).not.toBeNull();
    if (ecaOption && warning) {
      fireEvent.click(ecaOption);
      expect(ecaOption.classList.contains('selected')).toBe(true);
      expect(ecaOption.getAttribute('aria-checked')).toBe('true');
      await waitFor(() => {
        expect(warning.style.display).toBe('block');
      });
    }

    await waitFor(() => {
      expect(simulatorRoot.querySelector('#result-protocol-name')?.textContent ?? '').toMatch(/Mini Cut/i);
    });

    const gaugeValue = simulatorRoot.querySelector('#gauge-value');
    const mainKpi = simulatorRoot.querySelector('#kpi-calories');
    expect(gaugeValue).not.toBeNull();
    expect(mainKpi).not.toBeNull();

    const btnApply = simulatorRoot.querySelector<HTMLButtonElement>('#btn-apply');
    expect(btnApply).not.toBeNull();
    if (btnApply) {
      fireEvent.click(btnApply);
      expect(btnApply.textContent ?? '').toMatch(/Aplicando/i);
      await waitFor(
        () => {
          expect(btnApply.textContent ?? '').toMatch(/Aplicar Simula/i);
        },
        { timeout: 3000 },
      );
    }

    const btnClear = simulatorRoot.querySelector<HTMLButtonElement>('#btn-clear');
    expect(btnClear).not.toBeNull();
    if (btnClear) {
      fireEvent.click(btnClear);
      await waitFor(() => {
        expect(simulatorRoot.querySelector('#val-workouts')?.textContent?.trim()).toBe('4');
      });
      await waitFor(() => {
        const hardCut = simulatorRoot.querySelector<HTMLElement>('.objective-option[data-obj=\"hard-cut\"]');
        expect(hardCut?.classList.contains('selected')).toBe(true);
      });
    }

    const sectionText = simulatorRoot.textContent ?? '';
    expect(sectionText).not.toContain('\uFFFD');
    expect(sectionText).not.toMatch(/[ÃƒÃ‚][\w]/);
  });

  it('keeps simulator runtime stable after remount', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o simulador/i);
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-whatif #slider-workouts')).not.toBeNull();
    });

    clickSectionDot(/ir para se\u00e7\u00e3o tdee/i);
    await waitFor(() => {
      expect(document.querySelector('.tdee-section')).not.toBeNull();
    });

    clickSectionDot(/ir para se\u00e7\u00e3o simulador/i);
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-whatif #slider-workouts')).not.toBeNull();
    });
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-whatif #result-protocol-name')).not.toBeNull();
    });

    expect(errorSpy.mock.calls.some((call) => hasSimulatorLegacyRuntimeError(call))).toBe(false);
  });

  it('navigates sections with keyboard arrows and triggers scroll', async () => {
    const scrollIntoViewSpy = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoViewSpy,
    });

    render(<App />);
    await openExampleDashboard();

    fireEvent.keyDown(window, { key: 'ArrowDown' });

    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it('renders macros section with rebuilt UI and visual checklist', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para seção macros/i);

    expect(await screen.findAllByText(/Macronutrientes/i)).not.toHaveLength(0);
    // Legacy Macros UI checks
    expect(screen.getByText(/Protocolo Nutricional Ativo/i)).toBeInTheDocument();
    expect(screen.getByText(/Composição Calórica/i)).toBeInTheDocument();
    expect(screen.getByText(/Contribuição Calórica/i)).toBeInTheDocument();
    expect(screen.getByText(/Validação da Soma Calórica/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Proteína/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Carboidrato/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Gordura/i).length).toBeGreaterThan(0);

    const riverLegendItems = document.querySelectorAll('.river-legend .river-legend__item');
    expect(riverLegendItems.length).toBe(3);

    const densityPills = document.querySelectorAll('.density-pills .density-pill');
    expect(densityPills.length).toBe(3);

    const insightsBar = document.querySelector('.insights-bar');
    expect(insightsBar).not.toBeNull();

    const miniSegProtein = document.querySelector('.hero-metric__mini-seg--protein');
    const miniSegCarb = document.querySelector('.hero-metric__mini-seg--carb');
    const miniSegFat = document.querySelector('.hero-metric__mini-seg--fat');
    expect(miniSegProtein?.getAttribute('data-target-w')).toBe('56');
    expect(miniSegCarb?.getAttribute('data-target-w')).toBe('178');
    expect(miniSegFat?.getAttribute('data-target-w')).toBe('66');

    const riverProtein = document.querySelector('.river-bar__seg--protein');
    const riverCarb = document.querySelector('.river-bar__seg--carb');
    const riverFat = document.querySelector('.river-bar__seg--fat');
    expect(riverProtein?.getAttribute('data-target-flex')).toBe('18.7');
    expect(riverCarb?.getAttribute('data-target-flex')).toBe('59.3');
    expect(riverFat?.getAttribute('data-target-flex')).toBe('22.1');

    const contribProtein = document.querySelector('.contrib-row__bar-fill--protein');
    const contribCarb = document.querySelector('.contrib-row__bar-fill--carb');
    const contribFat = document.querySelector('.contrib-row__bar-fill--fat');
    expect(contribProtein?.getAttribute('data-target-width')).toBe('31.5');
    expect(contribCarb?.getAttribute('data-target-width')).toBe('100');
    expect(contribFat?.getAttribute('data-target-width')).toBe('37.2');
  });

  it('toggles projection weekly table between all rows and highlights', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o proje\u00e7\u00e3o/i);

    const btnAll = await screen.findByRole('button', { name: /todas/i });
    const btnHighlights = screen.getByRole('button', { name: /marcos/i });

    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(17);
    });

    fireEvent.click(btnHighlights);
    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(10);
    });

    fireEvent.click(btnAll);
    await waitFor(() => {
      expect(document.querySelectorAll('#weeklyTableBody tr').length).toBe(17);
    });
  });

  it('renders final section from legacy with hero, timeline, and insights blocks', async () => {
    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o encerramento/i);

    const finalRoot = await waitFor(() => {
      const root = document.querySelector('#dfp-heading-final');
      if (!root) {
        throw new Error('Root de Encerramento nao encontrado');
      }
      return root as HTMLElement;
    });

    const normalizedText = (finalRoot.textContent ?? '').replace(/\s+/g, ' ').trim();
    expect(normalizedText).toMatch(/Seu Plano est\u00e1 Pronto para A\u00e7\u00e3o/i);
    expect(normalizedText).toMatch(/Resumo do Protocolo/i);
    expect(normalizedText).toMatch(/Linha do Tempo/i);
    expect(normalizedText).toMatch(/Pr\u00f3ximos Passos/i);
    expect(finalRoot.querySelectorAll('.insight-card').length).toBe(4);
    expect(finalRoot.querySelector('#protocolProgress')).not.toBeNull();
    expect(finalRoot.querySelector('#progressPct')).not.toBeNull();

    const finalSectionText = finalRoot.textContent ?? '';
    expect(finalSectionText).not.toContain('\uFFFD');
    expect(finalSectionText).not.toMatch(/\u00c3|\u00c2/);
  });

  it('handles final legacy CTAs and modal flows', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o encerramento/i);

    const finalRoot = await waitFor(() => {
      const root = document.querySelector('#dfp-heading-final');
      if (!root) {
        throw new Error('Root de Encerramento nao encontrado');
      }
      return root as HTMLElement;
    });

    const btnMontarDieta = finalRoot.querySelector<HTMLButtonElement>('#btnMontarDieta');
    const btnExportPdf = finalRoot.querySelector<HTMLButtonElement>('#btnExportPdf');
    const btnSharePlan = finalRoot.querySelector<HTMLButtonElement>('#btnSharePlan');
    const modalPdf = finalRoot.querySelector<HTMLElement>('#modalPdf');
    const modalShare = finalRoot.querySelector<HTMLElement>('#modalShare');
    expect(btnMontarDieta).not.toBeNull();
    expect(btnExportPdf).not.toBeNull();
    expect(btnSharePlan).not.toBeNull();
    expect(modalPdf).not.toBeNull();
    expect(modalShare).not.toBeNull();

    if (btnMontarDieta) {
      fireEvent.click(btnMontarDieta);
      await waitFor(() => {
        const toastText = (finalRoot.querySelector('#toastContainer')?.textContent ?? '').replace(/\s+/g, ' ').trim();
        expect(toastText).toMatch(/Em Desenvolvimento/i);
      });
    }

    if (btnExportPdf && modalPdf) {
      fireEvent.click(btnExportPdf);
      await waitFor(() => {
        expect(modalPdf.classList.contains('visible')).toBe(true);
      });
      expect(document.body.style.overflow).toBe('hidden');

      const cancelPdfModal = finalRoot.querySelector<HTMLButtonElement>('#cancelPdfModal');
      expect(cancelPdfModal).not.toBeNull();
      if (cancelPdfModal) {
        fireEvent.click(cancelPdfModal);
      }
      await waitFor(() => {
        expect(modalPdf.classList.contains('visible')).toBe(false);
      });
      expect(document.body.style.overflow).toBe('');
    }

    if (btnSharePlan && modalShare) {
      fireEvent.click(btnSharePlan);
      await waitFor(() => {
        expect(modalShare.classList.contains('visible')).toBe(true);
      });
      expect(document.body.style.overflow).toBe('hidden');

      const confirmShare = finalRoot.querySelector<HTMLButtonElement>('#confirmShare');
      expect(confirmShare).not.toBeNull();
      if (confirmShare) {
        await act(async () => {
          fireEvent.click(confirmShare);
          await Promise.resolve();
        });
      }

      await waitFor(() => {
        expect(writeText).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(modalShare.classList.contains('visible')).toBe(false);
      });
      expect(document.body.style.overflow).toBe('');
    }
  });

  it('keeps final runtime stable after remount', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<App />);
    await openExampleDashboard();

    clickSectionDot(/ir para se\u00e7\u00e3o encerramento/i);
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-final #btnMontarDieta')).not.toBeNull();
    });
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-final #protocolProgress')).not.toBeNull();
    });

    clickSectionDot(/ir para se\u00e7\u00e3o tdee/i);
    await waitFor(() => {
      expect(document.querySelector('.tdee-section')).not.toBeNull();
    });

    clickSectionDot(/ir para se\u00e7\u00e3o encerramento/i);
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-final #btnMontarDieta')).not.toBeNull();
    });
    await waitFor(() => {
      expect(document.querySelector('#dfp-heading-final #toastContainer')).not.toBeNull();
    });

    expect(errorSpy.mock.calls.some((call) => hasFinalLegacyRuntimeError(call))).toBe(false);
  });
});
