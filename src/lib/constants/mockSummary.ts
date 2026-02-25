export const summaryMetrics = [
  { id: 'tdee', label: 'TDEE Total', value: 3102, unit: 'kcal / dia', tone: 'tdee' as const },
  {
    id: 'goal',
    label: 'Meta · Mini Cut',
    value: 2637,
    unit: 'kcal / dia',
    tone: 'meta' as const,
  },
  {
    id: 'deficit',
    label: 'Déficit Diário',
    value: 465,
    unit: 'kcal / dia',
    tone: 'deficit' as const,
    prefix: '-',
  },
];

export const summaryMiniStats = [
  { id: 'bmr', label: 'BMR: 1.787 kcal', tone: 'violet' as const },
  { id: 'lbm', label: 'LBM: 65.6 kg', tone: 'cyan' as const },
  { id: 'tef', label: 'TEF: 282 kcal', tone: 'lime' as const },
  { id: 'neat', label: 'NEAT: ×1.40', tone: 'orange' as const },
];

