import type { GoalType } from '../types/form';

export const PROFILE_STORAGE_KEY = 'dietforge_profiles';
export const ACTIVE_PROFILE_STORAGE_KEY = 'dietforge_active_profile_id';
export const DRAFT_STORAGE_KEY = 'dietforge_draft';
export const PROFILE_MAX_COUNT = 5;

export interface AvatarStyle {
  id: number;
  role: string;
  primary: string;
  secondary: string;
}

export const AVATAR_STYLES: AvatarStyle[] = [
  { id: 0, role: 'Guerreiro', primary: '#DC2626', secondary: '#7F1D1D' },
  { id: 1, role: 'Atleta', primary: '#2563EB', secondary: '#1E3A8A' },
  { id: 2, role: 'Cientista', primary: '#7C3AED', secondary: '#4C1D95' },
  { id: 3, role: 'Explorador', primary: '#D97706', secondary: '#78350F' },
  { id: 4, role: 'Ninja', primary: '#111827', secondary: '#374151' },
  { id: 5, role: 'Astronauta', primary: '#0891B2', secondary: '#164E63' },
  { id: 6, role: 'Arquiteto', primary: '#059669', secondary: '#064E3B' },
  { id: 7, role: 'Músico', primary: '#DB2777', secondary: '#831843' },
  { id: 8, role: 'Montanhista', primary: '#65A30D', secondary: '#365314' },
  { id: 9, role: 'Nadador', primary: '#0284C7', secondary: '#0C4A6E' },
  { id: 10, role: 'Ciclista', primary: '#EA580C', secondary: '#7C2D12' },
  { id: 11, role: 'Lutador', primary: '#9333EA', secondary: '#581C87' },
];

export const GOAL_TONE_BY_OBJECTIVE: Record<GoalType, 'cut' | 'bulk' | 'maintenance'> = {
  hard_cut: 'cut',
  mini_cut: 'cut',
  recomp: 'cut',
  maintenance: 'maintenance',
  lean_bulk: 'bulk',
  dirty_bulk: 'bulk',
};
