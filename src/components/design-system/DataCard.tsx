import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export type DataCardGlow = 'none' | 'emerald' | 'gold' | 'blue';

type CardStyle = CSSProperties & {
  '--df-card-border': string;
  '--df-card-hover-border': string;
  '--df-card-hover-shadow': string;
  '--df-card-glow-overlay': string;
};

const CARD_GLOW_MAP: Record<
  DataCardGlow,
  {
    border: string;
    hoverBorder: string;
    hoverShadow: string;
    overlay: string;
  }
> = {
  none: {
    border: 'var(--border-default)',
    hoverBorder: 'var(--border-strong)',
    hoverShadow: 'var(--shadow-card-hover)',
    overlay: 'transparent',
  },
  emerald: {
    border: 'var(--border-emerald)',
    hoverBorder: 'var(--border-accent)',
    hoverShadow: 'var(--shadow-card-hover), var(--shadow-emerald)',
    overlay: 'linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.02) 100%)',
  },
  gold: {
    border: 'var(--border-primary)',
    hoverBorder: 'var(--border-strong)',
    hoverShadow: 'var(--shadow-card-hover), var(--shadow-gold)',
    overlay: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.01) 100%)',
  },
  blue: {
    border: 'var(--border-primary)',
    hoverBorder: 'var(--border-strong)',
    hoverShadow: 'var(--shadow-card-hover), var(--shadow-blue)',
    overlay: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
  },
};

export interface DataCardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glow?: DataCardGlow;
}

export const DataCard = ({
  children,
  className,
  hoverable = false,
  glow = 'none',
  style,
  ...props
}: DataCardProps) => {
  const palette = CARD_GLOW_MAP[glow];

  const cardStyle = {
    '--df-card-border': palette.border,
    '--df-card-hover-border': palette.hoverBorder,
    '--df-card-hover-shadow': palette.hoverShadow,
    '--df-card-glow-overlay': palette.overlay,
    transitionDuration: 'var(--duration-normal)',
    transitionTimingFunction: 'var(--ease-out-expo)',
    ...style,
  } as CardStyle;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--surface-1)] p-[var(--space-6)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition-[transform,border-color,box-shadow,background-color]',
        'border-[var(--df-card-border)] before:pointer-events-none before:absolute before:left-4 before:right-4 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]',
        glow !== 'none' &&
          'after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-[inherit] after:bg-[var(--df-card-glow-overlay)] after:content-[""]',
        hoverable &&
          'hover:-translate-x-px hover:-translate-y-px hover:border-[var(--df-card-hover-border)] hover:shadow-[var(--df-card-hover-shadow)]',
        className,
      )}
      style={cardStyle}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
