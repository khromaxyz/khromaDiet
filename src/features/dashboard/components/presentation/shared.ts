import type { Transition, Variants } from 'framer-motion';

export const DASHBOARD_EASE = [0.16, 1, 0.3, 1] as const;

export const dashboardBarTransition: Transition = {
  duration: 0.82,
  ease: DASHBOARD_EASE,
};

export const dashboardContainerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const dashboardStaggerGroupVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

export const dashboardItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: DASHBOARD_EASE,
    },
  },
};

export const dashboardMicroItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: DASHBOARD_EASE,
    },
  },
};

export const dashboardPanelVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      ease: DASHBOARD_EASE,
    },
  },
};

export const CARDLESS_STAT_BLOCK_CLASSNAME =
  'border-transparent bg-transparent px-0 py-0 shadow-none before:hidden hover:translate-y-0 hover:border-transparent hover:shadow-none';

export const formatKcal = (value: number): string => Math.round(value).toLocaleString('pt-BR');

export const formatKg = (value: number): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

export const formatPct = (value: number, digits = 0): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const formatShortDate = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};
