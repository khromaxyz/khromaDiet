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
  abyss: 'var(--bg-primary)',
  deepest: 'var(--bg-secondary)',
  deep: 'var(--bg-secondary)',
  base: 'var(--bg-primary)',
  elevated: 'var(--surface-2)',
  surface: 'var(--surface-1)',
  overlay: 'var(--accent-tint-bg)',
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
      level === 'overlay'
        ? 'var(--accent-tint-bg)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)',
    ...style,
  } as ShellStyle;

  return (
    <section
      className={cn(
        'relative overflow-hidden py-[var(--space-20)]',
        showDivider &&
          'border-t border-t-[var(--border-primary)] before:pointer-events-none before:absolute before:inset-x-0 before:top-[-1px] before:h-px before:bg-[linear-gradient(90deg,transparent,var(--bg-accent),transparent)] before:opacity-30',
        className,
      )}
      style={shellStyle}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 sm:gap-12 sm:px-8 xl:px-12">
        {children}
      </div>
    </section>
  );
};
