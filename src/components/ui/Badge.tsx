import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

const badgeVariants = cva('goal-card-badge', {
  variants: {
    tone: {
      lime: 'badge-lime',
      violet: 'badge-violet',
      cyan: 'badge-cyan',
      orange: 'badge-orange',
      red: 'badge-red',
      green: 'badge-green',
    },
  },
  defaultVariants: {
    tone: 'lime',
  },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export const Badge = ({ className, tone, ...props }: BadgeProps) => {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
};

