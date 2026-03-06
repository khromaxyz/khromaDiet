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
  badge: 'Ciência + Precisão + Resultado',
  primaryCta: 'Calcular minha dieta',
  secondaryCta: 'Ver exemplo',
  titleLine1: 'Sua dieta',
  titleLine2: 'engenheirada.',
  subtitle:
    'Cálculo real de TDEE com cardio deduplicado, modificadores e projeção semanal. Em poucos minutos, você sai com um protocolo funcional.',
  panel: {
    chip: 'DF',
    brand: 'DietForge',
    brandSub: 'Engine de protocolo nutricional',
    liveBadge: 'Live',
    contextTag: 'Preview do motor',
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
        tone: 'blue',
      },
      {
        id: 'projection',
        label: 'Projeção semanal',
        value: 'Saída operacional pronta para execução',
        tone: 'gold',
      },
    ] satisfies HeroSignalCopy[],
  },
  stats: [
    { id: 'accuracy', value: 98.7, label: 'Precisão', unit: '%', decimals: 1, color: 'emerald' },
    { id: 'protocols', value: 12400, label: 'Protocolos', suffix: '+', color: 'default' },
    { id: 'variables', value: 14, label: 'Variáveis', color: 'blue' },
    { id: 'time', value: 2, label: 'Plano em', unit: 'min', color: 'gold' },
  ] satisfies HeroStatCopy[],
};

export const formCopy = {
  logo: 'DIETFORGE',
  totalSteps: 12,
};

export const summaryCopy = {
  label: 'Análise concluída · Engine DietForge',
  title: 'Seu plano funcional foi calculado.',
  subtitle: 'Esses números já refletem o motor real e as suas respostas.',
};
