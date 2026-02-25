export interface KpiItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  trend: string;
  glow?: 'lime' | 'violet';
  tone?: 'default' | 'lime' | 'red' | 'cyan';
}

export interface ReceiptRow {
  id: string;
  label: string;
  tag: string;
  value: string;
  positive?: boolean;
  total?: boolean;
  meta?: boolean;
}

export interface MacroItem {
  id: 'protein' | 'carbs' | 'fat';
  label: string;
  grams: number;
  kcalLabel: string;
  progress: number;
  detailLeft: string;
  detailRight: string;
}

export interface SupplementItem {
  id: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  icon: string;
  name: string;
  dose: string;
  timing: string;
  glow?: 'lime' | 'violet';
}

export interface MealItem {
  id: string;
  number: string;
  name: string;
  time: string;
  kcal: number;
  macros: {
    protein: string;
    carbs: string;
    fat: string;
  };
  tag?: {
    label: string;
    tone: 'orange' | 'lime' | 'violet';
  };
  variant?: 'pre' | 'post';
}

export interface DashboardViewModel {
  profileName: string;
  profileMeta: string;
  profileTags: Array<{
    id: string;
    label: string;
    tone: 'orange' | 'violet' | 'lime' | 'cyan';
  }>;
  kpis: KpiItem[];
  receipt: ReceiptRow[];
  macros: MacroItem[];
  supplements: SupplementItem[];
  meals: MealItem[];
}

