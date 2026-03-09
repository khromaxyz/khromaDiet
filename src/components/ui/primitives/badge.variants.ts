import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'border-[var(--border-accent)] bg-[var(--bg-accent-soft)] text-[var(--text-accent)] shadow-[var(--shadow-xs)]',
        secondary:
          'border-[var(--border-primary)] bg-[var(--surface-2)] text-[var(--text-primary)]',
        destructive:
          'border-[rgba(239,68,68,0.28)] bg-[rgba(239,68,68,0.1)] text-[var(--error-color)]',
        outline: 'border-[var(--border-strong)] bg-transparent text-[var(--text-primary)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
