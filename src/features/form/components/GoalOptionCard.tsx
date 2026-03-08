import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

import { DataCard } from '@/components/design-system';
import { Badge } from '@/components/ui/primitives/badge';
import type { GoalOption } from '@/lib/types';

interface GoalOptionCardProps {
  option: GoalOption;
  selected: boolean;
  onSelect: (id: string) => void;
}

const resolveCardIcon = (icon: ReactNode): ReactNode => {
  if (typeof icon !== 'string') {
    return icon ?? '*';
  }

  const value = icon.trim();
  if (!value) {
    return '*';
  }

  const isPlaceholder =
    value === '.' || value === '\u2022' || value === '-' || value === '_' || /^[A-Za-z]{1,3}$/.test(value);

  if (isPlaceholder) {
    return '*';
  }

  if (/[ÃƒÃ‚Ã¢Ã°Ã¯]/.test(value)) {
    return '*';
  }

  return value;
};

const BADGE_TONE_CLASS_MAP: Record<NonNullable<GoalOption['badge']>['tone'], string> = {
  lime: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-300)]',
  green: 'border-[var(--border-emerald)] bg-[var(--emerald-glow-subtle)] text-[var(--emerald-300)]',
  orange: 'border-[var(--border-gold)] bg-[var(--gold-glow-subtle)] text-[var(--gold-300)]',
  cyan: 'border-[var(--border-blue)] bg-[var(--blue-glow-subtle)] text-[var(--blue-300)]',
  violet: 'border-[var(--border-blue)] bg-[var(--blue-glow-subtle)] text-[var(--blue-300)]',
  red: 'border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] text-[var(--red-400)]',
};

export const GoalOptionCard = ({ option, selected, onSelect }: GoalOptionCardProps) => {
  const accentClass = option.accent ? `goal-card-accent-${option.accent}` : '';
  const cardIcon = resolveCardIcon(option.icon);

  return (
    <DataCard
      hoverable
      glow={selected ? 'emerald' : 'none'}
      className={['goal-card form-option-card', selected ? 'selected' : '', accentClass].filter(Boolean).join(' ')}
      onClick={() => onSelect(option.id)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(option.id);
        }
      }}
    >
      <div className={selected ? 'goal-card-check goal-card-check-selected' : 'goal-card-check'} aria-hidden>
        {selected ? <Check size={11} strokeWidth={3} /> : null}
      </div>

      <span className="goal-card-icon form-option-card-icon" aria-hidden>
        {cardIcon}
      </span>

      <div className="goal-card-title">{option.title}</div>
      <div className="goal-card-desc">{option.description}</div>

      {option.badge ? (
        <Badge variant="outline" className={`goal-card-badge ${BADGE_TONE_CLASS_MAP[option.badge.tone]}`}>
          {option.badge.label}
        </Badge>
      ) : null}
    </DataCard>
  );
};
