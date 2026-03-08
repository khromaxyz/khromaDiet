import type { ScreenDefinition, ScreenId } from './types';

export const screenDefinitions: ScreenDefinition[] = [
  { id: 'hero', title: 'Inicio' },
  { id: 'form', title: 'Formulario' },
  { id: 'profile_create', title: 'Perfil' },
  { id: 'summary', title: 'Resumo' },
  { id: 'dashboard', title: 'Dashboard' },
];

export const orderedScreens: ScreenId[] = screenDefinitions.map((screen) => screen.id);
