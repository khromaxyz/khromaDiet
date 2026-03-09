export type HeroStatTone = 'default' | 'emerald' | 'gold' | 'blue';

export interface HeroStatCopy {
  id: string;
  value: number;
  label: string;
  unit?: string;
  suffix?: string;
  decimals?: number;
  color: HeroStatTone;
}

export type HeroSignalTone = 'neutral' | 'emerald' | 'gold' | 'blue';

export interface HeroSignalCopy {
  id: string;
  label: string;
  value: string;
  tone: HeroSignalTone;
}

export const heroCopy = {
  badge: 'Ciencia + Precisao + Resultado',
  primaryCta: 'Calcular minha dieta',
  secondaryCta: 'Ver exemplo',
  titleLine1: 'Sua dieta',
  titleLine2: 'engenheirada.',
  subtitle:
    'Calculo real de TDEE com cardio deduplicado, modificadores e projecao semanal. Em poucos minutos, voce sai com um protocolo funcional.',
  panel: {
    chip: 'KD',
    brand: 'KhromaDiet',
    brandSub: 'Software nutricional com precisao operacional',
    liveBadge: 'Live',
    contextTag: 'Winner system',
    signals: [
      {
        id: 'tdee',
        label: 'TDEE real',
        value: 'BMR + NEAT + treino + TEF',
        tone: 'emerald',
      },
      {
        id: 'dedupe',
        label: 'Cardio deduplicado',
        value: 'Passos e cardio sem dupla contagem',
        tone: 'neutral',
      },
      {
        id: 'projection',
        label: 'Projecao semanal',
        value: 'Saida operacional pronta para execucao',
        tone: 'gold',
      },
    ] satisfies HeroSignalCopy[],
  },
  stats: [
    { id: 'accuracy', value: 98.7, label: 'Precisao', unit: '%', decimals: 1, color: 'emerald' },
    { id: 'protocols', value: 12400, label: 'Protocolos', suffix: '+', color: 'default' },
    { id: 'variables', value: 14, label: 'Variaveis', color: 'blue' },
    { id: 'time', value: 2, label: 'Plano em', unit: 'min', color: 'gold' },
  ] satisfies HeroStatCopy[],
};
