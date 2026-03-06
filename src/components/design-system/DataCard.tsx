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
    hoverBorder: 'rgba(16, 185, 129, 0.35)',
    hoverShadow: 'var(--shadow-inner-highlight), var(--shadow-emerald), var(--shadow-lg)',
    overlay: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, transparent 50%)',
  },
  gold: {
    border: 'var(--border-gold)',
    hoverBorder: 'rgba(245, 158, 11, 0.35)',
    hoverShadow: 'var(--shadow-inner-highlight), var(--shadow-gold), var(--shadow-lg)',
    overlay: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, transparent 50%)',
  },
  blue: {
    border: 'var(--border-blue)',
    hoverBorder: 'rgba(59, 130, 246, 0.35)',
    hoverShadow: 'var(--shadow-inner-highlight), var(--shadow-blue), var(--shadow-lg)',
    overlay: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
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
        'group relative overflow-hidden rounded-[var(--radius-xl)] border bg-[linear-gradient(165deg,var(--bg-surface)_0%,var(--bg-elevated)_100%)] p-[var(--space-6)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition-[transform,border-color,box-shadow]',
        'border-[var(--df-card-border)] before:pointer-events-none before:absolute before:left-4 before:right-4 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]',
        glow !== 'none' &&
          'after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-[inherit] after:bg-[var(--df-card-glow-overlay)] after:content-[""]',
        hoverable &&
          'hover:-translate-y-1.5 hover:border-[var(--df-card-hover-border)] hover:shadow-[var(--df-card-hover-shadow)]',
        className,
      )}
      style={cardStyle}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
