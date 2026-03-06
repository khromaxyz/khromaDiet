import type { ReactNode } from 'react';

import type { PartialTheme } from '@nivo/theming';

import { cn } from '@/lib/utils';

import { DataCard, type DataCardGlow } from './DataCard';

export interface ChartLegendItem {
  label: string;
  tone?: 'emerald' | 'gold' | 'blue' | 'muted';
  style?: 'solid' | 'dashed' | 'soft';
}

export interface ChartContainerProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  legend?: ChartLegendItem[];
  height?: number;
  className?: string;
  glow?: DataCardGlow;
}

export const NIVO_COLOR_PALETTE = [
  'var(--emerald-500)',
  'var(--gold-500)',
  'var(--blue-500)',
  'var(--text-secondary)',
  'var(--text-muted)',
] as const;

const baseTextStyle = {
  fontFamily: 'var(--font-body)',
  outlineWidth: 0,
  outlineColor: 'transparent',
  outlineOpacity: 1,
};

export const NIVO_THEME: PartialTheme = {
  background: 'transparent',
  text: {
    ...baseTextStyle,
    fontSize: 12,
    fill: 'var(--text-tertiary)',
  },
  axis: {
    domain: {
      line: {
        stroke: 'var(--border-subtle)',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        ...baseTextStyle,
        fontSize: 12,
        fill: 'var(--text-tertiary)',
      },
    },
    ticks: {
      line: {
        stroke: 'var(--border-subtle)',
        strokeWidth: 1,
      },
      text: {
        ...baseTextStyle,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fill: 'var(--text-ghost)',
      },
    },
  },
  grid: {
    line: {
      stroke: 'var(--border-subtle)',
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      ...baseTextStyle,
      fontSize: 12,
      fill: 'var(--text-tertiary)',
    },
  },
  tooltip: {
    container: {
      background: 'var(--bg-overlay)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      fontSize: '13px',
      padding: '10px 14px',
    },
    basic: {
      whiteSpace: 'nowrap',
    },
    chip: {
      borderRadius: '9999px',
    },
    table: {
      borderCollapse: 'collapse',
    },
    tableCell: {
      padding: '2px 0',
    },
    tableCellValue: {
      fontWeight: 600,
      paddingLeft: '10px',
    },
  },
  crosshair: {
    line: {
      stroke: 'var(--emerald-500)',
      strokeOpacity: 0.4,
      strokeWidth: 1,
    },
  },
};

const TONE_CLASS_MAP: Record<NonNullable<ChartLegendItem['tone']>, string> = {
  emerald: 'border-transparent bg-[var(--emerald-400)]',
  gold: 'border-transparent bg-[var(--gold-400)]',
  blue: 'border-transparent bg-[var(--blue-400)]',
  muted: 'border-[var(--text-muted)] bg-transparent',
};

export const ChartContainer = ({
  children,
  title,
  subtitle,
  legend,
  height = 320,
  className,
  glow = 'none',
}: ChartContainerProps) => {
  return (
    <DataCard glow={glow} className={cn('overflow-hidden p-0', className)}>
      {title || subtitle || (legend?.length ?? 0) > 0 ? (
        <div className="px-[var(--space-6)] pt-[var(--space-6)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              {title ? (
                <div className="text-[15px] font-semibold text-[var(--text-primary)]">{title}</div>
              ) : null}
              {subtitle ? (
                <div className="mt-0.5 text-xs text-[var(--text-muted)]">{subtitle}</div>
              ) : null}
            </div>

            {legend?.length ? (
              <div className="flex flex-wrap gap-4">
                {legend.map((item) => {
                  const tone = item.tone ?? 'muted';
                  const style = item.style ?? 'solid';

                  return (
                    <div
                      key={`${item.label}-${tone}-${style}`}
                      className="flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)]"
                    >
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full',
                          TONE_CLASS_MAP[tone],
                          style === 'dashed' && 'border border-dashed',
                          style === 'soft' && 'opacity-50',
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="px-[var(--space-5)] pb-[var(--space-5)] pt-[var(--space-5)] sm:px-[var(--space-6)] sm:pb-[var(--space-6)]">
        <div className="w-full" style={{ height }}>
          {children}
        </div>
      </div>
    </DataCard>
  );
};
