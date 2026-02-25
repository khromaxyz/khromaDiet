import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center gap-2', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      'form-next': 'btn-form-next',
      'form-back': 'btn-form-back',
      submit: 'btn-form-submit',
      summary: 'btn-summary-full',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

export const Button = ({
  className,
  children,
  variant,
  size,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

