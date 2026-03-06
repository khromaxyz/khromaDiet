import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';
import { formSteps } from '../lib/constants/steps';
import { useDietForgeStore } from '../store/useDietForgeStore';

const goToForm = async () => {
  fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));
  await screen.findByText(/qual é o seu objetivo principal/i, {}, { timeout: 4000 });
};

describe('DietForge app flow', () => {
  beforeEach(() => {
    useDietForgeStore.getState().resetAll();
  });

  it('navigates hero -> form (14 steps) -> profile create -> summary -> dashboard', async () => {
    render(<App />);

    await goToForm();

    for (let index = 0; index < formSteps.length - 1; index += 1) {
      fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    }

    await screen.findByText(/defina sua meta quantitativa/i);

    fireEvent.click(screen.getByRole('button', { name: /gerar meu plano/i }));
    await screen.findByText(/seu plano est[aá] pronto/i);

    fireEvent.click(screen.getByRole('button', { name: /salvar e ver meu plano/i }));
    await screen.findByText(/plano funcional foi calculado/i);

    fireEvent.click(screen.getByRole('button', { name: /ver análise completa/i }));
    await screen.findByText(/^plano ativo$/i);
  }, 20000);

  it('supports back navigation in wizard', async () => {
    render(<App />);

    await goToForm();
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/qual é o seu sexo biológico/i);

    fireEvent.click(screen.getByRole('button', { name: /^voltar$/i }));
    await screen.findByText(/qual é o seu objetivo principal/i);
  });

  it('renders projection chart in dashboard', async () => {
    useDietForgeStore.getState().patchFormData({
      bodyFatDeclaredPct: 18,
      targetWeeks: 12,
      goalMode: 'fat_kg',
      targetFatKg: 5,
    });
    useDietForgeStore.getState().computeResults();

    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/protocolo ativo/i);
    expect(container.querySelector('[data-testid="projection-chart-shell"]')).toBeInTheDocument();
    expect(screen.getByTestId('nivo-line')).toBeInTheDocument();
  });

  it('keeps step registry order stable', () => {
    expect(formSteps.map((step) => step.id)).toEqual([
      'goal',
      'sex',
      'basics',
      'body_fat',
      'diet_history',
      'activity',
      'occupation',
      'training',
      'cardio',
      'hormones',
      'health',
      'thermogenics',
      'meals',
      'goal_timeline',
    ]);
  });
});
