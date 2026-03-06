import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type SectionHeaderVariant = 'default' | 'pill' | 'editorial' | 'numbered';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  eyebrow?: ReactNode;
  badge?: ReactNode;
  meta?: ReactNode;
  number?: ReactNode;
  tags?: ReactNode;
  variant?: SectionHeaderVariant;
}

const renderPillBadge = (badge: ReactNode) => {
  if (typeof badge !== 'string') {
    return badge;
  }

  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(16,185,129,0.15)] bg-[var(--emerald-glow-subtle)] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-400)] shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
      {badge}
    </span>
  );
};

const renderTags = (tags: ReactNode) => {
  if (!tags) {
    return null;
  }

  return <div className="flex flex-wrap items-center gap-3">{tags}</div>;
};

export const SectionHeader = ({
  title,
  subtitle,
  action,
  eyebrow,
  badge,
  meta,
  number,
  tags,
  variant = 'default',
  className,
  ...props
}: SectionHeaderProps) => {
  if (variant === 'pill') {
    return (
      <header
        className={cn(
          'grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8',
          className,
        )}
        {...props}
      >
        <div className="min-w-0">
          {badge ? <div className="mb-4">{renderPillBadge(badge)}</div> : null}
          <h2 className="text-[clamp(2.5rem,5vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-2px] text-[var(--text-primary)]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-[42rem] text-base leading-[1.6] text-[var(--text-tertiary)]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {action ? (
          <div className="flex items-center gap-3 text-[var(--text-secondary)]">{action}</div>
        ) : null}
      </header>
    );
  }

  if (variant === 'editorial') {
    return (
      <header
        className={cn('grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start', className)}
        {...props}
      >
        <div className="flex items-start gap-6 sm:gap-8">
          <span className="mt-1 block min-h-[60px] w-0.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,var(--emerald-500),transparent)]" />
          <div className="min-w-0">
            {meta ? (
              <div className="mb-2 text-sm font-[var(--font-editorial)] italic text-[var(--emerald-400)]">
                {meta}
              </div>
            ) : null}
            <h2 className="text-[clamp(2rem,4vw,2.25rem)] font-bold leading-[1.15] tracking-[-1.5px] text-[var(--text-primary)]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 max-w-[32rem] text-[15px] leading-[1.6] text-[var(--text-muted)]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {action ? (
          <div className="flex items-center gap-3 text-[var(--text-secondary)]">{action}</div>
        ) : null}
      </header>
    );
  }

  if (variant === 'numbered') {
    return (
      <header
        className={cn('grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8', className)}
        {...props}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="font-mono text-[clamp(3rem,8vw,4rem)] font-extrabold leading-none tracking-[-3px] text-[var(--bg-active)]">
            {number}
          </div>

          <div className="min-w-0">
            <h2 className="text-[28px] font-semibold leading-[1.2] tracking-[-1px] text-[var(--text-primary)]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                {subtitle}
              </p>
            ) : null}
            {meta || tags ? (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">
                {meta ? <span className="font-mono">{meta}</span> : null}
                {renderTags(tags)}
              </div>
            ) : null}
          </div>
        </div>

        {action ? (
          <div className="flex items-center gap-3 text-[var(--text-secondary)]">{action}</div>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={cn(
        'grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8',
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <div className="mb-3 inline-flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[3px] text-[var(--emerald-500)]">
            <span className="block h-px w-6 bg-[var(--emerald-500)]" />
            <span>{eyebrow}</span>
          </div>
        ) : null}

        <h2 className="text-[clamp(2.375rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-[-1.5px] text-[var(--text-primary)]">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-3 max-w-[38rem] text-base leading-[1.7] text-[var(--text-tertiary)]">
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">{action}</div>
      ) : null}
    </header>
  );
};
