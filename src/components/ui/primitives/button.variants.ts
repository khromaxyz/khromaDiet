import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] border-2 px-4 text-[var(--text-sm)] font-semibold tracking-[var(--tracking-wide)] transition-[transform,box-shadow,border-color,background-color,color] duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-[var(--border-strong)] bg-[var(--bg-accent)] text-[var(--text-on-accent)] shadow-[var(--shadow-brutal-green)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--accent-primary-bright)] hover:shadow-[0_16px_30px_-24px_rgba(16,185,129,0.7)] active:translate-y-px active:shadow-[var(--shadow-sm)]',
        destructive:
          'border-[var(--border-strong)] bg-[var(--error-color)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-px',
        outline:
          'border-[var(--border-strong)] bg-[var(--surface-1)] text-[var(--text-primary)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:bg-[var(--surface-2)] hover:shadow-[var(--shadow-md)] active:translate-y-px',
        secondary:
          'border-[var(--border-primary)] bg-[var(--accent-tint-bg)] text-[var(--text-primary)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:bg-[var(--bg-accent-soft)]',
        ghost:
          'border-transparent bg-transparent text-[var(--text-secondary)] shadow-none hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]',
        link: 'rounded-none border-0 bg-transparent px-0 text-[var(--text-accent)] shadow-none hover:text-[var(--accent-primary-bright)] hover:underline',
      },
      size: {
        default: 'h-11 py-2',
        sm: 'h-9 px-3 text-[var(--text-xs)]',
        lg: 'h-12 px-8 text-[var(--text-sm)]',
        icon: 'h-11 w-11 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
