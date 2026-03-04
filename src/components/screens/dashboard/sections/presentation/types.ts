export type DashboardSectionId =
  | 'welcome'
  | 'tdee'
  | 'goal'
  | 'macros'
  | 'projection'
  | 'meals'
  | 'supplements'
  | 'whatif'
  | 'final';

export interface DashboardSectionItem {
  id: DashboardSectionId;
  label: string;
  headingId: string;
}
