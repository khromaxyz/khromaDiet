import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

const cardVariants = cva('', {
  variants: {
    variant: {
      base: '',
      goal: 'goal-card',
      kpi: 'kpi-card',
      macro: 'macro-card',
      supp: 'supp-card',
    },
    glow: {
      none: '',
      lime: 'glow-lime',
      violet: 'glow-violet',
      cyan: 'glow-cyan',
    },
  },
  defaultVariants: {
    variant: 'base',
    glow: 'none',
  },
});

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export const Card = ({ className, variant, glow, ...props }: CardProps) => {
  return <div className={cn(cardVariants({ variant, glow }), className)} {...props} />;
};

