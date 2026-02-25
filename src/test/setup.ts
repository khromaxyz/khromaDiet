import '@testing-library/jest-dom';
import { createElement } from 'react';
import { vi } from 'vitest';

vi.mock('react-chartjs-2', () => ({
  Line: () => createElement('canvas', { 'data-testid': 'projection-chart' }),
}));

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('pointer: fine'),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}
