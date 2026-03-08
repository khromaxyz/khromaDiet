import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '@/App';
import { DesignSystemPreview } from '@/components/design-system/DesignSystemPreview';

vi.mock('@nivo/line', async () => {
  const actual = await vi.importActual<typeof import('@nivo/line')>('@nivo/line');

  return {
    ...actual,
    ResponsiveLine: () => createElement('svg', { 'data-testid': 'nivo-line' }),
  };
});

describe('design system preview', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('renders preview primitives and chart container', () => {
    render(<DesignSystemPreview />);

    expect(screen.getByTestId('design-system-preview')).toBeInTheDocument();
    expect(screen.getByText('Obsidian + Emerald')).toBeInTheDocument();
    expect(screen.getByText('Header variants')).toBeInTheDocument();
    expect(screen.getByTestId('nivo-line')).toBeInTheDocument();
  });

  it('renders preview branch from app query param', () => {
    window.history.replaceState({}, '', '/?preview=design-system');

    render(<App />);

    expect(screen.getByTestId('design-system-preview')).toBeInTheDocument();
    expect(screen.queryByText(/Calculadora de Dieta Premium/i)).not.toBeInTheDocument();
  });

  it('keeps normal app flow when preview query param is absent', () => {
    render(<App />);

    expect(screen.getByText(/Sua dieta/i)).toBeInTheDocument();
    expect(screen.queryByTestId('design-system-preview')).not.toBeInTheDocument();
  });
});
