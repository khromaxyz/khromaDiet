import type { DietFormState, GoalOption } from '../types';

export const stressLabels = ['Baixo', 'Leve', 'Moderado', 'Alto', 'Máximo'] as const;

export const primaryGoals: GoalOption[] = [
  {
    id: 'hard-cut',
    icon: '??',
    title: 'Hard Cut',
    description: 'Déficit agressivo. Perda rápida de gordura. Ideal para quem tem pressa.',
    badge: { label: '-750 kcal/dia', tone: 'red' },
  },
  {
    id: 'mini-cut',
    icon: '??',
    title: 'Mini Cut',
    description: 'Déficit moderado. Preserva músculo. Resultado sustentável e seguro.',
    badge: { label: '-465 kcal/dia', tone: 'orange' },
  },
  {
    id: 'maintenance',
    icon: '??',
    title: 'Manutenção',
    description: 'Manter peso e composição corporal atuais em equilíbrio calórico.',
    badge: { label: '0 kcal/dia', tone: 'lime' },
  },
  {
    id: 'lean-bulk',
    icon: '??',
    title: 'Lean Bulk',
    description: 'Superávit controlado. Ganho de massa com mínimo de gordura.',
    badge: { label: '+250 kcal/dia', tone: 'cyan' },
  },
  {
    id: 'bulk',
    icon: '??',
    title: 'Bulk',
    description: 'Superávit maior. Foco em força e volume muscular acelerado.',
    badge: { label: '+500 kcal/dia', tone: 'violet' },
  },
  {
    id: 'competition',
    icon: '??',
    title: 'Competição',
    description: 'Protocolo avançado de contest prep. Requer acompanhamento profissional.',
    badge: { label: 'Personalizado', tone: 'red' },
  },
];

export const sexOptions: GoalOption[] = [
  {
    id: 'male',
    icon: '??',
    title: 'Masculino',
    description: 'BMR base mais elevado. Maior limiar anabólico.',
  },
  {
    id: 'female',
    icon: '??',
    title: 'Feminino',
    description: 'Ajuste hormonal. Variação cíclica considerada.',
  },
];

export const experienceOptions: GoalOption[] = [
  {
    id: 'beginner',
    icon: '??',
    title: 'Iniciante',
    description: '0–1 ano',
    badge: { label: 'Novato', tone: 'green' },
  },
  {
    id: 'intermediate',
    icon: '??',
    title: 'Intermediário',
    description: '1–3 anos',
    badge: { label: 'Intermediário', tone: 'orange' },
  },
  {
    id: 'advanced',
    icon: '??',
    title: 'Avançado',
    description: '3–7 anos',
    badge: { label: 'Avançado', tone: 'violet' },
  },
  {
    id: 'elite',
    icon: '??',
    title: 'Elite',
    description: '7+ anos',
    badge: { label: 'Elite', tone: 'red' },
  },
];

export const nutritionOptions: GoalOption[] = [
  {
    id: 'traditional',
    icon: '???',
    title: 'Tradicional',
    description: '3–5 refeições distribuídas ao longo do dia. Janela de alimentação ampla.',
    badge: { label: 'Mais fácil', tone: 'lime' },
  },
  {
    id: 'if168',
    icon: '?',
    title: 'Jejum 16/8',
    description: 'Janela de 8h. Refeições concentradas. Alta aderência para muitos perfis.',
    badge: { label: 'IF', tone: 'violet' },
  },
  {
    id: 'lowcarb',
    icon: '??',
    title: 'Low Carb',
    description: 'Carboidratos até 30% das calorias. Maior proporção de gordura e proteína.',
    badge: { label: 'LC', tone: 'orange' },
  },
  {
    id: 'plant',
    icon: '??',
    title: 'Plant-Based',
    description: 'Proteínas vegetais. Ajuste de leucina e aminoácidos essenciais incluído.',
    badge: { label: 'Vegano', tone: 'green' },
  },
  {
    id: 'cycling',
    icon: '??',
    title: 'Carb Cycling',
    description: 'Dias de treino com mais carbs. Dias de descanso com mais gordura.',
    badge: { label: 'Avançado', tone: 'cyan' },
  },
  {
    id: 'iifym',
    icon: '??',
    title: 'IIFYM',
    description: 'If it fits your macros. Máxima flexibilidade com controle calórico rigoroso.',
    badge: { label: 'Flexível', tone: 'violet' },
  },
];

export const initialFormState: DietFormState = {
  goalId: 'mini-cut',
  trainingFrequency: { value: 4, min: 0, max: 7, step: 1 },
  sessionDuration: { value: 60, min: 20, max: 120, step: 1 },
  dailySteps: { value: 7000, min: 1000, max: 20000, step: 500 },
  stressLevel: { value: 3, min: 1, max: 5, step: 1 },
  age: 28,
  currentWeight: 80,
  height: 177,
  bodyFat: 18,
  biologicalSex: 'male',
  liftingExperience: 'intermediate',
  nutritionApproach: 'traditional',
  targetWeight: 73,
  targetBodyFat: 12,
  targetWeeks: 14,
};

export const sliderTicks = {
  frequency: ['0×', '1×', '2×', '3×', '4×', '5×', '6×', '7×'],
  duration: ['20', '45', '60', '90', '120'],
  steps: ['1k', '5k', '10k', '15k', '20k'],
  stress: ['Baixo', 'Leve', 'Mod.', 'Alto', 'Máx.'],
};

export const whatIfSliderDefaults = [
  { id: 'deficit', label: 'Déficit calórico ajustado', value: '-600 kcal', percent: 60 },
  { id: 'freq', label: 'Frequência de treino', value: '5× / semana', percent: 71 },
  { id: 'steps', label: 'Passos diários', value: '10.000', percent: 47 },
  { id: 'weeks', label: 'Semanas de protocolo', value: '16 semanas', percent: 56 },
] as const;

