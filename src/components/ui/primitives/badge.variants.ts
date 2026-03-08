import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
  {
    variants: {
      variant: {
        default:
          'border-[var(--border-accent)] bg-[var(--accent-primary-dim)] text-[var(--accent-primary-bright)] shadow-[inset_0_1px_0_rgba(16,185,129,0.08)]',
        secondary:
          'border-[rgba(245,158,11,0.25)] bg-[var(--color-gold-muted)] text-[var(--accent-gold-light)] shadow-[inset_0_1px_0_rgba(245,158,11,0.08)]',
        destructive:
          'border-[rgba(239,68,68,0.24)] bg-[rgba(239,68,68,0.1)] text-[var(--error-color)] shadow-[inset_0_1px_0_rgba(239,68,68,0.08)]',
        outline: 'border-[var(--border-default)] bg-[rgba(255,255,255,0.02)] text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
