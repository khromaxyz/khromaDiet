export type ScreenId = 'hero' | 'form' | 'profile_create' | 'summary' | 'dashboard';

export interface ScreenDefinition {
  id: ScreenId;
  title: string;
}
