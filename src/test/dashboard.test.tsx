import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import App from '../App';
import { formSteps } from '../lib/constants/steps';
import { useDietForgeStore } from '../store/useDietForgeStore';

describe('Dashboard behavior', () => {
  beforeEach(() => {
    useDietForgeStore.getState().resetAll();
    window.localStorage.removeItem('dietforge.dashboard.theme');
    window.localStorage.removeItem('dietforge.dashboard.first_seen_at');
  });

  it('renders receipt with real pipeline values', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));

    await screen.findByText(/recibo de cálculo/i);
    expect(await screen.findByText(/BMR base/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/TDEE Final/i)).toBeInTheDocument();
    }, { timeout: 2500 });
  });

  it('opens example preview with projection chart rendered', async () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/composição corporal/i);

    expect(container.querySelector('canvas')).toBeInTheDocument();
    expect(screen.queryByText(/ir para meta e prazo/i)).not.toBeInTheDocument();
  });

  it('rebalances macro sliders while keeping fixed calories target context', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/macros diários/i);

    const proteinSlider = screen.getByLabelText('Proteína') as HTMLInputElement;
    const carbsSlider = screen.getByLabelText('Carboidrato') as HTMLInputElement;

    const previousCarb = carbsSlider.value;
    fireEvent.change(proteinSlider, { target: { value: String(Number(proteinSlider.value) + 15) } });

    const updatedCarb = (screen.getByLabelText('Carboidrato') as HTMLInputElement).value;
    expect(updatedCarb).not.toBe(previousCarb);
    expect(screen.getByText(/meta fixa/i)).toBeInTheDocument();
  });

  it('uses macro fill width on the same min/max scale as the slider value', async () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/macros diários/i);

    const sliders = [
      screen.getByLabelText('Proteína') as HTMLInputElement,
      screen.getByLabelText('Carboidrato') as HTMLInputElement,
      screen.getByLabelText('Gordura') as HTMLInputElement,
    ];

    const cards = Array.from(container.querySelectorAll('.macro-card'));
    expect(cards.length).toBe(3);

    for (let index = 0; index < sliders.length; index += 1) {
      const slider = sliders[index];
      const card = cards[index];
      if (!slider || !card) {
        throw new Error('Expected macro slider and card for alignment assertion');
      }
      const fill = card?.querySelector('.macro-progress-fill') as HTMLElement | null;

      expect(fill).not.toBeNull();

      const min = Number(slider.min);
      const max = Number(slider.max);
      const value = Number(slider.value);
      const expected = max > min ? ((value - min) * 100) / (max - min) : 0;
      const actual = Number((fill?.style.width ?? '0').replace('%', ''));

      expect(Math.abs(actual - expected)).toBeLessThanOrEqual(0.15);
    }
  });

  it('copies share link with state payload', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/visão geral/i);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Compartilhar' }));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    expect(String(writeText.mock.calls[0]?.[0])).toContain('state=');
  });

  it('does not leak raw enum keys in what-if simulator labels', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/treino por semana/i);

    expect(screen.queryByText(/\bhard_cut\b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bmini_cut\b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bcaffeine\b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bnone\b/i)).not.toBeInTheDocument();
  });

  it('renders simulator texts with proper portuguese accents', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/e se você mudasse algo/i);

    expect(screen.getByText(/cardio diário/i)).toBeInTheDocument();
    expect(screen.getByText(/termogênico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpar simulação/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /aplicar simulação/i })).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('\uFFFD');
  });

  it('toggles dashboard theme and persists preference in localStorage', async () => {
    window.localStorage.setItem('dietforge.dashboard.theme', 'light');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/visão geral/i);

    const dashboard = document.getElementById('screen-dashboard');
    expect(dashboard?.getAttribute('data-theme')).toBe('light');

    fireEvent.click(screen.getByRole('button', { name: /alternar tema do dashboard/i }));

    expect(dashboard?.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem('dietforge.dashboard.theme')).toBe('dark');
  });

  it('renders meal cards without stuck loading state', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/distribuição por refeição/i);

    expect(screen.getByText(/lanche/i)).toBeInTheDocument();
    expect(document.querySelector('.meal-loading-spinner')).toBeNull();
  });

  it('shows calibration section after 14 days from first dashboard access', async () => {
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
    window.localStorage.setItem('dietforge.dashboard.first_seen_at', fifteenDaysAgo);

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    expect(await screen.findByText(/calibrar meu tdee/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /usar tdee calibrado/i })).toBeInTheDocument();
  });

  it('uses non-positive tone for 0 passos badge', async () => {
    const store = useDietForgeStore.getState();
    store.patchFormData({ cardioMode: 'steps', stepsPerDay: 0, targetWeeks: 12, targetFatKg: 4, goalMode: 'fat_kg' });
    store.computeResults();
    store.setScreen('dashboard');

    render(<App />);
    const stepsBadge = await screen.findByText(/0 passos/i);
    expect(stepsBadge.className).toContain('badge-orange');
  });

  it('uses amber tone and explanatory tooltip for precision badge', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    const precisionBadge = await screen.findByText(/% precisão/i);

    expect(precisionBadge.className).toContain('badge-amber');
    expect(precisionBadge).toHaveAttribute(
      'title',
      'Precisão estimada com base nos dados fornecidos. Adicione dados reais para melhorar.',
    );
  });

  it('renders static timeline markers without partial progress in prazo estimado card', async () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/prazo estimado/i);

    expect(screen.getByText('Sem 0')).toBeInTheDocument();
    expect(screen.getByText('Sem 4')).toBeInTheDocument();
    expect(screen.getByText('Sem 8')).toBeInTheDocument();
    expect(screen.getByText('Sem 12')).toBeInTheDocument();
    expect(container.querySelector('.kpi-timeline-progress')).toBeNull();
    expect(container.querySelector('.kpi-timeline-marker')).toBeNull();
  });

  it('shows NEAT/Atividade line using equals notation for accumulated value', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/recibo de cálculo/i);

    const activityLabel = await screen.findByText('NEAT/Atividade');
    const activityRow = activityLabel.closest('.receipt-row');

    expect(activityRow).not.toBeNull();
    expect(activityRow?.textContent).toMatch(/=\s*\d[\d.]*(,\d+)?\s*kcal/i);
  });

  it('renders NEAT Ocupacional and metabolic adaptation rows in the receipt', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/recibo de cálculo/i);

    expect(await screen.findByText(/\+ NEAT Ocupacional/i)).toBeInTheDocument();
    expect(await screen.findByText(/× Adaptação metabólica/i)).toBeInTheDocument();
  });

  it('renders macro cards without mini-donut rings and exposes min/max in slider tooltip', async () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/macros diários/i);

    expect(container.querySelector('.macro-donut')).toBeNull();
    const proteinSlider = screen.getByLabelText('Proteína');
    expect(proteinSlider.getAttribute('title')).toMatch(/^Min \d+g · Max \d+g$/);
  });

  it('shows deadline empty-state CTA when projection is unavailable', async () => {
    const store = useDietForgeStore.getState();
    store.patchFormData({
      goalMode: 'bf',
      targetWeeks: null,
      targetBodyFatPct: null,
      targetFatKg: null,
      targetWeightKg: null,
    });
    store.computeResults();
    store.setScreen('dashboard');

    render(<App />);

    expect(await screen.findByText(/preencha meta e prazo/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /ir para meta e prazo/i }).length).toBeGreaterThan(0);
  });

  it('hydrates step 12 defaults into state and enables projection on dashboard', async () => {
    const store = useDietForgeStore.getState();
    store.setScreen('form');
    const goalStepIndex = formSteps.findIndex((step) => step.id === 'goal_timeline');
    store.setStep(goalStepIndex + 1);
    store.patchFormData({
      goal: 'mini_cut',
      goalMode: 'bf',
      targetWeeks: null,
      targetBodyFatPct: null,
      targetFatKg: null,
      targetWeightKg: null,
    });

    render(<App />);

    await waitFor(() => {
      const formData = useDietForgeStore.getState().formData;
      expect(formData.targetWeeks).toBe(12);
      expect(formData.targetBodyFatPct).toBe(12);
    });

    await act(async () => {
      const current = useDietForgeStore.getState();
      current.computeResults();
      current.setScreen('dashboard');
      await Promise.resolve();
    });

    expect(await screen.findByText(/composição corporal/i)).toBeInTheDocument();
    expect(screen.queryByText(/preencha meta e prazo/i)).not.toBeInTheDocument();
  });

  it('renders refeed cards with distinct kcal values between different weeks', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/estratégia de refeed/i);

    const values = screen.getAllByText(/kcal/i).filter((element) => element.className.includes('refeed-item-value'));
    const uniqueValues = new Set(values.map((element) => element.textContent?.trim()));

    expect(values.length).toBeGreaterThan(1);
    expect(uniqueValues.size).toBeGreaterThan(1);
  });

  it('uses corrected refeed copy with temporária', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/estratégia de refeed/i);

    expect(screen.getByText(/manutenção temporária/i)).toBeInTheDocument();
    expect(screen.queryByText(/temporárla/i)).not.toBeInTheDocument();
  });
});
