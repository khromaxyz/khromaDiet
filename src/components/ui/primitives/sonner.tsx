import type { ComponentProps } from 'react';

import { Toaster as Sonner } from 'sonner';

import { cn } from '@/lib/utils';

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ className, toastOptions, theme = 'dark', ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className={cn('toaster group', className)}
      closeButton
      position="top-right"
      richColors
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: cn(
            'group toast border border-border bg-card text-card-foreground shadow-lg',
            toastOptions?.classNames?.toast,
          ),
          description: cn('group-[.toast]:text-muted-foreground', toastOptions?.classNames?.description),
          actionButton: cn('group-[.toast]:bg-primary group-[.toast]:text-primary-foreground', toastOptions?.classNames?.actionButton),
          cancelButton: cn('group-[.toast]:bg-muted group-[.toast]:text-muted-foreground', toastOptions?.classNames?.cancelButton),
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
