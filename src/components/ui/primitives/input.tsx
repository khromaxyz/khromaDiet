import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-[var(--radius-md)] border-2 border-[var(--border-primary)] bg-[var(--bg-primary)] px-4 py-2 text-[var(--text-base)] text-[var(--text-primary)] shadow-[var(--shadow-xs)] transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-[var(--text-tertiary)] hover:border-[var(--border-strong)] focus-visible:border-[var(--border-accent)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
