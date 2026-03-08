import type {
  ActivityLevel,
  CardioIntensity,
  CardioModality,
  DeficitHistory,
  DeficitSeverity,
  Ethnicity,
  FormData,
  GoalMetricMode,
  GoalOption,
  HealthCondition,
  HormoneCompound,
  MenstrualPhase,
  OccupationType,
  ThermogenicOption,
  TrainingType,
} from '@/lib/types';

import { CARDIO_MODE_ICONS, GOAL_ICONS, THERMOGENIC_ICONS, TRAINING_ICONS } from './optionGlyphs';

export const goalOptions: GoalOption[] = [
  {
    id: 'hard_cut',
    icon: GOAL_ICONS.hard_cut,
    title: 'Hard Cut',
    description: 'Déficit agressivo para reduzir gordura rapidamente.',
    accent: 'red',
    badge: { label: '-25%', tone: 'red' },
  },
  {
    id: 'mini_cut',
    icon: GOAL_ICONS.mini_cut,
    title: 'Mini Cut',
    description: 'Déficit moderado com melhor preservação de massa magra.',
    accent: 'orange',
    badge: { label: '-15%', tone: 'orange' },
  },
  {
    id: 'recomp',
    icon: GOAL_ICONS.recomp,
    title: 'Recomposição',
    description: 'Ajuste leve para reduzir gordura e preservar desempenho.',
    accent: 'violet',
    badge: { label: '-8%', tone: 'cyan' },
  },
  {
    id: 'maintenance',
    icon: GOAL_ICONS.maintenance,
    title: 'Manutenção',
    description: 'Estratégia neutra para estabilizar peso e composição.',
    accent: 'blue',
    badge: { label: '0%', tone: 'lime' },
  },
  {
    id: 'lean_bulk',
    icon: GOAL_ICONS.lean_bulk,
    title: 'Lean Bulk',
    description: 'Superávit controlado para ganho gradual de massa.',
    accent: 'green',
    badge: { label: '+10%', tone: 'violet' },
  },
  {
    id: 'dirty_bulk',
    icon: GOAL_ICONS.dirty_bulk,
    title: 'Dirty Bulk',
    description: 'Superávit agressivo focado em ganho de peso rápido.',
    accent: 'lime',
    badge: { label: '+18%', tone: 'green' },
  },
];

export const sexOptions: GoalOption[] = [
  {
    id: 'male',
    icon: '♂️',
    title: 'Masculino',
    description: 'Parâmetros hormonais e limiares masculinos.',
  },
  {
    id: 'female',
    icon: '♀️',
    title: 'Feminino',
    description: 'Parâmetros hormonais e limiares femininos.',
  },
];

export const menstrualPhaseOptions: Array<{ id: MenstrualPhase; icon: string; title: string; description: string }> = [
  {
    id: 'follicular',
    icon: '🌱',
    title: 'Fase folicular',
    description: 'Primeiros 14 dias do ciclo.',
  },
  {
    id: 'luteal',
    icon: '🌙',
    title: 'Fase lútea',
    description: 'Últimos 14 dias do ciclo.',
  },
  {
    id: 'unknown',
    icon: '❔',
    title: 'Não sei / Não aplica',
    description: 'Fallback neutro para o cálculo.',
  },
];

export const activityOptions: Array<{ id: ActivityLevel; icon: string; title: string; description: string; badge: string }> = [
  { id: 'sedentary', icon: '🪑', title: 'Sedentário', description: 'Rotina majoritariamente sentada', badge: 'x1.20' },
  { id: 'light', icon: '🚶', title: 'Levemente ativo', description: 'Movimento leve no dia', badge: 'x1.375' },
  { id: 'moderate', icon: '🏃', title: 'Moderadamente ativo', description: 'Boa movimentação diária', badge: 'x1.55' },
  { id: 'very_active', icon: '🏋️', title: 'Muito ativo', description: 'Trabalho ativo ou alto NEAT', badge: 'x1.725' },
  { id: 'athlete', icon: '🥇', title: 'Atleta', description: 'Rotina intensa e alto volume', badge: 'x1.90' },
];

export const occupationTypeOptions: Array<{
  id: OccupationType;
  icon: string;
  title: string;
  description: string;
}> = [
  {
    id: 'sedentary',
    icon: '🪑',
    title: 'Sedentário',
    description: 'Escritório, sentado na maior parte do dia.',
  },
  {
    id: 'mixed',
    icon: '🚶',
    title: 'Misto',
    description: 'Em pé e caminhando parte do tempo.',
  },
  {
    id: 'active',
    icon: '🏗️',
    title: 'Ativo',
    description: 'Trabalho físico leve e movimento frequente.',
  },
  {
    id: 'very_active',
    icon: '⚒️',
    title: 'Muito ativo',
    description: 'Trabalho manual intenso e alta carga física.',
  },
];

export const deficitHistoryOptions: Array<{
  id: DeficitHistory;
  icon: string;
  title: string;
  description: string;
}> = [
  {
    id: 'none',
    icon: '🟰',
    title: 'Não estou em déficit',
    description: 'Comendo normalmente ou acima.',
  },
  {
    id: 'lt4weeks',
    icon: '🕒',
    title: 'Há menos de 4 semanas',
    description: 'Início recente de restrição calórica.',
  },
  {
    id: '1to3months',
    icon: '📆',
    title: 'Há 1 a 3 meses',
    description: 'Déficit intermediário em andamento.',
  },
  {
    id: 'gt3months',
    icon: '⏳',
    title: 'Há mais de 3 meses',
    description: 'Déficit prolongado com maior adaptação.',
  },
];

export const deficitSeverityOptions: Array<{
  id: DeficitSeverity;
  icon: string;
  title: string;
  description: string;
}> = [
  {
    id: 'light',
    icon: '🟢',
    title: 'Leve',
    description: 'Déficit pequeno, perda lenta.',
  },
  {
    id: 'moderate',
    icon: '🟠',
    title: 'Moderado',
    description: 'Déficit em torno de 15-20%.',
  },
  {
    id: 'aggressive',
    icon: '🔴',
    title: 'Agressivo',
    description: 'Déficit grande, perda rápida.',
  },
];

export const ethnicityOptions: Array<{ id: Ethnicity; title: string; icon: string }> = [
  { id: 'western', title: 'Ocidental/Europeia', icon: '🇪🇺' },
  { id: 'asian', title: 'Asiática/Oriental', icon: '🌏' },
  { id: 'african', title: 'Africana', icon: '🌍' },
  { id: 'latin', title: 'Latino-americana', icon: '🌎' },
  { id: 'unspecified', title: 'Prefiro não informar', icon: '🌐' },
];

export const trainingTypeOptions: Array<{ id: TrainingType; icon: string; title: string; description: string; badge: string }> = [
  {
    id: 'strength',
    icon: TRAINING_ICONS.strength,
    title: 'Força/Hipertrofia',
    description: 'Musculação tradicional',
    badge: 'MET 5.5',
  },
  {
    id: 'hiit',
    icon: TRAINING_ICONS.hiit,
    title: 'HIIT/Cross',
    description: 'Sessões de alta intensidade',
    badge: 'MET 8.5',
  },
  {
    id: 'endurance',
    icon: TRAINING_ICONS.endurance,
    title: 'Endurance',
    description: 'Cardiorrespiratório prolongado',
    badge: 'MET 7.0',
  },
];

export const cardioModalityOptions: Array<{ id: CardioModality; title: string }> = [
  { id: 'treadmill', title: 'Esteira' },
  { id: 'bike', title: 'Bike' },
  { id: 'elliptical', title: 'Elíptico' },
  { id: 'swimming', title: 'Natação' },
  { id: 'hiit', title: 'HIIT' },
];

export const cardioIntensityOptions: Array<{ id: CardioIntensity; title: string; badge: string }> = [
  { id: 'low', title: 'Baixa', badge: 'MET 4.0' },
  { id: 'moderate', title: 'Moderada', badge: 'MET 6.0' },
  { id: 'high', title: 'Alta', badge: 'MET 8.0' },
];

export const bodyFatPhotoPresets: Record<'male' | 'female', Array<{ id: string; label: string; value: number }>> = {
  male: [
    { id: 'm10', label: 'Atlético seco · 10%', value: 10 },
    { id: 'm14', label: 'Atlético padrão · 14%', value: 14 },
    { id: 'm18', label: 'Fitness casual · 18%', value: 18 },
    { id: 'm22', label: 'Acima da média · 22%', value: 22 },
    { id: 'm26', label: 'Adiposidade alta · 26%', value: 26 },
  ],
  female: [
    { id: 'f18', label: 'Atlética · 18%', value: 18 },
    { id: 'f22', label: 'Fitness · 22%', value: 22 },
    { id: 'f26', label: 'Média · 26%', value: 26 },
    { id: 'f30', label: 'Acima da média · 30%', value: 30 },
    { id: 'f34', label: 'Adiposidade alta · 34%', value: 34 },
  ],
};

export const hormoneOptions: Array<{ id: HormoneCompound; title: string; defaultDose: number }> = [
  { id: 'testosterone', title: 'Testosterona', defaultDose: 250 },
  { id: 'oxandrolone', title: 'Oxandrolona', defaultDose: 140 },
  { id: 'deca', title: 'Deca', defaultDose: 200 },
  { id: 'tren', title: 'Trembolona', defaultDose: 200 },
  { id: 'boldenone', title: 'Boldenona', defaultDose: 300 },
  { id: 'gh', title: 'GH', defaultDose: 20 },
  { id: 'semaglutide', title: 'Semaglutida', defaultDose: 2 },
  { id: 'other', title: 'Outro', defaultDose: 100 },
];

export const healthConditionOptions: Array<{ id: HealthCondition; title: string; description: string }> = [
  {
    id: 'insulin_resistance',
    title: 'Resistência à insulina',
    description: 'Ajusta distribuição de carboidratos.',
  },
  {
    id: 'hypothyroidism',
    title: 'Hipotireoidismo',
    description: 'Reduz taxa metabólica estimada.',
  },
  {
    id: 'pcos',
    title: 'SOP/PCOS',
    description: 'Condição hormonal com ajuste de sensibilidade.',
  },
  {
    id: 'inflammatory_condition',
    title: 'Condição inflamatória',
    description: 'Modula gasto e recuperação.',
  },
  {
    id: 'eating_disorder_history',
    title: 'Histórico de transtorno alimentar',
    description: 'Restringe déficit máximo por segurança.',
  },
  {
    id: 'none',
    title: 'Nenhuma',
    description: 'Sem condições adicionais.',
  },
];

export const thermogenicOptions: Array<{ id: ThermogenicOption; icon: string; title: string; description: string }> = [
  { id: 'none', icon: THERMOGENIC_ICONS.none, title: 'Nenhum', description: 'Sem termogênicos ativos.' },
  { id: 'caffeine', icon: THERMOGENIC_ICONS.caffeine, title: 'Cafeína', description: 'Uso habitual >300mg/dia.' },
  { id: 'eca', icon: THERMOGENIC_ICONS.eca, title: 'ECA stack', description: 'Protocolo estimulante avançado.' },
];

export const goalModeOptions: Array<{ id: GoalMetricMode; title: string; description: string }> = [
  { id: 'weight', title: 'Peso alvo', description: 'Defina um peso final desejado.' },
  { id: 'bf', title: 'BF% alvo', description: 'Defina um percentual de gordura.' },
  { id: 'fat_kg', title: 'Kg de gordura', description: 'Defina gordura total a perder/ganhar.' },
];

export const cardioModeOptions: Array<{ id: FormData['cardioMode']; icon: string; title: string; description: string }> = [
  { id: 'steps', icon: CARDIO_MODE_ICONS.steps, title: 'Passos/dia', description: 'Baseado em passos totais diários.' },
  {
    id: 'structured',
    icon: CARDIO_MODE_ICONS.structured,
    title: 'Cardio estruturado',
    description: 'Minutos e intensidade definidos.',
  },
  { id: 'both', icon: CARDIO_MODE_ICONS.both, title: 'Ambos', description: 'Com deduplicação automática de passos.' },
];

export const initialFormData: FormData = {
  goal: 'mini_cut',
  sex: 'male',
  age: 28,
  weightKg: 80,
  heightCm: 177,
  bodyFatMode: 'declared',
  bodyFatDeclaredPct: null,
  bodyFatPhotoPresetPct: null,
  navyNeckCm: null,
  navyWaistCm: null,
  navyHipCm: null,
  bfDecision: null,
  activityLevel: 'moderate',
  trainingSessions: 4,
  trainingType: 'strength',
  trainingDurationMin: 60,
  cardioMode: 'steps',
  stepsPerDay: null,
  cardioMinutesPerDay: null,
  cardioModality: 'treadmill',
  cardioIntensity: 'moderate',
  hormonesEnabled: false,
  hormones: [],
  cyclePhase: 'middle',
  occupationType: 'sedentary',
  deficitHistory: 'none',
  deficitSeverity: 'light',
  menstrualPhase: 'unknown',
  ethnicity: 'unspecified',
  calibratedTdeeKcal: null,
  healthConditions: ['none'],
  thermogenic: 'none',
  mealsPerDay: 4,
  fastedTraining: false,
  plantBasedStrict: false,
  goalMode: 'bf',
  targetWeightKg: null,
  targetBodyFatPct: null,
  targetFatKg: null,
  targetWeeks: null,
};

export const sliderTicks = {
  trainingFrequency: ['0', '1', '2', '3', '4', '5', '6', '7'],
  trainingDuration: ['20', '45', '60', '90', '120'],
  targetWeeks: ['1', '8', '16', '24', '32', '40', '52'],
  meals: ['2', '3', '4', '5', '6+'],
  cardioMinutes: ['0', '20', '40', '60', '90'],
};
