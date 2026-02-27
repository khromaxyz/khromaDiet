import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import App from '../App';
import { useDietForgeStore } from '../store/useDietForgeStore';

describe('Form wizard behavior', () => {
  beforeEach(() => {
    useDietForgeStore.getState().resetAll();
  });

  it('shows onboarding micro-intro before first question', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));

    expect(screen.getByText(/cada detalhe melhora sua precisão/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/qual é o seu objetivo principal/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('auto-advances after selecting biological sex and menstrual phase for female', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));

    await screen.findByText(/qual é o seu objetivo principal/i, {}, { timeout: 4000 });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));

    await screen.findByText(/qual é o seu sexo biológico/i);
    fireEvent.click(screen.getByRole('button', { name: /feminino/i }));
    await screen.findByText(/em qual fase do ciclo/i);
    fireEvent.click(screen.getByRole('button', { name: /não sei \/ não aplica/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/seus dados corporais/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('renders new diet history and occupation steps in sequence', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));

    await screen.findByText(/qual é o seu objetivo principal/i, {}, { timeout: 4000 });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    fireEvent.click(screen.getByRole('button', { name: /masculino/i }));
    await screen.findByRole('heading', { name: /seus dados corporais/i });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByRole('heading', { name: /body fat/i });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));

    await screen.findByRole('heading', { name: /você está em déficit calórico atualmente/i });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));

    await screen.findByRole('heading', { name: /qual é seu nível de atividade diária/i });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));

    await screen.findByRole('heading', { name: /como é seu trabalho no dia a dia/i });
  });

  it('opens BF conflict modal when declared and navy differ by more than 5pp', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));

    await screen.findByText(/qual é o seu objetivo principal/i, {}, { timeout: 4000 });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));

    await screen.findByRole('heading', { name: /body fat/i });

    const declaredInput = container.querySelector('input[type="number"]') as HTMLInputElement | null;
    expect(declaredInput).not.toBeNull();
    if (!declaredInput) {
      return;
    }

    fireEvent.change(declaredInput, { target: { value: '28' } });
    fireEvent.click(screen.getByText(/método navy/i));

    const navyInputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(navyInputs[0] as HTMLInputElement, { target: { value: '40' } });
    fireEvent.change(navyInputs[1] as HTMLInputElement, { target: { value: '72' } });

    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled();
    });

    confirmSpy.mockRestore();
  });

  it('keeps basics inputs editable and persists values in state', async () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));

    await screen.findByText(/qual é o seu objetivo principal/i, {}, { timeout: 4000 });
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));

    await screen.findByRole('heading', { name: /seus dados corporais/i });

    const ageInput = container.querySelector('#age-input') as HTMLInputElement;
    const weightInput = container.querySelector('#weight-input') as HTMLInputElement;
    const heightInput = container.querySelector('#height-input') as HTMLInputElement;

    fireEvent.change(ageInput, { target: { value: '31' } });
    fireEvent.change(weightInput, { target: { value: '82.5' } });
    fireEvent.change(heightInput, { target: { value: '180' } });

    const state = useDietForgeStore.getState();
    expect(state.formData.age).toBe(31);
    expect(state.formData.weightKg).toBe(82.5);
    expect(state.formData.heightCm).toBe(180);
  });
});
