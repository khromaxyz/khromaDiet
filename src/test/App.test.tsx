import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';
import { formSteps } from '../lib/constants/steps';

describe('DietForge app flow', () => {
  it('navigates hero -> form -> summary -> dashboard', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));
    await screen.findByText(/qual é o seu objetivo principal/i);

    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/qual é o seu nível de atividade/i);

    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/suas medidas/i);

    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/seu perfil de atleta/i);

    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/abordagem alimentar você prefere/i);

    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/qual é o seu peso alvo/i);

    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/confirme seus dados/i);

    fireEvent.click(screen.getByRole('button', { name: /gerar meu plano/i }));
    await screen.findByText(/seu tdee foi calculado/i);

    fireEvent.click(screen.getByRole('button', { name: /ver análise completa/i }));
    await screen.findByText(/visão geral/i);
  });

  it('supports back navigation in wizard', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /calcular minha dieta/i }));
    fireEvent.click(screen.getByRole('button', { name: /^próximo$/i }));
    await screen.findByText(/qual é o seu nível de atividade/i);

    fireEvent.click(screen.getByRole('button', { name: /^voltar$/i }));
    await screen.findByText(/qual é o seu objetivo principal/i);
  });

  it('renders chart canvas in dashboard', async () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /ver exemplo/i }));
    await screen.findByText(/projeção de 12 semanas/i);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('keeps step registry order stable', () => {
    expect(formSteps.map((step) => step.id)).toEqual([
      'goal',
      'activity',
      'measures',
      'profile',
      'nutrition',
      'target',
      'review',
    ]);
  });
});
