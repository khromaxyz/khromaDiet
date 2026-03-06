import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export type SectionShellLevel =
  | 'abyss'
  | 'deepest'
  | 'deep'
  | 'base'
  | 'elevated'
  | 'surface'
  | 'overlay';

const LEVEL_MAP: Record<SectionShellLevel, string> = {
  abyss: 'var(--bg-abyss)',
  deepest: 'var(--bg-deepest)',
  deep: 'var(--bg-deep)',
  base: 'var(--bg-base)',
  elevated: 'var(--bg-elevated)',
  surface: 'var(--bg-surface)',
  overlay: 'var(--bg-overlay)',
};

type ShellStyle = CSSProperties & {
  '--df-shell-bg': string;
};

export interface SectionShellProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  level?: SectionShellLevel;
  showDivider?: boolean;
}

export const SectionShell = ({
  children,
  className,
  level = 'abyss',
  showDivider = false,
  style,
  ...props
}: SectionShellProps) => {
  const shellStyle = {
    '--df-shell-bg': LEVEL_MAP[level],
    backgroundColor: LEVEL_MAP[level],
    backgroundImage:
      'radial-gradient(120% 160% at 50% 0%, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, rgba(255,255,255,0.014) 0%, rgba(255,255,255,0) 24%)',
    ...style,
  } as ShellStyle;

  return (
    <section
      className={cn(
        'relative overflow-hidden py-[var(--space-20)]',
        showDivider &&
          'border-t border-t-[var(--border-subtle)] before:pointer-events-none before:absolute before:inset-x-0 before:top-[-1px] before:h-px before:bg-[linear-gradient(90deg,transparent,var(--emerald-500),transparent)] before:opacity-20 after:pointer-events-none after:absolute after:left-1/2 after:top-[-10px] after:h-5 after:w-[200px] after:-translate-x-1/2 after:bg-[radial-gradient(ellipse,rgba(16,185,129,0.15),transparent)] after:blur-[4px]',
        className,
      )}
      style={shellStyle}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 sm:gap-12 sm:px-8 xl:px-12">
        {children}
      </div>
    </section>
  );
};
