import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type StatSize = 'sm' | 'md' | 'lg';
export type StatColor = 'default' | 'emerald' | 'gold' | 'blue';

export interface StatTrend {
  direction: 'up' | 'down';
  label: ReactNode;
}

const SIZE_CLASS_MAP: Record<StatSize, string> = {
  sm: 'text-[28px] tracking-[-1px]',
  md: 'text-[40px] tracking-[-2px]',
  lg: 'text-[56px] tracking-[-3px]',
};

const COLOR_STYLE_MAP: Record<StatColor, CSSProperties> = {
  default: {
    color: 'var(--text-primary)',
  },
  emerald: {
    color: 'var(--text-accent)',
    textShadow: 'var(--text-glow-emerald-stat)',
  },
  gold: {
    color: 'var(--fat-color)',
    textShadow: 'var(--text-glow-gold-stat)',
  },
  blue: {
    color: 'var(--carb-color)',
    textShadow: 'var(--text-glow-blue-stat)',
  },
};

export interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: ReactNode;
  unit?: ReactNode;
  sublabel?: ReactNode;
  size?: StatSize;
  color?: StatColor;
  trend?: StatTrend;
  align?: 'start' | 'center';
}

export const StatBlock = ({
  value,
  label,
  unit,
  sublabel,
  size = 'md',
  color = 'default',
  trend,
  align = 'start',
  className,
  style,
  ...props
}: StatBlockProps) => {
  const centered = align === 'center';
  const blockStyle = {
    transitionDuration: 'var(--duration-normal)',
    transitionTimingFunction: 'var(--ease-out-expo)',
    ...style,
  } as CSSProperties;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border-primary)] bg-[var(--surface-1)] px-[var(--space-6)] py-[var(--space-5)] shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] hover:-translate-x-px hover:-translate-y-px hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card-hover)]',
        'before:pointer-events-none before:absolute before:left-3 before:right-3 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
      style={blockStyle}
      {...props}
    >
      <div
        className={cn(
          'relative z-10 flex w-full flex-col gap-1.5',
          centered ? 'items-center' : 'items-start',
        )}
      >
        <div
          className={cn(
            'flex flex-wrap gap-2',
            centered ? 'items-center justify-center' : 'items-end justify-start',
          )}
        >
          <div className="flex items-end gap-1">
            <span
              className={cn('font-display font-bold tabular-nums leading-none', SIZE_CLASS_MAP[size])}
              style={COLOR_STYLE_MAP[color]}
            >
              {value}
            </span>

            {unit ? (
              <span className="mb-[0.24em] text-[0.45em] font-normal tracking-normal text-[var(--text-muted)]">
                {unit}
              </span>
            ) : null}
          </div>

          {trend ? (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 font-mono text-[11px] font-semibold',
                trend.direction === 'up'
                  ? 'bg-[var(--emerald-glow-subtle)] text-[var(--emerald-400)]'
                  : 'bg-[var(--red-glow)] text-[var(--red-400)]',
              )}
            >
              <span aria-hidden="true">{trend.direction === 'up' ? '↑' : '↓'}</span>
              {trend.label}
            </span>
          ) : null}
        </div>

        <div className="font-mono text-[10px] font-semibold uppercase tracking-[2.5px] text-[var(--text-muted)]">{label}</div>

        {sublabel ? <div className="text-xs text-[var(--text-ghost)]">{sublabel}</div> : null}
      </div>
    </div>
  );
};
