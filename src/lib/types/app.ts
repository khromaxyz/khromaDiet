export type ScreenId = 'hero' | 'form' | 'summary' | 'dashboard';

export interface ScreenDefinition {
  id: ScreenId;
  title: string;
}

