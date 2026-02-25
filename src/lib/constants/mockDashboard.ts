import type { DashboardViewModel } from '../types';

export const dashboardMock: DashboardViewModel = {
  profileName: 'Rodrigo Mendes · Mini Cut Protocol',
  profileMeta: '80kg · 177cm · 28 anos · 18% BF · LBM: 65.6kg · Masculino · Intermediário',
  profileTags: [
    { id: 'freq', label: '4× Semana', tone: 'orange' },
    { id: 'stress', label: 'Moderado', tone: 'violet' },
    { id: 'steps', label: '7.000 passos', tone: 'lime' },
    { id: 'diet', label: 'Tradicional', tone: 'cyan' },
  ],
  kpis: [
    {
      id: 'tdee',
      label: 'TDEE',
      value: '3.102',
      sub: 'kcal / dia',
      trend: '?',
      glow: 'lime',
      tone: 'default',
    },
    {
      id: 'goal',
      label: 'Meta Calórica',
      value: '2.637',
      sub: 'kcal / dia',
      trend: '??',
      glow: 'violet',
      tone: 'lime',
    },
    {
      id: 'deficit',
      label: 'Déficit',
      value: '-465',
      sub: 'kcal / dia',
      trend: '??',
      tone: 'red',
    },
    {
      id: 'weeks',
      label: 'Prazo estimado',
      value: '14',
      sub: 'semanas',
      trend: '???',
      tone: 'cyan',
    },
  ],
  receipt: [
    {
      id: 'bmr',
      label: 'BMR base',
      tag: 'Katch-McArdle · LBM: 65.6kg',
      value: '1.787 kcal',
    },
    {
      id: 'neat',
      label: '+ NEAT',
      tag: '×1.40 — moderadamente ativo',
      value: '+ 715 kcal',
      positive: true,
    },
    {
      id: 'eat-train',
      label: '+ EAT Treino',
      tag: '4× semana · 60min · força',
      value: '+ 229 kcal',
      positive: true,
    },
    {
      id: 'eat-cardio',
      label: '+ EAT Cardio',
      tag: '7.000 passos · NEAT extra',
      value: '+ 89 kcal',
      positive: true,
    },
    {
      id: 'tef',
      label: '+ TEF',
      tag: '10% do total calórico',
      value: '+ 282 kcal',
      positive: true,
    },
    {
      id: 'total',
      label: 'TDEE Final',
      tag: 'Gasto energético total',
      value: '3.102 kcal',
      total: true,
    },
    {
      id: 'meta',
      label: 'Meta (Mini Cut)',
      tag: '-465 kcal/dia · -15%',
      value: '2.637 kcal',
      meta: true,
    },
  ],
  macros: [
    {
      id: 'protein',
      label: 'Proteína',
      grams: 191,
      kcalLabel: '764 kcal · 29% das calorias',
      progress: 29,
      detailLeft: '2.39g / kg · Alta proteína',
      detailRight: '29%',
    },
    {
      id: 'carbs',
      label: 'Carboidrato',
      grams: 255,
      kcalLabel: '1.020 kcal · 39% das calorias',
      progress: 39,
      detailLeft: '3.19g / kg · Moderado',
      detailRight: '39%',
    },
    {
      id: 'fat',
      label: 'Gordura',
      grams: 85,
      kcalLabel: '765 kcal · 29% das calorias',
      progress: 29,
      detailLeft: '1.06g / kg · Hormonal',
      detailRight: '29%',
    },
  ],
  supplements: [
    {
      id: 'creatine',
      priority: 'Alta',
      icon: '??',
      name: 'Creatina Monohidratada',
      dose: '5g / dia',
      timing: '? Qualquer horário',
      glow: 'lime',
    },
    {
      id: 'whey',
      priority: 'Alta',
      icon: '??',
      name: 'Whey Protein',
      dose: '30–40g pós-treino',
      timing: '? Pós-treino imediato',
      glow: 'violet',
    },
    {
      id: 'd3k2',
      priority: 'Alta',
      icon: '??',
      name: 'Vitamina D3 + K2',
      dose: '5.000 UI D3 + 100mcg K2',
      timing: '? Manhã com refeição',
    },
    {
      id: 'omega3',
      priority: 'Média',
      icon: '??',
      name: 'Ômega-3 EPA/DHA',
      dose: '2–3g EPA+DHA / dia',
      timing: '? Com refeições',
    },
    {
      id: 'mag',
      priority: 'Média',
      icon: '??',
      name: 'Magnésio Glicinato',
      dose: '300–400mg / dia',
      timing: '? Noite, pré-sono',
    },
    {
      id: 'caffeine',
      priority: 'Baixa',
      icon: '?',
      name: 'Cafeína Anidra',
      dose: '200mg pré-treino',
      timing: '? 30min pré-treino',
    },
    {
      id: 'collagen',
      priority: 'Baixa',
      icon: '??',
      name: 'Colágeno Tipo II',
      dose: '10g em jejum',
      timing: '? Manhã em jejum',
    },
    {
      id: 'zma',
      priority: 'Média',
      icon: '??',
      name: 'Zinco + B6 (ZMA)',
      dose: '30mg Zn · 10mg B6',
      timing: '? Noite, longe de cálcio',
    },
    {
      id: 'ashwa',
      priority: 'Baixa',
      icon: '??',
      name: 'Ashwagandha KSM-66',
      dose: '600mg / dia',
      timing: '? Manhã ou noite',
    },
  ],
  meals: [
    {
      id: 'meal-1',
      number: 'Refeição 01',
      name: 'Café da Manhã',
      time: '07:00',
      kcal: 640,
      macros: { protein: '48g', carbs: '65g', fat: '18g' },
    },
    {
      id: 'meal-2',
      number: 'Refeição 02',
      name: 'Pré-Treino',
      time: '12:00',
      kcal: 620,
      macros: { protein: '42g', carbs: '80g', fat: '14g' },
      variant: 'pre',
      tag: { label: '??? Pré-Treino', tone: 'orange' },
    },
    {
      id: 'meal-3',
      number: 'Refeição 03',
      name: 'Pós-Treino',
      time: '18:00',
      kcal: 815,
      macros: { protein: '58g', carbs: '80g', fat: '22g' },
      variant: 'post',
      tag: { label: '? Pós-Treino', tone: 'lime' },
    },
    {
      id: 'meal-4',
      number: 'Refeição 04',
      name: 'Janta / Ceia',
      time: '21:00',
      kcal: 562,
      macros: { protein: '43g', carbs: '30g', fat: '31g' },
      tag: { label: '?? Low Carb', tone: 'violet' },
    },
  ],
};

export const beforeAfter = {
  now: {
    weight: '80 kg',
    bodyFat: '18%',
    leanMass: '65.6 kg',
  },
  week12: {
    weight: '73.4 kg',
    bodyFat: '12.8%',
    leanMass: '64.1 kg',
  },
};

export const refeedWeeks = [
  {
    title: 'Semana 4 · Refeed',
    value: '3.100 kcal',
    subtitle: 'TDEE completo · Carbs altos · 320g CHO',
  },
  {
    title: 'Semana 8 · Refeed',
    value: '3.050 kcal',
    subtitle: 'Ajustado ao novo TDEE · 310g CHO',
  },
  {
    title: 'Semana 12 · Refeed',
    value: '2.980 kcal',
    subtitle: 'Último refeed · Avaliação final · 295g CHO',
  },
];

export interface WhatIfPreviewItem {
  label: string;
  value: string;
  diff?: string;
  changed?: boolean;
}

export const whatIfPreview: WhatIfPreviewItem[] = [
  { label: 'Novo TDEE', value: '3.280 kcal', diff: '+178', changed: true },
  { label: 'Meta calórica', value: '2.680 kcal', diff: '+43', changed: true },
  { label: 'Déficit real', value: '−600 kcal', changed: true },
  { label: 'Perda / semana', value: '~0.58 kg' },
  { label: 'Peso final estimado', value: '70.7 kg', diff: '−2.7kg', changed: true },
  { label: 'BF% estimado', value: '11.2%', diff: '−1.6%', changed: true },
  { label: 'Prazo', value: '16 semanas' },
];
