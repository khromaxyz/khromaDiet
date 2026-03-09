import { MoonStar, SunMedium } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export const ThemeToggle = ({ className, compact = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface-3)] text-[var(--text-primary)] shadow-[var(--shadow-sm)] transition-[background-color,border-color,transform] duration-150 ease-out hover:-translate-y-px',
        compact ? 'h-9 w-[3.4rem] px-1' : 'h-10 w-[3.8rem] px-1.5',
        className,
      )}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <span
        className={cn(
          'absolute inset-y-1 left-1 rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)] shadow-[var(--shadow-xs)] transition-transform duration-200 ease-out',
          compact ? 'w-6' : 'w-7',
          isDark && (compact ? 'translate-x-[1.2rem]' : 'translate-x-[1.35rem]'),
        )}
        aria-hidden
      />

      <span className="relative z-[1] ml-0.5 flex w-full items-center justify-between px-0.5">
        <SunMedium className={cn('text-[var(--text-primary)]', compact ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
        <MoonStar className={cn('text-[var(--text-accent)]', compact ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
      </span>
    </button>
  );
};
